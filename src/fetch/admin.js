import env from "./env";



export const getStatistics = async () => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}report/getCounts`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETSTATISTICS", error);
    throw error;
  }
};
