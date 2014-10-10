angular.module(['sis.ng.components.input.view'],['sis.ng.core.factory'])
	.config(['componentFactoryProvider','ComponentConfig', function(componentFactoryProvider,ComponentConfig){

	}])
	.directive('sisNgInput',['componentFactory',function(componentFactory){
		return {
			restrict:'EA',
			replace:true,
			scope:{
				"placeholder":"@",
				"value":"@"
			},
			controller:'sisNgInputController',
			templateUrl:function(tElement, tAttrs){
				return "/javascripts/components/input/view/tpl/input-view.tpl.html";
			},
			compile:function($element, $attrs, transcludeFn){
				return function postLink($scope, $element, $attrs){
				};
			}
		};
	}])
	.controller('sisNgInputController',function($scope, $element, $attrs){
		console.log("InputController.init()");
	});
