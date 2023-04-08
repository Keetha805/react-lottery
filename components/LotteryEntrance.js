import { abi, contractAddress } from "@/constants"
import { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"

import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayers, setNumPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0x")
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const raffleAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null

  const dispatch = useNotification()

  const {
    runContractFunction: enterRaffle,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getEntranceFee",
    params: {},
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getRecentWinner",
    params: {},
  })

  const handleSuccess = async function (tx) {
    await tx.wait(1)
    handleNewNot()
    updateUI()
  }

  const handleNewNot = () => {
    dispatch({
      type: "info",
      message: "Txn Completed!",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    })
  }

  async function updateUI() {
    const entrance_fee = (await getEntranceFee()).toString()
    const num_players = (await getNumberOfPlayers()).toString()
    const recent_winner = (await getRecentWinner()).toString()
    setEntranceFee(entrance_fee)
    setRecentWinner(recent_winner)
    setNumPlayers(num_players)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <div>
      {raffleAddress ? (
        <div>
          <div>{entranceFee}</div>
          <button
            onClick={async () => {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (err) => console.log(err),
              })
            }}
            disabled={isLoading || isFetching}
          >
            {isFetching || isLoading ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              <div>Enter Raffle</div>
            )}
          </button>
          Entrance Fee: {ethers.formatEther(entranceFee)} <br></br>
          Num Players: {numPlayers}
          <br></br>
          Recent Winner: {recentWinner}
          <br></br>
        </div>
      ) : (
        <div>No Raffle address</div>
      )}
    </div>
  )
}
