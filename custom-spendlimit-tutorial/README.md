# zkSync Hardhat project template

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## How to use

- setup

  ```bash
  yarn setup --network zkSyncSepoliaTestnet
  ```

- deploy AAFactory Contract & sample AA Acount Contract

  ```bash
  yarn deployFactoryAccount --network zkSyncSepoliaTestnet
  ```

  ```bash
  AA factory address: 0xEAD4366b5E2FA3dc3Ec60bd33Eb8A10f9A54D0D5
  SC Account deployed on address 0x91572bc97620e029a3DBdce7eD7b97a150CdD136
  Funding smart contract account with some ETH
  Done!
  ✨  Done in 15.59s.
  ```

  [zkSync Explorer - 0xEAD4366b5E2FA3dc3Ec60bd33Eb8A10f9A54D0D5](https://explorer.zksync.io/address/0xEAD4366b5E2FA3dc3Ec60bd33Eb8A10f9A54D0D5)

  [zkSync Explorer - 0x91572bc97620e029a3DBdce7eD7b97a150CdD136](https://explorer.zksync.io/address/0x91572bc97620e029a3DBdce7eD7b97a150CdD136)

- createNewAccount

  ```bash
  yarn createNewAccount --network zkSyncSepoliaTestnet
  ```

- setLimit

  ```bash
  yarn setLimit --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ npx hardhat setLimit --network zkSyncSepoliaTestnet
  Setting limit for account...
  Account limit enabled?:  true
  Account limit:  500000000000000
  Available limit today:  500000000000000
  Time to reset limit:  1715417806
  ✨  Done in 7.45s.
  ```

- transfer ETH

  ```bash
  yarn transferETH --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ npx hardhat transferETH --network zkSyncSepoliaTestnet
  Account ETH limit is:  500000000000000
  Available today:  500000000000000
  L1 timestamp:  undefined
  Limit will reset on timestamp:  1715417806
  Sending ETH transfer from smart contract account
  ETH transfer tx hash is 0x3ef5cb3da998bfec4d3fafa2c17311e27a689504ab0181c74636cb5fb4bfaf8d
  Transfer completed and limits updated!
  Account limit:  500000000000000
  Available today:  10000000000000
  Limit will reset on timestamp: 1715512099
  Limit timestamp was reset
  ✨  Done in 7.25s.
  ```
