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
    }