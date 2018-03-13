var _mm = require('util/util.js')

require('./index.css');

require('page/common/nav/index');

require('page/common/header/index');

var navSide = require('page/common/nav-side/index');

var _user = require('service/user-service.js');

// 逻辑部分
var page = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({
			name: 'user-pass-update'
		})
	},
	bindEvent: function() {
		var _this = this;
		// 点击提交按钮之后的动作
		$(document).on('click', '.btn-submit', function() {
			var userInfo = {
				password: $.trim($('#password').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val())
			};

			var validateResult = _this.validateForm(userInfo); 
			if (validateResult.status) {
				// 更改用户密码
				_user.updatePassword({
					passwordOld: $.trim($('#password').val()),
					passwordNew: $.trim($('#password-new').val()),
				}, function(res, msg) {
					_mm.successTips(msg);
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				});
			} else {
				_mm.errorTips(validateResult.msg)
			}
		})
	},
	// 验证字段信息
	validateForm: function (formData) {
		var result = {
			status: false,
			msg: ''
		}

		// 验证原密码是否为空
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '密码长度不能少于六位';
			return result;
		}
		if (formData.passwordConfirm !== formData.passwordNew) {
			result.msg = '两次密码不一致';
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

