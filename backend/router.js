import express from 'express';
import authRoutes from './routes/authRoutes.js';
import user from './routes/UserRoutes.js';
import iotroute from './routes/iotRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import drawRoute from "./routes/drawRoutes.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', user);
router.use('/iot',iotroute);
router.use('/api',apiRoutes);
router.use('/draw',drawRoute);

export default router;