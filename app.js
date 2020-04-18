// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

// const Sequelize = require('sequelize');
// const config = require('./config');

// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

// var Account = sequelize.define('account', {
//     sn: {
//         type: Sequelize.STRING(40),
//         primaryKey: true
//     },
//     username: Sequelize.STRING(40),
//     password: Sequelize.STRING(40)

// }, {
//     timestamps: false
// });

// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {

//     await next();

//     var accounts = await Account.findAll({
//         where: {
//             sn: '15556951659'
//         }
//     });
//     console.log(`find ${accounts.length} accounts:`);
//     for (let p of accounts) {
//         console.log(JSON.stringify(p));
//         ctx.response.type = 'text/html';
//         ctx.response.body = JSON.stringify(p);
//     }
// });

// add url-route:
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

// add router middleware:


// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3001...');
