var _mm = require('util/util.js')

require('./index.css');

require('page/common/nav/index');

require('page/common/header/index');

var navSide = require('page/common/nav-side/index');

var _order = require('service/order-service.js');

var templateIndex = require('./index.string');

// 逻辑部分
var page = {
	data: {
		orderNumber: _mm.getUrlParam('orderNumber')
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({
			name: 'order-list'
		})
		this.loadDetail();

	},
	bindEvent: function () {
		var _this = this;
		$(document).on('click', '.order-cancel', function () {
			if (window.confirm('确认取消订单？')) {
				_order.cancelOrder(_this.data.orderNumber, function(res) {
					_mm.successTips('该订单已经取消成功');
					_this.loadDetail();
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				})
			}
			
		})
	},
	// 加载订单列表
	loadDetail: function () {
		var orderDetailHtml = '';
		var _this = this;
		var $content = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(this.data.orderNumber, function(res) {
			_this.dataFilter(res);
			orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);
		}, function(errMsg) {
			$content.html('<p class="err-tip>' + errMsg +'</p>');
		})
	},
	dataFilter: function (data) {
		data.needPay = data.status == 10;
		data.isCancel = data.status == 10;
	}
}

$(function() {
	page.init();
})

