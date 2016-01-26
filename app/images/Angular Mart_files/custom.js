'use strict';
var AM = AM || {};

(function($) {


var $window=$(window),
    $body= $('body'),
    $header= $('#header'),
    $sidebar =$('.sidebar'),
    $app= $('app'),
    $appBody=$('.app-body'),
    $scrollableContent= $('.scrollable-content'),
    $footer = $('#footer'),
    $goToTopEl =$('#goToTop');


    AM.initialization = {

        init : function(){
            AM.initialization.bodyClass();
            AM.initialization.resizeVideos();
        },


        bodyClass: function(){
            var jRes = jRespond([
                {
                    label: 'mobile',
                    enter: 0,
                    exit: 479
                },{
                    label: 'handheld',
                    enter: 480,
                    exit: 767
                },{
                    label: 'tablet',
                    enter: 768,
                    exit: 991
                },{
                    label: 'laptop',
                    enter: 992,
                    exit: 1199
                },{
                    label: 'desktop',
                    enter: 1200,
                    exit: 10000
                }
            ]);
            jRes.addFunc([
                {
                    breakpoint: 'desktop',
                    enter: function() { $body.addClass('device-lg'); },
                    exit: function() { $body.removeClass('device-lg'); }
                },{
                    breakpoint: 'laptop',
                    enter: function() { $body.addClass('device-md'); },
                    exit: function() { $body.removeClass('device-md'); }
                },{
                    breakpoint: 'tablet',
                    enter: function() { $body.addClass('device-sm'); },
                    exit: function() { $body.removeClass('device-sm'); }
                },{
                    breakpoint: 'handheld',
                    enter: function() { $body.addClass('device-xs'); },
                    exit: function() { $body.removeClass('device-xs'); }
                },{
                    breakpoint: 'mobile',
                    enter: function() { $body.addClass('device-xxs'); },
                    exit: function() { $body.removeClass('device-xxs'); }
                }
            ]);
        },

        resizeVideos: function(){
            if ( $().fitVids ) {
                $(".app-body,#footer,#slider:not(.revslider-wrap),.scrollable-content").fitVids({
                    customSelector: "iframe[src^='http://www.dailymotion.com/embed']",
                    ignore: '.no-fv'
                });
            }
        }  

    }


    AM.documentOnReady={
        init : function(){
            AM.initialization.init();
        },

    };


    AM.documentOnResize ={
        init : function(){

        },
    };

    AM.documentOnLoad ={
        init :function(){
            
        },
    };


    $(document).ready( AM.documentOnReady.init );
    $window.load( AM.documentOnLoad.init );
    $window.on( 'resize', AM.documentOnResize.init );


  /****************Login from****************************/
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 400;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_username=$('#login_username').val();
                var $lg_password=$('#login_password').val();
                if ($lg_username === "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return false;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;

            case "register-form":
                var $rg_username=$('#register_username').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
            default:
                return false;
        }
        return false;
    });

    $(document).on('click', '#login_register_btn', function () { modalAnimate($formLogin, $formRegister) });
    $(document).on('click', '#register_login_btn', function () { modalAnimate($formRegister, $formLogin); });
    $(document).on('click', '#login_lost_btn', function () { modalAnimate($formLogin, $formLost); });
    $(document).on('click', '#lost_login_btn', function () { modalAnimate($formLost, $formLogin); });
    $(document).on('click', '#lost_register_btn', function () { modalAnimate($formLost, $formRegister); });
    $(document).on('click', '#register_lost_btn', function () { modalAnimate($formRegister, $formLost); });

    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }
jQuery('.scrollable-content').scrollbar();

})(jQuery);