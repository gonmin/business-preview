require('./index.css')

var _mm = require('util/util.js')

require('page/common/nav-simple/index');

$(function() {
	var type = _mm.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success');
	if (type === 'payment') {
		var orderNumber = _mm.getUrlParam('orderNumber')
		var $orderNumber = $element.find('order-number');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
	}

	// 显示对应的提示元素
	$element.show();

})