import express from 'express';
import { body } from 'express-validator';
import * as categoryController from '../controllers/category.js';


const router = express.Router();

router.put('/addCategory',
    [
        body('name').
            trim().
            not().
            isEmpty(),
        body('description').
            trim().
            not().
            isEmpty()
    ], categoryController.addCategory

);
router.get('/updateCategory/:categoryId',
    [
        body('name').
            trim().
            not().
            isEmpty(),
        body('description').
            trim().
            not().
            isEmpty()
    ], categoryController.updateCategory

);
router.get('/deleteCategory/:categoryId', categoryController.deleteCategory);
router.get('/findCategory/:categoryId', categoryController.findCategory);
router.get('/findAll', categoryController.findAllCategory);

export default router;