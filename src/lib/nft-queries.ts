export async function listNftsQuery() {
  // @apollo/client cannot be imported directly
  const { gql } = await import("@apollo/client");

  return gql`
    query ListNfts {
      nfts(slug: "creatureworld") {
        items {
          id
          name
          description
          price
          imageUrl
          openSeaUrl
        }
        nextPageToken
      }
    }
  `;
}
