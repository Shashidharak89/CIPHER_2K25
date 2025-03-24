const ContactUs = require('../models/ContactUs');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true, // Enables reusing connections for better performance
    auth: {
        user: 'cipher2k25shc@gmail.com',
        pass: process.env.PASSWORD,
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

        // Send confirmation email
        const mailOptions = {
            from: '"Cipher 2K25 Support" <cipher2k25shc@gmail.com>', // Adds a sender name
            replyTo: 'cipher2k25shc@gmail.com', // Helps with email trust
            to: email,
            subject: 'We Received Your Message!',
            html: `
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to us. We appreciate your message and will get back to you soon.</p>
                <p>Best Regards,</p>
                <p><b>Cipher 2K25 Team</b></p>
            `,
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
