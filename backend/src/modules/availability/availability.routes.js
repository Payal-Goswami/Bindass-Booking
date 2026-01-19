import express from 'express';
import { getAvailability } from './availability.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', getAvailability);

export default router;
