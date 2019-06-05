import Controller from '@ember/controller';
import {get, set} from '@ember/object';

export default Controller.extend({
  // Actions
  actions: {

    delete(item) {
      item.destroyRecord().then(() => {
        this.transitionToRoute('index');
      });
    },

  },
});
