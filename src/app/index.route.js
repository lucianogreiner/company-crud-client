(function() {
  'use strict';

  angular
    .module('company-crud-client')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
	  
    $stateProvider
      .state('crud', {
        url: '/',
        controller: 'CompanyController',
        controllerAs: 'crud',
		templateUrl : '/app/company/company.html',
		resolve : {
			companies : listAllCompanies
		}
      });

    $urlRouterProvider.otherwise('/');
	
	/** @ngInject */
	function listAllCompanies(companyService) {
		return companyService.listCompanies();
	}
  }

})();
