	$(function(){
// keyvisual ----------------------------------------------------------
// 화면 비율 조정

	var windowHeight;
	var windowWidth;
	var timer;
	var mainW;
	
	$(window).resize(function(){
	//	clearTimeout(timer);
	//	timer=setTimeout(function(){
			windowHeight=$(window).height();
			windowWidth=$(window).width();
			if(windowHeight>windowWidth){
			}
			else{
			}
			mainW=$(".mainBanner img").width();
			
			if(mainW<windowWidth){
				mainW=windowWidth;
			}
			else{
				mainW=960;
			}
			$("img.main").width(mainW);
			$("img.main").css({"margin-left":-mainW/2});
			
		// 포메인 메뉴 기본설정  + footer sns 이미지
			var sns;
			
			if($(window).width()<550){
				// 음식 설명 상하 정렬
				$(".sub a").addClass("column");
				
				// 메뉴 좌우 버튼 제거
				$(".arrow_btn").addClass("off")

				// sns 아이콘 이미지축소	
				$(".sns").addClass("small");
				$(".menu_scroll").addClass("resize");
			}
			else{
				// 음식 설명 좌우 정렬
				$(".sub a").removeClass("column");
				
				// 메뉴 좌우 버튼 생성
				$(".arrow_btn").removeClass("on")

				//sns 아이콘 이미지 확대			
				$(".sns").removeClass("small");
				$(".menu_scroll").removeClass("resize");
			}
	//	},50)
	}).trigger("resize");

	//스크롤 이벤트 -----------------------------------------------------
	$(window).scroll(function(){
		scT=$(window).scrollTop();
		
		// Brand Story 스크롤 이벤트
		$(".conts > li").each(function(){
			// 각각의 컨텐츠 상단좌표
			contT=$(this).offset().top;
		//	console.log(contT-windowHeight);
		//	console.log(scT);
			if(scT>contT-windowHeight+100){
				$(this).find("img").addClass("on");
			}
		});
	}).trigger("scroll");

// Mobile --------------------------------------------------------------
	// 메뉴 텝 클릭시 ----------------------------------
	$(".tab").click(function(e){
		e.preventDefault();
		$(".mobile").addClass("active");
		$(".dim").addClass("active");
		$("body").addClass("fixed");
	});
	
	$(".gnb > li > a").click(function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next(".depth").stop().slideUp();
		}
		else{
			$(".depth").slideUp();
			$(this).parent().siblings().children("a").removeClass("active");
			$(this).addClass("active");
			$(this).next(".depth").stop().slideDown();
		}
	});
	
	// 닫기버튼
	$(".close").click(function(e){
		e.preventDefault();
		$(".mobile").removeClass("active");
		$(".dim").removeClass("active");
		$(".depth").slideUp();
		$("body").removeClass("fixed");
	});
	// 메뉴 밖 검은 화면
	$(".dim").click(function(){
		$(".mobile").removeClass("active");
		$(this).removeClass("active");
		$(".depth").slideUp();
		$(".add_btn").removeClass("active");
		$("body").removeClass("fixed");
	});
	
	// 검색기능
	$(".search > a").click(function(e){
		e.preventDefault();
		if($(".search_box").is(":visible")){
			$(".search_box").hide();
			$(this).children().attr({src:"images/search_icon.png"});
		}
		else{
			$(".search_box").slideDown();
			$(this).children().attr({src:"images/close_icon.png"});
			$("#header").addClass("active");
		}
	});

// keyvisual 드래그 슬라이드 -----------------------------------------------
	// 초기 설정
	var keyIndex=0;
	// 슬라이드 개수
	var keyTotal=$("#keyvisual ul li").length;
	
	//터치 시작
	$("#keyvisual ul").on("touchstart", function(e){
		var evt=e.originalEvent;
		prevX=evt.touches[0].screenX;
	//	console.log(prevX);
		
	});
	
	//터치 끝
	$("#keyvisual ul").on("touchend", function(e){
		var evt=e.originalEvent;
		nextX=evt.changedTouches[0].screenX;
	//	console.log(nextX);
		if($(this).is(":animated")==true) return false
		
		if(prevX-nextX>50){ // 우측으로 슬라이드 
			$(this).animate({left:"-100%"},300, function(){
				$(this).append($(this).children().first());
				$(this).css({left:"0"});
			});
		}
		else if(nextX-prevX>50){ // 좌측으로 슬라이드
			$(this).prepend($(this).children().last());
			$(this).css({left:"-100%"});
			$(this).animate({left:0},300);
		}
		else{
			return false;
		}
	});

// menu --------------------------------------------------------------------
//	$(".menu_box > ul > li").eq(0).addClass("active");
//	$(".sub_group > ul").eq(0).addClass("active");
//	$(".prev").hide();	
	
	// menu 카테고리 선택
	var menuN;
	
	$(".menu_box > ul > li").click(function(e){
		e.preventDefault();
		menuN=$(this).index();
		move=menuN*25;
		
		$(".menu_box > ul > li").removeClass("active");
		$(this).addClass("active");
		$(".sub_group .sub").removeClass("active")
		$(".sub_group .sub").eq(menuN).addClass("active")
		$(".menu_scroll span").show();
		$(".menu_scroll span").css({left:move+"%"});
		$(".select").fadeOut(400);

		// 세부메뉴 초기화
		$(".sub_group .sub").css({left:0});
		
		// 첫 메뉴 선택시
		if($(".sub_group").is(":visible")!=true){
			$(".sub_group").slideDown(500);
		}
	});

	// 좌우버튼 클릭시	
	$(".prev").click(function(e){
		e.preventDefault();
		// 동작중 실행 금지
		if($(".sub.active").is(":animated"))return false
		
		$(".sub.active").prepend($(".sub.active").children().eq(3));
		$(".sub.active").css({left:"-100%"});
		$(".sub.active").animate({left:'0%'},500);

	});
	$(".next").click(function(e){
		e.preventDefault();
		// 동작중 실행 금지
		if($(".sub.active").is(":animated"))return false
		
		$(".sub.active").animate({left:'-100%'},500,function(){
			$(this).append($(this).children().eq(0));
			$(this).css({left:0});
		});
	});
	
	// 포메인메뉴 스크롤 이벤트
	var nonpix=0;
	$(".sub_group .sub").each(function(){ // 모든 그룹마다 설정됩니다.
			
		$(this).on("touchstart", function(e){
			evt=e.originalEvent;
			prevX=evt.touches[0].screenX;
			res=$(".sub.active").css("left");
			
			// 'left 값'에서 'px' 뺀 값;
			nonpix=parseInt($(".sub.active").css("left"));
		});

// 스크롤 동작
/*		 $(this).on("touchmove", function(e){
			 evt=e.originalEvent;
			 moveX=evt.touches[0].screenX;
			 amount=moveX-prevX;

			 $(".sub.active").css({left:nonpix+amount});
		 });
*/
		$(this).on("touchend", function(e){
			evt=e.originalEvent;
			nextX=evt.changedTouches[0].screenX;
			
			if(prevX-nextX>$(this).children().width()/5){ // 우측으로 슬라이드
				$(".next").trigger("click");
			}
			else if(nextX-prevX>$(this).children().width()/5){ // 좌측으로 슬라이드
				$(".prev").trigger("click");
			}
			else{
				return false;
			}
		});
	});

// footer 
	// family site
	$(".family_site > a").click(function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next().stop().slideUp();
		}
		else{
			$(this).addClass("active");
			$(this).next().stop().slideDown();
		}
	});
	
});