import express from 'express';
import {
  createResourceHandler,
  deleteResourceHandler
} from './addResource.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/requireRole.js';

const router = express.Router();

router.post('/',
  authenticate,
  requireRole(),
  createResourceHandler
);

router.delete(
  '/:resourceId',
  authenticate,
  requireRole(),
  deleteResourceHandler
);

export default router;
