require('./index.css');

var _mm = require('util/util');

// 通用页面的头部

var header = {
	init: function () {
		this.bindEvent();
		this.onLoad();
	},
	onLoad: function () {
		var keyword = _mm.getUrlParam('keyword');
		// 如果keyword 存在则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function () {
		var _this = this;
		// 点击搜索按钮之后，做搜索提交
		$('#search-btn').click(function() {
			_this.searchSubmit();
		})
		// 输入回车后，做搜索提示
		$('#search-input').keyup(function(e) {
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		})

	},
	// 搜索的提交
	searchSubmit: function () {
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword ，正常跳转到list页
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		} else {
			_mm.goHome();
		}
	}
}

header.init();
