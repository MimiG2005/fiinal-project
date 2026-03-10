import {con} from '../db.js';

export const QueryGetAllProviders = () => {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM providers', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const QueryGetProviderById = (id) => {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM providers WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const QueryCreateProvider = (provider) => {
  console.log(provider)
  const { full_name, email, password, phone, address, service_type_id } = provider;
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO providers (full_name, email, password, phone, address, service_type_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    con.query(sql, [full_name, email, password, phone, address, service_type_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const QueryUpdateProvider = (id, provider) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE providers SET ? WHERE id = ?`;
    con.query(sql, [provider, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const QueryDeleteProvider = (id) => {
  return new Promise((resolve, reject) => {
    con.query('DELETE FROM providers WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
// export const QuaryGetProvidersByServiceType = async (serviceTypeId) => {
//   try {
//     const [rows] = await con.promise().query(
//       'SELECT id, full_name, email, phone, address FROM providers WHERE service_type_id = ?',
//       [serviceTypeId]
//     );
//     return rows;
//   } catch (err) {
//     console.error('שגיאה ב־service:', err);
//     throw err;
//   }
// };
export const QuaryGetProvidersByServiceType = async (serviceTypeId) => {
  try {
    const [rows] = await con.promise().query(
      `
      SELECT 
        p.id AS provider_id,
        p.full_name,
        p.email,
        p.phone,
        COALESCE(p.address, '') AS base_address,

        ps.id AS provider_service_id,
        ps.price,
        pu.name AS pricing_unit,
        ps.notes,

        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS area_names

      FROM providers p

      LEFT JOIN provider_services ps 
        ON ps.provider_id = p.id AND ps.service_type_id = ?

      LEFT JOIN pricing_units pu 
        ON pu.id = ps.pricing_unit_id

      LEFT JOIN service_locations sl 
        ON sl.provider_service_id = ps.id

      LEFT JOIN areas a 
        ON a.id = sl.area_id

      WHERE p.service_type_id = ?

      GROUP BY p.id, ps.id
      `,
      [serviceTypeId, serviceTypeId]
    );

    return rows;
  } catch (err) {
    console.error('שגיאה ב־service:', err);
    throw err;
  }
};
export const QueryGetEventProvidersByClient = async (eventId, clientId) => {
  try {
    const result = await db.query(
      `
      SELECT 
        p.id,
        p.full_name,
        p.email,
        p.phone,
        COALESCE(p.address, '') AS address
      FROM orders o
      JOIN providers p ON o.provider_id = p.id
      WHERE o.event_id = $1 AND o.client_id = $2
      GROUP BY p.id, p.full_name, p.email, p.phone, p.address
      `,
      [eventId, clientId]
    );

    // ממפה את השורות למבנה נוח
    return result.rows.map(p => ({
      id: p.id,
      name: p.full_name,
      email: p.email,
      phone: p.phone,
      address: p.address
    }));
  } catch (err) {
    console.error('Error fetching event providers:', err);
    throw err;
  }
};