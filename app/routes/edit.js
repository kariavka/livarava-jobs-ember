import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Route.extend({
  // Services
  store: service(),

  // Model
  model(params) {
    const store = get(this, 'store');
    const job_id = parseInt(params.id);
    return store.findRecord('job', job_id);
  },
});
