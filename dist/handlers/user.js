"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const helpers_1 = require("./helpers");
const UserStoreInstance = new user_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await UserStoreInstance.index();
        res.json(users);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const create = async (req, res) => {
    try {
        const { username, password, firstname, lastname } = req.body;
        const user = { username, firstname, lastname, password };
        if (firstname === undefined || lastname === undefined || username === undefined || password === undefined) {
            res.status(400);
            res.send("Some required parameters are missing! eg. :firstname, :lastname, :username, :password");
            return false;
        }
        const newUser = await UserStoreInstance.create(user);
        res.send((0, helpers_1.createUserAuthToken)(newUser));
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const read = async (req, res) => {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send("Missing required parameter :id.");
            return false;
        }
        const user = await UserStoreInstance.show(id);
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
function userRoutes(app) {
    app.get("/users", helpers_1.verifyAuthToken, index);
    app.post("/users/create", create);
    app.get("/users/:id", helpers_1.verifyAuthToken, read);
}
exports.default = userRoutes;
