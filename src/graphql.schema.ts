
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract nfts(): Nft[] | Promise<Nft[]>;

    abstract nft(id: string): Nullable<Nft> | Promise<Nullable<Nft>>;
}

export class Nft {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
}

type Nullable<T> = T | null;
