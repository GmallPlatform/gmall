'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('blocksTranstale',blocksTranstale)
        .directive('translateAll',translateAll)
        .directive('translateHp',translateHp)
        .directive('translateCatalog',translateCatalog)
        .directive('translateStore',translateStore)
        .directive('translateStatPages',translateStatPages)
        .directive('translateStatPage',translateStatPage)
        .directive('translateStuffs',translateStuffs)
        .directive('translateStuff',translateStuff)
        .directive('translateBrand',translateBrand)
        .directive('translateFilterTags',translateTags)

    function translateAll(){
        return {
            scope: true,
            restrict:"E",
            bindToController: true,
            controller: translateAllCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate.html',
        }
    }
    function translateHp(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateHpCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_hp.html',
        }
    }
    function translateCatalog(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateCatalogCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_catalog.html',
        }
    }
    function translateBrand(){
        return {
            scope: {
                model:'@'
            },
            restrict:"E",
            bindToController: true,
            controller: translateBrandCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_brand.html',

        }
    }
    function translateFilter(){
        return {
            scope: {
                model:'@'
            },
            restrict:"E",
            bindToController: true,
            controller: translateBrandCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_brand.html',

        }
    }
    function translateTags(){
        return {
            scope: {
                model:'@'
            },
            restrict:"E",
            bindToController: true,
            controller: translateTagsCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_brand.html',

        }
    }
    function translateStore(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateStoreCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_store.html',
        }
    }
    function translateStatPages(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateStatPagesCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_stat_pages.html',
        }
    }
    function translateStuffs(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateStuffsCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_stuffs.html',
        }
    }
    function translateStatPage(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateStatPageCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_stat_page.html',
        }
    }
    function translateStuff(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: translateStuffCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/translate_stuff.html',
        }
    }
    function blocksTranstale(){
        return {
            scope: {
                items:'=',
                saveFoo:'&'
            },
            restrict:"E",
            bindToController: true,
            controller: blocksTranstaleCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/translate/blocks_translate.html',
        }
    }
    blocksTranstaleCtrl.$inject=['$scope','global','$stateParams','$timeout','$http','exception','Store','$rootScope','$q']
    function blocksTranstaleCtrl($scope,global,$stateParams,$timeout,$http,exception,Store,$rootScope,$q) {
        var self = this;
        self.lang = global.get('store').val.lang;
        self.translateLang = $stateParams.lang
        self.global=global
        self.save=save;
        self.copyContent=copyContent;
        self.extendText=extendText;
        self.translateGoogle=translateGoogle;
        self.tinymceOption = {
            plugins: 'code print preview fullpage searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools  contextmenu colorpicker textpattern help',
            // toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            toolbar: 'code | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code '
            //id:'editingText'

            /*plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'*/
        };
        self.allChars=0;
        self.items.forEach(function (it,i) {
            self.allChars+=it.data[self.lang].length;
            var tinymceOption=JSON.parse(JSON.stringify(self.tinymceOption))
            tinymceOption.setup= function(editor) {
                //console.log('test1'+i);
                $timeout(function () {
                    var s = $('#sourceText'+i);
                    var h = s.height()
                    //console.log(h)
                    editor.theme.resizeTo('100%', h);
                }, 1500)
                it.editor=editor
                //console.log(self.items)
            },
            it.tinymceOption=tinymceOption
        })

        function save(item) {
            //console.log(item)
            var field =(item.i>-1)? "blocks."+item.i+'.'+item.field:item.field
            var value = item.data;
            var o ={field:field,value:value};
            if(item.model){
                o.model=item.model;
                o._id=item._id;
            }
            self.saveFoo(o)
        }
        function copyContent(item) {
            item.data[self.translateLang]=item.data[self.lang]
        }
        function extendText(item,idx) {
            item.extend=!item.extend;
            $timeout(function () {
                var s = $('#sourceText'+idx);
                var h = s.height()
                //console.log(h)
                if(item.editor){
                    item.editor.focus()
                    item.editor.theme.resizeTo('100%', h);
                }
            },50)
        }

        function translateGoogle(item) {
            if(item){
                translateGoogleAll([item])
            }else{
                translateGoogleAll(self.items)
            }
        }
        function translateGoogleAll(items){
            self.translatingGoogle=true;
            var texts = items.map(function (item) {
                return item.data[self.lang].trim();
            })
            sendForTranslate(texts).then(function (res) {
                if(res && res.length){
                    for(var i =0;i<res.length;i++){
                        items[i].data[self.translateLang]=res[i];
                    }
                    var i=-1;
                    var acts = items.map(function (item) {
                        i++;
                        return $timeout(function(){save(item)},(i*50))
                    })
                    $q.all(acts)
                }
                self.translatingGoogle=false;

            })
        }
        function sendForTranslate(texts) {
            var allLength=0;
            texts.forEach(function (t) {
                allLength+=t.length;
            })
            console.log('all length ',allLength)
            var fd = new FormData();
            for (var i = 0; i < texts.length; i++) {
                fd.append('texts[]', texts[i]);
            }
            //fd.append('texts', texts);
            fd.append('target', self.translateLang);
            var url=stuffHost+'/api/translate?translate=translate'
            return $http.post(url, fd,{
                withCredentials: true,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                console.log(res)
                return res.data;
            }).catch(function (err) {
                self.translatingGoogle=false;
                if(err){
                    exception.catcher('google translate')(err)
                }
            })
        }

    }
    translateHpCtrl.$inject=['HomePage','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope'];
    function translateHpCtrl(HomePage,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope){
        var self = this;
        self.Items=HomePage;
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem(global.get('store').val.subDomain).then(function(res) {
                self.item=res;
                //console.log(self.item)
                var items=[];
                var acts=[];
                addItem(lang,items,self.item,-1,acts,'HomePage',self.item._id);
                /*if(self.item && self.item.blocks && self.item.blocks.length){
                    self.item.blocks.forEach(function (b,i) {
                        if(b.nameL && b.nameL[lang]){
                            var nameL={data:b.nameL,type:'input',i:i,field:'nameL'}
                            items.push(nameL)
                        }
                        if(b.name1L && b.name1L[lang]){
                            var name1L={data:b.name1L,type:'input',i:i,field:'name1L'}
                            items.push(name1L)
                        }
                        if(b.descL && b.descL[lang]){
                            var descL={data:b.descL,type:'text',i:i,field:'descL'}
                            items.push(descL)
                        }
                        if(b.desc1L && b.desc1L[lang]){
                            var desc1L={data:b.desc1L,type:'text',i:i,field:'desc1L'}
                            items.push(desc1L)
                        }
                    })
                    self.items=items;
                }*/
                self.items=items;
            } ).then(function () {


            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getItem(id) {
            //console.log(id)
            return $q(function(resolve,reject){
                self.Items.get({_id:id},function(res){resolve(res)},function(err){
                    console.log(err)
                    if(err && err.status && err.status==404){
                        resolve(404)
                    }else{
                        resolve()
                    }
                })
            })
        }

        function saveField(field,value){
            var o={_id:self.item._id};
            o[field]=value
            var query={update:field,translate:'translate'}
            self.Items.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }

    translateCatalogCtrl.$inject=['Sections','Category','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope'];
    function translateCatalogCtrl(Sections,Category,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope){
        var self = this;
        self.Items=Sections;
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();

        //*******************************************************
        function activate() {
            //console.log(id)
            var items=[],acts=[];
            return getCatalog().then(function(res) {
                res.shift()
                var item;
                res.forEach(function (section) {

                    if(section){
                        addItem(lang,items,section,-1,acts,'Sections',section._id);
                        if(section.categories && section.categories.length){
                            section.categories.forEach(function (category) {
                                addItem(lang,items,category,-1,acts,'Category',category._id);
                            })

                        }
                        if(section.child && section.child.length){
                            section.child.forEach(function (child) {
                                addItem(lang,items,child,-1,acts,'Sections',child._id);
                                if(child.categories && child.categories.length){
                                    child.categories.forEach(function (category) {
                                        addItem(lang,items,category,-1,acts,'Category',category._id);
                                    })
                                }
                            })
                        }
                    }
                })

                //console.log(items)
                //console.log(acts)
                self.items=items;


            } ).then(function () {
                if(acts.length){
                    return $q.all(acts.map(rP))
                }
                function rP(data) {
                    var o={_id:data._id};
                    o[data.field]=data.value
                    var query={update:data.field,translate:'translate'}
                    //console.log(query,o)
                    if(data.model=='Category'){
                        var Model=Category
                    }else if(data.model=='Sections'){
                        var Model=Sections
                    }
                    return Model.save(query,o).$promise
                }

            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getCatalog() {
            //console.log(id)
            return $q(function(resolve,reject){
                self.Items.query(function(res){resolve(res)},function(err){
                    console.log(err)
                    if(err && err.status && err.status==404){
                        resolve(404)
                    }else{
                        resolve()
                    }
                })
            })
        }

        function saveField(field,value,model,_id){
            var o={_id:_id};
            o[field]=value
            var query={update:field,translate:'translate'}
            var Model = Sections;
            if(model && model=='Category'){
                Model=Category;
            }
            Model.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }
    translateBrandCtrl.$inject=['Brands','Filters','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope'];
    function translateBrandCtrl(Brands,Filters,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope){
        var self = this;
        var model=self.model;
        //console.log(self.model)

        if(model=='Filters'){
            self.Items=Filters;
        }else if(model=='Brand'){
            self.Items=Brands;
        }
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        var query={}

        self.paginate={items:0,page:0,rows:20}
        self.translateLang=translateLang;

        self.getList=getList;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            var items=[],acts=[];
            return getBrands().then(function(res) {
                var item;
                res.forEach(function (brand) {
                    if(brand){
                        addItem(lang,items,brand,-1,acts,model,brand._id);
                    }
                })
                self.items=items;


            } ).then(function () {


            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getBrands(){

            return self.Items.getList(self.paginate,query)
                .then(function(data) {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    data.forEach(function (item) {
                        if(!item.translated){
                            item.translated={}
                        }
                    })
                    return data;
                })
        }
        function getList() {
            activate()
        }

        function saveField(field,value,model,_id){
            var o={_id:_id};
            o[field]=value
            var query={update:field,translate:'translate'}
            var Model = self.Items;
            Model.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }
    translateTagsCtrl.$inject=['BrandTags','FilterTags','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope'];
    function translateTagsCtrl(BrandTags,FilterTags,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope){
        var self = this;
        var model=self.model;
        //console.log(self.model)


        if(model=='FilterTags'){
            self.Items=FilterTags;
            self.filter='filter'
        }else if(model=='BrandTags'){
            self.Items=BrandTags;
            self.filter='brand'
        }
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        var query={}
        query[self.filter]=$stateParams.filter;
        //console.log(query)


        self.paginate={items:0,page:0,rows:20}
        self.translateLang=translateLang;

        self.getList=getList;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            var items=[],acts=[];
            return getData().then(function(res) {
                var item;
                res.forEach(function (item) {
                    if(item){
                        addItem(lang,items,item,-1,acts,model,item._id);
                    }
                })

                /*console.log(items)
                console.log(acts)*/
                self.items=items;


            } ).then(function () {


            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getData(){

            return self.Items.getList(self.paginate,query)
                .then(function(data) {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    data.forEach(function (item) {
                        if(!item.translated){
                            item.translated={}
                        }
                    })
                    return data;
                })
        }
        function getList() {
            activate()
        }

        function getBrands1() {
            //console.log(id)
            return $q(function(resolve,reject){
                self.Items.query(function(res){resolve(res)},function(err){
                    console.log(err)
                    if(err && err.status && err.status==404){
                        resolve(404)
                    }else{
                        resolve()
                    }
                })
            })
        }

        function saveField(field,value,model,_id){
            var o={_id:_id};
            o[field]=value
            var query={update:field,translate:'translate'}
            var Model = self.Items;

            Model.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }
    translateStoreCtrl.$inject=['Store','Seller','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope'];
    function translateStoreCtrl(Store,Seller,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope){
        var self = this;
        self.Items=Store;
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();
        function addItem(items,item,i,acts,model,_id) {
            if(item.nameL && item.nameL[lang]){
                var nameL={data:item.nameL,type:'input',i:i,field:'nameL'}
                if(model){
                    nameL.model=model;
                    nameL._id=_id;

                }
                items.push(nameL)
            }else{
                if(!item.nameL){
                    item.nameL={}
                    item.nameL[lang]=item.name;
                    var o={field:'nameL',value:item.nameL}
                    if(model){
                        o.model=model;
                        o._id=_id;

                    }
                    acts.push(o)
                    var nameL={data:item.nameL,type:'input',i:i,field:'nameL'}
                    if(model){
                        nameL.model=model;
                        nameL._id=_id;

                    }
                    items.push(nameL)
                }
            }
            if(item.descL && item.descL[lang]){
                var descL={data:item.descL,type:'text',i:i,field:'descL'}
                if(model){
                    descL.model=model;
                    descL._id=_id;

                }
                items.push(descL)
            }else{
                if(!item.descL && item.desc){
                    item.descL={}
                    item.descL[lang]=item.desc;
                    var o={field:'descL',value:item.descL}
                    if(model){
                        o.model=model;
                        o._id=_id;

                    }
                    acts.push(o)
                    var descL={data:item.descL,type:'text',i:i,field:'descL'}
                    if(model){
                        descL.model=model;
                        descL._id=_id;

                    }
                    items.push(descL)
                }
            }
            if(item.blocks && item.blocks.length){
                item.blocks.forEach(function (b,ii) {
                    console.log(b)
                    if(b.nameL && b.nameL[lang]){
                        var nameL={data:b.nameL,type:'input',i:ii,field:'nameL'}
                        if(model){
                            nameL.model=model;
                            nameL._id=_id;

                        }
                        items.push(nameL)
                    }else{
                        if(b.name){
                            if(!b.nameL){b.nameL={}}
                            b.nameL[lang]=b.name;
                            var o={field:'blocks.'+ii+'.name1L',value:b.name1L}
                            if(model){
                                o.model=model;
                                o._id=_id;

                            }
                            acts.push(o)
                            var nameL={data:b.nameL,type:'input',i:ii,field:'nameL'}
                            if(model){
                                nameL.model=model;
                                nameL._id=_id;

                            }
                            items.push(nameL)
                        }
                    }
                    if(b.name1L && b.name1L[lang]){
                        var name1L={data:b.name1L,type:'input',i:ii,field:'name1L'}
                        if(model){
                            name1L.model=model;
                            name1L._id=_id;

                        }
                        items.push(name1L)
                    }else{
                        if(b.name1){
                            if(!b.name1L){b.name1L={}}
                            b.name1L[lang]=b.name1;
                            var o={field:'blocks.'+ii+'.name1L',value:b.name1L}
                            if(model){
                                o.model=model;
                                o._id=_id;

                            }
                            acts.push(o)
                            var name1L={data:b.name1L,type:'input',i:ii,field:'name1L'}
                            if(model){
                                name1L.model=model;
                                name1L._id=_id;

                            }
                            items.push(name1L)
                        }
                    }
                    if(b.descL && b.descL[lang]){
                        var descL={data:b.descL,type:'text',i:ii,field:'descL'}
                        if(model){
                            descL.model=model;
                            descL._id=_id;

                        }
                        items.push(descL)
                    }else{
                        if(b.desc){
                            if(!b.descL){b.descL={}}
                            b.descL[lang]=b.desc;
                            var o= {field:'blocks.'+ii+'.descL',value:b.descL}
                            if(model){
                                o.model=model;
                                o._id=_id;

                            }
                            acts.push(o)
                            var descL={data:b.descL,type:'text',i:ii,field:'descL'}
                            if(model){
                                descL.model=model;
                                descL._id=_id;

                            }
                            items.push(descL)
                        }
                    }
                    if(b.desc1L && b.desc1L[lang]){
                        var desc1L={data:b.desc1L,type:'text',i:ii,field:'desc1L'}
                        if(model){
                            desc1L.model=model;
                            desc1L._id=_id;

                        }
                        items.push(desc1L)
                    }else{
                        if(b.desc1){
                            if(!b.desc1L){b.desc1L={}}
                            b.desc1L[lang]=b.desc1;
                            var o= {field:'blocks.'+ii+'.desc1L',value:b.desc1L}
                            if(model){
                                o.model=model;
                                o._id=_id;

                            }
                            var desc1L={data:b.desc1L,type:'text',i:ii,field:'desc1L'}
                            if(model){
                                desc1L.model=model;
                                desc1L._id=_id;

                            }
                            items.push(desc1L)
                        }
                    }
                })

            }
        }
        //*******************************************************
        function activate() {

            //console.log(id)
            var items=[],acts=[];
            return getStore(global.get('store').val._id).then(function(item) {
                //console.log(item)
                if(item.nameL && item.nameL[lang]){
                    var nameL={data:item.nameL,type:'input',i:-1,field:'nameL',model:'Store',_id:item._id}
                    items.push(nameL)
                }
                if(item.locationL && item.locationL[lang]){
                    var locationL={data:item.locationL,type:'input',i:-1,field:'locationL',model:'Store',_id:item._id}
                    items.push(locationL)
                }
                if(item.bonusButtonTextL && item.bonusButtonTextL[lang]){
                    var bonusButtonTextL={data:item.bonusButtonTextL,type:'input',i:-1,field:'bonusButtonTextL',model:'Store',_id:item._id}
                    items.push(bonusButtonTextL)
                }
                for(var key in item.texts){
                    if(item.texts[key] && item.texts[key][lang] && item.texts[key][lang].trim()){
                        item.texts[key][lang]=item.texts[key][lang].trim();
                        var type='input'
                        if(key=="dateTimeText" || key=='copyrightText'|| key=='copyrightText1'){type='text'}
                        var data={data:item.texts[key],type:type,i:-1,field:'texts.'+key,model:'Store',_id:item._id}
                        items.push(data)
                    }

                }
                if(item.footer){
                    let type='text'
                    if(item.footer.textL && item.footer.textL[lang] && item.footer.textL[lang].trim()){
                        item.footer.textL[lang]=item.footer.textL[lang].trim();
                        var data={data:item.footer.textL,type:type,i:-1,field:'footer.textL',model:'Store',_id:item._id}
                        items.push(data)
                    }
                    if(item.footer.text1L && item.footer.text1L[lang] && item.footer.text1L[lang].trim()){
                        item.footer.text1L[lang]=item.footer.text1L[lang].trim();
                        var data={data:item.footer.text1L,type:type,i:-1,field:'footer.text1L',model:'Store',_id:item._id}
                        items.push(data)
                    }
                }
                if(item.seoL && item.seoL[lang]){
                    if(!item.seoL[translateLang]){item.seoL[translateLang]={}}

                    for(var key in item.seoL[lang]){
                        //var type = (key!='description')
                        var type = 'input'
                        if(item.seoL[lang][key] && item.seoL[lang][key].trim()){
                            if(!item.seoL[translateLang][key]){item.seoL[translateLang][key]=''}
                            var objData = {}
                            objData[lang]=item.seoL[lang][key].trim();
                            objData[translateLang]=item.seoL[translateLang][key];
                            //console.log(objData)
                            var data={data:objData,type:type,i:-1,field:'seoL.'+key,model:'Generate',_id:item._id}
                            items.push(data)
                        }

                    }
                }
                if(item.nameListsL && item.nameListsL[lang]){
                    if(!item.nameListsL[translateLang]){item.nameListsL[translateLang]={}}

                    for(var key in item.nameListsL[lang]){
                        var type = 'input'
                        if(item.nameListsL[lang][key] && item.nameListsL[lang][key].trim()){
                            if(!item.nameListsL[translateLang][key]){item.nameListsL[translateLang][key]=''}
                            var objData = {}
                            objData[lang]=item.nameListsL[lang][key].trim();
                            objData[translateLang]=item.nameListsL[translateLang][key];
                            //console.log(objData)
                            var data={data:objData,type:type,i:-1,field:'nameListsL.'+key,model:'Generate',_id:item._id}
                            items.push(data)
                        }

                    }
                }
                //console.log(items[items.length-1]['data']['ru'])

                //console.log(items)
                //console.log(acts)
                self.items=items;
                self.item=item;

            } ).then(function () {


            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getStore(id) {
            //console.log(id)
            return self.Items.getItem(id)

            return $q(function(resolve,reject){
                self.Items.getItem({_id:id},function(res){resolve(res)},function(err){
                    console.log(err)
                    if(err && err.status && err.status==404){
                        resolve(404)
                    }else{
                        resolve()
                    }
                })
            })
        }

        function saveField(field,value,model,_id){
            //console.log(field,value,model,_id)

            var o={_id:_id};

            if(model=='Generate'){
                // это для полей которые имеют другую структуру например SEOL
                var field1 = field.split('.');
                self.item[field1[0]][translateLang][field1[1]]=value[translateLang]
                //console.log(field)
                field=field1[0]+'.'+translateLang
                value=self.item[field1[0]][translateLang]

            }
           o[field]=value
            var query={update:field,translate:'translate'}
            var Model = Store;
            if(model && model=='Seller'){
                Model=Seller;
            }

            Model.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }


    translateStatPagesCtrl.$inject=['Stat','News','Workplace','Master','Additional','Lookbook','Info','$stateParams','global','$state','$timeout','$rootScope','exception'];
    function translateStatPagesCtrl(Stat,News,Workplace,Master,Additional,Lookbook,Info,$stateParams,global,$state,$timeout,$rootScope,exception) {
        var self = this;
        self.$state=$state;
        if($stateParams.type=='Stat'){
            self.Items=Stat;
        }else if($stateParams.type=='Master'){
            self.Items=Master;
        }else if($stateParams.type=='News'){
            self.Items=News;
        }else if($stateParams.type=='Workplace'){
            self.Items=Workplace;
        }else if($stateParams.type=='Additional'){
            self.Items=Additional;
        }else if($stateParams.type=='Lookbook'){
            self.Items=Lookbook;
        }else if($stateParams.type=='Info'){
            self.Items=Info;
        }
        //console.log(self.Items)

        self.mobile=global.get('mobile').val;
        self.global=global;
        self.paginate={items:0,page:0,rows:50}


        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang
        self.translateLang=translateLang;

        self.getList=getList;
        self.saveField=saveField;
        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            return self.Items.getList(self.paginate)
                .then(function(data) {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    //console.log(data)
                    //data.shift()
                    data.forEach(function (item) {
                        if(!item.translated){
                            item.translated={}
                        }
                    })
                    self.items = data;
                    //console.log(self.items)
                    return self.items;
                })

                .catch(function (err) {
                    if(err){
                        exception.catcher('получение списка')(err)
                    }
                    $rootScope.$emit('$stateChangeEndToStuff');
                })
        }
        function getList() {
            activate();
        }
        function saveField(item,field,value){
            var o={_id:item._id};
            o[field]=value
            var query={update:field,translate:'translate'}
            self.Items.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };

    }
    translateStatPageCtrl.$inject=['Stat','News','Workplace','Master','Additional','Info','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope','Lookbook'];
    function translateStatPageCtrl(Stat,News,Workplace,Master,Additional,Info,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope,Lookbook){
        var self = this;
        if($stateParams.type=='Stat'){
            self.Items=Stat;
        }else if($stateParams.type=='Master'){
            self.Items=Master;
        }else if($stateParams.type=='News'){
            self.Items=News;
        }else if($stateParams.type=='Workplace'){
            self.Items=Workplace;
        }else if($stateParams.type=='Additional'){
            self.Items=Additional;
        }else if($stateParams.type=='Lookbook'){
            self.Items=Lookbook;
        }else if($stateParams.type=='Info'){
            self.Items=Info;
        }

        self.item={};
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();
        //*******************************************************
        var acts =[];
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function(res) {
                self.item=res;
                //console.log(self.item)
                var items=[];


                addItem(lang,items,self.item,-1,acts,$stateParams.type,self.item._id);

                self.items=items;
            } ).then(function () {
                //console.log(acts)
                if(acts.length){
                    return $q.all(acts.map(rP))
                }
                function rP(data) {
                    var o={_id:self.item._id};
                    o[data.field]=data.value
                    var query={update:data.field,translate:'translate'}
                    //console.log(query,o)
                    return self.Items.save(query,o).$promise
                }

            })
                .then(function (res) {
                    //console.log(res)
                })
                .catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getItem(id) {
            //console.log(id)
            return $q(function(resolve,reject){
                self.Items.get({_id:id},function(res){resolve(res)},function(err){
                    console.log(err)
                    if(err && err.status && err.status==404){
                        resolve(404)
                    }else{
                        resolve()
                    }
                })
            })
        }

        function saveField(field,value){
            var o={_id:self.item._id};
            o[field]=value
            var query={update:field,translate:'translate'}
            self.Items.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }

    translateStuffsCtrl.$inject=['Stuff','$stateParams','global','$state','$timeout','$rootScope','exception','Sections'];
    function translateStuffsCtrl(Stuff,$stateParams,global,$state,$timeout,$rootScope,exception,Sections) {
        var self = this;
        self.$state=$state;
        self.Items=Stuff;

        self.mobile=global.get('mobile').val;
        self.global=global;
        self.paginate={items:0,page:0,rows:20}

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang
        self.translateLang=translateLang;

        self.getList=getList;
        self.saveField=saveField;
        var query={}
        var parentSection=Sections.getSection($rootScope.sectopnsForMenu,$stateParams.section);
        if(parentSection){
            var sectionCategories=Sections.getEmbededCategories(parentSection,[]).map(function(el){return el._id})
            query.category={$in:sectionCategories}
        }


        //********************activate***************************
        activate();

        //*******************************************************
        function activate() {
            return self.Items.getList(self.paginate,query)
                .then(function(data) {
                    $rootScope.$emit('$stateChangeEndToStuff');
                    //console.log(data)
                    //data.shift()
                    data.forEach(function (item) {
                        if(!item.translated){
                            item.translated={}
                        }
                    })
                    self.items = data;
                    //console.log(self.items)
                    return self.items;
                })

                .catch(function (err) {
                    if(err){
                        exception.catcher('получение списка')(err)
                    }
                    $rootScope.$emit('$stateChangeEndToStuff');
                })
        }
        function getList() {
            activate();
        }
        function saveField(item,field,value){
            var o={_id:item._id};
            o[field]=value
            var query={update:field,translate:'translate'}
            self.Items.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };

    }

    translateStuffCtrl.$inject=['Stuff','$stateParams','$q','$uibModal','global','exception','$timeout','Confirm','$rootScope'];
    function translateStuffCtrl(Stuff,$stateParams,$q,$uibModal,global,exception,$timeout,Confirm,$rootScope){
        var self = this;
        self.Items=Stuff;
        self.item={};
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.saveField=saveField;
        //console.log($stateParams)

        var lang = global.get('store').val.lang;
        var translateLang = $stateParams.lang


        //********************activate***************************
        activate();
        //*******************************************************
        var acts =[];
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function(res) {
                self.item=res;
                //console.log(self.item)
                var items=[];
                addItem(lang,items,self.item,-1,acts,'Stuff',self.item._id);
                self.items=items;
            } ).then(function () {
                //console.log(acts)
                if(acts.length){
                    return $q.all(acts.map(rP))
                }
                function rP(data) {
                    var o={_id:self.item._id};
                    o[data.field]=data.value
                    var query={update:data.field,translate:'translate'}
                    //console.log(query,o)
                    return self.Items.save(query,o).$promise
                }

            })
                .then(function (res) {
                    //console.log(res)
                })
                .catch(function(err){
                    err = err.data||err
                    exception.catcher('получение объекта')(err)
                });
        }
        function getItem(id) {
            //console.log(id)
            return $q(function(resolve,reject){
                self.Items.get({_id:id},function(res){resolve(res)},function(err){
                    console.log(err)
                    if(err && err.status && err.status==404){
                        resolve(404)
                    }else{
                        resolve()
                    }
                })
            })
        }

        function saveField(field,value){
            var o={_id:self.item._id};
            o[field]=value
            var query={update:field,translate:'translate'}
            self.Items.save(query,o,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
    }

    translateAllCtrl.$inject=['$rootScope']
    function translateAllCtrl($rootScope) {
        console.log('translateAll')

    }


    function addItem(lang,items,item,i,acts,model,_id) {
        if(!model || model!='HomePage'){
            if(item.nameL && item.nameL[lang]){
                var nameL={data:item.nameL,type:'input',i:i,field:'nameL'}
                if(model){
                    nameL.model=model;
                    nameL._id=_id;

                }
                items.push(nameL)
            }else{
                if(!item.nameL){
                    item.nameL={}
                    item.nameL[lang]=item.name;
                    var o={field:'nameL',value:item.nameL}
                    if(model){
                        o.model=model;
                        o._id=_id;

                    }
                    acts.push(o)
                    var nameL={data:item.nameL,type:'input',i:i,field:'nameL'}
                    if(model){
                        nameL.model=model;
                        nameL._id=_id;

                    }
                    items.push(nameL)
                }
            }
            if(item.positionL && item.positionL[lang]){
                var positionL={data:item.positionL,type:'input',i:-1,field:'positionL'}
                if(model){
                    nameL.model=model;
                    nameL._id=_id;

                }
                items.push(positionL)
            }else{
                if(!item.positionL && item.position && model && model=='Master'){
                    item.positionL={}
                    item.positionL[lang]=item.position;

                    var o={field:'positionL',value:item.positionL}
                    if(model){
                        o.model=model;
                        o._id=_id;

                    }
                    acts.push(o)
                    var positionL={data:item.positionL,type:'input',i:-1,field:'positionL'}
                    if(model){
                        nameL.model=model;
                        nameL._id=_id;

                    }
                    items.push(positionL)
                }
            }
            if(item.descL && item.descL[lang] && item.descL[lang].trim()){
                var tt=(!model || model!='Filters')?'text':'input';

                var descL={data:item.descL,type:tt,i:i,field:'descL'}
                if(model){
                    descL.model=model;
                    descL._id=_id;

                }
                items.push(descL)
            }else{
                var tt=(!model || model!='Filters')?'text':'input';
                if(!item.descL && item.desc){
                    item.descL={}
                    item.descL[lang]=item.desc;
                    var o={field:'descL',value:item.descL}
                    if(model){
                        o.model=model;
                        o._id=_id;

                    }
                    acts.push(o)
                    var descL={data:item.descL,type:tt,i:i,field:'descL'}
                    if(model){
                        descL.model=model;
                        descL._id=_id;

                    }
                    items.push(descL)
                }
            }
        }

        if(item.blocks && item.blocks.length){
            item.blocks.forEach(function (b,ii) {
                //console.log(b)
                if(b.nameL && b.nameL[lang]){
                    var nameL={data:b.nameL,type:'input',i:ii,field:'nameL'}
                    if(model){
                        nameL.model=model;
                        nameL._id=_id;

                    }
                    items.push(nameL)
                }else{
                    if(b.name){
                        if(!b.nameL){b.nameL={}}
                        b.nameL[lang]=b.name;
                        var o={field:'blocks.'+ii+'.name1L',value:b.name1L}
                        if(model){
                            o.model=model;
                            o._id=_id;

                        }
                        acts.push(o)
                        var nameL={data:b.nameL,type:'input',i:ii,field:'nameL'}
                        if(model){
                            nameL.model=model;
                            nameL._id=_id;

                        }
                        items.push(nameL)
                    }
                }
                if(b.name1L && b.name1L[lang]){
                    var name1L={data:b.name1L,type:'input',i:ii,field:'name1L'}
                    if(model){
                        name1L.model=model;
                        name1L._id=_id;

                    }
                    items.push(name1L)
                }else{
                    if(b.name1){
                        if(!b.name1L){b.name1L={}}
                        b.name1L[lang]=b.name1;
                        var o={field:'blocks.'+ii+'.name1L',value:b.name1L}
                        if(model){
                            o.model=model;
                            o._id=_id;

                        }
                        acts.push(o)
                        var name1L={data:b.name1L,type:'input',i:ii,field:'name1L'}
                        if(model){
                            name1L.model=model;
                            name1L._id=_id;

                        }
                        items.push(name1L)
                    }
                }
                /*if(b.descL && b.descL[lang]){
                    console.log(ii,b.descL[lang].trim()&&1)
                }*/

                if(b.descL && b.descL[lang] && b.descL[lang].trim()){

                    var descL={data:b.descL,type:'text',i:ii,field:'descL'}
                    if(model){
                        descL.model=model;
                        descL._id=_id;

                    }
                    items.push(descL)
                }else{
                    if(b.desc && b.desc.trim()){
                        if(!b.descL){b.descL={}}
                        b.descL[lang]=b.desc;
                        var o= {field:'blocks.'+ii+'.descL',value:b.descL}
                        if(model){
                            o.model=model;
                            o._id=_id;

                        }
                        acts.push(o)
                        var descL={data:b.descL,type:'text',i:ii,field:'descL'}
                        if(model){
                            descL.model=model;
                            descL._id=_id;

                        }
                        items.push(descL)
                    }
                }
                if(b.desc1L && b.desc1L[lang] && b.descL[lang].trim()){
                    var desc1L={data:b.desc1L,type:'text',i:ii,field:'desc1L'}
                    if(model){
                        desc1L.model=model;
                        desc1L._id=_id;

                    }
                    items.push(desc1L)
                }else{
                    if(b.desc1){
                        if(!b.desc1L){b.desc1L={}}
                        b.desc1L[lang]=b.desc1;
                        var o= {field:'blocks.'+ii+'.desc1L',value:b.desc1L}
                        if(model){
                            o.model=model;
                            o._id=_id;

                        }
                        var desc1L={data:b.desc1L,type:'text',i:ii,field:'desc1L'}
                        if(model){
                            desc1L.model=model;
                            desc1L._id=_id;

                        }
                        items.push(desc1L)
                    }
                }
                if(b.imgs && b.imgs.length && b.type=='slider'){

                    b.imgs.forEach(function (s,j) {
                        if(s.nameL && s.nameL[lang]){
                            var nameL={data:s.nameL,type:'input',i:ii,field:'imgs.'+j+'.nameL'}
                            if(model){
                                nameL.model=model;
                                nameL._id=_id;

                            }
                            items.push(nameL)
                        }
                        if(s.descL && s.descL[lang]){
                            var descL={data:s.descL,type:'text',i:ii,field:'imgs.'+j+'.descL'}
                            if(model){
                                descL.model=model;
                                descL._id=_id;

                            }
                            items.push(descL)
                        }
                        if(s.button && s.button.textL && s.button.textL[lang]){
                            var textL={data:s.button.textL,type:'input',i:ii,field:'imgs.'+j+'.button.textL'}
                            if(model){
                                textL.model=model;
                                textL._id=_id;

                            }
                            items.push(textL)
                        }
                    })
                }
            })

        }
    }

})()
