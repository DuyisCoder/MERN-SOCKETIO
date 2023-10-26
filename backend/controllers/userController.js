
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')
// const registerUser = async (req, res) => {
//     const { name, email, password, pic } = req.body;
//     if (!name || !email || !password) {
//         res.status(400);
//         throw new Error("Please enter all the fields");
//     }
//     const userExit = await User.findOne({ email })
//     if (userExit) {
//         res.status(400);
//         throw new Error("User is exist");
//     }
//     const user = await User.create({
//         name, email, password, pic
//     });
//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id)
//         })
//     } else {
//         res.status(400);
//         throw new Error("Create User is Error")
//     }
// }
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đủ các trường!" });
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }
    const user = await User.create({
        name, email, password, pic
    });
    if (user) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        return res.status(500).json({ message: "Tạo tài khoản thất bại!" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: "Email hoặc mật khẩu sai!" })
    }
}
const getAllUser = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        }
        : {};

    const users = await User.find(keyword);
    res.send(users);
};
module.exports = {
    registerUser,
    loginUser, getAllUser
}