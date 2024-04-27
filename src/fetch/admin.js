import env from "./env";



export const getStatistics = async () => {
  // console.log("GETSTATISTICS", env.HEADER)
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}report/getCounts`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETSTATISTICS", error);
    throw error;
  }
};

export const getTops = async () => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}report/getTops`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETTOPS", error);
    throw error;
  }
}

export const updateCurrentPeriod = async (id, period) => {
  const url = env.API_BASE_URL;
  try {//1 es para el periodo actual
    const response = await fetch(`${url}globalVariable/updateValue?idGlobalVariable=${id}&value=${period}`, {
      method: "PUT",
      headers: env.HEADER
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN PUTPERIOD", error);
    throw error;
  }
}


export const getCurrentPeriod = async (id) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}globalVariable/getById?idGlobalVariable=${id}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETPERIOD", error);
    throw error;
  }
}

export const getAddress = async (idAddress) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}address/getById?idAddress=${idAddress}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETADDRESS", error);
    throw error;
  }
}