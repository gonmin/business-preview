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
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		// 登录按钮的点击
		$('#submit').click(function() {
			_this.submit();
		});

		// 如果按下回车，也可以进行提交
		$('.user-content').keyup(function(e) {
			// keycode === 13 表示回车
			if(e.keyCode === 13) {
				_this.submit();
			}

		})
	},
	// 提交表单
	submit: function() {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		}
		// 表单验证结果
		var validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			_user.login(formData, function(res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg) {
				formError.show(errMsg)
			});
		} else {
			// 错误提示
			formError.show(validateResult.msg)

		}
	},
	formValidate: function (formData) {
		var result = {
			status: false,
			msg: ''
		}

		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}

		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 通过验证， 返回正确
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
}

$(function() {
	page.init();
})

