const MAX_SIZE_OF_FILE = 5120;
const LIST_OF_THESAURUS = ['industries', 'levels', 'locations', 'languages',
    'departments', 'tags', 'skills', 'typesOfEmployment', 'languageLevels', 'entityStates'];

export default function VacancyController(
   $scope,
   VacancyService,
   ValidationService,
   FileUploaderService,
   ThesaurusService,
   UserService
) {
   'ngInject';

   const vm = $scope;

   /* --- api --- */
   vm.cancel = cancel;
   vm.saveVacancy = saveVacancy;
   vm.vacancy = {};
   vm.vacancy.fileIds = [];
   vm.thesaurus = [];
   vm.responsibles = [];
   vm.uploader = createNewUploader();
   vm.vacancy.requiredSkills = [];
   vm.vacancy.tags = [];
   /* === impl === */
   ThesaurusService.getThesaurusTopicsGroup(LIST_OF_THESAURUS).then((data) => vm.thesaurus = data);

   UserService.getUsers().then((users) => {
      vm.responsibles = users;
   });

   function createNewUploader() {
      let newUploader = FileUploaderService.getFileUploader(_vs);
      newUploader.filters.push({
         name: 'sizeFilter',
         fn: function sizeFilter(item) {
            if (item.size <= MAX_SIZE_OF_FILE) {
               return true;
            }
         }
      });
      newUploader.onSuccessItem = function onSuccessUpload(item) {
         vm.vacancy.fileIds.push(item.id);
      };
      return newUploader;
   }

   function cancel(form) {
      ValidationService.reset(form);
      vm.vacancy = {};
   }

   function saveVacancy(ev, form) {
      ev.preventDefault();
      if (ValidationService.validate(form)) {
         if (vm.uploader.getNotUploadedItems().length) {
            vm.uploader.uploadAll();
         } else {
            _vs();
         }
      }
      return false;
   }

   function _vs() {
      VacancyService.saveVacancy(vm.vacancy).then(vacancy => {
         vm.vacancy = vacancy;
      });
   }
}
