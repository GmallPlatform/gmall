'use strict';
angular.module('gmall.services')
    .factory('CreateContent', ['global',function(global){

        //**************************************************************************************
        function getHeader(user) {
            var s=
                '<table width="860px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 20px" border="0">'+
                '<tr width="100%" style="max-width:900px;">' +
                    // лого и название
                '<td width="50%" style=" padding:40px 20px"><a href="'+global.get('store').val.link+'">';
                    if(global.get('store').val.logo) {
                        s+='<img  style="width: 100px;" src="' + photoHost + '/' + global.get('store').val.logo + '"></br>'

                    }
                    if(global.get('store').val.name) {
                        s+='<span  style="width: 100px;" src="' + photoHost + '/' + global.get('store').val.name + '"></span>'
                    }
            s+='</a></td>';
            // телефон и емейл
            s+='<td width="50%"  style="text-align: right; padding:40px 20px">'
            if(global.get('store').val.seller.phone) {
                s+='<span>' +global.get('langOrder').val.phone+ '</span>'+
                    ': <a style="color:#666" href="tel:'+'+'+global.get('store').val.seller.phone+'"><span>'+'+' +global.get('store').val.seller.phone + '</span></a></br>'
            }
            if(global.get('store').val.feedbackEmail) {
                s += '<span>e-mail</span>'+
                    ': <a style="color:#666" href="mailto:'+global.get('store').val.feedbackEmail+'"><span>' + global.get('store').val.feedbackEmail + '</span></a>'
            }

            s+='</td></tr>';

            //переходы на сайт
            if(global.get('sections') && global.get('sections').val && global.get('sections').val[0]){
                s+='<table width="860px" cellpadding="0" cellspacing="0" style="max-width:900px;background-color: #000;border-collapse:collapse; border:1px solid #000;table-layout: fixed; padding: 0;margin: 20px">' +
                    '<td width="50%" style="background-color: #333;text-align: center; padding: 20px;border:1px solid #fff;">' +
                    '<a style="color: #fff; text-transform: uppercase" href="'+global.get('store').val.link+'/cabinet'+'"><span>'+global.get('langOrder').val.mainCabinet+'</span></a>'+
                    '</td>';
                s+='<td width="50%" style="background-color: #333;text-align: center; padding: 20px;border:1px solid #fff;">' +
                    '<a style="color: #fff; text-transform: uppercase" href="'+global.get('store').val.link+'/'+global.get('sections').val[0].url+'/category'+'"><span>'+global.get('lang').val.catalog+'</span></a>'+
                    '</td>';
                s+='</tr></table>'

                /*'<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px; font-size: 20px;"><h3>'+user+'</h3></td></tr>'+

                 '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+name+'</h2></td></tr>';*/
                s+=    '</table>';
            }

            return s;
        }
        function getFooter(){
            var s='<style>a{color:#ffffff;}a:hover{color:#ffffff;}</style><table width="860px" cellpadding="0" cellspacing="0" style="background-color:#333;margin: 20px;color: #000;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;" border="0">'+
                /*'<tr><td border="0" colspan="3" style="border:none; border-top:1px solid #cccccc ; padding:10px 0;vertical-align: top"></td></tr>'+*/
                /*'<tr><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td><td/><td/>'+*/
                /*'<td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td></tr>'+*/
                '<tr><td align="left" style="vertical-align: top; padding: 10px 20px"><span style="font-family:Tahoma; font-size:12px; color:#e8e8e8;">';
                    if(global.get('store').val.sn){
                        for(var key in global.get('store').val.sn){
                            if(global.get('store').val.sn[key].is){
                                s+='<a href="'+global.get('store').val.sn[key].link+'">'+
                                    '<img style="width: 24px; height: 24px;margin: 0 10px" src="'+global.get('store').val.link+'/views/template/img/icon/sn_grey/'+
                                    key+'.png">'
                                    +'</a>'
                            }
                        }

                    }
                    s+='</span></td>' +
                    '<td align="right" style="vertical-align: top; padding: 10px 20px"><span style="font-family:Tahoma; font-size:14px; color:#e8e8e8;">';
                        if(global.get('store').val.footer && global.get('store').val.footer.text){
                            s+=global.get('store').val.footer.text;
                        }

                        s+='</span></td>';
                    s+='<td align="right" style="vertical-align: top; padding: 10px 20px"><span style="font-family:Tahoma; font-size:14px; color:#e8e8e8;">';
                            if(global.get('store').val.footer && global.get('store').val.footer.text1){
                                s+=global.get('store').val.footer.text1;
                            }

                    s+='</span></td></tr></table>'
            return s
        }
        // ********************пустой контент
        function empty(){
            var s ='<h1>информация  отсутствует</h1>'
            return '<!DOCTYPE html><html><head><meta charset=utf-8/>' +
                '<style type="text/css">' +
                '@media only screen and (max-device-width:660px){.table-mobile{display:none !important;}}' +
                '</style>' +
                '</head><body onload="window.print()"><div style="max-width: 800px">' +s + '</div><body></html>';
        }
        //*************************** end empty*************************
        function getLink(t,u) {
            if(!t || !u){return null}
            var d = global.get('store').val.domain;
            console.log("global.get('store').val.domain",global.get('store').val.domain)
            switch(t){
                case 'stuffs':return d+'/group/category/'+u;
                case 'categories':return d+'/group/'+u;
                case 'brandTags':return d+'/group/category?brandTag='+u;
                case 'brands':return d+'/group/category?brand='+u;
                case 'filterTags':return d+'/group/category?queryTag='+u;
                case 'campaign':return d+'/camapign/'+u;
            }
        }
        function emailFromNews(item){
            var s=
                '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px"><a href="'+global.get('store').val.link+'"><img  style="width: 100px;" src="'+photoHost+'/'+global.get('store').val.logo+'"></a></td></tr>'+
                '<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px; font-size: 20px;"><h3>usernameforreplace</h3></td></tr>'+

                '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.name+'</h2></td></tr>';
            s+=    '</table>';


            s+='<table class="table-mobile" width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0 " border="0">';
            if(item.blocks && item.blocks.length){
                item.blocks.forEach(function (block) {
                    if(block.name){
                        if(block.type=='text2'){
                            s+='<tr width="100%" style="max-width:900px;">' +
                                '<td style="padding: 5px">' +
                                '<h3 style="text-align: center; color: :#333333; font: 22px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; text-transform: uppercase">'+((block.name)?block.name:'')+'</h3>' +
                                '</td>' +
                                '<td style="padding: 5px">' +
                                '<h3 style="text-align: center; color: :#333333; font: 22px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; text-transform: uppercase">'+((block.name1)?block.name1:'')+'</h3>' +
                                '</td>' +
                                '</tr>';
                        }else{
                            s+='<tr width="100%" style="max-width:900px;"><td colspan="2" style="padding: 5px"><h3 style="text-align: center; color: :#333333; font: 22px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; text-transform: uppercase">'+block.name+'</h3></td></tr>';
                        }


                    }
                    if(block.img){
                        s+='<tr width="100%" style="max-width:900px;"><td  colspan="2" width="100%" style=" padding: 5px" >' ;
                        if(block.link){
                            s+= '<a href="'+global.get('store').val.link+block.link+'" style="cursor: pointer;">'
                        }

                        s+= '<img alt="" style="width: 100%;margin-bottom: 10px; display: block" src="'+photoHost+'/'+block.img+'">';
                        if(block.link){
                            s+= '</a>'
                        }

                        s+= '</td></tr>';

                    }
                    //console.log(block)
                    if(block.desc){
                        if(block.type=='text2'){
                            //console.log(block)
                            s+='<tr width="100%" style="max-width:900px;">' +
                                '<td style="padding: 5px">' +
                                '<span style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+((block.desc)?block.desc:'')+'</span>' +
                                '</td>' +
                                '<td style="padding: 5px">' +
                                '<span style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+((block.desc1)?block.desc1:'')+'</span>' +
                                '</td>' +
                                '</tr>';
                        }else{
                            s+='<tr width="100%" style="max-width:900px;"><td colspan="2" style="padding: 5px"><span style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+block.desc+'</span></td></tr>';
                        }

                    }

                    if(block.imgs && block.imgs.length){
                        for (var i=0,l=block.imgs.length;i<l;i += 2){
                            //console.log(i,!!block.imgs[i])
                            s+='<tr>';
                            var link1;
                            if(block.imgs[i].link){
                                if(block.imgs[i].link.indexOf('http')<0){
                                    link1=global.get('store').val.link+block.imgs[i].link;
                                }else{
                                    link1=block.imgs[i].link;
                                }
                            }else{
                                if(block.imgs[i].url){
                                    link1=getLink(block.type,block.imgs[i].url)
                                }

                            }
                            s+='<td style="padding: 5px; text-align: center;vertical-align: top">';
                            if(link1){
                                s+='<a href="'+link1+'">';
                            }

                            s+='<img alt="" style="width: 100%; display: block" src="'+photoHost+'/'+block.imgs[i].img+'">';
                            if(block.imgs[i].name){
                                s+='<span style="font-weight: 700; color: #666666; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+block.imgs[i].name+'</span>' ;
                            }

                            if(link1){
                                s+='</a>';
                            }
                            s+='</td>';
                            if(block.imgs[i+1])   {
                                //console.log(i+1)
                                var link2;
                                if(block.imgs[i+1].link){
                                    if(block.imgs[i].link.indexOf('http')<0){
                                        link2=global.get('store').val.link+block.imgs[i+1].link;
                                    }else{
                                        if(block.imgs[i+1].link){
                                            link2=block.imgs[i+1].link;
                                        }

                                    }
                                }else{
                                    link1=getLink(block.type,block.imgs[i+1].url)
                                }
                                s+='<td style="padding: 5px; text-align: center;vertical-align: top">';
                                if(link2){
                                    s+='<a href="'+link2+'">';
                                }

                                s+='<img alt="" style="width: 100%; display: block" src="'+photoHost+'/'+block.imgs[i+1].img+'">';
                                if(block.imgs[i+1].name){
                                    s+='<span style="font-weight: 700; color: #666666; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+block.imgs[i+1].name+'</span>' ;
                                }
                                if(link2){
                                    s+='</a>';
                                }
                                s+='</td>';
                            }else{
                                s+='<td style="padding: 5px; text-align: center;vertical-align: top"></td>'
                            }

                            s+='</tr>'
                        }
                    }
                })
            }
            s+='</table>';



            s+='<table width="900px" cellpadding="0" cellspacing="0" style="color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr><td border="0" colspan="2" style="border:none; border-top:#cccccc 5px solid;"></td></tr>'+
                /*'<tr><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td><td/><td/>'+*/
                /*'<td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td></tr>'+*/
                '<tr><td align="right" style="vertical-align: top"><span style="font-family:Tahoma; font-size:12px; color:#404040;">';
            if(global.get('store').val.sn){
                for(var key in global.get('store').val.sn){
                    if(global.get('store').val.sn[key].is){
                        s+='<a href="'+global.get('store').val.sn[key].link+'">'+
                               '<img style="width: 24px; height: 24px;margin: 15px 5px" src="'+global.get('store').val.link+'/views/template/img/icon/sn_grey/'+
                            key+'.png">'
                            +'</a>'
                    }
                }

            }
            s+='</span>' +
                '<td align="right"><span style="font-family:Tahoma; font-size:14px; color:#404040;">';
            if(global.get('store').val.footer && global.get('store').val.footer.text){
                s+=global.get('store').val.footer.text;
            }
            s+='</span></td></tr>'+
                '</table>'
            return s;
            return '<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="http://gmall.io/bower_components/bootstrap/dist/css/bootstrap.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + s + '</div>' +
                '</html>';
        }
        function emailBonus(stuffs){
            //console.log(stuffs)
            var nameEmail='бонусы'
            var item;

            var s=
                '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr width="100%" style="max-width:600px;"><td style="text-align: center; padding: 5px"><img alt="посмотреть на сайте" style="width: 100px;" src="'+photoHost+'/'+global.get('store').val.logo+'"></td></tr>'+
                '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+nameEmail+'</h2></td></tr>';


            s+='</table>';
            stuffs.forEach(function(stuff){
                item=stuff;
                if(item.imgs && item.imgs.length){
                    s+='<table class="table-mobile" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">';
                    for (var i=0,l=item.imgs.length;i<l;i++){
                        if(item.imgs[i].name){
                            s+='<tr width="100%" style="max-width:600px;">' +
                                '<td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.imgs[i].name+'</p></td>' +
                                '</tr>';
                        }


                        s+='<tr><td style="padding: 5px;">'+
                            '<img alt="бонусный купон"  style="width: 100%; display: block"   src="'+photoHost+'/'+item.imgs[i].img+'"></td>';

                        s+='</tr>'
                        if(item.imgs[i].desc){
                            s+='<tr width="100%" style="max-width:600px;"><td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.imgs[i].desc+'</p></td></tr>';
                        }

                    }
                    s+='</table>';
                }
            })





            s+='<table width="600px" cellpadding="0" cellspacing="0" style="color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr><td border="0" colspan="2" style="border:none; border-top:#cccccc 5px solid;"></td></tr>'+
                '<tr><td align="left" style="vertical-align: top"><span style="font-family:Tahoma; font-size:12px; color:#404040;">';
            if(global.get('store').val.sn){
                for(var key in global.get('store').val.sn){
                    if(global.get('store').val.sn[key].is){
                        s+='<a href="'+global.get('store').val.sn[key].link+'">'+
                            '<img style="width: 24px; height: 24px;margin: 15px 5px" src="'+global.get('store').val.link+'/views/template/img/icon/sn_natur/'+
                            key+'.png">'
                            +'</a>'
                    }
                }

            }
            s+='</span>' +
                '<td align="right"><span style="font-family:Tahoma; font-size:16px; color:#404040;">';
            if(global.get('store').val.footer && global.get('store').val.footer.text){
                s+=global.get('store').val.footer.text;
            }
            s+='</span></td></tr>'+
                /*'<tr><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td><td/><td/><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td></tr>'+*/
                '</table>'
            //return s;
            return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><div>' + s + '</div></html>';
        }
        //************************************************************************************
        function orderNote(order){
            //console.log(order)
            var s='';
            s +='<h3 class="order-name">'+global.get('langOrder').val.order+' № '+order.num+'</h3> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll');
            s+='<p>'+global.get('langOrder').val.sum+' '+(order.paySum).toFixed(2)+' '+order.currency+'</p>';
            return s;
        }
        function dateTimeNote(entry){
            //console.log(order)
            var s='';
            s +='<h3 class="order-name">'+global.get('langOrder').val.dateTime+'</h3> '+global.get('langOrder').val.onn+' '+entry.dateForNote;
            s+='<p>'+global.get('store').val.texts.masterName[global.get('store').val.lang]+' - '+entry.masterName+'</p>';
            s+='<p>'+entry.service.name+'</p>';
            return s;
        }
        function dateTimeCancelNote(entry){
            //console.log(order)
            var s='';
            s +='<h3 class="order-name">'+global.get('langOrder').val.dateTime+'<span style="color:red"> '+global.get('langOrder').val.removed+'</span></h3> '+global.get('langOrder').val.onn+' '+entry.dateForNote;
            s+='<p>'+global.get('store').val.texts.masterName[global.get('store').val.lang]+' - '+entry.masterName+'</p>';
            s+='<p>'+entry.service.name+'</p>';
            s+='<p>'+entry.user.name+'- '+entry.user.phone+'</p>';
            return s;
        }
        // html контент для ордера
        function order(order,invoice,commentPrint){
            //console.log(global.get('groups').val)
            var lang = global.get('store').val.lang
            var texts=global.get('store').val.texts;
            var orderMailText=(texts.orderMailText && texts.orderMailText[lang])?texts.orderMailText[lang]:'';

            //console.log(order.status,texts.orderMailText[lang])
            var name =global.get('langOrder').val.order+' № '+order.num+'<small> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'</small>'
            var user = global.get('user').val.profile.fio|| global.get('user').val.name;
            var status = global.get('langOrder').val.entered.toUpperCase();
            if(order.status==2){
                status =global.get('langOrder').val.accepted.toUpperCase();
            }else if(order.status==3){status =global.get('langOrder').val.statuspaid.toUpperCase();
            }else if(order.status==4){status =global.get('langOrder').val.statussent.toUpperCase();
            }else if(order.status==5){status =global.get('langOrder').val.statusdelivered.toUpperCase();}
            user =global.get('langOrder').val.hello + ', '+user+'!';
            var s= getHeader(name)

            s+='<table width="900px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
            '<tr  width="100%"><td colspan="2" style="padding: 20px;"><h3>'+user+'</h3></td></tr>';
            if(order.status==1){
                s+='<tr  width="100%"><td colspan="2" style="padding: 20px"><p>'+orderMailText+'</p></td></tr>';
            }


            s+='<tr style="max-width:900px;"><td width="50%" style="max-width:900px;padding: 10px 20px;font-size: 16px;vertical-align: top">'+
                '<h4 style="font-weight: bold">'+status+'</h4>'+
                '<h4 style="font-weight: bold;margin-bottom: 20px">'+global.get('langOrder').val.order.toUpperCase()+' № '+order.num+'</h4>'+
                global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'';
            if(commentPrint && order.comment){
                s +='<div><h4 style="font-weight: bold">'+global.get('langOrder').val.comments+'</h4><p>'+order.comment+'</p></div>';
            }
            if(invoice && order.payInfo){
                s +='<h4 style="font-weight: bold">'+global.get('langOrder').val.forpayment+'</h4>';
                s +='<p>'+order.payInfo+'</p>';
            }
            if(invoice){
                console.log(order.checkOutLiqpayHtmlIs)
                if(order.checkOutLiqpayHtmlIs){
                    s+='<p>'+order.checkOutLiqpayHtml+'</p>'
                }
            }

            s+='</td>';
            s+= '<td style=" padding: 10px 20px; font-size: 16px;vertical-align: top;">'

            /*if(order.seller.name){
                s+='<p>'+global.get('langOrder').val.seller+'<strong>'+order.seller.name+'</strong></p>';
            }*/

            // данные покупателя
            s +='<h4 style="font-weight: bold">'+global.get('langOrder').val.customerdata+'</h4>';
            s +='<p> e-mail - '+order.user.email+'</p>';
            if(order.profile.fio){
                s +='<p> '+global.get('langOrder').val.name+'  - '+order.profile.fio+'</p>';
            }
            if(order.profile.phone){
                s +='<p> '+global.get('langOrder').val.phone+' - '+order.profile.phone+'</p>';
            }
            if(order.profile.city){
                s +='<p> '+global.get('langOrder').val.city+'  - '+order.profile.city+'</p></div>';
            }

            s+=    '</td></tr></table>';


            /*s +='<div class="container"><div class="col-lg-10 col-lg-offset-1"><div class="col-lg-6">'+
                '<h3>'+global.get('langOrder').val.order+' № '+order.num+'</h3> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'<br/>';*/

            s +='<table style="margin: 20px" width="860px" cellspacing="0" cellpadding="5" border="1px">';
            s+= '<thead><tr><th style="padding: 10px">#</th><th style="padding: 10px">'+global.get('langOrder').val.title+'</th><th class="text-center" style="padding: 10px">'+global.get('langOrder').val.species+'</th><th class="text-center" style="padding: 10px">'+global.get('langOrder').val.price+'</th>';
            s+='<th class="text-center style="padding: 10px">'+global.get('langOrder').val.quantity+'</th><th class="text-center" style="padding: 10px">'+global.get('langOrder').val.sum+'</th></tr></thead>';

            s += '<tbody>';
            var cart = order.cart.stuffs;
            for (var j=0,lj=cart.length;j<lj;j++){
                var good =cart[j];
                s +='<tr><td style="padding: 10px">'+(j+1)+'</td><td style="padding: 10px"> '+good.name+' '+((good.artikul)?good.artikul:'')+'</td>' +
                    '<td class="text-center" style="padding: 10px">'+((good.sortName)?good.sortName:'')+
                    '</td><td class="text-center" style="padding: 10px">'+(order.kurs*good.cena).toFixed(2)+' '+order.currency+
                    '</td><td class="text-center" style="padding: 10px">'+good.quantity+'</td><td class="text-center">'+ ( order.kurs*good.sum).toFixed(2)+' '+order.currency+
                    '</td></tr>';
            }
            s +='</tbody>';
            s+='<tbody class="cart-item-total">';
            s +='<tr><th colspan="4" style="padding: 10px">'+global.get('langOrder').val.sum+'</th>'+
                '<th class="text-center" style="padding: 10px">'+order.getTotalQuantity()+'</th><th class="text-center">'+(order.kurs*((order.sum0)?order.sum0:order.sum)).toFixed(2)+' '+order.currency+'</th></tr>';
            if(order.discount){
                s +='<tr><th colspan="4" style="padding: 10px">'+global.get('langOrder').val.withdiscount+'</th>';
                s +=(order.sum<order.sum0)?'<th class="text-center">'+Math.round((1-order.sum/order.sum0)*100)+'%</th>':'<th class="text-center"></th>';
                s +='<th class="text-center" style="padding: 10px">'+(order.kurs*order.sum).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.coupon && order.coupon._id){
                s +='<tr><th colspan="4" style="padding: 10px">'+global.get('langOrder').val.basedcoupon+'</th><th></th>'+
                    '<th class="text-center" style="padding: 10px">'+(order.kurs*order.getCouponSum()).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            var totalDiscont=order.getTotalDiscount();
            /*if(totalDiscont){
                s +='<tr><th colspan="2">'+'сумма по учетной цене '+(order.priceSum).toFixed(2)+' '+order.currency +
                    '</th><th colspan="2">'+global.get('langOrder').val.totalDiscont+'</th><th></th>'+
                    '<th class="text-center">'+totalDiscont+'% '+'</th></tr>';
            }*/
            if(order.shipCost){
                s +='<tr><th colspan="4">'+global.get('langOrder').val.delivery+'</th><th></th>'+
                    '<th class="text-center">'+(order.shipCost).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.totalPay){
                s +='<tr><th colspan="4">'+global.get('langOrder').val.paid+'</th><th></th>'+
                    '<th class="text-center">'+(order.totalPay).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.paySum!=order.getCouponSum()){
                s +='<tr><th colspan="4">'+global.get('langOrder').val.totaltopay+'</th><th></th>'+
                    '<th class="text-center">'+(order.paySum).toFixed(2)+' '+order.currency+'</th></tr>';
            }


            s +='</tbody></table></div></div></div>';
            s += getFooter()
            return '<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="http://gmall.io/bower_components/bootstrap/dist/css/bootstrap.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + s + '</div>' +
                '</html>';
        }
        // *************************end order
        //**************************************************************************************
        //**************************************************************************************
        // ********************информация по доставке в ордере
        function shipInfo(order,ship){
            if (!ship.ttn || !ship.info ) return;
            var s = '<h3>'+global.get('langOrder').val.aboutdelivery+' ' +'</h3>';
                '<p>'+global.get('langOrder').val.onawarrant+' №'+order.num+' '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'</p>';
            s+='<strong>'+global.get('langOrder').val.waybill+' - '+ship.ttn||''+'</strong>'+' '+global.get('langOrder').val.from+' '+moment(ship.date ).format('LL')+'</p>';
            if (ship.info){
                s+='<p>'+ship.info.substring(0,250)+'</p>';
            }
            if (ship.sum){
                s+='<strong>'+(ship.sum).toFixed(2)+' '+order.currency+'</strong>';
            }
            if (ship.stuffs && ship.stuffs.length){
                s+='<strong>  '+ship.stuffs.length+' ед.</strong>';
            }

            return s;
        }

        function shipInfoNote(order){
            var s='';
            s +='<h3>'+global.get('langOrder').val.order+' № '+order.num+'</h3><br/> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'';
            if(order.user.profile){
                if(order.user.profile.fio){
                    s+="<p>"+order.user.profile.fio+"</p>";
                }else{
                    s+="<p>"+order.user.name+"</p>";
                }
                if(order.user.profile.phone){
                    s+="<p>"+order.user.profile.phone+"</p>";
                }
            }

            s+='<p>'+global.get('langOrder').val.totaltopay+' <strong>'+(order.paySum).toFixed(2)+' </strong>'+order.currency+'</p>';
            s+='<p>'+global.get('langOrder').val.sentshipinfo+'</p>'
            return s;
        }

        //*************************** end ShipInfo***************************************
        //*******************************информация о платеже в ордере
        function payInfo(order,pay){
            if (!pay.sum ) return;
            var s = '<h3>'+global.get('langOrder').val.makepayment+' ' + '</h3>';
            s+='<p>'+global.get('langOrder').val.onawarrant+' №'+order.num+'<br> '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'</p>';
            s+='<p><strong>'+(pay.sum).toFixed(2)+' '+order.currency+'</strong></p>'+' '+moment(pay.date ).format('LL');
            if (pay.info){
                s+='<p>'+pay.info.substring(0,150)+'</p>';
            }
            return s;
        }
        //*********************************end PayInfo*************************************
        //****************************************************************************************
        //**************************************************************************************
        // ********************подтверждение ордера
        function acceptedInfo(order){
            var s = '<h3>'+global.get('langOrder').val.byorders+' №'+order.num+'</h3>';
            s+=' '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'.';
            if(order.user.profile){
                if(order.user.profile.fio){
                    s+="<p>"+order.user.profile.fio+"</p>";
                }else{
                    s+="<p>"+order.user.name+"</p>";
                }
                if(order.user.profile.phone){
                    s+="<p>"+order.user.profile.phone+"</p>";
                }
            }
            s+='<p><strong>'+global.get('langOrder').val.accepted+' </strong></p>';
            return s;
        }
        //*********************************end acceptedInfo*************************************
        //****************************************************************************************
        //**************************************************************************************
        // ********************информация по доставке в ордере
        function orderShipInfo(order){
            //console.log(order.seller)
            var shipDetail= order.shipDetail;

            var lang = global.get('store').val.lang
            var texts=global.get('store').val.texts;

            //console.log(order.status,texts.orderMailText[lang])
            var name =global.get('langOrder').val.order+' № '+order.num+'<small> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'</small>'
            var user = global.get('user').val.profile.fio|| global.get('user').val.name;
            var status = global.get('langOrder').val.entered.toUpperCase();
            if(order.status==2){
                status =global.get('langOrder').val.accepted.toUpperCase();
            }else if(order.status==3){status =global.get('langOrder').val.statuspaid.toUpperCase();
            }else if(order.status==4){status =global.get('langOrder').val.statussent.toUpperCase();
            }else if(order.status==5){status =global.get('langOrder').val.statusdelivered.toUpperCase();}
            user =global.get('langOrder').val.hello + ', '+user+'!';
            var s= getHeader(name)

            s+='<table width="900px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr  width="100%"><td colspan="2" style="padding: 20px;"><h3>'+user+'</h3></td></tr></table>';

            s += '<h3>'+global.get('langOrder').val.aboutdelivery+'' +'</h3>';
            s+='<p>'+global.get('langOrder').val.onawarrant+' №'+order.num+'<br> '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'</p>';
            s+='<p>'+global.get('langOrder').val.seller+' <strong>'+order.seller.name+'</strong></p>';
            s+='<p>'+global.get('langOrder').val.site+' <strong>'+order.domain+'</strong></p>';

            if(shipDetail && shipDetail.length){
                s +='<table width="100%" cellspacing="0" cellpadding="5" border="1px">';
                s+= '<thead><tr><th>'+global.get('langOrder').val.title+'</th><th>'+global.get('langOrder').val.where+'</th><th>'+global.get('langOrder').val.waybill+'</th><th>'+global.get('langOrder').val.date+'</th><th>'+global.get('langOrder').val.sum+'</th>';
                shipDetail.forEach(function(ship){

                    s+="<tr><td>";
                    ship.stuffs.forEach(function(stuff){
                        s+='<div style="width:80%;float:left">'+stuff.name+'</div><div style="float:left">'+stuff.qty+((stuff.unitOfMeasure)?(' '+stuff.unitOfMeasure):'')+'</div><br/>'
                    })
                    s+="</br>"
                    s+=ship.qty
                    /*s+=''+global.get('langOrder').val.numberofunits+' <strong>'+ship.stuffs.length+'</strong>';*/
                    s+="</td><td>"+(ship.info||'')+"</td>";
                    s+="<td>"+(ship.ttn||'')+"</td>";
                    s+="<td>"+moment(ship.date).format("LLL")+"</td>";
                    s+="<td>"+(ship.sum||0).toFixed(2)+" "+order.currency+"</td></tr>";
                })
                s+="</table></br></br>";
            }else{
                s+='<h1>'+global.get('langOrder').val.infisnot+'</h1>'
            }
            s += getFooter()
            return '<!DOCTYPE html><html><head><meta charset=utf-8/>' +
                '</head><body onload="window.print()"><div>' +s + '</div><body></html>';
        }
        //*************************** end orderSPShipInfo*************************
        function invoiceInfo(order){
            var s='';
            s +='<h3>'+global.get('langOrder').val.order+' № '+order.num+'</h3><br/> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'';
            if(order.user.profile){
                if(order.user.profile.fio){
                    s+="<p>"+order.user.profile.fio+"</p>";
                }else{
                    s+="<p>"+order.user.name+"</p>";
                }
                if(order.user.profile.phone){
                    s+="<p>"+order.user.profile.phone+"</p>";
                }
            }

            s+='<p>'+global.get('langOrder').val.totaltopay+' <strong>'+(order.paySum).toFixed(2)+' </strong>'+order.currency+'</p>';
            s+='<p>'+global.get('langOrder').val.sentthepost+'</p>'
            //console.log(s)
            /*if(order.payInfo){
                s +='<p>Данные для оплаты</p>';
                s +='<p>'+order.payInfo+'</p>';
            }*/
            return s;
        }
        function call(number){
            console.log(number)
            //number=number.substring(0,20)
            var s='';
            s+='<h3>'+number+'</h3>'
            s+='<p>'+global.get('langOrder').val.requestacallback+'</p>'
            s+='<p>'+moment().format('LLLL')+'</p>'
            return s;
        }



        return {
            empty:empty,
            order : order,
            orderNote:orderNote,
            dateTimeNote:dateTimeNote,
            shipInfo:shipInfo,
            payInfo:payInfo,
            invoiceInfo:invoiceInfo,
            acceptedInfo:acceptedInfo,
            orderShipInfo:orderShipInfo,
            call:call,
            emailFromNews:emailFromNews,
            emailBonus:emailBonus,
            shipInfoNote:shipInfoNote,
            dateTimeCancelNote:dateTimeCancelNote

        }
    }])