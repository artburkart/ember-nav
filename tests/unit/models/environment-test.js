import Ember from 'ember';
import DS from 'ember-data';
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('environment', 'Environment Model', {
  needs: ['model:app']
});

test('Environment is a valid ember-data Model', function () {
  var store = this.store();
  var env = this.subject({title: 'Development'});
  ok(env);
  ok(env instanceof DS.Model);

  Ember.run(function () {
    env.set('app', store.createRecord('app', {}));
  });

  ok(env.get('app'));
  ok(env.get('app') instanceof DS.Model);
});