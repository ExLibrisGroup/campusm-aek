var request = require("-aek/request");
// var AekStorage = require("-aek/storage");
// var storage = new AekStorage("exlib-aek2-actionlink");
var _ = require("@ombiel/aek-lib/utils");

class ActionLinkDemoUtils {
  clearData() {
    for(var key in window.localStorage) {
      if(key.indexOf('_aek_store_exlib-aek2-actionlink') > -1) {
        window.localStorage.removeItem(key);
      }
    }
  }

  fetchAction(cb) {
    request.action('getAction').end((err, res) => {
      cb(err, res);
    })
  }

  getQueryString(value) {
    var location = document.body.getAttribute('data-location');
    var query = null;
    if(location !== null && location !== undefined) {
      query = _.parseQueryString(location)[value];
    }

    return query;
  }

}

// export a single instance so all modules see the share the same thing
module.exports = new ActionLinkDemoUtils();
