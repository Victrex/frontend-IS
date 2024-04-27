import PropTypes from "prop-types";
import ChatElement from "./ChatElement";
import { useContext, useEffect, useState } from "react";
import {
  createChannel,
  getAllChannels,
  getCurrentUserChannels,
  getUserChats,
} from "../../fetch/webSocket";
import { ChatContext } from "./Chat";
import { useAuthStore } from "../store/auth";
import ChatBoxListHeader from "./ChatBoxListHeader";
import ChannelElement from "./ChannelElement";
import AddIcon from "@mui/icons-material/Add";

// ChatBoxList component - renders the list of chats in the chat box - chatList: array of chat objects
// chatList: array of chat objects
// searchType: string to search for type of chats, 0 individual or 1 group or 2 marketplace
const ChatBoxList = () => {
  const { chatType, chatsList, setChatsList } = useContext(ChatContext);
  const user = useAuthStore((state) => state.idUser);
  const [channelType, setChannelType] = useState("0"); //this is if the list of mine channels or explore channels
  const [channelName, setChannelName] = useState("");
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const handleCreateChannel = async () => {
    if (channelName === "") return;
    await createChannel({ idUser: user, channelName: channelName })
      .then((response) => setChatsList(response))
    location.reload();
    await getCurrentUserChannels(user)
      .then((response) => setChatsList(response))
      .catch(() => setChatsList([]));
  };

  const handleChannelType = async (e) => {
    setChatsList([]);
    setChannelType(e.target.id);
    if (e.target.id === "0") {
      await getCurrentUserChannels(user)
        .then((response) => setChatsList(response))
        .catch(() => setChatsList([]));
    } else if (e.target.id === "1") {
      await getAllChannels()
        .then((response) => setChatsList(response))
        .catch(() => setChatsList([]));
    }
  };

  const handleAddChannel = async () => {
    setChannelType("0");
    setChannelName("");
    setIsCreatingChannel(!isCreatingChannel);
  };

  useEffect(() => {
    const fetchChats = async () => {
      await getUserChats(
        user,
        chatType === "0" ? false : chatType === "1" ? true : null
      )
        .then((response) => setChatsList(response))
        .catch(() => setChatsList([]));
    };
    const fetchChanels = async () => {
      await getCurrentUserChannels(user)
        .then((response) => setChatsList(response))
        .catch(() => setChatsList([]));
    };
    if (chatType === "2") {
      fetchChanels();
    } else {
      fetchChats();
    }
  }, [chatType, setChatsList, user]);

  return (
    <section className="chatList">
      <ChatBoxListHeader />

      {chatType === "2" && (
        <div className="channelsActions">
          <span
            className={channelType === "0" ? "active" : ""}
            id="0"
            onClick={handleChannelType}
          >
            Mis Canales
          </span>
          <span
            className={channelType === "1" ? "active" : ""}
            id="1"
            onClick={handleChannelType}
          >
            Explorar
          </span>
          <span style={{ maxWidth: "30px" }} onClick={handleAddChannel}>
            <AddIcon />
          </span>
        </div>
      )}
      {!!isCreatingChannel && (
        <div className="isCreatingChannelContainer">
          <input
            type="text"
            name="Nombre"
            id=""
            onChange={(e) => setChannelName(e.target.value)}
            value={channelName}
            placeholder="Nombre del Canal"
          />
          <button onClick={handleCreateChannel}>Crear Cannal</button>
        </div>
      )}

      {chatsList && chatType !== "2"
        ? chatsList?.map((chat, index) => {
            return (
              <ChatElement
                key={chat?.idUser}
                elementData={chat}
                index={index}
              />
            );
          })
        : chatsList && chatType === "2"
        ? chatsList?.map((chat, index) => {
            return (
              <ChannelElement key={chat?.id} elementData={chat} index={index} />
            );
          })
        : null}
    </section>
  );
};

ChatBoxList.propTypes = {
  searchType: PropTypes.string,
};

export default ChatBoxList;
