'use strict';
(function() {
    angular.module('gmall.directives')
        .directive('styleBlockPage', styleBlockPage) // templ index animate style
        .directive('setStyles', setStylesForBlock) // установка стилей для массива
        .directive('setStylesHeader', setStylesHeader)
    function styleBlockPage() {
        return {
            templateUrl: 'components/setStyles/styleBlockPage.html',
        }
    }
    function setStylesHeader(){
        return {
            restrict:'AE',
            templateUrl: 'components/setStyles/setStylesHeader.html'
        }
    }

    function setStylesForBlock(){
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
            bindToController: true,
            controller: setStylesForBlockCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/setStyles/setStyles.html'
        };
    }
    setStylesForBlockCtrl.$inject=[]
    function setStylesForBlockCtrl(){
        //console.log(self.saveField)

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
            if(self.saveField=='index.link'){
                console.log(JSON.stringify(self.item))
                console.log(self.item[0])
            }
            if(!self.item){
                self.item=angular.copy(arrEmptyForProperties)
            }else{
                while(self.item.length<lengthStyleBlock){
                    self.item.push('')
                }
            }
            //console.log(self.saveField,self.item)
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
            console.log('???????')
            self.deleteFunction({element:self.element})
        }

    }



    angular.module('gmall.services')
        .service('SetCSS', styleService);
    styleService.$inject=['$uibModal','$q','global'];
    function styleService($uibModal,$q,global){
        return {
            setStyles:setStyles,
        }
        function setStyles(block,short){
            var options={
                animation: true,
                bindToController: true,
                size:'lg',
                controllerAs: '$ctrl',
                windowClass: 'app-modal-window',
                templateUrl: 'components/setStyles/setCSS.html',
                controller: function (Confirm,$uibModalInstance,block,fontFaces,short){
                    //console.log(block,short)
                    var self=this;
                    if(!short){
                        self.block=block;
                        self.selector=''
                        if(!block.blockStyle){block.blockStyle=angular.copy(arrEmptyForProperties)}
                        if(!block.mobile){block.mobile={blockStyle:angular.copy(arrEmptyForProperties)}}
                        if(!block.tablet){block.tablet={blockStyle:angular.copy(arrEmptyForProperties)}}
                    }else{
                        self.block={blockStyle:block};
                        self.selector=''
                        self.short=true;
                    }
                    //console.log(block.tablet)

                    self.listElements=elementsList;//['a','p','div','h1','h2','h3','h4','ol','ul','li','span','img','hr','iframe'];
                    self.fontFaces=fontFaces;
                    self.displayList=['block','inline','inline-block','inline-table','none']
                    self.positionList=['relative','absolute','fixed','inherit','static']
                    self.filterListElements=filterListElements;
                    self.filterListElementsMobile=filterListElementsMobile;
                    self.filterListElementsTablet=filterListElementsTablet;
                    self.addNewElement=addNewElement;
                    self.deleteElement=deleteElement;
                    self.done=done;
                    self.cancel = cancel;
                    self.addSelector=addSelector;
                    self.copyStyle=copyStyle;

                    self.$onInit = function() {
                        activate()
                    }


                    function activate(){}
                    function addNewElement(type) {
                        if(type){
                            if(!self.block[type]){self.block[type]={}}
                            if(!self.block[type].elements){self.block[type].elements={}}
                            self.block[type].elements[self.element]=angular.copy(arrEmptyForProperties)
                        }else{
                            if(!self.block.elements){self.block.elements={}}
                            self.block.elements[self.element]=angular.copy(arrEmptyForProperties)
                        }

                        self.element=null;
                    }
                    function deleteElement(element,type) {
                        Confirm('delete?').then(function () {
                            if(type){
                                delete self.block[type].elements[element]
                            }else{
                                delete self.block.elements[element]
                            }
                        })
                    }
                    function filterListElements(el) {
                        if(!self.block.elements){return true}
                        var elems=Object.keys(self.block.elements);
                        return elems.indexOf(el)<0
                    }
                    function filterListElementsMobile(el) {
                        if(!self.block.mobile.elements){return true}
                        var elems=Object.keys(self.block.mobile.elements);
                        return elems.indexOf(el)<0
                    }
                    function filterListElementsTablet(el) {
                        if(!self.block.tablet.elements){return true}
                        var elems=Object.keys(self.block.tablet.elements);
                        return elems.indexOf(el)<0
                    }
                    function done(){
                        $uibModalInstance.close();
                    }
                    function cancel() {
                        $uibModalInstance.dismiss();
                    };
                    function addSelector(type){
                        if(!self.selector){return}
                        if(type){
                            if(!self.block[type]){self.block[type]={}}
                            if(!self.block[type].elements){self.block[type].elements={}}
                        }else{
                            if(!self.block.elements){self.block.elements={}}
                        }

                        var selector= self.selector.trim().substring('0,25').replace(/([^a-z0-9_&]+)/gi, '-');
                        //console.log(selector)
                        if(selector[0]=='&'){var field=selector}else{var field='@'+selector}
                        if(type){
                            self.block[type].elements[field]=angular.copy(arrEmptyForProperties)
                        }else{
                            self.block.elements[field]=angular.copy(arrEmptyForProperties)
                        }

                        self.selector=''
                    }
                    function copyStyle(from,to) {
                        Confirm('выполнить?').then(function () {
                            var els,blSt;
                            if(from == 'desktop'){
                                els=angular.copy(block.elements);
                                blSt=angular.copy(block.blockStyle);
                            }else if(from == 'tablet'){
                                els=angular.copy(block.tablet.elements);
                                blSt=angular.copy(block.tablet.blockStyle);
                            }else if(from == 'mobile'){
                                els=angular.copy(block.mobile.elements);
                                blSt=angular.copy(block.mobile.blockStyle);
                            }
                            if(els){
                                if(to=='desktop'){
                                    block.elements=els;
                                }else if(to=='tablet'){
                                    block.tablet.elements=els;
                                }else if(to=='mobile'){
                                    //console.log(block.mobile.elements)
                                    block.mobile.elements=els;
                                }
                            }
                            //console.log(from,to,block.blockStyle,blSt)
                            if(blSt){
                                if(to=='desktop'){
                                    block.blockStyle=blSt;
                                }else if(to=='tablet'){
                                    block.tablet.blockStyle=blSt;
                                }else if(to=='mobile'){
                                    block.mobile.blockStyle=blSt;
                                }
                            }
                        })
                    }
                },
                resolve:{
                    block:function(){
                        return block
                    },
                    short:function(){
                        return short
                    },
                    fontFaces:function(){
                        return global.get('store').val.template.index.fontFaces;
                    }
                }
            }
            return $uibModal.open(options).result
        }
    }

})()
