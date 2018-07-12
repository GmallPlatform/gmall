'use strict';
var mongoose = require('mongoose')//.set('debug', true);;
mongoose.Promise = global.Promise;
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var rimraf = require('rimraf');
var im = require('imagemagick');
var async = require('async');
var multer  =   require('multer');
var fs = require('fs');
var config={langs:['ru','uk','en','de']}
, util = require('util');
var sizeOf = require('image-size');
//var multiparty = require('multiparty');
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({defer: true})*/
var Busboy = require('busboy'),
inspect = require('util').inspect;
//var fs = require('fs');
//var gm = require('gm');
var exec = require('child_process').exec;
//const Imagemin = require('imagemin');
var path = require('path');
var mime =require('mime');
var getUrl=require('./getUniqueUrl.js');
var myUtil=require('./myUtil.js');
var co=require('co');
var zlib = require('zlib');
fs.mkdirParent = function(dirPath, callback) {
    //Call the standard fs.mkdir

    fs.mkdir(dirPath, function(error) {
        //When it fail in this way, do the custom steps

        if (error ) { //&& error.errno === 34
            //Create all the parents recursively

            fs.mkdirParent(path.dirname(dirPath), callback);
            //And then the directory
            fs.mkdirParent(dirPath, callback);
        } else {
        //Manually run the callback since we used our own callback to do all these
            callback && callback(error);
        }
    });
};

exports.list = function(req, res, next) {
    //console.log('list',req.url)
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        next(error)
    });
    d.run(function () {
        var page = (req.query['page'] > 0 ? req.query['page'] : 0);
        var perPage = (req.query.perPage && parseInt(req.query.perPage)>0)?parseInt(req.query.perPage):500;
        var options = {
            perPage: perPage,
            page: page,
            criteria:null,
            lang:req.store.lang
        }
        var alldata;
        if (req.query.query && req.query.query!='{}') {
            try {
                options.criteria=JSON.parse(req.query.query);
            } catch (err) {
                console.log(err)
                console.log('req.query.query')
                console.dir(req.query.query)
                options.criteria=req.query.query;
            }
        }
        if(!req.query.store){
            return next(new Error('не указан магазин'))
        }else{
            if(options.criteria && typeof options.criteria==='object'){
                if(options.criteria.alldata){
                    delete options.criteria.alldata;
                    alldata=true;
                }
                if(req.collectionName!='Stuff' || !options.criteria.category){
                    var keys = Object.keys(options.criteria);
                    if(keys.length==0){
                        options.criteria={store:req.query.store};
                    }else if(keys.length==1){
                        if(keys[0]=='$and'){
                            options.criteria.$and.push({store:req.query.store});
                        }else if(keys[0]=='store'){
                            //options.criteria={$and:[{store:req.query.store},options.criteria]}
                        }else{
                            options.criteria={$and:[{store:req.query.store},options.criteria]}
                        }
                    }else{
                        options.criteria={$and:[{store:req.query.store},options.criteria]}
                    }
                }else if(req.collectionName=='Stuff' && req.store.mp && req.store.mp.is && req.store.mp.stores && req.store.mp.stores.length){

                }
            }else{
                options.criteria={store:req.query.store};

            }
        }
        options.req=req; // какой-то хак. где-то был нужен req
        //console.log(req.query)
        if (req.query && req.query.search && req.collection.searchList){

            options.perPage=20;
            options.searchStr= req.query.search

            req.collection.searchList(options,function(e, results){
                //console.log('results',results)
                myUtil.setLangField(results,req.store.lang)

                if (e) return next(e)
                return res.json(results)
            })
        } else {
            if (alldata && req.collection.listAlldata){
                req.collection.listAlldata(options,function(e, results){
                    myUtil.setLangField(results,req.store.lang)
                    if (e) return next(e)
                    if (page==0){
                        req.collection.count(options.criteria).exec(function (err, count) {
                            if (results.length>0){
                                results.unshift({'index':count});
                            }
                            return res.json(results)
                        })
                    } else {
                        return res.json(results)
                    }
                })
            }else{
                req.collection.list(options,function(e, results){
                    //console.log(e,page)
                    //console.log('after',results,e)
                    //console.log(req.query,req.store.lang)
                    //console.log('setLangField')
                    myUtil.setLangField(results,req.store.lang)
                    //console.log(' after setLangField')
                    //console.log(req.headers);
                    if (e) return next(e)
                    if (page==0){

                        req.collection.count(options.criteria).exec(function (err, count) {
                            if (results.length>0){
                                results.unshift({'index':count});
                            }
                            //console.log(results[0])
                            return res.json(results)
                            /*zlib.deflate(JSON.stringify(results), function(err, buffer) {

                                if (!err) {
                                    //res.send(buffer);
                                    return res.end(buffer);


                                    //res.setHeader('Content-type','application/zip')
                                    //res.setHeader('content-encoding', 'gzip')
                                    //res.setHeader('Content-type','application/zip')
                                    //res.setHeader('content-encoding', 'gzip')
                                    //res.setHeader('Accept-Encoding', 'gzip')
                                    res.write(buffer,'binary');
                                    return res.end(null, 'binary');
                                    //return res.send(buffer)
                                }else{
                                    next(err)
                                }
                            });*/


                            //return res.json(results)
                        })
                    } else {
                        return res.json(results)
                        zlib.deflate(JSON.stringify(results), function(err, buffer) {

                            if (!err) {
                                res.write(buffer);
                                return res.end(null);
                                //res.setHeader('Content-type','application/zip')
                                //res.setHeader('content-encoding', 'gzip')
                                //res.setHeader('Content-type','application/zip')
                                //res.setHeader('content-encoding', 'gzip')
                                //res.setHeader('Accept-Encoding', 'gzip')
                                res.write(buffer,'binary');
                                return res.end(null, 'binary');
                                //return res.send(buffer)
                            }else{
                                next(err)
                            }
                        });

                        //return res.json(results)
                    }
                })
            }

        }

    })
}

