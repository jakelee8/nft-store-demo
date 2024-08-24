"use client";

import React, { useState } from "react";

import Navbar from "./Navbar";
import NftCard, { Nft } from "./NftCard";
import CartSidebar from "./CartSidebar";
import { listNftsQuery } from "@/lib/nft-queries";

const NftStore: React.FC = async () => {
  // @apollo/client cannot be imported directly
  // const { useSuspenseQuery } = await import("@apollo/client");
  // const query = await listNftsQuery();
  // const { data, error } = useSuspenseQuery(query);

  // if (error) {
  //   return <div>${error.toString()}</div>;
  // }

  // console.log(data);

  const [isConnected, setIsConnected] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Nft[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock NFT data
  const nfts: Nft[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `NFT #${i + 1}`,
    image: `https://via.placeholder.com/200x200.png?text=NFT${i + 1}`,
    price: (i + 1) * 10.1,
  }));

  const itemsPerPage = 12;
  const totalPages = Math.ceil(nfts.length / itemsPerPage);

  const toggleCart = () => {
    if (!isConnected) {
      setIsConnected(true);
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  const addToCart = (nft: Nft) => {
    setCartItems([...cartItems, nft]);
  };

  const paginatedNFTs = nfts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isConnected={isConnected} toggleCart={toggleCart} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedNFTs.map((nft) => (
            <NftCard key={nft.id} nft={nft} addToCart={addToCart} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === i + 1
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </div>
  );
};

export default NftStore;
