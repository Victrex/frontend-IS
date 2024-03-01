import env from "./env";
const url = env.API_BASE_URL;
export const getAllDepartments = async () => {
  try {
    const response = await fetch(`${url}department/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    // console.log(data)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllDepartments", error);
    throw error;
  }
};

export const getAllMunicipalities = async () => {
  try {
    const response = await fetch(`${url}municipality/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    // console.log(data)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getAllMunicipalities", error);
    throw error;
  }
};

export const getVillageByIdMunicipality = async (id) => {
  try {
    const response = await fetch(
      `${url}village/getByIdMunicipality?idMunicipality=${id}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const data = await response.json();
    // console.log(data)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getVillageByIdMunicipality", error);
    throw error;
  }
};
