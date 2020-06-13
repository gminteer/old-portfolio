var myApp = angular.module('myApp', []);

myApp.controller('about', ['$scope', function ($scope) {
    if(typeof d == 'undefined') {
        var d = {
            cardTitle: faker.name.jobTitle(),
            cardText: faker.hacker.phrase(),
            longParagraph: faker.lorem.paragraphs(),
            paragraph: faker.lorem.paragraph(),
        };
    };
    $scope.cardTitle = d.cardTitle;
    $scope.cardText = d.cardText;
    $scope.longParagraph = d.longParagraph;
    $scope.paragraph = d.paragraph;
}]);
myApp.controller('doubleTile', ['$scope', function ($scope) {
    if(typeof d == 'undefined') {
        var d = {
            title: faker.commerce.productName(),
            text: faker.lorem.sentences()
        };
    };
    $scope.title = d.title;
    $scope.text = d.text;
}]);

for(i = 0; i < 2; i++ ) {
    myApp.controller('wideTile' + i, ['$scope', function ($scope) {
        if(typeof d == 'undefined') {
            var d = {
                title: faker.commerce.productName(),
                text: faker.lorem.sentence()
            }
        }
        $scope.title = d.title;
        $scope.text = d.text;
    }])
}

for(i = 0; i < 2; i++ ) {
    myApp.controller('tallTile' + i, ['$scope', function ($scope) {
        if(typeof d == 'undefined') {
            var d = {
                title: faker.hacker.adjective() + faker.hacker.noun(),
                text: faker.lorem.paragraph()
            }
        }
        $scope.title = d.title;
        $scope.text = d.text;
    }])
}
for(i = 0; i < 4; i++ ) {
    myApp.controller('tile' + i, ['$scope', function ($scope) {
        if(typeof d == 'undefined') {
            var d = {
                title: faker.hacker.adjective() + faker.hacker.noun(),
                text: faker.lorem.sentence()
            }
        }
        $scope.title = d.title;
        $scope.text = d.text;
    }])
}
myApp.controller('fortuneData', ['$scope', function ($scope) {
    var fortuneService = 'https://api.ef.gy/fortune';
    var fortune = {
        text: 'something went wrong :(',
        source: 'This Website'
    };
    $.ajax({
        headers: {
            Accept: 'text/json',
        },
        url: fortuneService,
        dataType: 'json',
        jsonp: false,
        success: function(data) {
            $scope.fortune = data.cookie;
            $scope.source = data.file + "#" + data['file-id'];
            console.info($scope);
        },
        error: function(fortune, error, status) {
            console.error(fortune, error, status);
        }
    });
    console.info("hi there");
}]);