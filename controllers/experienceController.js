const Experience = require('../models/Experience');
const Slot = require('../models/Slot'); 

const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.json(experiences);
    } catch (error) {
        console.error("Error fetching experiences:", error); 
        res.status(500).json({ message: 'Error fetching experiences', error: error.message });
    }
};

const getExperienceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findById(id);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        const slots = await Slot.find({ experience: id, status: 'Available' }).sort({ date: 1, time: 1 });

        res.json({ experience, availableSlots: slots });
    } catch (error) {
        console.error("Error fetching experience details:", error);
        res.status(500).json({ message: 'Error fetching details', error: error.message });
    }
};

module.exports = {
    getExperiences,
    getExperienceDetails,
};
