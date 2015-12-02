/*jshint node:true*/

/* Read local file */
function readTextFile(file)
{
  fs = require('fs');
  var text = fs.readFileSync(file,'utf8');
  return text;
}

module.exports = function(app) {
  var express = require('express');
  var apiRouter = express.Router();


  apiRouter.get('/articles', function(req, res) {
    res.send({
      'articles': [ 
        {
          id: 1,
          keywords: 'Council Bids Florence Tribune FOXY WIFE',
          newspaperName: 'The Florence Tribune',
          newspaperYear: 1909,
          articleTitle: 'Council Lays Over Bids',
          authorName: 'Lubold & Platz',
          articleCreationDate: -1909872000,          
          ocrText: readTextFile('/opt/historinews-client/server/mocks/FT_June_25_1909.txt'),
          pdfLocation: 'FT_June_25_1909.pdf',
          thumb: 'FT_June_25_1909.jpg',
        },
        {
          id: 2,
          keywords: 'Williams Syrup Mill',
          newspaperName: 'The Monitor',
          newspaperYear: 1915,
          articleTitle: 'Announces Candidacy For Senatorial Toga',
          authorName: 'John Albert Williams',
          articleCreationDate: -1712016000,          
          ocrText: readTextFile('/opt/historinews-client/server/mocks/Monitor_Oct_02_1915.txt'),
          pdfLocation: 'Monitor_Oct_02_1915.pdf',
          thumb: 'Monitor_Oct_02_1915.jpg',
        },
        {
          id: 3,
          keywords: 'Diplomatic Work Mediator Tommy Curran',
          newspaperName: 'The Mediator',
          newspaperYear: 1920,
          articleTitle: 'County Road Builders Busy',
          authorName: 'John Albert Williams',
          articleCreationDate: -1546992000,          
          ocrText: readTextFile('/opt/historinews-client/server/mocks/Mediator_Dec_24_1920.txt'),
          pdfLocation: 'Mediator_Dec_24_1920.pdf',
          thumb: 'Mediator_Dec_24_1920.jpg',
        },
      ],     
    });
  });

  app.use('/api/', apiRouter);
};
