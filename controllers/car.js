import instance from '../services/car.js';



export async function addCar(req, res, next) {
  try {

    const result = await instance.addCar(req, res, next);
    res.status(201).send({ message: 'Car created!', result });

  } catch (err) {
    if (err.isJoi === true) {
      console.log("error")
      err.statusCode = 422;
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}



export async function deleteCar(req, res, next) {

  try {

    await instance.deleteCar(req, res, next);
    res.status(201).send({ message: 'Car deleted!' });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}



export async function updateCar(req, res, next) {
  try {

    await instance.updateCar(req, res, next);
    res.status(201).send({ message: 'car updated!' });

  } catch (err) {
    if (err.isJoi === true) {
      err.statusCode = 422;
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

export async function getBrandCar(req, res, next) {

  try {

    const brandcars = await instance.getBrandCar(req, res, next);
    res.status(200).send({ brandcars });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


export async function findAllBrandwhith_nbcar(req, res, next) {

  try {

    const list = await instance.findAllBrandwhith_nbcar(req, res, next);
    res.status(200).send({ message: 'Brand fetched.', list });

  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



export async function getCarByBrand(req, res, next) {

  try {

    const list = await instance.getCarByBrand(req,res,next);
    res.status(200).json({ message: 'Brand fetched.', list });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};