var app = angular.module('myapp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/firstmsg', {
        templateUrl: 'route.htm',
        controller: 'myctrl'
    }).when('/secondmsg', {
        templateUrl: 'red.htm',
        controller: 'Tablecontroller'
    }).when('/thirdmsg', {
        template: '<h1>Welcome to the CMS</h1>'
    });
});

app.controller('myctrl', function($scope, $location, $window, TableDataService) {
    $scope.formdata = {
        date: new Date()
    };

    $scope.submit = function() {
        TableDataService.addToTableData($scope.formdata);
        $scope.formdata = {};
        $location.path('/red.htm');
        $window.alert('Data submitted successfully!');
    };
});

app.controller('Tablecontroller', function($scope, TableDataService) {

    $scope.formdataarray= [];
    $scope.formdataarray = TableDataService.getTableData();
    $scope.selectedIndex = null;
    $scope.formdata = {}; // Initialize formdata

    $scope.view = function(index) {
        $scope.formdata = angular.copy($scope.formdataarray[index]);
        $scope.selectedIndex = index; // Set selected index for update
    };

    $scope.delete = function(index) {
        var confirmation = confirm("Are you sure you want to delete this item?");
        if (confirmation) {
            console.log('Selected index:', index);
            $scope.formdataarray.splice(index, 1);
        }
    };

    
});

app.service('TableDataService', function() {
    var tableData = [];

    return {
        getTableData: function() {
            return tableData;
        },
        addToTableData: function(data) {
            tableData.push(data);
        }
    };
});
