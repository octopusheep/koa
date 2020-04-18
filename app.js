const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(controller());

app.listen(3001);
console.log('app started at port 3001...');




