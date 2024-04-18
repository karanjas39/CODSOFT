const mongoose = require("mongoose");

module.exports = db_connect;

async function db_connect() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log(`DB CONNECTED SUCCESSFULY.`);
  } catch (error) {
    console.log(`MONGODB ERROR : ${error.toString()}`);
    process.exit(0);
  }
}
