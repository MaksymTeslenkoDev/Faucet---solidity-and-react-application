export function Error({ message, type }) {
  const renderError = () => {
    if (type === "wallet") {
      return (
        <div className="notification is-danger is-size-3 is-rounded">
          {message}
          <a
            className="is-block"
            target="_blank"
            rel="noreferrer"
            href="https://docs.metamask.io"
          >
            Install Metamask
          </a>
        </div>
      );
    }
    return (
      <div className="notification is-danger is-size-3 is-rounded">
        {message}
      </div>
    );
  };
  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="is-flex is-align-items-center">{renderError()}</div>
      </div>
    </div>
  );
}
