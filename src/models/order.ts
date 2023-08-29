import client from '../database';

export type Order = {
    id?: number;
    user_id: number;
    status: boolean;
};

export type OrderProduct = {
    id?: number;
    orderid: number;
    productid: number;
    quantity: number;
};

export class OrderStore {
    
    async create(userId: number): Promise<Order> {
        const conn = await client.connect();
        const status = true;

        try {
            let sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
            let result = await conn.query(sql, [userId, status]);

            if (result.rows.length === 0) {
                sql =
                    'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
                result = await conn.query(sql, [userId, status]);

                conn.release();
                return result.rows[0];
            } else {
                throw new Error(
                    'Cannot create two open orders(cart) for single user'
                );
            }
        } catch (err) {
            conn.release();

            console.log('Failed to create new order', err);

            throw err;
        }
    }

    async index(): Promise<Order[]> {
        const conn = await client.connect();

        try {
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            conn.release();

            console.log('Failed to fetch the orders', err);

            throw err;
        }
    }

        async show(orderId: number): Promise<Order> {
        const conn = await client.connect();

        try {
            const sql = 'SELECT * FROM orders WHERE id=$1';
            const result = await conn.query(sql, [orderId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            conn.release();

            console.log('Failed to fetch the order details', err);

            throw err;
        }
    }

    async addProduct(
        orderid: number,
        productid: number,
        quantity: number
    ): Promise<OrderProduct> {
        const conn = await client.connect();

        try {
            let sql = 'SELECT * FROM orders WHERE id=$1';
            let result = await conn.query(sql, [orderid]);

            if (result.rows.length && result.rows[0].status === true) {
                sql =
                    'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                result = await conn.query(sql, [orderid, productid, quantity]);

                conn.release();
                return result.rows[0];
            } else {
                throw new Error('Order not found or order is not open');
            }
        } catch (err) {
            conn.release();

            console.log('Failed to add the product details into order', err);

            throw err;
        }
    }
    async deleteOrder (id: number): Promise<Order> {
      try {
        const connection = await client.connect()
        const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)"
        await connection.query(orderProductsSql, [id])
  
        const sql = "DELETE FROM orders WHERE id=($1)"
        const {rows} = await connection.query(sql, [id])
        const order = rows[0]
  
        connection.release()
  
        return order
      } catch (err) {
        throw new Error(`Could not delete order ${id}. ${err}`)
      }
    }
}
  
  