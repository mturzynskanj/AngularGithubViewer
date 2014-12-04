/**
 * Created by mariaturzynska on 12/3/14.
 */
angular.module('app', [])
    .controller('MainController', ['$scope', 'github', '$interval', '$log', '$anchorScroll', '$location', function ($scope, github, $interval, $log, $anchorScroll, $location) {

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user)
                .then(onRepos, onError);
        }

        var onRepos = function (data) {
            $scope.repos = data;
            /* to scroll the page to where the table of the repo starts
             i need $location service to update the hash of the url
             */

            $location.hash('userDetails');
            $anchorScroll();
        }

        var onError = function (reson) {
            $scope.error = 'Could not fetch the user'
        }

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        var countdownInterval = null;

        var startCountdown = function () {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.username = 'angular';

        $scope.repoSortOrder = "-stargazers_count";

        $scope.search = function (username) {
            $log.info("searching for" + username);
            github.getUser(username)
                .then(onUserComplete, onError);

            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }

            $scope.countdown = null;
        }

        $scope.countdown = 5;
        startCountdown();


    }]);







