import { dataConfig } from "../../dataConfig.js";

export async function GetUsersByUsernamePassword({ email, password }) {
  try {
    const response = await fetch(`${dataConfig.baseUrl}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null; // משתמש לא נמצא
      }
      throw new Error('Server error');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error in GetUsersByUsernamePassword:', error);
    throw error;
  }
}
