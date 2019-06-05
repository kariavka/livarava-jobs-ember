import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {get, set} from '@ember/object';
import delay from 'ember-delay/delay';

export default Component.extend({
  // Services
  router: service(),

  // Properties
  item: null,

  // Flags
  isTitleEdit: false,
  isDescriptionEdit: false,

  // Functions
  save() {
    let item = get(this, 'item');
    if (item.id) {
      item.save();
    } else if (item.description) {
      item.save().then((item) => {
        get(this, 'router').transitionTo('edit', item.id);
      });
    }
  },

  titleSave() {
    if (!get(this, 'isTitleEdit')) {
      return;
    }
    set(this, 'isTitleEdit', false);
    this.save();
  },

  descriptionSave() {
    if (!get(this, 'isDescriptionEdit')) {
      return;
    }
    set(this, 'isDescriptionEdit', false);
    this.save();
  },

  // Actions
  actions: {

    titleClick() {
      set(this, 'isTitleEdit', true);
      delay(10).then(() => {
        this.$('#jobTitleInput').focus();
      });
    },

    titleClickOutside() {
      this.titleSave();
    },

    descriptionClick() {
      set(this, 'isDescriptionEdit', true);
      delay(10).then(() => {
        this.$('#jobDescriptionInput').select();
        this.$('#jobDescriptionInput').focus();
      });
    },

    descriptionClickOutside() {
      this.descriptionSave();
    },

    descriptionClickSave() {
      this.descriptionSave();
    },

  },

});
