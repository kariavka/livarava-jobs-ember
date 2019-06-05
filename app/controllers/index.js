import Controller from '@ember/controller';

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
