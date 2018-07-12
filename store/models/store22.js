'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
/**
 * User Schema
 */
var StoreSchema;
StoreSchema = new Schema({
    type: String, // только для одного магазина может быть тип main
    name: {type: String, default: '', trim: true},
    date:{type:Date,defaul:Date.now()},
    index:{type:Number,default:1},
    url: {type: String, index: true},
    domain: {type: String, index: true},
    subDomain: {type: String, index: true},
    template: {type: Schema.ObjectId, ref: 'Template'},
    owner: [String],
    //owner: {type: Schema.ObjectId, ref: ''},
    currencyArr: [String],
    currency:{},
    mainCurrency:String,
    displayCurrency:Boolean,
    feedbackEmail:String,
    seo:{title:String,description:String,keywords:String},
    seller:{type: Schema.ObjectId, ref: 'Seller'},
    unitOfMeasure:[],
    counters:[{name:String,code:String}], // счетсики google yandex
    pinterest:String,
    lookbook:Boolean,
    stuffGroups:{},
    notification:{},//уведомлентя order:true,subscribe:false и т.д.
    helper:{type:Boolean,default:true},
    slideMenu:String,
    slideMenuWidth:String,
    favicon:{type:String,default:"http://www.stackoverflow.com/favicon.ico"},
    logo:String,
    background:String,
    newTag:String, // tillerTag for new link in main page
    saleTag:String, // tillerTag for sale link in main page
    sn:{
        fb:{is:Boolean,link:String},
        vk:{is:Boolean,link:String},
        tw:{is:Boolean,link:String},
        gl:{is:Boolean,link:String},
        pin:{is:Boolean,link:String}
    },
    footer:{text:String},
    headDesc:String,
    headDesc1:String,
    headDesc2:String
});

