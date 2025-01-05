import { create } from 'zustand';
// import Messages from '../../components/ChatComponents/Messages';


const useConversationStore = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    Messages: [],
    setMessages: (messages) => set({ Messages: messages }),
}));

export default useConversationStore;
