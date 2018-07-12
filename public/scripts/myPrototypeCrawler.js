var listOfBlocksForMainPage={
    slider:'слайдер',
    video:'видео',
    banner:'баннер',
    mission:'миссия',
    text:'текстовый блок',
    campaign:'акции',
    filterTags:'группы(признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    stuffs:'товары',
    news:'новости',
    info:'информационный раздел',
    catalog:'каталог'
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    //return true;
}
function url_slug(s, opt) {
    s = String(s);
    opt = Object(opt);

    var defaults = {
        'delimiter': '-',
        'limit': undefined,
        'lowercase': true,
        'replacements': {},
        'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
    };

    // Merge options
    for (var k in defaults) {
        if (!opt.hasOwnProperty(k)) {
            opt[k] = defaults[k];
        }
    }

    var char_map = {
        // Latin
        'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
        'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
        'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ő': 'O',
        'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH',
        'ß': 'ss',
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
        'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th',
        'ÿ': 'y',

        // Latin symbols
        '©': '(c)',

        // Greek
        'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
        'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
        'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
        'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
        'Ϋ': 'Y',
        'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
        'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
        'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
        'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
        'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',

        // Turkish
        'Ş': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ğ': 'G',
        'ş': 's', 'ı': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'ğ': 'g',

        // Russian
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
        'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
        'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
        'Я': 'Ya',
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
        'я': 'ya',

        // Ukrainian
        'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
        'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',

        // Czech
        'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U',
        'Ž': 'Z',
        'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
        'ž': 'z',

        // Polish
        'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ó': 'o', 'Ś': 'S', 'Ź': 'Z',
        'Ż': 'Z',
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
        'ż': 'z',

        // Latvian
        'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
        'Š': 'S', 'Ū': 'u', 'Ž': 'Z',
        'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
        'š': 's', 'ū': 'u', 'ž': 'z'
    };

    // Make custom replacements
    for (var k in opt.replacements) {
        s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
    }

    // Transliterate characters to ASCII
    if (opt.transliterate) {
        for (var k in char_map) {
            s = s.replace(RegExp(k, 'g'), char_map[k]);
        }
    }

    // Replace non-alphanumeric characters with our delimiter
    var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
    s = s.replace(alnum, opt.delimiter);

    // Remove duplicate delimiters
    s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);

    // Truncate slug to max. characters
    s = s.substring(0, opt.limit);

    // Remove delimiter from ends
    s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');

    return opt.lowercase ? s.toLowerCase() : s;
}
//Object.prototype.addProp=function(o){}
/**
 * Корректировка округления десятичных дробей.
 *
 * @param {String}  type  Тип корректировки.
 * @param {Number}  value Число.
 * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
 * @returns {Number} Скорректированное значение.
 */
function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Десятичное округление к ближайшему
if (!Math.round10) {
    Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
    };
}
// Десятичное округление вниз
if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
    };
}
// Десятичное округление вверх
if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
    };
}

Array.prototype.getObjectFromArray=function(prop,value,a,filter){
    //возвращается елемент. если  есть 4 -ый параметр то возвращается массив
    // если есть пятый параметр то в массив пишется тот елемент исходного массива у котороко совйство filter true.
    var ar=[];
    //console.log(this.length);
    for (var i=0,l=this.length;i<l;i++){
        if(this[i][prop] && this[i][prop].toString && typeof this[i][prop].toString=='function'){
            this[i][prop]=this[i][prop].toString();
        }
        if (this[i][prop] && this[i][prop]==value){
            if (a){
                if (filter){
                    if (this[i][filter]){
                        ar.push(this[i])
                    }
                }else {
                    ar.push(this[i])
                }

            } else {
                return this[i];
                break;
            }

        }
    }

    if (a) {return ar;} else  {return undefined};
}
Array.prototype.getOFA=function(prop,value,a,filter){
    //возвращается елемент. если  есть 4 -ый параметр то возвращается массив
    // если есть пятый параметр то в массив пишется тот елемент исходного массива у котороко совйство filter true.
    prop=prop.split('.');
    if(prop.length==1){prop=prop[0]}
    var ar=[];
    //console.log(this.length);
    for (var i=0,l=this.length;i<l;i++){
        if(this[i][prop] && this[i][prop].toString && typeof this[i][prop].toString=='function'){
            this[i][prop]=this[i][prop].toString();
        }
        if ((this[i][prop] && this[i][prop]==value)||(prop.length &&
            this[i][prop[0]] && this[i][prop[0]][prop[1]] && this[i][prop[0]][prop[1]]==value)){
            if (a){
                if (filter){
                    if (this[i][filter]){
                        ar.push(this[i])
                    }
                }else {
                    ar.push(this[i])
                }

            } else {
                return this[i];
                break;
            }

        }
    }

    if (a) {return ar;} else  {return undefined};
}

