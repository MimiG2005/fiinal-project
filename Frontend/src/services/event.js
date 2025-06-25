import { dataConfig } from "../../dataConfig.js";

export async function CreateEvent(event) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${dataConfig.baseUrl}events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) throw new Error('Failed to create event');
    return await response.json();
  } catch (err) {
    throw err;
  }
}
