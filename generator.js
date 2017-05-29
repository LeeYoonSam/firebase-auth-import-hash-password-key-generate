var express = require('express');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var btoa = require('btoa');

const port = 3000;

var mysalt = "your-secret-key";

/*
    Firebase auth:import

    I use command : firebase auth:import ./FirebaseTestAccount.csv --hash-algo HMAC_MD5 --hash-key eW91ci1zZWNyZXQta2V5
*/

// =================== using 'crypto' - nodejs inner function ===================

// md5 + salt 로 해시함수 만들기
function makePasswordHashWithMD5() {

    // createHmac md5+salt hashPassword and then base64 encoding.
    console.log('User1 md5 hashPassword: ' + crypto.createHmac('md5', mysalt).update('User1Password').digest().toString('base64'));
    console.log('User2 md5 hashPassword: ' + crypto.createHmac('md5', mysalt).update('User2Password').digest().toString('base64'));

    // only base64 Encoding
    console.log('--hash-key: ' + btoa(mysalt));

    /*
        < result >
        User1 md5 hashPassword: ekRLgyyr9/1Xhr/IWZWjWA==
        User2 md5 hashPassword: PNNJRJxCqY0xGvMvVPn+hw==
        --hash-key: eW91ci1zZWNyZXQta2V5

        finally insert this result in your (mac: numbers export csv)(window: .xlsx export csv) file or json

        // Official document: https://firebase.google.com/docs/cli/auth
    */
};

// create an app server.
var app = express();


// root page
app.get('/', function(request, response, next) {
    
    // check encrypt string
    makePasswordHashWithMD5();

    // check user signWithEmail page
	fs.readFile('Login.html', function(error, data) {
		response.send(data.toString());    
	});
});

// 웹 서버 실행
var server = http.createServer(app);
server.listen(port, function() {
	console.log('Server running at http://127.0.0.1:3000');
});


