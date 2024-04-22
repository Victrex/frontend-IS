import env from "./env";



export const getStatistics = async () => {
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

export const updateCurrentPeriod = async (period) => {
  const url = env.API_BASE_URL;
  try {//1 es para el periodo actual
    const response = await fetch(`${url}globalVariable/updateValue?idGlobalVariable=1&value=${period}`, {
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


export const getCurrentPeriod = async () => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}globalVariable/getById?idGlobalVariable=1`, {
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