'use strict';
//http://imagemagick.org/discourse-server/viewtopic.php?t=22505
//Resize Animated Gif ... and FileSize Problem!
//http://askubuntu.com/questions/257831/how-can-i-resize-an-animated-gif-file-using-imagemagick
var domain = require('domain');
var rimraf = require('rimraf');
var im = require('imagemagick');
var async = require('async');
var multer  =   require('multer');
var fs = require('fs')
var fse = require('fs-extra')
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
var mkdirp = require('mkdirp');

const sharp = require('sharp');


fs.mkdirParent = function(dirPath, callback) {
    //Call the standard fs.mkdir
    mkdirp(dirPath, function (err) {
        if (err) {callback(err)}
        else {callback()}
    });


    /*fs.mkdir(dirPath, function(error) {
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
    });*/
};




var arrru = new Array ('Я','я',  'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э' ,'э','/','&');

var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y', '', '','\'','\'','E', 'e','-','-');
var string=
    'abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
function cyrill_to_latin(text){
    for(var i=0; i<arrru.length; i++){
        var reg = new RegExp(arrru[i], "g");
        text = text.replace(reg, arren[i]);
    }

    return text.replace(/(["'\/\s])/g, "-");
}
function shuffle(len) {
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('').substring(0,len);
}

function fileUpload(folderToDB,name,tmp_path,field,dimension,file){
    //console.log('dimension',dimension)
    var mimetype=mime.extension(file.mimetype)
    name=cyrill_to_latin(name).replace(/([^a-z0-9.]+)/gi, '-');
    var folder =  './public/' + folderToDB;
    var target_path = folder+'/img' + name;
    if(fs.existsSync(target_path)){
        name =shuffle(5)+name;
        target_path = folder+'/img' + name;
    }
    var target_pathDB = folderToDB+'/img' + name;
    return new Promise(function(resolveM,rejectM){
        Promise.resolve()
            .then(function(){
                return new Promise(function(resolve,reject){
                    if (!fs.existsSync(folder)) {
                        fs.mkdirParent(folder, function(error) {
                            if (error){reject(err)}
                            resolve();
                        });
                    } else{
                        resolve();
                    }
                })
            })
            .then(function(item){
                item={};
                return new Promise(function(resolve,reject){
                    try{
                        var dimensions = sizeOf(tmp_path);
                    }catch(err){
                        var dimensions={width:100,height:150}
                    }
                    //console.log('dimensions',dimensions)

                    if(field=='img' || field=='logo'){
                        var target_path1 = folder+'/small' + name;
                        var target_pathDB1 = folderToDB+'/small' + name;
                        if(mimetype=='gif'  || !dimension){
                            fse.copy(tmp_path, target_path, function (err) {
                                if (err) return reject(err)
                                console.log("success!");
                                item[field]=target_pathDB;
                                item['small'+field]=target_pathDB;
                                //console.log('item - ',item)
                                resolve(item);
                            });
                            return;
                        }
                        try{

                            sharp(tmp_path)
                                .resize(dimension)
                                .png({compressionLevel:8})
                                .toFile(target_path, function(err) {
                                    sharp(target_path)
                                        .resize(200)
                                        .jpeg({ quality: 60 })
                                        .png({ compressionLevel: 8 })
                                        .toFile(target_path1, function(err) {
                                            item[field]=target_pathDB;
                                            item['small'+field]=target_pathDB1;
                                            //console.log('item - ',item)
                                            resolve(item);
                                        });
                                });


                        }catch(err){
                            console.log(err)
                        }
                        return;
                    }else if(field=='gallery'){
                        var target_path1 = folder+'/thumb' + name;
                        var target_path2 = folder+'/thumpSmall' + name;
                        var target_pathDB1 = folderToDB+'/thumb' + name;
                        var target_pathDB2 = folderToDB+'/thumpSmall' + name;
                        if(mimetype=='gif'  || !dimension){
                            if(!item.gallery){item.gallery=[];}
                            fse.copy(tmp_path, target_path, function (err) {
                                if (err) return reject(err)
                                console.log("success!");
                                var photo={
                                    img:  target_pathDB,
                                    thumb:target_pathDB,
                                    thumbSmall:target_pathDB,
                                    index:item.gallery.length,
                                    //link:link
                                };
                                item.gallery.push(photo);
                                resolve(item);
                            });
                            return;
                        }

                        try{
                            sharp(tmp_path)
                                .resize(1200)
                                .jpeg({ quality: 75 })
                                .png({ compressionLevel: 8 })
                                .toFile(target_path, function(err) {
                                    if(dimensions.height>dimensions.width){
                                        var width=720,height=1080;
                                    }else{
                                        var width=720,height=480;
                                    }
                                    //console.log(width)
                                    sharp(target_path)
                                        .resize(width)
                                        .jpeg({ quality: 75 })
                                        .png({ compressionLevel: 8 })
                                        .toFile(target_path1, function(err) {
                                            sharp(target_path1)
                                                .resize(300)
                                                .jpeg({ quality: 70 })
                                                .png({ compressionLevel: 8 })
                                                .toFile(target_path2, function(err) {
                                                    if(!item.gallery){item.gallery=[];}
                                                    var photo={
                                                        img:  target_pathDB,
                                                        thumb:target_pathDB1,
                                                        thumbSmall:target_pathDB2,
                                                        index:item.gallery.length,
                                                        //link:link
                                                    };

                                                    item.gallery.push(photo);
                                                    /*item.gallery.sort(function(a,b){return a.index- b.index});
                                                     item.gallery.forEach(function(photo,i){photo.index=i;})*/
                                                    resolve(item);
                                                });
                                        });
                                });


                        }catch(err){
                            console.log(err)
                        }
                    }else{
                        if(mimetype=='gif' || mimetype=='ico' || !dimension){
                            fse.copy(tmp_path, target_path, function (err) {
                                if (err) return reject(err)
                                //console.log("success!");
                                if(field=='imgs'){
                                    if(!item[field]){item[field]=[];}
                                    item[field].push({img:target_pathDB,index:0,actived:true});
                                }else{
                                    item[field]=target_pathDB;
                                }
                                //console.log(item[field])
                                resolve(item);
                                //console.log('item - ',item)
                            });
                            return;
                        }

                        try{
                            //console.log('dimension',dimension)
                            sharp(tmp_path)
                                .resize(dimension)
                                .crop(sharp.strategy.entropy)
                                .jpeg({ quality: 80 })
                                .png({ compressionLevel: 8 })
                                .toFile(target_path, function(err) {
                                    //console.log('err',err)
                                    if(field=='imgs'){
                                        if(!item[field]){item[field]=[];}
                                        item[field].push({img:target_pathDB,index:0,actived:true});
                                    }else{
                                        item[field]=target_pathDB;
                                    }
                                    resolve(item);
                                });


                        }catch(err){
                            console.log(err)
                            throw err;
                        }
                    }
                })
            })
            .then(function(item){
                //console.log('item',item)
                if(item['small'+field]){
                    resolveM(item);
                }else{
                    resolveM(item[field]);
                }

            })
            .catch(function(err){
                rejectM(err)
            })
    })
}
function setDemension(demension,req, res, next){
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function (){
        /*console.log('req.file',req.file)
        console.log('req.files',req.files)*/

       //jfhfh=4;
        if (!req.file) {
            res.json({ msg: 'No file uploaded at ' + new Date().toString() });
        } else {
            let collectionName = (req.query.collectionName)?req.query.collectionName:req.collectionName;
            var file = req.file;
            var name=req.file.name||req.file.originalname;
            var field=(req.body.nameImg)?req.body.nameImg:'img'

            var tmp_path = req.file.path;
            var folderToDb='images/'+req.store.subDomain+'/'+collectionName+'/'+((req.body.url)?req.body.url:req.body.id);
            console.log('folderToDb',folderToDb)
            console.log('req.params.collectionName',req.query.collectionName)

            Promise.resolve()
                .then(function(){
                    return fileUpload(folderToDb,name,tmp_path,field,demension,file);
                } )
                .then(function(result){
                    //console.log('result-',result)
                    if(field=='gallery'){
                        res.json({gallery:result})
                    }else if(field=='imgs'){
                        res.json({imgs:result})
                    }else{
                        if(result['small'+field]){
                            res.json(result)
                        }else{
                            res.json({img:result})
                        }

                    }

                } )
                .catch(function(err){
                    return next(err)
                })

        }

    });
}

exports.fileUploadSticker = function(req, res, next) {
    setDemension(80,req, res, next);
}
exports.fileUploadSmall = function(req, res, next) {
    setDemension(400,req, res, next);
}
exports.fileUpload = function(req, res, next) {
    setDemension(600,req, res, next);
}
exports.fileUploadBig = function(req, res, next) {
    setDemension(1200,req, res, next);
}
exports.fileUploadFullImg = function(req, res, next) {
    setDemension(1920,req, res, next);
}
exports.fileUploadOrigin = function(req, res, next) {
    setDemension(null,req, res, next);
}
exports.fileUploadGallery = function(req, res,next){
    /*console.log(req.body)
    console.log(req.params)*/
    setDemension(1920,req, res, next);
    return;
    /*console.log(req.body)
    console.log(req.params)*/
    return;
    var upload=
        function () {
            if (!req.file || !req.file.size) {
                res.send({ msg: 'No file uploaded at ' + new Date().toString() });
            } else {
                var file = req.file;
                var name=req.file.name||req.file.originalname;
                console.log('name-',name)
                var tmp_path = req.file.path;
                // set where the file should actually exists - in this case it is in the "images" directory
                var folder =  './public/images/'+req.collectionName+'/' + req.body.id;
                var target_path = folder+'/' + name;
                var target_pathDest=folder+'/'  + 'img'+ name;
                var thumb_target_path = folder+'/' +'thumb'+ name;
                var thumbSmall_target_path =folder+'/' +'thumbSmall'+ name;
                var target_pathQ = '/images/'+req.collectionName+'/'+ req.body.id+'/' + 'img' +name;
                var thumb_target_pathQ = '/images/'+req.collectionName+'/'+req.body.id+'/'+'thumb'+  name;
                var thumbSmall_target_pathQ = '/images/'+req.collectionName+'/'+req.body.id+'/'+'thumbSmall'+name;



                async.series([
                    function(callback){
                        //console.log(1,req.body);
                        if (!fs.existsSync(folder)) {
                            fs.mkdirParent(folder, function(error) {
                                //console.log(error)
                                if (error) return next(error);
                                callback();
                            });
                        } else {
                            callback();
                        }
                    },
                    function(callback){
                        //console.log(2,req.body);
                        fs.rename(tmp_path, target_path, function(err) {
                            if (err) return next(err);
                            callback();
                        });
                    },
                    function(callback){
                        //console.log(44);
                        var cmd = 'convert '+target_path+' -resize 1400 '+target_pathDest;
                        //console.log(cmd);
                        exec(cmd, {encoding: 'binary', maxBuffer: 5000*1024}, function(error, stdout) {
                            console.log('error - ',error)
                            if (error) return callback(error);
                            callback();
                            //fs.writeFileSync(target_pathDest, stdout, 'binary');
                        });
                        //console.log(thumb_target_path);
                        //console.log(target_path);
                        /*gm(target_path).resize(1000).write(writeStream, function (err) {
                         if (!err) console.log(' hooray! ');
                         });*/
                        /*im.resize({
                         srcPath: target_path,
                         //dstPath: target_pathDest,
                         width:   1200,
                         maxBuffer:5000*1024,
                         timeout:500
                         },
                         function(err, stdout, stderr){
                         console.log(err);
                         //console.log(stderr);
                         if (err) return next(err);
                         fs.writeFileSync(target_pathDest, stdout, 'binary');
                         console.log('resized kittens.jpg to fit within 256x256px')
                         callback();
                         })*/


                    },
                    /* function(callback){
                     var  isd = new Imagemin()
                     .src(target_pathDest)
                     .dest(folder+'/1.jpg')
                     .use(Imagemin.jpegtran({progressive: true}))
                     .run((err, files) => {
                     console.log(files[0]);
                     callback();
                     //=> {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
                     });

                     },*/
                    function(callback){
                        //console.log(3,req.body);
                        if (req.body.index){
                            //console.log(thumbSmall_target_path);
                            //console.log(target_path);
                            im.resize({
                                    srcPath: target_path,
                                    dstPath: thumbSmall_target_path,
                                    width:   150
                                },
                                function(err, stdout, stderr){
                                    if (err) return next(err);
                                    callback();
                                })
                        } else {callback()}
//
                    },
                    function(callback){
                        //console.log(3);
                        //console.log(thumb_target_path);
                        //console.log(target_path);
                        im.resize({
                                srcPath: target_path,
                                dstPath: thumb_target_path,
                                width:   600

                            },
                            function(err, stdout, stderr){
                                if (err) return next(err);
                                callback();
                            })
                    },

                    function(callback){
                        function getIndex(index){
                            return index || 1;
                        }
                        //console.log(5);
                        var index =getIndex(req.body.index);
                        if (!index || index=='undefined'){
                            index=1;
                        }
                        index= getIndex(index);
                        //var small= (req.body.index==100)?thumbSmall_target_pathQ:'';
                        var small= thumbSmall_target_pathQ;
                        var link=(req.body.link)?req.body.link.substring(0,200):'';
                        var gallery={
                            thumb:thumb_target_pathQ,
                            thumbSmall:small,
                            img:  target_pathQ,
                            index:index,
                            link:link
                        };
                        //console.log(index);
                        req.collection.findById(req.body.id,function(err,stuff){
                            if (err) return next (err);
                            if(!stuff.gallery) stuff.gallery=[];
                            stuff.gallery.push(gallery );
                            stuff.gallery.sort(function(a,b){return a.index- b.index});
                            //console.log(stuff.gallery);
                            req.collection.update({_id:stuff._id},{$set:{gallery:stuff.gallery}},function(err) {
                                if (err) return callback(err);
                                callback(null,stuff.gallery);
                            })
                            /*stuff.save(function(err) {
                             if (err) return(err);
                             callback(null,stuff.gallery);
                             })*/
                        })
                    }
                ], function (err, results) {
                    //console.log(6);

                    if (err)
                        return next(err)
                    else
                    //console.log(results)
                        fs.unlink(target_path, function(error) {
                            if (error) return next(error);
                            res.json({msg:"загружено!",gallery:results[5]});
                        });
                    //res.json({msg:"загружено!",gallery:results[5]});

                })

            }
        }

    var size = '';
    var fileName = '';
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        upload();
    });
    req.pipe(busboy)

}
exports.videoUpload = function(req, res, next){
    let collectionName = (req.params.collectionName)?req.params.collectionName:req.collectionName;
    var folder='images/'+req.store.subDomain+'/'+collectionName+'/'+((req.body.url)?req.body.url:req.body.id)+'/video';
    var suffix=Date.now();
    var name=req.file.name||req.file.originalname;
    name=cyrill_to_latin(name).replace(/([^a-z0-9.]+)/gi, '-');
    //name=suffix + '-' + name;
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            var folder='images/'+collectionName+'/'+req.body.id+'/video';

            callback(null, 'public/'+folder);
        },
        filename: function (req, file, callback) {
            var suffix=Date.now();
            callback(null, suffix + '-' + file.fieldname+'.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage } ).single('video');
    var folderPath='public/'+folder;
    var fileName;
    var field=req.body.nameImg;
    var id=req.body.id;



    /*var folder =  './public/' + folderToDB;
    var target_path = folder+'/img' + name;
    if(fs.existsSync(target_path)){
        name =shuffle(5)+name;
        target_path = folder+'/img' + name;
    }*/


    upload(req,res,function(err,result) {
        //console.log(req.file)
        fileName=Date.now() + '.' + mime.extension(req.file.mimetype)
        fileName=name;
        Promise.resolve()
            .then(function(){
                //console.log(1)
                return new Promise(function(resolve,reject){
                    if (!fs.existsSync(folderPath)) {
                        //console.log('!fs.existsSync(folder)')
                        fs.mkdirParent(folderPath, function(error) {
                            //console.log(error)
                            if (error){reject(err)}
                            resolve();
                        });
                    } else{
                        //console.log('!fs.existsSync(folder)')
                        resolve();
                    }
                })
            })
            .then(function () {
                console.log(folderPath+'/'+fileName)
                return new Promise(function(resolve,reject){
                    fs.access(folderPath+'/'+fileName, fs.F_OK, function(err) {
                        if (err) {
                            resolve()
                        } else {
                            var error = new Error('file exist!!')
                            fileName =shuffle(5)+fileName;
                            console.log(fileName)
                            resolve()
                            //reject(error)
                        }
                    });
                })
            })
            .then(function(){
                var item={};
                //console.log(4)
                return new Promise(function(resolve,reject){
                    fs.rename(req.file.path,folderPath+'/'+fileName, function(err) {
                        if(err){reject(err)}
                        item[field]=folder+'/'+fileName
                        resolve(item)
                    })
                })
            })
            .then(function(item){
                res.json({img:item[field]});
            })
            .catch(function(err){
                console.log(err)
                return next(err)
            })

    });

}
exports.deleteFolder=function(req,res,next){
    console.log('req.body-',req.body);
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function (){
        console.log('./public/'+req.body.folder)
        fs.access('./public/'+req.body.folder, fs.F_OK, function(err) {
            console.log(err)
            if (!err) {
                rimraf('./public/'+req.body.folder,function(err,result){
                    if(err){return next(err)}
                    //console.log(err,result)
                    res.json({msg:'ok'})
                })
            } else {
                res.json({})
            }
        });
    })
}


