<template>
    <div class="pg-form">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
};
</script>

<style lang="less">
</style>
