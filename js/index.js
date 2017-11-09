$(function(){

	$("#nt-loading").remove()

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
		
		//自动生成侧边栏tab卡指向地址
			$sidebar_list_item.each(function(){
				var i = $(this).index()
				var link = '#' + i
				$(this).attr('href',link)
			})

		//侧边栏导航展开关闭
			$("#c-sidebar-folder").on('click',function(){
				$(this).toggleClass('on');
				$(".c-main").toggleClass('widthauto');
				$(".c-sidebar").toggleClass('folder');
			})

		//侧边栏关联内容卡开关
			$sidebar_list_item.on('click',function(e){
				$sidebar_list_item.removeClass('on')
				$(this).addClass('on')
				var i = $(this).index()
				$c_tab.removeClass('on').eq(i).addClass('on')
				window.location.hash = '#' + i
			})


		//通过hash访问
			var cur_hash = window.location.hash
			function visitByHash(){
				//默认访问时
				if (!cur_hash){
					cur_hash = '#0'
					$sidebar_list_item.eq(0).addClass('on')
					$c_tab.eq(0).addClass('on')
					return
				}
				//有带hash访问时
				var i = parseInt(cur_hash.slice(1))
				$sidebar_list_item.eq(i).addClass('on')
				$c_tab.eq(i).addClass('on')
			}
			visitByHash();

	//内容区
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
				//当为单纯外链时没有浮层
				if (!$(this).children('span').html()){
					return;
				}
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
				var originFn = $(this).children("a:first-child").html() || ''
				var prevArg = $(this).children("em:first-child").html() || ''
				var nextArg = $(this).children("em:nth-child(2)").html() || ''
				var title =  prevArg + originFn + nextArg || 'Snippet'
				var info = $(this).children("span").html();

				$("#snippet").show()
				$("#box-title").html(title)
				$("#box").html(info)
			})

	//公共tab卡功能
		$(".e-tab li").on('click',function(){
			$(this).siblings('li').removeClass('on')
			$(this).addClass('on')
			var i = $(this).index()
			var $tabbox = $(this).parent('.e-tab').siblings('.e-tab-box')
			$tabbox.removeClass('on').eq(i).addClass('on')
		})

	//mobile

})