exports.deleteFolders=function(req,res,next){
    //console.log('req.body-',req.body);
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function (){

        let acts=[]
        if(req.body.folders && req.body.folders.length){
            req.body.folders.forEach(function (f) {
                f = './public/'+f;
                acts.push(deleteFolder(f))
            })
            Promise.all(acts).then(function () {
                res.json({})
            }).catch(next)
        }else{
            res.json({})
        }


    })

}


function deleteFolder(f){
    return new Promise(function (rs,rj) {
        fs.access(f, fs.F_OK, function(err) {
            //console.log(err)
            if (!err) {
                rimraf(f,function(err,result){
                    if(err){rj(err)}
                    rs()
                })
            } else {
                rs()
            }
        });
    })
}


exports.deleteFiles=function(req,res,next){
    //console.log(req.body)
    /*console.log(req.body);
    return;*/
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.files ||!req.body.files.length){
                    var err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        })
        .then(function(){
            var files= req.body.files.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            console.log('start deleting',files)
            var actions=files.map(function(file){
                return new Promise(function(resolve,reject){
                    //console.log(file)
                    if (fs.existsSync('./public/'+file)){
                        //console.log('./public/',file)
                        Promise.resolve().then(function(){
                            return new Promise(function(resolve1,reject1){
                                fs.unlink('./public/'+file, function (err) {
                                    if (err){reject1(err)}
                                    //console.log('deleted ',file)
                                    resolve1()
                                });
                            })
                        } ).then(function(){
                            resolve();
                        } ).catch(function(err){
                            reject(err);
                        })
                    }else{
                        resolve()
                    }
                })
            })
            return new Promise(function(resolve,reject){
                Promise.all(actions).then(function(){resolve()}).catch(function(err){reject(err)})
            })
        })
        .then(function(){
            res.json({})
        })
        .catch(function(err){
            next(err)
        })

}






