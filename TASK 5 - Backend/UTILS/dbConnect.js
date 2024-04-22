const mongoose = require("mongoose");

module.exports = dbConnect;

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB IS CONNECTED SUCCESSFULLY.`);
  } catch (error) {
    console.log(`ERROR OCCUR IN DB CONNECTION: ${error.toString()}`);
    process.exit(0);
  }
}
