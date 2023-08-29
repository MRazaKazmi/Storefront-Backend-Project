"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userModel = new user_1.UserStore();
const secret = process.env.JWT_SECRET;
describe('Testing User Model', () => {
    it('should add user to database', async () => {
        let resultCreate = await userModel.create({
            username: 'test',
            firstname: 'test',
            lastname: 'user',
            password: 'testpass123',
        });
        expect(resultCreate.id).toEqual(5);
        expect(resultCreate.username).toEqual('test');
    });
    it('should return all available users', async () => {
        const result = await userModel.index();
        expect(result.length).toEqual(4);
        expect(result[0].username).toEqual('username');
    });
    it('should return details of the given user', async () => {
        const result = await userModel.show(5);
        expect(result.username).toEqual('test');
    });
});
