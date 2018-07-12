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
var NewsSchema = new Schema({
    store:String,//[{type : Schema.ObjectId, ref : 'Store'}],
    type:Number,
    name: {type : String, default : '', trim : true},
    nameL: {},
    url:{type :String,index:true},
    date: { type: Date, default: Date.now },// поступил
    actived:{type:Boolean,default:true},
    send:{date:Date,quantity:Number},
    blocks:[blockSchema],
    index: Number,
//link:String,// for img

    img:String,
    video:String,
    imgs:[],
    desc:String,
    descL : {},
    translated:{},// булевые значения для языков. закончен перевод данного объекта на язык или нет

    /*desc1:String,
    desc2:String,
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],*/

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});

//NewsSchema.add({descL:{type:{}}})

/*
NewsSchema.add({blocks:{type:[]}})
NewsSchema.virtual('img').get(function() {
    let el = this;

    if(el.blocks && el.blocks.length){
        for(let i=0;i<el.blocks.length;i++){
            if(el.blocks[i].type=='banner' && el.blocks[i].img){
                //console.log('img -',el.name,el.blocks[i].img)
                return el.blocks[i].img
            }
        }
        return ''
    } else{
        return ''
    }
});
NewsSchema.virtual('desc').get(function() {
    let el = this;
    //console.log('desc - ',this.blocks)
    if(el.blocks && el.blocks.length){
        for(let i=0;i<el.blocks.length;i++){
            if(el.blocks[i].type=='banner' && el.blocks[i].desc){
                return el.blocks[i].desc
            }
            if(el.blocks[i].type=='text'){
                return el.blocks[i].desc
            }
        }
        return ''
    } else{
        return ''
    }
});

NewsSchema.virtual('imgs').get(function() {
    let el = this;
    //console.log('imgs - ',this.blocks)
    if(el.blocks && el.blocks.length){
        for(let i=0;i<el.blocks.length;i++){
            if(el.blocks[i].type=='slider' && el.blocks[i].imgs && el.blocks[i].imgs.length){
                return el.blocks[i].imgs
            }
        }
        return ''
    } else{
        return ''
    }
});
NewsSchema.virtual('video').get(function() {
    let el = this;
    //console.log('video - ',this.blocks)
    if(el.blocks && el.blocks.length){
        for(let i=0;i<el.blocks.length;i++){
            if(el.blocks[i].type=='videoLink' && el.blocks[i].videoLink){
                return el.blocks[i].videoLink
            }
        }
        return ''
    } else{
        return ''
    }
});
*/
var iii=0;
NewsSchema.virtual('img_tr').get(function() {
    //console.log(this)
    /*let item = this;
    console.log(item)*/
    if(!this)return
    let item = this;
    //console.log(iii++)
    //console.log(this)
    return img_transform(this)
});
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
NewsSchema.plugin(mongooseLeanVirtuals);

NewsSchema.methods.setDataForList=function () {
    img_transform(this)
}
function img_transform(item){
    /*console.log("*********************************************************************************")
    console.log(item.url)*/
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
                if(!item.blocks[i].is){continue}
                if(item.blocks[i].useImg){
                    if(item.blocks[i].img){
                        o.img=item.blocks[i].img;
                        o.imgs=null;
                        o.video=null;
                    }else if(item.blocks[i].imgs && item.blocks[i].imgs.length){
                        o.imgs=item.blocks[i].imgs;
                        o.img=null;
                        o.video=null;
                    }else if(item.blocks[i].videoLink){
                        o.imgs=null;
                        o.img=null;
                        o.video=item.blocks[i].videoLink;
                    }
                }
                /*if(item.blocks[i].useDesc){
                    console.log(i,'item.blocks[i].desc',item.blocks[i].desc)
                    console.log(item.blocks[i].descL)
                }*/

                if(item.blocks[i].useDesc && ((item.blocks[i].desc && typeof item.blocks[i].desc=='string') || (item.blocks[i].descL && typeof item.blocks[i].descL=='object'))){
                    o.desc=null;
                    o.descL=null;
                    if(item.blocks[i].descL){
                        for(let key in item.blocks[i].descL){

                            if(item.blocks[i].descL[key]){
                                let s  = item.blocks[i].descL[key].clearTag().myTrim().substring(0,150);
                                //console.log('key',key)
                                if(s){
                                    if(!o.descL){o.descL={}}
                                    o.descL[key]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                }

                            }
                        }
                    }else if(item.blocks[i].desc){
                        let  s = item.blocks[i].desc.clearTag().myTrim().substring(0,150);
                        if(s){
                            o.desc=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                        }

                    }
                }
                if((!o.desc && !o.descL) && ((item.blocks[i].desc && typeof item.blocks[i].desc=='string') || (item.blocks[i].descL && typeof item.blocks[i].descL=='object'))){
                    if(item.blocks[i].descL){
                        for(let key in item.blocks[i].descL){
                            if(item.blocks[i].descL[key]){
                                let s  = item.blocks[i].descL[key].myTrim().clearTag().substring(0,150);
                                if(s){
                                    if(!o.descL){o.descL={}}
                                    o.descL[key]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                }

                            }
                        }
                    }else if(item.blocks[i].desc){
                        let  s = item.blocks[i].desc.myTrim().clearTag().substring(0,150);
                        if(s){
                            o.desc=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                        }
                        //o.descL=item.blocks[i].descL;
                    }
                }

                if(o.img || o.video || o.imgs){continue}
                if((item.blocks[i].type=='banner'||item.blocks[i].type=='banner1') && item.blocks[i].img){
                    o.img = item.blocks[i].img
                }
                if(o.img || o.video || o.imgs){continue}
                if(item.blocks[i].type=='videoLink' && item.blocks[i].videoLink){
                    o.video = item.blocks[i].videoLink
                }
                if(o.img || o.video || o.imgs){continue}
                if(item.blocks[i].type=='slider' &&item.blocks[i].imgs && item.blocks[i].imgs.length){
                    o.imgs= item.blocks[i].imgs
                }
                /*if(o.desc && (o.img || o.video || o.imgs)){
                    break
                }*/
            }
            //console.log(o)

        }catch(error){
            console.log(error)
        }
        try{
            if(o.descL){
                item.descL=o.descL;
                for(let k in o.descL){
                    if(o.descL && o.descL[k] && o.descL[k].clearTag){
                        //console.log(o.descL[k])
                        let s = o.descL[k].clearTag().substring(0,150)
                        //console.log('s ',s)
                        o.descL[k]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                    }
                }
            }
            if(o.img){item.img=o.img}
            if(o.desc){item.desc=o.desc}
            if(o.video){item.video=o.video}
            //console.log(item.img)
        }catch(error){
            console.log(error)
        }
        //console.log('o -',o)
        /*if(!o.img && o.imgs && o.imgs.length){
            o.img=o.imgs[0].img;
        }*/
        return o;
        //console.log(item.descL)
    }
}



