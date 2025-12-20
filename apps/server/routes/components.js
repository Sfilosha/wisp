import express from 'express';
import { generateCtrl, cancelCtrl } from '../controllers/componentsCtrl.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const router = express.Router();

router.post('/generate', ctrlWrapper(generateCtrl));
router.post('/cancel', ctrlWrapper(cancelCtrl));

export default router;
