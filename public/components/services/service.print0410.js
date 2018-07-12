'use strict';
angular.module('gmall.services')
    .factory('CreateContent', ['global',function(global){
        //**************************************************************************************
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
        function emailFromNews(item){
            var s=
                '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px"><img alt="посмотреть на сайте" style="width: 100px;" src="'+photoHost+'/'+global.get('store').val.logo+'"></td></tr>'+
                '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.name+'</h2></td></tr>';
            if(item.img){
                s+='<tr width="100% style="max-width:900px;""><td  width="100%" style=" padding: 5px" ><a href="" style="cursor: pointer;">'+
                '<img alt="" style="width: 100%;margin-bottom: 10px; display: block" src="'+photoHost+'/'+item.img+'"></a></td></tr>';

            }
            s+='<tr width="100%" style="max-width:900px;"><td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.desc+'</p></td></tr>';
            if(item.video){
                s+='<tr><td style=" padding: 5px">'+
                    item.video+
                    '</td></tr>';
            }
            s+='<tr width="100%" style="max-width:900px;"><td style="padding: 5px"><p style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.desc1+'</p></td></tr></table>';
            s+='<table class="table-mobile" width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0 " border="0">';


            for (var i=0,l=item.imgs.length;i<l;i += 2){

                //console.log(item.imgs[i])

                s+='<tr><td style="padding: 5px;">'+
                    '<a href="'+item.imgs[i].link+'"> <img alt="посмотреть на сайте"  style="width: 100%; display: block"   src="'+photoHost+'/'+item.imgs[i].img+'"> </a></td>';
                 if(item.imgs[i+1])   {
                     s+='<td style="padding: 5px;">'+
                         '<a href="'+item.imgs[i+1].link+'"> <img  alt="посмотреть на сайте" style="width: 100%; display: block"  src="'+photoHost+'/'+item.imgs[i+1].img+'"> </a></td>';
                 }

                    s+='</tr>'
            }
            s+='</table>';

            /*item.imgs.forEach(function(image){
                s+='<tr><td width="50%" style="padding: 20px 50px;">'+
                    '<a href="'+image.link+'"> <img style="width: 100%;" src="'+photoHost+'/'+image.img+'"> </a></td></tr>'
            })*/
            s+='<table width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
            '<tr><td style=" padding: 5px"><p style="color: color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.desc2+'</p></td></tr></table>';
            s+='<table width="100%" cellpadding="0" cellspacing="0" style="max-width:900px; color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">';
            for (var i=0,l=item.stuffs.length;i<l;i += 2){
                s+='<tr><td style="padding: 5px; text-align: center;vertical-align: top">'+
                    '<a href="'+global.get('store').val.domain+'/group/category/'+item.stuffs[i].url+'">'+
                    '<img alt="" style="width: 100%; display: block" src="'+photoHost+'/'+item.stuffs[i].gallery[0].thumb+'">'+
                    '<span style="font-size: 18px; color: #0e9da2; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.stuffs[i].name+'</span></a></td>';
                if(item.stuffs[i+1])   {
                    s+='<td style="padding: 5px;text-align: center;vertical-align: top">'+
                        '<a alt="" href="'+item.stuffs[i+1].link+'"> <img  style="width: 100%; display: block"  src="'+photoHost+'/'+item.stuffs[i+1].gallery[0].thumb+'"> ' +
                        '<span style="font-size: 18px; color: #0e9da2; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.stuffs[i+1].name+'</span></a></td>';
                }
                /*if(item.stuffs[i+2])   {
                    s+='<td style="padding: 5px;text-align: center;vertical-align: top">'+
                        '<a alt="" href="'+item.stuffs[i+2].link+'"> <img  style="width: 100%; display: block"  src="'+photoHost+'/'+item.stuffs[i+2].gallery[0].thumb+'"> ' +
                        '<span style="font-size: 18px; color: #0e9da2; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.stuffs[i+2].name+'</span></a></td>';
                }
                if(item.stuffs[i+3])   {
                    s+='<td style="padding: 5px;text-align: center;vertical-align: top">'+
                        '<a alt="" href="'+item.stuffs[i+3].link+'"> <img  style="width: 100%; display: block"  src="'+photoHost+'/'+item.stuffs[i+3].gallery[0].thumb+'"> ' +
                        '<span style="font-size: 18px; color: #0e9da2; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.stuffs[i+3].name+'</span></a></td>';
                }
                s+='</tr>'*/
            }
           /* item.stuffs.forEach(function(stuff){
                s+='<tr><td style="padding: 20px 50px; text-align: center">'+
                    '<a href="'+global.get('store').val.domain+'/group/category/'+stuff.url+'">'+
                    '<img style="width: 100%" src="'+photoHost+'/'+stuff.gallery[0].thumb+'">'+
                    '<span style="font-size: 18px">'+stuff.name+'</span></a></td></tr>'
            })*/
            s+='</table>';
            s+='<table width="900px" cellpadding="0" cellspacing="0" style="color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0 5%" border="0">'+
                '<tr><td border="0" colspan="2" style="border:none; border-top:#cccccc 5px solid;"></td></tr>'+
                /*'<tr><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td><td/><td/>'+*/
                /*'<td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td></tr>'+*/
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
                '<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px"><img alt="посмотреть на сайте" style="width: 100px;" src="'+photoHost+'/'+global.get('store').val.logo+'"></td></tr>'+
                '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+nameEmail+'</h2></td></tr>';


            s+='</table>';
            stuffs.forEach(function(stuff){
                item=stuff;
                if(item.imgs && item.imgs.length){
                    s+='<table class="table-mobile" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0 " border="0">';
                    for (var i=0,l=item.imgs.length;i<l;i++){
                        if(item.imgs[i].name){
                            s+='<tr width="100%" style="max-width:900px;"><td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.imgs[i].name+'</p></td></tr>';
                        }


                        s+='<tr><td style="padding: 5px;">'+
                            '<img alt="бонусный купон"  style="width: 100%; display: block"   src="'+photoHost+'/'+item.imgs[i].img+'"></td>';

                        s+='</tr>'
                        if(item.imgs[i].desc){
                            s+='<tr width="100%" style="max-width:900px;"><td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.imgs[i].desc+'</p></td></tr>';
                        }

                    }
                    s+='</table>';
                }
            })





            s+='<table width="600px" cellpadding="0" cellspacing="0" style="color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0 5%" border="0">'+
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
        /*function emailFromNews(item){
            var s=
                '<div style="padding: 30px;width: 100%; max-width: 1200px">'+
                    '<div style="text-align: center; width: 100%;">'+
                        '<img style="width: 70px;display: inline-block;" src="'+photoHost+'/'+global.get('store').val.logo+'">'+
                    '</div></div>'+

                    '<div>'+
                        '<h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center">'+item.name+'</h2>'+
                    '</div>';
            if(item.img){
                s+='<div>'+
                    '<a href="" style="cursor: pointer;">'+
                    '<img style="width: 100%;margin-bottom: 20px;" src="'+photoHost+'/'+item.img+'">'+
                    '</a>'+
                    '</div>';
            }
            s+='<div>'+

                '</div>';


            s+='<div style="clear: both;"><p style="text-align: justify; font-size: 18px">'+item.desc+'</p> </div>';
            if(item.video){
                s+= '<div>'+
                    item.video+
                    '</div>';
            }

            s+='<div style="clear: both;"><p  style="text-align: justify; font-size: 18px">'+item.desc1+'</p> </div>';
            item.imgs.forEach(function(image){
                s+='<div style="width: 42%; margin: 20px 2%; float: left">'+
                    '<a href="'+image.link+'"> <img style="width: 100%; float: left" src="'+photoHost+'/'+image.img+'"> </a> </div>'
            })

            s+='<div style="clear: both;"><p  style="text-align: justify; font-size: 18px">'+item.desc2+'</p> </div>';
            item.stuffs.forEach(function(stuff){
                s+='<div style="width: 42%; margin: 20px 2%; float: left; text-align: center">'+
                        '<a href="'+global.get('store').val.domain+'/group/category/'+stuff.url+'">'+
                        '<img style="width: 100%" src="'+photoHost+'/'+stuff.gallery[0].thumb+'">'+
                    '<span style="font-size: 18px">'+stuff.name+'</span></a></div>'
            })

            s+=     '<div style="clear: both"></div>'+
                '</div>'
            
            return s;
            return '<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="http://gmall.io/bower_components/bootstrap/dist/css/bootstrap.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + s + '</div>' +
                '</html>';
        }*/
        //************************************************************************************
        function orderNote(order){
            //console.log(order)
            var s='';
            s +='<h3>ОРДЕР № '+order.num+'</h3> от '+moment(order.date).format('lll');
            s+='<p>сумма '+(order.paySum).toFixed(2)+' '+order.currency+'</p>';
            return s;
        }
        // html контент для ордера
        function order(order,invoice){
            //console.log(order.user)
            var s='';
            s +='<div class="container"><div class="row"><div class="col-lg-8">'+
                '<h3>ОРДЕР № '+order.num+'</h3> от '+moment(order.date).format('lll')+'<br/>';
            if(order.seller.name){
                s+='<p>продавец <strong>'+order.seller.name+'</strong></p>';
            }
            if(invoice && order.payInfo){
                s +='<p>ДАННЫЕ ДЛЯ ОПЛАТЫ</p>';
                s +='<p>'+order.payInfo+'</p>';
            }
            //console.log(order.user)
            if(!invoice){
                // данные покупателя
                s +='<p>ДАННЫЕ ЗАКАЗЧИКА</p>';
                s +='<p> email - '+order.user.email+'</p>';
                if(order.profile.fio){
                    s +='<p> Имя  - '+order.profile.fio+'</p>';
                }
                if(order.profile.phone){
                    s +='<p> Телефон - '+order.profile.phone+'</p>';
                }
                if(order.profile.city){
                    s +='<p> Город  - '+order.profile.city+'</p>';
                }
            }
            s +='<table width="100%" cellspacing="0" cellpadding="5" border="1px">';
            s+= '<thead><tr><th>#</th><th>наименование</th><th class="text-center">разновидность</th><th class="text-center">цена</th>';
            s+='<th class="text-center">количество</th><th class="text-center">сумма</th></tr></thead>';

            s += '<tbody>';
            var cart = order.cart.stuffs;
            for (var j=0,lj=cart.length;j<lj;j++){
                var good =cart[j];
                s +='<tr><td>'+(j+1)+'</td><td> '+good.name+' '+((good.artikul)?good.artikul:'')+'</td>' +
                    '<td class="text-center">'+((good.sortName)?good.sortName:'')+
                    '</td><td class="text-center">'+(order.kurs*good.cena).toFixed(2)+' '+order.currency+
                    '</td><td class="text-center">'+good.quantity+'</td><td class="text-center">'+ ( order.kurs*good.sum).toFixed(2)+' '+order.currency+
                    '</td></tr>';
            }
            s +='</tbody>';
            s+='<tbody class="cart-item-total">';
            s +='<tr><th colspan="4">сумма</th>'+
                '<th class="text-center">'+order.getTotalQuantity()+'</th><th class="text-center">'+(order.kurs*(order.sum0)).toFixed(2)+' '+order.currency+'</th></tr>';
            if(order.discount && (order.discount.type==6 ||order.discount.type==7)){
                s +='<tr><th colspan="4">сумма с учетом скидки</th>';
                s +=(order.sum<order.sum0)?'<th class="text-center">'+Math.round((1-order.sum/order.sum0)*100)+'%</th>':'<th class="text-center"></th>';
                s +='<th class="text-center">'+(order.kurs*order.sum).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.coupon && order.coupon._id){
                s +='<tr><th colspan="4">сумма с учетом купона</th><th></th>'+
                    '<th class="text-center">'+(order.kurs*order.getCouponSum()).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.shipCost){
                s +='<tr><th colspan="4">доставка</th><th></th>'+
                    '<th class="text-center">'+(order.shipCost).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.totalPay){
                s +='<tr><th colspan="4">оплачено</th><th></th>'+
                    '<th class="text-center">'+(order.totalPay).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            s +='<tr><th colspan="4">итого к оплате</th><th></th>'+
                '<th class="text-center">'+(order.paySum).toFixed(2)+' '+order.currency+'</th></tr>';

            s +='</tbody></table></div></div></div>';
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
            var s = '<h3>ИНФОРМАЦИЯ О ДОСТАВКЕ ' +'</h3>';
                '<p>по ордеру №'+order.num+' от '+moment(order.date ).format('lll')+'</p>';
            s+='<strong>ТТН - '+ship.ttn||''+'</strong>'+' от '+moment(ship.date ).format('LL')+'</p>';
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
        //*************************** end ShipInfo***************************************
        //*******************************информация о платеже в ордере
        function payInfo(order,pay){
            if (!pay.sum ) return;
            var s = '<h3>ПРОИЗВЕДЕНА ОПЛАТА ' + '</h3>';
            s+='<p>по ордеру №'+order.num+'<br> от '+moment(order.date ).format('lll')+'</p>';
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
            var s = '<h3>ЗАКАЗ ПО ОРДЕРУ №'+order.num+'</h3>';
            s+=' от '+moment(order.date ).format('lll')+'.';
            s+='<p><strong> ПРИНЯТ</strong></p>';
            return s;
        }
        //*********************************end acceptedInfo*************************************
        //****************************************************************************************
        //**************************************************************************************
        // ********************информация по доставке в ордере
        function orderShipInfo(order){
            //console.log(order.seller)
            var shipDetail= order.shipDetail;
            var s = '<h3>ИНФОРМАЦИЯ О ДОСТАВКЕ ' +'</h3>';
            s+='<p>по ордеру №'+order.num+'<br> от '+moment(order.date ).format('lll')+'</p>';
            s+='<p>продавец <strong>'+order.seller.name+'</strong></p>';
            s+='<p>сайт <strong>'+order.domain+'</strong></p>';

            if(shipDetail && shipDetail.length){
                s +='<table width="100%" cellspacing="0" cellpadding="5" border="1px">';
                s+= '<thead><tr><th>наименования</th><th>куда</th><th>ТТН</th><th>дата</th><th>сумма</th>';
                shipDetail.forEach(function(ship){

                    s+="<tr><td>";
                    ship.stuffs.forEach(function(stuff){
                        s+=stuff+'<br/>'
                    })
                    s+='количество едениц <strong>'+ship.stuffs.length+'</strong>';
                    s+="</td><td>"+(ship.info||'')+"</td>";
                    s+="<td>"+(ship.ttn||'')+"</td>";
                    s+="<td>"+moment(ship.date).format("LLL")+"</td>";
                    s+="<td>"+(ship.sum||0).toFixed(2)+" "+order.currency+"</td></tr>";
                })
                s+="</table></br></br>";
            }else{
                s+='<h1>информация об отправке отсутствует.</h1>'
            }
            return '<!DOCTYPE html><html><head><meta charset=utf-8/>' +
                '</head><body onload="window.print()"><div>' +s + '</div><body></html>';
        }
        //*************************** end orderSPShipInfo*************************
        function invoiceInfo(order){
            var s='';
            s +='<h3>ОРДЕР № '+order.num+'</h3><br/> от '+moment(order.date).format('lll')+'';
            s+='<p>итого к оплате <strong>'+(order.paySum).toFixed(2)+' </strong>'+order.currency+'</p>';
            s+='<p>счет отправлен на почту</p>'
            /*if(order.payInfo){
                s +='<p>Данные для оплаты</p>';
                s +='<p>'+order.payInfo+'</p>';
            }*/
            return s;
        }
        function call(number){
            number=number.substring(0,20)
            var s='';
            s+='<h3>'+number+'</h3>'
            s+='<p>заказан обратный звонок на номер телефона</p>'
            s+='<p>'+moment().format('LLLL')+'</p>'
            return s;
        }



        return {
            empty:empty,
            order : order,
            orderNote:orderNote,
            shipInfo:shipInfo,
            payInfo:payInfo,
            invoiceInfo:invoiceInfo,
            acceptedInfo:acceptedInfo,
            orderShipInfo:orderShipInfo,
            call:call,
            emailFromNews:emailFromNews,
            emailBonus:emailBonus

        }
    }])