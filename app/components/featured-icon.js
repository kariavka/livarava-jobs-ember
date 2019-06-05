import Component from '@ember/component';
import {get, set} from '@ember/object';

export default Component.extend({
  faIconName: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let faIconName;
    const item = get(this, 'item');

    if (item.featured) {
      faIconName = 'fa-star';
    } else {
      faIconName = 'fa-star-o';
    }

    set(this, 'faIconName', faIconName);
  }
});
