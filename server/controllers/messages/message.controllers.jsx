const Message = require("../../schemas/message.jsx");
const Conversation = require("../../schemas/Conversation.jsx");

const { getReceiverSocketId, io, userSocketMap } = require("../../socket/socket.js");


const sendMessages = async (req, res) => {
    try {
        const { message } = req.body;
        const { id } = req.params; // Receiver ID
        const senderId = req.user._id.toString(); // Convert ObjectId to string
        console.log("Sender ID:", senderId); // Debugging
        console.log("Receiver ID:", id); // Debugging
        console.log('userSocketMap:', userSocketMap); // Log entire map for debugging
        
        let conversation;
        try {
            conversation = await Conversation.findOneAndUpdate(
                {
                    participants: { $all: [senderId, id] }, // Find conversation with both participants
                },
                { new: true }
            );
        } catch (error) {
            console.error("Error finding or updating conversation:", error);
        }

        if (!conversation) {
            console.log("No conversation found, creating new one...");
            try {
                conversation = await Conversation.create({
                    participants: [senderId, id],
                });
                console.log("New Conversation:", conversation); // Debugging
            } catch (error) {
                console.error("Error creating new conversation:", error);
                return res.status(500).json({ error: "Failed to create conversation" });
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId: id,
            message,
        });

        console.log("Created New Message:", newMessage);

        try {
            await newMessage.save();
            console.log("New Message saved:", newMessage); // Debugging
        } catch (error) {
            console.error("Error saving new message:", error);
            return res.status(500).json({ error: "Failed to save message" });
        }

        conversation.messages.push(newMessage._id);
        try {
            await conversation.save();
            console.log("Conversation updated with new message:", conversation); // Debugging
        } catch (error) {
            console.error("Error saving conversation:", error);
            return res.status(500).json({ error: "Failed to update conversation" });
        }

        const receiverSockedId = getReceiverSocketId(id);
        console.log('Receiver Socket ID:', receiverSockedId); // Debugging
        if (receiverSockedId) {
            try {
                io.to(receiverSockedId).emit("newMessage", newMessage);
                console.log("Message emitted to receiver:", receiverSockedId);
            } catch (error) {
                console.error("Error emitting message:", error);
            }
        } else {
            console.error("No socket ID found for receiver:", id);
        }

        return res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessages", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id.toString();

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json({ messages: [] });

        const messages = conversation.messages;


        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages", error.message);
        res.status(500).json({ error:" internal server error" });
    }
}

module.exports = { sendMessages, getMessages };