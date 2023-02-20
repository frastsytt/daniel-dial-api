const Koa = require('koa');
const app = new Koa();
const https = require('https');
const fs = require('fs');
const path = require('path');

var config = {
    domain: 'localhost',
    https: {
      port: 3000,
      options: {
        key: fs.readFileSync(path.resolve(process.cwd(), 'domain.key'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), 'domain.crt'), 'utf8').toString(),
      },
    },
  };

console.log(config.https.options.cert)
console.log(config.https.options.key)
app.use(async ctx => {
  ctx.body = 'Hello World';
});

https.createServer(config.https.options, app.callback()).listen(config.https.port);
console.log("Server live on localhost:3000")