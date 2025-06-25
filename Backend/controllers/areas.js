import {
  QueryAllAreas,

} from '../services/areas.js';

export const getAllAreas = async (req, res) => {
  try {
    const areas = await QueryAllAreas();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};