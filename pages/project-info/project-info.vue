<template>
  <div class="wrap">
    <towxml :nodes="content" />
  </div>
</template>

<script>
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
    let str = `# 项目介绍

> 本项目的前身是《湾大杂货铺》，《湾大杂货铺》重新命名为《湾大闲置品小铺》。

## 主要功能

主要功能在之前的基础上，完成了：

1. 全新的设计及重构。
2. 增加预定成功的通知。
    > 即有人确认预定你的商品，则变为锁定状态，其他人不会在看到此商品，然后本小程序会给你发送预定成功的通知，你也可以主动联系购买人。
3. 增加审核机制。
    >即商品上架不会马上出现在市场中，会有专门的审核人员（也就是我，如果太久没审核，请联系我。）进行审核通过之后才会出现在市场中。

## 最后

相当于自己重新把这个项目写了一遍，写了很久，还有很多预想的没有实现。写累了，大家能用就用。
`

    this.content = this.towxml(
      str, 'markdown',
      {
        base: "../../static"
      })
  },

  methods: {},
};
</script>

<style>
</style>
