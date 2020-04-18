const Sequelize = require('sequelize');
const config = require('../config');

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


var verify_account = async (ctx, next) => {

    // await next();
    var
        login_username = ctx.request.body.username || '',
        login_password = ctx.request.body.password || '';

    console.log(`login with name: ${login_username}, password: ${login_password}`);

    var accounts = await Account.findAll({
        where: {
            username: login_username,
            password: login_password
        }
    });
    console.log(`find ${accounts.length} accounts:`);

    if (accounts.length == 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = 'verify fail';
    } else {
        ctx.response.type = 'text/html';
        ctx.response.body = 'verify success';
    }
};

var register_account = async (ctx, next) => {

    // await next();
    var
        register_username = ctx.request.body.username || '',
        register_password = ctx.request.body.password || '';
        register_sn = ctx.request.body.sn || '';

    console.log(`register with name: ${register_username}, password: ${register_password}, sn: ${register_sn}`);

    var account = await Account.create({
        username: register_username,
        password: register_password,
        sn: register_sn
    });
    console.log('created: ' + JSON.stringify(account));

    if (account.length == 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = 'register fail';
    } else {
        ctx.response.type = 'text/html';
        ctx.response.body = 'register success';
    }
};


module.exports = {
    'POST /verify': verify_account,
    'POST /register': register_account
};