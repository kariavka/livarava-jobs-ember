import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';


export default Route.extend({
  // Services
  store: service(),

  // Model
  model() {
    const store = get(this, 'store');
    return store.createRecord('job', {});
  },
});
