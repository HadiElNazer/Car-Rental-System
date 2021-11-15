import Rental from './model.js';
import Car from '../car/model.js';
import RentalException from './exception.js'
import mongoose from 'mongoose';


class rental {

    async addRental(body) {
        const { carId, userFirstName, userLastName, startDate, endDate, userMobileNumber } = body;
        const car = await Car.findById(carId);
        if (!car) {
            const error = new Error('Could not find car.');
            error.statusCode = 404;
            throw error;
        }
        await this.isConflict(null, carId, startDate, endDate);
        const rental = new Rental({
            userFirstName,
            userLastName,
            Car: carId,
            startDate,
            endDate,
            userMobileNumber
        });
        const result = await rental.save();
        return result;
    }

    async updateRental(body, params) {
        const { userFirstName, userLastName, startDate, endDate, userMobileNumber } = body;
        const { rentalId } = params;
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            throw new RentalException(404, 'notFound')
        }
        await this.isConflict(rentalId, rental.Car, startDate, endDate);
        await Rental.updateOne(
            { _id: rentalId },
            { $set: { userFirstName, userLastName, startDate, endDate, userMobileNumber, } })
    }

    async isConflict(rentalId, carId, startDate, endDate) {
        if (new Date(endDate) <= new Date(startDate)) {
            throw new RentalException(400, 'validationDate')
        }
        const b = await Rental.aggregate([
            { $match: { Car: mongoose.Types.ObjectId(carId), } },
            { $match: { _id: { $ne: mongoose.Types.ObjectId(rentalId) } } },
            {
                $match: {
                    $or: [
                        { $and: [{ startDate: { $lte: new Date(startDate) } }, { endDate: { $gte: new Date(startDate) } }] },
                        { $and: [{ startDate: { $lte: new Date(endDate) } }, { endDate: { $gte: new Date(endDate) } }] },
                        { $and: [{ startDate: { $gte: new Date(startDate) } }, { endDate: { $lte: new Date(endDate) } }] }
                    ]
                }
            }
        ]);
        if (b.length !== 0) {
            throw new RentalException(400, 'validationDateConflig')
        }
    }

    async deleteRental(params) {
        const { rentalId } = params;
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            throw new RentalException(404, 'notFound')
        }
        if (rental.startDate > new Date()) {
            await Rental.deleteOne({ _id: rentalId });
        } else {
            throw new RentalException(400, 'deleteDate')
        }
    }

    async getRentalgroupByCar() {
        const aray = await Rental.aggregate([
            { $lookup: { from: "cars", localField: "Car", foreignField: "_id", as: "car" } },
            { $unwind: "$car" },
            {
                $group: {
                    _id: "$car._id",
                    car: { $first: "$car" },
                    numberOfRental: { $sum: 1 },
                    list: {
                        $addToSet: {
                            rentalId: "$_id",
                            userLastName: "$userLastName",
                            userFirstName: "$userFirstName",
                            userMobileNumber: "$userMobileNumber",
                            startDate: "$startDate",
                            endDate: "$endDate"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    car: 1,
                    numberOfRental: 1,
                    current: {
                        $filter: {
                            input: "$list",
                            as: "x",
                            cond: { $and: [{ $lte: ["$$x.startDate", new Date()] }, { $gte: ["$$x.endDate", new Date()] }] }
                        }
                    }
                }
            }
        ]);
        return await aray;
    }

    async getCurrentRentalWhitfilter(body, query) {
        const { startDate, endDate, carTitle, name } = query;
        const { page = 1 } = body;
        const nbOfElementPage = 3;
        let datetMatch = {};
        if (startDate && endDate) {
            console.log('jkjk')
            datetMatch['startDate'] = new Date(startDate);
            datetMatch['endDate'] = new Date(endDate);
        }
        let carTitleMatch = {};
        if (carTitle) {
            carTitleMatch['car.title'] = carTitle;
        }
        let firstNameMatch = {};
        let lastNameMatch = {}
        if (name) {
            const nameExpression = new RegExp(name, "i");
            firstNameMatch['userFirstName'] = { $regex: nameExpression };
            lastNameMatch['userLastName'] = { $regex: nameExpression };
        }
        const array = Rental.aggregate([
            { $match: datetMatch },
            { $match: { $or: [firstNameMatch, lastNameMatch] } },
            { $lookup: { from: "cars", localField: "Car", foreignField: "_id", as: "car" } },
            { $unwind: "$car" },
            { $match: carTitleMatch },
            { $sort: { startDate: 1 } },
            { $skip: (page - 1) * nbOfElementPage },
            { $limit: nbOfElementPage },
        ]);
        return await array
    }

    async getCurrentRentalByName(query) {
        const { cars } = query;
        const list = cars.split(',');
        const arrayMatch = [];
        for (const index in list) {
            let elemMatch = {};
            elemMatch['car.title'] = list[index];
            arrayMatch.push(elemMatch);
        }
        const arrayRental = await Rental.aggregate(
            [{ $match: { $and: [{ startDate: { $lte: new Date() } }, { endDate: { $gte: new Date() } }] } },
            { $lookup: { from: "cars", localField: "Car", foreignField: "_id", as: "car" } },
            { $unwind: "$car" },
            { $match: { $or: arrayMatch } }
            ]
        );
        return await arrayRental;
    }
}

export default rental;