import Joi from 'joi-oid';
class Validation {

    static addRental() {
        const schema = {
            body: Joi.object({
                carId: Joi.objectId().required(),
                userFirstName: Joi.string().min(1).required(),
                userLastName: Joi.string().min(1).required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required(),
                userMobileNumber: Joi.string().required()
            })
        }
        return schema;
    }

    static updateRental() {
        const schema = {
            params: Joi.object({
                rentalId: Joi.objectId(),
            }),
            body: Joi.object({
                userFirstName: Joi.string().required(),
                userLastName: Joi.string().required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required(),
                userMobileNumber: Joi.string().required()
            })
        }
        return schema;
    }

    static deleteRental() {
        const schema = {
            params: Joi.object({
                rentalId: Joi.objectId(),
            }),
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

    static getCurrentRentalWhithFilter() {
        const schema = {
            body: Joi.object({
                page: Joi.number().required(),
                nbOfElementPage: Joi.number().required()
            }),
            query: Joi.object({
                nameUser: Joi.string().min(1),
                startDate: Joi.date(),
                endDate: Joi.date(),
                carTitle: Joi.string().min(1)
            }),
        }
        return schema;
    }
}

export default Validation;