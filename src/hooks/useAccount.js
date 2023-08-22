import { useEffect, useState } from "react";

export function useAccount(web3, provider) {
  const getAccount = async () => {
    if (!web3) return;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const [account, setAccount] = useState(null);

  useEffect(() => {
    getAccount();
  }, [web3]);

  function handleAccountsChanged(accounts) {
    if (accounts.length && accounts[0]) {
      setAccount(accounts[0]);
      return;
    }
    setAccount(null);
  }

  useEffect(() => {
    if (!provider) return;
    provider.on("accountsChanged", handleAccountsChanged);
    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", () => window.location.reload());
    };
  }, [provider]);

  return {
    account,
  };
}
