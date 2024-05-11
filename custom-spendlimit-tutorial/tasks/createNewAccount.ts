import {utils, Wallet, Provider, Contract} from "zksync-ethers";
import * as ethers from "ethers";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

task("createNewAccount", "create new Account contract").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {AAFactory},
    } = loadDeployedContractAddresses(hre.network.name);

    // @ts-ignore target zkSyncSepoliaTestnet in config file which can be testnet or local
    const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);
    const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);

    const factoryArtifact = await hre.artifacts.readArtifact("AAFactory");
    const aaFactory = new Contract(AAFactory, factoryArtifact.abi, wallet);

    const owner = Wallet.createRandom();
    console.log("SC Account owner pk: ", owner.privateKey);

    const salt = ethers.ZeroHash;
    // deploy AA Acount Contract
    const tx = await aaFactory.deployAccount(salt, owner.address);
    await tx.wait();

    const abiCoder = new ethers.AbiCoder();
    // create address
    const accountAddress = utils.create2Address(
      AAFactory,
      await aaFactory.aaBytecodeHash(),
      salt,
      abiCoder.encode(["address"], [owner.address])
    );

    console.log(`SC Account deployed on address ${accountAddress}`);
  }
);
