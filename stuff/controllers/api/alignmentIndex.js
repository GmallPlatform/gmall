"use strict";
var myUtil=require('../myUtil.js');
var forEach = myUtil.forEachForGenerators;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Stuff=mongoose.model('Stuff');
var Brand=mongoose.model('Brand');
var Category=mongoose.model('Category');

let async=require('async')




exports.alignmentIndex=function(req,res,next){
    let categories,brands;
    let stuffsForUpdate={};
    Promise.resolve()
        .then(function () {
            return new Promise(function (rs,rj) {
                Brand.find({store:req.store._id}).lean().populate('tags').exec(function(err,items){
                    if(err){rj(err)}
                    brands=items
                    rs()
                })
            })
        })
        .then(function () {
            return new Promise(function (rs,rj) {
                Category.find({store:req.store._id}).lean().exec(function(err,items){
                    if(err){rj(err)}
                    categories=items
                    rs()
                })
            })
        })
        .then(function () {
            return forEach(categories, function * (category, idx) {
                if(category.brands && category.brands.length){
                    let o = yield checkIndex(category,req.store._id)
                    //console.log('NNNNN -',ind,category.name)
                    for(let k in o){
                        stuffsForUpdate[k]=o[k]
                    }
                }
            })
        })
        .then(function () {
            return myUtil.getPromiseForUpdateInDB(stuffsForUpdate,Stuff)
        })
        .then(function () {
            res.json({msg:'OK'})
        })
        .catch(function (err) {
            console.log(err)
            return next(err)
        })


    function checkIndex(category,store){
        let updateList={}

        return new Promise(function (rs,rj) {
            Promise.resolve()
                .then(function () {
                    //console.log(category.name,category.brands)
                    return new Promise(function (rs1,rj1) {
                        Stuff.find({category:category._id,store:store}).lean().sort({index:'-1'})
                            //.populate('brand','name')
                            .limit(1).select('index brand').exec(function(err,stuffs){
                            if(err){rj1(err)}
                            //console.log(stuffs)
                            rs1(stuffs)
                        })
                    })
                })
                .then(function (stuffs) {
                    if(stuffs && stuffs.length && stuffs[0].index){
                        //console.log(category.name,stuffs[0].index)
                        return forEach(category.brands, function * (brandId, idx) {
                            let s = yield new Promise(function (rs1,rj1) {
                                Stuff.find({category:category._id,store:store,brand:brandId}).lean().sort({index:'-1'})
                                    .limit(70).select('index name brand').exec(function(err,sts){
                                    let index=stuffs[0].index
                                    //console.log('stuff.index for ',category.name,' ',brandId,' ',index,sts.length)
                                    if(err){rj1(err)}
                                    let o={};
                                    if(sts && sts.length){
                                        sts.forEach(function(st){
                                            o[st._id]={index:index--};
                                            //console.log(st.name,st.index,index)
                                        })
                                    }
                                    rs1(o)
                                })
                            })
                            for(let k in s){updateList[k]=s[k]}
                            /*if(brandId.toString()!=stuffs[0].brand._id.toString()){

                             }*/
                        })
                    }
                })
                .then(function(){
                    rs(updateList)
                })
                .catch(function(err){
                    rj(err)
                })

        })
    }
}

