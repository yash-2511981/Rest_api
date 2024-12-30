import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
export const app = express();
import { routerProduct } from './api/routes/product.js';
import { routerOrder } from './api/routes/order.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


 
//adding headers    
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Origin",
        "Origin, X-Requested-With, Content-type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }

    next()
})

//routes which should handle the request
app.use('/products', routerProduct);
app.use('/order', routerOrder);

//routes which should handle the errors
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

export const connectDb = ()=>{
    return mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("connected to mongo");
    }).catch((err) => {
        console.log(err);
    });;
}


