export default {
  GetRecommendList: '/1.0.0/Creation/GetRecommendList', // 在线线上图案 请求传0表示授权 1表示素材区
  loginByPhone: '/1.0.0/Account/LoginByPhone', // 手机密码登陆
  loginByPhoneCode: '/1.0.0/Account/LoginByPhoneCode', // 手机验证码登录
  loginByEmail: '/1.0.0/Account/LoginByEmail', // 邮箱登录
  loginByScan: '/1.0.0/Account/GetWxUserinfo', // 微信扫码
  getToken: '/1.0.0/Account/RefreshToken', // 刷新token
  register: '/1.0.0/Account/Register', // 注册
  GetUserInfo: '/1.0.0/User/GetUserInfo', // 获取用户信息
};
