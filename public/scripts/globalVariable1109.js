'use strict';
/*datetime*/
var minTimePart=15// минимальное  время услуги 15 минут
var timeRemindArrLang=[
    {
        'ru':'за 1 час',
        'uk':'',
        'en':'',
        'de':'',

        part:4
    },
    {
        'ru':'за 2 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:8
    },
    {
        'ru':'за 3 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:12
    },
    {
        'ru':'за 4 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:16
    },
    {
        'ru':'за 5 часов',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:20
    },
    {
        'ru':'за 6 часов',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:24
    },
    {
        'ru':'за 12 часов',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:48
    },
    {
        'ru':'за 1 день',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:96
    }
]
var timeDurationArrLang=[
    {
        'ru':'15 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:1
    },
    {
        'ru':'30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:2
    },
    {
        'ru':'45 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:3
    },
    {
        'ru':'1 час',
        'uk':'',
        'en':'',
        'de':'',

        part:4
    },
    {
        'ru':'1 час 15 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:5
    },
    {
        'ru':'1 час 30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:6
    },
    {
        'ru':'1 час 45 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:7
    },
    {
        'ru':'2 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:8
    },
    {
        'ru':'2 часа 15 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:9
    },
    {
        'ru':'2 часа 30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:10
    },
    {
        'ru':'3 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:12
    },
    {
        'ru':'3 часа 30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:14
    },
    {
        'ru':'4 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:16
    }
]
var weekDays=[
    {
        'ru':'Воскресенье',
        'uk':'Неділя',
        'en':'Sunday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Понедельник',
        'uk':'Понеділок',
        'en':'Monday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Вторник',
        'uk':'Вівторок',
        'en':'Tuesday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Среда',
        'uk':'Середа',
        'en':'Wednesday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Четверг',
        'uk':'Четвер',
        'en':'Thursday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Пятница',
        'uk':'П*ятниця',
        'en':'Friday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Суббота',
        'uk':'Субота',
        'en':'Saturday',
        'de':'gdsdfsdf'
    },
    ]
/**************************/

var reservedFirstParams=['manage','promo','seo','setting','content',
    'news','lookbook','stat','master','campaign','info','additional','cabinet','pricegoods','priceservices','home','search','cart','cabinet']
