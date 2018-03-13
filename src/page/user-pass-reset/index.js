require('./index.css')

var _mm = require('util/util.js');

var _user = require('service/user-service.js');

require('page/common/nav-simple/index');

// 表单里的错误提示
var formError = {
	show: function (errMsg) {
		$('.error-item').show().find('.error-msg').text(errMsg);

	},
	hide: function () {
		$('.error-item').hide().find('.error-msg').text('');
	}
}

// 逻辑部分
var page = {
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this = this;
		// 输入用户名后点击下一步
		$('#submit-username').click(function() {
			var username = $('#username').val();
			// 判断用户存在 
			if (username) {
				_user.getQuestion(username, function(res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQestion();

				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入用户名');
			}
		});

		// 输入密码提示问题答案的点击
		$('#submit-question').click(function() {
			var answer = $('#answer').val();
			// 检查密码提示问题答案存在 
			if (answer) {
				// 
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res) {
					_this.data.answer = username;
					_this.data.token = res;

					_this.loadStepPassword();

				}, function(errMsg) {
					formError.show(errMsg);
					console.log(errMsg);
				})
			} else {
				formError.show('请输入密码提示问题答案');

			}
		});

		// 输入新密码后的按钮的点击
		$('#submit-password').click(function() {
			var password = $('#password').val();
			// 密码不为空
			if (password && password.length >= 6) {
				// 
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function(res) {
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入不少于6位的新密码');
			}
		});

	},
	// 加载输入用户名的一步
	loadStepUsername: function () {
		$('.step-username').show()

	},
	// 加载输入密码提示问提答案的一步
	loadStepQestion: function () {
		formError.hide();
		$('.step-username').hide()
		.siblings('.step-question').show()
		.find('.question').text(this.data.question)
		.siblings('input').val();
		$('.step-question').find('.user-item-text')
		.append('<p class="user-item-text">请输入密码提示问题答案：</p>')


	},
	// 加载输入password的一步
	loadStepPassword: function () {
		formError.hide();
		$('.step-question').hide()
		.siblings('.step-password').show();
	}
}

$(function() {
	page.init();
})

