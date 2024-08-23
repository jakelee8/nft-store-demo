import { OpenSeaSDK } from "opensea-js";
import { Inject, NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { Nft, NftCollection } from "../../graphql.schema";

@Resolver(() => Nft)
export class NftsResolver {
  constructor(@Inject("OPENSEA_SDK") private sdk: OpenSeaSDK) {}

  @Query(() => [Nft])
  async nfts(
    @Args("slug") slug: string,
    @Args("limit") limit?: number | undefined,
    @Args("pageToken") pageToken?: string | undefined
  ): Promise<NftCollection> {
    const { nfts, next } = await this.sdk.api.getNFTsByCollection(
      slug,
      limit || 12,
      pageToken
    );

    return {
      items: nfts.map(
        ({ identifier, name, description, image_url, opensea_url }) => ({
          id: identifier,
          name,
          description,
          price: "",
          imageUrl: image_url,
          openSeaUrl: opensea_url,
        })
      ),
      nextPageToken: next,
    };
  }

  @Query(() => Nft)
  async nft(@Args("id") id: string): Promise<Nft> {
    const nft = {
      id: "",
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      openSeaUrl: "",
    };
    if (!nft) {
      throw new NotFoundException(id);
    }
    return nft;
  }
}
