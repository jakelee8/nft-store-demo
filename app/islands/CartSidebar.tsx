import { FC } from "hono/jsx";

import { nftKey } from "../lib/nft";
import { Cart } from "../lib/cart";

const CartSidebar: FC<{
  cart: Cart;
  setCart: (newCart: Cart | ((currentCart: Cart) => Cart)) => void;
}> = ({ cart, setCart }) => {
  return (
    <div class="grid grid-cols-1 gap-8">
      <h1 class="text-lg font-medium">Shopping cart</h1>

      <ul role="list">
        {cart.nfts.map((nft) => (
          <li key={nftKey(nft)}>
            <div class="flex py-2">
              <div class="flex-none w-24 mr-2">
                <figure>
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-24 h-24 object-cover"
                  />
                </figure>
              </div>
              <div class="flex-auto">
                <p>{nft.name}</p>
                <p>{nft.currency}</p>
                <p class="mt-2">
                  <button
                    onClick={() =>
                      setCart((currentCart) => currentCart.removeNft(nft))
                    }
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
        <div class="text-base font-medium">
          <p>
            Subtotal {cart.nfts.reduce((total, item) => total + item.price, 0)}{" "}
            ETH
          </p>
        </div>
        <p class="mt-0.5 text-sm">Shipping and taxes calculated at checkout.</p>
        <div class="mt-6">
          <a
            href="#"
            class={`btn ${cart.nfts.length > 0 ? "btn-primary" : "btn-disabled"}`}
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
