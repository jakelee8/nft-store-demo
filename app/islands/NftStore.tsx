import { FC, useState } from "hono/jsx";

import Navbar from "./Navbar";
import NftCard from "../components/NftCard";
import CartSidebar from "./CartSidebar";

import { GetNftListingsReply, Listings } from "../lib/listings";
import { nftKey } from "../lib/nft";
import { Cart } from "../lib/cart";

const NftStore: FC<{
  listings: GetNftListingsReply;
  cart: Cart;
  setCart: (newCart: Cart | ((currentCart: Cart) => Cart)) => void;
}> = ({ listings: initialListings, cart, setCart }) => {
  const [listings, setListings] = useState(initialListings);
  const [showCart, setShowCart] = useState(false);

  const sidebarId = "cart-sidebar";
  const listingsClient = new Listings();

  async function fetchListings(pageToken?: string | undefined) {
    const newListings = await listingsClient.getListings(pageToken);
    setListings(newListings);
  }

  return (
    <div class="drawer drawer-end">
      <input
        id={sidebarId}
        type="checkbox"
        class="drawer-toggle"
        checked={showCart}
        onChange={(e) => setShowCart((e as any).target.checked)}
      />
      <div class="drawer-content">
        <Navbar sidebarId={sidebarId} cart={cart} />
        <main class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.items.map((nft) => (
              <NftCard
                key={nftKey(nft)}
                nft={nft}
                inCart={cart.hasNft(nft)}
                addToCart={() => {
                  setCart((currentCart) => {
                    const cart = currentCart.addNft(nft);
                    if (!Object.is(cart, currentCart)) {
                      setShowCart(true);
                    }
                    return cart;
                  });
                }}
              />
            ))}
          </div>
          <div class="mt-8 flex justify-center">
            <div class="join">
              <button
                onClick={() =>
                  listings.prevPageToken &&
                  fetchListings(listings.prevPageToken)
                }
                class={`join-item btn ${listings.prevPageToken ? "" : "btn-disabled"}`}
              >
                Prev
              </button>

              <button
                onClick={() =>
                  listings.nextPageToken &&
                  fetchListings(listings.nextPageToken)
                }
                class={`join-item btn ${listings.nextPageToken ? "" : "btn-disabled"}`}
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
