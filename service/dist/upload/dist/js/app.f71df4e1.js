(function(e){function t(t){for(var i,s,o=t[0],c=t[1],l=t[2],d=0,m=[];d<o.length;d++)s=o[d],r[s]&&m.push(r[s][0]),r[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],i=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(i=!1)}i&&(n.splice(t--,1),e=s(s.s=a[0]))}return e}var i={},r={app:0},n=[];function s(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=i,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(a,i,function(t){return e[t]}.bind(null,i));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},1:function(e,t){},2779:function(e,t,a){"use strict";var i=a("e7fc"),r=a.n(i);r.a},"355d2":function(e,t,a){},"3bb5":function(e,t,a){"use strict";var i=a("355d2"),r=a.n(i);r.a},"41a6":function(e,t,a){},"5cb8":function(e,t,a){},"66c0":function(e,t,a){"use strict";var i=a("c0c8"),r=a.n(i);r.a},a622:function(e,t,a){},b2c2:function(e,t,a){"use strict";var i=a("a622"),r=a.n(i);r.a},c0c8:function(e,t,a){},cd49:function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var i=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],s=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),o=(a("7f7f"),a("75fc")),c=a("bc3a"),l=a.n(c),u=a("8055"),d=a.n(u),m="ws://119.45.209.166:3000",f="http://119.45.209.166:3000",p=d()(m),g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.a.post(f+e,t)},h=function(e,t,a){p.emit(e,t,a)},v=function(e,t){p.on(e,t)},b=l.a,w=a("2f62");function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,i)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var S={data:function(){return{audioCtx:new AudioContext,uid:"",tipVoice:"",sender:{},msg:""}},created:function(){var e=this;this.tipVoice=window.localStorage.tipVoice,this.uid=window.localStorage.uid,this.uid&&v("receive-private-chat",function(t){e.sender=t,"0"==e.tipVoice?(navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate,navigator.vibrate(1e3)):e.audioTip();var a=e.uid+"=>"+t.uid,i=[];if(e.getStroage(a)){var r=JSON.parse(e.getStroage(a));i=[].concat(Object(o["a"])(r),[{msg:t.msg,time:new Date,fromuid:t.uid}])}else i.push({msg:t.msg,time:new Date,fromuid:t.uid});if("chat"!==e.$route.name){var n,c=e.uid+"-"+t.uid,l=e.getStroage(c)||0,u=e.$createElement;e.msg=e.$message({message:u("span",{on:{click:e.goChat}},"".concat(t.name,"发来一条新消息")),type:"success"}),e.saveStroage((n={},Object(s["a"])(n,c,++l),Object(s["a"])(n,a,JSON.stringify(i)),n))}else e.saveStroage(Object(s["a"])({},a,JSON.stringify(i))),e.getShouldShowMsgFromLocal(a),window.scrollTo(0,document.body.offsetHeight)})},computed:{},methods:O({},Object(w["b"])(["getShouldShowMsg"]),{},Object(w["c"])(["getShouldShowMsgFromLocal"]),{goChat:function(){this.$router.push({name:"chat",params:this.sender}),this.msg.close()},audioTip:function(){var e=this.audioCtx,t=e.createOscillator(),a=e.createGain();t.connect(a),a.connect(e.destination),t.type="sine",t.frequency.value=600,a.gain.setValueAtTime(0,e.currentTime),a.gain.linearRampToValueAtTime(2,e.currentTime+.01),t.start(e.currentTime),a.gain.exponentialRampToValueAtTime(.001,e.currentTime+1),t.stop(e.currentTime+1)}})},j=S,_=a("2877"),x=Object(_["a"])(j,r,n,!1,null,null,null),$=x.exports,C=a("8c4f"),P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"60px"}},[a("el-form-item",{attrs:{label:"账号"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),a("div",{staticClass:"cen-tip"},[a("el-radio",{attrs:{label:1},model:{value:e.tipVoice,callback:function(t){e.tipVoice=t},expression:"tipVoice"}},[e._v("声音")]),a("el-radio",{attrs:{label:0},model:{value:e.tipVoice,callback:function(t){e.tipVoice=t},expression:"tipVoice"}},[e._v("震动")])],1),a("el-form-item",[a("el-button",{attrs:{type:"success"},on:{click:e.login}},[e._v("登陆")]),a("el-button",{attrs:{type:"primary"}},[a("router-link",{attrs:{to:{name:"register"}}},[e._v("注册")])],1)],1)],1)],1)},k=[],E={name:"login",data:function(){return{form:{name:"",password:""},tipVoice:1}},methods:{login:function(){var e=this;this.form.name.trim()&&this.form.password.trim()?(this.clearStorage(),g("/login",this.form).then(function(t){var a=t.data;if(a.status){var i=a.uid,r=a.avatar,n=a.name,s=e.tipVoice;e.saveStroage({uid:i,avatar:r,name:n,tipVoice:s}),e.$router.push({name:"home"}),location.reload()}else e.$message({message:a.msg,type:"error",duration:700})})):this.$message({message:"请填写账号或密码",type:"warning",duration:700})},clearStorage:function(){["avatar","name","uid","tipVoice"].forEach(function(e){window.localStorage.removeItem(e)})}}},I=E,A=(a("66c0"),Object(_["a"])(I,P,k,!1,null,null,null)),D=A.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pg-form"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"60px",rules:e.rules}},[a("el-form-item",{attrs:{label:"账号",prop:"name"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),a("el-form-item",{staticClass:"ava",attrs:{label:"头像"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.serviceImg,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.urlImg?a("img",{staticClass:"avatar",attrs:{src:e.urlImg}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e.searching?a("span",{staticClass:"el-icon-loading randomava"}):a("el-button",{staticClass:"randomava",attrs:{icon:"el-icon-search",circle:""},on:{click:e.randomAva}})],1),a("el-form-item",[a("el-button",{on:{click:e.goback}},[e._v("返回")]),a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary",plain:""},on:{click:function(t){return e.onRegister("form")}}},[e._v("提交")])],1)],1)],1)},V=[],T="http://119.45.209.166:3000/",N=T,U=N+"addimg",F={name:"register",data:function(){return{form:{name:"",password:"",avatar:""},rules:{name:[{required:!0,message:"请输入账号名称",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},urlImg:"",fullscreenLoading:!1,serviceImg:U,searching:!1}},methods:{goback:function(){this.$router.push({name:"login"})},onRegister:function(e){var t=this;this.$refs[e].validate(function(e){if(e&&t.urlImg)t.registerFn();else{var a="请按要求填写信息";t.urlImg||(a="请上传头像或随机生成"),t.$message({message:a,type:"warning",duration:1e3})}})},registerFn:function(){var e=this;this.form.avatar=this.urlImg,g("/register",this.form).then(function(t){var a=t.data;e.fullscreenLoading=!1,a.msg?(e.$message({message:"注册成功",type:"success",duration:450}),e.$router.push({name:"login"})):e.$message({message:"用户名已存在",type:"error",duration:1500})})},handleAvatarSuccess:function(e,t){this.urlImg=e.url},beforeAvatarUpload:function(e){console.log(e.type);var t="image/png"===e.type||"image/jpeg"===e.type,a=e.size/1024/1024<2;return t||this.$message.error("只支持jpeg|png|jpg格式图片"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&a},randomAva:function(){var e=this;this.searching=!0,b.get("https://api.uomg.com/api/rand.avatar?format=json").then(function(t){var a=t.data;e.searching=!1,a.msg?e.$message.error(a.msg):e.urlImg=a.imgurl})}}},L=F,B=(a("ddb4"),Object(_["a"])(L,M,V,!1,null,null,null)),R=B.exports,J=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"fix-top"},[a("i",{staticClass:"el-icon-arrow-left",on:{click:e.goBack}}),e._v("\n        "+e._s(e.friend.name)+"\n    ")]),a("div",{staticClass:"content-top"},e._l(e.shouldShowMsg,function(t){return a("div",{key:t.id,staticClass:"row-msg"},[a("center",[e._v(e._s(e._f("format")(t.time)))]),a("p",{staticClass:"top-msg",class:{fr:e.byme(t.fromuid),fl:!e.byme(t.fromuid)}},[e._v("\n                "+e._s(t.msg)+"\n                "),a("el-avatar",{class:{"el-avatar-fl":!e.byme(t.fromuid),"el-avatar-fr":e.byme(t.fromuid)},attrs:{src:e.byme(t.fromuid)?e.myAvatar:e.friend.avatar}})],1)],1)}),0),a("div",{staticClass:"box-chat"},[a("el-input",{ref:"chatinput",attrs:{maxlength:"1500",type:"textarea",autosize:{minRows:1,maxRows:4}},on:{focus:e.autoBottom},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}}),a("el-button",{attrs:{size:"small",type:"success",round:""},on:{click:e.submit}},[e._v("发送")])],1)])},z=[];function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,i)}return a}function G(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var H={name:"chat",data:function(){return{content:"",friend:this.$route.params,myAvatar:this.getStroage("avatar"),myName:this.getStroage("name"),myUid:this.getStroage("uid")}},computed:{shouldShowMsg:function(){return this.$store.state.shouldShowMsg}},created:function(){this.init()},methods:G({},Object(w["c"])(["changeShouldShowMsg","shouldShowMsgClear","getShouldShowMsgFromLocal"]),{init:function(){this.shouldShowMsgClear(),this.getmsgoto(),this.clearNum(),setTimeout(this.autoBottom,500)},clearNum:function(){var e=this.myUid+"-"+this.friend.uid;window.localStorage.removeItem(e)},getmsgoto:function(){this.getShouldShowMsgFromLocal(this.myUid+"=>"+this.friend.uid)},byme:function(e){return e==this.myUid},submit:function(){if(this.$refs.chatinput.focus(),this.content){var e=this.content;this.content="";var t={uid:this.myUid,msg:e,name:this.myName,avatar:this.myAvatar};this.changeShouldShowMsg({fromuid:this.myUid,avatar:this.avatar,msg:e,loading:!0});var a=this.myUid+"=>"+this.friend.uid,i=[];if(this.getStroage(a)){var r=JSON.parse(this.getStroage(a));i=[].concat(Object(o["a"])(r),[{msg:e,time:new Date,fromuid:this.myUid,loading:!0}])}else i.push({msg:e,time:new Date,fromuid:this.myUid,loading:!0});this.saveStroage(Object(s["a"])({},a,JSON.stringify(i))),h("send-private-chat",t,this.friend.uid)}},autoBottom:function(){window.scrollTo(0,document.body.offsetHeight)},goBack:function(){this.$router.push({name:"home"})}}),filters:{format:function(e){var t,a=Date.parse(e),i=6e4,r=60*i,n=24*r,s=30*n,o=(new Date).getTime(),c=o-a;if(!(c<0)){var l=c/s,u=c/(7*n),d=c/n,m=c/r,f=c/i;return t=l>=1?l<=12?parseInt(l)+"月前":parseInt(l/12)+"年前":u>=1?parseInt(u)+"周前":d>=1?parseInt(d)+" 天前":m>=1?parseInt(m)+"小时前":f>=1?parseInt(f)+"分钟前":"刚刚",t}}}},W=H,K=(a("3bb5"),Object(_["a"])(W,J,z,!1,null,null,null)),Q=K.exports,X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(220,220,220)"}},[a("div",{staticClass:"nav-top"},[a("p",{staticClass:"nav-p-t",on:{click:e.exit}},[a("el-avatar",{attrs:{shape:"circle",size:35,src:e.myavatar}}),a("span",{staticClass:"name-color"},[e._v(e._s(e.title))])],1),a("p",{staticClass:"nav-p",on:{click:e.writeArtic}},[a("i",{staticClass:"el-icon-circle-plus-outline"})])]),"friends"===e.tabName?a("div",{staticClass:"content-box"},[a("friends")],1):e._e(),"dynamic"===e.tabName?a("div",{staticClass:"content-box"},[a("articles")],1):e._e(),a("div",{staticClass:"nav-bottom"},e._l(e.item,function(t,i){return a("p",{key:t.value,staticClass:"nav-p",on:{click:function(a){return e.tabSelect(i,t.tabName)}}},[a("span",{class:{active:t.active}},[a("i",{class:t.icon}),e._v(e._s(t.value)+"\n            ")])])}),0),a("span",{staticClass:"upbox",on:{click:e.up}},[a("i",{staticClass:"el-icon-upload2 "})])])},Y=[],Z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pg-article"},[e.nodata?a("p",{staticClass:"nodata"},[e._v("还没有小伙伴发动态呢！")]):a("div",e._l(e.articles,function(t){return a("div",{key:t.aid,staticClass:"article-box"},[a("div",[a("div",{staticClass:"article-box-top"},[a("el-avatar",{attrs:{shape:"square",size:35,src:t.avatar}}),a("p",[e._v(e._s(t.name))])],1),a("div",{staticClass:"article-box-mid"},[a("pre",[e._v(e._s(t.article))]),t.imgs?a("div",{staticClass:"img-box"},e._l(t.imgs,function(i,r){return a("div",{key:r},[a("img",{class:e.dymclass(t.imgs.length),attrs:{src:i,alt:""}})])}),0):e._e()]),a("div",{staticClass:"article-box-bottom"},[a("span",[e._v(e._s(e._f("format")(t.time)))]),t.onlyMe?a("span",{staticClass:"el-icon-s-goods"},[e._v("仅自己可见")]):e._e(),t.uid==e.uid?a("span",{staticClass:"del",on:{click:function(a){return e.delArticle(t.aid)}}},[e._v("删除")]):e._e()])])])}),0)])},ee=[];a("55dd");function te(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,i)}return a}function ae(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?te(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):te(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var ie={data:function(){return{articles:[],nodata:!1,uid:window.localStorage.uid}},created:function(){this.init()},methods:ae({},Object(w["c"])(["changeLoading"]),{dymclass:function(e){switch(e){case 1:return"imgone";default:return"img"}},init:function(){this.changeLoading(!0),this.getArticle()},getArticle:function(){var e=this;g("/getArticle").then(function(t){var a,i,r,n=t.data;e.changeLoading(),n.forEach(function(e){return e.imgs&&(e.imgs=JSON.parse(e.imgs)),e}),a=n.filter(function(e){return 1==e.ispublic}),i=n.filter(function(t){return t.uid==e.uid&&!t.ispublic}),i.forEach(function(e){return e.onlyMe=!0}),r=i.concat(a),r.sort(function(e,t){return Date.parse(t.time)-Date.parse(e.time)}),r.length?e.articles=r:e.nodata=!0})},goBack:function(){this.$router.push({name:"home"})},delArticle:function(e){var t=this;this.$alert("是否删除该动态","提示",{confirmButtonText:"确定",callback:function(a){"confirm"==a&&g("/delArticle",{aid:e}).then(function(e){e?t.$message({message:"删除成功",type:"success"}):t.$message.error("失败请重试！"),t.init()})}})}}),filters:{format:function(e){var t,a=Date.parse(e),i=6e4,r=60*i,n=24*r,s=30*n,o=(new Date).getTime(),c=o-a;if(!(c<0)){var l=c/s,u=c/(7*n),d=c/n,m=c/r,f=c/i;return t=l>=1?l<=12?parseInt(l)+"月前":parseInt(l/12)+"年前":u>=1?parseInt(u)+"周前":d>=1?parseInt(d)+" 天前":m>=1?parseInt(m)+"小时前":f>=1?parseInt(f)+"分钟前":"刚刚",t}}}},re=ie,ne=(a("2779"),Object(_["a"])(re,Z,ee,!1,null,null,null)),se=ne.exports,oe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._l(e.friends,function(t){return a("div",{key:t.uid,staticClass:"flex",on:{click:function(a){return e.getChat(t)}}},[a("el-badge",{staticClass:"item",attrs:{value:e.getNum(t.uid),max:10}},[a("el-avatar",{attrs:{shape:"square",size:50,src:t.avatar}})],1),a("p",{staticClass:"flex1"},[e._v("\n            "+e._s(t.name))]),e.onlineFn(t.uid)?a("p",{staticClass:"font-grenn"},[e._v("在线")]):a("p",{staticClass:"font-red"},[e._v("离线")])],1)}),0)},ce=[];a("6762"),a("2fdb");function le(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,i)}return a}function ue(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?le(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):le(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var de={data:function(){return{onlineFriends:[],uid:window.localStorage.uid,myavatar:window.localStorage.avatar,loading:!0}},computed:{friends:function(){return this.$store.state.friends}},created:function(){this.init()},methods:ue({init:function(){this.changeLoading(!0),this.getFriends({uid:this.uid}),this.getWhoOnline()}},Object(w["b"])(["getFriends"]),{},Object(w["c"])(["changeLoading"]),{getNum:function(e){var t=this.uid+"-"+e,a=this.getStroage(t);return a},getWhoOnline:function(){var e=this;g("/whoOnline",{uid:this.uid}).then(function(t){var a=t.data;e.changeLoading(),e.onlineFriends=a})},getChat:function(e){this.$router.push({name:"chat",params:e})},onlineFn:function(e){return this.onlineFriends.includes(e)}})},me=de,fe=(a("b2c2"),Object(_["a"])(me,oe,ce,!1,null,null,null)),pe=fe.exports,ge={name:"home",data:function(){return{item:[{value:"我的好友",active:!0,icon:"el-icon-user-solid",tabName:"friends"},{value:"好友动态",active:!1,icon:"el-icon-s-help",tabName:"dynamic"}],title:"",uid:"",myavatar:"",tabName:"friends"}},computed:{loading:function(){return this.$store.state.loading}},created:function(){this.init()},methods:{init:function(){this.title=window.localStorage.name,this.uid=window.localStorage.uid,this.myavatar=window.localStorage.avatar,h("online",this.uid)},exit:function(){var e=this;this.$alert("是否退出登陆","提示",{confirmButtonText:"确定",callback:function(t){"confirm"==t&&(["avatar","name","uid"].forEach(function(e){window.localStorage.removeItem(e)}),h("offline",e.uid),e.$router.push({name:"login"}))}})},writeArtic:function(){this.$router.push({name:"write"})},tabSelect:function(e,t){this.item.forEach(function(t,a){t.active=a===e}),this.tabName=t},up:function(){window.scrollTo({top:0,behavior:"smooth"})}},components:{Articles:se,Friends:pe}},he=ge,ve=(a("de16"),Object(_["a"])(he,X,Y,!1,null,null,null)),be=ve.exports,we=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pg-write"},[a("div",{staticClass:"fix-top"},[a("i",{staticClass:"el-icon-arrow-left",on:{click:e.goBack}},[e._v("发表文字")])]),a("div",{staticClass:"text-box"},[a("el-input",{ref:"textarea",attrs:{maxlength:"300","show-word-limit":"",type:"textarea",placeholder:"这一刻的想法...",autosize:{minRows:4,maxRows:12}},model:{value:e.params.article,callback:function(t){e.$set(e.params,"article",t)},expression:"params.article"}}),a("div",[a("el-upload",{attrs:{action:e.serviceImg,"list-type":"picture-card",limit:4,"before-remove":e.delImg,"before-upload":e.beforeAvatarUpload,"on-preview":e.handlePictureCardPreview,"on-error":e.handleRemoveError,"on-progress":e.uping,"on-success":e.successUp}},[a("i",{staticClass:"el-icon-plus"})]),a("el-dialog",{attrs:{visible:e.upimgs.dialogVisible},on:{"update:visible":function(t){return e.$set(e.upimgs,"dialogVisible",t)}}},[a("img",{attrs:{width:"100%",src:e.upimgs.dialogImageUrl,alt:""}})])],1)],1),a("div",{staticClass:"bottom-box"},[a("el-radio",{attrs:{label:0},model:{value:e.params.ispublic,callback:function(t){e.$set(e.params,"ispublic",t)},expression:"params.ispublic"}},[e._v("仅自己可见")]),a("el-radio",{attrs:{label:1},model:{value:e.params.ispublic,callback:function(t){e.$set(e.params,"ispublic",t)},expression:"params.ispublic"}},[e._v("公开")]),a("el-button",{attrs:{size:"medium",type:"primary",disabled:e.disable,loading:e.loading},on:{click:e.submit}},[e._v("发送")])],1)])},ye=[];a("a481");function Oe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,i)}return a}function Se(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Oe(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Oe(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var je={name:"write",data:function(){var e=Object({VUE_APP_API:"http://localhost:3000",VUE_APP_SOCKET:"ws://localhost:3000",NODE_ENV:"production",BASE_URL:""}).VUE_APP_ADDIMG;return{params:{article:"",ispublic:1,user:{uid:window.localStorage.uid,name:window.localStorage.name,avatar:window.localStorage.avatar}},loading:!1,disable:!1,upimgs:{dialogImageUrl:"",dialogVisible:!1,imgs:[]},serviceImg:e}},mounted:function(){this.$refs.textarea.focus()},methods:{isEmpty:function(e){var t=!1;for(var a in e)if(!e[a]){t=!0;break}return t},tipToast:function(e,t,a){this.$message({message:t,type:e,duration:700,onClose:function(){a()}})},submit:function(){var e=this,t=this.isEmpty(this.params.user);if(t)this.tipToast("error","当前账号异常，请重新登陆",function(){e.$router.push({name:"login"})});else{if(!this.params.article.trim())return void this.$message.warning("内容为空哦～");this.loading=!0,this.disable=!0,this.params.article=this.params.article.replace(/(^\s*)/g,"").replace(/'/g,'"'),this.upimgs.imgs.length&&(this.upimgs.imgs=this.upimgs.imgs.map(function(e){return e.url}),this.params.imgs=JSON.stringify(this.upimgs.imgs)),g("/sendArticle",Se({},this.params)).then(function(t){var a=t.data;a?e.tipToast("success","发表成功快去和好友分享吧～",function(){e.$router.push({name:"home"})}):(e.loading=!1,e.disable=!1,e.$message.error("发送失败，请重试～"))})}},goBack:function(){this.$router.push({name:"home"})},successUp:function(e,t){this.disable=!1,this.upimgs.imgs.push({url:e.url,imgid:t.uid}),this.saveStroage({imgs:JSON.stringify(this.upimgs.imgs)})},handleRemoveError:function(){this.disable=!1,this.$message.error("图片上传失败，请刷新重试～")},delImg:function(e){this.upimgs.imgs=this.upimgs.imgs.filter(function(t){return t.imgid!=e.uid})},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,a=e.size/1024/1024<5;return t||this.$message.error("只支持jpeg|png|jpg格式图片"),a||this.$message.error("图片大小不能超过 5MB!"),t&&a},handlePictureCardPreview:function(e){this.upimgs.dialogImageUrl=e.url,this.upimgs.dialogVisible=!0},uping:function(){this.disable=!0}}},_e=je,xe=(a("f0cd"),Object(_["a"])(_e,we,ye,!1,null,null,null)),$e=xe.exports;i["default"].use(C["a"]);var Ce=new C["a"]({mode:"hash",routes:[{path:"/",name:"index",redirect:{name:"login"}},{path:"/login",name:"login",component:D},{path:"/register",name:"register",component:R},{path:"/home",name:"home",component:be},{path:"/chat",name:"chat",component:Q},{path:"/write",name:"write",component:$e}]});Ce.beforeEach(function(e,t,a){window.localStorage.uid?"chat"==e.name?e.params.uid?a():a({name:"home"}):"home"==e.name||"write"===e.name?a():a({name:"home"}):"login"==e.name||"register"==e.name?a():a({name:"login"})});var Pe=Ce,ke=(a("96cf"),a("3b8d"));i["default"].use(w["a"]);var Ee=[],Ie=[],Ae=new w["a"].Store({state:{friends:Ie,shouldShowMsg:Ee,loading:!0},mutations:{changeFriends:function(e,t){e.friends=Object.assign([],t)},changeShouldShowMsg:function(e,t){Array.isArray(t)?e.shouldShowMsg=Object.assign([],t):e.shouldShowMsg.push(t)},changeLoading:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.loading=t},shouldShowMsgClear:function(e){e.shouldShowMsg=[]},getShouldShowMsgFromLocal:function(e,t){var a=[];localStorage[t]&&(a=JSON.parse(localStorage[t])),e.shouldShowMsg=Object.assign([],a)}},actions:{getFriends:function(){var e=Object(ke["a"])(regeneratorRuntime.mark(function e(t,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:g("/getuser",{uid:a.uid}).then(function(e){t.commit("changeFriends",e.data)});case 1:case"end":return e.stop()}},e)}));function t(t,a){return e.apply(this,arguments)}return t}()}}),De=(a("be4f"),a("450d"),a("896a")),Me=a.n(De),Ve=(a("9e1f"),a("6ed5")),Te=a.n(Ve),Ne=(a("0fb7"),a("f529")),Ue=a.n(Ne),Fe=(a("960d"),a("defb")),Le=a.n(Fe),Be=(a("bd49"),a("18ff")),Re=a.n(Be),Je=(a("cb70"),a("b370")),ze=a.n(Je),qe=(a("a7cc"),a("df33")),Ge=a.n(qe),He=(a("e960"),a("b35b")),We=a.n(He),Ke=(a("e2f3"),a("06f9")),Qe=a.n(Ke),Xe=(a("f225"),a("89a9")),Ye=a.n(Xe),Ze=(a("b5d8"),a("f494")),et=a.n(Ze),tt=(a("fe07"),a("6ac5")),at=a.n(tt),it=(a("eca7"),a("3787")),rt=a.n(it),nt=(a("425f"),a("4105")),st=a.n(nt),ot=(a("186a"),a("301f")),ct=a.n(ot),lt=(a("96dc"),a("9cea")),ut=a.n(lt),dt=(a("920a"),a("4f0c")),mt=a.n(dt),ft=(a("10cb"),a("f3ad")),pt=a.n(ft),gt=(a("1951"),a("eedf")),ht=a.n(gt);i["default"].use(ht.a),i["default"].use(pt.a),i["default"].use(mt.a),i["default"].use(ut.a),i["default"].use(ct.a),i["default"].use(st.a),i["default"].use(rt.a),i["default"].use(at.a),i["default"].use(et.a),i["default"].use(Ye.a),i["default"].use(Qe.a),i["default"].use(We.a),i["default"].use(Ge.a),i["default"].use(ze.a),i["default"].use(Re.a),i["default"].use(Le.a),i["default"].prototype.$message=Ue.a,i["default"].prototype.$alert=Te.a.alert,i["default"].prototype.$loading=Me.a.service,i["default"].use(Me.a.directive),i["default"].config.productionTip=!1,i["default"].prototype.service=N,i["default"].prototype.saveStroage=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var t in e)window.localStorage[t]=e[t]},i["default"].prototype.getStroage=function(e){return window.localStorage[e]},new i["default"]({router:Pe,store:Ae,render:function(e){return e($)}}).$mount("#app")},ddb4:function(e,t,a){"use strict";var i=a("41a6"),r=a.n(i);r.a},de16:function(e,t,a){"use strict";var i=a("f3e7"),r=a.n(i);r.a},e7fc:function(e,t,a){},f0cd:function(e,t,a){"use strict";var i=a("5cb8"),r=a.n(i);r.a},f3e7:function(e,t,a){}});
//# sourceMappingURL=app.f71df4e1.js.map