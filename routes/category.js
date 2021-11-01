import express from 'express';
import * as categoryController from '../controllers/category.js';


const router = express.Router();

router.post('/', categoryController.addCategory);

router.put('/:categoryId', categoryController.updateCategory);

router.delete('/:categoryId', categoryController.deleteCategory);

router.get('/', categoryController.findCategory);

router.get('/findAll', categoryController.findAllCategory);

export default router;