import { Nft, nftKey } from "./nft";

export class Cart {
  public readonly nftKeys: ReadonlySet<string>;

  constructor(
    public readonly baseUrl: string,
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

    // TODO: block frontend until persisted?
    fetch(`${this.baseUrl}/cart/add`, {
      method: "POST",
      body: JSON.stringify({ nft }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const cart = new Cart(
      this.baseUrl,
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

    // TODO: block frontend until persisted?
    fetch(`${this.baseUrl}/cart/remove`, {
      method: "POST",
      body: JSON.stringify({
        nft: {
          chain: nft.chain,
          token: nft.token,
          identifier: nft.identifier,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new Cart(
      this.baseUrl,
      this.nfts.filter((nft) => nftKey(nft) !== key),
      this.nftKeys.difference(new Set([key]))
    );
  }

  hasNft(nft: Nft) {
    return this.nftKeys.has(nftKey(nft));
  }
}
