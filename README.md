# zkSync-Sample

zkSync学習・調査用のリポジトリです。

## テンプレプロジェクトの作り方

```bash
npx zksync-cli create custom-spendlimit-tutorial --template hardhat_solidity
```

```bash
Using Hardhat + Solidity template
? Private key of the wallet responsible for deploying contracts (optional) ****************************************************************
? Package manager yarn

Setting up template in /Users/harukikondo/git/zkSync-Sample/custom-spendlimit-tutorial...
✔ Cloned template
✔ Environment variables set up
✔ Dependencies installed

🎉 All set up! 🎉

--------------------------

Navigate to your project: cd custom-spendlimit-tutorial

Directory Overview:
  - Contracts: /contracts
  - Deployment Scripts: /deploy
  
Commands:
  - Compile your contracts: yarn compile
  - Deploy your contract: yarn deploy 
    - Tip: You can use the --network option to specify the network to deploy to.

Further Reading:
  - Check out the README file in the project location for more details: custom-spendlimit-tutorial/README.md

--------------------------
```

### 参考文献
1. [Daily spending limit account](https://docs.zksync.io/build/tutorials/smart-contract-development/account-abstraction/daily-spend-limit.html)
2. [QuickStart](https://docs.zksync.io/build/quick-start/hello-world.html)
3. [zkSync Explorer](https://explorer.zksync.io/address/0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072)