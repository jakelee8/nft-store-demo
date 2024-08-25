import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("cart", () => {
  it("creates an empty cart", async () => {
    const res = await env.WORKER.fetch("http://localhost/cart");
    expect(res.status).toBe(200);
    expect(getCartId(res.headers)).toBeTruthy();
    expect(await res.json()).toEqual({ nfts: [] });
  });

  it("adds and removes an NFT", async () => {
    const nft = {
      chain: "",
      token: "",
      identifier: "",
      name: "",
      price: 123,
      currency: "",
      imageUrl: "",
      openSeaUrl: "",
    };

    // Add NFT to an empty cart
    const add = await env.WORKER.fetch("http://localhost/cart/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nft }),
    });
    expect(add.status).toBe(200);

    const cartid = getCartId(add.headers);
    expect(cartid).toBeTruthy();

    expect(await add.json()).toEqual({ ok: true });

    // Cart should have the NFT
    const res1 = await env.WORKER.fetch("http://localhost/cart", {
      headers: {
        Cookie: `cartid=${cartid}`,
      },
    });
    expect(res1.status).toBe(200);
    expect(getCartId(res1.headers)).toEqual(cartid);
    expect(await res1.json()).toEqual({ nfts: [nft] });

    // Remove NFT from the cart
    const del = await env.WORKER.fetch("http://localhost/cart/remove", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Cookie: `cartid=${cartid}`,
      },
      body: JSON.stringify({
        nft: {
          chain: "",
          token: "",
          identifier: "",
        },
      }),
    });

    expect(del.status).toBe(200);
    expect(getCartId(del.headers)).toEqual(cartid);

    // Cart should be empty
    const res2 = await env.WORKER.fetch("http://localhost/cart", {
      headers: {
        Cookie: `cartid=${cartid}`,
      },
    });
    expect(res2.status).toBe(200);
    expect(getCartId(res2.headers)).toEqual(cartid);
    expect(await res2.json()).toEqual({ nfts: [] });
  });
});

function getCartId(headers: Headers) {
  const name = "cartid=";
  const cookies = headers.getAll("set-cookie");
  const cartid = cookies.filter((s) => s.startsWith(name))[0];
  return cartid?.substring(name.length).replace(/;.*$/, "");
}
