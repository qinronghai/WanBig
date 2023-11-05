function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncatedStr = str.slice(0, maxLength - 3) + "...";
    return truncatedStr;
  }
}

export default truncateString;
