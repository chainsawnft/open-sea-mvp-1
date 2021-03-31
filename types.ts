/* eslint-disable camelcase */
import { OpenSeaAsset, Order } from "opensea-js/lib/types";

declare global {
    interface Window {
        ethereum?: any;
    }
}

/** OpenSEA API is better than SDK hence we use API */
export interface OrderFromAPI {
    order_hash: string;
    side: number; // 0 for buy 1 for sell
    closing_date: string; // String representing closing time (not sure of timezone)
    listing_time: number; // Multiply by 1000 to get closing time in milliseconds
    base_price: string; // String in wei of price
    maker: {
        address: string;
    };
}

export interface AssetFromAPI {
    top_ownerships: {
        owner: {
            address;
        };
    }[];
    orders: OrderFromAPI[];
    last_sale: {
        total_price: string;
    };
    image_url: string;
    name: string;
}

export type BuyOrder = Order;

export type SellOrder = Order;

/**
 * Interface for an NFT retrieved from seaport.api.getAsset
 */

export interface NFTFile {
    type: "video" | "pdf" | null;
    link: "string";
}
export interface NFT extends OpenSeaAsset {
    description: string;
    imageUrl: string;
    name: string;
    address: string;
    tokenId: string;

    slug: string;
    reserve: string;

    artist: {
        id: string;
        name: string;
        slug: string;
        imageUrl: string;
    };

    soldFor: string;
    onSale: boolean;

    extraTitle: string;
    extraContent: string;

    file?: NFTFile;

    priority: number; // The higher the top most token
    buttonMessage: string; // Button to show when product not available
}

/** STRAPI INTERFACES */
export interface Slide {
    imageUrl: string;
    url: string;
}
/**
 * Model definition for collection
 */
export interface Collection {
    id: string;
    name?: string;
    imageUrl?: string;
    artist?: Artist;
    assets: any[];
    slug?: string;
}

/**
 * Model definition for artist
 */
export interface Artist {
    id: string;
    name?: string;
    slug?: string;
    imageUrl?: string;
    collections: Collection[];
    description?: string;
    tokens: NFT[];

    extraTitle?: string;
    extraContent?: string;

    websiteUrl: string;
    instagramUrl: string;
    twitterUrl: string;
}

/**
 * Model definition for profile
 */
export interface Profile {
    id: string;
    user?: any;
    username?: string;
    address?: string;
}
