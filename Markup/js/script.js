$(window).load(function(){

	$(".search-wrap .dropdown-menu li a").click(function(){
	  	$(".search-wrap .dropdown-toggle").html($(this).text() + ' <span class="caret"></span>');
	});

	$('.btn-launch').hover(function(){
		$(this).parent().find('.image-container .after').show();
	},function(){
		$(this).parent().find('.image-container .after').hide();
	})

    $('input[name=recover-option]').click(function(){
        $('.recover-option-container').hide();
        $('.'+$(this).val()).closest('.recover-option-container').fadeIn();
    })


	$('.rating:not(.half) .icon').click(function(){
        var elem = $(this);

        elem.siblings('.icon').removeClass('active');
        elem.addClass('active');

        var rating = ($(this).closest('.rating').find('.icon').length - $(this).index());
        elem.trigger('clicked.rate', [rating]);
    });

    $('.rating:not(.half) .icon').on('clicked.rate', function(e, data){
        console.log(data);
    });

    $('.rating.half .icon').children().click(function(){
        var elem = $(this);

        elem.closest('.icon').siblings().removeClass('active');
        elem.siblings().removeClass('active');
        elem.closest('.icon').addClass('active');
        elem.addClass('active');

        var rating = function(){
            if(elem.index() > 0){
                return (elem.closest('.rating').find('.icon').length - elem.closest('.icon').index() - 1) + '.5';
            }
            else{
                return (elem.closest('.rating').find('.icon').length - elem.closest('.icon').index()) + '.0';
            }
        };

        elem.trigger('clicked.rate.half', [rating()]);
    });

    $('.rating.half .icon').children().on('clicked.rate.half', function(e, data){
        console.log(data);
    });

    /**
     * Affix spacer when media left is affixed
     */
    $('.sidebar-wrapper').on('affix.bs.affix',function(){
        $('.media').prepend('<div class="affix-spacer" style="width:'+ $(this).width() +'px;float:left;height: 100vh"></div>')
    }).on('affixed-top.bs.affix',function(){
        $('.affix-spacer').remove();
    })

    $('.sign-up-additional').click(function(){
        var el = $('.extended-form'),
            triggerEl = $('.sign-up-additional');
        if(el.is(':hidden')){
            el.slideDown(function(){
                triggerEl.text('Hide Additional Details');
            });
        }else{
            el.slideUp(function(){
                triggerEl.text('Show Additional Details');
            })
        }
    })

    /* This code is for the demo purpose of last question section*/
    $('.next').click(function(){
        $('.wizard-container').html(
            '<div class="form-group">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                    '<label class="control-label question-no"><b>5 of 5 Questions</b></label>'+
                '</div>'+
            '</div>'+
            '<div class="form-group">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                    '<label class="control-label">Question</label>'+
                    '<p class="add-margin-top-1x">What is the name of your office?</p>'+
                '</div>'+
                '<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">'+
                    '<label for="input-sec-question" class="control-label">Answer</label>'+
                    '<input type="text" class="form-control" id="input-sec-question">'+
                '</div>'+
            '</div>'+
            '<div class="form-group add-margin-top-5x">'+
                '<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">'+
                    '<button type="submit" class="btn btn-primary add-margin-right-2x">Recover</button>'+
                    '<a href="login.html" class="hidden-xs hidden-sm">Back to sign in</a>'+
                '</div>'+
            '</div>')
    });

});
