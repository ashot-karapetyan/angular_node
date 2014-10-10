'use strict';

/**
 * @ngdoc overview
 * @name sisNgApp
 * @description
 * # sisNgApp
 *
 * Main module of the application.
 */
angular
	 .module('sisNgApp', [
		'ngResource',
		'ngCookies',
		'ui.bootstrap',
		'sis.ng.directives',
		'sis.ng.services',
		'sis.ng.components',
		//design components modules
		'sis.ng.components.input.design',
		'sis.ng.components.row.design',
		//view components modules
		'sis.ng.components.input.view',
		'sis.ng.components.row.view'
	])
	.config(['$locationProvider', function($locationProvider){
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}])

;
