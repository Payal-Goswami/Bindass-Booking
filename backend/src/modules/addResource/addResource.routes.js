import express from 'express';
import {
  createResourceHandler,
  deleteResourceHandler,
  getAllResourcesHandler,
  activateResourceHandler
} from './addResource.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/requireRole.js';

const router = express.Router();

router.post('/',
  authenticate,
  requireRole(),
  createResourceHandler
);

router.patch(
  '/:resourceId',
  authenticate,
  requireRole(),
  deleteResourceHandler
);

router.patch(
  '/:resourceId/activate',
  authenticate,
  requireRole(),
  activateResourceHandler
);

router.get(
  '/',
  authenticate,
  requireRole(),
  getAllResourcesHandler
);

export default router;
