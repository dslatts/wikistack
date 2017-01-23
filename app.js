'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();
const models = require('./models');

//Middleware

app.use(morgan('dev'));

app.use(express.static('Public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Templating
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

models.User.sync({})
  .then(function(){
    return models.Page.sync({});
  })
  .then(function(){
    app.listen(3000, () => console.log('listening on port 3000'));
  }).
  catch(console.error);

app.get('/', (req, res, next) => {
  res.render('index');
});
