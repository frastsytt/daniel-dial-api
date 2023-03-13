# Project information
This project serves no real purpose at the moment but I'm sure it will be something great one day!
# Project setup
The process gets its port that the application will be served on from the servers enironment variables. Make sure you set it before proceeding.
For example on Ubuntu 22.04, you would run this command to set the "PORT" environment variable.
```bash
export PORT=3000
```
If you are using pm2 to run the application in your server, supply the environment variables for it.
```js
module.exports = {
  apps : [
    {
      name: "index",
      script: "./dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT
        SECRET: process.env.SECRET
      }
    }
  ]
}
```