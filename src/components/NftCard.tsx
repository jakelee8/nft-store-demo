"use client";

export interface Nft {
  id: number;
  name: string;
  image: string;
  price: number;
}

const NftCard: React.FC<{ nft: Nft; addToCart: (nft: Nft) => void }> = ({
  nft,
  addToCart,
}) => (
  <div className="border rounded-lg p-4">
    <img
      src={nft.image}
      alt={nft.name}
      width={200}
      height={200}
      className="w-full h-48 object-cover mb-2"
    />
    <h3 className="text-lg font-semibold">{nft.name}</h3>
    <p className="text-gray-600">{nft.price} ETH</p>
    <button
      onClick={() => addToCart(nft)}
      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  </div>
);

export default NftCard;
