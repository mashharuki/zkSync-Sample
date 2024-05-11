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

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
dotenv.config();

// load the values into .env file after deploying the FactoryAccount
const DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY =
  process.env.DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY || "";
const ETH_ADDRESS =
  process.env.ETH_ADDRESS || "0x000000000000000000000000000000000000800A";
const RECEIVER_ACCOUNT = process.env.RECEIVER_ACCOUNT || "";

task("transferETH", "transferETH from Account").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {Account},
    } = loadDeployedContractAddresses(hre.network.name);
    // @ts-ignore target zkSyncSepoliaTestnet in config file which can be testnet or local
    const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);

    const owner = new Wallet(DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY, provider);

    // ⚠️ update this amount to test if the limit works; 0.00051 fails but 0.00049 succeeds
    const transferAmount = "0.00049";

    let ethTransferTx = {
      from: Account,
      to: RECEIVER_ACCOUNT, // account that will receive the ETH transfer
      chainId: (await provider.getNetwork()).chainId,
      nonce: await provider.getTransactionCount(Account),
      type: 113,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      } as types.Eip712Meta,
      value: ethers.parseEther(transferAmount),
      gasPrice: await provider.getGasPrice(),
      gasLimit: BigInt(20000000), // constant 20M since estimateGas() causes an error and this tx consumes more than 15M at most
      data: "0x",
    };
    // sign tx
    const signedTxHash = EIP712Signer.getSignedDigest(ethTransferTx);
    const signature = ethers.concat([
      ethers.Signature.from(owner.signingKey.sign(signedTxHash)).serialized,
    ]);

    ethTransferTx.customData = {
      ...ethTransferTx.customData,
      customSignature: signature,
    };

    const accountArtifact = await hre.artifacts.readArtifact("Account");

    // read account limits
    const account = new Contract(Account, accountArtifact.abi, owner);
    const limitData = await account.limits(ETH_ADDRESS);

    console.log("Account ETH limit is: ", limitData.limit.toString());
    console.log("Available today: ", limitData.available.toString());

    // L1 timestamp tends to be undefined in latest blocks. So it should find the latest L1 Batch first.
    let l1BatchRange = await provider.getL1BatchBlockRange(
      await provider.getL1BatchNumber()
    );
    let l1TimeStamp = (await provider.getBlock(l1BatchRange![1]))
      .l1BatchTimestamp;

    console.log("L1 timestamp: ", l1TimeStamp);
    console.log(
      "Limit will reset on timestamp: ",
      limitData.resetTime.toString()
    );

    // actually do the ETH transfer
    console.log("Sending ETH transfer from smart contract account");
    // send Transcation
    const sentTx = await provider.broadcastTransaction(
      types.Transaction.from(ethTransferTx).serialized
    );
    await sentTx.wait();
    console.log(`ETH transfer tx hash is ${sentTx.hash}`);

    console.log("Transfer completed and limits updated!");

    const newLimitData = await account.limits(ETH_ADDRESS);
    console.log("Account limit: ", newLimitData.limit.toString());
    console.log("Available today: ", newLimitData.available.toString());
    console.log(
      "Limit will reset on timestamp:",
      newLimitData.resetTime.toString()
    );

    if (newLimitData.resetTime.toString() == limitData.resetTime.toString()) {
      console.log("Reset time was not updated as not enough time has passed");
    } else {
      console.log("Limit timestamp was reset");
    }
    return;
  }
);
