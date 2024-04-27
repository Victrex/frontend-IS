

import SendIcon from "@mui/icons-material/Send";
import { Button } from "../generalComponents/Button";
import { Client } from "stompjs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const ClientOfferText = ({ productData }) => {
  const [message, setMessage] = useState("");
  const idUser = useAuthStore((state) => state.idUser);
  const user = useAuthStore((state) => state.user);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      console.log("Connected to WebSocket server"); // Agrega esta línea
      client.subscribe(
        `/topic/"businessMessages"/${idUser}`,
        (messageOutput) => {
          const recievedMessage = JSON.parse(messageOutput.body);
          console.log("Received message:", recievedMessage);
        }
      );
    });

    setStompClient(client);
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      console.log("Disconnected");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (message === "") return;
    console.log("Hacer una oferta");
    console.log(message);
    stompClient.send(
      `/app/chat/${productData?.idUser?.idUser}`,
      {},
      JSON.stringify({
        idMessage: "0",
        messageText: message,
        username: user?.username,
        idUser: idUser,
        isBusiness: true,
        idProduct: productData?.idProduct,
      })
    );
  };

  return (
    <div className="offerTextContainer">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <Button
        innerText=""
        icon={<SendIcon />}
        width="20px"
        maxWidth="20px"
        minWidth="20px"
        backgroundColor="#00000000"
        color="#0f72ba"
        onClick={handleClick}
      />
    </div>
  );
};
ClientOfferText.propTypes = {
  productData: PropTypes.object,
};
export default ClientOfferText;
