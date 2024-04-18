const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const db_connect = require("./Utils/dbConnect");
const app = require("./app");

const PORT = process.env.PORT;

(async () => {
  try {
    await db_connect();
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING AT PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error.toString());
  }
})();
