var _ = require("-aek/utils");
var aekFluxStore = require("-aek/flux-store");

var reducers = {
  data: (state = {},action) => {
    switch(action.type) {
      case "SET_FIELD":
        state = _.merge(state,{
          "input":{
            "first": action.first,
            "last": action.last,
            "keyword": action.keyword
          }
        });
        break;
      case "RESET_DATA":
        state = {};
        break;
    }
    return state;
  }
};

var localStorageKey = "userInput";

module.exports = aekFluxStore({reducers, localStorageKey});
