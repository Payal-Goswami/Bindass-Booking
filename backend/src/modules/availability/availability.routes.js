import express from 'express';
import { getAvailability } from './availability.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/availability', getAvailability);

export default router;
