let users = require("../db/data")
const { fetchAllUsers, fetchUserById } = require("./usersModel")
const findById = require("../util/findById")

//get all users (refactorizado, ver en clase)
const getAllUsers = async(req, res) => {
    const dbResponse = await fetchAllUsers()
    dbResponse.hasOwnProperty("error") ? res.status(500).json(dbResponse) : res.status(200).json(dbResponse)
};

//get user by id
const getUserById = async(req, res, next) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Debe ingresar un número" })
    }
    const user = await fetchUserById(+req.params.id)
    user.length ? res.status(200).json(user) : next()
};
//add new user
const addUser = (req, res) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email && (name === "" || username === "" || email === "")) {
        res.status(400).json({ message: "all fields required" })
    } else {
        users.push(req.body)
        res.status(201).json(req.body)
    }
}

//delete user by id
const deleteUser = (req, res, next) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Debe ingresar un número" })
    }
    const userFound = findById(+req.params.id, users)
    if (userFound) {
        users = users.filter((user => user.id !== +req.params.id))
        res.status(200).json(userFound)
    } else {
        next()
    }
}


module.exports = { getAllUsers, getUserById, addUser, deleteUser }