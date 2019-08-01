import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import cors from 'koa2-cors';
import { addUser } from './data';
import fs from 'fs';
import path from 'path'; 
import request from 'request';
const app = new Koa();
const router = new Router();
const options = {
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
}
function requestGet(url: string) {
    return new Promise(function (resolve, reject) {
      request(url, function(err: any, response: any, body: unknown) {
        if (err) reject(err);
        resolve(body);
      });
    });
}
app.use(koaBody(options));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

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
}).post('/addimg', async (ctx: any) => {
    const file = ctx.request.files.imgfile;	// 获取上传文件 imgfile 为前端自定义
    const reader = fs.createReadStream(file.path);	// 创建读流
    let filePath = path.resolve(__dirname, 'upload/') + `/${file.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    ctx.body = {
        url: 'xxxx'
    }
}).get('/emotions', async (ctx: any) => {
    await requestGet('https://api.weibo.com/2/emotions.json?source=1362404091').then(res => {
    ctx.body = res
    })
})


app.listen(3000, () => {
    console.log(3000)
});