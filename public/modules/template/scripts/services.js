'use strict';

angular.module('gmall.services', []).
     value('version', '0.1')

.factory('socket', function (socketFactory) {
        return socketFactory();
    })
.factory('Campaign', function ($resource) {
        return $resource('/api/collections/Campaign/:id',{id:'@_id'});
})

.factory('User', function ($resource) {
    return $resource('/api/users/:id/:email', {
        id: '@id'
    }, { //parameters default
        update: {
            method: 'PUT',
            params: {
                id:'profile',
                email:''
            }
        },
        updateCoupon: {
            method: 'PUT',
            params: {
                id:'coupon',
                email:''
            }
        },
        updatePswd: {
            method: 'PUT',
            params: {
                // id:'profile'
                id:'changepswd',
                email:''
            }
        },
        resetPswd: {
            method: 'POST',
            params: {
                id:'resetpswd',
                email:'@email'
            }
        },
        get: {
            method: 'GET',
            params: {
                id:'me',
                email:''
            }
        }
    });
})


// вынести в отдельный модуль
.factory('$witgets',['$resource', function ($resource) {
    /*//$scope.mainFrameCtrl={openWitget:false,witgetFile:'',witget:null,slides:[]}
    var Witget=$resource('/api/collections/Witget/:id',{id:'@id'});
    //$scope.openWitget=false;
    //$scope.contextWitget='myChildView.html';
    // сохраняем в нем таймауты для витжетов
        var witTimeout={};
        function callWitget(w){
            Witget.get({id: w._id},function(wit){
                witTimeout[w._id]=$timeout(function(){
                    openWitget(wit)
                }, w.deffer*500);
                witTimeout[w._id].then(
                    function() {

                        console.log( "Timer resolved!", Date.now() );

                    },
                    function() {

                        console.log( "Timer rejected!", Date.now() );

                    }
                );

            });
        }

        $scope.saveShownWitget = function(w){

            //console.log('ghbdtn');
            if (w.write){
                $http.get('api/lead/'+ w._id,function (res) {
                    //console.log(res);
                }, function (err) {
                    console.log(err);
                })
            }
            $scope.mainFrameCtrl.openWitget=false;
            $scope.mainFrameCtrl.witget=null;

        }

        function openWitget(w){
            //console.log(w);
            if (!$scope.mainFrameCtrl.openWitget) {
                $scope.mainFrameCtrl.openWitget=true;;
                if (w.type==1){
                    openWitgetModal(w)
                }else {
                    console.log('??');

                    //$scope.mainFrameCtrl.contextWitget= w.desc;
                    $scope.mainFrameCtrl.witget=  w;
                }

                //var sdf='<div ng-controller="ignupCtrl"></div>'
                //$compile(sdf)($scope);
            } else {
                witTimeout[w._id]=$timeout(function(){
                    openWitget(w)
                }, w.deffer*500);
            }
        }*/
    return {
        set:function(witgets){
            console.log(witgets);
            witgets.forEach(function(el){callWitget(el)});
        }
    }
}])

    .factory('Session',['$resource', function ($resource) {
        return $resource('/api/session/');
    }])
    .factory('Auth',['$timeout', '$rootScope', 'Session', 'global','User','$window',
        function Auth($timeout, $rootScope, Session,global,User,$window) {
            return {
                /**
                 * Authenticate user
                 *
                 * @param  {Object}   user     - login info
                 * @param  {Function} callback - optional
                 * @return {Promise}
                 */
                login: function(userInfo, callback) {
                    var cb = callback || angular.noop;
                    return Session.save({
                        email: userInfo.email,
                        password: userInfo.password
                    }, function(user) {
                        global.set('user',user);
                        $rootScope.$broadcast('logged', user);
                        return cb();
                    }, function(err) {
                        return cb(err);
                    }).$promise;
                },

                /**
                 * Unauthenticate user
                 *
                 * @param  {Function} callback - optional
                 * @return {Promise}
                 */
                logout: function(callback) {
                    var cb = callback || angular.noop;
                    return Session.delete(function() {
                            global.set('user',null);
                            $rootScope.$broadcast('logout', null);
                            return cb();
                        },
                        function(err) {
                            return cb(err);
                        }).$promise;
                },

                /**
                 * Create a new user
                 *
                 * @param  {Object}   user     - user info
                 * @param  {Function} callback - optional
                 * @return {Promise}
                 */
                createUser: function(userInfo, callback) {
                    var cb = callback || angular.noop;
                    return User.save(userInfo,
                        function(user) {
                            // google

                            if (!global.get('local').val)
                                $window.ga('send', 'event','registration','subscribe');

                            User.get( function(res){
                                //console.log(res);
                                global.set('user',res);
                                $rootScope.$broadcast('logged', res);
                            })
                            

                            return cb();
                        },
                        function(err) {
                            return cb(err);
                        }).$promise;
                },

                /**
                 * Change password
                 *
                 * @param  {String}   oldPassword
                 * @param  {String}   newPassword
                 * @param  {Function} callback    - optional
                 * @return {Promise}
                 */
                changePassword: function(oldPassword, newPassword, callback) {
                    var cb = callback || angular.noop;

                    return User.updatePswd({
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    }, function(user) {
                        return cb(user);
                    }, function(err) {
                        return cb(err);
                    }).$promise;
                },
                resetPswd: function( email,callback) {
                    var cb = callback || angular.noop;
                    return User.resetPswd(email, function(user) {
                        return cb(user);
                    }, function(err) {
                        return cb(err);
                    }).$promise;
                }
            };
        }])



