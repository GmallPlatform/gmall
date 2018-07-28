(function(){
    angular.module('gmall.directives')
        .directive('warehouse',warehouseDirective)

    function warehouseDirective(){
        return {
            rectrict:'E',
            scope: {},
            bindToController: true,
            controller: warehouseCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'bookkeep/components/warehouse/warehouse.html',
        }
    };

    warehouseCtrl.$inject=['Material','$state','global','$timeout','$anchorScroll','Confirm'];
    function warehouseCtrl(Items,$state,global,$timeout,$anchorScroll,Confirm) {
        var self = this;
        self.mobile = global.get('mobile').val;
        self.global = global;
        self.$state = $state;
        self.Items = Items;
        self.moment = moment;
        self.query = {};
        self.paginate = {page: 0, rows: 20, totalItems: 0}

        self.getList = getList;

        self.searchItem = searchItem;
        self.cloneItem=cloneItem;
        self.deleteItem = deleteItem;

        //*******************************************************
        activate();

        function activate() {
            return getList().then(function () {
            }).then(function () {
            });
        }

        function getList() {
            return Items.getList(self.paginate, self.query)
                .then(function (data) {
                    self.items = data;
                    console.log(self.items)
                });
        }


        function searchItem(searchStr) {
            if (searchStr) {
                self.query = {name: searchStr.substring(0, 10)};
            } else {
                self.query = {};
            }

            self.paginate.page = 0;
            return getList().then(function () {
                console.log('Activated news list View');
            });
        }
        function cloneItem(item) {
            var name;
            self.Items.create()
                .then(function (res) {
                    name = res;
                    return self.Items.getItem(item._id)
                })
                .then(function (master) {
                    self.newItem = angular.copy(master)
                    self.newItem.name = name;
                    self.newItem.nameL = {};

                    delete self.newItem._id
                    delete self.newItem.__v
                    delete self.newItem.url;
                    console.log(self.newItem)
                    self.newItem.blocks.forEach(function (block) {
                        delete block.img;
                        delete block._id;
                        if (block.type == 'stuffs') {
                            if (block.stuffs && block.stuffs.length) {
                                block.stuffs = block.stuffs.map(function (s) {
                                    return s._id
                                })
                            }
                        }
                        block.imgs = []
                    })
                    //throw 'test'
                    return self.Items.save(self.newItem).$promise
                })
                .then(function (res) {
                    self.newItem._id = res.id;
                    self.newItem.url = res.url;
                    self.paginate.page = 0;
                    getList(self.paginate);
                })
                .then(function () {
                    var id = self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function () {
                        $state.go('frame.master.item', {id: id})
                    }, 100)

                })
                .catch(function (err) {
                    if (err) {
                        exception.catcher('создание мастера')(err)
                    }
                })
        }
        function deleteItem(item) {
            var folder = 'images/' + global.get('store').val.subDomain + '/News/' + item.url
            // console.log(folder)
            Confirm("удалить?")
                .then(function () {
                    return News.delete({_id: item._id}).$promise;
                })
                .then(function () {
                    return getList();
                })
                .then(function () {
                    return Photo.deleteFolder('News', folder)
                })
                .catch(function (err) {
                    err = (err && err.data) || err
                    if (err) {
                        exception.catcher('удаление новости')(err)
                    }

                })
        }
    }
})()