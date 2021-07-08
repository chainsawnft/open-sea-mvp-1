import { useCallback, useEffect, useState } from "react";

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

            // get all withdrawn bids so we can match them against the bids
            const withdrawn = data.asset_events.filter((event)=>{
                if(event.event_type === "bid_withdrawn"){
                    return true;
                }
                return false;
            })

            const filtered_data = {
                asset_events: data.asset_events.filter((event)=>{
                    // if the event matches to a withdrawn bid, return false
                    if(withdrawn.some((w_event)=>{
                        // the accounts need to be the same
                        if(event.from_account.address !== w_event.from_account.address){
                            return false
                        }
                        // the bid amount needs to be the same as the total price withdrawn
                        if(event.bid_amount !== w_event.total_price){
                            return false;
                        }
                        return true;
                    })){
                        return false
                    }

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
