var config = require("../../../config");

// pages/todo/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        todayTodos: [],
        tdayTodos: [],
        weekTodos: [],
        afweekTodos: [],
        doneTodos: [],
        hasTodayTodos: false,
        hasTdayTodos: false,
        hasWeekTodos: false,
        hasAfweekTodos: false,
        hasDoneTodos: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData();
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
     * 加载数据
     */
    loadData: function(){
        var that = this;

        //获取今日Todo
        wx.request({
            url: config.todoService.getTodayTodos,
            method: "post",
            data: {
                Token: wx.getStorageSync("Token")
            },
            success: function (res) {
                if (res.data.ErrCode == 0) {
                    if (res.data.Data != null && res.data.Data.length != 0) {
                        that.setData({
                            todayTodos: res.data.Data,
                            hasTodayTodos: true
                        });
                    }
                    else{
                        that.setData({
                            todayTodos: [],
                            hasTodayTodos: false
                        });
                    }
                }
            }
        });

        //获取三天Todo
        wx.request({
            url: config.todoService.getThreeDayTodos,
            method: "post",
            data: {
                Token: wx.getStorageSync("Token")
            },
            success: function (res) {
                if (res.data.ErrCode == 0) {
                    if (res.data.Data != null && res.data.Data.length != 0) {
                        that.setData({
                            tdayTodos: res.data.Data,
                            hasTdayTodos: true
                        });
                    }
                    else {
                        that.setData({
                            tdayTodos: [],
                            hasTdayTodos: false
                        });
                    }
                }
            }
        });

        //获取一周Todo
        wx.request({
            url: config.todoService.getSevenDayTodos,
            method: "post",
            data: {
                Token: wx.getStorageSync("Token")
            },
            success: function (res) {
                if (res.data.ErrCode == 0) {
                    if (res.data.Data != null && res.data.Data.length != 0) {
                        that.setData({
                            weekTodos: res.data.Data,
                            hasWeekTodos: true
                        });
                    }
                    else {
                        that.setData({
                            weekTodos: [],
                            hasWeekTodos: false
                        });
                    }
                }
            }
        });

        //获取一周之后Todo
        wx.request({
            url: config.todoService.getAfterSevenDayTodos,
            method: "post",
            data: {
                Token: wx.getStorageSync("Token")
            },
            success: function (res) {
                if (res.data.ErrCode == 0) {
                    if (res.data.Data != null && res.data.Data.length != 0) {
                        that.setData({
                            afweekTodos: res.data.Data,
                            hasAfweekTodos: true
                        });
                    }
                    else {
                        that.setData({
                            afweekTodos: [],
                            hasAfweekTodos: false
                        });
                    }
                }
            }
        });

        //获取已完成Todo
        wx.request({
            url: config.todoService.getDoneTodos,
            method: "post",
            data: {
                Token: wx.getStorageSync("Token")
            },
            success: function (res) {
                if (res.data.ErrCode == 0) {
                    if (res.data.Data != null && res.data.Data.length != 0) {
                        that.setData({
                            doneTodos: res.data.Data,
                            hasDoneTodos: true
                        });
                    }
                    else {
                        that.setData({
                            doneTodos: [],
                            hasDoneTodos: false
                        });
                    }
                }
            }
        });
    },

    /**
     * 新建Todo
     */
    addTodo: function(){
        wx.navigateTo({
            url: '../todoadd/todoadd',
        });
    },

    /**
     * 查看已完成Todo
     */
    showTodoLook: function(e){
        // console.log("look:");
        // console.log(e);
        wx.navigateTo({
            url: '../todolook/todolook?todoId=' + e.currentTarget.dataset.todoId,
        });
    },

    /**
     * 显示编辑
     */
    showTodoEdit: function(e){
        // console.log("edit:");
        // console.log(e);
        wx.navigateTo({
            url: '../todoadd/todoadd?todoId=' + e.currentTarget.dataset.todoId,
        })
    },

    /**
     * 设置完成
     */
    setDone: function(e){
        // console.log("done:");
        // console.log(e);

        var that = this;

        wx.request({
            url: config.todoService.setDone,
            method: "post",
            data: {
                Token: wx.getStorageSync("Token"),
                TodoId: e.currentTarget.dataset.todoId
            },
            success: function(res){
                if(res.data.ErrCode == 0){
                    that.loadData();
                }
                else{
                    wx.showToast({
                        title: '设置失败',
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
        });
    }
});