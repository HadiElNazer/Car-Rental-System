import express from 'express';
import mongoose from 'mongoose';
import pkg from 'body-parser';
import { ValidationError } from 'express-validation';
import config from './config.js'

import UserController from './user/controller.js';
const userController = new UserController();
import BrandController from './brand/controller.js';
const brandController = new BrandController();
import CategoryController from './category/controller.js';
const categoryController = new CategoryController();
import CarController from './car/controller.js';
const carController = new CarController();
import RentalController from './rental/controller.js';
const rentalController = new RentalController();

const app = express();
const { json } = pkg;
app.use(json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(brandController.router);
app.use(categoryController.router);
app.use(carController.router);
app.use(rentalController.router);
app.use(userController.router);

app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).send({ error });
  }
  else {
    const { message, statusCode = 500 } = error;
    res.status(statusCode).send({ statusCode, message });
  }
});

try {
  await mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true },);
  console.log("DB Start !!!")
  app.listen(config.port);
} catch (error) {
  console.log(error);
}





