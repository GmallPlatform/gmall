'use strict';
angular.module('gmall.directives')
.directive('bindModelToCategory',['Sections','Category','$q','$resource',function(Sections,Category,$q,$resource){
    return {
        restrict:"E",
        scope:{
            id:'@',
            field:'@',
            backstate:'@',
            model:'@',
            revers:'@'
        },
        templateUrl:"components/bindModelToCategory/bindModelToCategory.html",
        link:function($scope,element,attrs){

            var field=$scope.field;
            //console.log(field)
            function checkField(section){
                section.showCheck=false;
                if(section.categories && section.categories.length){
                    section.checkAll=true;
                    section.showCheck=true;
                    section.categories.forEach(function(category){
                        if(!$scope.revers){
                            if(category[field].indexOf($scope.id)>-1){
                                category.checked=true;
                            }else{
                                section.checkAll=false;
                            }
                        }else{
                            if($scope.item[field].indexOf(category._id)>-1){
                                category.checked=true;
                            }else{
                                section.checkAll=false;
                            }
                        }

                    })
                }
                if(section.child && section.child.length){
                    section.checkAll=false;
                    section.child.forEach(function(s){
                        if (checkField(s)){
                            section.showCheck=true;
                        }
                    })
                }
                return section.showCheck;
            }
            function checkCategory(category){
                if (category.checked){
                    if(!$scope.revers){
                        if(!category[field] ){
                            category[field]=[];
                            category[field].push($scope.id)
                        }else{
                            if(category[field].indexOf($scope.id)<0){
                                category[field].push($scope.id)
                            }
                        }
                    }else{
                        if($scope.item[field].indexOf(category._id)<0){
                            $scope.item[field].push(category._id)
                        }
                        category=$scope.item;
                    }

                }else{
                    if(!$scope.revers){
                        if(category[field] && category[field].length){
                            var i = category[field].indexOf($scope.id);
                            if(i>-1){
                                category[field].splice(i,1)
                            }
                        }
                    }else{
                        if($scope.item[field] && $scope.item[field].length){
                            var i = $scope.item[field].indexOf(category._id);
                            if(i>-1){
                                $scope.item[field].splice(i,1)
                            }
                        }
                        category=$scope.item;
                    }
                }
                Category.save({update:field},category);
            }
            $scope.bindFilter=function(category,section){
                checkCategory(category)
                section.checkAll=true;
                for(var i= 0,l=section.categories.length;i<l;i++){
                    if(!$scope.revers){
                        if(section.categories[i][field].indexOf($scope.id)<0){
                            section.checkAll=false;
                            break;
                        }
                    }else{
                        if($scope.item[field].indexOf(section.categories[i]._id)<0){
                            section.checkAll=false;
                            break;
                        }
                    }

                }
            }
            $scope.bindFilterForSection=function(section,checkAll){
                section.checkAll=checkAll;
                if(section.categories && section.categories.length){
                    section.categories.forEach(function(category){
                        category.checked=checkAll;
                        checkCategory(category)
                    })
                }

                if(section.child && section.child.length){
                    section.child.forEach(function(s){
                        $scope.bindFilterForSection(s,checkAll)
                    })
                }
            }
            function foo(s){
                if (s.child && s.child.length){
                    for(var i = 0,l= s.child.length;i<l;i++){
                        var section=s.child[i];
                        //console.log( 'section - ',section.name,' ',section.showCheck)
                        if (section.showCheck){
                            if (section.child && section.child.length){
                                section.checkAll=foo(section);
                                if (!section.checkAll){
                                    return false;
                                }
                                //console.log( 'checkAll - ',section.name,' ',section.checkAll)
                            } else{
                                //console.log('end section ', section.name,' ',section.checkAll)
                                if(!section.checkAll){
                                    return false;
                                }
                            }
                        }
                    }
                    return true;
                }

            }


            $q.when()
                .then(function(){
                    var q=$q.defer();
                    if($scope.model){
                        var Item = $resource('/api/collections/'+$scope.model+'/:id',{id:'@_id'});
                        Item.get({id:$scope.id},function(res){
                            if(!res[$scope.field]){
                                res[$scope.field]=[]
                            }
                            $scope.item=res;
                            q.resolve()
                        })
                        Category=Item;
                    }else{
                        q.resolve()
                    }
                    return q.promise
                })
                .then(function(){
                    var q=$q.defer();
                    Sections.query(function(res){
                        res.shift();
                        $scope.sections=res.filter(function(el){return el.level===0});
                        $scope.sections.forEach(checkField)
                        $scope.sections.forEach(function(s){
                            if(s.showCheck){
                                s.checkAll=foo(s);
                            }
                        })
                        q.resolve()
                    });
                    return q.promise
                })


        }
    }
}])

