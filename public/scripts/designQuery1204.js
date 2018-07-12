'use strict';
(function(){
    class designQuery {
        constructor(brands,brandTags,filters,sections,queryCategory){
            this.brands=brands;
            this.brandTags=brandTags;
            this.filterTags=filters.reduce(function (a,item) {return a.concat(item.tags);},[]);
            this.sections=sections;
            this.queryCategory=queryCategory;
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



    if(typeof window === 'undefined') {
        exports.init=designQuery;
    }
})()

