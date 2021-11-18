import Joi from 'joi-oid';

class Validation {

    static addCar() {
        const schema = {
            body: Joi.object({
                title: Joi.string().required().min(1),
                description: Joi.string().required().min(1),
                image: Joi.string().required().min(1),
                categoryId: Joi.objectId().required(),
                brandId: Joi.objectId().required(),
            })
        }
        return schema;
    }

    static updateCar() {
        const schema = {
            params: Joi.object({
                carId: Joi.objectId().required()
            })
            ,
            body: Joi.object({
                title: Joi.string().required().min(1),
                description: Joi.string().required().min(1),
                image: Joi.string().required().min(1)
            })
        }
        return schema;
    }

    static deleteCar() {
        const schema = {
            params: Joi.object({
                carId: Joi.objectId().required()
            })
        }
        return schema;
    }

    static getCarByBrand() {
        const schema = {
            body: Joi.object({
                brandId: Joi.objectId().required()
            }),
            query: Joi.object({
                categoryName: Joi.string()
            })
        }
        return schema;
    }
}

export default Validation;