const bodyParser = require('koa-bodyparser');
const controller = require('./controller');


const Koa = require('koa');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const router = require('koa-router')();
const app = new Koa();


app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });

app.use(bodyParser());
app.use(router.routes());
app.use(controller());

app.listen(3001);
console.log('app started at port 3001...');




