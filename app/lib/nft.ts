export interface Nft {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  openSeaUrl: string;
}

export interface FetchNftCollectionReply {
  items: Nft[];
  nextPageToken?: string | undefined;
}
