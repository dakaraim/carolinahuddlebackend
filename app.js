
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb...");
    createMessage();
  })
  .catch((err) => {
    console.error("Could not connect to mongodb...", err);
  });

// Create schema
const schema = new mongoose.Schema({
  name: String,
});

// Create Message model
const Message = mongoose.model("Message", schema);

// Create and save message
async function createMessage() {
  try {
    const message = new Message({
      name: "Hello World",
    });

    const result = await message.save();

    console.log(result);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
}

