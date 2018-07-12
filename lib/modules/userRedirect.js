'use strict';
const request=require('request');
const isWin = /^win/.test(process.platform);
var config=require('../config/config' );
var ports=require('../../modules/ports' );
var routersPath=require('../../modules/routers.json' );
var modelsList=require('../../modules/models.json' );
var remote_ip=require('../../modules/ip/ip.js' ).remote_ip;

var zlib = require('zlib');



module.exports = {
    handleRequest:handleRequest,
    postAuth:postAuth,
}
function getPreffix(model,url) {

    let host=remote_ip,port;
    if(model &&(checkModel('stuff',model))||(url && checkRouterPath('stuff',url))){
        //host = config.stuffHost
        port = ports.stuffPort;
    } else if((model && (checkModel('user',model))) || (url && checkRouterPath('user',url))){
        //host = config.userHost;
        port = ports.userPort;
    }else if((model && (checkModel('chat',model)))||(url && checkRouterPath('chat',url))){
        //host = config.socketHost;
        port = ports.socketPort;
    }else if((model && (checkModel('store',model)))||(url && checkRouterPath('store',url))){
        //host = config.storeHost;
        port = ports.storePort;
    }else if(model && (checkModel('order',model)) ||(url && checkRouterPath('order',url))){
        //host = config.orderHost;
        port = ports.orderPort;
    }else if(model &&(checkModel('photo',model))||(url && checkRouterPath('photo',url))){
        //host = config.photoUpload;
        port = ports.photoUploadPort;
    }
    if(!host && !port){return null}
    //console.log("http://"+host+":"+port)
    if(isWin){
        return "http://"+host+":"+port
    }else{
        return "http://127.0.0.1:"+port;
    }
}
function checkRouterPath(host,url) {
    //console.log('url',url)
    return routersPath[host].some(p=>url.indexOf(p)>-1)
}
function checkModel(host,model) {
    //console.log(host,model)
    return modelsList[host] && modelsList[host].indexOf(model)>-1
}
function getHeaders(req) {
    let authorization= req.headers.authorization||req.headers.Authorization;
    // Set the headers
    let headers = {
        'Authorization':     authorization
    }
    for(let key in req.headers){
        //console.log(key,req.headers[key])
        if(key=='accept' || key=='connection' || key =='accept-encoding'||key=='accept-language'){
            headers[key]=req.headers[key]
        }/*else{
            console.log(key,req.headers[key])
        }*/
    }
    /*console.log(req.headers)
    console.log(headers)*/
    /*delete req.headers.host
    delete req.headers.origin
    delete req.headers.referer
    delete req.headers['user-agent']
    return req.headers*/
    return headers;
}


function handleRequest(req, res,next) {

    let urll;
    if(req.params.model){
        let preffix= getPreffix(req.params.model);
        if(!preffix){return next()}
        urll=preffix+"/api/collections/"+req.params.model;
        if(req.params.id){
            urll+='/'+req.params.id
        }
    }else{
        let preffix= getPreffix(null,req.url)
        if(!preffix){return next()}
        urll=preffix+req.url
    }
    //console.log(urll)
    /*let formData;
    if(req.file){
        let fileToUpload = req.file;

        let formData = {
            toUpload: {
                value: fs.createReadStream(path.join(__dirname, '..', '..','upload', fileToUpload.filename)),
                options: {
                    filename: fileToUpload.originalname,
                    contentType: fileToUpload.mimeType
                }
            }
        };

    }*/
    //console.log(req.file,formData)




    let options = {
        url:urll,
        method: req.method,
        headers: getHeaders(req),
        json: true,
        qs: req.query,
    }
    /*if(req.params.model && req.params.model=='Photo'){
        console.log(options)
    }*/
    //console.log(options)
    if((req.method=='POST' || req.method=='PUT') && req.body){
        //options.form={};
        if(req.body){
            options.body=req.body
            /*for(let k in req.body){
                options.form[k]=req.body[k]
                //options.formData[k]=(typeof req.body[k]=="object")?JSON.stringify(req.body[k]):req.body[k]
            }*/
        }

    }
    /*if(formData){
        options.formData=formData
    }*/
    /*console.log(options.form);
    console.log(options.headers);*/
    try{
        let requestForServer = request(options);
        requestForServer.on('response', function(response) {
            var chunks = [];
            response.on('data', function(chunk) {
                chunks.push(chunk);
            });

            response.on('end', function() {
                var buffer = Buffer.concat(chunks);
                res.set(response.headers)
                res.end(buffer)

            });
            response.on('error', function(err) {
                next(err)
            })
        });
    }catch(err){
        next(err)
    }
}



function postAuth(req, res,next){
    let authorization= req.headers.authorization||req.headers.Authorization;
    // Set the headers
    const headers = {
        'Authorization':     authorization
    }
    if(isWin){
        var urll="http://"+config.userHost+"/auth";
    }else{
        var urll="http://127.0.0.1:3001/auth";
    }
    if(req.params.type){
        urll+='/'+req.params.type
    }

    // Configure the request
    const options = {
        url:urll,
        method: 'POST',
        headers: headers,
        qs: req.query,
        formData:{}
    }
    if(req.body){
        for(let k in req.body){
            options.formData[k]=(typeof req.body[k]=="object")?JSON.stringify(req.body[k]):req.body[k]
        }
    }
    try{
        request(options, function(err,response,body){
            if(err){return next(err)}
            if(response && response.body){
                try{
                    let data = JSON.parse(response.body)
                    res.json(data)
                }catch(err){next(err)}
            }
        })
    }catch(err){
        console.log('err',err)
        next(err)
    }
}