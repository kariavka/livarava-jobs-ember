import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';

export default Mixin.create({
  // Services
  session: service(),
  // moment: service(),

  // Before Model
  beforeModel() {
    // const moment = this.get('moment');

    // moment.updateLocale('en', {
    //   week: {
    //     dow: 1 // Monday is the first day of the week
    //   }
    // });
  },
});
