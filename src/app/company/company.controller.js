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
	
	vm.status = null;
	vm.create = createCompany
    vm.save = saveCompany
	vm.edit = editCompany
	vm.cancel = closeCompanyEditor;
	vm.addOwner = addCompanyOwner;
	
	function saveCompany() {
		companyService
			.saveCompany(vm.company)
			.then(companySaved, errorHandler);
		function companySaved() {
			closeCompanyEditor();
			reloadCompanies();
			toastr.info('Company saved!');
		}
	}
	
	function editCompany(companyId) {
		companyService
			.loadCompany(companyId)
			.then(companyLoaded, errorHandler);
		function companyLoaded(company) {
			openCompanyEditor(company);
		}
	}
	
	function createCompany() {
		openCompanyEditor({});
	}
	
	function openCompanyEditor(company) {
		vm.editMode = true;
		vm.company = company;
	}
	
	function closeCompanyEditor() {
		vm.editMode = false;
		vm.company = null;
	}
	
	function addCompanyOwner(ownerName) {
		if(!vm.company.id) {
			return addToLoadedCompany();
		}
		companyService
			.addCompanyOwner(vm.company.id, ownerName)
			.then(ownerAdded, errorHandler);
		function ownerAdded() {
			addToLoadedCompany();
			toastr.info('Company owner added!');
		}
		function addToLoadedCompany() {
			if(!vm.company.owners) {
				vm.company.owners = [];
			}
			vm.company.owners.push(ownerName);
		}
	}
	
	function reloadCompanies() {
		vm.status = companyService
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