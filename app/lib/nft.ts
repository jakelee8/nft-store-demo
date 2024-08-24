export interface Nft {
  chain: string;
  token: string;
  identifier: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  openSeaUrl: string;
}

export interface getNftListingsReply {
  items: Nft[];
  nextPageToken?: string | undefined;
  prevPageToken?: string | undefined;
}

export function nftKey(nft: Nft) {
  return `${nft.chain}/${nft.token}/${nft.identifier}`;
}
