'use strict';
var User=require('mongoose').model('User');
module.exports = {
    init:function(){
        Promise.resolve()
            .then(function(){
                return new Promise(function(resolve,reject){
                    User.findOne({email:'igorchugurov@gmail.com'},function(err,res){
                        if(!res){
                            var user = new User({email:'igorchugurov@gmail.com',name:'Igor',password:'1234567igor',role:'admin'})
                            user.save(function(err){
                                if(err){return reject(err)}
                                resolve()
                            })
                        }
                    })
                })
            })
            .then(function(){
                return new Promise(function(resolve,reject){
                    User.findOne({email:'ihorchugurov@gmail.com'},function(err,res){
                        if(!res){
                            var user = new User({email:'ihorchugurov@gmail.com',name:'Ihor',password:'1234567ihor',role:'admin'})
                            user.save(function(err){
                                if(err){return reject(err)}
                                resolve()
                            })
                        }
                    })
                })
            })
            .then(function(){
                return new Promise(function(resolve,reject){
                    User.findOne({email:'vikachugurov@gmail.com'},function(err,res){
                        if(!res){
                            var user = new User({email:'vikachugurov@gmail.com',name:'Vika',password:'1234567vika',role:'admin'})
                            user.save(function(err){
                                if(err){return reject(err)}
                                resolve()
                            })
                        }
                    })
                })
            })
            .catch(function(err){
                console.log(err)
            })



    }

};