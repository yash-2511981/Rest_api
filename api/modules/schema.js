import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

const product = mongoose.model('Product', productSchema);
export default product;