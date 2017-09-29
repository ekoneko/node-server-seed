A seed for building nodejs web server

## Environment

node > 7.6 ( or --harmony_async_await )

## Introduce

This is a seed repo for initializing your project.

The repo base on koa2 + sequelize and supports theese feature:

1. A (maybe) graceful code struct
2. A route system
3. A baked koa bundle
4. A easy way to use sequelize models
5. A session system (use redis)

### Struct

- code/
-- constants/
-- controllers/
-- models/
-- services/
-- app.js
-- router.js
- script/

All server code in `code` directory.

The `code/app.js` is node entry, it will init redis and database, and create a koa server.

`code/router.js` define a koa-router. I suggest define all routes in one file. The routes's implement is in `controllers` directory.

The `models` directory defines `sequelize's model`. The `services` directory supports some services like db, cache, session... It most uses in controller or other services.

The `scripts` directory support some CLI scripts. Like create database by your model.

## Dry Run

Copy `.env.example` to `.env`, and configure it.

`npm start`

## Example

[diybb](https://github.com/ekoneko/diybb)
