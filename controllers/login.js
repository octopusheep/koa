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

var Island = sequelize.define('island', {
    island_sn: {
        type: Sequelize.STRING(40),
        primaryKey: true
    },
    island_price: Sequelize.STRING(40),
    island_password: Sequelize.STRING(40),
    island_condition: Sequelize.STRING(40),
    island_allow_sn: Sequelize.STRING(40),
    island_start: Sequelize.STRING(40),
    island_end: Sequelize.STRING(40),
    island_num: Sequelize.STRING(40)
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

var register_island = async (ctx, next) => {

    // await next();
    var
        register_island_price = ctx.request.body.island_price || '';
    register_island_password = ctx.request.body.island_password || '';
    register_island_condition = ctx.request.body.island_condition || '';
    register_island_allow_sn = ctx.request.body.island_allow_sn || '';
    register_island_start = ctx.request.body.island_start || '';
    register_island_end = ctx.request.body.island_end || '';
    register_island_sn = ctx.request.body.island_sn || '';

    console.log(`register island with price: ${register_island_price}, password: ${register_island_password}, condition: ${register_island_condition},allow_sn: ${register_island_allow_sn},start: ${register_island_start},end: ${register_island_end},sn: ${register_island_sn}`);

    var island = await Island.create({
        island_price: register_island_price,
        island_password: register_island_password,
        island_condition: register_island_condition,
        island_allow_sn: register_island_allow_sn,
        island_start: register_island_start,
        island_end: register_island_end,
        island_sn: register_island_sn,
    });
    console.log('created island: ' + JSON.stringify(island));

    if (island.length == 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = 'register island fail';
    } else {
        ctx.response.type = 'text/html';
        ctx.response.body = 'register island success';
    }
};


var get_account = async (ctx, next) => {

    // await next();
    var
        get_username = ctx.request.body.search_username || '';

    console.log(`search with name: ${get_username}`);

    var accounts = await Account.findAll({
        where: {
            username: get_username,
        }
    });
    console.log(`find ${accounts.length} accounts:`);

    if (accounts.length == 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = 'search fail';
    } else {
        ctx.response.type = 'text/html';
        ctx.response.body = accounts;
    }
};

var get_islands = async (ctx, next) => {

    // await next();
    console.log(`get_island_list`);

    var islands = await Island.findAll({

    });
    console.log(`find ${islands.length} islands:`);

    if (islands.length == 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = 'search islands fail';
    } else {
        ctx.response.type = 'text/html';
        ctx.response.body = islands;
    }
};

var delete_island = async (ctx, next) => {

    // await next();
    var
        delete_sn = ctx.request.body.sn || '';

    console.log(`delete island belongs to sn: ${delete_sn}`);

    var islands = await Island.findAll({
        where: {
            island_sn: delete_sn,
        }
    });

    if (islands.length == 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = 'no island find';
    } else {
        var islands = await Island.destroy({
            where: {
                island_sn: delete_sn,
            }
        });

        ctx.response.type = 'text/html';
        ctx.response.body = 'island delete success';


    }
};


module.exports = {
    'POST /verify': verify_account,
    'POST /register': register_account,
    'POST /register_island': register_island,
    'POST /get_account': get_account,
    'POST /delete_island': delete_island,
    'GET /get_islands': get_islands,
};