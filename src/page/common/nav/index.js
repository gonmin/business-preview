require('./index.css');

var _mm = require('util/util')
var _user = require('service/user-service')
var _cart = require('service/cart-service')

var nav = {
	init: function () {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent: function () {
		// 登录点击事件
		$('.js-login').click(function () {
			_mm.doLogin();
		})

		// 注册点击事件
		$('.js-register').click(function () {
			window.location.href = './user-register.html'
		})

		// 点击退出
		$('.js-logout').click(function () {
			_user.logout(function (res) {
				window.location.reload();
			}, function(err) {
				_mm.errorTips(errMsg)
			});
		})
		
	},
	// 加载用户信息
	loadUserInfo: function () {
		_user.checkLogin(function (res) {
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		}, function(err) {
			// _mm.errorTips(errMsg)
		});
	},
	// 加载购物车数量
	loadCartCount: function () {
		_cart.getCartCount(function (res) {
			$('.nav .cart-count').text(res || 0);
		}, function(err) {
			$('.nav .cart-count').text(0);

		});
	}
}

module.exports = nav.init();
