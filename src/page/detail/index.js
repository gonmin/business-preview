var _mm = require('util/util.js')

require('./index.css');

require('page/common/nav/index');

require('page/common/header/index');

var _product = require('service/product-service.js');

var _cart = require('service/cart-service.js');

var templateIndex = require('./index.string');

// 逻辑部分
var page = {
	data: {
		productId: _mm.getUrlParam('productId') || '',
		
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		// 如果没有传productId 
		if (!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: function () {
		var _this = this;
		// 排序的点击事件
		// 事件代理
		$(document).on('mouseenter', '.p-img-item', function () {
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imageUrl);
		});

		// count的操作
		$(document).on('click', '.p-count-btn', function () {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			var $pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			} else if (type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		})

		$(document).on('click', '.cart-add', function () {
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			}, function() {
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg) {
				_mm.errorTips(errMsg);
			})
		})
	},
	// 加载list 数据
	loadDetail: function () {
		var _this = this;
		var html = '';
		$('.page-wrap').html('<div class="loading"></div>')
		_product.getProductDetail(this.data.productId, function(res){
			_this.filter(res);
			// 缓存detail的数据
			_this.data.detailInfo = res;
			html = _mm.renderHtml(templateIndex, res);
			$('.page-wrap').html(html);
		}, function(errMsg) {
			$('.page-wrap').html('<p class="err-tip">此商品太淘气，找不到了</p>');
		})
	},
	filter: function (data) {
		data.subImages = data.subImages.split(',');

	}
}

$(function() {
	page.init();
})
