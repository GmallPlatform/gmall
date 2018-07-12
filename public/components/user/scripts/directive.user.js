'use strict';
(function(){
angular.module('gmall.directives')
.directive("userCard", function() {
    return {
        restrict: "E",
        scope:{
          deleteUserFunction:'&',
            user:'='
        },
        templateUrl: "/components/user/user.html",
        link:function(scope){
            scope.moment=moment;
            scope.deleteUser=function(id){
                scope.deleteUserFunction({id:id});
            }
        }
    }
})

.directive("userProfile",userProfile);
    function userProfile(){
        return{
            restrict:"E",
            scope:{},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/user/userProfile.html',
        }
    }
    itemCtrl.$inject=['global','$user','exception','$timeout','$scope','$q'];
    function itemCtrl(global,$user,exception,$timeout,$scope,$q){
        var self=this;
        self.Items=$user;
        self.global=global;
        self.user=global.get('user');
        self.changePswd=changePswd;
        self.changeEmail=changeEmail;

        self.saveField=saveField;
        /*self.saveProfile=saveProfile;
        function saveProfile(form){
            var o={_id:self.user.val._id};
            o.profile=self.user.val.profile
            self.Items.save({update:'profile'}, o ).$promise.then(
                function(){
                    exception.showToaster('note','обновление профиля','все OK')
                },
                function(err){
                    exception.catcher('обновление профиля',err.data)
                });

        };*/
        var listener =$scope.$watch(function(){
            return self.user.val
        },function (n,o) {
            if(n){
                listener();
                if(!n.profile){n.profile={}}
                if(!n.profile.cityId){n.profile.cityId=null;}
                if(!n.profile.phone){n.profile.phone='';}
                $scope.$watch(function () {return self.user.val.profile.cityId},function (n,o) {
                    if(n!=o){
                        saveField('cityId')
                    }

                })
                $scope.$watch(function () {return self.user.val.profile.phone},function (n,o) {
                    if(n!=o){
                        $q.when()
                            .then(function () {
                                console.log(self.user.val.profile.phone)
                                if(self.user.val.profile.phone){
                                    return $user.getItem(self.user.val.profile.phone,'profile.phone')
                                }else{
                                    return null;
                                }

                            })
                            .then(function(res){
                                console.log(res)
                                console.log(!res ||  (res && !res._id) || (res && res._id && res._id==self.user.val._id))
                                if(!res ||  (res && !res._id) || (res && res._id && res._id==self.user.val._id)){
                                    saveField('phone')
                                }else{

                                    self.phoneExist=true;
                                    $timeout(function () {
                                        self.phoneExist=false;
                                    },5000)
                                }

                            })

                    }
                })
            }
        })
        /*$scope.$watch(function () {
            if(self.user)
            return
        })*/
        function changePswd(_){
            $q.when()
                .then(function(){
                    return $user.changePswd(self.user.val._id)
                })
                .then(function () {
                    exception.showToaster('succes','статус','обновлено!')
                })
                .catch(function(err){
                    if(err){
                        err=err.data||err;
                        exception.catcher('смена пароля')(err)
                    }

                })
        }

        function saveField(field) {
           // console.log(field)
            var o ={_id:self.user.val._id}
            var fieldFoDB='profile.'+field;
            o[fieldFoDB]=self.user.val.profile[field]
            if(field=='cityId'){
                fieldFoDB+=' profile.city';
                o['profile.city']=self.user.val.profile['city']
            }
            self.Items.save({update:fieldFoDB},o,function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            })
        }
        function changeEmail(){
            //console.log('changeEmail');
            $q.when()
                .then(function () {
                    return $user.changeEmail(global.get('user').val._id)
                })
                .then(function (res) {
                    console.log(res)
                    global.get('user').val.email=res
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('change email')(err)
                    }

                })

            /*self.Items.save(self.email,function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            })*/
        }


        //сделать как в оформлении заказа сохранение по кнопке
    }

})()