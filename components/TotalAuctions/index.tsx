import Link from "next/link";
import useEnrichedAssetsData from "../../hooks/useEnrichedAssetsData";
import { NFT } from "../../types";
import Asset from "../Asset";
import AssetOnSale from "../AssetOnSale";
import styles from "./TotalAuctions.module.scss";

const TotalAuctions: React.FC<{
    assets: NFT[];
    link?: string;
}> = ({ assets, link }) => {
    const enrichedAssets = useEnrichedAssetsData(assets);
    
    return (
        <main className={styles.auctions}>
            {/* <div className={styles.headline}>
                <div className={styles.title}>
                    <img alt="Live Auctions" src="/images/Auctions.png" />
                </div>
                <div className={styles.divider}>
                    <hr />
                </div>
                <div className={styles.rightLink}>
                    {link && <Link href={link}>View All</Link>}
                </div>
            </div> */}
            <div className={styles.auctionsContainer}>
                {enrichedAssets.map(
                    ({
                        description,
                        imageUrl,
                        name,
                        slug,
                        reserve,
                        artist,
                        onSale,
                        file,
                        sold,
                        soldFor,
                        address,
                        tokenId,
                        salesOrder,
                        currentBid,
                        iconUrl,
                        iconURLSold
                    }) => (
                        <>
                        {!soldFor &&
                            <AssetOnSale
                                address={address}
                                tokenId={tokenId}
                                onSale={onSale}
                                artist={artist?.name}
                                key={name}
                                sold={sold}
                                soldFor={soldFor}
                                slug={slug}
                                description={description}
                                imageUrl={imageUrl}
                                name={name}
                                reserve={reserve}
                                file={file}
                                salesOrder={salesOrder}
                                currentBid={currentBid}
                                iconUrl={iconUrl}
                                iconURLSold={iconURLSold}
                            />
                        }
                        {soldFor &&
                            <Asset
                                onSale={onSale}
                                artist={artist?.name}
                                key={name}
                                sold={sold}
                                soldFor={soldFor}
                                slug={slug}
                                description={description}
                                imageUrl={imageUrl}
                                name={name}
                                reserve={reserve}
                                file={file}
                                iconUrl={iconUrl}
                                iconURLSold={iconURLSold}
                            />
                        }
                        </>
                    ),
                )}
            </div>
        </main>
    );
};

export default TotalAuctions;