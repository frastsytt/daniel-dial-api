'use strict';
import Koa, { Context, Next } from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import { User } from "./helpers/User";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

const authenticationCheck = (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader || authHeader !== process.env.SECRET) {
    ctx.throw(401, "Unauthorized");
  }
  return next();
}

interface CreateUserRequestBody {
  username: string;
  password: string;
  email: string;
  age?: number; // Optional property
}


const users: User[] = [];

router.get("/", async (ctx, next) => {
  ctx.body = { msg: "Hello World!"}
})

router.post("/generateuser", authenticationCheck, async (ctx, next) => {
  const { username, password, email, age } = ctx.request.body as CreateUserRequestBody;
  // Lets check if someone with that username exists already.
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    ctx.throw(400, "Username already exists");
    return;
  }
  
  // Create a new user object and add it to the array
  const newUser = new User(username, password, email, age)
  users.push(newUser)

  // Send a response indicating that the user was created
  ctx.status = 201;
  ctx.body = { message: "User created", user: newUser };
})

router.get("/secret", authenticationCheck, async (ctx, next) => {
  ctx.body = { msg: "You're authorized"}
})

router.get("/generatekey", async (ctx, next) => {
  ctx.body = { key: process.env.SECRET,
  insructions: "Put this key into your headers as \"authorization\" when requesting the /secret endpoint"}
})


// Declare the middleware
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`)
})