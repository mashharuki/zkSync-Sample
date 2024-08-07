/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * Sample ERC20 Token
 */
contract ZkQuestUpgradableBeacon is
  Initializable,
  ERC20Upgradeable,
  OwnableUpgradeable
{
  function initialize() public initializer {
    __ERC20_init("ZkQuest Upgradable Beacon", "ZKQ_BEACON_V2");
    __Ownable_init();

    _mint(msg.sender, 200000 * 10 ** decimals());
  }
}
