const mongoose = require("mongoose");

const labsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  technology: {
    type: String,
    required: true,
    trim: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.models.Labs || mongoose.model("Labs", labsSchema);

