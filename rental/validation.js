import { Joi } from 'express-validation';

class Validation {

    static addRental() {
        const schema = {
            body: Joi.object({
                carId: Joi.string().min(3).required(),
                userFirstName: Joi.string().min(3).required(),
                userLastName: Joi.string().min(3).required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required(),
                userMobileNumber: Joi.string().required()
            })
        }
        return schema;
    }

    static updateRental() {
        const schema = {
            body: Joi.object({
                userFirstName: Joi.string().min(3).required(),
                userLastName: Joi.string().min(3).required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required(),
                userMobileNumber: Joi.string().required()
            })
        }
        return schema;
    }
    static getCurrentRentalByname() {
        const schema = {
            query: Joi.object({
                cars: Joi.string().required(),

            })
        }
        return schema;
    }
}

export default Validation;