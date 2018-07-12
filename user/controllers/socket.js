'use strict';
module.exports = function (sockets) {
    //console.log('sockets',sockets)
    this.connect= function(socket){
        console.log('socket connect')
        function setStatus(){
            //console.log('socket.seller ',socket.seller)
            if (sockets.some(function(s){
                    //console.log(s.user,s.seller)
                    return s.user=='seller' && s.seller==socket.seller})){
                //console.log('getSellerStatus= tur')
                socket.emit('sellerStatus',{status:true});
            }else{
                socket.emit('sellerStatus',{status:false});
            }
        }

        socket.on('userConnect',function(data){
            console.log('userConnect',data)
            socket.user=data.user;
            sockets[data.user]=socket;
        })
        socket.on('disconnect',function(data){
            delete sockets[socket.user]
            console.log('socket deleted')
        })


    }
};



