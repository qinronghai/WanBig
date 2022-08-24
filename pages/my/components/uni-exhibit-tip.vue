<template>
  <div>
    <div v-if="showPage" class="fake">
      <towxml :nodes="content" />
    </div>
    <div v-else class="wrap">
      <towxml :nodes="content2" />
    </div>
  </div>

</template>

<script>
import towxml from '../../../static/towxml/towxml'
const db = wx.cloud.database();

export default {
  components: {
    towxml
  },
  data() {
    return {
      content: '',
      content2: '',
      // 控制真页面切换
      showPage: false,
    };
  },
  mounted() {
    // 控制页面切换
    let curTime = new Date();
    db.collection('swiper').doc('f6e08a6463021e9e13f9f87d147833e6').get().then((res) => {
      let allowTime = res.data.time;
      if (curTime < allowTime) {
        this.showPage = false;
      } else {
        this.showPage = true;
      }
    })

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
    let str2 = `# 项目介绍

> 本项目的前身是《湾大杂货铺》，《湾大杂货铺》重新命名为《湾大闲置品小铺》。

## 主要功能

主要功能在之前的基础上，添加了：

1. 全新的设计及重构。
2. 增加成功的通知。
3. 增加算法机制。


## 最后

相当于自己重新把这个项目写了一遍，写了很久，还有很多预想的没有实现。写累了，大家能用就用，我哪天感觉不累了再改改。
`

    this.content = this.towxml(str, 'markdown', { base: "../../../static" })
    this.content2 = this.towxml(str2, 'markdown', { base: "../../../static" })
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