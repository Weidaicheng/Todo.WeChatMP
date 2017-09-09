var host = "89286074.qcloud.la";
var loginHost = host + "/Login/api";
var todoHost = host + "/Todo/api";

var config = {
  loginService: {
    loginUrl: `https://${loginHost}/WeChatLogin/Login`
  }
};

module.exports = config;