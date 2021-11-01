import instance from '../services/user.js';

export async function signup(req, res, next) {
    try {
        const result = await instance.signup(req, res, next);
        res.status(201).send({ message: 'User created!', user: result });

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

export async function login(req, res, next) {
    try {
        const { token, user } = await instance.login(req, res, next);
        res.status(200).send({ token, user });

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
