import express, { request } from 'express';
export const routerOrder = express.Router();

import mongoose from 'mongoose';
import Order from '../modules/orderShema.js';
import Product from '../modules/schema.js';

routerOrder.get('/', (req, res, next) => {
    Order.find().exec().then((docs) => {
        res.status(200).json({
            count: docs.length,
            Orders: docs.map(doc => {
                return {
                    id: doc._id,
                    producId: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/order/" + doc._id
                    }
                }
            })
        })
    }).catch((err) => {
        res.status(500).json({
            Error: err
        })
    });
})

routerOrder.post('/', (req, res, next) => {
    Product.findById(req.body.productId).then((product) => {
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found",
            })
        } else {
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });

            return order.save().then((result) => {
                return res.status(200).json({
                    order: result,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/order/" + result._id
                    }
                })
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            Error: err
        })
    });
})


routerOrder.get('/:id', (req, res, next) => {
    const id = req.params.id

    Order.findById(id).select('_id product quantity').exec().then((result) => {
        res.status(200).json({
            Order: result,
            req: { type: "GET", description: "Get All Product", url: "http://localhost:3000/order/" }
        })
    }).catch((err) => {
        res.status(500).json({
            Error: err
        })
    });
})

routerOrder.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Order.findByIdAndDelete(id).exec().then((result) => {
        res.status(200).json({
            message: "Order is deleted",
            request: {
                type: "POST",
                body: {
                    quantity: "Number",
                    productId: "mongoose.Schema.Types.ObjectId"
                },
                url: "http://localhost:3000/order"
            }
        })
    }).catch((err) => {

    });
})