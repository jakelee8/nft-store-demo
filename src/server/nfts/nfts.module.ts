import { ethers } from "ethers";
import { OpenSeaSDK, Chain } from "opensea-js";
import { Module } from "@nestjs/common";

import { NftsResolver } from "./nfts.resolver";
import { NftsService } from "./nfts.service";

@Module({
  providers: [
    NftsResolver,
    NftsService,
    {
      provide: "OPENSEA_SDK",
      useFactory: () => {
        // This example provider won't let you make transactions, only read-only calls:
        const provider = new ethers.JsonRpcProvider(
          "https://mainnet.infura.io"
        );

        return new OpenSeaSDK(provider, {
          chain: Chain.Mainnet,
          apiKey: process.env.OPENSEA_API_KEY,
        });
      },
    },
  ],
})
export class NftsModule {}
