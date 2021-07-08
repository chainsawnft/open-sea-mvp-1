import { AssetFromAPI } from "../../types";
import Bid from "../Bid";

import styles from "./Orders.module.scss";
import getBidHistory from "../../hooks/getBidHistory";

const Orders: React.FC<{
    asset: AssetFromAPI;
}> = ({ asset }) => {
    var address = (asset)? asset.asset_contract.address:"";
    var token_id = (asset)?asset.token_id:"";

    const { bidHistory: assetData, fetchAsset } = getBidHistory(
        address,
        token_id,
    );

    console.log("Orders-assetData:", assetData);
    
    var bid_list = assetData?assetData.asset_events:[];
    if(bid_list == undefined)
        bid_list = [];
    var bid_array_list = [];
    for(var bid in bid_list){
        // if(bid_list[bid].from_account.user){
            bid_array_list.push(bid_list[bid]);
        // }
    }
    return (
        <div className={styles.orders}>
            <div className={styles.ordersSection}>
                <h2>History</h2>
                {bid_array_list.map((bid_array_list) => (
                    <Bid key={bid_array_list.order_hash} buyOrder={bid_array_list} />
                ))}
                {!bid_array_list.length && <p>No orders yet</p>}
            </div>
        </div>
    );
};

export default Orders;
