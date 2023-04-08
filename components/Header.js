import { ConnectButton } from "web3uikit"

export default function Header() {
  return (
    <div className="p-5 flex flex-row border-b-2">
      <h1 className="">Decentralized Lottery</h1>
      <ConnectButton></ConnectButton>
    </div>
  )
}
