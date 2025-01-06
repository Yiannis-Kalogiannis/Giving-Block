import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversationStore from '../../store/chat.store/useConvarsationStore';
import { useEffect } from 'react';

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversationStore(); // Get selected conversation from store

  useEffect(() => {
    // Set selected conversation to null when component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div>
            <p>
              To: <span>{selectedConversation.username}</span>
            </p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
            <Messages />
          </div>

          {/* Divider */}
          <hr />

          {/* Message Input */}
          <div>
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <h4>Select a chat to start messaging</h4>
    </div>
  );
};

export default MessageContainer;
