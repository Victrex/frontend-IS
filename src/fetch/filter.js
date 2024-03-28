import env from "./env";
const url = env.API_BASE_URL;

export const getProductByDepartment = async (
  department,
  page,
  size,
  sort,
  filter
) => {
  try {
    const response = await fetch(
      `${url}product/getByDepartmentPaginated?page=${page}&size=${size}&sort=${sort}&filter=${filter}&idDepartment=${department}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getByDepartment", error);
    throw error;
  }
};
export const getProductByCategory = async (
  category,
  page,
  size,
  sort,
  filter
) => {
  try {
    const response = await fetch(
      `${url}product/getByCategoryPaginated?page=${page}&size=${size}&sort=${sort}&filter=${filter}&idCategory=${category}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getByDepartment", error);
    throw error;
  }
};
export const getProductByValue = async (price, page, size, sort, filter) => {
  try {
    const response = await fetch(
      `${url}product/getByValuePaginated?value=${price}&page=${page}&size=${size}&sort=${sort}&filter=${filter}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getByDepartment", error);
    throw error;
  }
};
export const getProductBySearch = async (search, page, size, sort, filter) => {
  try {
    const response = await fetch(
      `${url}product/searchPaginated?searchTerm=${search}&page=${page}&size=${size}&sort=${sort}&filter=${filter}`,
      {
        method: "GET",
        headers: env.HEADER,
      }
    );
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.error("Error en el get de getByDepartment", error);
    throw error;
  }
};

export const getProductByRange = async (
  minPrice,
  maxPrice,
  page,
  size,
  sort,
  filter
) => {
  try {
    const response = await fetch(
      `${url}product/getByRangePaginated?minValueParam=${
        minPrice <= maxPrice ? minPrice : maxPrice
      }&maxValueParam=${
        maxPrice >= minPrice ? maxPrice : minPrice
      }&page=${page}&size=${size}&sort=${sort}&filter=${filter}`,
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
    console.error("Error en get de getProductByRange", error);
    throw error;
  }
};
