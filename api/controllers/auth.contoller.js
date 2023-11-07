import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong cridentials!"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);

    }
    catch (error) {
        next(error)
    }
}