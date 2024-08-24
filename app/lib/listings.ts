import { baseUrl as defaultBaseUrl } from "./baseurl";
import { Nft, nftKey } from "./nft";

export interface GetNftListingsReply {
  items: Nft[];
  nextPageToken?: string | undefined;
  prevPageToken?: string | undefined;
}

export class Listings {
  constructor(public readonly baseUrl: string = defaultBaseUrl) {}

  async getListings(pageToken?: string): Promise<GetNftListingsReply> {
    const url = new URL(`${this.baseUrl}/listings`);
    if (pageToken) url.searchParams.append("pageToken", pageToken);

    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const reply: any = await response.json();
    return reply;
  }
}
