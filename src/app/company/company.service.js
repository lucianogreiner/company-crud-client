(function() {
  'use strict';

  angular
    .module('company-crud-client')
    .factory('companyService', companyService);
  
  /** @ngInject */
  function companyService($http, REST_URL) {
	var url = REST_URL + '/companies';
	  
	var service = {
		listCompanies : listCompanies,
		saveCompany : saveCompany,
		loadCompany : loadCompany,
		addCompanyOwner : addCompanyOwner
	}
	return service;
	
	function listCompanies() {
		return $http.get(baseUrl()).then(dataHandler);
	}
	
	function saveCompany(company) {
		if(company.id) {
			return $http.put(baseUrl(company.id), company);
		}
		return $http.post(baseUrl(), company);
	}
	
	function loadCompany(companyId) {
		return $http.get(baseUrl(companyId)).then(dataHandler);
	}
	
	function addCompanyOwner(companyId, ownerName) {
		return $http.put(baseUrl(companyId) + '/owner', null, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			params : {
				name : ownerName
			}
		});
	}
	
	function dataHandler(result) {
		return result.data;
	}
  
	function baseUrl(id) {
		return id ? url + '/' + id : url;
	}
  }
  
})();
