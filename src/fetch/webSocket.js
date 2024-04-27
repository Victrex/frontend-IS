import env from "./env";

//history chat
export const getAllMessages = async (currentId, idUser, isBusiness, idProduct) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}message/history?idUser1=${currentId}&idUser2=${idUser}&isBusiness=${isBusiness}${isBusiness === true ? `&idProduct=${idProduct}` : ''}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETMESSAGES", error);
    throw error;
  }
};

//individual chats
export const getUserChats = async (currentId, isBusiness) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}message/list?idUser=${currentId}&isBusiness=${isBusiness}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETINDIVIDUALCHATS", error);
    throw error;
  }
}


export const searchChats = async (search, chatType) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}${chatType === "0" ? "user" : chatType === "2" ? "channel" : "user"}/search?searchTerm=${search}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN SEARCHCHATS", error);
    throw error;
  }
}


export const getCurrentUserChannels = async (currentId) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channelMember/getByIdUser?idUser=${currentId}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETCURRENTUSERCHANNELS", error);
    throw error;
  }
}

export const getAllChannels = async () => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channel/getAll`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETALLCHANNELS", error);
    throw error;
  }
}

export const createChannel = async (body) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channel/save`, {
      method: "POST",
      headers: env.HEADER,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN CREATECHANNEL", error);
    throw error;
  }
}

export const getChannelHistory = async (idChannel, idUser) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channelMessage/history?idChannel=${idChannel}&idUser=${idUser}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN GETCHANNELHISTORY", error);
    throw error;
  }
}

export const isChannelMember = async (idChannel, idUser) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channelMember/exists?idChannel=${idChannel}&idUser=${idUser}`, {
      method: "GET",
      headers: env.HEADER,
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN ISCHANNELMEMBER", error);
    throw error;
  }
}

export const unsuscribeChannel = async (idChannel, idUser) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channelMember/delete?idChannel=${idChannel}&idUser=${idUser}`, {
      method: "DELETE",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN UNSUSCRIBECHANNEL", error);
    throw error;
  }
}

export const subscribeChannel = async (idChannel, idUser) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channelMember/save?idChannel=${idChannel}&idUser=${idUser}`, {
      method: "POST",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN SUBSCRIBECHANNEL", error);
    throw error;
  }
}

export const deleteChannel = async (idChannel) => {
  const url = env.API_BASE_URL;
  try {
    const response = await fetch(`${url}channel/delete?idChannel=${idChannel}`, {
      method: "DELETE",
      headers: env.HEADER,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR EN DELETECHANNEL", error);
    throw error;
  }
}