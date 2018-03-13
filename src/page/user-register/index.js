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
		// 注册按钮的点击
		$('#username').blur(function () {
			var username = $.trim($(this).val());
			if (!username) {
				return;
			}
			// 异步验证用户名是否有效
			_user.checkUsername(username, function(res){
				console.log(res);
				formError.hide();
			}, function(errMsg) {
				console.log(errMsg);

				formError.show('用户名已经存在')
			})
		})
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

		$('.user-content').focus(function() {
			formError.hide();
		})
	},
	// 提交表单
	submit: function() {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			passwordComfirm: $.trim($('#password-comfirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			answer: $.trim($('#answer').val()),
			question: $.trim($('#question').val())
		}
		// 表单验证结果
		var validateResult = this.formValidate(formData);
		console.log(validateResult);
		// 验证成功
		if (validateResult.status) {
			_user.register(formData, function(res) {
				console.log(res);
				window.location.href =  './result.html?type=register';
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
		// 验证用户名是否为寇
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		// 验证密码是否为寇

		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}

		if (formData.password.length < 6) {
			result.msg = '密码长度不能少于6位';
			return result;
		}

		if (formData.password !== formData.passwordComfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}

		// 验证密码是否为寇r
		if (!_mm.validate(formData.phone, 'require')) {
			result.msg = '手机号不能为空';
			return result;
		}
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = '手机号码输入有误';
			return result;
		}
		if (!_mm.validate(formData.email, 'require')) {
			result.msg = '邮箱不能为空';
			return result;
		}
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = '邮箱输入有误';
			return result;
		}

		if (!_mm.validate(formData.question, 'require')) {
			result.msg = '预留问题不能为空';
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = '答案不能为空';
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

