function formatTimeToChinese(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  return year + "年" + month + "月" + day + "日";
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

module.exports = {
  formatTimeToChinese: formatTimeToChinese,
};
