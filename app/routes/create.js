import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get, set} from '@ember/object';


export default Route.extend({
  // Services
  store: service(),

  queryParams: {
    copy: {refreshModel: true},
  },

  // Model
  model(params) {
    const store = get(this, 'store');
    const copyId = parseInt(params.copy);

    if (Number.isInteger(copyId)) {
      return store
        .findRecord('job', copyId)
        .then((data) => {
          return data.copy().then((copy) => {
            let title = get(data, 'title');
            set(copy, 'title', `Copy of ${title}`);
            return copy;
          });
        });
    }

    return store.createRecord('job', {});
  },
});
