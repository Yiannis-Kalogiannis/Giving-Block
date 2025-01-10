import axios from 'axios';
import { useState } from 'react';
import useConversationStore from '../store/chat.store/useConversationStore';


const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationStore();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/messages/send/${selectedConversation._id}`,
        { message }, // Include the message in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Response data contains the new message
      const newMessage = response.data;
      console.log('New message sent:', newMessage);

      // Ensure the message belongs to the current conversation
      if (newMessage.receiverId === selectedConversation._id || newMessage.senderId === selectedConversation._id) {
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
