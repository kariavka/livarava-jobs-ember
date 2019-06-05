import Component from '@ember/component';
import {get, set, computed} from '@ember/object';

export default Component.extend({
  faIconName: computed('item.display', function () {
    const display = get(this, 'item.display');

    if (display === 'public') {
      return 'fa-globe';
    } else if (display === 'unlisted') {
      return 'fa-user';
    } else if (display === 'private') {
      return 'fa-lock';
    } else {
      return 'fa-question';
    }
  }),

  actions: {

    update(display) {
      const item = get(this, 'item');
      item.set('display', display);
      item.save();
    },

  },
});
