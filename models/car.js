import mongoose from 'mongoose';

const { Schema } = mongoose;

const carsSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    numberOfRentals: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    BRAND: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Brand',

    },
    CATEGORY: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    }


})

export default mongoose.model('Cars', carsSchema);