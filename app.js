import express from 'express';
import mongoose from 'mongoose';
import pkg from 'body-parser';
import categoryRouter from './routes/category.js';
import brandRouter from './routes/brand.js';
import carRouter from './routes/car.js';
import rentalRouter from './routes/rental.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';


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


app.use('/brand',brandRouter);
app.use('/category',categoryRouter);
app.use('/car',carRouter);
app.use('/rental',rentalRouter);
app.use('/user',userRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});

dotenv.config();
let host = process.env.HOST;

try {
  await mongoose.connect(host , { useNewUrlParser: true, useUnifiedTopology: true }, );
  console.log("DB Start !!!")
  app.listen(8080);

} catch (error) {
  
  console.log(error);
}





