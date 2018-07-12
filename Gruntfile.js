// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt,{
        pattern: 'grunt-contrib-*',
            config: 'package.json',
            scope: 'devDependencies'
    });
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks("grunt-rollup");

    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);

// configure the tasks
    grunt.initConfig({


        htmlmin: {                                     // Task 
            dist: {                                      // Target 
              options: {                                 // Target options 
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files 
                'public/views/partials/dist/home.html': 'public/views/partials/home.html',    // 'destination': 'source' 
                
              }
            }
          },
        concat: {
            bundle: {
                options: {},
                files: {
                    'dist/bundle.js': ['dist/hello.js'],
                }

            },
            build: {
                src: [
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru-ua.js',
                    'public/scripts/globalVariable.js',
                    'public/scripts/myPrototype.js',
                    'public/scripts/angular-node.js',
                    'public/scripts/designQuery.js',
                    'public/scripts/SectionClass.js',
                    'public/scripts/app.js',
                    'public/scripts/directives.js',
                    'public/scripts/controllers.js',
                    'public/scripts/filters.js',
                    'public/scripts/services.js',
                    'public/scripts/lazyImg.js',
                    'public/components/sign-login/scripts/sign-login.component.js',
                    'public/components/directives/check-password-match.directive.js',
                    'public/components/services/interceptor.factory.js',
                    "public/components/services/factory.exeption.js",
                    "public/components/services/confirm.factory.js",
                    "public/components/services/seo-content.service.js",
                    'public/components/services/service.print.js',
                    'public/components/paps/scripts/paps.service.js',
                    'public/components/loadImage/scripts/service.fileUpload.js',
                    'public/components/menu/scripts/directive.menu.js',
                    'public/components/user/scripts/service.user.js',
                    'public/components/user/scripts/shipInfo.component.js',
                    'public/components/PROMO/campaign/scripts/campaign.service.js',
                    'public/scripts/service.helper.js',
                    'public/scripts/service.email.js',
                    'public/components/notification/scripts/service.notification.js',
                    'public/components/guest.dialog/scripts/directive.dialog.js',
                    'public/components/guest.dialog/scripts/controller.dialog.js',
                    'public/components/dialogs/scripts/service.dialog.js',
                    'public/components/chat/scripts/service.chat.js',
                    'public/components/chat/scripts/controller.chat.js',
                    'public/components/chat/scripts/chat.component.js',
                    'public/components/chat/scripts/directive.chat.js',
                    'public/components/call/scripts/controller.call.js',
                    'public/components/call/scripts/directive.call.js',
                    'public/components/feedback/scripts/controller.feedback.js',
                    'public/components/feedback/scripts/directive.feedback.js',
                    'public/scripts/service.global.js',
                    'public/components/sections/scripts/service.sections.js',
                    'public/components/filters/scripts/service.filters.js',
                    'public/components/filters/scripts/filterTags.service.js',
                    'public/components/cart/scripts/cart.component.js',
                    'public/components/brand/scripts/service.brands.js',
                    'public/components/stuff/scripts/controller.stuff.js',
                    'public/components/stuff/scripts/stuff.service.js',
                    'public/components/stuff/scripts/stuff-list.component.js',
                    'public/components/stuff/scripts/stuff-detail.component.js',
                    'public/components/stuff/scripts/directive.filterForStuffs.js',
                    'public/components/stuff/scripts/directive.stuffsAdminListWithPaginate.js',
                    'public/components/additionalInfo/scripts/component.additionalInfo.js',
                    'public/components/order/scripts/service.order.js',
                    'public/components/order/scripts/order.service.js',
                    'public/components/order/scripts/cart-in-order.service.js',
                    'public/components/news/scripts/service.news.js',
                    'public/components/news/scripts/component.newsList.js',
                    'public/components/news/scripts/component.newsItem.js',
                    'public/components/socialHub/directive.socialHub.js',
                    'public/components/homePage/scripts/component.homePage.js',
                    'public/components/paginator/scripts/component.paginator.js',
                    'public/components/subscription/scripts/subscription.component.js',
                    'public/components/categoriesForList/scripts/component.categoriesForList.js',
                    'public/components/directives/mongoose-error.component.js',
                    'public/components/directives/ng-autocomplite-city.directive.js',
                    'public/components/TEMPLATE/witget/scripts/witget.component.js',
                    'public/components/staticPage/scripts/staticPage.service.js',
                    'public/components/TEMPLATE/slider/slider.component.js',
                    'public/scripts/modulesJquery.js',
                    'public/components/comment/scripts/module.comment.js',
                    'public/components/directives/directive.focus-element.js',
                    'public/components/lookbook/scripts/component.lookbookList.js',
                    'public/components/lookbook/scripts/lookbook.service.js',
                    'public/components/info/scripts/info.service.js',
                    'public/components/info/scripts/info-list.component.js',
                    'public/components/info/scripts/info-item.component.js',
                    'public/components/CONTENT/master/scripts/master.service.js',
                    'public/components/CONTENT/master/scripts/master-list.component.js',
                    'public/components/CONTENT/master/scripts/master-item.component.js',
                    'public/components/CONTENT/catalog/scripts/catalog.component.js',
                    'public/components/CONTENT/lists/component.lists.js',
                    'public/components/TEMPLATE/dateTimeEntry/dateTimeEntry.component.js',
                    'public/components/sections/scripts/category.service.js',
                    'public/components/SEO/seopages/scripts/seo-page.service.js',
                    'public/components/SEO/keywords/scripts/keywords.service.js',
                    'public/components/PROMO/campaign/scripts/component.campaignItem.js',
                    'public/components/staticPage/scripts/component.staticPage.js',
                    'public/components/PROMO/coupon/scripts/coupon.service.js',
                    'public/components/paps/scripts/pap.component.js',
                    'public/components/ORDERS/online/scripts/online.service.js',
                    'public/components/search/search.component.js',
                    'public/components/TEMPLATE/cabinet/cabinet.component.js',
                    'public/scripts/dayOfMonth.components.js',
                    'public/components/CONTENT/price/price.component.js',
                    'public/components/ORDERS/online/scripts/schedule-master.component.js',
                    'public/components/CONTENT/workplace/scripts/workplace-list.component.js',
                ],
                dest: 'public/scripts.js'

            },
            order: {
                src: [
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru.js',
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru-ru.js',
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru-ua.js',
                    'public/scripts/myPrototype.js',
                    'public/scripts/angular-node.js',
                    'public/modules/order/js/app.js',
                    'public/modules/order/js/directives.js',
                    'public/modules/order/js/controllers.js',
                    'public/modules/order/js/services.js',

                    'public/components/sign-login/scripts/sign-login.component.js',
                    'public/components/directives/check-password-match.directive.js',
                    'public/components/services/factory.exeption.js',
                    'public/components/services/confirm.factory.js',
                    "public/components/services/interceptor.factory.js",
                    "public/components/storeSetting/scripts/store-seller.service.js",
                    "public/components/sections/scripts/service.sections.js",
                    'public/components/sections/scripts/category.service.js',
                    'public/components/brand/scripts/service.brands.js',
                    'public/components/stuff/scripts/controller.stuff.js',
                    'public/components/stuff/scripts/stuff.service.js',
                    'public/components/stuff/scripts/stuff-download.component.js',
                    'public/components/filters/scripts/service.filters.js',
                    'public/components/filters/scripts/filterTags.service.js',

                    'public/scripts/service.global.js',
                    'public/scripts/service.helper.js',
                    'public/scripts/service.email.js',
                    'public/components/order/scripts/service.order.js',
                    'public/components/order/scripts/order.service.js',
                    'public/components/order/scripts/cart-in-order.service.js',
                    'public/components/order/scripts/controller.order.js',
                    'public/components/order/scripts/directive.order.js',
                    'public/components/order/scripts/order-list.component.js',
                    'public/components/order/scripts/order-item.component.js',
                    'public/components/notification/scripts/service.notification.js',
                    'public/components/notification/scripts/controller.notification.js',
                    'public/components/chat/scripts/service.chat.js',
                    'public/components/chat/scripts/controller.chat.js',
                    'public/components/chat/scripts/directive.chat.js',
                    'public/components/chat/scripts/chat.component.js',
                    'public/components/dialogs/scripts/service.dialog.js',
                    'public/components/dialogs/scripts/controller.dialog.js',
                    'public/components/dialogs/scripts/directive.dialog.js',

                    'public/components/user/scripts/service.user.js',
                    'public/components/user/scripts/controller.user.js',
                    'public/components/user/scripts/directive.user.js',
                    'public/components/comment/scripts/service.comment.js',
                    'public/components/comment/scripts/comment-list.component.js',
                    'public/components/storeSetting/scripts/store-seller.service.js',
                    'public/components/storeSetting/scripts/component.storeSetting.js',
                    'public/components/directives/directive.focus-element.js',
                    'public/components/directives/directive.select-drop-down.js',
                    'public/components/paginator/scripts/component.paginator.js',
                    'public/components/directives/directive.lost-focus.js',
                    'public/components/directives/ng-autocomplite-city.directive.js',

                    'public/scripts/service.brandcollections.js',
                    'public/scripts/service.anchorSmoothScroll.js',
                    'public/components/services/service.print.js',
                    'public/scripts/directive.datePicker.js',
                    'public/scripts/directive.editNote.js',
                    'public/components/ORDERS/online/scripts/online.service.js',
                    'public/components/ORDERS/online/scripts/online-list.component.js',
                    'public/components/CONTENT/master/scripts/master.service.js',
                    'public/components/PROMO/coupon/scripts/coupon.service.js',
                    'public/components/call/scripts/directive.call.js',
                    'public/components/externalCatalog/externalCatalog.component.js',
                    'public/scripts/globalVariable.js',
                    'public/components/CONTENT/workplace/scripts/workplace-list.component.js',
                ],
                dest: 'public/order.scripts.js'

            },
            content: {
                src: [
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru.js',
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru-ru.js',
                    'public/bower_components/angular-1.6.4/i18n/angular-locale_ru-ua.js',
                    'public/scripts/myPrototype.js',
                    'public/scripts/angular-node.js',
                    'public/modules/content/js/app.js',
                    'public/modules/content/js/directives.js',
                    'public/modules/content/js/controllers.js',
                    'public/modules/content/js/services.js',
                    'public/modules/content/js/filters.js',
                    'public/components/sign-login/scripts/sign-login.component.js',
                    'public/components/directives/check-password-match.directive.js',
                    'public/components/services/factory.exeption.js',
                    'public/components/services/confirm.factory.js',
                    "public/components/services/interceptor.factory.js",
                    "public/components/storeSetting/scripts/store-seller.service.js",
                    "public/components/sections/scripts/service.sections.js",
                    'public/components/sections/scripts/category.service.js',
                    'public/components/sections/scripts/directive.sections.js',
                    'public/components/brand/scripts/service.brands.js',
                    'public/components/brand/scripts/directive.brands.js',
                    'public/components/stuff/scripts/controller.stuff.js',
                    'public/components/stuff/scripts/stuff.service.js',
                    'public/components/stuff/scripts/stuff-list.component.js',
                    'public/components/stuff/scripts/directive.stuffEdit.js',
                    'public/components/stuff/scripts/directive.stuffsAdminListWithPaginate.js',
                    'public/components/stuff/scripts/directive.filterForStuffs.js',
                    'public/components/menu/scripts/directive.menu.js',
                    'public/components/filters/scripts/service.filters.js',
                    'public/components/filters/scripts/filterTags.service.js',
                    'public/components/filters/scripts/directive.filters.js',
                    'public/scripts/service.global.js',
                    'public/scripts/service.helper.js',
                    'public/scripts/service.email.js',
                    'public/components/services/service.print.js',
                    'public/components/order/scripts/service.order.js',
                    'public/components/order/scripts/order.service.js',
                    'public/components/order/scripts/cart-in-order.service.js',
                    'public/components/cart/scripts/cart.component.js',
                    'public/components/notification/scripts/service.notification.js',
                    'public/components/user/scripts/service.user.js',

                    'public/components/directives/directive.focus-element.js',
                    'public/components/directives/directive.select-drop-down.js',
                    'public/components/paginator/scripts/component.paginator.js',
                    'public/components/directives/directive.lost-focus.js',
                    'public/components/directives/ng-autocomplite-city.directive.js',
                    'public/scripts/service.brandcollections.js',
                    'public/scripts/service.anchorSmoothScroll.js',
                    'public/components/PROMO/coupon/scripts/coupon.service.js',
                    'public/components/externalCatalog/externalCatalog.component.js',


                    'public/components/slideMenu/scripts/directive.slideMenu.js',
                    'public/components/selectCategoryModal/scripts/controller.selectCategoryModal.js',
                    'public/components/selectCategoryModal/scripts/service.selectCategoryModal.js',
                    'public/components/growlNotification/scripts/directive.growlNotification.js',
                    'public/components/backToTop/scripts/directive.back-to-top.js',
                    'public/components/loadImage/scripts/directive.loadImage.js',
                    'public/components/loadImage/scripts/service.fileUpload.js',
                    'public/components/checklistmodel/scripts/directive.checklist.js',
                    'public/components/bindModelToCategory/scripts/directive.bindModelToCategory.js',
                    'public/components/directives/mongoose-error.component.js',



                    'public/components/choiceUser/directive.js',
                    'public/components/paps/scripts/paps.service.js',
                    'public/components/paps/scripts/pap.component.js',
                    'public/components/paps/scripts/paps.component.js',
                    'public/components/info/scripts/info.service.js',
                    'public/components/info/scripts/info-list.component.js',
                    'public/components/info/scripts/info-item.component.js',
                    'public/components/createStuff/scripts/component.createStuff.js',
                    'public/components/sortsOfStuff/scripts/component.sortsOfStuff.js',
                    'public/components/categoriesForList/scripts/component.categoriesForList.js',
                    'public/components/filterStuffsList/scripts/component.filterStuffsList.js',
                    'public/components/editModel/scripts/edit-model.component.js',
                    'public/components/services/seo-content.service.js',


                    'public/components/additionalInfo/scripts/component.additionalInfo.js',
                    'public/components/staticPage/scripts/component.staticPage.js',
                    'public/components/staticPage/scripts/staticPages.component.js',
                    'public/components/staticPage/scripts/staticPage.service.js',
                    'public/components/CONTENT/additional/scripts/component.additional.js',
                    'public/components/CONTENT/additional/scripts/additionals.component.js',
                    'public/components/CONTENT/additional/scripts/additional.service.js',
                    'public/components/homePage/scripts/component.homePage.js',
                    'public/components/selectStuffModal/scripts/component.selectStuffModal.js',
                    'public/components/createLink/scripts/create-link.component.js',

                    'public/components/news/scripts/component.newsList.js',
                    'public/components/news/scripts/component.newsItem.js',
                    'public/components/news/scripts/service.news.js',
                    'public/components/lookbook/scripts/component.lookbookList.js',
                    'public/components/lookbook/scripts/component.lookbookItem.js',
                    'public/components/lookbook/scripts/lookbook.service.js',
                    'public/components/CONTENT/master/scripts/master.service.js',
                    'public/components/CONTENT/master/scripts/master-list.component.js',
                    'public/components/CONTENT/master/scripts/master-item.component.js',

                    'public/components/CONTENT/groupStuffs/scripts/groupStuffs.service.js',
                    'public/components/CONTENT/groupStuffs/scripts/groupStuffs-list.component.js',
                    'public/components/CONTENT/groupStuffs/scripts/groupStuffs-item.component.js',
                    'public/components/CONTENT/workplace/scripts/workplace-list.component.js',



                    'public/components/PROMO/campaign/scripts/campaign.service.js',
                    'public/components/blocks/scripts/blocks.components.js',
                    'public/components/setStyles/scripts/setStyles.component.js',
                    'public/components/call/scripts/directive.call.js',
                    'public/components/help/scripts/help.component.js',
                    'public/components/call/scripts/directive.call.js',
                    'public/scripts/globalVariable.js',
                ],
                dest: 'public/content.scripts.js'

            },
            mobile:{
                src: [
                    'public/mobile/scripts/app.js',
                    'public/mobile/scripts/controllers.js',
                    'public/mobile/scripts/services.js',
                    'public/mobile/scripts/directives.js',
                    'public/mobile/scripts/filters.js',             
                    'public/mobile/scripts/modules.js',
                    'public/scripts/lazyImg.js'
                ],
                dest: 'public/scripts.mobile.js'

            },
            elastislide:{
                src:['public/assets/elastislide/js/modernizr.custom.17475.js',
                    'public/assets/elastislide/js/jquerypp.custom.js',
                    'public/assets/elastislide/js/jquery.elastislide.js'],
                dest:'public/elastislide.js'
            },
            manager_dop:{
                src:['public/bower_components/select2/select2.js',
                    'public/bower_components/angular-ui-sortable/sortable.min.js',
                    'public/bower_components/angular-ui-select2/src/select2.js',
                    'public/bower_components/angular-cookies/angular-cookies.js',
                    'public/bower_components/jquery-ui/jquery-ui.min.js',
                    'public/bower_components/ng-tasty/ng-tasty-tpls.min.js'],
                dest:'public/manager_dop.js'
            },
            manager: {
                src: [
                    'public/manager/scripts/app.js',
                    'public/manager/scripts/modules.js',
                    'public/manager/scripts/services.js',
                    'public/manager/scripts/controllers.js',
                    'public/manager/scripts/controllers/witget.js',                
                    'public/manager/scripts/filters.js',
                    'public/manager/scripts/directives.js',
                    'public/manager/scripts/i-orders.js',

                    'public/bower_components/json-edit/js/directives.js',
                    'public/bower_components/underscore/underscore.js'
                    
                ],
                dest: 'public/scripts.manager.js'

            },

            bower: {
                src: [
                    'public/assets/angular-social/angular-social.js',
                    'public/bower_components/angular-socket-io/socket.js',
                    'public/bower_components/AngularJS-Toaster/toaster.min.js',
                    'public/assets/ng-pageslide-master/dist/angular-pageslide-directive.js',
                    'public/bower_components/angular-click-outside/clickoutside.directive.js',
                    'public/bower_components/angular-recaptcha/release/angular-recaptcha.min.js',
                    'public/assets/owl2/owl.carousel.min.js',
                    'public/bower_components/angular-ui-mask/dist/mask.min.js',
                    'public/bower_components/angularjs-slider/dist/rzslider.js',
                    'public/assets/jquery.hammer.min.js',
                    'public/assets/google-places/google-places.js',
                    'public/assets/nivoslider/jquery.nivo.slider.js',
                    //'public/bower_components/jszip/dist/jszip.min.js',
                ],
                dest: 'public/dev_scripts.js'
            },
            orderdev: {
                src: [
                    'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'public/bower_components/arrive/src/arrive.js',
                    'public/bower_components/bootstrap-material-design/dist/js/material.js',
                    'public/bower_components/bootstrap-material-design/dist/js/ripples.min.js',
                    'public/assets/jquery.dropdown.js',
                    'public/bower_components/angular-socket-io/socket.js',
                    'public/bower_components/angular-cookies/angular-cookies.js',
                    'public/bower_components/angular-touch/angular-touch.js',
                    'public/bower_components/angular-ui-mask/dist/mask.min.js',
                    'public/bower_components/AngularJS-Toaster/toaster.min.js',
                    'public/bower_components/bootstrap-daterangepicker/daterangepicker.js',
                    'public/bower_components/angular-daterangepicker/js/angular-daterangepicker.js',
                    'public/scripts/angular-drag-and-drop-lists.js',
                    'public/bower_components/angularjs-slider/dist/rzslider.min.js',
                    //'public/bower_components/jszip/dist/jszip.min.js',


                ],
                dest: 'public/orderdev_scripts.js'
            },
            contentdev: {
                src: [
                    'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'public/bower_components/arrive/src/arrive.js',
                    'public/bower_components/bootstrap-material-design/dist/js/material.js',
                    'public/bower_components/bootstrap-material-design/dist/js/ripples.min.js',
                    'public/assets/jquery.dropdown.js',
                    'public/bower_components/angular-socket-io/socket.js',
                    'public/bower_components/angular-cookies/angular-cookies.js',
                    'public/bower_components/angular-touch/angular-touch.js',
                    'public/bower_components/angular-ui-mask/dist/mask.min.js',
                    'public/bower_components/AngularJS-Toaster/toaster.min.js',
                    'public/bower_components/bootstrap-daterangepicker/daterangepicker.js',
                    'public/bower_components/angular-daterangepicker/js/angular-daterangepicker.js',
                    'public/scripts/angular-drag-and-drop-lists.js',
                    'public/assets/jquery.nicescroll/jquery.nicescroll.js',
                    'public/bower_components/angular-hint/dist/hint.js',
                    'public/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
                    'public/bower_components/AngularJS-Toaster/toaster.min.js',
                    'public/bower_components/intro.js/minified/intro.min.js',
                    'public/bower_components/angular-intro.js/src/angular-intro.js',
                    'public/bower_components/angular-circular-navigation/angular-circular-navigation.js',

                    'public/bower_components/textAngular/dist/textAngular-rangy.min.js',
                    'public/bower_components/textAngular/src/textAngular-sanitize.js',
                    'public/bower_components/textAngular/dist/textAngular.min.js',
                    /*'public/bower_components/textAngularTable/textAngular-rangy.min.js',
                    'public/bower_components/textAngularTable/textAngular-sanitize.js',
                    'public/bower_components/textAngularTable/textAngular.min.js',*/

                    'public/assets/ng-pageslide-master/dist/angular-pageslide-directive.js',
                    'public/bower_components/angular-click-outside/clickoutside.directive.js',
                    'public/bower_components/angularjs-slider/dist/rzslider.min.js',
                    'public/bower_components/angular-ui-tinymce/src/tinymce.js',
                    //'public/bower_components/jszip/dist/jszip.min.js',
                ],
                dest: 'public/contentdev_scripts.js'
            },
            bowerCrawler164: {
                src: [
                    'public/bower_components/jquery/dist/jquery.min.js',
                    'public/bower_components/angular-1.6.4/angular.min.js',
                    'public/bower_components/angular-1.6.4/angular-touch.min.js',
                    'public/bower_components/angular-1.6.4/angular-animate.min.js',
                    'public/bower_components/angular-1.6.4/angular-route.min.js',
                    'public/bower_components/angular-1.6.4/angular-resource.min.js',
                    'public/bower_components/angular-1.6.4/angular-sanitize.min.js',
                    'public/bower_components/angular-1.6.4/angular-messages.min.js',
                    'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
                    'node_modules/@uirouter/angularjs/release/stateEvents.min.js',
                    'public/bower_components/angular-ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js',
                    'public/bower_components/momentjs/min/moment-with-locales.min.js',
                    'public/assets/ui-select-master/dist/select.min.js',
                    'public/bower_components/satellizer/satellizer.min.js',

                ],
                dest: 'public/crawler.scripts164.min.js'
            },
            bowerCrawler: {
                src: [
                    'public/bower_components/jquery/dist/jquery.min.js',
                    'public/bower_components/angular/angular.min.js',
                    'public/bower_components/angular-touch/angular-touch.min.js',
                    'public/bower_components/angular-animate/angular-animate.min.js',
                    'public/bower_components/angular-route/angular-route.min.js',
                    'public/bower_components/angular-resource/angular-resource.min.js',
                    'public/bower_components/angular-sanitize/angular-sanitize.min.js',
                    'public/bower_components/angular-messages/angular-messages.min.js',
                    'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'public/bower_components/angular-ui-bootstrap/ui-bootstrap-tpls-0.14.3.min.js',
                    'public/bower_components/momentjs/min/moment-with-locales.min.js',
                    'public/assets/ui-select-master/dist/select.min.js',
                    'public/bower_components/satellizer/satellizer.min.js',

                ],
                dest: 'public/crawler.scripts.min.js'
            },
            bowerMobile: {
                src: [
                    //'public/bower_components/jquery/jquery.min.js',
                    'public/bower_components/angular/angular.min.js',
                    'public/bower_components/angular-route/angular-route.min.js',
                    'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'public/bower_components/angular-resource/angular-resource.min.js',
                    'public/bower_components/angular-touch/angular-touch.min.js',
                    'public/bower_components/angular-sanitize/angular-sanitize.min.js',
                    'public/assets/angular-social/angular-social.js',
                    'public/bower_components/angular-animate/angular-animate.min.js',
                    'public/bower_components/angular-ui-bootstrap/ui-bootstrap-tpls-0.14.3.min.js'
                ],
                dest: 'public/dev_scripts.mobile.min.js'
            },
            end: {
                src: [
                    'public/crawler.scripts164.min.js','public/dev_scripts.min.js','public/scripts.min.js',

                    //'js/mylibs/**/*.js'  // Все JS-файлы в папке
                ],
                dest: 'public/all_scripts.min.js'
            },
            endorder: {
                src: [
                    'public/crawler.scripts.min.js','public/orderdev_scripts.min.js','public/order.scripts.min.js',
                ],
                dest: 'public/allorder_scripts.min.js'
            },
            endcontent: {
                src: [
                    'public/crawler.scripts.min.js','public/contentdev_scripts.min.js','public/content.scripts.min.js',
                ],
                dest: 'public/allcontent_scripts.min.js'
            },
             endMobile: {
                src: [
                    'public/dev_scripts.mobile.min.js','public/scripts.mobile.min.js'
                ],
                dest: 'public/all_scripts.mobile.min.js'
            },
            endManager: {
                src: [
                    'public/dev_scripts.min.js','public/manager_dop.min.js','public/scripts.manager.min.js'
                    //'js/mylibs/**/*.js'  // Все JS-файлы в папке
                ],
                dest: 'public/all_scripts.manager.min.js'
            }

        },
        comments: {
            js: {
                // Target-specific file lists and/or options go here.
                options: {
                    singleline: true,
                    multiline: true,
                    keepSpecialComments: false
                },
                src: [ 'public/crawler.scripts164.min.js'] // files to remove comments from
            },
        },

        // Сжимаем
        uglify: {

            options: {
                mangle: false
            },
            build: {
                files: {
                    // Результат задачи concat
                    'public/dev_scripts.min.js': 'public/dev_scripts.js',
                    'public/scripts.min.js': '<%= concat.build.dest %>',
                }
            },
            order: {
                files: {
                    // Результат задачи concat
                    'public/orderdev_scripts.min.js': 'public/orderdev_scripts.js',
                    'public/order.scripts.min.js': '<%= concat.order.dest %>',
                }
            },
            content: {
                files: {
                    // Результат задачи concat
                    'public/contentdev_scripts.min.js': 'public/contentdev_scripts.js',
                    'public/content.scripts.min.js': '<%= concat.content.dest %>',
                }
            }
        },
        compress: {
            order: {
                src: ['public/allorder_scripts.min.js'],
                dest: 'public/allorder_scripts.min.js.gz'
            },
            ordercss: {
                src: ['public/order.min.css'],
                dest: 'public/order.min.css.gz'
            },
            content: {
                src: ['public/allcontent_scripts.min.js'],
                dest: 'public/allcontent_scripts.min.js.gz'
            },
            contentcss: {
                src: ['public/content.min.css'],
                dest: 'public/content.min.css.gz'
            },
            bild: {
                src: ['public/all_scripts.min.js'],
                dest: 'public/all_scripts.min.js.gz'
            },
            bildcss: {
                src: ['public/allstyles.min.css'],
                dest: 'public/allstyles.min.css.gz'
            }
        },

        cssmin: {
            build: {

                files: {
                 'public/devstyles.min.css': [
                     'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
                     //'public/bower_components/bootstrap-4.0.0/dist/css/bootstrap-grid.min.css',
                     'public/bower_components/font-awesome/css/font-awesome.min.css',
                     //'public/assets/angular-social/angular-social.css',
                     'public/assets/owl2/owl.carousel.min.css',
                     'public/assets/owl2/owl.theme.default.min.css',
                     //'public/assets/elastislide/css/elastislide.css',
                     'public/styles/animate.css',
                     'public/bower_components/intro.js/minified/introjs.min.css',
                     'public/bower_components/AngularJS-Toaster/toaster.min.css',
                     'public/assets/ui-select-master/dist/select.css',
                     'public/assets/ui-select-master/dist/selectize.default.css',
                     'public/bower_components/angularjs-slider/dist/rzslider.css',
                     'public/assets/google-places/google-places.css',
                     'public/assets/nivoslider/nivo-slider.css'
                 ]}
            },
            bildComponents:{
                files: {
                    'public/components.min.css': [
                        'public/views/template/css/style.css',
                        //'public/views/template/partials/stuffDetail/modal/css/zoom.css',
                        //'public/views/template/css/chat-slide.css',
                        //'public/components/TEMPLATE/dateTimeEntry/dateTimeEntry.css',
                        //'public/views/template/partials/campaign/campaign.css'
                    ]}
            },
            buildAll: {

                files: {
                    'public/allstyles.min.css': [
                        'public/devstyles.min.css',
                        'public/components.min.css',
                    ]}
            },
            order: {

                files: {
                    'public/order.min.css': [
                    'public/assets/fonts.googleapis.com.css',
                    'public/assets/icon.css',
                    'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'public/assets/jquery.dropdown.css',
                    'public/assets/ui-select-master/dist/select.css',
                    'public/assets/ui-select-master/dist/selectize.default.css',
                    'public/bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.css',
                    'public/bower_components/bootstrap-material-design/dist/css/ripples.min.css',
                    'public/bower_components/bootstrap-daterangepicker/daterangepicker.css',
                    'public/bower_components/AngularJS-Toaster/toaster.min.css',
                    'public/modules/order/css/order.css',
                    'public/components/paginator/css/component.paginator.css',
                    'public/components/user/css/component.loginModal.css',
                    'public/components/dialogs/css/component.dialogs.css',
                    'public/components/notification/css/component.notification.css',
                    'public/components/chat/css/component.chat.css',
                    'public/components/order/css/component.order.css',
                    'public/components/comment/comments-list.css',
                    'public/components/storeSetting/css/component.currency.css',
                    'public/components/brand/css/component.selectBrandTag.css',
                    'public/components/sections/css/component.sectionSelectCategoryModal.css',
                    'public/components/ORDERS/online/css/onlineList.css',
                    'public/components/ORDERS/online/css/selectServise.css',
                    'public/bower_components/angularjs-slider/dist/rzslider.css',
                    'public/components/ORDERS/online/css/onlineListMobile.css',
                    'public/components/ORDERS/online/css/schedule.css'
                    ]}
            },
            content: {
                files: {
                    'public/content.min.css': [
                        'public/bower_components/font-awesome/css/font-awesome.css',
                        'public/assets/icon.css',
                        'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'public/assets/jquery.dropdown.css',
                        'public/assets/ui-select-master/dist/select.css',
                        'public/assets/ui-select-master/dist/selectize.default.css',
                        'public/bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.css',
                        'public/bower_components/bootstrap-material-design/dist/css/ripples.min.css',
                        'public/bower_components/bootstrap-daterangepicker/daterangepicker.css',
                        'public/bower_components/AngularJS-Toaster/toaster.min.css',
                        'public/bower_components/textAngular/dist/textAngular.css',
                        'public/bower_components/angular-bootstrap-colorpicker/css/colorpicker.min.css',
                        'public/assets/animate.css/animate.css',
                        'public/modules/content/css/content.css',
                        'public/bower_components/angular-circular-navigation/angular-circular-navigation.css',
                        'public/bower_components/angularjs-slider/dist/rzslider.min.css',
                        'public/components/paginator/css/component.paginator.css',
                        'public/components/sections/css/component.sections.css',
                        'public/components/sections/css/component.categoryEdit.css',
                        'public/components/sections/css/component.section.selectCategoryModal.css',
                        'public/components/sections/css/component.sectionSelectSubsectionModal.css',
                        'public/components/filters/css/component.filters.css',
                        'public/components/filters/css/component.bindFilterTagToModel.css',
                        'public/components/filters/css/component.tagEdit.css',
                        'public/components/menu/css/component.menu.css',
                        'public/components/paps/css/component.papsList.css',
                        'public/components/paps/css/component.papsItem.css',
                        'public/components/TEMPLATE/slider/component.slider.css',
                        'public/components/loadImage/css/component.loadImage.css',
                        'public/components/stuff/css/component.stuffAdmin.css',
                        'public/components/stuff/css/component.stuffEdit.css',
                        'public/components/stuff/css/component.modalStuff.css',
                        'public/components/categoriesForList/css/component.categoriesForList.css',
                        'public/components/growlNotification/css/style.growlNotification.css',
                        'public/components/backToTop/css/style.backToTop.css',
                        'public/components/slideMenu/css/style.slideMenu.css',
                        'public/components/circleMenu/css/style.circleMenu.css',
                        'public/components/selectCategoryModal/css/categoryToFilter.css',
                        'public/components/selectCategoryModal/css/selectCategoryModal.css',
                        'public/components/editModel/css/editModel.css',
                        'public/components/selectCategoryModal/css/selectBrandModal.css',
                        'public/components/selectCategoryModal/css/selectBrandTagModal.css',
                        'public/components/selectCategoryModal/css/selectFilterModal.css',
                        'public/components/sortsOfStuff/css/addInfo.css',
                        'public/components/brand/css/component.brands.css',
                        'public/components/brand/css/component.collectionEdit.css',
                        'public/components/brand/css/component.selectBrandTag.css',
                        'public/components/sortsOfStuff/css/component.sortsOfStuff.css',
                        'public/components/createStuff/css/component.createStuff.css',
                        'public/components/filterStuffsList/css/component.filterStuffsList.css',
                        'public/components/staticPage/css/component.staticPage.css',
                        'public/components/staticPage/css/component.staticPageEdit.css',
                        'public/components/staticPage/css/component.staticSelectItem.css',
                        'public/components/CONTENT/additional/css/component.additional.css',
                        'public/components/CONTENT/additional/css/component.additionalEdit.css',
                        'public/components/homePage/css/component.homePage.css',
                        'public/components/homePage/css/component.homePage.editSlide.css',
                        'public/components/CONTENT/master/css/component.masterList.css',
                        'public/components/CONTENT/master/css/component.masterItem.css',
                        'public/components/lookbook/css/component.lookbook.css',
                        'public/components/lookbook/css/component.lookbookItem.css',
                        'public/components/lookbook/css/createLookbook.css',
                        'public/components/news/css/component.news.css',
                        'public/components/news/css/component.createNews.css',
                        'public/components/news/css/component.newsItem.css',
                        'public/components/news/css/component.viewEmail.css',
                        'public/components/sign-login/css/component.sign-login.css',
                        'public/components/user/css/component.loginModal.css',
                        'public/components/info/css/info.component.css',
                        'public/views/template/partials/stuffDetail/modal/css/zoom.css',
                    ]}
            },

        }








    });

