import express from 'express'; 
export const routerOrder = express.Router();

const orders = []

routerOrder.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"all orders",
        orders : orders
    })
})

routerOrder.post('/',(req,res,next)=>{
    const order = {
        orderId : req.body.orderId,
        productId : req.body.productId,
        price : req.body.price
    }

    orders.push(order)

    res.status(200).json({
        message:"order created",
        orders : order,
    })
})