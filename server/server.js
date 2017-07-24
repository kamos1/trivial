const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const routes = require('./endpoints');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('it worked')
});

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log('listening');
})

module.exports = app;
