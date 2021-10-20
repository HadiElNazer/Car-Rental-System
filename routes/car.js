import express from 'express';
import { body } from 'express-validator';
import * as carController from '../controllers/car.js';


const router = express.Router();

router.get('/addCar/:brandId',
    [
        body('title').
            trim().
            not().
            isEmpty(),
        body('description').
            trim().
            not().
            isEmpty(),
        body('image').
            trim().
            not().
            isEmpty(),

    ], carController.addCar

);

router.get('/getCarByBrand/:brandId', carController.getCarByBrand);

router.get('/deleteCar/:carId', carController.deleteCar);

router.get('/updateCar/:carId', [
    body('title').
        trim().
        not().
        isEmpty(),
    body('description').
        trim().
        not().
        isEmpty(),
    body('image').
        trim().
        not().
        isEmpty(),

], carController.updateCar);

export default router;