import Ember from 'ember';
export default Ember.Controller.extend({
  newspapers: {},
  searchText: '',
  searchOptions: {all: true, newspaperTitle: false, authorName: false, newspaperName: false,newspaperCreationDate: false, newspaperYear: false, keywords: false, ocrText: false,},
  filterOptions: {startDate: 1900, endData: 2000},
  searchFlag: false,

  sortProperty: ['newspaperTitle'],  
  sortedNewspapers: Ember.computed.sort('newspapers', 'sortProperty'),

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

