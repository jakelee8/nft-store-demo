import { createRoute } from "honox/factory";
import NftStore from "../islands/NftStore";

export default createRoute((c) => {
  return c.render(<NftStore />, { title: "NFT Store" });
});
