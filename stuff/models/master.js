'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
    var cToL= require('../controllers/c-l');



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

var MasterSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    nameL: {},
    position:String,// должность
    positionL:{},// должность
    url:{type :String,index:true},
    img:String,
    link:String,// for social page
    imgs:[{}],
    desc : {type : String, default : ''},
    descL : {},
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    reviews:[],// отзывы
    index: Number,
    actived:{type:Boolean,default:true},
    blocks:[blockSchema],
    imgs:[],
    timeTable:[],  // таблица расписания работы мастера по дняи на год 366 записей
    workplace:Boolean, // рабочее место или человек
    workplaces:[{type : Schema.ObjectId, ref : 'Workplace'}], // ссылки на рабочие места
    phone:String,
    notification:{type:Number,default:0},
    user:String,// ref to user id who is binding as master for masteronline
    translated:{},// булевые значения для языков. закончен перевод данного объекта на язык или нет
});
/*reviews:[{
    name:
    date:
    desc
}]*/
MasterSchema.add({positionL:{}})

MasterSchema.statics = {
    load: function (query, cb) {
        function fn(el){
            //console.log(el)
            if (el && el.gallery && el.gallery.length && el.gallery.length>1){
                el.gallery.sort(function(a,b){return a.index- b.index});
                el.gallery.splice(1,el.gallery.length-1)
                delete el.gallery[0].img;
                delete el.gallery[0].thumbSmall;
            }
            return el;
        }
        var self=this;
        //var query=(typeof id=='object')?{_id:id}:{url:id};
       // console.log(query)
        this.findOne(query)
            .populate('blocks.stuffs','name artikul nameL artikulL link gallery actived')
            .populate('blocks.categories','name nameL url link img actived')
            .populate('workplaces','name nameL actived url')
            .exec(function(err,res){
                if (err) return cb(err);
                if(res.blocks && res.blocks.length){
                    res.blocks.forEach(function (el) {
                        if(el && el.type=='stuffs'){
                            el.stuffs.forEach(function (s,i) {
                                if(s && s.gallery && s.gallery.length)  {
                                    s.img=s.gallery[0].img
                                }
                                //console.log(s.name,s.nameL)
                            })
                        }
                    })
                }

                /*if (res && res.stuffs && res.stuffs.length){
                    res.stuffs=res.stuffs.map(fn)
                }*/
                cb(null,res)
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
        var criteria = options.criteria || {}
        if(criteria && criteria['$and']){
            if (criteria['$and'][0]['name']){
                criteria['$and'][0]['name']=new RegExp(criteria['$and'][0]['name'],'i');
            }
            if (criteria['$and'][1]['name']){
                criteria['$and'][1]['name']=new RegExp(criteria['$and'][1]['name'],'i');
            }

        }
        //criteria={$and:[{actived:true}]}
        //console.log(criteria)

        this.find(criteria)
            //.populate('stuffs', 'name timePart')
            .select('name url index position reviews actived blocks nameL positionL timeTable workplace link phone notification workplaces translated')
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function (err,res) {
                //console.log('error from masters',err,res)

                if(err){return cb(err)}
                try{
                    if(res && res.length){
                        res.forEach(function(el,ii){
                            if(el.timeTable && el.timeTable.length){
                                el.timeTable.forEach(function (p) {
                                    if(p.is){
                                        if(p.is=='false'){p.is=false}else if(p.is=='true'){p.is=true}
                                    }
                                })
                            }
                            //console.log(el.name,el.position)
                            let img,imgs,desc,position,stuffs,video,positionL,descL;
                            if(el.blocks && el.blocks.length){
                                el.blocks.sort(function (a,b) {
                                    return a.index-b.index
                                })
                                /*console.log(el.blocks.map(function (el) {
                                    return el.index
                                }))*/

                                for(let i=0;i<el.blocks.length;i++){


                                    if(el.blocks[i].type=='stuffs' && !stuffs && el.blocks[i].stuffs.length){
                                        stuffs=el.blocks[i].stuffs.map(function(m){
                                            //console.log(typeof m,m.toString&&true)
                                            if(m.toString){return m.toString()}else{
                                                return m
                                            }

                                        });

                                    }

                                    if(!el.blocks[i] || !el.blocks[i].is){continue}
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


                                    /*if(el.blocks[i].type=='position' && !position){
                                        position=el.blocks[i].position;
                                        positionL=el.blocks[i].positionL;
                                    }*/


                                    if(!desc && el.blocks[i].desc){
                                        let s = el.blocks[i].desc.myTrim().clearTag().substring(0,150);
                                        //console.log(s)
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
                                if(img){el.img=img}else{el.img=null}
                                if(imgs){el.imgs=imgs}else{el.imgs=null}
                                if(desc){el.desc=desc}else{el.desc=null}
                                if(descL && typeof descL=='object'){
                                    for(let k in descL){
                                        if(descL[k] && descL[k].clearTag){
                                            let s = descL[k].clearTag().substring(0,150)
                                            descL[k]=s.substr(0, Math.min(s.length, s.lastIndexOf(" ")))+' ...'
                                        }
                                    }
                                    el.descL=descL;
                                }else{
                                    el.descL={}
                                }
                                if(video){el.video=video;}else{el.video=null;}
                                /*if(position){
                                    res[ii].position=position;
                                    res[ii].positionL=positionL
                                }else{
                                    res[ii].position=null;
                                    res[ii].positionL={}
                                }*/
                                //console.log('stuffs',stuffs)
                                if(stuffs){el.stuffs=stuffs.map(function (s) {
                                    //console.log(typeof s)
                                    return s;
                                })}
                                //console.log('el.stuff',el.stuffs)
                                el.blocks=null;
                            }
                        })

                    }
                    //console.log(res)
                    //console.log('return from master')
                   /* res.forEach(function (m) {
                        console.log(m.position)
                    })*/
                    cb(null,res)
                }catch(error){
                    cb(error)
                }

            })
    },
    /*preUpdate :function(req,cb){
        if(cb && typeof cb=="function"){
            return cb()
        }
        return new Promise(function(resolve,reject){
            resolve()
        })
    },
    postUpdate:function(req,cb){
        if(cb && typeof cb=="function"){
            return cb()
        }
        return new Promise(function(resolve,reject){
            resolve()
        })
    },*/

}
mongoose.model('Master', MasterSchema);

