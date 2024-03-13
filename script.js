var app = angular.module('myapp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/blog', {
        templateUrl: 'bloglist.htm',
        controller: 'Tablecontroller'
    }).when('/addblog', {
        templateUrl: 'blog.htm',
        controller: 'myctrl'
    })
    .when('/usermsg', {
        template: '<strong>Welcome Vinothkumar kalidass</strong>'
       
    })
    .when('/casestudy', {
        templateUrl: 'casestudylist.htm',
        controller: 'Tablectrl'
    })
    .when('/addcasestudy', {
        templateUrl: 'casestudy.htm',
        controller: 'mycontroll'
    })
});

app.controller('myctrl', function($scope,$routeParams, $location, $window, TableDataService) {
   
    $scope.formdata = {
        
        date: new Date()
    }  
    $scope.submit = function() {
       
        $scope.myForm.$setDirty();
          
        if($scope.myForm.$valid)
        {
            TableDataService.addToTableData($scope.formdata);
            $scope.formdata = {};
            $window.alert('Data submitted successfully!');
            $location.path('/blog');
        }
        else{
           
            $window.alert('Please fill all the field...');
        }
       
    };

   
   


    var index = $routeParams.index;
    $scope.formdata = angular.copy(TableDataService.getTableData()[index]);

    $scope.updateRow = function() {
        if($scope.myForm.$valid){

            TableDataService.updateTableData(index, $scope.formdata);
            alert('Data updated successfully!');
            // Redirect back to the list page
            $location.path('/blog');
        }
        else{
            $window.alert('Please fill all required field');
        }
       
    };
    
    $scope.back=function(){
        $location.path('/blog');
    }
});

app.controller('Tablecontroller', function($scope, $location,TableDataService) {

    $scope.formdataarray= [];
    $scope.formdataarray = TableDataService.getTableData();
    $scope.selectedIndex = null;
    $scope.formdata = {}; // Initialize formdata

    $scope.redirectToEdit = function(index) {
        // Redirect to edit page with the index as a parameter
        $location.url('addblog?index=' + index);
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
        },
        updateTableData: function(index, newData) {
            // Check if the index is valid
            if (index >= 0 && index < tableData.length) {
                // Update the data at the specified index
                tableData[index] = newData;
            } else {
                // Handle invalid index
                console.error("Invalid index:", index);
            }
        }
    };
});

/* case study controller */

app.controller('mycontroll', function($scope,$routeParams, $location, $window, CasestudyTableDataService) {
   
    $scope.caseStudyFormData = {
        
        date: new Date()
    }  
    $scope.submit = function() {
       
        $scope.myForm.$setDirty();
          
        if($scope.myForm.$valid)
        {
            CasestudyTableDataService.addToTableData($scope.caseStudyFormData);
            $scope.caseStudyFormData = {};
            $window.alert('Data submitted successfully!');
            $location.path('/casestudy');
        }
        else{
            console.log('$valid:', $scope.myForm.$valid);
            console.log('$error:', $scope.myForm.$error);
            console.log('$dirty:', $scope.myForm.$dirty);

            $window.alert('Please fill all the field...');
        }
       
    };

    var index = $routeParams.index;
    $scope.caseStudyFormData = angular.copy(CasestudyTableDataService.getTableData()[index]);

    $scope.updateRow = function() {
        if($scope.myForm.$valid){

            CasestudyTableDataService.updateTableData(index, $scope.caseStudyFormData);
            alert('Data updated successfully!');
            // Redirect back to the list page
            $location.path('/casestudy');
        }
        else{
            $window.alert('Please fill all required field');
        }
       
    };
    
    $scope.back=function(){
        $location.path('/casestudy');
    }
});
app.controller('Tablectrl', function($scope, $location,CasestudyTableDataService) {

    $scope.formdataarray= [];
    $scope.formdataarray = CasestudyTableDataService.getTableData();
    $scope.selectedIndex = null;
    $scope.caseStudyFormData = {}; // Initialize formdata

    $scope.redirectToEdit = function(index) {
        // Redirect to edit page with the index as a parameter
        $location.url('addcasestudy?index=' + index);
    };


    $scope.delete = function(index) {
        var confirmation = confirm("Are you sure you want to delete this item?");
        if (confirmation) {
            console.log('Selected index:', index);
            $scope.formdataarray.splice(index, 1);
        }
    };

    
});

app.service('CasestudyTableDataService', function() {
    var tableData = [];

    return {
        getTableData: function() {
            return tableData;
        },
        addToTableData: function(datasrc) {
            tableData.push(datasrc);
        },
        updateTableData: function(index, newData) {
            // Check if the index is valid
            if (index >= 0 && index < tableData.length) {
                // Update the data at the specified index
                tableData[index] = newData;
            } else {
                // Handle invalid index
                console.error("Invalid index:", index);
            }
        }
    };
});
