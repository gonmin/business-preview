var _mm = require('util/util.js')

require('./index.css');

require('page/common/nav/index');

require('page/common/header/index');

var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressModal = require('./address-modal.js');

var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');

// 逻辑部分
var page = {
	data: {
		selectedAddress: null
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		// 如果没有传productId 
		this.loadProductList();
		this.loadAddressList();
	},
	bindEvent: function () {
		var _this = this;
		// 事件代理

		// 地址选择
		$(document).on('click', '.address-item', function () {
			$(this).addClass('active')
			.siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');

		})
		// 提交订单
		$(document).on('click', '.order-submit', function () {
			var shippingId = _this.data.selectedAddressId;
			if (shippingId) {
				_order.createOrder({
					shippingId: shippingId
				}, function(res) {
					window.location.href = './payment.html?orderNumber=' + res.orderNo
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				});
			} else {
				_mm.errorTips('请选择地址后再提交订单')
			}

		})

		// 地址添加
		$(document).on('click', '.address-add', function () {
			addressModal.show({
				isUpdate: false,
				onSuccess: function () {
					_this.loadAddressList();
				}
			})

		})

		// 地址编辑
		$(document).on('click', '.address-update', function (e) {
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, function (res) {
				addressModal.show({
					isUpdate: true,
					data: res,
					onSuccess: function () {
						_this.loadAddressList();
					}
				})
			}, function(errMsg) {
				_mm.errorTips(errMsg);
			})
		})

		// 地址删除
		$(document).on('click', '.address-delete', function (e) {
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			if (window.confirm('确认要删除该地址？')) {
				_address.deleteAddress(id, function(res) {
					_this.loadAddressList();
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				})
			}
		})

	},
	showCartError: function () {
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧</p>');

	},
	// 加载地址列表
	loadAddressList: function () {
		var _this = this;
		// 获取地址列表
		_address.getAddressList(function(res) {
			_this.addressFilter(res);
			var addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		}, function (errMsg) {
			$('.address-con').html('<p class="err-tip">地址加载失败，请稍后重试</p>');
		})
	},
	// 处理地址列表中选中状态
	addressFilter: function (data) {
		if (this.data.selectedAddressId) {
			var selectedAddressIdFlag = false;
			for (var i = 0, length = data.list.length; i < length; i++) {
				if (data.list[i].id) {
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			}
			// 如果以前选中的地址不在列表中，将其删除
			if (!selectedAddressIdFlag) {
				this.data.selectedAddressId = null;
			}
		}
	},
	// 加载商品列表
	loadProductList: function () {
		var _this = this;
		$('.product-con').html('<div class="loading"></div>');
		// 获取地址列表
		_order.getProductList(function(res) {
			var productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		}, function (errMsg) {
			$('.product-con').html('<p class="err-tip">商品信息加载失败，请稍后重试</p>');
		})
	},
	filter: function (data) {
		data.notEmpty = !!data.cartProductVoList.length;
	}
}

$(function() {
	page.init();
})