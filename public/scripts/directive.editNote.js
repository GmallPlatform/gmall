'use strict';
angular.module('gmall.directives')
.directive('editNote',[function(){
    return{
        scope:{
            obj:'=',
            lostFocus:'&',
            field:'@'
        },
        template:'<div class="form-group label-floating"><label class="control-label" for="comment">добавить заметку</label>' +
        '<textarea rows="2" ' +
        'class="form-control" ' +
        'style="width=100%" ' +
        'ng-model="obj.note"></textarea></div>',
        link:function(scope,element){
            setTimeout(function () {
                //console.log(scope.obj)
                //console.log(element.children().children('textarea')[0]);
                //element.children().children('textarea')[0].focus();
                var textarea=angular.element(element.children().children('textarea')[0])
                /*textarea.bind('blur', function (e) {
                    //console.log('lost focus',scope.field)
                    if (scope.field){
                        scope.lostFocus({field:scope.field})
                    }else{
                        scope.lostFocus({obj:scope.obj})
                    }

                });*/
            }, 100);
        }
    }
}])
