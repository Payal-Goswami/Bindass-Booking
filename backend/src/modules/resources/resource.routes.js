import express from 'express';
import { getResources } from './resource.controller.js';
import availabilityRoutes from '../availability/availability.routes.js';

const router = express.Router();

router.get('/', getResources);

router.use('/:resourceId', availabilityRoutes);

export default router;
