pragma solidity ^0.5.16;

contract car {
    uint public carCount = 1;

    function getCarCount() public returns (uint) {
        return carCount;
    }
}