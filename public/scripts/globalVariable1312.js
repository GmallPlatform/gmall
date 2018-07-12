'use strict';

var languagesOfPlatform=['ru','uk','en','de'];
var propertiesOfConfigData=[{'key':'unitOfMeasure','name':'единицы измерения'}];
var phoneCodes=[{code:'+38',country:'Ukraine'},{code:'+7',country:'Russia'},
    {code:'+373',country:'Moldova'},{code:'+49',country:'Germany'}]

var modelsName={
    stat:{
        'ru':'страницы','uk':'страницы','en':'pages','de':'pages'
    },
    stuff:{
        'ru':'товары и услуги','uk':'товары и услуги','en':'goods and services','de':'goods and services'
    },
    news:{
        'ru':'новости','uk':'новости','en':'news','de':'news'
    },
    info:{
        'ru':'информация','uk':'информация','en':'information','de':'information'
    }
}


var lengthStyleBlock=25;
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
    banner:'баннер',
    mission:'миссия',
    text:'текстовый блок',
    campaign:'акции',
    filterTags:'группы (признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    stuffs:'товары',
    news:'новости',
    info:'информационный раздел',
    map:'карта',
    subscription:'подписка',
    subscriptionAdd:'подписка с доп полями',
    call:'заказ звонка',
    feedback:'форма обратной связи',
}
var animationTypes =[
    {type:null,name:'отсутстует'},
    {type:'animated1',name:'animated1'},
    {type:'animated2',name:'animated2'},
    {type:'animated3',name:'animated3'},
    {type:'animated4',name:'animated4'},
    {type:'animated5',name:'animated5'},
    {type:'animated6',name:'animated6'},
    {type:'animated7',name:'animated7'},
    {type:'animated8',name:'animated8'},
    {type:'animated9',name:'animated9'},
    {type:'animated10',name:'animated10'}]
var listOfListName=[
    'news',
    'master',
    'stat',
    'info',
    'campaign',
    'lookbook',
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
    sale:'распродажа',
    campaign:'акции',
    master:'мастера',
    collection:'коллекции',
}
var listBlocksForFooter={
    text:'текст',
    sn:'соц.сети',
    subscription:'подписка',
    feedback:'обратная связь',
    stat:'статические страницы',
    catalog:'каталог',
    infoline:'ииформационная строка',
    copyright:'правообладание',
    news:'новости',
    campaign:'акции'
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
}
var listOfBlocksForStuffList={
    list:'список',
    filters:'фильтры',
    categories:'категории',
    paginate:'пагинация',
    search:'поиск',
    call:'звонок',
    subscription:'подписка',
    desc:'описание'
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
}

var tableOfColorsForButton={0:'black-white',1:'pink-white',2:'turquoise-white',3:'yellow-white',4:'bordo-white'}
var tableOfButtonsFile={0:'standart',1:'with border'}

var listOfIcons=['addcart','cart','cancel','call','categories','dialog','down','envelope','edit','eur','fb','fbwhite','filters','google','googlewhite','chat','inst','instwhite','left','next','ok','okwhite','pin','pinwhite','plus','prev','right','rub','search','subscription','tw','twwhite','uah','up','usd','vk','vkwhite','see','enter']



