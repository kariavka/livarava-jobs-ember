import DS from 'ember-data';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import config from 'livarava-jobs-ember/config/environment';

export default DS.JSONAPIAdapter.extend({
  // Services
  me: service(),
  cookies: service(),

  // Variables
  host: config.api.host,
  namespace: 'api/v2',

  // Headers
  headers: computed('me.token', 'cookies', function () {
    const token = this.get('me.token') || this.get('cookies').read('token') || config.api.token;
    return token ? {'X-LivaRava-Token': token} : {};
  }),
});
