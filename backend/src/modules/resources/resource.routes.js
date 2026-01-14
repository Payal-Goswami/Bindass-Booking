import express from 'express';
import { getResources } from './resource.controller.js';

const router = express.Router();

router.get('/', getResources);

export default router;
