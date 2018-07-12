'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
    var cToL= require('../controllers/c-l');
/**
 * User Schema
 */
var InfoSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    url:String,
    name: {type : String, default : '', trim : true},
    nameL:{},
    actived:Boolean,
    index:String,
    img:String,
    blocks:[
        {
            name:String,
            actived:Boolean,
            desc:String,
            nameL:{},
            descL:{}
        }
    ]
});
InfoSchema.statics = {
    load: function (query, cb) {
        var self=this;
        this.findOne(query)
            .exec(function(err,doc){
                cb(err,doc);
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            //.populate('gallery.tag', 'name')
            .select('name url index img nameL descL actived')
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    searchList: function (options, cb) {
        let criteria = {$and:[options.criteria,{$or:[]}]}
        let searchStr=RegExp( options.searchStr, "i" )
        let o={['nameL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['blocks.nameL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['blocks.descL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['name']:searchStr};
        criteria.$and[1].$or.push(o)
        o={['blocks.name']:searchStr};
        criteria.$and[1].$or.push(o)
        o={['blocks.desc']:searchStr};
        criteria.$and[1].$or.push(o)
        //console.log('infpo criteria',criteria)
        this.find(criteria)
        //.populate('gallery.tag', 'name')
            .select('name url index img nameL descL blocks')
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function(err,res){
                var infos=[];
                if(res && res.length){
                    let s = options.searchStr;
                    res.forEach(function (info) {
                        //console.log(info)
                        if(info.blocks && info.blocks.length){
                            try{
                                info.blocks.forEach(function (b) {
                                    let is = false;
                                    if(b.name.indexOf(s) !== -1){is=true;}
                                    if(b['nameL'] && b.nameL[options.lang]){
                                        if(b.nameL[options.lang].indexOf(s) !== -1){is=true;}
                                    }
                                    if(b['descL'] && b.descL[options.lang]){
                                        if(b.descL[options.lang].indexOf(s) !== -1){is=true;}
                                    }
                                    if(is){
                                        let o={img:info.img,url:info.url,name:b.name,nameL:b.nameL,descL:b.descL,blockId:b._id}
                                        infos.push(o)
                                    }
                                })

                            }catch(err){
                                console.log(err)
                            }

                        }
                    })
                }
                cb(err,infos)
            })
    },

}


mongoose.model('Info', InfoSchema);

