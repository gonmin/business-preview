
var _mm = require('util/util.js')

require('page/common/nav/index');

require('./index.css');

require('util/slider/index.js');

require('page/common/header/index');

var navSide = require('page/common/nav-side/index');
var template = require('./index.string');

$(function() {
	// 渲染banner的HTML
	var bannerHtml = _mm.renderHtml(template);
	$('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
    	dots: true
    });

    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function() {
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    })
});

// navSide.init({
// 	name: 'user-center'
// });
