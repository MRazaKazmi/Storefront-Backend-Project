"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const order_1 = require("../../models/order");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const newProduct = {
    name: "Pc",
    price: 10,
};
const newUser = {
    firstname: "first",
    lastname: "last",
    username: "username",
    password: "password",
};
const order_store = new order_1.OrderStore();
const product_store = new product_1.ProductStore();
const user_store = new user_1.UserStore();
let token = "";
beforeAll(async () => {
    const response = await request.post("/users/create").send(newUser); // Create a dummy user
    token = response.text;
    newUser.id = 1;
    expect(response.status).toBe(200);
    const response2 = await request
        .post("/products/create")
        .send(newProduct)
        .set("Authorization", `Bearer ${token}`); // Create a dummy product
    expect(response2.status).toBe(200);
});
describe("GET /orders == index", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request
            .get("/orders")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it("should return a 401 response body when token isnt provided", async () => {
        const response = await request.get("/orders");
        expect(response.status).toBe(401);
    });
});
describe("POST /orders == create new order", () => {
    //   it("should return a 200 response when all is well", async () => {
    //     const response = await request
    //       .post("/orders/create")
    //       .send() 
    //       .set("Authorization", `Bearer ${token}`);
    //     expect(response.status).toBe(200);
    //   });
    it("should return a 400 response when params (userid) are missing", async () => {
        const response = await request
            .post("/orders/create")
            .send({})
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(400);
    });
    it("should return a 401 response body when token isnt provided", async () => {
        const response = await request
            .post("/orders/create")
            .send({ userid: newUser.id });
        expect(response.status).toBe(401);
    });
});
describe("GET /orders/:id == Current order by userid", () => {
    it("should return a 200 response when all is well", async () => {
        let route = `/orders/${newUser.id}`;
        const response = await request
            .get(route)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
afterAll(async () => {
    await order_store.deleteOrder(1);
    await product_store.delete(1);
    await user_store.delete(1);
});
