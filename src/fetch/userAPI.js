import env from "./env";

export const registerUser = async (userData) => {
  console.log(userData);
  try {
    const response = await fetch(`${env.API_BASE_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    /* if (!response.ok) {
      throw new Error('Error al registrar usuario');
    } */

    return await data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* export const sendProfilePhoto = async (photo) => {
  // photo.append('photo', photo)
  try {
    const formData = new FormData();
    console.log(photo)
    formData.append("file", photo.file); // Accede al atributo 'file' del objeto 'photo'
    formData.append("idUser", photo.idUser);

    console.log(formData);
    const response = await fetch(`${env.API_BASE_URL}photo/saveProfilePhoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Error al subir la foto");
    }

    return await data;
  } catch (error) {
    throw new Error(error.message);
  }
}; */

export const sendProfilePhoto = async (photo) => {
  // photo.append("photo", photo);
  try {
    const formData = new FormData();
    formData.append("photo", photo.file); // Accede al atributo 'file' del objeto 'photo'
    formData.append("idUser", photo.idUser);

    const response = await fetch(`${env.API_BASE_URL}photo/saveProfilePhoto`, {
      method: "POST",

      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error al subir la foto");
    }

    return await data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProfilePhoto = async (idUser) => {
  try {
    const response = await fetch(
      `${env.API_BASE_URL}photo/${idUser}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const blob = await response.blob();

    // Crear una URL de objeto a partir del blob
    const imageUrl = URL.createObjectURL(blob);
    // console.log(imageUrl);
    if (!response.ok) {
      throw new Error("Error al obtener la foto");
    }

    return imageUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};
