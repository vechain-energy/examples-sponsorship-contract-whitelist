// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFT.sol";

contract ExampleLogic {
    address[] allowedContractRecipient;
    NFT internal nft;

    constructor(address[] memory recipients, address nftContract) {
        allowedContractRecipient = recipients;
        nft = NFT(nftContract);
    }

    function canSponsorTransactionFor(
        address _origin,
        address _to,
        bytes calldata _data
    ) public view returns (bool) {
        if (nft.balanceOf(_origin) > 0) {
            return true;
        }

        for (
            uint256 index = 0;
            index < allowedContractRecipient.length;
            index++
        ) {
            if (allowedContractRecipient[index] == _to) {
                return true;
            }
        }

        return false;
    }
}
