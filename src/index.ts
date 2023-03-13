'use strict';
import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

const app = new Koa();
const router = new Router();

const authenticationCheck = (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader || authHeader !== process.env.SECRET) {
    ctx.throw(401, "Unauthorized");
  }
  return next();
}

router.get("/", async (ctx, next) => {
  ctx.body = { msg: "Hello World!"}
})

router.get("/secret", authenticationCheck, async (ctx, next) => {
  ctx.body = { msg: "You're authorized"}
})

router.get("/generatekey", async (ctx, next) => {
  ctx.body = { key: process.env.SECRET}
})



app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`)
})