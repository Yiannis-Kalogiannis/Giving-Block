import axios from 'axios';
import { useState, useEffect } from 'react';
import useConversationStore from '../store/chat.store/useConvarsationStore';

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { Messages, setMessages, selectedConversation } =
    useConversationStore();
  const token = localStorage.getItem('token');
  useEffect(() => {
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

        setMessages(response.data);
        console.log('Messages:', response.data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, Messages};
}

export default useGetMessages;
