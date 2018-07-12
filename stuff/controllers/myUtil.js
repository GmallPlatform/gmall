'use strict';
var fs = require('fs');
var co = require('co');
let async=require('async')
var request = require("request");
//let schedule = require('node-schedule');

function setLangForBlock(blocks,lang) {
    if(!blocks.forEach){return}
    blocks.forEach(function(b){
        if(!b){return}
        if(b.nameL && typeof b.nameL[lang] !='undefined'){
            b.name=b.nameL[lang];
            //b.nameL=null;
        }
        if(b.descL && typeof b.descL[lang] !='undefined'){
            b.desc=b.descL[lang];
            //b.descL=null;
        }
        if(b.name1L && typeof b.name1L[lang] !='undefined'){
            b.name1=b.name1L[lang];
            //b.name1L=null;
        }
        if(b.desc1L && typeof b.desc1L[lang] !='undefined'){
            b.desc1=b.desc1L[lang];
            //b.desc1L=null;
        }
        if(b.positionL){
            b.position=b.positionL[lang];
            //b.positionL=null;
        }
        if(b.button){
            if(b.button.textL && b.button.textL[lang]){
                b.button.text=b.button.textL[lang]
                //b.button.textL=null;
            }
        }
        if(b.imgs && b.imgs.length){
            b.imgs.forEach(function (sl,i) {
                if(sl.nameL && typeof sl.nameL[lang] !='undefined'){
                    b.imgs[i].name=sl.nameL[lang]
                }
                if(sl.descL && typeof sl.descL[lang] !='undefined'){
                    b.imgs[i].desc=sl.descL[lang]
                }
                if(sl.button && sl.button.textL && sl.button.textL[lang] !='undefined'){
                    sl.button.text=sl.button.textL[lang]
                }
            })
        }
        if(b.type && (b.type=='info' ||b.type=='news' || b.type=='filterTags'||b.type=='stuffs'||b.type=='campaign'
            ||b.type=='brands'||b.type=='brandTags'||b.type=='categories')){
            //console.log(b[b.type])
            setLangField(b[b.type],lang);
        }

    })
}

