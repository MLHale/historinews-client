import Ember from 'ember';
export default Ember.Controller.extend({
  articles: {},
  searchText: '',
  searchOptions: {all: true, articleTitle: false, authorName: false, newspaperName: false,articleCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: 1900, endData: 2000},
  searchFlag: false,
  actions: {
    search: function(){
      var articles = this.store.query('article', this.get('searchOptions'));
      this.set('articles', articles);
      this.set('searchFlag', true);
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

