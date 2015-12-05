import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  newspapers: {},
  searchText: '',
  searchOptions: {all: true, newspaperTitle: false, authorName: false, newspaperName: false,newspaperCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: "", endDate: "", name: "", period: ""},
  searchFlag: false,

  sortProperty: ['newspaperTitle'],  
  sortedNewspapers: Ember.computed.sort('newspapers', 'sortProperty'),
  newspaperNames: Ember.computed.mapBy('sortedNewspapers', 'newspaperName'), //uses the sorted values to find all Newspaper Names
  uniqueNewspaperNames: Ember.computed.uniq('newspaperNames'), //finds all unique Newspaper Name values

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
    filterResults: function(){
      var checkedNewspaperNames = Ember.$('.NewspaperName:checkbox:checked').map(function() { //Finds all selected Newspaper Names
          return this.value;
      }).get();
      checkedNewspaperNames = checkedNewspaperNames.join("|"); //deliminated by |
      this.set('filterOptions.name', checkedNewspaperNames);

      var checkedPeriods = Ember.$('.Period:checkbox:checked').map(function() { //Finds all selected Period times
          return this.value;
      }).get();
      checkedPeriods = checkedPeriods.join("|"); //deliminated by |
      this.set('filterOptions.period', checkedPeriods);

      var start = Ember.$('#startDate').val(); 
       //if the value is filled in
       if (start) {
        this.set('filterOptions.startDate', start);
       }
        
      var end = Ember.$('#endDate').val();
      //if the value is filled in
      if (end) {
        this.set('filterOptions.endDate', end);
      }

      var searchString = {searchText: this.get('searchText')};
      var searchOptions = this.get('searchOptions');
      var filterOptions = this.get('filterOptions');


      var refineQuery = Ember.$.extend(searchString, searchOptions, filterOptions);


      console.log(refineQuery); //woo, it works
    },
    search: function(){
      var stringSearch = {};
      var searchString = {searchText: this.get('searchText')};
      var searchOptions = this.get('searchOptions');
      var searchQuery = Ember.$.extend(stringSearch, searchString, searchOptions);

      var newspapers = this.store.query('newspaper', searchQuery);

      this.set('newspapers', newspapers);
      this.set('searchFlag', true);
      
      Ember.$(":checkbox").prop("checked", false); // Resets all checkboxes whenever something is searched for
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
    reset: function(){
      this.set('searchFlag', false);
    },
  },
});

