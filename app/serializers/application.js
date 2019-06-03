import DS from 'ember-data';
import {underscore} from '@ember/string';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  },
  keyForRelationship(attr) {
    return underscore(attr);
  }
});
