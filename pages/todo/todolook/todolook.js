var config = require("../../../config");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        todoTitle: "",
        todoContent: "",
        alertTimeDisplay: "",
        todoDate: "",
        todoTime: "",
        alertTime: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.todoId);

        if(options.todoId){
            var that = this;
            wx.request({
                url: config.todoService.getTodo,
                method: "post",
                data: {
                    Token: wx.getStorageSync("Token"),
                    TodoId: options.todoId
                },
                success: function (res) {
                    console.log(res.data);
                    if(res.data.ErrCode == 0){
                        that.setData({
                            todoTitle: res.data.Data.Title,
                            todoContent: res.data.Data.Content,
                            alertTimeDisplay: res.data.Data.UseAlert ? "" : "none",
                            todoDate: res.data.Data.AlertDate,
                            todoTime: res.data.Data.AlertTime,
                            alertTime: res.data.Data.AlertBeforeMinutes
                        });
                    }
                }
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})