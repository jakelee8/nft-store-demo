import { FC, useState } from "hono/jsx";

import Navbar from "./Navbar";
import CartSidebar from "./CartSidebar";

import { Collections } from "../lib/collections";
import { GetNftCollectionsReply } from "../lib/collections";
import { Cart } from "../lib/cart";
import CollectionCard from "../components/CollectionCard";

const CollectionsPage: FC<{
  collections: GetNftCollectionsReply;
  cart: Cart;
}> = ({ collections: initialCollections, cart: { nfts } }) => {
  const [cart, setCart] = useState(() => new Cart(nfts));

  const [first, setFirst] = useState(true);
  const [collections, setcollections] = useState(initialCollections);
  const [showCart, setShowCart] = useState(false);

  const sidebarId = "cart-sidebar";
  const collectionsClient = new Collections();

  async function fetchCollections(pageToken?: string | undefined) {
    const newCollections = await collectionsClient.getCollections(pageToken);
    setcollections(newCollections);
    setFirst(!!pageToken);
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
            {collections.items.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
          <div class="mt-8 flex justify-center">
            <div class="join">
              <button
                onClick={() => fetchCollections()}
                class={`join-item btn ${first ? "btn-active" : ""}`}
              >
                First
              </button>
              <button
                onClick={() =>
                  collections.nextPageToken &&
                  fetchCollections(collections.nextPageToken)
                }
                class={`join-item btn ${collections.nextPageToken ? "" : "btn-disabled"}`}
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

export default CollectionsPage;
