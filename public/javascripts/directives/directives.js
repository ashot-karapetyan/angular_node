/**
 * @author Avag Arakelyan
 */
angular.module('sis.ng.directives',['sis.ng.services'])
	.directive('sisDraggable',[function(){
		var dir = {
			restrict:'A',
			scope:false,
			priority: 0,
			link :function($scope,$element, $attrs){
				$element.draggable({
					helper: "clone",
					opacity: 0.7,
					revert:true,
					cursor: "crosshair"
				}).addClass('sis-tool-item');
			}
		};
		return dir;
	}])
	.directive('sisDroppable',['uiHelper','componentFactory',function(uiHelper,componentFactory){
		return {
			restrict:'A',
			scope:false,
			priority: 0,
			link:function($scope, $element,$attrs){
				$element.droppable({
					greedy: true,
					accept: ".sis-tool-item",
					hoverClass: "component-drag-hover",
					tolerance:"pointer",
					drop: function( event, ui ) {
						uiHelper.createComponent($element, componentFactory.getEtalon($(ui.draggable).data('type')));
					}
				});
			}
		};
	}])
	.directive('sisInspector', ['$rootScope', 'uiHelper', function( $rootScope, uiHelper ){
		return {
			restrict:'A',
			scope:true,
			link:function($scope,$element,$attrs){
				var recentElement = null;
				$rootScope.$on('component.inspect',function(event, targetElement){
					if( recentElement ){
						recentElement.removeClass('component-selected');
					}
					targetElement.addClass('component-selected');

					var targetScope = uiHelper.getScope(targetElement);
					uiHelper.initComponentInspector(targetScope.model, $element);
					recentElement = targetElement;
				});
			}
		};
	}])
	.directive('sisInspectable',['$rootScope', 'uiHelper', function( $rootScope, uiHelper ){
		return {
			restrict:'A',
			scope:false,
			link:function($scope,$element,$attrs){
				$element.bind('click',function(e){
					$rootScope.$emit('component.inspect', $element);
					return false;
				});
			}
		};
	}]);