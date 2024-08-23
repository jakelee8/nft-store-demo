import { Chain, OpenSeaSDK } from "opensea-js";
import { Inject, Injectable } from "@nestjs/common";

import { Nft, NftCollection } from "../../graphql.schema";

@Injectable()
export class NftsService {
  constructor(@Inject("OPENSEA_SDK") private sdk: OpenSeaSDK) {}

  async listNftsByCollection(
    slug: string,
    limit?: number | undefined,
    pageToken?: string | undefined
  ): Promise<NftCollection> {
    const { listings, next } = await this.sdk.api.getBestListings(
      slug,
      limit || 12,
      pageToken
    );

    // Don't use non-cancellable Promises for each NFT to avoid DoS the server
    const items: Nft[] = [];
    const nfts: { [id: string]: Nft } = {};
    for (const listing of listings) {
      const {
        chain,
        price: {
          current: { currency, decimals, value },
        },
        protocol_data: {
          parameters: {
            offer: [{ token, identifierOrCriteria }],
          },
        },
      } = listing;

      const price = toCurrency(currency, value, decimals);

      const id = `${token}/${identifierOrCriteria}`;
      if (id in nfts) {
        items.push({ price, ...nfts[id] });
      } else {
        const {
          nft: { name, description, image_url, opensea_url },
        } = await this.sdk.api.getNFT(
          token,
          identifierOrCriteria,
          chain as Chain
        );

        items.push({
          id,
          name,
          description,
          price,
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

  async byId(id: string): Promise<Nft> {
    return {
      id: "",
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      openSeaUrl: "",
    };
  }
}

function toCurrency(currency: string, value: string, decimals: number) {
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
  return `${whole}.${fractional} ${currency}`;
}
