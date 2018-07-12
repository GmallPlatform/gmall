'use strict';
angular.module('gmall.services')
.factory('seoContent',['global','$stateParams','$resource','$state','$q','$sce',function(global,$stateParams,$resource,$state,$q,$sce){
    //-- Variables --//
    var regex=/<\/?[^>]+(>|$)/g;
    var seoPageId;
    //-- Methods --//
    function setTitles(titles,res,noFooter){
        //console.log(titles)
        if (res.seo){
            if (res.seo.title){titles.title=res.seo.title}else titles.title=res.name;
            if (res.seo.description){titles.description=res.seo.description} else titles.description=res.desc.replace(regex, '').substring(0,200);
            if (res.seo.keywords){titles.keywords=res.seo.keywords}
        } else {
            titles.title=res.name;
            //console.log(res)
            if (res.desc){
                titles.description=res.desc.replace(regex, '').substring(0,200);
            } else {
                titles.description='';
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
        if (!global.get('seopage') || !global.get('seopage').val ||!global.get('seopage').val.length) return false;
        if (!titles.pageDescFooter){titles.pageDescFooter=''}
        if (!titles.namePageFooter){titles.namePageFooter=''}
        for(var i=0,l=global.get('seopage').val.length;i<l;i++){
            var a = global.get('seopage').val[i];
            console.log(a.url);
            var href= (titles.canonical)?titles.canonical:$location.path();
            //console.log(href);
            if (('http://'+global.get('store').val.domain+a['url'])==href){
                //console.log('есть');
                return a._id;

            }
        }
        return false;
    }
    function setSeopageData(){
        return $q.when()
            .then(function(){
                //console.log(global.get('currentSeopage').val)
                return (global.get('currentSeopage'))?global.get('currentSeopage').val:null
            })
            .then(function(seopage){
                //console.log('seopage - ',seopage)
                if(seopage){
                    var sp=global.get('seopages').val.getOFA('link',seopage.link)
                }
                //console.log('sp - ',sp)
                if(sp && !sp.data){
                    if(!seopage.seo){
                        seopage.seo={}
                    }
                    seopage.seo.keywords=seopage.keywords.map(function(w){
                        return w.word
                        /*if(global.get('keywords').val){
                            w= global.get('keywords').val.getOFA('_id',w);
                            if(w){return w.word}{
                                return null;
                            }
                        }else{
                            return null;
                        }*/
                    }).filter(function(w){return w;}).join(',')
                    sp.data=seopage
                    // console.log('sp.data=seopage')
                }
                //console.log(seopage)
                if(seopage){
                    var titles=seopage.seo;
                    titles.domain=global.get('store').val.link;
                    titles.author=titles.author||global.get('store').val.name;
                    titles.canonical=$sce.trustAsResourceUrl(global.get('store').val.link+seopage.link);
                    seopage.desc&&(titles.desc=seopage.desc);
                    global.set('titles',titles)
                    //console.log(titles)
                    return true;
                }

            })
    }
    return {
        setDataCatalog:function(){
            setSeopageData()
                .then(function(seopageIs){
                    if(seopageIs){return}
                    //console.log(global.get('category').val)
                    var s= global.get('store').val;
                    var titles={};
                    if(global.get('category') && global.get('category').val){
                        var c=global.get('category').val;
                        //console.log(c)
                        titles.title='Заказать '+c.section.name+' '+c.name+' в '+s.name+' онлайн.'
                        titles.description= 'Заказ онлайн '+c.section.name+' '+c.name+' в '+s.name+','+s.location;
                        titles.keywords=s.name+','+c.name+','+c.section.name+','+s.location;
                        if(c.section.subSectionName){
                            titles.keywords+=','+c.section.subSectionName;
                        }
                        titles.canonical=$sce.trustAsResourceUrl(global.get('store').val.link+'/'+c.section.url+'/'+c.url);
                        if(c.section.subSectionUrl){
                            titles.canonical+='?parentGroup='+c.section.subSectionUrl;
                        }

                    }else if($stateParams.groupUrl && $stateParams.groupUrl!='group'){
                        var sectionUrl=($stateParams.parentGroup)?$stateParams.parentGroup:$stateParams.groupUrl;
                        var sec=global.get('functions').val.getSection(sectionUrl);
                        //console.log(sec);

                        if(sec){
                            if(sec.parent){
                                var secParent=global.get('functions').val.getSection(sec.parent,true);
                            }
                            titles.title='Заказать '+sec.name+' в '+s.name+' онлайн.';
                            var categories=''
                            if(sec.categories.length){
                                sec.categories.forEach(function(c,i){
                                    if(i){categories+=','}
                                    categories+=c.name
                                })
                            }
                            titles.keywords=s.name+','+sec.name+','+s.location+','+categories;
                            if (categories){categories='('+categories+')'};
                            titles.description= 'Заказ онлайн '+sec.name+categories+' в '+s.name+','+s.location;
                        }else{
                            titles.title='Заказать из каталога '+s.name+' онлайн.'
                            titles.keywords=s.name+',каталог,'+s.location;
                            titles.description= 'Заказ онлайн из каталога'+' в '+s.name+','+s.location;
                        }
                        if(sec){
                            if(secParent){
                                titles.canonical=global.get('store').val.link+'/'+secParent.url+
                                    '/category?parentGroup='+sec.url+'&categoryList=allCategories';
                            }else{
                                titles.canonical=global.get('store').val.link+'/'+sec.url+'/category'
                            }

                        }else{
                            titles.canonical=global.get('store').val.link+'/group/category';
                        }
                        titles.canonical=$sce.trustAsResourceUrl(titles.canonical);
                    }else{
                        titles.title='Заказать из каталога '+s.name+' онлайн.'
                        titles.keywords=s.name+',каталог,'+s.location;
                        titles.description= 'Заказ онлайн из каталога'+' в '+s.name+','+s.location;
                        titles.canonical=global.get('store').val.link+'/group/category';
                        titles.canonical=$sce.trustAsResourceUrl(titles.canonical);
                    }
                    titles.domain=s.link;
                    titles.author=s.name;
                    global.set('titles',titles)
                })
            return;
//*****************************************************************************
        },
        setDataHomePage:function(){
            setSeopageData()
        },
        setDataStuff:function(stuff,news){
            var img=(stuff.gallery && stuff.gallery[0] && stuff.gallery[0].thumb)?stuff.gallery[0].thumb:'';
            if(img){img=photoHost+'/'+img;}
            var domain=global.get('store').val.link;
            var titles=global.get('store' ).val.seo
            //{pageTitle:'',pageDescription:'',pageKeyWords:''};
            titles.image=img;//domain+'/'+img;
            if(news){
                titles.url=domain+'/news/'+stuff.url;
            }else{
                titles.url=domain+'/'+stuff.link
            }
            titles.canonical= $sce.getTrustedResourceUrl(titles.url);
            //console.log(titles)
            setTitles(titles,stuff,true);
            //if (!titles.title){titles.title=stuff.name}
            if (stuff.artikul){
                titles.title +=' '+stuff.artikul;
            }
            //if (!titles.description){titles.description=stuff.desc.replace(regex, '').substring(0,200)}
            titles.title=stuff.categoryName+' '+titles.title;
            global.set('titles',titles);
            //console.log(titles)
            //!******** социальные сети
            //var shareTitle=stuff.categoryName+' '+stuff.name;
            //console.log(stuff.categoryName)
            return {
                url:  titles.url,
                title: titles.title,
                description: titles.description,
                image: titles.image,
                noparse: true
            }

        },
        setDataItem:function(item,news){
            console.log(item);
            var domain=global.get('store').val.link;
            var titles=global.get('store' ).val.seo;
            if(!titles){titles={}}
            if(news){
                var img=(item.img)?item.img:'';
                titles.url=domain+'/news/'+item.url;
                titles.type='article'
            }else{
                var img=(item.gallery && item.gallery[0] && item.gallery[0].thumb)?item.gallery[0].thumb:'';
                titles.url=domain+'/'+item.link;
                titles.type='product'
            }
            if(img){img=photoHost+'/'+img;}
            titles.image=img;
            //console.log(titles.url)
            try{
                titles.canonical= $sce.trustAsResourceUrl(titles.url);
            }catch(err){console.log(err)}
            //console.log(titles)
            //setTitles(titles,item,true);
            titles.title = item.name;
            if (!news){
                if(item.artikul){
                    titles.title +=' '+item.artikul;
                }
                titles.title=item.categoryName+' '+titles.title;
            }

            global.set('titles',titles);
            //console.log(titles)
            return true;

        },


        setData404:function(res){
            //console.log('404');
            var titles={pageTitle:'',pageDescription:'',pageKeyWords:''},seoPageId;
            var titles=global.get('store' ).val.seo
            titles.canonical= $sce.trustAsResourceUrl('http://'+global.get('store').val.domain+'/404');
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

    };


    setDataPage:function(res,type){
        // вроде не используется
        console.log(res)
        /*console.log($state)
         if ($state.current.name=='page.pageDetail') return;
         console.log($state)*/
        var titles={pageTitle:'',pageDescription:'',pageKeyWords:''};
        var titles=global.get('store' ).val.seo
        titles.image='http://'+global.get('store').val.domain+((res.img)?res.img:res.gallery[0].thumb);
        titles.url='http://'+global.get('store').val.domain+'/page/'+type+'/'+res.url;
        titles.canonical= $sce.trustAsResourceUrl(titles.url);
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
}])
