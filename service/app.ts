import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import cors from 'koa2-cors';
import { register, login, userInfo } from './data';
import fs from 'fs';
import path from 'path'; 
import request from 'request';
import http from 'http';
import socket from 'socket.io';
import KoaStatic from 'koa-static';

const app = new Koa();
const router = new Router();
const staticPath =  path.resolve(__dirname, './upload');
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
app.use(KoaStatic(staticPath))
router.post('/addimg', async (ctx: any) => {
    const file = ctx.request.files.file;	// 获取上传文件 imgfile 为前端自定义
    const reader = fs.createReadStream(file.path);	// 创建读流
    let filePath = path.resolve(__dirname, 'upload/') + `/${file.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    ctx.body = {
        url: file.name
    }
}).get('/emotions', async (ctx: any) => {
    await requestGet('https://api.weibo.com/2/emotions.json?source=1362404091').then(res => {
        ctx.body = res
    })
}).post('/register', async (ctx: any) => {
    let { name, password, avatar } = ctx.request.body;
    avatar = avatar ? avatar : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'; // 默认头像
    await register({
        name,
        password,
        avatar
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
}).post('/login', async (ctx: any) => {
    let { name, password } = ctx.request.body;
    const data = await login({ name, password });
    ctx.body = data;
}).post('/userInfo', async (ctx: any) => {
    let { uid } = ctx.request.body;
    const data = await userInfo(uid);
    ctx.body = data;
})

app.use(router.routes());
app.use(router.allowedMethods());



const allUserOnline: any = [];
const server = http.createServer(app.callback());
const io = socket(server);
//监听socket连接
io.on('connection', (socket: any) => {
    socket.on('online', (user: any) => {
        allUserOnline[user] = socket;
        console.log(allUserOnline.length)
    });
    
    socket.on('send-private-chat', (sender: any, receiver: number) => {
        const nowSocket = allUserOnline[receiver];
        if (nowSocket) {
            nowSocket.emit('receive-private-chat',sender);
        }
    });
    socket.on('sendMsg', (msg: string|undefined, fn:any) => {
        fn(msg)
        socket.broadcast.emit('newMsg', msg);
    });
    socket.on('disconnect', (msg: any) => {
        
    });
})
server.listen(3000, () => {
    console.log(3000);
});