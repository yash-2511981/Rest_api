import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   product : {type: mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
   quantity:{type:Number,default:1}
})

const order = mongoose.model('Order', orderSchema);
export default order;