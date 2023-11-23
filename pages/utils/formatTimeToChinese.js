function formatTimeToChinese(timestamp) {
  const date = new Date(timestamp);
  var year = date.getFullYear();
  var month = formatNumber(date.getMonth() + 1);
  var day = formatNumber(date.getDate());
  const hour = formatNumber(date.getHours());
  const minute = formatNumber(date.getMinutes());

  return `${year}年${month}月${day}日 ${hour}:${minute}`;
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

module.exports = {
  formatTimeToChinese: formatTimeToChinese,
};
