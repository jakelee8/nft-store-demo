import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { z } from "zod";
import { getListings } from "../lib/opensea";

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

      const listings = await getListings(c, undefined, result.data.pageToken);

      return c.json(listings);
    }
  )
);
