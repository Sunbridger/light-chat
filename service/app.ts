import Koa from 'koa';
const app = new Koa();
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
const router = new Router();
import {
    addUser
} from './data';
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

router.post('/adduser', async (ctx: { request: { body: { name: any; age: any; }; }; body: { msg: boolean; }; }) => {
    const { name, age } = ctx.request.body;
    await addUser({
        name,
        age
    }).then((res: any) => {
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