const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router');
const router = new Router();
const Sql = require('./data');
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

router.post('/user', async ctx => {
    await Sql.addUser({
        name: 'Sunbridger',
        age: 23
    }).then(res => {
        console.log(res,' res');
    })
    ctx.body = '插入成功'
    console.log(11111)
})


app.listen(3000, () => {
    console.log(3000)
});