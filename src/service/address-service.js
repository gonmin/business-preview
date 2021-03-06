var _mm = require('util/util')

var  _address = {
	// 获取地址列表
	getAddressList: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/list.do'),
			data: {
				pageSize: 50
			},
			success: resolve,
			error: reject
		})
	},
	// 单条获取地址信息
	getAddress: function (shippingId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/select.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject
		})
	},
	// 新建地址
	save: function (addressInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/add.do'),
			data: addressInfo,
			success: resolve,
			error: reject
		})
	},
	// 修改地址
	update: function (addressInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/update.do'),
			data: addressInfo,
			success: resolve,
			error: reject
		})
	},
	// 删除地址
	deleteAddress: function (shippingId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/del.do'),
			data: {
				shippingId: shippingId
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

module.exports = _address;
