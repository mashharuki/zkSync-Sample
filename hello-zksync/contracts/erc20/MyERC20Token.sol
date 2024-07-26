// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20_Token_Sample is ERC20 {
  constructor() ERC20("Best coffee in Tokyo", "COFFEE") {
    _mint(msg.sender, 100_000_000_000 * 10 ** 18);
  }

  function someTestFn() public view returns (uint8) {
    return 10;
  }
}
