require('./database');
const app = require('./server');

// SETTINGS SERVER
app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
