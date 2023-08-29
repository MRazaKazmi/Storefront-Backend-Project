"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const helpers_1 = require("./helpers");
const OrderStoreInstance = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const orders = await OrderStoreInstance.index();
        res.json(orders);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const create = async (req, res) => {
    try {
        let products = req.body.products;
        const status = req.body.status;
        const user_id = req.body.user_id;
        if (products === undefined || status === undefined || user_id === undefined) {
            res.status(400);
            res.send("Some required parameters are missing! eg. :products, :status, :user_id");
            return false;
        }
        const order = await OrderStoreInstance.create(user_id);
        res.json(order);
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
        const order = await OrderStoreInstance.show(id);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
function orderRoutes(app) {
    app.get("/orders", helpers_1.verifyAuthToken, index);
    app.post("/orders/create", helpers_1.verifyAuthToken, create);
    app.get("/orders/:id", helpers_1.verifyAuthToken, read);
}
exports.default = orderRoutes;
