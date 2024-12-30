import mongoose from 'mongoose';

const productSchema =mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number
})

const product = mongoose.model('Product',productSchema);
export default product;