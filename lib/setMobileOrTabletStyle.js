'use strict';
function run(req,d) {
    if(req.mobile && d.mobile){
        if(d.mobile.elements && typeof d.mobile.elements == 'object' && Object.keys(d.mobile.elements)){
            d.elements=d.mobile.elements;
        }
        if(d.mobile.blockStyle && d.mobile.blockStyle.length && d.mobile.blockStyle.some(s=>s)){
            d.blockStyle=d.mobile.blockStyle;
        }
    }else if(req.tablet && d.tablet){
        if(d.tablet.elements && typeof d.tablet.elements == 'object' && Object.keys(d.tablet.elements)){
            d.elements=d.tablet.elements;
        }
        if(d.tablet.blockStyle && d.tablet.blockStyle.length && d.tablet.blockStyle.some(s=>s)){
            d.blockStyle=d.tablet.blockStyle;
        }
    }
}
module.exports = run;

