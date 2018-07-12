'use strict';
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    email: { type: String, lowercase: true },
    //password: { type: String, select: false },
    password: String,
    name: String,
    picture: String,
    bitbucket: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    live: String,
    yahoo: String,
    twitter: String,
    twitch: String,
    // main profile
    store:[String],
    stores:{},
    seller:String,
    role: {
        type: String, // new for subscribe
        default: 'subscriber' //  user - заполнение профиля customer - первый заказ clubman - более 10 заказов или более 20000 грн
    },
    visits:{type:Number,default:1}, // количесво посещений
    order :{count:{type:Number,default:0},sum:{type:Number,default:0}}, // количество заказов, сумма заказов
    profile:{fio:String,
        phone:String,
        zip:String,
        country:String,
        region:String,
        city:String,
        countryId:String,
        regionId:Number,
        cityId:String,
        address:String,
        transporter:String,
        transporterOffice:String

    },
    addInfo:{},
    date: { type: Date, default: Date.now },
    subscription :{type : Boolean, default : true},
    coupons:[{type : Schema.ObjectId, ref : 'Coupon'}], //использованные купоны
    data:{},//key - store, :{ subscribe:true,visits:1,list: _id of list}
    confirmEmail :Boolean,
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    if(user.email){
        user.email = user.email.toLowerCase();
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.stores[this.storeId], function(err, isMatch) {
        done(err, isMatch);
    });
};
userSchema.methods.newPswd= function(store,pswd){
    var user=this;
    if(!user.stores){user.stores={}}
    return new Promise(function(resolve,reject){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pswd, salt, function(err, hash) {
                user.stores[store] = hash;
                resolve();
            });
        });
    })
},


userSchema.statics={
    list: function (options, cb,req) {
        var self=this;
        //console.log(JSON.stringify(options.criteria));
        if (options.criteria && options.criteria['$and']){
            for (var i= 0,l=options.criteria['$and'].length;i<l;i++){
                for (var key in options.criteria['$and'][i]){
                    if(key=='$or') {
                        if(options.criteria['$and'][i]['$or'].length){
                            options.criteria['$and'][i]['$or'].forEach(function(el,j){
                                for (var key1 in el){
                                    if(key1=='name'||key1=='email'||key1=='profile.fio'||key1=='profile.phone'){
                                        var str=el[key1];
                                        options.criteria['$and'][i]['$or'][j][key1]=
                                            RegExp( options.criteria['$and'][i]['$or'][j][key1], "i" )
                                        //console.log(options.criteria['$and'][i]['$or'])
                                        /*options.criteria['$and'][i]['$or'][j][key1]= new RegExp( str, "i")
                                        options.criteria['$and'][i]['$or'][j]=JSON.stringify(el);
                                        console.log(el==options.criteria['$and'][i]['$or'][j])
                                        console.log(key1,' ',el,' ',
                                            JSON.stringify(options.criteria['$and'][i]['$or'][j]))
                                        console.log(JSON.stringify(options.criteria['$and'][i]['$or']))*/
                                    }
                                }
                            })
                        }

                        /*if (options.criteria['$and'][i][key][0]['name']) {
                         options.criteria['$and'][i][key][0]['name'] =
                         RegExp( options.criteria['$and'][i][key][0]['name'], "i" )

                         }
                         if (options.criteria['$and'][i][key][1]['email']) {
                         options.criteria['$and'][i][key][1]['email'] =
                         RegExp( options.criteria['$and'][i][key][1]['email'], "i" )

                         }
                         if (options.criteria['$and'][i][key][2]['profile.fio']) {
                         options.criteria['$and'][i][key][2]['profile.fio'] =
                         RegExp( options.criteria['$and'][2][key][2]['profile.fio'], "i" )

                         }*/
                        //console.log(options.criteria['$and'][i]['$or'])
                    }else if(key=='name'||key=='email'||key=='profile.fio'||key=='profile.phone'){
                        options.criteria['$and'][i][key]=
                            RegExp( options.criteria['$and'][i][key], "i" )
                    }
                    /*if (key=='artikul'){
                     options.criteria['$and'][i][key]=RegExp(options.criteria['$and'][i][key] , "i")
                     }*/
                }
                //console.log("options.criteria['$and'][i]-",options.criteria['$and'][i])
            }

        }else{
            if(options.criteria && options.criteria['$or']){
                if(options.criteria['$or'].length){
                    options.criteria['$or'].forEach(function(el,i){
                        for (var key1 in el){
                            if(key1=='name'||key1=='email'||key1=='profile.fio'){
                                el[key1]= RegExp( el[key1], "i")
                            }
                        }
                    })
                }
            }
        }
        //console.log("options.criteria['$and'][1]-",options.criteria['$and'][1])
        //var criteria = options.criteria || {}
        //console.log(options.criteria['$and']);
        //options.criteria={};
        Promise.resolve()
            .then(function(){


                /*console.log(options.req.store.owner,owners)
                 console.log(owners.indexOf(options.req.user._id.toString()));*/
               /* if(!options.req.user){
                    var error = new Error('не авторизован')
                    throw error;
                }*/
                return;
            })
            .then(function(){
                self.find(options.criteria)
                    .sort({'date': -1}) // sort by date
                    .limit(options.perPage)
                    .select('name email profile date store data')
                    .skip(options.perPage * options.page)
                    .exec(cb)
            })
            .catch(function genericError(error) {
                cb(error)
            });

    },
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    hashPswd:function(pswd,cb){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pswd, salt, function(err, hash) {
                cb(hash);
            });
        });
    }

}

mongoose.model('User', userSchema);

var subscribtionListSchema = new mongoose.Schema({
    store:String,
    list:{1:String,2:String,3:String,4:String,5:String}
})
subscribtionListSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('SubscribtionList', subscribtionListSchema);

var userEntrySchema = new mongoose.Schema({
    store:String,
    name:String,
    phone:String,
    email:String
})
userEntrySchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        //console.log(options.criteria)
        if (options.criteria && options.criteria['$and']){
            for (var i= 0,l=options.criteria['$and'].length;i<l;i++){
                for (var key in options.criteria['$and'][i]){
                    if(key=='$or') {
                        if(options.criteria['$and'][i]['$or'].length){
                            options.criteria['$and'][i]['$or'].forEach(function(el,j){
                                for (var key1 in el){
                                    if(key1=='name'||key1=='email'||key1=='phone'){
                                        var str=el[key1];
                                        options.criteria['$and'][i]['$or'][j][key1]=
                                            RegExp( options.criteria['$and'][i]['$or'][j][key1], "i" )
                                    }
                                }
                            })
                        }
                    }else if(key=='name'||key=='email'||key=='phone'){
                        options.criteria['$and'][i][key]=
                            RegExp( options.criteria['$and'][i][key], "i" )
                    }
                }
            }
        }else{
            if(options.criteria && options.criteria['$or']){
                if(options.criteria['$or'].length){
                    options.criteria['$or'].forEach(function(el,i){
                        for (var key1 in el){
                            if(key1=='name'||key1=='email'||key1=='phone'){
                                el[key1]= RegExp( el[key1], "i")
                            }
                        }
                    })
                }
            }
        }

        var criteria = options.criteria || {}
        //console.log(criteria.$and[1].$or)
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        req.body.store= req.query.store;
        cb();
    }
}
mongoose.model('UserEntry', userEntrySchema);





