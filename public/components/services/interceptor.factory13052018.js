angular.module('gmall.services')
    .factory('myInterceptorService', function($q,$rootScope) {
        var store=globalStoreId;
        //var zip = new JSZip();
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
                if(config.url.indexOf('uib/template/') > -1
                    || config.url.indexOf('.tpl.html') > -1 || config.url.indexOf('rzSliderTpl.html') > -1|| config.url.indexOf('tooltip/tooltip-popup.html') > -1
                    || config.url.indexOf('template/modal/backdrop.html') > -1 || config.url.indexOf('template/modal/window.html') > -1
                    || config.url.indexOf('template/datepicker/day.html') > -1 || config.url.indexOf('template/datepicker/month.html') > -1|| config.url.indexOf('template/datepicker/year.html') > -1
                    || config.url.indexOf('template/popover/popover.html') > -1 || config.url.indexOf('template/datepicker/datepicker.html') > -1|| config.url.indexOf('template/datepicker/popup.html') > -1){
                    return config;
                }
                config.params = config.params || {};
                if(!config.params.store){
                    config.params.store=store
                }
                if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                    config.params.lang=$rootScope.global.get('store').val.lang
                }
                return config;
                /***************************************************************************************************************************************/

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
                    /*if(config.url.indexOf('api/collections/Dialog') > -1 ||
                        config.url.indexOf('api/collections/Chat') > -1 ||
                        config.url.indexOf('api/collections/Notification') > -1){
                        config.url=socketHost+config.url;
                    }else if(config.url.indexOf('api/collections/User') > -1 || config.url.indexOf('api/collections/SubscribtionList') > -1){
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
                    } else if(config.url.indexOf('deleteFilesFromStuff')>-1 || config.url.indexOf('fileGalleryDelete') > -1){
                        config.url=photoUpload+config.url;
                    }else{
                        config.url=stuffHost+config.url;
                    }*/
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }

                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                } else if (config.url.indexOf('/api/orders') > -1){

                    //config.url=orderHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('/api/stuffs') > -1){

                    //config.url=stuffHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('/api/sendEmail') > -1 || config.url.indexOf('api/users/') > -1 ){

                    //config.url=userHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if(config.url.indexOf('auth/signupOrder') > -1){
                    //config.url=userHost+config.url;

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
                }else if(config.url.indexOf('/api/chatMessagesList/')>-1 || config.url.indexOf('/api/notificationList/')>-1){
                    // for photos
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }
                else if (config.url.indexOf('views/template/partials') > -1){
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
            },
            response: function(response){
                // do something for particular error codes
                if(response.status === 500){
                    // do what you want here
                }
               //console.log(response)

                return response;
                //console.log("response && response.config && response.config.url && response.config.url.split",response && response.config && response.config.url && response.config.url.split)
                if(response && response.config && response.config.url && response.config.url.split){

                    //var u = response.config.url.split('api/collections')
                    var u = response.config.url.split(stuffHost)
                    //console.log(u)
                    if(u.length >1 ){
                        var u1 =  u[1].split('api/collections')
                        //console.log(u1)
                        if(u1[1]){
                            var u2 = u1[1].split('/')
                            //console.log(u2)
                            if(u2.length==2){
                                console.log('unzip',response.config.url,response)
                                /*var gunzip = new Zlib.Gunzip(response.data);
                                response.data = gunzip.decompress();*/
                                return response;
                            }else{
                                return response;
                            }

                        }else{
                            return response;
                        }

                    }else{
                        return response;
                    }


                }else{
                    return response;
                }



            }
        };
    })
