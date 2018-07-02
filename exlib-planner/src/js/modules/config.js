var config = {};

var el = document.getElementById("aek__config");

if(el) {
  config = JSON.parse(el.textContent);
}

module.exports = config;
