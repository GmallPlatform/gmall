'use strict';
(function(){

    angular.module('gmall.directives')
        .directive('catalogMainPage',catalogMainPageDirective)
    function catalogMainPageDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: catalogMainPageCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/catalog/catalog.html',
        }
    }
    catalogMainPageCtrl.$inject=['global','Stuff'];
    function catalogMainPageCtrl(global,Stuff){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.stuffs=[];
        self.currentState='section'
        self.sectionsClass;
        self.breadcrumbs=[];
        self.forwardToSubsections=forwardToSubsections;
        self.forwardToCategories=forwardToCategories;
        self.backInSection=backInSection;
        self.backInSubSection=backInSubSection;
        self.getStuffs=getStuffs;
        self.backToCatalog=backToCatalog;
        self.backToBC=backToBC;
        self.getStuff=getStuff;
        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
           self.sections=global.get('sections').val.filter(function(el){return el._id});
            console.log(self.sections)
        }
        function forwardToSubsections(s){
            self.breadcrumbs.push(s)
            self.sectionsClass='animated slideOutLeft'
            s.class='animated slideInRight';
            //console.log(s)
        }
        function forwardToCategories(sec,sub){
            self.breadcrumbs.push(sub)
            sec.class='animated slideOutLeft'
            sub.class='animated slideInRight';
        }
        function backInSection(s){
            s.class='animated slideOutRight';
            self.sectionsClass='animated slideInLeft'
        }
        function backInSubSection(sub,sec){
            sec.class='animated slideInLeft'
            sub.class='animated slideOutRight';

        }

        function backToCatalog(){
            if(!self.breadcrumbs.length){return;}
            self.breadcrumbs[self.breadcrumbs.length-1].class='animated slideOutRight';
            self.sectionsClass='animated slideInLeft';
            self.breadcrumbs.length=0;
        }
        function backToBC(i){
            if(i){return}
            self.breadcrumbs[self.breadcrumbs.length-1].class='animated slideOutRight';
            self.breadcrumbs[self.breadcrumbs.length-2].class='animated slideInLeft';
            self.breadcrumbs.splice(self.breadcrumbs.length-1,1);
        }
        function getStuffs(category){
            self.category=category;
            Stuff.getList(null,{category:category._id})
                .then(function(res){
                    self.items=res
                })

        }
        function getStuff(item,i){
            item.isOpen=!item.isOpen;
            if(item.isOpen){
                if(!item.getData){
                    item.getData=true;
                    Stuff.getItem(item._id).then(function(res){
                        console.log(res)
                        self.items[i].desc=res.desc;
                        self.items[i].desc1=res.desc1;
                        self.items[i].desc2=res.desc2;
                        self.items[i].gallery=res.gallery;
                    })
                }
            }
        }
    }
})()
