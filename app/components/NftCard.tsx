import { FC } from "hono/jsx";

import { Nft } from "../lib/nft";

const NftCard: FC<{
  key: string;
  nft: Nft;
  inCart: boolean;
  addToCart: (nft: Nft) => void;
}> = ({ key, nft, inCart, addToCart }) => (
  <div key={key} class="card bg-base-100 w-full shadow-xl">
    <figure>
      <img
        src={nft.imageUrl}
        alt={nft.name}
        className="w-full h-48 object-cover mb-2"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{nft.name}</h2>
      <p>{nft.currency}</p>
      <div class="card-actions justify-end">
        <button
          onClick={() => addToCart(nft)}
          class={`btn ${inCart ? "btn-disabled" : "btn-primary"}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default NftCard;
