import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {

    const { username, email, password } = req.body; //Extracting the data from the request
    //That means that at this point each paremeter holds data.
    const hashedPassword = bcryptjs.hashSync(password, 10) //Hashs the Password

    //Creating a new user by reffering to the "User model" from "./models/user.model.js" 
    const NewUser = new User({ username, email, password: hashedPassword })


    //Trying to save the new data to the DB
    try {
        await NewUser.save() //Express method to save the data 
        res.status(201).json("user created successfully")

    }
    catch (error) {
        next(errorHandler(550, "Username/email already exists."))

    }

}

