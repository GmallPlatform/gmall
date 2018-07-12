'use strict';
module.exports = handleLanguageStore;

function handleLanguageStore(store,lang){
    //console.log(store.lang)
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
    if(store.footer){
        if(store.footer.textL && store.footer.textL[store.lang]){
            store.footer.text=store.footer.textL[store.lang];
            store.footer.textL=null
        }
        if(store.footer.text1L && store.footer.text1L[store.lang]){
            store.footer.text1=store.footer.text1L[store.lang];
            store.footer.text1L=null
        }
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