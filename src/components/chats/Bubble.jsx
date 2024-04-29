import PropTypes from "prop-types";
import { useContext } from "react";
import { ChatContext } from "./Chat";

const Bubble = ({ msg, index, currentUser }) => {
  const {chatType} = useContext(ChatContext)
  return (
    <div
      className={
        (msg?.messageFrom?.toString() === currentUser ||
        msg?.messageFrom?.idUser === currentUser) && chatType !== "2"
          ? "chatBoxMessage me"
          : "chatBoxMessage ucl"
      }
      key={index}
    >
      <div className="msg_container">
        <p>{msg.messageText || msg.message}</p>
      </div>
    </div>
  );
};

Bubble.propTypes = {
  msg: PropTypes.object,
  index: PropTypes.number,
  currentUser: PropTypes.string,
};

export default Bubble;
