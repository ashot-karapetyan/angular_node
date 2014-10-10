angular.module('sis.ng.services',['sis.ng.core.factory'])
	.factory('uiHelper',['$rootScope','$http','$templateCache','$compile','componentFactory','ComponentConfig',
		function($rootScope, $http,$templateCache,$compile,componentFactory, ComponentConfig){
		return {
			/**
			 * Returns scope which holds component's model
			 */
			getScope : function($element){
				//the components mostly have isolated scope, that is why we use isolateScope.
				// scope() method returns controllers' or other parent element scopes
				return $element.isolateScope() || $element.scope();
			},
			/**
			 * Modifies attribute's value in order to use in concateing of the markup strings
			 */
			escapeAttributeValue : function(value){
				var result = typeof value==="object" ? JSON.stringify(value) : (''+value);

				return result.replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
					.replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
					.replace(/"/g, '&quot;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');

			},
			/**
			 * Converts camelCase to snake-case
			 */
			getSnakeCaseName : function(name, separator) {
				var SNAKE_CASE_REGEXP = /[A-Z]/g;
				separator = separator || '-';
				return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
					return (pos ? separator : '') + letter.toLowerCase();
				});
			},
			/**
			 * Returns [key=value] items joined with space
			 */
			getPropertiesAsAttributes:function( object ){
				var parts = [];
				for(var key in object){
					parts.push(this.getSnakeCaseName(key)+'="'+this.escapeAttributeValue(object[key])+'"');
				}
				return parts.join(' ');
			},
			/**
			 * Builds view's markup from the model
			 */
			createView:function(model){
				var tpl = '';
				var self = this;
				var tagName = this.getSnakeCaseName(model.type);
				tpl += '<'+tagName+' '+this.getPropertiesAsAttributes(model.prop)+' >';
				if(model.items){
					tpl += model.items.map(function(item){
						return self.createView(item);
					}).join('');
				}
				tpl += '</'+tagName+'>';
				return tpl;
			},
			/**
			 * Builds design's markup from the model and model's binding
			 */
			createDesign:function(model, modelStr){
				var tpl = '';
				var self = this;
				var tagName = this.getSnakeCaseName(model.type)+'-design';
				tpl += '<'+tagName+' tpl="'+ComponentConfig.TemplateTypes.DESIGN+'" model="'+modelStr+'">';
				if(model.items){
					tpl += model.items.map(function(item,i){
						return self.createDesign(item,"model.items["+i+"]");
					}).join('');
				}
				tpl += '</'+tagName+'>';
				return tpl;
			},
			/**
			 * Creates new element by type
			 * @param {jquery wrapper} anchor
			 *      The contianer
			 * @param {String}
			 *      The type of component
			 */
			createComponent:function(anchor, model){
				var anchorScope =  this.getScope(anchor);
				anchorScope.model.items.push( model );

				var componentModel = "model.items["+(anchorScope.model.items.length-1)+"]";

				anchor.append($compile('<'+this.getSnakeCaseName(model.type)+'-design '+
					' tpl="'+ComponentConfig.TemplateTypes.DESIGN+'" model="'+componentModel+'">')(anchorScope));
			},
			initComponentInspector : function(model, placeholder){
				var inspectorUrl = componentFactory.getTemplateUrl(model.type, ComponentConfig.TemplateTypes.INSPECTOR);
				placeholder.empty();
				$http.get(inspectorUrl,  {cache:$templateCache}).then(function(response){
					var tpl = angular.element(response.data);
					var newScope = $rootScope.$new();
					newScope.model = model.prop;
					placeholder.append($compile(tpl)(newScope));
				});
			}
		};
	}]);