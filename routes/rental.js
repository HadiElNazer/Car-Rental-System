import express from 'express';
import { body } from 'express-validator';
import * as rentalController from '../controllers/rental.js';

const router = express.Router();

router.get('/addRental/:carId', [
    body('userFirstName').
        trim().
        not().
        isEmpty(),
    body('userLastName').
        trim().
        not().
        isEmpty(),



], rentalController.addRental);

export default router;