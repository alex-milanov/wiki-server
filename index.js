'use strict';

const path = require('path');
const fse = require('fs-extra');

const pug = require('pug');
const express = require('express');
const app = express();

const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
});

const config = require('./config/default.json');

const preParse = str => str.replace(/\[\[([a-zA-Z0-9\_\ \-]+)\]\]/ig, '[$1](/$1)');

const parseFile = parseFile => marked(
  preParse(
    fse.readFileSync(parseFile, 'utf8')
  )
);

app.use(express.static('dist'));

app.get('*', function (req, res) {
  const chain = req.url.slice(1).replace(/\%20/ig, ' ');

  const homePath = path.resolve(config.pathToWiki, 'Home.md');
  const filePath = path.resolve(config.pathToWiki, chain.replace(/\_/ig, ' ')) + '.md';
  const filePathDash = path.resolve(config.pathToWiki, chain.replace(/\ /ig, '_')) + '.md';

  if (fse.existsSync(filePathDash)) {
    res.send(
      pug.renderFile('src/index.pug', { content: parseFile(filePathDash) })
    );
  } else if (fse.existsSync(filePath)) {
    res.send(
      pug.renderFile('src/index.pug', { content: parseFile(filePath) })
    );
  } else {
    res.redirect('/Home');
  }
});

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`);
});
