import { NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { Nft } from "../../graphql.schema";
import { NftsService } from "./nfts.service";

@Resolver(() => Nft)
export class NftsResolver {
  constructor(private readonly nftsService: NftsService) {}

  @Query(() => [Nft])
  nfts(): Promise<Nft[]> {
    return this.nftsService.findAll();
  }

  @Query(() => Nft)
  async nft(@Args("id") id: string): Promise<Nft> {
    const nft = await this.nftsService.findOneById(id);
    if (!nft) {
      throw new NotFoundException(id);
    }
    return nft;
  }
}
