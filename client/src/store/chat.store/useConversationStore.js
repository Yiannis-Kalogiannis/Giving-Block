import { create } from 'zustand';

const useConversationStore = create((set) => ({
    selectedConversation: "",
    setSelectedConversation: (conversation) =>
        set((state) => {
            if (state.selectedConversation !== conversation) {
                return { selectedConversation: conversation, messages: [] }; // Clear messages
            }
            return { selectedConversation: conversation };
        }),
    messages: [],
    setMessages: (update) =>
        set((state) => {
            const currentMessages = Array.isArray(state.messages) ? state.messages : [];
            const newMessages =
                typeof update === "function" ? update(currentMessages) : update;
            return { messages: Array.isArray(newMessages) ? newMessages : currentMessages }; // Ensure always array
        }),
}));


export default useConversationStore;
