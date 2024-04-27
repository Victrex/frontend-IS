import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { ChatContext } from "./Chat";
import { getUserChats, searchChats } from "../../fetch/webSocket";
import { useAuthStore } from "../store/auth";

const ChatBoxListHeader = () => {
  const { chatType, setChatsList } = useContext(ChatContext);
  const user = useAuthStore((state) => state.idUser);
  //   const chatListRecovery = Object.freeze(chatsList)
  const fetchChats = async () => {
    await getUserChats(
      user,
      chatType === "0" ? false : chatType === "1" ? true : false
    )
      .then((response) => setChatsList(response))
      .catch(() => setChatsList([]));
  };

  const filtrar = async (e) => {
    if (e.target.value === "") {
      fetchChats();
    }
    await searchChats(e.target.value, chatType).then((response) => {
      console.log(response);
      setChatsList(response);
    });
  };

  return (
    <div className="chatBoxListHeaderContainer">
      <h3>
        {chatType === "0"
          ? "Chats"
          : chatType === "1"
          ? "MarketPlace"
          : chatType === "2"
          ? "Canales de Difusión"
          : ""}
      </h3>
      <br />

      <div className="searchHeader">
        <input
          type="text"
          name="search"
          className="search"
          placeholder="¿Qué buscas?"
          onChange={filtrar}
        />
        <label htmlFor="search">
          <SearchIcon />
        </label>
      </div>
    </div>
  );
};

export default ChatBoxListHeader;
