<template>
    <div class="pg-article">
        <p v-if="nodata" class="nodata">还没有小伙伴发动态呢！</p>
        <div v-else>
            <div
                class="article-box" 
                v-for="row in articles" 
                :key="row.aid">
                <div class="article-box-top">
                    <el-avatar shape="square" :size="35" :src="row.avatar"></el-avatar>
                    <p>{{row.name}}</p>
                </div>
                <div class="article-box-mid">
                    <pre>{{row.article}}</pre>
                </div>
                <div class="article-box-bottom">
                    <span>{{row.time | format}}</span>
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
            nodata: false
        }
    },
    created() {
        this.changeLoading(true)
        this.getArticle();
    },
    methods: {
        ...mapMutations([
            'changeLoading'
        ]),
        getArticle() {
            post('/getArticle').then(({data}) => {
                this.changeLoading()
                if (data.length) {
                    this.articles = data;
                } else {
                    this.nodata = true;
                }
            })
        },
        goBack() {
            this.$router.push({
                name: 'home'
            })
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
                    result='' + parseInt(monthC) + '月前';
                }
                else{
                    result='' + parseInt(monthC/12) + '年前';
                }
            }
            else if (weekC >= 1) {
                result='' + parseInt(weekC) + '周前';
            }
            else if (dayC >= 1) {
                result=''+ parseInt(dayC) +'天前';
            }
            else if (hourC>=1){
                result=''+ parseInt(hourC) +'小时前';
            }
            else if (minC>=1){
                result=''+ parseInt(minC) +'分钟前';
            } else {
                result='刚刚';
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
            margin-left: 40px;
            pre {
                font-weight: 200;
                font-size: 15px;
                margin: 0;
                overflow: hidden;
                white-space: pre-wrap;
                word-break: break-all;
            }
        }
        .article-box-bottom {
            margin: 5px 0 5px 40px;
            span {
                color: #606266;
                font-size: 12px;
            }
        }
    }
}
</style>
