import { useCallback, useEffect, useState } from "react";
import { utils } from "ethers";

console.log(utils);


const getBidHistory = (address: string, tokenId: string) => {
    const [bidHistory, setAsset] = useState(null);
    const fetchAsset = useCallback(async () => {
        try {
            const res = await fetch(
                /*
                Old HTTP get. It retrieves only bid_entered events
                `https://api.opensea.io/api/v1/events?asset_contract_address=${address}&token_id=${tokenId}&event_type=bid_entered&only_opensea=true`,
                */

                // Retrieves all event_types
                `https://api.opensea.io/api/v1/events?asset_contract_address=${address}&token_id=${tokenId}&only_opensea=true`,
                {
                    headers: {
                        "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_KEY,
                    },
                },
            );
            const data = await res.json();

            console.log("get-data:", data);

            const withdrawn = [];
            var startingPrice = void 0

            // get all withdrawn bids so we can match them against the bids
            const asset_events = data.asset_events.filter((event) => {
                if(event.event_type === "bid_withdrawn"){
                    withdrawn.push(event);
                    return false
                }
                if(event.event_type === "created"){
//                    startingPrice = utils.bigNumberify(event.starting_price);
                    return false
                }
                return true
            });

            console.log("withdrawn-data", withdrawn)

            const filtered_data = {
                asset_events: asset_events.filter((event)=>{
                    // if the event matches to a withdrawn bid, return false
                    if(withdrawn.some((w_event)=>{
                        // the accounts need to be the same
                        if(event.from_account.address !== w_event.from_account.address){
                            return false
                        }
                        console.log("withdrawn address same");
                        // the bid amount needs to be the same as the total price withdrawn
                        if(event.bid_amount !== w_event.total_price){
                            return false;
                        }

                        // if withdrawn event already has been used, return false
                        if(w_event.matched){
                            return false
                        }
                        // mark the withdrawn event as been used
                        w_event.matched = true;
                        console.log("bidamount the same");
                        return true;
                    })){
                        console.log("event withdrawn")
                        return false
                    }

                    /*
                    // if the bid amount is less than starting price, remove item
                    if(startingPrice.gt(event.bid_amount)){
                        console.log("starting price is greater than bid amount")
                        return false
                    }
                    */

                    // if the event is offered entered, return true
                    if(event.event_type === "offer_entered"){
                        return true;
                    }
                    // if the bid entered, return true
                    if(event.event_type === "bid_entered"){
                        return true;
                    }

                    // otherwise return false
                    return false;
                })
            };

            console.log("filtered-data:", filtered_data);

            setAsset(filtered_data);
        } catch (err) {
            console.log("Exception in fetch asset", err);
        }
    }, [address, tokenId]);

    useEffect(() => {
        fetchAsset();
    }, [fetchAsset]);

    return { bidHistory, fetchAsset };
};

export default getBidHistory;