exports.fileGalleryDelete = function(req, res,next){
    //console.log('req.params-',req.params);
    var id = req.params.id;
    var photo,
        photoId = req.params.idImage;

    req.collection.findById(id,function(err,stuff){
        if (err) { next(err);}
        //console.log(cake);
        if(stuff.gallery) {
            photo = stuff.gallery.id(photoId);
            //console.log(photo);
            var thumbfile = (photo.thumb)?'./public'+photo.thumb:null;
            var imgfile =  (photo.img)?'./public'+photo.img:null;
            var imgSmall =  (photo.thumbSmall)?'./public'+photo.thumbSmall:null;


            if (thumbfile){
                fs.unlink(thumbfile, function (err) {
                    if (err)
                        console.log(err)
                    else
                        console.log('successfully deleted '+photo.thumb);
                });
            }
            if(imgfile){
                fs.unlink(imgfile, function (err) {
                    if (err)
                        console.log(err)
                    else
                        console.log('successfully deleted '+photo.img);
                });
            }
            if(imgSmall){
                fs.unlink(imgSmall, function (err) {
                    if (err)
                        console.log(err)
                    else
                        console.log('successfully deleted '+photo.img);
                });
            }

            stuff.gallery.id(photoId).remove();
            stuff.save(function(err) {
                if (err){ next(err)}
                res.json({msg:'удалено!',gallery:stuff.gallery});

            })
        } else
            res.json({msg:'нечего удалять!!'});

    })


}
exports.fileDeleteFromImgs=function(req,res,next){
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.file || !req.body._id){
                    var err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        } )//нечего удалять
        /*.then(function(){
            return new Promise(function(resolve,reject){
                if(!req.user){
                    err = new Error('необходима авторизация')
                    reject(err);
                }else{resolve()}
            })
        } )//необходима авторизация
        .then(function(){
            return new Promise(function(resolve,reject){
                var owners=req.store.owner.map(function(el){
                    if(el.toString()){return el.toString()}else{return el;}
                })
                if(owners.indexOf(req.user._id.toString())>-1){
                    admin=true;
                    resolve(admin)
                }else{
                    err = new Error('необходима авторизация for Store')
                    reject(err);
                }
            })
        }) //необходима авторизация for Store
        .then(function(){
            return new Promise(function(resolve,reject){
                resolve()
            })

        })*/
        .then(function(){
            //проверка прав
            return new Promise(function(resolve,reject){
                // обратить внимание не _id, а id  так как _ID занят под параметр deleteFilesFromStuff
                var query={_id:req.body.id};
                req.collection.findOne(query,function(err,stuff){
                    if(err){return reject(err) };
                    if(!stuff){
                        err = new Error('нет такого stuff')
                        reject(err);
                    }
                    resolve(stuff.imgs)
                })
            })
        } )
        .then(function(imgs){
            return new Promise(function(resolve,reject){
                imgs=imgs.map(function(i){
                    return i.img;
                } )
                if (imgs.indexOf(req.body.file)<0){
                    var err = new Error('файд не принадлежит товару')
                    reject(err);
                }else{
                    resolve(req.body.file);
                }

            })
        } )
        .then(function(file){
            //console.log('start deleting - ',file)
            return new Promise(function(resolve,reject){
                if (fs.existsSync('./public/'+file)){
                    //console.log('./public/',file)
                    Promise.resolve()
                        .then(function(){
                            return new Promise(function(resolve1,reject1){
                                fs.unlink('./public/'+file, function (err) {
                                    if (err){ return reject1(err)}
                                    //console.log('deleted ',file)
                                    resolve1()
                                });
                            })
                        } )
                        .then(function(){
                            resolve();
                        } )
                        .catch(function(err){
                            reject(err);
                        })

                }else{
                    resolve()
                }
            })

    })
        .then(function(){
            res.json({})
        })
        .catch(function(err){
        next(err)
    })

}





