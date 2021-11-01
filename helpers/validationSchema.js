import Joi from '@hapi/joi';


const userSchema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required()
});

const brandSchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    showNbCars: Joi.boolean().required()
});
const categorySchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
});
const carSchema = Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    image: Joi.string().required().min(1)
});

const allSchema = { userSchema, brandSchema,categorySchema ,carSchema};
export default allSchema;