import Brand from '../models/brand.js';
import mongoose from 'mongoose';
import Category from '../models/category.js';
import Car from '../models/car.js';
import Rental from '../models/rental.js';
import Schema from '../helpers/validationSchema.js';

const { carSchema } = Schema;

class car {

    async addCar(req, res, next) {
        
        const { title, description, image, brandId, categoryId } = req.body;
        const valid = await carSchema.validateAsync({title, description, image});
        const brand = await Brand.findById(brandId);


        if (!brand) {
            const error = new Error('Could not find brand.');
            error.statusCode = 404;
            throw error;
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            const error = new Error('Could not find categpry.');
            error.statusCode = 404;
            throw error;
        }


        const car = new Car({
            title,
            description,
            image,
            BRAND: brandId,
            CATEGORY: categoryId
        });
        const result = await car.save();
        //console.log(result);
        return result;
    }

    async deleteCar(req, res, next) {

        const { carId } = req.params;
        const car = await Car.findById(carId);

        if (!car) {
            const error = new Error('Could not find car.');
            error.statusCode = 404;
            throw error;
        }

        const rental = await Rental.findOne({ CAR: carId });


        if (!rental) {
            await Car.deleteOne({ _id: carId });

        }
        else {
            const error = new Error('Could not delete brand  relation rental .');
            error.statusCode = 404;
            throw error;
        }



    }

    async updateCar(req, res, next) {

        const valid = await carSchema.validateAsync(req.body);
        const { title, description, image } = valid;
        const { carId } = req.params;
        const car = await Car.findById(carId);


        if (!car) {
            const error = new Error('Could not find car.');
            error.statusCode = 404;
            throw error;
        }

        await Car.updateOne({ _id: carId }, { $set: { title, description, image } })
    }


    async findAllBrandwhith_nbcar(req, res, next) {

        const list = await Car.aggregate([
            { $lookup: { from: "brands", localField: "BRAND", foreignField: "_id", as: "brand" } },
            { $unwind: "$brand" },
            {$match :{'brand.showNbCars':true}},
            {
                $group: {
                    _id: "$brand._id",
                    brand: { $first: "$brand" },
                    numberOfCar: { $sum: 1 }
                }
            },

            { $project: { _id: 0, brand: 1, numberOfCar: 1 } }
        ]);
        return list;

    }


    async getBrandCar(req, res, next) {

        const brandcars = await Car.aggregate([
            { $lookup: { from: "brands", localField: "BRAND", foreignField: "_id", as: "brand" } },
            { $lookup: { from: "categories", localField: "CATEGORY", foreignField: "_id", as: "category" } },
            { $unwind: "$brand" },
            { $unwind: "$category" },
            {
                $group: {
                    _id: "$brand._id",
                    brand: { $first: "$brand" },
                    allCar: {
                        $addToSet: {
                            _id: "$_id",
                            title: "$title",
                            description: "$description",
                            numberOfRentals: "$numberOfRentals",
                            image: "$image",
                            BRAND: "$brand",
                            CATEGORY: "$category"

                        }
                    }
                }
            },


            { $project: { _id: 0, brand: 1, allCar: 1 } }
        ]);

        return brandcars;
    }




    async getCarByBrand(req, res, next) {

        const { brandId } = req.body;
        const { categoryName } = req.query;
        console.log(brandId);
        console.log(categoryName);

        const list = await Car.aggregate([
            { $lookup: { from: "categories", localField: "CATEGORY", foreignField: "_id", as: "category" } },
            { $unwind: "$category" },
            { $match: { BRAND: mongoose.Types.ObjectId(brandId) } },
            //{ $match: { $or:[{"category.name":categoryName},{}]} }
            { $match: { "category.name": categoryName } }

        ]);

        return list;
    }

}

const instance = new car();
export default instance;