var languagesOfPlatform=['ru','uk','en','de'];
var propertiesOfConfigData=[{'key':'unitOfMeasure','name':'единицы измерения'}];
var phoneCodes=[{code:'+38',country:'Ukraine'},{code:'+7',country:'Russia'},
    {code:'+501',country:'Moldova'},{code:'+44',country:'United Kingdom'},
    {code:'+93',country:'Afghanistan'},{code:'+355',country:'Albania'},{code:'+213',country:'Algeria'},
    {code:'+1-684',country:'American Samoa'},{code:'+376',country:'Andorra'},{code:'+244',country:'Angola'},
    {code:'+1-264',country:'Anguilla'},{code:'+672',country:'Antarctica'},{code:'+1-268',country:'Antigua and Barbuda'},
    {code:'+54',country:'Argentina'},{code:'+374',country:'Armenia'},{code:'+297',country:'Aruba'},
    {code:'+61',country:'Australia'},{code:'+43',country:'Austria'},{code:'+994',country:'Azerbaijan'},
    {code:'+1-242',country:'Bahamas'},{code:'+973',country:'Bahrain'},{code:'+880',country:'Bangladesh'},
    {code:'+1-246',country:'Barbados'},{code:'+375',country:'Belarus'},{code:'+32',country:'Belgium'},
    {code:'+1-246',country:'Belize'},{code:'+229',country:'Benin'},{code:'+1-441',country:'Bermuda'},
    {code:'+975',country:'Bhutan'},{code:'+591',country:'Bolivia'},{code:'+246',country:'British Indian Ocean Territory'},
    {code:'+267',country:'Botswana'},{code:'+55',country:'Brazil'},{code:'+387',country:'Bosnia and Herzegovina'},
    {code:'+1-284',country:'British Virgin Islands'},{code:'+673',country:'Brunei'},{code:'+359',country:'Bulgaria'},
    {code:'+226',country:'Burkina Faso'},{code:'+257',country:'Burundi'},{code:'+855',country:'Cambodia'},
    {code:'+237',country:'Cameroon'},{code:'+1',country:'Canada'},{code:'+238',country:'Cape Verde'},
    {code:'+1-345',country:'Cayman Islands'},{code:'+236',country:'Central African Republic'},{code:'+235',country:'Chad'},
    {code:'+56',country:'Chile'},{code:'+86',country:'China'},{code:'+57',country:'Colombia'},
    {code:'+269',country:'Comoros'},{code:'+506',country:'Costa Rica'},{code:'+385',country:'Croatia'},
    {code:'+53',country:'Cuba'},{code:'+599',country:'Curacao'},{code:'+357',country:'Cyprus'},
    {code:'+420',country:'Czech Republic'},{code:'+45',country:'Denmark'},{code:'+1-767',country:'Dominica'},
    {code:'+593',country:'Ecuador'},{code:'+995',country:'Georgia'},{code:'+49',country:'Germany'},
    {code:'+30',country:'Greece'},{code:'+852',country:'Hong Kong'},{code:'+36',country:'Hungary'},
    {code:'+354',country:'Iceland'},{code:'+852',country:'Hong Kong'},{code:'+36',country:'Hungary'},
    {code:'+30',country:'Greece'},{code:'+91',country:'India'},{code:'+62',country:'Indonesia'},
    {code:'+98',country:'Iran'},{code:'+964',country:'Iraq'},{code:'+353',country:'Ireland'},
    {code:'+972',country:'Israel'},{code:'+39',country:'Italy'},{code:'+81',country:'Japan'},
    {code:'+962',country:'Jordan'},{code:'+7',country:'Kazakhstan'},{code:'+383',country:'Kosovo'},
    {code:'+965',country:'Kuwait'},{code:'+996',country:'Kyrgyzstan'},{code:'+856',country:'Laos'},
    {code:'+371',country:'Latvia'},{code:'+961',country:'Lebanon'},{code:'+218',country:'Libya'},
    {code:'+423',country:'Liechtenstein'},{code:'+370',country:'Lithuania'},{code:'+352',country:'Luxembourg'},
    {code:'+853',country:'Macau'},{code:'+389',country:'Macedonia'},{code:'+261',country:'Madagascar'},
    {code:'+60',country:'Malaysia'},{code:'+356',country:'Malta'},{code:'+222',country:'Mauritania'},
    {code:'+230',country:'Mauritius'},{code:'+52',country:'Mexico'},{code:'+373',country:'Moldova'},
    {code:'+377',country:'Monaco'},{code:'+976',country:'Mongolia'},{code:'+382',country:'Montenegro'},
    {code:'+212',country:'Morocco'},{code:'+977',country:'Nepal'},{code:'+31',country:'Netherlands'},
    {code:'+507',country:'Panama'},{code:'+595',country:'Paraguay'},{code:'+382',country:'Montenegro'},
    {code:'+377',country:'Monaco'},{code:'+51',country:'Peru'},{code:'+63',country:'Philippines'},
    {code:'+48',country:'Poland'},{code:'+351',country:'Portugal'},{code:'+974',country:'Qatar'},
    {code:'+40',country:'Romania'},{code:'+378',country:'San Marino'},{code:'+966',country:'Saudi Arabia'},
    {code:'+381',country:'Serbia'},{code:'+65',country:'Singapore'},{code:'+421',country:'Slovakia'},
    {code:'+386',country:'Slovenia'},{code:'+27',country:'South Africa'},{code:'+82',country:'South Korea'},
    {code:'+34',country:'Spain'},{code:'+94',country:'Sri Lanka'},{code:'+46',country:'Sweden'},
    {code:'+41',country:'Switzerland'},{code:'+886',country:'Taiwan'},{code:'+992',country:'Tajikistan'},
    {code:'+66',country:'Thailand'},{code:'+216',country:'Tunisia'},{code:'+90',country:'Turkey'},
    {code:'+993',country:'Turkmenistan'},{code:'+971',country:'United Arab Emirates'},{code:'+44',country:'United Kingdom'},
    {code:'+1',country:'United States'},{code:'+598',country:'Uruguay'},{code:'+998',country:'Uzbekistan'},
    {code:'+379',country:'Vatican'},{code:'+58',country:'Venezuela'},{code:'+84',country:'Vietnam'},{code:'+967',country:'Yemen'}
    ]

