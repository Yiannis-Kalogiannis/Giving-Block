import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import React from 'react';

function Conversations() {
  const { loading, conversations } = useGetConversations();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <h4>Users</h4>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <div>Loading...</div>
        </div>
      ) : (
        conversations.map((conversation, idx) => (
          <React.Fragment key={conversation._id}>
            <Conversation
              conversation={conversation}
              lastIndex={idx === conversations.length - 1}
            />
            {idx !== conversations.length - 1 && <hr />}
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default Conversations;
