import { dataConfig } from "../../dataConfig.js";

export async function RegisterClient(client) {
  try {
    const response = await fetch(`${dataConfig.baseUrl}clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });

    if (!response.ok) throw new Error('Failed to register');
    return await response.json();
  } catch (err) {
    throw err;
  }
}

