const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", CategorySchema);

module.exports = { Category };
