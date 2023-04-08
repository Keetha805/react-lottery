import ManualHeader from "@/components/ManualHeader"
import Head from "next/head"
import Header from "@/components/Header"
import React from "react"

import LotteryEntrance from "@/components/LotteryEntrance"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our SC Lottery"></meta>
        <link rel="icon" ref="/favicon.ico"></link>
      </Head>
      {/* <ManualHeader></ManualHeader> */}
      <Header></Header>
      <LotteryEntrance></LotteryEntrance>
    </div>
  )
}
