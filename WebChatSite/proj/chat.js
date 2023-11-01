let myStorage = sessionStorage;

let token = myStorage.getItem("token");

if (token == null) {
	window.open ('login.html', '_self', false);
}

let connection = new WebSocket('ws://127.0.0.1:7777/chat');

connection.onopen = function(){
	let token_auth = {
		type: "token_auth",
		token: token
	}
	let json = JSON.stringify(token_auth);
	connection.send(json);
};

connection.onmessage = function(e){
	let msg = JSON.parse(e.data);
	console.log(msg);
	if (msg['type'] == ('token_auth')) {
		alertify.success('Hello, ' + msg['name'] + '!');
	} 
};

function logout() {
	myStorage.clear();
	window.open ('login.html', '_self', false);
}