angular.module(['sis.ng.components.input.design'],['sis.ng.core.factory'])
	.config(['componentFactoryProvider','ComponentConfig', function(componentFactoryProvider,ComponentConfig){
		var config = new ComponentConfig();
		config.setEtalon({
			"type":"sisNgInput",
			"prop":{
				"value":"value",
				"placeholder":"pls enter smth"
			}
		});
		config.setTemplates({
			"design":"/javascripts/components/input/design/tpl/input-design.tpl.html",
			"inspector":"/javascripts/components/input/design/tpl/input-inspector.tpl.html"
		});
		componentFactoryProvider.addComponent(config);
	}])
	.directive('sisNgInputDesign',['componentFactory',function(componentFactory){
		return {
			restrict:'EA',
			replace:true,
			scope:{
				"model":"="
			},
			controller:'sisNgInputDesignController',
			templateUrl:function(tElement, tAttrs){
				if( !tAttrs["tpl"] ){
					throw "Component must have \"mode\" attribute in order to know which template it should load!!";
				}
				return componentFactory.getTemplateUrl("sisNgInput",tAttrs["tpl"]);
			},
			compile:function($element, $attrs, transcludeFn){
				return function postLink($scope, $element, $attrs){
				};
			}
		};
	}])
	.controller('sisNgInputDesignController',function($scope, $element, $attrs){
		console.log("InputDesignController.init()");
	});
