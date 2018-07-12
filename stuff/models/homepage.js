'use strict';
var mongoose = require('mongoose');
//const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
/**
 *  Schema
 */
var blockSchema = new Schema({
    type:String, // text,missia,info,news,campaign,map,banner,slider,video,categories,brandTags,brands,filterTags,stuffs
    index:{type:Number,default:0},
    is:Boolean,
    name:String,
    name1:String,
    nameAnimate:String,
    name1Animate:String,
    animateSlider:String,
    animateDelay:Number,
    nameAnimateDelay:Number,
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
    qwslide:Number,// количество слайдов для оwl slider
    autoPlaySlider:Boolean,
    link:String,
    link1:String,
    position:String,// left,right,top
    useImg:Boolean,
    useDesc:Boolean,
    videoControl:Boolean,
})


var HomePageSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    url:{type:String,index:true},
    blocks:[blockSchema],
    header:[blockSchema],
    left:[blockSchema],
    right:[blockSchema],

    //mission
    name: {type : String, default : '', trim : true},
    desc : {type : String, default : ''},
    descButton:{link:String,text:String,button:Boolean},
    //text block
    textName: {type : String, default : '', trim : true},
    textDesc : {type : String, default : ''},
    textButton:{link:String,text:String,button:Boolean},
    logo:String,
    smalllogo:String,
    backgroundImg:String,
    bannerSrc:String, //banner
    videoSrc:String,
    infoImg:String,
    video:{link:String,text:String,button:Boolean,desc:String,audio:Boolean},
    videoCover:String,
    banner:{link:String,text:String,button:Boolean,desc:String},
    imgs:[{}], // slides
    info:{link:String,name:String},
    filterTags:[{type : Schema.ObjectId, ref : 'FilterTags'}],
    brandTags:[{type : Schema.ObjectId, ref : 'BrandTags'}],
    categories:[{type : Schema.ObjectId, ref : 'Category'}],
    brands:[{type : Schema.ObjectId, ref : 'Brand'}],
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});


//HomePageSchema.plugin(mongooseLeanVirtuals);

HomePageSchema.statics = {
   load: function (query, cb) {
        this.findOne(query)
            .populate('blocks.stuffs','name artikul url gallery orderType nameL category artikulL orderType price stock sale timePart currency driveSalePrice desc descL link')
            .populate('blocks.filterTags','name img url nameL')
            .populate('blocks.brandTags','name img url brand nameL')
            .populate('blocks.categories','name img url nameL link')
            .populate('blocks.brands','name img url nameL')
            .populate('blocks.news','name img url videoLink video desc descL date blocks nameL img_tr')
            .populate('blocks.campaign','name img url dateEnd nameL')
            .populate('blocks.info','name nameL')
            .lean({ virtuals: true })

            /*.populate('right.stuffs','name artikul url gallery orderType nameL category artikulL orderType price stock sale timePart currency driveSalePrice desc descL')
            .populate('right.filterTags','name img url nameL')
            .populate('right.brandTags','name img url brand nameL')
            .populate('right.categories','name img url nameL')
            .populate('right.brands','name img url nameL')
            .populate('right.news','name img url videoLink video desc date blocks nameL img_tr')
            .populate('right.campaign','name img url dateEnd nameL')
            .populate('right.info','name nameL')*/
            .exec(function (err,hp) {
                /*if(hp.toObject){
                    hp=hp.toObject()
                }*/

                /*console.log('hp',hp)
                console.log(err)*/
                hp.top=[];hp.left=[];hp.right=[];

                if(hp){
                    if(hp.blocks && hp.blocks.length){
                        hp.blocks.forEach(function (el) {
                            if(el.position){
                                if(el.position=='top'){
                                    hp.top.push(el)
                                }else if(el.position=='left'){
                                    hp.left.push(el)
                                } else if(el.position=='right'){
                                    hp.right.push(el)
                                }
                            }

                            if(el && el.type=='news' && el[el.type] && el[el.type].length){

                                el[el.type].forEach(function (e,i) {
                                    //console.log(e.name,e.img_tr)
                                    for(let k in e.img_tr){
                                        el[el.type][i][k]=e.img_tr[k];
                                    }
                                    el[el.type][i].blocks=null;
                                    el[el.type][i].img_tr=null;
                                })

                            }
                            if(el && el.type=='stuffs' && el.stuffs && el.stuffs.length){
                                el.stuffs.forEach(function (s,i) {
                                    //console.log(s)
                                    if(s && s.blocks && s.blocks.length){
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
                }
                //console.log('hp',hp)
                cb(err,hp)
            })
   },
   list: function (options, cb) {
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
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            /*.populate('stuffs','name artikul url gallery')
            .populate('filterTags','name img url')
            .populate('brandTags','name img url brand')
            .populate('categories','name img url')
            .populate('brands','name img url')*/
            .exec(function(err,res){
                if (err) return cb(err);
                if (res && res[0] && res[0].stuffs && res[0].stuffs.length){
                    res[0].stuffs=res[0].stuffs.map(fn)
                }
                cb(null,res)
            })
   }
}

/*blockSchema.statics = {
    list: function (options, cb) {
        var criteria = options.criteria || {}
        console.log(criteria)
        this.find()
            .exec(function(err,res){
                cb(err,res)
            })
    }
}*/

mongoose.model('HomePage', HomePageSchema);
/*mongoose.model('HomePageBlock', blockSchema);*/





