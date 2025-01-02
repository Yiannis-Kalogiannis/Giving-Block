// message.controllers.js
const sendMessages = async (req, res) => {
    try {
        const {message} = req.body;
        const {id} = req.params;
        const senderId = req.user.id;

        
    } catch (error) {
        console.log("Error in sendMessages", error.message);
        res.status(500).json({ error:" internal server error" });
    }
};


const getMessages = async (req, res) => {
    try {
        const {id} = req.params;
        const senderId = req.user.id;
    } catch (error) {
        console.log("Error in getMessages", error.message);
        res.status(500).json({ error:" internal server error" });
    }
}

module.exports = { sendMessages, getMessages };