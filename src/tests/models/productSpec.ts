// import { Product, ProductStore } from '../../models/product';

// const productModel = new ProductStore();


// describe('Testing Product Model', () => {
    
//     it('should successfully add the product to database and return the added product', async () => {
//         let result = await productModel.create({name: 'coffee',
//         price: 5, });
//         expect(result).toEqual({id:2, name: 'coffee', price: 5})
//     });        
    
//     it('should return all availale products', async () => {
//         const result = await productModel.index();
//         expect(result.length).toEqual(1);
//         expect(result[0].name).toEqual('coffee');
//     });                 
 
//     it("show method should return the correct product", async () => {
//         const result = await productModel.show(2)
//         expect(result).toEqual({id:2, name: 'coffee', price: 5});
//       });
    
// },)