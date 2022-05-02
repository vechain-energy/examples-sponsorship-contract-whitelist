// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ExampleLogic {
    address[] allowedContractRecipient;

    constructor(address[] memory recipients) {
        allowedContractRecipient = recipients;
    }

    function canSponsorTransactionFor(
        address _origin,
        address _to,
        bytes calldata _data
    ) public view returns (bool) {
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
