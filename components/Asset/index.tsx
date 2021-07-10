import { utils } from "ethers";
import Link from "next/link";
import { NFTFile, OrderFromAPI } from "../../types";
import VideoPlayer from "../VideoPlayer";
import styles from "./Asset.module.scss";

import moment from "moment";
import Countdown from "../Countdown";



const Asset: React.FC<{
    description: string;
    imageUrl: string;
    name: string;
    slug: string;
    reserve: string;
    artist?: string;
    onSale?: boolean;
    file?: NFTFile;
    sold?: boolean;
    soldFor: string;
    salesOrder?: OrderFromAPI;

}> = ({
    imageUrl,
    name,
    slug,
    reserve,
    artist,
    onSale,
    file,
    sold,
    soldFor,
    salesOrder,
}) => (
    <Link href={`/asset/${slug}`}>
        <a>
            <div className={styles.asset}>
                <div className={styles.imageContainer}>
                    {file && file.type === "video" && file.link && (
                        <VideoPlayer playbackId={file.link} display />
                    )}
                    {!(file && file.type === "video" && file.link) && (
                        <img src={imageUrl} alt={name} />
                    )}
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <h2>{artist}</h2>
                        <h3>{name}</h3>
                    </div>

                    <div className={styles.ends}>
                            <h3>Auction Ends at</h3>
                            <p>
                                {salesOrder?.closing_date && onSale ? (
                                    <Countdown
                                        date={moment(
                                            `${salesOrder?.closing_date}Z`,
                                        ).valueOf()}
                                    />
                                ) : (
                                    "---"
                                )}
                            </p>
                        </div>

                    <div className={styles.footer}>
                        {onSale && !sold && (
                            <div>
                                <button>Bid Now</button>
                            </div>
                        )}

                        {sold && soldFor && (
                            <div>
                                <h4>Sold for</h4>{" "}
                                <h3>{soldFor}</h3>
                            </div>
                        )}

                        {reserve && !sold && (
                            <div>
                                <h4>Reserve price:</h4> <h3>{reserve} ETH</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </a>
    </Link>
);

export default Asset;
