const Message = require("../../schemas/message.jsx");
const Conversation = require("../../schemas/Conversation.jsx");

const sendMessages = async (req, res) => {
    try {
        const { message } = req.body;
        const { id } = req.params; // Receiver ID
        const senderId = req.user._id.toString(); // Convert ObjectId to string
        console.log("Sender ID:", senderId); // Debugging
        console.log("Receiver ID:", id); // Debugging

        let conversation = await Conversation.findOneAndUpdate(
            {
                participants: { $all: [senderId, id] } // Find conversation with both participants
            },
            { new: true }
        );

        if (!conversation) {
            // Create new conversation if not found
            conversation = await Conversation.create({
                participants: [senderId, id], // Add both participants to the conversation
            });

            const newMessage = new Message({
                senderId,
                receiverId: id,
                message,
            });

            await newMessage.save();
            conversation.messages.push(newMessage._id);
            await conversation.save();

            return res.status(200).json(newMessage);
        }

        // Handle adding a new message to an existing conversation
        const newMessage = new Message({
            senderId,
            receiverId: id,
            message,
        });
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        await conversation.save();

        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessages", error.message);
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