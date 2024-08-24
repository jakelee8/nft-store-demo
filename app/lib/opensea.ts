import { Context } from "hono";
import { env } from "hono/adapter";

import { GetNftListingsReply } from "../lib/listings";

export async function getListings(
  c: Context,
  limit?: number | undefined,
  pageToken?: string | undefined
): Promise<GetNftListingsReply> {
  const url = new URL(
    `https://api.opensea.io//api/v2/orders/ethereum/seaport/listings`
  );
  url.searchParams.append("limit", limit ? limit.toString() : "12");
  if (pageToken) url.searchParams.append("cursor", pageToken.toString());

  const { next, previous, orders } = await fetchOpenSea(c, url);
  const items = orders.map(
    ({
      current_price: value,
      maker_asset_bundle: {
        assets: [
          {
            token_id: identifier,
            image_url: imageUrl,
            name: tokenName,
            asset_contract: {
              address: token,
              chain_identifier: chain,
              name: collectionName,
            },
            permalink: openSeaUrl,
          },
        ],
      },
      taker_asset_bundle: {
        assets: [
          {
            asset_contract: { symbol: currency },
            decimals,
          },
        ],
      },
    }: any) => ({
      chain,
      token,
      identifier,
      name: `${collectionName} ${tokenName}`,
      price: parseInt(value) / Math.pow(10, decimals),
      currency: toCurrency(currency, value, decimals),
      imageUrl,
      openSeaUrl,
    })
  );

  return {
    items,
    nextPageToken: next,
    prevPageToken: previous,
  };
}

async function fetchOpenSea(c: Context, url: URL): Promise<any> {
  const { OPENSEA_API_KEY } = env(c);

  const response = await fetch(url, {
    headers: { "x-api-key": OPENSEA_API_KEY },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}

function toCurrency(currency: string, value: string, decimals: number): string {
  let whole = "0";
  let fractional;
  if (value.length == decimals) {
    fractional = value;
  } else if (value.length < decimals) {
    fractional = new Array(decimals + 1 - value.length).join("0") + value;
  } else {
    const offset = value.length - decimals;
    whole = value.substring(0, offset);
    fractional = value.substring(offset);
  }

  fractional = fractional.replace(/0+$/, "");
  const sep = fractional ? "." : "";
  return `${whole}${sep}${fractional} ${currency}`;
}
