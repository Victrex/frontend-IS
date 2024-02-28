
const API_BASE_URL = 'http://localhost:3000'; // Reemplaza esto con la URL de tu API

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
