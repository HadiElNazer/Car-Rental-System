import instance from '../services/category.js';


export async function addCategory(req, res, next) {
  try {

    const result = await instance.addCategory(req, res, next);
    res.status(201).send({ message: 'Category created!', result });

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

export async function updateCategory(req, res, next) {
  try {

    await instance.updateCategory(req, res, next);
    res.status(201).send({ message: 'category updated!' });

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
export async function deleteCategory(req, res, next) {

  try {
    await instance.deleteCategory(req, res, next);
    res.status(200).send({ message: 'category deleted.' });
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
    const category = await instance.findCategory(req, res, next)
    res.status(201).send({ category });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};


export async function findAllCategory(req, res, next) {

  try {

    const categorys = await instance.findAll(req, res, next);
    res.status(200).send({ categorys });

  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
