import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://admin:Needforspeed4@cluster0.sjx0c.mongodb.net/dragcart?retryWrites=true&w=majority";

const connnectionToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

export default connnectionToDatabase;
