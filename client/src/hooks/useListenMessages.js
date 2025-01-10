import { useSocketContext } from '../context/SocketContext';
import useConversationStore from '../store/chat.store/useConversationStore';
import { useEffect } from 'react';
import useGetMessages from '../hooks/useGetMessages';
console.log(useGetMessages);
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationStore();
console.log("This is the mnesseges:", messages);
  useEffect(() => {
    socket?.on('newMessage', newMessage => {
      console.log('New message received:', newMessage);
      setMessages([...messages, newMessage]);

	  

    });
	
	console.log('uselisten messages:', messages);
    return () => {
      socket.off('newMessage');
    };
  }, [socket, setMessages]);
};
export default useListenMessages;
