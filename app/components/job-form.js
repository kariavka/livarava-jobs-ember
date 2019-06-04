import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import delay from 'ember-delay/delay';

export default Component.extend({
  // Actions
  actions: {

    titleEdit() {
      set(this, 'isTitleEdit', true);
      delay(10).then(() => {
        this.$('#jobTitleInput').focus();
      });
    },

    descriptionEdit() {
      let height = this.$('.job-description').height();
      set(this, 'isDescriptionEdit', true);
      delay(10).then(() => {
        this.$('#jobDescriptionInput').height(height);
        this.$('#jobDescriptionInput').focus();
      });
    },

  },

});
