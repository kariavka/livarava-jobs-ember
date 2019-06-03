import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';
import AnonymousRouteMixin from 'livarava-jobs-ember/mixins/anonymous-route-mixin';

export default Route.extend(AnonymousRouteMixin, {
  // Services
  me: service(),

  // Actions
  actions: {

    didTransition() {
      const signed = get(this, 'me.signed');
      if (signed) {
        this.transitionTo('index');
      } else {
        this.transitionTo('index');
      }
    }

  },
});
