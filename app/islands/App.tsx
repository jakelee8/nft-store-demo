import { FC, useState } from "hono/jsx";

import NftStore from "./NftStore";
import { Cart } from "../lib/cart";
import { GetNftListingsReply } from "../lib/listings";
import { Nft } from "../lib/nft";

const App: FC<{ listings: GetNftListingsReply; cart: { nfts: Nft[] } }> = ({
  listings,
  cart: { nfts },
}) => {
  const [cart, setCart] = useState(() => new Cart(nfts));

  return <NftStore listings={listings} cart={cart} setCart={setCart} />;
};

export default App;
