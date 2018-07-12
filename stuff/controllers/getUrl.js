var removeDiacritics = require('diacritics').remove;
var globalVar=require('../../public/scripts/globalVariable.js')

/**
 * Created by Igor on 15.09.2015.
 */
//http://www.werockyourweb.com/url-escape-characters/
var arrru = new Array ("Я","я","Ю","ю","Ч","ч","Ш","ш","Щ","щ","Ж","ж","А","а","Б","б","В","в","Г","г","Д","д","Е","е","Ё","ё","З","з","И","и","Й","й","К","к","Л","л","М","м","Н","н", "О","о","П","п","Р","р","С","с","Т","т","У","у","Ф","ф","Х","х","Ц","ц","Ы","ы","Ь","ь","Ъ","ъ","Э","э",
    ":",";","<",">","]","{","}","-","'",'"',"!","@","#","$","%","^","&","-","`","~","=","‘",",","|","/")
    //'/','&','?','$','`',':','<','>','[',']','{','}','"','+','#','%','@',';','=','^','|','~','‘',',');

/*var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e','-','-');*/
var arren = new Array ("Ya","ya","Yu","yu","Ch","ch","Sh","sh","Sh","sh","Zh","zh","A","a","B","b","V","v","G","g","D","d","E","e","E","e","Z","z","I","i","J","j","K","k","L","l","M","m","N","n", "O","o","P","p","R","r","S","s","T","t","U","u","F","f","H","h","C","c","Y","y", "", "","-","-","E", "e",
    "-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-");
var string=
    'abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
//'12345678901234567892101234567890123456789012345678901234567890';
exports.shuffle = function(len) {
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('').substring(0,len);
}
exports.cyrill_to_latin = function(text){
    for(var i=0; i<arrru.length; i++){
        var reg = new RegExp(arrru[i], "g");
        text = text.replace(reg, arren[i]);
        //console.log('text-',text,' reg-',reg,' arrru[i]-',arrru[i]);
    }

    return text.replace(/(["'\/\s])/g, "-");
}

exports.latin_to_cyrill =function(text){

    for(var i=0; i<arren.length; i++){
        var reg = new RegExp(arren[i], "g");
        text = text.replace(reg, arrru[i]);
    }
    return text;
}


var cyrill_to_latin = function(text){
    console.log('removeDiacritics-',removeDiacritics(text));
    return removeDiacritics(text);
    //console.log(text)
    for(var i=0; i<arrru.length; i++){
        var reg = new RegExp(arrru[i], "g");
        text = text.replace(reg, arren[i]);
        //console.log('text-',text,' reg-',reg,' arrru[i]-',arrru[i]);
    }
    console.log(text)
    return text.replace(/(["'\/\s])/g, "-");
}
var latin_to_cyrill =function(text){

    for(var i=0; i<arren.length; i++){
        var reg = new RegExp(arren[i], "g");
        text = text.replace(reg, arrru[i]);
    }
    return text;
}
var shuffle = function(len) {
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('').substring(0,len);
}

exports.getUrl=function(req){
    "use strict";
    var self=req.collection;
    var body=req.body;
    //console.log(' = ',req.body);
    if (!body.url){
        body.url=cyrill_to_latin(body.name.substring(0,50).split(" ").join("-").toLowerCase());
    }
    console.log('body.url-',body.url)
    function getQuery(){
        var query;
        if (!req.collectionName=='Store'){
            query={$and:[{url:body.url},{store:req.store._id}]};
            if (body._id){
                query.$and.push({_id:{$ne:body._id}});
            }
        } else {
            if (!body._id){
                query={url:body.url};
            } else {
                query={$and:[{url:body.url},{_id:{$ne:body._id}}]};
            }
        }
        return query;
    }

    return new Promise(function(resolve, reject){
        Promise.resovle()
            .then(function(query){
                return new Promise(function(resolvei,rejecti){
                    self.findOne(query,function(error,result){
                        //console.log(query,result)
                        if (result){
                            body.url+=shuffle(2);
                            query = getQuery();
                            console.log(body.url,query)
                            resolvei(query);

                        }else{
                            resolvei(null);
                        }
                    })
                })
            })
            .then(function(query){
                return new Promise(function(resolvei,rejecti){
                    //console.log('2-',query)
                    if (query){
                        self.findOne(query,function(error,result){
                            console.log('result 2-',result)
                            if (result){
                                body.url+=shuffle(3);
                                resolvei(getQuery());
                            }else{
                                resolvei(null);
                            }
                        })
                    }else{
                        resolvei(null)
                    }
                })
            })
            .then(function(query){
                return new Promise(function(resolvei,rejecti){
                    //console.log('3-',query)
                    if (query){
                        self.findOne(query,function(error,result){
                            console.log('result 3-',result)
                            if (result){
                                body.url+=shuffle(4);
                                resolvei(getQuery());
                            }else{
                                resolvei(null);
                            }
                        })
                    }else{
                        resolvei(null)
                    }
                })
            })
            .then(function(query){
                return new Promise(function(resolvei,rejecti){
                    //console.log('4-',query)
                    if (query){
                        self.findOne(query,function(error,result){
                            //console.log('result 4-',result)
                            if (result){
                                var err= new Error('Страница с таким названием уже существует!');
                                reject(err);
                            }else{
                                resolve(body.url)
                            }
                        })
                    }else{
                        resolve(body.url)
                    }
                })
            })
    })

}
