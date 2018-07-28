function template(a,b,c){"use strict";return a.replace(/\{([^\}]+)\}/g,function(a,d){return d in b?c?c(b[d]):b[d]:a})}var app=angular.module("ngSocial",[]);app.directive("ngSocialButtons",["$compile","$q","$parse","$http","$location",function(a,b,c,d,e){"use strict";return{restrict:"A",scope:{url:"=",title:"=",description:"=",image:"=",showcounts:"="},replace:!0,transclude:!0,template:'<div class="ng-social-container ng-cloak"><ul class="ng-social" ng-transclude></ul></div>',controller:["$scope","$q","$http",function(a,b,c){var d=function(){return a.url||e.absUrl()},f=this;return this.init=function(a,b,c){c.counter&&f.getCount(a.options).then(function(b){a.count=b})},this.link=function(b){b=b||{};var c=b.urlOptions||{};return c.url=d(),c.title||(c.title=a.title),c.image||(c.image=a.image),c.description||(c.description=a.description||""),f.makeUrl(b.clickUrl||b.popup.url,c)},this.clickShare=function(b,c){if(!b.shiftKey&&!b.ctrlKey){b.preventDefault(),c.track&&"undefined"!=typeof _gaq&&angular.isArray(_gaq)&&_gaq.push(["_trackSocial",c.track.name,c.track.action,a.url]);var d=!0;if(angular.isFunction(c.click)&&(d=c.click.call(this,c)),d){var e=f.link(c);f.openPopup(e,c.popup)}}},this.openPopup=function(a,b){var c=Math.round(screen.width/2-b.width/2),d=0;screen.height>b.height&&(d=Math.round(screen.height/3-b.height/2));var e=window.open(a,"sl_"+this.service,"left="+c+",top="+d+",width="+b.width+",height="+b.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");e?e.focus():location.href=a},this.getCount=function(e){var g=b.defer(),h=e.urlOptions||{};h.url=d(),h.title||(h.title=a.title);var i=f.makeUrl(e.counter.url,h),j=angular.isUndefined(a.showcounts)?!0:a.showcounts;return j&&(e.counter.get?e.counter.get(i,g,c):c.jsonp(i).success(function(a){g.resolve(e.counter.getNumber?e.counter.getNumber(a):a)})),g.promise},this.makeUrl=function(a,b){return template(a,b,encodeURIComponent)},this}]}}]),app.directive("ngSocialFacebook",["$parse",function(a){"use strict";var b={counter:{url:"//graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=JSON_CALLBACK",getNumber:function(a){return 0===a.data.length?0:a.data[0].total_count}},popup:{url:"http://www.facebook.com/sharer/sharer.php?u={url}",width:600,height:500},track:{name:"facebook",action:"send"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li><a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"><span class="ng-social-icon"></span><span class="ng-social-text" ng-transclude></span></a><span ng-show="count" class="ng-social-counter">{{ count }}</span></li>',link:function(c,d,e,f){d.addClass("ng-social-facebook"),f&&(b.urlOptions={url:a(e.url)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),app.directive("ngSocialTwitter",["$parse",function(a){"use strict";var b={counter:{url:"//urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK",getNumber:function(a){return a.count}},popup:{url:"http://twitter.com/intent/tweet?url={url}&text={title}",width:600,height:450},click:function(a){return/[\.:\-–—]\s*$/.test(a.pageTitle)||(a.pageTitle+=":"),!0},track:{name:"twitter",action:"tweet"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-twitter"),f&&(b.urlOptions={url:a(e.url)(c),title:a(e.title)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),app.directive("ngSocialGooglePlus",["$parse",function(a){"use strict";var b={counter:{url:"//share.yandex.ru/gpp.xml?url={url}",getNumber:function(a){return a.count},get:function(a,c,d){return b._?void c.reject():(window.services||(window.services={}),window.services.gplus={cb:function(a){b._.resolve(a)}},b._=c,void d.jsonp(a))}},popup:{url:"https://plus.google.com/share?url={url}",width:700,height:500},track:{name:"Google+",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-google-plus"),f&&(b.urlOptions={url:a(e.url)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),app.directive("ngSocialVk",["$parse",function(a){"use strict";var b={counter:{url:"//vkontakte.ru/share.php?act=count&url={url}&index={index}",get:function(a,c,d){b._||(b._=[],window.VK||(window.VK={}),window.VK.Share={count:function(a,c){b._[a].resolve(c)}});var e=b._.length;b._.push(c),d.jsonp(a.replace("{index}",e))}},popup:{url:"http://vk.com/share.php?url={url}&title={title}&description={description}&image={image}",width:550,height:330},track:{name:"VKontakte",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-vk"),f&&(b.urlOptions={url:a(e.url)(c),title:a(e.title)(c),description:a(e.description)(c),image:a(e.image)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),angular.module("ngSocial").directive("ngSocialOdnoklassniki",["$parse",function(a){var b={counter:{url:"http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",get:function(a,c,d){b._||(b._=[],window.ODKL||(window.ODKL={}),window.ODKL.updateCount=function(a,c){b._[a].resolve(c)});var e=b._.length;b._.push(c),d.jsonp(a.replace("{index}",e))}},popup:{url:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",width:550,height:360},track:{name:"Odnoklassniki",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-odnoklassniki"),f&&(b.urlOptions={url:a(e.url)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),angular.module("ngSocial").directive("ngSocialMailru",["$parse",function(a){var b={counter:{url:"//connect.mail.ru/share_count?url_list={url}&callback=1&func=JSON_CALLBACK",getNumber:function(a){for(var b in a)if(a.hasOwnProperty(b))return a[b].shares}},popup:{url:"http://connect.mail.ru/share?share_url={url}&title={title}",width:550,height:360}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-mailru"),f&&(b.urlOptions={url:a(e.url)(c),title:a(e.title)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),angular.module("ngSocial").directive("ngSocialPinterest",["$parse",function(a){var b={counter:{url:"//api.pinterest.com/v1/urls/count.json?url={url}&callback=JSON_CALLBACK",getNumber:function(a){return a.count}},popup:{url:"http://pinterest.com/pin/create/button/?url={url}&description={title}&media={image}",width:630,height:270}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-pinterest"),f&&(b.urlOptions={url:a(e.url)(c),title:a(e.title)(c),image:a(e.image)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),angular.module("ngSocial").directive("ngSocialGithubForks",function(){var a={counter:{url:"//api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK",getNumber:function(a){return a.data.forks_count}},clickUrl:"https://github.com/{user}/{repository}/"};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(b,c,d,e){c.addClass("ng-social-github ng-social-github-forks"),e&&(a.urlOptions={user:d.user,repository:d.repository},b.options=a,b.ctrl=e,e.init(b,c,a))}}}),angular.module("ngSocial").directive("ngSocialGithub",function(){var a={counter:{url:"//api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK",getNumber:function(a){return a.data.watchers_count}},clickUrl:"https://github.com/{user}/{repository}/"};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(b,c,d,e){c.addClass("ng-social-github"),e&&(a.urlOptions={user:d.user,repository:d.repository},b.options=a,b.ctrl=e,e.init(b,c,a))}}}),app.directive("ngSocialStumbleupon",["$parse",function(a){"use strict";var b={counter:{url:"{proxy}?url={url}&type=stumbleupon&callback=JSON_CALLBACK",getNumber:function(a){return a.count}},popup:{url:"http://www.stumbleupon.com/submit?url={url}&title={title}",width:800,height:600},track:{name:"StumbleUpon",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){if(d.addClass("ng-social-google-plus"),f){b.urlOptions={url:a(e.url)(c),title:a(e.title)(c)};var g=a(e.proxyUrl)(c)||"/proxy.php";b.counter.url=b.counter.url.replace("{proxy}",g),c.options=b,c.ctrl=f,f.init(c,d,b)}}}}]),app.directive("ngSocialMoiKrug",["$parse",function(a){"use strict";var b={popup:{url:"//share.yandex.ru/go.xml?service=moikrug&url={url}&title={title}",width:800,height:600},track:{name:"MoiKrug",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-moi-krug"),f&&(b.urlOptions={url:a(e.url)(c),title:a(e.title)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),app.directive("ngSocialLinkedin",["$parse",function(a){"use strict";var b={counter:{url:"//www.linkedin.com/countserv/count/share?url={url}&format=jsonp&callback=JSON_CALLBACK",getNumber:function(a){return a.count}},popup:{url:"http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}",width:600,height:450},click:function(a){return/[\.:\-–—]\s*$/.test(a.pageTitle)||(a.pageTitle+=":"),!0},track:{name:"LinkedIn",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li> \r\n                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \r\n                        <span class="ng-social-icon"></span> \r\n                        <span class="ng-social-text" ng-transclude></span> \r\n                    </a> \r\n                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \r\n                   </li>',link:function(c,d,e,f){d.addClass("ng-social-linkedin"),f&&(b.urlOptions={url:a(e.url)(c),title:a(e.title)(c),description:a(e.description)(c)},c.options=b,c.ctrl=f,f.init(c,d,b))}}}]),angular.module("ngSocial").run(["$templateCache",function(a){a.put("/views/buttons.html",'<div class="ng-social-container ng-cloak"><ul class="ng-social" ng-transclude></ul></div>')}]);

/*
 * @license
 * angular-socket-io v0.7.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */

angular.module('btford.socket-io', []).
  provider('socketFactory', function () {

    'use strict';

    // when forwarding events, prefix the event name
    var defaultPrefix = 'socket:',
      ioSocket;

    // expose to provider
    this.$get = ['$rootScope', '$timeout', 'global',function ($rootScope, $timeout,global) {

      var asyncAngularify = function (socket, callback) {
        return callback ? function () {
          var args = arguments;
          $timeout(function () {
            callback.apply(socket, args);
          }, 0);
        } : angular.noop;
      };

      return function socketFactory (options) {
        //console.log(options)
        options = options || {};
        if(!options.host){
          options.host=socketHost
        }
        //console.log(options)
        var socket = options.ioSocket || io.connect(options.host);
        var prefix = options.prefix === undefined ? defaultPrefix : options.prefix ;
        var defaultScope = options.scope || $rootScope;

        var addListener = function (eventName, callback) {
          socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
        };

        var addOnceListener = function (eventName, callback) {
          socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
        };

        var wrappedSocket = {
          on: addListener,
          addListener: addListener,
          once: addOnceListener,

          emit: function (eventName, data, callback) {
            var lastIndex = arguments.length - 1;
            var callback = arguments[lastIndex];
            if(typeof callback == 'function') {
              callback = asyncAngularify(socket, callback);
              arguments[lastIndex] = callback;
            }
            return socket.emit.apply(socket, arguments);
          },

          removeListener: function (ev, fn) {
            if (fn && fn.__ng) {
              arguments[1] = fn.__ng;
            }
            return socket.removeListener.apply(socket, arguments);
          },

          removeAllListeners: function() {
            return socket.removeAllListeners.apply(socket, arguments);
          },

          disconnect: function (close) {
            return socket.disconnect(close);
          },

          connect: function() {
            return socket.connect();
          },

          // when socket.on('someEvent', fn (data) { ... }),
          // call scope.$broadcast('someEvent', data)
          forward: function (events, scope) {
            if (events instanceof Array === false) {
              events = [events];
            }
            if (!scope) {
              scope = defaultScope;
            }
            events.forEach(function (eventName) {
              var prefixedEvent = prefix + eventName;
              var forwardBroadcast = asyncAngularify(socket, function () {
                Array.prototype.unshift.call(arguments, prefixedEvent);
                scope.$broadcast.apply(scope, arguments);
              });
              scope.$on('$destroy', function () {
                socket.removeListener(eventName, forwardBroadcast);
              });
              socket.on(eventName, forwardBroadcast);
            });
          }
        };

        return wrappedSocket;
      };
    }];
  });

/*
 * AngularJS Toaster
 * Version: 0.4.16
 *
 * Copyright 2013-2015 Jiri Kavulak.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
 */
!function(){"use strict";angular.module("toaster",[]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).service("toaster",["$rootScope","toasterConfig",function(t,e){function o(t){return function(e,o,s,i,a,n,r,c,l,u){angular.isString(e)?this.pop(t,e,o,s,i,a,n,r,c,l,u):this.pop(angular.extend(e,{type:t}))}}this.pop=function(e,o,s,i,a,n,r,c,l,u,d){if(angular.isObject(e)){var p=e;this.toast={type:p.type,title:p.title,body:p.body,timeout:p.timeout,bodyOutputType:p.bodyOutputType,clickHandler:p.clickHandler,showCloseButton:p.showCloseButton,uid:p.toastId,onHideCallback:p.onHideCallback,directiveData:p.directiveData},l=p.toastId,r=p.toasterId}else this.toast={type:e,title:o,body:s,timeout:i,bodyOutputType:a,clickHandler:n,showCloseButton:c,uid:l,onHideCallback:u,directiveData:d};t.$emit("toaster-newToast",r,l)},this.clear=function(e,o){t.$emit("toaster-clearToasts",e,o)};for(var s in e["icon-classes"])this[s]=o(s)}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,i=[],a=[];return e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e,o){for(var s=0,a=i.length;a>s;s++)i[s](t,e,o)})),s||(s=t.$on("toaster-clearToasts",function(t,e,o){for(var s=0,i=a.length;i>s;s++)a[s](t,e,o)}))},subscribeToNewToastEvent:function(t){i.push(t)},subscribeToClearToastsEvent:function(t){a.push(t)},unsubscribeToNewToastEvent:function(t){var e=i.indexOf(t);e>=0&&i.splice(e,1),0===i.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=a.indexOf(t);e>=0&&a.splice(e,1),0===a.length&&(s(),s=null)}},{setup:e.setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("directiveTemplate",["$compile","$injector",function(t,e){return{restrict:"A",scope:{directiveName:"@directiveName",directiveData:"@directiveData"},replace:!0,link:function(o,s,i){o.$watch("directiveName",function(a){if(angular.isUndefined(a)||a.length<=0)throw new Error("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive");var n=e.has(i.$normalize(a)+"Directive");if(!n)throw new Error(a+" could not be found.");o.directiveData&&(o.directiveData=angular.fromJson(o.directiveData));var r=t("<div "+a+"></div>")(o);s.append(r)})}}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(t,e,o,s,i,a,n){return{replace:!0,restrict:"EA",scope:!0,link:function(e,r,c){function l(t,s){t.timeoutPromise=o(function(){e.removeToast(t.id)},s,1)}function u(o,i){if(o.type=m["icon-classes"][o.type],o.type||(o.type=m["icon-class"]),m["prevent-duplicates"]===!0)if(v(i)){if(e.toasters.length>0&&e.toasters[e.toasters.length-1].body===o.body)return}else{var a,n;for(a=0,n=e.toasters.length;n>a;a++)e.toasters[a].uid===i&&(d(a),a--,n=e.toasters.length)}o.id=++f,v(i)||(o.uid=i);var r=m["close-button"];if("boolean"==typeof o.showCloseButton);else if("boolean"==typeof r)o.showCloseButton=r;else if("object"==typeof r){var c=r[o.type];"undefined"!=typeof c&&null!==c&&(o.showCloseButton=c)}else o.showCloseButton=!1;switch(o.bodyOutputType=o.bodyOutputType||m["body-output-type"],o.bodyOutputType){case"trustedHtml":o.html=s.trustAsHtml(o.body);break;case"template":o.bodyTemplate=o.body||m["body-template"];break;case"templateWithData":var l=t(o.body||m["body-template"]),u=l(e);o.bodyTemplate=u.template,o.data=u.data;break;case"directive":o.html=o.body}e.configureTimer(o),m["newest-on-top"]===!0?(e.toasters.unshift(o),m.limit>0&&e.toasters.length>m.limit&&e.toasters.pop()):(e.toasters.push(o),m.limit>0&&e.toasters.length>m.limit&&e.toasters.shift())}function d(t){var s=e.toasters[t];s&&(s.timeoutPromise&&o.cancel(s.timeoutPromise),e.toasters.splice(t,1),angular.isFunction(s.onHideCallback)&&s.onHideCallback())}function p(t){for(var o=e.toasters.length-1;o>=0;o--)v(t)?d(o):e.toasters[o].uid==t&&d(o)}function v(t){return angular.isUndefined(t)||null===t}var m,f=0;m=angular.extend({},i,e.$eval(c.toasterOptions)),e.config={toasterId:m["toaster-id"],position:m["position-class"],title:m["title-class"],message:m["message-class"],tap:m["tap-to-dismiss"],closeButton:m["close-button"],animation:m["animation-class"],mouseoverTimer:m["mouseover-timer-stop"]},e.$on("$destroy",function(){n.unsubscribeToNewToastEvent(e._onNewToast),n.unsubscribeToClearToastsEvent(e._onClearToasts)}),e.configureTimer=function(t){var e=angular.isNumber(t.timeout)?t.timeout:m["time-out"];"object"==typeof e&&(e=e[t.type]),e>0&&l(t,e)},e.removeToast=function(t){var o,s;for(o=0,s=e.toasters.length;s>o;o++)if(e.toasters[o].id===t){d(o);break}},e.toasters=[],e._onNewToast=function(t,o,s){(v(e.config.toasterId)&&v(o)||!v(e.config.toasterId)&&!v(o)&&e.config.toasterId==o)&&u(a.toast,s)},e._onClearToasts=function(t,o,s){("*"==o||v(e.config.toasterId)&&v(o)||!v(e.config.toasterId)&&!v(o)&&e.config.toasterId==o)&&p(s)},n.setup(),n.subscribeToNewToastEvent(e._onNewToast),n.subscribeToClearToastsEvent(e._onClearToasts)},controller:["$scope","$element","$attrs",function(t){t.stopTimer=function(e){t.config.mouseoverTimer===!0&&e.timeoutPromise&&(o.cancel(e.timeoutPromise),e.timeoutPromise=null)},t.restartTimer=function(e){t.config.mouseoverTimer===!0?e.timeoutPromise||t.configureTimer(e):null===e.timeoutPromise&&t.removeToast(e.id)},t.click=function(e,o){if(t.config.tap===!0||e.showCloseButton===!0&&o===!0){var s=!0;e.clickHandler&&(angular.isFunction(e.clickHandler)?s=e.clickHandler(e,o):angular.isFunction(t.$parent.$eval(e.clickHandler))?s=t.$parent.$eval(e.clickHandler)(e,o):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),s&&t.removeToast(e.id)}}}],template:'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><button type="button" class="toast-close-button" ng-show="toaster.showCloseButton" ng-click="click(toaster, true)">&times;</button><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="{{toaster.directiveData}}"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>'}}])}(window,document);
angular.module('pageslide-directive', [])

.directive('pageslide', ['$document', '$timeout',
    function ($document, $timeout) {
        var defaults = {};
        return {
            restrict: 'EAC',
            transclude: false,
            scope: {
                psOpen: '=?',
                psAutoClose: '=?',
                psSide: '@',
                psSpeed: '@',
                psClass: '@',
                psSize: '@',
                psSqueeze: '@',
                psCloak: '@',
                psPush: '@',
                psContainer: '@',
                psKeyListener: '@',
                psBodyClass: '@'
            },
            link: function ($scope, el, attrs) {

                /* Inspect */

                //console.log($scope);
                //console.log(el);
                //console.log(attrs);

                var param = {};

                param.side = $scope.psSide || 'right';
                param.speed = $scope.psSpeed || '0.5';
                param.size = $scope.psSize || '300px';
                param.zindex = 1000; // Override with custom CSS
                param.className = $scope.psClass || 'ng-pageslide';
                param.cloak = $scope.psCloak && $scope.psCloak.toLowerCase() == 'false' ? false : true;
                param.squeeze = Boolean($scope.psSqueeze) || false;
                param.push = Boolean($scope.psPush) || false;
                param.container = $scope.psContainer || false;
                param.keyListener = Boolean($scope.psKeyListener) || false;
                param.bodyClass = $scope.psBodyClass || false;

                param.className=param.className.split(' ')
                param.className.forEach(function (cl) {
                    el.addClass(cl);
                })
                //el.addClass(param.className);

                /* DOM manipulation */

                var content = null;
                var slider = null;
                var body = param.container ? document.getElementById(param.container) : document.body;

                // TODO verify that we are meaning to use the param.className and not the param.bodyClass
                var scrolled=0;
                function setBodyClass(value){
                    //console.log('value',value)
                    /*if(value=='open'){
                        angular.element($document[0].body).css('overflow-y','hidden')
                        if(iPhone){
                            scrolled = window.pageYOffset || document.documentElement.scrollTop;
                            angular.element($document[0].body).css('position','fixed')
                            angular.element($document[0].body).css('top',-(scrolled+16))
                        }
                    }else if(value=='closed'){
                        angular.element($document[0].body).css('overflow-y','scroll')
                        if(iPhone){
                            angular.element($document[0].body).css('position','static');
                            window.scrollTo( 0, scrolled );
                        }
                    }*/

                    if (param.bodyClass) {
                        var bodyClass = param.className[param.className.length-1] + '-body';
                        var bodyClassRe = new RegExp(' ' + bodyClass + '-closed| ' + bodyClass + '-open'+'|' + bodyClass + '-closed|' + bodyClass + '-open'+'/g');
                        //console.log(bodyClassRe)
                        body.className = body.className.replace(bodyClassRe, '');
                        if(!body.className){
                            body.className += ' ' + bodyClass + '-' + value;
                        }else if(body.className.indexOf(bodyClass + '-' + value)<0){
                            body.className += ' ' + bodyClass + '-' + value;
                        }

                    }
                    //console.log('body.className',body.className)
                }

                setBodyClass('closed');

                slider = el[0];

                // Check for div tag
                if (slider.tagName.toLowerCase() !== 'div' &&
                    slider.tagName.toLowerCase() !== 'pageslide')
                    throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');

                // Check for content
                if (slider.children.length === 0)
                    throw new Error('You have to content inside the <pageslide>');

                content = angular.element(slider.children);

                /* Append */
                body.appendChild(slider);

                /* Style setup */
                slider.style.zIndex = param.zindex;
                slider.style.position = param.container !== false ? 'absolute' : 'fixed';
                slider.style.width = 0;
                slider.style.height = 0;
                slider.style.overflow = 'auto';
                slider.style.transitionDuration = param.speed + 's';
                slider.style.webkitTransitionDuration = param.speed + 's';
                slider.style.transitionProperty = 'width, height';

                if (param.squeeze) {
                    body.style.position = 'absolute';
                    body.style.transitionDuration = param.speed + 's';
                    body.style.webkitTransitionDuration = param.speed + 's';
                    body.style.transitionProperty = 'top, bottom, left, right';
                }

                switch (param.side) {
                    case 'right':
                        slider.style.height = attrs.psCustomHeight || '100%';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'left':
                        slider.style.height = attrs.psCustomHeight || '100%';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        break;
                    case 'top':
                        slider.style.width = attrs.psCustomWidth || '100%';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'bottom':
                        slider.style.width = attrs.psCustomWidth || '100%';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                }


                /* Closed */
                function psClose(slider, param) {
                    if (slider && slider.style.width !== 0) {
                        if (param.cloak) content.css('display', 'none');
                        switch (param.side) {
                            case 'right':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.right = '0px';
                                if (param.push) {
                                    body.style.right = '0px';
                                    body.style.left = '0px';
                                }
                                break;
                            case 'left':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.left = '0px';
                                if (param.push) {
                                    body.style.left = '0px';
                                    body.style.right = '0px';
                                }
                                break;
                            case 'top':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.top = '0px';
                                if (param.push) {
                                    body.style.top = '0px';
                                    body.style.bottom = '0px';
                                }
                                break;
                            case 'bottom':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.bottom = '0px';
                                if (param.push) {
                                    body.style.bottom = '0px';
                                    body.style.top = '0px';
                                }
                                break;
                        }
                    }
                    $scope.psOpen = false;

                    if (param.keyListener) {
                        $document.off('keydown', keyListener);
                    }

                    setBodyClass('closed');
                }

                /* Open */
                function psOpen(slider, param) {
                    if (slider.style.width !== 0) {
                        switch (param.side) {
                            case 'right':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.right = param.size;
                                if (param.push) {
                                    body.style.right = param.size;
                                    body.style.left = '-' + param.size;
                                }
                                break;
                            case 'left':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.left = param.size;
                                if (param.push) {
                                    body.style.left = param.size;
                                    body.style.right = '-' + param.size;
                                }
                                break;
                            case 'top':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.top = param.size;
                                if (param.push) {
                                    body.style.top = param.size;
                                    body.style.bottom = '-' + param.size;
                                }
                                break;
                            case 'bottom':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.bottom = param.size;
                                if (param.push) {
                                    body.style.bottom = param.size;
                                    body.style.top = '-' + param.size;
                                }
                                break;
                        }

                        $timeout(function() {
                            if (param.cloak) content.css('display', 'block');
                        }, (param.speed * 1000));

                        $scope.psOpen = true;

                        if (param.keyListener) {
                            $document.on('keydown', keyListener);
                        }

                        setBodyClass('open');
                    }
                }

                function isFunction(functionToCheck) {
                    var getType = {};
                    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                }

                /*
                * Close the sidebar if the 'esc' key is pressed
                * */

                function keyListener(e) {
                    var ESC_KEY = 27;
                    var key = e.keyCode || e.which;

                    if (key === ESC_KEY) {
                        psClose(slider, param);
                    }
                }

                /*
                * Watchers
                * */

                $scope.$watch('psOpen', function(value) {
                    if (!!value) {
                        psOpen(slider, param);
                    } else {
                        psClose(slider, param);
                    }
                });

                $scope.$watch('psSize', function(newValue, oldValue) {
                    if (oldValue !== newValue) {
                        param.size = newValue;
                        psOpen(slider, param);
                    }
                });

                /*
                * Events
                * */

                $scope.$on('$destroy', function () {
                    body.removeChild(slider);
                });

                if ($scope.psAutoClose) {
                    $scope.$on('$locationChangeStart', function() {
                        psClose(slider, param);
                    });
                    $scope.$on('$stateChangeStart', function() {
                        psClose(slider, param);
                    });

                }
            }
        };
    }
]);

/*global angular, navigator*/

(function() {
    'use strict';

    angular
        .module('angular-click-outside', [])
        .directive('clickOutside', [
            '$document', '$parse', '$timeout',
            clickOutside
        ]);
    
    /**
     * @ngdoc directive
     * @name angular-click-outside.directive:clickOutside
     * @description Directive to add click outside capabilities to DOM elements
     * @requires $document
     * @requires $parse
     * @requires $timeout
     **/
    function clickOutside($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {

                // postpone linking to next digest to allow for unique id generation
                $timeout(function() {
                    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
                        fn;

                    function eventHandler(e) {
                        /*console.log(e.target.className)
                        console.log(e)*/
                        if(e && e.target && (e.target.className=='pac-matched' || e.target.className=='pac-item-query'  || e.target.className=='pac-item' || e.target.className=='pac-icon' || e.target.className=='pac-container'
                            || e.target.className=='pac-icon-marker'|| e.target.className=='pac-logo' || e.target.className=='pac-matched')){
                            //console.log(e.target.className)
                            event.stopPropagation()
                            return
                        }
                        var i,
                            element,
                            r,
                            id,
                            classNames,
                            l;

                        // check if our element already hidden and abort if so
                        if (angular.element(elem).hasClass("ng-hide")) {
                            return;
                        }

                        // if there is no click target, no point going on
                        if (!e || !e.target) {
                            return;
                        }

                        // loop through the available elements, looking for classes in the class list that might match and so will eat
                        for (element = e.target; element; element = element.parentNode) {
                            // check if the element is the same element the directive is attached to and exit if so (props @CosticaPuntaru)
                            if (element === elem[0]) {
                                return;
                            }
                            
                            // now we have done the initial checks, start gathering id's and classes
                            id = element.id,
                            classNames = element.className,
                            l = classList.length;

                            // Unwrap SVGAnimatedString classes
                            if (classNames && classNames.baseVal !== undefined) {
                                classNames = classNames.baseVal;
                            }

                            // if there are no class names on the element clicked, skip the check
                            if (classNames || id) {

                                // loop through the elements id's and classnames looking for exceptions
                                for (i = 0; i < l; i++) {
                                    //prepare regex for class word matching
                                    r = new RegExp('\\b' + classList[i] + '\\b');

                                    // check for exact matches on id's or classes, but only if they exist in the first place
                                    if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
                                        // now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                        return;
                                    }
                                }
                            }
                        }

                        // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                        $timeout(function() {
                            fn = $parse(attr['clickOutside']);
                            fn($scope, { event: e });
                        });
                    }

                    // if the devices has a touchscreen, listen for this event
                    if (_hasTouch()) {
                        $document.on('touchstart', eventHandler);
                    }

                    // still listen for the click event even if there is touch to cater for touchscreen laptops
                    $document.on('click', eventHandler);

                    // when the scope is destroyed, clean up the documents event handlers as we don't want it hanging around
                    $scope.$on('$destroy', function() {
                        if (_hasTouch()) {
                            $document.off('touchstart', eventHandler);
                        }

                        $document.off('click', eventHandler);
                    });

                    /**
                     * @description Private function to attempt to figure out if we are on a touch device
                     * @private
                     **/
                    function _hasTouch() {
                        // works on most browsers, IE10/11 and Surface
                        return 'ontouchstart' in window || navigator.maxTouchPoints;
                    };
                });
            }
        };
    }
})();

/**
 * angular-recaptcha build:2016-07-19 
 * https://github.com/vividcortex/angular-recaptcha 
 * Copyright (c) 2016 VividCortex 
**/

!function(a){"use strict";a.module("vcRecaptcha",[])}(angular),function(a){"use strict";function b(){throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create')}var c=a.module("vcRecaptcha");c.provider("vcRecaptchaService",function(){var c=this,d={};c.onLoadFunctionName="vcRecaptchaApiLoaded",c.setDefaults=function(b){a.copy(b,d)},c.setSiteKey=function(a){d.key=a},c.setTheme=function(a){d.theme=a},c.setStoken=function(a){d.stoken=a},c.setSize=function(a){d.size=a},c.setType=function(a){d.type=a},c.setOnLoadFunctionName=function(a){c.onLoadFunctionName=a},c.$get=["$rootScope","$window","$q",function(e,f,g){function h(){return j?g.when(j):l}function i(){if(!j)throw new Error("reCaptcha has not been loaded yet.")}var j,k=g.defer(),l=k.promise;f.vcRecaptchaApiLoadedCallback=f.vcRecaptchaApiLoadedCallback||[];var m=function(){j=f.grecaptcha,k.resolve(j)};return f.vcRecaptchaApiLoadedCallback.push(m),f[c.onLoadFunctionName]=function(){f.vcRecaptchaApiLoadedCallback.forEach(function(a){a()})},a.isDefined(f.grecaptcha)&&m(),{create:function(a,c){return c.sitekey=c.key||d.key,c.theme=c.theme||d.theme,c.stoken=c.stoken||d.stoken,c.size=c.size||d.size,c.type=c.type||d.type,c.sitekey&&40===c.sitekey.length||b(),h().then(function(b){return b.render(a,c)})},reload:function(a){i(),j.reset(a),e.$broadcast("reCaptchaReset",a)},getResponse:function(a){return i(),j.getResponse(a)}}}]})}(angular),function(a){"use strict";var b=a.module("vcRecaptcha");b.directive("vcRecaptcha",["$document","$timeout","vcRecaptchaService",function(b,c,d){return{restrict:"A",require:"?^^form",scope:{response:"=?ngModel",key:"=?",stoken:"=?",theme:"=?",size:"=?",type:"=?",tabindex:"=?",required:"=?",onCreate:"&",onSuccess:"&",onExpire:"&"},link:function(e,f,g,h){function i(){h&&h.$setValidity("recaptcha",null),l()}function j(){c(function(){e.response="",k(),e.onExpire({widgetId:e.widgetId})})}function k(){h&&h.$setValidity("recaptcha",e.required===!1?null:Boolean(e.response))}function l(){a.element(b[0].querySelectorAll(".pls-container")).parent().remove()}e.widgetId=null,h&&a.isDefined(g.required)&&e.$watch("required",k);var m=e.$watch("key",function(b){var h=function(a){c(function(){e.response=a,k(),e.onSuccess({response:a,widgetId:e.widgetId})})};d.create(f[0],{callback:h,key:b,stoken:e.stoken||g.stoken||null,theme:e.theme||g.theme||null,type:e.type||g.type||null,tabindex:e.tabindex||g.tabindex||null,size:e.size||g.size||null,"expired-callback":j}).then(function(b){k(),e.widgetId=b,e.onCreate({widgetId:b}),e.$on("$destroy",i),e.$on("reCaptchaReset",function(c,d){(a.isUndefined(d)||b===d)&&(e.response="",k())})}),m()})}}}])}(angular);
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.8.7 - 2016-07-26T15:59:07.992Z
 * License: MIT
 */
!function(){"use strict";angular.module("ui.mask",[]).value("uiMaskConfig",{maskDefinitions:{9:/\d/,A:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/},clearOnBlur:!0,clearOnBlurPlaceholder:!1,escChar:"\\",eventsToHandle:["input","keyup","click","focus"],addDefaultPlaceholder:!0,allowInvalidValue:!1}).provider("uiMask.Config",function(){var e={};this.maskDefinitions=function(n){return e.maskDefinitions=n},this.clearOnBlur=function(n){return e.clearOnBlur=n},this.clearOnBlurPlaceholder=function(n){return e.clearOnBlurPlaceholder=n},this.eventsToHandle=function(n){return e.eventsToHandle=n},this.addDefaultPlaceholder=function(n){return e.addDefaultPlaceholder=n},this.allowInvalidValue=function(n){return e.allowInvalidValue=n},this.$get=["uiMaskConfig",function(n){var t=n;for(var a in e)angular.isObject(e[a])&&!angular.isArray(e[a])?angular.extend(t[a],e[a]):t[a]=e[a];return t}]}).directive("uiMask",["uiMask.Config",function(e){function n(e){return e===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(e.type||e.href||~e.tabIndex)}return{priority:100,require:"ngModel",restrict:"A",compile:function(){var t=angular.copy(e);return function(e,a,i,r){function l(e){return angular.isDefined(e)?(w(e),K?(h(),d(),!0):f()):f()}function u(e){e&&(T=e,!K||0===a.val().length&&angular.isDefined(i.placeholder)||a.val(m(p(a.val()))))}function o(){return l(i.uiMask)}function c(e){return K?(j=p(e||""),R=g(j),r.$setValidity("mask",R),j.length&&(R||Q.allowInvalidValue)?m(j):void 0):e}function s(e){return K?(j=p(e||""),R=g(j),r.$viewValue=j.length?m(j):"",r.$setValidity("mask",R),R||Q.allowInvalidValue?J?r.$viewValue:j:void 0):e}function f(){return K=!1,v(),angular.isDefined(q)?a.attr("placeholder",q):a.removeAttr("placeholder"),angular.isDefined(W)?a.attr("maxlength",W):a.removeAttr("maxlength"),a.val(r.$modelValue),r.$viewValue=r.$modelValue,!1}function h(){j=F=p(r.$modelValue||""),H=_=m(j),R=g(j),i.maxlength&&a.attr("maxlength",2*S[S.length-1]),!q&&Q.addDefaultPlaceholder&&a.attr("placeholder",T);for(var e=r.$modelValue,n=r.$formatters.length;n--;)e=r.$formatters[n](e);r.$viewValue=e||"",r.$render()}function d(){Z||(a.bind("blur",y),a.bind("mousedown mouseup",V),a.bind("keydown",M),a.bind(Q.eventsToHandle.join(" "),O),Z=!0)}function v(){Z&&(a.unbind("blur",y),a.unbind("mousedown",V),a.unbind("mouseup",V),a.unbind("keydown",M),a.unbind("input",O),a.unbind("keyup",O),a.unbind("click",O),a.unbind("focus",O),Z=!1)}function g(e){return e.length?e.length>=I:!0}function p(e){var n,t,i="",r=a[0],l=A.slice(),u=L,o=u+C(r),c="";return e=e.toString(),n=0,t=e.length-T.length,angular.forEach(B,function(a){var i=a.position;i>=u&&o>i||(i>=u&&(i+=t),e.substring(i,i+a.value.length)===a.value&&(c+=e.slice(n,i),n=i+a.value.length))}),e=c+e.slice(n),angular.forEach(e.split(""),function(e){l.length&&l[0].test(e)&&(i+=e,l.shift())}),i}function m(e){var n="",t=S.slice();return angular.forEach(T.split(""),function(a,i){e.length&&i===t[0]?(n+=e.charAt(0)||"_",e=e.substr(1),t.shift()):n+=a}),n}function b(e){var n,t=angular.isDefined(i.uiMaskPlaceholder)?i.uiMaskPlaceholder:i.placeholder;return angular.isDefined(t)&&t[e]?t[e]:(n=angular.isDefined(i.uiMaskPlaceholderChar)&&i.uiMaskPlaceholderChar?i.uiMaskPlaceholderChar:"_","space"===n.toLowerCase()?" ":n[0])}function k(){var e,n,t=T.split("");S&&!isNaN(S[0])&&angular.forEach(S,function(e){t[e]="_"}),e=t.join(""),n=e.replace(/[_]+/g,"_").split("_"),n=n.filter(function(e){return""!==e});var a=0;return n.map(function(n){var t=e.indexOf(n,a);return a=t+1,{value:n,position:t}})}function w(e){var n=0;if(S=[],A=[],T="",angular.isString(e)){I=0;var t=!1,a=0,i=e.split(""),r=!1;angular.forEach(i,function(e,i){r?(r=!1,T+=e,n++):Q.escChar===e?r=!0:Q.maskDefinitions[e]?(S.push(n),T+=b(i-a),A.push(Q.maskDefinitions[e]),n++,t||I++,t=!1):"?"===e?(t=!0,a++):(T+=e,n++)})}S.push(S.slice().pop()+1),B=k(),K=S.length>1?!0:!1}function y(){if((Q.clearOnBlur||Q.clearOnBlurPlaceholder&&0===j.length&&i.placeholder)&&(L=0,N=0,R&&0!==j.length||(H="",a.val(""),e.$apply(function(){r.$pristine||r.$setViewValue("")}))),j!==U){var n=a.val(),t=""===j&&n&&angular.isDefined(i.uiMaskPlaceholderChar)&&"space"===i.uiMaskPlaceholderChar;t&&a.val(""),$(a[0]),t&&a.val(n)}U=j}function $(e){var n;if(angular.isFunction(window.Event)&&!e.fireEvent)try{n=new Event("change",{view:window,bubbles:!0,cancelable:!1})}catch(t){n=document.createEvent("HTMLEvents"),n.initEvent("change",!1,!0)}finally{e.dispatchEvent(n)}else"createEvent"in document?(n=document.createEvent("HTMLEvents"),n.initEvent("change",!1,!0),e.dispatchEvent(n)):e.fireEvent&&e.fireEvent("onchange")}function V(e){"mousedown"===e.type?a.bind("mouseout",E):a.unbind("mouseout",E)}function E(){N=C(this),a.unbind("mouseout",E)}function M(e){var n=8===e.which,t=P(this)-1||0,i=90===e.which&&e.ctrlKey;if(n){for(;t>=0;){if(D(t)){x(this,t+1);break}t--}z=-1===t}i&&(a.val(""),e.preventDefault())}function O(n){n=n||{};var t=n.which,i=n.type;if(16!==t&&91!==t){var l,u=a.val(),o=_,c=!1,s=p(u),f=F,h=P(this)||0,d=L||0,v=h-d,g=S[0],b=S[s.length]||S.slice().shift(),k=N||0,w=C(this)>0,y=k>0,$=u.length>o.length||k&&u.length>o.length-k,V=u.length<o.length||k&&u.length===o.length-k,E=t>=37&&40>=t&&n.shiftKey,M=37===t,O=8===t||"keyup"!==i&&V&&-1===v,A=46===t||"keyup"!==i&&V&&0===v&&!y,B=(M||O||"click"===i)&&h>g;if(N=C(this),!E&&(!w||"click"!==i&&"keyup"!==i&&"focus"!==i)){if(O&&z)return a.val(T),e.$apply(function(){r.$setViewValue("")}),void x(this,d);if("input"===i&&V&&!y&&s===f){for(;O&&h>g&&!D(h);)h--;for(;A&&b>h&&-1===S.indexOf(h);)h++;var I=S.indexOf(h);s=s.substring(0,I)+s.substring(I+1),s!==f&&(c=!0)}for(l=m(s),_=l,F=s,!c&&u.length>l.length&&(c=!0),a.val(l),c&&e.$apply(function(){r.$setViewValue(l)}),$&&g>=h&&(h=g+1),B&&h--,h=h>b?b:g>h?g:h;!D(h)&&h>g&&b>h;)h+=B?-1:1;(B&&b>h||$&&!D(d))&&h++,L=h,x(this,h)}}}function D(e){return S.indexOf(e)>-1}function P(e){if(!e)return 0;if(void 0!==e.selectionStart)return e.selectionStart;if(document.selection&&n(a[0])){e.focus();var t=document.selection.createRange();return t.moveStart("character",e.value?-e.value.length:0),t.text.length}return 0}function x(e,t){if(!e)return 0;if(0!==e.offsetWidth&&0!==e.offsetHeight)if(e.setSelectionRange)n(a[0])&&(e.focus(),e.setSelectionRange(t,t));else if(e.createTextRange){var i=e.createTextRange();i.collapse(!0),i.moveEnd("character",t),i.moveStart("character",t),i.select()}}function C(e){return e?void 0!==e.selectionStart?e.selectionEnd-e.selectionStart:window.getSelection?window.getSelection().toString().length:document.selection?document.selection.createRange().text.length:0:0}var S,A,T,B,I,j,H,R,_,F,L,N,z,K=!1,Z=!1,q=i.placeholder,W=i.maxlength,G=r.$isEmpty;r.$isEmpty=function(e){return G(K?p(e||""):e)};var J=!1;i.$observe("modelViewValue",function(e){"true"===e&&(J=!0)}),i.$observe("allowInvalidValue",function(e){Q.allowInvalidValue=""===e?!0:!!e,c(r.$modelValue)});var Q={};i.uiOptions?(Q=e.$eval("["+i.uiOptions+"]"),Q=angular.isObject(Q[0])?function(e,n){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(void 0===n[t]?n[t]=angular.copy(e[t]):angular.isObject(n[t])&&!angular.isArray(n[t])&&(n[t]=angular.extend({},e[t],n[t])));return n}(t,Q[0]):t):Q=t,i.$observe("uiMask",l),angular.isDefined(i.uiMaskPlaceholder)?i.$observe("uiMaskPlaceholder",u):i.$observe("placeholder",u),angular.isDefined(i.uiMaskPlaceholderChar)&&i.$observe("uiMaskPlaceholderChar",o),r.$formatters.unshift(c),r.$parsers.unshift(s);var U=a.val();a.bind("mousedown mouseup",V),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var n=Object(this),t=n.length>>>0;if(0===t)return-1;var a=0;if(arguments.length>1&&(a=Number(arguments[1]),a!==a?a=0:0!==a&&a!==1/0&&a!==-(1/0)&&(a=(a>0||-1)*Math.floor(Math.abs(a)))),a>=t)return-1;for(var i=a>=0?a:Math.max(t-Math.abs(a),0);t>i;i++)if(i in n&&n[i]===e)return i;return-1})}}}}])}();
/*! angularjs-slider - v6.0.1 - 
 (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> - 
 https://github.com/angular-slider/angularjs-slider - 
 2017-02-15 */
/*jslint unparam: true */
/*global angular: false, console: false, define, module */
(function(root, factory) {
  'use strict';
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // to support bundler like browserify
    var angularObj = angular || require('angular');
    if ((!angularObj || !angularObj.module) && typeof angular != 'undefined') {
      angularObj = angular;
    }
    module.exports = factory(angularObj);
  } else {
    // Browser globals (root is window)
    factory(root.angular);
  }

}(this, function(angular) {
  'use strict';
  var module = angular.module('rzModule', [])

  .factory('RzSliderOptions', function() {
    var defaultOptions = {
      floor: 0,
      ceil: null, //defaults to rz-slider-model
      step: 1,
      precision: 0,
      minRange: null,
      maxRange: null,
      pushRange: false,
      minLimit: null,
      maxLimit: null,
      id: null,
      translate: null,
      getLegend: null,
      stepsArray: null,
      bindIndexForStepsArray: false,
      draggableRange: false,
      draggableRangeOnly: false,
      showSelectionBar: false,
      showSelectionBarEnd: false,
      showSelectionBarFromValue: null,
      hidePointerLabels: false,
      hideLimitLabels: false,
      autoHideLimitLabels: true,
      readOnly: false,
      disabled: false,
      interval: 350,
      showTicks: false,
      showTicksValues: false,
      ticksArray: null,
      ticksTooltip: null,
      ticksValuesTooltip: null,
      vertical: false,
      getSelectionBarColor: null,
      getTickColor: null,
      getPointerColor: null,
      keyboardSupport: true,
      scale: 1,
      enforceStep: true,
      enforceRange: false,
      noSwitching: false,
      onlyBindHandles: false,
      onStart: null,
      onChange: null,
      onEnd: null,
      rightToLeft: false,
      boundPointerLabels: true,
      mergeRangeLabelsIfSame: false,
      customTemplateScope: null,
      logScale: false,
      customValueToPosition: null,
      customPositionToValue: null,
      selectionBarGradient: null
    };
    var globalOptions = {};

    var factory = {};
    /**
     * `options({})` allows global configuration of all sliders in the
     * application.
     *
     *   var app = angular.module( 'App', ['rzModule'], function( RzSliderOptions ) {
     *     // show ticks for all sliders
     *     RzSliderOptions.options( { showTicks: true } );
     *   });
     */
    factory.options = function(value) {
      angular.extend(globalOptions, value);
    };

    factory.getOptions = function(options) {
      return angular.extend({}, defaultOptions, globalOptions, options);
    };

    return factory;
  })

  .factory('rzThrottle', ['$timeout', function($timeout) {
    /**
     * rzThrottle
     *
     * Taken from underscore project
     *
     * @param {Function} func
     * @param {number} wait
     * @param {ThrottleOptions} options
     * @returns {Function}
     */
    return function(func, wait, options) {
      'use strict';
      /* istanbul ignore next */
      var getTime = (Date.now || function() {
        return new Date().getTime();
      });
      var context, args, result;
      var timeout = null;
      var previous = 0;
      options = options || {};
      var later = function() {
        previous = getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        var now = getTime();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          $timeout.cancel(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = $timeout(later, remaining);
        }
        return result;
      };
    }
  }])

  .factory('RzSlider', ['$timeout', '$document', '$window', '$compile', 'RzSliderOptions', 'rzThrottle', function($timeout, $document, $window, $compile, RzSliderOptions, rzThrottle) {
    'use strict';

    /**
     * Slider
     *
     * @param {ngScope} scope            The AngularJS scope
     * @param {Element} sliderElem The slider directive element wrapped in jqLite
     * @constructor
     */
    var Slider = function(scope, sliderElem) {
      /**
       * The slider's scope
       *
       * @type {ngScope}
       */
      this.scope = scope;

      /**
       * The slider inner low value (linked to rzSliderModel)
       * @type {number}
       */
      this.lowValue = 0;

      /**
       * The slider inner high value (linked to rzSliderHigh)
       * @type {number}
       */
      this.highValue = 0;

      /**
       * Slider element wrapped in jqLite
       *
       * @type {jqLite}
       */
      this.sliderElem = sliderElem;

      /**
       * Slider type
       *
       * @type {boolean} Set to true for range slider
       */
      this.range = this.scope.rzSliderModel !== undefined && this.scope.rzSliderHigh !== undefined;

      /**
       * Values recorded when first dragging the bar
       *
       * @type {Object}
       */
      this.dragging = {
        active: false,
        value: 0,
        difference: 0,
        position: 0,
        lowLimit: 0,
        highLimit: 0
      };

      /**
       * property that handle position (defaults to left for horizontal)
       * @type {string}
       */
      this.positionProperty = 'left';

      /**
       * property that handle dimension (defaults to width for horizontal)
       * @type {string}
       */
      this.dimensionProperty = 'width';

      /**
       * Half of the width or height of the slider handles
       *
       * @type {number}
       */
      this.handleHalfDim = 0;

      /**
       * Maximum position the slider handle can have
       *
       * @type {number}
       */
      this.maxPos = 0;

      /**
       * Precision
       *
       * @type {number}
       */
      this.precision = 0;

      /**
       * Step
       *
       * @type {number}
       */
      this.step = 1;

      /**
       * The name of the handle we are currently tracking
       *
       * @type {string}
       */
      this.tracking = '';

      /**
       * Minimum value (floor) of the model
       *
       * @type {number}
       */
      this.minValue = 0;

      /**
       * Maximum value (ceiling) of the model
       *
       * @type {number}
       */
      this.maxValue = 0;


      /**
       * The delta between min and max value
       *
       * @type {number}
       */
      this.valueRange = 0;


      /**
       * If showTicks/showTicksValues options are number.
       * In this case, ticks values should be displayed below the slider.
       * @type {boolean}
       */
      this.intermediateTicks = false;

      /**
       * Set to true if init method already executed
       *
       * @type {boolean}
       */
      this.initHasRun = false;

      /**
       * Used to call onStart on the first keydown event
       *
       * @type {boolean}
       */
      this.firstKeyDown = false;

      /**
       * Internal flag to prevent watchers to be called when the sliders value are modified internally.
       * @type {boolean}
       */
      this.internalChange = false;

      /**
       * Internal flag to keep track of the visibility of combo label
       * @type {boolean}
       */
      this.cmbLabelShown = false;

      /**
       * Internal variable to keep track of the focus element
       */
      this.currentFocusElement = null;

      // Slider DOM elements wrapped in jqLite
      this.fullBar = null; // The whole slider bar
      this.selBar = null; // Highlight between two handles
      this.minH = null; // Left slider handle
      this.maxH = null; // Right slider handle
      this.flrLab = null; // Floor label
      this.ceilLab = null; // Ceiling label
      this.minLab = null; // Label above the low value
      this.maxLab = null; // Label above the high value
      this.cmbLab = null; // Combined label
      this.ticks = null; // The ticks

      // Initialize slider
      this.init();
    };

    // Add instance methods
    Slider.prototype = {

      /**
       * Initialize slider
       *
       * @returns {undefined}
       */
      init: function() {
        var thrLow, thrHigh,
          self = this;

        var calcDimFn = function() {
          self.calcViewDimensions();
        };

        this.applyOptions();
        this.syncLowValue();
        if (this.range)
          this.syncHighValue();
        this.initElemHandles();
        this.manageElementsStyle();
        this.setDisabledState();
        this.calcViewDimensions();
        this.setMinAndMax();
        this.addAccessibility();
        this.updateCeilLab();
        this.updateFloorLab();
        this.initHandles();
        this.manageEventsBindings();

        // Recalculate slider view dimensions
        this.scope.$on('reCalcViewDimensions', calcDimFn);

        // Recalculate stuff if view port dimensions have changed
        angular.element($window).on('resize', calcDimFn);

        this.initHasRun = true;

        // Watch for changes to the model
        thrLow = rzThrottle(function() {
          self.onLowHandleChange();
        }, self.options.interval);

        thrHigh = rzThrottle(function() {
          self.onHighHandleChange();
        }, self.options.interval);

        this.scope.$on('rzSliderForceRender', function() {
          self.resetLabelsValue();
          thrLow();
          if (self.range) {
            thrHigh();
          }
          self.resetSlider();
        });

        // Watchers (order is important because in case of simultaneous change,
        // watchers will be called in the same order)
        this.scope.$watch('rzSliderOptions()', function(newValue, oldValue) {
          if (newValue === oldValue)
            return;
          self.applyOptions(); // need to be called before synchronizing the values
          self.syncLowValue();
          if (self.range)
            self.syncHighValue();
          self.resetSlider();
        }, true);

        this.scope.$watch('rzSliderModel', function(newValue, oldValue) {
          if (self.internalChange)
            return;
          if (newValue === oldValue)
            return;
          thrLow();
        });

        this.scope.$watch('rzSliderHigh', function(newValue, oldValue) {
          if (self.internalChange)
            return;
          if (newValue === oldValue)
            return;
          if (newValue != null)
            thrHigh();
          if (self.range && newValue == null || !self.range && newValue != null) {
            self.applyOptions();
            self.resetSlider();
          }
        });

        this.scope.$on('$destroy', function() {
          self.unbindEvents();
          angular.element($window).off('resize', calcDimFn);
          self.currentFocusElement = null;
        });
      },

      findStepIndex: function(modelValue) {
        var index = 0;
        for (var i = 0; i < this.options.stepsArray.length; i++) {
          var step = this.options.stepsArray[i];
          if (step === modelValue) {
            index = i;
            break;
          }
          else if (angular.isDate(step)) {
            if (step.getTime() === modelValue.getTime()) {
              index = i;
              break;
            }
          }
          else if (angular.isObject(step)) {
            if (angular.isDate(step.value) && step.value.getTime() === modelValue.getTime() || step.value === modelValue) {
              index = i;
              break;
            }
          }
        }
        return index;
      },

      syncLowValue: function() {
        if (this.options.stepsArray) {
          if (!this.options.bindIndexForStepsArray)
            this.lowValue = this.findStepIndex(this.scope.rzSliderModel);
          else
            this.lowValue = this.scope.rzSliderModel
        }
        else
          this.lowValue = this.scope.rzSliderModel;
      },

      syncHighValue: function() {
        if (this.options.stepsArray) {
          if (!this.options.bindIndexForStepsArray)
            this.highValue = this.findStepIndex(this.scope.rzSliderHigh);
          else
            this.highValue = this.scope.rzSliderHigh
        }
        else
          this.highValue = this.scope.rzSliderHigh;
      },

      getStepValue: function(sliderValue) {
        var step = this.options.stepsArray[sliderValue];
        if (angular.isDate(step))
          return step;
        if (angular.isObject(step))
          return step.value;
        return step;
      },

      applyLowValue: function() {
        if (this.options.stepsArray) {
          if (!this.options.bindIndexForStepsArray)
            this.scope.rzSliderModel = this.getStepValue(this.lowValue);
          else
            this.scope.rzSliderModel = this.lowValue
        }
        else
          this.scope.rzSliderModel = this.lowValue;
      },

      applyHighValue: function() {
        if (this.options.stepsArray) {
          if (!this.options.bindIndexForStepsArray)
            this.scope.rzSliderHigh = this.getStepValue(this.highValue);
          else
            this.scope.rzSliderHigh = this.highValue
        }
        else
          this.scope.rzSliderHigh = this.highValue;
      },

      /*
       * Reflow the slider when the low handle changes (called with throttle)
       */
      onLowHandleChange: function() {
        this.syncLowValue();
        if (this.range)
          this.syncHighValue();
        this.setMinAndMax();
        this.updateLowHandle(this.valueToPosition(this.lowValue));
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateAriaAttributes();
        if (this.range) {
          this.updateCmbLabel();
        }
      },

      /*
       * Reflow the slider when the high handle changes (called with throttle)
       */
      onHighHandleChange: function() {
        this.syncLowValue();
        this.syncHighValue();
        this.setMinAndMax();
        this.updateHighHandle(this.valueToPosition(this.highValue));
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateCmbLabel();
        this.updateAriaAttributes();
      },

      /**
       * Read the user options and apply them to the slider model
       */
      applyOptions: function() {
        var sliderOptions;
        if (this.scope.rzSliderOptions)
          sliderOptions = this.scope.rzSliderOptions();
        else
          sliderOptions = {};

        this.options = RzSliderOptions.getOptions(sliderOptions);

        if (this.options.step <= 0)
          this.options.step = 1;

        this.range = this.scope.rzSliderModel !== undefined && this.scope.rzSliderHigh !== undefined;
        this.options.draggableRange = this.range && this.options.draggableRange;
        this.options.draggableRangeOnly = this.range && this.options.draggableRangeOnly;
        if (this.options.draggableRangeOnly) {
          this.options.draggableRange = true;
        }

        this.options.showTicks = this.options.showTicks || this.options.showTicksValues || !!this.options.ticksArray;
        this.scope.showTicks = this.options.showTicks; //scope is used in the template
        if (angular.isNumber(this.options.showTicks) || this.options.ticksArray)
          this.intermediateTicks = true;

        this.options.showSelectionBar = this.options.showSelectionBar || this.options.showSelectionBarEnd
          || this.options.showSelectionBarFromValue !== null;

        if (this.options.stepsArray) {
          this.parseStepsArray();
        } else {
          if (this.options.translate)
            this.customTrFn = this.options.translate;
          else
            this.customTrFn = function(value) {
              return String(value);
            };

          this.getLegend = this.options.getLegend;
        }

        if (this.options.vertical) {
          this.positionProperty = 'bottom';
          this.dimensionProperty = 'height';
        }

        if (this.options.customTemplateScope)
          this.scope.custom = this.options.customTemplateScope;
      },

      parseStepsArray: function() {
        this.options.floor = 0;
        this.options.ceil = this.options.stepsArray.length - 1;
        this.options.step = 1;

        if (this.options.translate) {
          this.customTrFn = this.options.translate;
        }
        else {
          this.customTrFn = function(modelValue) {
            if (this.options.bindIndexForStepsArray)
              return this.getStepValue(modelValue);
            return modelValue;
          };
        }

        this.getLegend = function(index) {
          var step = this.options.stepsArray[index];
          if (angular.isObject(step))
            return step.legend;
          return null;
        };
      },

      /**
       * Resets slider
       *
       * @returns {undefined}
       */
      resetSlider: function() {
        this.manageElementsStyle();
        this.addAccessibility();
        this.setMinAndMax();
        this.updateCeilLab();
        this.updateFloorLab();
        this.unbindEvents();
        this.manageEventsBindings();
        this.setDisabledState();
        this.calcViewDimensions();
        this.refocusPointerIfNeeded();
      },

      refocusPointerIfNeeded: function() {
        if (this.currentFocusElement) {
          this.onPointerFocus(this.currentFocusElement.pointer, this.currentFocusElement.ref);
          this.focusElement(this.currentFocusElement.pointer)
        }
      },

      /**
       * Set the slider children to variables for easy access
       *
       * Run only once during initialization
       *
       * @returns {undefined}
       */
      initElemHandles: function() {
        // Assign all slider elements to object properties for easy access
        angular.forEach(this.sliderElem.children(), function(elem, index) {
          var jElem = angular.element(elem);

          switch (index) {
            case 0:
              this.fullBar = jElem;
              break;
            case 1:
              this.selBar = jElem;
              break;
            case 2:
              this.minH = jElem;
              break;
            case 3:
              this.maxH = jElem;
              break;
            case 4:
              this.flrLab = jElem;
              break;
            case 5:
              this.ceilLab = jElem;
              break;
            case 6:
              this.minLab = jElem;
              break;
            case 7:
              this.maxLab = jElem;
              break;
            case 8:
              this.cmbLab = jElem;
              break;
            case 9:
              this.ticks = jElem;
              break;
          }

        }, this);

        // Initialize position cache properties
        this.selBar.rzsp = 0;
        this.minH.rzsp = 0;
        this.maxH.rzsp = 0;
        this.flrLab.rzsp = 0;
        this.ceilLab.rzsp = 0;
        this.minLab.rzsp = 0;
        this.maxLab.rzsp = 0;
        this.cmbLab.rzsp = 0;
      },

      /**
       * Update each elements style based on options
       */
      manageElementsStyle: function() {

        if (!this.range)
          this.maxH.css('display', 'none');
        else
          this.maxH.css('display', '');


        this.alwaysHide(this.flrLab, this.options.showTicksValues || this.options.hideLimitLabels);
        this.alwaysHide(this.ceilLab, this.options.showTicksValues || this.options.hideLimitLabels);

        var hideLabelsForTicks = this.options.showTicksValues && !this.intermediateTicks;
        this.alwaysHide(this.minLab, hideLabelsForTicks || this.options.hidePointerLabels);
        this.alwaysHide(this.maxLab, hideLabelsForTicks || !this.range || this.options.hidePointerLabels);
        this.alwaysHide(this.cmbLab, hideLabelsForTicks || !this.range || this.options.hidePointerLabels);
        this.alwaysHide(this.selBar, !this.range && !this.options.showSelectionBar);

        if (this.options.vertical)
          this.sliderElem.addClass('rz-vertical');

        if (this.options.draggableRange)
          this.selBar.addClass('rz-draggable');
        else
          this.selBar.removeClass('rz-draggable');

        if (this.intermediateTicks && this.options.showTicksValues)
          this.ticks.addClass('rz-ticks-values-under');
      },

      alwaysHide: function(el, hide) {
        el.rzAlwaysHide = hide;
        if (hide)
          this.hideEl(el);
        else
          this.showEl(el)
      },

      /**
       * Manage the events bindings based on readOnly and disabled options
       *
       * @returns {undefined}
       */
      manageEventsBindings: function() {
        if (this.options.disabled || this.options.readOnly)
          this.unbindEvents();
        else
          this.bindEvents();
      },

      /**
       * Set the disabled state based on rzSliderDisabled
       *
       * @returns {undefined}
       */
      setDisabledState: function() {
        if (this.options.disabled) {
          this.sliderElem.attr('disabled', 'disabled');
        } else {
          this.sliderElem.attr('disabled', null);
        }
      },

      /**
       * Reset label values
       *
       * @return {undefined}
       */
      resetLabelsValue: function() {
        this.minLab.rzsv = undefined;
        this.maxLab.rzsv = undefined;
      },

      /**
       * Initialize slider handles positions and labels
       *
       * Run only once during initialization and every time view port changes size
       *
       * @returns {undefined}
       */
      initHandles: function() {
        this.updateLowHandle(this.valueToPosition(this.lowValue));

        /*
         the order here is important since the selection bar should be
         updated after the high handle but before the combined label
         */
        if (this.range)
          this.updateHighHandle(this.valueToPosition(this.highValue));
        this.updateSelectionBar();
        if (this.range)
          this.updateCmbLabel();

        this.updateTicksScale();
      },

      /**
       * Translate value to human readable format
       *
       * @param {number|string} value
       * @param {jqLite} label
       * @param {String} which
       * @param {boolean} [useCustomTr]
       * @returns {undefined}
       */
      translateFn: function(value, label, which, useCustomTr) {
        useCustomTr = useCustomTr === undefined ? true : useCustomTr;

        var valStr = '',
          getDimension = false,
          noLabelInjection = label.hasClass('no-label-injection');

        if (useCustomTr) {
          if (this.options.stepsArray && !this.options.bindIndexForStepsArray)
            value = this.getStepValue(value);
          valStr = String(this.customTrFn(value, this.options.id, which));
        }
        else {
          valStr = String(value)
        }

        if (label.rzsv === undefined || label.rzsv.length !== valStr.length || (label.rzsv.length > 0 && label.rzsd === 0)) {
          getDimension = true;
          label.rzsv = valStr;
        }

        if (!noLabelInjection) {
          label.html(valStr);
        }
        ;

        this.scope[which + 'Label'] = valStr;

        // Update width only when length of the label have changed
        if (getDimension) {
          this.getDimension(label);
        }
      },

      /**
       * Set maximum and minimum values for the slider and ensure the model and high
       * value match these limits
       * @returns {undefined}
       */
      setMinAndMax: function() {

        this.step = +this.options.step;
        this.precision = +this.options.precision;

        this.minValue = this.options.floor;
        if (this.options.logScale && this.minValue === 0)
          throw Error("Can't use floor=0 with logarithmic scale");

        if (this.options.enforceStep) {
          this.lowValue = this.roundStep(this.lowValue);
          if (this.range)
            this.highValue = this.roundStep(this.highValue);
        }

        if (this.options.ceil != null)
          this.maxValue = this.options.ceil;
        else
          this.maxValue = this.options.ceil = this.range ? this.highValue : this.lowValue;

        if (this.options.enforceRange) {
          this.lowValue = this.sanitizeValue(this.lowValue);
          if (this.range)
            this.highValue = this.sanitizeValue(this.highValue);
        }

        this.applyLowValue();
        if (this.range)
          this.applyHighValue();

        this.valueRange = this.maxValue - this.minValue;
      },

      /**
       * Adds accessibility attributes
       *
       * Run only once during initialization
       *
       * @returns {undefined}
       */
      addAccessibility: function() {
        this.minH.attr('role', 'slider');
        this.updateAriaAttributes();
        if (this.options.keyboardSupport && !(this.options.readOnly || this.options.disabled))
          this.minH.attr('tabindex', '0');
        else
          this.minH.attr('tabindex', '');
        if (this.options.vertical)
          this.minH.attr('aria-orientation', 'vertical');

        if (this.range) {
          this.maxH.attr('role', 'slider');
          if (this.options.keyboardSupport && !(this.options.readOnly || this.options.disabled))
            this.maxH.attr('tabindex', '0');
          else
            this.maxH.attr('tabindex', '');
          if (this.options.vertical)
            this.maxH.attr('aria-orientation', 'vertical');
        }
      },

      /**
       * Updates aria attributes according to current values
       */
      updateAriaAttributes: function() {
        this.minH.attr({
          'aria-valuenow': this.scope.rzSliderModel,
          'aria-valuetext': this.customTrFn(this.scope.rzSliderModel, this.options.id, 'model'),
          'aria-valuemin': this.minValue,
          'aria-valuemax': this.maxValue
        });
        if (this.range) {
          this.maxH.attr({
            'aria-valuenow': this.scope.rzSliderHigh,
            'aria-valuetext': this.customTrFn(this.scope.rzSliderHigh, this.options.id, 'high'),
            'aria-valuemin': this.minValue,
            'aria-valuemax': this.maxValue
          });
        }
      },

      /**
       * Calculate dimensions that are dependent on view port size
       *
       * Run once during initialization and every time view port changes size.
       *
       * @returns {undefined}
       */
      calcViewDimensions: function() {
        var handleWidth = this.getDimension(this.minH);

        this.handleHalfDim = handleWidth / 2;
        this.barDimension = this.getDimension(this.fullBar);

        this.maxPos = this.barDimension - handleWidth;

        this.getDimension(this.sliderElem);
        this.sliderElem.rzsp = this.sliderElem[0].getBoundingClientRect()[this.positionProperty];

        if (this.initHasRun) {
          this.updateFloorLab();
          this.updateCeilLab();
          this.initHandles();
          var self = this;
          $timeout(function() {
            self.updateTicksScale();
          });
        }
      },

      /**
       * Update the ticks position
       *
       * @returns {undefined}
       */
      updateTicksScale: function() {
        if (!this.options.showTicks) return;

        var ticksArray = this.options.ticksArray || this.getTicksArray(),
          translate = this.options.vertical ? 'translateY' : 'translateX',
          self = this;

        if (this.options.rightToLeft)
          ticksArray.reverse();

        this.scope.ticks = ticksArray.map(function(value) {
          var position = self.valueToPosition(value);

          if (self.options.vertical)
            position = self.maxPos - position;

          var tick = {
            selected: self.isTickSelected(value),
            style: {
              transform: translate + '(' + Math.round(position) + 'px)'
            }
          };
          if (tick.selected && self.options.getSelectionBarColor) {
            tick.style['background-color'] = self.getSelectionBarColor();
          }
          if (!tick.selected && self.options.getTickColor) {
            tick.style['background-color'] = self.getTickColor(value);
          }
          if (self.options.ticksTooltip) {
            tick.tooltip = self.options.ticksTooltip(value);
            tick.tooltipPlacement = self.options.vertical ? 'right' : 'top';
          }
          if (self.options.showTicksValues) {
            tick.value = self.getDisplayValue(value, 'tick-value');
            if (self.options.ticksValuesTooltip) {
              tick.valueTooltip = self.options.ticksValuesTooltip(value);
              tick.valueTooltipPlacement = self.options.vertical ? 'right' : 'top';
            }
          }
          if (self.getLegend) {
            var legend = self.getLegend(value, self.options.id);
            if (legend)
              tick.legend = legend;
          }
          return tick;
        });
      },

      getTicksArray: function() {
        var step = this.step,
          ticksArray = [];
        if (this.intermediateTicks)
          step = this.options.showTicks;
        for (var value = this.minValue; value <= this.maxValue; value += step) {
          ticksArray.push(value);
        }
        return ticksArray;
      },

      isTickSelected: function(value) {
        if (!this.range) {
          if (this.options.showSelectionBarFromValue !== null) {
            var center = this.options.showSelectionBarFromValue;
            if (this.lowValue > center && value >= center && value <= this.lowValue)
              return true;
            else if (this.lowValue < center && value <= center && value >= this.lowValue)
              return true;
          }
          else if (this.options.showSelectionBarEnd) {
            if (value >= this.lowValue)
              return true;
          }
          else if (this.options.showSelectionBar && value <= this.lowValue)
            return true;
        }
        if (this.range && value >= this.lowValue && value <= this.highValue)
          return true;
        return false;
      },

      /**
       * Update position of the floor label
       *
       * @returns {undefined}
       */
      updateFloorLab: function() {
        this.translateFn(this.minValue, this.flrLab, 'floor');
        this.getDimension(this.flrLab);
        var position = this.options.rightToLeft ? this.barDimension - this.flrLab.rzsd : 0;
        this.setPosition(this.flrLab, position);
      },

      /**
       * Update position of the ceiling label
       *
       * @returns {undefined}
       */
      updateCeilLab: function() {
        this.translateFn(this.maxValue, this.ceilLab, 'ceil');
        this.getDimension(this.ceilLab);
        var position = this.options.rightToLeft ? 0 : this.barDimension - this.ceilLab.rzsd;
        this.setPosition(this.ceilLab, position);
      },

      /**
       * Update slider handles and label positions
       *
       * @param {string} which
       * @param {number} newPos
       */
      updateHandles: function(which, newPos) {
        if (which === 'lowValue')
          this.updateLowHandle(newPos);
        else
          this.updateHighHandle(newPos);

        this.updateSelectionBar();
        this.updateTicksScale();
        if (this.range)
          this.updateCmbLabel();
      },

      /**
       * Helper function to work out the position for handle labels depending on RTL or not
       *
       * @param {string} labelName maxLab or minLab
       * @param newPos
       *
       * @returns {number}
       */
      getHandleLabelPos: function(labelName, newPos) {
        var labelRzsd = this[labelName].rzsd,
          nearHandlePos = newPos - labelRzsd / 2 + this.handleHalfDim,
          endOfBarPos = this.barDimension - labelRzsd;

        if (!this.options.boundPointerLabels)
          return nearHandlePos;

        if (this.options.rightToLeft && labelName === 'minLab' || !this.options.rightToLeft && labelName === 'maxLab') {
          return Math.min(nearHandlePos, endOfBarPos);
        } else {
          return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
        }
      },

      /**
       * Update low slider handle position and label
       *
       * @param {number} newPos
       * @returns {undefined}
       */
      updateLowHandle: function(newPos) {
        this.setPosition(this.minH, newPos);
        this.translateFn(this.lowValue, this.minLab, 'model');
        this.setPosition(this.minLab, this.getHandleLabelPos('minLab', newPos));

        if (this.options.getPointerColor) {
          var pointercolor = this.getPointerColor('min');
          this.scope.minPointerStyle = {
            backgroundColor: pointercolor
          };
        }

        if (this.options.autoHideLimitLabels) {
          this.shFloorCeil();
        }
      },

      /**
       * Update high slider handle position and label
       *
       * @param {number} newPos
       * @returns {undefined}
       */
      updateHighHandle: function(newPos) {
        this.setPosition(this.maxH, newPos);
        this.translateFn(this.highValue, this.maxLab, 'high');
        this.setPosition(this.maxLab, this.getHandleLabelPos('maxLab', newPos));

        if (this.options.getPointerColor) {
          var pointercolor = this.getPointerColor('max');
          this.scope.maxPointerStyle = {
            backgroundColor: pointercolor
          };
        }
        if (this.options.autoHideLimitLabels) {
          this.shFloorCeil();
        }

      },

      /**
       * Show/hide floor/ceiling label
       *
       * @returns {undefined}
       */
      shFloorCeil: function() {
        // Show based only on hideLimitLabels if pointer labels are hidden
        if (this.options.hidePointerLabels) {
          return;
        }
        var flHidden = false,
          clHidden = false,
          isMinLabAtFloor = this.isLabelBelowFloorLab(this.minLab),
          isMinLabAtCeil = this.isLabelAboveCeilLab(this.minLab),
          isMaxLabAtCeil = this.isLabelAboveCeilLab(this.maxLab),
          isCmbLabAtFloor = this.isLabelBelowFloorLab(this.cmbLab),
          isCmbLabAtCeil =  this.isLabelAboveCeilLab(this.cmbLab);

        if (isMinLabAtFloor) {
          flHidden = true;
          this.hideEl(this.flrLab);
        } else {
          flHidden = false;
          this.showEl(this.flrLab);
        }

        if (isMinLabAtCeil) {
          clHidden = true;
          this.hideEl(this.ceilLab);
        } else {
          clHidden = false;
          this.showEl(this.ceilLab);
        }

        if (this.range) {
          var hideCeil = this.cmbLabelShown ? isCmbLabAtCeil : isMaxLabAtCeil;
          var hideFloor = this.cmbLabelShown ? isCmbLabAtFloor : isMinLabAtFloor;

          if (hideCeil) {
            this.hideEl(this.ceilLab);
          } else if (!clHidden) {
            this.showEl(this.ceilLab);
          }

          // Hide or show floor label
          if (hideFloor) {
            this.hideEl(this.flrLab);
          } else if (!flHidden) {
            this.showEl(this.flrLab);
          }
        }
      },

      isLabelBelowFloorLab: function(label) {
        var isRTL = this.options.rightToLeft,
          pos = label.rzsp,
          dim = label.rzsd,
          floorPos = this.flrLab.rzsp,
          floorDim = this.flrLab.rzsd;
        return isRTL ?
        pos + dim >= floorPos - 2 :
        pos <= floorPos + floorDim + 2;
      },

      isLabelAboveCeilLab: function(label) {
        var isRTL = this.options.rightToLeft,
          pos = label.rzsp,
          dim = label.rzsd,
          ceilPos = this.ceilLab.rzsp,
          ceilDim = this.ceilLab.rzsd;
        return isRTL ?
        pos <= ceilPos + ceilDim + 2 :
        pos + dim >= ceilPos - 2;
      },

      /**
       * Update slider selection bar, combined label and range label
       *
       * @returns {undefined}
       */
      updateSelectionBar: function() {
        var position = 0,
          dimension = 0,
          isSelectionBarFromRight = this.options.rightToLeft ? !this.options.showSelectionBarEnd : this.options.showSelectionBarEnd,
          positionForRange = this.options.rightToLeft ? this.maxH.rzsp + this.handleHalfDim : this.minH.rzsp + this.handleHalfDim;

        if (this.range) {
          dimension = Math.abs(this.maxH.rzsp - this.minH.rzsp);
          position = positionForRange;
        }
        else {
          if (this.options.showSelectionBarFromValue !== null) {
            var center = this.options.showSelectionBarFromValue,
              centerPosition = this.valueToPosition(center),
              isModelGreaterThanCenter = this.options.rightToLeft ? this.lowValue <= center : this.lowValue > center;
            if (isModelGreaterThanCenter) {
              dimension = this.minH.rzsp - centerPosition;
              position = centerPosition + this.handleHalfDim;
            }
            else {
              dimension = centerPosition - this.minH.rzsp;
              position = this.minH.rzsp + this.handleHalfDim;
            }
          }
          else if (isSelectionBarFromRight) {
            dimension = Math.abs(this.maxPos - this.minH.rzsp) + this.handleHalfDim;
            position = this.minH.rzsp + this.handleHalfDim;
          } else {
            dimension = Math.abs(this.maxH.rzsp - this.minH.rzsp) + this.handleHalfDim;
            position = 0;
          }
        }
        this.setDimension(this.selBar, dimension);
        this.setPosition(this.selBar, position);
        if (this.options.getSelectionBarColor) {
          var color = this.getSelectionBarColor();
          this.scope.barStyle = {
            backgroundColor: color
          };
        } else if (this.options.selectionBarGradient) {
          var offset = this.options.showSelectionBarFromValue !== null ? this.valueToPosition(this.options.showSelectionBarFromValue) : 0,
            reversed = offset - position > 0 ^ isSelectionBarFromRight,
            direction = this.options.vertical ? (reversed ? 'bottom' : 'top') : (reversed ? 'left' : 'right');
          this.scope.barStyle = {
            backgroundImage: 'linear-gradient(to ' + direction + ', ' + this.options.selectionBarGradient.from + ' 0%,' + this.options.selectionBarGradient.to + ' 100%)'
          };
          if (this.options.vertical) {
            this.scope.barStyle.backgroundPosition = 'center ' + (offset + dimension + position + (reversed ? -this.handleHalfDim : 0)) + 'px';
            this.scope.barStyle.backgroundSize = '100% ' + (this.barDimension - this.handleHalfDim) + 'px';
          } else {
            this.scope.barStyle.backgroundPosition = (offset - position + (reversed ? this.handleHalfDim : 0)) + 'px center';
            this.scope.barStyle.backgroundSize = (this.barDimension - this.handleHalfDim) + 'px 100%';
          }
        }
      },

      /**
       * Wrapper around the getSelectionBarColor of the user to pass to
       * correct parameters
       */
      getSelectionBarColor: function() {
        if (this.range)
          return this.options.getSelectionBarColor(this.scope.rzSliderModel, this.scope.rzSliderHigh);
        return this.options.getSelectionBarColor(this.scope.rzSliderModel);
      },

      /**
       * Wrapper around the getPointerColor of the user to pass to
       * correct parameters
       */
      getPointerColor: function(pointerType) {
        if (pointerType === 'max') {
          return this.options.getPointerColor(this.scope.rzSliderHigh, pointerType);
        }
        return this.options.getPointerColor(this.scope.rzSliderModel, pointerType);
      },

      /**
       * Wrapper around the getTickColor of the user to pass to
       * correct parameters
       */
      getTickColor: function(value) {
        return this.options.getTickColor(value);
      },

      /**
       * Update combined label position and value
       *
       * @returns {undefined}
       */
      updateCmbLabel: function() {
        var isLabelOverlap = null;
        if (this.options.rightToLeft) {
          isLabelOverlap = this.minLab.rzsp - this.minLab.rzsd - 10 <= this.maxLab.rzsp;
        } else {
          isLabelOverlap = this.minLab.rzsp + this.minLab.rzsd + 10 >= this.maxLab.rzsp;
        }

        if (isLabelOverlap) {
          var lowTr = this.getDisplayValue(this.lowValue, 'model'),
            highTr = this.getDisplayValue(this.highValue, 'high'),
            labelVal = '';
          if (this.options.mergeRangeLabelsIfSame && lowTr === highTr) {
            labelVal = lowTr;
          } else {
            labelVal = this.options.rightToLeft ? highTr + ' - ' + lowTr : lowTr + ' - ' + highTr;
          }

          this.translateFn(labelVal, this.cmbLab, 'cmb', false);
          var pos = this.options.boundPointerLabels ? Math.min(
            Math.max(
              this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2,
              0
            ),
            this.barDimension - this.cmbLab.rzsd
          ) : this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2;

          this.setPosition(this.cmbLab, pos);
          this.cmbLabelShown = true;
          this.hideEl(this.minLab);
          this.hideEl(this.maxLab);
          this.showEl(this.cmbLab);
        } else {
          this.cmbLabelShown = false;
          this.showEl(this.maxLab);
          this.showEl(this.minLab);
          this.hideEl(this.cmbLab);
        }
        if (this.options.autoHideLimitLabels) {
          this.shFloorCeil();
        }
      },

      /**
       * Return the translated value if a translate function is provided else the original value
       * @param value
       * @param which if it's min or max handle
       * @returns {*}
       */
      getDisplayValue: function(value, which) {
        if (this.options.stepsArray && !this.options.bindIndexForStepsArray) {
          value = this.getStepValue(value);
        }
        return this.customTrFn(value, this.options.id, which);
      },

      /**
       * Round value to step and precision based on minValue
       *
       * @param {number} value
       * @param {number} customStep a custom step to override the defined step
       * @returns {number}
       */
      roundStep: function(value, customStep) {
        var step = customStep ? customStep : this.step,
          steppedDifference = parseFloat((value - this.minValue) / step).toPrecision(12);
        steppedDifference = Math.round(+steppedDifference) * step;
        var newValue = (this.minValue + steppedDifference).toFixed(this.precision);
        return +newValue;
      },

      /**
       * Hide element
       *
       * @param element
       * @returns {jqLite} The jqLite wrapped DOM element
       */
      hideEl: function(element) {
        return element.css({
          visibility: 'hidden'
        });
      },

      /**
       * Show element
       *
       * @param element The jqLite wrapped DOM element
       * @returns {jqLite} The jqLite
       */
      showEl: function(element) {
        if (!!element.rzAlwaysHide) {
          return element;
        }

        return element.css({
          visibility: 'visible'
        });
      },

      /**
       * Set element left/top position depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem The jqLite wrapped DOM element
       * @param {number} pos
       * @returns {number}
       */
      setPosition: function(elem, pos) {
        elem.rzsp = pos;
        var css = {};
        css[this.positionProperty] = Math.round(pos) + 'px';
        elem.css(css);
        return pos;
      },

      /**
       * Get element width/height depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem The jqLite wrapped DOM element
       * @returns {number}
       */
      getDimension: function(elem) {
        var val = elem[0].getBoundingClientRect();
        if (this.options.vertical)
          elem.rzsd = (val.bottom - val.top) * this.options.scale;
        else
          elem.rzsd = (val.right - val.left) * this.options.scale;
        return elem.rzsd;
      },

      /**
       * Set element width/height depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem  The jqLite wrapped DOM element
       * @param {number} dim
       * @returns {number}
       */
      setDimension: function(elem, dim) {
        elem.rzsd = dim;
        var css = {};
        css[this.dimensionProperty] = Math.round(dim) + 'px';
        elem.css(css);
        return dim;
      },

      /**
       * Returns a value that is within slider range
       *
       * @param {number} val
       * @returns {number}
       */
      sanitizeValue: function(val) {
        return Math.min(Math.max(val, this.minValue), this.maxValue);
      },

      /**
       * Translate value to pixel position
       *
       * @param {number} val
       * @returns {number}
       */
      valueToPosition: function(val) {
        var fn = this.linearValueToPosition;
        if (this.options.customValueToPosition)
          fn = this.options.customValueToPosition;
        else if (this.options.logScale)
          fn = this.logValueToPosition;

        val = this.sanitizeValue(val);
        var percent = fn(val, this.minValue, this.maxValue) || 0;
        if (this.options.rightToLeft)
          percent = 1 - percent;
        return percent * this.maxPos;
      },

      linearValueToPosition: function(val, minVal, maxVal) {
        var range = maxVal - minVal;
        return (val - minVal) / range;
      },

      logValueToPosition: function(val, minVal, maxVal) {
        val = Math.log(val);
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        var range = maxVal - minVal;
        return (val - minVal) / range;
      },

      /**
       * Translate position to model value
       *
       * @param {number} position
       * @returns {number}
       */
      positionToValue: function(position) {
        var percent = position / this.maxPos;
        if (this.options.rightToLeft)
          percent = 1 - percent;
        var fn = this.linearPositionToValue;
        if (this.options.customPositionToValue)
          fn = this.options.customPositionToValue;
        else if (this.options.logScale)
          fn = this.logPositionToValue;
        return fn(percent, this.minValue, this.maxValue) || 0;
      },

      linearPositionToValue: function(percent, minVal, maxVal) {
        return percent * (maxVal - minVal) + minVal;
      },

      logPositionToValue: function(percent, minVal, maxVal) {
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        var value = percent * (maxVal - minVal) + minVal;
        return Math.exp(value);
      },

      // Events
      /**
       * Get the X-coordinate or Y-coordinate of an event
       *
       * @param {Object} event  The event
       * @returns {number}
       */
      getEventXY: function(event) {
        /* http://stackoverflow.com/a/12336075/282882 */
        //noinspection JSLint
        var clientXY = this.options.vertical ? 'clientY' : 'clientX';
        if (event[clientXY] !== undefined) {
          return event[clientXY];
        }

        return event.originalEvent === undefined ?
          event.touches[0][clientXY] : event.originalEvent.touches[0][clientXY];
      },

      /**
       * Compute the event position depending on whether the slider is horizontal or vertical
       * @param event
       * @returns {number}
       */
      getEventPosition: function(event) {
        var sliderPos = this.sliderElem.rzsp,
          eventPos = 0;
        if (this.options.vertical)
          eventPos = -this.getEventXY(event) + sliderPos;
        else
          eventPos = this.getEventXY(event) - sliderPos;
        return eventPos * this.options.scale - this.handleHalfDim; // #346 handleHalfDim is already scaled
      },

      /**
       * Get event names for move and event end
       *
       * @param {Event}    event    The event
       *
       * @return {{moveEvent: string, endEvent: string}}
       */
      getEventNames: function(event) {
        var eventNames = {
          moveEvent: '',
          endEvent: ''
        };

        if (event.touches || (event.originalEvent !== undefined && event.originalEvent.touches)) {
          eventNames.moveEvent = 'touchmove';
          eventNames.endEvent = 'touchend';
        } else {
          eventNames.moveEvent = 'mousemove';
          eventNames.endEvent = 'mouseup';
        }

        return eventNames;
      },

      /**
       * Get the handle closest to an event.
       *
       * @param event {Event} The event
       * @returns {jqLite} The handle closest to the event.
       */
      getNearestHandle: function(event) {
        if (!this.range) {
          return this.minH;
        }
        var position = this.getEventPosition(event),
          distanceMin = Math.abs(position - this.minH.rzsp),
          distanceMax = Math.abs(position - this.maxH.rzsp);
        if (distanceMin < distanceMax)
          return this.minH;
        else if (distanceMin > distanceMax)
          return this.maxH;
        else if (!this.options.rightToLeft)
        //if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
          return position < this.minH.rzsp ? this.minH : this.maxH;
        else
        //reverse in rtl
          return position > this.minH.rzsp ? this.minH : this.maxH;
      },

      /**
       * Wrapper function to focus an angular element
       *
       * @param el {AngularElement} the element to focus
       */
      focusElement: function(el) {
        var DOM_ELEMENT = 0;
        el[DOM_ELEMENT].focus();
      },

      /**
       * Bind mouse and touch events to slider handles
       *
       * @returns {undefined}
       */
      bindEvents: function() {
        var barTracking, barStart, barMove;

        if (this.options.draggableRange) {
          barTracking = 'rzSliderDrag';
          barStart = this.onDragStart;
          barMove = this.onDragMove;
        } else {
          barTracking = 'lowValue';
          barStart = this.onStart;
          barMove = this.onMove;
        }

        if (!this.options.onlyBindHandles) {
          this.selBar.on('mousedown', angular.bind(this, barStart, null, barTracking));
          this.selBar.on('mousedown', angular.bind(this, barMove, this.selBar));
        }

        if (this.options.draggableRangeOnly) {
          this.minH.on('mousedown', angular.bind(this, barStart, null, barTracking));
          this.maxH.on('mousedown', angular.bind(this, barStart, null, barTracking));
        } else {
          this.minH.on('mousedown', angular.bind(this, this.onStart, this.minH, 'lowValue'));
          if (this.range) {
            this.maxH.on('mousedown', angular.bind(this, this.onStart, this.maxH, 'highValue'));
          }
          if (!this.options.onlyBindHandles) {
            this.fullBar.on('mousedown', angular.bind(this, this.onStart, null, null));
            this.fullBar.on('mousedown', angular.bind(this, this.onMove, this.fullBar));
            this.ticks.on('mousedown', angular.bind(this, this.onStart, null, null));
            this.ticks.on('mousedown', angular.bind(this, this.onTickClick, this.ticks));
          }
        }

        if (!this.options.onlyBindHandles) {
          this.selBar.on('touchstart', angular.bind(this, barStart, null, barTracking));
          this.selBar.on('touchstart', angular.bind(this, barMove, this.selBar));
        }
        if (this.options.draggableRangeOnly) {
          this.minH.on('touchstart', angular.bind(this, barStart, null, barTracking));
          this.maxH.on('touchstart', angular.bind(this, barStart, null, barTracking));
        } else {
          this.minH.on('touchstart', angular.bind(this, this.onStart, this.minH, 'lowValue'));
          if (this.range) {
            this.maxH.on('touchstart', angular.bind(this, this.onStart, this.maxH, 'highValue'));
          }
          if (!this.options.onlyBindHandles) {
            this.fullBar.on('touchstart', angular.bind(this, this.onStart, null, null));
            this.fullBar.on('touchstart', angular.bind(this, this.onMove, this.fullBar));
            this.ticks.on('touchstart', angular.bind(this, this.onStart, null, null));
            this.ticks.on('touchstart', angular.bind(this, this.onTickClick, this.ticks));
          }
        }

        if (this.options.keyboardSupport) {
          this.minH.on('focus', angular.bind(this, this.onPointerFocus, this.minH, 'lowValue'));
          if (this.range) {
            this.maxH.on('focus', angular.bind(this, this.onPointerFocus, this.maxH, 'highValue'));
          }
        }
      },

      /**
       * Unbind mouse and touch events to slider handles
       *
       * @returns {undefined}
       */
      unbindEvents: function() {
        this.minH.off();
        this.maxH.off();
        this.fullBar.off();
        this.selBar.off();
        this.ticks.off();
      },

      /**
       * onStart event handler
       *
       * @param {?Object} pointer The jqLite wrapped DOM element; if null, the closest handle is used
       * @param {?string} ref     The name of the handle being changed; if null, the closest handle's value is modified
       * @param {Event}   event   The event
       * @returns {undefined}
       */
      onStart: function(pointer, ref, event) {
        var ehMove, ehEnd,
          eventNames = this.getEventNames(event);

        event.stopPropagation();
        event.preventDefault();

        // We have to do this in case the HTML where the sliders are on
        // have been animated into view.
        this.calcViewDimensions();

        if (pointer) {
          this.tracking = ref;
        } else {
          pointer = this.getNearestHandle(event);
          this.tracking = pointer === this.minH ? 'lowValue' : 'highValue';
        }

        pointer.addClass('rz-active');

        if (this.options.keyboardSupport)
          this.focusElement(pointer);

        ehMove = angular.bind(this, this.dragging.active ? this.onDragMove : this.onMove, pointer);
        ehEnd = angular.bind(this, this.onEnd, ehMove);

        $document.on(eventNames.moveEvent, ehMove);
        $document.one(eventNames.endEvent, ehEnd);
        this.callOnStart();
      },

      /**
       * onMove event handler
       *
       * @param {jqLite} pointer
       * @param {Event}  event The event
       * @param {boolean}  fromTick if the event occured on a tick or not
       * @returns {undefined}
       */
      onMove: function(pointer, event, fromTick) {
        var newPos = this.getEventPosition(event),
          newValue,
          ceilValue = this.options.rightToLeft ? this.minValue : this.maxValue,
          flrValue = this.options.rightToLeft ? this.maxValue : this.minValue;

        if (newPos <= 0) {
          newValue = flrValue;
        } else if (newPos >= this.maxPos) {
          newValue = ceilValue;
        } else {
          newValue = this.positionToValue(newPos);
          if (fromTick && angular.isNumber(this.options.showTicks))
            newValue = this.roundStep(newValue, this.options.showTicks);
          else
            newValue = this.roundStep(newValue);
        }
        this.positionTrackingHandle(newValue);
      },

      /**
       * onEnd event handler
       *
       * @param {Event}    event    The event
       * @param {Function} ehMove   The the bound move event handler
       * @returns {undefined}
       */
      onEnd: function(ehMove, event) {
        var moveEventName = this.getEventNames(event).moveEvent;

        if (!this.options.keyboardSupport) {
          this.minH.removeClass('rz-active');
          this.maxH.removeClass('rz-active');
          this.tracking = '';
        }
        this.dragging.active = false;

        $document.off(moveEventName, ehMove);
        this.callOnEnd();
      },

      onTickClick: function(pointer, event) {
        this.onMove(pointer, event, true);
      },

      onPointerFocus: function(pointer, ref) {
        this.tracking = ref;
        pointer.one('blur', angular.bind(this, this.onPointerBlur, pointer));
        pointer.on('keydown', angular.bind(this, this.onKeyboardEvent));
        pointer.on('keyup', angular.bind(this, this.onKeyUp));
        this.firstKeyDown = true;
        pointer.addClass('rz-active');

        this.currentFocusElement = {
          pointer: pointer,
          ref: ref
        };
      },

      onKeyUp: function() {
        this.firstKeyDown = true;
        this.callOnEnd();
      },

      onPointerBlur: function(pointer) {
        pointer.off('keydown');
        pointer.off('keyup');
        this.tracking = '';
        pointer.removeClass('rz-active');
        this.currentFocusElement = null
      },

      /**
       * Key actions helper function
       *
       * @param {number} currentValue value of the slider
       *
       * @returns {?Object} action value mappings
       */
      getKeyActions: function(currentValue) {
        var increaseStep = currentValue + this.step,
          decreaseStep = currentValue - this.step,
          increasePage = currentValue + this.valueRange / 10,
          decreasePage = currentValue - this.valueRange / 10;

        //Left to right default actions
        var actions = {
          'UP': increaseStep,
          'DOWN': decreaseStep,
          'LEFT': decreaseStep,
          'RIGHT': increaseStep,
          'PAGEUP': increasePage,
          'PAGEDOWN': decreasePage,
          'HOME': this.minValue,
          'END': this.maxValue
        };
        //right to left means swapping right and left arrows
        if (this.options.rightToLeft) {
          actions.LEFT = increaseStep;
          actions.RIGHT = decreaseStep;
          // right to left and vertical means we also swap up and down
          if (this.options.vertical) {
            actions.UP = decreaseStep;
            actions.DOWN = increaseStep;
          }
        }
        return actions;
      },

      onKeyboardEvent: function(event) {
        var currentValue = this[this.tracking],
          keyCode = event.keyCode || event.which,
          keys = {
            38: 'UP',
            40: 'DOWN',
            37: 'LEFT',
            39: 'RIGHT',
            33: 'PAGEUP',
            34: 'PAGEDOWN',
            36: 'HOME',
            35: 'END'
          },
          actions = this.getKeyActions(currentValue),
          key = keys[keyCode],
          action = actions[key];
        if (action == null || this.tracking === '') return;
        event.preventDefault();

        if (this.firstKeyDown) {
          this.firstKeyDown = false;
          this.callOnStart();
        }

        var self = this;
        $timeout(function() {
          var newValue = self.roundStep(self.sanitizeValue(action));
          if (!self.options.draggableRangeOnly) {
            self.positionTrackingHandle(newValue);
          }
          else {
            var difference = self.highValue - self.lowValue,
              newMinValue, newMaxValue;
            if (self.tracking === 'lowValue') {
              newMinValue = newValue;
              newMaxValue = newValue + difference;
              if (newMaxValue > self.maxValue) {
                newMaxValue = self.maxValue;
                newMinValue = newMaxValue - difference;
              }
            } else {
              newMaxValue = newValue;
              newMinValue = newValue - difference;
              if (newMinValue < self.minValue) {
                newMinValue = self.minValue;
                newMaxValue = newMinValue + difference;
              }
            }
            self.positionTrackingBar(newMinValue, newMaxValue);
          }
        });
      },

      /**
       * onDragStart event handler
       *
       * Handles dragging of the middle bar.
       *
       * @param {Object} pointer The jqLite wrapped DOM element
       * @param {string} ref     One of the refLow, refHigh values
       * @param {Event}  event   The event
       * @returns {undefined}
       */
      onDragStart: function(pointer, ref, event) {
        var position = this.getEventPosition(event);
        this.dragging = {
          active: true,
          value: this.positionToValue(position),
          difference: this.highValue - this.lowValue,
          lowLimit: this.options.rightToLeft ? this.minH.rzsp - position : position - this.minH.rzsp,
          highLimit: this.options.rightToLeft ? position - this.maxH.rzsp : this.maxH.rzsp - position
        };

        this.onStart(pointer, ref, event);
      },

      /**
       * getValue helper function
       *
       * gets max or min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
       *
       * @param {string} type 'max' || 'min' The value we are calculating
       * @param {number} newPos  The new position
       * @param {boolean} outOfBounds Is the new position above or below the max/min?
       * @param {boolean} isAbove Is the new position above the bar if out of bounds?
       *
       * @returns {number}
       */
      getValue: function(type, newPos, outOfBounds, isAbove) {
        var isRTL = this.options.rightToLeft,
          value = null;

        if (type === 'min') {
          if (outOfBounds) {
            if (isAbove) {
              value = isRTL ? this.minValue : this.maxValue - this.dragging.difference;
            } else {
              value = isRTL ? this.maxValue - this.dragging.difference : this.minValue;
            }
          } else {
            value = isRTL ? this.positionToValue(newPos + this.dragging.lowLimit) : this.positionToValue(newPos - this.dragging.lowLimit)
          }
        } else {
          if (outOfBounds) {
            if (isAbove) {
              value = isRTL ? this.minValue + this.dragging.difference : this.maxValue;
            } else {
              value = isRTL ? this.maxValue : this.minValue + this.dragging.difference;
            }
          } else {
            if (isRTL) {
              value = this.positionToValue(newPos + this.dragging.lowLimit) + this.dragging.difference
            } else {
              value = this.positionToValue(newPos - this.dragging.lowLimit) + this.dragging.difference;
            }
          }
        }
        return this.roundStep(value);
      },

      /**
       * onDragMove event handler
       *
       * Handles dragging of the middle bar.
       *
       * @param {jqLite} pointer
       * @param {Event}  event The event
       * @returns {undefined}
       */
      onDragMove: function(pointer, event) {
        var newPos = this.getEventPosition(event),
          newMinValue, newMaxValue,
          ceilLimit, flrLimit,
          isUnderFlrLimit, isOverCeilLimit,
          flrH, ceilH;

        if (this.options.rightToLeft) {
          ceilLimit = this.dragging.lowLimit;
          flrLimit = this.dragging.highLimit;
          flrH = this.maxH;
          ceilH = this.minH;
        } else {
          ceilLimit = this.dragging.highLimit;
          flrLimit = this.dragging.lowLimit;
          flrH = this.minH;
          ceilH = this.maxH;
        }
        isUnderFlrLimit = newPos <= flrLimit;
        isOverCeilLimit = newPos >= this.maxPos - ceilLimit;

        if (isUnderFlrLimit) {
          if (flrH.rzsp === 0)
            return;
          newMinValue = this.getValue('min', newPos, true, false);
          newMaxValue = this.getValue('max', newPos, true, false);
        } else if (isOverCeilLimit) {
          if (ceilH.rzsp === this.maxPos)
            return;
          newMaxValue = this.getValue('max', newPos, true, true);
          newMinValue = this.getValue('min', newPos, true, true);
        } else {
          newMinValue = this.getValue('min', newPos, false);
          newMaxValue = this.getValue('max', newPos, false);
        }
        this.positionTrackingBar(newMinValue, newMaxValue);
      },

      /**
       * Set the new value and position for the entire bar
       *
       * @param {number} newMinValue   the new minimum value
       * @param {number} newMaxValue   the new maximum value
       */
      positionTrackingBar: function(newMinValue, newMaxValue) {

        if (this.options.minLimit != null && newMinValue < this.options.minLimit) {
          newMinValue = this.options.minLimit;
          newMaxValue = newMinValue + this.dragging.difference;
        }
        if (this.options.maxLimit != null && newMaxValue > this.options.maxLimit) {
          newMaxValue = this.options.maxLimit;
          newMinValue = newMaxValue - this.dragging.difference;
        }

        this.lowValue = newMinValue;
        this.highValue = newMaxValue;
        this.applyLowValue();
        if (this.range)
          this.applyHighValue();
        this.applyModel(true);
        this.updateHandles('lowValue', this.valueToPosition(newMinValue));
        this.updateHandles('highValue', this.valueToPosition(newMaxValue));
      },

      /**
       * Set the new value and position to the current tracking handle
       *
       * @param {number} newValue new model value
       */
      positionTrackingHandle: function(newValue) {
        var valueChanged = false;
        newValue = this.applyMinMaxLimit(newValue);
        if (this.range) {
          if (this.options.pushRange) {
            newValue = this.applyPushRange(newValue);
            valueChanged = true;
          }
          else {
            if (this.options.noSwitching) {
              if (this.tracking === 'lowValue' && newValue > this.highValue)
                newValue = this.applyMinMaxRange(this.highValue);
              else if (this.tracking === 'highValue' && newValue < this.lowValue)
                newValue = this.applyMinMaxRange(this.lowValue);
            }
            newValue = this.applyMinMaxRange(newValue);
            /* This is to check if we need to switch the min and max handles */
            if (this.tracking === 'lowValue' && newValue > this.highValue) {
              this.lowValue = this.highValue;
              this.applyLowValue();
              this.applyModel();
              this.updateHandles(this.tracking, this.maxH.rzsp);
              this.updateAriaAttributes();
              this.tracking = 'highValue';
              this.minH.removeClass('rz-active');
              this.maxH.addClass('rz-active');
              if (this.options.keyboardSupport)
                this.focusElement(this.maxH);
              valueChanged = true;
            }
            else if (this.tracking === 'highValue' && newValue < this.lowValue) {
              this.highValue = this.lowValue;
              this.applyHighValue();
              this.applyModel();
              this.updateHandles(this.tracking, this.minH.rzsp);
              this.updateAriaAttributes();
              this.tracking = 'lowValue';
              this.maxH.removeClass('rz-active');
              this.minH.addClass('rz-active');
              if (this.options.keyboardSupport)
                this.focusElement(this.minH);
              valueChanged = true;
            }
          }
        }

        if (this[this.tracking] !== newValue) {
          this[this.tracking] = newValue;
          if (this.tracking === 'lowValue')
            this.applyLowValue();
          else
            this.applyHighValue();
          this.applyModel();
          this.updateHandles(this.tracking, this.valueToPosition(newValue));
          this.updateAriaAttributes();
          valueChanged = true;
        }

        if (valueChanged)
          this.applyModel(true);
      },

      applyMinMaxLimit: function(newValue) {
        if (this.options.minLimit != null && newValue < this.options.minLimit)
          return this.options.minLimit;
        if (this.options.maxLimit != null && newValue > this.options.maxLimit)
          return this.options.maxLimit;
        return newValue;
      },

      applyMinMaxRange: function(newValue) {
        var oppositeValue = this.tracking === 'lowValue' ? this.highValue : this.lowValue,
          difference = Math.abs(newValue - oppositeValue);
        if (this.options.minRange != null) {
          if (difference < this.options.minRange) {
            if (this.tracking === 'lowValue')
              return this.highValue - this.options.minRange;
            else
              return this.lowValue + this.options.minRange;
          }
        }
        if (this.options.maxRange != null) {
          if (difference > this.options.maxRange) {
            if (this.tracking === 'lowValue')
              return this.highValue - this.options.maxRange;
            else
              return this.lowValue + this.options.maxRange;
          }
        }
        return newValue;
      },

      applyPushRange: function(newValue) {
        var difference = this.tracking === 'lowValue' ? this.highValue - newValue : newValue - this.lowValue,
          minRange = this.options.minRange !== null ? this.options.minRange : this.options.step,
          maxRange = this.options.maxRange;
        // if smaller than minRange
        if (difference < minRange) {
          if (this.tracking === 'lowValue') {
            this.highValue = Math.min(newValue + minRange, this.maxValue);
            newValue = this.highValue - minRange;
            this.applyHighValue();
            this.updateHandles('highValue', this.valueToPosition(this.highValue));
          }
          else {
            this.lowValue = Math.max(newValue - minRange, this.minValue);
            newValue = this.lowValue + minRange;
            this.applyLowValue();
            this.updateHandles('lowValue', this.valueToPosition(this.lowValue));
          }
          this.updateAriaAttributes();
        }
        // if greater than maxRange
        else if (maxRange !== null && difference > maxRange) {
          if (this.tracking === 'lowValue') {
            this.highValue = newValue + maxRange;
            this.applyHighValue();
            this.updateHandles('highValue', this.valueToPosition(this.highValue));
          }
          else {
            this.lowValue = newValue - maxRange;
            this.applyLowValue();
            this.updateHandles('lowValue', this.valueToPosition(this.lowValue));
          }
          this.updateAriaAttributes();
        }
        return newValue;
      },

      /**
       * Apply the model values using scope.$apply.
       * We wrap it with the internalChange flag to avoid the watchers to be called
       */
      applyModel: function(callOnChange) {
        this.internalChange = true;
        this.scope.$apply();
        callOnChange && this.callOnChange();
        this.internalChange = false;
      },

      /**
       * Call the onStart callback if defined
       * The callback call is wrapped in a $evalAsync to ensure that its result will be applied to the scope.
       *
       * @returns {undefined}
       */
      callOnStart: function() {
        if (this.options.onStart) {
          var self = this,
            pointerType = this.tracking === 'lowValue' ? 'min' : 'max';
          this.scope.$evalAsync(function() {
            self.options.onStart(self.options.id, self.scope.rzSliderModel, self.scope.rzSliderHigh, pointerType);
          });
        }
      },

      /**
       * Call the onChange callback if defined
       * The callback call is wrapped in a $evalAsync to ensure that its result will be applied to the scope.
       *
       * @returns {undefined}
       */
      callOnChange: function() {
        if (this.options.onChange) {
          var self = this,
            pointerType = this.tracking === 'lowValue' ? 'min' : 'max';
          this.scope.$evalAsync(function() {
            self.options.onChange(self.options.id, self.scope.rzSliderModel, self.scope.rzSliderHigh, pointerType);
          });
        }
      },

      /**
       * Call the onEnd callback if defined
       * The callback call is wrapped in a $evalAsync to ensure that its result will be applied to the scope.
       *
       * @returns {undefined}
       */
      callOnEnd: function() {
        if (this.options.onEnd) {
          var self = this,
            pointerType = this.tracking === 'lowValue' ? 'min' : 'max';
          this.scope.$evalAsync(function() {
            self.options.onEnd(self.options.id, self.scope.rzSliderModel, self.scope.rzSliderHigh, pointerType);
          });
        }
        this.scope.$emit('slideEnded');
      }
    };

    return Slider;
  }])

  .directive('rzslider', ['RzSlider', function(RzSlider) {
    'use strict';

    return {
      restrict: 'AE',
      replace: true,
      scope: {
        rzSliderModel: '=?',
        rzSliderHigh: '=?',
        rzSliderOptions: '&?',
        rzSliderTplUrl: '@'
      },

      /**
       * Return template URL
       *
       * @param {jqLite} elem
       * @param {Object} attrs
       * @return {string}
       */
      templateUrl: function(elem, attrs) {
        //noinspection JSUnresolvedVariable
        return attrs.rzSliderTplUrl || 'rzSliderTpl.html';
      },

      link: function(scope, elem) {
        scope.slider = new RzSlider(scope, elem); //attach on scope so we can test it
      }
    };
  }]);

  // IDE assist

  /**
   * @name ngScope
   *
   * @property {number} rzSliderModel
   * @property {number} rzSliderHigh
   * @property {Object} rzSliderOptions
   */

  /**
   * @name jqLite
   *
   * @property {number|undefined} rzsp rzslider label position position
   * @property {number|undefined} rzsd rzslider element dimension
   * @property {string|undefined} rzsv rzslider label value/text
   * @property {Function} css
   * @property {Function} text
   */

  /**
   * @name Event
   * @property {Array} touches
   * @property {Event} originalEvent
   */

  /**
   * @name ThrottleOptions
   *
   * @property {boolean} leading
   * @property {boolean} trailing
   */

  module.run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('rzSliderTpl.html',
    "<div class=rzslider><span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class=\"rz-bar rz-selection\" ng-style=barStyle></span></span> <span class=\"rz-pointer rz-pointer-min\" ng-style=minPointerStyle></span> <span class=\"rz-pointer rz-pointer-max\" ng-style=maxPointerStyle></span> <span class=\"rz-bubble rz-limit rz-floor\"></span> <span class=\"rz-bubble rz-limit rz-ceil\"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat=\"t in ticks track by $index\" class=rz-tick ng-class=\"{'rz-selected': t.selected}\" ng-style=t.style ng-attr-uib-tooltip=\"{{ t.tooltip }}\" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body=\"{{ t.tooltip ? true : undefined}}\"><span ng-if=\"t.value != null\" class=rz-tick-value ng-attr-uib-tooltip=\"{{ t.valueTooltip }}\" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span> <span ng-if=\"t.legend != null\" class=rz-tick-legend>{{ t.legend }}</span></li></ul></div>"
  );

}]);

  return module.name
}));

