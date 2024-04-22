const dotenv = require("dotenv");
dotenv.config({ path: "./CONFIG/config.env" });

const dbConnect = require("./UTILS/dbConnect");
const app = require("./app");

const PORT = process.env.PORT;

(async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING AT PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(`ERROR IN DB CONNECTION: ${error.toString()}`);
    process.exit(0);
  }
})();
