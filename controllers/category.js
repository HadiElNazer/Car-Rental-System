import { validationResult } from 'express-validator';
import Category from '../models/category.js'; //eslint-disable-line
import Car from '../models/car.js';

export async function addCategory(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { name } = req.body;
    const { description } = req.body;
    const category = new Category({
      name,
      description,
    });
    const result = await category.save();
    res.status(201).json({ message: 'Category created!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { categoryId } = req.params;

    const { name } = req.body;
    const { description } = req.body;
    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error('Could not find categpry.');
      error.statusCode = 404;
      throw error;
    }

    category.name = name;
    category.description = description;
    const result = await category.save();
    res.status(201).json({ message: 'category updated!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
export async function deleteCategory(req, res, next) {

  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    console.log(category);

    if (!category) {
      const error = new Error('Could not find category.');
      error.statusCode = 404;
      throw error;
    }

    const car = await Car.findOne({ category: categoryId });
    console.log(car);
    if (!car) {

      const category = await Category.deleteOne({ _id: categoryId });
      res.status(200).json({ message: 'category deleted.', category });
    } else {
      const error = new Error('Could not delete category  relation car .');
      error.statusCode = 404;
      throw error;

    }
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

export async function findCategory(req, res, next) {
  try {

    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error('Could not find category.');
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ category }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};


export async function findAllCategory(req, res, next) {

  try {

    const categorys = await Category.find();
    if (categorys.length === 0) {
      res.status(200).json({ message: 'any categories' });
    } else {
      res.status(200).json({ message: 'category fetched.', categorys });
    }
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
