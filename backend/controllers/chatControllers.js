const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const accessChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId params not sent with request");
        return res.sendStatus(401);
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }
    }

}
const fetchChat = async (req, res) => {
    try {
        await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(result);
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}
const createGroupChat = async (req, res) => {

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat)
    } catch (error) {
        throw new Error(error);
    }
}
const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;// lấy ra chatId,chatName mà client gửi
    // tạo hàm update
    const updateGroup = await Chat.findByIdAndUpdate(
        // tìm trong id của groupChat -> sửa chatName
        chatId,
        {
            chatName
        }, {
        new: true
    }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updateGroup) {
        res.status(400).json("Group Not Found!!")
    } else {
        res.status(200).json(updateGroup);
    }
}
const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(404).json("Chat Not Found!!");
    } else {
        res.status(200).json(added);
    }
}

const removeGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const removeUser = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removeUser) {
        res.status(404).json("Group Not Found!!!")
    }
    else {
        res.status(200).json(removeUser);
    }
}
module.exports = { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeGroup }