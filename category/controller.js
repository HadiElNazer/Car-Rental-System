import express from 'express';
import { validate } from 'express-validation';
import Validation from './validation.js';
import CategoryException from './exception.js'
import CategoryService from './service.js';
const service = new CategoryService();
import config from './config.js';
const { statusCode } = config;

class Controller {
    constructor() {
        this.path = '/category';
        this.router = express.Router();
        this.initializeroutes();
    }

    initializeroutes() {
        this.router.post(this.path + '/', validate(Validation.addCategory(), {}, {}), Controller.addCategory);
        this.router.put(this.path + '/:categoryId', validate(Validation.updateCategory(), {}, {}), Controller.updateCategory);
        this.router.delete(this.path + '/:categoryId', validate(Validation.deleteCategory(), {}, {}), Controller.deleteCategory);
        this.router.get(this.path + '/', Controller.findCategory);
        this.router.get(this.path + '/findAll', Controller.findAllCategory);
    }

    static async addCategory(req, res, next) {
        try {
            const result = await service.addCategory(req.body);
            res.status(statusCode.ACCEPT).send({ message: 'Category created!', result });
        } catch (err) {
            next(new CategoryException(err.statusCode, err.message))
        }
    }

    static async updateCategory(req, res, next) {
        try {
            await service.updateCategory(req.body, req.params);
            res.status(statusCode.ACCEPT).send({ message: 'category updated!' });
        } catch (err) {
            next(new CategoryException(err.statusCode, err.message))
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            await service.deleteCategory(req.params);
            res.status(statusCode.ACCEPT).send({ message: 'category deleted.' });
        }
        catch (err) {
            next(new CategoryException(err.statusCode, err.message))
        }
    }

    static async findCategory(req, res, next) {
        try {
            const category = await service.findCategory(req.body)
            res.status(statusCode.ACCEPT).send({ category });
        } catch (err) {
            next(new CategoryException(err.statusCode, err.message))
        }
    }

    static async findAllCategory(req, res, next) {
        try {
            const categorys = await service.findAll();
            res.status(statusCode.ACCEPT).send({ categorys });
        }
        catch (err) {
            next(new CategoryException(err.statusCode, err.message))
        }
    }
}

export default Controller;