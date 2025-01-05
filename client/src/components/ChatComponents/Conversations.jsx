import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';

function Conversations() {
  const { loading, conversations } = useGetConversations();
  console.log('Conversations:', conversations);
  return (
    <>
      <div className="conversations">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIndex={idx === conversations.length - 1}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Conversations;
