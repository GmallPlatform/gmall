'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/shop',{db: {safe: true}});
// Bootstrap models
var path = require('path');
var modelsPath = path.join( __dirname, 'models' );
require( modelsPath + '/user.js' );




var xmlbuilder = require('xmlbuilder');

var fs = require('fs');


var Items=mongoose.model('User');

downloadNews();

function downloadNews() {
    var photoHost = "http://tatiana-lux.com/";
    var filePath = './public/users.xml';
    Items.count(function(err,c){
        console.log('count',c)
    })
    Items.find().batchSize(5000).sort({'date':-1}).exec(function (err, items) {
        console.log('items.length',items.length)
        if (err) {
            return console.log(err)
        }
        var d = new Date();
        var feed = xmlbuilder.create('gmall_user', {encoding: 'utf-8'}).att('date', d.toString())

        var offers = feed.ele('users')

        function createOffer(offers, item) {
            let offer = offers.ele('user')
            if(item.name){
                offer.ele('name', item.name).up();
            }

            offer.ele('email', item.email).up()
            offer.ele('hashedPassword', item.hashedPassword).up()
            offer.ele('salt', item.salt).up()
            d = new Date(item.date);
            offer.ele('date', d.toString()).up()
            offer.ele('subscription', item.subscribe).up()
            offer.ele('visits', item.visits).up()
            offer.ele('ordercount', item.order.count).up()
            offer.ele('ordersum', item.order.sum).up()


            if(item.profile){
                if(item.profile.fio){
                    offer.ele('fio', item.profile.fio).up()
                }
                if(item.profile.phone){
                    offer.ele('phone', item.profile.phone).up()
                }
                if(item.profile.city){
                    offer.ele('city', item.profile.city).up()
                }
                if(item.profile.cityId){
                    offer.ele('cityId', item.profile.cityId).up()
                }
                if(item.profile.address){
                    offer.ele('address', item.profile.address).up()
                }
            }

            offers.up()
        }


        try {
            items.forEach(function (item, idx) {
                //console.log(item.name)
                createOffer(offers, item);

            })

            fs.writeFile(filePath, feed.end({pretty: true}), (err) => {
                if (err) throw err;
                console.log('It\'s saved! downloadUsers');
            });
        } catch (err) {
            console.error(err);

        }
    })
}












