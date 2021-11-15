import { Joi } from 'express-validation';

class Validation {

    static addBrand() {
        const schema = {
            body: Joi.object({
                name: Joi.string().min(3),
                description: Joi.string().min(3),
                showNbCars: Joi.boolean().required(),
            })
        }
        return schema;
    }

    static updateBrand () {
        const schema = {
            body: Joi.object({
                name: Joi.string().min(3),
                description: Joi.string().min(3),
                showNbCars: Joi.boolean().required(),
            })
        }
        return schema;
    }
}

export default Validation;