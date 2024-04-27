import { useContext, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "./Chat";
import Bubble from "./Bubble";
import { useAuthStore } from "../store/auth";
import HeaderChat from "./HeaderChat";

// ChatBoxContent component - renders the chat box content - messages: array of messages
// messages: array of historical messages
// message: string message
// setMessage: function to set the message
// sendMessage: function to send the message
// stompClient: stomp client
// user: user id
// setMessages: function to set the messages

const ChatBoxContent = () => {
  const idUser = useAuthStore((state) => state.idUser);
  const user = useAuthStore((state) => state.user);
  const {
    message,
    setMessage,
    messages,
    idProduct,
    setMessages,
    stompClient,
    chatType,
  } = useContext(ChatContext);

  const { activeChat } = useContext(ChatContext);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message === "") return;
    // Emite el evento 'chat message' con el mensaje
    //luego hay que cambiar fromLogin por el id del usuario y el key solo seria user

    const payload =
      chatType === "1"
        ? {
            idMessage: "0",
            messageText: message,
            username: user?.username,
            idUser: idUser,
            isBusiness:
              chatType === "0" ? false : chatType === "1" ? true : false,
            idProduct: idProduct,
          }
        : chatType === "1"
        ? {
            idMessage: "0",
            messageText: message,
            username: user?.username,
            idUser: idUser,
            isBusiness:
              chatType === "0" ? false : chatType === "1" ? true : false,
            idProduct: "",
          }
        : {
            idMessage: "0",
            messageText: message,
            username: user?.username,
            idUser: idUser,
            idChannel: activeChat,
          };
    if (chatType === "2") {
      stompClient.send(
        `/app/channel/${activeChat}`,
        {},
        JSON.stringify(payload) // Add a comma here
      );
    } else {
      stompClient.send(
        `/app/chat/${activeChat}`,
        {},
        JSON.stringify(payload) // Add a comma here
      );
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { messageText: message, idUser: { idUser: idUser } },
    ]);
    setMessage("");
  };

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector(".chatBoxContent");
    container.scrollTop = container.scrollHeight;
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <section className="chatBox">
      <HeaderChat />
      <div className="chatBoxContent">
        {messages.map((msg, index) => {
          return <Bubble key={index} msg={msg} currentUser={idUser} />;
        })}
      </div>
      <div className="chatBoxFooter">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e);
            }
          }}
        />
        <button onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </section>
  );
};

export default ChatBoxContent;
