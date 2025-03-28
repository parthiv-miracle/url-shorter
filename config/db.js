const mongoose = require("mongoose");

exports.connectToDb = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });
};
