/**
 * @name yt2mp3
 * @version v1.0.1
 * @author ipincamp <support@nur-arifin.my.id>
 * @license GNU (General Public License v3.0)
 */

const express = require('express');
const fs = require('fs');
const { join } = require('path');
const { fetchAPI } = require('./src/fetchAPI');

const app = express();
const port = process.env.PORT || 8000;

const eventFiles = fs.readdirSync(join(__dirname, './src/events'))
  .filter((x) => x.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(join(__dirname, './src/events', `${file}`));

  app.get(event.name, (...args) => event.run(...args));
}

const url = 'https://y2v.herokuapp.com/';

setInterval(() => {
  fetchAPI(url);
}, 299000);

app.listen(port);
app.use(express.static('public'));
