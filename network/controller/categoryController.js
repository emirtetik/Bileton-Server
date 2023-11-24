const { Category } = require("../models/Category.js");

const CategoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.log(error);
    }
  },

  getByName: async (req, res) => {
    try {
      const category = await Category.findOne({ name: req.params.name });
      res.json(category);
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  add: async (req, res) => {
    try {
      const category = new Category({
        image: req.body.image,
        name: req.body.name,
      });
      const newCategory = await category.save();
      res.json(newCategory);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { CategoryController };
