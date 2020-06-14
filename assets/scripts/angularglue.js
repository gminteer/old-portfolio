var myApp = angular.module('myApp', []);
/* can't directly attach angular.js to a random data source or it gets cranky */
myApp.controller('about', ['$scope', function ($scope) {
    if(typeof d == 'undefined') { /* [everything in javascript is static](mind_blown.jpg)*/
        var d = {
            cardText: faker.name.jobTitle(),
            longParagraph: faker.lorem.paragraphs() + " " + faker.lorem.paragraphs() + " " + faker.lorem.paragraphs(),
            paragraph: faker.lorem.paragraphs(),
        };
    };
    $scope.cardText = d.cardText;
    $scope.longParagraph = d.longParagraph;
    $scope.paragraph = d.paragraph;
}]);
/* two wide tiles for secondary emphasis */
for(i = 0; i < 2; i++ ) {
    myApp.controller('wideTile' + i, ['$scope', function ($scope) {
        if(typeof d == 'undefined') {
            var d = {
                title: faker.commerce.productName(),
                text: faker.lorem.sentence()
            };
        };
        $scope.title = d.title;
        $scope.text = d.text;
    }]);
};
/* two tall tiles for things that require more wordy commentary and/or tertiary emphasis */
for(i = 0; i < 2; i++ ) {
    myApp.controller('tallTile' + i, ['$scope', function ($scope) {
        if(typeof d == 'undefined') {
            var d = {
                title: faker.hacker.adjective() + ' ' + faker.hacker.noun(),
                text: faker.lorem.paragraph()
            };
        };
        $scope.title = d.title;
        $scope.text = d.text;
    }]);
};
/* four "normal" tiles */
for(i = 0; i < 4; i++ ) {
    myApp.controller('tile' + i, ['$scope', function ($scope) {
        if(typeof d == 'undefined') {
            var d = {
                title: faker.hacker.adjective() + ' ' + faker.hacker.noun(),
                text: faker.lorem.sentence()
            };
        };
        $scope.title = d.title;
        $scope.text = d.text;
    }]);
};
/* grab a random fortune from a REST server some dude that works for Google set up as a personal joke */
myApp.controller('fortuneData', function($scope, $http) {
    $http.defaults.headers.common.Accept = 'text/json'; /* if we don't tell the endpoint we want JSON we get XML (ewwwww!) */
    $http.get('https://api.ef.gy/fortune')
    .then(function(response) { /* success */
        /* censor things in /off/ because someone might get upset and the API doesn't let me filter */
        if(response.data.file.includes('/off/')) {
            $scope.text = 'You miss 100% of the shots you don\'t take.';
            $scope.source = 'Albert Einstein';
        } else {
            $scope.text = response.data.cookie;
            $scope.source = response.data.file + "#" + response.data['file-id']; /* it can't be "response.data.file-id" because of the "-" character */
        };
    }, function(response) { /* failure */
        $scope.text = 'something went wrong :(';
        $scope.source = 'This Website';
        console.error(response); /* proper error checking */
    });
});