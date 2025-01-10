import { create } from 'zustand';
// import Messages from '../../components/ChatComponents/Messages';


const useConversationStore = create((set) => ({
    selectedConversation: "",
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversationStore;
