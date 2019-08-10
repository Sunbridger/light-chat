"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const data_1 = require("./data");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request_1 = __importDefault(require("request"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const koa_static_1 = __importDefault(require("koa-static"));
const app = new koa_1.default();
const router = new koa_router_1.default();
const staticPath = path_1.default.resolve(__dirname, './upload');
const options = {
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
};
function requestGet(url) {
    return new Promise(function (resolve, reject) {
        request_1.default(url, function (err, response, body) {
            if (err)
                reject(err);
            resolve(body);
        });
    });
}
app.use(koa_body_1.default(options));
app.use(koa2_cors_1.default());
app.use(koa_static_1.default(staticPath));
router.post('/addimg', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const file = ctx.request.files.file; // 获取上传文件 imgfile 为前端自定义
    const reader = fs_1.default.createReadStream(file.path); // 创建读流
    let filePath = path_1.default.resolve(__dirname, 'upload/imgs/') + `/${file.name}`;
    const upStream = fs_1.default.createWriteStream(filePath);
    reader.pipe(upStream);
    ctx.body = {
        url: 'https://2261295nz5.51mypc.cn/imgs/' + file.name
    };
})).get('/emotions', (ctx) => __awaiter(this, void 0, void 0, function* () {
    yield requestGet('https://api.weibo.com/2/emotions.json?source=1362404091').then(res => {
        ctx.body = res;
    });
})).post('/register', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { name, password, avatar } = ctx.request.body;
    avatar = avatar ? avatar : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'; // 默认头像
    yield data_1.register({
        name,
        password,
        avatar
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
})).post('/login', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { name, password } = ctx.request.body;
    const data = yield data_1.login({ name, password });
    ctx.body = data;
})).post('/userInfo', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { uid } = ctx.request.body;
    const data = yield data_1.userInfo(uid);
    ctx.body = data;
})).post('/savemsg', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { from, to, msg } = ctx.request.body;
    const flag = yield data_1.savemsg({ from, to, msg });
    ctx.body = !!flag;
})).post('/getmsgoto', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { uid1, uid2 } = ctx.request.body;
    const data = yield data_1.getmsgoto({ uid1, uid2 });
    ctx.body = data;
})).post('/getuser', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { uid } = ctx.request.body;
    const data = yield data_1.getuser({ uid });
    ctx.body = data;
})).post('/whoOnline', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { uid } = ctx.request.body;
    let data = yield data_1.whoOnline(uid);
    data = data.map((el) => el.uid);
    ctx.body = data;
})).post('/sendArticle', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { user, ispublic, article, imgs } = ctx.request.body;
    const data = yield data_1.sendArticle({ user, ispublic, article, imgs });
    ctx.body = !!data;
})).post('/getArticle', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { uid } = ctx.request.body;
    const data = yield data_1.getArticle({ uid });
    ctx.body = data;
})).post('/delArticle', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { aid } = ctx.request.body;
    const data = yield data_1.delArticle({ aid });
    ctx.body = !!data;
})).get('/', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = 'ok';
}));
app.use(router.routes());
app.use(router.allowedMethods());
const allUserOnline = {};
const server = http_1.default.createServer(app.callback());
const io = socket_io_1.default(server);
io.on('connection', (socket) => {
    // 在线
    socket.on('online', (user) => {
        socket.id = user;
        allUserOnline[user] = socket;
        data_1.online(user);
    });
    // 私信
    socket.on('send-private-chat', (sender, receiveruid) => {
        const nowSocket = allUserOnline[receiveruid];
        if (nowSocket) {
            nowSocket.emit('receive-private-chat', sender);
        }
        else {
            console.log('对方暂时不在线');
        }
    });
    // 网络自动检测下线
    socket.on('disconnect', () => {
        let user = Number(socket.id);
        if (user) {
            allUserOnline[user] = false;
            data_1.offline(user);
        }
    });
    // 手动下线
    socket.on('offline', (user) => {
        data_1.offline(user);
    });
});
server.listen(3000, () => {
    console.log(3000);
});
