import { Context } from "hono";
import { env } from "hono/adapter";

import { FetchNftCollectionReply, Nft } from "../lib/nft";

export async function fetchNftCollection(
  c: Context,
  slug: string,
  limit?: number | undefined,
  pageToken?: string | undefined
): Promise<FetchNftCollectionReply> {
  const { listings, next } = await getCollectionBestListings(
    c,
    slug,
    limit,
    pageToken
  );

  // Don't use non-cancellable Promises for each NFT to avoid DoS the server
  const items: Nft[] = [];
  const nfts: { [id: string]: Nft } = {};
  for (const listing of listings) {
    const {
      chain,
      price: {
        current: { currency: currencySymbol, decimals, value },
      },
      protocol_data: {
        parameters: {
          offer: [{ token, identifierOrCriteria }],
        },
      },
    } = listing;

    const currency = toCurrency(currencySymbol, value, decimals);

    const id = `${token}/${identifierOrCriteria}`;
    if (id in nfts) {
      items.push({ ...nfts[id], currency });
    } else {
      const result = await getNft(c, chain, token, identifierOrCriteria);
      const {
        nft: { name, image_url, opensea_url },
      } = result;
      items.push({
        id,
        name,
        price: parseInt(value) / Math.pow(10, decimals),
        currency,
        imageUrl: image_url,
        openSeaUrl: opensea_url,
      });
    }
  }

  return {
    items,
    nextPageToken: next,
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

async function getCollectionBestListings(
  c: Context,
  slug: string,
  limit?: number | undefined,
  pageToken?: string | undefined
): Promise<any> {
  const url = new URL(
    `https://api.opensea.io/api/v2/listings/collection/${encodeURIComponent(slug)}/best`
  );
  url.searchParams.append("limit", limit ? limit.toString() : "12");
  if (pageToken) url.searchParams.append("next", pageToken.toString());

  return await fetchOpenSea(c, url);
}

async function getNft(
  c: Context,
  chain: string,
  address: string,
  identifier: string
): Promise<any> {
  const url = new URL(
    `https://api.opensea.io/api/v2/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(address)}/nfts/${encodeURIComponent(identifier)}`
  );

  return await fetchOpenSea(c, url);
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
