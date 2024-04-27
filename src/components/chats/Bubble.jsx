import PropTypes from "prop-types";

const Bubble = ({ msg, index, currentUser }) => {
  return (
    <div
      className={
        msg?.messageFrom?.toString() === currentUser ||
        msg?.messageFrom?.idUser === currentUser
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
