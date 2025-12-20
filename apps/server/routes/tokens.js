import express from 'express';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import { updateTokensCtrl } from '../controllers/tokensCtrl.js';
const router = express.Router();

router.post('/update', ctrlWrapper(updateTokensCtrl));

export default router;