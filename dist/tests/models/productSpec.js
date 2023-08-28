"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productModel = new product_1.ProductStore();
const newProduct = {
    id: 18,
    name: 'abc',
    price: 123,
};
describe('Testing Product Model', () => {
    describe('create method', () => {
        it('should successfully add the product to database and return the added product', async () => {
            let result = await productModel.create(newProduct);
            expect(result).toEqual(newProduct);
        });
    });
    describe('index method', () => {
        it('should return all availale products', async () => {
            const result = await productModel.index();
            expect(result.length).toEqual(1);
            expect(result).toEqual([newProduct]);
        });
    });
    describe('show method', () => {
        it('should return the product details based on the given id', async () => {
            let result = await productModel.show(17);
            expect(result).toEqual(newProduct);
        });
    });
});
