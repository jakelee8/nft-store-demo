import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { z } from "zod";
import { getNftListings } from "../lib/opensea";

export default createRoute(
  zValidator(
    "query",
    z.object({
      pageToken: z.string().optional(),
    }),
    async (result, c) => {
      if (!result.success) {
        c.status(400);
        return c.json({ error: result.error });
      }

      result.data.pageToken;

      const listings = await getNftListings(
        c,
        undefined,
        result.data.pageToken
      );

      return c.json(listings);
    }
  )
);
