var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var server;
// file is included here:
eval(fs.readFileSync('server/serverClass.js') + '');

server = new serverClass();

app.use(express.static(__dirname + '/client'));

server.create();
server.run();

var  ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var  port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ipaddress === "undefined") {
	//  Log errors on OpenShift but continue w/ 127.0.0.1 - this
	//  allows us to run/test the app locally.
	console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
	ipaddress = "192.168.1.100";
};

http.listen(port, ipaddress, function () {
	console.log("Server is listening on port " + port);
});


