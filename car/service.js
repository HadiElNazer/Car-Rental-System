import Brand from '../brand/model.js';
import mongoose from 'mongoose';
import Category from '../category/model.js';
import Car from './model.js';
import Rental from '../rental/model.js';
import CarException from './exception.js';
import BrandException from '../brand/exception.js'
import CategoryException from '../category/exception.js'


class car {

    async addCar(body) {
        const { title, description, image, brandId, categoryId } = body;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            throw new BrandException(404,'notFound');
        }
        const category = await Category.findById(categoryId);
        if (!category) {
           throw new CategoryException(404,'notFound');
        }
        const car = new Car({
            title,
            description,
            image,
            Brand: brandId,
            Category: categoryId
        });
        const result = await car.save();
        return await result;
    }

    async deleteCar(params) {
        const { carId } = params;
        const car = await Car.findById(carId);
        if (!car) {
            throw new CarException(404,'notFound');
        }
        const rental = await Rental.findOne({ Car: carId });
        if (!rental) {
            await Car.deleteOne({ _id: carId });
        }
        else {
            throw new CarException(460,'rentalRelationCar');
        }
    }

    async updateCar(body, params) {
        const { title, description, image } = body;
        const { carId } = params;
        const car = await Car.findById(carId);
        if (!car) {
            throw new CarException(404,'notFound');
        }
        await Car.updateOne({ _id: carId }, { $set: { title, description, image } })
    }

    async findAllBrandwhith_nbcar() {
        const list = await Car.aggregate([
            { $lookup: { from: "brands", localField: "Brand", foreignField: "_id", as: "brand" } },
            { $unwind: "$brand" },
            { $match: { 'brand.showNbCars': true } },
            {
                $group: {
                    _id: "$brand._id",
                    brand: { $first: "$brand" },
                    numberOfCar: { $sum: 1 }
                }
            },
            { $project: { _id: 0, brand: 1, numberOfCar: 1 } }
        ]);
        return await list;
    }

    async getBrandCar() {
        const brandcars = await Car.aggregate([
            { $lookup: { from: "brands", localField: "Brand", foreignField: "_id", as: "brand" } },
            { $lookup: { from: "categories", localField: "Category", foreignField: "_id", as: "category" } },
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
                            CATEGORY: "$category"

                        }
                    }
                }
            },
            { $project: { _id: 0, brand: 1, allCar: 1 } }
        ]);
        return await brandcars;
    }

    async getCarByBrand(body, query) {
        const { brandId } = body;
        const { categoryName } = query;
        let catMatch = {};
        if (query.categoryName) {
            catMatch['category.name'] = categoryName;
        }
        const list = await Car.aggregate([
            { $match: { Brand: mongoose.Types.ObjectId(brandId) } },
            { $lookup: { from: "categories", localField: "Category", foreignField: "_id", as: "category" } },
            { $unwind: "$category" },
            { $match: catMatch }
        ]);
        return await list;
    }

}

export default car;