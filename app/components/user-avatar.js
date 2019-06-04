import Component from '@ember/component';
import {computed, get} from '@ember/object';
import {htmlSafe} from '@ember/string';

export default Component.extend({
  // Properties
  item: null,
  tagName: 'span',
});
