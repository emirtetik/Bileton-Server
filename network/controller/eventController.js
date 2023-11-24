const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { Event } = require("../models/Event.js");
const { default: mongoose } = require("mongoose");
const { Category } = require("../models/Category.js");


cloudinary.config({
  cloud_name: "dn339ykdp",
  api_key: "656569933346817",
  api_secret: "2l5nbETzOY7DDs7lLbQSfVPKV5Y",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some_folder_name",
    format: async (req, file) => "png", 
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const upload = multer({ storage: storage });

const EventController = {
  getAll: async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id });
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  getByName: async (req, res) => {
    try {
      const event = await Event.findOne({ name: req.params.name });
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      const event = await Event.deleteOne({ _id: req.params.id });
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  // getImage: async (req, res) => {
  //   try {
  //     const event = await Event.getById(req.params.eventId);
  //     if (!event || !event.image) {
  //       return res.status(404).json({ error: "Image not found" });
  //     }

  //     res.set("Content-Type", event.image.contentType);
  //     res.send(event.image.data);
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  createEvent: [
    upload.single("image"),
    async (req, res) => {
      console.log("Received file:", req.file);
      console.log("Received form data:", req.body);
      try {
        const cloud_name = "dn339ykdp"; 
        const public_id = req.file.filename.split('.')[0];
        const cloudinaryURL = `https://res.cloudinary.com/${cloud_name}/image/upload/${public_id}`;
        const event = new Event({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.eventName,
          description: req.body.description,
          startDate: req.body.ticketSaleStartDate,
          endDate: req.body.ticketSaleEndDate,
          eventDate: req.body.eventDate,
          city: req.body.city,
          venue: req.body.venue,
          category: req.body.category,
          image: cloudinaryURL,
        });
        const newEvent = await event.save();
        res.json(newEvent);
      } catch (error) {
        console.log(error);
      }
    },
  ],

  add: [
    upload.single("image"),
    async (req, res) => {
      try {
        const { image, ...otherFormData } = req.body;

        if (!req.file) {
          return res
            .status(400)
            .json({ error: "Image is missing in the request." });
        }

        console.log("Image data:", req.file);

        const event = new Event({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.eventName,
          ticketCount: 40,
          image: cloudinaryURL,
          ...otherFormData,
        });

        const newEvent = await event.save();
        res.json(newEvent);
      } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  ],
};
updateTickets: async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId },
      {
        ticket: [...ticket, req.body.ticket],
      },
      { new: true } 
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
},
  (module.exports = { EventController });
