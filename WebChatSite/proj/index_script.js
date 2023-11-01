let connection = new WebSocket('ws://127.0.0.1:7777');

connection.onopen = function(){
	console.log('Connected!');
	connection.send('Hello, Server!');
};

connection.onerror = function(error){
	console.log('WebSocket Error ' + error);
};

connection.onmessage = function(e){
	console.log(e.data);
};

