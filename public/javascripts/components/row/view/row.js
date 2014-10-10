angular.module(['sis.ng.components.row.view'],['sis.ng.core.factory'])
	.config(['componentFactoryProvider','ComponentConfig',
		function(componentFactoryProvider,ComponentConfig){
	}])
	.directive('sisNgRow',['componentFactory',function(componentFactory){
		return {
			restrict:'EA',
			replace:true,
			scope:{
				"columns":"@",
				"classPrefix":"@"
			},
			transclude:true,
			controller:'sisNgRowController',
			templateUrl:function(tElement, tAttrs){
				return "/javascripts/components/row/view/tpl/row-view.tpl.html";
			},
			compile:function($element, $attrs, transcludeFn){
				return function postLink($scope, $element, $attrs){
				};
			}
		};
	}])
	.controller('sisNgRowController',function($scope, $element, $attrs){
		console.log("RowController.init()");
	});
