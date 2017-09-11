// pages/todo/todoadd/todoadd.js
var utils = require("../../../utils/util");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        todoTitleStr: "",
        todoContentStr: "",
        useAlertChecked: true,
        alertTimeDisplay: "",
        todoDate: utils.formatDate(new Date()),
        todoDateEnd: null,
        todoTime: utils.formatTime(new Date())
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    /**
     * 提醒日期变化
     */
    todoDateChange: function (e) {
        this.setData({
            todoDate: e.detail.value
        });
    },

    /**
     * 提醒时间变化
     */
    todoTimeChange: function (e) {
        this.setData({
            todoTime: e.detail.value
        });
    },

    /**
     * 开启提醒变化
     */
    useAlertChange: function (e) {
        if (e.detail.value) {
            this.setData({
                alertTimeDisplay: ""
            });
        }
        else {
            this.setData({
                alertTimeDisplay: "none"
            });
        }
    },

    /**
     * 表单提交
     */
    formSubmit: function (e) {
        console.log(e.detail.value);
        console.log(e.detail.formId);
        this.showErrorMessage("内容不能为空");
    },

    /**
     * 显示错误信息
     */
    showErrorMessage: function(message){
        var that = this;
        setTimeout(function(){
            that.setData({
                popErrorMsg: message
            });
        }, 100);
        setTimeout(function () {
            that.setData({
                popErrorMsg: ""
            });
        }, 3000);
    }
})