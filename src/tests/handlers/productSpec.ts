import supertest from "supertest"
import { Product, ProductStore } from "../../models/product";
import { User, UserStore } from "../../models/user";
import app from "../../server";

const request = supertest(app);
const product_store = new ProductStore();
const user_store = new UserStore();
const newProduct: Product = {
  name: "Pc",
  price: 10,
};

const newUser: User = {
  firstname: "raza2",
  username: "razak2",
  lastname: "kazmi2",
  password: "razapassword2",
};

let token = "";

beforeAll(async () => {
  const response = await request.post("/users/create").send(newUser); 
  token = response.text
  newUser.id = response.body.id
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
  await product_store.delete(newProduct.id as number);
  await user_store.delete(newUser.id as number);
});