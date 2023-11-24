<template>
  <div class="page">
    <h2
      class="title"
      id="-">
      关于此程序
    </h2>
    <p class="paragraph">
      回溯到2020年，我作为北部湾大学的新生，于大一时期偶然加入了一个二手群。在那里，我用5块钱淘到了一个工具箱，觉得非常划算。随后，我在这个群里淘到了很多东西，包括但不限于教材、显示器、路由器等。从那时起，我感觉到同学们对这方面的需求也蛮大的，并且我也意识到二手群的一些弊端：
    </p>
    <ul class="list">
      <li>1. 群组人数限制</li>
      <li>2. 发布的东西很快被其他人的消息覆盖</li>
      <li>3. 很难找到自己想要的东西</li>
      <li>4. 想出手一件物品，需要添加好几个群组，然后轮着发布</li>
    </ul>
    <p class="paragraph">......</p>
    <p class="paragraph">
      后来，我萌生了开发一个二手交易平台小程序的想法，敢想敢干，在大一暑假边学边做，然后在将近10月份的时候，完成开发并上线了第一版，名为“湾大杂货铺”，下面是当时宣传的海报：
    </p>
    <p class="paragraph">
      <img
        class="image"
        src="cloud://qrh-database01-5gz9zkuedd28e7fc.7172-qrh-database01-5gz9zkuedd28e7fc-1313188449/nodeteleimg/湾大杂货铺传单图.png" />
    </p>
    <p class="paragraph">
      这个之前的版本的上线，得到了很多同学的支持，并曾经一度超过3000人注册。同时，也得到了很多朋友的众筹，我都一一记录在案，非常感谢当初支持的朋友们。
    </p>
    <p class="paragraph">
      后来，由于第一版代码匆忙，我当时的技术水平有限，代码难以维护，整个系统设计也不够完善，缺乏消息通知和交易模块等功能。因此，我决定重新开发第二版（目前此版本：湾大闲置品小铺）。
    </p>
    <p class="paragraph">
      第二版的开始，从原型设计到前端页面再到整个小程序的完善，耗费了很长的时间，加之学业繁忙以及其他种种原因，没有时间和精力继续维护第一版的小程序，最终导致其停运。
    </p>
    <p class="paragraph">虽然当时第二版的开发已接近90%，准备可以上线之际，我的热情也依然消耗殆尽，第二版的开发工作就此停摆。</p>
    <p class="paragraph">时间来到大三暑假结束之后，我重新启航，重拾代码，重新构建了第二版，并在原有基础上增添了很多功能：</p>
    <ul class="list">
      <li>1. 消息通知模块</li>
      <li>2. 交易模块</li>
      <li>3. 书籍发布、管理模块</li>
      <li>4. 订单模块</li>
      <li>5. 交易机制</li>
      <li>6. 信誉机制</li>
    </ul>
    <p class="paragraph">
      这些东西，花了我很长很长的时间，相当于重新又写了一遍。终于，到了写下这段文字的时候啦，这意味着此程序已初步测试成功，准备可以重新上线了！！
    </p>
    <p class="paragraph">这一次，我将持续维护这个小程序，不再轻易停服。遇到问题，我们将一起解决；遇到困难，我们也会共同克服。同时，希望大家能够继续支持。</p>
    <p class="paragraph">感谢您的陪伴和支持！</p>
  </div>
</template>

<style scoped>
.page {
  padding: 0 30rpx 50rpx 30rpx;
}
.title {
  margin-top: 40rpx;

  /* 标题样式 */
  font-size: 48rpx;
  font-weight: bold;
}

.paragraph {
  /* 段落样式 */
  margin-top: 20rpx;
  line-height: 1.5;
}

.list {
  /* 列表样式 */
  margin-top: 20rpx;
}

.list li {
  /* 列表项样式 */
  margin-left: 40rpx;
}

.image {
  width: 100%;
  height: 700rpx;

  /* 图片样式 */
  margin-top: 20rpx;
}
</style>
