// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Account = sequelize.define('account', {
    sn: {
        type: Sequelize.STRING(40),
        primaryKey: true
    },
    username: Sequelize.STRING(40),
    password: Sequelize.STRING(40)
    
}, {
        timestamps: false
    });

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {

    await next();

    var accounts = await Account.findAll({
        where: {
            sn: '15556951659'
        }
    });
    console.log(`find ${accounts.length} accounts:`);
    for (let p of accounts) {
        console.log(JSON.stringify(p));
        ctx.response.type = 'text/html';
        ctx.response.body = JSON.stringify(p);
    }


});

// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3001...');
