import Moralis from "moralis-v1";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {
  const {
    enableWeb3,
    deactivateWeb3,
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();

  //automatically on load
  //twice because strict mode is enabled
  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);
  //no dependency : every time smth re-renders -> CAREFULL -> CIRCULAR RENDER
  //empty dependency array: ONLY ONCE
  //dependency array: any time one of the dependencies change

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(account);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          disabled={isWeb3EnableLoading}
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
}
