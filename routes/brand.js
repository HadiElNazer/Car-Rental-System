import express from 'express';
import * as brandController from '../controllers/brand.js';

const router = express.Router();

router.post('/',  brandController.addBrand);

router.put('/:brandId', brandController.updateBrand);

router.get('/', brandController.findBrand);

router.delete('/:brandId', brandController.deleteBrand);

router.get('/findAllBrand', brandController.findAllBrand);



export default router;
