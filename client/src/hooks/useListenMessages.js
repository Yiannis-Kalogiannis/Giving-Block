import { useSocketContext } from '../context/SocketContext';
import useConversationStore from '../store/chat.store/useConversationStore';
import { useEffect } from 'react';
import useGetMessages from '../hooks/useGetMessages';

console.log(useGetMessages);
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversationStore();
console.log("This is the mnesseges:", messages);
useEffect(() => {
  socket?.on("newMessage", (newMessage) => {
      console.log("Received new message:", newMessage);

      // Check if the message belongs to the current conversation
      if (
          newMessage.receiverId === selectedConversation._id ||
          newMessage.senderId === selectedConversation._id
      ) {
          setMessages((prevMessages) => {
              const safePrevMessages = Array.isArray(prevMessages) ? prevMessages : [];
              return [...safePrevMessages, newMessage];
          });
      } else {
          console.log(
              "Message does not belong to the current conversation. Ignored."
          );
      }
  });

  return () => {
      socket?.off("newMessage");
  };
}, [socket, selectedConversation, setMessages]);


};
export default useListenMessages;
