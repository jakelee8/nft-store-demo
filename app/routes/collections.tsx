import { createRoute } from "honox/factory";

import CollectionsPage from "../islands/CollectionsPage";
import { getCollections } from "../lib/opensea";
import { getCartNfts } from "../lib/db";
import { getCartId } from "../lib/cart-utils";

export default createRoute(async (c) => {
  const collections = await getCollections(c);
  const cartid = await getCartId(c);
  const cartNfts = await getCartNfts(c.env.DB, cartid);

  return c.render(
    <CollectionsPage collections={collections} cart={{ nfts: cartNfts }} />,
    {
      title: "NFT Store",
    }
  );
});
