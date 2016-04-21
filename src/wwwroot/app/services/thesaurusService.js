import {
   has,
   find,
   concat,
   remove,
   filter,
   map,
   forEach,
   some,
   each,
   reduce,
   includes
} from 'lodash';

import THESAURUS_STRUCTURES from './ThesaurusStructuresStore.js';

let _HttpService, _$q, _$translate;

const cache = {};

export default class ThesaurusService {
   constructor(HttpService, $q, $translate) {
      'ngInject';
      _HttpService = HttpService;
      _$q = $q;
      _$translate = $translate;
   }

   getThesaurusTopics(thesaurusName) {
      if (has(cache, thesaurusName)) {
         return _$q.when(cache[thesaurusName]);
      } else {
         let thesaurusesToLoad = _getLoadedThesaurusesList(thesaurusName);
         let mapThesaurusPromises = _mapValues(thesaurusesToLoad, name => _HttpService.get(name));
         return _$q.all(mapThesaurusPromises).then(thesauruses => {
            each(thesauruses, (thesaurus, name) => {
               cache[name] = thesaurus.queryResult;
               _actionOfAdditionFieldsForTopics(thesaurus, name, _addRefTextFieldFunction);
            });
            return cache[thesaurusName];
         });
      }
   }

   getThesaurusTopic(thesaurusName, id) {
      if (has(cache, thesaurusName)) {
         return _$q.when(find(cache[thesaurusName], {id: id}));
      } else {
         return this.getThesaurusTopics(thesaurusName)
            .then(() => find(cache[thesaurusName], {id: id}));
      }
   }

   saveThesaurusTopic(thesaurusName, entity) {
      if (includes(this.getThesaurusNames(), thesaurusName)) {
         _actionOfAdditionFieldsForTopic(entity, thesaurusName, _deleteRefTextFieldFunction);
         if (entity.id) {
            let additionalUrl = thesaurusName + '/' + entity.id;
            return _HttpService.put(additionalUrl, entity)
               .then(_entity => {
                  _actionOfAdditionFieldsForTopic(_entity, thesaurusName,
                                                  _addRefTextFieldFunction);
                  return _entity;
               });
         } else {
            return _HttpService.post(thesaurusName + '/', entity)
               .then(_entity => {
                  _actionOfAdditionFieldsForTopic(_entity, thesaurusName,
                                                  _addRefTextFieldFunction);
                  cache[thesaurusName].push(_entity);
               });
         }
      } else {
         return _$q.reject(_$translate.instant('ERRORS.thesaurusErrors.incorrectNameMsg'));
      }
   }

   deleteThesaurusTopic(thesaurusName, entity) {
      if (includes(this.getThesaurusNames(), thesaurusName)) {
         let additionalUrl = thesaurusName + '/' + entity.id;
         _actionOfAdditionFieldsForTopic(entity, thesaurusName, _deleteRefTextFieldFunction);
         return _HttpService.remove(additionalUrl, entity).then(() => remove(cache[thesaurusName], entity));
      } else {
         return _$q.reject(_$translate.instant('ERRORS.thesaurusErrors.incorrectNameMsg'));
      }
   }

   getThesaurusNames() {
      return Object.keys(THESAURUS_STRUCTURES);
   }

   getThesaurusStructure(thesaurusName) {
      return THESAURUS_STRUCTURES[thesaurusName];
   }
}

function _getReferenceFields(thesaurusName) {
   let structure = THESAURUS_STRUCTURES[thesaurusName];
   if (structure) {
      return filter(structure.fields, {type: 'select'});
   } else {
      return [];
   }
}

function _getLoadedThesaurusesList(mainThesaurusName) {
   let array = map(_getReferenceFields(mainThesaurusName), 'refTo');
   array.unshift(mainThesaurusName);
   return array;
}

function _addRefTextFieldFunction(field, topic) {
   if (some(cache[field.refTo], {id: topic[field.name]})) {
      let referencedTopic = find(cache[field.refTo], {id: topic[field.name]});
      topic[field.additionFieldForText] = referencedTopic[field.labelRefFieldName];
   }
}

function _deleteRefTextFieldFunction(field, topic) {
   delete topic[field.additionFieldForText];
}

function _actionOfAdditionFieldsForTopic(topic, thesaurusName, action) {
   let additionFields = _getReferenceFields(thesaurusName);
   forEach(_getReferenceFields(thesaurusName), field => action(field, topic));
}

function _actionOfAdditionFieldsForTopics(topics, thesaurusName, action) {
   forEach(topics, topic => _actionOfAdditionFieldsForTopic(topic, thesaurusName, action));
}


function _mapValues(array, it) {
   return reduce(array, (memo, name) => {
      memo[name] = it(name);
      return memo;
   }, {});
}
