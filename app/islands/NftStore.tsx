import { FC, useState } from "hono/jsx";

import Navbar from "./Navbar";
import NftCard from "../components/NftCard";
import CartSidebar from "./CartSidebar";

import { FetchNftCollectionReply, Nft } from "../lib/nft";

const NftStore: FC<{ initialNfts: FetchNftCollectionReply }> = ({
  initialNfts,
}) => {
  const [cartItems, setCartItems] = useState<Nft[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const addToCart = (nft: Nft) => {
    setCartItems([...cartItems, nft]);
  };

  const { items: nfts } = initialNfts;

  const sidebarId = "cart-sidebar";

  return (
    <div class="drawer drawer-end">
      <input id={sidebarId} type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Navbar sidebarId={sidebarId} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <NftCard
                key={`${nft.chain}/${nft.token}/${nft.identifier}`}
                nft={nft}
                addToCart={addToCart}
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
          <CartSidebar cartItems={cartItems} />
        </ul>
      </div>
    </div>
  );
};

export default NftStore;
