pragma solidity ^0.5.16;

contract carRent {
    uint public carCount = 0;

    struct Car {
        uint id;
        string name;
        uint driven;
        bool rented;
    }

    mapping(uint => Car) public cars;
    
    event CarCreated (
        uint id,
        string name,
        uint driven,
        bool rented
    );

    event carRented (
        uint id,
        bool rented
    );

    constructor () public {
        createCar("Toyota MR3", 230);
    }

    function createCar(string memory _content, uint _driven) public {
        carCount ++;
        cars[carCount] = Car(carCount, _content, _driven, false);
        emit CarCreated(carCount, _content, _driven, false);
    }

    function toggleRented (uint _id, uint amount) public payable {
        Car memory _car = cars[_id];
        _car.rented =!_car.rented;
        cars[_id] = _car;
        emit carRented (_id, _car.rented);
    }

}