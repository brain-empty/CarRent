pragma solidity ^0.5.16;

contract carRent {
    uint public carCount = 0;

    struct Car {
        uint id;
        string name;
        bool rented;
    }

    mapping(uint => Car) public cars;
    
    event CarCreated (
        uint id,
        string name,
        bool rented
    );

    event carRented (
        uint id,
        bool rented
    );

    constructor () public {
        createCar("Toyota MR3");
    }

    function createCar(string memory _content) public {
        carCount ++;
        cars[carCount] = Car(carCount, _content, false);
        emit CarCreated(carCount, _content, false);
    }

    function toggleRented (uint _id) public {
        Car memory _car = cars[_id];
        _car.rented =!_car.rented;
        cars[_id] = _car;
        emit carRented (_id, _car.rented);
    }

}