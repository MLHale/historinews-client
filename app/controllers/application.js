import Ember from 'ember';

export default Ember.Controller.extend({
  articles: {},
  searchFlag: false,
  searchText: '',
  filteredArticles: function () {
    var filter = this.get('searchText');
    var rx = new RegExp(filter, 'gi');
    var articles = this.get('articles');

    return articles.filter(function(article){
          return article.get('title').match(rx)  || article.get('authorName').match(rx) ||
                 article.get('npTitle').match(rx) || article.get('content').match(rx);
        });
  }.property('articles','searchText'),
  actions: {
    search: function(){
      this.set('searchFlag', true);
      this.get('filteredArticles');
    },
  },
});