let myStorage = sessionStorage;

if (sessionStorage.getItem("token") != null) {
	window.open ('chat.html', '_self', false);
}

let connection = new WebSocket('ws://127.0.0.1:7777/login');
let token = "";


connection.onopen = function(){
	console.log('Connected!');
};

connection.onerror = function(error){
	console.log('WebSocket Error ' + error);
	alertify.error('Sorry, server is not available now');
};

connection.onmessage = function(e){
	let msg = JSON.parse(e.data);
	console.log(msg);

	if (msg['type'] == ('login_success')) {
		token = msg['token'];
		sessionStorage.setItem("token", token);
		alertify.success(msg['message']);
		setTimeout(openWebChatWindow, 2000);

	} else if (msg['type'] == ('reg_success')) {
		alertify.success(msg['message']);
	} else if (msg['type'] == ('reg_error') || msg['type'] == ('login_error')) {
		alertify.error(msg['message']);
	}
};

function onLoginBtnClick(){
	let userName = document.getElementById("userName").value;
	let userPass = document.getElementById("userPass").value;
	let user = {
		type: "login",
		name: userName,
		pass: userPass
	}
	let json = JSON.stringify(user);
	connection.send(json);
};

function onRegBtnClick(){
	let userName = document.getElementById("userName").value;
	let userPass = document.getElementById("userPass").value;
	let user = {
		type: "reg",
		name: userName,
		pass: userPass
	}
	let json = JSON.stringify(user);
	connection.send(json);
};


function openWebChatWindow() {
	window.open ('chat.html', '_self', false);
}