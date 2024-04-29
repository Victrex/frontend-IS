import { useContext, useEffect, useState } from "react";
import { ChatContext } from "./Chat";
import { Button } from "../generalComponents/Button";


import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getProfilePhoto } from "../../fetch/userAPI";
import { useQuery } from "@tanstack/react-query";
import DropChatHeader from "./DropChatHeader";

const HeaderChat = () => {
  const { setMessage, setActiveChating, setCurrentChatMeta, currentChatMeta, chatType } =
    useContext(ChatContext);
  const [profilePhoto, setProfilePhoto] = useState("");
  const handleReturnChats = () => {
    setActiveChating(false);
    setMessage("");
    setCurrentChatMeta(null);
  };

  const { data: profilePhotoData } = useQuery({
    queryKey: ["profilePhoto", currentChatMeta?.profilePhoto],
    queryFn: () => getProfilePhoto(currentChatMeta?.profilePhoto),
    enabled: currentChatMeta?.profilePhoto ? true : false,
  });

  useEffect(() => {
    if (profilePhotoData) {
      setProfilePhoto(profilePhotoData);
    }
  }, [profilePhotoData]);

  useEffect(() => {
    if (currentChatMeta) {
      console.log("currentChatMeta", currentChatMeta);
    }
  }, [currentChatMeta]);

  return (
    <div className="chatBoxHeader">
      <div className="back">
        <Button
          innerText=""
          icon={<ArrowBackIcon />}
          width="50px"
          maxWidth="40px"
          minWidth="40px"
          onClick={handleReturnChats}
        />
      </div>
      <div className="profileImg">
        {profilePhoto && currentChatMeta?.profilePhoto !== 'nophoto' ? (
          <img src={profilePhoto} alt="" />
        ) : (
          <div className="noPhoto">
            {
              currentChatMeta?.firstname?.slice(0, 1).toUpperCase() || //cuando es un chat individual o de marketplace
                currentChatMeta?.firstName?.slice(0, 1).toUpperCase() || //cuando es un chat individual o de marketplace
                currentChatMeta?.idUser?.firstname.slice(0, 1).toUpperCase() || //cuando es un chat de canal de difusión
                currentChatMeta?.idUser?.firstName.slice(0, 1).toUpperCase() //cuando es un chat de canal de difusión
            }
            {
              currentChatMeta?.lastname?.slice(0, 1).toUpperCase() || //cuando es un chat individual o de marketplace
                currentChatMeta?.lastName?.slice(0, 1).toUpperCase() || //cuando es un chat individual o de marketplace
                currentChatMeta?.idUser?.lastname.slice(0, 1).toUpperCase() || //cuando es un chat de canal de difusión
                currentChatMeta?.idUser?.lastName.slice(0, 1).toUpperCase() //cuando es un chat de canal de difusión
            }
          </div>
        )}
      </div>
      <div className="chatBoxProfile">
        <h4>
          {
            currentChatMeta?.firstname || //cuando es un chat individual o de marketplace
              currentChatMeta?.firstName || //cuando es un chat individual o de marketplace
              currentChatMeta?.channelName || //cuando es un chat de canal de difusión
              currentChatMeta?.idChannel?.channelName //cuando es un chat de canal de difusión
          }{" "}
          {
            currentChatMeta?.lastname || //cuando es un chat individual o de marketplace
              currentChatMeta?.lastName //cuando es un chat individual o de marketplace
          }
        </h4>
      </div>
      {
        chatType === "2" && (<DropChatHeader />) //cuando es un chat de canal de difusión
      }
      
    </div>
  );
};

export default HeaderChat;
