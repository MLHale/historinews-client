import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  newspapers: {},
  filterNewsPapers: {},
  searchText: '',
  viewingPDF: false, 
  breadCrumbNewspaperTitle: '',
  searchOptions: {all: true, newspaperTitle: false, authorName: false, newspaperName: false,newspaperCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: "", endDate: "", name: "", period: ""},
  searchFlag: false,

  sortProperty: ['newspaperTitle'],  
  sortedNewspapers: Ember.computed.sort('newspapers', 'sortProperty'),
  sortedFilterNewspapers: Ember.computed.sort('filterNewsPapers', 'sortProperty'),
  newspaperNames: Ember.computed.mapBy('sortedFilterNewspapers', 'newspaperName'), //uses the sorted values to find all Newspaper Names
  uniqueNewspaperNames: Ember.computed.uniq('newspaperNames'), //finds all unique Newspaper Name values

  newpaperCount: Ember.computed.alias('newspapers.length'),

  activeSearchOption: '',

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

  searchResultPageData: function () {
    var page = this.get('pagedNewsPapers.page');
    var perPage = this.get('pagedNewsPapers.perPage');
    var length = this.get('newpaperCount');
    var start = 0;
    var end = 0;
    var data = {};

    if (page === 1) {
      if (length === 0) {
        data = {start: 0, end: 0}; 
      }
      else if (length < perPage) {
        data = {start: page, end: length};
      }
      else {
        data = {start: page, end: perPage};
     }
    }
    else {
      page -= 1;
      start = page * perPage;
      end = start + perPage;
      if (end > length) {
        end = length;
      }
      data = {start: start, end: end};
    }

    return data;  
  }.property('pagedNewsPapers.page', 'newpaperCount'),

  pageChanged: function () {
    window.scrollTo(0,0);
  }.observes('pagedNewsPapers.page'),

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
      var end = Ember.$('#endDate').val();

      if (start && end) {
       this.set('filterOptions.startDate', start);
       this.set('filterOptions.endDate', end);
      }
      else if (start && !end)
      {
        this.set('filterOptions.startDate', start);
        this.set('filterOptions.endDate', "01/01/3000");
      }
      else if (!start && end)
      {
        this.set('filterOptions.startDate', "01/01/1800");
        this.set('filterOptions.endDate', end);
      }
     else {
      this.set('filterOptions.startDate', "");
      this.set('filterOptions.endDate', "");
     }

     var searchString = {searchText: this.get('searchText')};
     var searchOptions = this.get('searchOptions');
     var filterOptions = this.get('filterOptions');

     var refineQuery = Ember.$.extend(searchString, searchOptions, filterOptions);

     var newspapers = this.store.query('newspaper', refineQuery);
     this.set('newspapers', newspapers);
    },
    search: function(){
      var stringSearch = {};
      var result = '';
      var searchString = {searchText: this.get('searchText')};
      var searchOptions = this.get('searchOptions');
      var searchQuery = Ember.$.extend(stringSearch, searchString, searchOptions);

      var newspapers = this.store.query('newspaper', searchQuery);
      this.set('newspapers', newspapers);
      this.set('filterNewsPapers', newspapers);

      for (var prop in searchOptions) {
        if (searchOptions[prop] === true) {
          if (prop === 'all') {
            result = 'All';
          }
          else if (prop === 'newspaperTitle') {
            result = 'Title';
          }
          else if (prop === 'authorName') {
            result = 'Author';
          }
          else if (prop === 'newspaperName') {
            result = 'Newspaper';
          }
          else if (prop === 'newspaperCreationDate') {
            result = 'Date';
          }
          else if (prop === 'newspaperYear') {
            result = 'Year';
          }
          else if (prop === 'keywords') {
            result = 'Keywords';
          }
          else if (prop === 'ocrText') {
            result = 'Content';
          }
          break;
        }  
      }
      
      this.set('activeSearchOption', result);

      this.set('searchFlag', true);
      this.set('viewingPDF', false);
      
      Ember.$(":checkbox").prop("checked", false); // Resets all checkboxes whenever something is searched for
    },
    searchSet: function(word){
      //console.log(word);
      Ember.$('#search_bar_text').val(word);
      Ember.$('#search_bar_button').click();
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
      Ember.$('#search_bar_text').val('');
    },
  },
});

