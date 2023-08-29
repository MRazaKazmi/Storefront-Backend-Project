"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const store = new order_1.OrderStore();
let order1;
let order2;
const userStore = new user_1.UserStore();
let user1;
let user2;
describe('Tests the Order Model', () => {
    beforeAll(async () => {
        user1 = await userStore.create({
            username: 'Alice',
            firstname: 'Bob',
            lastname: 'Liddell',
            password: 'Wonderland'
        });
        afterAll(async () => {
            await userStore.delete(user1.id);
        });
    });
    //   it('should have a delete method', () => {
    //     expect(store.delete).toBeDefined();
    //   });
    it('adds an order with the create method', async () => {
        order1 = await store.create(user1.id);
        expect(parseInt(order1.user_id)).toEqual(user1.id);
        expect(order1.status).toEqual(true);
        //     order2 = await store.create({
        //       user_id: user2.id as number,
        //       status: 'completed'
        //     });
        //     expect(parseInt(order2.user_id as unknown as string)).toEqual(user2.id as number);
        //     expect(order2.status).toEqual('completed');
        //   });
        //   it('edits an order with the edit method', async () => {
        //     const id = order2.id;
        //     order2 = await store.edit({
        //       id: id,
        //       user_id: user2.id as number,
        //       status: 'complete'
        //     });
        //     expect(parseInt(order2.user_id as unknown as string)).toEqual(user2.id as number);
        //     expect(order2.status).toEqual('complete');
        //   });
        //   it('returns a list of all orders with the index method', async () => {
        //     const result = await store.index();
        //     expect(result.length).toEqual(2);
        //     expect(parseInt(result[0].user_id as unknown as string)).toEqual(user1.id as number);
        //     expect(result[0].status).toEqual('active');
        //     expect(parseInt(result[1].user_id as unknown as string)).toEqual(user2.id as number);
        //     expect(result[1].status).toEqual('complete');
        //   });
        //   it('shows all orders of a user with the show method', async () => {
        //     const result = await store.show(user1.id as unknown as string);
        //     const plainResult = (Array.isArray(result)) ? result[0] : result;
        //     expect(parseInt(plainResult.id as unknown as string)).toEqual(order1.id as number);
        //     expect(parseInt(plainResult.user_id as unknown as string)).toEqual(user1.id as number);
        //     expect(plainResult.status).toEqual('active');
        //   });
        //   it('delete an order with the delete method', async () => {
        //     await store.delete(order1.id as unknown as string);
        //     const result = await store.index();
        //     expect(result.length).toEqual(1);
        //     expect(parseInt(result[0].user_id as unknown as string)).toEqual(user2.id as number);
        //     expect(result[0].status).toEqual('complete');
        //   });
        //   it('deletes all orders with the deleteAll method', async () => {
        //     await store.deleteAll();
        //     const result = await store.index();
        //     expect(result.length).toEqual(0);
        //   });
    });
});
