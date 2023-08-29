"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productModel = new product_1.ProductStore();
describe('Testing Product Model', () => {
    it('should successfully add the product to database and return the added product', async () => {
        let result = await productModel.create({ name: 'coffee',
            price: 5, });
        expect(result).toEqual({ id: 4, name: 'coffee', price: 5 });
    });
    it('should return all availale products', async () => {
        const result = await productModel.index();
        expect(result.length).toEqual(3);
        expect(result[0].name).toEqual('Pc');
    });
    it("show method should return the correct product", async () => {
        const result = await productModel.show(4);
        expect(result).toEqual({ id: 4, name: 'coffee', price: 5 });
    });
});
