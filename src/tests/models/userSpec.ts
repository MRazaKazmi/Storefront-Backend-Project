// import { User, UserStore } from '../../models/user';
// import jwt from 'jsonwebtoken';

// const userModel = new UserStore();

// const secret = process.env.JWT_SECRET as string;

// const newUser: User = {
//     id: "9",
//     username: 'test',
//     firstname: 'test',
//     lastname: 'user',
//     password: 'testpass123',
// };


// describe('Testing User Model', () => {
//     describe('create method', () => {
//         it('should add user to database and return auth token', async () => {
//             let result = await userModel.create(newUser);
//              expect(result).toEqual(newUser);
// });

//     });

//     describe('index method', () => {
//         it('should return all available users', async () => {
//             const result = await userModel.index();
//             expect(result.length).toEqual(1);
//             expect(result[0].id).toEqual(newUser.id);
//         });
//     });

//     describe('show method', () => {
//         it('should return details of the given user', async () => {
//             const result = await userModel.show('testUser');

//             expect(result.id).toEqual(newUser.id);
//         });
//     });

    
// });