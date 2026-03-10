import {
  QueryGetAllProviders,
  QueryGetProviderById,
  QueryCreateProvider,
  QueryUpdateProvider,
  QueryDeleteProvider,
  QuaryGetProvidersByServiceType,
  QueryGetEventProvidersByClient
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

// export const createProvider = async (req, res) => {
//   try {
//     const result = await QueryCreateProvider(req.body);
//     res.status(201).json({ message: 'Provider created', id: result.insertId });
//   } catch (err) {
//     console.error('Error creating provider:', err);
//     res.status(500).json({ error: 'Failed to create provider' });
//   }
// };

// export const updateProvider = async (req, res) => {
//   try {
//     const result = await QueryUpdateProvider(req.params.id, req.body);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Provider not found or no changes made' });
//     }
//     res.status(200).json({ message: 'Provider updated' });
//   } catch (err) {
//     console.error('Error updating provider:', err);
//     res.status(500).json({ error: 'Failed to update provider' });
//   }
// };
import bcrypt from 'bcrypt';
// import { QueryCreateProvider, QueryUpdateProvider } from './queries.js'; // ודאי שה-import נכון

// יצירת ספק חדש עם הצפנת סיסמה
export const createProvider = async (req, res) => {
  try {
    console.log(req);
    const { full_name, email, password, phone, address, service_type_id } = req.body;

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await QueryCreateProvider({
      full_name,
      email,
      password: hashedPassword,
      phone,
      address,
      service_type_id
    });

    res.status(201).json({ message: 'Provider created', id: result.insertId });

  } catch (err) {
    console.error('Error creating provider:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists', details: err.message });
    }

    res.status(500).json({ error: 'Failed to create provider', details: err.message });
  }
};

// עדכון ספק קיים עם הצפנת סיסמה אם נשלחה
export const updateProvider = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    let updateData = { ...rest };

    // אם שולחים סיסמה חדשה, מצפינים אותה
    // if (password) {
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   updateData.password = hashedPassword;
    // }

    const result = await QueryUpdateProvider(req.params.id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Provider not found or no changes made' });
    }

    res.status(200).json({ message: 'Provider updated', data: result });

  } catch (err) {
    console.error('Error updating provider:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists', details: err.message });
    }

    res.status(500).json({ error: 'Failed to update provider', details: err.message });
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


export const getEventProvidersForClient = async (req, res) => {
  try {
    const { eventId } = req.params;
    const clientId = req.user.id; // מזהה המשתמש שמבצע את הבקשה
    console.log(eventId,clientId);
    const providers = await QueryGetEventProvidersByClient(eventId, clientId);
    res.status(200).json(providers);
  } catch (err) {
    console.error('Error fetching event providers for client:', err);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
};



export default {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  getProvidersByServiceType,
   getEventProvidersForClient
};
