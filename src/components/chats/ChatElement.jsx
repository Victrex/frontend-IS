import { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { ChatContext } from "./Chat";
import { getProfilePhoto } from "../../fetch/userAPI";
import { useQuery } from "@tanstack/react-query";

// ChatElement component - this is one of the chat elements in the chat list
// elementData: object with chat data - id: chat id, name: chat username

const ChatElement = ({ elementData, index }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  console.log(elementData)
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
    setActiveChat(element?.idUser);
    setActiveChating(true);
    setMessage("");
    setIdProduct(element?.idProduct);
    setCurrentChatMeta(element);
    console.log(element);
  };

  const { data: profilePhotoData } = useQuery({
    queryKey: ["profilePhoto", elementData?.profilePhoto],
    queryFn: () => {
      if (element?.idUser) {
        return getProfilePhoto(elementData?.profilePhoto) || Promise.resolve(null);
      } else {
        return Promise.resolve(null);
      }
    },
  });


  // useEffect(() => {
  //   async function fetchData() {
  //     const photo = await getProfilePhoto(elementData?.profilePhoto)
  //       .then(async (res) => {
  //         if (!res) {
  //           return null;
  //         } else {
  //           return res;
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //     setProfilePhoto(photo);
  //   }
  //   fetchData();
  // }, [elementData]);

  useEffect(() => {
    console.log('profilePhotoData', profilePhotoData)
    if (profilePhotoData !== null) {
      setProfilePhoto(profilePhotoData);
    }
  }, [profilePhotoData]);
  return (
    <div
      className={
        activeChat === element?.idUser ? "chatItem active" : "chatItem"
      }
      id={index}
      onClick={handleActiveChat}
    >
      <div className="chatItemImg">
        {profilePhoto && elementData?.profilePhoto !== 'nophoto' ? (
          <img src={profilePhoto} alt="" />
        ) : (
          <div className="noPhoto">
            {element?.firstname?.slice(0, 1).toUpperCase() || element?.firstName?.slice(0, 1).toUpperCase()}
            {element?.lastname?.slice(0, 1).toUpperCase() || element?.lastName?.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="chatItemContent">
        <div className="chatItemHeader">
          <h4>{element?.firstname || element?.firstName } {element?.lastname || element?.lastName }</h4>
          <span></span>
        </div>
        <p>{element?.latestMessage}</p>
      </div>
    </div>
  );
};

ChatElement.propTypes = {
  elementData: PropTypes.object,
  index: PropTypes.number,
};

export default ChatElement;
