module.exports = {
    checkPermissionForSeller: function (req, res, next) {
        if(req.query && req.query.translate){
            return checkPermissionTranslator(req, res, next)
        }
        /*console.log(req.collectionName)
        console.log(req.user.master)*/
        if(req.collectionName && req.collectionName=='Comment'){return next()
        }else if(req.collectionName && req.collectionName=='Master'){
            return checkPermissionMaster(req, res, next)
        }
        /*console.log(req.user.email,req.store.domain);
        console.log(req.user._id,req.store.owner);*/
        return Promise.resolve(req.user)
            .then(function(user){
                //console.log('checkPermissionAdmin -',user.email)
                if(!user){throw 'нет прав'}
                if (req.user.email=='igorchugurov@gmail.com'||
                    req.user.email=='vikachugurova@gmail.com' ||
                    req.user.email=='ihorchugurov@gmail.com'){
                    //console.log('req.store.seller ',req.store.seller)

                    req.user.seller=req.store.seller._id;
                    return next();
                }
                //console.log(req.store.owner,req.user._id.toString)
                var owners=req.store.owner;
                if(!owners || !owners.length){{throw 'нет прав'}}

                //*******************************************
                if(req.user._id.toString){req.user._id=req.user._id.toString()}
                //console.log(req.user._id,typeof req.user._id,owners.indexOf(req.user._id))
                if(owners.indexOf(req.user._id)>-1){
                    req.user.seller=req.store.seller._id;
                    //console.log('dddd')
                    return next();
                }else{
                    {throw 'нет прав'}
                }

            })


            /*.then(function(admin){
                return admin;
                //console.log('admin ',admin)
                if(admin){
                    return true;
                }else{
                    return false;
                    var query={$and:[{store:req.store._id},{user:req.user._id}]};
                    return Seller.findOne(query).exec();
                }
            })
            .then(function(seller){
                //console.log('seller-',seller)
                if (seller){
                    if(seller._id){
                        req.user.seller=seller._id;
                    }
                    return next()
                }else{
                    var err=new Error('нет прав')
                    throw err;
                }
            })*/

            .catch(function(err){
                return next(err)
            })
    },
    onlySuperAdminCheck: function (req, res, next) {
        return Promise.resolve(req.user)
            .then(function(user){
                if(!user){throw 'нет прав onlySuperAdminCheck'}
                if (req.user.email=='igorchugurov@gmail.com'||
                    req.user.email=='vikachugurova@gmail.com' ||
                    req.user.email=='ihorchugurov@gmail.com'){
                    if(req.store && req.store.seller && req.store.seller._id){
                        req.user.seller=req.store.seller._id;
                    }

                    return next();
                }else{
                    throw 'нет прав onlySuperAdminCheck'
                }
            })
            .catch(function(err){
                return next(err)
            })
    },
    checkPermissionForUserDataChange: function (req, res, next) {
        if(req.params.collectionName && req.params.collectionName=='Comment'){return next()}
        return Promise.resolve(req.user)
            .then(function(user){
                //console.log('checkPermissionAdmin -',user.email)
                if(!user){throw 'нет прав'}
                if (req.user.email=='igorchugurov@gmail.com'||
                    req.user.email=='vikachugurova@gmail.com' ||
                    req.user.email=='ihorchugurov@gmail.com'){
                    //console.log('req.store.seller ',req.store.seller)
                    req.user.seller=req.store.seller._id;
                    return next();
                }
                //console.log(req.store.owner,req.user._id.toString)
                var owners=req.store.owner;
                if(!owners || !owners.length){{throw 'нет прав'}}

                //*******************************************
                if(req.user._id.toString){req.user._id=req.user._id.toString()}
                //console.log(req.user._id,typeof req.user._id,owners.indexOf(req.user._id))
                if(owners.indexOf(req.user._id)>-1){
                    req.user.seller=req.store.seller._id;
                    //console.log('dddd')
                    return next();
                }else{
                    //console.log(req.body)
                    if(req.body._id!=req.user._id.toString()){
                        {throw 'нет прав'}
                    }else{
                        return next();
                    }

                }

            })
            .catch(function(err){
                return next(err)
            })
    },
    checkPermissionOrder: function(req, res, next){
        return Promise.resolve(req.user)
            .then(function(user){
                //console.log('req.user - ',req.user)
                if(!user){throw 'нет прав'}

                if (req.user.email=='igorchugurov@gmail.com'||
                    req.user.email=='vikachugurova@gmail.com' ||
                    req.user.email=='ihorchugurov@gmail.com'){
                    req.user.seller=req.store.seller._id;
                    return true;
                }
                var owners=req.store.owner.map(function(el){
                    if(el.toString()){return el.toString()}else{return el;}
                })
                if(owners.indexOf(req.user._id.toString())>-1){
                    req.user.seller=req.store.seller._id;
                    return true;
                }else{
                    return false;
                }

            })
            .then(function(admin){
                //console.log('req.user - ',req.user)
                if(admin){
                    return true;
                }else{
                    return false;
                    /*var query={$and:[{store:req.store._id},{user:req.user._id}]};
                     return Seller.findOne(query).exec();*/
                }
            })
            .then(function(seller){
                //console.log('seller-',seller)
               /* if (seller){
                    if(seller._id){
                        req.user.seller=seller._id;
                    }
                }
                //console.log('return next()')
                return next()*/
                if (seller){
                    if(seller._id){
                        req.user.seller=seller._id;
                    }
                    //return next()
                }else{
                    //throw 'нет прав'
                }

                return next()

            })
            .catch(function(err){
                console.log('err',err)
                return next(err)
            })
    },
    checkPermissionMaster: checkPermissionMaster,
    checkPermissionTranslator: checkPermissionTranslator,
}

