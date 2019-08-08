<template>
    <div class="pg-article">
        <div v-if="nodata">还没有小伙伴发动态呢！</div>
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
                if (!data.length) {
                    console.log(data, 'data')
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
    }
};
</script>
<style lang="less">
.pg-article {
    text-align: center;
    font-weight: 100;
    .nodata-bgc {
        
    }
}
</style>
