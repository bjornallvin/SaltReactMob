import type { NextPage } from "next";
import Head from "next/head";

import Auth from "../features/auth/Auth";
import Counter from "../features/counter/Counter";
import styles from "../styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth />
    </div>
  );
};

export default IndexPage;
