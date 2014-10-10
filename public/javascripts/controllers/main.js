'use strict';

/**
 * @ngdoc function
 * @name sisNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sisNgApp
 */
angular.module('sisNgApp')
  .controller('MainCtrl', function ($scope, $http, componentFactory, $templateCache, $compile, uiHelper, $rootScope, $cookies, $window) {
		$scope.viewModel = {
			"projects": {
				"name":"dummy name"
			}
		};
		$scope.componentList = componentFactory.getAllComponentTypes();

		$scope.showView = function(){
			var viewScope = $rootScope.$new();
			var markup = $compile(uiHelper.createView($scope.model))(viewScope);

			angular.element('#viewPlaceholder').empty().append( markup  );
		};

		$scope.saveModel = function(){
			//Temporarily saveing model in cookies, but not in sessionstorage or localstorage
			$cookies.model = JSON.stringify($scope.model);
			alert("Model successfully saved in cookies!!");
		};

		$scope.resetModel = function(){
			redraw( componentFactory.getEtalon("sisNgRow") );
		};

		//UGLY: Call redraw waiting half a second, in order DOM to be ready
		//TODO: needs to be rearrange functions
		setTimeout(function(){
			redraw($cookies.model ? JSON.parse($cookies.model) : componentFactory.getEtalon("sisNgRow")) ;
		},500);

		//Keep reference to root element to destroy scopes on clearing the stage in order to avoid memory leaks
		var rootElement = null;
		function redraw(model){
			if( rootElement ){
				rootElement.isolateScope().$destroy();
			}

			$scope.model = model;

			var markup = $compile(uiHelper.createDesign($scope.model, "model"))($scope);
			angular.element('#board').empty().append( markup );
			rootElement = markup;
		}
	});
