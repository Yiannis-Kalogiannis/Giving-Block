import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

function Messages() {
    const { loading, Messages } = useGetMessages();
    console.log('Messages:', Messages);
    return (
        <div className="messages">
          {loading ? (
            <h1>Loading...</h1>
          ) : Array.isArray(Messages) ? (
            Messages.map((message) => (
              <Message key={message._id} message={message} />
            ))
          ) : (
            <h6>Type a message to start a conversation</h6> // Handle cases where Messages is not an array
          )}
        </div>
      );
    }

export default Messages;