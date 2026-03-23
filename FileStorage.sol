// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FileStorage {

    struct File {
        uint id;
        string ipfsHash;
        address owner;
        uint timestamp;
    }

    uint public fileCount;

    mapping(uint => File) public files;

    function uploadFile(string memory _ipfsHash) public {

        fileCount++;

        files[fileCount] = File(
            fileCount,
            _ipfsHash,
            msg.sender,
            block.timestamp
        );
    }
}