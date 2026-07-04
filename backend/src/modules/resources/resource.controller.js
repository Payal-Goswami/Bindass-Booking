import { getAllResources } from './resource.service.js';

export async function getResources(req, res, next) {
  try {
    const data = await getAllResources();
    res.json(data);
  } catch (err) {
    next(err);
  }
}
