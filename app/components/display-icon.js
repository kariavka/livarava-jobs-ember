import Component from '@ember/component';
import {get, set} from '@ember/object';

export default Component.extend({
  faIconName: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let faIconName;
    const item = get(this, 'item');

    if (item.display === 'public') {
      faIconName = 'fa-globe';
    } else if (item.display === 'unlisted') {
      faIconName = 'fa-user';
    } else if (item.display === 'private') {
      faIconName = 'fa-lock';
    }

    set(this, 'faIconName', faIconName);
  }
});
