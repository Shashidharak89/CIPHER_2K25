const ContactUs = require('../models/ContactUs');

// Store a new contact message
exports.storeMessage = async (req, res) => {
    try {
        const { name, email, contact, message } = req.body;

        // Validate input
        if (!name || !email || !contact || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newMessage = new ContactUs({ name, email, contact, message });
        await newMessage.save();

        res.status(201).json({ message: "Message saved successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Retrieve all contact messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await ContactUs.find().sort({ createdAt: -1 });
        res.status(200).json({ data: messages });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
