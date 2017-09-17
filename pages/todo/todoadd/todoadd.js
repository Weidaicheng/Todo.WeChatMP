// pages/todo/todoadd/todoadd.js
var utils = require("../../../utils/util");
var config = require('../../../config');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        todoId: "",
        todoTitleStr: "",
        todoContentStr: "",
        useAlertChecked: true,
        alertTimeDisplay: "",
        todoDate: utils.formatDate(new Date()),
        todoDateEnd: null,
        todoTime: utils.formatTime(new Date()),
        alertTime: 5
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
                    if (res.data.ErrCode == 0) {
                        that.setData({
                            todoId: res.data.Data.TodoId,
                            todoTitleStr: res.data.Data.Title,
                            todoContentStr: res.data.Data.Content,
                            useAlertChecked: res.data.Data.UseAlert,
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
        if(e.detail.value.todoTitle == ""){
            this.showErrorMessage("标题不能为空");
            return;
        }

        var that = this;
        wx.request({
            url: config.todoService.saveTodo,
            method: "post",
            data: {
                TodoId: that.data.todoId,
                Title: e.detail.value.todoTitle,
                Content: e.detail.value.todoContent,
                UseAlert: e.detail.value.useAlert,
                AlertTime: e.detail.value.todoDate + " " + e.detail.value.todoTime,
                AlertBeforeMinutes: e.detail.value.alertTime,
                Token: wx.getStorageSync("Token"),
                FormId: e.detail.formId
            },
            success: function(res){
                if(res.data.ErrCode == 0){
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000,
                        success: function(){
                            wx.navigateTo({
                                url: '../todolist/todolist',
                            });
                        }
                    });
                }
            }
        })
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