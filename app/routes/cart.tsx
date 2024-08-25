import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { getCartId } from "../lib/cart-utils";
import { addNftToCart, getCartNfts, removeNftFromCart } from "../lib/db";

const app = new Hono();
export default app;

app.get("/", async (c: Context) => {
  const cartid = await getCartId(c);
  const nfts = await getCartNfts(c.env.DB, cartid);
  return c.json({ nfts });
});

app.post(
  "/add",
  zValidator(
    "json",
    z.object({
      nft: z.object({
        chain: z.string(),
        token: z.string(),
        identifier: z.string(),
        name: z.string(),
        price: z.number(),
        currency: z.string(),
        imageUrl: z.string(),
        openSeaUrl: z.string(),
      }),
    }),
    async (result, c) => {
      if (!result.success) {
        c.status(400);
        return c.json({ error: result.error });
      }

      const cartid = await getCartId(c);
      await addNftToCart(c.env.DB, cartid, result.data.nft);

      return c.json({ ok: true });
    }
  )
);

app.post(
  "/remove",
  zValidator(
    "json",
    z.object({
      nft: z.object({
        chain: z.string(),
        token: z.string(),
        identifier: z.string(),
      }),
    }),
    async (result, c) => {
      if (!result.success) {
        c.status(400);
        return c.json({ error: result.error });
      }

      const cartid = await getCartId(c);
      await removeNftFromCart(c.env.DB, cartid, result.data.nft);

      return c.json({ ok: true });
    }
  )
);
