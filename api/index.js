import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config();

mongoose.connect(process.env.MONGO_CS).then(() => {
  console.log("Connection to mongo : Great success")
}).catch((err) => {
  console.log(`error : ${err}`)
})
const app = express();

app.use(express.json()); //allows json as the input of the server

app.listen(3000, () => {
  console.log("Listening on port 3000 : Great success");
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


