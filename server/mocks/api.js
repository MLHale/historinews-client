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
          title: 'Council Lays Over Bids',
          authorName: 'Lubold & Platz',
          npTitle: 'The Florence Tribune',
          date: -1909872000,
          content: readTextFile('/opt/historinews-client/server/mocks/FT_June_25_1909.txt'),
          pdfLocation: 'FT_June_25_1909.jpg',
          tags: [1,2,3],
        },
        {
          id: 2,
          title: 'Announces Candidacy For Senatorial Toga',
          authorName: 'John Albert Williams',
          npTitle: 'The Monitor',
          date: -1712016000,
          content: readTextFile('/opt/historinews-client/server/mocks/Monitor_Oct_02_1915.txt'),
          pdfLocation: 'Monitor_Oct_02_1915.jpg',
          tags: [4,5],
        },
        {
          id: 3,
          title: 'County Road Builders Busy',
          authorName: '',
          npTitle: 'The Mediator',
          date: -1546992000,
          content: readTextFile('/opt/historinews-client/server/mocks/Mediator_Dec_24_1920.txt'),
          pdfLocation: 'Mediator_Dec_24_1920.jpg',
          tags: [6,7,8],
        },
      ],
      'tags': [ 
        {
          id: 1,
          tag: 'Council Bids',
        },
        {
          id: 2,
          tag: 'Florence Tribune',
        },
        {
          id: 3,
          tag: 'FOXY WIFE',
        },
        {
          id: 4,
          tag: 'Williams',
        },
        {
          id: 5,
          tag: 'Syrup Mill',
        },
        {
          id: 6,
          tag: 'Diplomatic Work',
        },
        {
          id: 7,
          tag: 'Mediator',
        },
        {
          id: 8,
          tag: 'Tommy Curran',
        },
      ]
    });
  });

  app.use('/api/', apiRouter);
};
