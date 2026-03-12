import mongoose from "mongoose";

const Db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Saad:0310@cluster0.11va0rw.mongodb.net/todo?retryWrites=true&w=majority"
    );
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error:", error);
  }
};

export default Db;