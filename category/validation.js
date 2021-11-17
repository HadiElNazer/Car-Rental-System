import Joi from 'joi-oid';

class Validation {

    static addCategory() {
        const schema = {
            body: Joi.object({
                name: Joi.string().min(1).required(),
                description: Joi.string().min(1).required(),
            })
        }
        return schema;
    }

    static updateCategory() {
        const schema = {
            params: Joi.object({
                categoryId: Joi.objectId().required()
            }),
            body: Joi.object({
                name: Joi.string().min(1).required(),
                description: Joi.string().min(1).required()
            })
        }
        return schema;
    }

    static deleteCategory() {
        const schema = {
            params: Joi.object({
                categoryId: Joi.objectId().required()
            })
        }
        return schema;
    }
}

export default Validation;