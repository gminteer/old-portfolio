var myApp = angular.module('myApp', []);
myApp.controller('fakeData', ['$scope', function ($scope) {
    $scope.faker = faker;
}]);