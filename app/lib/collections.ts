import { baseUrl as defaultBaseUrl } from "./baseurl";

export interface Collection {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface GetNftCollectionsReply {
  items: Collection[];
  nextPageToken?: string | undefined;
}

export class Collections {
  constructor(public readonly baseUrl: string = defaultBaseUrl) {}

  async getCollections(pageToken?: string): Promise<GetNftCollectionsReply> {
    const url = new URL(`${this.baseUrl}/collections`);
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
