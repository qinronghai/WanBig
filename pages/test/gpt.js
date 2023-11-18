function createFuzzyRegex(query) {
  // 将输入的查询字符串进行转义，防止其中包含正则表达式元字符
  const escapeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // 构建模糊查询的正则表达式
  const fuzzyRegex = new RegExp(escapeQuery.split("").join(".*"));

  return fuzzyRegex;
}

// 示例使用
const queryString = "apple";
const fuzzyRegex = createFuzzyRegex(queryString);
console.log("f :>> ", fuzzyRegex);
// 测试字符串
const testString = "I love ples";

// 测试是否匹配
const isMatch = fuzzyRegex.test(testString);

console.log(isMatch); // 输出 true

function mergeAlternately(arr1, arr2) {
  return arr1.reduce((acc, val, i) => {
    acc.push(val);
    if (arr2[i] !== undefined) {
      acc.push(arr2[i]);
    }
    return acc;
  }, []);
}

console.log(mergeAlternately([1, 2, 3], ["a", "b", "c", "d", "e"]));
console.log(mergeAlternately([1, 2, 3, 4, 5], ["a", "b", "c"]));
console.log(mergeAlternately([1, 2, 3], ["a", "b", "c"]));
