<template lang="html">
  <div class="editor">
    <div ref="editor" class="text" />
    <div ref="toolbar" class="toolbar" />
  </div>
</template>

<script>
import E from 'wangeditor';
import { get, post } from 'api';


export default {
  name: 'Editorbar',
  data() {
    return {
      editor: null,
      info_: null,
      emotionsContent: [],
    };
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  watch: {
    value(val) {
      // 使用 v-model 时，设置初始值
      this.editor.txt.html(val);
    },
  },
  mounted() {
    get('/emotions').then(res => {
        this.emotionsContent = res.data.map(el => {
            let alt = el.value;
            let src = el.icon;
            return {
                alt,
                src
            }
        });
        this.seteditor();
    });
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);

      this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
      this.editor.customConfig.uploadImgServer = 'http://172.18.12.87:3000/addimg';// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {
        methods: 'post',
      };// 自定义 header
      this.editor.customConfig.uploadFileName = 'imgfile'; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      
      // 配置表情
      this.editor.customConfig.emotions = [
          {
            title: '默认',
            type: 'image',
            content: this.emotionsContent
          }
      ];
      // 配置菜单
      this.editor.customConfig.menus = ['emoticon'];

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
        },
      };
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit('change', this.info_); // 将内容同步到父组件中
      };

      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>

<style lang="less">
.editor {
  width: 80%;
  margin: 0 auto;
  .w-e-text {
    max-height: 150px;
    overflow-y: scroll;
    color: #606266;
    background-color: #FFF;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
      img{
          width: 20px;
          vertical-align: -3px;
          margin-left: 3px;
      }
  };
  .w-e-panel-container {
      width: 100%!important;
      margin-left: 0!important;
      top: unset!important;
      bottom: -256px!important;
      left: unset!important;
  }
}
        ::-webkit-scrollbar
        {
            width: 2px;
            height: 2px;
            background-color: white;/*//背景色*/
        }

        /*定义滚动条轨道 内阴影+圆角*//* 滚动槽 */
        ::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 1px white;
            border-radius: 1px;
            background-color: white;/*滚动条槽的颜色*/
        }

        /*定义滑块 内阴影+圆角*//* 滚动条滑块 */
        ::-webkit-scrollbar-thumb
        {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 1px white;
            background-color: white;
        }
</style>
