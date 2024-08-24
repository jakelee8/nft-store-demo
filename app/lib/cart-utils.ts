import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

import { createCart } from "./db";

export async function getCartId(c: Context) {
  let cartid = getCookie(c, "cartid");
  if (!cartid) {
    cartid = await createCart(c.env.DB);
  }
  setCookie(c, "cartid", cartid);
  return cartid;
}
