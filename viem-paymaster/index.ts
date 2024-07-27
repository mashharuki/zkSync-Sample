import * as dotenv from "dotenv";
import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {zkSyncSepoliaTestnet} from "viem/chains";
import {eip712WalletActions, getGeneralPaymasterInput} from "viem/zksync";

dotenv.config();

const {PRIV_KEY} = process.env;

/**
 * main script
 */
const main = async () => {
  console.log(
    `============================================== [START] ==============================================`
  );

  // create account
  const account: any = privateKeyToAccount(`0x${PRIV_KEY}`);

  // Initialize the Viem client
  const client = createWalletClient({
    account,
    chain: zkSyncSepoliaTestnet,
    transport: http(),
  }).extend(eip712WalletActions());

  const paymasterParams = utils.getPaymasterParams(
    "0x5605861a1B057394026640f048c22B3763837E03",
    {innerInput: new Uint8Array()}
  );

  // Send a transaction
  const tx = await client.sendTransaction({
    account: "0xf635736bab5f3b2d6c01304192Da098a760770E2",
    to: "0xFac041BCF2c4b43319c2C0a39ABA53F4CbE44Fe5",
    value: 5000000000000000n,
    paymaster: "0x5605861a1B057394026640f048c22B3763837E03",
    paymasterInput: getGeneralPaymasterInput({innerInput: new Uint8Array()}),
  });

  console.log(`Transaction hash: ${tx}`);

  console.log(
    `============================================== [END] ==============================================`
  );
};

main();
