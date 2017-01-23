'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();
const models = require('./models');
const wikiRouter = require('./routes/wiki');

//Middleware

app.use(morgan('dev'));

app.use(express.static('Public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Templating
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

models.User.sync({force: true})
  .then(function(){
    return models.Page.sync({force: true});
  })
  .then(function(){
    app.listen(3000, () => console.log('listening on port 3000'));
  }).
  catch(console.error);

app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {

  models.Page.findAll({
    attributes: ['title', 'urlTitle']
  })
  .then((pages) => {
    res.render('index', {
      pages: pages
    });
  })
  .catch(console.error);
});
