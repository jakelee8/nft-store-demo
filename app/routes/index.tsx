import { createRoute } from "honox/factory";

import App from "../islands/App";
import { fetchNftCollection } from "../lib/opensea";

export default createRoute(async (c) => {
  const nfts = await fetchNftCollection(c, "rare-pepe-curated");

  return c.render(<App listings={nfts.items} />, {
    title: "NFT Store",
  });
});
