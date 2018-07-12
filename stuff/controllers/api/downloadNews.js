'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/shop',{db: {safe: true}});
// Bootstrap models
var path = require('path');
var modelsPath = path.join( __dirname, 'models' );
require( modelsPath + '/article.js' );




var xmlbuilder = require('xmlbuilder');

var fs = require('fs');


var Items=mongoose.model('Article');

downloadNews();

function downloadNews() {
    var photoHost = "http://tatiana-lux.com/";
    var filePath = './public/news.xml';
    Items.find().sort({'date':1}).exec(function (err, items) {
        //console.log(items)
        if (err) {
            return console.log(err)
        }
        var d = new Date();
        var feed = xmlbuilder.create('gmall_blog', {encoding: 'utf-8'}).att('date', d.toString())

        var offers = feed.ele('posts')

        function createOffer(offers, item) {
            let offer = offers.ele('post')
            let name = item.name;
            offer.ele('name', name).up()
            d = new Date(item.date);
            offer.ele('date', d.toString()).up()
            offer.ele('description', (item.desc) ? item.desc : '').up()
            if (item.descs.length) {
                item.descs.forEach(function (desc) {
                    offer.ele('description', desc).up()
                })

            }

            item.gallery.sort(function (a, b) {
                return a.index - b.index
            }).forEach(function (img, i) {
                offer.ele('picture', photoHost + img.img).up();
            })


            offers.up()
        }


        try {
            items.forEach(function (item, idx) {
                //console.log(item.name)
                createOffer(offers, item);
            })

            fs.writeFile(filePath, feed.end({pretty: true}), (err) => {
                if (err) throw err;
                console.log('It\'s saved! downloadNews');
            });
        } catch (err) {
            console.error(err);

        }
    })
}












