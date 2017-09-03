var express = require('express');
var gpio = require('rpi-gpio');

var app = express();
var running = false;

app.use(express.static(__dirname + '/public'));

// Routes

app.get('/', function (req, res) {
    console.log('ez');
    gpio.setup(13, gpio.DIR_OUT, function () {
        gpio.write(13, gpio.DIR_HIGH);
    });
    gpio.setup(12, gpio.DIR_OUT, function () {
        gpio.write(13, gpio.DIR_LOW);
    });
    gpio.setup(11, gpio.DIR_OUT, function () {
        gpio.write(13, gpio.DIR_LOW);
    });
    gpio.destroy(function () {
        console.log('Closing pins');
    });
    res.sendFile('index.html');
});

app.get('/stop_traffic_light', function (req, res) {
    if (running === true) {
        res.send('No');
        return;
    }
    running = true;
    console.log('Turning on green lights');
    setTimeout(
        function () {
            gpio.write(13, 0);
            gpio.write(12, 1);
            gpio.write(11, 0);
            setTimeout(
                function () {
                    gpio.write(13, 1);
                    gpio.write(12, 0);
                    gpio.write(11, 0);
                    res.send('Ok');
                    setTimeout(
                        function () {
                            gpio.write(13,0);
                            gpio.write(12,0);
                            gpio.write(11,1);
                            running = false;
                        },
                        5000
                    )
                },
                3000
            );
        },
        3000
    );
});

app.listen(3000, function () {
    console.log('The application is running in localhost 3000');
    gpio.setup(13, gpio.DIR_OUT, function () {
        gpio.write(13, 0);
    });
    gpio.setup(12, gpio.DIR_OUT, function () {
        gpio.write(12, 0);
    });
    gpio.setup(11, gpio.DIR_OUT, function () {
        gpio.write(11, 1);
    });
});

function destroy() {
    gpio.destroy(function () {
        console.log('Closing pin.');
    });
}