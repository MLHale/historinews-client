import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function () {
    this._super();

    Ember.run.scheduleOnce('afterRender', this, function () {
      // some jQuery UI stuff
      //console.log('afterRender sidebar!');

      this.$("#startDate").datepicker({
        autoclose: true,
        startView: "decade",
        defaultViewDate: {
            //month: '04',
            //day:'15',
            year: '1900'
        },
        /*format: "yyyy", 
        viewMode: "years",
        minViewMode: "years"*/

        format: "mm/dd/yyyy",
        viewMode: "months",
        minViewMode: "months"
        //format: 'mm/dd/yyyy'
      });

      this.$("#endDate").datepicker({
        autoclose: true,
        startView: "decade",
        defaultViewDate: {
            //month: '04',
            //day:'15',
            year: '1900'
        },
        /*format: "yyyy", 
        viewMode: "years",
        minViewMode: "years"*/

        format: "mm/dd/yyyy",
        viewMode: "months",
        minViewMode: "months"
        //format: 'mm/dd/yyyy'
      });
      //console.log(Ember.$("#endDate"));
      //debugger;
    });
  }
});
