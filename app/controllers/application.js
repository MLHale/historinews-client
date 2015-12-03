import Ember from 'ember';
export default Ember.Controller.extend({
  articles: {},
  searchText: '',
  searchOptions: {all: true},
  filterOptions: {startDate: 1900, endData: 2000},
  searchFlag: false,
  actions: {
    search: function(){
      var articles = this.store.query('article', this.get('filterOptions'));
      this.set('articles', articles);
    },
    selectFilter: function(selection, component) { 
      var filterFields = this.get('filterFields');
      
      // Set the filter selection object
      for (var prop in filterFields) {
        if (prop === selection) {
          filterFields[prop] = true;
        }
        else {
          filterFields[prop] = false;
        } 
      }
    },
  },
});