import {Application, Request, Response} from "express"
import {User, UserStore} from "../models/user"
import {verifyAuthToken, createUserAuthToken} from "./helpers"

const UserStoreInstance = new UserStore()

const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserStoreInstance.index()

    res.json(users)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const create = async (req: Request, res: Response) => {
  try {

    
    const { username, password, firstname, lastname } = req.body;
    const user = { username, firstname, lastname, password };

    if (firstname === undefined ||lastname === undefined || username === undefined || password === undefined) {
      res.status(400)
      res.send("Some required parameters are missing! eg. :firstname, :lastname, :username, :password")
      return false
    }

    const newUser: User = await UserStoreInstance.create(user)

    res.send(createUserAuthToken(newUser))
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number

    if (id === undefined) {
      res.status(400)
      res.send("Missing required parameter :id.")
      return false
    }

    const user: User = await UserStoreInstance.show(id)

    res.json(user)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

export default function userRoutes (app: Application) {
  app.get("/users", verifyAuthToken, index)
  app.post("/users/create", create)
  app.get("/users/:id", verifyAuthToken, read)
}