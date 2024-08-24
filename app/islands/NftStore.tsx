import { FC, useState } from "hono/jsx";

import Navbar from "./Navbar";
import NftCard from "../components/NftCard";
import CartSidebar from "./CartSidebar";

import { Nft, nftKey } from "../lib/nft";
import { Cart } from "../lib/cart";

const NftStore: FC<{
  listings: Nft[];
  cart: Cart;
  setCart: (newCart: Cart | ((currentCart: Cart) => Cart)) => void;
}> = ({ listings, cart, setCart }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const sidebarId = "cart-sidebar";

  return (
    <div class="drawer drawer-end">
      <input id={sidebarId} type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Navbar sidebarId={sidebarId} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((nft) => (
              <NftCard
                key={nftKey(nft)}
                nft={nft}
                addToCart={() =>
                  setCart((currentCart) => currentCart.addNft(nft))
                }
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div class="join">
              <button
                onClick={() => setCurrentPage(0)}
                className="join-item btn btn-active"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(0)}
                className="join-item btn"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage(0)}
                className="join-item btn"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
      <div class="drawer-side z-50">
        <label
          for={sidebarId}
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <CartSidebar cart={cart} setCart={setCart} />
        </ul>
      </div>
    </div>
  );
};

export default NftStore;
