angular
    .module('gmall.exception',[])
    .factory('exception', exception);

exception.$inject = ['toaster'];

function exception(toaster) {
    var service = {
        catcher: catcher,
        showToaster:showToaster
    };
    return service;

    function catcher(header) {
        //console.log(message)
        return function(err) {
            if(err){
                if(typeof err=='object'){
                    if(err.data){
                        err=err.data
                    }
                    if(err.message){
                        err=err.message
                    }else if(err.error){
                        err=err.error
                    }
                }
            }else{
                err='ошибка'
            }
            //console.log(message,reason)
            toaster.pop('error',header,err);
            //logger.error(message, reason);
        };
    }
    function showToaster(type,title,content){
        if(typeof content=='object'){
            if(content.message){
                content=content.message
            }else if(content['error']){
                content=content['error']
            }
        }
        toaster.pop({
            type: type,
            title: title,
            body: content,
            bodyOutputType: 'trustedHtml',
            showCloseButton: true,
            delay:15000,
            closeHtml: '<button>Close</button>'
        });
    }
}
