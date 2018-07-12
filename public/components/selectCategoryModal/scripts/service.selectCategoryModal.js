angular.module('gmall.services')
.service('SelectCategory', ['$q','$uibModal','Sections', function($q,$uibModal,Sections) {
    this.bindCategoryForFilterBrandCol=function(id,field,revers){
        $q.when()
            .then(function(){
                return Sections.getSections();
            } )
            .then(function(sections){
                var options={
                    animation: true,
                    templateUrl: 'components/selectCategoryModal/bindCategoryToFilter.html',
                    controller: 'bindCategoryToFilterCtrl',
                    size: 'lg',
                    resolve: {
                        sections: function () {
                            return sections;
                        },
                        field:function () {
                            return field;
                        },
                        id:function () {
                            return id;
                        },
                        revers:function () {
                            return revers;
                        }
                    }
                }
                return options;
            })
            .then(function(options){
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedCategory) {
                    console.log(selectedCategory)
                    if(selectedCategory._id!=$scope.item.category._id){
                        Category.get({id:selectedCategory._id},function(res){
                            $scope.tagsValue=setTagsValue($scope.item.tags,res.filters)
                            $scope.item.category=res;
                        })

                    }
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            })

    }
}])