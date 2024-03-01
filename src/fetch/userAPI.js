import env from './env'

export const registerUser = async (userData) => {
  console.log(userData)
  try {
    const response = await fetch(`${env.API_BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    // console.log(data)
    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    return await data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const sendProfilePhoto = async (photo) => {
  // photo.append('photo', photo)
  try {
    const formData = new FormData();
    formData.append('file', photo.file); // Accede al atributo 'file' del objeto 'photo'
    formData.append('idUser', photo.idUser);
    
    console.log(formData)
    const response = await fetch(`${env.API_BASE_URL}storage/profilephoto`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error('Error al subir la foto');
    }

    return await data;
  } catch (error) {
    throw new Error(error.message);
  }
};