var modelsName={
    stat:{
        'ru':'страницы','uk':'сторінки','en':'pages','de':'pages'
    },
    stuff:{
        'ru':'товары и услуги','uk':'товари та послуги','en':'goods and services','de':'goods and services'
    },
    news:{
        'ru':'новости','uk':'новини','en':'news','de':'news'
    },
    info:{
        'ru':'информация','uk':'інформація','en':'information','de':'information'
    }
}



var lengthStyleBlock=40;
var arrEmptyForProperties=[];
for(var i=0;i<lengthStyleBlock;i++){arrEmptyForProperties.push('')}

/*var listOfBlocksForMainPage={
    banner:'баннер',
    brands:'бренды',
    brandTags:'коллекции',
    call:'обратный звонок',
    campaign:'акции',
    categories:'категории',
    feedback:'feedback',
    filterTags:'группы (признаки)',
    info:'информационный раздел',
    map:'карта',
    mission:'миссия',
    news:'новости',
    slider:'слайдер',
    stuffs:'товары',
    subscription:'подписка',
    subscriptionAdd:'подписка с доп.полями',
    text:'текстовый блок',
    textAdd:'доп.текстовый блок',
    video:'видео',

}*/
var listOfBlocksForMainPage={
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    banner:'баннер',
    bannerOne:'баннер в два потока',
    mission:'миссия',
    text:'текстовый блок',
    textTwo:'текстовый блок 2 потока',
    campaign:'акции',
    filterTags:'тематические группы (признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    stuffs:'товары',
    news:'новости',
    info:'информационный раздел',
    pricegoods:'прайс товаров',
    priceservices:'прайс услуг',
    map:'карта',
    subscription:'подписка',
    subscriptionAdd:'подписка с доп полями',
    call:'заказ звонка',
    feedback:'форма обратной связи',
    calendar:'гугл календарь',
}
var animationTypes =[
    {type:null,name:'отсутстует'},
    {type:'animated1',name:'bounceIn'},
    {type:'animated2',name:'fadeInLeft'},
    {type:'animated3',name:'fadeInRight'},
    {type:'animated4',name:'shake'},
    {type:'animated5',name:'fadeInUpBig'},
    {type:'animated6',name:'fadeOut'},
    {type:'animated7',name:'fadeInUpBig'},
    {type:'animated8',name:'fadeInDown'},
    {type:'animated9',name:'fadeOut'},
    {type:'animated10',name:'bounceIn'},
    {type:'animated11',name:'при наведении контур1'},
    {type:'animated12',name:'при наведении контур2'},
    {type:'animated13',name:'SweepToRight'},
    {type:'animated14',name:'SweepToBottom'},
    {type:'animated15',name:'LineCenterBottom'},
    {type:'animated16',name:'???'},
    {type:'animated17',name:'SweepToRight'},
    {type:'animated18',name:'SweepToLeft'}]
var listOfListName=[
    'news',
    'master',
    'stat',
    'info',
    'campaign',
    'lookbook',
    'additional'
]

var listOfBlocksForStaticPage={
    name:'название',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    videoLink:'внешнее видео',
    video:'видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    masters:'сотрудники',
    feedback:'обратная связь',
    feedback1:'обратная связь + фото',
    feedback2:'фото + обратная связь',
    stuffs:'товары',
    filterTags:'группы(признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    campaign:'акции',
}
var listOfBlocksForNewsDetailPage={
    name:'название',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    videoLink:'внешнее видео',
    video:'видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    stuffs:'товары',
    campaign:'акции',
    filterTags:'группы(признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    date:'дата',
    sn:'социальные сети'
}

