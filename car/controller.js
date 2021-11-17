import express from 'express';
import { validate } from 'express-validation';
import isAuth from '../middleware/is-auth.js';
import Validation from './validation.js';
import CarService from './service.js';
const service = new CarService();
import config from './config.js';
const { statusCode } = config;

class Controller {
    constructor() {
        this.path = '/car'
        this.router = express.Router();
        this.initializeroutes();
    }

    initializeroutes() {
        this.router.post(this.path + '/', validate(Validation.addCar(), {}, {}), Controller.addCar);
        this.router.put(this.path + '/:carId', validate(Validation.updateCar(), {}, {}), Controller.updateCar);
        this.router.get(this.path + '/findAllBrandwhith_nbcar', Controller.findAllBrandwhith_nbcar);
        this.router.delete(this.path + '/:carId', validate(Validation.deleteCar(), {}, {}), Controller.deleteCar);
        this.router.use(this.path, isAuth);
        this.router.get(this.path + '/brandCar', Controller.getBrandCar);
        this.router.get(this.path + '/getCarByBrand', validate(Validation.getCarByBrand(), {}, {}), Controller.getCarByBrand);
    }

    static async addCar(req, res, next) {
        try {
            const result = await service.addCar(req.body);
            res.status(statusCode.ACCEPT).send({ message: 'Car created!', result });
        } catch (err) {
            next(err);
        }
    }

    static async deleteCar(req, res, next) {
        try {
            await service.deleteCar(req.params);
            res.status(statusCode.ACCEPT).send({ message: 'Car deleted!' });
        } catch (err) {
            next(err);
        }
    }

    static async updateCar(req, res, next) {
        try {
            await service.updateCar(req.body, req.params);
            res.status(statusCode.ACCEPT).send({ message: 'car updated!' });
        } catch (err) {
            next(err);
        }
    }

    static async getBrandCar(req, res, next) {
        try {
            const brandcars = await service.getBrandCar();
            res.status(statusCode.ACCEPT).send({ brandcars });
        } catch (err) {
            next(err);
        }
    }

    static async findAllBrandwhith_nbcar(req, res, next) {
        try {
            const list = await service.findAllBrandwhith_nbcar();
            res.status(statusCode.ACCEPT).send({ message: 'Brand fetched.', list });
        }
        catch (err) {
            next(err);
        }
    }

    static async getCarByBrand(req, res, next) {
        try {
            const list = await service.getCarByBrand(req.body, req.query);
            res.status(statusCode.ACCEPT).send({ message: 'Brand fetched.', list });
        }
        catch (err) {
            next(err);
        }
    }
}
export default Controller;