const http = require('http');
const server = http.createServer();
const models = require('./models');
const Promise = require('bluebird');

server.on('request', require('./app'));

models.Page.sync({force: true}) 
	.then(() => models.User.sync({force: true}))
    .then(function () {
        server.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    })
    .catch(console.error);