import client from "../database"

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class ProductStore {
  async index (): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM products"

      const result  = await conn.query(sql)

      conn.release()
      
      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. ${err}`)
    }
  }

  async create (product: Product): Promise<Product> {
    const {name, price} = product

    try {
      const sql = "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *"
      const conn = await client.connect()
      const result = await conn.query(sql, [name, price])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add new product ${name}. ${err}`)
    }
  }

  async show (id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)"
      const conn = await client.connect()
      const result  = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`)
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products where id = $1 RETURNING *";
      
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete this product ${id}. Error: ${err}`);
    }
  }
}