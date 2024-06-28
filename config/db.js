const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Mongodb database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Mongo connect error ${error} `.bgBlack.white);
  }
};

module.exports = connectDB;
