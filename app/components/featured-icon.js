import Component from '@ember/component';
import {get, set, computed} from '@ember/object';

export default Component.extend({
  faIconName: computed('item.featured', function () {
    const featured = get(this, 'item.featured');
    return featured ? 'fa-star' : 'fa-star-o';
  }),

  actions: {

    update() {
      const item = get(this, 'item');
      let featured = !item.featured;
      item.set('featured', featured);
      item.save();
    },

  },
});
