import express from 'express';
import * as carController from '../controllers/car.js';
import isAuth from '../middleware/is-auth.js';



const router = express.Router();

router.post('/',carController.addCar);

router.get('/brandCar',isAuth, carController.getBrandCar);

router.get('/getCarByBrand',isAuth, carController.getCarByBrand);

router.get('/findAllBrandwhith_nbcar', carController.findAllBrandwhith_nbcar);

router.delete('/:carId', carController.deleteCar);

router.put('/:carId', carController.updateCar);

export default router;