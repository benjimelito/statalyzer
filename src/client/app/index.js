/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/App.jsx');


document.addEventListener("DOMcontentLoaded", (e) => {
  ReactDOM.render(<App />, document.getElementById('app'));
})
