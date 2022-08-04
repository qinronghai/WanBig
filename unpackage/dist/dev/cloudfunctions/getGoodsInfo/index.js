const cloud = require("wx-server-sdk");
// cloud.init();
cloud.init({
  env: "wb-dev-test-8g4qxuuj00591c1e",
});
const db = cloud.database();
const MAX_LIMIT = 100;
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection("goods").count();
  const total = countResult.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100); // Math.ceil(num) 向上取整
  // 承载所有读操作的 promise 的数组
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) {
    // skip(num) 指定查询返回结果时从指定序列后的结果开始返回
    const promise = db
      .collection("goods").where({
        buy:false,
        audited: false
      })
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    tasks.push(promise);
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    };
  });
};
