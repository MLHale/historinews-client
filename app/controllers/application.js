import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  newspapers: {},
  searchText: '',
  searchOptions: {all: true, newspaperTitle: false, authorName: false, newspaperName: false,newspaperCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: 1900, endData: 2000},
  searchFlag: false,

  sortProperty: ['newspaperTitle'],  
  sortedNewspapers: Ember.computed.sort('newspapers', 'sortProperty'),
  newspaperNames: Ember.computed.mapBy('sortedNewspapers', 'newspaperName'),
  uniqueNewspaperNames: Ember.computed.uniq('newspaperNames'),

  // setup our query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 8,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedNewsPapers: pagedArray('sortedNewspapers', {pageBinding: "page", perPageBinding: "perPage"}),

  // binding the property on the paged array
  // to a property on the controller
  totalPagesBinding: "pagedNewsPapers.totalPages",

  actions: {
    search: function(){
      var newspapers = this.store.query('newspaper', this.get('searchOptions'));
      this.set('newspapers', newspapers);
      this.set('searchFlag', true);
    },
    selectFilter: function(selection, component) { 
      var searchOptions = this.get('searchOptions');
      
      for (var prop in searchOptions) {
        if (prop === selection) {
          searchOptions[prop] = true;
        }
        else {
          searchOptions[prop] = false;
        } 
      }
    },
    selectSort: function(selection, component){
      this.set('sortProperty', [selection]);
    },
  },
});

