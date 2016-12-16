(function () {
    'use strict';

   

    angular
        .module('app')
        .controller('HomeController', HomeController);

    
    HomeController.$inject = ['UserService', '$rootScope', 'FlashService', '$scope'];
    function HomeController(UserService, $rootScope, FlashService, $scope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.register = register;

        initController();

        function register() {
            vm.dataLoading = true;
            UserService.Update(vm.user)
                .then(function (response) {
                    FlashService.Success('Changed your data successful', true);
                    
                        
                });
            }

        function register2() {
            vm.dataLoading = true;
            vm.user.firstName =  selectedUser.firstName;
            UserService.Update(vm.user)
                .then(function (response) {
                    FlashService.Success('Changed your data successful', true);
                    
                        
                });
            }    

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        $scope.showMe = false;
        $scope.updateToggle = function() {
        $scope.showMe = !$scope.showMe;
        }
    }

})();