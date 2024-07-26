// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZKPassportNFT is ERC721, Ownable {
  constructor() ERC721("ZK Passport NFT", "ZKP") Ownable(msg.sender) {}

  function tokenURI(
    uint256
  ) public view virtual override returns (string memory) {
    return
      "https://ipfs.io/ipfs/QmPYKeyoe4cTSbdP4J7XkV7XuM96YkgNsCaMzBLHGrpNdW";
  }

  function mint(address to, uint256 tokenId) public onlyOwner {
    _mint(to, tokenId);
  }
}