var listOfBlocksForMasterPage={
    name:'имя',
    position:'должность',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    stuffs:'товары',
}
var listOfBlocksForAddPage={
    name:'имя',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    news:'новости',
}


var listOfBlocksForHeader={
    logo:'логотип',
    name:'название',
    cart:'корзина',
    enter:'вход',
    info:'инфо',
    currency:'валюта',
    news:'новости',
    lookbook:'галлерея',
    search:'поиск',
    catalog:'каталог',
    new:'новинки',
    additional:'дополнительный список',
    sale:'распродажа',
    campaign:'акции',
    master:'мастера',
    brands:'бренды',
    collection:'коллекции',
    phone:'телефон',
    sn:'социальные сети',
    lang:'языки',
    humburger:'humburger',
    pricegoods:'pricegoods',
    priceservices:'priceservices',
}
var listBlocksForFooter={
    text:'текст',
    textOne:'текст 1',
    sn:'соц.сети',
    subscription:'подписка',
    feedback:'обратная связь',
    stat:'статические страницы',
    catalog:'каталог',
    infoline:'ииформационная строка',
    copyright:'правообладание',
    news:'новости',
    campaign:'акции',
    lang:'языки'
}


var listOfBlocksForStats={
    name:'название',
    banner:'баннер',
    gallery:'галлерея',
    desc:'описание1',
    desc1:'описание2',
    desc2:'описание3',
    map:'карта',
    video:'видео',
    masters:'мастера',
}
var listOfBlocksForStuffDetail={
    name:'название',
    gallery:'галлерея',
    desc:'описание',
    comments:'комментарии',
    lastViewed:'последние просмотренные',
    sort:'разновидности',
    group:'группа товаров',
    addInfo:'доп.информация',
    addToCart:'в корзину(действие)',
    price:'цены',
    qty:'количество',
    sn:'соц.сети',
    feedback:'обратная связь',
    params:'параметры',
    tags:'характеристики',
    blocks:'медиа блоки',
    back:'кнопка назад в список',
}

var listOfBlocksForStuffDetailBlocks={
    name:'имя',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    file:'file',
}

var listOfBlocksForStuffList={
    list:'список',
    filters:'фильтры',
    categories:'категории',
    paginate:'пагинация',
    search:'поиск',
    call:'звонок',
    subscription:'подписка',
    desc:'описание',
    seoDesc:'seo описание'
}



var tableOfColorsForButton={0:'black-white',1:'pink-white',2:'turquoise-white',3:'yellow-white',4:'bordo-white',5:'braun-white',6:'powder-white',7:'pinklight-white',8:'white-black',9:'black-white'}
var tableOfButtonsFile={0:'standart',1:'border-radius',2:'no border',3:'inverse'}

var listOfIcons=['addcart','back','cart','cancelmenu','cancel','cancelzoom','call','caret','categories','dialog','down','delete','downslide','gif','envelope','envelopewhite','edit','eur','fb','fbwhite','filters','google','googlewhite','humbmobile','chat','inst','instwhite','left','menu','next','nextgallery','ok','okwhite','pin','pinwhite','plus','prev','prevgallery','right','rub','search','setting','subscription','time','tw','twwhite','uah','up','upslide','user','userhe','userme','usd','vk','vkwhite','see','enter','zoom']

var notificationsTypeLang={
    //клиенту
    invoice:{
        'ru':'счет',
        'ua':'рахунок',
        'en':'invoice',
        'de':'',
    },
    accepted:{
        'ru':'заказ принят',
        'ua':'замовлення прийнято',
        'en':'accepted',
        'de':'',
    },
    shipOrder:{
        'ru':'данные о доставке',
        'ua':'дані про доставку',
        'en':'shipOrder',
        'de':'',
    },
    // продавцу
    order:{
        'ru':'поступил заказ',
        'ua':'поступило замовлення',
        'en':'order',
        'de':'',
    },
    pay:{
        'ru':'оплата',
        'ua':'оплата',
        'en':'pay',
        'de':'',
    },
    feedBack:{
        'ru':'обратная связь',
        'ua':'зворотній зв*язок',
        'en':'feedback',
        'de':'',
    },
    comment:{
        'ru':'комментарий',
        'ua':'коментар',
        'en':'comments',
        'de':'',
    },
    call:{
        'ru':'заказ звонка',
        'ua':'замовлення дзвінка',
        'en':'call',
        'de':'',
    },
    subscription:{
        'ru':'подписка',
        'ua':'підписка',
        'en':'subscription',
        'de':'',
    }



}

