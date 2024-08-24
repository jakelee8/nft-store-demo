import { createRoute } from "honox/factory";

export default createRoute((c) => {
  const name = c.req.query("name") ?? "NFT Store";
  return c.render(<div>Hello World!</div>, { title: name });
});
