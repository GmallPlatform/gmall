'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
/**
 * User Schema
 */
var StoreSchema;
StoreSchema = new Schema({
    type: String, // только для одного магазина может быть тип main
    storeType:String,
    desc:String,// служебное описание магазина
    descL:{},// служебное описание магазина
    name: {type: String, default: '', trim: true},
    nameL:{},
    date:{type:Date,defaul:Date.now()},
    index:{type:Number,default:1},
    url: {type: String, index: true},
    domain: {type: String, index: true},
    subDomain: {type: String, index: true},
    //template: {type: Schema.ObjectId, ref: 'Template'},
    //template: {type:{},default:null},
    template: Schema.Types.Mixed,
    owner: [String],
    translaters: [String],
    //owner: {type: Schema.ObjectId, ref: ''},
    currencyArr: [String],
    currency:{}, // [5 -formatAverage]округление цены 0 не округлять 1 до десяток копеек 2 до целых чисел 3 до десятков 4 до сотен, [4 - formatPrice]
    langArr: [String],
    lang:String,
    displayLang:Boolean,
    phoneCodes:[],
    phoneCode:{},
    mainCurrency:String,
    displayCurrency:Boolean,
    feedbackEmail:String,
    seo:{title:String,description:String,keywords:String},
    seoL:{},
    seller:{type: Schema.ObjectId, ref: 'Seller'},

    mailData:{},

    unitOfMeasure:[],
    unitOfMeasureL:{},
    counters:[{name:String,code:String}], // счетсики google yandex
    pinterest:String,
    googleAnalytics:String,
    lookbook:Boolean,
    stuffGroups:{},
    notification:{},//уведомлентя order:true,subscribe:false и т.д.
    helper:{type:Boolean,default:true},
    slideMenu:String,
    slideMenuWidth:String,
    //images
    favicon:String,
    logo:String,
    fbPhoto:String,
    logoInverse:String,
    backgroundImg:String,
    backgroundImgUse:Boolean,
    backgroundImgUseHome:Boolean,

    allCategories:String,
    emptyList:String,
    nophoto:String,
    copyrightImg:String,
    dateTimeImg:String,


    yandex:String, // для верификацмм

    newTag:String, // tillerTag for new link in main page
    saleTag:String, // tillerTag for sale link in main page
    sn:{
        fb:{is:Boolean,link:String},
        vk:{is:Boolean,link:String},
        tw:{is:Boolean,link:String},
        gl:{is:Boolean,link:String},
        pin:{is:Boolean,link:String},
        inst:{is:Boolean,link:String},
        ok:{is:Boolean,link:String},
        yt:{is:Boolean,link:String},
    },
    sh:{},
        /*fb:{is:Boolean,type:Number},
        vk:{is:Boolean,type:Number},
        tw:{is:Boolean,type:Number},
        gl:{is:Boolean,type:Number},
        pin:{is:Boolean,type:Number},
        inst:{is:Boolean,type:Number},
        ok:{is:Boolean,type:Number},*/

    fb:{},
    gl:{},
    vk:{},
    fbId:String,//ID ПРИЛОЖЕНИЯ
    glId:String,
    glMap:String, // id для гугл мэп
    glPlaceId:String, // id для места из гугл мэп для получения review
    location:String,
    locationL:{},
    footer:{text:String,textL:{},text1:String,text1L:{}},
    callText:String,
    subscriptionText:String,
    mailText:String,
    bonusButtonText:String,
    bonusButtonTextL:{},
    bonusForm:{},
    headDesc:String,
    headDesc1:String,
    headDesc2:String,

    confirmEmail:Boolean,
    cabinetNot:Boolean,
    cabinetFull:Boolean,
    // наличие блоков в каюине
    onlineis:Boolean,
    orderis:Boolean,
    datais:Boolean,
    fileis:Boolean,
    subis:Boolean,



    hpWithList:Boolean,
    chat:Boolean,
    texts:{
        /*subscriptionName:{'ru':'подписка'},// заголовок в модальном окне подписки
        subscriptionText:{'ru':'введите адрес своей электронной почты и получайте все новости и актуальные акционные предложения'},// текст в модальном окне подписки
        callName:{'ru':'заказ обратного звонка'},// заголовок для модального окна заказа обратного звонка
        callText:{'ru':'введите свой телефон и администратор перезвонит Вам'},// текст для модального окна заказа обратного звонка
        feedbackName:{'ru':'Сообщение на email'},// заголовок для модального окна обратной связи
        feedbackText:{'ru':'введите свое сообщение'},// текст для модального окна обратной связи
        mailName:{'ru':'уважаемый '},// обращение в письме о подписке
        mailText:{'ru':'Вы успешно подписались на нашу новостную рассылку.'},// текст в письме о подписке
        confirmemail:{'ru':'Для подтвержедния адреса електронной почты перейдите по ссылке или вставьте ее в адесную строку браузера'},
        mailTextRepeat:{'ru':'Вы уже подписаны на нашу новостную рассылку.'},
        buttonAuth:{'ru':'кнопка для авторизации на сайте'},
        auth:{'ru':'войти'},
        pswd:{'ru':'Ваш пароль для авторизации на сайте'},
        unsubscribeName:{'ru':'здесь'},// заголовок в модальном окне подписки
        unsubscribeText:{'ru':'отписаться от рассылки можно'},// текст в модальном окне подписки*/
    },
    textsL:{},
    nameListsL:{},// наименование списков новости галлереф портфолио блог и так далее
    nameLists:{},
    humburger:String,
    humburgerL:{}, // текст на гамбургене - иконка свернутого второго меню
    textCondition:String,
    textConditionL:{},
    orderCondition:Boolean,
    redirect: {type: Schema.ObjectId, ref: 'Redirect'},
    cache:{}, // настройки для использования кеширования данных или нет
    cartSetting:{}, // настройки корзины
    addcomponents:{},// дополнительные компонетны шаблона их наличие ссылки и тексты
    timeTable:[],//таблица расписания работы магазина для записи на время
    turbosms:{},// данные для доступа к шлюзу отправки смс
    alphasms:{},// данные для доступа к шлюзу отправки смс
    submitDateTime:Boolean,// если true то sms о записи отправлияется только при подтверждении записи в админке
    dateTimeWithWorkplace:Boolean,// запись на время в привязке к рабочему месту
    mp:{},// данные о маркетплейсах
    onlinePay:Boolean,
    onlinePayEntry:Boolean,
    onlineReservation:Number,
    payData:{},// данные для платежных систем
    formatPrice:{type:Number,default:0},// формат отображения цены 0 - без цифр после целой части, 1 - с двумя цифрами после точки
    disqus:String,// Your website shortname https://disqus.com/,
    preload:{},// use - boolean,duration  number in sec
    googleSearchConsole: String,
    googleTranslateQty:Number,

    ipstack:String,//access_key https://ipstack.com
    settingContent:{admin:{},site:{}}
});
/*StoreSchema.add({sh:{
    fb:{is:Boolean,type:Number},
    vk:{is:Boolean,type:Number},
    tw:{is:Boolean,type:Number},
    gl:{is:Boolean,type:Number},
    pin:{is:Boolean,type:Number},
    inst:{is:Boolean,type:Number},
    ok:{is:Boolean,type:Number},
}})*/

