import Joi from 'joi-oid';

class Validation {

    static signup() {
        const schema = {
            body: Joi.object({
                name: Joi.string().min(1).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(1).required()
            })
        }
        return schema;
    }

    static login() {
        const schema = {
            body: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })
        }
        return schema;
    }
}

export default Validation;