
angular.module('i-comments',[])
    .directive('orders-wrap',function(){
        return {
            restrict: "E",
            replace: true,
            scope :{
                orders:"@"
            },
            controller: function($scope,global,$timeout) {
                $timeout(function(){
                    $scope.comment={};
                    $scope.user=global.get('user');
                    Comments.setStuffId($scope.parent);
                    $scope.comments=Comments.getComments($scope.parent);
                    $scope.addChildComment = Comments.addChildComment;
                    $scope.deleteComment=Comments.deleteComment;
                    $scope.paginate=Comments.getPaginate();
                    $scope.moreComments = Comments.moreComments;
                },50)

            },
            templateUrl:'manager/views/template/ordersWrap.html',
            link:function(scope, element, attrs){
                /*attrs.$observe('parent', function() {
                    Comments.setStuffId(attrs['parent']);
                    scope.parent=attrs['parent'];
                });*/
                scope.$on('$destroy', function() {
                    //Comments.setEmpty()
                })
            }
        }
    })

    .directive('comments', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                comments: '=',
                depth:'='
            },
            template: "<ul class='content-comments'><comment ng-repeat='comment in comments' comment ='comment' depth='depth'></comment></ul>"
        }
    })

    .directive('comment', function ($compile,global,Comments) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                comment: '=',
                depth:'='
            },
            /*controller : function($scope,global){
             $scope.user=global.get('user');
             },*/
            transclude: true,
            templateUrl:'views/template/member.html',
            link: function (scope, element, attrs,controller, $transclude) {
                scope.depth =parseInt(scope.depth)+1;
                scope.user=global.get('user');
                scope.deleteComment=Comments.deleteComment;
                $transclude(function (clone, $outerScope) {
                    scope.comments=$outerScope['comments'];
                });
                var collectionSt = '<comments comments="comment.children"  depth="depth"></comments>';
                if (angular.isArray(scope.comment.children)) {
                    $compile(collectionSt)(scope, function(cloned, scope)   {
                        $(element[0].children[3]).append(cloned);
                    });
                }
                scope.toggled = true;
                scope.btnText = 'ответить';

                scope.toggle = function() {
                    scope.toggled = !scope.toggled;
                    scope.btnText = (scope.toggled) ? 'ответить' : 'закрыть';
                    scope.child = {};
                };
                scope.toggleEdit = function() {
                    scope.toggled = !scope.toggled;
                    scope.btnText = (scope.toggled) ? 'ответить' : 'закрыть';
                    //console.log(scope.comment)
                    scope.child = scope.comment;
                };
                scope.collapsed = true;
                scope.collapse = function() {
                    scope.collapsed=!scope.collapsed;
                }
                scope.addComment=function(child){
                    scope.toggle();
                    if (!child.parent)
                        child.parent=scope.comment._id;
                    if (!scope.comment.children || !scope.comment.children){
                        scope.comment.children=[];
                    }
                    Comments.addChildComment(child,scope.comment.children);
                }
            }
        }
    })
    .factory('Comments',['$resource','dialogs','global',function($resource,dialogs,global){
        var Comment=$resource('/api/collections/Comment/:id',{id:'@_id'});
        var paginate={page:0,totalItems:0},query;
        var comments=[];
        function getComment(){
            Comment.query({query:query,perPage:5 , page:paginate.page},function(res){
                if (paginate.page==0 && res.length>0){
                    paginate.totalItems=res.shift().index;
                }
                for (var i= 0,l=res.length;i<l;i++){
                    comments.push(res[i]);
                }
                // или так
                //comments.push.apply(comments,res);
            })
        }
        return {
            setStuffId:function(id){
                query= JSON.stringify({parent:id});
                getComment(JSON.stringify({parent:id}))
            },
            moreComments:function(){
                paginate.page++;
                getComment();
            },
            addChildComment :function(comment,parent) {
                // todo сделать валидацию формы с ошибками
                if (!comment.date)
                    comment.date=new Date();
                if (global.get('user').val){
                    if (!comment.name)
                        comment.name=global.get('user').val.name;
                    if (!comment.profileUrl && global.get('user').val.profileUrl)
                        comment.profileUrl=global.get('user').val.profileUrl;
                }
                if (!comment.text ||!comment.name){
                    console.log('не заполнены поля.');
                    return;
                }
                comment.text= comment.text.substring(0,500);
                comment.name=comment.name.substring(0,100);
                if (comment.profileUrl)
                    comment.profileUrl=comment.profileUrl.substring(0,100);
                // для редактирования комментария. приводим заполненный массив вложенных комментариев к обычному массивы их id
                var commentForServer = angular.copy(comment);
                if (commentForServer.children){
                    commentForServer.children=commentForServer.children.map(function(el){return el._id})
                } else {
                    commentForServer.children=[];
                }
                Comment.save(commentForServer,function(res){
                    if (!comment._id){ //новый
                        comment._id=res.id;
                        comment.children=[];
                        parent.unshift(angular.copy(comment));
                    }
                },function(err){
                    return false;
                });
            },
            deleteComment : function(id,comments){
                var dlg = dialogs.confirm('Подтверждение','Вы уверены?');
                dlg.result.then(function(btn){
                    var i,l;
                    for (i= 0,l=comments.length;i<l;i++){
                        if (comments[i]._id==id){
                            break;
                        }
                    }
                    comments.splice(i,1);
                    Comment.delete({id:id},function(res){},function(err){console.log(err)})
                },function(btn){ });
            },
            setEmpty : function(){
                comments.length=0;
                paginate.page=0;
                paginate.totalItems=0;
            },
            getComments:function(id){
                query= JSON.stringify({parent:id});
                //console.log(query);
                return comments;
            },
            getPaginate:function(){
                return paginate;
            }
            /*getPage:function(){
             return paginate.page;
             }*/


        }
    }])