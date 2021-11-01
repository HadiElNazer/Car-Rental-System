import Schema from '../helpers/validationSchema.js';
import Brand from '../models/brand.js'; //eslint-disable-line
import Car from '../models/car.js';

const { brandSchema } = Schema;

class brand {

    async addBrand(req, res, next) {

        const valid = await brandSchema.validateAsync(req.body);
        const { name, description, showNbCars } = valid;
        const brand = new Brand({
            name,
            description,
            showNbCars
        });
        const result = await brand.save();
        return result;

    }

    async updateBrand(req, res, next) {

        const valid = await brandSchema.validateAsync(req.body);
        const { name, description, showNbCars } = valid;
        const { brandId } = req.params;
        const brand = await Brand.findById(brandId);


        if (!brand) {
            const error = new Error('Could not find brand.');
            error.statusCode = 404;
            throw error;
        }

        await Brand.updateOne({ _id: brandId }, { $set: { name, description, showNbCars } });


    }

    async findBrand(req, res, next) {

        const { brandId } = req.body;
        const brand = await Brand.findById(brandId);

        if (!brand) {
            const error = new Error('Could not find brand.');
            error.statusCode = 404;
            throw error;
        }
        return brand;
    }



    async findAllBrand(req, res, next) {

        const brands = await Brand.find();
        return brands;
    }


    async deleteBrand(req, res, next) {

        const { brandId } = req.params;
        const brand = await Brand.findById(brandId);

        if (!brand) {
            const error = new Error('Could not find brand.');
            error.statusCode = 404;
            throw error;
        }

        const car = await Car.findOne({ BRAND: brandId });


        if (!car) {
            const brands = await Brand.deleteOne({ _id: brandId });

        }
        else {
            const error = new Error('Could not delete brand  relation car .');
            error.statusCode = 404;
            throw error;
        }


    }

}

const instance = new brand();

export default instance;