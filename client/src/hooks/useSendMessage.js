import axios from 'axios';
import { useState } from 'react';
import useConversationStore from "../store/chat.store/useConvarsationStore";

function useSendMessage() {
    const [loading, setLoading] = useState(false);
const {Messages, setMessages, selectedConversation} = useConversationStore();
const token = localStorage.getItem('token');
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/messages/send/${selectedConversation._id}`, {message}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            if (Array.isArray(Messages)) {
                setMessages([...Messages, response.data]); // If it's an array, add the new message
            } else {
                setMessages([response.data]); // Otherwise, initialize with the new message
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }finally {
            setLoading(false);
        }
    }

    return {sendMessage, loading};
}

export default useSendMessage;