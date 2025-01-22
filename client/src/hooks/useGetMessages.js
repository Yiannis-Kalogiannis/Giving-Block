import axios from 'axios';
import { useState, useEffect } from 'react';
import useConversationStore from '../store/chat.store/useConversationStore';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();
  const token = localStorage.getItem('token');
  const getMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/messages/getMessages/${selectedConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response:', response.data);
      // Check if response data is an array

      setMessages(response.data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