var updateExternalCatalogList= {
    everyMon10:{
        'ru':'каждый понедельник в 10.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyMon12:{
        'ru':'каждый понедельник в 12.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyFri10:{
        'ru':'каждую пятницу в 10.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyFri12:{
        'ru':'каждую пятницу в 12.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyDay10:{
        'ru':'каждый день в 10.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyDay12:{
        'ru':'каждый день в 12.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyDay101418:{
        'ru':'каждый день в 10.00,14.00,18.00',
        'ua':'',
        'en':'',
        'de':'',
    }
}

var ratioClassStuffDetail={
    0:{left:'left-block col-lg-6 col-md-6 col-sm-12 col-xs-12',right:'right-block col-lg-6 col-md-6 col-sm-12 col-xs-12'},
    1:{left:'left-block vertical-left3 col-lg-5 col-md-5 col-sm-12 col-xs-12',right:'right-block horizontal-right2 col-lg-7 col-md-7 col-sm-12 col-xs-12'},
    2:{left:'left-block vertical-left2 col-lg-4 col-md-4 col-sm-12 col-xs-12',right:'right-block horizontal-right1 col-lg-8 col-md-8 col-sm-12 col-xs-12'},
    3:{left:'left-block horizontal-left1 col-lg-7 col-md-7 col-sm-12 col-xs-12',right:'right-block vertical-right1  col-lg-5 col-md-5 col-sm-12 col-xs-12'},
    4:{left:'left-block horizontal-left2 col-lg-8 col-md-8 col-sm-12 col-xs-12',right:'right-block vertical-right2 col-lg-4 col-md-4 col-sm-12 col-xs-12'},
    5:{left:'left-block col-lg-12 col-md-12 col-sm-12 col-xs-12',right:'right-block col-lg-12 col-md-12 col-sm-12 col-xs-12'},
}
var elementsList=['h1','h2','h3','h4','a','p','div','ol','ul','li','span','img','class']

