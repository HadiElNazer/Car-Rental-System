import express from 'express';
import mongoose from 'mongoose';
import pkg from 'body-parser';
import categoryRouter from './routes/category.js';
import brandRouter from './routes/brand.js';
import carRouter from './routes/car.js';
import rentalRouter from './routes/rental.js';

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


app.use(brandRouter);
app.use(categoryRouter);
app.use(carRouter);
app.use(rentalRouter);


app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});



mongoose.connect(
  'mongodb+srv://hadi:42343562937@cluster0.b7ddr.mongodb.net/testing?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => {
    console.log("DB Start !!!")
    app.listen(8080);
  })
  .catch((err) => { console.log(err); console.log("hadi") }); //eslint-disable-line*/





