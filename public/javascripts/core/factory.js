angular.module('sis.ng.core.factory',[])
	.constant('ComponentConfig',(function(){
		function ComponentConfig(){
			this.etalon = null;
			this.templates = null;
		};
		ComponentConfig.prototype.setEtalon = function(value){
			this.etalon = value;
		};
		ComponentConfig.prototype.getEtalon = function(){
			return this.etalon;
		}
		ComponentConfig.prototype.setTemplates = function(value){
			//Checking whether all passed templates are valid;
			for(var tamplateType in value){
				if(!ComponentConfig.TemplateTypes.hasOwnProperty(tamplateType.toUpperCase())){
					throw "The template type you passed to config object is invalid";
				}
			}
			this.templates = value;
		};
		ComponentConfig.prototype.getTemplates = function(value){
			return this.templates;
		};

		ComponentConfig.TemplateTypes = {
			"DESIGN":"design",
			"VIEW":"view",
			"INSPECTOR":"inspector"
		};
		return ComponentConfig;
	})())
	.provider('componentFactory',['ComponentConfig',function(ComponentConfig){
		"use strict";

		var componentList = [];

		var service = [function(){
			return {
				/**
				 * @return {ComponentConfig}
				 */
				"getComponentConfig":function(type){
					var result = componentList.filter(function(component){
						return component.getEtalon().type === type;
					});
					if( result.length !== 0 ){
						return result[0];
					}
					throw "There is no component by \""+type+"\" !!";
				},
				/**
				 * Gets component model, which is needed for creating dummy components
				 */
				"getEtalon" : function(type){
					return angular.copy(this.getComponentConfig(type).getEtalon());
				},
				"getTemplateUrl":function(componentType, templateType){
					return this.getComponentConfig(componentType).getTemplates()[templateType];
				},
				/**
				 */
				"getAllComponentTypes" : function(){
					return componentList.map(function(component){
						return {"name" : component.getEtalon().type};
					});
				}
			};
		}];

		return {
			"addComponent": function(componentConfig){
				if( !(componentConfig instanceof ComponentConfig) ){
					throw " should be of ComponentConfig type";
				}

				componentList.push( componentConfig );
			},
			"$get":service
		};

	}])