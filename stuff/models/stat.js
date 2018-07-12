'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
    var cToL= require('../controllers/c-l');
/**
 * User Schema
 */

var blockSchema = new Schema({
    type:String, // text,missia,info,news,campaign,map,banner,slider,video,categories,brandTags,brands,filterTags,stuffs
    index:{type:Number,default:0},
    is:Boolean,
    name:String,
    name1:String,
    nameAnimate:String,
    name1Animate:String,
    nameAnimateDelay:Number,
    animateSlider:String,
    animateDelay:Number,
    nameL:{},
    name1L:{},
    desc:String,
    descL:{},
    desc1:String,
    desc1L:{},
    map:String,
    calendar:String,
    img:String,
    video:String,
    videoOgg:String,
    videoLink:String,
    videoCover:String,
    audio:Boolean,
    button:{is:Boolean,text:String,link:String,textL:{},animate:String},
    button1:{is:Boolean,text:String,link:String,textL:{},animate:String},
    imgs:[{
        name: {type : String, default : '', trim : true},
        nameL:{},
        img : String,
        desc : {type : String, default : ''},
        descL:{},
        link: {type : String, default : '', trim : true},
        actived:{type:Boolean,default:true},
        index:Number,
        button:{}
    }], // slides
    filterTags:[{type : Schema.ObjectId, ref : 'FilterTags'}],
    brandTags:[{type : Schema.ObjectId, ref : 'BrandTags'}],
    categories:[{type : Schema.ObjectId, ref : 'Category'}],
    brands:[{type : Schema.ObjectId, ref : 'Brand'}],
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    news:[{type : Schema.ObjectId, ref : 'News'}],
    campaign:[{type : Schema.ObjectId, ref : 'Campaign'}],
    info:[{type : Schema.ObjectId, ref : 'Info'}],

    templ:Number,
    style:Number,
    /*color:{type:String,default:'#fff'},
     backgroundColor:{type:String,default:'#000'},
     fontSize:{type:String,default:'1em'},*/
    blockStyle:[],
    elements:{},
    mobile:{blockStyle:[], elements:{},},
    tablet:{blockStyle:[], elements:{},},
    animate:String,
    animateRepeat:Boolean,
    duration:Number,// время смены слайда в секундах
    qwslide:Number,// количество слайдов для оwl slider
    autoPlaySlider:Boolean,
    template:Boolean,// если шаблон то доступен для загрузки
    nameTemplate:String,
    link:String,
    link1:String,
    position:String,// left,right,top
    useImg:Boolean,
    useDesc:Boolean,
    videoControl:Boolean,
})



var StatSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    name: {type : String, default : '', trim : true},
    nameL:{},
    descL:{},
    actived:Boolean,
    preload:Boolean,// use page as a preload screen
    url:{type:String,index:true},
    blocks:[blockSchema],
    desc : {type : String, default : ''},
    desc1 : {type : String, default : ''},
    desc2 : {type : String, default : ''},
    desc3 : {type : String, default : ''},
    desc4 : {type : String, default : ''},
    desc5 : {type : String, default : ''},
    desc6 : {type : String, default : ''},
    desc7 : {type : String, default : ''},
    desc8 : {type : String, default : ''},
    img:String,
    img1:String,
    img2:String,
    img3:String,
    img4:String,
    img5:String,
    img6:String,
    gallery:[{thumbSmall:String,thumb:String,img:String,index: Number}],
    imgs:[],
    masters:Boolean, // наличие блока мастеров на странице
    index: Number,
    map:String,
    video:String,
    translated:{},// булевые значения для языков. закончен перевод данного объекта на язык или нет
});

