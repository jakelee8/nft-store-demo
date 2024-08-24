import { Result } from "postcss";
import { Nft } from "./nft";

export interface Cart {
  id: string;
  nfts: Nft;
}

export type NftId = Pick<Nft, "chain" | "token" | "identifier">;

interface DbCart {
  id: string;
  create_time: Date;
  data: string | null;
}

interface DbCartNft {
  cart_id: string;
  chain: string;
  token: string;
  identifier: string;
  create_time: Date;
  data: string | null;
}

export async function createCart(
  db: D1Database,
  id: string = crypto.randomUUID()
) {
  await db.prepare("INSERT INTO carts (id) VALUES (?)").bind(id).run();
  return id;
}

export async function getCartNfts(db: D1Database, cartId: string) {
  const result = await db
    .prepare("SELECT data FROM cart_nfts WHERE cart_id = ?")
    .bind(cartId)
    .all<DbCartNft>();

  if (result.error) {
    throw new Error(result.error);
  }

  return result.results
    .map(({ data }) => data && JSON.parse(data))
    .filter(Boolean);
}

export async function addNftToCart(db: D1Database, cartId: string, nft: Nft) {
  await db
    .prepare(
      "INSERT INTO cart_nfts (cart_id, chain, token, identifier, data) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING"
    )
    .bind(cartId, nft.chain, nft.token, nft.identifier, JSON.stringify(nft))
    .run();
}

export async function removeNftFromCart(
  db: D1Database,
  cartId: string,
  nft: NftId
) {
  await db
    .prepare(
      "DELETE FROM cart_nfts WHERE cart_id = ? AND chain = ? AND token = ? AND identifier = ?"
    )
    .bind(cartId, nft.chain, nft.token, nft.identifier)
    .run();
}
