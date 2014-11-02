import DS from 'ember-data';

var environment =  DS.Model.extend({
  title: DS.attr('string'),
  settings: DS.attr(),
  app: DS.belongsTo('app', {async: true}),
  typeKey: function () { return this.constructor.typeKey; }.property()
});

environment.reopenClass({
  FIXTURES: [
    {
      id: '36b7f517',
      app: '1d31c256',
      title: 'Development',
      settings: {}
    },
    {
      id: '91b1c158',
      app: '1d31c256',
      title: 'Staging',
      settings: {}
    },
    {
      id: '956e06b3',
      app: 'affa77f6',
      title: 'Production',
      settings: {}
    },
    {
      id: '256e06b3',
      app: 'affa77f6',
      title: 'Special',
      settings: {}
    }
  ]
});

export default environment;