StatSchema.statics = {
    load: function (query, cb) {
        var self=this;
        //console.log('query stat page ',query)
        this.findOne(query)
            .populate('blocks.stuffs','name artikul url gallery orderType nameL category artikulL orderType price stock sale timePart currency driveSalePrice desc descL link')
            .populate('blocks.news','name img url videoLink video desc descL date blocks nameL img_tr')
            /*.slice('comments', 3)
            .populate('comments', 'author date text')
            .populate('category','name filters mainFilter')
            .populate('brand','name')
            .populate('brandTag','name')
            .populate('tags','name')*/
            //.populate('category.mainFilter')
            .lean({ virtuals: true })
            .exec(function(err,news){
                if(news && news.blocks && news.blocks.length){
                    news.blocks.forEach(el=>{
                        if(el && el.type=='stuffs' && el.stuffs && el.stuffs.length){
                            el.stuffs.forEach(function (s,i) {
                                if(s.blocks && s.blocks.length){
                                    for(let i=0;i<s.blocks.length;i++){
                                        if(s.img){break}
                                        if(s.blocks[i].img && s.blocks[i].useImg){
                                            s.img=s.blocks[i].img;
                                        }
                                    }
                                }
                                if(s && !s.img && s.gallery && s.gallery.length)  {
                                    s.img=s.gallery[0].img
                                }
                            })

                        }
                    })
                }
                cb(null,news);
                /*console.log('err-',err);
                if (err || !doc) {
                    console.log('doc-',doc)
                    //var newid = new ObjectID(id);
                    self.findOne({_id:id}).exec(function(err,doc){
                        if (err) return cb(err);
                        cb(null,doc);
                    })
                } else {
                    cb(null,doc);
                };*/
                
            })
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        //console.log('list')
        var criteria = options.criteria || {}
        //console.log('stat options',criteria,options.perPage,options.page)
        this.find(criteria)
            //.populate('gallery.tag', 'name')
            .select('name url index img blocks nameL actived preload translated')
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function (err,res) {
                if(err){return cb(err)}
                if(res && res.length){
                    res.forEach(function(el,ii){
                        res[ii]=res[ii].toObject()
                        //console.log(options.lang,res[ii])
                        let img,imgs,desc,video,descL;
                        /*if(options.lang){
                            if(res[ii].nameL){
                                res[ii].name=res[ii].nameL[options.lang]
                            }
                        }*/
                        //console.log(options.lang)
                        if(el.blocks && el.blocks.length){
                            for(let i=0;i<el.blocks.length;i++){
                                if(!el.blocks[i].is){continue}

                                if(el.blocks[i].useImg){
                                    img=el.blocks[i].img;
                                    imgs=null;
                                    video=null;
                                }
                                /*console.log(el.name)
                                 console.log(el.img)*/
                                if(el.blocks[i].useDesc){
                                    let s = el.blocks[i].desc.myTrim().clearTag().substring(0,150);
                                    //console.log(s)
                                    if(s){
                                        desc=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                        descL=el.blocks[i].descL;
                                    }
                                }
                                /*if(options.lang){
                                    if(el.blocks[i].nameL){
                                        el.blocks[i].name=el.blocks[i].nameL[options.lang]
                                    }
                                    if(el.blocks[i].name1L){
                                        el.blocks[i].name1=el.blocks[i].name1L[options.lang]
                                    }
                                    if(el.blocks[i].descL){
                                        el.blocks[i].desc=el.blocks[i].descL[options.lang]
                                    }
                                    if(el.blocks[i].desc1L){
                                        el.blocks[i].desc1=el.blocks[i].desc1L[options.lang]
                                    }
                                }*/
                                /*if(img && desc && video){break;}*/
                                //console.log(el.blocks[i],el.blocks[i].type)
                                if(el.blocks[i] && el.blocks[i].type && (el.blocks[i].type=='banner'||el.blocks[i].type=='banner1')){
                                    if(!img){
                                        img=el.blocks[i].img;
                                    }

                                    if(el.blocks[i].desc && !desc){
                                        desc=el.blocks[i].desc;
                                    }
                                }
                                if(((el.blocks[i] && el.blocks[i].type && el.blocks[i].type=='video') || (el.blocks[i] && el.blocks[i].type && el.blocks[i].type=='video1'))){
                                    if(!video){
                                        video=el.blocks[i].video;
                                    }
                                    if(el.blocks[i].desc && !desc){
                                        desc=el.blocks[i].desc;
                                    }
                                }

                                if(el.blocks[i] && el.blocks[i].type && el.blocks[i].type=='text' && !desc){
                                    desc=el.blocks[i].desc;
                                    descL=el.blocks[i].descL;
                                }
                            }
                            //console.log(img)
                            if(img){res[ii].img=img}else{
                                let b=el.blocks.getOFA('type','slider');
                                //console.log('slider',b)
                                if(b){
                                    res[ii].imgs=b.imgs;
                                }
                            };
                            //if(desc){el.desc=desc.clearTag().substring(0,200);}
                            if(video){res[ii].video=video;}
                            if(desc){
                                res[ii].desc=desc;
                                res[ii].descL=descL;
                            }
                            res[ii].blocks=null;
                        }
                    })

                }
                cb(null,res)
            })
    },
    searchList: function (options, cb) {
        //console.log('options.criteria',options.criteria)
        let criteria = {$and:[options.criteria,{$or:[]}]}
        let searchStr=RegExp( options.searchStr, "i" )
        let o={['nameL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['blocks.descL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['name']:searchStr};
        criteria.$and[1].$or.push(o)
        o={['desc']:searchStr};
        criteria.$and[1].$or.push(o)

        //console.log('stat options',criteria)
        this.find(criteria)
        //.populate('gallery.tag', 'name')
            .select('name url store img blocks nameL desc descL')
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function (err,res) {
                //console.log(res)
                if(err){return cb(err)}
                if(res && res.length){
                    res.forEach(function(el,ii){
                        res[ii]=res[ii].toObject()
                        let img,desc,descL;
                        if(el.blocks && el.blocks.length){
                            for(let i=0;i<el.blocks.length;i++){
                                //console.log(el.blocks[i])
                                if(img && desc){break;}
                                //console.log(el.blocks[i],el.blocks[i].type)
                                //console.log(el.blocks[i].type,'-',el.blocks[i] && el.blocks[i].type && (el.blocks[i].type=='banner' ||el.blocks[i].type=='banner1')&& !img)
                                if(el.blocks[i] && el.blocks[i].type && (el.blocks[i].type=='banner' ||el.blocks[i].type=='banner1')&& !img){

                                    img=el.blocks[i].img;
                                    if(el.blocks[i].desc){
                                        desc=el.blocks[i].desc;
                                    }
                                    if(el.blocks[i].descL){
                                        descL=el.blocks[i].descL;
                                    }
                                }
                                if(el.blocks[i] && el.blocks[i].type && el.blocks[i].type=='text' && !desc){
                                    desc=el.blocks[i].desc;
                                    descL=el.blocks[i].descL;
                                }
                            }

                            if(img){res[ii].img=img}
                            if(desc){res[ii].desc=desc}
                            if(descL){
                                if(typeof descL=='object'){
                                    for(let k in descL){
                                        if(descL[k] && descL[k].clearTag){
                                            let s = descL[k].clearTag().substring(0,150)
                                            //console.log('s ',s)
                                            descL[k]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                        }
                                    }
                                }
                                res[ii].descL=descL}
                            res[ii].blocks=null;
                        }
                    })

                }
                //console.log(res)
                cb(null,res)
            })
    },


}

StatSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    test: function(plainText) {
        return plainText;
    }

};

mongoose.model('Stat', StatSchema);

