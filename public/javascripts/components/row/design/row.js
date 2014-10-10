angular.module(['sis.ng.components.row.design'],['sis.ng.core.factory'])
	.config(['componentFactoryProvider','ComponentConfig', function(componentFactoryProvider,ComponentConfig){
		var config = new ComponentConfig();
		config.setEtalon({
			"type":"sisNgRow",
			"prop":{
				"columns":12,
				"classPrefix":"col-xs"
			},
			"items":[]
		});
		config.setTemplates({
			"design":"javascripts/components/row/design/tpl/row-design.tpl.html",
			"inspector":"javascripts/components/row/design/tpl/row-inspector.tpl.html"
		});
		componentFactoryProvider.addComponent(config);
	}])
	.directive('sisNgRowDesign',['componentFactory',function(componentFactory){
		return {
			restrict:'EA',
			replace:true,
			transclude:true,
			scope:{
				"model":"="
			},
			controller: "sisNgRowDesignController",
			templateUrl:function(tElement, tAttrs){
				if( !tAttrs["tpl"] ){
					throw "Component must have \"mode\" attribute in order to know which template it should load!!";
				}
				return componentFactory.getTemplateUrl("sisNgRow",tAttrs["tpl"]);
			},
			link:function($scope, $element, $attrs, ctrl, transcludeFn){
				transcludeFn($scope, function(clone, scope) {
					$element.find('#transcludePlaceholder').replaceWith(clone);
				});
			}
		};
	}])
	.controller('sisNgRowDesignController',function($scope, $element, $attrs){
		console.log("RowDesignController.init()");
	});