import Ember from 'ember';
export default Ember.Controller.extend({
  newspapers: {},
  searchText: '',
  searchOptions: {all: true, newspaperTitle: false, authorName: false, newspaperName: false,newspaperCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: 1900, endData: 2000},
  searchFlag: false,

  newspapersYearSorting: ['newspaperYear:desc'],
  newspapersAuthorSorting: ['authorName'],
  
  sortednewspapersYear: Ember.computed.sort('posts', 'newspapersYearSorting'),
  sortednewspapersAuthor: Ember.computed.sort('posts', 'newspapersAuthorSorting'),

  actions: {
    search: function(){
      var newspapers = this.store.query('newspaper', this.get('searchOptions'));
      this.set('newspapers', newspapers);
      this.set('searchFlag', true);
      console.log(this.get('sortednewspapersYear'));

    },
    selectFilter: function(selection, component) { 
      var searchOptions = this.get('searchOptions');
      
      // Set the filter selection object
      for (var prop in searchOptions) {
        if (prop === selection) {
          searchOptions[prop] = true;
        }
        else {
          searchOptions[prop] = false;
        } 
      }
    },
  },
});

