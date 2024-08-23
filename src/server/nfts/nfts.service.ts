import { Injectable } from "@nestjs/common";

import { Nft } from "../../graphql.schema";

@Injectable()
export class NftsService {
  async findOneById(id: string): Promise<Nft> {
    return {} as any;
  }

  async findAll(): Promise<Nft[]> {
    return [] as Nft[];
  }
}
