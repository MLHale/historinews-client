import Ember from 'ember';
export default Ember.Controller.extend({
  articles: {},
  searchFlag: false,
  filterFields: {all: true, articleTitle: false, authorName: false, newspaperName: false, articleCreationDate: false, newspaperYear: false, keywords: false, ocrText: false},
  searchText: '',
  filteredArticles: function () {
    var filter = this.get('searchText');
    var rx = new RegExp(filter, 'gi');
    var articles = this.get('articles');
    var filterFields = this.get('filterFields');

    return articles.filter(function(article){
      if (filterFields.all) {
        return article.get('articleTitle').match(rx) || article.get('authorName').match(rx) ||
               article.get('newspaperName').match(rx) || 
               Date.parse(article.get('articleCreationDate')) == Date.parse(filter) ||
               Date.parse(article.get('newspaperYear')) == Date.parse(filter) ||
               article.get('keywords').match(rx) || article.get('ocrText').match(rx);
      }
      else if (filterFields.articleTitle) {
        return article.get('articleTitle').match(rx);
      }
      else if (filterFields.authorName) {
        return article.get('authorName').match(rx);
      }
      else if (filterFields.newspaperName) {
        return article.get('newspaperName').match(rx);
      }
      else if (filterFields.articleCreationDate) {
        return Date.parse(article.get('articleCreationDate')) == Date.parse(filter);
      }
      else if (filterFields.newspaperYear) {
        return Date.parse(article.get('newspaperYear')) == Date.parse(filter);
      }
      else if (filterFields.keywords) {
        return article.get('keywords').match(rx);
      }
      else if (filterFields.ocrText) {
        return article.get('ocrText').match(rx);
      }
    });
  }.property('articles','searchText'),
  actions: {
    search: function(){
      this.set('searchFlag', true);
      this.get('filteredArticles');
    },
    selectFilter: function(selection, component) { 
      var filterFields = this.get('filterFields');
      
      // Set the filter selection object
      for (var prop in filterFields) {
        if (prop == selection) {
          filterFields[prop] = true;
        }
        else {
          filterFields[prop] = false;
        } 
      }
    },
  },
});