import env from "./env";

export const login = async (user) => {
  const url = env.API_BASE_URL;
  const response = await fetch(`${url}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  // console.log(data)
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return data;
};

export const getAllUser = async (token) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}user/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETALLUSER", error);
    throw error;
  }
};

export const getUser = async (token) => {
  const url = env.API_BASE_URL;
  const response = await fetch(`${url}user/getByJWT?jwt=`, {
    method: "GET",
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        }
      : env.HEADER,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return data;
};

export const test = async () => {
  const url = env.API_BASE_URL;

  const response = await fetch(`${url}test`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  /* if (!response.ok) {
    throw new Error(response.statusText)
  } */
  return data;
};


export const getTerms = async () => {
  const url = env.API_BASE_URL;

  const response = await fetch(`${url}termOfService/getById?idTerm=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  /* if (!response.ok) {
    throw new Error(response.statusText)
  } */
  return data;
}