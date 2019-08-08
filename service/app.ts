import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import cors from 'koa2-cors';
import { register, login, userInfo, savemsg, getmsgoto, getuser, online, offline, whoOnline, sendArticle, getArticle, delArticle } from './data';
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
}).post('/savemsg', async (ctx: any) => {
    let { from, to, msg } = ctx.request.body;
    const flag = await savemsg({ from, to, msg });
    ctx.body = !!flag;
}).post('/getmsgoto', async (ctx: any) => {
    let { uid1, uid2 } = ctx.request.body;
    const data = await getmsgoto({ uid1, uid2 });
    ctx.body = data;
}).post('/getuser', async (ctx: any) => {
    let { uid } = ctx.request.body;
    const data = await getuser({ uid });
    ctx.body = data;
}).post('/whoOnline', async (ctx: any) => {
    let { uid } = ctx.request.body;
    let data: any = await whoOnline(uid);
    data = data.map((el: any)=> el.uid);
    ctx.body = data
}).post('/sendArticle', async (ctx: any) => {
    let { user , ispublic, article} = ctx.request.body;
    const data = await sendArticle({ user , ispublic, article });
    ctx.body = !!data;
}).post('/getArticle', async (ctx: any) => {
    let { uid } = ctx.request.body;
    const data = await getArticle({ uid });
    ctx.body = data;
}).post('/delArticle', async (ctx: any) => {
    let { aid } = ctx.request.body;
    const data = await delArticle({ aid });
    ctx.body = !!data;
}).get('/', async (ctx: any) => {
    ctx.body = 'ok';
})

app.use(router.routes());
app.use(router.allowedMethods());



const allUserOnline: any = {};
const server = http.createServer(app.callback());
const io = socket(server);

io.on('connection', (socket: any) => {
    // 在线
    socket.on('online', (user: number) => {
        socket.id = user;
        allUserOnline[user] = socket;
        online(user)
    });
    
    // 私信
    socket.on('send-private-chat', (sender: any, receiveruid: number) => {
        const nowSocket = allUserOnline[receiveruid];
        if (nowSocket) {
            nowSocket.emit('receive-private-chat',sender);
        } else {
            console.log('对方暂时不在线')
        }
    });
    // 网络自动检测下线
    socket.on('disconnect', () => {
        let user = Number(socket.id);
        if (user) {
            allUserOnline[user] = false;
            offline(user);
        }
    })
    // 手动下线
    socket.on('offline', (user: number) => {
        offline(user);
    })
})
server.listen(3000, () => {
    console.log(3000);
});