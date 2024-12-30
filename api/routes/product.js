import express from 'express'; 
export const routerProduct = express.Router();
import Product from '../modules/schema.js';
import mongoose from 'mongoose';


routerProduct.get('/',(req,res,next)=>{
   Product.find().then((docs) => {
    res.status(200).json(docs);
   }).catch((err) => {
    res.status(500).json(err);
   });
})

routerProduct.post('/',(req,res,next) =>{
    const product = new Product({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price
    });
    product.save().then((result) => {
    }).catch((err) => {
        console.log(err)
    });
    res.status(201).json({
        message:"product created",
        product : product
    })
})

routerProduct.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id).exec().then((doc) => {
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message:"There is no entry with this id"});
        }
    }).catch((err) => {
        res.status(500).json({Error:err});
    });
})


routerProduct.patch('/:id',(req,res,next) =>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.findOneAndUpdate({_id : id},{$set:updateOps},{new : true}).exec().then(doc =>{
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({Error:err}) 
    })
})

routerProduct.delete('/:id',(req,res,next) =>{
    const id = req.params.id;
    Product.findByIdAndDelete(id).exec().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json({Error:err})
    });
})

