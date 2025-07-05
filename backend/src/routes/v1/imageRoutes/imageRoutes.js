import express from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleWare.js';
const router = express.Router();
import { imageOpenAiController, imageStabilityAiController } from '../../../controllers/imageControllers.js';
import proxyRouter from './proxy.js';

router.use('/proxy' , proxyRouter);

router.get('/openai' , authenticateToken , imageOpenAiController);
router.get('/stabilityai' , authenticateToken , imageStabilityAiController)
export default router;