var getNamePropertyCSS = function(i,item,k) {
    if(item){
        switch (i){
            case 0: return ['color',item];
            case 1: return  ['background-color',item];
            case 2: return  ['margin-top',item];
            case 3: return  ['margin-right',item];
            case 4: return  ['margin-bottom',item];
            case 5: return  ['margin-left',item];
            case 6: return  ['padding-top',item];
            case 7: return  ['padding-right',item];
            case 8: return  ['padding-bottom',item];
            case 9: return  ['padding-left',item];
            case 10: return  ['display',item];
            case 11: return  ['font-family',item];
            case 12: return  ['font-size',item];
            case 13: return  ['font-weight',item];
            case 14: return  ['letter-spacing',item];
            case 15: return  ['text-transform',item];
            case 16: return  ['width',item];
            case 17: return  ['height',item];
            case 18: return  ['float',item];
            case 19: return  ['top',item];
            case 20: return  ['left',item];
            case 21: return  ['right',item];
            case 22: return  ['bottom',item];
            case 23: return  ['text-decoration',item];
            case 24: return  ['text-align',item];
            case 25: return  ['position',item];
            case 26: return  ['border',item];
            case 27: return  ['border-left',item];
            case 28: return  ['border-right',item];
            case 29: return  ['border-top',item];
            case 30: return  ['border-bottom',item];
            case 31: return  ['border-radius',item];
            case 32: return  ['z-index',item];
            case 33: return  ['opacity',item];
            case 34: return  ['border-width',item];
            case 35: return  ['list-style',item];
            case 36: return  ['vertical-align',item];
            case 37: return  ['background-size',item];
            case 38: return  ['background-position',item];
            case 39: return  ['text-shadow',item];
            case 40: return  ['cursor',item];
        }
    }else{
        switch (i){
            case 0: return 'color';
            case 1: return  'background-color';
            case 2: return 'margin-top';
            case 3: return  'margin-right';
            case 4: return  'margin-bottom';
            case 5: return  'margin-left';
            case 6: return 'padding-top';
            case 7: return  'padding-right';
            case 8: return  'padding-bottom';
            case 9: return  'padding-left';
            case 10: return  'display';
            case 11: return  'font-family';
            case 12: return  'font-size';
            case 13: return  'font-weight';
            case 14: return  'letter-spacing';
            case 15: return  'text-transform';
            case 16: return  'width';
            case 17: return  'height';
            case 18: return  'float';
            case 19: return  'top';
            case 20: return  'left';
            case 21: return  'right';
            case 22: return  'bottom';
            case 23: return  'text-decoration';
            case 24: return  'text-align';
            case 25: return  'position';
            case 26: return  'border';
            case 27: return  'border-left';
            case 28: return  'border-right';
            case 29: return  'border-top';
            case 30: return  'border-bottom';
            case 31: return  'border-radius';
            case 32: return  'z-index';
            case 33: return  'opacity';
            case 34: return  'border-width';
            case 35: return  'list-style';
            case 36: return  'vertical-align';
            case 37: return  'background-size';
            case 38: return  'background-position';
            case 39: return  'text-shadow';
            case 40: return  'cursor';
        }
    }

}


function compileStyleForBlock(block){
    var elements=[];
    var el='';
    if(block.blockStyle){
        for(var  i=0;i<lengthStyleBlock;i++){
            var n;
            if(block.blockStyle[i]){
                n = getNamePropertyCSS(i,block.blockStyle[i]);
                if(n){
                    el+="\n"+n[0]+':'+n[1]+';';
                }
            }
        }
    }
    if(el){
        if(el){
            el ='{'+el+'}'+"\n";
        }
        elements.push(el)
    }
    if(block.elements && typeof block.elements=='object'){
        for(var key in block.elements){
            el='';
            for(var i=0;i<lengthStyleBlock;i++){
                if(key=='a' && i==1){continue}
                var  n;
                if(block.elements[key][i]){
                    n = getNamePropertyCSS(i,block.elements[key][i]);
                    if(n){
                        el+="\n"+n[0]+':'+n[1]+';';
                    }
                }
            }
            if(el){
                el =key.replace("@",".")+'{'+el+'}'+"\n";
            }
            if(key=='a' && block.elements.a[1]){
                el+='a:hover {color:'+block.elements.a[1]+'}';
            }
            if(el){
                elements.push(el)
            }
        }
    }
    return elements;
}

if(typeof window === 'undefined') {
    exports.listOfBlocksForMainPage=listOfBlocksForMainPage;
    exports.listOfBlocksForHeader=listOfBlocksForHeader;
    exports.listBlocksForFooter=listBlocksForFooter;
    exports.listOfBlocksForStats=listOfBlocksForStats;
    exports.listOfBlocksForStuffDetail=listOfBlocksForStuffDetail;
    exports.listOfBlocksForStuffList=listOfBlocksForStuffList;
    exports.lengthStyleBlock=lengthStyleBlock;
    exports.arrEmptyForProperties=arrEmptyForProperties;
    exports.listOfBlocksForNewsDetailPage=listOfBlocksForNewsDetailPage;
    exports.listOfBlocksForStaticPage=listOfBlocksForStaticPage;
    exports.modelsName=modelsName;
    exports.getNamePropertyCSS=getNamePropertyCSS;
    exports.listOfListName=listOfListName;
    exports.ratioClassStuffDetail=ratioClassStuffDetail;
    exports.elementsList=elementsList;
    exports.reservedFirstParams=reservedFirstParams;
    exports.minTimePart=minTimePart;
}


