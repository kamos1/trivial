const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./endpoints');
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.set('port', process.env.PORT || 3000);

app.use('/', routes);

io.on('connection', function(socket){
  console.log('CONNECTED');
})

app.listen(app.get('port'), () => {
  console.log('listening');
})

module.exports = app;
