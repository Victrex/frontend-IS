import { useQuery } from "@tanstack/react-query";
import { getProfilePhoto } from "../../fetch/userAPI";

import { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { ChatContext } from "./Chat";
const ChannelElement = ({ elementData, index }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
//   console.log("elementData", elementData);

  const {
    activeChat,
    setActiveChat,
    setActiveChating,
    setMessage,
    setIdProduct,
    setCurrentChatMeta,
  } = useContext(ChatContext);

  const [element] = useState(elementData);
  //   console.log(elementData);

  const handleActiveChat = () => {
    setActiveChat(element?.idChannel?.idChannel || element?.idChannel);
    setActiveChating(true);
    setMessage("");
    setIdProduct(element?.idProduct);
    setCurrentChatMeta(element);
    // console.log(element);
  };

  const { data: profilePhotoData } = useQuery({
    queryKey: ["profilePhoto", element?.idUser],
    queryFn: () => {
      if (element?.idUser) {
        return getProfilePhoto(element?.idUser) || Promise.resolve(null);
      } else {
        return Promise.resolve(null);
      }
    },
  });

  useEffect(() => {
    console.log("profilePhotoData", profilePhotoData);
    if (profilePhotoData !== null) {
      setProfilePhoto(profilePhotoData);
    }
  }, [profilePhotoData]);
  return (
    <div
      className={
        activeChat === element?.idUser.idUser ? "chatItem active" : "chatItem"
      }
      id={index}
      onClick={handleActiveChat}
    >
      <div className="chatItemImg">
        {profilePhoto ? (
          <img src={profilePhoto} alt="" />
        ) : (
          <div className="noPhoto">
            {element?.idUser?.firstname?.slice(0, 1).toUpperCase() ||
              element?.idUser?.firstName?.slice(0, 1).toUpperCase()}
            {element?.idUser?.lastname?.slice(0, 1).toUpperCase() ||
              element?.idUser?.lastName?.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="chatItemContent">
        <div className="chatItemHeader">
          <h4>
            {element?.idChannel?.channelName || element?.channelName}{" "}
          </h4>
          <span></span>
        </div>
        <p>{element?.idChannel?.idUser?.firstName || element?.idChannel?.idUser?.firstname || element?.idUser?.firstname || element?.idUser?.firstName}{" "}
            {element?.idChannel?.idUser?.lastName || element?.idChannel?.idUser?.lastname || element?.idUser?.lastname || element?.idUser?.lastName}</p>
      </div>
    </div>
  );
};

ChannelElement.propTypes = {
  elementData: PropTypes.object,
  index: PropTypes.number,
};

export default ChannelElement;
