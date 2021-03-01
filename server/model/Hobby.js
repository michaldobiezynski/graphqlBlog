const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

const hobbySchema = new MSchema({
  description: String,
  title: String,
  userId: String,
});

module.exports = mongoose.model("Hobby", hobbySchema);
