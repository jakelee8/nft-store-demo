import { createRoute } from "honox/factory";
import NftStore from "../islands/NftStore";
import { fetchNftCollection } from "../lib/opensea";

export default createRoute(async (c) => {
  const nfts = await fetchNftCollection(c, "rare-pepe-curated");

  return c.render(<NftStore initialNfts={nfts} />, { title: "NFT Store" });
});
