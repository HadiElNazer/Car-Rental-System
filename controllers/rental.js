import { validationResult } from 'express-validator';
import Rental from '../models/rental.js';
import Car from '../models/car.js'; //eslint-disable-line

export async function addRental(req, res, next) {

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { carId } = req.params;
        const { userFirstName } = req.body;
        const { userLastName } = req.body;
        const { startDate } = req.body;
        const { endDate } = req.body;

        const car = await Car.findById(carId);
        if (!car) {
            const error = new Error('Could not find car.');
            error.statusCode = 404;
            throw error;
        }

        const re = await Rental.findOne({ car: carId });
        console.log(re);
        if (re) {
            const error = new Error('car already used ');
            error.statusCode = 404;
            throw error;
        }

        car.numberOfRentals = car.numberOfRentals + 1;
        const resu = await car.save();

        const rental = new Rental({
            userFirstName,
            userLastName,
            car: carId,
            startDate,
            endDate
        });
        const result = await rental.save();
        res.status(201).json({ message: 'rental created!', result }); //eslint-disable-line
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
