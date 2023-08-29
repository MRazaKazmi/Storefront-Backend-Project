"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const product_store = new product_1.ProductStore();
const user_store = new user_1.UserStore();
const newProduct = {
    name: "Pc",
    price: 10,
};
const newUser = {
    firstname: "raza2",
    username: "razak2",
    lastname: "kazmi2",
    password: "razapassword2",
};
let token = "";
beforeAll(async () => {
    const response = await request.post("/users/create").send(newUser);
    token = response.text;
    newUser.id = response.body.id;
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
describe("GET /products == index", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
    });
});
describe("POST /products == create new product", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request
            .post("/products/create")
            .send(newProduct)
            .set("Authorization", `Bearer ${token}`);
        newProduct.id = response.body.id;
        expect(response.status).toBe(200);
    });
});
describe("GET /products/:id", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
    });
});
afterAll(async () => {
    await product_store.delete(newProduct.id);
    await user_store.delete(newUser.id);
});
