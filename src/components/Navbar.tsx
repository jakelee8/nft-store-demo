import { ShoppingCartIcon, WalletIcon } from "lucide-react";

const Navbar: React.FC<{ isConnected: boolean; toggleCart: () => void }> = ({
  isConnected,
  toggleCart,
}) => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="flex items-center">
      <img
        src={`https://via.placeholder.com/200x200.png?text=NFT`}
        alt="Logo"
        width={40}
        height={40}
      />
      <span className="ml-2 text-xl font-bold">NFT Store</span>
    </div>
    <button
      onClick={toggleCart}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
    >
      {isConnected ? (
        <ShoppingCartIcon className="mr-2" />
      ) : (
        <WalletIcon className="mr-2" />
      )}
      {isConnected ? "Cart" : "Connect Wallet"}
    </button>
  </nav>
);

export default Navbar;
