"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const UserStoreInstance = new user_1.UserStore();
const newUser = {
    firstname: "raza",
    username: "razak",
    lastname: "kazmi",
    password: "razapassword",
};
let token = "";
describe("POST /users == create new user", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request.post("/users/create").send(newUser);
        token = response.text;
        expect(response.status).toBe(200);
    });
    it("should return a 400 response when params (firstname || lastname || password ) are missing", async () => {
        const response = await request.post("/users/create").send({});
        expect(response.status).toBe(400);
    });
});
describe("GET /users == index", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it("should return a 401 response body when token isnt provided", async () => {
        const response = await request.get("/users");
        expect(response.status).toBe(401);
    });
});
describe("GET /users/:id", () => {
    it("should return a 200 response when all is well", async () => {
        const response = await request
            .get("/users/2}")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it("should return an empty response body when id doesnt exist", async () => {
        const response = await request
            .get("/users/0")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeFalsy();
    });
    it("should return a 401 response body when token isnt provided", async () => {
        const response = await request.get("/users/0");
        expect(response.status).toBe(401);
    });
});
afterAll(async () => {
    await UserStoreInstance.delete(2);
});
