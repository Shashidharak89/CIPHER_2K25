const EventNoPhoto = require("../models/EventNoPhoto");

// Create an empty Event
exports.createEvent = async (req, res) => {
    try {
        const { event, eventname, maxparticipants, maxentry } = req.body;
        const newEvent = new EventNoPhoto({ event, eventname, maxparticipants, maxentry, participants: [] });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a participant team to an event
exports.addParticipant = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { teamname, teamid, members } = req.body;

        const event = await EventNoPhoto.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.participants.length >= event.maxparticipants) {
            return res.status(400).json({ message: "Max participants reached" });
        }

        event.participants.push({ teamname, teamid, members });
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await EventNoPhoto.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
