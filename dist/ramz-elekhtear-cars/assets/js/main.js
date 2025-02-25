(function (window, document, $, undefined) {
    'use strict';

    var eduJs = {
        i: function (e) {
            eduJs.d();
            eduJs.methods();
        },

        d: function (e) {
            this._window = $(window),
            this._document = $(document),
            this._body = $('body'),
            this._html = $('html')
        },


        methods: function (e) {
            eduJs.headerSticky();
        },

        headerSticky: function () {
            $(window).on('scroll', function() {
                if ($('body').hasClass('rbt-header-sticky')) {
                    var stickyPlaceHolder = $('.rbt-sticky-placeholder'),
                        headerConainer = $('.app-nav');
                    if ($(window).scrollTop() > 200) {
                        headerConainer.addClass('app-nav-sticky');
                    } else {
                        headerConainer.removeClass('app-nav-sticky');
                    }
                }
            });
        },
    }
})