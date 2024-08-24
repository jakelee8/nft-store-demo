import { Nft, nftKey } from "./nft";

export class Cart {
  public readonly nftKeys: ReadonlySet<string>;

  constructor(
    public readonly nfts: ReadonlyArray<Nft> = [],
    nftKeys?: ReadonlySet<string>
  ) {
    this.nftKeys = nftKeys || new Set(nfts.map(nftKey));
  }

  addNft(nft: Nft) {
    const key = nftKey(nft);
    if (this.nftKeys.has(key)) {
      return this;
    }

    const cart = new Cart(
      [...this.nfts, nft],
      this.nftKeys.union(new Set([key]))
    );

    return cart;
  }

  removeNft(nft: Nft) {
    const key = nftKey(nft);
    if (!this.nftKeys.has(key)) {
      return this;
    }

    return new Cart(
      this.nfts.filter((nft) => nftKey(nft) !== key),
      this.nftKeys.difference(new Set([key]))
    );
  }

  hasNft(nft: Nft) {
    return this.nftKeys.has(nftKey(nft));
  }
}