//NewsSchema.add({type:Number});


NewsSchema.statics = {
    load: function (query, cb) {
        var self=this;
        this.findOne(query)
            .populate('blocks.stuffs','name artikul url gallery orderType nameL category artikulL orderType price stock sale timePart currency driveSalePrice desc descL link')
            .lean({ virtuals: true })
            .exec(function (err,news) {
                if(err){return cb(err)}
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
                /*if(news.img_tr){
                    for(let k in news.img_tr){
                        if(news.img_tr[k]){
                            news[k]=news.img_tr[k]
                        }
                    }

                }*/
                cb(null,news)
            })
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

        /*var criteria = options.criteria || {}
        if (options.criteria['$and']){
            for (var i= 0,l=options.criteria['$and'].length;i<l;i++){
                for (var key in options.criteria['$and'][i]){
                    if(key=='$or') {
                        if (options.criteria['$and'][i][key][0]['name']) {
                            let reg=RegExp( options.criteria['$and'][i][key][0]['name'], "i" )
                            options.criteria['$and'][i][key][0]={}
                            options.criteria['$and'][i][key][0]['nameL.'+options.lang] =reg;


                        }
                        if (options.criteria['$and'][i][key][2]['desc']) {
                            let reg=RegExp( options.criteria['$and'][i][key][2]['desc'], "i" )
                            options.criteria['$and'][i][key][2]={}
                            options.criteria['$and'][i][key][2]['blocks.descL.'+options.lang] =reg;
                        }
                    }
                }
            }
        }*/
        //console.log('news options ',criteria)
        this.find(criteria)
            .select('name date gallery url index actived send  blocks img imgs descShort video nameL img_tr translated')
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            //.lean()
            .exec(function (err,res) {
                if(err){return cb(err)}
                //console.log(res)
                if(res && res.length){
                    res.forEach(function(el,iii){
                        //res[iii]=el.toObject()
                        /*console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        console.log(res[iii]['img_tr'])*/
                        for(let k in res[iii].img_tr){
                            res[iii][k]=res[iii].img_tr[k]
                        }
                        //console.log(res[iii].descL)
                        return;
                    })

                }
                return cb(null,res)
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
        //console.log(criteria)
        this.find(criteria)
            .select('name date gallery url index actived send blocks img imgs descShort video nameL img_tr translated')
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .lean({ virtuals: true })
            .exec(function (err,res) {
                if(err){return cb(err)}
                //return cb(null,res)
                if(res && res.length){
                    res.forEach(function(el,iii){
                        //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        //res[iii]=el.toObject()
                        //console.log(res[iii]['img_tr'])
                        for(let k in res[iii].img_tr){
                            //console.log(k)
                            res[iii][k]=res[iii].img_tr[k]
                        }
                        return;
                    })

                }
                return cb(null,res)
            })
    },


}

mongoose.model('News', NewsSchema);