Array.prototype.removeOFA = function(prop, value){
    var i = this.length;
    while(i--){
        if( this[i]
            && this[i].hasOwnProperty(prop)
            && (arguments.length > 1 && this[i][prop] === value ) ){

            this.splice(i,1);

        }
    }
    return this;
}


Array.prototype.getArrayObjects = function(prop,value){
    //console.log(prop,value)
    var arr=[];
    for (var i=0,l=this.length;i<l;i++){
        if (this[i][prop] && this[i][prop].length){
            var _arr = this[i][prop].map(function(item){return (typeof item=='object')?item._id:item})
            if (_arr.indexOf(value)>-1){
                arr.push(this[i]);
            }
        }
    }
    return arr;
}
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
Array.prototype.divideArrayWithChunk=function(chunk,fillArrayToEquil){
    if(!chunk){return [[],[],[],[],[]]};
    chunk=Number(chunk);
    if(chunk<2){return this;}
    var data=this;
    var arr=[];
    for(var j=0;j<chunk;j++){
        arr[j]=[];
        for (var i=j,l=data.length; i<l; i+=chunk) {
            arr[j].push(data[i]);
        }
    }
    if(fillArrayToEquil){
        for(var i=1,l=arr.length;i<l;i++){
            if(arr[i].length<arr[0].length){
                arr[i].push({})
            }
        }
    }
    return arr;
}
Array.prototype.extend = function (other_array) {
    /* you should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
}

String.prototype.clearTag = function(num){
    var regex=/<\/?[^>]+(>|$)/g;
    if (num){
        return (this.replace(regex, '').substring(0,num))
    } else {
        //console.log('?????')
        return this.replace(regex, '')
    }
}
String.prototype.replaceBlanks = function(){
    if (!this) return;
    return this.replace(/(["',.\/\s])/g, "-");
}
String.prototype.getFormatedDate=function(){
    var d=new Date(this);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return   curr_date+ "-" + curr_month+ "-" +curr_year
}


var arrru = new Array ('Я','я',  'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э' ,'э','/','&');

var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y', '', '','\'','\'','E', 'e','-','-');
var string=
    'abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
var cyrill_to_latin = function(text){
    for(var i=0; i<arrru.length; i++){
        var reg = new RegExp(arrru[i], "g");
        text = text.replace(reg, arren[i]);
    }

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

String.prototype.getUrl=function(){
    return url_slug(this)
    //return cyrill_to_latin(this.substring(0,50).split(" ").join("-").toLowerCase());
}
String.prototype.shuffle=function(len){
    if(!len){len=this.length}
    var parts = this.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('').substring(0,len);
}

//object
//Object.prototype.addProp=function(o){}
//Object.prototype.addProp=function(o){
/*if(!o || typeof o !='object'){return}
 var keysArray = Object.keys(o);
 for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
 var nextKey = keysArray[nextIndex];
 var desc = Object.getOwnPropertyDescriptor(o, nextKey);
 if (desc !== undefined && desc.enumerable) {
 this[nextKey] = o[nextKey];
 }
 }*/
//}
//Object.prototype.newMethod=function(){}


