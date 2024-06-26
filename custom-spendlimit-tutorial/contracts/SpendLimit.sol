// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SpendLimit {

    uint public ONE_DAY = 24 hours;

    struct Limit {
        uint limit;
        uint available;
        uint resetTime;
        bool isEnabled;
    }

    mapping(address => Limit) public limits; // token => Limit

    modifier onlyAccount() {
        require(
            msg.sender == address(this),
            "Only the account that inherits this contract can call this method."
        );
        _;
    }

    function setSpendingLimit(
      address _token, 
      uint _amount
    ) public onlyAccount {
      require(_amount != 0, "Invalid amount");

        uint resetTime;
        uint timestamp = block.timestamp; // L2 block timestamp

        if (isValidUpdate(_token)) {
            resetTime = timestamp + ONE_DAY;
        } else {
            resetTime = timestamp;
        }

        _updateLimit(_token, _amount, _amount, resetTime, true);
    }

    function removeSpendingLimit(address _token) public onlyAccount {
      require(isValidUpdate(_token), "Invalid Update");
      _updateLimit(_token, 0, 0, 0, false);
    }

    function isValidUpdate(address _token) internal view returns(bool) {
      // Reverts unless it is first spending after enabling
      // or called after 24 hours have passed since the last update.
      if (limits[_token].isEnabled) {
          require(
              limits[_token].limit == limits[_token].available ||
                  block.timestamp > limits[_token].resetTime,
              "Invalid Update"
          );

          return true;
      } else {
          return false;
      }
    }

    function _updateLimit(
      address _token, 
      uint _limit, 
      uint _available, 
      uint _resetTime, 
      bool _isEnabled
    ) private {
      Limit storage limit = limits[_token];
      limit.limit = _limit;
      limit.available = _available;
      limit.resetTime = _resetTime;
      limit.isEnabled = _isEnabled;
    }

    function _checkSpendingLimit(
      address _token, 
      uint _amount
    ) internal {
       Limit memory limit = limits[_token];

      // return if spending limit hasn't been enabled yet
      if (!limit.isEnabled) return;

      uint timestamp = block.timestamp; // L2 block timestamp

      // Renew resetTime and available amount, which is only performed
      // if a day has already passed since the last update: timestamp > resetTime
      if (limit.limit != limit.available && timestamp > limit.resetTime) {
          limit.resetTime = timestamp + ONE_DAY;
          limit.available = limit.limit;

          // Or only resetTime is updated if it's the first spending after enabling limit
      } else if (limit.limit == limit.available) {
          limit.resetTime = timestamp + ONE_DAY;
      }

      // reverts if the amount exceeds the remaining available amount.
      require(limit.available >= _amount, "Exceed daily limit");

      // decrement `available`
      limit.available -= _amount;
      limits[_token] = limit;
    }
}
