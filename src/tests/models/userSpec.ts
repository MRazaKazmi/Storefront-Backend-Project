import { User, UserStore } from '../../models/user';
import jwt from 'jsonwebtoken';

const userModel = new UserStore();

const secret = process.env.JWT_SECRET as string;


describe('Testing User Model', () => {
    
    it('should add user to database and return auth token', async () => {
        let result = await userModel.create({
            username: 'test',
            firstname: 'test',
            lastname: 'user',
            password: 'testpass123',
        });
        expect(result.id).toEqual(1);
        expect(result.username).toEqual('test');
    });

    it('should return all available users', async () => {
        const result = await userModel.index();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(1);
    });


    it('should return details of the given user', async () => {
        const result = await userModel.show("1");
        expect(result.id).toEqual(1);
        expect(result.username).toEqual('test');
    });
});