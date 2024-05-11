# zkSync Hardhat project template

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## How to Use

- compile

  ```bash
  yarn compile
  ```

- setup

  ```bash
  yarn setup --network zkSyncSepoliaTestnet
  ```

- deployPaymaster

  ```bash
  yarn deployPaymaster  --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ yarn hardhat deploy-zksync --script deploy-paymaster.ts --network zkSyncSepoliaTestnet
  $ /Users/harukikondo/git/zkSync-Sample/custom-paymaster-tutorial/node_modules/.bin/hardhat deploy-zksync --script deploy-paymaster.ts --network zkSyncSepoliaTestnet

  Starting deployment process of "MyERC20"...
  Estimated deployment cost: 0.005333739939462546 ETH

  "MyERC20" was successfully deployed:

  - Contract address: 0x37885ac16113C4Ba172c13e2921d3cdD55B8FE99
  - Contract source: contracts/MyERC20.sol:MyERC20
  - Encoded constructor arguments: 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000074d79546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000

  Requesting contract verification...
  Your verification ID is: 12980
  Contract successfully verified on zkSync block explorer!

  Starting deployment process of "MyPaymaster"...
  Estimated deployment cost: 0.003104535204779398 ETH

  "MyPaymaster" was successfully deployed:

  - Contract address: 0x7BB1E399F58d1c6E809e309cABA70E339d68181F
  - Contract source: contracts/MyPaymaster.sol:MyPaymaster
  - Encoded constructor arguments: 0x00000000000000000000000037885ac16113c4ba172c13e2921d3cdd55b8fe99

  Requesting contract verification...
  Your verification ID is: 12981
  Contract successfully verified on zkSync block explorer!
  Funding paymaster with ETH...
  Paymaster ETH balance is now 30000000000000000
  Minted 3 tokens for the wallet
  Done!
  ```

  [MyPaymaster](https://sepolia.explorer.zksync.io/address/0x7BB1E399F58d1c6E809e309cABA70E339d68181F)

  [MyERC20](https://sepolia.explorer.zksync.io/address/0x37885ac16113C4Ba172c13e2921d3cdD55B8FE99)

- usePaymaster

  ```bash
  yarn usePaymaster --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ hardhat usePaymaster --network zkSyncSepoliaTestnet
  ERC20 token balance of the wallet before mint: 3
  Paymaster ETH balance is 30000000000000000
  Transaction fee estimation is :>>  2863942551682840
  Minting 5 tokens for the wallet via paymaster...
  Paymaster ERC20 token balance is now 1
  Paymaster ETH balance is now 29666432043991276
  ERC20 token balance of the the wallet after mint: 7
  ✨  Done in 6.91s.
  ```

- deployGaslessPaymaster

  ```bash
  yarn deployGaslessPaymaster --network zkSyncSepoliaTestnet
  ```

- deploy

  ```bash
  yarn deploy --network zkSyncSepoliaTestnet
  ```

- useGaslessPaymaster

  ```bash
  yarn useGaslessPaymaster --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ hardhat useGaslessPaymaster --network zkSyncSepoliaTestnet
  ERC20 token balance of the wallet before mint: 7
  Paymaster ETH balance is 5000000000000000
  Transaction fee estimation is :>>  112442800000000
  Minting 5 tokens for the wallet via paymaster...
  Paymaster ERC20 token balance is now 0
  Paymaster ETH balance is now 4978129200000000
  ERC20 token balance of the the wallet after mint: 7
  ✨  Done in 5.08s.
  ```
