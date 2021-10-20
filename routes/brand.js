import express from 'express';
import { body } from 'express-validator';
import * as brandController from '../controllers/brand.js';

const router = express.Router();

router.put('/addBrand',
    [
        body('name').
            trim().
            not().
            isEmpty(),
        body('description').
            trim().
            not().
            isEmpty(),
        body('showNbCars').
            isBoolean()

    ],
    brandController.addBrand
);

router.get('/updateBrand/:brandId', [
    body('name').
        trim().
        not().
        isEmpty(),
    body('description').
        trim().
        not().
        isEmpty(),
    body('showNbCars').
        isBoolean()

], brandController.updateBrand);

router.get('/findBrand/:brandId', brandController.findBrand);

router.get('/deleteBrand/:brandId', brandController.deleteBrand);

router.get('/findAllBrand', brandController.findAllBrand);

router.get('/findAllBrandwhith_nbcar', brandController.findAllBrandwhith_nbcar);

export default router;
