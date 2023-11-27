const express = require("express");
const { EventController } = require("../controller/eventController");
const { CategoryController } = require("../controller/categoryController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.delete("/event/:id", EventController.deleteById);
// router.post("/event", upload.single("image"), EventController.add);
router.post("/event", EventController.add);
router.put("/event/:eventId", EventController.sellTicket);
router.get("/events", EventController.getAll);
router.get("/event/:id", EventController.getById);
router.get("/events/:eventId/image", EventController.getImage);
router.get("/eventName/:name", EventController.getByName);
router.post("/category", CategoryController.add);
router.get("/categories", CategoryController.getAll);
router.get("/category/:id", CategoryController.getByName);
router.delete("category/:id", CategoryController.deleteById);

module.exports = router;
