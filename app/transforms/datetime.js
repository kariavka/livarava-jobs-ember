import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  serialize: function (value) {
    return value ? value.utc().toJSON() : null;
  },

  deserialize: function (value) {
    return moment.tz(value, 'UTC');
  }
});
