import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
dotenv.config();

mongoose.connect(process.env.MONGO_CS).then(() => {
  console.log("Connection to mongo : Great success")
}).catch((err) => {
  console.log(`error : ${err}`)
})
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000 : Great success");
});


app.use("/api/user", userRouter)