'use strict';
var myUtil=require('./myUtil.js');
function getData(model,method,options,c){
    return new Promise(function(resolve,reject){
        if(method=='load'){
            options=options.criteria;
        }
        model[method](options,function(err, results){
            /*if(method=='load'){
               // console.log('i- ',i++,err,results)
            }else{
                console.log('i- ',i++,err,results.length,c)
            }*/

            if(err){return reject(err)}
            if(results){
                resolve(results)
            }else{
                resolve([])
            }
        })
    })
}
exports.getAllDataForIndex=function(models,lang,store,subDomain,preload,next){
    let [Group,Brand,Stat,Filter,Paps,Seopage,Coupon,Witget,HomePage,Campaign,Master,Info,Label] = models;
    //console.log(req.query)
    //res.json([[1,3],[2,4]])
    try{
        let options = {
            perPage: 200,
            page: 0,
            criteria:null,
            lang:lang,
            req:{store:{lang:lang}}
        }
        let d=Date.now()
        let q1={store:store};
        let q2={$and:[{store:store},{actived:true}]};
        let q3={url:subDomain};
        //console.log(q3)
        let q4={$and:[{store:store},{actived:true},{dateEnd:{$gte:Date.now()}}]};
        let acts=[];
        options.criteria=q1;
        acts.push(getData(Group,'list',options,'group'))
        acts.push(getData(Brand,'list',options,'brand'))

        options.criteria=q2;
        acts.push(getData(Stat,'list',options,'stat'))
        acts.push(getData(Filter,'list',options,'filters'))
        options.criteria=q1;
        acts.push(getData(Paps,'list',options,'paps'))
        options.criteria=q2;
        acts.push(getData(Seopage,'list',options,'seopage'))
        acts.push(getData(Coupon,'list',options,'coupon'))
        acts.push(getData(Witget,'list',options,'witget'))
        options.criteria=q3;
        acts.push(getData(HomePage,'load',options,'homepage'))
        options.criteria=q4;
        acts.push(getData(Campaign,'list',options,'campaign'))
        options.criteria=q1;
        acts.push(getData(Master,'list',options,'masters'))
        acts.push(getData(Info,'list',options,'info'))
        acts.push(getData(Label,'list',options,'label'))
        if(preload){
            options.criteria={preload:true,store:store}
            acts.push(getData(Stat,'load',options,'stat'))
        }
        //console.log('time  one is - ',Date.now()-d)
        Promise.all(acts).then(function (results) {
            //console.log(results)

            //console.log('results.length',results.length)
            //console.log('time is - ',Date.now()-d)
            results.forEach(function (item,i) {
                myUtil.setLangField(item,lang)
                if(i==8 && item.blocks && item.blocks.length){
                    item.top=[];item.left=[];item.right=[];
                    item.blocks.forEach(function (b) {
                        if(b.position){
                            if(b.position=='top'){
                                item.top.push(b)
                            }else if(b.position=='left'){
                                item.left.push(b)
                            } else if(b.position=='right'){
                                item.right.push(b)
                            }
                        }
                    })
                }
            })
            //console.log(results)
            return next(null,results)
        },function(err){
            console.log('err',err)
            return next(err)
        }).catch(function (err) {
            console.log(err)
            return next(err)
        })
    }catch(err){
        console.log('err from catch ',err)
        return next(err)
    }
}



