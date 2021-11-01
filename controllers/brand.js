import instance from '../services/brand.js';

export async function addBrand(req, res, next) {
  try {

    const result = await instance.addBrand(req, res, next);
    res.status(201).send({ message: 'Brand created!', result });

  } catch (err) {
    if (err.isJoi === true) {
      err.statusCode = 422;
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


export async function updateBrand(req, res, next) {
  try {

    await instance.updateBrand(req, res, next);
    res.status(201).send({ message: 'brand updated!' });
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


export async function deleteBrand(req, res, next) {

  try {
    await instance.deleteBrand(req, res, next);
    res.status(200).send({ message: 'Brand deleted.' });
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

    const brand = await instance.findBrand(req, res, next);
    res.status(201).send({ brand });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};


export async function findAllBrand(req, res, next) {

  try {

    const brands = await instance.findAllBrand(req, res, next);
    res.status(200).send({ message: 'Brand fetched.', brands });

  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};





