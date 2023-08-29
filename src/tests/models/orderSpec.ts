import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const productStore = new ProductStore();
let product1:Product;

const store = new OrderStore();
let order1: Order;

const userStore = new UserStore();
let user1: User;


describe('Tests the Order Model', () => {
    
    beforeAll(async () => {
        user1 = await userStore.create({
            username: 'orderTestUser',
            firstname: 'orderTestFirst',
            lastname: 'orderTestLast',
            password: 'awesome'
            });

        product1 = await productStore.create({name: 'chai',
        price: 5, })
            ;})

    afterAll(async () => {
        await store.deleteOrder(order1.id as number)
        await userStore.delete(user1.id as number);
        await productStore.delete(product1.id as number)
    })

    it('adds an order with the create method', async () => {
        order1 = await store.create( user1.id as number);
        expect(order1.user_id as number).toEqual(user1.id as number);
        expect(order1.status).toEqual(true);
    })

    it('returns a list of all orders with the index method', async () => {
        const result = await store.index();
        expect(result[0].user_id as number).toEqual(user1.id as number);
        expect(result[0].status).toEqual(true);
    })

    it('shows all orders of a user with the show method', async () => {
        const result = await store.show(user1.id as unknown as number);
        const plainResult = (Array.isArray(result)) ? result[0] : result;
        expect(parseInt(plainResult.id as unknown as string)).toEqual(order1.id as number);
        expect(parseInt(plainResult.user_id as unknown as string)).toEqual(user1.id as number);
        expect(plainResult.status).toEqual(true);
    });

    it('should add the product successfully', async () => {
        const result = await store.addProduct(1, 1, 2); 
        expect(result.quantity).toEqual(2)
        })
        ;})