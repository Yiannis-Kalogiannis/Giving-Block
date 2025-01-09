import { useSocketContext } from "../context/SocketContext";
import useConversationStore from "../store/chat.store/useConvarsationStore";
import { useEffect } from "react";



const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversationStore();

	
	  
		useEffect(() => {
			socket?.on("newMessage", (newMessage) => {
		 console.log("New message received:", newMessage);
				setMessages([...messages, newMessage]);
			});
	  
		return () => {
		  socket.off('newMessage');
		};
	  }, [socket, setMessages]);
	  
};
export default useListenMessages;