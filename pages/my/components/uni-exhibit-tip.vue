<template>
  <div class="wrap">
    <towxml :nodes="content" />
  </div>
</template>

<script>
import towxml from '../../../static/towxml/towxml'
export default {
  components: {
    towxml
  },
  data() {
    return {
      content: '',
    };
  },
  onLoad(options) {
    let str = "dasgadsg"
    console.log(',??????????????????');

    this.content = this.towxml(str, 'markdown', {})
  },
  mounted() {
    let str = `# 温馨提示

> 《湾大闲置品小铺》目前是个人开发的小项目，前身是《湾大杂货铺》。
>  
为了长期更好的维护，请了解以下公约：

## 发布商品

### 要求

1. 图片不多于3张，如果是实拍，请尽量保持背景整洁，单独拍摄。
2. 同一样闲置品不可重复发布。
3. 闲置品的介绍，不可涉及政治、色情、赌博、毒品等敏感字眼。
4. 闲置品的图片，不可含有色情内容。

以上希望大家自觉遵守，本小程序内设内容安全审核机制，如违反则是审核不通过的。

### 备注

提交审核后，请同意如下的发送通知请求：

<img src="/tip.jpg" style="width:150px;height:150px;" />

同意之后方可在微信中接收到我们给你发送的审核结果和预定成功的通知。


`

    this.content = this.towxml(str, 'markdown', { base: "../../../static" })
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding-bottom: 10px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 10px;
}
</style>