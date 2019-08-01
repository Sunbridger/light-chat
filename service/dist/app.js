"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const Sql = require('./data');
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
router.post('/adduser', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { name, age } = ctx.request.body;
    yield Sql.addUser({
        name,
        age
    }).then((res) => {
        if (res) {
            ctx.body = {
                msg: true
            };
        }
        else {
            ctx.body = {
                msg: false
            };
        }
    });
}));
app.listen(3000, () => {
    console.log(3000);
});
