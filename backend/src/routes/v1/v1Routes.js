import express from 'express';
import imageRouter from './imageRoutes/imageRoutes.js';
import textRouter from './textRoutes/textRoutes.js';
import loginRouter from './loginRoutes/login.js';
import { authenticateToken } from '../../middlewares/authMiddleWare.js';

import chatHistoryRouter from './chatHistoryRoutes/chatHistoryRoutes.js';
const router = express.Router();

router.get('/ping' , (req , res)=>{
    return res.status(201).json({
        message: 'Frontend and backend are connected'
    })
})


router.use('/images' , imageRouter);
router.use('/text'  , textRouter); 
// router.use('/text' , authenticateToken , textRouter); 
router.use('/login' , loginRouter);

router.use('/chat-history', chatHistoryRouter);
export default router;