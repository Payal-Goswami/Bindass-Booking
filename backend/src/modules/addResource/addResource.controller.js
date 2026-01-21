import {
  createResource,
  deleteResource
} from './addResource.service.js';
import { validateCreateResource } from './addResource.dto.js';

export async function createResourceHandler(req, res, next) {
  try {
    const data = validateCreateResource(req.body);

    const resourceId = await createResource({
      ...data,
      ownerId: req.user.id
    });

    res.status(201).json({
      success: true,
      resourceId
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteResourceHandler(req, res, next) {
  try {
    await deleteResource({
      resourceId: req.params.resourceId,
      userId: req.user.id
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
