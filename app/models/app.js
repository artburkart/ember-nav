import DS from 'ember-data';

var app = DS.Model.extend({
  title: DS.attr('string'),
  settings: DS.attr(),
  environments: DS.hasMany('environment', {async: true}),
  typeKey: function () { return this.constructor.typeKey; }.property()
});

app.reopenClass({
  FIXTURES: [
    {
      id: '1d31c256',
      title: 'Angry Birds',
      environments: ['36b7f517', '91b1c158'],
      settings: {
        active: 'yep',
        ready: 'uhuh'
      }
    },
    {
      id: 'affa77f6',
      title: 'Application2',
      environments: ['956e06b3', '256e06b3'],
      settings: {
        active: 'nope',
        ready: 'nuhuh'
      }
    },
    {
      id: '35605fc2',
      title: 'Application3',
      settings: {
        active: 'maybe',
        ready: 'awdunno'
      }
    }
  ]
});

export default app;

