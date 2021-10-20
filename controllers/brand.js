import { validationResult } from 'express-validator';
import Brand from '../models/brand.js'; //eslint-disable-line
import Car from '../models/car.js';

export async function addBrand(req, res, next) {
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
    const { showNbCars } = req.body;
    const brand = new Brand({
      name,
      description,
      showNbCars
    });
    const result = await brand.save();
    res.status(201).json({ message: 'Brand created!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function updateBrand(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { brandId } = req.params;
    console.log(brandId);

    const { name } = req.body;
    const { description } = req.body;
    const { showNbCars } = req.body;
    const brand = await Brand.findById(brandId);
    console.log(brand);

    if (!brand) {
      const error = new Error('Could not find brand.');
      error.statusCode = 404;
      throw error;
    }

    brand.name = name;
    brand.description = description;
    brand.showNbCars = showNbCars;
    const result = await brand.save();
    res.status(201).json({ message: 'brand updated!', result }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
export async function deleteBrand(req, res, next) {

  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);

    if (!brand) {
      const error = new Error('Could not find brand.');
      error.statusCode = 404;
      throw error;
    }

    const car = await Car.findOne({ brand: brandId });
    console.log(car);

    if (!car) {
      const brands = await Brand.deleteOne({ _id: brandId });
      res.status(200).json({ message: 'Brand deleted.', brands });
    }
    else {
      const error = new Error('Could not delete brand  relation car .');
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

export async function findBrand(req, res, next) {
  try {

    const { brandId } = req.params;
    console.log(brandId);
    const brand = await Brand.findById(brandId);
    console.log(brand);

    if (!brand) {
      const error = new Error('Could not find brand.');
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ brand }); //eslint-disable-line
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};


export async function findAllBrand(req, res, next) {

  try {

    const brands = await Brand.find();
    if (brands.length === 0) {
      res.status(200).json({ message: 'any brands' });
    } else {
      res.status(200).json({ message: 'Brand fetched.', brands });
    }
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export async function findAllBrandwhith_nbcar(req, res, next) {

  try {

    const brands = await Brand.find().sort({ createdAt: -1 });
    if (brands.length === 0) {
      res.status(200).json({ message: 'any brands' });
    }
    else {
      const list = [];
      for (let br of brands) {
        const cars = await Car.find({ brand: br._id });
        list.push({ br, nb: cars.length })
      }

      res.status(200).json({ message: 'Brand fetched.', list });
    }
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



