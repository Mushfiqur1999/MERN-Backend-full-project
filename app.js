import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import * as path from "path";
import router from "./routes/api.js";
import {MONGODB_CONNECTION,PORT,MAX_JSON_SIZE,URL_ENCODE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME, WEB_CACHE} from "./app/config/config.js"
import fileUpload from "express-fileupload";


const app = express();

/// App use Default middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({extended:URL_ENCODE}));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());


//file upload
app.use(fileUpload({
    limits:{fileSize:50 * 1024 * 1024}
}))

//Rate limiter
const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER});
app.use(limiter)


//Web Caching
app.set('etag',WEB_CACHE)


//MongoDB Connection
mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("Error connecting to MongoDB");
})




//// Set API Routes
app.use('/api',router)



///Set application Storage
app.use(express.static('storage'))


// Run application
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})