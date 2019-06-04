import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Route.extend({
  // Services
  session: service(),

  // Params
  queryParams: {
    next: {refreshModel: true},
  },

  goto(next) {
    if (next && window) {
      window.open(next, '_self');
    } else {
      this.transitionTo('index');
    }
  },

  // Model
  model(params) {
    const session = this.get('session');
    const isAuthenticated = this.get('session.isAuthenticated');
    const next = params.next || null;

    if (isAuthenticated) {
      session.invalidate()
        .then(() => {
          this.goto(next);
        })
        .catch(() => {
          this.goto(next);
        });
    } else {
      this.goto(next);
    }
  },
});
