import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../../../middlewares/authMiddleWare.js';
const router = express.Router();
import { imageOpenAiController, imageStabilityAiController,editImageOpenAiController,editImageDallEController  } from '../../../controllers/imageControllers.js';
import proxyRouter from './proxy.js';

const upload = multer({dest: 'uploads/'});
router.use('/proxy' , proxyRouter);

router.get('/openai' , authenticateToken , imageOpenAiController);
router.get('/stabilityai' , authenticateToken , imageStabilityAiController);
router.post('/openai/edit', upload.single('image'), editImageOpenAiController);
router.post('/openai/edit-dalle3', upload.single('image'), editImageDallEController);
export default router;


