var host = "89286074.qcloud.la";
var loginHost = host + "/Login/api";
var todoHost  = host + "/Todo/api";

var config = {
  loginService: {
    loginUrl: `https://${loginHost}/WeChatLogin/Login`
  },
  todoService: {
    getTodayTodos: `https://${todoHost}/Todo/GetTodayTodos`,
    getThreeDayTodos: `https://${todoHost}/Todo/GetThreeDayTodos`,
    getSevenDayTodos: `https://${todoHost}/Todo/GetSevenDayTodos`,
    getAfterSevenDayTodos: `https://${todoHost}/Todo/GetAfterSevenDayTodos`,
    getExpiredTodos: `https://${todoHost}/Todo/GetExpiredTodos`,
    getTodo: `https://${todoHost}/Todo/GetTodo`,
    saveTodo: `https://${todoHost}/Todo/SaveTodo`,
    deleteTodo: `https://${todoHost}/Todo/DeleteTodo`
  }
};

module.exports = config;