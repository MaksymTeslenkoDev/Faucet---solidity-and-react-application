import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../utils/load-contract";
import { useAccount } from "./useAccount";
import { useBalance } from "./useBalance";

export function useApp() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    status: "idle",
    // "loading" | "idle" | "error"
    error: { message: null, type: null },
    // "wallet"|"network"
  });

  const { account } = useAccount(web3Api.web3, web3Api.provider);
  const { balance, loadBalance } = useBalance(web3Api.web3, web3Api.contract);

  const chainChangedListener = (provider) => {
    provider.on("chainChanged", () => window.location.reload());
  };

  useEffect(() => {
    const loadProvider = async () => {
      setWeb3Api((state) => ({ ...state, status: "loading" }));
      const provider = await detectEthereumProvider();

      if (provider) {
        chainChangedListener(provider);
        const contract = await loadContract("Faucet", provider);

        if (!contract) {
          setWeb3Api((state) => ({
            ...state,
            status: "error",
            error: {
              message:
                "You are connected to the wrong network, please connect to the Ganache",
              type: "network",
            },
          }));
          return;
        }

        setWeb3Api((prevState) => ({
          ...prevState,
          web3: new Web3(provider),
          provider,
          contract,
          status: "idle",
          error: { message: null },
        }));
      } else {
        setWeb3Api((prevState) => ({
          ...prevState,
          web3: null,
          provider: null,
          contract: null,
          status: "error",
          error: {
            message: "Metamask isn't installed",
            type: "wallet",
          },
        }));
      }
    };
    loadProvider();
  }, []);

  const addFunds = async () => {
    const { contract, web3 } = web3Api;
    if (!contract || !web3) return;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    loadBalance();
  };

  const withdraw = async () => {
    const { contract, web3 } = web3Api;
    if (!contract || !web3) return;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account,
    });
    loadBalance();
  };

  return {
    web3Api,
    balance,
    account,
    addFunds,
    withdraw,
  };
}
