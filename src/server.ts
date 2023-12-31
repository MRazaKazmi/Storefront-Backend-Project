import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

import path from "path"

import userRoutes from "./handlers/user"
import productRoutes from "./handlers/product"
import orderRoutes from "./handlers/order"

const app = express()

let port: number = 3000

if (process.env.ENV === "test") {
  port = 3001
}

const address: string = `127.0.0.1:${port}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(port, () => {
  console.info(`Starting app on: ${address}`)
})

export default app