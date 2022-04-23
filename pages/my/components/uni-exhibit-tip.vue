<template>
  <div class="wrap">
    <rich-text :nodes="strings"> </rich-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
      strings: `<h2 id='-'>温馨提示</h2>
    <blockquote>
      <p>
        本项目是湾大学子自己开发地，本着更好地服务于大家，以及开发者更方便维护地原则，在此列出如下公约。
      </p>
    </blockquote>
    <h4 id="-">发布商品</h4>
    <ol>
      <li>图片不多于3张，如果是实拍，请尽量保持背景整洁，单独拍摄。</li>
    </ol>`,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 10px;
}
</style>