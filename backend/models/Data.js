const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true,
    //   },
    // socialHandle: {
    //     type: String,
    //     required: true,
    //   },
    //   images: [
    //     {
    //       path: { type: String, required: true },
    //       filename: { type: String, required: true },
    //     },
    //   ],

      name: {
        type: String,
        required: true,
      },
      socialHandle: {
        type: String,
        required: true,
      },
      image: {
        type: Buffer,
        required: true,
      },
    
});
const Data = mongoose.model("data", DataSchema);
module.exports = Data