import { Joi } from 'express-validation';

class Validation {

    static addRental() {
        const schema = {
            body: Joi.object({
                carId: Joi.string().min(3),
                userFirstName: Joi.string().min(3),
                userLastName: Joi.string().required(),
                startDate: Joi.date(),
                endDate: Joi.date(),
                userMobileNumber: Joi.string()
            })
        }
        return schema;
    }

    static updateRental() {
        const schema = {
            body: Joi.object({
                userFirstName: Joi.string().min(3),
                userLastName: Joi.string().required(),
                startDate: Joi.date(),
                endDate: Joi.date(),
                userMobileNumber: Joi.string()
            })
        }
        return schema;
    }
}

export default Validation;