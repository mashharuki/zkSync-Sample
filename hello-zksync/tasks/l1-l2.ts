import {Contract, Interface, Wallet} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Provider, utils} from "zksync-ethers";
import {ADVERNTURE_REALM_ABI} from "./../lib/abis/AdventureRealm";
import {PORTAL_KEEPER_ABI} from "./../lib/abis/PortalKeeper";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();

// load the values into .env file after deploying the FactoryAccount
const DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

/**
 * call L2 function from L1
 */
task("l1-l2", "call L2 function from L1").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // Initialize the wallet.
    const wallet = new Wallet(DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY);

    // L1 Contract Info
    const L1_CONTRACT_ABI = PORTAL_KEEPER_ABI;
    const L1_CONTRACT_ADDRESS = "0xcbC68F766d95189e2208DAbADaA9571C4B5F28C8";
    // L2 Contract Info
    const L2_CONTRACT_ABI = ADVERNTURE_REALM_ABI;
    const L2_CONTRACT_ADDRESS = "0x1C1C57FC80696BB19227a8CFe92132ff8CF4f377";

    // Enter your Ethereum L1 provider RPC URL.
    const l1Provider = new Provider("https://rpc.ankr.com/eth_sepolia");
    // Set a constant that accesses the Layer 1 contract.
    const govcontract = new Contract(
      L1_CONTRACT_ADDRESS,
      L1_CONTRACT_ABI,
      wallet
    );
    // Initialize the L2 provider.
    const l2Provider = new Provider("https://sepolia.era.zksync.dev");
    // Get the current address of the ZKsync L1 bridge.
    const zkSyncAddress = await l2Provider.getMainContractAddress();
    // Get the `Contract` object of the ZKsync bridge.
    const zkSyncContract = new Contract(
      zkSyncAddress,
      utils.ZKSYNC_MAIN_ABI,
      wallet
    );

    // encode the L2 Contract function call
    const counterInterface = new Interface(L2_CONTRACT_ABI);
    const data = counterInterface.encodeFunctionData("unlockRealm", [
      "0xf635736bab5f3b2d6c01304192Da098a760770E2",
    ]);

    // L1 get gas price
    const gasPrice = await l1Provider.getGasPrice();
    // get gas limit
    const gasLimit = await l2Provider.estimateL1ToL2Execute({
      contractAddress: L2_CONTRACT_ADDRESS,
      calldata: data,
      caller: utils.applyL1ToL2Alias(L1_CONTRACT_ADDRESS),
    });
    // get base cost
    const baseCost = await zkSyncContract.l2TransactionBaseCost(
      gasPrice,
      gasLimit,
      utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT
    );

    // call L2 from L1
    const tx = await govcontract.callZkSync(
      zkSyncAddress,
      L2_CONTRACT_ADDRESS,
      data,
      gasLimit,
      utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT,
      {
        // Pass the necessary ETH `value` to cover the fee for the operation
        value: baseCost,
        gasPrice,
      }
    );

    // Wait until the L1 tx is complete.
    await tx.wait();

    const l2Response = await l2Provider.getL2TransactionFromPriorityOp(tx);

    // Output the receipt of the L2 transaction corresponding to the call to the counter contract.
    const l2Receipt = await l2Response.wait();
    console.log("l2 Tx Receipt:", l2Receipt);
  }
);
