import { utils } from "ethers";

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Max ETH we always keep for withdrawals
export const MAX_ETH = utils.parseEther("0.014");

// Always keep these below 50 to ensure OpenSea Api can handle the requests
export const TOKENS_IN_HOME = 40;
export const SOLD_TOKENS_IN_HOME = 18;
export const UPCOMING_TOKENS_IN_HOME = 8;
export const WHITEHOT_TOKENS_IN_HOME = 16;
export const CRYPTOPUNK_TOKENS_IN_HOME = 16;
export const AMALGAM_TOKENS_IN_HOME = 16;

export const TOKENS_PER_PAGE = 40;
export const ARTISTS_PER_PAGE = 40;

export const UPCOMING_TOKENS_QUERY = "onSale=false&sold=false&_sort=priority:DESC";
export const AVAILABLE_TOKENS_QUERY = "onSale=true&sold=false&_sort=priority:DESC";
export const SOLD_TOKENS_QUERY = "sold=true&_sort=priority:DESC";
export const WHITEHOT_TOKENS_QUERY = "whitehot=true&_sort=priority:DESC";
export const CRYPTOPUNK_TOKENS_QUERY = "cryptopunk3100=true&_sort=priority:DESC";
export const AMALGAM_TOKENS_QUERY = "amalgamation=true&_sort=priority:DESC";

export const WHITEHOT_TEXT_TITLE = "Whitehot Magazine NFT Auction";
export const WHITEHOT_TEXT_OWNER = "Curated by Noah Becker";

export const CRYPTOPUNK_TEXT_TITLE = "CRYPTOPUNK Magazine NFT Auction";
export const CRYPTOPUNK_TEXT_OWNER = "Curated by Noah Becker";

export const AMALGAM_TEXT_TITLE = "AMALGAM Magazine NFT Auction";
export const AMALGAM_TEXT_OWNER = "Curated by Noah Becker";