exports.updateGallery = function(req, res,next) {
    /*console.log('ddddd');
   console.log(req.params);*/
    var id = req.params.id;
    var gallery = req.body.gallery;
    req.collection.findById(id,function(err,stuff){
        /*console.log(stuff);
        console.log(err)*/
        if (err) next(err);
        if (stuff){
            req.collection.update({_id:stuff._id},{$set:{gallery:gallery}},function(err){
                if (err) next(err);
                res.json({msg:'обновлено',gallery:gallery});
            })
            /*stuff.gallery=gallery;
            stuff.save(function(err){
                if (err) next(err);
                res.json({msg:'обновлено',gallery:gallery});
            });*/
            // stop here, otherwise 404
        } else {
            // send 404 not found
            res.json({msg:'нет объекта в базе'});
        }
    })
}


exports.copyfile=function(req,res,next){
    if(!req.body || !req.body.fileSrc || !req.body.fieldName){
        var err=new Error('нечего или некуда копировать')
        return next()
    }
    var file=req.body.fileSrc.split('/')
    let collectionName = (req.params.collectionName)?req.params.collectionName:req.collectionName;
    var folder='images/'+req.store.subDomain+'/'+collectionName+'/'+req.body._id;

    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if (!fs.existsSync('./public/'+folder)) {
                    //console.log('!fs.existsSync(folder)')
                    fs.mkdirParent('./public/'+folder, function(error) {
                        //console.log(error)
                        if (error){reject(err)}
                        resolve();
                    });
                } else{
                    //console.log('!fs.existsSync(folder)')
                    resolve();
                }
            })
        })
        .then(function(){
            var filePath=folder+'/'+file[file.length-1];
            //console.log('filePath- ',filePath);
            var stream = fs.createReadStream('./public/'+req.body.fileSrc).pipe(fs.createWriteStream('./public/'+filePath));
            stream.on('finish', function () {
                //console.log('finish')
                var o={_id:req.body._id};
                o[req.body.fieldName]=filePath;
                //console.log(o)
                res.json(o);
                /*req.collection.update({_id:req.body._id},{$set:o},function(err){
                    if (err) next(err);
                    res.json({id:req.body._id});
                })*/
            });
        })


}


