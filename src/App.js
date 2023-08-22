import { Error } from "./Error";
import { Loading } from "./Loading";

import "./App.css";
import { useApp } from "./hooks/useApp";
// npm install --save react-scripts@4.0.3
function App() {
  const { web3Api, balance, account, addFunds, withdraw } = useApp();

  const renderAccountRow = () => {
    if (account) {
      return (
        <div className="is-flex is-align-items-center">
          <span>
            <strong className="mr-2">Account: </strong>
          </span>
          <div>{account}</div>
        </div>
      );
    }

    return (
      <div className="is-flex is-align-items-center">
        <span>
          <strong className="mr-2">Account: </strong>
        </span>
        <button
          className="button is-small"
          onClick={() =>
            web3Api.provider.request({ method: "eth_requestAccounts" })
          }
        >
          Connect Wallet
        </button>
      </div>
    );
  };

  if (web3Api.status === "loading") {
    return <Loading />;
  }

  if (
    web3Api.status === "error" &&
    web3Api.error.message &&
    web3Api.error.type
  ) {
    return <Error message={web3Api.error.message} type={web3Api.error.type} />;
  }

  return (
    <div className="faucet-wrapper">
      {web3Api.status === "loading"}
      <div className="faucet">
        {renderAccountRow()}
        <div className="balance-view is-size-2 my-4">
          Current Balance: <strong>{balance}</strong> ETH
        </div>
        <button
          className="button is-link mr-2"
          onClick={addFunds}
          disabled={!account}
        >
          Donate 1 eth
        </button>
        <button
          className="button is-primary"
          onClick={withdraw}
          disabled={!account}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default App;
