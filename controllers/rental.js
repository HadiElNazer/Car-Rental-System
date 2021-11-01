import instance from '../services/rental.js'

export async function addRental(req, res, next) {

    try{

        const result = await instance.addRental(req,res,next);
        res.status(201).send({ message: 'rental created!', result }); 

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
