import env from "./env";
const url = env.API_BASE_URL;

/* export const getProductByDepartment = async (department, sort, filter) => {
  try {
    const response = await fetch(
      `${url}product/getByDepartment/idDepartment¿${department}&sort${sort}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getByDepartment", error);
    throw error;
  }
}; */
