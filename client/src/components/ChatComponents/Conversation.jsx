import React from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import useConversationStore from "../../store/chat.store/useConvarsationStore";

const Conversation = ({ conversation, lastIndex }) => {

    const { setSelectedConversation, selectedConversation } = useConversationStore();
const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <Box
        onClick={() => setSelectedConversation(conversation)}
        sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: isSelected ? "blue" : "white", // Conditional background color
          color: isSelected ? "white" : "black", // Conditional text color
            '&:hover': {
              backgroundColor: "blue",
              color: "white",
            },
          }}
      >
        <Avatar
          src={conversation.profilePicture}
          alt={conversation.username}
          sx={{ width: 48, height: 48, marginRight: "10px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {conversation.username}
          </Typography>
        </Box>
      </Box>
      {!lastIndex && <Divider />}
    </>
  );
};

export default Conversation;

