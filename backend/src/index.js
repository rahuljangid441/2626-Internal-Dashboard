import express from 'express';
import cors from 'cors';
import {PORT} from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import cookieParser from 'cookie-parser';



import { connectDb } from './config/dbConfig.js';



const app = express();

// app.use(cors({
    // origin: ['http://localhost:5173','https://2626-internal-dashboard.vercel.app'],
    // credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow server-to-server, health checks, or tools with no origin

        const allowedOrigins = [
            'http://localhost:5173',
            'https://2626-internal-dashboard.vercel.app',
            'https://2626-internal-dashboard-git-main-rahuljangid441s-projects.vercel.app',
            'https://2626-internal-dashboard-j5k799rdx-rahuljangid441s-projects.vercel.app'
        ];
        // Allow all Vercel preview/branch deployments for your project
        if (
            allowedOrigins.includes(origin) ||
            /^https:\/\/2626-internal-dashboard.*\.vercel\.app$/.test(origin)
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.text());
app.use(cookieParser());

// Serve images statically

app.get('/' , (req , res)=>{
    res.send('Server is live');
})

app.use('/api', apiRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
},connectDb());

