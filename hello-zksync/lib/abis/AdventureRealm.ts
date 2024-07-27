export const ADVERNTURE_REALM_ABI = [
  {
    inputs: [{internalType: "address", name: "_portalKeeper", type: "address"}],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "adventurer",
        type: "address",
      },
      {indexed: false, internalType: "uint256", name: "nftId", type: "uint256"},
    ],
    name: "RealmUnlocked",
    type: "event",
  },
  {
    inputs: [],
    name: "getGatedNFTContract",
    outputs: [{internalType: "address", name: "", type: "address"}],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{internalType: "address", name: "", type: "address"}],
    name: "hasAccess",
    outputs: [{internalType: "bool", name: "", type: "bool"}],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{internalType: "address", name: "", type: "address"}],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "portalKeeper",
    outputs: [{internalType: "address", name: "", type: "address"}],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_zkquestPassNFTContract",
        type: "address",
      },
    ],
    name: "setGatedNFTContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{internalType: "address", name: "newOwner", type: "address"}],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{internalType: "address", name: "_adventurer", type: "address"}],
    name: "unlockRealm",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "zkquestPassNFTContract",
    outputs: [
      {internalType: "contract ZKQuestPass", name: "", type: "address"},
    ],
    stateMutability: "view",
    type: "function",
  },
];
