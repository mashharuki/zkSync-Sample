import {
  utils,
  Wallet,
  Provider,
  Contract,
  EIP712Signer,
  types,
} from "zksync-ethers";
import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();

// load the values into .env file after deploying the FactoryAccount
const DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY =
  process.env.DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY || "";
const ETH_ADDRESS =
  process.env.ETH_ADDRESS || "0x000000000000000000000000000000000000800A";

task("setLimit", "set limit").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {Account},
    } = loadDeployedContractAddresses(hre.network.name);

    // @ts-ignore target zkSyncSepoliaTestnet in config file which can be testnet or local
    const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);

    const owner = new Wallet(DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY, provider);

    const accountArtifact = await hre.artifacts.readArtifact("Account");
    const account = new Contract(Account, accountArtifact.abi, owner);

    let setLimitTx = await account.setSpendingLimit.populateTransaction(
      ETH_ADDRESS,
      ethers.parseEther("0.0005")
    );
    // create tx data
    setLimitTx = {
      ...setLimitTx,
      from: Account,
      chainId: (await provider.getNetwork()).chainId,
      nonce: await provider.getTransactionCount(Account),
      type: 113,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      } as types.Eip712Meta,
      value: BigInt(0),
    };

    setLimitTx.gasPrice = await provider.getGasPrice();
    setLimitTx.gasLimit = await provider.estimateGas(setLimitTx);

    const signedTxHash = EIP712Signer.getSignedDigest(setLimitTx);

    const signature = ethers.concat([
      ethers.Signature.from(owner.signingKey.sign(signedTxHash)).serialized,
    ]);

    setLimitTx.customData = {
      ...setLimitTx.customData,
      customSignature: signature,
    };

    console.log("Setting limit for account...");
    // send tx
    const sentTx = await provider.broadcastTransaction(
      types.Transaction.from(setLimitTx).serialized
    );

    await sentTx.wait();

    const limit = await account.limits(ETH_ADDRESS);

    console.log("Account limit enabled?: ", limit.isEnabled);
    console.log("Account limit: ", limit.limit.toString());
    console.log("Available limit today: ", limit.available.toString());
    console.log("Time to reset limit: ", limit.resetTime.toString());
  }
);
