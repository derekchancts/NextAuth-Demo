import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // const db = await mongoose.connect(process.env.MONGO_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  const db = await mongoose.connect(process.env.MONGODB_URL);

  connection.isConnected = db.connections[0].readyState;  

  // console.log(connection.isConnected)  // will get a "1" for connected
}

export default dbConnect;
