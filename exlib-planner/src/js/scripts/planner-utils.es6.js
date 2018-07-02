var request = require("-aek/request");
var moment = require("moment");

var AekStorage = require("-aek/storage");
var storage = new AekStorage("aek2-planner");
var _ = require("@ombiel/aek-lib/utils");

var themeChoice = 'prime';
var mainView = null;
var isCallingServices = false;

var plannerHref = '/planner';

var eventRefKey = 'UniqueID';

var localPlanner = null;
var localTypes = [];
var localSubjects = [];
var localCampuses = [];

var localUserName = null;
var localFilterType = '';
var localSearchTerm = '';
var localFilterValue = '';

var lastSearchTerm = '';

class PlannerUtils {
  clearData() {
    for(var key in window.localStorage) {
      if(key.indexOf('_aek_store_aek2-planner') > -1) {
        window.localStorage.removeItem(key);
      }
    }

    return true;
  }

  setLastSearchTerm(searchTerm) {
     lastSearchTerm = searchTerm;
   }

   getLastSearchTerm() {
     return lastSearchTerm;
   }


  getThemeChoice() {
    return themeChoice;
  }

  setMainView(view) {
    mainView = view;
  }

  setCallingServices(isCalling) {
    isCallingServices = isCalling;
  }

  isCallingServices() {
    return isCallingServices;
  }

  getPlannerHref() {
    return plannerHref;
  }

  setPlannerHref(href) {
    plannerHref = href;
  }

  fetchPlanner(cb) {
    isCallingServices = true;
    if(mainView !== null) { mainView.forceUpdate(); }
    //request.action('get-events').end((err, response) => {
    var url = _.publicPath('testData.json');
    request.get(url).end((err, response) => {
      var body = response !== undefined ? response.body : null;

      if(body !== null && response.text.length > 0 && response.text.indexOf('{}') !== 0) {
        //var planner = body.event;
        var planner = body;
        if(planner !== undefined && planner !== null) {
          localPlanner = planner;
          planner.map((item) => {
            if(item.Type){
              localTypes.push(item.Type);
              localTypes = [...new Set(localTypes)];
            }
            if(item.Subject){
              localSubjects.push(item.Subject);
              localSubjects = [...new Set(localSubjects)];
            }
            if(item.Campus){
              localCampuses.push(item.Campus);
              localCampuses = [...new Set(localCampuses)];
            }
          });

          localTypes.sort();
          localSubjects.sort();
          localCampuses.sort();
          localTypes.unshift(["All",""]);
          localSubjects.unshift(["All",""]);
          localCampuses.unshift(["All",""]);
          isCallingServices = false;

          if(mainView !== null) { mainView.forceUpdate(); }
          cb(false, { planner:localPlanner});
        } else {
          isCallingServices = false;
          if(mainView !== null) { mainView.forceUpdate(); }
          cb(true, 'Server failed to return the correct response');
        }
      } else {
        isCallingServices = false;
        if(mainView !== null) { mainView.forceUpdate(); }
        cb(true, 'No response from server');
      }
    });
  }

  getLocalPlanner() {
    return localPlanner;
  }

  getLocalTypes() {
    return localTypes;
  }

  getLocalSubjects() {
    return localSubjects;
  }

  getLocalCampuses() {
    return localCampuses;
  }

  getLocalFilterType() {
    var cached = storage.get('filterType');
    if(cached !== localFilterType && cached !== null) {
      return cached;
    } else {
      return localFilterType;
    }
  }

  cacheFilterType(filterType) {
    localFilterType = filterType;
    storage.set('filterType', filterType);
  }

  getLocalFilterValue() {
    var cached = storage.get('filterValue');
    if(cached !== localFilterValue && cached !== null) {
      return cached;
    } else {
      return localFilterValue;
    }
  }

  cacheFilterValue(filterValue) {
    localFilterValue = filterValue;
    storage.set('filterValue', filterValue);
  }

  getLocalSearchTerm() {
    if(localSearchTerm !== '') {
      return localSearchTerm;
    } else {
      return storage.get('searchTerm');
    }
  }

