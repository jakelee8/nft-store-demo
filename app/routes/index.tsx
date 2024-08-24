import { createRoute } from "honox/factory";

import App from "../islands/App";
import { getListings } from "../lib/opensea";
import { getCartNfts } from "../lib/db";
import { getCartId } from "../lib/cart-utils";

export default createRoute(async (c) => {
  const listings = await getListings(c);
  const cartid = await getCartId(c);
  const cartNfts = await getCartNfts(c.env.DB, cartid);

  return c.render(<App listings={listings} cart={{ nfts: cartNfts }} />, {
    title: "NFT Store",
  });
});
