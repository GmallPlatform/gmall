'use strict';
(function(){
    class designQuery {
        constructor(brands,brandTags,filters,sectionClass,categories){
            this.brands=brands;
            this.brandTags=brandTags;
            this.filters=filters;
            this.filterTags=filters.reduce(function (a,item) {return a.concat(item.tags);},[]);
            this.sections=sectionClass.getSections();
            this.categories=sectionClass.getCategories();
            this.sectionClass=sectionClass;
        }



        getQuery(stateParams,queryParams) {
            /*console.log('getQuery')
            console.log(stateParams,queryParams)*/


            if(queryParams){
                for(let k in queryParams){
                    stateParams[k]=queryParams[k]
                }
            }


            stateParams.groupUrl=stateParams.group;
            stateParams.categoryUrl=stateParams.category;
            //console.log(stateParams)
            var parentSection,sectionCategories,categoryBrands=[],categoryFilters=[],query={},breadcrumbs=[];
            var sections=this.sections,brands=this.brands,filters=this.filters;let categories=this.categories
            parentSection=this.sectionClass.getSection(stateParams.groupUrl);
            //console.log(parentSection)
            //return;
            if(parentSection){
                if(stateParams.categoryUrl!='category'){
                    let category=parentSection.categoriesO[stateParams.categoryUrl];
                    if(category){
                        query.category=category._id;
                        categoryBrands=category.brands;
                        categoryFilters=category.filters
                    }else{
                        throw 404
                    }
                }else{
                    let sectionCategoriesFull=this.sectionClass.getEmbededCategories(parentSection,[])
                    sectionCategories=sectionCategoriesFull.map(function(el){return el._id})
                    //console.log(sectionCategories)
                    if(!sectionCategories.length){
                        query.category=null;
                    }else{
                        query.category={$in:sectionCategories}
                        sectionCategoriesFull.forEach(function (c) {
                            c.filters.forEach(function(f){
                                if(categoryFilters.indexOf(f)<0){
                                    categoryFilters.push(f)
                                }
                            })
                            c.brands.forEach(function(b){
                                if(categoryBrands.indexOf(b)<0){
                                    categoryBrands.push(b)
                                }
                            })
                        })
                    }
                }
            }else{
                //console.log('???????????')
                throw 404
            }
            //console.log(categoryFilters,categoryBrands)
            // бренд и коллекци
            // ************************************************************************
            var brandSet,brandTagSet,brandsArr,brandTagsArr;
            //console.log(categoryBrands)

            if(stateParams.brand){
                brandsArr=stateParams.brand.split('__');
                stateParams.brand=stateParams.brand.split('__');
            }
            if(stateParams.brandTag){
                brandTagsArr=stateParams.brandTag.split('__');
                stateParams.brandTag=stateParams.brandTag.split('__');
            }
            //console.log(stateParams)
            query.brand=[];
            query.brandTag=[];
            brands.forEach(function (b){
                if(brandsArr && brandsArr.indexOf(b.url)>-1){
                    query.brand.push(b._id)
                }
                b.tags.forEach(function (t) {
                    if(brandTagsArr && brandTagsArr.indexOf(t.url)>-1){
                        query.brandTag.push(t._id)
                    }
                })

            })
            if(query.brand.length){
                if(query.brand.length==1){
                    query.brand=query.brand[0]
                }else{
                    query.brand={$in:query.brand}
                }
            }else{
                query.brand=null;
            }
            if(query.brandTag.length){
                if(query.brandTag.length==1){
                    query.brandTag=query.brandTag[0]
                }else{
                    query.brandTag={$in:query.brandTag}
                }
            }else{
                query.brandTag=null;
            }
            if(!query.brandTag){
                delete query.brandTag
            }
            if(!query.brand){
                delete query.brand
            }
            //console.log(query)
            // end brand && collections
            var queryTags;
            if(stateParams.queryTag){
                // анализ url на наличие тегов*************
                queryTags=stateParams.queryTag.split('__');
                // удаляем возможные дубли
                queryTags= queryTags.filter(function(item, pos) {
                    return queryTags.indexOf(item) == pos;
                })
            }
            query.filters={} // для количественных признаков
            var filterTags;
            if(stateParams.filterTag){
                // анализ url на наличие тегов*************
                filterTags=stateParams.filterTag.split('__');
                // удаляем возможные дубли
                filterTags= filterTags.filter(function(item, pos) {
                    return filterTags.indexOf(item) == pos;
                })
                filterTags = filterTags.map(function(f){
                    return f.split('_')
                }).filter(function(f){return f.length==3}).forEach(function(f){
                    query.filters[f[0]]={$gte:Number(f[1]),$lte:Number(f[2])}
                })
            }


            query.queryTags={}
            filters.forEach(function (f) {
                if(f.count){
                    if(query.filters[f._id]){
                        f.minValue =query.filters[f._id].$gte
                        f.maxValue=query.filters[f._id].$lte
                    }else{
                        f.minValue =f.min
                        f.maxValue=f.max
                    }
                }else{
                    f.tags.forEach(function (t) {
                        if(queryTags && queryTags.indexOf(t.url)>-1){
                            if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                            query.queryTags[t.filter].push(t._id)
                        }
                    })
                }
            })
            _setQueryForTags(query,filters)

            // для клиенского запроса только опубликованные товары
            query.actived=true;
            //console.log('query',query)
            //console.log(stateParams)
            if(stateParams.searchStr){
                var search=stateParams.searchStr.substring(0,20);
                query.$or=[{name:search},{artikul:search}]
            }
            return query;

        }
        getQueryString(params,query,queryCategory){
            this.queryCategory=queryCategory;
            let {group,category}=params;
            let {brand,brandTag,queryTag}=query;
            /*console.log(params,query)
            console.log(group,category,brand,brandTag,queryTag);*/
            let q={},b=this.brands.getOFA('url',brand);
            if(brand && b){
                q.brand=b._id
            }
            if(brandTag){
                let bt;
                if(b){
                    let bt=b.tags.getOFA('url',brandTag);
                    if(bt){q.brandTag=bt._id}
                }else{
                    for(let i=0;i<this.brands.length;i++){
                        bt=this.brands[i].tags.getOFA('url',brandTag)
                        if(bt){q.brandTag=bt._id;break}
                    }
                }
            }
            // анализ url на наличие тегов*************
            if(queryTag){
                q.tags={}
                let filterTags=this.filterTags;
                queryTag.split('+').map(function(url){
                    //console.log(url)
                    return filterTags.getOFA('url',url)
                }).filter(function (t) {
                    return t;
                }).forEach(function (t) {
                    //console.log(t)
                    if(!q.tags[t.filter]){q.tags[t.filter]=[]}
                    //console.log(q.tags)
                    q.tags[t.filter].push(t._id);
                })
            }


            //console.log(q,this.queryCategory)
            if(this.queryCategory && this.queryCategory.category){
                q.category=this.queryCategory.category;
            }
            //console.log(_prepareQueryForRequest(q))
            return _prepareQueryForRequest(q);
        }

    }

    function _prepareQueryForRequest(queryStart){
        //console.log(queryStart)
        // формирование строки запроса для выбора  товаров из БД
        var query=[];
        var arr_id;
        for (var key in queryStart){
            if (queryStart[key]){
                //console.log(queryStart[key],key);
                if (key=="tags"){
                    var qu=[];
                    for (var key2 in queryStart[key]){
                        var obj=queryStart[key][key2];
                        var q=[];
                        if (obj && obj.length){
                            obj.forEach(function(objT){
                                q.push({tags:objT});
                            })

                            if (q.length>1){
                                q={$or:q}
                                qu.push(q)
                            } else {
                                q=q[0];
                                qu.push(q)
                            }
                        }
                    }
                    if (qu.length){
                        if(qu.length==1){
                            query.push(qu[0]);
                        } else {
                            query.push({$and:qu});
                        }
                    }
                }else if(key=="brandTag"){
                    //console.log(key,queryStart[key])
                    // это если запрос на список со страницы акции.
                    // в акции могут быть товары из нестольких коллекций
                    if(queryStart[key].length){
                        var obj={};
                        obj[key]={$in:queryStart[key]};
                        query.push(obj);
                        //console.log(key,obj)
                    }/*else {

                     var obj={};
                     obj[key]=queryStart[key];
                     query.push(obj);

                     }*/
                    //console.log(obj[key])
                }else if(key=="_id"){
                    // это если запрос на список со страницы акции.
                    // в акции могут быть просто товары
                    if(queryStart[key].length){
                        arr_id={};
                        arr_id[key]={$in:queryStart[key]};
                    }
                } else {
                    var obj={};
                    obj[key]=queryStart[key];
                    query.push(obj);
                }
            }
        }
        if (query.length==1){
            if(arr_id){
                query =  JSON.stringify({$or:[query[0],arr_id]});
            }else{
                query=JSON.stringify(query[0]);
            }

        } else if(query.length>1){
            if(arr_id){
                query =  JSON.stringify({$or:[{$and:query},arr_id]});
            }else{
                query =JSON.stringify({$and:query});
            }

        } else {
            if(arr_id){
                query =  JSON.stringify(arr_id);
            }else{
                query={};
            }

        }
        return query;
    }
    function _setQueryForTags(query,filters) {
        //console.log(query.queryTags,query.queryTags && typeof query.queryTags=='object')
        if(query.queryTags && typeof query.queryTags=='object'){
            var keys = Object.keys(query.queryTags);
            if(keys.length==1){
                query.tags={$in:query.queryTags[keys[0]]}
            }else if(keys.length>1){
                query.$and=[];
                keys.forEach(function(k){
                    query.$and.push({tags:{$in:query.queryTags[k]}})
                })
            }
        }
        delete query.queryTags
        var keys = Object.keys(query.filters);
        //console.log(keys,!keys)
        if(keys.length==1){
            var filter;
            if(filters){
                filter = filters.getOFA('_id',keys[0])
            }
            //console.log(filter)
            if(filter && filter.price){
                query['priceForFilter']=query.filters[keys[0]]
                console.log(query.filters[keys[0]])
            }else{
                query['filters.'+keys[0]]=query.filters[keys[0]]
            }

            //query['filters.'+keys[0]]=query.filters[keys[0]]
        }else if(keys.length>1){
            if(!query.$and){
                query.$and=[];
            }
            keys.forEach(function(k){
                var filter;
                if(filters){
                    filter = filters.getOFA('_id',k)
                }
                //console.log(filter)
                if(filter && filter.price){
                    query['priceForFilter']=query.filters[k]
                }else{
                    var o ={};
                    o['filters.'+k]=query.filters[k]
                    query.$and.push(o)
                }
            })
            if(query.$and.length==1){
                for(var k in query.$and[0]){
                    query[k] = query.$and[0][k];
                }
                delete query.$and
            }
        }
        delete query.filters
    }



    if(typeof window !== 'undefined'){
        window.DesignQuery = designQuery;
    } else {
        exports.init=designQuery;
       // module.exports = myShareData;
    }
})()

