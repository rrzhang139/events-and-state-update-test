pragma solidity ^0.8.0;

contract DelayedEvent {
    bool public flag;

    event FlagUpdated(bool newValue);

    function updateFlag() public {
        flag = !flag;
        emit FlagUpdated(flag);
    }
}
