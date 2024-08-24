import { FC, useState } from "hono/jsx";

import NftStore from "./NftStore";
import { Nft } from "../lib/nft";
import { Cart } from "../lib/cart";

const App: FC<{ listings: Nft[]; cart: { nfts: Nft[] } }> = ({
  listings,
  cart: { nfts },
}) => {
  let baseUrl = "http://localhost:5173";
  try {
    baseUrl = (globalThis as any).location.origin;
  } catch {}

  const [cart, setCart] = useState(() => new Cart(baseUrl, nfts));

  return <NftStore listings={listings} cart={cart} setCart={setCart} />;
};

export default App;
