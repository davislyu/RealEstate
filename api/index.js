import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config();


//Connection to mongo db 
mongoose.connect(process.env.MONGO_CS).then(() => {
  console.log("Connection to mongo : Great success")
}).catch((err) => {
  console.log(`error : ${err}`)
})

//*****************************************//




//Connection to expressJs//

app.use(express.json()); //allows json as the input of the server
app.listen(3000, () => { //Declaring on what port to listen ( in our case its 3000-mongoDB)
  console.log("Listening on port 3000 : Great success");
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);//As the address that's been fires starts with /api/user => move on to that route
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  })
})
//*****************************************//
