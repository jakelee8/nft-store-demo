import { Inject, NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { Nft, NftCollection } from "../../graphql.schema";
import { NftsService } from "./nfts.service";

@Resolver(() => Nft)
export class NftsResolver {
  constructor(@Inject() private service: NftsService) {}

  @Query(() => NftCollection)
  async nfts(
    @Args("slug") slug: string,
    @Args("limit") limit?: number | undefined,
    @Args("pageToken") pageToken?: string | undefined
  ): Promise<NftCollection> {
    return this.service.listNftsByCollection(slug, limit, pageToken);
  }

  @Query(() => Nft)
  async nft(@Args("id") id: string): Promise<Nft> {
    const nft = await this.service.byId(id);
    if (!nft) {
      throw new NotFoundException(id);
    }
    return nft;
  }
}
