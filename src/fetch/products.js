import env from "./env";

const url = env.API_BASE_URL;

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${url}product/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllProducts", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${url}product/getById?id=${id}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getProductById", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch(`${url}product/create`, {
      method: "POST",
      headers: env.HEADER,
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el post de createProduct", error);
    throw error;
  }
};

export const getAllProductCategories = async () => {
  try {
    const response = await fetch(`${url}productCategory/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllCategories", error);
    throw error;
  }
};

export const getAllProductStatus = async () => {
  try {
    const response = await fetch(`${url}status/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllStatus", error);
    throw error;
  }
};

export const getAllProductConditions = async () => {
  try {
    const response = await fetch(`${url}productCondition/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllConditions", error);
    throw error;
  }
}

export const saveProductPhotos = async (photos, idProduct) => {
  try {
    const formData = new FormData();
    formData.append("idProduct", idProduct);
    photos.forEach((photo) => {
      formData.append("photo", photo.file);
    });
    const response = await fetch(`${url}photo/saveProductPhotos`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el post de saveProductPhotos", error);
    throw error;
  }
}

export const saveProduct = async (product) => {
  try {
    const response = await fetch(`${url}product/save`, {
      method: "POST",
      headers: env.HEADER,
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el post de saveProduct", error);
    throw error;
  }
}

export const getAllProductPaginated = async (page = 0, size = 10) => {
  try {
    const response = await fetch(`${url}product/getAllPaginated?page=${page}&size=${size}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllPaginated", error);
    throw error;
  }
}

export const getProductPhoto = async (idPhoto) => {
  try {
    const response = await fetch(
      `${url}photo/${idPhoto}`,
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
}

export const getProductsByUser = async (idUser) => {
  try {
    const response = await fetch(`${url}product/getByUser?idUser=${idUser}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getProductsByUser", error);
    throw error;
  }
}