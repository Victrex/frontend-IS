import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useRef, useState } from "react";
import {
  deleteChannel,
  getCurrentUserChannels,
  isChannelMember,
  subscribeChannel,
  unsuscribeChannel,
} from "../../fetch/webSocket";
import { useAuthStore } from "../store/auth";
import { ChatContext } from "./Chat";

const DropChatHeader = () => {
  const [activeDrop, setActiveDrop] = useState(false);
  const idUser = useAuthStore((state) => state.idUser);
  const [isMember, setIsMember] = useState(false);
  const { activeChat, currentChatMeta, setChatsList, setActiveChating } =
    useContext(ChatContext);
  const dropChatHeaderContent = useRef(null);

  const handleClickOutside = (event) => {
    if (
      dropChatHeaderContent.current &&
      !dropChatHeaderContent.current.contains(event.target)
    ) {
      setActiveDrop(false);
    }
  };

  const handleUnsuscribeChannel = async () => {
    await unsuscribeChannel(activeChat, idUser)
      .then(() => {
        setIsMember(false);
      })
      .catch(() => {
        setIsMember(true);
      });

    await getCurrentUserChannels(idUser)
      .then((response) => setChatsList(response))
      .catch(() => setChatsList([]));
  };

  const handleSuscribeChannel = async () => {
    await subscribeChannel(activeChat, idUser)
      .then(() => {
        setIsMember(true);
      })
      .catch(() => {
        setIsMember(false);
      });

    await getCurrentUserChannels(idUser)
      .then((response) => setChatsList(response))
      .catch(() => setChatsList([]));
  };

  const handleDeleteChannel = async () => {
    await deleteChannel(activeChat)
      .then(() => {
        setIsMember(false);
      })
      .catch(() => {
        setIsMember(true);
      });
    setActiveChating(false);

    await getCurrentUserChannels(idUser)
      .then((response) => setChatsList(response))
      .catch(() => setChatsList([]));
  };

  /* WATHCHER */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClicDots = () => {
    setActiveDrop(!activeDrop);
  };

  useEffect(() => {
    const fetchIsMember = async () => {
      await isChannelMember(activeChat, idUser)
        .then((response) => setIsMember(response?.message))
        .catch(() => setIsMember(false));
    };
    fetchIsMember();
  }, [activeChat, idUser]);


  return (
    <div className="dropChatHeader" ref={dropChatHeaderContent}>
      <span onClick={handleClicDots}>
        <MoreVertIcon />
      </span>
      <div
        className={
          activeDrop === true
            ? "dropChatHeaderContent activeDrop"
            : "dropChatHeaderContent"
        }
      >
        {isMember === "True" &&
        (currentChatMeta?.idChannel?.idUser?.idUser ||
          currentChatMeta?.idUser?.idUser) !== idUser ? (
          <div className="dropChatHeaderItem" onClick={handleUnsuscribeChannel}>
            <p>Salir del Canal</p>
          </div>
        ) : isMember === "False" &&
          (currentChatMeta?.idChannel?.idUser?.idUser ||
            currentChatMeta?.idUser?.idUser) !== idUser ? (
          <div className="dropChatHeaderItem" onClick={handleSuscribeChannel}>
            <p>Suscribirse</p>
          </div>
        ) : (
          ""
        )}
        {(currentChatMeta?.idChannel?.idUser?.idUser ||
          currentChatMeta?.idUser?.idUser) === idUser ? (
          <div className="dropChatHeaderItem" onClick={handleDeleteChannel}>
            <p>Cerrar el canal de difusión</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DropChatHeader;
