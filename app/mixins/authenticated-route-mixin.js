import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Mixin.create({
  // Services
  session: service(),
  // moment: service(),

  // Before Model
  beforeModel() {
    // const moment = get(this, 'moment');
    const isAuthenticated = get(this, 'session.isAuthenticated');

    // moment.updateLocale('en', {
    //   week: {
    //     dow: 1 // Monday is the first day of the week
    //   }
    // });

    if (!isAuthenticated) {
      const next = window.location.href;
      this.transitionTo('signin', {queryParams: {next}});
    }
  },
});
