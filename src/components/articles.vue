<template>
    <div class="pg-article">
        <p v-if="nodata" class="nodata">还没有小伙伴发动态呢！</p>
        <div v-else>
            <div
                class="article-box" 
                v-for="row in articles" 
                :key="row.aid">
                <div>
                    <div class="article-box-top">
                        <el-avatar shape="square" :size="35" :src="row.avatar"></el-avatar>
                        <p>{{row.name}}</p>
                    </div>
                    <div class="article-box-mid">
                        <pre>{{row.article}}</pre>
                        <div v-if="row.imgs" class="img-box">
                            <div v-for="(src, index) in row.imgs" :key="index">
                                <img :src="src" alt=""  :class="dymclass(row.imgs.length)">
                            </div>
                        </div>
                    </div>
                    <div class="article-box-bottom">
                        <span>{{row.time | format}}</span>
                        <span v-if="row.onlyMe" class="el-icon-s-goods">仅自己可见</span>
                        <span v-if="row.uid == uid" class="del" @click="delArticle(row.aid)">删除</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {  post } from 'api';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            articles: [],
            nodata: false,
            uid: window.localStorage.uid,
        }
    },
    created() {
        this.init()
    },
    methods: {
        ...mapMutations([
            'changeLoading'
        ]),
        dymclass(len) {
            switch (len) {
                case 1:
                    return 'imgone';
                default:
                    return 'img';
            }
        },
        init() {
            this.changeLoading(true)
            this.getArticle();
        },
        getArticle() {
            post('/getArticle').then(({data}) => {
                this.changeLoading()
                let d1, d2, d3;
                data.forEach(row => {
                    if (row.imgs) {
                        row.imgs = JSON.parse(row.imgs);
                    }
                    return row;
                })
                d1 = data.filter(row => row.ispublic == 1); // 获取所有公开的
                d2 = data.filter(row => row.uid == this.uid && !row.ispublic); // 获取我自己的私有的
                d2.forEach(el => el.onlyMe = true); // 为我的data打备注
                d3 = d2.concat(d1);
                d3.sort((a, b) => {
                    return Date.parse(b.time) - Date.parse(a.time)
                }) // TODO：再次排序
                if (d3.length) {
                    this.articles = d3;
                } else {
                    this.nodata = true;
                }
            });
        },
        goBack() {
            this.$router.push({
                name: 'home'
            })
        },
        delArticle(aid) {
            this.$alert('是否删除该动态', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action == 'confirm') {
                        post('/delArticle', { aid }).then(res => {
                            if (res) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message.error('失败请重试！');
                            }
                            this.init()
                        })
                    }
                }
            });
        }
    },
    filters: {
        format(date) {
            let dateTimeStamp = Date.parse(date);
            let result;
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let halfamonth = day * 15;
            let month = day * 30;
            let now = new Date().getTime();
            let diffValue = now - dateTimeStamp;
            if (diffValue < 0) return;
            let monthC = diffValue/month;
            let weekC = diffValue/(7*day);
            let dayC = diffValue/day;
            let hourC = diffValue/hour;
            let minC = diffValue/minute;
            if (monthC >= 1) {
                if (monthC <= 12) {
                    result = parseInt(monthC) + '月前';
                }
                else{
                    result = parseInt(monthC/12) + '年前';
                }
            }
            else if (weekC >= 1) {
                result = parseInt(weekC) + '周前';
            }
            else if (dayC >= 1) {
                result = parseInt(dayC) +' 天前';
            }
            else if (hourC>=1){
                result = parseInt(hourC) + '小时前';
            }
            else if (minC>=1){
                result = parseInt(minC) + '分钟前';
            } else {
                result = '刚刚';
            }
            return result;
        }
    }
};
</script>
<style lang="less">
.pg-article {
    font-weight: 100;
    .nodata {
        text-align: center;
    }
    .article-box {
        border-bottom: 1px solid #EBEEF5;
        margin-top: 15px;
        &:nth-child(1) {
            margin-top: 0;
        }
        .article-box-top {
            display: flex;
            p {
                margin: 0 0 0 5px;
                line-height: 35px;
            }
        }
        .article-box-mid {
            // margin-left: 40px;
            overflow: hidden;
            pre {
                font-weight: 200;
                font-size: 15px;
                max-height: 200px;
                overflow-y: auto;
                white-space: pre-wrap;
                word-break: break-all;
            }
            .img-box {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-top: 5px;
                .imgone {
                    width: 100%;
                }
                .img {
                    width: 145px;
                    height: 145px;
                }
            }
        }
        .article-box-bottom {
            margin: 5px 0 5px 0;
            span {
                color: #606266;
                font-size: 12px;
            }
            .el-icon-s-goods {
                margin-left: 10px;
            }
            .del {
                float: right;
                margin-top: 5px;
            }
        }
    }
}
.el-message-box {
    width: 80%!important;
}
</style>