exports.save = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        if(!req.query.store){
            var error = new Error('не задан магазин')
            return next(error)
        }
        if (req.query.update){
            updateStuff()
        }else{
            createStuff()
        }
        function createStuff(){
            if (!req.body._id){

                co(function*() {
                    if(req.body.name){
                        req.body.url = yield getUrl.create(req.collection,req.query.store,req.body.name,req.collectionName)
                    }

                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        yield req.collection.preUpdate(req);
                    }
                    let stuff = yield insert();

                    if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                        yield req.collection.postUpdate(stuff);
                    }
                }).catch(function(err){
                    console.log('error in catch - ',err)
                    return next(err)
                })
            }else {
                console.log('111????')
                let err=new Error('перезапись существуюшего елемента.Воспользуйтесь update.')
                return next(err)
            }
        }
        function* insert(){
            var stuff,upsertData;

            if(req.query.store){
                req.body.store=req.query.store;
            }
            stuff = new req.collection(req.body);
            upsertData = stuff.toObject();

            delete upsertData._id;
            if(!upsertData.store){
                upsertData.store=req.query.store;
            }

            upsertData.nameL={}
            upsertData.nameL[req.store.lang]=upsertData.name

            let result = yield req.collection.update({_id: stuff.id}, upsertData, {upsert: true})
            var o={id:stuff.id};

            if(stuff.num){o.num=stuff.num};
            if(stuff.date){o.date=stuff.date};
            if(stuff.url){o.url=stuff.url};
            if(stuff._id){o._id=stuff._id};
            res.json(o);
            return stuff;
        }
        function updateStuff(){
            //console.log(req.body)
            var arr = req.query.update.split(' ');
            co(function*() {
                if (req.collection.middlewareForUpdate && typeof req.collection.middlewareForUpdate === 'function'){
                    yield req.collection.middlewareForUpdate(req.body,arr);
                }
                var newVal ={};
                for (var i= 0,l=arr.length;i<l;i++){
                    if (req.body[arr[i]]|| req.body[arr[i]]==null || req.body[arr[i]]===0|| req.body[arr[i]]==='0' || req.body[arr[i]]==false || req.body[arr[i]]==''){
                        if(arr[i]=='name'){
                            if (req.body[arr[i]]){
                                req.body[arr[i]]=req.body[arr[i]].substring(0,100);
                            }

                        }
                        if(arr[i]=='desc'){
                            var limit=20000;
                            if(req.collectionName=='Stat' || req.collectionName=='Seopage'){
                                limit=20000;
                            }
                            req.body[arr[i]]=req.body[arr[i]].substring(0,limit);
                        }
                        newVal[arr[i]]= req.body[arr[i]];
                    } else {console.log('нет - ',arr[i])}
                }

                if(req.body._id){
                    var query={_id:req.body._id};
                }else if(req.body.ids){
                    var query={_id:{$in:req.body.ids}};
                }



                if(req.query.embeddedName && req.query.embeddedVal){
                    //http://stackoverflow.com/questions/8955910/mongoose-updating-embedded-document-in-array
                    query[req.query.embeddedName+'._id']=req.query.embeddedVal;
                    Object.keys(newVal).forEach(function(key){
                        var newKey=req.query.embeddedName+'.$.'+key;
                        newVal[newKey]=newVal[key];
                        delete newVal[key];
                    })
                }
                if(req.body.$inc){
                    var setData={$inc:newVal};
                }else if(req.body.$mul){
                    var setData={$mul:newVal};
                }else{
                    var setData={$set:newVal};
                }

                if (req.query.embeddedName && req.query.embeddedPush){
                    setData={$push:{}};
                    setData.$push[req.query.embeddedName]=newVal;
                    //setData.$push[req.query.embeddedName]["$position"]=0;
                }

                if (req.query.embeddedName && req.query.embeddedPull){
                    setData={$pull:{}};
                    // name of field = $ for array consist from literal elements not objects with fields
                    if(newVal['_id_id']){
                        newVal['_id']=newVal['_id_id'];
                        delete newVal['_id_id']
                    }
                    setData.$pull[req.query.embeddedName]=(newVal.$)?newVal.$:newVal;
                }

                let lang='ru';
                //let indexImgs;
                if(req.query.lang && config.langs.indexOf(req.query.lang)>-1){
                    lang=req.query.lang;
                }

                let newKeys={}
                newKeys.desc='descL.'+lang
                newKeys.position='positionL.'+lang
                newKeys.desc1='desc1L.'+lang
                newKeys.desc2='desc2L.'+lang
                newKeys.name='nameL.'+lang
                newKeys.name1='name1L.'+lang
                newKeys.artikul='artikulL.'+lang

                if(setData.$set && !req.query.translate){
                    let keys=Object.keys(setData.$set);

                    keys.forEach(function(k){
                        if((k=='name' || k=='desc' || k=='artikul' || k=='desc1' || k=='desc2' || k=='position') && setData.$set[k]!==null){
                            setData.$set[newKeys[k]]=setData.$set[k];
                            //console.log(setData.$set[newKeys[k]]=setData.$set[k])
                            delete setData.$set[k]
                        }
                        if(k.indexOf('blocks.')>-1){
                            if(k.indexOf('.name')>-1 && setData.$set[k]!==null && k.indexOf('.nameL')<0 && k.indexOf('.name1')<0 && k.indexOf('.nameTemplate')<0
                                && k.indexOf('.nameAnimate')<0 && k.indexOf('.name1Animate')<0){
                                let newKey=k.replace('.name','.nameL.'+lang)

                                setData.$set[newKey]=setData.$set[k];
                                delete setData.$set[k];

                            }
                            if(k.indexOf('.desc')>-1 && setData.$set[k]!==null && k.indexOf('.descL')<0 && k.indexOf('.desc1')<0){
                                let newKey=k.replace('.desc','.descL.'+lang)
                                setData.$set[newKey]=setData.$set[k];
                                //console.log(k,newKey)
                                delete setData.$set[k];
                                //console.log(setData)
                            }
                            if(k.indexOf('.position')>-1){
                                let newKey=k.replace('.position','.positionL.'+lang)

                                setData.$set[newKey]=setData.$set[k];
                                delete setData.$set[k];

                            }
                            if(k.indexOf('.name1')>-1 && k.indexOf('.name1L')<0){
                                let newKey=k.replace('.name1','.name1L.'+lang)

                                setData.$set[newKey]=setData.$set[k];
                                delete setData.$set[k];

                            }
                            if(k.indexOf('.desc1')>-1 && k.indexOf('.desc1L')<0){
                                let newKey=k.replace('.desc1','.desc1L.'+lang)

                                setData.$set[newKey]=setData.$set[k];
                                delete setData.$set[k];

                            }
                            if(k.indexOf('.imgs')>-1){
                                if(typeof req.query.indexImgs!='undefined'){

                                    if(setData.$set[k][req.query.indexImgs]){
                                        if(typeof  setData.$set[k][req.query.indexImgs].desc!='undefined'){
                                            let desc=setData.$set[k][req.query.indexImgs].desc.myTrim()
                                            if(!setData.$set[k][req.query.indexImgs].descL){
                                                setData.$set[k][req.query.indexImgs].descL={}
                                            }
                                            setData.$set[k][req.query.indexImgs].descL[lang]=desc
                                        }
                                        if(typeof  setData.$set[k][req.query.indexImgs].name!='undefined'){
                                            let name=setData.$set[k][req.query.indexImgs].name.myTrim()
                                            if(!setData.$set[k][req.query.indexImgs].nameL){
                                                setData.$set[k][req.query.indexImgs].nameL={}
                                            }
                                            setData.$set[k][req.query.indexImgs].nameL[lang]=name
                                        }
                                    }

                                }else{
                                    /*setData.$set[k].forEach(function(sl,i){

                                        if(typeof sl.desc!='undefined'){
                                            let desc=sl.desc.myTrim();
                                            if(!sl.descL){setData.$set[k][i].descL={}}
                                            setData.$set[k][i].descL[lang]=desc
                                        }
                                        if(typeof sl.name!='undefined'){
                                            let name=sl.name.myTrim();
                                            if(!sl.nameL){setData.$set[k][i].nameL={}}
                                            setData.$set[k][i].nameL[lang]=name
                                        }
                                    })*/
                                }


                            }
                        }


                        if(k.indexOf('header.')>-1|| k.indexOf('left.')>-1 || k.indexOf('right.')>-1){
                            if(k.indexOf('.name')>-1 && setData.$set[k]!==null && k.indexOf('.nameL')<0 && k.indexOf('.name1')<0){
                                let newKey=k.replace('.name','.nameL.'+lang)

                                setData.$set[newKey]=setData.$set[k];

                            }
                            if(k.indexOf('.desc')>-1 && setData.$set[k]!==null && k.indexOf('.descL')<0 && k.indexOf('.desc1')<0){
                                let newKey=k.replace('.desc','.descL.'+lang)

                                setData.$set[newKey]=setData.$set[k];

                            }

                            if(k.indexOf('.name1')>-1){
                                let newKey=k.replace('.name1','.name1L.'+lang)
                                setData.$set[newKey]=setData.$set[k];

                            }
                            if(k.indexOf('.desc1')>-1){
                                let newKey=k.replace('.desc1','.desc1L.'+lang)
                                setData.$set[newKey]=setData.$set[k];

                            }

                            if(k.indexOf('.button')>-1){

                                if(!setData.$set[k].textL){
                                    setData.$set[k].textL={}
                                }
                                setData.$set[k].textL[lang]=setData.$set[k].text



                            }
                            if(k.indexOf('.imgs')>-1){
                                if(typeof req.query.indexImgs!='undefined'){

                                    if(setData.$set[k][req.query.indexImgs] && setData.$set[k][req.query.indexImgs].desc){
                                        let desc;
                                        if(desc=setData.$set[k][req.query.indexImgs].desc.myTrim()){
                                            if(!setData.$set[k][req.query.indexImgs].descL){
                                                setData.$set[k][req.query.indexImgs].descL={}
                                            }
                                            setData.$set[k][req.query.indexImgs].descL[lang]=desc
                                        }
                                    }
                                    if(setData.$set[k][req.query.indexImgs] && setData.$set[k][req.query.indexImgs].name){
                                        let name;
                                        if(name=setData.$set[k][req.query.indexImgs].name.myTrim()){
                                            if(!setData.$set[k][req.query.indexImgs].nameL){
                                                setData.$set[k][req.query.indexImgs].nameL={}
                                            }
                                            setData.$set[k][req.query.indexImgs].nameL[lang]=name
                                        }
                                    }
                                }else{
                                    setData.$set[k].forEach(function(sl,i){
                                        if(sl.desc){
                                            let desc;
                                            if(desc=sl.desc.myTrim()){
                                                if(!sl.descL){setData.$set[k][i].descL={}}
                                                setData.$set[k][i].descL[lang]=desc
                                            }
                                        }
                                        if(sl.name){
                                            let name;
                                            if(name=sl.name.myTrim()){
                                                if(!sl.nameL){setData.$set[k][i].nameL={}}
                                                setData.$set[k][i].nameL[lang]=name
                                            }
                                        }
                                    })
                                }

                            }

                        }
                    })
                }

                let multi =null
                if(req.body.ids){
                    multi={multi:true}
                }
                //console.log(setData.$set)
                /*console.log(query)
                console.log(setData)*/

                let oh = yield req.collection.update(query,setData,multi);

                res.json({id:req.body._id});
                if(req.body.ids && req.body.$mul && arr[0]=='price'){
                    roundPrice(req.collection,req.body.ids)
                }


            }).catch(function(err){
                console.log('error in catch - ',err)
                return next(err)
            })
        }
    })
}



