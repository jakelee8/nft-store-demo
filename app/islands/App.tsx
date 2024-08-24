import { FC, useState } from "hono/jsx";

import NftStore from "./NftStore";
import { Nft } from "../lib/nft";
import { Cart } from "../lib/cart";

const App: FC<{ listings: Nft[] }> = ({ listings }) => {
  const [cart, setCart] = useState(() => new Cart([]));

  return <NftStore listings={listings} cart={cart} setCart={setCart} />;
};

export default App;
