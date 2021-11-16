import Joi from 'joi-oid';

class Validation {

    static addCar() {
        const schema = {
            body: Joi.object({
                title: Joi.string().required().min(1),
                description: Joi.string().required().min(1),
                image: Joi.string().required().min(1),
                categoryId: Joi.string(),
                brandId: Joi.string()
            })
        }
        return schema;
    }

    static updateCar() {
        const schema = {
            body: Joi.object({
                title: Joi.string().required().min(1),
                description: Joi.string().required().min(1),
                image: Joi.string().required().min(1)
            })
        }
        return schema;
    }
}

export default Validation;