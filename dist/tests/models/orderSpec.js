"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const productStore = new product_1.ProductStore();
let product1;
const store = new order_1.OrderStore();
let order1;
const userStore = new user_1.UserStore();
let user1;
describe('Tests the Order Model', () => {
    beforeAll(async () => {
        user1 = await userStore.create({
            username: 'orderTestUser',
            firstname: 'orderTestFirst',
            lastname: 'orderTestLast',
            password: 'awesome'
        });
        product1 = await productStore.create({ name: 'chai',
            price: 5, });
    });
    afterAll(async () => {
        await store.deleteOrder(order1.id);
        await userStore.delete(user1.id);
        await productStore.delete(product1.id);
    });
    it('adds an order with the create method', async () => {
        order1 = await store.create(user1.id);
        expect(order1.user_id).toEqual(user1.id);
        expect(order1.status).toEqual(true);
    });
    it('returns a list of all orders with the index method', async () => {
        const result = await store.index();
        expect(result[0].user_id).toEqual(user1.id);
        expect(result[0].status).toEqual(true);
    });
    it('shows all orders of a user with the show method', async () => {
        const result = await store.show(user1.id);
        const plainResult = (Array.isArray(result)) ? result[0] : result;
        expect(parseInt(plainResult.id)).toEqual(order1.id);
        expect(parseInt(plainResult.user_id)).toEqual(user1.id);
        expect(plainResult.status).toEqual(true);
    });
    it('should add the product successfully', async () => {
        const result = await store.addProduct(1, 1, 2);
        expect(result.quantity).toEqual(2);
    });
});
