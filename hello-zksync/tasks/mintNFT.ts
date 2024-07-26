import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Contract, Provider, Wallet} from "zksync-ethers";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
import {
  abi,
  entries,
} from "../deployments-zk/zkSyncSepoliaTestnet/contracts/nft/MyNFT.sol/MyNFT.json";
dotenv.config();

// load the values into .env file after deploying the FactoryAccount
const DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

task("mintNFT", "mint NFT").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const nftAddress = entries[0].address;
    // @ts-ignore target zkSyncSepoliaTestnet in config file which can be testnet or local
    const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);

    const owner = new Wallet(DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY, provider);

    // get the contract
    const nftContract = new Contract(nftAddress, abi, owner);
    console.log("nftContract:", nftContract);
    // mint NFT
    const tx = await nftContract.mint(
      "0xc8efafb5F8cbB385b3A3fA20aC7e480F0638Aa87"
    );

    console.log("tx:", tx);
  }
);
