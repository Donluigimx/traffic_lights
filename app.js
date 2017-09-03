let express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));

// Routes

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(3000, function () {
    console.log('The application is running in localhost 3000');
});