///////////////////////////////

exports.deleteFilesFromStuff=function(req,res,next){
    console.log(req.body);
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.files ||!req.body.files.length || !req.body._id){
                    var err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        })
        /*.then(function(){
         return new Promise(function(resolve,reject){
         if(!req.user){
         var err = new Error('необходима авторизация')
         reject(err);
         }else{resolve()}
         })
         })*/
        /*.then(function(){
         var owners=req.store.owner.map(function(el){
         if(el.toString()){return el.toString()}else{return el;}
         })
         if(owners.indexOf(req.user._id.toString())>-1){
         admin=true;
         seller=req.store.seller._id.toString();;
         }
         return;
         })*/

        .then(function(){
            return;
            //проверка прав
            return new Promise(function(resolve,reject){
                // обратить внимание не _id, а id  так как _ID занят под параметр deleteFilesFromStuff
                var query={_id:req.body.id};
                console.log(query)
                req.collection.findOne(query,function(err,stuff){
                    //console.log(stuff)
                    if(err){return reject(err)};
                    if(!stuff){
                        err = new Error('нет такого товара или товар не соответствует продавцу')
                        reject(err);
                    }else{
                        //console.log(stuff)
                        resolve(stuff.gallery)
                    }

                    /*if(stuff.seller && stuff.seller.toString!=seller){
                     resolve(stuff.gallery)
                     } else{
                     err = new Error('товар не соответствует продавцу')
                     reject(err)
                     }*/
                })
            })
        } )
        .then(function(gallery){
            return;
            return new Promise(function(resolve,reject){
                gallery=gallery.map(function(g){
                    var arr = [];
                    if(g.img){arr.push( g.img)}
                    if(g.thumb){arr.push( g.thumb)}
                    if(g.thumbSmall){arr.push( g.thumbSmall)}
                    return arr;
                } ).reduce(function(arr,item){
                    if(item.length){
                        item.forEach(function(el){arr.push(el)})
                        return arr;
                    }
                },[])
                //console.log(gallery);
                req.body.files.forEach(function(file){
                    if (gallery.indexOf(file)<0){
                        err = new Error('файд не принадлежит товару')
                        reject(err);
                    }
                })
                resolve();
            })
        } ).then(function(){
        console.log('start deleting')
        var actions=req.body.files.map(function(file){
            return new Promise(function(resolve,reject){
                console.log(file)
                if (fs.existsSync('./public/'+file)){
                    console.log('./public/',file)
                    Promise.resolve().then(function(){
                        return new Promise(function(resolve1,reject1){
                            fs.unlink('./public/'+file, function (err) {
                                if (err){reject1(err)}
                                //console.log('deleted ',file)
                                resolve1()
                            });
                        })
                    } ).then(function(){
                        resolve();
                    } ).catch(function(err){
                        reject(err);
                    })

                }else{
                    resolve()
                }
            })
        })
        return new Promise(function(resolve,reject){
            Promise.all(actions).then(function(){resolve()}).catch(function(err){reject(err)})
        })
    }).then(function(){
        res.json({})
    }).catch(function(err){
        next(err)
    })

}

