var config = require('./config');

//app.js
App({
  //登录获取UserId
  getUserId: function () {
    return new Promise(function(resolve, reject){
      wx.getStorage({
        key: 'UserId',
        success: function (resSaved) {
          //读取UserId成功
          console.log("读取UserId成功");
          //验证UserId是否过期
          console.log("验证UserId是否过期");
          wx.request({
            url: config.loginService.loginUrl,
            method: "post",
            data: {
              UserId: resSaved.data
            },
            success: function (resSucess) {
              //服务器请求成功
              console.log("服务器请求成功");
              if (resSucess.data.ErrCode == 0) {
                //UserId未过期，继续执行操作
                console.log("UserId未过期，继续执行操作");
                resolve(resSaved.data);
              }
              else {
                //UserId过期，重新登录，重新获取UserId
                console.log("UserId过期，重新登陆，重新获取UserId");
                wx.login({
                  success: resLogin => {
                    wx.request({
                      url: config.loginService.loginUrl,
                      method: "post",
                      data: {
                        Code: resLogin.code
                      },
                      success: function (resSucess) {
                        //服务器请求成功
                        console.log("服务器请求成功");
                        if (resSucess.data.ErrCode == 0) {
                          //获取UserId成功
                          console.log("获取UserId成功");
                          //保存UserId
                          console.log("保存UserId");
                          wx.setStorage({
                            key: 'UserId',
                            data: resSucess.data.Data,
                          });
                          resolve(resSucess.data.Data);
                        }
                        else{
                          reject(resSucess.data.ErrMsg);
                        }
                      },
                      fail: function (resFail) {
                        //服务器请求失败
                        console.log("服务器请求失败");
                        reject("服务器请求失败");
                      }
                    });
                  }
                });
              }
            },
            fail: function (resFail) {
              //服务器请求失败
              console.log("服务器请求失败");
              reject("服务器请求失败");
            }
          });
        },
        fail: function () {
          //读取UserId失败
          console.log("读取UserId失败");
          //重新登录，获取UserId
          console.log("重新登录，获取UserId");
          wx.login({
            success: resLogin => {
              wx.request({
                url: config.loginService.loginUrl,
                method: "post",
                data: {
                  Code: resLogin.code
                },
                success: function (resSucess) {
                  //服务器请求成功
                  console.log("服务器请求成功");
                  if (resSucess.data.ErrCode == 0) {
                    //获取UserId成功
                    console.log("获取UserId成功");
                    //保存UserId
                    console.log("保存UserId");
                    wx.setStorage({
                      key: 'UserId',
                      data: resSucess.data.Data,
                    });
                    resolve(resSucess.data.Data);
                  }
                  else {
                    reject(resSucess.data.ErrMsg);
                  }
                },
                fail: function (resFail) {
                  //服务器请求失败
                  console.log("服务器请求失败");
                  reject("服务器请求失败");
                }
              });
            }
          });
        }
      });
    });
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    
    //调用登录方法获取用户Id
    this.getUserId().then(function(result){
      console.log("login success: " + result);
    }, function(err){
      console.log("login fail: " + err);
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null
  },
});