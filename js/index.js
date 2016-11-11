/*JS File for notebook
http://iruxu.com/notebook
*/

	$(function(){

		//Var
			var
			$header = $(".header"),
			$content = $(".content"),
			$nav = $("#nav>ul>li"),
			$main = $("#main"),
			$btg = $('h3').add('h4').add('h6'),
			$mnav = $("#showmenu"),
			screenW = $(window).width()
		
		//Navigator
			$nav.on('click',function(){
				var i = $(this).index()
				$content.hide().eq(i).show()
				$nav.removeClass('on')
				$(this).addClass('on')

				if(screenW <= 720){
					$('#nav').slideUp()
				}
			})
		
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

		//Link
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

		//Mobile nav
			$mnav.on('click',function(){
				$("#nav").slideToggle()
			})


	})