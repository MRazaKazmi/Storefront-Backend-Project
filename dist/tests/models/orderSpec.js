"use strict";
// import { Order, OrderStore } from '../../models/order';
// const orderModel = new OrderStore();
// const newOrder: Order = {
//     id: 2,
//     status: true,
//     user_id: 1,
//     products : [
//         {
//             "product_id": 1,
//             "quantity": 1
//         },
//         {
//             "product_id": 2,
//             "quantity": 2
//         },
//     ] 
// };
// describe('Testing Order Model', () => {
//     describe('create method', () => {
//         it('should create a new order for the given user', async () => {
//             let result = await orderModel.create(newOrder);
//             expect(result).toEqual(newOrder);
//         });
//     });
//     describe('index method', () => {
//         it('should return all the orders', async () => {
//             const result = await orderModel.index();
//             expect(result.length).toEqual(2);
//             expect(result[0]).toEqual(newOrder);
//         });
//     });
//     describe('show method', () => {
//         it('should return order details based on given order id', async () => {
//             const result = await orderModel.read(1);
//             expect(result).toEqual(newOrder);
//         });
//     });
// })
