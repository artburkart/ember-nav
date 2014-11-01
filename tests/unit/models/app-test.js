import DS from 'ember-data';
import Ember from 'ember';
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('app', 'App Model', {
  needs: ['model:environment']
});

test('App is a valid ember-data Model', function () {
  var store = this.store();
  var app = this.subject({title: 'Angry Birds'});
  ok(app);
  ok(app instanceof DS.Model);
});