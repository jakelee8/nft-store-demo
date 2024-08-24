import { baseUrl as defaultBaseUrl } from "./baseurl";
import { Nft, nftKey } from "./nft";

export class Cart {
  public readonly nftKeys: ReadonlySet<string>;

  constructor(
    public readonly nfts: ReadonlyArray<Nft> = [],
    nftKeys?: ReadonlySet<string>,
    public readonly baseUrl: string = defaultBaseUrl
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
      [...this.nfts, nft],
      this.nftKeys.union(new Set([key])),
      this.baseUrl
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
      this.nfts.filter((nft) => nftKey(nft) !== key),
      this.nftKeys.difference(new Set([key])),
      this.baseUrl
    );
  }

  hasNft(nft: Nft) {
    return this.nftKeys.has(nftKey(nft));
  }
}
