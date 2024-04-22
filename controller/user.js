import bcrypt from "bcrypt";
import  User  from "../model/user.js";
import {
    decodeJwtToken,
    generateJwtToken,
    getCurrentDate,
} from "../utils.js";


const signup = async (req, res) => {
    try {
        // Find user already registered
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Email already registered" });
        }

        //generate hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        const date = getCurrentDate();

        const count = 1;

        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
            gender: req.body.gender,
            count: count,
            lastLoginDate: date,
        }).save();

        const token = generateJwtToken(newUser._id);

        res.status(200).json({success:true, message: "Sign Up successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const validatePassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!validatePassword) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        const date = getCurrentDate();
        let count = user.count + 1;
        await User.findOneAndUpdate(
            { email },
            { $set: { lastLoginDate: date, count } }
        );


        const token = generateJwtToken(user._id);

        res.status(200).json({success:true, message: "Logged in successfull", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAll = async (req, res) => {
    try {
        let token = req.headers.token;
        const userId = await decodeJwtToken(token);

        const user = await User.findById({ _id: userId });

        if (user.email !== process.env.ADMINEMAIL) {
            return res
                .status(200)
                .json({ message: "User data", data: user });
        }

        const allUser = await User.find();
        res.status(200).json({ message: "All user data", data: allUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export { signup, getAll, login };