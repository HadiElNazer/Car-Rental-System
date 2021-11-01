import { validationResult } from 'express-validator';
import Rental from '../models/rental.js';
import Car from '../models/car.js';


class rental {


    async addRental(req, res, next) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { carId, userFirstName, userLastName, startDate, endDate, userMobileNumber } = req.body;

        const car = await Car.findById(carId);
        if (!car) {
            const error = new Error('Could not find car.');
            error.statusCode = 404;
            throw error;
        }

        const re = await Rental.findOne({ car: carId });
        if (re) {
            const error = new Error('car already used ');
            error.statusCode = 404;
            throw error;
        }
        const n = car.numberOfRentals + 1;
        await Car.updateOne({ _id: carId }, { $set: { numberOfRentals: car.numberOfRentals + 1 } });
        // car.numberOfRentals = car.numberOfRentals + 1;
        // const resu = await car.save();

        const rental = new Rental({
            userFirstName,
            userLastName,
            CAR: carId,
            startDate,
            endDate,
            userMobileNumber
        });
        const result = await rental.save();
        return result;
    }

}

const instance = new rental();

export default instance;