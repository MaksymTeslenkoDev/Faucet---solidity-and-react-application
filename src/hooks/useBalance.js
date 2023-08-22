import { useState, useEffect } from "react";

export function useBalance(web3, contract) {
  const [balance, setBallance] = useState(null);
  const loadBalance = async () => {
    if (!contract || !web3) return null;
    const balance = await web3.eth.getBalance(contract.address);
    setBallance(web3.utils.fromWei(balance, "ether"));
  };

  useEffect(() => {
    loadBalance();
  }, [web3, contract]);

  return {
    balance,
    loadBalance,
  };
}
