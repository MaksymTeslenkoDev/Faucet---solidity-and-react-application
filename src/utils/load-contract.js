import contract from "@truffle/contract";

export const loadContract = async (name, provider) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  const _contract = contract(Artifact);
  _contract.setProvider(provider);
  try {
    let deployedContract = await _contract.deployed();
    return deployedContract;
  } catch {
    return null;
  }
};
