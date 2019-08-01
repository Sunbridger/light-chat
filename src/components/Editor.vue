<template lang="html">
  <div class="editor">
    <div ref="editor" class="text" />
    <div ref="toolbar" class="toolbar" />
  </div>
</template>

<script>
import E from 'wangeditor';
import { get, post } from '../api';
import emotionsArr from '../assets/emotions.js';
export default {
  name: 'Editorbar',
  data() {
    return {
      editor: null,
      info_: null,
      emotionsContent: [],
      emotionsContentWeibo: [],
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
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
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
        this.emotionsContentWeibo = emotionsArr.map(el => {
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
          },
          {
            title: '微博',
            type: 'image',
            content: this.emotionsContentWeibo
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
      border: 1px solid blue;
      overflow-y: unset;
      img{
          width: 20px;
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

</style>
