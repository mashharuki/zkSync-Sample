// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract BestCoffeeInTokyo is ERC20, Ownable, ERC20Permit {
  constructor()
    ERC20("Best coffee in Tokyo", "COFFEE")
    Ownable()
    ERC20Permit("Best coffee in Tokyo")
  {
    _mint(msg.sender, 10000 * 10 ** decimals());
  }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }
}