function checkPermissionMaster(req, res, next){
    return Promise.resolve(req.user)
        .then(function(user){
            //console.log(user)
            /*console.log('req.user - ',req.user)
             console.log('req.params - ',req.params)*/
            if(!user){throw 'нет прав'}
            //console.log(req.user.master)
            if(req.user.master){
                return true;
            }
            if (req.user.email=='igorchugurov@gmail.com'||
                req.user.email=='vikachugurova@gmail.com' ||
                req.user.email=='ihorchugurov@gmail.com'){
                req.user.seller=req.store.seller._id;
                return true;
            }
            var owners=req.store.owner.map(function(el){
                if(el.toString()){return el.toString()}else{return el;}
            })
            if(owners.indexOf(req.user._id.toString())>-1){
                req.user.seller=req.store.seller._id;
                return true;
            }else{
                return false;
            }

        })
        .then(function(admin){
            //console.log('admin',admin)
            //console.log('req.user - ',req.user)
            if(admin){
                return true;
            }else{
                return false;
                /*var query={$and:[{store:req.store._id},{user:req.user._id}]};
                 return Seller.findOne(query).exec();*/
            }
        })
        .then(function(seller){
            //console.log('seller-',seller)
            if (seller){
                if(seller._id){
                    req.user.seller=seller._id;
                }
                //console.log('return next()')
                return next()
            }else{
                throw 'нет прав'
            }
            //console.log('return next()')


        })
        .catch(function(err){
            console.log('err',err)
            return next(err)
        })
}


function checkPermissionTranslator(req, res, next){
    return Promise.resolve(req.user)
        .then(function(user){
            if(!user){throw 'нет прав'}
            if(req.user.master){
                return true;
            }
            if (req.user.email=='igorchugurov@gmail.com'||
                req.user.email=='vikachugurova@gmail.com' ||
                req.user.email=='ihorchugurov@gmail.com'){
                req.user.seller=req.store.seller._id;
                return true;
            }
            var owners=req.store.owner.map(function(el){
                if(el.toString()){return el.toString()}else{return el;}
            })
            if(!req.store.translators){req.store.translators=[]}
            let translaters=req.store.translaters.map(function(el){
                if(el.toString()){return el.toString()}else{return el;}
            })
            if(owners.indexOf(req.user._id.toString() )>-1||translaters.indexOf(req.user._id.toString() )>-1){
                req.user.seller=req.store.seller._id;
                return true;
            }else{
                return false;
            }

        })
        .then(function(admin){
            if(admin){
                if(next){return next()}else{return true}
            }else{
                throw 'нет прав'
            }
        })
        .catch(function(err){
            console.log('err',err)
            if(next){return next(err)}else{return false}
        })
}

