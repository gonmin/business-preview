var _mm = require('util/util.js')

require('./index.css');

var nav = require('page/common/nav/index');

require('page/common/header/index');

var _cart = require('service/cart-service.js');

var templateIndex = require('./index.string');

// 逻辑部分
var page = {
	data: {
		
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		// 如果没有传productId 
		this.loadCart();
	},
	bindEvent: function () {
		var _this = this;
		// 商品的选择和取消选择
		// 事件代理
		$(document).on('click', '.cart-select', function () {
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			// 切换选中状态
			// 选中
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, function(res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCartError();
				})
			} else {
				_cart.unselectProduct(productId, function(res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCartError();
				})
			}

		});

		// 全选和取消全选
		$(document).on('click', '.cart-select-all', function () {
			var $this = $(this);			// 切换选中状态
			// 选中
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function(res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCartError();
				})
			} else {
				_cart.unselectAllProduct(function(res) {
					_this.renderCart(res);
				}, function (errMsg) {
					_this.showCartError();
				})
			}

		});

		// 商品数量的变化
		$(document).on('click', '.count-btn', function () {
			var $this = $(this),
				$pCount = $this.siblings('.count-input'),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				productId = $this.parents('.cart-table').data('product-id'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = parseInt($pCount.data('max')),
				newCount = 0;

			if (type === 'plus') {
				if (currCount >= maxCount) {
					_mm.errorTips('该商品数量已经达到最大上限')
					return;
				}
				newCount = currCount + 1;

			} else if (type === 'minus') {
				if (currCount <= minCount) {
					return;
				}
				newCount = currCount - 1;
			}

			_cart.updateProduct({
				productId: productId,
				count: newCount
			}, function(res) {
				_this.renderCart(res);
			}, function (errMsg) {
				_this.showCartError();
			})
		});

		// 删除单个商品
		$(document).on('click', '.cart-delete', function () {
			if (window.confirm('确认删除该商品？')) {
				var productId = $(this).parents('.cart-table')
					.data('product-id');
					_this.deleteCartProduct(productId);
			}
		})

		// 删除选中的商品
		$(document).on('click', '.delete-selected', function () {
			if (window.confirm('确认删除该商品？')) {
				var arrProductIds = [],
					$selectedItem = $('.cart-select:checked');
				// 循环查找选中
				for (var i = 0; i < $selectedItem.length; i++) {
					arrProductIds.push($($selectedItem[i])
						.parents('.cart-table').data('product-id'));
				}
				if (arrProductIds.length) {
					_this.deleteCartProduct(arrProductIds.join(','));
				} else {
					_mm.errorTips('你还没选中要删除的商品')
				}
			}
		})

		// 提交购物车
		$(document).on('click', '.btn-submit', function () {
			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
				window.location.href = './order-confirm.html';
			} else {
				_mm.errorTips('请选择商品后再提交');

			}
		})

	},
	// 删除指定商品，支持批量，productId 用逗号分隔
	deleteCartProduct: function (productIds) {
		var _this = this;
		_cart.deleteProduct(productIds, function(res) {
			_this.renderCart(res);
		}, function (errMsg) {
			_this.showCartError();
		})
	},
	showCartError: function () {
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧</p>');

	},
	// 加载购物车 数据
	loadCart: function () {
		var _this = this;
		var html = '';
		// 
		_cart.getCartList(function(res) {
			_this.renderCart(res);
		}, function (errMsg) {
			_this.showCartError();

		})
	},
	// 渲染购物车
	renderCart: function (data) {
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;

		// 生成HTML
		var cartHtml = _mm.renderHtml(templateIndex, data);

		$('.page-wrap').html(cartHtml);

		nav.loadCartCount();
	},
	filter: function (data) {
		data.notEmpty = !!data.cartProductVoList.length;
	}
}

$(function() {
	page.init();
})
