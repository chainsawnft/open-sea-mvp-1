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

            const withdrawn = data.asset_events.filter((event)=>{
                if(event.event_type === "bid_withdrawn"){
                    return true;
                }
                return false;
            })

            const filtered_data = {
                asset_events: data.asset_events.filter((event)=>{
                    if(withdrawn.some((w_event)=>{
                        if(event.from_account.address !== w_event.from_account.address){
                            return false
                        }
                        if(event.bid_amount !== w_event.total_price){
                            return false;
                        }
                        return true;
                    })){
                        return false
                    }

                    if(event.event_type === "offer_entered"){
                        return true;
                    }
                    if(event.event_type === "bid_entered"){
                        return true;
                    }
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
