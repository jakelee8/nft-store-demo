"use client";

import { FC } from "hono/jsx";

import Navbar from "./Navbar";

const NftStore: FC = () => {
  const sidebarId = "cart-sidebar";

  return (
    <div class="drawer drawer-end">
      <input id={sidebarId} type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Navbar sidebarId={sidebarId} />
        <main className="container mx-auto px-4 py-8">NFT List</main>
      </div>
      <div class="drawer-side z-50">
        <label
          for={sidebarId}
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          Cart Items
        </ul>
      </div>
    </div>
  );
};

export default NftStore;
