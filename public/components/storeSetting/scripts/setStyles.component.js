'use strict';
return;
angular.module('gmall.directives')
    .directive('setStyles22', function(){
        return {
            binding:{
                item:'=',
                saveFunction:'&',
                saveField:'@',
                fontFaces:'=',
                deleteFunction:'&',
                element:'@',
                action:'@'
            },
            scope: {
                item:'=',
                saveFunction:'&',
                saveField:'@',
                fontFaces:'=',
                deleteFunction:'&',
                element:'@',
                action:'@'
            },
            restrict:'AE',
            //replace:true,
            bindToController: true,
            controller: setStylesCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/setStyles/setStyles.html'
        };
        setStylesCtrl.$inject=[]

        function setStylesCtrl(){
            var self = this;
            var actived=false;
            self.$oninit=function () {
                //console.log('dd!!')
                if(!actived){
                    actived=true;
                    activate()
                }
            }
            self.actions={};
            self.displayList=['block','inline','inline-block','none','table','inline-table','table-cell','table-column','table-row','table-caption']
            self.saveData=saveData;
            self.deleteData=deleteData;

            if(!actived){
                actived=true;
                activate()
            }

            function activate() {
                if(!self.item){
                    self.item=angular.copy(arrEmptyForProperties)
                }else{
                    while(self.item.length<lengthStyleBlock){
                        self.item.push('')
                    }
                }
                //console.log(self.element,self.action)
                if(self.action){
                    var keys= self.action.split(' ');
                    keys.forEach(function (k) {
                        self.actions[k]=true;
                    })
                }
            }



            function saveData() {
                self.saveFunction({field:self.saveField,value:self.item})
            }
            function deleteData() {
                self.deleteFunction({element:self.element})
            }

        }
    })
    .directive('setStylesHeader22', function(){
        return {
            restrict:'AE',
            //replace:true,
            templateUrl: 'components/setStyles/setStylesHeader.html'
        }
    })




