$(function(){

	//阻止默认行为
	$("a:not([href^=http])").each(function(){
		$(this).click(function(e){
			e.preventDefault();
		})
	})

	//直接link阻止冒泡
	$("a[href^='http']").each(function(){
		$(this).click(function(e){
			e.stopPropagation();
		})
	})
	
	var $sidebar_list = $(".c-sidebar-list")
	var $sidebar_list_ul = $(".c-sidebar-list ul")
	var $sidebar_list_item = $(".c-sidebar-list ul li")

	//当屏幕高度不足以展示侧边栏时
	var _screen_H = $(window).height()
	var _sidebar_list_height = $sidebar_list_ul.height()
	var _sidebar_list_visheight = _screen_H - 38 - 42 - 20;
	_sidebar_list_height > _sidebar_list_visheight ? $sidebar_list.addClass('scroll') : $sidebar_list.removeClass('scroll');

	//侧边栏关联内容卡
	$sidebar_list_item.on('click',function(){
		$sidebar_list_item.removeClass('on')
		$(this).addClass('on')
		var i = $(this).index()
		$(".c-tab").removeClass('on').eq(i).addClass('on')
	})




	var 
	$main = $("#main"),
	$btg = $('h3').add('h4'),
	$mnav = $("#showmenu"),
	screenW = $(window).width()

	//h3 & 4 Toggle
		$btg.on('click',function(){
			$(this).next('div,ul').slideToggle('slow')
			var status = $(this).children('span').html()
			if(status=='-'){
				$(this).children('span').html('+')}
			else if(status=='+'){
				$(this).children('span').html('-');
			}
		})

	//Tips Layout
		$main.on('mouseover','h4+ul>li',function(e){
			$(this).children('span').css({
					left:e.pageX+12+'px',
					top:e.pageY+8+'px',
					display:'block'
				})
			}).on('mouseout','h4+ul>li',function(){
				$(this).children('span').hide()
			})

	//Snippet Box
		$("#closebox").click(function(){
			$("#snippet").hide()
		})
		
		$("#snippet").draggable({
			handle:'h6',
			cursor:'move',
		});

		$("#main").on('click','h4+ul>li',function(){
			var infos = $(this).html();
			$("#snippet").show()
			$("#box").html(infos)
		})

	



})