import express from 'express';
export const routerProduct = express.Router();
import Product from '../modules/schema.js';
import mongoose from 'mongoose';


routerProduct.get('/', (req, res, next) => {

    Product.find().select("name price _id").then((docs) => {
        const response = {
            count: docs.length,

            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc.id
                    }
                }
            })
        }

        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json(err);
    });
})

routerProduct.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save().then((result) => {
        res.status(201).json({
            message:"Product is created",
            name : result.name,
            price: result.price,
            _id: result._id,
            request : {type:'GET',Url : "http://localhost:3000/products/"+result.id}
        })
    }).catch((err) => {
        res.status(500).json({Error:err})
    });
})

routerProduct.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id).select("name price _id").exec().then((doc) => {
        if (doc) {
            res.status(200).json({
                product:doc,
                request:{
                    type:'GET',
                    description:"Get all products",
                    url:"http://localhost:3000/products/"
                }
            })
        } else {
            res.status(404).json({ message: "There is no entry with this id" });
        }
    }).catch((err) => {
        res.status(500).json({ Error: err });
    });
})


routerProduct.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true }).exec().then(doc => {
        res.status(200).json({
            message:"Product is updated",
            request : {
                type:'GET',
                url:"http://localhost:3000/products/"+ id
            }
        });
    }).catch(err => {
        res.status(500).json({ Error: err })
    })
})

routerProduct.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id).exec().then((result) => {
        res.status(200).json({
            message:"product is deleted",
            request:{
                type:'POST',
                url:"http://localhost:3000/products/",
                body:{
                    name:"String",
                    price:"Number"
                }
            }
        })
    }).catch((err) => {
        res.status(500).json({ Error: err })
    });
})

