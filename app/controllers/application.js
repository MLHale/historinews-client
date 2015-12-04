import Ember from 'ember';
export default Ember.Controller.extend({
  newspapers: {},
  searchText: '',
  searchOptions: {all: true, articleTitle: false, authorName: false, newspaperName: false,articleCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: 1900, endData: 2000},
  searchFlag: false,

  articlesYearSorting: ['newspaperYear:desc'],
  articlesAuthorSorting: ['authorName'],
  
  sortedArticlesYear: Ember.computed.sort('posts', 'articlesYearSorting'),
  sortedArticlesAuthor: Ember.computed.sort('posts', 'articlesAuthorSorting'),

  actions: {
    search: function(){
      var newspapers = this.store.query('newspaper', this.get('searchOptions'));
      this.set('newspapers', newspapers);
      this.set('searchFlag', true);
      console.log(this.get('sortedArticlesYear'));

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

