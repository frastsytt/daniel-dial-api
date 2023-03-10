'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const User_1 = require("./helpers/User");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const app = new koa_1.default();
const router = new koa_router_1.default();
const authenticationCheck = (ctx, next) => {
    const authHeader = ctx.headers.authorization;
    if (!authHeader || authHeader !== process.env.SECRET) {
        ctx.throw(401, "Unauthorized");
    }
    return next();
};
const users = [];
router.get("/", async (ctx, next) => {
    ctx.body = { msg: "Hello World!" };
});
router.post("/generateuser", authenticationCheck, async (ctx, next) => {
    const { username, password, email, age } = ctx.request.body;
    // Lets check if someone with that username exists already.
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        ctx.throw(400, "Username already exists");
        return;
    }
    // Create a new user object and add it to the array
    const newUser = new User_1.User(username, password, email, age);
    users.push(newUser);
    // Send a response indicating that the user was created
    ctx.status = 201;
    ctx.body = { message: "User created", user: newUser };
});
router.get("/secret", authenticationCheck, async (ctx, next) => {
    ctx.body = { msg: "You're authorized" };
});
router.get("/generatekey", async (ctx, next) => {
    ctx.body = { key: process.env.SECRET,
        insructions: "Put this key into your headers as \"authorization\" when requesting the /secret endpoint" };
});
// Declare the middleware
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes()).use(router.allowedMethods());
app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`);
});
