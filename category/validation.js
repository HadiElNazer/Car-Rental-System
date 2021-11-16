import Joi from 'joi-oid';

class Validation {

    static addCategory() {
        const schema = {
            body: Joi.object({
                name: Joi.string().min(3),
                description: Joi.string().min(3),
            })
        }
        return schema;
    }

    static updateCategory() {
        const schema = {
            body: Joi.object({
                name: Joi.string().min(3).required(),
                description: Joi.string().min(3).required()
            })
        }
        return schema;
    }
}

export default Validation;