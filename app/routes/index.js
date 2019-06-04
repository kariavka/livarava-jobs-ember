import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';
import RSVP from 'rsvp';
import AnonymousRouteMixin from 'livarava-jobs-ember/mixins/anonymous-route-mixin';

export default Route.extend(AnonymousRouteMixin, {
  // Services
  session: service(),
  store: service(),

  model(params) {
    const isAuthenticated = get(this, 'session.isAuthenticated');

    if (!isAuthenticated) {
      this.transitionTo('login');
    }

    const store = get(this, 'store');

    return RSVP.hash({
      items: store.query('job', params)
    });
  },
});