exports.get = function(req, res, next) {

    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });

    d.run(function () {
        if (!req.params.id) return next();
        if (!req.query.store){
            var error = new Error('не определен домен')
            return next(error);}
        let lang='ru';
        if(req.query.lang && config.langs.indexOf(req.query.lang)>-1){
            lang=req.query.lang;
        }else if(req.store.lang){
            lang=req.store.lang
        }
        var idarr=req.params.id.split('.' ),id=req.params.id;
        if (idarr.length>1){
            id=req.params.id;
        }else{
            try {
                id = new ObjectID(id);
            } catch (err) {
                id=req.params.id;
            }
        }




        if (typeof  id =='object'){
            var query ={$or:[{_id:id},{url:req.params.id}]}
        }else{
            var query ={url:id}
        }


        if(req.collectionName!='Stuff'){
            //query={$and:[query,{store:req.query.store}]}
        }

        query={$and:[query,{store:req.query.store}]}
        //console.log(query.$and[0])
        req.collection.load(query, function(e, result){

            if (e) return next(e)
            if (result){




                // кешируем знаыения, так как они нам нужны при клонировании.
                let descL,nameL,artikulL,desc1L,desc2L;
                if((req.collectionName=='Stuff'||req.collectionName=='Info') && req.query.clone && req.query.clone=='clone'){

                    descL=result.descL;
                    desc1L=result.desc1L;
                    desc2L=result.desc2L;
                    nameL=result.nameL;
                    artikulL=result.artikulL;
                }
                myUtil.setLangField(result,lang)
                if((req.collectionName=='Stuff'||req.collectionName=='Info') && req.query.clone && req.query.clone=='clone'){
                    result.descL=descL;
                    result.desc1L=desc1L;
                    result.desc2L=desc2L;
                    result.nameL=nameL;
                    result.artikulL=artikulL;
                }

                if(req.collectionName=='Group'){
                    if(result.categories){
                        result.categories =result.categories.filter(function(el){return el && el._id} )
                            .map(function(el){
                                myUtil.setLangField(el,lang)
                                el.section=result.url;
                                return el;
                            })
                    }
                }


                return res.send(result);
            } else {
                return res.sendStatus(404)
                console.log('send 404 ',req.headers.host)
                return;
            }

        },req)
    })
}
exports.delete = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {

        req.collection.findById(req.params.id,function(err,result){

            function deleteItem(){
                try {
                    var id = new ObjectID(req.params.id);
                } catch (err) {
                    var error = new Error('не верный id')
                    return next(id)
                }
                req.collection.remove({_id: id}, function(e, resultDelete){

                    if (e) return next(e)

                    if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                        req.collection.postDelete(result,req);
                    }

                    res.json( {msg:'success'})
                })
            }
            if (err) return next(err)
            if (req.collection.preDelete && typeof req.collection.preDelete === 'function'){
                req.collection.preDelete(req,result,function(err){
                    if (err) return next(err);
                    deleteItem();
                });
            } else {
                deleteItem();
            }









        });

    })

}
exports.deleteArray = function(req, res, next) {

    if (!req.query){res.json( {msg:'нечего удалить'})}
    var arr=req.query.ids.split('_');
    /*for(var i in req.query){
        arr.push(req.query[i]);
    }*/

    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {

        arr=arr.map(function(id){
            try {
                id = new ObjectID(id);
            } catch (err) {
                console.log('err-',err)
                id=id;
            }
            return id;
        })


        req.collection.remove({_id: {$in: arr}},function(err,result){

            if (err) return next(err);
            if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                req.collection.postDelete(result,req);
            }
            res.json( {msg:'success'})
        });

    })

}

function roundPrice(stuffCollection,ids) {
    async.eachSeries(ids, function iteratee(id, callback) {
        stuffCollection.findById(id,function (err,stuff){

            let price =Math.round10(stuff.price, -2);

            stuffCollection.update({_id:id},{$set:{price:price}},function(){
                callback()
            })

        })
    });
}




