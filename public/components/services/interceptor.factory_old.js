angular.module('gmall.services')
    .factory('myInterceptorService', function($q,$rootScope) {
        var store=globalStoreId;
        //var global= $rootScope.global;
        //console.log(globalCrawler)
        try{
            var crawler=(globalCrawler)?globalCrawler:null;
        }catch(err){
            var crawler=null;
        }

        return {
            // optional method
            'request': function(config) {
               //console.log('config.url' ,config.url)
               //console.log('config.url' ,config.url,config.url.indexOf('api/users/checkemail') > -1)
                if(!config.url){
                    console.log('config.url' ,config.url)
                    return config;
                }
                if(config.url.indexOf('socket.io') > -1){
                    console.log(config.url)
                }
                if(config.url.indexOf('api/collections/') > -1 && (config.url.indexOf('http://')<0 && config.url.indexOf('https://')<0)){
                    if(config.url.indexOf('api/collections/Dialog') > -1 ||
                        config.url.indexOf('api/collections/Chat') > -1 ||
                        config.url.indexOf('api/collections/Notification') > -1){
                        config.url=socketHost+config.url;
                        //console.log(config.url)
                    }else if(config.url.indexOf('api/collections/User') > -1 || config.url.indexOf('api/collections/SubscribtionList') > -1){
                        //console.log(config.url)
                        config.url=userHost+config.url;
                    }else if(config.url.indexOf('api/collections/Store') > -1 ||
                        config.url.indexOf('api/collections/Template') > -1 ||
                        config.url.indexOf('api/collections/Config') > -1 ||
                        config.url.indexOf('api/collections/Lang') > -1 ||
                        config.url.indexOf('api/collections/Redirect') > -1 ||
                        config.url.indexOf('api/collections/BlocksConfig') > -1 ||
                        config.url.indexOf('api/collections/CustomLists') > -1||
                        config.url.indexOf('api/collections/Seller') > -1){
                        config.url=storeHost+config.url;
                    }else if(config.url.indexOf('api/collections/Order') > -1 ||
                        config.url.indexOf('api/collections/Booking') > -1 ||
                        config.url.indexOf('api/collections/CartInOrder') > -1 ){
                        config.url=orderHost+config.url;
                    } else if(config.url.indexOf('deleteFilesFromStuff')>-1 ||
                        config.url.indexOf('fileGalleryDelete') > -1){
                        // работа с фотографиями
                        config.url=photoUpload+config.url;
                    }else{
                        config.url=stuffHost+config.url;
                    }
                    //console.log(config.params)
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }

                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                } else if (config.url.indexOf('/api/orders') > -1){

                    config.url=orderHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('/api/stuffs') > -1){

                    config.url=stuffHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('/api/sendEmail') > -1 || config.url.indexOf('api/users/') > -1 ){

                    config.url=userHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if(config.url.indexOf('auth/signupOrder') > -1){
                    config.url=userHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    /*if($rootScope.global && $rootScope.global.get('store') &&$rootScope.global.get('store').val &&$rootScope.global.get('lang') &&
                        $rootScope.global.get('store').val.lang!=$rootScope.global.get('lang').val){
                        config.params.lang=$rootScope.global.get('lang').val
                    }*/
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if(config.url.indexOf('http://')>-1 || config.url.indexOf('https://')>-1){
                    // for photos
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('views/template/partials') > -1){
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }
                //console.log(config.url)
                if(crawler){
                    config.params = config.params || {};
                    config.params.subDomain=crawler;
                }
                return config;
            }
        };
    })
