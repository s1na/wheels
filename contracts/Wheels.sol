pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Wheels is Ownable {
  struct Offer {
    bytes hash;
    address owner;
  }

  Offer[] public offers;

  function newOffer(bytes _hash) public {
    offers.push(Offer({
      hash: _hash,
      owner: msg.sender
    }));
  }

  function getOffersCount() public view returns(uint) {
    return offers.length;
  }
}
