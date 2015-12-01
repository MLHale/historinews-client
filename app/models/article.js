import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  authorName: DS.attr('string'),
  npTitle: DS.attr('string'),
  date: DS.attr('number'),
  content: DS.attr('string'),
  tags: DS.hasMany('tag', {async: false}),
});
