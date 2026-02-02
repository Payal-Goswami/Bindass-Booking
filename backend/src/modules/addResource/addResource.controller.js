import {
  createResource,
  deleteResource,
  getAllResources,
  activateResource
} from './addResource.service.js';
import { validateCreateResource } from './addResource.dto.js';

export async function createResourceHandler(req, res, next) {
  try {
    const data = validateCreateResource(req.body);

      const {
      name,
      type,
      capacity,
      description,
      image,
    } = req.body;

    const resourceId = await createResource({
      name,
      type,
      capacity,
      description,
      image,
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
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function getAllResourcesHandler(req, res, next) {
  try {
    const data = await getAllResources();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function activateResourceHandler(req, res, next) {
  try {
    await activateResource({ resourceId: req.params.resourceId });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
