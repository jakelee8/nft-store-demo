import { FC } from "hono/jsx";

export interface Nft {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  openseaUrl: string;
}

const NftCard: FC<{ key: string; nft: Nft; addToCart: (nft: Nft) => void }> = ({
  key,
  nft,
  addToCart,
}) => (
  <div key={key} class="card bg-base-100 w-full shadow-xl">
    <figure>
      {/* <img
      src={nft.imageUrl}
      alt={nft.name}
      width={200}
      height={200}
      className="w-full h-48 object-cover mb-2"
    /> */}
      <div class="skeleton w-full h-48 object-cover mb-2"></div>
    </figure>
    <div class="card-body">
      <h2 class="card-title">{nft.name}</h2>
      <p>{nft.description}</p>
      <div class="card-actions justify-end">
        <button onClick={() => addToCart(nft)} class="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default NftCard;
