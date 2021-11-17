import Rental from './model.js';
import Car from '../car/model.js';
import RentalException from './exception.js'
import mongoose from 'mongoose';
import config from './config.js';
const { statusCode } = config;


class rental {

    async addRental(body) {
        const { carId, userFirstName, userLastName, startDate, endDate, userMobileNumber } = body;
        const car = await Car.findById(carId);
        if (!car) {
            throw new RentalException(statusCode.NOTFOUND, 'notFoundCar')
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
            throw new RentalException(statusCode.NOTFOUND, 'notFound')
        }
        await this.isConflict(rentalId, rental.Car, startDate, endDate);
        await Rental.updateOne(
            { _id: rentalId },
            { $set: { userFirstName, userLastName, startDate, endDate, userMobileNumber, } })
    }

    async isConflict(rentalId, carId, startDate, endDate) {
        const startDat = new Date(startDate);
        const endDat = new Date(endDate);
        if (endDat <= startDat) {
            throw new RentalException(statusCode.VALIDATION, 'validationDate')
        }
        const catMatch = {};
        catMatch['Car'] = mongoose.Types.ObjectId(carId);
        if (rentalId !== null) {
            catMatch['_id'] = { $ne: mongoose.Types.ObjectId(rentalId) };
        }
        catMatch['$or'] = [
            { $and: [{ startDate: { $lte: startDat } }, { endDate: { $gte: startDat } }] },
            { $and: [{ startDate: { $lte: endDat } }, { endDate: { $gte: endDat } }] },
            { $and: [{ startDate: { $gte: startDat } }, { endDate: { $lte: endDat } }] }
        ];
        const rental = await Rental.aggregate([{ $match: catMatch },]);
        if (rental.length !== 0) {
            throw new RentalException(statusCode.VALIDATION, 'validationDateConflig')
        }
    }

    async deleteRental(params) {
        const { rentalId } = params;
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            throw new RentalException(statusCode.NOTFOUND, 'notFound')
        }
        if (rental.startDate > new Date()) {
            await Rental.deleteOne({ _id: rentalId });
        } else {
            throw new RentalException(statusCode.VALIDATION, 'deleteDate')
        }
    }

    async getRentalgroupByCar() {
        const dateNow = new Date();
        const aray = await Rental.aggregate([
            { $lookup: { from: "cars", localField: "Car", foreignField: "_id", as: "car" } },
            { $unwind: "$car" },
            {
                $group: {
                    _id: "$car._id", car: { $first: "$car" }, numberOfRental: { $sum: 1 }, list: {
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
                    _id: 0, car: 1, numberOfRental: 1, current: {
                        $filter: {
                            input: "$list",
                            as: "x",
                            cond: { $and: [{ $lte: ["$$x.startDate", dateNow] }, { $gte: ["$$x.endDate", dateNow] }] }
                        }
                    }
                }
            }
        ]);
        return await aray;
    }

    async getCurrentRentalWhitfilter(body, query) {
        const { startDate, endDate, carTitle, nameUser } = query;
        const { page = 1, nbOfElementPage } = body;
        const dateNow = new Date();
        const currentRental = { startDate: { $lte: dateNow }, endDate: { $gte: dateNow }, };
        let optionalMatch = {};
        if (startDate && endDate) {
            optionalMatch['startDate'] = new Date(startDate);
            optionalMatch['endDate'] = new Date(endDate);
        }
        if (carTitle) {
            optionalMatch['car.title'] = carTitle;
        }
        if (nameUser) {
            const nameExpression = new RegExp(nameUser, "i");
            const firstNameMatch = { userFirstName: { $regex: nameExpression } };
            const lastNameMatch = { userLastName: { $regex: nameExpression } };
            optionalMatch['$or'] = [firstNameMatch, lastNameMatch];
        }
        const array = Rental.aggregate([
            { $match: currentRental },
            { $lookup: { from: "cars", localField: "Car", foreignField: "_id", as: "car" } },
            { $unwind: "$car" },
            { $match: optionalMatch },
            { $sort: { startDate: 1 } },
            { $skip: (page - 1) * nbOfElementPage },
            { $limit: nbOfElementPage },
        ]);
        return await array
    }

    async getCurrentRentalByName(query) {
        const { cars } = query;
        const dateNow = new Date();
        const currentRental = { startDate: { $lte: dateNow }, endDate: { $gte: dateNow } };
        const list = cars.split(',');
        const arrayMatch = [];
        for (const index in list) {
            let elemMatch = {};
            elemMatch['car.title'] = list[index];
            arrayMatch.push(elemMatch);
        }
        const arrayRental = await Rental.aggregate(
            [{ $match: currentRental },
            { $lookup: { from: "cars", localField: "Car", foreignField: "_id", as: "car" } },
            { $unwind: "$car" },
            { $match: { $or: arrayMatch } }
            ]
        );
        return await arrayRental;
    }
}

export default rental;