/**
 * 检查用户注册状态
 * @returns {boolean} 用户是否已注册
 */

export default function checkRegisterStatus() {
  try {
    const isRegister = uni.getStorageSync("isRegister");
    const nickName = uni.getStorageSync("userInfo")?.info?.nickName;
    const isRegistered = isRegister && nickName;
    return isRegistered;
  } catch (error) {
    console.error(error);
    return false;
  }
}
