import express from 'express';
import { validate } from 'express-validation';
import Validation from './validation.js';
import BrandException from './exception.js'
import BrandService from './service.js';
const service = new BrandService();

class Controller {
    constructor() {
        this.path = '/brand';
        this.router = express.Router();
        this.initializeroutes();
    }

    initializeroutes() {
        this.router.post(this.path + '/', validate(Validation.addBrand(), {}, {}), Controller.addBrand);
        this.router.put(this.path + '/:brandId', validate(Validation.updateBrand(), {}, {}), Controller.updateBrand);
        this.router.get(this.path + '/', Controller.findBrand);
        this.router.delete(this.path + '/:brandId', Controller.deleteBrand);
        this.router.get(this.path + '/findAllBrand', Controller.findAllBrand);
    }

    static async addBrand(req, res, next) {
        try {
            const result = await service.addBrand(req.body);
            res.status(200).send({ message: 'Brand created!', result });
        } catch (err) {
            next(new BrandException(err.statusCode, err.message));
        }
    }

    static async updateBrand(req, res, next) {
        try {
            await service.updateBrand(req.body, req.params);
            res.status(200).send({ message: 'brand updated!' });
        } catch (err) {
            next(new BrandException(err.statusCode, err.message));
        }

    };

    static async deleteBrand(req, res, next) {
        try {
            await service.deleteBrand(req.params);
            res.status(200).send({ message: 'Brand deleted.' });
        }
        catch (err) {
            next(new BrandException(err.statusCode, err.message));
        };
    }

    static async findBrand(req, res, next) {
        try {
            const brand = await service.findBrand(req.body);
            res.status(200).send({ brand });
        } catch (err) {
            next(new BrandException(err.statusCode, err.message));
        }
    };

    static async findAllBrand(req, res, next) {
        try {
            const brands = await service.findAllBrand();
            res.status(200).send({ message: 'Brand fetched.', brands });
        }
        catch (err) {
            next(new BrandException(err.statusCode, err.message));
        }
    };

}
export default Controller;