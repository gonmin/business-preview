var _mm = require('util/util.js')

require('./index.css');

require('page/common/nav/index');

require('page/common/header/index');

var _product = require('service/product-service.js');

var Pagination = require('util/pagination/index.js');

var templateIndex = require('./index.string');

// 逻辑部分
var page = {
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy: _mm.getUrlParam('orderBy') || 'default',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 4
		}
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		this.loadList();
	},
	bindEvent: function () {
		var _this = this;
		// 排序的点击事件
		$('.sort-item').click(function() {
			_this.data.listParam.pageNum = 1;

			var $this = $(this);
			if ($this.data('type') === 'default') {
				if ($this.hasClass('active')) {
					return;
				} else {
					$this.addClass('active')
					.siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			} else if ($this.data('type') === 'price') {
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active asc desc');

				// 判断升序降序
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';

				} else {
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';


				}
			}
			_this.loadList();
		})
	},
	// 加载list 数据
	loadList: function () {
		var listParam = this.data.listParam;
		var _this = this;
		var listHtml = '';
		$('.p-list-con').html('<div class="loading"></div>');
		// 删除参数中 不必要的字段
		// listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam, function (res) {
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			})
			$('.p-list-con').html(listHtml);
			_this.loadPagination({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			})
		}, function (errMsg) {
			_mm.errorTips(errMsg);
		})
	},
	// 加载分页信息
	loadPagination: function(pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo,{
			container: $('.pagination'),
			onSelectPage: function (page) {
				_this.data.listParam.pageNum = page;
				_this.loadList();
			}
		}));
	}
}

$(function() {
	page.init();
})

