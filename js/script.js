$(document).ready(function(){

/*---------------------------- Main nav ----------------------------*/

    $(document).on("click", ".burger", function () {
        $(".burger").toggleClass("burger-close");
    });

/*---------------------------- Main carousel ------------------------*/

    $('#main-carousel').owlCarousel({
        items: 1,
        loop: true, 
        margin: 0, 
        nav: true, 
        autoplay: true, 
        smartSpeed: 5000,
        autoplayTimeout: 4000, 
        navSpeed: 300,
        dotsSpeed: 300,
        animateOut: 'fadeOut',
        navText: ['<i class="fas fa-chevron-circle-left"></i>',
                  '<i class="fas fa-chevron-circle-right"></i>']
    });

/*---------------------------- Product carousel ---------------------*/

    $('#product-carousel .item img').each(function() {
        var slideIcon = $(this).attr('src');
        $('.indicators').append('<img src='+slideIcon+'>');
        });

    $('#product-carousel').owlCarousel({
        items: 1,
        loop: true, //Зацикливаем слайдер
        margin: 0, //Отступ от элемента справа в 50px
        nav: true, //Отключение навигации
        smartSpeed: 2000, //Время движения слайда
        autoplayTimeout: 4000, //Время смены слайда
        navSpeed: 300,
        dotsSpeed: 300,
        dotsContainer: '.indicators',//Указываем класс блока пагинации
        navText: ['<i class="fas fa-chevron-circle-left"></i>',
                  '<i class="fas fa-chevron-circle-right"></i>']
    });

    $('.indicators').appendTo('#product-carousel');
    $('.indicators img').click(function () {
        $('#product-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
    });

/*---------------------------- Scroll up ----------------------------*/

    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $(function(){
        $("a[href^='#up']").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
    });

/*---------------------------- Subscription -------------------------------*/

$('.main-subscribe-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/send-subscription.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('.overlay, .bacground-modal, .subscr').fadeIn(300);
        $('.subscribe-form').trigger('reset');
    });
    $.ajax({
        type: "POST",
        url: "mailer/to-subscriber.php",
        data: $(this).serialize()
    });
    return false;
});

$('.product-subscribe-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "../mailer/send-subscription.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('.overlay, .bacground-modal, .subscr').fadeIn(300);
        $('.subscribe-form').trigger('reset');
    });
    $.ajax({
        type: "POST",
        url: "../mailer/to-subscriber.php",
        data: $(this).serialize()
    });
    return false;
}); 

/*---------------------------- Modals -------------------------------*/
    
    $('[data-buy=buy]').each(function(i) {
        $(this).on('click', function() {
            $('#order .product-name').text($('.card-title').eq(i).text());
            $('#order .order-photo').attr({
              'src': $('.product-photo').eq(i).attr('src'),
              'alt': $('.product-photo').eq(i).attr('alt')
            });
            $('#order .price').text($('.product .price').eq(i).text());
            $('#order input[name=feedback_title]').attr('value', $('.card-title').eq(i).text());
            $('.overlay, .bacground-modal, #order').fadeIn(300);
        });
    });

    $('[data-buy=make_order]').on('click', function() {
        $('#order .product-name').text($('.product-title').text());
        $('#order .order-photo').attr({
            'src': $('.product-title').attr('data-photo_src'),
            'alt': $('.product-title').attr('data-photo_alt')
        });
        $('#order .price').text($('.product-header .price').text());
        $('#order input[name=feedback_title]').attr('value', $('.product-title').text());
        $('.overlay, .bacground-modal, #order').fadeIn(300);
    });

    $('.modal-close').on('click', function() {
        $('.overlay, .thanks, .subscr').fadeOut(300);
        $('.overlay form').trigger('reset');
    });

    $('.bacground-modal').on('click', function() {
        $('.overlay, .thanks, .subscr').fadeOut(300);
        $('.overlay form').trigger('reset');
    });

    $('.main-page-order').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/send-order.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#order').fadeOut();
            $('.thanks').fadeIn(300);

            $('.main-page-order').trigger('reset');
        });
        return false;
    }); 
 
    $('.product-page-order').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/send-order.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#order').fadeOut();
            $('.thanks').fadeIn(300);

            $('.product-page-order').trigger('reset');
        });
        return false;
    }); 
 
/*---------------------------- Phone input mask ----------------------*/

    $("input[name=feedback_phone]").mask("+7(999) 999-99-99");
    
    /*---------------------------- Fancybox gallery ----------------------*/
    
    $('[data-fancybox="in-use"]').fancybox({
        loop: true,
        autoFocus: false,
        clickSlide: "close",
        transitionEffect: "tube",
        buttons: ["zoom", "share", "slideShow", "thumbs", "close"]
    });

    $('[data-fancybox="video-review"]').fancybox({
        loop: true,
        autoFocus: false,
        transitionEffect: "tube",
        clickSlide: "close",
        buttons: ["fullScreen", "share", "thumbs", "close"]
    });
});