function formatTimeToChinese(timestamp) {
  const date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}年${month}月${day}日 ${hour}:${minute}`;
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

module.exports = {
  formatTimeToChinese: formatTimeToChinese,
};
