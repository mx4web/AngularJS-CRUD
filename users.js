angular.module('myApp', [])
    .controller('userCtrl', function ($scope, $filter) {

        $scope.id = '';
        $scope.fName = '';
        $scope.lName = '';
        $scope.gender = '';
        $scope.age = '';
        $scope.users = [
            {id: 1, fName: 'Megan', lName: "Pege", gender: "Female", age: 25},
            {id: 2, fName: 'Kim', lName: "Pim", gender: "Male", age: 36},
            {id: 3, fName: 'Sal', lName: "Smith", gender: "Female", age: 30},
            {id: 4, fName: 'Jack', lName: "Jones", gender: "Male", age: 20},
            {id: 5, fName: 'Anna', lName: "Doe", gender: "Female", age: 18},
            {id: 6, fName: 'Peter', lName: "Pan", gender: "Male", age: 45},
            {id: 7, fName: 'Eric', lName: "Kraft", gender: "Male", age: 2}
        ];

        $scope.searchText = '';
        $scope.selectedOpt = '';

        $scope.edit = false;
        $scope.error = false;
        $scope.incomplete = false;

        $scope.editUser = function (index) {
            if (index == 'new') {//adding an new user
                $scope.edit = false;
                $scope.fName = '';
                $scope.lName = '';
                $scope.gender = '';
                $scope.age = '';
            } else {//update an existing user
                $scope.edit = true;
                $scope.id = $scope.users[index].id;
                $scope.fName = $scope.users[index].fName;
                $scope.lName = $scope.users[index].lName;
                $scope.gender = $scope.users[index].gender;
                $scope.age = $scope.users[index].age;
            }
        };

        $scope.deleteUser = function (index) {//delete a user
            $scope.users.splice(index, 1);
        };

        //sort the list when clicking the table head
        $scope.sort = function (str) {
            switch (str) {
                case 'id':
                case 'fName':
                case 'lName':
                case 'age':
                    $scope.users = $filter('orderBy')($scope.users, str);
            }
        };

        $scope.save = function () {
            if ($scope.edit) { //edit an existing user

                var pos = $scope.users.map(function(e) { return e.id; }).indexOf($scope.id);
                $scope.users[pos] = {
                    id: $scope.id,
                    fName: $scope.fName,
                    lName: $scope.lName,
                    gender: $scope.gender,
                    age: parseInt($scope.age)
                };
            } else {//adding a new user
                $scope.users.push({
                    id: $scope.users[$scope.users.length -1].id +1,
                    fName: $scope.fName,
                    lName: $scope.lName,
                    gender: $scope.gender,
                    age: parseInt($scope.age)
                });
            }
        };

        $scope.$watchCollection('[fName, lName, gender, age]', function () {
            $scope.incomplete = false;
            if (!$scope.fName.length || !$scope.lName.length || !$scope.gender.length || !parseInt($scope.age)) {
                $scope.incomplete = true;
            }
        });

        $scope.$watch('searchText + selectedOpt', function () {
            if ($scope.selectedOpt == '' || $scope.searchText == '') return false;

            switch ($scope.selectedOpt) {
                case 'fName':
                    $scope.users = $filter('filter')($scope.users, {fName: $scope.searchText});
                    break;
                case 'lName':
                    $scope.users = $filter('filter')($scope.users, {lName: $scope.searchText});
                    break;
                case 'gender':
                    $scope.users = $filter('filter')($scope.users, {gender: $scope.searchText});
                    break;
                case 'age':
                    $scope.users = $filter('filter')($scope.users, {age: $scope.searchText});
                    break;
            }
        });      
    });
