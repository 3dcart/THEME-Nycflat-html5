jQuery(function () {
    /* IE Fix for the use of attribute ='placeholder' */
    if (!jQuery.support.placeholder) {
        var active = document.activeElement;

        jQuery(':text').focus(function () {
            if (jQuery(this).attr('placeholder') != '' && jQuery(this).val() == jQuery(this).attr('placeholder')) {
                jQuery(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if (jQuery(this).attr('placeholder') != '' && (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder'))) {
                jQuery(this).val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');
            }
        });
        jQuery(':text').blur();

        jQuery(active).focus();
    }
    
    resizeMainContent();

    /* Equal heights on product dispays. */
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;

    if (jQuery('.product-item .name').length > 0) {

        jQuery('.product-item .name').each(function () {

            $el = jQuery(this);
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {

                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }

                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);

            } else {

                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }

        });
    }
    
    /* Mini Cart Grammar Fix */
    var noItems = jQuery('#noItems').text();

    if (noItems > 1 || noItems == 0) {
        jQuery('#noItemsText').text('Items');
    }
    else {
        jQuery('#noItemsText').text('Item');
    }

    /* On the window resize event. */
    jQuery(window).resize(function () {
		
		resizeMainContent();

        if (jQuery(window).width() <= 980)
            resizeMainContent();
        else
            jQuery('nav ul.mobile').appendTo('#modCategory');
        resizeMainContent();

        if (jQuery(window).width() <= 767)
            jQuery('#modCategory ul.mobile').appendTo('nav');
    });

    /* On the device orientation change event. */
    jQuery(window).bind('orientationchange', function (event) {
        var lbElem = jQuery('#leftBar');
        var rbElem = jQuery('#rightBar');

        if (orientation == 0 || orientation == 180) {
            jQuery('#mainContent').css('width', '100%');
            jQuery('aside#leftBar').css({
                'display': 'none',
                '-webkit-transform': 'translate3d(-100%, 0, 0)',
                'transform': 'translate3d(-100%, 0, 0)'
            });
        }
        else {
            jQuery('aside#leftBar').css({
                'display': 'block',
                '-webkit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
            });
            resizeMainContent();
        }
    });

    /* Initiates toggle for slide out menu */
    jQuery('a#slideMenu').on('click', function () {
        jQuery('aside#leftBar').css({
            'display': 'block',
            '-webkit-transform': 'translate3d(0, 0, 0)',
            'transform': 'translate3d(0, 0, 0)'
        });
    });

    jQuery('a#closeSlideMenu').on('click', function () {
        jQuery('aside#leftBar').css({
            'display': 'none',
            '-webkit-transform': 'translate3d(-100%, 0, 0)',
            'transform': 'translate3d(-100%, 0, 0)'
        });
    });

    /* Initiates toggle for mobile drop down menu */
    jQuery('a#mobileMenu').on('click', function () {
        jQuery('ul.mobile').toggle();
    });

    /* Initiates <select> for Sub-Category & Blog menus at a specified width. */
    if (jQuery(window).width() <= 767) {

        jQuery('#modCategory ul.mobile').appendTo('nav');

        jQuery('#subcategoriesBlock .sub-categories-format').each(function () {
            var list = jQuery(this),
            select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

            jQuery('#subcategoriesBlock select').prepend('<option> --- Select Sub-Category ---</option>');

            jQuery('ul > li > div.sub-categories > a:first-child', this).each(function () {
                var target = jQuery(this).attr('target'),
                option = jQuery(document.createElement('option'))
                 .appendTo(select)
                 .val(this.href)
                 .html(jQuery('.name', this).html())
                 .click(function () {
                 });
            });
            list.remove();
        });

        jQuery('#blog .blogNav ul').each(function () {
            var list = jQuery(this),
            select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

            jQuery('>li a', this).each(function () {
                var target = jQuery(this).attr('target'),
                option = jQuery(document.createElement('option'))
                 .appendTo(select)
                 .val(this.href)
                 .html(jQuery(this).html())
                 .click(function () {
                 });
            });
            list.remove();
        });

        jQuery('#blog .blogNav select:eq(0)').prepend('<option> --- Select Category ---</option>');
        jQuery('#blog .blogNav select:eq(1)').prepend('<option> --- Select Recent Posts ---</option>');
        jQuery('#blog .blogNav select:eq(2)').prepend('<option> --- Select Archives ---</option>');

        jQuery('#blog .blogNav select, #subcategoriesBlock select').change(function () {
            window.location.href = jQuery(this).val();
        });
    }
    else {
        return;
    }
});

/* Site content section resizing depending on Left Bar or Right Bar is enabled. */
function resizeMainContent() {
    var sw = jQuery('#mainContainer').width();
    var mcElem = jQuery('#mainContent');
    var lbElem = jQuery('#leftBar');
    var rbElem = jQuery('#rightBar');
    var lb = (lbElem.length > 0 && lbElem.css("display") != 'none' && lbElem.height() > 15) ? lbElem.outerWidth(true) : 0;
    var rb = (rbElem.length > 0 && rbElem.css("display") != 'none' && rbElem.height() > 15) ? rbElem.outerWidth(true) : 0;
    var mw = sw - (lb + rb);

    var hsWidth = jQuery('.product-item').width();
    jQuery('.product-item .img').css('width', hsWidth + 'px');

    if (lbElem.length == 0 || rbElem.length == 0) {
        if (lbElem.length == 0 && rbElem.length == 0) {
            jQuery('#mainContent').css('width', '100%');
        }
        else {
            jQuery('#mainContent').css('width', mw + 'px');
        }
    }
    else {
        jQuery('#mainContent').css('width', '100%');
    }

    if ((lbElem.css('display') == 'none' && rbElem.css('display') == 'none')) {
        jQuery('#mainContent').css('width', '100%');
    }
    else {
        if ((lbElem.css('display') == 'block' || rbElem.css('display') == 'block')) {
            jQuery('#mainContent').css('width', mw + 'px');
        }
    }
}

/* Search Modal function */
function searchModal() {
jQuery('#searchBox').modal({ 
	minWidth:547,
	minHeight:135,
	closeClass: "modalClose",
	closeHTML:"<a href='#'></a>",
	overlayClose:true
	});
}