.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        speed = 7;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            if (!elm) return 0;
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
})
   .factory('seoContent',['global','$stateParams','$resource','$state',function(global,$stateParams,$resource,$state){
        //-- Variables --//
        var regex=/<\/?[^>]+(>|$)/g;
        //-- Methods --//
        function setTitles(titles,res,noFooter){
            if (res.seo){
                if (res.seo.title){titles.pageTitle=res.seo.title}else titles.pageTitle=res.name;
                if (res.seo.description){titles.pageDescription=res.seo.description} else titles.pageDescription=res.desc.replace(regex, '').substring(0,150);
                if (res.seo.keywords){titles.pageKeyWords=res.seo.keywords}
            } else {
                titles.pageTitle=res.name;
                //console.log(res)
                if (res.desc){
                    titles.pageDescription=res.desc.replace(regex, '').substring(0,150);
                } else {
                   titles.pageDescription=''; 
                }
            }
            if (!noFooter){
                if (res.desc) {
                    titles.pageDescFooter=res.desc.replace(regex, '');
                } else {
                    titles.pageDescFooter='';
                }
                titles.namePageFooter=res.name;
            }
            
            
            
        }
        function getSeoPageInfo(titles){          
            if (!global.get('seopage').val ||!global.get('seopage').val.length) return false;
            if (!titles.pageDescFooter){titles.pageDescFooter=''}
            if (!titles.namePageFooter){titles.namePageFooter=''}
            for(var i=0,l=global.get('seopage').val.length;i<l;i++){
                var a = global.get('seopage').val[i];
                //console.log(a.url);
                var href= (titles.canonical)?titles.canonical:$location.path();
                //console.log(href);
                if (('http://'+global.get('config').val.domain+a['url'])==href){
                    //console.log('есть');
                    return a._id;
                    
                } 
            }
            return false;           
        }
        return {
            setDataCatalog:function(queryTag){
               // при наличии параметра запроса каноническая страница может быть только с одним параметром
                //if ($state.current.name=='stuff.stuffDetail') return;
                 //console.log($state)
                //console.log(queryTag)
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''},seoPageId;
                var firstCanonical ='http://'+global.get('config').val.domain+'/'+$stateParams.groupUrl+'/'+$stateParams.categoryName+'/'+$stateParams.categoryUrl;
                titles.canonical=firstCanonical;                
                //console.log(titles.canonical);
                if (queryTag){
                    titles.canonical+='?'+queryTag;
                }
                //console.log($stateParams);
                if (seoPageId=getSeoPageInfo(titles)){
                    $resource('/api/collections/Seopage/:id',{id:'@_id'}).get({id:seoPageId},function(res){
                         //console.log(res);
                         setTitles(titles,res);
                         global.set('titles',titles);                        
                    });
                } else if ($stateParams.categoryUrl && $stateParams.categoryUrl!='id'){
                    //console.log(' категория')
                    // категория 
                    // установлена категория
                    var category = global.get('categories').val.getObjectFromArray('url',$stateParams.categoryUrl)
                    if (category){
                        $resource('/api/collections/Category/:id',{id:'@_id'}).get({id:category._id},function(res){                    
                            titles.canonical=firstCanonical;
                            setTitles(titles,res);
                            if (queryTag){
                                queryTag=queryTag.split('&')[0].split('+')[0].split('=')[1];
                                //console.log(queryTag); 
                                //при теге выводим сео по тегу
                                var tag=global.get('filterTags').val.getObjectFromArray('url',queryTag);
                                if (tag && tag._id){
                                    $resource('/api/collections/FilterTags/:id',{id:'@_id'}).get({id:tag._id},function(res1){
                                        if (res1){
                                            titles.canonical=firstCanonical+'?queryTag='+tag.url;
                                            if(res1.desc){
                                                titles.pageDescFooter +=' \n'+res1.desc.replace(regex, '');
                                            }
                                            titles.namePageFooter +='  '+res1.name;
                                            if (res1.seo && res1.seo.keywords){                
                                                titles.pageKeyWords +=res1.seo.keywords;
                                            } 
                                            titles.pageTitle+=' '+res1.name;
                                            //console.log('таг в категории -',titles.pageDescFooter);
                                            global.set('titles',titles);
                                        }              
                                    });
                                } else {
                                    global.set('titles',titles);
                                }   
                            } else {
                                global.set('titles',titles);
                            }
                        })    
                    }
                    
                } else if (queryTag){
                    queryTag=queryTag.split('&')[0].split('+')[0].split('=')[1];
                    //console.log(queryTag); 
                    //при теге выводим сео по тегу
                    var tag=global.get('filterTags').val.getObjectFromArray('url',queryTag);
                    if (tag && tag._id){
                        $resource('/api/collections/FilterTags/:id',{id:'@_id'}).get({id:tag._id},function(res){
                            if (res){
                                titles.canonical=firstCanonical+'?queryTag='+tag.url;
                                setTitles(titles,res);
                                console.log('titles for queryTag-',titles)                            
                                global.set('titles',titles);
                            }              
                        });
                    }   
                } else if (($stateParams.brand!='brand'||$stateParams.brand!='group') && (!$stateParams.categoryUrl || ($stateParams.categoryUrl && $stateParams.categoryUrl=='id'))) {
                    // все категории в группе
                    // пока не понятно как выводить сео для этого.
                    // наверное только через СЕО страницу
                    /*$resource('/api/collections/Brand/:id',{id:'@_id'}).get({id:global.get('brands').val.getObjectFromArray('url',$stateParams.brand)._id},function(res){                    
                        setTitles(titles,res);
                        //console.log('бренд без категорий-',titles);
                        global.set('titles',titles);;
                    }) */
                }  else if (($stateParams.brand!='brand'||$stateParams.brand!='group')&& $stateParams.categoryUrl && $stateParams.categoryUrl=='id'){
                    // полный каталог
                    //console.log('полный каталог-');
                }

//*****************************************************************************               
            },
            setDataHomePage:function(){
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''},seoPageId;
                titles.canonical ='http://'+global.get('config').val.domain+'/home';
                //console.log(titles.canonical);
                if (seoPageId=getSeoPageInfo(titles)){
                    $resource('/api/collections/Seopage/:id',{id:'@_id'}).get({id:seoPageId},function(res){
                         //console.log(res);
                         setTitles(titles,res);
                         global.set('titles',titles);                        
                    });
                }
            },
            setDataStuff:function(stuff){
                var urlParams = stuff.getUrlParams();
                var img=(stuff.gallery[0].thumb)?stuff.gallery[0].thumb:'';
                var domain='http://'+global.get('store').val.domain||global.get('store').val.subDomain;
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''};
                titles.image=domain+'/'+img;
                titles.url=domain+'/'+urlParams.groupUrl+'/'
                    +urlParams.categoryName+'/'+urlParams.categoryUrl+'/'+stuff.url;
                titles.canonical= titles.url;
                setTitles(titles,stuff,true);
                if (!titles.pageTitle){titles.pageTitle=stuff.name}
                if (stuff.artikul){
                    titles.pageTitle +=' '+stuff.artikul;
                }
                if (!titles.pageDescription){titles.pageDescription=stuff.desc.replace(regex, '').substring(0,200)}
                global.set('titles',titles);
                //!******** социальные сети
                var shareTitle=urlParams.categoryName+' '+stuff.name;


                return {
                    url:  titles.url,
                    title: titles.pageTitle,
                    description: titles.pageDescription,
                    image: titles.image,
                    noparse: true
                }

            },
            setDataPage:function(res,type){
                /*console.log($state)
                if ($state.current.name=='page.pageDetail') return;
                 console.log($state)*/
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''};
                titles.image='http://'+global.get('config').val.domain+((res.img)?res.img:res.gallery[0].thumb);
                titles.url='http://'+global.get('config').val.domain+'/page/'+type+'/'+res.url;
                titles.canonical= titles.url; 
                setTitles(titles,res,true);
                if (!titles.pageTitle){titles.pageTitle=res.name} 
                if (!titles.pageDescription){titles.pageDescription=res.desc.replace(regex, '').substring(0,200)}      
                global.set('titles',titles);
                //******** социальные сети
                var shareUrl=titles.url
                var shareTitle=res.name;
                var shareImg = titles.image;
                var shareDesc= titles.pageDescription;
                return {   
                        url:  shareUrl,
                        title: shareTitle,
                        description: shareDesc,
                        image: shareImg,
                        noparse: true
                    }
            },
            setDataJournal:function(res){
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''},seoPageId;
                titles.canonical= 'http://'+global.get('config').val.domain+'/journal/'; 
                if ($stateParams.section) {titles.canonical+='/'+$stateParams.section};
                titles.url=titles.canonical;

                if (seoPageId=getSeoPageInfo(titles)){
                    $resource('/api/collections/Seopage/:id',{id:'@_id'}).get({id:seoPageId},function(res){
                        // console.log(res);
                         setTitles(titles,res,true);
                         global.set('titles',titles);                        
                    });
                } else {
                    global.set('titles',titles);
                }
            },
            setData404:function(res){
                //console.log('404');
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''},seoPageId;
                titles.canonical= 'http://'+global.get('config').val.domain+'/404'; 
                titles.url=titles.canonical;
                //console.log(getSeoPageInfo(titles));
                if (seoPageId=getSeoPageInfo(titles)){

                    $resource('/api/collections/Seopage/:id',{id:'@_id'}).get({id:seoPageId},function(res){
                        // console.log(res);
                         setTitles(titles,res,true);
                         global.set('titles',titles);                        
                    });
                } else {
                    global.set('titles',titles);
                }
            },

            setDataArticle:function(res){
                console.log($state)
                if ($state.current.name=='page.pageDetail') return;
                 console.log($state)
                var titles={pageTitle:'',pageDescription:'',pageKeyWords:''};
                titles.image=(res.gallery[0] && res.gallery[0].thumb)?'http://'+global.get('config').val.domain+'/'+res.gallery[0].thumb:'';
                titles.url='http://'+global.get('config').val.domain+'/journal/article/'+res.url;
                titles.canonical= titles.url; 
                setTitles(titles,res,true);
                if (!titles.pageTitle){titles.pageTitle=res.name} 
                if (!titles.pageDescription){titles.pageDescription=res.desc.replace(regex, '').substring(0,200)}      
                global.set('titles',titles);
                //******** социальные сети
                var shareUrl=titles.url
                var shareTitle=res.name;
                var shareImg = titles.image;
                var shareDesc= titles.pageDescription;
                return {   
                        url:  shareUrl,
                        title: shareTitle,
                        description: shareDesc,
                        image: shareImg,
                        noparse: true
                    }
            }
        };
    }]) //
