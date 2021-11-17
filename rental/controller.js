import express from 'express';
import { validate } from 'express-validation';
import Validation from './validation.js';
import RentalException from './exception.js'
import isAuth from '../middleware/is-auth.js';
import RentalService from './service.js';
const service = new RentalService();
import config from './config.js';
const { statusCode } = config;

class Controller {
    constructor() {
        this.path = '/rental'
        this.router = express.Router();
        this.initializeroutes();
    }

    initializeroutes() {
        this.router.use(this.path, isAuth);
        this.router.post(this.path + '/', validate(Validation.addRental(), {}, {}), Controller.addRental);
        this.router.put(this.path + '/:rentalId', validate(Validation.updateRental(), {}, {}), Controller.updateRental);
        this.router.delete(this.path + '/:rentalId', validate(Validation.deleteRental(), {}, {}), Controller.deleteRental);
        this.router.get(this.path + '/getRentalgroupByCar', Controller.getRentalgroupByCar);
        this.router.get(this.path + '/getCurrentRentalByName', validate(Validation.getCurrentRentalByname(), {}, {}), Controller.getCurrentRentalByName);
        this.router.get(this.path + '/getCurrentRentalWhitfilter', validate(Validation.getCurrentRentalWhithFilter(), {}, {}), Controller.getCurrentRentalWhitfilter);
    }

    static async addRental(req, res, next) {
        try {
            const result = await service.addRental(req.body);
            res.status(statusCode.ACCEPT).send({ message: 'rental created!', result });
        } catch (err) {
            next(new RentalException(err.statusCode, err.message));
        }
    }

    static async updateRental(req, res, next) {
        try {
            await service.updateRental(req.body, req.params);
            res.status(statusCode.ACCEPT).send({ message: 'rental updated!' });
        } catch (err) {
            next(new RentalException(err.statusCode, err.message));
        }
    }

    static async deleteRental(req, res, next) {
        try {
            await service.deleteRental(req.params);
            res.status(statusCode.ACCEPT).send({ message: 'rental deleted!' });
        } catch (err) {
            next(new RentalException(err.statusCode, err.message));
        }
    }

    static async getRentalgroupByCar(req, res, next) {
        try {
            const array = await service.getRentalgroupByCar();
            res.status(statusCode.ACCEPT).send({ array });
        } catch (err) {
            next(new RentalException(err.statusCode, err.message));
        }
    }

    static async getCurrentRentalByName(req, res, next) {
        try {
            const listCurrent = await service.getCurrentRentalByName(req.query);
            res.status(statusCode.ACCEPT).send(listCurrent);
        } catch (error) {
            next(new RentalException(error.statusCode, error.message))
        }
    }

    static async getCurrentRentalWhitfilter(req, res, next) {
        try {
            const aray = await service.getCurrentRentalWhitfilter(req.body, req.query);
            res.status(statusCode.ACCEPT).send(aray);
        } catch (error) {
            next(new RentalException(error.statusCode, error.message))
        }
    }

}
export default Controller;