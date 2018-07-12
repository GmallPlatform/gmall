'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

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
    template:Boolean,// если шаблон то доступен для загрузки
    nameTemplate:String,
    link:String,
    link1:String,
    position:String,// left,right,top
    useImg:Boolean,
    useDesc:Boolean,
    videoControl:Boolean,

})

var WorkplaceSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    nameL: {},
    url:{type :String,index:true},
    img:String,
    desc : {type : String, default : ''},
    descL : {},
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    index: Number,
    actived:{type:Boolean,default:true},
    forCustomEntry:Boolean,// показывать в выборе зала для записи с сайта клиентом
    blocks:[blockSchema],
    imgs:[],
    translated:{},// булевые значения для языков. закончен перевод данного объекта на язык или нет
});


WorkplaceSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .populate('blocks.stuffs','name artikul nameL artikulL link gallery actived')
            .exec(function(err,res){
                if (err) return cb(err);
                cb(null,res)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if(criteria && criteria['$and']){
            if (criteria['$and'][0]['name']){
                criteria['$and'][0]['name']=new RegExp(criteria['$and'][0]['name'],'i');
            }
            if (criteria['$and'][1]['name']){
                criteria['$and'][1]['name']=new RegExp(criteria['$and'][1]['name'],'i');
            }

        }
        this.find(criteria)
            .select('name url index actived blocks nameL forCustomEntry translated')
            .sort({'index': 1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function (err,res) {
                if(err){return cb(err)}
                try{
                    if(res && res.length){
                        res.forEach(function(el,ii){
                            let img,imgs,desc,stuffs,video,descL;
                            if(el.blocks && el.blocks.length){
                                el.blocks.sort(function (a,b) {
                                    return a.index-b.index
                                })
                                for(let i=0;i<el.blocks.length;i++){
                                    if(el.blocks[i].type=='stuffs' && !stuffs && el.blocks[i].stuffs.length){
                                        stuffs=el.blocks[i].stuffs.map(function(m){
                                            if(m.toString){return m.toString()}else{
                                                return m
                                            }
                                        });

                                    }
                                    if(!el.blocks[i] || !el.blocks[i].is){continue}
                                    if(!desc && el.blocks[i].desc){
                                        let s = el.blocks[i].desc.myTrim().clearTag().substring(0,150);
                                        if(s){
                                            desc=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                            descL=el.blocks[i].descL;
                                        }
                                    }
                                    if(img || video || imgs){continue}
                                    if((el.blocks[i].type=='banner'||el.blocks[i].type=='banner1') && el.blocks[i].img){
                                        img = el.blocks[i].img
                                    }
                                    if(img || video || imgs){continue}
                                    if(el.blocks[i].type=='videoLink' && el.blocks[i].videoLink){
                                        video = el.blocks[i].videoLink
                                    }
                                    if(img || video || imgs){continue}
                                    if(el.blocks[i].type=='slider' &&el.blocks[i].imgs && el.blocks[i].imgs.length){
                                        imgs= el.blocks[i].imgs
                                    }
                                }
                                if(img){el.img=img}
                                if(imgs){el.imgs=imgs}
                                if(desc){el.desc=desc}
                                if(descL && typeof descL=='object'){
                                    for(let k in descL){
                                        if(descL[k]){
                                            let s = descL[k].clearTag().substring(0,150)
                                            descL[k]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                        }
                                    }
                                    el.descL=descL;
                                }
                                if(video){el.video=video;}
                                if(stuffs){el.stuffs=stuffs.map(function (s) {
                                    return s;
                                })}
                                el.blocks=null;
                            }
                        })

                    }
                    cb(null,res)
                }catch(error){
                    cb(error)
                }

            })
    },
}
mongoose.model('Workplace', WorkplaceSchema);

