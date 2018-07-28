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

var AdditionalSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    nameL: {},
    url:{type :String,index:true},
    date: { type: Date, default: Date.now },// поступил
    actived:{type:Boolean,default:true},
    blocks:[blockSchema],
    index: Number,

    img:String,
    video:String,
    imgs:[],
    desc:String,
    descL : {},
    translated:{},// булевые значения для языков. закончен перевод данного объекта на язык или нет

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});


AdditionalSchema.virtual('img_tr').get(function() {
    if(!this)return
    let item = this;
    return img_transform(this)
});

AdditionalSchema.methods.setDataForList=function () {
    img_transform(this)
}
function img_transform(item){
    let o ={
        img:null,
        desc:null,
        descL:null,
        imgs:null,
        video:null
    }
    if(item && item.blocks && item.blocks.length){
        try{
            //console.log('item._id ',item._id)
            item.blocks.sort(function (a,b) {
                return a.index-b.index
            })
            for(let i=0;i<item.blocks.length;i++){
                //console.log(item.blocks[i])
                let s;

                if(item.blocks[i].useImg){
                    o.img=item.blocks[i].img;
                    o.imgs=null;
                    o.video=null;
                }
                if(item.blocks[i].useDesc){
                    let s = item.blocks[i].desc.myTrim().clearTag().substring(0,150);
                    //console.log(s)
                    if(s){
                        o.desc=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                        o.descL=item.blocks[i].descL;
                    }
                }


                if(!o.desc && item.blocks[i].desc){
                    s = item.blocks[i].desc.myTrim().clearTag().substring(0,150);
                    //console.log(s)
                    if(s){
                        o.desc=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                        o.descL=item.blocks[i].descL;
                    }
                }
                if(!o.img && (item.blocks[i].type=='banner'||item.blocks[i].type=='banner1') && item.blocks[i].img){
                    o.img = item.blocks[i].img
                }
                if(!o.video && item.blocks[i].type=='videoLink' && item.blocks[i].videoLink){
                    o.video = item.blocks[i].videoLink
                }
                if(!o.imgs && item.blocks[i].type=='slider' &&item.blocks[i].imgs && item.blocks[i].imgs.length){
                    o.imgs= item.blocks[i].imgs
                }
            }

        }catch(error){
            console.log(error)
        }
        try{
            if(o.descL){
                for(let k in o.descL){
                    if(o.descL[k]){
                        //console.log(o.descL[k])
                        let s = o.descL[k].clearTag().substring(0,150)
                        //console.log('s ',s)
                        o.descL[k]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                    }
                }
            }
        }catch(error){
            console.log(error)
        }
        return o;
    }
}






AdditionalSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(cb)
    },
    searchList: function (options, cb) {
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
        this.find(criteria)
            .select('name date url index actived blocks img imgs video name nameL desc descL img_tr translated')
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            //.lean()
            .exec(function (err,res) {
                if(err){return cb(err)}
                //console.log(res)
                if(res && res.length){
                    res.forEach(function(el,iii){
                        //res[iii]=el.toObject()
                        console.log(res[iii]['img_tr'])
                        for(let k in res[iii].img_tr){
                            res[iii][k]=res[iii].img_tr[k]
                        }
                        return;
                    })

                }
                return cb(null,res)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .select('name date gallery url index actived  blocks img imgs video name nameL img_tr desc descL translated')
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            //.lean()
            .exec(function (err,res) {
                if(err){return cb(err)}
                //return cb(null,res)
                if(res && res.length){
                    res.forEach(function(el,iii){
                        //res[iii]=el.toObject()
                        console.log(res[iii]['img_tr'])
                        for(let k in res[iii].img_tr){
                            res[iii][k]=res[iii].img_tr[k]
                        }
                    })
                }
                return cb(null,res)
            })
    },


}

mongoose.model('Additional', AdditionalSchema);

