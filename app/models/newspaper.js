import DS from 'ember-data';

export default DS.Model.extend({
  keywords: DS.attr('array'),
  newspaperName: DS.attr('string'),
  newspaperYear: DS.attr('number'),
  newspaperTitle: DS.attr('string'),
  authorName: DS.attr('string'),
  newspaperCreationDate: DS.attr('date'),
  ocrText: DS.attr('string'),
  pdfLocation: DS.attr('string'),
  thumb: DS.attr('string'),
});