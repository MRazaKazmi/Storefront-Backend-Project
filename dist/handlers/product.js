"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const helpers_1 = require("./helpers");
const ProductStoreInstance = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await ProductStoreInstance.index();
        res.json(products);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const create = async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        if (name === undefined || price === undefined) {
            res.status(400);
            res.send("Some required parameters are missing! eg. :name, :price");
            return false;
        }
        const product = await ProductStoreInstance.create({ name, price });
        res.json(product);
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
        const product = await ProductStoreInstance.show(id);
        res.json(product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
function productRoutes(app) {
    app.get("/products", index);
    app.post("/products/create", helpers_1.verifyAuthToken, create);
    app.get("/products/:id", read);
}
exports.default = productRoutes;
