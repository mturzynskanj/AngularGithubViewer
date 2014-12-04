/**
 * Created by mariaturzynska on 12/3/14.
 */
angular.module('app', [])
    .controller('MainController', ['$scope', '$http', '$interval', '$log','$anchorScroll','$location',function ($scope, $http, $interval, $log,$anchorScroll,$location) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        }

        var onRepos=function(response){
            $scope.repos=response.data;
            /* to scroll the page to where the table of the repo starts
               i need $location service to update the hash of the url
             */

            $location.hash('userDetails');
            $anchorScroll();
        }

        var onError = function (reson) {
            $scope.error = 'Could not fetch the user'
        }

        var decrementCountdown=function(){
            $scope.countdown-=1;
            if($scope.countdown<1){
                $scope.search($scope.username);
            }
        }

        var countdownInterval=null;

       var startCountdown=function(){
           countdownInterval=$interval(decrementCountdown,1000,$scope.countdown);
       }

        $scope.username = 'angular';

        $scope.repoSortOrder="-stargazers_count";

        $scope.search=function(username){
            $log.info("searching for"+ username);
            $http.get('https://api.github.com/users/'+ username)
                .then(onUserComplete, onError);

            if(countdownInterval){
                $interval.cancel(countdownInterval);
            }

            $scope.countdown=null;
        }

        $scope.countdown=5;
        startCountdown();


    }]);