/*StoreSchema.virtual('link').get(function () {
    var p =
    return this.name.first + ' ' + this.name.last;
});*/
StoreSchema.statics = {
    load: function (id, cb) {
        //console.log('doc.seller')
        this.findById(id)
            .populate('seller')
            //.populate('template')
            .exec(function(err,doc){
                //console.log('doc.seller',doc.seller)
                if (!err && doc){
                    doc=doc.toObject();
                    if(!doc.lang){doc.lang='ru'}
                    /*doc.handleLanguage(doc.lang)*/
                    if (!doc.seller){
                        doc.seller={};
                    }
                }
                cb(err,doc)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if(criteria.$or){
            criteria.$or.forEach(function (el) {
                for(let key in el){
                    if (key=='name' || key=='subDomain'){
                        el[key]=new RegExp(el[key],'i');
                    }
                }
            })
        }
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
        //console.log(options)
        this.find(criteria)
            //.sort({'date': -1})
            .populate('seller')
            .populate('redirect')
            //.select('name nameL subDomain domain owner desc descL storeType date')
            .skip(options.perPage * options.page)
            .lean()
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
    preUpdate : async function(req,cb){
        var body=req.body;
        if(!body.subDomain){return cb('there is not subDomain')}
        let existStore = await this.findOne({subDomain:body.subDomain}).exec()
        if(existStore){return cb('the subDomain is used')}

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
            if(body.feedbackEmail){
                body.seller.salemail=body.feedbackEmail;
            }
            if(body.name){
                body.seller.name=body.name;
            }
            if(body.user && body.user._id){
                body.seller.user=body.user._id;
                body.seller.name=body.user.name;
            }

            var seller = new Seller(body.seller)
            body.seller=seller._id;
            seller.save();
        }
        if(!body['currencyArr']){
            body['currencyArr']=['UAH'];
            body={'UAH':[1,'UAH','грн.']};
            body='UAH';
        }


        var self=this;
        cb();

    },
    //preUpdate :function(req,cb){}
}

const handleLanguageStore=require('../../modules/handleLanguageStore')
StoreSchema.methods.handleLanguage=function(lang){
    //console.log(store.lang)
    let store = this;
    handleLanguageStore(store,lang)
    return;
    if(!store.lang){
        store.lang='ru'
    }
    if(lang && store.langArr && store.langArr.length && store.langArr.indexOf(lang)>-1){
        store.lang=lang;
    }
    if(store.locationL && store.locationL[store.lang]){
        store.location=store.locationL[store.lang];
        store.locationL=null
    }
    //console.log(store.nameListsL[store.lang])
    if(store.nameListsL && store.nameListsL[store.lang]){
        store.nameLists=store.nameListsL[store.lang];
        store.nameListsL=null
    }
    if(store.template && store.template.menu1 && store.template.menu1.descL && store.template.menu1.descL[store.lang]){
        store.template.menu1.desc=store.template.menu1.descL[store.lang]
        store.template.menu1.descL=null
    }
    if(store.template && store.template.menu2 && store.template.menu2.descL && store.template.menu2.descL[store.lang]){
        store.template.menu2.desc=store.template.menu2.descL[store.lang]
        store.template.menu2.descL=null
    }
    if(store.template && store.template.menuTablet && store.template.menuTablet.menu1 && store.template.menuTablet.menu1.descL && store.template.menuTablet.menu1.descL[store.lang]){
        store.template.menuTablet.menu1.desc=store.template.menuTablet.menu1.descL[store.lang]
        store.template.menuTablet.menu1.descL=null
    }
    if(store.template && store.template.menuTablet && store.template.menuTablet.menu2 && store.template.menuTablet.menu2.descL && store.template.menuTablet.menu2.descL[store.lang]){
        store.template.menuTablet.menu2.desc=store.template.menuTablet.menu2.descL[store.lang]
        store.template.menuTablet.menu2.descL=null
    }
    if(store.template && store.template.menuMobile && store.template.menuMobile.menu1 && store.template.menuMobile.menu1.descL && store.template.menuMobile.menu1.descL[store.lang]){
        store.template.menuMobile.menu1.desc=store.template.menuMobile.menu1.descL[store.lang]
        store.template.menuMobile.menu1.descL=null
    }
    if(store.template && store.template.menuMobile && store.template.menuMobile.menu2 && store.template.menuMobile.menu2.descL && store.template.menuMobile.menu2.descL[store.lang]){
        store.template.menuMobile.menu2.desc=store.template.menuMobile.menu2.descL[store.lang]
        store.template.menuMobile.menu2.descL=null
    }

    if(store.nameL && store.nameL[store.lang]){
        store.name=store.nameL[store.lang];
        store.nameL=null
    }


    if(store.unitOfMeasureL && store.unitOfMeasureL[store.lang]){
        store.unitOfMeasure=store.unitOfMeasureL[store.lang];
        store.unitOfMeasureL=null
    }
    if(store.footer.textL && store.footer.textL[store.lang]){
        store.footer.text=store.footer.textL[store.lang];
        store.footer.textL=null
    }
    if(store.footer.text1L && store.footer.text1L[store.lang]){
        store.footer.text1=store.footer.text1L[store.lang];
        store.footer.text1L=null
    }
    if(store.humburgerL && store.humburgerL[store.lang]){
        store.humburger=store.humburgerL[store.lang];
        store.humburgerL=null
    }
    if(store.bonusButtonTextL && store.bonusButtonTextL[store.lang]){
        store.bonusButtonText=store.bonusButtonTextL[store.lang];
        store.bonusButtonTextL=null
    }
    if(store.seoL && store.seoL[store.lang]){
        store.seo=store.seoL[store.lang];
        store.seoL=null
    }
    if(store.textConditionL && store.textConditionL[store.lang]){
        store.textCondition=store.textConditionL[store.lang];
        store.textConditionL=null
        //console.log(store.textCondition)
    }

    if(store.seller.payInfoL && store.seller.payInfoL[store.lang]){
        store.seller.payInfo=store.seller.payInfoL[store.lang];
        store.seller.payInfoL=null
    }

    if(store.addcomponents && typeof store.addcomponents=='object'){
        for(let key in store.addcomponents){
            if(store.addcomponents[key] && store.addcomponents[key].nameL && store.addcomponents[key].nameL[store.lang]){
                store.addcomponents[key].name=store.addcomponents[key].nameL[store.lang];
                store.addcomponents[key].nameL[store.lang]=null;
            }
            if(store.addcomponents[key] && store.addcomponents[key].descL && store.addcomponents[key].descL[store.lang]){
                store.addcomponents[key].desc=store.addcomponents[key].descL[store.lang];
                store.addcomponents[key].descL[store.lang]=null;
            }
        }
    }
    //console.log(store.lang,store.location)

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
    payInfoL:{},
    retail:{type:Number,default:0},
    sale:{type:Number,default:0},
    archImages:String,
    cascade:[],
    orderBlocks:{
        pay:{visible:{type:Boolean,default:true},ordinal:{type:Number,default:1}},
        rulePay:{visible:{type:Boolean,default:true},ordinal:{type:Number,default:1}},
        ship:{visible:{type:Boolean,default:true},ordinal:{type:Number,default:1}}
    },
    phone:String,
    minDurationForService:Number,

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
    //store: {type: Schema.ObjectId, ref: 'Store'},
    url:{type : String,index:true},
    folder:String, // folder in Public were are jade,views and css files
    headerBlock:{type: Number,default:0},
    footerBlock:{type: Number,default:0},
    //**********************************
    // path to folders with data files
    icons:String,
    fonts:String,
    colors:String,
    //*******************************
    menu1:{},
    menu2:{},
    main:[

    ],
    stuffsList:[],//??????
    //stuff:{type: Number,default:0},// 0- два блока, 1 - все в один поток ????
    stuffDetail:[],
    footer:{},
    stats:[],
    news:[],
    newsDetail:[],



    homePage:{

    },

    stuffs:{type: Number,default:0},
    //stuff:{type: Number,default:0},
    statTempl:{type:Number,default:0},// number of template for stat pages
    newsTempl:{type:Number,default:0},
    newsList:{type:Number,default:0},
    cartTempl:{type:Number,default:0},
    //footer:Boolean,// text in footer - contacts
    margin:Boolean,// margin for ui-view div
});

//TemplateSchema.add({header:{}})
//TemplateSchema.add({stuffdetail:[]})
//TemplateSchema.add({stuffsList:[]})
//TemplateSchema.add({footer:[]})


/*
var header={
    // below only fixed
    position:upon,below,
    fixed:Bollean,
    background:Boolean,
    consist:[
        {name:'logo',position:String,is:Boolean},// position is an enum type = [left,right,center]
        {name:'name',position:String,is:Boolean},
        {name:'cart',position:String,is:Boolean},
        {name:'enter',position:String,is:Boolean},
        {name:'info',position:String,is:Boolean},
        {name:'currency',position:String,is:Boolean},
        {name:'news',position:String,is:Boolean},
        {name:'lookbook',position:String,is:Boolean},
        {name:'search',position:String,is:Boolean},
        {name:'catalog',position:String,is:Boolean},
    ]

}
var header2={
    // below only fixed
    is:Boolean,
    position:upon,below,left,right,
    fixed:Bollean,// use only for top
    background:Boolean,
    consist:[
        {name:'logo',position:String,is:Boolean},// position is an enum type = [left,right,center]
        {name:'name',position:String,is:Boolean},
        {name:'cart',position:String,is:Boolean},
        {name:'enter',position:String,is:Boolean},
        {name:'info',position:String,is:Boolean},
        {name:'currency',position:String,is:Boolean},
        {name:'news',position:String,is:Boolean},
        {name:'lookbook',position:String,is:Boolean},
        {name:'search',position:String,is:Boolean},
        {name:'catalog',position:String,is:Boolean},
    ]
}
*/

/*TemplateSchema.add({main:{type:Array,default:[
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
    {name:'info',is:true,index:1,templ:0},
]}})*/
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


/*window.LiqPayCheckoutCallback = function() {
    LiqPayCheckout.init({
        data: 'eyAidmVyc2lvbiIgOiAzLCAicHVibGljX2tleSIgOiAieW91cl9wdWJsaWNfa2V5IiwgImFjdGlvbiIgOiAicGF5IiwgImFtb3VudCIgOiAxLCAiY3VycmVuY3kiIDogIlVTRCIsICJkZXNjcmlwdGlvbiIgOiAiZGVzY3JpcHRpb24gdGV4dCIsICJvcmRlcl9pZCIgOiAib3JkZXJfaWRfMSIgfQ==',
        signature: 'QvJD5u9Fg55PCx/Hdz6lzWtYwcI=',
        embedTo: '#liqpay_checkout',
        mode: 'embed' // embed || popup
    }).on('liqpay.callback', function(data){
        console.log(data.status);
        console.log(data);
    }).on('liqpay.ready', function(data){
        // ready
    }).on('liqpay.close', function(data){
        // close
    });
};*/
//5168742017233606 03/18 282