/*StoreSchema.virtual('link').get(function () {
    var p =
    return this.name.first + ' ' + this.name.last;
});*/
StoreSchema.statics = {
    load: function (id, cb) {

        this.findById(id)
            .populate('seller')
            .populate('template')
            .exec(function(err,doc){
                if (!err && doc){
                    doc=doc.toObject();
                    if (!doc.seller){
                        doc.seller={};
                    }
                }
                cb(err,doc)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if (criteria){
            if (criteria['$and']){
               if (criteria['$and']['store']){
                   delete criteria['$and']['store']
               }
            }else{
                if (criteria['store']){
                    delete criteria['store']
                }
            }
        }
        this.find(criteria)
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    postUpdate11 :function(store){
       // console.log('postUpdate store - ',store.seller)
        var Seller = mongoose.model('Seller');

        Seller.findOne({_id: store.seller},function(err,doc){
            if (doc){
                doc.store=store._id;
                doc.main=true;
                doc.save();
            }
        })
        /*User.findOne({_id: store.owner[0]},function(err,doc){
            if (doc){
                if(!doc.store){
                    doc.store=[];
                }
                doc.store.push(store._id);
                doc.save();
            }
        })*/

        /*Seller.update({_id: store.seller},{$set:{store:store._id,main:true}},function(

        ){})*/
    },
    preUpdate :function(req,cb){
        var body=req.body;
        //console.log(req.body)
        if(!body._id){
            if (!body.owner && body.user && body.user._id){
                body.owner=[body.user._id];
            }

        }
        //console.log(1)
        var Seller = mongoose.model('Seller');
        if (body.seller && body.seller._id){
            var seller = new Seller(body.seller);
            var upsertData = seller.toObject();
            delete upsertData._id;
            //console.log('upsertData seller-',upsertData);
            Seller.update({_id: seller.id}, upsertData, {upsert: true},function(err,res){
                //console.log(err,res)
            });
            body.seller=body.seller._id;
        } else{
            //console.log(2)
            //создание продавца.
            body.seller={}
            if(body.user && body.user._id){
                body.seller.user=body.user._id;
                body.seller.name=body.user.name;
            }

            var seller = new Seller(body.seller)
            body.seller=seller._id;
            //console.log('new store seller id -',seller);
            //console.log(3)
            seller.save();
        }
        if(!body['currencyArr']){
            body['currencyArr']=['UAH'];
            body={'UAH':[1,'UAH','грн.']};
            body='UAH';
        }


        var self=this;
        cb();

    }
}

mongoose.model('Store', StoreSchema);



var SellerSchema;
SellerSchema = new Schema({
    store: {type: Schema.ObjectId, ref: 'Store'},
    user: String,
    admins:[String],
    name: {type: String, default: '', trim: true},
    url: {type: String, index: true},
    salemail:String,
    mailgun:{user:String,pass:String,api_key:String,domain:String},
    opt:{sum:Number,quantity:Number},
    main:Boolean,
    payInfo:String,
    retail:{type:Number,default:0},
    sale:{type:Number,default:0},
    cascade:[],
    orderBlocks:{
        pay:{visible:{type:Boolean,default:true},ordinal:{type:Number,default:1}},
        rulePay:{visible:{type:Boolean,default:true},ordinal:{type:Number,default:1}},
        ship:{visible:{type:Boolean,default:true},ordinal:{type:Number,default:1}}
    }

});


SellerSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        var body=req.body;
        // проверяем название
        if(body.user && body.user._id){
            body.user = body.user._id
        }
        if(body.admins && body.admins.length){
            body.admins.forEach(function(admin,i){
                if (admin._id){
                    body.admins[i]=admin._id;
                }
            })
        }
        var self=this;
        cb()

    }
}

mongoose.model('Seller', SellerSchema);



var TemplateSchema = new Schema({
    name: {type : String, default : '', trim : true},
    index:Number,
    //store: {type: Schema.ObjectId, ref: 'Store'},
    url:{type : String,index:true},
    folder:String, // folder in Public were are jade,views and css files
    headerBlock:{type: Number,default:0},
    footerBlock:{type: Number,default:0},
    main:[

    ],
    homePage:{
        slider:{is:Boolean,index:Number,templ:Number},
        video:{is:Boolean,index:Number,templ:Number},
        banner:{is:Boolean,index:Number,templ:Number},
        mission:{is:Boolean,index:Number,templ:Number},
        text:{is:Boolean,index:Number,templ:Number},
        campaign:{is:Boolean,qty:Number,index:Number,templ:Number},
        filterTags:{is:Boolean,qty:Number,index:Number,templ:Number},
        brandTags:{is:Boolean,qty:Number,index:Number,templ:Number},
        brands:{is:Boolean,qty:Number,index:Number,templ:Number},
        categories:{is:Boolean,qty:Number,index:Number,templ:Number},
        stuffs:{is:Boolean,qty:Number,index:Number,templ:Number},
        news:{is:Boolean,qty:Number,index:Number,templ:Number},
    },
    stuffsList:[],//??????
    stuffs:{type: Number,default:0},
    stuff:{type: Number,default:0},
    statTempl:{type:Number,default:0},// number of template for stat pages
    newsTempl:{type:Number,default:0},
    newsList:{type:Number,default:0},
    cartTempl:{type:Number,default:0},
    footer:Boolean,// text in footer - contacts
    margin:Boolean,// margin for ui-view div
});
TemplateSchema.add({main:{type:Array,default:[
    {name:'slider',is:true,index:1,templ:0},
    {name:'video',is:true,index:1,templ:0},
    {name:'banner',is:true,index:1,templ:0},
    {name:'mission',is:true,index:1,templ:0},
    {name:'text',is:true,index:1,templ:0},
    {name:'campaign',is:true,index:1,templ:0},
    {name:'filterTags',is:true,index:1,templ:0},
    {name:'brandTags',is:true,index:1,templ:0},
    {name:'brands',is:true,index:1,templ:0},
    {name:'categories',is:true,index:1,templ:0},
    {name:'stuffs',is:true,index:1,templ:0},
    {name:'news',is:true,index:1,templ:0},
]}})
TemplateSchema.add({stuffsList:{type:Array,default:[
    {name:'filters',is:true,index:1,templ:0},
    {name:'categories',is:true,index:1,templ:0},
    {name:'call',is:true,index:1,templ:0},
    {name:'subscriptions',is:true,index:1,templ:0},
    {name:'list',is:true,index:1,templ:0},
]}})
TemplateSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if (criteria){
            if (criteria['$and']){
                if (criteria['$and']['store']){
                    delete criteria['$and']['store']
                }
            }else{
                if (criteria['store']){
                    delete criteria['store']
                }
            }
        }
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        var body=req.body;
        // проверяем название
        cb()

    }
}

mongoose.model('Template', TemplateSchema);

//exports.TemplateSchema;




