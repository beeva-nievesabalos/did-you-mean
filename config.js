/*
 * Configuration SERVER params
 */
var express = require('express')
  , routes = require('./routes')
  , path = require('path')
  , nlpquery = require('./lib/nlpquery');

var server =  express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// all environments
server.set('port', process.env.PORT || 2103);
server.set('views', __dirname + '/views');
server.set('view engine', 'jade');
server.use(bodyParser()); // Necesario para los form!!!!
server.use(methodOverride());
server.use(express.static(path.join(__dirname, 'public')));

/*if ('development' == server.get('env')) {
	server.use(express.errorHandler());
}*/

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
server.use(allowCrossDomain);

// REST GENERALES
server.get('/', routes.index);
// similar a server.get('/ioe/addType', routes.ioe_type_add); 
server.post('/', nlpquery.query);

module.exports = server;
