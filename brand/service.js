import Brand from './model.js'; //eslint-disable-line
import Car from '../car/model.js';
import BrandException from './exception.js'
import config from './config.js';
const { statusCode } = config;

class brand {

    async addBrand(body) {
        const { name, description, showNbCars } = body;
        const date = new Date();
        const brand = new Brand({
            name,
            description,
            showNbCars,
            createdAt: date,
            updatedAt: date
        });
        const result = await brand.save();
        return await result;
    }

    async updateBrand(body, params) {
        const date = new Date();
        const { name, description, showNbCars } = body;
        const { brandId } = params;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            throw new BrandException(statusCode.NOTFOUND, 'notFound');
        }
        await Brand.updateOne({ _id: brandId }, { $set: { name, description, showNbCars, updatedAt: date } });
    }

    async findBrand(body) {
        const { brandId } = body;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            throw new BrandException(statusCode.NOTFOUND, 'notFound');
        }
        return await brand;
    }

    async findAllBrand() {
        const brands = await Brand.find();
        return await brands;
    }

    async deleteBrand(params) {
        const { brandId } = params;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            throw new BrandException(statusCode.NOTFOUND, 'notFound');
        }
        const car = await Car.findOne({ Brand: brandId });
        if (!car) {
            const brands = await Brand.deleteOne({ _id: brandId });
        }
        else {
            throw new BrandException(statusCode.RELATION, 'brandRelationCar')
        }
    }
}

export default brand;