/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(t,e){"use strict";function n(){if(!i.READY){i.event.determineEventTypes();for(var t in i.gestures)i.gestures.hasOwnProperty(t)&&i.detection.register(i.gestures[t]);i.event.onTouch(i.DOCUMENT,i.EVENT_MOVE,i.detection.detect),i.event.onTouch(i.DOCUMENT,i.EVENT_END,i.detection.detect),i.READY=!0}}var i=function(t,e){return new i.Instance(t,e||{})};i.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},i.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,i.HAS_TOUCHEVENTS="ontouchstart"in t,i.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,i.NO_MOUSEEVENTS=i.HAS_TOUCHEVENTS&&navigator.userAgent.match(i.MOBILE_REGEX),i.EVENT_TYPES={},i.DIRECTION_DOWN="down",i.DIRECTION_LEFT="left",i.DIRECTION_UP="up",i.DIRECTION_RIGHT="right",i.POINTER_MOUSE="mouse",i.POINTER_TOUCH="touch",i.POINTER_PEN="pen",i.EVENT_START="start",i.EVENT_MOVE="move",i.EVENT_END="end",i.DOCUMENT=document,i.plugins={},i.READY=!1,i.Instance=function(t,e){var r=this;return n(),this.element=t,this.enabled=!0,this.options=i.utils.extend(i.utils.extend({},i.defaults),e||{}),this.options.stop_browser_behavior&&i.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),i.event.onTouch(t,i.EVENT_START,function(t){r.enabled&&i.detection.startDetect(r,t)}),this},i.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=i.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var r=this.element;return i.utils.hasParent(e.target,r)&&(r=e.target),r.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var r=null,o=!1,s=!1;i.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,n){var a=this;this.bindDom(t,i.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!s){(u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which)&&(o=!0),u.match(/touch|pointer/)&&(s=!0);var h=0;o&&(i.HAS_POINTEREVENTS&&e!=i.EVENT_END?h=i.PointerEvent.updatePointer(e,c):u.match(/touch/)?h=c.touches.length:s||(h=u.match(/up/)?0:1),h>0&&e==i.EVENT_END?e=i.EVENT_MOVE:h||(e=i.EVENT_END),h||null===r?r=c:c=r,n.call(i.detection,a.collectEventData(t,e,c)),i.HAS_POINTEREVENTS&&e==i.EVENT_END&&(h=i.PointerEvent.updatePointer(e,c))),h||(r=null,o=!1,s=!1,i.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=i.HAS_POINTEREVENTS?i.PointerEvent.getEvents():i.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],i.EVENT_TYPES[i.EVENT_START]=t[0],i.EVENT_TYPES[i.EVENT_MOVE]=t[1],i.EVENT_TYPES[i.EVENT_END]=t[2]},getTouchList:function(t){return i.HAS_POINTEREVENTS?i.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,n){var r=this.getTouchList(n,e),o=i.POINTER_TOUCH;return(n.type.match(/mouse/)||i.PointerEvent.matchType(i.POINTER_MOUSE,n))&&(o=i.POINTER_MOUSE),{center:i.utils.getCenter(r),timeStamp:(new Date).getTime(),target:n.target,touches:r,eventType:e,pointerType:o,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return i.detection.stopDetect()}}}},i.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==i.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[i.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==i.POINTER_MOUSE,n[i.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==i.POINTER_TOUCH,n[i.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==i.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},i.utils={extend:function(t,n,i){for(var r in n)t[r]!==e&&i||(t[r]=n[r]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),r=Math.abs(t.pageY-e.pageY);return n>=r?t.pageX-e.pageX>0?i.DIRECTION_LEFT:i.DIRECTION_RIGHT:t.pageY-e.pageY>0?i.DIRECTION_UP:i.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==i.DIRECTION_UP||t==i.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,i=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var r=0;i.length>r;r++)for(var o in e)e.hasOwnProperty(o)&&(n=o,i[r]&&(n=i[r]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[o]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},i.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:i.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,r=this.gestures.length;r>n;n++){var o=this.gestures[n];if(!this.stopped&&e[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==i.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=i.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,r=t.touches.length;r>n;n++)e.touches.push(i.utils.extend({},t.touches[n]))}var o=t.timeStamp-e.timeStamp,s=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=i.utils.getVelocity(o,s,a);return i.utils.extend(t,{deltaTime:o,deltaX:s,deltaY:a,velocityX:c.x,velocityY:c.y,distance:i.utils.getDistance(e.center,t.center),angle:i.utils.getAngle(e.center,t.center),direction:i.utils.getDirection(e.center,t.center),scale:i.utils.getScale(e.touches,t.touches),rotation:i.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var n=t.defaults||{};return n[t.name]===e&&(n[t.name]=!0),i.utils.extend(i.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},i.gestures=i.gestures||{},i.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case i.EVENT_START:clearTimeout(this.timer),i.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==i.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case i.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case i.EVENT_END:clearTimeout(this.timer)}}},i.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==i.EVENT_END){var n=i.detection.previous,r=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),r=!0),(!r||e.options.tap_always)&&(i.detection.current.name="tap",e.trigger(i.detection.current.name,t))}}},i.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==i.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},i.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&i.detection.current.name!=this.name)return;i.detection.current.name=this.name,(i.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var r=i.detection.current.lastEvent.direction;t.drag_locked_to_axis&&r!==t.direction&&(t.direction=i.utils.isVertical(r)?0>t.deltaY?i.DIRECTION_UP:i.DIRECTION_DOWN:0>t.deltaX?i.DIRECTION_LEFT:i.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&i.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!i.utils.isVertical(t.direction))&&t.preventDefault();break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(2>t.touches.length))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:var r=Math.abs(1-t.scale),o=Math.abs(t.rotation);if(n.options.transform_min_scale>r&&n.options.transform_min_rotation>o)return;i.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),o>n.options.transform_min_rotation&&n.trigger("rotate",t),r>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==i.POINTER_MOUSE?(t.stopDetect(),e):(n.options.prevent_default&&t.preventDefault(),t.eventType==i.EVENT_START&&n.trigger(this.name,t),e)}},i.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==i.EVENT_END&&e.trigger(this.name,t)}},"object"==typeof module&&"object"==typeof module.exports?module.exports=i:(t.Hammer=i,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return i}))})(this),function(t,e){"use strict";t!==e&&(Hammer.event.bindDom=function(n,i,r){t(n).on(i,function(t){var n=t.originalEvent||t;n.pageX===e&&(n.pageX=t.pageX,n.pageY=t.pageY),n.target||(n.target=t.target),n.which===e&&(n.which=n.button),n.preventDefault||(n.preventDefault=t.preventDefault),n.stopPropagation||(n.stopPropagation=t.stopPropagation),r.call(this,n)})},Hammer.Instance.prototype.on=function(e,n){return t(this.element).on(e,n)},Hammer.Instance.prototype.off=function(e,n){return t(this.element).off(e,n)},Hammer.Instance.prototype.trigger=function(e,n){var i=t(this.element);return i.has(n.target).length&&(i=t(n.target)),i.trigger({type:e,gesture:n})},t.fn.hammer=function(e){return this.each(function(){var n=t(this),i=n.data("hammer");i?i&&e&&Hammer.utils.extend(i.options,e):n.data("hammer",new Hammer(this,e||{}))})})}(window.jQuery||window.Zepto);
'use strict';
/*https://github.com/peledies/google-places/blob/master/google-places.js*/
(function($) {
    var namespace = 'googlePlaces';
    $.googlePlaces = function(element, options) {

        var defaults = {
                placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4' // placeId provided by google api documentation
                , render: ['reviews']
                , min_rating: 0
                , max_rows: 0
                , map_plug_id: 'map-plug'
                , rotateTime: false
                , schema:{
                    displayElement: '#schema'
                    , type: 'Store'
                    , beforeText: 'Google Users Have Rated'
                    , middleText: 'based on'
                    , afterText: 'ratings and reviews'
                }
                , address:{
                    displayElement: "#google-address"
                }
                , phone:{
                    displayElement: "#google-phone"
                }
                , staticMap:{
                    displayElement: "#google-static-map"
                    , width: 512
                    , height: 512
                    , zoom: 17
                    , type: "roadmap"
                }
                , hours:{
                    displayElement: "#google-hours"
                }
            };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.settings.schema = $.extend({}, defaults.schema, options.schema);
            $element.html("<div id='" + plugin.settings.map_plug_id + "'></div>"); // create a plug for google to load data into
            initialize_place(function(place){
                plugin.place_data = place;

                // Trigger event before render
                $element.trigger('beforeRender.' + namespace);

                // render specified sections
                if(plugin.settings.render.indexOf('reviews') > -1){
                    renderReviews(plugin.place_data.reviews);
                    if(!!plugin.settings.rotateTime) {
                        initRotation();
                    }
                }
                if(plugin.settings.render.indexOf('address') > -1){
                    renderAddress(
                        capture_element(plugin.settings.address.displayElement)
                        , plugin.place_data.adr_address
                    );
                }
                if(plugin.settings.render.indexOf('phone') > -1){
                    renderPhone(
                        capture_element(plugin.settings.phone.displayElement)
                        , plugin.place_data.formatted_phone_number
                    );
                }
                if(plugin.settings.render.indexOf('staticMap') > -1){
                    renderStaticMap(
                        capture_element(plugin.settings.staticMap.displayElement)
                        , plugin.place_data.formatted_address
                    );
                }
                if(plugin.settings.render.indexOf('hours') > -1){
                    renderHours(
                        capture_element(plugin.settings.hours.displayElement)
                        , plugin.place_data.opening_hours
                    );
                }

                // render schema markup
                addSchemaMarkup(
                    capture_element(plugin.settings.schema.displayElement)
                    , plugin.place_data
                );

                // Trigger event after render
                $element.trigger('afterRender.' + namespace);

            });
        }

        var capture_element = function(element){
            if(element instanceof jQuery){
                return element;
            }else if(typeof element == 'string'){
                try{
                    var ele = $(element);
                    if( ele.length ){
                        return ele;
                    }else{
                        throw 'Element [' + element + '] couldnt be found in the DOM. Skipping '+element+' markup generation.';
                    }
                }catch(e){
                    console.warn(e);
                }
            }
        }

        var initialize_place = function(c){
            var map = new google.maps.Map(document.getElementById(plugin.settings.map_plug_id));

            var request = {
                placeId: plugin.settings.placeId
            };

            var service = new google.maps.places.PlacesService(map);

            service.getDetails(request, function(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    c(place);
                }
            });
        }

        var sort_by_date = function(ray) {
            ray.sort(function(a, b){
                var keyA = new Date(a.time),
                    keyB = new Date(b.time);
                // Compare the 2 dates
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });
            return ray;
        }

        var filter_minimum_rating = function(reviews){
            for (var i = reviews.length -1; i >= 0; i--) {
                if(reviews[i].rating < plugin.settings.min_rating){
                    reviews.splice(i,1);
                }
            }
            return reviews;
        }

        var renderReviews = function(reviews){
            reviews = sort_by_date(reviews);
            reviews = filter_minimum_rating(reviews);
            var html = "";
            var row_count = (plugin.settings.max_rows > 0)? plugin.settings.max_rows - 1 : reviews.length - 1;
            // make sure the row_count is not greater than available records
            row_count = (row_count > reviews.length-1)? reviews.length -1 : row_count;
            for (var i = row_count; i >= 0; i--) {
                var stars = renderStars(reviews[i].rating);
                var date = convertTime(reviews[i].time);
                html = html+"<div class='review-item'><div class='review-meta'><span class='review-author'>"+reviews[i].author_name+"</span><span class='review-sep'>, </span><span class='review-date'>"+date+"</span></div>"+stars+"<p class='review-text'>"+reviews[i].text+"</p></div>"
            };
            $element.append(html);
        }

        var renderHours = function(element, data){
            if(element instanceof jQuery){
                var html = "<ul>";
                data.weekday_text.forEach(function(day){
                    html += "<li>"+day+"</li>";
                });
                html += "</ul>";
                element.append(html);
            }
        }

        var renderStaticMap = function(element, data){
            if(element instanceof jQuery){
                var map = plugin.settings.staticMap;
                element.append(
                    "<img src='https://maps.googleapis.com/maps/api/staticmap"+
                    "?size="+map.width+"x"+map.height+
                    "&zoom="+map.zoom+
                    "&maptype="+map.type+
                    "&markers=size:large%7Ccolor:red%7C"+data+"'>"+
                    "</img>");
            }
        }

        var renderAddress = function(element, data){
            if(element instanceof jQuery){
                element.append(data);
            }
        }

        var renderPhone = function(element, data){
            if(element instanceof jQuery){
                element.append(data);
            }
        }

        var initRotation = function() {
            var $reviewEls = $element.children('.review-item');
            var currentIdx = $reviewEls.length > 0 ? 0 : false;
            $reviewEls.hide();
            if(currentIdx !== false) {
                $($reviewEls[currentIdx]).show();
                setInterval(function(){
                    if(++currentIdx >= $reviewEls.length) {
                        currentIdx = 0;
                    }
                    $reviewEls.hide();
                    $($reviewEls[currentIdx]).fadeIn('slow');
                }, plugin.settings.rotateTime);
            }
        }

        var renderStars = function(rating){
            var stars = "<div class='review-stars'><ul>";

            // fill in gold stars
            for (var i = 0; i < rating; i++) {
                stars = stars+"<li><i class='star'></i></li>";
            };

            // fill in empty stars
            if(rating < 5){
                for (var i = 0; i < (5 - rating); i++) {
                    stars = stars+"<li><i class='star inactive'></i></li>";
                };
            }
            stars = stars+"</ul></div>";
            return stars;
        }

        var convertTime = function(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var time = months[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
            return time;
        }

        var addSchemaMarkup = function(element, placeData) {
            var reviews = placeData.reviews;
            var lastIndex = reviews.length - 1;
            var reviewPointTotal = 0;
            var schema = plugin.settings.schema;
            for (var i = lastIndex; i >= 0; i--) {
                reviewPointTotal += reviews[i].rating;
            };
            // Set totals and averages - may be used later.
            var averageReview = reviewPointTotal / ( reviews.length );
            if(element instanceof jQuery){
                element.append( '<span itemscope="" itemtype="http://schema.org/' + schema.type + '">'
                    +  '<meta itemprop="url" content="' + location.origin + '">'
                    +  schema.beforeText + ' <span itemprop="name">' + placeData.name + '</span> '
                    +  '<span itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">'
                    +    '<span itemprop="ratingValue">' + averageReview.toFixed(2) + '</span>/<span itemprop="bestRating">5</span> '
                    +  schema.middleText + ' <span itemprop="ratingCount">' + reviews.length + '</span> '
                    +  schema.afterText
                    +  '</span>'
                    +'</span>');
            }
        }

        plugin.init();

    }

    $.fn.googlePlaces = function(options) {

        return this.each(function() {
            if (undefined == $(this).data(namespace)) {
                var plugin = new $.googlePlaces(this, options);
                $(this).data(namespace, plugin);
            }
        });

    }

})(jQuery);
/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
    var NivoSlider = function(element, options){
        // Defaults are below
        var settings = $.extend({}, $.fn.nivoSlider.defaults, options);

        // Useful variables. Play carefully.
        var vars = {
            currentSlide: 0,
            currentImage: '',
            totalSlides: 0,
            running: false,
            paused: false,
            stop: false,
            controlNavEl: false
        };

        // Get this slider
        var slider = $(element);
        slider.data('nivo:vars', vars).addClass('nivoSlider');

        // Find our slider children
        var kids = slider.children();
        kids.each(function() {
            var child = $(this);
            var link = '';
            if(!child.is('img')){
                if(child.is('a')){
                    child.addClass('nivo-imageLink');
                    link = child;
                }
                child = child.find('img:first');
            }
            // Get img width & height
            var childWidth = (childWidth === 0) ? child.attr('width') : child.width(),
                childHeight = (childHeight === 0) ? child.attr('height') : child.height();

            if(link !== ''){
                link.css('display','none');
            }
            child.css('display','none');
            vars.totalSlides++;
        });
         
        // If randomStart
        if(settings.randomStart){
            settings.startSlide = Math.floor(Math.random() * vars.totalSlides);
        }
        
        // Set startSlide
        if(settings.startSlide > 0){
            if(settings.startSlide >= vars.totalSlides) { settings.startSlide = vars.totalSlides - 1; }
            vars.currentSlide = settings.startSlide;
        }
        
        // Get initial image
        if($(kids[vars.currentSlide]).is('img')){
            vars.currentImage = $(kids[vars.currentSlide]);
        } else {
            vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
        }
        
        // Show initial link
        if($(kids[vars.currentSlide]).is('a')){
            $(kids[vars.currentSlide]).css('display','block');
        }
        
        // Set first background
        var sliderImg = $('<img/>').addClass('nivo-main-image');
        sliderImg.attr('src', vars.currentImage.attr('src')).show();
        slider.append(sliderImg);

        // Detect Window Resize
        $(window).resize(function() {
            slider.children('img').width(slider.width());
            sliderImg.attr('src', vars.currentImage.attr('src'));
            sliderImg.stop().height('auto');
            $('.nivo-slice').remove();
            $('.nivo-box').remove();
        });

        //Create caption
        slider.append($('<div class="nivo-caption"></div>'));
        
        // Process caption function
        var processCaption = function(settings){
            var nivoCaption = $('.nivo-caption', slider);
            if(vars.currentImage.attr('title') != '' && vars.currentImage.attr('title') != undefined){
                var title = vars.currentImage.attr('title');
                if(title.substr(0,1) == '#') title = $(title).html();   

                if(nivoCaption.css('display') == 'block'){
                    setTimeout(function(){
                        nivoCaption.html(title);
                    }, settings.animSpeed);
                } else {
                    nivoCaption.html(title);
                    nivoCaption.stop().fadeIn(settings.animSpeed);
                }
            } else {
                nivoCaption.stop().fadeOut(settings.animSpeed);
            }
        }
        
        //Process initial  caption
        processCaption(settings);
        
        // In the words of Super Mario "let's a go!"
        var timer = 0;
        if(!settings.manualAdvance && kids.length > 1){
            timer = setInterval(function(){ nivoRun(slider, kids, settings, false); }, settings.pauseTime);
        }
        
        // Add Direction nav
        if(settings.directionNav){
            slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+ settings.prevText +'</a><a class="nivo-nextNav">'+ settings.nextText +'</a></div>');
            
            $(slider).on('click', 'a.nivo-prevNav', function(){
                if(vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                vars.currentSlide -= 2;
                nivoRun(slider, kids, settings, 'prev');
            });
            
            $(slider).on('click', 'a.nivo-nextNav', function(){
                if(vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                nivoRun(slider, kids, settings, 'next');
            });
        }
        
        // Add Control nav
        if(settings.controlNav){
            vars.controlNavEl = $('<div class="nivo-controlNav carousel-indicators"></div>');
            var carouselBox = $('<div class="carousel-box"></div>')
            slider.after(vars.controlNavEl);
            for(var i = 0; i < kids.length; i++){
                if(settings.controlNavThumbs){
                    vars.controlNavEl.addClass('nivo-thumbs-enabled');
                    var child = kids.eq(i);
                    if(!child.is('img')){
                        child = child.find('img:first');
                    }
                    carouselBox.append('<a class="nivo-control" rel="'+ i +'"><span class="set-slide"></span></a>');
                    vars.controlNavEl.append(carouselBox)
                    //if(child.attr('data-thumb')) vars.controlNavEl.append('<a class="nivo-control" rel="'+ i +'"><span class="set-slide"></span></a>');
                } else {
                    vars.controlNavEl.append('<a class="nivo-control" rel="'+ i +'">'+ (i + 1) +'</a>');
                }
            }

            //Set initial active link
            $('a:eq('+ vars.currentSlide +')', vars.controlNavEl).addClass('active');
            
            $('a', vars.controlNavEl).bind('click', function(){
                if(vars.running) return false;
                if($(this).hasClass('active')) return false;
                clearInterval(timer);
                timer = '';
                sliderImg.attr('src', vars.currentImage.attr('src'));
                vars.currentSlide = $(this).attr('rel') - 1;
                nivoRun(slider, kids, settings, 'control');
            });
        }
        
        //For pauseOnHover setting
        if(settings.pauseOnHover){
            slider.hover(function(){
                vars.paused = true;
                clearInterval(timer);
                timer = '';
            }, function(){
                vars.paused = false;
                // Restart the timer
                if(timer === '' && !settings.manualAdvance){
                    timer = setInterval(function(){ nivoRun(slider, kids, settings, false); }, settings.pauseTime);
                }
            });
        }
        
        // Event when Animation finishes
        slider.bind('nivo:animFinished', function(){
            sliderImg.attr('src', vars.currentImage.attr('src'));
            vars.running = false; 
            // Hide child links
            $(kids).each(function(){
                if($(this).is('a')){
                   $(this).css('display','none');
                }
            });
            // Show current link
            if($(kids[vars.currentSlide]).is('a')){
                $(kids[vars.currentSlide]).css('display','block');
            }
            // Restart the timer
            if(timer === '' && !vars.paused && !settings.manualAdvance){
                timer = setInterval(function(){ nivoRun(slider, kids, settings, false); }, settings.pauseTime);
            }
            // Trigger the afterChange callback
            settings.afterChange.call(this);
        }); 
        
        // Add slices for slice animations
        var createSlices = function(slider, settings, vars) {
        	if($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display','block');
            $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
            var sliceHeight = ($('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').parent().is('a')) ? $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').parent().height() : $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').height();

            for(var i = 0; i < settings.slices; i++){
                var sliceWidth = Math.round(slider.width()/settings.slices);
                
                if(i === settings.slices-1){
                    slider.append(
                        $('<div class="nivo-slice" name="'+i+'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block !important; top:0; left:-'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px;" /></div>').css({ 
                            left:(sliceWidth*i)+'px', 
                            width:(slider.width()-(sliceWidth*i))+'px',
                            height:sliceHeight+'px', 
                            opacity:'0',
                            overflow:'hidden'
                        })
                    );
                } else {
                    slider.append(
                        $('<div class="nivo-slice" name="'+i+'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block !important; top:0; left:-'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px;" /></div>').css({ 
                            left:(sliceWidth*i)+'px', 
                            width:sliceWidth+'px',
                            height:sliceHeight+'px',
                            opacity:'0',
                            overflow:'hidden'
                        })
                    );
                }
            }
            
            $('.nivo-slice', slider).height(sliceHeight);
            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.animSpeed);
        };
        
        // Add boxes for box animations
        var createBoxes = function(slider, settings, vars){
        	if($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display','block');
            $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
            var boxWidth = Math.round(slider.width()/settings.boxCols),
                boxHeight = Math.round($('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').height() / settings.boxRows);
            
                        
            for(var rows = 0; rows < settings.boxRows; rows++){
                for(var cols = 0; cols < settings.boxCols; cols++){
                    if(cols === settings.boxCols-1){
                        slider.append(
                            $('<div class="nivo-box" name="'+ cols +'" rel="'+ rows +'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block; top:-'+ (boxHeight*rows) +'px; left:-'+ (boxWidth*cols) +'px;" /></div>').css({ 
                                opacity:0,
                                left:(boxWidth*cols)+'px', 
                                top:(boxHeight*rows)+'px',
                                width:(slider.width()-(boxWidth*cols))+'px'
                                
                            })
                        );
                        $('.nivo-box[name="'+ cols +'"]', slider).height($('.nivo-box[name="'+ cols +'"] img', slider).height()+'px');
                    } else {
                        slider.append(
                            $('<div class="nivo-box" name="'+ cols +'" rel="'+ rows +'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block; top:-'+ (boxHeight*rows) +'px; left:-'+ (boxWidth*cols) +'px;" /></div>').css({ 
                                opacity:0,
                                left:(boxWidth*cols)+'px', 
                                top:(boxHeight*rows)+'px',
                                width:boxWidth+'px'
                            })
                        );
                        $('.nivo-box[name="'+ cols +'"]', slider).height($('.nivo-box[name="'+ cols +'"] img', slider).height()+'px');
                    }
                }
            }
            
            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.animSpeed);
        };

        // Private run method
        var nivoRun = function(slider, kids, settings, nudge){          
            // Get our vars
            var vars = slider.data('nivo:vars');
            
            // Trigger the lastSlide callback
            if(vars && (vars.currentSlide === vars.totalSlides - 1)){ 
                settings.lastSlide.call(this);
            }
            
            // Stop
            if((!vars || vars.stop) && !nudge) { return false; }
            
            // Trigger the beforeChange callback
            settings.beforeChange.call(this);

            // Set current background before change
            if(!nudge){
                sliderImg.attr('src', vars.currentImage.attr('src'));
            } else {
                if(nudge === 'prev'){
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
                if(nudge === 'next'){
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
            }
            
            vars.currentSlide++;
            // Trigger the slideshowEnd callback
            if(vars.currentSlide === vars.totalSlides){ 
                vars.currentSlide = 0;
                settings.slideshowEnd.call(this);
            }
            if(vars.currentSlide < 0) { vars.currentSlide = (vars.totalSlides - 1); }
            // Set vars.currentImage
            if($(kids[vars.currentSlide]).is('img')){
                vars.currentImage = $(kids[vars.currentSlide]);
            } else {
                vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
            }
            
            // Set active links
            if(settings.controlNav){
                $('a', vars.controlNavEl).removeClass('active');
                $('a:eq('+ vars.currentSlide +')', vars.controlNavEl).addClass('active');
            }
            
            // Process caption
            processCaption(settings);            
            
            // Remove any slices from last transition
            $('.nivo-slice', slider).remove();
            
            // Remove any boxes from last transition
            $('.nivo-box', slider).remove();
            
            var currentEffect = settings.effect,
                anims = '';
                
            // Generate random effect
            if(settings.effect === 'random'){
                anims = new Array('sliceDownRight','sliceDownLeft','sliceUpRight','sliceUpLeft','sliceUpDown','sliceUpDownLeft','fold','fade',
                'boxRandom','boxRain','boxRainReverse','boxRainGrow','boxRainGrowReverse');
                currentEffect = anims[Math.floor(Math.random()*(anims.length + 1))];
                if(currentEffect === undefined) { currentEffect = 'fade'; }
            }
            
            // Run random effect from specified set (eg: effect:'fold,fade')
            if(settings.effect.indexOf(',') !== -1){
                anims = settings.effect.split(',');
                currentEffect = anims[Math.floor(Math.random()*(anims.length))];
                if(currentEffect === undefined) { currentEffect = 'fade'; }
            }
            
            // Custom transition as defined by "data-transition" attribute
            if(vars.currentImage.attr('data-transition')){
                currentEffect = vars.currentImage.attr('data-transition');
            }
        
            // Run effects
            vars.running = true;
            var timeBuff = 0,
                i = 0,
                slices = '',
                firstSlice = '',
                totalBoxes = '',
                boxes = '';
            
            if(currentEffect === 'sliceDown' || currentEffect === 'sliceDownRight' || currentEffect === 'sliceDownLeft'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.nivo-slice', slider);
                if(currentEffect === 'sliceDownLeft') { slices = $('.nivo-slice', slider)._reverse(); }
                
                slices.each(function(){
                    var slice = $(this);
                    slice.css({ 'top': '0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'sliceUp' || currentEffect === 'sliceUpRight' || currentEffect === 'sliceUpLeft'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.nivo-slice', slider);
                if(currentEffect === 'sliceUpLeft') { slices = $('.nivo-slice', slider)._reverse(); }
                
                slices.each(function(){
                    var slice = $(this);
                    slice.css({ 'bottom': '0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'sliceUpDown' || currentEffect === 'sliceUpDownRight' || currentEffect === 'sliceUpDownLeft'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                var v = 0;
                slices = $('.nivo-slice', slider);
                if(currentEffect === 'sliceUpDownLeft') { slices = $('.nivo-slice', slider)._reverse(); }
                
                slices.each(function(){
                    var slice = $(this);
                    if(i === 0){
                        slice.css('top','0px');
                        i++;
                    } else {
                        slice.css('bottom','0px');
                        i = 0;
                    }
                    
                    if(v === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    v++;
                });
            } else if(currentEffect === 'fold'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                
                $('.nivo-slice', slider).each(function(){
                    var slice = $(this);
                    var origWidth = slice.width();
                    slice.css({ top:'0px', width:'0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({ width:origWidth, opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({ width:origWidth, opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'fade'){
                createSlices(slider, settings, vars);
                
                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({
                    'width': slider.width() + 'px'
                });
    
                firstSlice.animate({ opacity:'1.0' }, (settings.animSpeed*2), '', function(){ slider.trigger('nivo:animFinished'); });
            } else if(currentEffect === 'slideInRight'){
                createSlices(slider, settings, vars);
                
                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({
                    'width': '0px',
                    'opacity': '1'
                });

                firstSlice.animate({ width: slider.width() + 'px' }, (settings.animSpeed*2), '', function(){ slider.trigger('nivo:animFinished'); });
            } else if(currentEffect === 'slideInLeft'){
                createSlices(slider, settings, vars);
                
                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({
                    'width': '0px',
                    'opacity': '1',
                    'left': '',
                    'right': '0px'
                });

                firstSlice.animate({ width: slider.width() + 'px' }, (settings.animSpeed*2), '', function(){ 
                    // Reset positioning
                    firstSlice.css({
                        'left': '0px',
                        'right': ''
                    });
                    slider.trigger('nivo:animFinished'); 
                });
            } else if(currentEffect === 'boxRandom'){
                createBoxes(slider, settings, vars);
                
                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;

                boxes = shuffle($('.nivo-box', slider));
                boxes.each(function(){
                    var box = $(this);
                    if(i === totalBoxes-1){
                        setTimeout(function(){
                            box.animate({ opacity:'1' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            box.animate({ opacity:'1' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 20;
                    i++;
                });
            } else if(currentEffect === 'boxRain' || currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse'){
                createBoxes(slider, settings, vars);
                
                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;
                
                // Split boxes into 2D array
                var rowIndex = 0;
                var colIndex = 0;
                var box2Darr = [];
                box2Darr[rowIndex] = [];
                boxes = $('.nivo-box', slider);
                if(currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrowReverse'){
                    boxes = $('.nivo-box', slider)._reverse();
                }
                boxes.each(function(){
                    box2Darr[rowIndex][colIndex] = $(this);
                    colIndex++;
                    if(colIndex === settings.boxCols){
                        rowIndex++;
                        colIndex = 0;
                        box2Darr[rowIndex] = [];
                    }
                });
                
                // Run animation
                for(var cols = 0; cols < (settings.boxCols * 2); cols++){
                    var prevCol = cols;
                    for(var rows = 0; rows < settings.boxRows; rows++){
                        if(prevCol >= 0 && prevCol < settings.boxCols){
                            /* Due to some weird JS bug with loop vars 
                            being used in setTimeout, this is wrapped
                            with an anonymous function call */
                            (function(row, col, time, i, totalBoxes) {
                                var box = $(box2Darr[row][col]);
                                var w = box.width();
                                var h = box.height();
                                if(currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse'){
                                    box.width(0).height(0);
                                }
                                if(i === totalBoxes-1){
                                    setTimeout(function(){
                                        box.animate({ opacity:'1', width:w, height:h }, settings.animSpeed/1.3, '', function(){ slider.trigger('nivo:animFinished'); });
                                    }, (100 + time));
                                } else {
                                    setTimeout(function(){
                                        box.animate({ opacity:'1', width:w, height:h }, settings.animSpeed/1.3);
                                    }, (100 + time));
                                }
                            })(rows, prevCol, timeBuff, i, totalBoxes);
                            i++;
                        }
                        prevCol--;
                    }
                    timeBuff += 100;
                }
            }           
        };
        
        // Shuffle an array
        var shuffle = function(arr){
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i, 10), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        };
        
        // For debugging
        var trace = function(msg){
            if(this.console && typeof console.log !== 'undefined') { console.log(msg); }
        };
        
        // Start / Stop
        this.stop = function(){
            if(!$(element).data('nivo:vars').stop){
                $(element).data('nivo:vars').stop = true;
                trace('Stop Slider');
            }
        };
        
        this.start = function(){
            if($(element).data('nivo:vars').stop){
                $(element).data('nivo:vars').stop = false;
                trace('Start Slider');
            }
        };
        
        // Trigger the afterLoad callback
        settings.afterLoad.call(this);
        
        return this;
    };
        
    $.fn.nivoSlider = function(options) {
        return this.each(function(key, value){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('nivoslider')) { return element.data('nivoslider'); }
            // Pass options to plugin constructor
            var nivoslider = new NivoSlider(this, options);
            // Store plugin object in this element's data
            element.data('nivoslider', nivoslider);
        });
    };
    
    //Default settings
    $.fn.nivoSlider.defaults = {
        effect: 'random',
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3000,
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        prevText: '<span class="icon-prev-img"></span>',
        nextText: '<span class="icon-next-img"></span>',
        randomStart: false,
        beforeChange: function(){},
        afterChange: function(){},
        slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
    };

    $.fn._reverse = [].reverse;
    
})(jQuery);
"use strict";var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}(function(root,factory){var pluginName="BackgroundVideo";if(typeof define==="function"&&define.amd){define([],factory(pluginName))}else if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"){module.exports=factory(pluginName)}else{root[pluginName]=factory(pluginName)}})(window||module||{},function(pluginName){var defaults={parallax:{effect:1.5},pauseVideoOnViewLoss:false,preventContextMenu:false,minimumVideoWidth:400,onBeforeReady:function onBeforeReady(){},onReady:function onReady(){}};var addClass=function addClass(el,className){if(el.classList){el.classList.add(className)}else{el.className+=" "+className}};var BackgroundVideo=function(){function BackgroundVideo(element,options){_classCallCheck(this,BackgroundVideo);this.element=document.querySelectorAll(element);this.options=_extends({},defaults,options);this.options.browserPrexix=this.detectBrowser();this.shimRequestAnimationFrame();this.options.has3d=this.detect3d();for(var i=0;i<this.element.length;i++){this.init(this.element[i],i)}}_createClass(BackgroundVideo,[{key:"init",value:function init(element,iteration){this.el=element;this.playEvent=this.videoReadyCallback.bind(this);this.setVideoWrap(iteration);this.setVideoProperties();this.insertVideos();if(this.options&&this.options.onBeforeReady())this.options.onBeforeReady();if(this.el.readyState>3){this.videoReadyCallback()}else{this.el.addEventListener("canplaythrough",this.playEvent,false);this.el.addEventListener("canplay",this.playEvent,false)}if(this.options.preventContextMenu){this.el.addEventListener("contextmenu",function(){return false})}}},{key:"videoReadyCallback",value:function videoReadyCallback(){this.el.removeEventListener("canplaythrough",this.playEvent,false);this.el.removeEventListener("canplay",this.playEvent,false);this.options.originalVideoW=this.el.videoWidth;this.options.originalVideoH=this.el.videoHeight;this.bindEvents();this.requestTick();if(this.options&&this.options.onReady())this.options.onReady()}},{key:"bindEvents",value:function bindEvents(){this.ticking=false;if(this.options.parallax){window.addEventListener("scroll",this.requestTick.bind(this))}window.addEventListener("resize",this.requestTick.bind(this))}},{key:"requestTick",value:function requestTick(){if(!this.ticking){this.ticking=true;window.requestAnimationFrame(this.positionObject.bind(this))}this.ticking=false}},{key:"positionObject",value:function positionObject(){var scrollPos=window.pageYOffset;var _scaleObject=this.scaleObject(),xPos=_scaleObject.xPos,yPos=_scaleObject.yPos;if(this.options.parallax){if(scrollPos>=0){yPos=this.calculateYPos(yPos,scrollPos)}else{yPos=this.calculateYPos(yPos,0)}}else{yPos=-yPos}var transformStyle=this.options.has3d?"translate3d("+xPos+"px, "+yPos+"px, 0)":"translate("+xPos+"px, "+yPos+"px)";this.el.style[""+this.options.browserPrexix]=transformStyle;this.el.style.transform=transformStyle}},{key:"scaleObject",value:function scaleObject(){var windowWidth=window.innerWidth;var windowHeight=window.innerHeight;var heightScale=windowWidth/this.options.originalVideoW;var widthScale=windowHeight/this.options.originalVideoH;var scaleFactor=void 0;this.options.bvVideoWrap.style.width=windowWidth+"px";this.options.bvVideoWrap.style.height=windowHeight+"px";scaleFactor=heightScale>widthScale?heightScale:widthScale;if(scaleFactor*this.options.originalVideoW<this.options.minimumVideoWidth){scaleFactor=this.options.minimumVideoWidth/this.options.originalVideoW}var videoWidth=scaleFactor*this.options.originalVideoW;var videoHeight=scaleFactor*this.options.originalVideoH;this.el.style.width=videoWidth+"px";this.el.style.height=videoHeight+"px";return{xPos:-parseInt((videoWidth-windowWidth)/2),yPos:parseInt(videoHeight-windowHeight)/2}}},{key:"calculateYPos",value:function calculateYPos(yPos,scrollPos){var videoPosition=parseInt(this.options.bvVideoWrap.offsetTop);var videoOffset=videoPosition-scrollPos;yPos=-(videoOffset/this.options.parallax.effect+yPos);return yPos}},{key:"setVideoWrap",value:function setVideoWrap(iteration){var wrapper=document.createElement("div");this.options.bvVideoWrapClass=this.el.className+"-wrap-"+iteration;addClass(wrapper,"bv-video-wrap");addClass(wrapper,this.options.bvVideoWrapClass);wrapper.style.position="relative";wrapper.style.overflow="hidden";wrapper.style.zIndex="10";this.el.parentNode.insertBefore(wrapper,this.el);wrapper.appendChild(this.el);this.options.bvVideoWrap=document.querySelector("."+this.options.bvVideoWrapClass)}},{key:"setVideoProperties",value:function setVideoProperties(){this.el.setAttribute("preload","metadata");this.el.setAttribute("loop","true");this.el.setAttribute("autoplay","true");this.el.style.position="absolute";this.el.style.zIndex="1"}},{key:"insertVideos",value:function insertVideos(){for(var i=0;i<this.options.src.length;i++){var videoTypeArr=this.options.src[i].split(".");var videoType=videoTypeArr[videoTypeArr.length-1];this.addSourceToVideo(this.options.src[i],"video/"+videoType)}}},{key:"addSourceToVideo",value:function addSourceToVideo(src,type){var source=document.createElement("source");source.src=src;source.type=type;this.el.appendChild(source)}},{key:"detectBrowser",value:function detectBrowser(){var val=navigator.userAgent.toLowerCase();var browserPrexix=void 0;if(val.indexOf("chrome")>-1||val.indexOf("safari")>-1){browserPrexix="webkitTransform"}else if(val.indexOf("firefox")>-1){browserPrexix="MozTransform"}else if(val.indexOf("MSIE")!==-1||val.indexOf("Trident/")>0){browserPrexix="msTransform"}else if(val.indexOf("Opera")>-1){browserPrexix="OTransform"}return browserPrexix}},{key:"shimRequestAnimationFrame",value:function shimRequestAnimationFrame(){var lastTime=0;var vendors=["ms","moz","webkit","o"];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(callback,element){var currTime=(new Date).getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(id){clearTimeout(id)}}},{key:"detect3d",value:function detect3d(){var el=document.createElement("p"),t,has3d,transforms={WebkitTransform:"-webkit-transform",OTransform:"-o-transform",MSTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(el,document.body.lastChild);for(t in transforms){if(el.style[t]!==undefined){el.style[t]="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";has3d=window.getComputedStyle(el).getPropertyValue(transforms[t])}}el.parentNode.removeChild(el);if(has3d!==undefined){return has3d!=="none"}else{return false}}}]);return BackgroundVideo}();return BackgroundVideo});