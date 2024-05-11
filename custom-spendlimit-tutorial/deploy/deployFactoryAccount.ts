import {utils, Wallet, Provider} from "zksync-ethers";
import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import {writeContractAddress} from "../helper/contractsJsonHelper";

// load env file
import dotenv from "dotenv";
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

export default async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore target zkSyncSepoliaTestnet in config file which can be testnet or local
  const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);
  const factoryArtifact = await deployer.loadArtifact("AAFactory");
  const aaArtifact = await deployer.loadArtifact("Account");
  // deploy factory contract
  const factory = await deployer.deploy(
    factoryArtifact,
    [utils.hashBytecode(aaArtifact.bytecode)],
    undefined,
    [aaArtifact.bytecode]
  );
  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);

  const aaFactory = new ethers.Contract(
    factoryAddress,
    factoryArtifact.abi,
    wallet
  );

  const owner = Wallet.createRandom();
  console.log("SC Account owner pk: ", owner.privateKey);

  const salt = ethers.ZeroHash;
  // deploy AA Acount Contract
  const tx = await aaFactory.deployAccount(salt, owner.address);
  await tx.wait();

  const abiCoder = new ethers.AbiCoder();
  // create address
  const accountAddress = utils.create2Address(
    factoryAddress,
    await aaFactory.aaBytecodeHash(),
    salt,
    abiCoder.encode(["address"], [owner.address])
  );

  console.log(`SC Account deployed on address ${accountAddress}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "AAFactory",
    value: aaFactory.target as any,
    network: hre.network.name,
  });

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Account",
    value: accountAddress,
    network: hre.network.name,
  });

  console.log("Funding smart contract account with some ETH");
  // send eth
  await (
    await wallet.sendTransaction({
      to: accountAddress,
      value: ethers.parseEther("0.0002"),
    })
  ).wait();
  console.log(`Done!`);
}
