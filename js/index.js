$(function(){

	//阻止默认行为
		$("a:not([href^=http])").each(function(){
			$(this).click(function(e){
				e.preventDefault();
			})
		})

	//直接link阻止冒泡
		$("a[href^='http']").each(function(){
			$(this).attr('target',"_blank")
			$(this).click(function(e){
				e.stopPropagation();
			})
		})
	
	//侧边栏与内容相关功能
		var $sidebar_list = $(".c-sidebar-list")
		var $sidebar_list_ul = $(".c-sidebar-list ul")
		var $sidebar_list_item = $(".c-sidebar-list ul li")
		var $c_tab = $(".c-tab")

		//当屏幕高度不足以展示侧边栏时
		var _screen_H = $(window).height()
		var _sidebar_list_height = $sidebar_list_ul.height()
		var _sidebar_list_visheight = _screen_H - 38 - 42 - 20;
		_sidebar_list_height > _sidebar_list_visheight ? $sidebar_list.addClass('scroll') : $sidebar_list.removeClass('scroll');

		//动态访问指定tab卡
		var getRequest = function(paras){
		    var url = location.search;
		    var _request = {};

		    if( url.indexOf("?") != -1){
		        var str = url.substr(1),
		            i = 0,
		            strs = str.split("&");

		        for( ;i<strs.length;i+=1 ){
		            _request[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
		        }
		    }

		    var value = _request[paras.toLowerCase()];
		    if(typeof(value) == "undefined"){
		        return "";
		    } else {
		        return value;
		    }
		};
		var category = getRequest('c');
		var category = parseInt(category);
		isNaN(category) ? category=0 : category=category
		$sidebar_list_item.eq(category).addClass('on');
		$c_tab.eq(category).addClass('on');

		//侧边栏关联内容卡开关
		$sidebar_list_item.on('click',function(){
			$sidebar_list_item.removeClass('on')
			$(this).addClass('on')
			var i = $(this).index()
			$c_tab.removeClass('on').eq(i).addClass('on')
		})

	//公共tab卡功能
		$(".e-tab li").on('click',function(){
			$(this).siblings('li').removeClass('on')
			$(this).addClass('on')
			var i = $(this).index()
			var $tabbox = $(this).parent('.e-tab').siblings('.e-tab-box')
			$tabbox.removeClass('on').eq(i).addClass('on')
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
			var title = $(this).children("a:first-child").html();
			title || (title = "Snippet");
			var info = $(this).children("span").html();
			$("#snippet").show()
			$("#box-title").html(title)
			$("#box").html(info)
		})

})