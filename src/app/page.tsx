import React, { Suspense } from "react";

import { ApolloProvider } from "@/components/ApolloProvider";
import NftStore from "@/components/NftStore";
import { PreloadQuery } from "@/lib/apollo-client-server";
import { listNftsQuery } from "@/lib/nft-queries";

const Home: React.FC = async () => {
  // const query = await listNftsQuery();

  return (
    // <PreloadQuery query={query}>
    //   <Suspense fallback={<>loading</>}>
    <ApolloProvider>
      <NftStore />
    </ApolloProvider>
    //   </Suspense>
    // </PreloadQuery>
  );
};

export default Home;
