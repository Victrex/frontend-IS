import StorefrontIcon from '@mui/icons-material/Storefront';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import { useContext, useEffect } from 'react';
import { ChatContext } from './Chat';

const ChatAside = () => {

    const {chatType, setChatType, setChatsList} = useContext(ChatContext);

    const handleSelected = (e) => {
        setChatType(e.currentTarget.id);
        // setChatsList([]);
    } 

    useEffect(() => {
        setChatsList([]);
    }, [chatType, setChatsList])

  return (
    <div className='sidebar chat' style={{maxWidth: '70px'}}>
        
        <div className="elementsSideBar">
        <div className={chatType === '0' ? 'chatTypeElement activeChatSection' : 'chatTypeElement'} id="0" onClick={handleSelected}>
                <ChatIcon />
        </div>
        <div className={chatType === '1' ? 'chatTypeElement activeChatSection' : 'chatTypeElement'} id="1" onClick={handleSelected}>
            
                <StorefrontIcon />
        </div>
        <div className={chatType === '2' ? 'chatTypeElement activeChatSection' : 'chatTypeElement'} id="2" onClick={handleSelected}>
            
                <GroupsIcon />
        </div>
      </div>
    </div>
  )
}

export default ChatAside