  cacheSearchTerm(searchTerm) {
    localSearchTerm = searchTerm;
    storage.set('searchTerm', searchTerm);
  }

  getFromLocalPlanner(eventRef) {
    var event = null;
    if(localPlanner !== null) {
      for(var n in localPlanner) {
        if(localPlanner[n][eventRefKey] === parseInt(eventRef)) {
          event = localPlanner[n];
          break;
        }
      }
    }

    return event;
  }

  getUserName() {
    return localUserName;
  }

  getMyPlanner() {
    var response = storage.get('planner');
    return response;
  }

  getFromMyPlanner(eventRef) {
    var response = storage.get('planner');
    var event = null;
    if(response !== null) {
      for(var n in response) {
        if(response[n][eventRefKey] === parseInt(eventRef)) {
          event = response[n];
          break;
        }
      }
    }

    return event;
  }

  removeFromMyPlanner(eventRef) {
    var existingStorage = storage.get('planner');
    var toBePushed = toBePushed = existingStorage.slice();
    for(var n in toBePushed) {
      if(toBePushed[n]['UniqueID'] === parseInt(eventRef)) {
        toBePushed.splice(n, 1);
        storage.set('planner', toBePushed);
        break;
      }
    }
  }

  addToMyPlanner(eventRef) {
    var event = this.getFromLocalPlanner(eventRef);
    var existingStorage = storage.get('planner');
    var toBePushed = [];
    if(existingStorage === null) {
      toBePushed.push(event);
      storage.set('planner', toBePushed);
    } else {
      toBePushed = existingStorage.slice();
      var found = false;
      for(var n in toBePushed) {
        if(toBePushed[n]['UniqueID'] === parseInt(eventRef)) {
          found = true;
          break;
        }
      }

      if(!found) {
        toBePushed.push(event);
        storage.set('planner', toBePushed);
      }
    }
  }

  validityCheck(input) {
    if(input !== undefined && input !== null) {
      return !_.isEmpty(input);
    }

    return false;
  }

  mapCurrency(input, value) {
    value = parseFloat(value);
    switch(input) {
      case 'GBP':
        return '£' + value.toFixed(2);
      case '£':
        return '£' + value.toFixed(2);
      case 'USD':
        return '$' + value.toFixed(2);
      case 'AUD':
        return '$' + value.toFixed(2);
      case '$':
        return '$' + value.toFixed(2);
      case 'EUR':
        return '€' + value.toFixed(2);
      case '€':
        return '€' + value.toFixed(2);
      case 'RAN':
        return 'R' + value.toFixed(2);
      case 'R':
        return 'R' + value.toFixed(2);
      case 'TRY':
        return '₺' + value.toFixed(2);
      case '₺':
        return '₺' + value.toFixed(2);
    }
  }

  // http://stackoverflow.com/a/12043228/1306811 - calculating luminosity of line colours
  returnLumaForHex(hexCode) {
    var c = hexCode.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma;
  }


  // shelved for now due to !important declarations on a lot of AEK CSS
  brightenHexToRGB(hexCode) {
    var c = hexCode.substring(1);
    var rgb = parseInt(c, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    // http://stackoverflow.com/a/6615053/1306811 - calculating tints from RGB
    r = ((255 - r) * 0.75) + r;
    g = ((255 - g) * 0.75) + g;
    b = ((255 - b) * 0.75) + b;

    return [r, g, b];
  }

  returnCommonPlural(count, input) {
    if(count === 1) {
      return input;
    } else if(this.endsWith(input, 's') > -1) {
      return input + '\'';
    } else {
      return input + 's';
    }
  }

  endsWith(input, suffix) {
    return input.indexOf(suffix, input.length - suffix.length) !== -1;
  }

  formatDate(input) {
    var mInput = moment(input).format('dddd MMM Do YYYY');
    return mInput;
  }

  formatCustomDate(input, custom) {
    var mInput = moment(input).format(custom);
    return mInput;
  }

}

// export a single instance so all modules see the share the same thing
module.exports = new PlannerUtils();