exports.deleteSlideImage=function(req,res,next){
    var admin=false,seller=null;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.body.file || !req.body._id){
                    err = new Error('нечего удалять')
                    reject(err);
                }else{resolve()}
            })
        } )//нечего удалять
        /*.then(function(){
            return new Promise(function(resolve,reject){
                if(!req.user){
                    err = new Error('необходима авторизация')
                    reject(err);
                }else{resolve()}
            })
        } )*///необходима авторизация
        /*.then(function(){
            return new Promise(function(resolve,reject){
                var owners=req.store.owner.map(function(el){
                    if(el.toString()){return el.toString()}else{return el;}
                })
                if(owners.indexOf(req.user._id.toString())>-1){
                    admin=true;
                    resolve(admin)
                }else{
                    err = new Error('необходима авторизация for Store')
                    reject(err);
                }
            })
        })*/ //необходима авторизация for Store
        .then(function(){
            return new Promise(function(resolve,reject){
                resolve()
            })

        })
        .then(function(){
            //проверка прав
            return new Promise(function(resolve,reject){
                var query={_id:req.body._id}
                req.collection.findOne(query,function(err,homePage){
                    if(err){return reject(err) };
                    if(!homePage){
                        err = new Error('нет такого homepage')
                        reject(err);
                    }
                    resolve(homePage.imgs)
                })
            })
        } ).then(function(imgs){
        return new Promise(function(resolve,reject){
            imgs=imgs.map(function(i){
                return i.img;
            } )
            if (imgs.indexOf(req.body.file)<0){
                var err = new Error('файд не принадлежит товару')
                reject(err);
            }else{
                resolve(req.body.file);
            }

        })
    } ).then(function(file){
        //console.log('start deleting - ',file)
        return new Promise(function(resolve,reject){
            if (fs.existsSync('./public'+file)){
                //console.log('./public',file)
                Promise.resolve()
                    .then(function(){
                        return new Promise(function(resolve1,reject1){
                            fs.unlink('./public'+file, function (err) {
                                if (err){ return reject1(err)}
                                //console.log('deleted ',file)
                                resolve1()
                            });
                        })
                    } )
                    .then(function(){
                        resolve();
                    } )
                    .catch(function(err){
                        reject(err);
                    })

            }else{
                resolve()
            }
        })

    }).then(function(){
        res.json({})
    }).catch(function(err){
        next(err)
    })

}


