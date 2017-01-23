'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();

//Middleware

app.use(morgan('dev'));

app.use(express.static('Public'));
