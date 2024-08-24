"use client";

import { FC, useState } from "hono/jsx";

import Navbar from "./Navbar";
import NftCard, { Nft } from "../components/NftCard";
import CartSidebar from "./CartSidebar";

// Mock NFT data
const nfts: Nft[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `NFT #${i + 1}`,
  description: "This is an NFT",
  price: (i + 1) * 10.1,
  imageUrl: "",
  openseaUrl: "",
}));

const itemsPerPage = 12;
const totalPages = Math.ceil(nfts.length / itemsPerPage);

const NftStore: FC = () => {
  const [cartItems, setCartItems] = useState<Nft[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const addToCart = (nft: Nft) => {
    setCartItems([...cartItems, nft]);
  };

  const paginatedNFTs = nfts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const sidebarId = "cart-sidebar";

  return (
    <div class="drawer drawer-end">
      <input id={sidebarId} type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Navbar sidebarId={sidebarId} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedNFTs.map((nft) => (
              <NftCard key={nft.id} nft={nft} addToCart={addToCart} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div class="join">
              {Array.from({ length: totalPages }, (_, i) => {
                const active = currentPage === i ? "btn-active" : "";
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`join-item btn ${active}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
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
