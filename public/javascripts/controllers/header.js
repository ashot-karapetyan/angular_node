'use strict';

/**
 * @ngdoc function
 * @name sisNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sisNgApp
 */
angular.module('sisNgApp')
  .controller('HeaderCtrl', function ($scope) {
		$scope.menu = {
			"selection":0
		};
  });
