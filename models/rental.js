import mongoose from 'mongoose';

const { Schema } = mongoose;


const rentalSchema = new Schema({

    userFirstName: {
        type: String,
        required: true
    },

    userLastName: {
        type: String,
        required: true
    },

    car: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Cars',

    },
    startDate: {
        type: Date,
        required: true,

    }
    ,
    endDate: {
        type: Date,
        required: true,

    }


})

export default mongoose.model('Rental', rentalSchema);