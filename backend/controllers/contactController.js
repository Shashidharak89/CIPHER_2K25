const ContactUs = require('../models/ContactUs');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cipher2k25shc@gmail.com',
        pass: process.env.PASSWORD, // Use password from .env file
    },
});

// Store a new contact message & send email
exports.storeMessage = async (req, res) => {
    try {
        const { name, email, contact, message } = req.body;

        // Validate input
        if (!name || !email || !contact || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Save message to database
        const newMessage = new ContactUs({ name, email, contact, message });
        await newMessage.save();

        // Send email confirmation to user
        const mailOptions = {
            from: 'cipher2k25shc@gmail.com',
            to: email,
            subject: 'We Received Your Message!',
            text: `Hello ${name},\n\nThank you for reaching out to us! We will get back to you soon.\n\nBest Regards,\nCipher 2K25`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.status(201).json({ message: "Message saved successfully & email sent", data: newMessage });

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
