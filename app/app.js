/**
 * Created by mariaturzynska on 12/3/14.
 */
angular.module('app', [])
    .controller('MainController', ['$scope', '$http', function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        }

        onRepos=function(response){
            $scope.repos=response.data;
            console.log($scope.repos);
        }

        var onError = function (reson) {
            $scope.error = 'Could not fetch the user'
        }

        $scope.username = 'angular';

        $scope.repoSortOrder="-stargazers_count";

        $scope.search=function(username){
            $http.get('https://api.github.com/users/'+ username)
                .then(onUserComplete, onError);
        }


    }]);







