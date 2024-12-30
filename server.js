import http from 'http';

import { app  } from './app.js';
import {connectDb} from './app.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

const start = async()=>{
    try{
        await connectDb();
        server.listen(PORT);
    }catch{

    }
}

start()
