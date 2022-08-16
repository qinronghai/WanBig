<template>
  <div class="wrap">
    <towxml :nodes="content" />
  </div>
</template>

<script>
import towxml from '../../static/towxml/towxml'
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
    let str = `# 温馨提示

> 《湾大闲置品小铺》目前是个人开发的小项目，前身是《湾大杂货铺》。

<img src="/tip.jpg" style="width:150px;height:150px;" />

同意之后方可在微信中接收到我们给你发送的审核结果和预定成功的通知。
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
