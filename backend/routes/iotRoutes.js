import express from 'express';
import { getIot, postIot } from '../controllers/iotController.js';

const router = express.Router();

router.get('/iot', getIot);
router.post('/postIot', postIot);

export default router;