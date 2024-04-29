import "./init";

import "../../assets/css/chat.css";

import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getAllMessages, getChannelHistory } from "../../fetch/webSocket";
import ChatBoxList from "./ChatBoxList";
import ChatBoxContent from "./ChatBoxContent";
import ChatAside from "./ChatAside";
import { useAuthStore } from "../store/auth";
import NavBar from "../generalComponents/NavBar";

export const ChatContext = React.createContext();

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [activeChat, setActiveChat] = useState(null); //index of the active chat
  const [activeChating, setActiveChating] = useState(false); //this is for responsive design, to show the chat box in mobile or chat list
  const [chatType, setChatType] = useState("0"); //this is if the chat list are a group or a single chat
  const [chatsList, setChatsList] = useState([]); //this is the chat list [id, name, image, type]
  const user = useAuthStore((state) => state.idUser); //this is the current user id
  const [idProduct, setIdProduct] = useState(null); //this is the id of the product if the chat is from a product
  const [currentChatMeta, setCurrentChatMeta] = useState(null); //this is the current chat meta [id, name, image, type

  // messages query to get all messages for the user and the chat id

  // useEffect(() => {
  //   if (allMessages) {
  //     setMessages(allMessages);
  //   }
  // }, [allMessages]);

  useEffect(() => {
    if(chatType === "2") return;
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      // console.log("Connected to WebSocket server"); // Agrega esta línea
      client.subscribe(
        `/topic/${
          chatType === "0"
            ? "messages"
            : chatType === "1"
            ? "businessMessages"
            : `messages/${activeChat}`
        }/${user}`,
        (messageOutput) => {
          const recievedMessage = JSON.parse(messageOutput.body);
          // console.log("Received message:", recievedMessage);
          setMessages((prevMessages) => [...prevMessages, recievedMessage]);
        }
      );
    });

    setStompClient(client);
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      // console.log("Disconnected");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatType]);

  useEffect(() => {
    if (chatType !== "2") return;
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      // console.log("Connected to WebSocket server"); // Agrega esta línea
      client.subscribe(
        `/topic/channelMessages/${activeChat}`,
        (messageOutput) => {
          const recievedMessage = JSON.parse(messageOutput.body);
          // console.log("Received message:", recievedMessage);
          setMessages((prevMessages) => [...prevMessages, recievedMessage]);
        }
      );
    });

    setStompClient(client);
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      // console.log("Disconnected");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat, chatType]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      if (activeChat === null) return;
      getAllMessages(
        user,
        activeChat,
        chatType === "0" ? false : chatType === "1" ? true : false,
        idProduct
      ).then((res) => {
        // res.json();
        setMessages(res);
      });
    };
    const fetchAllChannelMessages = async () => {
      setMessages([]);
      getChannelHistory(activeChat, user).then((res) => {
        // res.json();
        setMessages(res);
      });
    };
    if (chatType === "2") {
      fetchAllChannelMessages();
    } else {
      fetchAllMessages();
    }
  }, [activeChat, chatType, idProduct, user]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        stompClient,
        setStompClient,
        message,
        setMessage,
        activeChat,
        setActiveChat,
        activeChating,
        setActiveChating,
        chatType,
        setChatType,
        idProduct,
        setIdProduct,
        currentChatMeta,
        setCurrentChatMeta,
        chatsList,
        setChatsList,
      }}
    >
      <div className="chatContainer">
        <NavBar />
        <main className="chatContent">
          <div
            className={
              activeChating === false
                ? "chatSideBarContent"
                : "chatSideBarContent f0"
            }
          >
            <ChatAside />
            <ChatBoxList  />
          </div>
          <div
            className={
              activeChating === true ? "chatContentBody" : "chatContentBody f0"
            }
          >
            <ChatBoxContent />
          </div>
        </main>
      </div>
    </ChatContext.Provider>
  );
};

export default Chat;
