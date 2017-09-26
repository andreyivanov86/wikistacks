'use strict'

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const path = require('path');

module.exports = app;

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
const env = nunjucks.configure('views', { noCache: true });
require('./filter')(env);

const AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', function(req, res) {
  res.render('index');
})

app.use( function ( err, req, res, next ) {
  console.log(err);
  res.status(err.status || 500).send(err.message || "Internal Error");
})

