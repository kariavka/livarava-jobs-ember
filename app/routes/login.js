import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';
import {hash} from 'rsvp';

export default Route.extend({
  // Services
  session: service(),
  me: service(),

  // Params
  queryParams: {
    next: {refreshModel: true},
  },

  // Model
  model(params) {
    const isAuthenticated = get(this, 'me.signed');

    if (isAuthenticated) {
      this.transitionTo('index');
    }

    const next = params.next;

    return hash({
      next
    });
  },

});
