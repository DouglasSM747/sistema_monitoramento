// For login encryption
global.chiperAlgorithm = 'aes-256-ctr';
global.chiperPassword = 'd6F3Efeq';

// For token
global.HS256 = 'HS256';

const app = require('./config/server');

const port = 5000;
app.listen(port, function() {
    console.log('Server running at port: ', port);
});