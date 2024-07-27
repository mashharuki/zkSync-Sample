import {HardhatRuntimeEnvironment} from "hardhat/types";
import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {zkSyncSepoliaTestnet} from "viem/chains";
import {eip712WalletActions} from "viem/zksync";
import {utils} from "zksync-ethers";
import {getProvider} from "./../deploy/utils";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();

const {WALLET_PRIVATE_KEY} = process.env;

task("sendETH", "send ETH by using paymaster").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const provider = getProvider(hre);
    // create account
    const account: any = privateKeyToAccount(`0x${WALLET_PRIVATE_KEY}`);

    // Initialize the Viem client
    const client = createWalletClient({
      account,
      chain: zkSyncSepoliaTestnet,
      transport: http(),
    }).extend(eip712WalletActions());

    const blockNumber = await provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);

    let paymasterBalance = await provider.getBalance(
      "0x5605861a1B057394026640f048c22B3763837E03"
    );
    console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);

    // Encoding the "ApprovalBased" paymaster flow's input
    const paymasterParams = utils.getPaymasterParams(
      "0x5605861a1B057394026640f048c22B3763837E03",
      {
        type: "General",
        innerInput: new Uint8Array(),
      }
    );

    // Send a transaction
    const tx = await client.sendTransaction({
      account: "0xf635736bab5f3b2d6c01304192Da098a760770E2",
      to: "0xFac041BCF2c4b43319c2C0a39ABA53F4CbE44Fe5",
      value: 5000000000000000n,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    });

    console.log(`Transaction hash: ${tx}`);
  }
);
