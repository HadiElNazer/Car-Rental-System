import mongoose from 'mongoose';

const { Schema } = mongoose;

const brandSchema = new Schema({
    name: {
        type: String
        , required: true
    },
    description: {
        type: String,
        required: true
    },
    showNbCars: {
        type: Boolean,
        required: true
    }


}, { timestamps: true });

export default mongoose.model('Brand', brandSchema);

