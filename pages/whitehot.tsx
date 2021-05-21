import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import {
    API_URL,
    WHITEHOT_TOKENS_QUERY,
    SOLD_TOKENS_IN_HOME,
    SOLD_TOKENS_QUERY,
    WHITEHOT_TOKENS_IN_HOME,
    UPCOMING_TOKENS_QUERY,
    UPCOMING_TOKENS_IN_HOME,
} from "../utils/constants";
import { NFT, Slide } from "../types";
import Auctions from "../components/Auctions";
import ActiveAuctions from "../components/ActiveAuctions";
import Slider from "../components/Slider";
import HeadWithImage from "../components/HeadWithImage";
// index page start
export const Home: React.FC<{
    assets: NFT[];
}> = ({ assets }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeadWithImage />
            {/* <Slider slides={slides} /> */}
            <div className={styles.centerItem}>
                <h2>Lorem Ipsum</h2>
            </div>
            {(assets?.length > 0) && (
                <Auctions assets={assets} title="Lorem Ipsum" link="/whitehot/0" />
            )}
            {/* {upcoming?.length > 0 && (
                <Auctions
                    assets={upcoming}
                    title="Upcoming"
                    link="/upcoming/0"
                />
            )} */}
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    /** Get tokens with auctions */
    const whtieTokenRes = await fetch(
        `${API_URL}/tokens?_limit=${WHITEHOT_TOKENS_IN_HOME}&${WHITEHOT_TOKENS_QUERY}`,
    );
    const whiteTokens = await whtieTokenRes.json();
    
    /** Get tokens not on sale and not sold */
    // const upcomingTokensRes = await fetch(
    //     `${API_URL}/tokens?_limit=${UPCOMING_TOKENS_IN_HOME}&${UPCOMING_TOKENS_QUERY}`,
    // );
    // const upcoming = await upcomingTokensRes.json();

    /** Get slides */
    // let slides = [];
    // try {
    //     const slidesRes = await fetch(`${API_URL}/slider`);
    //     const sliderData = await slidesRes.json();
    //     slides = sliderData.slides as Slide[];
    // } catch (err) {
    //     console.log("Exception in loading slides, defaulting to empty list");
    // }

    return {
        props: {
            assets: whiteTokens
        },
    };
}