import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const NewUser = new User({ username, email, password: hashedPassword }) //imported user model (skeleton)
    try {
        await NewUser.save()
        res.status(201).json("user created successfully")

    }
    catch (error) {
        const fieldName = Object.keys(error.keyPattern)[0]; // 'username'
        res.status(500).json(`${fieldName} already exists in the system`);



    }

}

