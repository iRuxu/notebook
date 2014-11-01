/*JS File for notebook
http://iruxu.com/notebook
iRuxu 2014.10.30
*/

	$(function(){
		//动态样式（ie6-ie8选择器hack）
		$(".content>ul").addClass('col');
		$(".content ul>li>div>ul>li>span").addClass('tips');
		

		//内容切换
		$(".header").on('click','#nav>ul>li',function(){
			$(".content").css('display','none');
			$("#nav>ul>li").removeClass('ctcat');
			var i = $(this).index();
			$(this).addClass('ctcat');
			$(".content").eq(i).css('display','block');
		})
		
		//h3开关
		$("#main").on('click','h3',function(){
			$(this).next('div').slideToggle('slow');
			var tg3 = $(this).children('span').html();
			if(tg3=='-'){
				$(this).children('span').html('+');}
			else if(tg3=='+'){
				$(this).children('span').html('-');;
			};
		});

		//h4开关
		$("#main").on('click','h4',function(){
			$(this).next('ul').slideToggle('slow');
			var tg4 = $(this).children('span').html();
			if(tg4=='-'){
				$(this).children('span').html('+');}
			else if(tg4=='+'){
				$(this).children('span').html('-');;
			};
		})

		//tips显示
		$("#main").on('mouseover','h4+ul>li',function(e){
			$(this).children('span').css({
					left:e.pageX+12+'px',
					top:e.pageY+8+'px',
					display:'block'
				})
			}).on('mouseout','h4+ul>li',function(){
				$(this).children('span').css({
					display:'none'
				})
			})

		//关闭片段盒子
		$("#closebox").click(function(){
			$("#snippet").css('display','none');
		})

		//tips添加至snippet box
		$("#main").on('click','h4+ul>li',function(){
			var infos = $(this).children('span').html();
			$("#snippet").css('display','block');
			$("#box").html(infos);
		})

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

		//h6开关
		$("footer").on('click','h6',function(){
			$(this).next('ul').slideToggle('slow');
			var tg6 = $(this).children('span').html();
			if(tg6=='-'){
				$(this).children('span').html('+');}
			else if(tg6=='+'){
				$(this).children('span').html('-');;
			};
		})

		//顶部菜单简易响应
		var media_width = $(window).width();
		var media_height = $(window).height();
		var h2_lineheight = media_height/7;
		if(media_width>1140){
			$("#showmenu").css('display','none')
		}else{
			$("#showmenu").css('display','block')
			$("#nav").css('display','none');
			$("#showmenu").click(function(){
				$("#nav").css('display','block');
				$(".content").css('display','none');
				$("#nav>ul>li").removeClass('ctcat');
				$("#nav").css({
					'width':media_width,
					'height':media_height,
					'left':0,
					'top':0,
					'z-index':999999
				})
				$("#nav>ul>li").css({
					'width':media_width,
					'height':'15%',
					'line-height':h2_lineheight+'px',
					'display':'block',
					'border':'none'
				})
			})
			$("#nav>ul>li").click(function(){
				$("#nav").css('display','none');
			})
		}
	})