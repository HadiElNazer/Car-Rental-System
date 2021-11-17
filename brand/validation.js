import Joi from 'joi-oid';

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

    static updateBrand() {
        const schema = {
            params: Joi.object({
                brandId: Joi.objectId().required()
            }),
            body: Joi.object({
                name: Joi.string().min(3),
                description: Joi.string().min(3),
                showNbCars: Joi.boolean().required(),
            })
        }
        return schema;
    }

    static deleteBrand() {
        const schema = {
            params: Joi.object({
                brandId: Joi.objectId().required()
            }),
        }
        return schema;
    }

    static findBrand() {
        const schema = {
            body: Joi.object({
                brandId: Joi.objectId().required()
            }),
        }
        return schema;
    }

}

export default Validation;