const Message = require("../../schemas/message.jsx");
const Conversation = require("../../schemas/Conversation.jsx");

const { getReceiverSocketId, io, userSocketMap } = require("../../socket/socket.js");



const sendMessages = async (req, res) => {
	try {
		const { message } = req.body;
            const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel and wait for both to finish
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY 
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
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