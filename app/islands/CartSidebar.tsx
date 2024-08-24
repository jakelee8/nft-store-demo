import { FC } from "hono/jsx";

import { Nft } from "../components/NftCard";

const CartSidebar: FC<{ cartItems: Nft[] }> = ({ cartItems }) => (
  <div class="grid grid-cols-1 gap-8">
    <h1 class="text-lg font-medium">Shopping cart</h1>

    <ul role="list">
      {cartItems.map((nft) => (
        <li key={nft.id}>
          <div class="flex py-2">
            <div class="flex-none w-24 mr-2">
              <figure>
                {/* <img
                src={nft.imageUrl}
                alt={nft.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-2"
              /> */}
                <div class="skeleton w-24 h-24 object-cover"></div>
              </figure>
            </div>
            <div class="flex-auto">
              <p>{nft.name}</p>
              <p class="mt-2">
                <button
                  onClick={() => console.log("click")}
                  class="text-red-400"
                >
                  <span class="icon-[lucide--circle-x]"></span> Remove
                </button>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>

    <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
      <div class="text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>{cartItems.reduce((total, item) => total + item.price, 0)} ETH</p>
      </div>
      <p class="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
      <div class="mt-6">
        <a href="#" class="btn btn-primary">
          Checkout
        </a>
      </div>
    </div>
  </div>
);

export default CartSidebar;
