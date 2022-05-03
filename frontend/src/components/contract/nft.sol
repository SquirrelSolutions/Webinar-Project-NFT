// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SQT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _usedIds;

    constructor() ERC721("SQT", "SQT") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function mintBatch(address to, uint256 quantity)
        public
        onlyOwner
    {
        for(uint256 i=0;i < quantity; i++){
            safeMint(to,"uri");
        }
    }

    function TransferToAddresses(address[] memory to) public {
        uint256 n = to.length;
        require(balanceOf(msg.sender)>=n);
        for (uint256 i = 0; i < n; i++) {
            uint256 id = _usedIds.current();
            _usedIds.increment();
            transferFrom(msg.sender,to[i],id);
        }
    }

    function TokensLeft() public view returns(uint){
        return _tokenIdCounter.current() - _usedIds.current();
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}