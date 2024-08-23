
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract nfts(slug: string, limit?: Nullable<number>, pageToken?: Nullable<string>): NftCollection | Promise<NftCollection>;

    abstract nft(id: string): Nullable<Nft> | Promise<Nullable<Nft>>;
}

export class Nft {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    openSeaUrl: string;
}

export class NftCollection {
    items: Nft[];
    nextPageToken: string;
}

type Nullable<T> = T | null;
