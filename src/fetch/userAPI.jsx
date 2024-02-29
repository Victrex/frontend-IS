import env from './env'

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
