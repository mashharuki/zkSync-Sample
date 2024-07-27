pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZKPassportNFT is ERC721, Ownable {
  constructor() ERC721("ZK Passport NFT", "ZK Passport NFT") {
    _safeMint(address(0xc8efafb5F8cbB385b3A3fA20aC7e480F0638Aa87), 1);
  }

  function _baseURI() internal pure override returns (string memory) {
    return
      "https://ipfs.io/ipfs/QmPYKeyoe4cTSbdP4J7XkV7XuM96YkgNsCaMzBLHGrpNdW";
  }

  function tokenURI(uint256 id) public view override returns (string memory) {
    return _baseURI();
  }

  function safeMint(address to, uint256 tokenId) public onlyOwner {
    _safeMint(to, tokenId);
  }
}
