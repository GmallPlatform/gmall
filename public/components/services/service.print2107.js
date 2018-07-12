'use strict';
angular.module('gmall.services')
    .factory('CreateContent', ['global',function(global){
        //**************************************************************************************
        // ********************пустой контент
        function empty(){
            var s ='<h1>информация  отсутствует</h1>'
            return '<!DOCTYPE html><html><head><meta charset=utf-8/>' +
                '</head><body onload="window.print()"><div>' +s + '</div><body></html>';
        }
        //*************************** end empty*************************
        function emailFromNews(item){
            var s=
                '<div style="padding: 30px;width: 100%; max-width: 1200px">'+
                    '<div style="text-align: center; width: 100%;">'+
                        '<img src="'+photoHost+'/'+global.get('store').val.logo+'" style="width: 70px;display: inline-block;"'+
                    '</div></div>'+

                    '<div>'+
                        '<h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center">'+item.name+'</h2>'+
                    '</div>'+
                    '<div>'+
                        '<a href="" style="cursor: pointer;">'+
                            '<img src="'+photoHost+'/'+item.img+'" style="width: 100%;margin-bottom: 20px;">'+
                        '</a>'+
                    '</div>'+
                    '<div>'+

                    '</div>';


            s+='<div style="clear: both;"><p style="text-align: justify; font-size: 18px">'+item.desc+'</p> </div>';
            if(item.video){
                s+= '<div>'+
                    item.video+
                    '</div>';
            }

            s+='<div style="clear: both;"><p  style="text-align: justify; font-size: 18px">'+item.desc1+'</p> </div>';
            item.imgs.forEach(function(image){
                s+='<div style="width: 45%; margin: 20px; float: left">'+
                    '<a href="'+image.link+'"> <img style="width: 100%; float: left" src="'+photoHost+'/'+image.img+'"> </a> </div>'
            })

            s+='<div style="clear: both;"><p  style="text-align: justify; font-size: 18px">'+item.desc2+'</p> </div>';
            item.stuffs.forEach(function(stuff){
                s+='<div style="width: 45%; margin: 20px; float: left; text-align: center">'+
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
        }
        //************************************************************************************
        function orderNote(order){
            //console.log(order)
            var s='';
            s +='<h3>ОРДЕР № '+order.num+'</h3> от '+moment(order.date).format('lll')+'<br/>';
            s+='<p>сумма '+(order.paySum).toFixed(2)+' '+order.currency+'</p>';
            return s;
        }
        // html контент для ордера
        function order(order,invoice){
            //console.log(order)
            var s='';
            s +='<div class="container"><div class="row"><div class="col-lg-8">'+
                '<h3>ОРДЕР № '+order.num+'</h3> от '+moment(order.date).format('lll')+'<br/>';
            s+='<p>продавец <strong>'+order.seller.name+'</strong></p>';
            if(invoice && order.payInfo){
                s +='<p>ДАННЫЕ ДЛЯ ОПЛАТЫ</p>';
                s +='<p>'+order.payInfo+'</p>';
            }
            if(!invoice){
                // данные покупателя
                s +='<p>ДАННЫЕ ЗАКАЗЧИКА</p>';
                s +='<p> email - '+global.get('user').val.email+'</p>';
                if(global.get('user').val.profile.fio){
                    s +='<p> Имя  - '+global.get('user').val.profile.fio+'</p>';
                }
                if(global.get('user').val.profile.phone){
                    s +='<p> Телефон - '+global.get('user').val.profile.phone+'</p>';
                }
                if(global.get('user').val.profile.city){
                    s +='<p> Город  - '+global.get('user').val.profile.city+'</p>';
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
                '<th class="text-center">'+order.getTotalQuantity()+'</th><th class="text-center">'+(order.kurs*(order.getTotalSum(true))).toFixed(2)+' '+order.currency+'</th></tr>';
            if(order.discount && (order.discount.type==6 ||order.discount.type==7)){
                s +='<tr><th colspan="4">сумма с учетом скидки</th><th></th>'+
                    '<th class="text-center">'+(order.kurs*order.sum).toFixed(2)+' '+order.currency+'</th></tr>';
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
            s+='<strong>ТТН - '+ship.ttn+'</strong>'+' от '+moment(ship.date ).format('LL')+'</p>';
            if (ship.info){
                s+='<p>'+ship.info.substring(0,150)+'</p>';
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
                    s+="</td><td>"+ship.info+"</td>";
                    s+="<td>"+ship.ttn+"</td>";
                    s+="<td>"+moment(ship.date).format("LLL")+"</td>";
                    s+="<td>"+(ship.sum).toFixed(2)+" "+order.currency+"</td></tr>";
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
            s+='<p>заказан обратный звонок на номер телефона</p>'
            s+='<p><strong>'+number+'</strong></p>'


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
            emailFromNews:emailFromNews

        }
    }])