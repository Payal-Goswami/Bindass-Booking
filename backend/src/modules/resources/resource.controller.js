import { getAllResources } from './resource.service.js';

export async function getResources(req, res) {
  try {
    const data = await getAllResources();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
