import { validationResult } from 'express-validator';
import Car from '../models/car.js'; //eslint-disable-line
import Brand from '../models/brand.js';
import Category from '../models/category.js';

export async function addCar(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { brandId } = req.params;
    const { categoryId } = req.body;
    const { title } = req.body;
    const { description } = req.body;
    const { image } = req.body;
    const brand = await Brand.findById(brandId);
    console.log(brand);

    if (!brand) {
      const error = new Error('Could not find brand.');
      error.statusCode = 404;
      throw error;
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error('Could not find categpry.');
      error.statusCode = 404;
      throw error;
    }


    const car = new Car({
      title,
      description,
      image,
      brand: brandId,
      category: categoryId
    });
    const result = await car.save();
    res.status(201).json({ message: 'Car created!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function getCarByBrand(req, res, next) {

  try {

    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);
    console.log(brand);

    if (!brand) {
      const error = new Error('Could not find brand.');
      error.statusCode = 404;
      throw error;
    }

    const result = await Car.find({ brand: brandId });
    res.status(201).json({ message: 'Car !', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function deleteCar(req, res, next) {

  try {

    const { carId } = req.params;


    const result = await Car.deleteOne({ _id: carId });
    res.status(201).json({ message: 'Car deleted!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}



export async function updateCar(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { carId } = req.params;


    const { title } = req.body;
    const { description } = req.body;
    const { image } = req.body;
    const { numberOfRentals } = req.body;
    const car = await Car.findById(carId);


    if (!car) {
      const error = new Error('Could not find car.');
      error.statusCode = 404;
      throw error;
    }

    car.title = title;
    car.description = description;
    car.image = image;
    car.numberOfRentals = numberOfRentals;

    const result = await car.save();
    res.status(201).json({ message: 'car updated!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};