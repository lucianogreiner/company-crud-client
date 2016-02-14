(function() {
  'use strict';

  angular
    .module('company-crud-client')
    .controller('CompanyController', CompanyController);

  /** @ngInject */
  function CompanyController(companies, companyService, toastr) {
    var vm = this;
    
	vm.editMode = false;
	vm.list = companies;
	vm.company = null;
	
    vm.save = saveCompany
	vm.edit = editCompany
	vm.cancel = cancelCompany;
	vm.addOwner = addCompanyOwner;
	
	function saveCompany() {
		companyService
			.saveCompany(vm.company)
			.then(companySaved, errorHandler);
		function companySaved() {
			vm.editMode = false;
			reloadCompanies();
			toastr.info('Company saved!');
		}
	}
	
	function editCompany(companyId) {
		companyService
			.loadCompany(companyId)
			.then(companyLoaded, errorHandler);
		function companyLoaded(company) {
			vm.editMode = true;
			vm.company = company;
		}
	}
	
	function cancelCompany() {
		vm.editMode = false;
		vm.company = null;
	}
	
	function addCompanyOwner(ownerName) {
		companyService
			.addCompanyOwner(vm.company.id, ownerName)
			.then(ownerAdded, errorHandler);
		function ownerAdded() {
			vm.company.owners.push(ownerName);
			toastr.info('Company owner added!');
		}
	}
	
	function reloadCompanies() {
		companyService
			.listCompanies()
			.then(companiesLoaded, errorHandler);
		function companiesLoaded(companies) {
			vm.list = companies;
		}
	}
	
	function errorHandler(error) {
		toastr.error(error.data);
	}
  }
})();