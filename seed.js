
require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Experience = require('./models/Experience');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');

const MONGO_URI = process.env.MONGO_URI;

const experiencesData = [
  {
    name: "The Secret Spice Route: Old Delhi Food Tour",
    description:
      "Explore the hidden lanes of Old Delhi and taste 10+ authentic, legendary street food items. A culinary journey through history.",
    price: 2500,
    duration: "4 hours",
    images: ["https://imgs.search.brave.com/TfUwDR1ZwhMNE2hqko9QuTXSdwejkcBZmoZDHV9mnkE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3BzbXljaXR5LmNv/bS9pbWcvZ2QvMjg0/NS5qcGc", "https://images.unsplash.com/photo-1643757343278-5d50309dfa44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=893"],
    location: "Old Delhi, India",
  },

  {
    name: "Himalayan Sunrise Trek & Camp",
    description:
      "A 2-day immersive experience trekking through the lower Himalayas, culminating in a spectacular sunrise view and bonfire camping.",
    price: 7500,
    duration: "2 Days / 1 Night",
    images: ["https://images.unsplash.com/photo-1760451747940-d16983033534?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032", "https://images.unsplash.com/photo-1657215756064-a1cec8616e80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"],
    location: "Manali, Himachal Pradesh",
  },
  {
    name: "Goa Beach Party Cruise",
    description:
      "Set sail on the Arabian Sea with a live DJ, unlimited snacks, and sunset views — the ultimate Goan nightlife experience.",
    price: 3200,
    duration: "3 hours",
    images: ["https://images.unsplash.com/photo-1757702244726-00198554c4a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1744381582346-b2128e3a0a48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=875"],
    location: "Goa, India",
  },
  {
    name: "Jaipur Heritage Walk",
    description:
      "Discover the royal architecture, old markets, and hidden gems of the Pink City with a local expert guide.",
    price: 1800,
    duration: "3 hours",
    images: ["https://images.unsplash.com/photo-1534407672671-e77ce1342dc8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1687758907537-f68dc8be5274?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871"],
    location: "Jaipur, Rajasthan",
  },
  {
    name: "Rann of Kutch Desert Safari",
    description:
      "Ride through the white desert at sunset and experience traditional Kutchi culture, music, and dance.",
    price: 5500,
    duration: "1 Day",
    images: ["https://cdn.pixabay.com/photo/2019/03/12/18/42/bird-4051494_1280.jpg", "https://images.unsplash.com/photo-1670406312373-6d4d1776e4aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580"],
    location: "Rann of Kutch, Gujarat",
  },
  {
    name: "Backwaters Houseboat Stay",
    description:
      "Cruise through the peaceful Kerala backwaters on a traditional houseboat with freshly cooked meals on board.",
    price: 6800,
    duration: "1 Night / 2 Days",
    images: ["https://images.unsplash.com/photo-1560347876-aeef00ee58a1", "https://cdn.pixabay.com/photo/2021/09/12/11/17/houseboat-6618074_960_720.jpg", "https://cdn.pixabay.com/photo/2017/09/08/08/26/schoner-wohnen-2728070_960_720.jpg"],
    location: "Alleppey, Kerala",
  },
  {
    name: "Mumbai Bollywood Studio Tour",
    description:
      "Peek behind the curtain of India’s largest film industry. Visit sets, see live shoots, and meet local artists.",
    price: 2000,
    duration: "5 hours",
    images: ["https://images.unsplash.com/photo-1735996547166-30771e6c1a93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032", "https://images.unsplash.com/photo-1720632644004-b1ff7f19a8a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031"],
    location: "Mumbai, Maharashtra",
  },
  {
    name: "Pushkar Camel Fair Experience",
    description:
      "Witness the colorful annual fair with camel races, folk performances, and local crafts — a true Rajasthani celebration.",
    price: 4200,
    duration: "1 Day",
    images: ["https://images.unsplash.com/photo-1717131553948-13c2c59c7293?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1715347240072-69c73b0ba3ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Pushkar, Rajasthan",
  },
  {
    name: "Varanasi Evening Aarti by Boat",
    description:
      "Sail across the Ganges during the mesmerizing evening aarti. Experience ancient spirituality up close.",
    price: 2300,
    duration: "2 hours",
    images: ["https://images.unsplash.com/photo-1599831069477-b2acdc0bcb91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1717323821798-8cee2f6826ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774", "https://images.unsplash.com/photo-1646288744226-a2e3a06bfb10?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Varanasi, Uttar Pradesh",
  },
  {
    name: "Andaman Scuba Diving Adventure",
    description:
      "Dive into the crystal-clear waters and explore vibrant coral reefs teeming with marine life.",
    price: 8500,
    duration: "Half Day",
    images: ["https://images.unsplash.com/photo-1682048643811-fe98d3726b93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1653324072938-fc6374751743?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Havelock Island, Andaman",
  },
  {
    name: "Leh-Ladakh Bike Expedition",
    description:
      "Ride across the highest motorable roads with breathtaking landscapes — a dream for every adventurer.",
    price: 12000,
    duration: "5 Days / 4 Nights",
    images: ["https://images.unsplash.com/photo-1638360447329-2a97bf6a3d5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1663316037222-5f60a3080cac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Leh-Ladakh, India",
  },
  {
    name: "Rishikesh River Rafting & Campfire",
    description:
      "Conquer the rapids of the Ganges followed by a riverside campfire under the stars.",
    price: 4000,
    duration: "2 Days / 1 Night",
    images: ["https://images.unsplash.com/photo-1679236303854-a47bc30fcfb7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1719581827279-e9a8d8fce924?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Rishikesh, Uttarakhand",
  },
  {
    name: "Udaipur Royal Palace Tour",
    description:
      "Walk through the royal corridors of the City Palace and enjoy a sunset boat ride on Lake Pichola.",
    price: 2600,
    duration: "4 hours",
    images: ["https://images.unsplash.com/photo-1655022077661-f8e590448684?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032", "https://images.unsplash.com/photo-1705592360345-1cd173c8b345?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871"],
    location: "Udaipur, Rajasthan",
  },
  {
    name: "Coorg Coffee Plantation Walk",
    description:
      "Learn the art of coffee making while exploring lush green plantations and tasting fresh brews.",
    price: 2800,
    duration: "3 hours",
    images: ["https://images.unsplash.com/photo-1699819436460-407a842e4ef6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1529057299613-a565b7ce93aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Coorg, Karnataka",
  },
  {
    name: "Kolkata Colonial Heritage Tour",
    description:
      "Explore old British-era architecture, local food, and tram rides in the cultural capital of India.",
    price: 1900,
    duration: "3 hours",
    images: ["https://images.unsplash.com/photo-1677306966234-367c40e489bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870", "https://images.unsplash.com/photo-1602003812168-5c2219ab5ac6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Kolkata, West Bengal",
  },


  {
    name: "Meghalaya Waterfall & Cave Trail",
    description:
      "Discover hidden waterfalls and mysterious limestone caves amidst lush hills and clouds.",
    price: 6400,
    duration: "2 Days / 1 Night",
    images: ["https://images.unsplash.com/photo-1691336770622-42aed12fbee0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032", "https://images.unsplash.com/photo-1594514113865-d1deac339435?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1101", "https://images.unsplash.com/photo-1685271567656-84a60da957d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"],
    location: "Cherrapunji, Meghalaya",
  },
];




const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" databse connected for adding data");

    console.log(" Clearing old data...");
    await Experience.deleteMany({});
    await Slot.deleteMany({});
    await Booking.deleteMany({});
    console.log(" Cleared prevous data.");

    const createdExperiences = await Experience.insertMany(experiencesData);
    console.log(`Experiences created.`);

    const slotsToCreate = [];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    createdExperiences.forEach((exp, index) => {
      slotsToCreate.push({
        experience: exp._id,
        date: today,
        time: "10:00 AM",
        totalSeats: 12,
        bookedSeats: Math.floor(Math.random() * 6),
        status: "Available",
      });

      slotsToCreate.push({
        experience: exp._id,
        date: tomorrow,
        time: "04:00 PM",
        totalSeats: 10,
        bookedSeats: 10,
        status: "Sold Out",
      });
    });

    const createdSlots = await Slot.insertMany(slotsToCreate);
    console.log(`${createdSlots.length} : slots created.`);

    console.log("Data adding done !");
  } catch (error) {
    console.error(" Data adding not copleted:", error.message);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log(" databaes closed.");
    }
  }
};

seedDB();
