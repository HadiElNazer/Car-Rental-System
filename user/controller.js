import express from 'express';
import { validate } from 'express-validation';
import Validation from './validation.js';
import UserException from './exception.js'
import UserService from './service.js';
const service = new UserService();

class Controller {
    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.initializeroutes();
    }

    initializeroutes() {
        this.router.post(this.path + '/signup', validate(Validation.signup(), {}, {}), Controller.signup);
        this.router.get(this.path + '/login', validate(Validation.login(), {}, {}), Controller.login);
    }

    static async signup(req, res, next) {
        try {
            const result = await service.signup(req.body);
            res.status(200).send({ message: 'User created!', user: result });
        } catch (err) {
            next(new UserException(err.statusCode, err.message));
        }
    }

    static async login(req, res, next) {
        try {
            const { token, user } = await service.login(req.body);
            res.status(200).send({ token, user });
        } catch (err) {
            next(new UserException(err.statusCode, err.message));
        }
    }



}
export default Controller;