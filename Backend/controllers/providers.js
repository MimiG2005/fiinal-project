import {
  QueryGetAllProviders,
  QueryGetProviderById,
  QueryCreateProvider,
  QueryUpdateProvider,
  QueryDeleteProvider,
  QuaryGetProvidersByServiceType
} from '../services/providers.js';

export const getAllProviders = async (req, res) => {
  try {
    const providers = await QueryGetAllProviders();
    res.status(200).json(providers);
  } catch (err) {
    console.error('Error getting all providers:', err);
    res.status(500).json({ error: 'Failed to get providers' });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await QueryGetProviderById(req.params.id);
    if (provider.length === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.status(200).json(provider[0]);
  } catch (err) {
    console.error('Error getting provider by id:', err);
    res.status(500).json({ error: 'Failed to get provider' });
  }
};

export const createProvider = async (req, res) => {
  try {
    const result = await QueryCreateProvider(req.body);
    res.status(201).json({ message: 'Provider created', id: result.insertId });
  } catch (err) {
    console.error('Error creating provider:', err);
    res.status(500).json({ error: 'Failed to create provider' });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const result = await QueryUpdateProvider(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Provider not found or no changes made' });
    }
    res.status(200).json({ message: 'Provider updated' });
  } catch (err) {
    console.error('Error updating provider:', err);
    res.status(500).json({ error: 'Failed to update provider' });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const result = await QueryDeleteProvider(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.status(200).json({ message: 'Provider deleted' });
  } catch (err) {
    console.error('Error deleting provider:', err);
    res.status(500).json({ error: 'Failed to delete provider' });
  }
};
export const getProvidersByServiceType = async (req, res) => {
  const { id } = req.params;
  try {
    const providers = await QuaryGetProvidersByServiceType(id);
    res.json(providers);
  } catch (error) {
    console.error('שגיאה ב־controller:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export default {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  getProvidersByServiceType
};