// define the tasks
    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        [  'cssmin:build','cssmin:bildComponents','cssmin:buildAll','compress:bildcss']//, 'clean:stylesheets'
    );

    grunt.registerTask(
        'scripts',
        'Compiles the JavaScript files.',
        ['concat:build','concat:bower','concat:bowerCrawler164','uglify:build','concat:end','compress:bild','stylesheets']//
    );

    grunt.registerTask(
        'bildscripts',
        'Compiles the JavaScript files.',
        ['concat:build','uglify:build','concat:end','compress:bild']//
    );

    // **********************************************************************order
    grunt.registerTask(
        'scriptsfullorder',
        'Compiles the JavaScript files.',
        ['concat:orderdev','concat:bowerCrawler','concat:order','uglify:order','concat:endorder','cssmin:order','compress:order','compress:ordercss']//
    );
    grunt.registerTask(
        'scriptsorder',
        'Compiles the JavaScript files.',
        ['concat:order','uglify:order','concat:endorder','cssmin:order','compress:order','compress:ordercss']//
    );


    grunt.registerTask(
        'buildfullorder',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'scriptsfullorder']
    );
    grunt.registerTask(
        'buildorder',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'scriptsorder']
    );

//************************************************************************
    // **********************************************************************content
    grunt.registerTask(
        'scriptsfullcontent',
        'Compiles the JavaScript files.',
        ['concat:contentdev','concat:bowerCrawler','concat:content','uglify:content','concat:endcontent','cssmin:content','compress:content','compress:contentcss']//
    );
    grunt.registerTask(
        'scriptscontent',
        'Compiles the JavaScript files.',
        ['concat:content','uglify:content','concat:endcontent','cssmin:content','compress:content','compress:contentcss']//
    );


    grunt.registerTask(
        'buildfullcontent',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'scriptsfullcontent']
    );
    grunt.registerTask(
        'buildcontent',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'scriptscontent']
    );

//************************************************************************
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'scripts','stylesheets']
           // ,'stylesheets', 'scripts', 'jade' ]
    );





    grunt.registerTask('scripts', function (target) {

        grunt.task.run([
            'bildscripts'
        ]);
    });
    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'build'
        ]);
    });
    grunt.registerTask('css', function (target) {

        grunt.task.run([
            'stylesheets'
        ]);
    });


    grunt.registerTask('orderfull', function (target) {
        grunt.task.run([
            'buildfullorder'
        ]);
    });

    grunt.registerTask('order', function (target) {
        grunt.task.run([
            'buildorder'
        ]);
    });
    grunt.registerTask('contentfull', function (target) {
        grunt.task.run([
            'buildfullcontent'
        ]);
    });

    grunt.registerTask('content', function (target) {
        grunt.task.run([
            'buildcontent'
        ]);
    });


};