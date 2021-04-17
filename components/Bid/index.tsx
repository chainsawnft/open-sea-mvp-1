import { utils } from "ethers";
import moment from "moment";
import React from "react";
import { useProfiles } from "../../context/SiteProfilesContext";
import { OrderFromAPI, Profile } from "../../types";
import styles from "./Bid.module.scss";

/**
 * Given address and list of profiles, return username
 * @param address
 * @param profiles
 * @returns
 */
const getUserName = (address: string, profiles: Profile[]): string => {
    const found = profiles.find(
        (el) => el.address.toLowerCase() === address.toLowerCase(),
    );
    return found ? found.username : String(address).substring(0, 6);
};

const Bid: React.FC<{ buyOrder: OrderFromAPI }> = ({ buyOrder }) => {
    const date = moment(
        Number(buyOrder.listing_time.toString()) * 1000,
    ).toISOString();
    const profiles = useProfiles();
    return (
        <div className={styles.bid}>
            <div>
                <p className={styles.bidder}>
                    Bid Placed by{" "}
                    {getUserName(buyOrder.maker.address, profiles)}
                </p>
                <p className={styles.date}>at {date}</p>
            </div>

            <p className={styles.price}>
                {utils.formatEther(buyOrder.base_price.toString())} ETH
            </p>
        </div>
    );
};

const LastSale: React.FC<{}> = ({ asset })=>{
    const date = new Date(
        asset.last_sale.event_timestamp
    ).toISOString();
    const profiles = useProfiles();
    return (
        <div className={styles.bid}>
            <div>
                <p className={styles.bidder}>
                    Bid Placed by{" "}
                    {getUserName(asset.final_sale.transaction.to_account.address, profiles)}
                </p>
                <p className={styles.date}>at {date}</p>
            </div>

            <p className={styles.price}>
                {utils.formatEther(asset.last_sale.total_price.toString())} ETH
            </p>
        </div>
    )
}


export default Bid;
export {
    LastSale
}