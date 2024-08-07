export const PORTAL_KEEPER_ABI = [
  {inputs: [], stateMutability: "nonpayable", type: "constructor"},
  {
    inputs: [
      {internalType: "address", name: "zkSyncAddress", type: "address"},
      {internalType: "address", name: "adventureRealm", type: "address"},
      {internalType: "address", name: "adventurer", type: "address"},
      {internalType: "uint256", name: "gasLimit", type: "uint256"},
      {
        internalType: "uint256",
        name: "gasPerPubdataByteLimit",
        type: "uint256",
      },
    ],
    name: "activatePortal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
