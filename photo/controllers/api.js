'use strict';

var fs = require('fs-extra')
var co = require('co');
var path = require('path');
var mkdirp = require('mkdirp');
var request = require( 'request' );
var sizeOf = require('image-size');
var sharp = require('sharp');
var async= require('async')
var rimraf = require('rimraf');

//var i=0;
function createFolder(folder) {
    return new Promise(function (rs,rj) {
        //console.log('./public'+folder)
        mkdirp('./public'+folder, function (err) {
            //console.log('-',err)
            if (err) rj(err)
            else rs()
        });
    })
}
function copyFile(f1,f2){
    return new Promise(function (rs,rj) {
        //console.log(f1,f2)
        fs.access('./public/'+f1, fs.F_OK, function(err) {
            //console.log('err1',err)
            if (err) {
                //console.log(err);
                return rs()
            }
            try{
                fs.copy('./public/'+f1,'./public/'+f2, function (err) {
                    //console.log('err2',err)
                    if (err) {
                        rj(err)
                    } else {rs()}
                });
            }catch (err){
                console.log(err)
                rs()
            }


        });

    })
}



fs.mkdirParent = function(dirPath, callback) {
    //console.log(dirPath)
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

exports.checkArchImages=function(req,res,next){
    console.log(req.params.file);
    return res.json({file:false})
}
exports.downloadArchImages=function(req,res,next){
    console.log('downloadArchImages');
    return res.json({})
}

function uploadImg(){
    return Promise(function (rs,rj) {

    })
}
function handlePhoto(data,callback) {
    let {img,preffix,i,smallPhoto}=data
    /*console.log(img,preffix)
    return callback()*/
    let photo=img.split('/');
    photo = photo[photo.length-1]

    let o={
        img:preffix+'img'+photo,
        thumb:preffix+'thumb'+photo,
        thumpSmall:preffix+'thumbSmall'+photo,
    }

    let writeStreeam=fs.createWriteStream(preffix+photo);
    let reqPhoto=request(img)
    reqPhoto.pipe(writeStreeam);

    reqPhoto.on('error',function (err) {
        console.log(err,img)
        callback(err)
    })
    writeStreeam.on('finish',nice_ending);
    writeStreeam.on('end',nice_ending);
    writeStreeam.on('error', error_ending);
    writeStreeam.on('close', error_ending);
    let ended;
    function nice_ending() {
        if (!ended) {
            ended = true;
            try{
                var dimensions = sizeOf(preffix + photo);
            }catch(err){
                console.log('err dimension ',err)
                var dimensions={width:100,height:150}
            }
            try{
                if(smallPhoto){
                    sharp(preffix + photo)
                        .resize(400)
                        .toFile(o.img, function(err) {
                            fs.unlink(preffix + photo,function(err){
                                //console.log('file deleted successfully');
                            });
                            if(dimensions.height>dimensions.width){
                                var width=240,height=360;
                            }else{
                                var width=240,height=160;
                            }
                            sharp(o.img)
                                .resize(width)
                                .toFile(o.thumb, function(err) {
                                    sharp(o.thumb)
                                        .resize(150)
                                        .toFile(o.thumpSmall, function(err) {
                                            console.log('photo done ',o.i)
                                            callback()
                                        });
                                });
                        });
                }else{
                    sharp(preffix + photo)
                        .resize(1200)
                        .toFile(o.img, function(err) {
                            fs.unlink(preffix + photo,function(err){
                                //console.log('file deleted successfully');
                            });
                            if(dimensions.height>dimensions.width){
                                var width=480,height=720;
                            }else{
                                var width=480,height=320;
                            }
                            sharp(o.img)
                                .resize(width)
                                .toFile(o.thumb, function(err) {
                                    sharp(o.thumb)
                                        .resize(300)
                                        .toFile(o.thumpSmall, function(err) {
                                            console.log('photo done ',o.i)
                                            callback()
                                        });
                                });
                        });
                }




            }catch(err){
                console.log(err)
                callback(err)
            }


        }
    }
    function error_ending(err) {
        /*console.log('error_ending',err)
         console.log('ended ',ended)*/
        if (!ended) {
            ended = true;
            console.log(err,img)
            callback(err)
        }
    }

    return;
    var Req = request.get(img)
    Req.on( 'response', function( resFile ){
            // create file write stream
            var fws = fs.createWriteStream( preffix + photo );

            // setup piping
            resFile.pipe( fws );

            resFile.on('end', function(){
                // go on with processing
                //console.log('load end')
                try{
                    var dimensions = sizeOf(preffix + photo);
                }catch(err){
                    var dimensions={width:100,height:150}
                }
                try{
                    sharp(preffix + photo)
                        .resize(1200)
                        .toFile(o.img, function(err) {
                            fs.unlink(preffix + photo,function(err){
                                //console.log('file deleted successfully');
                            });
                            if(dimensions.height>dimensions.width){
                                var width=480,height=720;
                            }else{
                                var width=480,height=320;
                            }
                            sharp(o.img)
                                .resize(width)
                                .toFile(o.thumb, function(err) {
                                    sharp(o.thumb)
                                        .resize(300)
                                        .toFile(o.thumpSmall, function(err) {
                                            console.log('photo done ',o.i)
                                            callback()
                                        });
                                });
                        });


                }catch(err){
                    console.log(err)
                    callback(err)
                }



            });
            resFile.on( 'error', function(err){
                console.log(err,img)
                callback(err)
            })
        })
    Req.on('error',function (err) {
            console.log(err,img)
            callback(err)
        })
}

exports.uploadPhotosToStuffs=function(req,res,next){
    try{
        //console.log(req.body)
        //console.log(req.headers)
        //res.json({})
        res.end()
        console.log('start')
        let smallPhoto=(req.body.smallPhoto)?true:null;
        let actsStuffFolders=[];
        let actsPhotos=[];
        for(let stuff in req.body.photos){
            let preffix='./public/images/'+req.body.subDomain+'/Stuff/'+stuff+'/'
            actsStuffFolders.push(preffix)
            //console.log(preffix)
            if(req.body.photos[stuff]){
                if(req.body.photos[stuff].forEach){
                    req.body.photos[stuff].forEach(function(img,i){
                        actsPhotos.push({img:img,preffix:preffix,i:i,smallPhoto:smallPhoto})
                    })
                }else{
                    actsPhotos.push({img:req.body.photos[stuff],preffix:preffix,i:0})
                }
            }
        }
        console.log('actsStuffFolders ',actsStuffFolders.length)
        Promise.resolve()
            .then(function () {
                return createFolder("/images/"+req.body.subDomain)
            })
            .then(function () {
                return createFolder("/images/"+req.body.subDomain+'/Stuff/')
            })
            .then(function () {
                //console.log(acts.length)
                return new Promise(function (rs,rj) {
                    async.eachSeries(actsStuffFolders, fs.mkdirParent, function(err, result) {
                        if(err){rj(err)}else{rs()}
                    });
                })




                //return Promise.all(acts)
            })
            .then(function () {
                console.log('folders were created')
                //return Promise.all(actsPhotos)
                console.log(actsPhotos.length)
                return new Promise(function (rs,rj) {
                    async.eachSeries(actsPhotos,handlePhoto , function(err, result) {
                        //console.log(err,result)
                        if(err){rj(err)}else{rs()}
                    });
                })

            })
            .then(function () {
                //console.log('!!!!')
                request.post({url:req.body.url,form:{error:null}});

            })
            .catch(function (err) {
                console.log(err)
                request.post({url:req.body.url,form:{error:err}});
            })
    }catch(err){
        console.log(err)
    }


}
function deleteFolder(folder) {
    return new Promise(function (rs,rj) {
        fs.access(folder, fs.F_OK, function(err) {
            if (!err) {
                rimraf(folder,function(err,result){
                    console.log('result delete folder ',result)
                    if(err){return rj()}
                    rs()
                })
            } else {
                rs()
            }
        });
    })
}
exports.copyPhotos=function(req,res,next){
    //console.log(req.body.folders)
    //return res.json({msg:'ok'})
    let acts=[],dirs=[];
    if(req.body.photos && req.body.photos.length){
        req.body.photos.forEach(function (f) {
            let a = f[1].split('/')
            a.pop();
            let b = a.join('/')
            if(b[0]!='/'){
                b ="/"+b
            }
            if(dirs.indexOf(b)<0){
                dirs.push(b)
            }
        })
    }
    //console.log(dirs)

    //console.log('req.body.deleteFolder',req.body.deleteFolder)
    Promise.resolve()
        .then(function () {
            if(req.body.deleteFolder){
                let folder= './public/images/'+req.body.subDomain
                return deleteFolder(folder);
            }

        })
        .then(function () {
            if(req.body.deleteFolder){
                let folder= '/images/'+req.body.subDomain
                return createFolder(folder);
            }
        })
        .then(function () {
           /* if(req.body.folders && req.body.folders.length){
                req.body.folders.map(function (f) {
                    acts.push(createFolder(f))
                    //console.log(f)
                })
            }*/
            if(dirs.length){
                dirs.map(function (f) {
                    acts.push(createFolder(f))
                    //console.log(f)
                })
            }
            return Promise.all(acts)
        })
        .then(function () {
            console.log('folders created')
            acts=[];
            if(req.body.photos && req.body.photos.length){
                //console.log(req.body.photos.length)
                req.body.photos.map(function (ff) {
                    acts.push(copyFile(ff[0],ff[1]))

                })
            }
            return Promise.all(acts)
        })
        .then(function (results) {
            return res.json({msg:'ok'})
        })
        .catch(function (err) {
            console.log(err)
            next(err)
        })


}

exports.copyPhotosFromBrowser=function(req,res,next){
    //console.log(req.body.folder)
    Promise.resolve()
        .then(function () {
            if(req.body.folder){
                return createFolder(req.body.folder)
            }
        })
        .then(function () {
            //console.log('folders created')
            let acts=[];
            if(req.body.photos && req.body.photos.length){
                req.body.photos.map(function (ff) {
                    acts.push(copyFile(ff[0],ff[1]))
                    console.log(ff)
                })
            }
            return Promise.all(acts)
        })
        .then(function (results) {
            return res.json({msg:'ok'})
        })
        .catch(function (err) {
            console.log(err)
            next(err)
        })
}













