import EmberObject from '@ember/object';
import AnonymousRouteMixinMixin from 'livarava-jobs-ember/mixins/anonymous-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | anonymous-route-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let AnonymousRouteMixinObject = EmberObject.extend(AnonymousRouteMixinMixin);
    let subject = AnonymousRouteMixinObject.create();
    assert.ok(subject);
  });
});
