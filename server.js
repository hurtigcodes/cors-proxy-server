const express = require('express');
const axios = require('axios')
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    next();
  });

//GETs
app.get('/get', (req, res) => {
    function getReq () {
        axios.get(req.query.url)
        .then(function (response) {
            var now = new Date();
            var isoDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
            console.log(isoDateTime + ' GET successful from origin ' + req.headers.origin);
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        })
    }
    getReq();
});

//POSTs
app.post('/post', (req, res) => { 
    const { username, password } = req.body.cred; // alternatively get via request header
    // const token = req.headers.authorization; 
    delete req.body.cred;

    function postReq() {
        axios.post(req.query.url, req.body, {
            // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
            // This will set an `Authorization` header, overwriting any existing
            // `Authorization` custom headers you have set using `headers`.
            // Please note that only HTTP Basic auth is configurable through this parameter.
            // For Bearer tokens and such, use `Authorization` custom headers instead.
            auth: { 
                username: username,
                password: password
            },
            header: req.headers
        })
        .then(function (response) {
            var now = new Date();
            var isoDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
            console.log(isoDateTime + ' POST successful from origin ' + req.headers.origin);
            res.send(response); // <= send data to the client
        })
        .catch(function (error) {
            res.send(error); // <= send error
        });
    }
    postReq();
});

//PUTs
app.put('/put', (req, res) => { 
    const { username, password } = req.body.cred;
    delete req.body.cred;

    function putReq() {
        axios.put(req.query.url, req.body, {
            auth: {
                username: username,
                password: password
            },
            header: req.headers
        })
        .then(function (response) {
            var now = new Date();
            var isoDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
            console.log(isoDateTime + ' PUT successful from origin ' + req.headers.origin);
            res.send(response); // <= send data to the client
        })
        .catch(function (error) {
            res.send(error); // <= send error
        });
    }
    putReq();
});

//DELETEs
app.delete('/delete', (req, res) => { 
    const { username, password } = req.body.cred;
    delete req.body.cred;
    
    function delReq() {
        axios.delete(req.query.url, { 
            data: req.body,
            auth: {
                username: username,
                password: password
            },
            header: req.headers

        })
        .then(function (response) {
            var now = new Date();
            var isoDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
            console.log(isoDateTime + ' DELETE successful from origin ' + req.headers.origin);
            res.send(response); // <= send data to the client
        })
        .catch(function (error) {
            res.send(error); // <= send error
        });
    }
    delReq();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is listening on port ' +  PORT);
});

