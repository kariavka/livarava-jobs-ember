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
  isSummaryEdit: false,
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

  summarySave() {
    if (!get(this, 'isSummaryEdit')) {
      return;
    }
    set(this, 'isSummaryEdit', false);
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

    summaryClick() {
      set(this, 'isSummaryEdit', true);
      delay(10).then(() => {
        this.$('#jobSummaryInput').select();
        this.$('#jobSummaryInput').focus();
      });
    },

    summaryClickOutside() {
      this.summarySave();
    },

    summaryClickSave() {
      this.summarySave();
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

    copy() {
      const copy = parseInt(get(this, 'item.id'));
      get(this, 'router').transitionTo('create', {queryParams: {copy}});
    },

    delete() {
      if (confirm("Are you sure?")) {
        const item = get(this, 'item');
        item.destroyRecord().then(() => {
          get(this, 'router').transitionTo('index');
        });
      }
    },

  },

});
