<template>
  <div class="header-bar">

    <div class="right-release__btn">上架审核</div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  justify-content: space-between;

  .left-options {
    display: flex;
    font-size: 12px;

    .option__goods {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 30px;
      background-color: #ffe21b;
      border-radius: 6px 0 0 6px;
    }

    .option__job {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 30px;
      background-color: #fff;
      border-left: 3px solid #333;
      border-radius: 0 6px 6px 0;
    }
  }

  .right-release {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    background-color: #fff;
    border-radius: 5px;

    .right-release__btn {
    }
  }
}
</style>
