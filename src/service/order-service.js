var _mm = require('util/util')

var  _order = {
	// 获取商品列表
	getProductList: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success: resolve,
			error: reject
		})
	},
	// 获取订单列表
	getOrderList: function (listParam, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/list.do'),
			data: listParam,
			success: resolve,
			error: reject
		})
	},
	// 提交订单
	createOrder: function (orderInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/create.do'),
			data: orderInfo,
			success: resolve,
			error: reject
		})
	},
	// 获取订单详情
	getOrderDetail: function (orderNum, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/detail.do'),
			data: {
				orderNo: orderNum	
			},
			success: resolve,
			error: reject
		})
	},
	// 取消订单
	cancelOrder: function (orderNum, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/cancel.do'),
			data: {
				orderNo: orderNum	
			},
			success: resolve,
			error: reject
		})
	},
	// 获取商品列表
	getProductDetail: function (productId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/detail.do'),
			data: {
				productId: productId	
			},
			success: resolve,
			error: reject
		})
	}
}

module.exports = _order;