function doSingle(item,lang) {
    if(!item)return;
    //console.log(item.descL)
    /*if(item.nameL && item.nameL[lang]){
        item.name=item.nameL[lang];
        //item.nameL=null
    }
    if(item.artikulL && item.artikulL[lang]){
        item.artikul=item.artikulL[lang];
        //item.artikulL=null
    }

    if(item.descL && item.descL[lang]){
        item.desc=item.descL[lang];
        //item.descL=null
    }
    if(item.positionL && item.positionL[lang]){
        item.position=item.positionL[lang];
        //item.positionL=null;
    }
    if(item.desc1L && item.desc1L[lang]){
        item.desc1=item.desc1L[lang];
        //item.desc1L=null
    }
    if(item.desc2L && item.desc2L[lang]){
        item.desc2=item.desc2L[lang];
        //item.desc2L=null
    }*/
    if(item.nameL && typeof item.nameL=='object' && typeof item.nameL[lang] !='undefined'){
        item.name=item.nameL[lang];
        //item.nameL=null
    }
    if(item.artikulL && typeof item.artikulL=='object' && typeof item.artikulL[lang] !='undefined'){
        item.artikul=item.artikulL[lang];
        //item.artikulL=null
    }
    if(item.descL && typeof item.descL=='object' && typeof item.descL[lang] !='undefined'){
        item.desc=item.descL[lang];
        //item.descL=null
    }
    //console.log(item.name,item.positionL)
    if(item.positionL && typeof item.positionL=='object' && typeof item.positionL[lang] !='undefined'){
        item.position=item.positionL[lang];
        //item.positionL=null;
    }
    if(item.desc1L && typeof item.desc1L=='object' && typeof item.desc1L[lang] !='undefined'){
        item.desc1=item.desc1L[lang];
        //item.desc1L=null
    }
    if(item.desc2L && typeof item.desc2L=='object' && typeof item.desc2L[lang] !='undefined'){
        item.desc2=item.desc2L[lang];
        //item.desc2L=null
    }
    if(item.img_tr && item.img_tr.descL && typeof item.img_tr.descL=='object' && typeof item.img_tr.descL[lang] !='undefined'){
        item.img_tr.desc=item.img_tr.descL[lang];
    }

    if(item.blocks && item.blocks.length){
        setLangForBlock(item.blocks,lang)
    }
    if(item.left){
        //console.log('item.left')
        setLangForBlock(item.left,lang)
    }
    if(item.right){
        setLangForBlock(item.right,lang)
    }
    if(item.header && typeof item.header=='object'){
        setLangForBlock(item.header,lang)
    }



    if(item.tags && item.tags.length){
        item.tags.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    if(item.stuffs && item.stuffs.length){
        item.stuffs.forEach(function (tag) {
            if(tag && tag._id){
                doSingle(tag,lang)
            }

        })
    }
    if(item.conditionStuffs && item.conditionStuffs.length){
        item.conditionStuffs.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    if(item.categories && item.categories.length){
        item.categories.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    /*if(item.categories && item.categories.length){
        item.categories.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }*/
    if(item.conditionCategories && item.conditionCategories.length){
        item.conditionCategories.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    if(item.conditionTags && item.conditionTags.length){
        item.conditionTags.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    if(item.brandTags && item.brandTags.length){
        item.brandTags.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    if(item.conditionBrandTags && item.conditionBrandTags.length){
        item.conditionBrandTags.forEach(function (tag) {
            doSingle(tag,lang)
        })
    }
    if(item.workplaces && item.workplaces.length){
        item.workplaces.forEach(function (wp) {
            doSingle(wp,lang)
        })
    }
}

function setLangField(item,lang) {
    if(item && item.length){
        item.forEach(function (element) {
            if(element){
                doSingle(element,lang)
            }
        })
    }else if(item){
        doSingle(item,lang)
    }

}

exports.setLangField=setLangField;


function prepare(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function* () {
        return yield fn.apply(this, args);
    };
}

function isFunction(fn) {
    return typeof fn === 'function';
}

function isGenerator(fn) {
    return fn && isFunction(fn) && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}
//https://github.com/ivpusic/co-foreach/blob/master/lib/co-foreach.js

exports.forEachForGenerators = function (array, cb) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(array)) {
            return reject('co-foreach accepts array as first argument!');
        }

        if (!isFunction(cb)) {
            return reject('co-foreach accepts function as second argument!');
        }

        if (!isGenerator(cb)) {
            return resolve(array.forEach.call(array, cb));
        }

        var len = array.length;
        if (len === 0) {
            return resolve();
        }
        for (var i = 0; i < array.length; ++i) {
            var alias = prepare(cb, array[i], i);

            co(alias).then(function (response) {
                if (--len === 0) {
                    return resolve(response);
                }
            }).catch(function (err) {
                return reject(err);
            });
        }
    });
};

//*****************************************************
function getPromiseForUpdateInDB(obj,Model) {
    return new Promise(function (rs,rj) {
        async.eachOfSeries(obj, function(item, _id,cb) {
            let data={$set:{}};
            for(let key in item){
                data.$set[key]=item[key]
            }
            Model.update({_id:_id},data,function(err){
                cb(err)
            })
        }, function(err, result) {
            if(err){rj(err)}else{rs()}
        });
    })
}
exports.getPromiseForUpdateInDB=getPromiseForUpdateInDB;
//********************************************************
function requestp(url, json) {
    json = json || false;
    return new Promise(function (resolve, reject) {
        request({url:url, json:json}, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            resolve(body);
        });
    });
}
exports.requestp=requestp;
function requestp(url, json,buffer) {
    json = json || false;
    return new Promise(function (resolve, reject) {
        let o ={url:url, json:json}
        if(json!='undefined'){
            o.json=json
        }
        if(buffer){
            o.encoding=null
        }
        request(o, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            resolve(body);
        });
    });
}
exports.requestp=requestp;
//********************************************************
function readFilePromise(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function read(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data)
        });
    });
}
function saveInLogFile(typeLog,s){
    var filePath = './public/log/'+typeLog+'.log'

    try {
        /*var data = new Buffer([]);*/
        /*var data = fs.readFileSync(filePath);
        fs.open(filePath, 'w+',function (err,fd) {
            var buffer = new Buffer(s);
            fs.write(fd, buffer, 0, buffer.length, 0,function(){
                fs.write(fd, data, 0, buffer.length, data.length,function () {
                    fs.close(fd);
                })
            });

        })*/
        fs.readFile(filePath,function(err,data) {
            if(err){
                console.log(err)
            }
            //console.log(data)
            if(err || !data || ! data.length){
                fs.appendFile( filePath, s, function (err, data) {
                    if (err) console.log(err) ;
                } );

            }else{
                //console.log('data.length',data.length)
                fs.open(filePath, 'w+',function (err,fd) {
                    var buffer = new Buffer(s);
                    //console.log('buffer.length',buffer.length)
                    var newBuffer = Buffer.concat([buffer, data]);
                    fs.write(fd, newBuffer, 0, newBuffer.length, 0,function(){
                        fs.close(fd);
                        /*fs.write(fd, data, 0, buffer.length, data.length,function () {
                         fs.close(fd);
                         })*/
                    });

                })
            }

        })

       /* fs.appendFile( filePath, s, function (err, data) {
            if (err) throw err;
        } );*/
    } catch (err) {
        console.error(err);

    }
}

exports.readFilePromise=readFilePromise;
exports.saveInLogFile=saveInLogFile



