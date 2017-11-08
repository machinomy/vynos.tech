$(document).ready(function(){


	// костыль для цифр в карточках

	window.setInterval(function(){
		$(".countdown-card__header__content__timer").each(function(){
			var oldValue = $(this).find(".countdown-card__header__content__timer__item:nth-child(4)").find(".countdown-card__header__content__timer__item__count").html();
			var newValue = ( +oldValue > 0 ) ? oldValue - 1 : 59;
			$(this).find(".countdown-card__header__content__timer__item:nth-child(4)").find(".countdown-card__header__content__timer__item__count").html(newValue)
		})
	}, 1000)




	// header menu

	$(".header__content-trigger").click(function(){
		$(this).toggleClass("header__content-trigger_cross")
		$(".header__content").toggleClass("header__content_active")
	})


	// ui-selects

	$(".ui-select").click(function(e){
		// if ( e.target != e.currentTarget ) return true;
		$(this).toggleClass("ui-select_active")
	})


	// comments

	if ( $(".comments__content__widget")[0] ) {
		$(".comments__content__widget").hide();
		$(".comments__toggler")
			.find(".comments__toggler__list")
			.find(".comments__toggler__list__item:first")
			.addClass("comments__toggler__list__item_active")
		$(".comments__content__widget:first").show();
	}

	$(".comments__toggler__list__item").click(function(){
		var newSlide = $(this);
		var newSlideName = newSlide.attr("data-for");
		// hide all
		$(".comments__toggler__list__item").removeClass("comments__toggler__list__item_active");
		$(".comments__content__widget").hide();
		// show which need
		$(".comments__content__widget[data-slide=" + newSlideName + "]").show();
		newSlide.addClass("comments__toggler__list__item_active");
	})


	// subscribe

	$(".ui-button.ui-button_triple").click(function(){
		$(this).toggleClass("ui-button_triple_active");
		return false;
	})


	// header collapsing

	if ( screen.width > 768 ) {

		if ( $(".header__menu__list").height() > $(".header__menu__list-wrapper").height() ) {
			$(".header__menu").addClass("header__menu_collapsed");
			var cols = $(".header__menu__list").height() / $(".header__menu__list-wrapper").height() ;
			$(".header__menu__list-wrapper").addClass("header__menu__list-wrapper_cols-" + cols);
		}

		$(".header__menu__collapsing-toggler").click(function(){
			$(".header__menu.header__menu_collapsed").toggleClass("header__menu_collapsed_opened");
		})

	}

})