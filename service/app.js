const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router');
const router = new Router();
const Sql = require('./data');
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

router.post('/adduser', async ctx => {
    const { name, age } = ctx.request.body;
    await Sql.addUser({
        name,
        age
    }).then(res => {
        if (res) {
            ctx.body = {
                msg: true
            }
        } else {
            ctx.body = {
                msg: false
            }
        }
    })
});


app.listen(3000, () => {
    console.log(3000)
});