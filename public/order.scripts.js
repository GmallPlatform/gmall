'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u0414\u041f",
      "\u041f\u041f"
    ],
    "DAY": [
      "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
      "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
      "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
      "\u0441\u0440\u0435\u0434\u0430",
      "\u0447\u0435\u0442\u0432\u0435\u0440\u0433",
      "\u043f\u044f\u0442\u043d\u0438\u0446\u0430",
      "\u0441\u0443\u0431\u0431\u043e\u0442\u0430"
    ],
    "ERANAMES": [
      "\u0434\u043e \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043e\u0432\u0430",
      "\u043e\u0442 \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043e\u0432\u0430"
    ],
    "ERAS": [
      "\u0434\u043e \u043d. \u044d.",
      "\u043d. \u044d."
    ],
    "FIRSTDAYOFWEEK": 0,
    "MONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044f",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044f",
      "\u043c\u0430\u0440\u0442\u0430",
      "\u0430\u043f\u0440\u0435\u043b\u044f",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d\u044f",
      "\u0438\u044e\u043b\u044f",
      "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044f",
      "\u043d\u043e\u044f\u0431\u0440\u044f",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044f"
    ],
    "SHORTDAY": [
      "\u0432\u0441",
      "\u043f\u043d",
      "\u0432\u0442",
      "\u0441\u0440",
      "\u0447\u0442",
      "\u043f\u0442",
      "\u0441\u0431"
    ],
    "SHORTMONTH": [
      "\u044f\u043d\u0432.",
      "\u0444\u0435\u0432\u0440.",
      "\u043c\u0430\u0440.",
      "\u0430\u043f\u0440.",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d.",
      "\u0438\u044e\u043b.",
      "\u0430\u0432\u0433.",
      "\u0441\u0435\u043d\u0442.",
      "\u043e\u043a\u0442.",
      "\u043d\u043e\u044f\u0431.",
      "\u0434\u0435\u043a."
    ],
    "STANDALONEMONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044c",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044c",
      "\u043c\u0430\u0440\u0442",
      "\u0430\u043f\u0440\u0435\u043b\u044c",
      "\u043c\u0430\u0439",
      "\u0438\u044e\u043d\u044c",
      "\u0438\u044e\u043b\u044c",
      "\u0430\u0432\u0433\u0443\u0441\u0442",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044c",
      "\u043d\u043e\u044f\u0431\u0440\u044c",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044c"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "EEEE, d MMMM y '\u0433'.",
    "longDate": "d MMMM y '\u0433'.",
    "medium": "d MMM y '\u0433'. H:mm:ss",
    "mediumDate": "d MMM y '\u0433'.",
    "mediumTime": "H:mm:ss",
    "short": "dd.MM.yy H:mm",
    "shortDate": "dd.MM.yy",
    "shortTime": "H:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20bd",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "ru",
  "localeID": "ru",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u0414\u041f",
      "\u041f\u041f"
    ],
    "DAY": [
      "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
      "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
      "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
      "\u0441\u0440\u0435\u0434\u0430",
      "\u0447\u0435\u0442\u0432\u0435\u0440\u0433",
      "\u043f\u044f\u0442\u043d\u0438\u0446\u0430",
      "\u0441\u0443\u0431\u0431\u043e\u0442\u0430"
    ],
    "ERANAMES": [
      "\u0434\u043e \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043e\u0432\u0430",
      "\u043e\u0442 \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043e\u0432\u0430"
    ],
    "ERAS": [
      "\u0434\u043e \u043d. \u044d.",
      "\u043d. \u044d."
    ],
    "FIRSTDAYOFWEEK": 0,
    "MONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044f",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044f",
      "\u043c\u0430\u0440\u0442\u0430",
      "\u0430\u043f\u0440\u0435\u043b\u044f",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d\u044f",
      "\u0438\u044e\u043b\u044f",
      "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044f",
      "\u043d\u043e\u044f\u0431\u0440\u044f",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044f"
    ],
    "SHORTDAY": [
      "\u0432\u0441",
      "\u043f\u043d",
      "\u0432\u0442",
      "\u0441\u0440",
      "\u0447\u0442",
      "\u043f\u0442",
      "\u0441\u0431"
    ],
    "SHORTMONTH": [
      "\u044f\u043d\u0432.",
      "\u0444\u0435\u0432\u0440.",
      "\u043c\u0430\u0440.",
      "\u0430\u043f\u0440.",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d.",
      "\u0438\u044e\u043b.",
      "\u0430\u0432\u0433.",
      "\u0441\u0435\u043d\u0442.",
      "\u043e\u043a\u0442.",
      "\u043d\u043e\u044f\u0431.",
      "\u0434\u0435\u043a."
    ],
    "STANDALONEMONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044c",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044c",
      "\u043c\u0430\u0440\u0442",
      "\u0430\u043f\u0440\u0435\u043b\u044c",
      "\u043c\u0430\u0439",
      "\u0438\u044e\u043d\u044c",
      "\u0438\u044e\u043b\u044c",
      "\u0430\u0432\u0433\u0443\u0441\u0442",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044c",
      "\u043d\u043e\u044f\u0431\u0440\u044c",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044c"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "EEEE, d MMMM y '\u0433'.",
    "longDate": "d MMMM y '\u0433'.",
    "medium": "d MMM y '\u0433'. H:mm:ss",
    "mediumDate": "d MMM y '\u0433'.",
    "mediumTime": "H:mm:ss",
    "short": "dd.MM.yy H:mm",
    "shortDate": "dd.MM.yy",
    "shortTime": "H:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20bd",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "ru-ru",
  "localeID": "ru_RU",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u0414\u041f",
      "\u041f\u041f"
    ],
    "DAY": [
      "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
      "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
      "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
      "\u0441\u0440\u0435\u0434\u0430",
      "\u0447\u0435\u0442\u0432\u0435\u0440\u0433",
      "\u043f\u044f\u0442\u043d\u0438\u0446\u0430",
      "\u0441\u0443\u0431\u0431\u043e\u0442\u0430"
    ],
    "ERANAMES": [
      "\u0434\u043e \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043e\u0432\u0430",
      "\u043e\u0442 \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043e\u0432\u0430"
    ],
    "ERAS": [
      "\u0434\u043e \u043d. \u044d.",
      "\u043d. \u044d."
    ],
    "FIRSTDAYOFWEEK": 0,
    "MONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044f",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044f",
      "\u043c\u0430\u0440\u0442\u0430",
      "\u0430\u043f\u0440\u0435\u043b\u044f",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d\u044f",
      "\u0438\u044e\u043b\u044f",
      "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044f",
      "\u043d\u043e\u044f\u0431\u0440\u044f",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044f"
    ],
    "SHORTDAY": [
      "\u0432\u0441",
      "\u043f\u043d",
      "\u0432\u0442",
      "\u0441\u0440",
      "\u0447\u0442",
      "\u043f\u0442",
      "\u0441\u0431"
    ],
    "SHORTMONTH": [
      "\u044f\u043d\u0432.",
      "\u0444\u0435\u0432\u0440.",
      "\u043c\u0430\u0440.",
      "\u0430\u043f\u0440.",
      "\u043c\u0430\u044f",
      "\u0438\u044e\u043d.",
      "\u0438\u044e\u043b.",
      "\u0430\u0432\u0433.",
      "\u0441\u0435\u043d\u0442.",
      "\u043e\u043a\u0442.",
      "\u043d\u043e\u044f\u0431.",
      "\u0434\u0435\u043a."
    ],
    "STANDALONEMONTH": [
      "\u044f\u043d\u0432\u0430\u0440\u044c",
      "\u0444\u0435\u0432\u0440\u0430\u043b\u044c",
      "\u043c\u0430\u0440\u0442",
      "\u0430\u043f\u0440\u0435\u043b\u044c",
      "\u043c\u0430\u0439",
      "\u0438\u044e\u043d\u044c",
      "\u0438\u044e\u043b\u044c",
      "\u0430\u0432\u0433\u0443\u0441\u0442",
      "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
      "\u043e\u043a\u0442\u044f\u0431\u0440\u044c",
      "\u043d\u043e\u044f\u0431\u0440\u044c",
      "\u0434\u0435\u043a\u0430\u0431\u0440\u044c"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "EEEE, d MMMM y '\u0433'.",
    "longDate": "d MMMM y '\u0433'.",
    "medium": "d MMM y '\u0433'. HH:mm:ss",
    "mediumDate": "d MMM y '\u0433'.",
    "mediumTime": "HH:mm:ss",
    "short": "dd.MM.yy HH:mm",
    "shortDate": "dd.MM.yy",
    "shortTime": "HH:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u0433\u0440\u043d.",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "ru-ua",
  "localeID": "ru_UA",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

'use strict';
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    //return true;
}
function md5www ( str ) {	// Calculate the md5 hash of a string
    //
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://crestidg.com)

    var RotateLeft = function(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    };

    var AddUnsigned = function(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    };

    var F = function(x,y,z) { return (x & y) | ((~x) & z); };
    var G = function(x,y,z) { return (x & z) | (y & (~z)); };
    var H = function(x,y,z) { return (x ^ y ^ z); };
    var I = function(x,y,z) { return (y ^ (x | (~z))); };

    var FF = function(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    var GG = function(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    var HH = function(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    var II = function(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    var ConvertToWordArray = function(str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };

    var WordToHex = function(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    //str = this.utf8_encode(str);

    str = unescape( encodeURIComponent( str ) );
    //console.log(str)
    x = ConvertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}

(function(){
    //https://gist.github.com/sgmurphy/3095196
    function url_slug(s, opt) {
        s = String(s);
        opt = Object(opt);

        var defaults = {
            'delimiter': '-',
            'limit': undefined,
            'lowercase': true,
            'replacements': {},
            'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
        };

        // Merge options
        for (var k in defaults) {
            if (!opt.hasOwnProperty(k)) {
                opt[k] = defaults[k];
            }
        }

        var char_map = {
            // Latin
            'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
            'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
            'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ő': 'O',
            'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH',
            'ß': 'ss',
            'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
            'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
            'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
            'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th',
            'ÿ': 'y',

            // Latin symbols
            '©': '(c)',

            // Greek
            'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
            'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
            'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
            'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
            'Ϋ': 'Y',
            'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
            'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
            'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
            'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
            'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',

            // Turkish
            /*'Ş': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ğ': 'G',
            'ş': 's', 'ı': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'ğ': 'g',*/

            // Russian
            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
            'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
            'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
            'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
            'Я': 'Ya',
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
            'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
            'я': 'ya',

            // Ukrainian
            'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
            'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',

            // Czech
            'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U',
            'Ž': 'Z',
            'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
            'ž': 'z',

            // Polish
            /*'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ó': 'o', 'Ś': 'S', 'Ź': 'Z',
            'Ż': 'Z',
            'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
            'ż': 'z',*/

            // Latvian
            /*'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
            'Š': 'S', 'Ū': 'u', 'Ž': 'Z',
            'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
            'š': 's', 'ū': 'u', 'ž': 'z'*/
        };

        // Make custom replacements
        for (var k in opt.replacements) {
            s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
        }

        // Transliterate characters to ASCII
        if (opt.transliterate) {
            for (var k in char_map) {
                s = s.replace(RegExp(k, 'g'), char_map[k]);
            }
        }

        // Replace non-alphanumeric characters with our delimiter
        var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
        s = s.replace(alnum, opt.delimiter);

        // Remove duplicate delimiters
        s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);

        // Truncate slug to max. characters
        s = s.substring(0, opt.limit);

        // Remove delimiter from ends
        s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');

        return opt.lowercase ? s.toLowerCase() : s;
    }
    //Object.prototype.addProp=function(o){}
/**
 * Корректировка округления десятичных дробей.
 *
 * @param {String}  type  Тип корректировки.
 * @param {Number}  value Число.
 * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
 * @returns {Number} Скорректированное значение.
 */
function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Десятичное округление к ближайшему
if (!Math.round10) {
    Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
    };
}
// Десятичное округление вниз
if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
    };
}
// Десятичное округление вверх
if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
    };
}
    /*Array.prototype.forEachAsync = async function(cb){
        for(let x of this){
            await cb(x);
        }
    }*/
Array.prototype.getObjectFromArray=function(prop,value,a,filter){
    //возвращается елемент. если  есть 4 -ый параметр то возвращается массив
    // если есть пятый параметр то в массив пишется тот елемент исходного массива у котороко совйство filter true.
    var ar=[];
    //console.log(this.length);
    for (var i=0,l=this.length;i<l;i++){
        if(this[i][prop] && this[i][prop].toString && typeof this[i][prop].toString=='function'){
            this[i][prop]=this[i][prop].toString();
        }
        if (this[i][prop] && this[i][prop]==value){
            if (a){
                if (filter){
                    if (this[i][filter]){
                        ar.push(this[i])
                    }
                }else {
                    ar.push(this[i])
                }

            } else {
                return this[i];
                break;
            }

        }
    }

    if (a) {return ar;} else  {return undefined};
}
Array.prototype.getOFA=function(prop,value,a,filter){
        //возвращается елемент. если  есть 4 -ый параметр то возвращается массив
        // если есть пятый параметр то в массив пишется тот елемент исходного массива у котороко совйство filter true.
    prop=prop.split('.');
    if(prop.length==1){prop=prop[0]}
    var ar=[];
        //console.log(this.length);
        for (var i=0,l=this.length;i<l;i++){
            if(!this[i]){continue}
            if(this[i][prop] && this[i][prop].toString && typeof this[i][prop].toString=='function'){
                this[i][prop]=this[i][prop].toString();
            }
            if ((this[i][prop] && this[i][prop]==value)||(prop.length &&
                this[i][prop[0]] && this[i][prop[0]][prop[1]] && this[i][prop[0]][prop[1]]==value)){
                if (a){
                    if (filter){
                        if (this[i][filter]){
                            ar.push(this[i])
                        }
                    }else {
                        ar.push(this[i])
                    }

                } else {
                    return this[i];
                    break;
                }

            }
        }

        if (a) {return ar;} else  {return undefined};
    }

Array.prototype.removeOFA = function(prop, value){
        var i = this.length;
        while(i--){
            if( this[i]
                && this[i].hasOwnProperty(prop)
                && (arguments.length > 1 && this[i][prop] === value ) ){

                this.splice(i,1);

            }
        }
        return this;
    }


    Array.prototype.getArrayObjects = function(prop,value){
    //console.log(prop,value)
    var arr=[];
    for (var i=0,l=this.length;i<l;i++){
        if (this[i][prop] && this[i][prop].length){
            var _arr = this[i][prop].map(function(item){return (typeof item=='object')?item._id:item})
            if (_arr.indexOf(value)>-1){
                arr.push(this[i]);
            }
        }
    }
    return arr;
}
Array.prototype.diff = function(a) {
   return this.filter(function(i) {return a.indexOf(i) < 0;});
};
    Array.prototype.divideArrayWithChunk=function(chunk,fillArrayToEquil){
        if(!chunk){return [[],[],[],[],[]]};
        chunk=Number(chunk);
        if(chunk<2){return this;}
        var data=this;
        var arr=[];
        for(var j=0;j<chunk;j++){
            arr[j]=[];
            for (var i=j,l=data.length; i<l; i+=chunk) {
                arr[j].push(data[i]);
            }
        }
        if(fillArrayToEquil){
            for(var i=1,l=arr.length;i<l;i++){
                if(arr[i].length<arr[0].length){
                    arr[i].push({})
                }
            }
        }
        return arr;
    }
    Array.prototype.extend = function (other_array) {
        /* you should include a test to check whether other_array really is an array */
        other_array.forEach(function(v) {this.push(v)}, this);
    }


String.prototype.clearTag = function(num){
    var regex=/<\/?[^>]+(>|$)/g;
    if (num){
        return (this.replace(regex, '').substring(0,num))
    } else {
        //console.log('?????')
        return this.replace(regex, '')
    }
}

    String.prototype.myTrim = function(){
        return this.trim().split("\n").filter(function (str) {
            return str;
        }).map(function (str) {
            var s =str.replace(/&nbsp;/g, " ");
            return s.trim();
        }).filter(function (str) {
            return str;
        }).join('')
    }

    String.prototype.clearFirstTag = function(tag){
        var i = tag.length;
        return this.substring(2+i,this.length-(3+i))
    }
String.prototype.replaceBlanks = function(){
    if (!this) return;
    return this.replace(/(["',.\/\s])/g, "-");
}
String.prototype.getFormatedDate=function(){
    var d=new Date(this);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return   curr_date+ "-" + curr_month+ "-" +curr_year
}

    if (!String.prototype.splice) {
        /**
         * {JSDoc}
         *
         * The splice() method changes the content of a string by removing a range of
         * characters and/or adding new characters.
         *
         * @this {String}
         * @param {number} start Index at which to start changing the string.
         * @param {number} delCount An integer indicating the number of old chars to remove.
         * @param {string} newSubStr The String that is spliced in.
         * @return {string} A new string with the spliced substring.
         */
        String.prototype.splice = function(start, delCount, newSubStr) {
            return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
        };
    }


    var arrru = new Array ('Я','я',  'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э' ,'э','/','&');

    var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y', '', '','\'','\'','E', 'e','-','-');
    var string=
        'abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
    var cyrill_to_latin = function(text){
        for(var i=0; i<arrru.length; i++){
            var reg = new RegExp(arrru[i], "g");
            text = text.replace(reg, arren[i]);
        }

        return text.replace(/(["'\/\s])/g, "-");
    }
    var latin_to_cyrill =function(text){
        for(var i=0; i<arren.length; i++){
            var reg = new RegExp(arren[i], "g");
            text = text.replace(reg, arrru[i]);
        }
        return text;
    }
    var shuffle = function(len) {
        var parts = string.split('');
        for (var i = parts.length; i > 0;) {
            var random = parseInt(Math.random() * i);
            var temp = parts[--i];
            parts[i] = parts[random];
            parts[random] = temp;
        }
        return parts.join('').substring(0,len);
    }

    String.prototype.getUrl=function(){
        return url_slug(this)
        //return cyrill_to_latin(this.substring(0,50).split(" ").join("-").toLowerCase());
    }
    String.prototype.shuffle=function(len){
        if(!len){len=this.length}
        var parts = this.split('');
        for (var i = parts.length; i > 0;) {
            var random = parseInt(Math.random() * i);
            var temp = parts[--i];
            parts[i] = parts[random];
            parts[random] = temp;
        }
        return parts.join('').substring(0,len);
    }

    //object
    //Object.prototype.addProp=function(o){}
    //Object.prototype.addProp=function(o){
        /*if(!o || typeof o !='object'){return}
        var keysArray = Object.keys(o);
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(o, nextKey);
            if (desc !== undefined && desc.enumerable) {
                this[nextKey] = o[nextKey];
            }
        }*/
    //}
    //Object.prototype.newMethod=function(){}
    /*Object.defineProperty(
        Object.prototype,
        'addProperties',
        {
            //enumerable:false,
            value:function(o){
                if(!o || typeof o !='object'){return}
                var keysArray = Object.keys(o);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(o, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        this[nextKey] = o[nextKey];
                    }
                }
            }
        }
    );*/
})()




//http://stackoverflow.com/questions/25069777/sharing-code-between-angularjs-and-nodejs
'use strict';
(function(){
    var order = function(){
        var self=this;
        this.cart={stuffs:[]};
        this.seller=null;
        this.cascade=[];
        this.opt={};
        this.campaign=[];
        this.coupon={};
        this.totalCount=0;
        this.sum=0;
        this.price;  // для работы с ценой
        this.priceSale;//
        this.retail; //
        this.discount=null;// для управления ценой из админки ордера
        this.currency;
        this.mainCurrency;
        this.currencyStore;
        this.messageForCampaign={};
        this.type;
        this.user;
        this.paySum;
        // псевдо приватные методы
        //http://stackoverflow.com/questions/436120/javascript-accessing-private-member-variables-from-prototype-defined-functions
        function _checkInCondition(__campaign,stuff){
            var stuffBrand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand
            if (__campaign.conditionStuffs && __campaign.conditionStuffs.length && __campaign.conditionStuffs.indexOf(stuff._id)>-1){
                return true
            }
            if (__campaign.conditionTags && __campaign.conditionTags.length && __campaign.conditionTags.some(function(tag){return stuff.tags.indexOf(tag)>-1})){
                return true;
            }
            if (__campaign.conditionBrandTags && __campaign.conditionBrandTags.length && __campaign.conditionBrandTags.indexOf(stuff.brandTag)>-1){
                return true
            }
            if (__campaign.conditionBrands && __campaign.conditionBrands.length && __campaign.conditionBrands.indexOf(stuffBrand)>-1){
                return true
            }
            if (__campaign.conditionCategories && __campaign.conditionCategories.length && __campaign.conditionCategories.indexOf(stuff.category)>-1){
                return true
            }
        }
        this._cartCount=function(campaign,cam){
            var i=0;
            var self=this;
            //console.log(this.cart)
            this.cart.stuffs.forEach(function(item){
                //console.log(item.quantity);
                if (campaign){
                    //console.log('_isStuffInCampaign(item)-',_isStuffInCampaign(item))
                    if (campaign=='withoutcampaign'){
                        //console.log(item.campaignId)
                        if (!item.campaignId){
                            if(!cam){
                                i +=Number(item.quantity);
                            }else{
                                if(_checkInCondition(cam,item)){
                                    i +=Number(item.quantity);
                                }

                            }

                            //console.log('i-',i)
                        }
                    }else{
                        if (item.campaignId==campaign){
                            i +=Number(item.quantity);
                            //console.log('i-',i)
                        }
                    }
                }else{
                    if(item.quantity)
                        i +=Number(item.quantity);
                }
            })
            //console.log('cartcount ',i)
            return i;
        }
        this._checkDiscount=function(){
            var dis = this.discount;
            if (dis){
                if (!dis.value)dis.value=0;
                if(dis.type==1 || dis.type==3){
                    //Принудительная оптовая цена для всех позиций включая розницу и sale.
                    return self.price;
                } else if(dis.type==2 || dis.type==4 || dis.type==5){
                    //Принудительное изменение цены на оптовую всех позиций без изменения цены sale
                    if(self.priceSale){
                        return self.priceSale;
                    }else{
                        return self.price;
                    }
                }
            } else return;
        }
        this._getDiscountPrice=function(dis,s){
            if (dis){
                if (!dis.value)dis.value=0;
                if(dis.type==1){
                    //Принудительная оптовая цена для всех позиций включая розницу и sale.
                    return s.price;
                } else if(dis.type==2){
                    //Принудительное изменение цены на оптовую всех позиций без изменения цены sale
                    if(s.priceSale){
                        return s.priceSale;
                    }else{
                        return s.price;
                    }
                }if(dis.type==3){
                    //Принудительное изменение цены на оптовую, включая SALE, и применение ко всем позициям скидки, value значение скидки в %
                    return  Math.ceil10((s.price-(s.price/100)*dis.value),-5);
                } else if(dis.type==4){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение скидки на позиции кроме SAL
                    if(s.priceSale){
                        return s.priceSale
                    }else{
                        return Math.ceil10((s.price-(s.price/100)*dis.value),-5);
                    }
                }else if(dis.type==5){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение ко всем позициям скидки скидки
                    var cena;
                    if(s.priceSale){
                        cena=s.priceSale;
                    }else{
                        cena=s.price;
                    }
                    return Math.ceil10((cena-(cena/100)*dis.value),-5);
                }
            } else return;
        }
        this._checkDiscount2302=function(){
            var dis = this.discount;
            if (dis){
                if (!dis.value)dis.value=0;
                if(dis.type==1){
                    //Принудительная оптовая цена для всех позиций включая розницу и sale.
                    return self.price;
                } else if(dis.type==2){
                    //Принудительное изменение цены на оптовую всех позиций без изменения цены sale
                    if(self.priceSale){
                        return self.priceSale;
                    }else{
                        return self.price;
                    }
                }if(dis.type==3){
                    //Принудительное изменение цены на оптовую, включая SALE, и применение ко всем позициям скидки, value значение скидки в %
                    return  Math.ceil10((self.price-(self.price/100)*dis.value),-5);
                } else if(dis.type==4){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение скидки на позиции кроме SAL
                    if(self.priceSale){
                        return self.priceSale
                    }else{
                        return Math.ceil10((self.price-(self.price/100)*dis.value),-5);
                    }
                }else if(dis.type==5){
                    //Принудительное изменение цены на оптовую, кроме цен SALE, и применение ко всем позициям скидки скидки
                    var cena;
                    if(self.priceSale){
                        cena=self.priceSale;
                    }else{
                        cena=self.price;
                    }
                    return Math.ceil10((cena-(cena/100)*dis.value),-5);
                }
            } else return;
        }

        this._isStuffInCampaign=function(stuff,campaign){
            //console.log(stuff)
            var stuffBrand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand
            function check(__campaign){
                //console.log(__campaign,stuff.name)
                if (__campaign.stuffs && __campaign.stuffs.length && __campaign.stuffs.indexOf(stuff._id)>-1){
                    return true
                }
                if (__campaign.tags && __campaign.tags.length && stuff.tags && __campaign.tags.some(function(tag){return stuff.tags.indexOf(tag)>-1})){
                    return true;
                }
                if (__campaign.brandTags && __campaign.brandTags.length && __campaign.brandTags.indexOf(stuff.brandTag)>-1){
                    return true
                }
                if (__campaign.brands && __campaign.brands.length && __campaign.brands.indexOf(stuffBrand)>-1){
                    return true
                }
                if (__campaign.categories && __campaign.categories.length && __campaign.categories.indexOf(stuff.category)>-1){
                    return true
                }
            }
            function setCampaignPrice(__campaign){
                //console.log(stuff.name,__campaign)
                stuff.sticker=__campaign.sticker;
                stuff.campaignUrl=__campaign.url;
                stuff.campaignId=__campaign._id;
                var i=0;
                for(var key in stuff.stock){
                    var price=Number(stuff.stock[key].price);
                    stuff.stock[key].priceCampaign=(__campaign.condition=='percent')?
                        Math.ceil10((price-(Number(__campaign.percent)/100)*price),-2):
                        Math.ceil10((price-Number(__campaign.sum)),-2);
                    if(!i){
                        i++;
                        stuff.priceCampaign=stuff.stock[key].priceCampaign

                    }
                    //console.log(price,stuff.stock[key].priceCampaign)
                }
                //console.log( stuff.campaignUrl)
            }
            if (!self.campaign ||  !self.campaign.length) return false;
            // если нет параметра campaign то для всех компаний

            if (!campaign) {
                for (var j=0,ll=self.campaign.length;j<ll;j++){
                    var is=check(self.campaign[j]);
                    //console.log(is)
                    if ((is && !self.campaign[j].revers)||(!is && self.campaign[j].revers)){
                        setCampaignPrice(self.campaign[j])
                        return self.campaign[j];
                        break;
                    }
                }
            } else {
                // в конкретную компанию входит или нет
                var __campaign=self.campaign.getObjectFromArray('_id',campaign);
                if(__campaign){
                    var is=check(__campaign);
                    if ((is && !__campaign.revers)||(!is && __campaign.revers)){
                        setCampaignPrice(__campaign)
                        return __campaign;
                    }
                }
            }
            return false;
        }
        this._getCountForBaseStuffs=function(campaign){
            var q=0;
            this.cart.stuffs.forEach(function(item){
                if (campaign.forGroupBase){
                    if (campaign.groupBaseTag && item.tags && item.tags.indexOf(campaign.groupBaseTag)>-1){
                        q+=Number(item.quantity);
                    }else if(campaign.groupBaseCollection && campaign.groupBaseCollection==stuff.brandTag){
                        q+=Number(item.quantity);
                    }
                }else{
                    if (campaign.baseStuffs.indexOf(item._id)>-1){
                        q+=Number(item.quantity);
                    }
                }

            })
            //console.log(q);
            return q;

        }
        this._checkCompaignCondition=function(id){
            if(!self.campaign) {return}
            var __campaign = self.campaign.getOFA('_id',id);
            //console.log(__campaign)
            if(__campaign && !__campaign.forAll && !__campaign.revers){
                // колмчество не акционных товаров
                var countConditionStuffs=self._cartCount('withoutcampaign',__campaign);
                //console.log(countConditionStuffs)
                if (__campaign.ratio){
                    var countStuff=self._cartCount(__campaign._id); // количество для конкретной компании
                    //console.log('countStuff',countStuff)
                    if(parseInt(countConditionStuffs/__campaign.ratio)>=countStuff){
                        /*console.log('countConditionStuffs ',countConditionStuffs);
                        console.log('__campaign.ratio ',__campaign.ratio)
                        console.log('parseInt(countConditionStuffs/__campaign.ratio) ',parseInt(countConditionStuffs/__campaign.ratio))
                        console.log('countStuff ',countStuff)*/
                        return true;
                    }
                }else{
                    // нет кратности применения
                    // просто если хватает товаров из условия
                    return true;
                }

                /*
                if (!__campaign.useBase){
                    countBaseStuff = self._cartCount('withoutcampaign');
                } else {
                    // baseStuffs количество в корзине
                    countBaseStuff=self._getCountForBaseStuffs(__campaign);
                }
                //console.log('countBaseStuff-',countBaseStuff)
                if (__campaign.ratio){
                    var countStuff=self._cartCount(id); // количество для конкретной компании
                    if(parseInt(countBaseStuff/__campaign.ratio)>=countStuff){
                        return true;
                    }
                }else{
                    // нет кратности применения
                    // просто если хватает товаров из условия
                    if (countBaseStuff>=__campaign.condition){
                        return true;
                    }
                }*/
            }else{
                // нет услоаий просто применям акционную цену
                return true;
            }
        }
        this._checkCompaignConditionForBase=function(id){
            var campaign = self.campaign.getObjectFromArray('_id',id);
            //console.log(campaign);
            //console.log("self._cartCount('withoutcampaign')-",self._cartCount('withoutcampaign'))
            //console.log("self._cartCount(campaign._id)-",self._cartCount(campaign._id))
            //console.log(campaign.condition && campaign.useBase && self._cartCount('withoutcampaign') && !self._cartCount(campaign._id))
            if(campaign.useBase && self._getCountForBaseStuffs(campaign)>=campaign.condition && !self._cartCount(campaign._id)){
                return true;
            }
        }
        this._getUnitOfMeasure=function(){
            var a = this.cart.stuffs.reduce(function(arr,i){
                if(i.unitOfMeasure && arr.indexOf(i.unitOfMeasure)<0){
                    arr.push(i.unitOfMeasure)
                }
                return arr;
            },[])
            //console.log(a)
            if(a.length==1){
                return a[0]
            }else{
                return null
            }
        }
    }
    var _getCascadePrice=function(self){
        var newPrice=self.price;
        var cascade=self.cascade;
        if (cascade && cascade.length) {
            for(var i=0,l=cascade.length;i<l;i++){
                if (self.totalCount>=cascade[i][0]){
                    newPrice=Math.ceil10((self.price-(self.price/100)*cascade[i][1]),-2);
                }
            }
            return newPrice;
        } else {
            return self.price;
        }
    }


    order.prototype.init=function(campaign,mainCurrency,currencyStore) {
        //console.log(campaign)
        this.campaign=campaign;
        this.mainCurrency=mainCurrency;
        this.currencyStore=currencyStore;
    }
    order.prototype.setCamapign=function(campaign) {
        this.campaign=campaign;
        for(var i=0,l=campaign.length;i<l;i++){
            this.messageForCampaign[campaign[i].url]={base:null,stuff:null};
        }
    }
    order.prototype.setCart=function(stuffs) {
        //console.log(stuffs)
        this.cart.stuffs = stuffs;
        this.sortCart();
    }

    order.prototype.setSellerData=function(seller,cascade,opt) {
        this.seller =seller;
        this.cascade=cascade;
        this.opt=opt;
    }
    order.prototype.setCoupon=function(coupon) {
        // console.log(coupon)
        this.coupon =coupon;
    }
    order.prototype.setDiscount=function(discount) {
        this.discount=discount;
    }
    order.prototype.setCurrency=function(currency) {
        this.currency=currency;
    }
    order.prototype.changeCurrency=function(currency){
        this.currency=currency;
        this.kurs=this.currencyStore[this.currency][0];
    }
    order.prototype.getPrice=function(i) {
        var stuff=this.cart.stuffs[i];
        this.totalCount=this._cartCount();
        this.price=stuff.price;
        this.priceSale=stuff.priceSale;
        this.retail=stuff.retail;
        this.priceCampaign=stuff.priceCampaign;
        stuff.maxDiscountOver=false;

        // вычисляем условие опта
        var optIs=false;

        if (!this.opt || !this.opt.quantity || this.totalCount>=this.opt.quantity){
            optIs=true;
        }

        // 1.проверка на ручное управление ценой
        var cena;
        if (cena=this._checkDiscount()){
            if(this.discount && this.discount.value && stuff.maxDiscount && this.discount.value >stuff.maxDiscount){
                stuff.maxDiscountOver=true;
            }else{
                checkMaxDiscount(stuff,cena)
            }

            return cena;
        }
        //console.log(stuff.priceCampaign)
        //2. товар в акции проверить на опт и на выполнение условий акции
        //console.log(this._checkCompaignCondition(stuff.campaignId))
        //console.log(stuff.priceCampaign,stuff.campaignId,optIs,this._checkCompaignCondition(stuff.campaignId))
        //console.log('this._checkCompaignCondition(stuff.campaignId) -',this._checkCompaignCondition(stuff.campaignId))
        if (stuff.priceCampaign && optIs && this._checkCompaignCondition(stuff.campaignId) ){
            return stuff.priceCampaign
        }
        // 3.проверка на опт
        if (!optIs){
            return this.retail || this.price;
        }
        //4.eсли опт и есть   цена или каскад скидок
        if (this.priceSale){
            checkMaxDiscount(stuff,this.priceSale)
            return this.priceSale;
        } else {
            return _getCascadePrice(this);
        }
        return stuff.price;
    };
    order.prototype.getTotalSum=function(discount){
        var sum=0;
        var self=this;
        this.cart.stuffs.forEach(function(c){
            //console.log(c)
            var s=(c.sum)?(c.sum):c.price;
            if(discount){
                var p = self._getDiscountPrice(self.discount,c)
                    if(p){
                        s= p*c.quantity;
                    }
            }
            sum+=s
        });
        if(discount){
            var dis = this.discount;
            if (dis){
                if(dis.type==6){
                    sum = Math.ceil10((sum-(sum/100)*dis.value),-5);
                }else if(dis.type==7){
                    sum=sum-dis.value;
                }
            }
        }
        //console.log(sum)
        //this.sum=sum;
        return sum;
    };
    order.prototype.getTotalQuantity=function(){
        var q=0;
        this.cart.stuffs.forEach(function(c){
            q+=Number(c.quantity);
        });
        return q;
    };
    order.prototype.getCampaignQuantity=function(){
        return this._cartCount('campaign');
    };
    order.prototype.getConditionForDisplayMsg=function(){
        return this.messageForCampaign

    };
    order.prototype.getCouponSum=function(){
        //console.log(this.coupon)
        if (this.coupon && Object.keys(this.coupon).length){
            if(!this.coupon.condition){
                return Math.ceil10((this.sum-(this.sum/100)*Number(this.coupon.val)),-5);
            }else if(this.coupon.condition){
                var val=this.coupon.val;
                //console.log(this.sum,val)
                if(this.coupon.currency && this.currencyStore[this.coupon.currency] && this.currencyStore[this.coupon.currency][0]){
                    val = Math.round(val/this.currencyStore[this.coupon.currency][0])
                }
                /*if(this.coupon.currency && this.coupon.currency!=this.currency && this.currencyStore && this.currencyStore[this.coupon.currency] && this.currencyStore[this.coupon.currency][0]){
                    console.log(this.currencyStore[this.coupon.currency][0])
                    val = Math.round(val/this.currencyStore[this.coupon.currency][0])
                }*/
                //console.log(this.sum-Number(val))
                return (this.sum-Number(val));
            }
        }else{
            //console.log(this.sum)
            return this.sum
        }
    };
    order.prototype.clearOrder=function(){
        this.cart.stuffs.length=0;
        //this.seller=null;
        //this.cascade=[];
        //this.opt={};
        //this.campaign=[];
        this.coupon={};
        this.totalCount=0;
        this.sum=0;
    }
    order.prototype.checkInCart=function(itemTo){
        //console.log(itemTo.name,this.cart.stuffs.some(function(c){return ((itemTo._id == c._id) && (itemTo.sort == c.sort))}))
        return this.cart.stuffs.some(function(c){return ((itemTo._id == c._id) && (itemTo.sort == c.sort))})
    }
    order.prototype.addStuffToOrder=function(itemTo){
        if (this.cart.stuffs.length>=150){return false}
        if (!this.cart.stuffs.some(function(c){return ((itemTo._id == c._id) && (itemTo.sort == c.sort))})){
            var itemToCart = angular.copy(itemTo);
            for(var key in itemToCart){
                if(typeof itemToCart[key]=='function'){
                    delete itemToCart[key]
                }
            }
            delete itemToCart.comments
            delete itemToCart.desc
            delete itemToCart.gallery
            delete itemToCart.imgs
            delete itemToCart.nameL
            delete itemToCart.checkInCart
            delete itemToCart.addItemToOrder
            delete itemToCart.addInfo
            delete itemToCart.getDataForBooking
            delete itemToCart.FullTags
            delete itemToCart.changeSortOfStuff
            delete itemToCart.checkInCart
            delete itemToCart.driveRetailPrice
            delete itemToCart.getBonus
            delete itemToCart.zoomImg
            delete itemToCart.stockKeysArray
            delete itemToCart.sortsOfStuff
            delete itemToCart.setPrice



            this.cart.stuffs.push(itemToCart);
            this.sortCart();
            /*this.cart.stuffs.sort(function(a,b){
                if(a.brand < b.brand) return -1;
                if(a.brand > b.brand) return 1;
                return 0;
            })*/
            return true;
        }else {
            return false;
        }

    }
    order.prototype.getShipCost=function(){
        var s=this.shipDetail.reduce(function(s,c){
            if (isNaN( c.sum)){
                return s;
            }else{
                return s+Number(c.sum)
            }
        },0)
        return s;
    }
    order.prototype.getTotalPay=function(){
        if(!this.pay){this.pay=[]}
        var s=this.pay.reduce(function(s,c){
            if (isNaN( c.sum)){
                return s;
            }else{
                return s+Number(c.sum)
            }
        },0)
        return s;
    }
    order.prototype.getTotalDiscount=function(){
        if(this.sum && this.sum0){
            if (this.sum>this.sum0){return 0}else{
                return (100-Math.round(this.sum*100/this.sum0))
            }
        }


        /*this.priceSum = this.cart.stuffs.reduce(function(s,c){
            s+=c.quantity* c.price;
            return s;
        },0)
        var sumT =this.getCouponSum()
        //console.log(sum,sumT,100-Math.round(sumT*100/sum))
        if (sumT>this.priceSum){return 0}else{
            return (100-Math.round(sumT*100/this.priceSum))
        }*/
    }
    order.prototype.checkCampaign=function(stuff){
        return this._isStuffInCampaign(stuff);
    }
    order.prototype.sortCart=function(){
        this.cart.stuffs.sort(function(a,b){
            if(!a.extCatalog && !b.extCatalog){
                if(a.category < b.category) return -1;
                if(a.category > b.category) return 1;
                return 0
            }else if(a.extCatalog && !b.extCatalog){
                return 1
            }else if(!a.extCatalog && b.extCatalog){
                return -1
            }else if(a.extCatalog && b.extCatalog && a.extCatalog != b.extCatalog){
                if(a.category < b.category) return -1;
                if(a.category > b.category) return 1;
            }else if (a.extCatalog && b.extCatalog && a.extCatalog == b.extCatalog){
                if(a.category < b.category) return -1;
                if(a.category > b.category) return 1;
                return 0
            }
        })
    }
    function checkMaxDiscount(stuff,price){
        if(stuff.maxDiscount){
            if((1-price/stuff.price)*100>stuff.maxDiscount){
                stuff.maxDiscountOver=true;
            }
        }
        //console.log('stuff.maxDiscountOver - ',stuff.maxDiscountOver)
    }


    function getOrder(){
        return new order();
    }


    var myShareData = {getOrder:getOrder};


    if(typeof window !== 'undefined'){
        window.myShareData = myShareData;
        window.OrderModel=order;
    } else {
        module.exports = myShareData;
    }

})()



'use strict';
var _filterTags=[];
var _filterTagsO={}
var myApp= angular.module('gmall', [
        'ngRoute','ui.router','ngResource','ngCookies',
        'ui.bootstrap',
        'ngAnimate',
        'gmall.controllers',
        'gmall.services',
        'gmall.directives',
    'gmall.exception',
        'ui.select',
        'dndLists',
        'daterangepicker',
        // 3rd party dependencies
        'btford.socket-io',
        'toaster',
        'satellizer',
        'ngMessages',
    'ui.mask',
    'ngTouch'
        
])

.run(['$rootScope', '$state', '$stateParams','globalSrv','global','socket','$timeout','$window','$location',function ($rootScope,$state,$stateParams,globalSrv,global,socket,$timeout,$window,$location){

    $timeout(function(){
       /* $.material.checkbox = function(selector) {
            // Add fake-checkbox to material checkboxes
            $((selector) ? selector : this.options.checkboxElements)
                .filter(":notmdproc")
                .filter(function(){ //added this filter to skip checkboxes that were already initialized
                    return $(this).parent().find(".check").length === 0;
                })
                .data("mdproc", true)
                .after("<span class=check></span>");
        };*/
        $.material.togglebutton = function(selector) {
            // Add fake-checkbox to material checkboxes
            $((selector) ? selector : this.options.togglebuttonElements)
                .filter(":notmdproc")
                .filter(function(){ //added this filter to skip checkboxes that were already initialized
                    return $(this).parent().find(".toggle").length === 0;
                })
                .data("mdproc", true)
                .after("<span class=toggle></span>");
        };
        $.material.init()},1000)
    $rootScope.moment=moment;

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.global=global;
    $rootScope.soundChat=document.getElementById('soundChat');
    //console.log($rootScope.soundChat.currentSrc)
    //$rootScope.soundChat.play();
    //var i=1;
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $timeout(function(){
            if(!global.get('user').val){$state.go('frame');return;}
        },1000)


    })
    $rootScope.setDataForSocket=function(seller){
        //console.log(i++)
        if(seller){
            socket.emit('getUser:data',{user:'seller',seller:seller,store:global.get('store').val._id})
        }else{
            var id=global.get('user').val._id||null;
            socket.emit('getUser:data',{user:id,
                seller:global.get('store').val.seller._id,
                store:global.get('store').val._id
            })
        }
        getChatUnReadMessages();
        getNotifications(seller);
    }

    socket.on('connect_failed', function () {
        /* Insert code to reestablish connection. */
        console.log('connect_failed');
    });
    socket.on('disconnected', function () {
        /* Insert code to reestablish connection. */
        console.log('disconnected');
    });
    socket.on('getUser',function(){
        //console.log('on get Data')
        if(!global.get('user').val){return}
        if (global.get('seller').val){
            $rootScope.setDataForSocket(global.get('seller' ).val)
        } else {
            $rootScope.setDataForSocket();
        }
    })
    socket.on('newMessage',function(data){
        var dd = angular.copy(data)
        $rootScope.$broadcast('newChatMessage',dd)
        //console.log(dd)
        try{
            var participant=(global.get('seller').val)?'seller':'user';
            //console.log(participant)
            if(data.recipient!=participant){return}
            data.count=1;
            data.participant=(global.get('seller').val)?data.userName:data.sellerName;
            //console.log(global.get('dialogs' ).val,typeof global.get('dialogs' ).val)
            $rootScope.soundChat.play()
            if(global.get('dialogs').val){
                if(!global.get('dialogs').val.length){
                    global.set('dialogs',[]);
                }
                for(var i=0,l=global.get('dialogs' ).val.length;i<l;i++){
                    if (global.get('dialogs').val[i].dialog==data.dialog){
                        global.get('dialogs').val[i].count++;
                        //console.log(global.get('dialogs').val[i].count)
                        var is=true;
                        break;
                    }
                }
                //console.log(is)
                if(!is){
                    global.get('dialogs').val.push(data)
                }
                //console.log(global.get('dialogs').val)
            }else{
                global.set('dialogs' ,[data])
            }
        }catch(err){
            console.log(err)
        }



    })


    $rootScope.setInitData=function(){
        global.set('store',storeTemp);
        //console.log(global.get('store').val)
        //global.set('lang',store.lang);
        if(mobileFromServer){global.set('mobile',mobileFromServer);}
        global.set('local',local);
        moment.locale(storeTemp.lang)
        var q= {query:JSON.stringify({"actived":"true","dateEnd":{"$gte":'+Date.now()+'}})}
        var q1= {perPage:2,query:JSON.stringify({"actived":true})}
        globalSrv.getData('groups').then(function(response){
            global.set('groups',angular.copy(response.data));
            if(response.data && response.data.length){
                response.data.shift()
            }
            global.set('sections',response.data);
        })
        globalSrv.getData('categories').then(function(response){
            response.data.shift();
            global.set('categories',response.data);
            var o ={}
            response.data.forEach(function(c){
                o[c._id]=c;
            })
            global.set('categoriesO',o);
        })
        globalSrv.getData('filters').then(function(response){
            response.data.shift();
            global.set('filters',response.data);
            globalSrv.getData('filterTags').then(function(response){
                response.data.shift();
                global.set('filterTags',response.data);
                var filterSticker = global.get('filters').val.getObjectFromArray('sticker',true);
                if (filterSticker){
                    global.set('filterTagsSticker',global.get('filterTags').val.getObjectFromArray('filter',filterSticker._id,'array','sticker'));
                }
            })
        })
        globalSrv.getData('brands').then(function(response){
            response.data.shift();
            global.set('brands',response.data);

        })
        globalSrv.getData('campaign',null,q).then(function(response) {
            //console.log(response)
            response.data.shift();
            global.set('campaign',response.data);
        })
        globalSrv.getData('coupons',null,q1).then(function(response) {
            response.data.shift();
            global.set('coupons',response.data);
        })
    }
    $rootScope.setInitData()





    function setNotificationsCount(newNote){
        var lastCount=$rootScope.notificationsCount;
        if(!lastCount && lastCount!==0){lastCount=0;}
        $rootScope.notificationsCount=0;
        //console.log(global.get('notifications'))
        for(var type in global.get('notifications').val){
            if (newNote && newNote['type']==type){
                global.get('notifications').val[type]++;
                delete newNote['type']
            }
            $rootScope.notificationsCount+=global.get('notifications').val[type];
        }
        if (newNote && newNote['type']){
            var o = global.get('notifications').val;
            if(o){global.get('notifications').val[newNote['type']]=1;
            }else{
                o={};
                o[newNote['type']]=1;
                global.set('notifications',o);
            }
            $rootScope.notificationsCount++;
        }
        //console.log($rootScope.notificationsCount,lastCount)
        if ($rootScope.notificationsCount && $rootScope.notificationsCount>lastCount){
            $rootScope.soundChat.play();
        }

    }
    var getNotifications = function (seller){
        //console.log(global.get('seller').val)
        var user=(!global.get('seller').val)?global.get('user').val._id:'seller';
        //console.log(user)
        globalSrv.getData('notifications',user,{seller:seller}).then(function(response){
            if (response.data.shift){
                response.data.shift();
            }
            global.set('notifications',response.data);
            setNotificationsCount()
        })
    }


    socket.on('newNotification',function(data){
        //console.log(data)
        setNotificationsCount(data)
    })

    $rootScope.getNotifications=getNotifications;
    function getChatUnReadMessages(){
        //if(!global.get('seller').val){return}
        // получение данных с сервера о непрочитанных сообщения для ордеров и диалогов
        var o={},recipient;
        if(global.get('seller').val){
            o['seller']=global.get('seller').val;
            recipient='seller';
        }else{
            o.user=global.get('user').val._id;
            recipient='user'
        }
        //console.log(recipient,o)
        globalSrv.getData('chatMessages',recipient,o).then(function(response){
            //console.log(response.data)
            global.set('chatMessages',response.data);
            global.set('dialogs',response.data);
            //setChatMessagesCount();
        })
    }
    function getNotificationsCount(){
        
    }

    $rootScope.getTotalUnreadMessage=function(){
        if(!global.get('dialogs')||!global.get('dialogs').val || !global.get('dialogs').val.length){return}
        var count=0;
        global.get('dialogs').val.forEach(function(el){
            count += el.count;
        })
        return count||undefined;
    }
    $rootScope.changeLocation=function(url){
        console.log(url)
        $window.location.href=url;
    }


    var functions={
        changeLocation:_changeLocation,
        logout:_logout,
        logged:_logged
    }
    global.set('functions',functions)
    function _changeLocation(url){
        $window.location.href=url;
    }
    function _logout(){
        $rootScope.$broadcast('logout');
        $auth.logout()
        global.set('user',null)
        socket.emit('getUser:data',{user:null})
    }
    function _logged(){
        var id=(global.get('user').val)?global.get('user').val._id:null;
        $rootScope.$broadcast('logged');
        socket.emit('getUser:data',{
            user:id,
            seller:global.get('store').val.seller._id,
            store:global.get('store').val._id
        })
    }

    var qm = globalSrv.getData('masters').then(function(response){
        response.data.shift();
        var ms=response.data.filter(function(m){return m.actived})
        //console.log(ms)
        global.set('masters',ms);
        return response.data
    })
    global.set('masters',qm);

    var lang,langError,langOrder,langForm,langNote;
    globalSrv.getData('lang').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            lang=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('lang',d);
        //console.log(global.get('lang').val);
        //console.log(global.get('langError'))
        //console.log(global.get('store').val,global.get('langError'))
        //return response.data
    })
    globalSrv.getData('langError').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langError=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langError',d);
        //console.log(global.get('langError'))
        //console.log(global.get('store').val,global.get('langError'))
        //return response.data
    })
    globalSrv.getData('langNote').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langNote=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langNote',d);
        //console.log(global.get('langNote'))
        //console.log(global.get('store').val,global.get('langNote'))
        //return response.data
    })
    globalSrv.getData('langOrder').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langOrder=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langOrder',d);
        //console.log(global.get('langOrder'))
    })
    globalSrv.getData('langForm').then(function(response){
        var d = {}
        //console.log(response.data[1].tags)
        if(response.data && response.data.length && response.data[1].tags){
            langForm=response.data[1].tags;
            for(var k in response.data[1].tags){
                d[k]=response.data[1].tags[k][global.get('store').val.lang]
            }
        }
        global.set('langForm',d);
        //console.log(global.get('langForm'))
    })

    $timeout(function () {
        if ($window.ga){
            $window.ga('require', 'ecommerce');
        }
    },2000)


}])

.config(['$stateProvider', '$urlRouterProvider','$locationProvider','globalProvider','$authProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,globalProvider,$authProvider,$httpProvider){
    $httpProvider.interceptors.push('myInterceptorService');
    $authProvider.baseUrl=userHost;

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    globalProvider.setUrl( {
        groups:'/api/collections/Group/',
        categories:'/api/collections/Category/',
        filters:'/api/collections/Filter/',
        filterTags:'/api/collections/FilterTags/',
        brands : '/api/collections/Brand/',
        campaign:'/api/collections/Campaign',
        coupons:'/api/collections/Coupon',
        notifications:notificationHost+'/api/notificationList',
        chatMessages:'/api/chatMessagesList',
        masters:'/api/collections/Master?query={"actived":true}',
        lang:'/api/collections/Lang?query={"name":"gmall.home"}',
        langError:'/api/collections/Lang?query={"name":"index.error"}',
        langNote:'/api/collections/Lang?query={"name":"index.note"}',
        langOrder:'/api/collections/Lang?query={"name":"index.order"}',
        langForm:'/api/collections/Lang?query={"name":"index.form"}',

    });
    // инициализация глобальных переменных
    globalProvider.set('groups');
    globalProvider.set('sections');
    globalProvider.set('categories');
    globalProvider.set('categoriesO');
    globalProvider.set('filters');
    globalProvider.set('filterTags');
    globalProvider.set('brands');
    globalProvider.set('campaign');
    globalProvider.set('notifications');
    globalProvider.set('chatMessages');
    globalProvider.set('dialogs');
    globalProvider.set('store');
    globalProvider.set('user');
    globalProvider.set('admin');
    globalProvider.set('mobile');
    globalProvider.set('local');

    globalProvider.set('nostore');
    globalProvider.set('filterTagsSticker');
    globalProvider.set('coupons');
    globalProvider.set('sellers');
    globalProvider.set('seller');

    globalProvider.set('functions')
    globalProvider.set('masters')

    globalProvider.set('lang')
    globalProvider.set('langError')
    globalProvider.set('langNote')
    globalProvider.set('langOrder')
    globalProvider.set('langForm')
    globalProvider.set('services')


    $authProvider.baseUrl=userHost;
    $stateProvider
        .state("frame", {
            url: "/manage?token",
            controller: 'mainFrameCtrl',

            templateUrl:"modules/order/views/index.html",
        })
        .state("frame.404", {
            url: "/404",
            templateUrl:'modules/order/views/404.html',
            //controller: '404Ctrl'
        })
        .state("frame.orders", {
            url: "/orders?order",
            template:'<orders-list></orders-list>'
        })
        .state("frame.downloads", {
            url: "/downloads",
            template:'<download-stuffs></download-stuffs>'
        })
        .state("frame.orders.order", {
            url: "/:id?block",
            template:'<orders-item></orders-item>'
        })
        .state("frame.online", {
            url: "/online",
            template:'<online-booking></online-booking>'
        })
        .state("frame.schedule", {
            url: "/schedule",
            template:'<week-schedule></week-schedule>'
        })
        .state("frame.schedule.entry", {
            url: "/:id",
            template:'<schedule-entry></schedule-entry>'
        })
        /*.state("frame.users", {
            url: "/users?user",
            templateUrl: function(){ return 'components/user/users.html' },
            controller: 'usersCtrl'
        })*/
        .state("frame.user", {
            url: "/user",
            template: '<user-profile></user-profile>'
        })
        .state("frame.dialogs", {
            url: "/dialogs",
            cache: false,
            templateUrl: function(){ return 'components/dialogs/dialogs.html' },
            controller: 'dialogsCtrl'
        })
        .state("frame.dialogs.dialog", {
            url: "/:id",
            cache: false,
            templateUrl: function(){ return 'components/dialogs/dialog.html' },
            controller: 'dialogCtrl'
        })
        .state("frame.currency", {
            url: "/currency",
            cache: false,
            template:'<currency-component></currency-component>'
        })
        .state("frame.notification", {
            url: "/notification?type",
            templateUrl: function(){ return 'components/notification/notification.html' },
            controller: 'notificationCtrl'
        })
        .state("frame.comments", {
            url: "/comments",
            cache: false,
            template:'<comment-list></comment-list>'
        })


}])
    .config(function ($provide) {
        return
// given `{{x}} y {{z}}` return `['x', 'z']`
        function getExpressions (str) {
            var offset = 0,
                parts = [],
                left,
                right;
            while ((left = str.indexOf('{{', offset)) > -1 &&
            (right = str.indexOf('}}', offset)) > -1) {
                parts.push(str.substr(left+2, right-left-2));
                offset = right + 1;
            }

            return parts;
        }

        $provide.decorator('ngSrcDirective', function ($delegate, $parse) {
            // `$delegate` is an array of directives registered as `ngSrc`
            // btw, did you know you can register multiple directives to the same name?

            // the one we want is the first one.
            var ngSrc = $delegate[0];

            ngSrc.compile = function (element, attrs) {
                var expressions = getExpressions(attrs.ngSrc);
                var getters = expressions.map($parse);

                return function(scope, element, attr) {
                    attr.$observe('ngSrc', function(value) {
                        //console.log(stuffHost,value)

                        if (getters.every(function (getter) { return getter(scope); })) {

                            /*if(value && value.indexOf('images/Store/') > -1){
                             attr.$set('src', storeHost+'/'+value);
                             }else*/ if(value &&  value.indexOf('images/') > -1){
                                //console.log(stuffHost+'/'+value)
                                attr.$set('src', photoHost+'/'+value);
                            }else {
                                attr.$set('src',value);
                            }
                        }else{
                            if(value){
                                /*if(value.indexOf('images/Store/') > -1){
                                 attr.$set('src', storeHost+'/'+value);
                                 }else */if(value.indexOf('images/') > -1){
                                    //console.log(stuffHost+'/'+value)
                                    attr.$set('src', photoHost+'/'+value);
                                }else{
                                    attr.$set('src',value);
                                }
                            }
                        }
                    });
                };
            };

            // our compile function above returns a linking function
            // so we can delete this
            delete ngSrc.link;

            return $delegate;
        });
    })
    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })







'use strict';

/* Directives */
// for material design
angular.module('gmall.directives', [])



'use strict';
angular.module('gmall.controllers', [] )
    .controller('mainFrameCtrl',['$rootScope','$auth','$location','Account','toaster','global','$user','$q',function($rootScope,$auth,$location,Account,toaster,global,$user,$q){
        if($rootScope.$stateParams.token){
            $auth.setToken({data:{token:$rootScope.$stateParams.token}})
            $location.search('token',null);
        }
        activate()
        function activate(){
            $q.when($auth.isAuthenticated())
                .then(function(auth){
                    if(!auth){
                        return $user.login()
                    }
                })
                .then(function(){
                    return Account.getPermissionOrder();
                })
                .then(function(res){
                    console.log(res)
                    if(!res){
                        toaster.error('у данного аккаунта нет прав');
                        logout()
                    }else{
                        global.set('user',res.data)
                        global.set('seller',res.data.seller);
                        //console.log(global.get('seller').val)
                        $rootScope.$broadcast('logged')
                        if (global.get('seller').val){
                            $rootScope.setDataForSocket(global.get('seller' ).val)
                        } else {
                            $rootScope.setDataForSocket();
                        }
                    }
                } )
                .catch(function(error){
                    if(error && error.data){
                        toaster.error(error.data.message, error.status);
                    }
                    return  logout();
                })
        }
        function logout(){
            $q.when($auth.isAuthenticated())
                .then(function(auth){
                    if(auth){
                        return $auth.logout()
                    }
                })
                .then(function() {
                    global.set('user',null)
                    global.set('seller',null);
                    $rootScope.setDataForSocket()
                    activate()
                });
        }
        $rootScope.logout=logout;
    }])




 

'use strict';
angular.module('gmall.services', [])
.factory('socket', function (socketFactory) {
    return socketFactory({host:socketHost});
})


'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('userSign',userSign)
        .directive('subscriptionAdd',subscriptionAdd)
        .directive('userSignShort',userSignShort)
        .directive('userLogin',userLogin)
        .directive('userLoginPhone',userLoginPhone)
        .directive('enterButton',enterButton);

    function userSign(){
        return {
            scope: {
                closeModal:'&',
                toaster:'@',
                social:'=',

            },
            bindToController: true,
            controller: signupCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/sign.html',
            restrict:'AE'
        }
    }
    function subscriptionAdd(){
        return {
            scope: {
                closeModal:'&',
                toaster:'@',
            },
            bindToController: true,
            controller: signupCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/subscriptionAdd.html',
            restrict:'AE'
        }
    }
    function userSignShort(){
        return {
            scope: {
                toaster:'@',
                buttonName:'@'
            },
            bindToController: true,
            controller: signupCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/sign-short.html',
            restrict:'AE'
        }
    }
    function userLogin(){
        return {
            scope: {
                closeModal:'&',
                modalClose:"&",
                toaster:'@',
                social:'=',
                successFoo:'&',

            },
            bindings: {
                toaster:'<',
                social:'=',
                successFoo:'&',
            },


            bindToController: true,
            controller: loginCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/login.html',
            restrict:'AE'
        }
    }
    function userLoginPhone(){
        return {
            scope: {
                closeModal:'&',
                modalClose:"&",
                toaster:'@',
                social:'=',
                successFoo:'&',

            },
            bindings: {
                toaster:'<',
                social:'=',
                successFoo:'&',
            },


            bindToController: true,
            controller: loginPhoneCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/loginPhone.html',
            restrict:'AE'
        }
    }
    function enterButton(){
        return {
            scope: {
                toaster:'@',
            },
            bindToController: true,
            controller: enterButtonCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/sign-login/enter-button.html',
            restrict:'AE'
        }
    }
    signupCtrl.$inject=['$scope','$auth', 'toaster','$q','global','Account','$state','Stuff','CreateContent','$email','exception'];
    function signupCtrl($scope,$auth, toaster,$q,global,Account,$state,Stuff,CreateContent,$email,exception){
        var self=this;
        self.global=global;
        self.formData=(global.get('store').val.bonusForm)?global.get('store').val.bonusForm:{phone:true,fields:[]}
        self.user={email:'',profile:{},addInfo:{}};
        if(!self.buttonName){self.buttonName=='подписаться!!'}
        //console.log(self.buttonName)

        self.signup=signup;
        self.authenticate=authenticate;


        function signup(form) {
            if(!form.$valid){retrun}
            self.user.store=global.get('store').val._id;
            $auth.signup(self.user)
                .then(function(response) {
                    //console.log(response)
                    if(response && response.data &&  response.data.token){
                        if(response.data.token=='update'){
                            $scope.$emit('closeWitget')
                            toaster.info(response.data.message);
                            throw null;
                        }else{
                            $auth.setToken(response);
                            var msg = global.get('langNote').val.subscriptionSuccess;
                            toaster.info(msg);
                            return Account.getProfile()
                        }
                    } else{
                        throw response;
                    }

                })
                .then(function(response){
                    $scope.$emit('closeWitget')
                    //console.log(response)
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                        if($state.current.name=='cart' || $state.current.name=='stuffs.stuff'){return}
                        //if(!response){return;}
                        var states= $state.get();
                        //console.log(global.get('paps'))
                        if(global.get('paps') && global.get('paps').val && states.some(function(state){return state.name=='thanksPage'})){
                            var pap = global.get('paps').val.getOFA('action','subscription');
                            if(pap && pap.url){
                                $state.go('thanksPage',{id:pap.url})
                            }
                        }
                    }

                })
                .then(function () {
                    if(self.user.type=="subscription"){
                        //console.log(global.get('coupons').val);
                        if(global.get('coupons') && global.get('coupons').val && global.get('coupons').val.length){
                            return [{imgs:global.get('coupons').val}]
                        }
                    }else if (self.user.type=='subscriptionAdd'){
                        var p={page:0,rows:100};
                        var query={$and:[{orderType:4},{actived:true}]}
                        return Stuff.getList(p,query);
                    }

                })
                .then(function (stuffs) {
                    //console.log(stuffs)
                    if(!stuffs || !stuffs.length){return}
                    if(!self.user || !self.user.email){throw 'нет email'}
                    var content=CreateContent.emailBonus(stuffs);
                    var bonus=global.get('langNote').val.getBonus;
                    var domain=global.get('store').val.domain;
                    var o={email:self.user.email,content:content,
                        subject:bonus+' ✔',from:  '<promo@'+domain+'>'};
                    return $q(function(resolve,reject){
                        $email.save(o,function(res){
                            exception.showToaster('note','',global.get('langNote').val.emailSent);
                            resolve()
                        },function(err){
                            exception.showToaster('warning',global.get('langNote').val.error,err.data)
                            resolve()
                        } )
                    })
                })
                .catch(function(err){
                    if(err){
                        toaster.error(err.data.message,err.status);
                    }
                })
        };
        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    $scope.$emit('closeWitget')
                    $auth.setToken(response);
                    var msg = global.get('langNote').val.subscriptionSuccess;
                    toaster.info(msg);

                    /*if(self.toaster){
                        toaster.success('Вы успешно подписались с помощью ' + provider + '!');
                    }*/
                })
                .then(function(){
                    return Account.getProfile()
                })
                .then(function(response){
                    console.log(response)
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }
                })
                .catch(function(error) {
                    if(self.toaster){
                        if (error.error) {
                            // Popup error - invalid redirect_uri, pressed cancel button, etc.
                            toaster.error(error.error);
                        } else if (error.data) {
                            // HTTP response error from server
                            toaster.error(error.data.message, error.status);
                        } else {
                            toaster.error(error);
                        }
                    }

                });
        };



    }
    loginCtrl.$inject=['$scope','$auth', 'toaster','$q','global','Account','exception','sendPhoneFactory','$timeout'];
    function loginCtrl($scope,$auth, toaster,$q,global,Account,exception,sendPhoneFactory,$timeout){


        var self=this;
        self.$onInit=function () {
            //console.log($scope.toaster,$scope.successFoo,self.toaster)
        }

        self.login=login;
        self.authenticate=authenticate;
        self.sendCodeToPhone=sendCodeToPhone;
        self.verifyCode=verifyCode;
        self.global=global;
        self.phone=null;
        self.codeSent;
        self.sendCodeDisable;
        self.sendVerifyCodeDisable;
        function login(form){
            //console.log(form)
            if(!form.$valid){retrun}
            self.user.store=global.get('store').val._id;
            $auth.login(self.user)
                .then(function() {
                    //console.log($scope.successFoo,self.toaster)
                    if(self.successFoo){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }

                    if(self.toaster){
                        toaster.info(global.get('langNote').val.authComplite);
                    }
                })
                .then(function(){
                    //console.log(Account.getProfile())
                    return Account.getProfile()
                })
                .then(function(response){
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }
                    $timeout(function () {
                        $scope.$emit('closeWitget')
                    },50)

                })
                .catch(function(err) {
                    global.set('user',null);
                    if(self.toaster){
                        exception.catcher('login')(err);
                    }
                });
        }
        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    //console.log(response)
                    $scope.$emit('closeWitget')
                    if(self.successFoo && typeof self.successFoo=='function'){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }

                    var msg = global.get('langNote').val.authComplite;
                    toaster.info(msg);
                })
                .then(function(){
                    return Account.getProfile()
                })
                .then(function(response){
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }
                })
                .catch(function(error) {
                    if(self.toaster){
                        if (error.error) {
                            // Popup error - invalid redirect_uri, pressed cancel button, etc.
                            toaster.error(error.error);
                        } else if (error.data) {
                            // HTTP response error from server
                            toaster.error(error.data.message, error.status);
                        } else {
                            toaster.error(error);
                        }
                    }

                });
        };
        function sendCodeToPhone() {
            if(self.sendCodeDisable){return}
            self.sendCodeDisable=true;
            console.log(self.phone)
            if(!self.phone){
                return;
            }
            $q.when()
                .then(function () {
                    return sendPhoneFactory.sendCodeToPhone(self.phone)
                })
                .then(function () {
                    self.codeSent=true;
                    exception.showToaster('info','send code','success')
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('send code')(err)
                    }
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
        }
        function verifyCode(form) {
            if(self.sendVerifyCodeDisable){return}
            if(form.$invalid){return}
            /*if(!self.phone){
                exception.catcher('verify code')('phone is empty')
            }
            if(!code){
                exception.catcher('verify code')('code is empty')
            }*/
            if(!self.code || !self.phone){
                return;
            }
            self.sendVerifyCodeDisable=true;
            $q.when()
                .then(function () {
                    return sendPhoneFactory.verifyCode(self.code,self.phone)
                })
                .then(function (response) {
                    //console.log(response)
                    exception.showToaster('info','verify code','success')
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000);
                    if(response && response.data &&  response.data.token){
                        $auth.setToken(response);
                        return Account.getProfile()
                    }else{throw 'wrong response'}
                })
                .then(function(response){
                    if(self.successFoo){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }
                    $scope.$emit('closeWitget')
                    if(self.toaster){
                        toaster.info(global.get('langNote').val.authComplite);
                    }
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }

                })
                .catch(function (err) {
                    self.wrongCode=true;
                    global.set('user',null);
                    if(err){
                        exception.catcher('verify code')(err)
                    }
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000)
                })
        }


    };
    function enterButtonCtrl(toaster,$q,Account,global,exception){
        var self=this;
        self.global=global;
        self.getEnterButton=getEnterButton;
        function getEnterButton(form){
            if(form.$invalid){return}
            $q.when()
                .then(function(){
                    self.blockButton=true;
                    setTimeout(function(){
                        self.blockButton=false
                    },1000)
                    return Account.getEnterButton(self.user)
                })
                .then(function(response) {

                    if(self.toaster){
                        toaster.info(response.data.message);
                    }
                })
                .catch(function(err) {
                    //console.log(err)
                    if(err){
                        exception.catcher(global.get('langNote').val.error)(err);
                    }

                });
        }
    };

    loginPhoneCtrl.$inject=['$scope','$auth', 'toaster','$q','global','Account','exception','sendPhoneFactory','$timeout','$user'];
    function loginPhoneCtrl($scope,$auth, toaster,$q,global,Account,exception,sendPhoneFactory,$timeout,$user){


        var self=this;
        self.$onInit=function () {
            //console.log($scope.toaster,$scope.successFoo,self.toaster)
        }

        self.sendCodeToPhone=sendCodeToPhone;
        self.verifyCode=verifyCode;
        self.global=global;
        self.phone=null;
        self.name='';
        self.codeSent;
        self.sendCodeDisable;
        self.sendVerifyCodeDisable;




        function sendCodeToPhone() {
            if(self.sendCodeDisable){return}
            self.sendCodeDisable=true;
            //console.log(self.phone)
            if(!self.phone){
                return;
            }
            $q.when()
                .then(function(){
                    return sendPhoneFactory.checkPhone(self.phone)
                })
                .then(function (res) {
                    //console.log(res)
                    if(!res || !res._id){
                        return $user.newUserByPhone(self.name,self.phone)
                    }
                })
                .then(function () {
                    console.log('sendPhoneFactory.sendCodeToPhone(self.phone)')
                    return sendPhoneFactory.sendCodeToPhone(self.phone)
                })
                .then(function () {
                    self.codeSent=true;
                    exception.showToaster('info','send code','success')
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('send code')(err)
                    }
                    $timeout(function () {
                        self.sendCodeDisable=false
                    },10000)
                })
        }
        function verifyCode(form) {
            if(self.sendVerifyCodeDisable){return}
            if(form.$invalid){return}
            /*if(!self.phone){
             exception.catcher('verify code')('phone is empty')
             }
             if(!code){
             exception.catcher('verify code')('code is empty')
             }*/
            if(!self.code || !self.phone){
                return;
            }
            self.sendVerifyCodeDisable=true;
            $q.when()
                .then(function () {
                    return sendPhoneFactory.verifyCode(self.code,self.phone)
                })
                .then(function (response) {
                    //console.log(response)
                    exception.showToaster('info','verify code','success')
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000);
                    if(response && response.data &&  response.data.token){
                        $auth.setToken(response);
                        return Account.getProfile()
                    }else{throw 'wrong response'}
                })
                .then(function(response){
                    if(self.successFoo){
                        self.successFoo();
                    }else{
                        $scope.$emit('closeWitget')
                    }
                    $scope.$emit('closeWitget')
                    if(self.toaster){
                        toaster.info(global.get('langNote').val.authComplite);
                    }
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                        $scope.$emit('cartslide',{event:'signLogin'})
                    }

                })
                .catch(function (err) {
                    self.wrongCode=true;
                    global.set('user',null);
                    if(err){
                        exception.catcher('verify code')(err)
                    }
                    $timeout(function () {
                        self.sendVerifyCodeDisable=false
                    },5000)
                })
        }


    };

})()

'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('pswdCheck', ['$timeout',function ($timeout) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    var firstPassword = '#' + attrs.pswdCheck;
                    $timeout(function(){
                        elem.on('keyup', function () {
                            scope.$apply(function () {
                                var v = elem.val()===$(firstPassword).val();
                                console.log(v)
                                ctrl.$setValidity('pswdmatch', v);
                            });
                        });
                    },100)

                }
            }
        }])
        .directive('passwordMatch', function() {
            return {
                require: 'ngModel',
                scope: {
                    otherModelValue: '=passwordMatch'
                },
                link: function(scope, element, attributes, ngModel) {
                    ngModel.$validators.compareTo = function(modelValue) {
                        //console.log(modelValue,scope.otherModelValue)
                        if((modelValue==='undefined'||modelValue===''||!modelValue)
                            &&(scope.otherModelValue==='undefined'||scope.otherModelValue===''||!scope.otherModelValue)){
                            return true;
                        }
                        return modelValue === scope.otherModelValue;
                    };
                    scope.$watch('otherModelValue', function() {
                        ngModel.$validate();
                    });
                }
            };
        })
        .directive('passwordStrength', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    var indicator = element.children();
                    var dots = Array.prototype.slice.call(indicator.children());
                    var weakest = dots.slice(-1)[0];
                    var weak = dots.slice(-2);
                    var strong = dots.slice(-3);
                    var strongest = dots.slice(-4);

                    element.after(indicator);

                    element.bind('keyup', function() {
                        var matches = {
                                positive: {},
                                negative: {}
                            },
                            counts = {
                                positive: {},
                                negative: {}
                            },
                            tmp,
                            strength = 0,
                            letters = 'abcdefghijklmnopqrstuvwxyz',
                            numbers = '01234567890',
                            symbols = '\\!@#$%&/()=?¿',
                            strValue;

                        angular.forEach(dots, function(el) {
                            el.style.backgroundColor = '#ebeef1';
                        });

                        if (ngModel.$viewValue) {
                            // Increase strength level
                            matches.positive.lower = ngModel.$viewValue.match(/[a-z]/g);
                            matches.positive.upper = ngModel.$viewValue.match(/[A-Z]/g);
                            matches.positive.numbers = ngModel.$viewValue.match(/\d/g);
                            matches.positive.symbols = ngModel.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g);
                            matches.positive.middleNumber = ngModel.$viewValue.slice(1, -1).match(/\d/g);
                            matches.positive.middleSymbol = ngModel.$viewValue.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

                            counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
                            counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
                            counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
                            counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

                            counts.positive.numChars = ngModel.$viewValue.length;
                            tmp += (counts.positive.numChars >= 8) ? 1 : 0;

                            counts.positive.requirements = (tmp >= 3) ? tmp : 0;
                            counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
                            counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

                            // Decrease strength level
                            matches.negative.consecLower = ngModel.$viewValue.match(/(?=([a-z]{2}))/g);
                            matches.negative.consecUpper = ngModel.$viewValue.match(/(?=([A-Z]{2}))/g);
                            matches.negative.consecNumbers = ngModel.$viewValue.match(/(?=(\d{2}))/g);
                            matches.negative.onlyNumbers = ngModel.$viewValue.match(/^[0-9]*$/g);
                            matches.negative.onlyLetters = ngModel.$viewValue.match(/^([a-z]|[A-Z])*$/g);

                            counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
                            counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
                            counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

                            // Calculations
                            strength += counts.positive.numChars * 4;
                            if (counts.positive.upper) {
                                strength += (counts.positive.numChars - counts.positive.upper) * 2;
                            }
                            if (counts.positive.lower) {
                                strength += (counts.positive.numChars - counts.positive.lower) * 2;
                            }
                            if (counts.positive.upper || counts.positive.lower) {
                                strength += counts.positive.numbers * 4;
                            }
                            strength += counts.positive.symbols * 6;
                            strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
                            strength += counts.positive.requirements * 2;

                            strength -= counts.negative.consecLower * 2;
                            strength -= counts.negative.consecUpper * 2;
                            strength -= counts.negative.consecNumbers * 2;

                            if (matches.negative.onlyNumbers) {
                                strength -= counts.positive.numChars;
                            }
                            if (matches.negative.onlyLetters) {
                                strength -= counts.positive.numChars;
                            }

                            strength = Math.max(0, Math.min(100, Math.round(strength)));

                            if (strength > 85) {
                                angular.forEach(strongest, function(el) {
                                    el.style.backgroundColor = '#008cdd';
                                });
                            } else if (strength > 65) {
                                angular.forEach(strong, function(el) {
                                    el.style.backgroundColor = '#6ead09';
                                });
                            } else if (strength > 30) {
                                angular.forEach(weak, function(el) {
                                    el.style.backgroundColor = '#e09115';
                                });
                            } else {
                                weakest.style.backgroundColor = '#e01414';
                            }
                        }
                    });
                },
                template: '<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
            };
        })
})()



angular
    .module('gmall.exception',[])
    .factory('exception', exception);

exception.$inject = ['toaster'];

function exception(toaster) {
    var service = {
        catcher: catcher,
        showToaster:showToaster
    };
    return service;

    function catcher(header) {
        //console.log(message)
        return function(err) {
            if(err){
                if(typeof err=='object'){
                    if(err.data){
                        err=err.data
                    }
                    if(err.message){
                        err=err.message
                    }else if(err.error){
                        err=err.error
                    }
                }
            }else{
                err='ошибка'
            }
            //console.log(message,reason)
            toaster.pop('error',header,err);
            //logger.error(message, reason);
        };
    }
    function showToaster(type,title,content){
        if(typeof content=='object'){
            if(content.message){
                content=content.message
            }else if(content['error']){
                content=content['error']
            }
        }
        toaster.pop({
            type: type,
            title: title,
            body: content,
            bodyOutputType: 'trustedHtml',
            showCloseButton: true,
            delay:15000,
            closeHtml: '<button>Close</button>'
        });
    }
}

angular
    .module('gmall.services')
    .factory('Confirm', confirmFactory);

confirmFactory.$inject = ['$q','$uibModal'];

function confirmFactory($q,$uibModal) {
    return service;
    function service(question){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                template : [
                    '<div class="modal-header">',
                        '<h3 class="modal-title text-center" ng-bind="$ctrl.question"></h3>',
                        "<span clacc='icon-cancel-img'></span>",
                    '</div>',
                    '<div class="modal-body confirm">',
                    '<form ng-submit="$ctrl.ok()">'+
                    '<button autofocus class="btn btn-project btn-border  btn-modal pull-right" type="reset" ng-click="$ctrl.cancel()">{{global.get("langOrder").val.noo}}</button>',
                    '<button class="btn btn-project btn-modal pull-left" type="submit">{{global.get("langOrder").val.yes}}</button>',
                    '</form>'+
                    '<div class="clearfix"></div>',
                    '</div>'
                ].join(''),
                controller: function($uibModalInstance,question){
                    var self=this;
                    self.question=question
                    self.ok=function(){
                        $uibModalInstance.close();
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size: 'sm',
                resolve:{
                    question: function(){return question}
                }
            }
            $uibModal.open(options).result.then(function () {resolve();},function () {reject()});
        })


    }
}

angular.module('gmall.services')
    .factory('myInterceptorService', function($q,$rootScope,$templateCache) {
        var keys=$templateCache.getKeys();
        //console.log(keys)
        var store=globalStoreId;
        //var zip = new JSZip();
        //var global= $rootScope.global;
        //console.log(globalCrawler)
        try{
            var crawler=(globalCrawler)?globalCrawler:null;
        }catch(err){
            var crawler=null;
        }

        return {
            // optional method
            'request': function(config) {
                if(keys.indexOf(config.url)>-1){
                    return config;
                }

                /*if(config.url.indexOf('uib/template/') > -1
                    || config.url.indexOf('.tpl.html') > -1 || config.url.indexOf('rzSliderTpl.html') > -1|| config.url.indexOf('tooltip/tooltip-popup.html') > -1
                    || config.url.indexOf('template/modal/backdrop.html') > -1 || config.url.indexOf('template/modal/window.html') > -1
                    || config.url.indexOf('mainSection.html') > -1 || config.url.indexOf('subSection.html') > -1
                    || config.url.indexOf('template/tabs/tabset.html') > -1 || config.url.indexOf('template/tabs/tab.html') > -1
                    || config.url.indexOf('template/datepicker/day.html') > -1 || config.url.indexOf('template/datepicker/month.html') > -1|| config.url.indexOf('template/datepicker/year.html') > -1
                    || config.url.indexOf('template/popover/popover.html') > -1 || config.url.indexOf('template/datepicker/datepicker.html') > -1|| config.url.indexOf('template/datepicker/popup.html') > -1){
                    return config;
                }*/
                config.params = config.params || {};
                if(!config.params.store){
                    config.params.store=store
                }
                if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                    config.params.lang=$rootScope.global.get('store').val.lang
                }
                return config;
                /***************************************************************************************************************************************/

               //console.log('config.url' ,config.url)
               //console.log('config.url' ,config.url,config.url.indexOf('api/users/checkemail') > -1)
                if(!config.url){
                    console.log('config.url' ,config.url)
                    return config;
                }
                if(config.url.indexOf('socket.io') > -1){
                    console.log('config.url',config.url)
                    config.url=socketHost+config.url;
                }

                if(config.url.indexOf('api/collections/') > -1 && (config.url.indexOf('http://')<0 && config.url.indexOf('https://')<0)){
                    /*if(config.url.indexOf('api/collections/Dialog') > -1 ||
                        config.url.indexOf('api/collections/Chat') > -1 ||
                        config.url.indexOf('api/collections/Notification') > -1){
                        config.url=socketHost+config.url;
                    }else if(config.url.indexOf('api/collections/User') > -1 || config.url.indexOf('api/collections/SubscribtionList') > -1){
                        config.url=userHost+config.url;
                    }else if(config.url.indexOf('api/collections/Store') > -1 ||
                        config.url.indexOf('api/collections/Template') > -1 ||
                        config.url.indexOf('api/collections/Config') > -1 ||
                        config.url.indexOf('api/collections/Lang') > -1 ||
                        config.url.indexOf('api/collections/Redirect') > -1 ||
                        config.url.indexOf('api/collections/BlocksConfig') > -1 ||
                        config.url.indexOf('api/collections/CustomLists') > -1||
                        config.url.indexOf('api/collections/Seller') > -1){
                        config.url=storeHost+config.url;
                    }else if(config.url.indexOf('api/collections/Order') > -1 ||
                        config.url.indexOf('api/collections/Booking') > -1 ||
                        config.url.indexOf('api/collections/CartInOrder') > -1 ){
                        config.url=orderHost+config.url;
                    } else if(config.url.indexOf('deleteFilesFromStuff')>-1 || config.url.indexOf('fileGalleryDelete') > -1){
                        config.url=photoUpload+config.url;
                    }else{
                        config.url=stuffHost+config.url;
                    }*/
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }

                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                } else if (config.url.indexOf('/api/orders') > -1){

                    //config.url=orderHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('/api/stuffs') > -1){

                    //config.url=stuffHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if (config.url.indexOf('/api/sendEmail') > -1 || config.url.indexOf('api/users/') > -1 ){

                    //config.url=userHost+config.url;
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if(config.url.indexOf('auth/signupOrder') > -1){
                    //config.url=userHost+config.url;

                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    /*if($rootScope.global && $rootScope.global.get('store') &&$rootScope.global.get('store').val &&$rootScope.global.get('lang') &&
                        $rootScope.global.get('store').val.lang!=$rootScope.global.get('lang').val){
                        config.params.lang=$rootScope.global.get('lang').val
                    }*/
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if(config.url.indexOf('http://')>-1 || config.url.indexOf('https://')>-1){
                    // for photos
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }else if(config.url.indexOf('/api/chatMessagesList/')>-1 || config.url.indexOf('/api/notificationList/')>-1){
                    // for photos
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }
                else if (config.url.indexOf('views/template/partials') > -1){
                    config.params = config.params || {};
                    if(!config.params.store){
                        config.params.store=store
                    }
                    if($rootScope.global && $rootScope.global.get('store') && $rootScope.global.get('store').val && $rootScope.global.get('store').val.lang){
                        config.params.lang=$rootScope.global.get('store').val.lang
                    }
                }
                //console.log(config.url)
                if(crawler){
                    config.params = config.params || {};
                    config.params.subDomain=crawler;
                }
                return config;
            },
            response: function(response){
                // do something for particular error codes
                if(response.status === 500){
                    // do what you want here
                }
               //console.log(response)

                return response;
                //console.log("response && response.config && response.config.url && response.config.url.split",response && response.config && response.config.url && response.config.url.split)
                if(response && response.config && response.config.url && response.config.url.split){

                    //var u = response.config.url.split('api/collections')
                    var u = response.config.url.split(stuffHost)
                    //console.log(u)
                    if(u.length >1 ){
                        var u1 =  u[1].split('api/collections')
                        //console.log(u1)
                        if(u1[1]){
                            var u2 = u1[1].split('/')
                            //console.log(u2)
                            if(u2.length==2){
                                console.log('unzip',response.config.url,response)
                                /*var gunzip = new Zlib.Gunzip(response.data);
                                response.data = gunzip.decompress();*/
                                return response;
                            }else{
                                return response;
                            }

                        }else{
                            return response;
                        }

                    }else{
                        return response;
                    }


                }else{
                    return response;
                }



            }
        };
    });

angular.module('gmall')
    .config(['$provide', function($provide) {

    // monkey-patches $templateCache to have a keys() method
    $provide.decorator('$templateCache', [
        '$delegate', function($delegate) {

            var keys = [], origPut = $delegate.put;

            $delegate.put = function(key, value) {
                origPut(key, value);
                keys.push(key);
            };

            // we would need cache.peek() to get all keys from $templateCache, but this features was never
            // integrated into Angular: https://github.com/angular/angular.js/pull/3760
            // please note: this is not feature complete, removing templates is NOT considered
            $delegate.getKeys = function() {
                return keys;
            };

            return $delegate;
        }
    ]);
}]);

'use strict';
angular.module('gmall.services')
.service('Store', function($resource,$q,$uibModal,$http){
    var Items= $resource('/api/collections/Store/:_id',{_id:'@_id'});
    return {
        getList:getList,
        getItem:getItem,
        query:Items.query,
        get:Items.get,
        save:Items.save,
        delete:Items.delete,
        upload:upload,
        create:create,
        selectPartOfTemplate:selectPartOfTemplate,
        selectItemFromList:selectItemFromList,
    }
    function getList(paginate,query){
        var data ={perPage:paginate.rows ,page:paginate.page,query:query};
        return Items.query(data).$promise
            .then(getListComplete)
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                    //console.log(paginate)
                }else{
                    paginate.items=0;
                }
            }
            return response;
        }
    }
    function getItem(id){
        return Items.get({_id:id} ).$promise
            .then(getItemComplete)
        function getItemComplete(response) {
            return response;
        }
    }

    function upload(item) {
        var url =(storeHost)? 'http://'+storeHost+'/api/upload/'+item._id:'/api/upload/'+item._id
        //console.log(url)
        return $http.get(url)
    }
    function create(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/createStore.html',
                controller: createStoreCtrl,
                controllerAs:'$ctrl',
            });
            modalInstance.result.then(function (store) {
                if(store.name){
                    store.name=store.name.substring(0,25)
                    //store.user={_id:store.user._id,name:store.user.name}
                    resolve(store)
                }else{
                    reject('empty')
                }

            }, function (err) {
                reject(err)
            });
        })


    }

    function selectPartOfTemplate(stores){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/storeSetting/modal/selectStore.html',
            controllerAs:'$ctrl',
            controller: function ($uibModalInstance ,global,stores) {
                var self=this;
                self.stores=stores;
                self.selectStore=selectStore;
                self.cancel = cancel;

                function selectStore(store){
                    $uibModalInstance.close(store);
                }
                function cancel() {
                    $uibModalInstance.dismiss();
                };
            },
            resolve: {
                stores:function () {
                    return stores
                }
            }
        });
        return modalInstance.result
    }
    function selectItemFromList(items,header){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/storeSetting/modal/selectItem.html',
            controllerAs:'$ctrl',
            controller: function ($uibModalInstance ,global,items,header) {
                var self=this;
                self.items=items;
                self.header=header||'выберите из предложенного списка'
                self.selectItem=selectItem;
                self.cancel = cancel;

                function selectItem(item){
                    $uibModalInstance.close(item);
                }
                function cancel() {
                    $uibModalInstance.dismiss();
                };
            },
            resolve: {
                items:function () {
                    return items
                },
                header:function () {
                    return header
                }
            }
        });
        return modalInstance.result
    }

    createStoreCtrl=['$uibModalInstance','exception','$user'];
    function createStoreCtrl($uibModalInstance,exception,$user){
        var self=this;
        self.name='';
        self.addOwner=addOwner;
        self.ok=function(){
            /*if(!self.name || !self.user){
                exception.catcher('создание магазина')('нужен владелец')
                return
            }*/
            if(!self.name){
                exception.catcher('создание магазина')('нужено название')
                return
            }
            $uibModalInstance.close({name:self.name});
            //$uibModalInstance.close({name:self.name,user:self.user});
        }
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        function addOwner(){
            $user.selectItem().then(function(user){
                self.user=user
            })
        }
    }
})
    .service('Template', function($resource,$q,$uibModal){
        var Items= $resource('/api/collections/Template/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create
        }
        function getList(paginate,query){
            if(!paginate){
                paginate ={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/storeSetting/createTemplate.html',
                    controller: createTemplateCtrl,
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (o) {
                    if(o.name){
                        o.name=o.name.substring(0,25)
                        resolve(o)
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })


        }
        createTemplateCtrl=['$uibModalInstance','exception'];
        function createTemplateCtrl($uibModalInstance,exception){
            var self=this;
            self.name='';
            self.folder=''
            self.ok=function(){
                if(!self.name || !self.folder){
                    exception.catcher('создание шаблона')('нужено имя и папка')
                    return
                }
                $uibModalInstance.close({name:self.name,folder:self.folder});
            }
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    })
    .service('BlocksConfig', function($resource,$q,$uibModal){
        var Items= $resource('/api/collections/BlocksConfig/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            selectItemFromList:selectItemFromList,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate ={page:0,rows:500}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function selectItemFromList(items,header){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/modal/selectItemForBlocks.html',
                controllerAs:'$ctrl',
                controller: function ($uibModalInstance ,global,items,header) {
                    var self=this;
                    self.items=items;
                    self.header=header||'выберите из предложенного списка'
                    self.selectItem=selectItem;
                    self.cancel = cancel;

                    function selectItem(item){
                        $uibModalInstance.close(item);
                    }
                    function cancel() {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    items:function () {
                        return items
                    },
                    header:function () {
                        return header
                    }
                }
            });
            return modalInstance.result
        }
        /*function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/storeSetting/createTemplate.html',
                    controller: createTemplateCtrl,
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (o) {
                    if(o.name){
                        o.name=o.name.substring(0,25)
                        resolve(o)
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })


        }
        createTemplateCtrl=['$uibModalInstance','exception'];
        function createTemplateCtrl($uibModalInstance,exception){
            var self=this;
            self.name='';
            self.folder=''
            self.ok=function(){
                if(!self.name || !self.folder){
                    exception.catcher('создание шаблона')('нужено имя и папка')
                    return
                }
                $uibModalInstance.close({name:self.name,folder:self.folder});
            }
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }*/
    })
    .service('Config', function($resource){
        var Items= $resource('/api/collections/Config/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
    })
    .service('ConfigData', function($resource,$q){
        var Items= $resource('/api/collections/ConfigData/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
    })

    .service('Seller', function($resource){
        var Items= $resource('/api/collections/Seller/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            return Items.query(data).$promise
                .then(getListComplete)
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param} ).$promise
                .then(getItemComplete)
            function getItemComplete(response) {
                return response;
            }
        }
    })

    .service('siteName', function($uibModal){
        return {
            choiceName:choiceName,
        }
        function choiceName(data){
            return $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/modal/websiteName.html',
                controller: function($uibModalInstance,global,Store,data){
                    var self=this;
                    self.global=global;
                    self.item=''
                    self.focus=true;
                    self.windowName='Выберите поддомен';
                    self.field = 'subDomain'
                    if(data){
                        if(data.windowName){
                            self.windowName=data.windowName;
                        }
                        if(data.field){
                            self.field=data.field;
                        }
                    }
                    self.checkSubDomain=checkSubDomain;
                    self.exist=false
                    //self.re=/^[a-z][a-z0-9-_]/
                    self.re=/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
                    self.ok=function(websiteNameForm){
                        if(websiteNameForm.$invalid || self.exist){
                            return;
                        }
                        $uibModalInstance.close(self.item.toLowerCase());
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    function checkSubDomain(name){
                        if(!name || name.length>20){return}
                        var o={};
                        o[self.field]=name.toLowerCase();
                        Store.query({query:o},function(res){
                            if(res &&  res.length){
                                console.log(true)
                                self.exist =true;
                            }else{
                                self.exist= false
                            }
                        },function(err){
                            self.exist= true;
                        })
                    }
                },
                controllerAs:'$ctrl',
                resolve: {
                    data : function () {
                        return data
                    }
                }
            }).result
        }
    })

/*
$resource('/api/collections/Template/:id',{id:'@_id'}).query({perPage:500,page:0},function(res){
    res.shift();
    $scope.listEditCtrl.templates=res;
});
$resource('/api/collections/Config/:id',{id:'@_id'}).query({perPage:500,page:0},function(res){
    res.shift();
    $scope.listEditCtrl.currency=res[0].currency;
    $scope.listEditCtrl.unitOfMeasure=res[0].unitOfMeasure;
    $scope.listEditCtrl.config=res[0];
});*/

'use strict';
angular.module('gmall.services')
.service('Sections', sectionServiceFunction)

.service('selectCategoryFromModal',function($q,$uibModal){
    this.bind=function(categoryId){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/selectCategoryModal/selectCategoryModal.html',
                controller: 'selectCategoryModalCtrl',
                size: 'lg',
                resolve:{
                    categoryId:function(){return categoryId}
                }
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selectedItem) {
                resolve(selectedItem)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })
    }
})

sectionServiceFunction.$inject=['$resource', '$q' ,'global','$uibModal','$timeout'];
function sectionServiceFunction($resource,$q,global,$uibModal,$timeout) {
    var Items= $resource('/api/collections/Group/:id',{id:'@_id'});

    var sections=null;
    var pending=true;
    activate()
    return{
        query:Items.query,
        get:Items.get,
        delete:Items.delete,
        save:save,
        savePure:Items.save,
        getSections:getSections,
        getSection:getSection,
        getParentSection:getParentSection,
        getEmbededCategories:getEmbededCategories,
        setCategoriesFromSections:setCategoriesFromSections,
        select:select,
        setSections:setSections,
        reloadItems:reloadItems

    }
    function activate(){
        $timeout(function(){
            //console.log(global.get('sections'))
            if(!global.get('sections') || !global.get('sections' ).val){
                init()
            }
        })
    }
    function init() {
        Items.query(function(res){
            res.shift();
            sections=res;
            setCategoriesFromSections(sections)
            pending=false;
        })
    }
    function reloadItems(){
        pending=true;
        init();
    }

    function save(){
        return Items.save.apply(this,arguments).$promise.then(function(){
            //activate()
        })
    }

    function _getParentSection(sections,sectionUrl,id){
        //console.log(sectionUrl)
        if(!sections) return  null;
        for(var i=0,l=sections.length;i<l;i++){
            if(id){
                if(sections[i]._id==sectionUrl){
                    return sections[i];
                    break
                }
            }else{
                if(sections[i].url && sections[i].url==sectionUrl){
                    return sections[i];
                    break
                }
            }

            if (sections[i].child && sections[i].child.length){
                var categories;
                if(categories=_getParentSection(sections[i].child,sectionUrl,id)){
                    return categories;
                    break;
                }
            }
        }
        return null;
    }
    function _getEmbededCategories(section,arr){
        if(section.categories && section.categories.length){
            arr.push.apply(arr,section.categories);
        }
        if (section.child && section.child.length){
            section.child.forEach(function(section){
                getEmbededCategories(section,arr);
            })
        }
        return arr;
    }
    function returnSections(resolve){
        if(pending){setTimeout(function(){returnSections(resolve)}, 100);}else{
            resolve(sections)
        }

    }
    function getSections(){
        return $q(function(resolve,reject){
            if(global.get('sections') && global.get('sections' ).val){
                if(!sections){sections=global.get('sections' ).val}
                resolve(global.get('sections' ).val);
            }else{
                if(pending){
                    setTimeout(function(){returnSections(resolve)}, 100);
                }else{
                    if(sections){
                        resolve(sections)
                    } else{
                        pending=true;
                        Items.query(function(res){
                            res.shift();
                            sections=res;
                            pending=false;
                            setCategoriesFromSections(sections)
                            resolve(sections)
                        },function(err){pending=false;;reject(err)})
                    }
                }

            }

        })


    }
    function setSections(newSections){
        sections=newSections
        if(sections){
            setCategoriesFromSections(sections)
        }else{
            setCategoriesFromSections([])
        }

    }
    function getSection(sections,sectionUrl) {
        if(!sections) {sections=getSections();}
        for(var i=0,l=sections.length;i<l;i++){
            if(sections[i].url && sections[i].url==sectionUrl){
                return sections[i];
                break
            }
            if (sections[i].child && sections[i].child.length){
                for(var j=0,ll=sections[i].child.length;j<ll;j++){
                    if(sections[i].child[j].url && sections[i].child[j].url==sectionUrl){
                        return sections[i].child[j];
                        break
                    }
                }
            }
        }
        return null;
    }
    function getParentSection(sectionUrl,id){
        return _getParentSection(sections,sectionUrl,id)
    }
    function getEmbededCategories(section,arr){
        return _getEmbededCategories(section,arr)
    }
    function setCategoriesFromSections(sections){
        //console.log(sections)
        var categories=[];
        var categoriesO={};
        sections.forEach(function(section){
            if(section.categories && section.categories.length){
                section.categories.forEach(function(c){
                    //console.log(c)
                    c.section={url:section.url}
                    c.linkData={groupUrl:section.url,categoryUrl:c.url}
                    categoriesO[c._id]=c
                })
                categories.push.apply(categories,section.categories)
            }
            if(section.child && section.child.length){
                section.child.forEach(function(subSection){
                    if(subSection.categories && subSection.categories.length){
                        subSection.categories.forEach(function(c){
                            //console.log(c)
                            c.section={url:section.url}
                            c.linkData={groupUrl:section.url,categoryUrl:c.url,parentGroup:subSection.url}
                            categoriesO[c._id]=c
                        })
                        categories.push.apply(categories,subSection.categories)
                    }
                })
            }
        })
        global.set('categories',categories);
        global.set('categoriesO',categoriesO);
    }




    function select(){
        var that=this;
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/sections/selectSubsectionModal.html',
                controller: selectSubsectionCtrl,
                size: 'lg',
                resolve:{
                    sections:function(){return that.getSections();}
                },
                controllerAs:'$ctrl'
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selectedItem) {
                resolve(selectedItem)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })

    }
    selectSubsectionCtrl.$inject=['$q','$uibModalInstance','sections'];
    function selectSubsectionCtrl($q,$uibModalInstance,sections){
        var self=this;
        self.sections = sections;
        console.log(sections)
        self.ok = function (section) {
            $uibModalInstance.close(section);
        };
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}
'use strict';
(function(){
    angular.module('gmall.services')
        .service('Category', categoryService);
    categoryService.$inject=['$resource','$uibModal','$q'];
    function categoryService($resource,$uibModal,$q){



        var Items= $resource('/api/collections/Category/:_id',{_id:'@_id'});
        return {
            //query:getList,
            get:Items.get,
            query:Items.query,
            save:save,
            delete:Items.delete,
            select:select,

        }
        function save(){
            return Items.save.apply(this,arguments).$promise.then(function(){
                
            })
        }
        function getList(query,cb){
            console.log(query)
            Items.query(query,function(res){
                cb(res)
            })

        }
        function select(categoryId,selectSection,sections,forGroupStuffs){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/sections/selectCategoryModal.html',
                    controller: selectCategoryCtrl,
                    size: 'lg',
                    resolve:{
                        categoryId:function(){return categoryId},
                        selectSection:function(){return selectSection},
                        sections:function(){if(sections){return sections}else{return null}},
                        forGroupStuffs:function(){if(forGroupStuffs){return forGroupStuffs}else{return null}}
                    },
                    controllerAs:'$ctrl'
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedItem) {
                    resolve(selectedItem)
                }, function () {
                    //console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }
    }
    selectCategoryCtrl.$inject=['$q','$uibModalInstance','Sections','categoryId','selectSection','sections','forGroupStuffs'];
    function selectCategoryCtrl($q,$uibModalInstance,Sections,categoryId,selectSection,sections,forGroupStuffs){
        var self=this;
        self.categoryId=categoryId;
        self.selectSection=selectSection;
        $q.when()
            .then(function(){
                if(sections){
                    return sections
                }else{
                    return Sections.getSections();
                }
            })
            .then(function(sections){
                //console.log(sections)
                self.sections = sections.filter(function (s) {
                    if(forGroupStuffs){
                        return s.groupStuffs
                    }else{
                        return !s.groupStuffs
                    }
                });
            })
        self.ok = function (selectedCategory) {
            $uibModalInstance.close(selectedCategory);
        };
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})()


/*
var store = {store:req.store._id};
if (!options.criteria){
    options.criteria= store;
}else{
    if (options.criteria['$and']){
        /!*if(!options.criteria['$and'].some(function(el){
         return Object.keys(el)[0]=='store'
         })){
         options.criteria['$and'].push(store);
         }*!/
        options.criteria['$and'].push(store);
    }else{
        /!*if(Object.keys(options.criteria)[0]!='store'){
         options.criteria={$and:[options.criteria,store]}
         }*!/
        options.criteria={$and:[options.criteria,store]}
    }
}*/

'use strict';
(function() {

    angular.module( 'gmall.services' )
        .service( 'Brands', function ($resource, $q,global,$uibModal,Sections) {
            var Items = $resource( '/api/collections/Brand/:id', {id: '@_id'} );
            var brands = null;
            var pending = true;
            this.query = Items.query;
            this.get = Items.get;
            this.delete = Items.delete;
            this.save = Items.save;
            this.reloadItems=reloadItems;
            this.select=selectBrand;
            this.getList=getList;
            this.getItem=getItem;



            function getList(paginate,query){
                if(!paginate){
                    paginate={page:0}
                }
                var data ={perPage:paginate.rows ,page:paginate.page,query:query};
                if(global.get('crawler') && global.get('crawler').val){
                    data.subDomain=global.get('store').val.subDomain;
                }
                return Items.query(data).$promise
                    .then(getListComplete)
                //.catch(getListFailed);
                function getListComplete(response) {
                    if(paginate.page==0){
                        if(response && response.length){
                            paginate.items=response.shift().index;
                        }else{
                            paginate.items=0;
                        }
                    }
                    //console.log(response)
                    return response;
                }

                function getListFailed(error) {
                    console.log('XHR Failed for getNews.' + error);
                    return $q.reject(error);
                }
            }
            function getItem(id){
                return Items.get({_id:id} ).$promise
                    .then(getItemComplete)
                //.catch(getItemFailed);
                function getItemComplete(response) {
                    if(response && response.blocks && response.blocks.length){
                        response.blocks.forEach(function (b) {
                            if(b.type=='stuffs'){
                                if(b.stuffs && b.stuffs.length){
                                    b.imgs=b.stuffs.map(function(s){
                                        if(s.gallery && s.gallery.length && s.gallery[0].img){
                                            s.img=s.gallery[0].img;
                                        }
                                        return s;
                                    });
                                }else{b.imgs=[]}
                            }
                        })
                    }
                    return response;
                }
                function getItemFailed(error) {
                    return $q.reject(error);
                }
            }


            function returnBrands(resolve) {
                if (pending) {
                    setTimeout( function () {
                        returnBrands( resolve )
                    }, 300 );
                } else {
                    resolve( brands )
                }
            }

            this.getBrands = function () {
                return $q( function (resolve, reject) {
                    if(global.get('brands') && global.get('brands').val){
                        if(!brands){brands=global.get('brands').val}
                        return resolve(global.get('brands').val);
                    }
                    if (pending) {
                        setTimeout( function () {
                            returnBrands( resolve )
                        }, 300 );
                    } else {
                        if (brands) {
                            resolve( brands )
                        } else {
                            pending = true;
                            Items.query( function (res) {
                                res.shift();
                                brands = (res)?res:[];
                                pending = false;
                                resolve( brands )
                            }, function (err) {
                                pending = false;
                                ;
                                reject( err )
                            } )
                        }
                    }

                } )
            }
            if(!global.get('brands') || !global.get('brands' ).val){
                Items.query( function (res) {
                    res.shift();
                    brands = res;
                    if(global.get('brands') && !global.get('brands' ).val){
                        global.set('brands',brands)
                    }
                    pending = false;
                } )
            }


            function reloadItems(){
                pending=true;
                Items.query( function (res) {
                    res.shift();
                    brands = res;
                    global.set('brands',brands)
                    pending = false;
                } )
            }


            function selectBrand(data){
                var sections =(data &&  data.section)?Sections.getSections():null;
                return $q(function(resolve,reject){
                    var options={
                        animation: true,
                        templateUrl: 'components/brand/selectBrand.html',
                        controller: selectBrandCtrl,
                        size: 'lg',
                        controllerAs:'$ctrl',

                        resolve:{
                            sections: function(){
                                return sections
                            }
                        }

                    }
                    var modalInstance = $uibModal.open(options);
                    modalInstance.result.then(function (selected) {
                        resolve(selected)
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                        reject()
                    });
                })
            }
            selectBrandCtrl.$inject=['Brands','$uibModalInstance','$q','global','sections'];
            function selectBrandCtrl(Brands,$uibModalInstance,$q,global,sections){
                var self=this;

                self.global=global;
                self.sections=sections;
                if(self.sections){
                    self.section=self.sections[0].url
                }

                $q.when()
                    .then(function(){
                        return Brands.getBrands();
                    } )
                    .then(function(filters){
                        self.filters=filters;
                        //console.log(filters)
                    })
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                self.ok = function (filterTag) {

                    if(self.section){
                        filterTag.section=self.section;
                    }

                    $uibModalInstance.close(filterTag);
                };
            }

        } )


        //************************************************************
        .service( 'BrandTags', brandTagsService);
    brandTagsService.$inject=['$resource','$uibModal','$q','Sections'];
    function brandTagsService($resource,$uibModal,$q,Sections) {
        var Items = $resource( '/api/collections/BrandTags/:id', {id: '@_id'} );
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            selectBrandTag:selectBrandTag,
            select:selectBrandTag
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function selectBrandTag(data){
            var sections =(data &&  data.section)?Sections.getSections():null;
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/brand/selectBrandTag.html',
                    controller: selectBrandTagCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        sections: function(){
                            return sections
                        }
                    }
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedFilterTag) {
                    resolve(selectedFilterTag)
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }
        selectBrandTagCtrl.$inject=['Brands','$uibModalInstance','$q','global','sections'];
        function selectBrandTagCtrl(Brands,$uibModalInstance,$q,global,sections){
            var self=this;
            self.global=global;
            self.sections=sections;
            if(self.sections){
                self.section=self.sections[0].url
            }
            $q.when()
                .then(function(){
                    return Brands.getBrands();
                } )
                .then(function(filters){
                    self.filters=filters;
                    //console.log(filters)
                })
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function (filterTag) {
                if(self.section){
                    filterTag.section=self.section;
                }
                filterTag.brand=self.filters.find(function(b){
                    return b._id==filterTag.brand
                })
                $uibModalInstance.close(filterTag);
            };
        }
    }
})()

'use strict';
angular.module('gmall.controllers')
.controller('stuffsFilterCtrl', ['$scope','$resource','$rootScope','global','Stuff','$section','$location','$q','Collection','$anchorScroll','$timeout',function ($scope,$resource,$rootScope,global,Stuff,$section,$location,$q,Collection,$anchorScroll,$timeout){
    var $state=$rootScope.$state;
    var $stateParams=$rootScope.$stateParams;
    $scope.stuffsFilterCtrl=this;
    $scope.stuffsFilterCtrl.paginate={page:0,rows:50,totalItems:0}
    $scope.stuffsFilterCtrl.query={section:'',brand:'',category:'',tags:[],artikul:($stateParams.searchStr)?$stateParams.searchStr.clearTag(20):'',brandTag:''};
    $scope.stuffsFilterCtrl.categories=[]; // список категорий для визуального блока фильтров
    var queryTags,category;// теги из строки запроса и активная категория
    $scope.stuffsFilterCtrl.brands=[]; // список брендов для визуального блока фильтров
    $scope.stuffsFilterCtrl.brandCollections=[];
    $scope.stuffsFilterCtrl.filters=[];


    // определяем в каком состоянии мы находимся. в разделе, категории или всем каталоге
    // затем устанавливаем параметры  в строку запроса если они соответствую  нащей логике
    // затем вызываем функцию получения списка
    // затем начинаем слущать клик на любом из фильтров
    // в функции $scope.stuffsFilterCtrl.changeFilter
    // если клик на категории то перегружаем контроллер если на фильтре то делаем запрос на новый список
    //*****************************************
    function initChainForGettingList(){
        var q=$q.defer(); q.resolve();return q.promise;
    }
    //console.log($stateParams)
    initChainForGettingList()
        .then(function(){
            //**************************************** Г Р У П П А   ********************************************
            var q=$q.defer();
            // группы категорий
            if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                // получение массива категорий
                var group=global.get('groups').val.getObjectFromArray('url',$stateParams.groupUrl);
                if(group){
                    // устанавливает груаау категорий
                    $scope.stuffsFilterCtrl.query.section=group._id;
                    if($stateParams.parentGroup){
                        // в дополнительных парметрах передается родительсая группа для категорий
                        // если ее нет, то все нет и списка категорий. соответствено нет ни фильтров ни брендо. выводится полный каталог для данной
                        var categories = $section.getCategories($stateParams.parentGroup).map(function(i){
                            return (i._id)?i._id:i;
                        });
                        //console.log(categories)
                        if (categories){
                            // приведение к общему виду списка категорий для фильтров
                            $scope.stuffsFilterCtrl.categories=global.get('categories').val.filter(function(item){return (categories.indexOf(item._id))>-1?true:false});
                        }
                    }
                    q.resolve($scope.stuffsFilterCtrl.categories);
                }else{
                    //нет такого раздела
                    $state.go('404')
                }
            } else {
                q.resolve(1);
            }
            return q.promise;
        })
        .then(function(r){
            //**************************************** К А Т Е Г О Р И Я  ********************************************
            // получение выбранной категории
            // основной шаг. от него отталкиваемся. есть категория в запросе или нет
            // для получения брендов и фильтров
            var q=$q.defer();
            if($scope.stuffsFilterCtrl.categories.length && $stateParams.categoryUrl){
                if ($stateParams.categoryUrl!='id'){
                    category=$scope.stuffsFilterCtrl.categories.getObjectFromArray('url',$stateParams.categoryUrl);
                    // устанавливаем категорию в строку запроса
                    if (category){
                        $scope.stuffsFilterCtrl.query.category=category._id;
                    } else {
                        // неверно уствновлен url категории
                        $state.go('404')
                    }
                }
            } else if($stateParams.categoryUrl!='id'){
                // не была установлена робительская группа. вычимляем ее по категории
                // если она не была установлена для всех категорий то весь каталог
                category=global.get('categories').val.getObjectFromArray('url',$stateParams.categoryUrl);
                if (category){
                    $scope.stuffsFilterCtrl.query.category=category._id;
                    $scope.stuffsFilterCtrl.categories=$section.getCategories(category.group.url)
                }
                //console.log(category)
            }
            q.resolve();
            return q.promise;
        })
        .then(function(){
            //****************************************Б Р Е Н Д   ********************************************
            var q=$q.defer();
            // бренд привязаны к категориям. соответственно если есть выбранная категория то
            // получаем списков брендов
            if ($scope.stuffsFilterCtrl.query.category){
                $scope.stuffsFilterCtrl.brands = global.get('brands').val.getArrayObjects('categories',$scope.stuffsFilterCtrl.query.category)
            }
            // если бренд один устанавливаем его активным и получаем список коллекций
            // при этом не важно есть ли бренд в параметрах
            if ($scope.stuffsFilterCtrl.brands.length===1){
                $scope.stuffsFilterCtrl.query.brand= $scope.stuffsFilterCtrl.brands[0]._id;
            } else {
                // проверяем наличие параметра  в url и если он совпадает с одним из брендов то устранавливаем бренд
                // в запросе
                if ($stateParams.brand){
                    var brand =  $scope.stuffsFilterCtrl.brands.getObjectFromArray('url',$stateParams.brand);
                    //console.log('brand-',brand)
                    if (brand){
                        $scope.stuffsFilterCtrl.query.brand=brand._id;
                        $location.search('brand',brand.url);
                    }
                }
            }
            if (!$scope.stuffsFilterCtrl.query.brand){
                $location.search('brand',null);
            }
            q.resolve();
            return q.promise;
        })
        .then(function(){
            //**************************************** К О Л Л Е К Ц И И  ********************************************
            var q=$q.defer();
            // console.log($stateParams)
            // если установлен бренд в запросе то  получаем для него коллекции
            if ($scope.stuffsFilterCtrl.query.brand){
                var query={brand:$scope.stuffsFilterCtrl.query.brand,group:$scope.stuffsFilterCtrl.query.section}
                Collection.getCollectionsForBrand({query:query},function(res){
                    res.shift();
                    $scope.stuffsFilterCtrl.brandCollections=res;
                    if ($stateParams.brandTag){
                        // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                        var brandTag=$scope.stuffsFilterCtrl.brandCollections.getObjectFromArray('url',$stateParams.brandTag);
                        //console.log($stateParams.brandTag,brandTag)
                        if(brandTag){
                            $scope.stuffsFilterCtrl.query.brandTag=brandTag._id;
                            $location.search('brandTag',brandTag.url);
                        } else {
                            $location.search('brandTag',null);
                        }
                    }
                    q.resolve(1);
                },function(){q.resolve(3);})
            }else{q.resolve(2);}
            return q.promise;
        }) // end collections
        .then(function(){
            //**************************************** Т Е Г И  ********************************************
            //console.log(r)
            var q=$q.defer();
            // получение тегов если они есть в параметрах в массив
            //для дальнейщей установки в визуальных фильтрах
            if($stateParams.queryTag){
                //console.log($stateParams);
                // агализ url на наличие тегов*************
                queryTags=$stateParams.queryTag.split('+');
                // удаляем возможные дубли
                queryTags = queryTags.filter(function(item, pos) {
                    return queryTags.indexOf(item) == pos;
                })
                queryTags=queryTags.reduce(function(tags,tag){
                    var t;
                    if (t=global.get('filterTags').val.getObjectFromArray('url',tag)){
                        tags.push(t);
                    }
                    return tags
                },[])
            }
            q.resolve();
            return q.promise;
        })
        .then(function(){
            //**************************************** Ф И Л Ь Т Р Ы ********************************************
            var q=$q.defer();
            // получение списка фильтров для данной категории для визуального представления
            if ($scope.stuffsFilterCtrl.query.category){
                var filters=global.get('filters').val.filter(
                    function(item){return (!item.dontshow && category.filters.indexOf(item._id)>-1)?true:false})
                // получение списка тегов для каждого фильтра
                filters.forEach(function(item,i){
                    item.tags=[];
                    global.get('filterTags').val.forEach(function(tag){
                        if (tag.filter==item._id){item.tags.push(tag)}
                    })
                    // устанавливаем значения в фильтрах
                    if (queryTags &&  queryTags.length){
                        queryTags.forEach(function(tag){
                            if (tag.filter==item._id){
                                if (!$scope.stuffsFilterCtrl.query.tags[i]){$scope.stuffsFilterCtrl.query.tags[i]=[]};
                                $scope.stuffsFilterCtrl.query.tags[i].push(tag._id);
                            }
                        })
                    }
                })
                $scope.stuffsFilterCtrl.filters=filters;

            } else {
                if (queryTags && queryTags.length){
                    $scope.stuffsFilterCtrl.query.tags[0]=[queryTags[0]._id]
                    $location.search('queryTag', queryTags[0].url);
                }
            }
            q.resolve('finsh');
            return q.promise;
        })
        .then(function(r){
            /*console.log(r)
             console.log($scope.stuffsFilterCtrl.query)
             console.log($scope.stuffsFilterCtrl.filters)*/
            $scope.stuffsFilterCtrl.getList($scope.stuffsFilterCtrl.paginate.page,$scope.stuffsFilterCtrl.paginate.rows)
        })


    var prevBrand;
    function _getCollections(){
        var query={brand:$scope.stuffsFilterCtrl.query.brand,group:$scope.stuffsFilterCtrl.query.section}
        Collection.getCollectionsForBrand({query:query},function(res){
            res.shift();
            $scope.stuffsFilterCtrl.brandCollections=res;
            if ($scope.stuffsFilterCtrl.brandCollections){
                if ($stateParams.brandTag){
                    // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                    var brandTag=$scope.stuffsFilterCtrl.brandCollections.getObjectFromArray('url',$stateParams.brandTag);
                    //console.log($stateParams.brandTag,brandTag)
                    if(brandTag){
                        $scope.stuffsFilterCtrl.query.brandTag=brandTag._id;
                        $location.search('brandTag',brandTag.url);
                    } else {
                        $location.search('brandTag',null);
                    }
                }
            }
        })
    }
    function _getQueryTag(){
        var arr =[];
        //console.log($scope.stuffsFilterCtrl.query.tags)
        $scope.stuffsFilterCtrl.query.tags.forEach(function(tags){
            if (tags.length){
                tags.forEach(function(tag){
                    arr.push(tag)
                })
            }
        })
        //console.log(arr)
        if(arr.length){
            return arr.map(function(tag){return global.get('filterTags').val.getObjectFromArray('_id',tag).url}).join('+')
        }else{
            return ;
        }

    }
    function _getBrand(){
        if ($scope.stuffsFilterCtrl.query.brand){
            return global.get('brands').val.getObjectFromArray('_id',$scope.stuffsFilterCtrl.query.brand).url;
        }

    }
    function _getBrandTag(){
        if ($scope.stuffsFilterCtrl.query.brandTag){
            return $scope.stuffsFilterCtrl.brandCollections.getObjectFromArray('_id',$scope.stuffsFilterCtrl.query.brandTag).url;
        }

    }
    $scope.stuffsFilterCtrl.getList=function(page,rows){
        //$scope.endLoadStuff=false;
        //console.log('получение списка - ',ii++,' раз')
        prevBrand=$scope.stuffsFilterCtrl.query.brand;
        // формирование строки запроса для выбора  товаров из БД
        var query=[];
        if (global.get('nostore').val){
            query.push({tags:{$nin:[global.get('nostore').val._id]}})
        }
        //console.log($scope.stuffsFilterCtrl.query)
        var queryTag=[];
        for (var key in $scope.stuffsFilterCtrl.query){
            if ($scope.stuffsFilterCtrl.query[key]){
                if (key=="tags"){
                    var qu=[];
                    var queryTags=$scope.stuffsFilterCtrl.query[key].filter(function(){return true});
                    //console.log(queryTags);
                    $scope.stuffsFilterCtrl.query[key].forEach(function(obj,i){
                        //console.log(i)
                        var q=[];
                        if (obj && obj.length){
                            obj.forEach(function(objT){
                                q.push({tags:objT});
                            })

                            if (q.length>1){
                                q={$or:q}
                                qu.push(q)
                            } else {
                                q=q[0];
                                qu.push(q)
                            }
                        }
                    })
                    if (qu.length){
                        if(qu.length==1){
                            query.push(qu[0]);
                        } else {
                            query.push({$and:qu});
                        }
                    }
                } else {
                    //console.log();
                    var obj={};
                    obj[key]=$scope.stuffsFilterCtrl.query[key];
                    query.push(obj);
                }
            }
        }
        if (query.length==1){
            query=JSON.stringify(query[0]);
        } else if(query.length>1){
            query =JSON.stringify({$and:query});
        } else {
            query='';
        }
        //console.log(query);
        /*console.log(query); if (i>1)return;
         i++;*/

        //********* start titles
         var queryTag=_getQueryTag();
         var brandTag=_getBrandTag();
         var brand=_getBrand();
         var queryTagsForSEO='';
         if (queryTag) {
            queryTagsForSEO+='queryTag='+queryTag;
         }
         if (brand) {
         if(queryTagsForSEO){queryTagsForSEO+='&';}
            queryTagsForSEO+='brand='+brand;
         }
         if (brandTag) {
         if(queryTagsForSEO){queryTagsForSEO+='&';}
            queryTagsForSEO+='brandTag='+brandTag;
         }
        console.log(queryTagsForSEO)
        $rootScope.$broadcast('$allDataLoaded',{state:$state.current.name,data:queryTagsForSEO});
        // передача данных в директиву
        $scope.stuffsFilterCtrl.queryForDirective=query;
    }
    $scope.stuffsFilterCtrl.changeFilter=function(c){
        $anchorScroll();
        //console.log($scope.stuffsFilterCtrl.query)
        var category= (!$scope.stuffsFilterCtrl.query.category)?{name:'category',url:'id'}:$scope.stuffsFilterCtrl.categories.getObjectFromArray('_id',$scope.stuffsFilterCtrl.query.category);
        //console.log(category)
        if (c){
            $state.current.reloadOnSearch = true;
            //var category= (!$scope.stuffsFilterCtrl.query.category)?{name:'category',url:'id'}:$scope.stuffsFilterCtrl.categories.getObjectFromArray('_id',$scope.stuffsFilterCtrl.query.category);
            var o={groupUrl:$stateParams.groupUrl,categoryUrl:category.url,categoryName:category.name,queryTag:undefined,brand:undefined,brandTag:undefined};
            $state.go($state.current.name,o,{reload:true});
            $state.current.reloadOnSearch = false;
        }else{
            // очищаем строку параметров
            $location.search('');


            $scope.stuffsFilterCtrl.query.artikul='';
            if ($scope.stuffsFilterCtrl.query.brand && (!$scope.stuffsFilterCtrl.brandCollections || prevBrand!=$scope.stuffsFilterCtrl.query.brand)){
                _getCollections($scope.stuffsFilterCtrl.query.brand);
                $scope.stuffsFilterCtrl.query.brandTag='';
            } else if (!$scope.stuffsFilterCtrl.query.brand){
                $scope.stuffsFilterCtrl.brandCollections=null;
                $scope.stuffsFilterCtrl.query.brandTag='';
            }
            $scope.stuffsFilterCtrl.paginate.page=0;
            $scope.stuffsFilterCtrl.getList($scope.stuffsFilterCtrl.paginate.page,$scope.stuffsFilterCtrl.paginate.rows);
            var queryTag=_getQueryTag();
            var brandTag=_getBrandTag();
            var brand=_getBrand();

            //var o = {groupUrl:$scope.stuffsFilterCtrl.groupUrl,categoryUrl:category.url,categoryName:category.name}
            if (queryTag) {
                $location.search('queryTag', queryTag);
            }
            if (brandTag) {
                $location.search('brandTag', brandTag);
            }
            if (brand) {
                $location.search('brand', brand);
            }
            if ($stateParams.brandTag){
                $location.search('brandTag',$stateParams.brandTag);
            }

            //$state.go('stuff',o,{notify:false});
        }
    }
    $scope.stuffsFilterCtrl.clearFilter=function(){
        console.log('clear filetrs')
        $scope.stuffsFilterCtrl.query.tags=[];
        $scope.stuffsFilterCtrl.changeFilter();
    }
}])


.controller('stuffsLWPCtrl', ['$scope','$resource','$rootScope','global','Stuff','$section','$location','$q','Collection','$anchorScroll','$timeout',function ($scope,$resource,$rootScope,global,Stuff,$section,$location,$q,Collection,$anchorScroll,$timeout){
    var $state=$rootScope.$state;
    var $stateParams=$rootScope.$stateParams;
    $scope.stuffsLWPCtrl=this;
    $scope.stuffsLWPCtrl.query=null;
    $scope.stuffsLWPCtrl.paginate={page:0,rows:20,totalItems:0}
    $scope.stuffsLWPCtrl.query=null;
    $scope.stuffsLWPCtrl.getList=function(page,rows){
        Stuff.getList($scope.stuffsLWPCtrl.query,null,page,rows,$scope.stuffsLWPCtrl.paginate).then(function(res){
            $scope.stuffsLWPCtrl.items=res;
            //$timeout(function(){$scope.$emit('endLoadStuffs');},300)
            $scope.stuffsLWPCtrl.query=null;
        },function(err){
            $state.go('404');
        });
    }
    $scope.$watch(function(){return $scope.stuffsLWPCtrl.query},function(n){
        if(n){
            $scope.stuffsLWPCtrl.paginate.page=0;
            $scope.stuffsLWPCtrl.getList($scope.stuffsLWPCtrl.paginate.page,$scope.stuffsLWPCtrl.paginate.rows);
        }
    })
    $timeout(function(){
        $scope.stuffsLWPCtrl.getList($scope.stuffsLWPCtrl.paginate.page,$scope.stuffsLWPCtrl.paginate.rows);
    })
    //*************************************************************************************************************
    //******************************************* для формирования url

    $scope.getUrlParams = Stuff.getUrlParams;
    //************************* for stuff URL *************************
    $scope.getCategoryName = Stuff.getCategoryName;
    $scope.getBrandName = Stuff.getBrandName;

}])
'use strict';
(function(){

    angular.module('gmall.services')
        .service('Stuff', stuffService)
        .service('Comments', commentService);
    stuffService.$inject=['$resource','$uibModal','$q','Sections','$stateParams','$state','$location','Brands','FilterTags','global','$order','exception','$user','$email','CreateContent','$rootScope','Filters','$timeout'];
    function stuffService($resource,$uibModal,$q,Sections,$stateParams,$state,$location,Brands,FilterTags,global,$order,exception,$user,$email,CreateContent,$rootScope,Filters,$timeout){
        var Items= $resource('/api/collections/Stuff/:_id',{_id:'@_id'});
        var categoriesLink={},
            queryData={};
        var stuffsService=[]

        $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
            if(to.name=='stuffs'||to.name=='stuffs.stuff' || to.name=='frame.stuffs'||to.name=='frame.stuffs.stuff'){
                $q.when()
                    .then(function () {
                        //console.log(toParams)
                        return getQuery(toParams,to)
                    })
                    .then(function (query) {
                        queryData=query;
                        //console.log(queryData)
                    })
            }
        })

        return {
            Items:Items,
            query:Items.query,
            get:Items.get,
            getList:getList,
            search:search,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            create:create,
            //setQuery:setQuery,
            getQuery:getQuery,
            getQueryFromUrl:getQueryFromUrl,
            setFilters:setFilters,
            cloneStuff:cloneStuff,
            saveField:saveField,
            selectItem:selectItem,
            select:selectItem,
            selectItemWithSort:selectItemWithSort,
            getServicesForOnlineEntry:getServicesForOnlineEntry,
            getAllBonus:getAllBonus,
            zoomImg:zoomImgGlobal,
            setDataForStuff:_setDataForStuff,
            getDataForBooking:_getDataForBooking,
        }

        function _salePrice(doc,sale){
            //console.log(doc.stack)
            if(doc.driveSalePrice && doc.driveSalePrice.maxDiscount){
                doc.maxDiscount=doc.driveSalePrice.maxDiscount;
            }
            if(!doc.driveSalePrice || doc.driveSalePrice.type==0){
                doc.priceSale= 0
                for(var key in doc.stock){
                    doc.stock[key].priceSale= 0;
                }
            } else if(doc.driveSalePrice.type==2){
                doc.priceSale=Math.ceil10(Number(doc.price)-sale*doc.price,-2);
                for(var key in doc.stock){
                    doc.stock[key].priceSale= Math.ceil10(Number(doc.stock[key].price)-sale*doc.stock[key].price,-2);
                }
            }else if(doc.driveSalePrice.type==1){
                if(doc.driveSalePrice.condition){
                    sale=doc.driveSalePrice.percent/100;
                    doc.priceSale=Math.ceil10(Number(doc.price)-sale*doc.price,-2);
                    for(var key in doc.stock){
                        doc.stock[key].priceSale= Math.ceil10(Number(doc.stock[key].price)-sale*doc.stock[key].price,-2);
                    }
                }else{
                    sale=Number(doc.driveSalePrice.sum);
                    doc.priceSale=Math.ceil10(Number(doc.price)-sale,-2);
                    for(var key in doc.stock){
                        doc.stock[key].priceSale= Math.ceil10(Number(doc.stock[key].price)-sale,-2);
                    }
                }
            }
        }
        
        function _getPrice() {
            
        }
        
        function _retailPrice(doc,retail){
            if(!doc.driveRetailPrice){
                if(global.get('store').val.seller.retail){
                    doc.driveRetailPrice={type:2}
                }else{
                    doc.driveRetailPrice={type:0}
                }

            }
            //console.log(doc.driveRetailPrice,!doc.driveRetailPrice || !doc.driveRetailPrice.type==0)
            if(doc.driveRetailPrice.type==0){
                doc.retail= 0
                for(var key in doc.stock){
                    doc.stock[key].retail= 0;
                }
            } else if(doc.driveRetailPrice.type==2){
                doc.retail= Math.ceil10(Number(doc.price)+retail*Number(doc.price),-2);
                for(var key in doc.stock){
                    doc.stock[key].retail= Math.ceil10(Number(doc.stock[key].price)+retail*doc.stock[key].price,-2);
                }
            }else if(doc.driveRetailPrice.type==1){
                if(doc.driveRetailPrice.condition){
                    retail=doc.driveRetailPrice.percent/100;
                    doc.retail= Math.ceil10(Number(doc.price)+retail*doc.price,-2);
                    for(var key in doc.stock){
                        doc.stock[key].retail= Math.ceil10(Number(doc.stock[key].price)+retail*doc.stock[key].price,-2);
                    }
                }else{
                    retail=Number(doc.driveRetailPrice.sum);
                    doc.retail= Math.ceil10(Number(doc.price)+retail,-2);
                    for(var key in doc.stock){
                        doc.stock[key].retail= Math.ceil10(Number(doc.stock[key].price)+retail,-2);
                    }
                }
            }
            //console.log(doc.stock)
            
        }
        function _setPrice(doc){
            if(!doc){
                doc=this;
            }
            if(doc.price<0){doc.price=0}
            //doc.price=Math.round10(doc.price, -2);
            //console.log(doc.stock)
            //return;
            doc.sort=null;
            var sale = (global.get('store').val.seller.sale||0)/100;
            var retail=(global.get('store').val.seller.retail||0)/100;
            var el = (doc)?doc:this;
            if (!el.stock || typeof el.stock!='object'){
                el.stock={notag:{quantity:1,price:el.price}}
                el.sort='notag'
            }else if(el.stock['notag']){
                el.stock['notag'].price=el.price;

            }
            if(global.get('currency') && el.currency && global.get('store').val.mainCurrency != el.currency){
                el.price=Math.ceil10(Number(el.price)/Number(global.get('store').val.currency[el.currency][0]),-2)
                for(var tag in el.stock){
                    el.stock[tag].price=Math.ceil10(Number(el.stock[tag].price)/Number(global.get('store').val.currency[el.currency][0]),-2)
                }
            }
           // console.log(el.driveRetailPrice)
            //console.log(el.price)
            _salePrice(el,sale);
            _retailPrice(el,retail);
            //console.log(el.stock)
            //global.get('store').val.seller.retail&&_retailPrice(el,retail);

            return el;
        }

        function _changeSortOfStuff(sort){
            /*console.log(this.stock && sort && this.stock[sort] && !this.stock[sort].quantity)
            console.log(this.stock,sort,this.stock[sort],this.stock[sort].quantity)*/
            if(this.stock && sort && this.stock[sort] && !this.stock[sort].quantity){
                return;
            }
            /*console.log(sort)
            console.log(this.name,sort);*/
            //console.log(sort)
            if(sort){
                this.sort=sort;
            }
            if(this.sort){
                var sort=this.stock[this.sort];
                this.sortName=sort.name;
                this.price=sort.price;
                this.priceSale=sort.priceSale;
                this.retail=sort.retail;
                this.priceCampaign=sort.priceCampaign;
            } else{
                this.sortName=null;
                if(!this.stock || !this.stock.notag){
                    this.price=0;
                    this.priceSale=0;
                    this.retail=0;
                }
            }
            //_onSelectedSort()
        }
        function _addItemToOrder(){
            var self=this;
            if(!this.sort){
                this.unableToOrder=true;
                //console.log(this.name,this.unableToOrder)
                $timeout(function () {
                    self.unableToOrder=false;
                },2500)
                return 'nosort';
            }
            //console.log(this.sort,this.name)
            if(this.sortsOfStuff && this.sortsOfStuff.filter && !this.sort){
                exception.catcher('ошибка')('выберите разновидность')
            }else {
                if(this.stock[this.sort].name){
                    this.sortName=this.stock[this.sort].name;
                }
                $order.addItemToCart(this)
            }
            $rootScope.$emit('AddToCart')

        }
        function _dateTime(){
            var self=this;
            if(!this.sort){
                this.unableToOrder=true;
                //console.log(this.name,this.unableToOrder)
                $timeout(function () {
                    self.unableToOrder=false;
                },2500)
                return 'nosort';
            }
            global.get('functions').val.witget('dateTime',{stuff:this})
        }
        function _setSticker(stuff){
            //console.log(stuff.tags)
            return FilterTags.getSticker(stuff.tags);
            //console.log(stuff.name+' '+stuff.artikul,stuff.sticker)
        }
        function _checkInCart(){
            //console.log($order.checkInCart(this))
            return $order.checkInCart(this)
            //return true;
        }
        var delay
        function zoomImgGlobal(i,images,home) {
            //console.log(images[i])
            var imgs = $("img[src$='"+images[i].img+"']"),img,horizontalOrient;
            //console.log(imgs)
            if(imgs && imgs[0]){
                img=$(imgs[0]);
                if(img.width() && img.height() && img.width() > img.height()){
                    horizontalOrient=true;
                }
            }else{
                imgs = $("img[src$='"+images[i].thumb+"']")
                //console.log(imgs)
                if(imgs && imgs[0]){
                    img=$(imgs[0]);
                    if(img.width() && img.height() && img.width() > img.height()){
                        horizontalOrient=true;
                    }
                }else{
                    if(images[i].el){
                        if(images[i].el.width && images[i].el.height && images[i].el.width > images[i].el.height){
                            horizontalOrient=true;
                        }
                        //console.log(images[i].el)
                    }
                }
            }
            //console.log('horizontalOrient',horizontalOrient)
           /* console.log($(img).width())
            console.log($(img).height())*/
            //console.log(horizontalOrient)
            if(delay){return}
            delay=true;
            $timeout(function () {
                delay=false
            },1000)
            //console.log(i)
            var self=this;
            var content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            var contentZoom="width=device-width, initial-scale=1, maximum-scale=3"
            var viewPort=document.getElementById("viewport");
            //console.log(viewPort)
            var templ=(global.get('store').val.template.addcomponents && global.get('store').val.template.addcomponents.zoom && global.get('store').val.template.addcomponents.zoom.templ)?global.get('store').val.template.addcomponents.zoom.templ:'';
            var templateUrl = 'views/template/partials/stuffDetail/modal/zoom'+templ+'.html'
            viewPort.setAttribute("content", contentZoom);
            $rootScope.$emit('modalOpened');
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                windowClass:  function(){return((horizontalOrient)?'zoom zoom-modal-horizontal':'zoom zoom-modal-vertical')},//'app-modal-window',
                templateUrl: templateUrl,
                controller: function ($uibModalInstance,global,gallery,i,home,horizontalOrient){
                    var self=this;
                    if(home){
                        if(horizontalOrient){
                            self.style="width:98vw;height:auto"
                        }else{
                            self.style="height:93vh;width:auto"
                        }

                    }else{
                        self.style="width:100%"
                    }
                    self.modal=global.get('mobile').val
                    self.idx=i;
                    self.gallery=angular.copy(gallery);
                    //console.log(self.gallery)
                    self.gallery[i].active=true;

                    self.next=next;
                    self.prev=prev;
                    self.chancheActiveSlide=chancheActiveSlide;
                    var delay=false
                    function next(i) {
                        //console.log('next',i)
                        if(delay){return}
                        delay=true
                        if(i+1==self.gallery.length){
                            self.gallery[0].active=true;
                            self.idx=0
                        }else{
                            self.gallery[i+1].active=true;
                            self.idx=i+1
                        }
                        $timeout(function () {
                            delay=false
                        },500)
                    }
                    function prev(i) {
                        //console.log('prev',i)
                        if(delay){return}
                        delay=true
                        if(i==0){
                            self.gallery[self.gallery.length-1].active=true;
                            self.idx=self.gallery.length-1
                        }else{
                            self.gallery[i-1].active=true;
                            self.idx=i-1
                        }
                        $timeout(function () {
                            delay=false
                        },500)
                    }
                    function chancheActiveSlide(i) {
                        self.gallery[i].active=true;
                        self.idx=i
                    }
                    self.ok=function(){
                        $uibModalInstance.close();
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve:{
                    gallery:function(){
                        return images
                    },
                    i:function(){
                        return i;
                    },
                    home:function(){
                        return home;
                    },
                    horizontalOrient:horizontalOrient,

                }
            }
            if(!home){
                options.size='lg'
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(res){
                    //console.log(res)
                    viewPort.setAttribute("content", content);
                    $rootScope.$emit('modalClosed')
                })
                .catch(function(err){
                    viewPort.setAttribute("content", content);
                    $rootScope.$emit('modalClosed')
                    //console.log(err)
                    if(err && err!='backdrop click'){
                        err=err.data||err;
                        exception.catcher('zoom')(err)
                    }
                })
        }
        function _zoomImg(i) {
            zoomImgGlobal(i,this.gallery)
        }
        function _setCategoryName(item){
            //console.log(item)
            //console.log(item.name,item.artikul,item.category)
            if(item.category && item.category._id){
                item.category=[item.category]
            }
            if(item.category && item.category.length){
                //console.log(global.get('category').val)
                i=0;
                var c=null;
                while(i<item.category.length && !c){
                    //console.log(i,global.get('categoriesO').val[item.category[i]])
                    if(typeof item.category[i]=='object'){item.category[i]=item.category[i]._id}
                    if(global.get('categoriesO').val[item.category[i]]){
                        c=global.get('categoriesO').val[item.category[i]]
                    }
                    i++
                }
            }
            //console.log(c)
            if(global.get('categories' ).val){
                if(!c){
                    if(!categoriesLink[item.category]){
                        c =global.get('categories').val.getOFA('_id',item.category);
                    }else{
                        c = categoriesLink[item.category];
                    }
                }

                if(c){
                    //console.log(c)
                    item.categoryUrl= c.url;
                    item.categoryName= c.name
                    if(c.linkData){
                        item.groupUrl= c.linkData.groupUrl
                        item.parentGroup=c.linkData.parentGroup||null;
                    }else{
                        item.groupUrl= 'group';
                        item.categoryUrl= 'category';
                        item.parentGroup=null;
                    }
                }else{
                    item.groupUrl= 'group';
                    item.categoryUrl= 'category';
                }
            }
            if(item.brand && global.get('brands') && global.get('brands').val){
                if(typeof item.brand=='object'){
                    item.brand=item.brand._id
                }
                var b =global.get('brands').val.getOFA('_id',item.brand);
                if(b){
                    item.brandUrl= b.url;
                    item.brandName=b.name;
                    if(item.brandTag){
                        var bt = b.tags.getOFA('_id',item.brandTag)
                        if(bt){
                            item.brandTagUrl=bt.url;
                            item.brandTagName=bt.name;
                        }


                    }
                }
            }

        }
        function _setDataForStuff(stuff,filterTags,stuffsState){
            //console.log(stuff);
            stuff.changeSortOfStuff=_changeSortOfStuff;
            stuff.addItemToOrder=_addItemToOrder;
            stuff.dateTime=_dateTime;
            stuff.onSelected =_onSelectedSort;
            stuff.order=_orderStuff,
            stuff.getBonus=_getBonus,
            stuff.zoomImg=_zoomImg,
            stuff.checkInCart=_checkInCart
            stuff.getDataForBooking=_getDataForBooking;
            _setCategoryName(stuff)
            _setPrice(stuff)
            stuff.setPrice=_setPrice;
            if(stuff.multiple && stuff.minQty){
                stuff.quantity= Number(stuff.minQty);
            }else{
                stuff.quantity=1;
                stuff.minQty=1;
            }
            if(!stuff.single){
                stuff.maxQty=150;
            }
            //stuff.quantity=1;
            if(!stuff.sale){
                _checkCamapign(stuff)
                //console.log(stuff)
            }
            stuff.expected=true;
            if(stuff.stock && typeof stuff.stock == 'object' && !stuff.stock.notag){
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.filterGroup && global.get('filtersO') && global.get('filtersO').val && global.get('filtersO').val[stuff.sortsOfStuff.filterGroup]){
                    var filterGroup=global.get('filtersO').val[stuff.sortsOfStuff.filterGroup];
                    var filterGroupTags;
                    if(filterGroup){
                        stuff.sortsOfStuff.name = filterGroup.name.charAt(0).toUpperCase() + filterGroup.name.slice(1).toLowerCase();
                        stuff.groupName = stuff.sortsOfStuff.name;
                        filterGroupTags=filterGroup.tags.map(function(t){return t._id})
                        for(var ii=0;ii<stuff.tags.length;ii++){
                            var idx=filterGroupTags.indexOf(stuff.tags[ii]);
                            if(idx>-1){
                                stuff.groupTagName=filterGroup.tags[idx].name.charAt(0).toUpperCase() + filterGroup.tags[idx].name.slice(1).toLowerCase();
                                break;
                            }
                        }
                    }
                }
                //console.log(stuff.name,stuff.sortsOfStuff.name,stuff.groupTaaName)
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter && global.get('filtersO') && global.get('filtersO').val && global.get('filtersO').val[stuff.sortsOfStuff.filter]){
                    stuff.filterName=global.get('filtersO').val[stuff.sortsOfStuff.filter].name.toLowerCase();
                    stuff.filterName= stuff.filterName.charAt(0).toUpperCase() + stuff.filterName.slice(1).toLowerCase();
                }
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs){
                    for(var  i21=0;i21<stuff.sortsOfStuff.stuffs.length;i21++){

                        if(stuff.sortsOfStuff.stuffs[i21]._id!=stuff._id && stuff.sortsOfStuff.stuffs[i21].archived){
                            stuff.sortsOfStuff.stuffs.splice(i21,1);
                            i21--;
                        }else if(stuff.sortsOfStuff.stuffs[i21].stock && typeof stuff.sortsOfStuff.stuffs[i21].stock =='object'){
                            for(var k in stuff.sortsOfStuff.stuffs[i21].stock){
                                if(stuff.sortsOfStuff.stuffs[i21].stock[k].quantity){
                                    stuff.sortsOfStuff.stuffs[i21].stock[k].quantity=Number(stuff.sortsOfStuff.stuffs[i21].stock[k].quantity)
                                }
                            }
                        }
                    }
                }


                var keys = Object.keys(stuff.stock);
                stuff.stockKeysArray =keys.map(function (k) {
                    stuff.stock[k].quantity=Number(stuff.stock[k].quantity)

                    if(global.get('filterTagsO') && global.get('filterTagsO').val && global.get('filterTagsO').val[k]){
                        var tag = global.get('filterTagsO').val[k];
                    }else{
                        var tag = filterTags.getOFA('_id',k);
                    }
                    if(tag){
                        //console.log(stuff.stock[k].quantity,typeof stuff.stock[k].quantity,tag.name)
                        return {_id:k,index:tag.index,name:tag.name,quantity:Number(stuff.stock[k].quantity)}
                    }else{
                        //console.log(k,stuff.name,stuff.artikul,stuff.stock)
                        return null
                    }
                })
                .filter(function (key) {return key/* && (stuff.stock[key._id].quantity||stuff.stock[key._id].quantity==0);*/})
                .sort(function (a,b) {
                    if(!a || !b )return 1;
                    return a.index-b.index
                })
                /*console.log(stuff.stock)
                console.log(stuff.stockKeysArray)*/
                var sort_Id=null;
                //console.log(stuff.stockKeysArray)
                //console.log(global.get('sectionType').val)
                /*for(var ii=0;ii<stuff.stockKeysArray..lrngth;ii++){
                    var key= tuff.stockKeysArray[ii];
                    if(!global.get('sectionType') || !global.get('sectionType').val || !global.get('store').val.template.stuffListType[global.get('sectionType').val].unsetSort) {
                        //console.log('устанавливаем разновидность')
                        if (!sort_Id && stuff.stock[key._id].quantity) {
                            sort_Id = key._id;
                            stuff.sort = sort_Id;
                            break;
                            //console.log(key.name)
                        }
                    }
                }*/
                stuff.stockKeysArray.forEach(function (key) {
                    // устанавливаем  разновидноть
                    //if(!stuff.sort &&(!global.get('sectionType') || !global.get('sectionType').val || !global.get('store').val.template.stuffListType[global.get('sectionType').val].unsetSort)) {
                    if(!stuff.sort &&(!global.get('sectionType') || !global.get('sectionType').val || !global.get('store').val.template.stuffListType[global.get('sectionType').val].unsetSort || $state.current.name!='stuffs.stuff' || stuffsState)) {
                        //console.log('устанавливаем разновидность')
                        if (!sort_Id && stuff.stock[key._id].quantity) {
                            sort_Id = key._id;
                            stuff.sort = sort_Id;
                            //console.log(key.name)
                        }
                    }else{
                        //console.log('не устанавливаем разновидность')
                    }



                    key.quantity=Number(stuff.stock[key._id].quantity);
                    if(key.quantity && stuff.expected){
                        stuff.expected=false;
                    }
                    if(key.quantity){
                        if(stuff.multiple && stuff.minQty){
                            key.quantity= Number(stuff.minQty);
                        }else{
                            key.quantity=1;
                            stuff.minQty=1;
                        }
                    }
                    stuff.stock[key._id].name=key.name;
                    //console.log(stuff.stock[key._id])
                })

                if(stuff.stockKeysArray.length && sort_Id){
                    _changeSortOfStuff.call(stuff,sort_Id);
                }
                //console.log(stuff.sort)

            }else if(stuff.stock && typeof stuff.stock == 'object' && stuff.stock.notag){
                if(stuff.stock['notag'].quantity){
                    stuff.sort='notag'
                    stuff.expected=false;
                }
                stuff.stockKeysArray=[{name:'notag',_id:'notag',quantity:stuff.stock['notag'].quantity}]
            }
            if(!stuff.campaignId){
                stuff.sticker=_setSticker(stuff)
            }
            if(stuff.gallery && stuff.gallery.length){
                stuff.gallery.sort(function(a,b){return a.index- b.index})
            }


            if(!stuffsState){
                //console.log(stuffsState)
                if(typeof _filtersO !='undefined'  && stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs && stuff.sortsOfStuff.stuffs.length){
                    var filterGroup,filterGroupTags=[];
                    if(stuff.sortsOfStuff.filterGroup){
                        filterGroup= _filtersO[stuff.sortsOfStuff.filterGroup]
                        if(filterGroup){
                            filterGroupTags=filterGroup.tags.map(function(t){return t._id})
                        }
                    }
                    //console.log(filterGroup)
                    stuff.sortsOfStuff.stuffs.forEach(function (itemS,i) {
                        itemS.gallery.forEach(function (s,ii) {
                            if(!ii){
                                s.active=true
                            }else{
                                s.active=false
                            }
                        })
                        for(var ii=0;ii<itemS.tags.length;ii++){
                            var idx=filterGroupTags.indexOf(itemS.tags[ii]);
                            if(idx>-1){
                                if(filterGroup.tags[idx].img){
                                    stuff.sortsOfStuff.stuffs[i].gallery[0].thumbSmallTag=filterGroup.tags[idx].img
                                }
                                break;
                            }
                        }
                    })
                }
            }
            /*if(stuff.artikul=='БЕРН узор "саржа"'){
                console.log(stuff)
            }*/

            return stuff

        }
        function _onSelectedSort(){
            setTimeout(function(){
                $(':focus').blur();
            },50)
        }
        function _orderStuff(){
            var stuff=this;
            // очистка корзины
            $order.clearCart();
            stuff.cena=stuff.price;
            stuff.sum= stuff.cena*stuff.quantity;
            if(stuff.addItemToOrder()=='nosort'){
                return;
            }
            //console.log(stuff)
            // get user info
            //return;
            $q.when()
                .then(function(){
                     return $user.getInfo(stuff.service)
                })
                .then(function(user){
                    /*console.log(user);
                    return;*/
                    return $order.checkOutFromList(user)
                })
                .then(function(){
                    $order.clearCart();
                })
                .catch(function(err){
                    $order.clearCart();
                    if(err){
                        exception.catcher('заказ')(err)
                    }

                })

        }
        function getAllBonus() {
            return _getBonus(true)
        }
        function _getBonus(all){
            var stuffs;
            var stuff=this;
            return $q.when()
                .then(function () {
                    if(all){
                        var p={page:0,rows:100};
                        var query={$and:[{orderType:4},{actived:true}]}
                        return getList(p,query);
                    }else{
                        return [stuff]
                    }
                })
                .then(function (sts) {
                    stuffs=sts;
                })
                .then(function(){
                     return $user.getInfoBonus()
                })
                .then(function(user){
                    if(!user || !user.email){throw 'нет email'}
                    var content=CreateContent.emailBonus(stuffs);

                    var bonus=(stuffs && stuffs[0] && stuffs[0].imgs && stuffs[0].imgs[0] && stuffs[0].imgs[0].name)?stuffs[0].imgs[0].name:'получение контента'
                    //console.log(content,bonus)
                    /*var popupWin=window.open();
                    popupWin.document.write(content);
                    popupWin.window.focus();*/

                    //return;
                    var domain=global.get('store').val.domain;
                    var o={email:user.email,content:content,
                        subject:bonus+' ✔',from:  '<promo@'+domain+'>'};
                    return $q(function(resolve,reject){
                        $email.save(o,function(res){
                            exception.showToaster('note','Сообщение','На Ваш email отправлено письмо');
                            resolve()
                        },function(err){
                            exception.showToaster('warning','отправка уведомления',err.data)
                            resolve()
                        } )
                    })
                }) //email

                .then(function(){
                    var states= $state.get();
                    if(global.get('paps') && states.some(function(state){return state.name=='thanksPage'})){
                        var pap = global.get('paps').val.getOFA('action','bonus');
                        //console.log(pap)
                        if(pap && pap.url){
                            $state.go('thanksPage',{id:pap.url})
                        }else{
                            exception.showToaster('note','Заказ','Все прошло успешно.');
                        }
                    }else{
                        exception.showToaster('note','Заказ','Все прошло успешно.');
                    }

                })//paps
                .catch(function(err){
                    if(err){
                        exception.catcher('получение бонуса')(err)
                    }

                })

        }

        function _checkCamapign(stuff){
            return $order.checkCampaign(stuff);
        }
        function _getDataForBooking(){
            var el=this;
            var stuff={
                _id:this._id,
                artikul:this.artikul,
                name:this.name,
                nameL:this.nameL,
                link:this.link,
                backgroundcolor:this.backgroundcolor,
                timePart:(el.timePart)?el.timePart:4,
                price:this.price,
                priceSale:this.priceSale,
                currency:this.currency
            }
            if(el.sort){
                stuff.price= el.stock[el.sort].price;
                stuff.priceSale= el.stock[el.sort].priceSale;
                stuff.timePart=(el.stock[el.sort].timePart)?el.stock[el.sort].timePart:4;
            }
            if(el.sortName){
                stuff.name= el.name+' '+el.sortName;
            }
            //console.log(stuff)
            return stuff;
        }
        function getList(paginate,query,search){
            //console.log('???')
            if(!paginate){paginate={page:0}}
            /*if(global.get('crawler') && global.get('crawler').val){
                query={$and:[{store:global.get('store').val._id},{actived:true}]}
            }*/
            var data ={perPage:paginate.rows ,page:paginate.page,query:query,search:search};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                //console.log(response)
                //console.log(paginate)
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                var maxIndex;
                return $q.when()
                    .then(function(){
                        return FilterTags.getFilterTags()
                    })
                    .then(function (ft) {
                        //console.log(ft.length)
                        response.forEach(function(el){
                            if(el.index==99999 && maxIndex){
                                el.index--;
                            }
                            if(el.index==99999){
                                maxIndex=true;
                            }

                            _setDataForStuff(el,ft)
                        })
                    })
                    .then(function () {
                        return response;
                    })
            }
            function getListFailed(error) {
                console.log('XHR Failed for getStuffs.' + error);
                return $q.reject(error);
            }
        }
        function search(search,setData){
            // setData - если ищем товар в админке для дальнейшего использования необходимо получить с сервера все данные
            var data ={search:search,setData:setData};
            return Items.query(data).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                //console.log(response)
                if(setData){
                    return $q.when()
                        .then(function(){
                            return FilterTags.getFilterTags()
                        })
                        .then(function (ft) {
                            //console.log(ft.length)
                            response.forEach(function(el){
                                if(el.index==99999 && maxIndex){
                                    el.index--;
                                }
                                if(el.index==99999){
                                    maxIndex=true;
                                }

                                _setDataForStuff(el,ft)
                            })
                        })
                        .then(function () {
                            return response;
                        })
                }else{
                    return response
                }

            }
            function getListFailed(error) {
                console.log('XHR Failed for getStuffs.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id,o){
            var query={_id:id};
            if(o){
                for(var k in o){
                    query[k]=o[k]
                }
            }
            //console.log(query)
            return Items.get( query).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(res) {

                //res.getDataForCart=_getDataForCart;
                return $q.when()
                    .then(function(){
                        return FilterTags.getFilterTags()
                    })
                    .then(function (ft) {
                        _setDataForStuff(res,ft)
                        //console.log(res.stock)
                        //res.quantity=1;
                        return res;
                    })
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            //console.log('!!!')
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/createStuff.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.item=''
                        self.ok=function(){
                            $uibModalInstance.close(self.item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (item) {
                    if(item.name){
                        resolve(item)
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        function getQueryFromUrl(campaignCondition){
            //console.log(campaignCondition)
            if($state.current.name=='campaign.detail'){
                return $q.when()
                    .then(function(){
                        return global.get('campaign').val
                    })
                    .then(function(campaigns){
                        var campaign=campaigns.getOFA('url',$stateParams.id)
                        //console.log(campaign)
                        if(campaign){
                            return setQueryForCampaign(campaign,campaignCondition);
                        }
                    })
            }else{
                return queryData;
            }
            function setQueryForCampaign(campaign,campaignCondition){
                var query={};
                return $q.when()
                    .then(function(){
                        return FilterTags.getFilterTags()
                    })
                    .then(function(filterTags){
                        if(campaignCondition){
                            if(campaign.conditionTags && campaign.conditionTags.length){
                                query.queryTags={}
                                campaign.conditionTags.forEach(function(tag){
                                    var t = filterTags.getOFA('_id',tag);
                                    if(t){
                                        if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                                        query.queryTags[t.filter].push(t._id)
                                    }
                                })
                            }
                            if(campaign.conditionBrandTags && campaign.conditionBrandTags.length){
                                query.brandTag={$in:campaign.conditionBrandTags};
                            }
                            if(campaign.conditionBrands && campaign.conditionBrands.length){
                                query.brand={$in:campaign.conditionBrands};
                            }
                            if(campaign.conditionCategories && campaign.conditionCategories.length){
                                query.category={$in:campaign.conditionCategories}
                            }
                            if(campaign.conditionStuffs && campaign.conditionStuffs.length){
                                query._id={$in:campaign.conditionStuffs}
                            }
                        }else{
                            if(campaign.tags && campaign.tags.length){
                                query.queryTags={}
                                campaign.conditionTags.forEach(function(tag){
                                    var t = filterTags.getOFA('_id',tag);
                                    if(t){
                                        if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                                        query.queryTags[t.filter].push(t._id)
                                    }
                                })
                            }
                            if(campaign.brandTags && campaign.brandTags.length){
                                query.brandTag={$in:campaign.brandTags};
                            }
                            if(campaign.brands && campaign.brands.length){
                                query.brand={$in:campaign.brands};
                            }
                            if(campaign.categories && campaign.categories.length){
                                query.category={$in:campaign.categories}
                            }
                            if(campaign.stuffs && campaign.stuffs.length){
                                query._id={$in:campaign.stuffs}
                            }
                        }

                        _setQueryForTags(query)

                        var keys = Object.keys(query);
                        var q={}
                        if(keys.length==1){
                            q=query;
                        }else if(keys.length>1){
                            q.$or=[];
                            for(var k in query){
                                var o ={}
                                o[k]=query[k]
                                q.$or.push(o)
                            }

                        }
                        q.actived=true;
                        return q;
                    })
            }
        }
        function getQuery(stateParams,to) {
            return _setQuery(stateParams,to)
        }
        function _setQueryForTags(query,filters) {
            //console.log(query.queryTags,query.queryTags && typeof query.queryTags=='object')
            if(query.queryTags && typeof query.queryTags=='object'){
                try{
                    var keys = Object.keys(query.queryTags);
                }catch(err){
                    //console.log(err)
                    keys=[]
                }

                if(keys.length==1){
                    query.tags={$in:query.queryTags[keys[0]]}
                }else if(keys.length>1){
                    query.$and=[];
                    keys.forEach(function(k){
                        query.$and.push({tags:{$in:query.queryTags[k]}})
                    })
                }
            }
            delete query.queryTags

            if(query.filters && typeof query.filters=='object'){
                try{
                    var keys = Object.keys(query.filters);
                }catch(err){
                    //console.log(err)
                    keys=[]
                }
                if(keys.length==1){
                    var filter;
                    if(filters){
                        filter = filters.getOFA('_id',keys[0])
                    }
                    //console.log(filter)
                    if(filter && filter.price){
                        query['priceForFilter']=query.filters[keys[0]]
                        console.log('query.filters[keys[0]]',query.filters[keys[0]])
                    }else{
                        query['filters.'+keys[0]]=query.filters[keys[0]]
                    }

                }else if(keys.length>1){
                    if(!query.$and){
                        query.$and=[];
                    }
                    keys.forEach(function(k){
                        var filter;
                        if(filters){
                            filter = filters.getOFA('_id',k)
                        }
                        //console.log(filter)
                        if(filter && filter.price){
                            query['priceForFilter']=query.filters[k]
                        }else{
                            var o ={};
                            o['filters.'+k]=query.filters[k]
                            query.$and.push(o)
                        }
                    })
                    if(query.$and.length==1){
                        for(var k in query.$and[0]){
                            query[k] = query.$and[0][k];
                        }
                        delete query.$and
                    }

                }
            }
            delete query.filters
        }
        function _setQuery(stateParams,to) {
            //console.log(stateParams)
            global.set('category',null);
            var parentSection,sectionCategories,categoryBrands=[],categoryFilters=[],query={},breadcrumbs=[];
            return $q(function(resolve,reject){
                $q.when()
                    .then(function(){
                        return $q.all([Sections.getSections(),Brands.getBrands(),Filters.getFilters()])
                    })
                    .then(function(data){
                        var sections=data[0],brands=data[1],filters=data[2];
                        //console.log(stateParams)
                        parentSection=Sections.getSection(sections,stateParams.groupUrl);
                        //console.log(parentSection)

                        global.set('parentSection',parentSection)
                        if(parentSection){
                            if(stateParams.categoryUrl!='category'){
                                if(parentSection.categories && parentSection.categories.length){
                                    var categorySet;
                                    parentSection.categories.forEach(function(c){
                                        if(c.url==stateParams.categoryUrl){
                                            global.set('category',c);
                                            categorySet=true;
                                            c.set=true;
                                            query.category=c._id;
                                            categoryBrands=c.brands;
                                            categoryFilters=c.filters
                                            //console.log(categoryFilters)
                                        }else{
                                            c.set=false
                                        }
                                    })
                                    if(!query.category){
                                        throw 404
                                    }
                                } else{
                                    throw 404
                                }
                            }else{
                                sectionCategories=Sections.getEmbededCategories(parentSection,[]).map(function(el){return el._id})
                                if(!sectionCategories.length){
                                    query.category=null;
                                }else{
                                    query.category={$in:sectionCategories}
                                    //console.log(global.get('categoriesO').val)
                                    sectionCategories.forEach(function (cat) {
                                        //console.log(cat)
                                        var c = global.get('categoriesO').val[cat];

                                        c.filters.forEach(function(f){
                                            if(categoryFilters.indexOf(f)<0){
                                                categoryFilters.push(f)
                                            }
                                        })
                                        c.brands.forEach(function(b){
                                            if(categoryBrands.indexOf(b)<0){
                                                categoryBrands.push(b)
                                            }
                                        })
                                    })
                                }
                            }
                        }
                        // бренд и коллекци
                        // ************************************************************************
                        var brandSet,brandTagSet,brandsArr,brandTagsArr;
                        //console.log(categoryBrands)

                        if(stateParams.brand){
                            brandsArr=stateParams.brand.split('__')
                        }
                        if(stateParams.brandTag){
                            brandTagsArr=stateParams.brandTag.split('__')
                        }
                        query.brand=[];
                        query.brandTag=[];
                        brands.forEach(function (b){
                            //console.log(b)
                            b.inList=false;
                            b.showCollections=false;
                            if((to.name=='stuffs' || to.name=='stuffs.stuff')){
                                if(categoryBrands && categoryBrands.length){
                                    if(categoryBrands.indexOf(b._id)>-1){
                                        b.inList=true;
                                    }
                                }
                            }else{
                                b.inList=true;
                            }


                            if(brandsArr && brandsArr.indexOf(b.url)>-1){
                                query.brand.push(b._id)
                                b.set=true;
                                breadcrumbs.push({type:'brand',name:b.name,url:b.url})
                                brandSet=true;
                            }else{
                                b.set=false;
                            }
                            b.tags.forEach(function (t) {
                                if(brandTagsArr && brandTagsArr.indexOf(t.url)>-1){
                                    query.brandTag.push(t._id)
                                    t.set=true;
                                    breadcrumbs.push({type:'brandTag',name:t.name,url:t.url})
                                    b.showCollections=true;
                                    brandTagSet=true;
                                }else{
                                    t.set=false;
                                }
                            })

                        })
                        if(query.brand.length){
                            if(query.brand.length==1){
                                query.brand=query.brand[0]
                            }else{
                                query.brand={$in:query.brand}
                            }
                        }else{
                            query.brand=null;
                        }
                        if(query.brandTag.length){
                            if(query.brandTag.length==1){
                                query.brandTag=query.brandTag[0]
                            }else{
                                query.brandTag={$in:query.brandTag}
                            }
                        }else{
                            query.brandTag=null;
                        }
                        if(!query.brandTag){
                            delete query.brandTag
                        }
                        if(!query.brand){
                            delete query.brand
                        }
                        //console.log(query.brandTag)
                        if(!brandSet){$location.search('brand',null);}
                        if(!brandTagSet){$location.search('brandTag',null);}

                        // end brand && collections
                        var queryTags;
                        if(stateParams.queryTag){
                            // анализ url на наличие тегов*************
                            queryTags=stateParams.queryTag.split('__');
                            // удаляем возможные дубли
                            queryTags= queryTags.filter(function(item, pos) {
                                return queryTags.indexOf(item) == pos;
                            })
                        }
                        query.filters={} // для количественных признаков
                        var filterTags;
                        if(stateParams.filterTag){
                            // анализ url на наличие тегов*************
                            filterTags=stateParams.filterTag.split('__');
                            // удаляем возможные дубли
                            filterTags= filterTags.filter(function(item, pos) {
                                return filterTags.indexOf(item) == pos;
                            })
                            filterTags = filterTags.map(function(f){
                                return f.split('_')
                            }).filter(function(f){return f.length==3}).forEach(function(f){
                                query.filters[f[0]]={$gte:Number(f[1]),$lte:Number(f[2])}
                            })
                        }


                        query.queryTags={}
                        filters.forEach(function (f) {
                            f.inList=false;
                            if((to.name=='stuffs' || to.name=='stuffs.stuff')){
                                if(categoryFilters.indexOf(f._id)>-1){
                                    f.inList=true;
                                    f.open=false;
                                }
                            }else{
                                f.inList=true;
                            }

                            if(categoryFilters && categoryFilters.length){
                                if(categoryFilters.indexOf(f._id)>-1){
                                    f.inList=true;
                                    f.open=false;
                                }
                            }
                            if(f.count){
                                //console.log(query.filters[f._id])
                                if(query.filters[f._id]){
                                    f.open=true;
                                    f.set=true;
                                    f.minValue =query.filters[f._id].$gte
                                    f.maxValue=query.filters[f._id].$lte
                                }else{
                                    f.minValue =f.min
                                    f.maxValue=f.max
                                }
                            }else{
                                f.tags.forEach(function (t) {
                                    if(queryTags && queryTags.indexOf(t.url)>-1){
                                        if(!query.queryTags[t.filter]){query.queryTags[t.filter]=[]}
                                        query.queryTags[t.filter].push(t._id)
                                        f.open=true;
                                        t.set=true;
                                        breadcrumbs.push({type:'queryTag',name:t.name,url:t.url})
                                    }else{
                                        t.set=false;
                                    }
                                })
                            }
                        })
                        _setQueryForTags(query,filters)
                        global.set('breadcrumbs',breadcrumbs);
                        // для клиенского запроса только опубликованные товары
                        if(to.name=='stuffs' || to.name=='stuffs.stuff' ){
                            query.actived=true;
                        }
                        //console.log('query.actived',query.actived)
                        //console.log(stateParams)
                        if(stateParams.searchStr){
                            var search=stateParams.searchStr.substring(0,20);
                            query['keywords.'+global.get('store').val.lang]=search
                        }
                        //console.log(to.name,query)
                        resolve(query)
                    })
                    .catch(function(err){
                        reject(err)
                    })
            })
        }





        function setFilters(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl:'components/stuff/filterStuffsList.html',
                    controller: setFiltersCtrl,
                    controllerAs: '$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                });
                modalInstance.result.then(function () {resolve()},function(){reject()});
            })

        }
        function cloneStuff(stuff,clone){
            if(!global.get('seller' ).val){return};
            /*if(stuff) {
                stuff=angular.copy(stuff);
            }else{
                stuff={name:'',actived:false}
            }
            stuff.seller = global.get('seller' ).val*/
            //console.log(global.get('seller'));
            /*stuff.brand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
            stuff.brandTag=(stuff.brandTag && stuff.brandTag._id)?stuff.brandTag._id:stuff.brandTag;
            stuff.category=(stuff.category && stuff.category._id)?stuff.category._id:stuff.category;*/
            //stuff.sortsOfStuff=(stuff.sortsOfStuff && stuff.sortsOfStuff._id)?stuff.sortsOfStuff._id:stuff.sortsOfStuff;
            //delete stuff._id;
            /*delete stuff.url;
            delete stuff.gallery;
            delete stuff.setTagsValue;
            delete stuff.sortsOfStuff;*/
            return $q.when()
                .then(function(){
                    if(stuff && stuff._id) {
                        return Items.get({_id:stuff._id,clone:'clone'}).$promise
                    }else{
                        if($stateParams && $stateParams.categoryUrl!='category'){
                            var category=global.get('categories').val.getOFA('url',$stateParams.categoryUrl);
                            if(category && category._id){
                                stuff.category=category
                            }

                        }
                        return stuff;
                    }

                })
                .then(function(st){
                    stuff=angular.copy(st);
                    if(!stuff.category.length){
                        stuff.category=[stuff.category]
                    }


                    if(!stuff.index){stuff.index=0}
                    stuff.index++;
                    //console.log(stuff)
                    delete stuff._id;
                    delete stuff.url;
                    delete stuff.link;
                    delete stuff.__v;
                    delete stuff.nameL;
                    delete stuff.artikulL;
                    delete stuff.gallery;
                    delete stuff.sort;
                    delete stuff.sortsOfStuff;
                    delete stuff.keywords;
                    if(stuff.blocks && stuff.blocks.length){
                       stuff.blocks.forEach(function (b) {
                           delete b._id
                           b.template=null;
                           b.templateName=null;
                           if(b.img){b.img=null}
                           if(b.video){b.video=null}
                           if(b.imgs && b.imgs.length){
                               b.imgs.forEach(function (slide) {
                                   if(slide.img){slide.img=null;}
                               })
                           }
                       })
                    }
                    //console.log(stuff.blocks)
                    stuff.stock={'notag':{price:stuff.price}}
                    stuff.actived=false;
                    return $q(function(resolve,reject){
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl:'components/stuff/cloneStuffModal.html',
                            controller: cloneStuffCtrl,
                            controllerAs: '$ctrl',
                            size: 'lg',
                            resolve: {
                                stuff: function () {
                                    return stuff;
                                },
                                clone: function () {
                                    return clone;
                                },
                            }
                        });
                        modalInstance.result.then(function (stuff) {
                            /*console.log(stuff)
                            reject()*/
                            resolve(stuff)
                        },function(){
                            reject()
                        });
                    })

                })

            //console.log(stuff)


        }
        function saveField(stuff,field){
            var f=field.split(' ');
            var o={_id:stuff._id}
            f.forEach(function(el){o[el]=stuff[el]})
            return Items.save({update:field},o).$promise
        }
        function selectItem(query){
            console.log('внимание - сделать так же как и  selectItemWithSort')
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/modal/selectStuffModal.html',
                    controller: selectStuffCtrl,
                    controllerAs:'$ctrl',
                    size: 'lg',
                    resolve:{
                        query:function(){
                            return query;
                        }
                    }
                });

                modalInstance.result.then(function (stuff) {
                    resolve(stuff)
                },function(){
                    reject()
                });
            })

        }
        function selectItemWithSort(query){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/modal/selectStuffWithSortModal.html',
                    controller: selectItemWithSortCtrl,
                    controllerAs:'$ctrl',
                    size: 'lg',
                    resolve:{
                        query:function(){
                            return query;
                        }
                    }
                });
                modalInstance.result.then(function (stuff) {
                    resolve(stuff)
                },function(){
                    reject()
                });
            })

        }
        function getServicesForOnlineEntry(){
            //console.log('stuffsService',stuffsService)
            if(stuffsService && stuffsService.length){return stuffsService}
            var data ={query:{orderType:{$in:[2,7]},actived:true}};
            var filterTags=[];
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return $q.when()
                .then(function () {
                    return FilterTags.getFilterTags()
                })
                .then(function (fts) {
                    filterTags=fts;
                })
                .then(function () {
                    //console.log(data)
                    return Items.query(data).$promise
                })
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(data) {
                //console.log(data)
                data.shift();
                var items=[];
                data.forEach(function(el){
                    //console.log(el)
                    _setPrice(el)
                    el.sort=null;
                    var category=(el.category && el.category.length)?el.category[0]:el.category;
                    //console.log(global.get('categoriesO'))
                    if(global.get('categoriesO') && global.get('categoriesO').val){
                        var c=global.get('categoriesO').val[category]
                    }else{
                        var c=global.get('categories').val.getOFA('_id',category);
                    }
                    //console.log(el.name,el.category,c)
                    if(!c){c={name:'Категория'}}
                    el.category=c.name
                    //console.log(el.category)

                    if(!el.timePart){el.timePart=4}
                    try{
                        if(el.sortsOfStuff && el.sortsOfStuff.differentPrice){
                            for (var sort in el.stock){
                                var s= {
                                    _id:el._id,
                                    name:el.name+' '+_getTagName(sort),
                                    nameL:el.nameL,
                                    link:el.link,
                                    artikul:el.artikul,
                                    price: el.stock[sort].price,
                                    category:el.category,
                                    timePart:el.timePart
                                }

                                //console.log('s',s)
                                items.push(s)
                            }
                        }else{
                            if(el.stock.notag){
                                el.price= el.stock.notag.price;
                            }else{
                                try{
                                    el.price=el.stock[Object.keys(el.stock)[0]].price
                                }catch (err){
                                    console.log(err)
                                }
                            }
                            items.push(el)
                        }
                    }catch(err){console.log(err)}

                    //console.log('done')
                })
                stuffsService=items;
                return items;

            }
            function getListFailed(error) {
                console.log('XHR Failed for getStuffs.' + error);
                return $q.reject(error);
            }
            //*********************************************************
            function _getTagName(_id){
                //console.log(_id)
                if(!_id || !filterTags || _id=='notag')return '';
                //console.log(_id,_filterTagsO)
                return ((_filterTagsO[_id])?_filterTagsO[_id].name:'');

                return filterTags.getOFA('_id',_id ).name||'';
            }

        }

    }
    setFiltersCtrl.$inject=['global','$uibModalInstance'];
    function setFiltersCtrl(global,$uibModalInstance){
        var self=this;
        self.global=global;
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
        self.ok = function () {
            $uibModalInstance.close();
        };

    }


    cloneStuffCtrl.$inject=['$q','global','Stuff','stuff','$uibModalInstance','Category','clone'];
    function cloneStuffCtrl($q,global,Stuff,stuff,$uibModalInstance,Category,clone){
        var self=this;
        self.Items=Stuff;
        var $ctrl=self;
        self.stuff=stuff;
        //console.log(stuff)
        self.clone=clone;
        self.categoryDisabled=true;
        self.selectCategory=function(){
            $q.when()
                .then(function(){
                    return Category.select();
                })
                .then(function(selectedCategory){
                    //console.log(selectedCategory)
                    if(!self.stuff.category){
                        self.categoryDisabled=false
                        setTimeout(function(){
                            $('#createStuffCategory').trigger("change");
                            self.categoryDisabled=true;
                        },100)
                    }
                    self.stuff.category=selectedCategory;
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        self.createNewStuff = function(){
            if(!self.stuff.category){
                self.alertMessage2=true;
                setTimeout(function(){
                    console.log('))))')
                    self.alertMessage2=false;
                },3000)
                return;
            }
            if(!self.stuff.name){
                self.alertMessage2=true;
                setTimeout(function(){
                    self.alertMessage2=false;
                },3000)
                return;
            }
            self.stuff.name=self.stuff.name.substring(0,100);
            if(self.stuff.artikul){
                self.stuff.artikul=self.stuff.artikul.substring(0,100);
            }


            if(!self.clone && self.stuff.category && self.stuff.category._id){
                self.stuff.category=self.stuff.category._id;
            }
            if(stuff.stock && stuff.stock.notag && stuff.stock.notag.price!=stuff.price){
                stuff.stock.notag.price=stuff.price;
            }
            $q.when()
                .then(function(){
                    self.stuff.keywords={};
                    var k =self.stuff.name;
                    if(self.stuff.artikul){
                        k+=' '+self.stuff.artikul;
                    }
                    //console.log(self.stuff.category)
                    if(self.stuff.category){
                        var c;
                        if(typeof self.stuff.category=='object'){
                            var cc=(typeof self.stuff.category[0]=='object')?self.stuff.category[0]._id:self.stuff.category[0]
                            c = global.get('categories').val.getOFA('_id',cc);
                        }else{
                            c = global.get('categories').val.getOFA('_id',self.stuff.category);
                        }
                        //console.log(c)
                        k+=' '+((c.nameL && c.nameL[global.get('store').val.lang])?c.nameL[global.get('store').val.lang]:c.name);
                    }
                    if(self.stuff.brand){
                        var bb=(typeof self.stuff.brand=='object')?self.stuff.brand._id:self.stuff.brand;
                        var b  = global.get('brands').val.getOFA('_id',bb);
                        k+=' '+((b.nameL&& b.nameL[global.get('store').val.lang])?b.nameL[global.get('store').val.lang]:b.name);
                        if(self.stuff.brandTag){
                            var bt = b.tags.getOFA('_id',self.stuff.brandTag);
                            if(bt && bt.nameL && bt.nameL[global.get('store').val.lang]){
                                k+=' '+bt.nameL[global.get('store').val.lang]
                            }
                        }


                    }

                    stuff.keywords[global.get('store').val.lang]=k;



                    return self.Items.save(self.stuff).$promise;
                })
                .then(function(res){
                    self.stuff._id=res.id;
                    self.stuff.url=res.url;
                    var c;
                    if(typeof self.stuff.category=='object'){
                        var cc=(typeof self.stuff.category[0]=='object')?self.stuff.category[0]._id:self.stuff.category[0]
                        c = global.get('categories').val.getOFA('_id',cc);
                    }else{
                        c = global.get('categories').val.getOFA('_id',self.stuff.category);
                    }
                    self.stuff.link='/'+c.linkData.groupUrl+'/'+c.linkData.categoryUrl+'/'+res.url;
                    self.Items.save({update:'link'},{_id:self.stuff._id,link:self.stuff.link})
                    $uibModalInstance.close(self.stuff)
                })
                .catch(function(err){
                    return $q.reject(err)
                })

        }
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    selectStuffCtrl.$inject=['$q','Stuff','$uibModalInstance','query'];
    function selectStuffCtrl($q,Stuff,$uibModalInstance,query){
        var cashQuery=angular.copy(query)
        //console.log(query)
        var self=this;
        self.stuffs=[];
        self.name='';
        var paginate={page:0,rows:30,items:0}
        self.search = function(name){
            if (name.length<3){return}

            if(query){
                if (!query.$and){query={$and:[query]}}
                query.$and.push({$or:[{name:name},{artikul:name}]})
            }else{
                query={$or:[{name:name},{artikul:name}]}
            }
            //console.log(query)

            $q.when()
                .then(function(){
                    return Stuff.search(name,true)
                })
                .then(function(res){
                    self.stuffs=res;
                })

            /*Stuff.getList(paginate,query).then(function(res){
                query=angular.copy(cashQuery)
                self.stuffs=res;
            })*/
        }
        self.selectStuff=function(stuff){
            if(stuff.imgThumb){stuff.img=stuff.imgThumb}
            stuff.link="/"+stuff.groupUrl+'/'+stuff.categoryUrl+"/"+stuff.url;
            $uibModalInstance.close(stuff);
        }
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
    selectItemWithSortCtrl.$inject=['$q','Stuff','$uibModalInstance','Filters','FilterTags','exception','query','global'];
    function selectItemWithSortCtrl($q,Stuff,$uibModalInstance,Filters,FilterTags,exception,query,global){
        var cashQuery=angular.copy(query)
        var self=this;
        self.global=global;
        self.stuffs=[];
        self.name='';
        var paginate={page:0,rows:30,items:0}

        self.getFilterName=getFilterName;
        self.search = function(name){
            //console.log(name)
            if (name.length<3){return}
            $q.when()
                .then(function(){
                    return Stuff.search(name,true)
                })
                .then(function(res){
                    if(!global.get('seller') || !global.get('seller').val){
                        self.stuffs=res.map(function (s) {
                            //console.log(s)
                            for(var i=0;i<s.stockKeysArray.length;i++){
                                if(!s.stockKeysArray[i].quantity){
                                    s.stockKeysArray.splice(i,1)
                                    i--;
                                }
                            }
                            return s;
                        }).filter(function(s){
                            // /console.log(s)
                            return s.actived && s.stockKeysArray.length})
                        //console.log(self.stuffs)
                    }else{
                        self.stuffs=res;
                    }
                })


            return;
            if(query){
                if (!query.$and){query={$and:[query]}}
                query.$and.push({$or:[{name:name},{artikul:name}]})
            }else{
                query={$or:[{name:name},{artikul:name}]}
            }
            Stuff.getList(paginate,query).then(function(res){
                query=angular.copy(cashQuery)
                if(!global.get('seller') || !global.get('seller').val){
                    self.stuffs=res.map(function (s) {
                            //console.log(s)
                            for(var i=0;i<s.stockKeysArray.length;i++){
                                if(!s.stockKeysArray[i].quantity){
                                    s.stockKeysArray.splice(i,1)
                                    i--;
                                }
                            }
                            return s;
                        }).filter(function(s){
                            // /console.log(s)
                            return s.actived && s.stockKeysArray.length})
                    //console.log(self.stuffs)
                }else{
                    self.stuffs=res;
                }

            })
        }
        self.selectStuff=function(stuff){
            if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter && !stuff.sort){
                exception.catcher('ошибка')('выберите разновидность')
            }else {
                /*var inCart= stuff.getDataForCart()
                if(inCart.sort){
                    inCart.addCriterionName=getTagName(inCart.sort);
                }*/
                $uibModalInstance.close(stuff);
            }
        }
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
        activate()
        function activate(){
            $q.when()
                .then(function(){
                    return Filters.getFilters()
                })
                .then(function(filters){
                    self.filters=filters;
                })
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(filterTags){
                    self.filterTags=filterTags;
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function getFilterName(_id){
            return self.filters.getOFA('_id',_id ).name||null;
        }

    }
    //*******************comments************************************
    commentService.$inject=['$resource','$uibModal','$q'];
    function commentService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Comment/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){

            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/stuff/modal/createComment.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,100))
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
    }


})()

'use strict';
(function(){

    angular.module('gmall.services')
        .directive('downloadStuffs',directiveFunction)
    function directiveFunction(){
        return {
            scope: {},
            bindToController: true,
            controller: directiveCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/stuff/downloadStuffs.html',
            restrict:'E'
        }
    }
    directiveCtrl.$inject=['Stuff','$rootScope','$q','$uibModal','global','exception','FilterTags','Filters','Confirm','anchorSmoothScroll','$timeout','$anchorScroll','Category','Brands','BrandTags','$window','$http'];
    function directiveCtrl(Stuff,$rootScope,$q,$uibModal,global,exception,FilterTags,Filters,Confirm,anchorSmoothScroll,$timeout,$anchorScroll,Category,Brands,BrandTags,$window,$http){
        anchorSmoothScroll.scrollTo('topPage')
        var self = this;
        self.catalog='prom';
        self.langArr=global.get('store').val.langArr;
        self.lang=global.get('store').val.lang;
        self.currencyArray=global.get('store').val.currencyArr;
        self.currency=global.get('store').val.mainCurrency;
        self.brand='all';
        self.ext='xml'
        self.razdel;
        self.brands=global.get('brands')
        //console.log(global.get('local').val)
        if(global.get('local').val){
            self.link=global.get('store').val.protocol+"://"+global.get('store').val.subDomain+".localhost:8909"
        }else{
            self.link=global.get('store').val.link//stuffHost
        }

        self.link=stuffHost

        self.Items=Stuff;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.$stateParams=$rootScope.$stateParams;
        self.query={};
        
        self.dataImage=null;
        self.setLink=setLink;
        self.copyLink=copyLink;
        self.setCollection=setCollection;
        self.deleteCollection=deleteCollection;
        self.setCategory=setCategory;
        self.deleteCategory=deleteCategory;
        self.getStuffs=getStuffs;
        self.getLinkToXMLCatalog=getLinkToXMLCatalog;


        //*******************************************************
        activate();
        function activate() {
            //console.log('downloadStuffs')
        }
        function setLink(){
            var link = self.link+'/downloads/'+global.get('store').val.subDomain.toLowerCase()+'/'+self.lang
                +'/'+self.currency.toLowerCase()+'/'+self.brand+'/catalog_'+((self.razdel)?'razdel_':'')+self.catalog+'.'+self.ext
            return link;
        }
        function copyLink() {
            var val =setLink();
            console.log(val)
            try {
                

                var dummy = document.createElement("input");
                document.body.appendChild(dummy);
                //$(dummy).css('display','none');
                //$(dummy).css('width','100px');
                dummy.setAttribute("id", "dummy_id");
                document.getElementById("dummy_id").value=val;
                dummy.select();
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                exception.showToaster('info', "Copying text", msg)
                document.body.removeChild(dummy);
            } catch (err) {
                document.body.removeChild(dummy);
                exception.catcher("Copying text")(err);
                console.log('Oops, unable to copy');
            }
        }

        function setCollection() {
            $q.when()
                .then( function () {
                    return BrandTags.select()
                } )
                .then( function (collection) {
                    self.collection = collection;
                } )
        }
        function deleteCollection(){
            self.collection=null;
        }
        function setCategory() {
            $q.when()
                .then( function () {
                    return Category.select()
                } )
                .then( function (category) {
                    self.category = category;
                } )
        }
        function deleteCategory(){
            self.category=null;
        }


        function getLinkToXMLCatalog() {
            return stuffHost+'/downloads/'+global.get('store').val.subDomain.toLowerCase()+
                '/'+global.get('store').val.lang.toLowerCase() +
                '/'+self.currency.toLowerCase()+'/catalog'+
                //'.xlsx';
                '.xml';
        }
        function getStuffs(XML) {
            //http://stackoverflow.com/questions/20822711/jquery-window-open-in-ajax-success-being-blocked
            XML=(XML)?'XML':'';
            var newWindow = window.open("","_blank")
            newWindow.location.href=getLinkToXMLCatalog()

                /*'/downloads/'+global.get('store').val.subDomain.toLowerCase()+
                '/'+global.get('store').val.lang.toLowerCase() +
                '/'+self.currency.toLowerCase()+'/catalog'+
                '.xml';*/
            return;
            var newWindow = window.open("","_blank");
            if(self.category){self.query.category=self.category._id}else{delete self.query.category}
            if(self.collection){self.query.brandTag=self.collection._id}else{delete self.query.collection}
            $http.post(stuffHost+'/api/downloadPrice'+XML+'?currency='+self.currency,self.query).then(
                function(res){
                    //console.log(res);
                    if(XML){
                        newWindow.location.href=stuffHost+res.data.file;
                    }else{
                        newWindow.location.href=stuffHost+'/api/downloadPriceFromFile/'+res.data.file;
                    }

                    //$window.open(stuffHost+'/api/downloadPriceFromFile/'+res.data.file);
                },
                function(res){
                    console.log(res);
                }
            );
            //console.log(self.query)
        }


    }
})()

'use strict';
angular.module('gmall.services')
.service('Filters', function ($resource,$q,global,$uibModal) {
    var Items= $resource('/api/collections/Filter/:id',{id:'@_id'});
    var filters=null;
    var pending=true;
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;
    this.select=selectFilter;
    this.reloadItems=reloadItems;
    this.getItem=getItem;
    this.getList=getList;


    function getList(paginate,query){
        if(!paginate){
            paginate={page:0}
        }
        var data ={perPage:paginate.rows ,page:paginate.page,query:query};
        if(global.get('crawler') && global.get('crawler').val){
            data.subDomain=global.get('store').val.subDomain;
        }
        return Items.query(data).$promise
            .then(getListComplete)
        //.catch(getListFailed);
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                }else{
                    paginate.items=0;
                }
            }
            //console.log(response)
            return response;
        }

        function getListFailed(error) {
            console.log('XHR Failed for getNews.' + error);
            return $q.reject(error);
        }
    }
    function getItem(id){
        return Items.get({_id:id} ).$promise
            .then(getItemComplete)
        //.catch(getItemFailed);
        function getItemComplete(response) {
            if(response && response.blocks && response.blocks.length){
                response.blocks.forEach(function (b) {
                    if(b.type=='stuffs'){
                        if(b.stuffs && b.stuffs.length){
                            b.imgs=b.stuffs.map(function(s){
                                if(s.gallery && s.gallery.length && s.gallery[0].img){
                                    s.img=s.gallery[0].img;
                                }
                                return s;
                            });
                        }else{b.imgs=[]}
                    }
                })
            }
            return response;
        }
        function getItemFailed(error) {
            return $q.reject(error);
        }
    }


    function returnFilters(resolve){
        if(pending){setTimeout(function(){returnFilters(resolve)}, 300);}else{
            resolve(filters)
        }

    }
    this.getFilters=function(){
        return $q(function(resolve,reject){
            if(global.get('filters') && global.get('filters').val){
                if(!filters){filters=global.get('filters').val}
                return resolve(global.get('filters').val);
            }
            if(pending){
                setTimeout(function(){returnFilters(resolve)}, 300);
            }else{
                if(filters){
                    resolve(filters)
                } else{
                    pending=true;
                    Items.query(function(res){
                        res.shift();
                        filters=res;
                        pending=false;
                        resolve(filters)
                    },function(err){pending=false;;reject(err)})
                }
            }
        })
    }
    if(!global.get('filters') || !global.get('filters' ).val){
        Items.query(function(res){
            res.shift();
            filters=res;
            if(global.get('filters') && !global.get('filters' ).val){
                global.set('filters',filters)
            }
            pending=false;
        })
    }

    function reloadItems(){
        pending=true;
        Items.query(function(res){
            res.shift();
            filters=res;
            global.set('filters',filters)
            pending=false;
        })
    }

    function selectFilter(){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/filters/selectFilter.html',
                controller: selectFilterCtrl,
                size: 'lg',
                controllerAs:'$ctrl',
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selected) {
                //console.log(selected)
                resolve(selected)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })
    }
    selectFilterCtrl.$inject=['Filters','$uibModalInstance','$q','global'];
    function selectFilterCtrl(Filters,$uibModalInstance,$q,global){
        var self=this;
        self.lang=global.get('lang').val;
        $q.when()
            .then(function(){
                return Filters.getFilters();
            } )
            .then(function(filters){
                self.filters=filters;
                //console.log(filters)
            })
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        self.ok = function (filter) {
            $uibModalInstance.close(filter);
        };
    }


})
    /*.service('FilterTags', function ($resource,) {
        var Items= $resource('/api/collections/FilterTags/:id',{id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }

        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
            //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                //console.log(response)
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
            //.catch(getItemFailed);
            function getItemComplete(response) {
                if(response && response.blocks && response.blocks.length){
                    response.blocks.forEach(function (b) {
                        if(b.type=='stuffs'){
                            if(b.stuffs && b.stuffs.length){
                                b.imgs=b.stuffs.map(function(s){
                                    if(s.gallery && s.gallery.length && s.gallery[0].img){
                                        s.img=s.gallery[0].img;
                                    }
                                    return s;
                                });
                            }else{b.imgs=[]}
                        }
                    })
                }
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }



    })*/



'use strict';
//console.log(_filterTagsO);
var __filterTagsO=_filterTagsO
var __filterTags=_filterTags
//(function(){

    angular.module('gmall.services')
        .service('FilterTags', filterTagsService);
    filterTagsService.$inject=['$resource','$uibModal','$q','global','$timeout','Sections'];
    function filterTagsService($resource,$uibModal,$q,global,$timeout,Sections){
        var Items= $resource('/api/collections/FilterTags/:_id',{_id:'@_id'});
        var filterTags=null;
        var pending=true;
        var qu;
        //console.log(_filterTagsO)
        /*console.log(_filterTagsO)
        if(typeof _filterTagsO=='undefined'){
            var _filterTagsO={}
        }*/
        //filterTags=global.get('filterTags').val
        /*if(typeof _filterTags!='undefined' && _filterTags.length){
            filterTags=_filterTags
        }*/
        filterTags=__filterTags
        $timeout(function(){ // это для админки
            qu={query:JSON.stringify({store:global.get('store').val._id})}
            if(!global.get('filterTags') || !global.get('filterTags' ).val){
                //console.log('????????????????')
                init();
            }else{
                filterTags=global.get('filterTags').val
            }
        },50)


        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            getFilterTags:getFilterTags,
            getTagsByUrl:getTagsByUrl,
            selectFilterTag:selectFilterTag,
            select:selectFilterTag,
            reloadItems:reloadItems,
            getSticker:getSticker,
            reloadItems:reloadItems
        }

        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            //console.log(query)
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function returnFilterTags(resolve){
            if(pending){setTimeout(function(){returnFilterTags(resolve)}, 100);}else{
                resolve(filterTags)
            }
        }
        function getFilterTags(){
            return $q(function(resolve,reject){
                //console.log( global.get('filterTags').val)
                if(global.get('filterTags') && global.get('filterTags').val){
                    if(!filterTags){filterTags=global.get('filterTags').val}
                    return resolve(global.get('filterTags').val);
                }
                if(pending){
                    return $timeout(function(){return resolve(filterTags)}, 400);
                }else{
                    if(filterTags){
                        resolve(filterTags)
                    } else{
                        pending=true;
                        Items.query(function(res){
                            //console.log(res)
                            res.shift();
                            filterTags=(res)?res:[];
                            pending=false;
                            resolve(filterTags)
                        },function(err){pending=false;;reject(err)})
                    }
                }
            })
        }
        function getTagsByUrl(queryTags,cb){
            //console.log(queryTags)
            $q.when()
                .then(function(){
                    return getFilterTags();
                })
                .then(function(){
                    //console.log(filterTags)
                    queryTags=queryTags.map(function(url){
                        //console.log(url)

                        return filterTags.getOFA('url',url)
                    });
                    cb(queryTags)
                })
        }

        function selectFilterTag(data){
            var sections =(data &&  data.section)?Sections.getSections():null;

            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/filters/bindFilterTagToModel.html',
                    controller: selectFilterTagCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        sections: function(){
                            return sections
                        }
                    }
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedFilterTag) {
                    resolve(selectedFilterTag)
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }
        selectFilterTagCtrl.$inject=['Filters','$uibModalInstance','$q',,'global','sections'];
        function selectFilterTagCtrl(Filters,$uibModalInstance,$q,global,sections){
            var self=this;
            self.global=global;
            self.sections=sections;
            if(self.sections){
                self.section=self.sections[0].url
            }
            $q.when()
                .then(function(){
                    return Filters.getFilters();
                } )
                .then(function(filters){
                    self.filters=filters;
                    //console.log(filters)
                })
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function (filterTag) {
                //console.log(filterTag)
                if(self.section){
                    filterTag.section=self.section;
                }
                $uibModalInstance.close(filterTag);
            };
        }
        function init(){
            Items.query(qu,function(res){
                res.shift();
                filterTags=res;
                filterTags.forEach(function (t) {
                    _filterTagsO[t._id]=t;
                })
                pending=false;
            })
        }
        function reloadItems(){
            pending=true;
            init();
        }
        function getSticker(tags){
            if(tags && tags.length && filterTags && filterTags.length){
                for(var i =0;i<tags.length;i++){
                    if(__filterTagsO[tags[i]] && __filterTagsO[tags[i]].sticker){
                        //console.log(angular.copy(__filterTagsO[tags[i]].sticker))
                        return __filterTagsO[tags[i]].sticker
                    }
                }
            }
        }
    }
//})()


/*'use strict';
angular.module('gmall.services')
.service('FilterTags', function ($resource,$q) {
    var Items= $resource('/api/collections/FilterTags/:id',{id:'@_id'});
    var filterTags=null;
    var pending=true;
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;

    var getFilterTags=function(){
        return $q(function(resolve,reject){
            if(pending){
                setTimeout(function(){returnFilterTags(resolve)}, 100);
            }else{
                if(filterTags){
                    resolve(filterTags)
                } else{
                    pending=true;
                    Items.query(function(res){
                        res.shift();
                        filterTags=res;
                        pending=false;
                        resolve(filterTags)
                    },function(err){pending=false;;reject(err)})
                }
            }
        })
    }
    this.getFilterTags=getFilterTags;
    this.getTagsByUrl=function(queryTags,cb){
        $q.when()
            .then(function(){
                return getFilterTags();
            })
            .then(function(){
                queryTags=queryTags.map(function(url){
                    return filterTags.getOFA('url',url)
                });
                cb(queryTags)
            })
    }

    Items.query(function(res){
        res.shift();
        filterTags=res;
        pending=false;
    })

})*/
angular.module('gmall.services')
.service('SelectFilterTags', ['$q','$uibModal', function($q,$uibModal) {
    function bindFilterTagToModelCtrl(Filters,$uibModalInstance){
        var self=this;
        $q.when()
            .then(function(){
                return Filters.getFilters();
            } )
            .then(function(filters){
                self.filters=filters;
                //console.log(filters)
            })
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        self.ok = function (filterTag) {
            $uibModalInstance.close(filterTag);
        };
    }
    this.bindFiterTagToModel=function(){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/filters/bindFilterTagToModel.html',
                controller: bindFilterTagToModelCtrl,
                size: 'lg',
                controllerAs:'$ctrl',
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selectedFilterTag) {
                resolve(selectedFilterTag)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })



    }
}])


'use strict';
angular.module('gmall.services')
.provider('global',[function(){
    var _data = {}; // our data storage array
    var _urls = {}; // end urls
    this.setUrl = function(urls){
        _urls = urls;
    }
    var _set = function(what,val){
        val=val||null
        //console.log(what,val)
        //if(what=='user' && val){return;}
        if(angular.isDefined(what)){
            if (!_data[what]){
                _data[what]={val:val}}
            else {
                _data[what].val=(angular.isDefined(val)) ? val: null;
            }
            //return true;
        }/*else{
            return false;
        }*/
    }; // end _set
    var _getSticker = function(stuff){
        var id = (stuff._id)?stuff._id:stuff.stuff;
        if (!stuff.tags || !stuff.tags.length) return;
        if (!_data['filterTagsSticker'].val) return;
        //console.log(_data['filterTagsSticker'])
        for(var i=0,l=_data['filterTagsSticker'].val.length;i<l;i++){
            var tag = _data['filterTagsSticker'].val[i]._id;
            if (stuff.tags.indexOf(tag)>-1){
                return (_data['filterTagsSticker'].val[i].sticker)?_data['filterTagsSticker'].val[i].sticker:false;
                break;
            }
        }
        return false;
    }
    var _getDataForCart = function(stuff){
        console.log('не используется!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return;
        var inCart={}
        inCart.quantity=(stuff.quantity)?stuff.quantity:1;

        inCart.addCriterionName=[];
        //console.log(stuff.addCriterionToCart,stuff.addCriterionToCart.length)
        if(stuff.addCriterionToCart && stuff.addCriterionToCart.length){
            console.log(stuff.addCriterionToCart)
            stuff.addCriterionToCart.forEach(function(el){

                var t = _data['filterTags'].val.getObjectFromArray('_id',el);
                if (t && t.name){
                    inCart.addCriterionName.push(t.name)
                }
            })
        }
        inCart.addCriterionToCart=(stuff.addCriterionToCart)?stuff.addCriterionToCart:null;
        if (stuff.single){inCart.single=true;}
        inCart.unitOfMeasure= (stuff.unitOfMeasure)?stuff.unitOfMeasure:'шт';
        inCart.stuff=stuff._id;
        inCart.stuffUrl=stuff.url;
        inCart.seller=stuff.seller;
        inCart.img=(stuff.gallery[0].thumb)?stuff.gallery[0].thumb:'';
        inCart.price=stuff.price;
        inCart.retail=stuff.retail;
        inCart.priceSale=stuff.priceSale;
        inCart.brand=stuff.brand||'brand';
        var _brand =_data['brands'].val.getObjectFromArray('_id',stuff.brand);
        inCart.brandUrl=(_brand)?_brand.url:'brand';
        inCart.brandName=(_brand)?_brand.name:'';
        inCart.category=stuff.category||"category";
        var o=_data['categories'].val.getObjectFromArray('_id',stuff.category);
        if(o){
            inCart.categoryUrl=o.url;
            inCart.categoryName=o.name;
            inCart.groupUrl=o.group.url;
            inCart.groupName=o.group.name;
        } else {
            inCart.categoryUrl='id';
            inCart.categoryName='category';
            inCart.groupUrl="group"
        }
        inCart.tags=stuff.tags;
        inCart.name=stuff.name
        if (stuff.artikul){
            inCart.name +=' '+stuff.artikul;
        }
        if (stuff.sticker==='undefined'){
            inCart.sticker=_getSticker(stuff);
        } else {
            inCart.sticker=stuff.sticker;
        }

        //console.log(inCart);
        return inCart;
    }

// Provider method for set
    this.set = _set;

// service methods
    this.$get = ['$http',function($http){


        return {
            request : function(url,vars){
                //console.log(url)
                if(angular.isDefined(vars)){
                    return $http.post(url,$.param(vars),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
                }else{
                    return $http.get(url);
                }
                //return ['a','d','c']
            },

            url : function(which){
                return _urls[which];
            }, // end url

            set : _set, // end set

            get : function(what){
                if(angular.isDefined(what) && (what in _data))
                    return _data[what];//angular.copy(_data[what]);
                else
                    return undefined;
            }, // end get

            del : function(what){
                if(angular.isDefined(what)){
                    var i = _data.indexOf(what);
                    if(i >= 0)
                        return _data.splice(i,1);
                }
                return false;
            }, // end del

            clear : function(){
                _data = [];
            }, // end clear
            getAll:function(){ return _data},
            //глобальные функции
            getSticker:_getSticker,
            getDataForCart: _getDataForCart

        };
    }]; // end $get
}]) // end appDataStoreSrvc / storage-services


.factory('globalSrv',['global',function(global){
    //-- Variables --//
    var _send = global.request;
    //-- Methods --//
    return {
        getData:function(name,param,abbr){
            //console.log(abbr)
            var url = global.url(name);
            if(angular.isDefined(param) && !(angular.equals(param,null) || angular.equals(param,'')))
                url += '/' + param;
            if(angular.isDefined(abbr) && !(angular.equals(abbr,null) || angular.equals(abbr,''))&& typeof abbr=='object'){
                url += '?';
                for(var key in abbr){
                    if (url[url.length-1]!='?'){
                        url+= '&';
                    }
                    url +=key+'='+abbr[key]
                }
            }

            //console.log(url)
            return _send(url);
        }
    };
}]) // end subjectSrv / module(myapp.services)

'use strict';
(function(){

    angular.module('gmall.services')
        .service('Helper', helperService);
    helperService.$inject=['$resource','$uibModal','$q','exception'];
    function helperService($resource,$uibModal,$q,exception){
        var Items= $resource('/api/collections/Helper/:_id',{_id:'@_id'});
        var _items={};
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            getHelp:getHelp
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            if(_items[id]){return $q.when(_items[id])}
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                _items[id]=response;
                return response;
            }
            function getItemFailed(error) {
                _items[id]=null;
                return $q.reject(error);
            }
        }
        function getHelp(state){
            $q.when()
                .then(function(){
                    return getItem(state)
                })
                .then(function(helper){
                    $uibModal.open({
                        animation: true,
                        templateUrl:'components/helper/helperModal.html',
                        controller: function($uibModalInstance,$sce,desc){
                            var self=this;
                            self.desc=desc;
                            /*self.trustHtml=function(text){
                                console.log($sce.trustAsHtml(text))
                                return $sce.trustAsHtml(text)
                            }*/
                            self.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        resolve:{desc:function(){return helper.desc}},
                        controllerAs:'$ctrl',
                    });

                    /*return $q(function(resolve,reject){
                        var modalInstance = $uibModal.open({
                            animation: true,
                            template:'ssdsdsd',
                            controller: function($uibModalInstance,desc){
                                var self=this;
                                self.desc=desc;
                                self.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            resolve:{desc:function(){return helper.desc}},
                            controllerAs:'$ctrl',
                        });
                        modalInstance.result.then(function () {resolve()}, function (err) {reject(err)});
                    })*/
                })
                .catch(function(err){
                    var msg='ошибка';
                    if(err){
                        if(typeof err =='object'){
                            if(err.data){
                                msg=err.data
                            }else if(err.message){
                                msg=err.message;
                            }
                        }else{msg=err}
                    }
                    err = err.data||err
                    exception.catcher('получение справки')(msg)
                })
        }


    }
})()


'use strict';
angular.module('gmall.services')
.factory('$email', function ($resource) {
    return $resource('/api/sendEmail');
})
    .factory('Email', function ($resource) {
        return $resource('/api/sendEmails');
    })


'use strict';
angular.module('gmall.services')
.service('$order',['localStorage','global','Orders','$q','$uibModal','CartInOrder','exception','$email','CreateContent','$notification','$state','$window','Coupon','$user','$rootScope','$timeout','$http',function(localStorage,global,Orders,$q,$uibModal,CartInOrder,exception,$email,CreateContent,$notification,$state,$window,Coupon,$user,$rootScope,$timeout,$http){
    //console.log(global.get('seller').val);
    var order;
    var storageName;
    this.type=null;
    this.reinitCart=function(){
        //console.log('reinitCart')
        order.comment='';
        delete order.action;
        delete order._id;
        delete order.num;
        delete order.date;
        delete order.seller;
        var seller=global.get('store').val.seller;
        order.setSellerData(seller._id,seller.cascade,seller.opt);
    }
    this.initOrderInList=function (res) {
        var order= myShareData.getOrder();
        //console.log(order)
        //var order1= myShareData.getOrder();
        var campaign=(global.get('campaign'))?global.get('campaign').val:null;
        // console.log(campaign)
        var mainCurrency = global.get('store').val.mainCarrency;
        var currencyStore = global.get('store').val.currency;

        var currency = (global.get('currency') && global.get('currency').val)?global.get('currency').val:'UAH';
        var seller=global.get('store').val.seller;

        order.type='order';
        order._id=res._id;
        order.init(res.campaign,mainCurrency,currencyStore);
        order.setCurrency(res.currency);
        order.kurs=order.currencyStore[order.currency][0];
        order.payInfo=res.seller.payInfo;
        order.setSellerData(res.seller,res.cascade,res.opt)
        order.unitOfMeasure=order._getUnitOfMeasure()
        /*order.setCart(res.cart.stuffs)
         */
        order.cart._id=res.cart;
        order.setDiscount(res.discount)
        order.setCoupon(res.coupon)
        //order.totalCount= order._cartCount();
        order.date=res.date;
        order.date2=res.date2;
        order.date3=res.date3;
        order.date4=res.date4;
        order.date5=res.date5;
        order.invoice=res.invoice;
        order.invoiceInfo=res.invoiceInfo;
        order.pay=res.pay;
        order.shipCost=res.shipCost;
        order.num=res.num;
        order.status=res.status;
        order.profile=res.profile;
        order.comment=res.comment;
        order.note=res.note;
        order.user=res.user;
        order.shipDetail=res.shipDetail;
        order.domain=global.get('store').val.domain||global.get('store').val.subDomain;
        order.paySum=res.paySum;
        return order;
    }
    this.init=function(type,id){
        storageName=global.get('store').val._id;
        var q = $q.defer();
        order= myShareData.getOrder();
        //console.log(order)
        //var order1= myShareData.getOrder();
        var campaign=(global.get('campaign'))?global.get('campaign').val:null;
       // console.log(campaign)
        var mainCurrency = global.get('store').val.mainCarrency;
        var currencyStore = global.get('store').val.currency;

        var currency = (global.get('currency') && global.get('currency').val)?global.get('currency').val:'UAH';
        var seller=global.get('store').val.seller;
        this.type=type;
        order.type=type;
        // получили новый объект с меьлдами для расчета цены
        // создание нового ордера или корзина
        if(type=='cart'){
            //корзина
            order.init(campaign,mainCurrency,currencyStore);
            order.setSellerData(seller._id,seller.cascade,seller.opt)
            order.setCurrency(currency);
            order.kurs=order.currencyStore[order.currency][0];
            //localStorage.set(storageName,[]);
            var o= localStorage.get(storageName);
            //console.log(o)
            if(!o){
                o=[];
                localStorage.set(storageName,o);
            }
            order.setCart(o);
            order.unitOfMeasure=order._getUnitOfMeasure()
            //console.log(order.unitOfMeasure)
            order.totalCount= order._cartCount();
            q.resolve(order)
        }else if(type=='order') {
            Orders.get({_id:id},function(res){
                if(!res || !res._id){q.reject('404')}
                /*res.prototype=order.prototype;
                console.log(order)
                console.log(res)*/
                /*for(var k in res) order[k]=res[k];
                order.init(res.campaign,mainCurrency,currencyStore);
                order.setCurrency(res.currency);
                order.kurs=order.currencyStore[order.currency][0];
                order.payInfo=res.seller.payInfo;
                order.setSellerData(res.seller,res.cascade,res.opt)
                order.setCart(res.cart.stuffs)
                order.setDiscount(res.discount)
                order.setCoupon(res.coupon)
                order.totalCount= order._cartCount();*/
                order._id=res._id;
                order.init(res.campaign,mainCurrency,currencyStore);
                order.setCurrency(res.currency);
                order.kurs=order.currencyStore[order.currency][0];
                order.payInfo=res.seller.payInfo;
                order.setSellerData(res.seller,res.cascade,res.opt)
                order.setCart(res.cart.stuffs)
                order.unitOfMeasure=order._getUnitOfMeasure()
                order.cart._id=res.cart._id;
                order.setDiscount(res.discount)
                order.setCoupon(res.coupon)
                order.totalCount= order._cartCount();
                order.date=res.date;
                order.date2=res.date2;
                order.date3=res.date3;
                order.date4=res.date4;
                order.date5=res.date5;
                order.invoice=res.invoice;
                order.invoiceInfo=res.invoiceInfo;
                order.pay=res.pay;
                order.shipCost=res.shipCost;
                order.num=res.num;
                order.status=res.status;
                order.profile=res.profile;
                order.comment=res.comment;
                order.note=res.note;
                order.user=res.user;
                order.shipDetail=res.shipDetail;
                order.domain=global.get('store').val.domain||global.get('store').val.subDomain;
                //order=res;
                q.resolve(order)
            },function(err){
                q.reject(order)
            })
            order.totalCount= order._cartCount();
        }
        return q.promise;

    };
    this.getOrder=function(){
        return order;
    }
    this.addItemToCart = function(itemTo){
        //console.log(itemTo);return;
       //console.log(global.get('seller').val,itemTo.seller)
        itemTo.seller=global.get('seller').val;
        /*if (!itemTo.seller){
            itemTo.seller=global.get('seller').val;
        }
        console.log(itemTo)*/
        //if(itemTo.seller!=global.get('seller').val){return};
        itemTo.img=(itemTo.gallery && itemTo.gallery.length && itemTo.gallery[0].thumbSmall)?itemTo.gallery[0].thumbSmall:'';
        itemTo.quantity||(itemTo.quantity=1);
        //console.log(itemTo)
        order.addStuffToOrder(itemTo)
        this.updateOrder(itemTo);
    }
    this.checkInCart=function(item){
        //console.log(item.sort,item.name)
        return order.checkInCart(item)
    }
    this.updateOrder=function(itemTo){
        order.totalCount= order._cartCount();
        order.unitOfMeasure=order._getUnitOfMeasure()
        if(itemTo){
            //console.log('send message &')
            $rootScope.$broadcast('$updateOrder',itemTo);
        }
        //console.log(this.type)
        if (this.type=='cart'){
            //console.log(order.cart.stuffs)
            localStorage.set(storageName,order.cart.stuffs);
            order.totalCount= order._cartCount();
        }else{
            $timeout( function(){}, 100 )
                .then(function(){
                    var o=angular.copy(order.cart);
                    o.order=order._id;
                    return CartInOrder.save(o).$promise;
                })
                .then(function(){
                    order.priceSaleHandle=order.cart.stuffs.some(function(s){return s.priceSaleHandle})
                    order.maxDiscountOver=order.cart.stuffs.some(function(s){return s.maxDiscountOver})
                    return Orders.save({update:'totalCount sum paySum maxDiscountOver priceSaleHandle'},
                        {_id:order._id,
                            totalCount:order.totalCount,
                        sum:order.sum,
                        paySum:order.paySum,
                            priceSaleHandle:order.priceSaleHandle,
                            maxDiscountOver:order.maxDiscountOver,
                        }).$promise;
                })
                .then(function(){

                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                    //exception.showToaster('note','обновлено','')
                })
                .catch(function(error){
                    exception.catcher('сохранение изменений')(error)
                })

        }


    }
    this.removeItem=function(i){
        //console.log(i)
        order.cart.stuffs.splice(i,1);
        this.updateOrder();
    }
    this.decreaseQty=function(i){
        var stuff=order.cart.stuffs[i]
        if(stuff && stuff.quantity>1){
            if(stuff.multiple && stuff.minQty){
                if(stuff.quantity-1>=stuff.minQty){
                    stuff.quantity--
                    this.updateOrder();
                }
            }else{
                stuff.quantity--
                this.updateOrder();
            }

        }
    }
    this.increaseQty=function(i){
        var stuff=order.cart.stuffs[i]
        if(stuff) {
            if(stuff.single && stuff.maxQty){
                if (stuff.quantity + 1 <= stuff.maxQty) {
                    stuff.quantity++
                    this.updateOrder();
                }
            }else{
                stuff.quantity++
                this.updateOrder();
            }


        }
    }

    this.clearCart=function(){
        order.clearOrder();
        this.updateOrder();
    }
    this.cartCount=function(){
        return order.totalCount;
    }
    this.sendOrder=function(user){
        var self=this;
        return $q.when()
            .then(function () {
                try{
                    if(user){
                        if(!user._id){
                            conosole.log(user)
                            throw  'не авторизирован!';
                        }
                    } else{
                        if(global.get('user' ).val && global.get('user' ).val._id){
                            order.user=global.get('user' ).val;
                            //order.profile=global.get('user').val.profile;
                            order.profile=angular.copy(global.get('user').val.profile);
                        }else{
                            throw  'не авторизирован!';
                        }
                    }
                    order.action='order'
                    if (order.comment){
                        order.comment.clearTag(400);
                    }else{
                        order.comment=''
                    }
                    //*********************************************
                    if (order.coupon && order.coupon._id){
                        order.paySum=order.kurs*order.getCouponSum();

                    }else{
                        order.paySum=order.kurs*order.getTotalSum();
                    }
                }catch(err){
                    throw err
                }

            })
            .then(function(){
                // проверка купона. если есть купон в ордере.
                // если его нет у пользователя. получаем его, если купон активен и не просрочен, то
                //записываем его в использованные купоны у пользователя.
                // при удалении ордера купон у пользователя аннулируется.
                return $q(function(resolve,reject){
                    if (order.coupon && order.coupon._id){
                        if (!global.get('user' ).val.coupons){global.get('user' ).val.coupons=[]}
                        //user.coupons=[]
                        if (global.get('user' ).val.coupons.indexOf(order.coupon._id)>-1){
                            // купон уже был использован
                            order.coupon=null;
                            resolve();
                        }else{
                            var now= Date.now();
                            Coupon.get({_id:order.coupon._id},function(coupon){
                                //console.log(coupon)
                                if (coupon){
                                    // добавляем купон в список использованных
                                    if(!global.get('user' ).val.coupons){
                                        global.get('user' ).val.coupons=[];
                                    }
                                    global.get('user' ).val.coupons=global.get('user' ).val.coupons.filter(function(el){return el})
                                    global.get('user' ).val.coupons.push(coupon._id);
                                    //console.log(global.get('user' ).val.coupons)
                                    $user.save({update:'coupons'},{_id:global.get('user' ).val._id,coupons:global.get('user' ).val.coupons},function(res){
                                        resolve();
                                    },function(err){
                                        if(err){return reject(err)}
                                    });
                                }else{
                                    // купон просрочен или не активен
                                    order.coupon=null;
                                    resolve();
                                }
                            })
                        }
                    }else{
                        resolve();
                    }
                })
            })// coupon
            .then(function(){
                //throw order;
                //console.log(order)
                return Orders.save(order).$promise
            })//сам заказ
            .then(function(res){
                if(!res.num || !res._id){
                    throw 'заказ не отправлен. произошла ошибка на сервере. не присвоен номер ордеру';
                }
                try{
                    order._id = res.id;
                    order.num = res.num;
                    order.date = Date.now();
                    order.seller = global.get( 'store' ).val.seller;
                    order.status=1;
                }catch(err){
                    throw err
                }
                // для отправка письма

            })
            .then(function(){
                if(!global.get('store').val.seller.salemail){
                    return;
                }
                try{
                    // письмо
                    order.profile.admin='Admin'
                    var email=global.get('store').val.seller.salemail;
                    var content=CreateContent.order(order,false,true)
                    delete order.profile.admin;

                    var domain=global.get('store').val.domain,
                        subj = ((global.get('langOrder').val.neworder)?global.get('langOrder').val.neworder.toUpperCase()+' ✔':'НОВЫЙ ЗАКАЗ'+' ✔')
                    var o={email:email,content:content,
                        subject:subj,from:  global.get('store').val.name+'<sales@'+domain+'>'};
                }catch(err){
                    throw err
                }

                return $q(function(resolve,reject){
                    $email.save(o,function(res){
                        exception.showToaster('note',global.get('langNote').val.emailSent,'');
                        resolve()
                    },function(err){
                        exception.showToaster('warning',global.get('langNote').val.error,err.data)
                        resolve()
                    } )
                })
            }) //email
            .then(function(){
                //order.profile=global.get('user').val.profile;
                try{
                    // письмо
                    order.user=(user)?user:global.get('user').val;
                    var email =(user)?user.email:global.get('user').val.email;
                    /*if(global.get('store').val.seller.salemail){
                     email=[email,global.get('store').val.seller.salemail]
                     }*/
                    var content=CreateContent.order(order,false,true)
                    var domain=global.get('store').val.domain,
                        subj = ((global.get('langOrder').val.neworder)?global.get('langOrder').val.neworder.toUpperCase()+' ✔':'НОВЫЙ ЗАКАЗ'+' ✔')
                    var o={email:email,content:content,
                        //subject:global.get('langOrder').val.order+' ✔',from:  global.get('store').val.name+'<'+global.get('store').val.subDomain+'@'+domain+'>'};
                        subject:subj,from:  global.get('store').val.name+'<sales@'+domain+'>'};
                }catch(err){
                    throw err
                }

                return $q(function(resolve,reject){
                    $email.save(o,function(res){
                        resolve()
                    },function(err){
                        exception.showToaster('warning',global.get('langNote').val.error,err.data)
                        resolve()
                    } )
                })
            }) //email admin
            .then(function(){
                try{
                    // отправка уведомления
                    var content=CreateContent.orderNote(order)
                    var o={addressee:'seller',
                        type:'order',
                        content:content,order:order._id,
                        num:order.num,
                        seller:order.seller._id};
                }catch(err){
                    throw err
                }

                return $q(function(resolve,reject){
                    $notification.save(o,function(res){
                        exception.showToaster('note', global.get('langNote').val.sent,'');
                        resolve()
                    },function(err){
                        exception.catcher('error')(err);
                        resolve()
                    } )
                })
            })//notification
            .then(function(){
                try{
                    var states= $state.get();
                    if(global.get('paps') && states.some(function(state){return state.name=='thanksPage'})){
                        var pap = global.get('paps').val.getOFA('action','order');
                        //console.log(pap)
                        if(pap && pap.url){
                            $state.go('thanksPage',{id:pap.url})
                        }else{
                            exception.showToaster('note',global.get('langNote').val.orderSuccess,'');
                        }
                    }else{
                        exception.showToaster('note',global.get('langNote').val.orderSuccess,'');
                    }
                }catch(err){
                    throw err
                }


            })
            .catch(function(err){
               throw err
            })
    }

    this.changeCurrency=function(lan){
        order.changeCurrency(lan)
    }
    this.checkCampaign=function(stuff){
        if(order && order.type){
            return order.checkCampaign(stuff);
        }else{
            return null;
        }

    }
    this.checkOutFromList = function(user){
        order.comment= (user.comment)?user.comment:'';
        order.profile=user.profile;
        order.user=user._id;
        order.seller=global.get('store').val.seller._id;
        return this.sendOrder(user)
    }
    this.getShipInfo=function(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/order/modal/shipInfo.html',
                controller: shipInfoCtrl,
                controllerAs:'$ctrl',
                //size: 'lg',
                windowClass:'modalProject',
                //windowTopClass:'modalTopProject',
                backdropClass:'modalBackdropClass',
                //openedClass:'modalOpenedClass'
            });
            $rootScope.$emit('modalOpened')
            modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
        })
    }
    shipInfoCtrl.$inject=['$uibModalInstance','$rootScope']
    function shipInfoCtrl($uibModalInstance,$rootScope) {

        var self = this;
        $rootScope.$on('closeShipModal',function(){
            $uibModalInstance.close();
        })
        self.ok = function () {
            $uibModalInstance.close();
        }
        self.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }

    this.getCheckOutLiqpayHtml=function(order,invoice) {
        //console.log(order)
        return $q.when()
            .then(function () {
                if(invoice){
                    return $http.post('/api/orders/checkoutLiqpayInvoice',order)
                }else{
                    return $http.post('/api/orders/checkoutLiqpay',order)
                }

            })
            .then(function (res) {
                //console.log(res)
                if(!res || !res.data.html){
                    return;
                }
                order.checkOutLiqpayHtml=res.data.html
                order.checkOutLiqpayHtmlIs=true;
            })
            .then(function(res){
            })
            .catch(function(err){
                exception.catcher('error')(err);
            })


        /*LiqPayCheckout.init({
         data: "eyAidmVyc2lvbiIgOiAzLCAicHVibGljX2tleSIgOiAieW91cl9wdWJsaWNfa2V5IiwgImFjdGlv" +
         "biIgOiAicGF5IiwgImFtb3VudCIgOiAxLCAiY3VycmVuY3kiIDogIlVTRCIsICJkZXNjcmlwdGlv" +
         "biIgOiAiZGVzY3JpcHRpb24gdGV4dCIsICJvcmRlcl9pZCIgOiAib3JkZXJfaWRfMSIgfQ==",
         signature: "QvJD5u9Fg55PCx/Hdz6lzWtYwcI=",
         embedTo: "#liqpay_checkout",
         mode: "popup" // embed || popup
         }).on("liqpay.callback", function(data){
         console.log(data.status);
         console.log(data);
         }).on("liqpay.ready", function(data){
         // ready
         }).on("liqpay.close", function(data){
         // close
         });*/
    }


}])
.factory('localStorage', function(){
    var APP_ID =  'frame-local-storage';

    // api exposure
    return {
        // return item value
        getB: function(item){

            return JSON.parse(localStorage.getItem(item) || 'false');
        },
        // return item value
        getN: function(item){
            var i = localStorage.getItem(item);
            if (i!='undefined'){
                return JSON.parse(i)
            }
            else
                return '';
        },
        // return item value
        get: function(item){
            return JSON.parse(localStorage.getItem(item) || '[]');
        },
        set: function(item, value){
            // set item value
            localStorage.setItem(item, JSON.stringify(value));
        }

    };

})

'use strict';
(function(){

    angular.module('gmall.services')
        .service('Orders', orderService);

    orderService.$inject=['$resource','$uibModal','$q'];
    function orderService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Order/:_id',{_id:'@_id'});
        this.query=Items.query;
        this.get=Items.get;
        this.delete=Items.delete;
        this.save=Items.save;
        return {
            getList:getList,
            getItem:getItem,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                if(response && response.length){
                    response.forEach(function(o){
                        o.totalPay=(o.pay && o.pay.length)?o.pay.reduce(function(s,i){return s+=i.sum},0):0;
                    })
                }
                return response;
            }
            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(o) {
                //console.log(o)
                return o;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }

    }
})()


'use strict';
(function(){

    angular.module('gmall.services')
        .service('CartInOrder', cartInOrderService);

    cartInOrderService.$inject=['$resource','$uibModal','$q'];
    function cartInOrderService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/CartInOrder/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }

    }
})()


'use strict';
angular.module('gmall.controllers')
.controller('ordersCtrl',['$scope','Orders','global','$rootScope','$window','$timeout','$location','socket','$q','$user',function($scope,Orders,global,$rootScope,$window,$timeout,$location,socket,$q,$user){
    var self=this;
    $rootScope.ordersCtrl=self;
    self.paginate={page:0,rows:20,items:0}
    self.query={}
    var query=null;

    //var i=0;
    self.setUnReadChatMessages=function(){
        //console.log(i++)
        self.orders.forEach(function(order){
            var name='N-'+order.num;
            if(global.get('chatMessages').val[name]){
                console.log(global.get('chatMessages').val[name]);
                order.chatMessages=global.get('chatMessages').val[name].count;
            }else {
                order.chatMessages=null;
            }
        })
    }
    self.getList = function(page){
        if (page===0){
            self.paginate.page=page;
        }
        //console.log(page,rows)
        if(!global.get('user' ).val || !global.get('user' ).val._id)return;
        //console.log(global.get('user' ).val)
        if (global.get('seller' ) && global.get('seller' ).val){
            self.query['seller']=global.get('seller' ).val;
        }else{
            self.query['user']=global.get('user' ).val._id;
        }

        if (!self.query.num){
            self.query.date={$gte:new Date($scope.datePicker.date.startDate),$lte: new Date($scope.datePicker.date.endDate)};
        }
        if (Object.keys(self.query).length>1){
            //console.log(Object.keys(self.query).length)
            query={$and:[]}
            for(var key in self.query){
                var o={}
                o[key]=self.query[key];
                query.$and.push(o)
            }
        }else{
            query=self.query;
        }
        //console.log(query);
        Orders.getList(self.paginate,self.query )
            .then(function(){
                self.orders=res;
                self.query={}
                query=null;
                self.itemsCount=self.paginate.items;
                $timeout(
                    function() {
                        self.setUnReadChatMessages()
                    },100
                )
            })
            .then(function(){})
        /*Orders.list({perPage:rows , page:page,query:query},function(res){
            if (page==0 && res.length>0){
                self.paginate.totalItems=res.shift().index;
            }
            if(res.length==0){
                self.paginate.totalItems=0;
            }
            self.orders=res;
            self.query={}
            query=null;
            self.itemsCount=self.paginate.totalItems;
            //console.log(self.orders);
            // количество не прочитанных сообщений по ордерам
            //console.log('!')
            $timeout(
                function() {
                    self.setUnReadChatMessages()
                },100
            )

        })*/
    };
    socket.on('newMessage',function(){
        //console.log('newMessage')
        $timeout(
            function() {
                self.setUnReadChatMessages()
            },100
        )
    })
    self.reloadOrders = function(s){
        // do it after getiing list
        //self.query={};
        if(s){
            var a = parseInt(s.substring(0,30));
            if (typeof a==='number' && (a%1)===0){
                self.query['num']=a;
            }else{

                self.query['profile.fio']=s.substring(0,30);
                console.log(self.query['profile.fio'])
            }
        }
        self.getList(0);
    }
    self.deleteItem = function(item){
        if (confirm("Удалить?")){
            Orders.delete({id:item._id},function(err){
                if (err) console.log(err);
                self.getList(0);
            });
        }
    }
//***************************************************************************************************
    // установка диапазона дат для получения списка
    self.dt  = new Date();
    self.today = function(t) {
        if(t){return new Date(self.dt.setHours(0,0,0));}else {return new Date(self.dt.setHours(23,59,59));}
    };
    self.maxDate=self.today(true)
    var dtto = self.today();
    var dtfrom=self.today(true);
    dtfrom.setDate(dtfrom.getDate() - 30);
    self.dtto=dtto;
    self.dtfrom=dtfrom;

    var now = new Date();
    var yesterday=new Date(new Date(self.today(true)).setDate(now.getDate() - 1));

    var nextWeek = new Date(new Date(self.today(true)).setDate(now.getDate() - 7));
    var nextMonth = new Date(new Date(self.today(true)).setMonth(now.getMonth() - 1));
    var y = dtto.getFullYear(), m = dtto.getMonth();
    var thisMonth = new Date(y, m, 1);
    var last30day = new Date(new Date(self.today(true)).setDate(now.getDate() - 30));

    $scope.datePicker={};
    self.options={
        "ranges": {
            "сегодня": [
                self.today(true),
                dtto
            ],
            "вчера": [
                yesterday,
                self.today(true)
            ],
            "последние 7 дней": [
                nextWeek,
                dtto
            ],
            "последние 30 дней": [
                last30day,
                dtto
            ],
            "текущий месяц": [
                thisMonth,
                dtto
            ],
            "прошлый месяц": [
                nextMonth,
                dtto
            ]
        },
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Выбрать",
            fromLabel: "от",
            toLabel: "до",
            cancelLabel: 'Отменить',
            customRangeLabel: 'прозвольный диапазон',
            format:"DD MMMM YYYY",
            daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
            firstDay: 1,
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'
            ]
        }
    }
    $scope.datePicker.date = {
        startDate: dtfrom,
        endDate: dtto
    };
    moment.locale("ru");
    $scope.moment=moment;

    //**********************************************************************************************
    //*********************************************************************************************

    // boots controller
    self.getList(self.paginate.page,self.paginate.rows);
    self.deleteOrder=function(order){
        if (confirm("Удалить?")){
            order.$delete(function(err){
                if (err) console.log(err);
                self.getList(0);
            });
        }
    }
    self.newOrder=function(){
        $q.when()
            .then(function(){
                return $user.selectItem()
            })
            .then(function(user){
                console.log(user)
                return self.Items.save(self.stuff ).$promise;
            })
            .catch(function(err){
                err = err.data||err
                if(err){
                    exception.catcher('создание ордера')(err)
                }
            })

        /*User.getUser().then(function(user){
            console.log(user)
        })*/
    }

    // выбор ордера
    self.pickOrder = function(id){
        if($rootScope.$stateParams.order!=id){
            $location.search('order',id);
            $rootScope.$stateParams.order=id;
        }
        self.orderId=id;

    }
    if($rootScope.$stateParams.order){
        self.pickOrder($rootScope.$stateParams.order);
    }

}])
.controller('orderCtrl',['$scope','$rootScope','Orders','Stuff','$order','global','$anchorScroll','Helper','CreateContent','$window','$email','$notification','toaster','$q','$http','$location',function($scope,$rootScope,Orders,Stuff,$order,global,$anchorScroll,Helper,CreateContent,$window,$email,$notification,toaster,$q,$http,$location){
    $anchorScroll();
    $scope.orderEditCtrl=this;
    $scope.orderEditCtrl.mobile=global.get('mobile' ).val;
    $scope.moment=moment;
    $scope.global=global;
    $rootScope.orderEditCtrl=$scope.orderEditCtrl;
    $scope.orderEditCtrl.stuff='';
    $scope.orderEditCtrl.statusArray=[{status:'поступил',value:1},{status:'принят',value:2},{status:'оплачен',value:3},{status:'доставлен',value:5}]
    var $stateParams= $rootScope.$stateParams;
    var $state= $rootScope.$state;
   // console.log($state.current.name)
    $scope.orderEditCtrl.order=null;
    $scope.orderEditCtrl.participant=(global.get('seller').val)?'seller':'user';

    $scope.orderEditCtrl.orderId=null;
    $scope.orderEditCtrl.loadOrder = function(){
        $order.init('order',$scope.orderEditCtrl.orderId).then(function(order){
            $scope.orderEditCtrl.order=order;
            $scope.orderEditCtrl.status=$scope.orderEditCtrl.statusArray.getObjectFromArray('value',order.status);
            //console.log($scope.orderEditCtrl.order)
            // список для выбора товаров для доставки
            $scope.orderEditCtrl.listStuffForShip=order.cart.stuffs.map(function(s){
                return  s.name+' '+s.artikul+' '+s.addCriterionName;
            })

            $scope.orderEditCtrl.currencyArray = Object.keys(order.currencyStore).map(function(k) { return order.currencyStore[k] });
            $scope.orderEditCtrl.currency=order.currencyStore[order.currency]
            // список доступных купонов, если купон не был установлне в корзине
            if (!$scope.orderEditCtrl.order.coupon){
                $http({
                    method: 'GET',
                    url: '/api/getCouponsForOrder/'+$scope.orderEditCtrl.order._id
                }).then(function successCallback(data) {
                    //console.log(data)
                    $scope.orderEditCtrl.coupons=data.data;
                }, function errorCallback(response) {
                });
            }
            //$scope.$broadcast('loadOrder')
        });
    }



    // купон в ордере может быть только удален. или добавлен из списка купонов пользователя
    $scope.orderEditCtrl.removeItem=function(i){
        $order.removeItem(i);
    }
    $scope.orderEditCtrl.updateOrder=function(dontUpdate){
        $location.search('order',null);
        $rootScope.$stateParams.id=null;
        if ($scope.$parent.$parent.ordersCtrl && $scope.$parent.$parent.ordersCtrl.setUnReadChatMessages){
            console.log($scope.$parent.$parent.ordersCtrl)
            $scope.$parent.$parent.ordersCtrl.setUnReadChatMessages()
        }
        if (dontUpdate){
            return $scope.orderEditCtrl.orderId=null;
        }
        Orders.save($scope.orderEditCtrl.order).$promise.then(function(res){
            $scope.$parent.ordersCtrl.reloadOrders();
            $scope.orderEditCtrl.orderId=null;
        },function(){
            $scope.orderEditCtrl.orderId=null;
        });
    }
    //******************************************************************
    //****************** добавление товара******************************
    //******************************************************************
    $scope.orderEditCtrl.selectStuff = function(stuff){
        $order.addItemToCart(stuff)
    }
    $scope.orderEditCtrl.refresStuffs = function(search) {
        //console.log(search)
        if (search && search.length && search.length>2){
            Stuff.getList(null,search.substring(0,30),0,30,'fullListForAddToCart').then(function(res){
                if(res){
                    res.forEach(function(el){
                        var _sp;
                        if (global.getSticker){
                            _sp=global.getSticker(el,true);
                        }
                        if (_sp && _sp.sticker){
                            el.sticker=_sp.sticker;
                        } else {
                            el.sticker = _sp;
                        }
                    })
                    $scope.orderEditCtrl.stuffs=res
                    //console.log(res)
                    //res.forEach(function(el){$scope.orderEditCtrl.stuffs.push(el)})
                }else{
                    $scope.orderEditCtrl.stuffs=[]
                }
            })
        }
    }



    //************************************* helper**********************
    Helper.getItem($state.current.name,function(res){
        if(res.popover){
            $scope.orderEditCtrl.popover=res.popover;
        }
        if(res.intro){
            $scope.orderEditCtrl.intro=res.intro;
        }
        $scope.IntroOptions = {
            steps:[
                {
                    element: document.querySelector('#step1'),
                    intro:$scope.orderEditCtrl.intro[1]
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "<strong>You</strong> can also <em>include</em> HTML",
                    //position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'More features, more fun.',
                   // position: 'left'
                },
                {
                    element: '#step4',
                    intro: "Another step.",
                    //position: 'bottom'
                },
                {
                    element: '#step5',
                    intro: 'Get it, use it.'
                }
            ],
            showStepNumbers: false,
            showBullets: false,
            exitOnOverlayClick: true,
            exitOnEsc:true,
            nextLabel: '<strong>еще</strong>',
            prevLabel: '<span style="color:green">назад</span>',
            skipLabel: 'Выход',
            doneLabel: 'Thanks'
        };

    })

    //******************************************************************
    //****************** общие методы **********************************
    //******************************************************************

    $scope.orderEditCtrl.getNow=function(){
        return Date.now();
    }
    var getCategoryNameUrl = function(id){
        //console.log(id)
        if (!id || id=='category') return {name:'category',url:'id'};
        for (var i= 0,l=global.get('categories').val.length;i<l;i++){
            if (global.get('categories').val[i]._id==id){
                var s= global.get('categories').val[i].name.replace(/(["'\/\s])/g, "-");
                return {name:s,url:global.get('categories').val[i].url,groupUrl:global.get('categories').val[i].group.url} ;
                break;
            }
        }
    }
    $scope.orderEditCtrl.goToStuff = function(stuff){
            //console.log(global.get('categories').val);
        if (!stuff) return;
        var category = (stuff.category && stuff.category._id)?stuff.category._id:stuff.category;
        var brand = (stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
        var categoryNameUrl=getCategoryNameUrl(category);
        var stuffUrl = (stuff.url)?stuff.url:stuff.stuffUrl;
        var obj = {
            groupUrl:categoryNameUrl.groupUrl,
            categoryName:categoryNameUrl.name.replaceBlanks(),
            categoryUrl:categoryNameUrl.url,
            stuffUrl:stuffUrl
        }
        var url ='/'+obj.groupUrl+'/'+obj.categoryName+'/'+obj.categoryUrl+'/'+obj.stuffUrl;
        if (stuff.addCriterionToCart && stuff.addCriterionToCart.length){
            obj.param1=stuff.addCriterionToCart[0];
            url+='?param1='+obj.param1;
            if(stuff.addCriterionToCart.length==2){
                obj.param2=stuff.addCriterionToCart[1];
                url+='&param2='+obj.param1;
            }
        }
        $window.location.href=url;

    }

    $scope.orderEditCtrl.datePickerOptions ={
        
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Выбрать",
            fromLabel: "от",
            toLabel: "до",
            cancelLabel: 'Отменить',
            customRangeLabel: 'Прозвольный диапазон',
            format:"DD-MMMM-YYYY",
            daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
            firstDay: 1,
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'
            ]
        },
    singleDatePicker: true
    }

    //******************************************************************
    //****************** вспомогательные фунуции************************
    //******************************************************************
//********************************отправка письма
    var sendMail = function(dataEmail,cb){
        //console.log(dataEmail)
        var deferred=$q.defer();
        var domain=$scope.orderEditCtrl.order.domain;
        var o={email:dataEmail.email,content:dataEmail.content,subject:dataEmail.subject+' ✔',from:domain+  '<'+dataEmail.addSubject+'@madaland.biz>'};
        $email.save(o,function(res){
            deferred.resolve();
        },function(err){
            deferred.reject();
        })
        return deferred.promise;
    }
    //********************************отправка push notification
    var pushNotification=function(note,cb){
        $notification.save(note,function(res){
            cb();
        },function(err){
            //console.log(err)
            cb(err)
        })
    }
    //********************* показ тостера
    function showToaster(type,title,content){
        toaster.pop({
            type: type,
            title: title,
            body: content,
            bodyOutputType: 'trustedHtml',
            showCloseButton: true,
            delay:15000,
            closeHtml: '<button>Close</button>'
        });
    }
    //****************************** обновление свойства ордера
    var updateOrderField=function(){
        var deferred=$q.defer();
        var fieldList='';
        //console.log(arguments);
        var order =$scope.orderEditCtrl.order;
        var o={ _id:$scope.orderEditCtrl.order._id,seller:$scope.orderEditCtrl.order.seller}
        Array.prototype.forEach.call(arguments,function(field){
            //console.log(field)
            o[field]=$scope.orderEditCtrl.order[field];
            if(fieldList){fieldList+=' '};
            fieldList+=field;
        })
        //console.log(fieldList)
        Orders.save({update:fieldList},o,function(){
            deferred.resolve();
        },function(err){
            deferred.reject();
        });
        return deferred.promise;
    }
    //*************************************************************
    //******************************************************************
    //****************** управление ордером*****************************
    //******************************************************************
    $scope.orderEditCtrl.changeCurrency=function(){
        $scope.orderEditCtrl.order.currency=$scope.orderEditCtrl.currency[1];
        $scope.orderEditCtrl.order.kurs=$scope.orderEditCtrl.currency[0];
        $scope.orderEditCtrl.updateOrderField('currency','kurs')
        /*updateOrderField('currency','kurs' ).then(function(){
            showToaster('note','Сохренено','информация обновлена')
        },function(){
            showToaster('error','Ошибка','не удалось сохранить')
        });*/


    }
    //********************************************************************
    //********************************************************************
    $scope.orderEditCtrl.updateOrderField=function(){
        updateOrderField.apply(updateOrderField,arguments).then(function(){
            showToaster('note','Сохренено','информация обновлена')
        },function(){
            showToaster('error','Ошибка','не удалось сохранить')
        });
    }

    function displayContentInPopUpWin(c){
        var popupWin=window.open();
        popupWin.window.focus();
        popupWin.document.write(c);
    }
    $scope.orderEditCtrl.printShip=function(){
        displayContentInPopUpWin(CreateContent.orderShipInfo($scope.orderEditCtrl.order));
    }
    $scope.orderEditCtrl.printOrder=function(){
        displayContentInPopUpWin(CreateContent.order($scope.orderEditCtrl.order));
    }
    $scope.orderEditCtrl.printInvoice=function(){
        displayContentInPopUpWin(CreateContent.order($scope.orderEditCtrl.order,'invoice'));
    }






    $scope.orderEditCtrl.sendNotification=function(type,obj,addressee){
        if (!addressee){addressee='seller'}else{addressee=$scope.orderEditCtrl.order.user._id||$scope.orderEditCtrl.order.user}
        var o={addressee:addressee,type:type,content:''};
        o.seller=$scope.orderEditCtrl.order.seller._id;
        //if (user=='seller'){o.seller=$scope.orderEditCtrl.order.seller._id}
        // console.log(user,o)
        //**************** формирование контента
        var dataEmail={content:''};
        var noteContent;
        var notification='send'
        if (type=='pay'){
            updateOrderField('pay')
            o.content=CreateContent.payInfo($scope.orderEditCtrl.order,obj);
            noteContent='уведомление об оплате отправлено'
        }else if(type=='shipDetail'){
            updateOrderField('shipDetail')
            o.content=CreateContent.shipInfo($scope.orderEditCtrl.order,obj);
            noteContent='уведомление о доставке отправлено'
        }else if(type=='invoice'){
            $scope.orderEditCtrl.order.invoice=Date.now();
            updateOrderField('ivoice')
            noteContent='счет отправлен на email.'
            o.content=CreateContent.invoiceInfo($scope.orderEditCtrl.order);
            dataEmail.content=CreateContent.order($scope.orderEditCtrl.order,'invoice')
            dataEmail.subject='счет';
            dataEmail.addSubject='invoice';
            dataEmail.email=$scope.orderEditCtrl.order.user.email;
        }else if(type=='accepted'){
            $scope.orderEditCtrl.order.date2=Date.now();
            updateOrderField('date2')
            dataEmail.content=CreateContent.acceptedInfo($scope.orderEditCtrl.order);
            o.content=dataEmail.content;
            noteContent='уведомление и письмо отправлены';
            dataEmail.subject='заказ принят';
            dataEmail.addSubject='accepted';
            dataEmail.email=$scope.orderEditCtrl.order.user.email;
        }else if(type=='shipOrder'){
            notification=null;
            updateOrderField('shipDetail');
            dataEmail.content=CreateContent.orderShipInfo($scope.orderEditCtrl.order);
            noteContent='информация о доставке отправлена на email.'
            dataEmail.subject='информация о доставке';
            dataEmail.addSubject='shipDetail';
            dataEmail.email=$scope.orderEditCtrl.order.user.email;
        }
        o.order=$scope.orderEditCtrl.order._id;
        $q.when((dataEmail.content)?sendMail(dataEmail):'note').then(function (res) {
            // показ уведомления
            var defer=$q.defer();
            //console.log(res)
            var title;
            //console.log(notification)
            if (notification=='send'){
                title='Отправлено уведомление';
                pushNotification(o,function(err){
                    if (!err){
                        defer.resolve(title)
                    }else{
                        defer.reject(err)
                    }
                });
            }else{
                title='Отправлено письмо';
                defer.resolve(title)
            }
            return defer.promise;
        },function(){
            showToaster('error','Ошибка','не удалось отправить письмо')
        }).then(function(title){
            showToaster('note',title, noteContent);
        },function(){
            showToaster('error','Ошибка','не удалось отаправить уведомление')
        })



    }
    $scope.orderEditCtrl.deleteCoupon = function(){
        $http({
            method: 'GET',
            url: '/api/deleteCouponFromOrder/'+$scope.orderEditCtrl.order._id
        }).then(function successCallback(data) {
            $scope.orderEditCtrl.order.coupon=null;
            updateOrderField('coupon');
            $scope.orderEditCtrl.coupons=data.data;
        }, function errorCallback(response) {
            showToaster('error','Ошибка','не удалось удалить купон')
        });
    }
    $scope.orderEditCtrl.setCoupon=function(){
        //updateOrderField('coupon');
        $http({
            method: 'POST',
            url: '/api/setCouponToOrder',
            data: {
                order:$scope.orderEditCtrl.order._id,
                coupon:$scope.orderEditCtrl.order.coupon._id,
                user:$scope.orderEditCtrl.order.user._id
            }
        }).then(function successCallback() {
            $scope.orderEditCtrl.coupons=null;
        }, function errorCallback(response) {
            showToaster('error','Ошибка','не удалось установить купон')
        });

    }


}])/*orders.detailCtrl*/


'use strict';
(function(){

    angular.module('gmall.services')
        .directive('ordersList',ordersListDirective)
        .directive('emptyList',['$timeout',function($timeout){
            return {
                restrict:'E',
                scope:{
                    items:"=items",
                    message:'@'
                },
                template:'<div ng-if="show" class="text-center">' +
                '<h3 ng-bind="message"></h3></div>',
                link:function(scope, element){
                    scope.$watch('items',function(n,o){
                        if(n===0){
                            scope.show=true;
                        }else{
                            scope.show=false;
                        }
                    })
                }
            }
        }])
    function ordersListDirective(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: orderListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/order/orders-list.html',
        }
    }
    orderListCtrl.$inject=['Orders','global','$rootScope','$window','$timeout','$location','socket','$q','$user','exception','Confirm','$dialogs','CartInOrder'];
    function orderListCtrl(Orders,global,$rootScope,$window,$timeout,$location,socket,$q,$user,exception,Confirm,$dialogs,CartInOrder){
        var self=this;
        self.global=global;
        self.mobile=global.get('mobile').val
        $rootScope.ordersCtrl=self;
        self.$state=$rootScope.$state;
        self.paginate={page:0,rows:20,items:0}
        self.query={}
        var query=null,newId;
        self.listOfActions={
            delete:'удаление'
        }
        self.action1=null;
        //********** methods**********
        //self.setUnReadChatMessages=setUnReadChatMessages;
        self.getList=getList;
        self.reloadOrders=reloadOrders;
        self.deleteItem=deleteItem;
        self.newOrder=newOrder;
        self.getUnReadChatMessages=getUnReadChatMessages;
        self.searchItem=searchItem;
        self.filterOrderList=filterOrderList;
        self.markAllStuffs=markAllStuffs;
        self.changeAction=changeAction;
        self.changeRows=changeRows;
        //*************watchers**********************************
        function changeRows(rows) {
            if(self.paginate.rows!=rows){
                self.paginate.rows=rows;
                self.paginate.page=0;
                self.paginate.items=0;
                getList(0);
            }
        }
        function markAllStuffs(m){
            self.orders.forEach(function(el){
                el.select=m;
            })
        }
        function changeAction() {
            Confirm(self.action+'?')
                .then(function () {
                    if(!self.action){return}
                    var a=angular.copy(self.action);
                    self.action=null;
                    self.mark=false;
                    switch (a) {
                        case 'delete':
                            return deleteOrders()
                            break;

                    }
                }).catch(function () {self.action=null;})


        }

        function deleteOrders(){
            Confirm('потверждаете?').then(function () {
                var ids=self.orders.filter(function(el){return el.select}).map(function(el){return el._id}).join('_')
                var idsInnerCart=self.orders.filter(function(el){return el.select}).map(function(el){return el.cart}).join('_')
                $q.when()
                    .then(function () {
                        return Orders.delete({ids:ids}).$promise.then(function(){
                            global.set('saving',true);
                            getList()
                            $timeout(function(){
                                global.set('saving',false);
                            },1500)},function(err){console.log(err)});
                    })
                    .then(function () {
                        return CartInOrder.delete({ids:idsInnerCart}).$promise.then(function(){},function(err){console.log(err)});
                    })


            })
                .catch(function () {self.action=null;})

        }
        socket.on('newMessage',function(){
            //console.log('newMessage')
            /*$timeout(
                function() {
                    setUnReadChatMessages()
                },100
            )*/
        })
        // установка диапазона дат для получения списка
        self.dt  = new Date();
        self.today = function(t) {
            if(t){return new Date(self.dt.setHours(0,0,0));}else {return new Date(self.dt.setHours(23,59,59));}
        };
        self.maxDate=self.today(true)
        var dtto = self.today();
        var dtfrom=self.today(true);
        dtfrom.setDate(dtfrom.getDate() - 30);
        self.dtto=dtto;
        self.dtfrom=dtfrom;
        var now = new Date();
        var yesterday=new Date(new Date(self.today(true)).setDate(now.getDate() - 1));
        var nextWeek = new Date(new Date(self.today(true)).setDate(now.getDate() - 7));
        var nextMonth = new Date(new Date(self.today(true)).setMonth(now.getMonth() - 1));
        var y = dtto.getFullYear(), m = dtto.getMonth();
        var thisMonth = new Date(y, m, 1);
        var last30day = new Date(new Date(self.today(true)).setDate(now.getDate() - 30));

        self.datePicker={};
        self.options={
            "ranges": {
                "сегодня": [
                    self.today(true),
                    dtto
                ],
                "вчера": [
                    yesterday,
                    self.today(true)
                ],
                "последние 7 дней": [
                    nextWeek,
                    dtto
                ],
                "последние 30 дней": [
                    last30day,
                    dtto
                ],
                "текущий месяц": [
                    thisMonth,
                    dtto
                ],
                "прошлый месяц": [
                    nextMonth,
                    dtto
                ]
            },
            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'прозвольный диапазон',
                format:"DD.MM.YY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            }
        }
        self.datePicker.date = {
            startDate: dtfrom,
            endDate: dtto
        };
        moment.locale("ru");
        self.moment=moment;

        //**********************************************************************************************
        //*********************************************************************************************

        //********************activate***************************
        if(global.get('user').val){
            activate()
        } else{
            $rootScope.$on('logged',function(){
                activate()
            })
        }
        //*******************************************************
        //console.log(global.get('campaign').val)
        function activate(){
            self.participant=(global.get('seller').val)?'seller':'user';
            //console.log(self.participant)
            if (self.participant=='seller'){
                socket.on('userStatus',function(data){
                    self.orders.forEach(function(o){
                        if(o.user==data.user){
                            o.online=data.status;
                        }
                    })

                })
                socket.on('newNotification',function(data){
                    //console.log('newNotification',data)
                    if(data && data.type=='order'){
                        self.getList(0);
                    }
                })
            }else {
                socket.on('sellerStatus',function(data){
                    if(!self.orders ||  !self.orders.length){return}
                    self.orders.forEach(function(o){
                        o.online=data.status;
                    })
                })
            }
            return self.getList(0);
        }
        $rootScope.$on('reloadOrderList',function(){
            getList(self.paginate.page)
        })
        function getList(page){
            if (page===0){
                self.paginate.page=page;
            }
            //console.log(page,rows)
            if(!global.get('user' ).val || !global.get('user' ).val._id){
                setTimeout(function(){
                    getList(page)
                },1500)
                return;
            };
            //console.log(global.get('user' ).val)
            if (!global.get('seller' ) || !global.get('seller' ).val){
                self.query['user']=global.get('user' ).val._id;
            }
            //console.log(self.query)
            if (!self.query.num){
                self.query.date={$gte:new Date(self.datePicker.date.startDate),$lte: new Date(self.datePicker.date.endDate)};
            }
            if (Object.keys(self.query).length>1){
                //console.log(Object.keys(self.query).length)
                query={$and:[]}
                for(var key in self.query){
                    var o={}
                    o[key]=self.query[key];
                    query.$and.push(o)
                }
            }else{
                query=self.query;
            }
            //console.log(query);
            Orders.getList(self.paginate,self.query )
                .then(function(res){
                    self.orders=res;
                    //self.query={}
                    query=null;
                    self.itemsCount=self.paginate.items;
                    /*$timeout(
                        function() {
                            self.setUnReadChatMessages()
                        },100
                    )*/
                    //console.log(self.participant)
                    self.orders.forEach(function(o){
                        if (self.participant=='seller'){
                            socket.emit('getUserStatus',{user:o.user})
                        }else {
                            socket.emit('getSellerStatus',{seller:o.seller})
                        }
                    })
                })
                .then(function(){})
        };
        function reloadOrders(s){
            // do it after getiing list
            self.query={};
            if(s){
                var a = parseInt(s.substring(0,30));
                if (typeof a==='number' && (a%1)===0){
                    self.query['num']=a;
                }else{
                    self.query['profile.fio']=s.substring(0,30);
                    console.log(self.query['profile.fio'])
                }
            }
            self.getList(0);
        }
        function deleteItem(item,e){
            e.stopPropagation();
            if(!global.get('seller').val){
                Confirm("удалить???" )
                    .then(function(){
                        item.status=6;
                        return Orders.save({update:'status'},{_id:item._id,status:item.status}).$promise;
                    })
                    .then(function () {
                        return self.getList(0);
                    })
            }else{
                //console.log(item);return
                Confirm("удалить???" )
                    .then(function(){
                        var dialog={
                            seller:item.seller,
                            user:item.user,
                            order: item._id
                        };
                       // console.log(dialog)
                        return $dialogs.query({query:dialog} ).$promise
                    } )
                    .then(function(dialogs){
                        if (dialogs && dialogs[0] && dialogs[0].index){
                            return $dialogs.delete({id:dialogs[1]._id} ).$promise
                        }

                    } )
                    .then(function(){
                        return Orders.delete({_id:item._id}).$promise;
                    } )
                    .then(function(){
                        return self.getList(0);
                    })
                    /*.then(function(){
                        return $http.get(socketHost+'/api/deleteDialog/')
                    })*/
                    .catch(function(err){
                        err = (err &&err.data)||err
                        if(err){
                            exception.catcher('удаление ордера')(err)
                        }
                    })
            }
        }
        function newOrder(){
            $q.when()
                .then(function(){
                    //return $user.selectItem()
                    return $user.selectOrCreat()

                })
                .then(function(user){
                    //console.log(user)
                    if(!user.profile){
                        user.profile={
                            phone:user.phone,
                            fio:user.name,
                        }
                    }

                    var order={
                        cart:{stuffs:[]},
                        kurs:1,
                        currency:'UAH',
                        profile:user.profile,
                        seller:global.get('store').val.seller._id,
                        currencyStore:global.get('store' ).val.currency,
                        opt:global.get('store' ).val.seller.opt,
                        campaign:(global.get('campaign').val)?global.get('campaign').val.map(function (el) {
                            return el._id
                        }):null
                    }
                    //console.log(order)
                    if(user.type=='user'){
                        order.user=user._id;
                    }else if(user.type=='userEntry'){
                        order.userEntry=user._id;
                    }
                    //throw 'test'
                    return Orders.save(order).$promise;
                })
                .then(function(res){
                    newId=res.id;
                    return activate()

                })
                .then(function(){
                    self.$state.go('frame.orders.order',{id:newId})
                })
                .catch(function(err){
                    if(!err){return}
                    err = err.data||err
                    if(err){
                        exception.catcher('создание ордера')(err)
                    }
                })
        }
        function getUnReadChatMessages(order){
            if(!global.get('dialogs' ).val || !global.get('dialogs' ).val.length){return;}
            //console.log(dialog)
            var d =global.get('dialogs' ).val.getOFA('order',order._id);
            if(d){return d.count}
            /*for(var i=0,l=global.get('dialogs' ).val.length;i<l;i++){
                console.log(order._id)
                if (global.get('dialogs' ).val[i].order==order._id){
                    return global.get('dialogs').val[i].count;
                }
            }*/
        }
        function searchItem(searchStr){
            console.log(searchStr)
            self.query={}
            if(!searchStr){
                return getList(0);
            }
            var n = Number(searchStr);
            console.log(n)
            if(n){
                self.query.num=n;
            }else{
                var s= searchStr.substring(0,20)
                self.query['profile.fio']=s;
            }

            getList(0);
            //console.log(n)
            /*self.query={num:self.searchStr};
            */

        }
        function filterOrderList(item) {
            //console.log(item.status)
            if(!global.get('seller').val){
                return item.status!=6;
            }else{
                return true;
            }


        }



//***************************************************************************************************
    }
})()

'use strict';
(function(){
    angular.module('gmall.services')
        .directive('ordersItem',ordersItemDirective);
    function ordersItemDirective(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: orderItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/order/order-item.html',
        }
    }
    orderItemCtrl.$inject=['$rootScope','Orders','Stuff','$order','global','$anchorScroll','Helper','CreateContent','$window','$email','$notification','toaster','$q','$http','$location','exception','Confirm','CartInOrder','$user','$timeout','$dialogs','Seller','ExternalCatalog','$uibModal','FilterTags','Filters'];
    function orderItemCtrl($rootScope,Orders,Stuff,$order,global,$anchorScroll,Helper,CreateContent,$window,$email,$notification,toaster,$q,$http,$location,exception,Confirm,CartInOrder,$user,$timeout,$dialogs,Seller,ExternalCatalog,$uibModal,FilterTags,Filters){
        var self=this;
        if($rootScope.$stateParams.block){
            self.block=$rootScope.$stateParams.block
        }else{
            self.block='delivery';
        }
        //console.log(self.block)
        self.mobile=global.get('mobile' ).val;
        self.moment=moment;
        self.global=global;
        $rootScope.orderEditCtrl=self;
        self.statusArray=[{status:'поступил',value:1},
            {status:'принят',value:2},
            {status:'оплачен',value:3},
            {status:'отправлен',value:4},
            {status:'доставлен',value:5},
            {status:'удален',value:6}]
        var $stateParams= $rootScope.$stateParams;
        var $state= $rootScope.$state;
        self.stuff='';
        self.order=null;
        var reload=false;
        $rootScope.$on('logged',function(){
            //console.log('logged')
            self.participant=(global.get('seller').val)?'seller':'user';
        })
        self.participant=(global.get('seller').val)?'seller':'user';
        //*********** properties******

        //********** methods**********
        self.addStuffInOrder=addStuffInOrder;
        self.startChat=startChat;
        self.setStuffListForShip=setStuffListForShip;

        //*************shipdtail**********************************
        self.addStuffInShipDetail=addStuffInShipDetail;
        self.removeStuffFromShipDetail=removeStuffFromShipDetail;
        self.deleteShip=deleteShip;
        self.deletePay=deletePay;
        self.getExtCatalog=getExtCatalog;
        self.changeStatus=changeStatus;
        self.setNewPriceForStuff=setNewPriceForStuff;
        self.enableAddStussInShipDetail=enableAddStussInShipDetail;
        self.addStuffToShipDetail=addStuffToShipDetail;
        self.decreaseQty=decreaseQty;
        self.increaseQty=increaseQty;
        self.getFilterName=getFilterName;
        self.backState=backState;
        self.decreaseDiscount=decreaseDiscount
        self.increaseDiscount=increaseDiscount
        self.getShipDetailQty=getShipDetailQty
        self.createNewOrder=createNewOrder;
        self.addStuffToExistOrder=addStuffToExistOrder;
        self.updateDiscount=updateDiscount;

        //**********************************************************************************************
        //*********************************************************************************************

        //********************activate***************************
        activate();
        //*******************************************************
        function activate(){

            $anchorScroll();
            $q.when()
                .then(function(){
                    if(global.get('masters')){
                        return global.get('masters').val
                    }else{
                        return []
                    }
                })
                .then(function(data){
                    self.masters=data;
                    //console.log(self.masters)
                })
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(res){
                    self.filterTags=res;
                    return Filters.getFilters()
                })
                .then(function(res){
                    self.filters=res;
                    return ExternalCatalog.getItems()
                })
                .then(function(extCatalogs) {
                    //console.log(extCatalogs)
                    self.extCatalogs=extCatalogs;
                    $order.init('order',$stateParams.id).then(function(order){
                        //console.log(order.cart.stuffs)
                        order.sortCart();
                        self.order=order;
                        self.orderForChat={_id:order._id,num:order.num}
                        self.status=self.statusArray.getObjectFromArray('value',order.status);
                        // список для выбора товаров для доставки
                        /*self.listStuffForShip=order.cart.stuffs.map(function(s){
                         return  s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
                         })*/
                        setStuffListForShip();

                        self.currencyArray = Object.keys(order.currencyStore).map(function(k) { return order.currencyStore[k] });
                        self.currency=order.currencyStore[order.currency]


                        //chat
                        //console.log(self.participant)
                        $q.when()
                        /*.then(function(){
                         return $user.getItem(order.user,'order')
                         })*/ // получение user
                            .then(function(user){
                                //order.user=user;
                                // купон
                                if(global.get('coupons').val && global.get('coupons').val[0] && (!order.coupon || !order.coupon._id)){
                                    if(order.user.coupons.indexOf(global.get('coupons').val[0]._id)<0){
                                        self.coupon=global.get('coupons').val[0]
                                    }else if(global.get('coupons').val[1] && order.user.coupons.indexOf(global.get('coupons').val[1]._id)<0){
                                        self.coupon=global.get('coupons').val[1]
                                    }
                                }
                            })
                            /*.then(function(){
                             return Seller.getItem(order.seller,'order')
                             }) // получение seller
                             .then(function(seller){
                             console.log(seller)
                             order.seller=seller;
                             })*/ // получение seller
                            .then(function(){
                                self.dialog={
                                    seller:self.order.seller._id,
                                    user:self.order.user._id,
                                    order: self.order._id
                                };
                                return $dialogs.query({query:self.dialog} ).$promise
                            })
                            .then(function(res){
                                self.dialog.sellerName=self.order.seller.name;
                                self.dialog.userName=self.order.user.name;
                                self.dialog.orderNum=self.order.num;
                                if (res && res[0] && res[0].index){
                                    return res[1]._id;
                                }else {
                                    return null;
                                }
                            })
                            .then(function(id){
                                if (id){
                                    self.dialog._id=id;
                                }else{
                                    self.buttonStartDialog=true;
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        //console.log(self.coupon)
                        //self.$broadcast('loadOrder')
                    },function(err){
                        $dialogs.query({query:{order:$stateParams.id}},function(res){
                            if(res && res[0].index){
                                for(var i=1;i<res.length;i++){
                                    if(res[i]._id){
                                        $dialogs.delete({id:res[i]._id} )
                                    }

                                }
                            }
                        })
                        $rootScope.$state.go('frame.404')
                    });
                })


        }
        function backState(){
            $rootScope.$state.go('frame.orders',$rootScope.$stateParams,{reload:reload})

        }
        function getExtCatalog(i){
            if(i==0 && self.order.cart.stuffs[i].extCatalog){
                return self.extCatalogs.find(function(c){return c._id==self.order.cart.stuffs[i].extCatalog})
            }else if(self.order.cart.stuffs[i].extCatalog && self.order.cart.stuffs[i-1].extCatalog!=self.order.cart.stuffs[i].extCatalog){
                return self.extCatalogs.find(function(c){return c._id==self.order.cart.stuffs[i].extCatalog})
            }
        }
        function addStuffInOrder(){
            $q.when()
                .then(function(){
                    return Stuff.selectItemWithSort()
                })
                .then(function(stuff){
                    //console.log(stuff)
                    $order.addItemToCart(stuff);
                })
                .then(function(stuff){
                    setStuffListForShip()
                    //return saveCartInOrder();
                })
                .then(function(){
                    showToaster('note','Сохренено','информация обновлена')
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('обновление данных')(err)
                    }

                })
        }
        function saveCartInOrder(){
            var o=angular.copy($order.getOrder().cart);
            o.order=self.order._id;
            setStuffListForShip()
            return CartInOrder.save(o).$promise
        }

        function decreaseQty(i){
            if(self.order.cart.stuffs[i].quantity==1){return}
            reload=true;
            $order.decreaseQty(i)
            var s = self.order.cart.stuffs[i]
            var n = s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
            removeItemFromShip(self.order.shipDetail,n)
            updateOrderField('shipDetail');
            setStuffListForShip();
        }
        function removeItemFromShip(ship,n,all){
            var done=false
            for(var i=0;i<ship.length&&!done;i++){
                for(var j=0;j<ship[i].stuffs.length;j++){
                    if(n==ship[i].stuffs[j].name){
                        ship[i].stuffs[j].qty--;
                        if(!ship[i].stuffs[j].qty || all){
                            ship[i].stuffs.splice(j,1)
                        }
                        done=true;
                        break;
                    }
                }
            }
        }
        function increaseQty(i){
            reload=true;
            $order.increaseQty(i)
            setStuffListForShip();
        }
        function increaseDiscount(){
            if(self.order.discount.value<1000){
                self.order.discount.value++
            }
        }
        function decreaseDiscount(){
            if(self.order.discount.value>0){
                self.order.discount.value--
            }
        }
        function getFilterName(tag){
            if(!self.filterTags || !self.filters){return}
            //console.log(tag)
            var t = self.filterTags.getOFA('_id',tag)
            if(t && t.filter){
                var f = self.filters.getOFA('_id',t.filter)
                if(f){return f.name}else{
                    return ''
                }
            }else{return ''}
        }
        // купон в ордере может быть только удален. или добавлен из списка купонов пользователя
        self.removeItem=function(i){
            reload=true;
            var s = self.order.cart.stuffs[i]
            var n = s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
            removeItemFromShip(self.order.shipDetail,n,true)
            updateOrderField('shipDetail');
            $order.removeItem(i);
            setStuffListForShip()

        }
        self.updateOrder=function(field){
            //console.log(self.order)
            $state.go('frame.orders',{reload:true})
            if (dontUpdate){
                return self.orderId=null;
            }

        }
        function getShipDetailQty(stuffs){
            var qty=stuffs.reduce(function(s,i){
                return s+Number(i.qty)
            },0);
            return qty;
        }

        //******************************************************************
        //****************** добавление товара******************************
        //******************************************************************
        self.selectStuff = function(stuff){
            reload=true;
            $order.addItemToCart(stuff)
        }
        self.refresStuffs = function(search) {
            //console.log(search)
            if (search && search.length && search.length>2){
                Stuff.getList(null,search.substring(0,30),0,30,'fullListForAddToCart').then(function(res){
                    if(res){
                        res.forEach(function(el){
                            var _sp;
                            if (global.getSticker){
                                _sp=global.getSticker(el,true);
                            }
                            if (_sp && _sp.sticker){
                                el.sticker=_sp.sticker;
                            } else {
                                el.sticker = _sp;
                            }
                        })
                        self.stuffs=res
                        //console.log(res)
                        //res.forEach(function(el){self.stuffs.push(el)})
                    }else{
                        self.stuffs=[]
                    }
                })
            }
        }

        function setNewPriceForStuff(stuff){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/order/modal/setNewPrice.html',
                controller: function($uibModalInstance,stuff){
                    var self=this;
                    self.price=(stuff.priceSale)?stuff.priceSale:'';
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    self.ok = function () {
                        $uibModalInstance.close(self.price);
                    };
                },
                controllerAs:'$ctrl',
                resolve:{
                    stuff:function(){
                        return stuff;
                    }
                }
            });

            modalInstance.result.then(function (priceSale) {
                //console.log(priceSale,typeof priceSale,typeof stuff.price)
                reload=true;
                if(priceSale && priceSale!='0' && priceSale!=stuff.price){
                    stuff.priceSale=priceSale;
                    stuff.priceSaleHandle=true;
                }else{
                    stuff.priceSale=null;
                    stuff.priceSaleHandle=false;
                }
                stuff.campaignUrl=null;
                stuff.campaignId=null
                stuff.priceCampaign=null;
                $order.updateOrder();
            });
        }

        //************************************* helper**********************
        /*Helper.getItem($state.current.name,function(res){
            if(res.popover){
                self.popover=res.popover;
            }
            if(res.intro){
                self.intro=res.intro;
            }
            self.IntroOptions = {
                steps:[
                    {
                        element: document.querySelector('#step1'),
                        intro:self.intro[1]
                    },
                    {
                        element: document.querySelectorAll('#step2')[0],
                        intro: "<strong>You</strong> can also <em>include</em> HTML",
                        //position: 'right'
                    },
                    {
                        element: '#step3',
                        intro: 'More features, more fun.',
                        // position: 'left'
                    },
                    {
                        element: '#step4',
                        intro: "Another step.",
                        //position: 'bottom'
                    },
                    {
                        element: '#step5',
                        intro: 'Get it, use it.'
                    }
                ],
                showStepNumbers: false,
                showBullets: false,
                exitOnOverlayClick: true,
                exitOnEsc:true,
                nextLabel: '<strong>еще</strong>',
                prevLabel: '<span style="color:green">назад</span>',
                skipLabel: 'Выход',
                doneLabel: 'Thanks'
            };

        })*/
        function createNewOrder(){
            var newCart=[],n,name;
            for(var i=0;i<self.order.cart.stuffs.length;i++){
                if(self.order.cart.stuffs[i].selected){
                    n = self.order.cart.stuffs.splice(i,1)
                    i--;
                    newCart.push(n[0])
                    name = n[0].name+' '+(n[0].artikul||'')+' '+(n[0].sortName||'');
                    console.log(name)
                    removeItemFromShip(self.order.shipDetail,name,true)
                }
            }
            //console.log(newCart)
            if(newCart.length){
                var newOrder=angular.copy(self.order)
                newOrder.cart={stuffs:newCart}
                delete newOrder._id
                delete newOrder.num
                delete newOrder.date
                delete newOrder.date1
                delete newOrder.date2
                delete newOrder.date3
                delete newOrder.date4
                delete newOrder.invoice
                delete newOrder.invoiceInfo
                delete newOrder.statSent
                /*delete newOrder.maxDiscountOver
                delete newOrder.order.priceSaleHandle*/
                if(newOrder.coupon && newOrder.coupon._id){
                    newOrder.coupon = newOrder.coupon._id;
                }
                if(newOrder.seller && newOrder.seller._id){
                    newOrder.seller = newOrder.seller._id;
                }
                if(newOrder.user && newOrder.user._id){
                    newOrder.user = newOrder.user._id;
                }
                if(newOrder.userEntry){
                    newOrder.user=null;
                }
                if(newOrder.campaign && newOrder.campaign.length){
                    newOrder.campaign = newOrder.campaign.map(function(c){
                        if(c._id){return c._id}else{return c}

                    });
                }
                newOrder.status=1;
                newOrder.pay=[];
                newOrder.discount={type:0,value:0};


                newOrder.quantity=newOrder.cart.stuffs.reduce(function(q,i){return q+i.quantity},0)
                newOrder.sum=newOrder.cart.stuffs.reduce(function(s,i){return s+i.quantity*i.cena},0)
                newOrder.paySum = newOrder.sum*newOrder.kurs;
                newOrder.priceSaleHandle=newOrder.cart.stuffs.some(function(s){return s.priceSaleHandle})
                newOrder.maxDiscountOver=newOrder.cart.stuffs.some(function(s){return s.maxDiscountOver})
                console.log(newOrder)
                $timeout(function(){
                    $order.updateOrder()
                },100)

                updateOrderField('shipDetail');
                setStuffListForShip();

                Orders.save(newOrder,function(){
                    $rootScope.$emit('reloadOrderList')
                })
            }
        }
        function addStuffToExistOrder() {
            $q.when()
                .then(function () {
                    var paginate ={page:0,rows:20}
                    var query={};
                    query.user=self.order.user;
                    query.status={$lte:2}
                    return Orders.getList(paginate,query )
                })
                .then(function (results) {
                    var orders=results.filter(function (o) {
                        return o._id!=self.order._id
                    })
                    //console.log(orders)
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'components/order/modal/selectOrders.html',
                        controller: function($uibModalInstance,orders){
                            var self=this;
                            if(!orders){orders=[]}
                            self.orders=orders.map(function (o) {
                                o.date=moment(o.date).format('LLL')
                                return o;
                            });
                            //console.log(self.orders)
                            self.cancel = function () {
                                $uibModalInstance.dismiss();
                            };
                            self.ok = function (order) {
                                $uibModalInstance.close(order);
                            };
                        },
                        controllerAs:'$ctrl',
                        resolve:{
                            orders:function(){
                                return orders;
                            }
                        }
                    });
                    return modalInstance.result
                })
                .then(function (order) {
                    if(order && order._id){
                        return Orders.getItem(order._id)
                    }
                })
                .then(function (order) {

                    if(order && order.cart){
                        var cart = angular.copy(order.cart);
                        if(typeof cart=='object'){
                            if(!cart.stuffs){
                                cart.stuffs=[];
                            }
                            cart.order=order._id;
                            var n,is;
                            for(var i=0;i<self.order.cart.stuffs.length;i++){
                                if(self.order.cart.stuffs[i].selected){
                                    n = self.order.cart.stuffs.splice(i,1)
                                    i--;

                                    is=false;
                                    for(var j=0;j<cart.stuffs.length;j++){
                                        if(cart.stuffs[j]._id==n[0]._id && cart.stuffs[j].sort==n[0].sort){
                                            is=true;
                                            cart.stuffs[j].quantity++
                                            break;
                                        }
                                    }
                                    if(!is){
                                        cart.stuffs.push(n[0])
                                    }

                                    name = n[0].name+' '+(n[0].artikul||'')+' '+(n[0].sortName||'');
                                    //console.log(name)
                                    removeItemFromShip(self.order.shipDetail,name,true)
                                }
                            }
                            //console.log(cart)
                            //throw 'test'
                            return CartInOrder.save({update:'stuffs'},cart).$promise

                        }
                    }else{
                        throw 'нет корзины с товарами в ордере'
                    }
                })
                .then(function () {
                    $timeout(function(){
                        $order.updateOrder()
                    },100)

                    updateOrderField('shipDetail');
                    setStuffListForShip();
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('добавление товара в ордер')(err)
                    }
                })
        }
        //******************************************************************
        //****************** общие методы **********************************
        //******************************************************************
        self.getPercent = function () {
            if(!self.order.sum || !self.order.sum0){
                return 0;
            }else{
                /*console.log(self.order.sum,self.order.sum0)
                console.log(Math.round((1-self.order.sum/self.order.sum0)*100))*/
                return Math.round((1-self.order.getTotalSum()/self.order.sum0)*100)
            }

        }
        self.getNow=function(){
            return Date.now();
        }
        var getCategoryNameUrl = function(id){
            //console.log(id)
            if (!id || id=='category') return {name:'category',url:'id'};
            for (var i= 0,l=global.get('categories').val.length;i<l;i++){
                if (global.get('categories').val[i]._id==id){
                    var s= global.get('categories').val[i].name.replace(/(["'\/\s])/g, "-");
                    return {name:s,url:global.get('categories').val[i].url,groupUrl:global.get('categories').val[i].group.url} ;
                    break;
                }
            }
        }
        self.goToStuff = function(stuff){
            return $window.location.href='/content/stuffs/group/category/'+stuff.url;
            //console.log(global.get('categories').val);
            if (!stuff) return;
            var category = (stuff.category && stuff.category._id)?stuff.category._id:stuff.category;
            var brand = (stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
            var categoryNameUrl=getCategoryNameUrl(category);
            var stuffUrl = (stuff.url)?stuff.url:stuff.stuffUrl;
            var obj = {
                groupUrl:categoryNameUrl.groupUrl,
                categoryName:categoryNameUrl.name.replaceBlanks(),
                categoryUrl:categoryNameUrl.url,
                stuffUrl:stuffUrl
            }
            var url ='/'+obj.groupUrl+'/'+obj.categoryName+'/'+obj.categoryUrl+'/'+obj.stuffUrl;
            if (stuff.addCriterionToCart && stuff.addCriterionToCart.length){
                obj.param1=stuff.addCriterionToCart[0];
                url+='?param1='+obj.param1;
                if(stuff.addCriterionToCart.length==2){
                    obj.param2=stuff.addCriterionToCart[1];
                    url+='&param2='+obj.param1;
                }
            }
            $window.location.href=url;

        }

        self.datePickerOptions ={

            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD.MM.YY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true
        }

        //******************************************************************
        //****************** вспомогательные фунуции************************
        //******************************************************************
//********************************отправка письма
        var sendMail = function(dataEmail,cb){
            //console.log(dataEmail)
            var deferred=$q.defer();
            var domain=global.get('store').val.name||self.order.domain;
            var o={email:dataEmail.email,content:dataEmail.content,subject:dataEmail.subject+' ✔',from:domain+  '<'+dataEmail.addSubject+'@'+global.get('store').val.domain+'>'};
            $email.save(o,function(res){
                deferred.resolve();
            },function(err){
                deferred.reject();
            })
            return deferred.promise;
        }
        //********************************отправка push notification
        var pushNotification=function(note,cb){
            $notification.save(note,function(res){
                cb();
            },function(err){
                //console.log(err)
                cb(err)
            })
        }
        //********************* показ тостера
        function showToaster(type,title,content){
            toaster.pop({
                type: type,
                title: title,
                body: content,
                bodyOutputType: 'trustedHtml',
                showCloseButton: true,
                delay:15000,
                closeHtml: '<button>Close</button>'
            });
        }
        //****************************** обновление свойства ордера
        var updateOrderField=function(){
            var deferred=$q.defer();
            var fieldList='';
            //console.log(arguments);
            var order =self.order;
            var o={ _id:self.order._id,seller:self.order.seller}
            var args=arguments;
            $timeout(function(){
                Array.prototype.forEach.call(args,function(field){
                    //console.log(field)
                    if(field=='paySum'){
                        reload=true;
                    }
                    o[field]=self.order[field];
                    if(fieldList){fieldList+=' '};
                    fieldList+=field;
                })
                Orders.save({update:fieldList},o,function(){
                    deferred.resolve();
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)


                },function(err){
                    deferred.reject();
                });

            },300)
            return deferred.promise;
        }
        function updateDiscount(){
            self.order.priceSaleHandle=self.order.cart.stuffs.some(function(s){return s.priceSaleHandle})
            self.order.maxDiscountOver=self.order.cart.stuffs.some(function(s){return s.maxDiscountOver})
            updateOrderField('discount','sum', 'paySum','maxDiscountOver','priceSaleHandle')
        }
        //*************************************************************
        //******************************************************************
        //****************** управление ордером*****************************
        //******************************************************************
        self.changeCurrency=function(){
            reload=true;
            self.order.currency=self.currency[1];
            self.order.kurs=self.currency[0];
            self.updateOrderField('currency','kurs')
            self.updateCart()
        }
        //********************************************************************
        //********************************************************************
        self.updateOrderField=function(){
            updateOrderField.apply(updateOrderField,arguments).then(function(){
                global.set('saving',true);
                $timeout(function () {
                    global.set('saving',false);
                },1500)
                //showToaster('note','Сохренено','информация обновлена')
            },function(){
                showToaster('error','Ошибка','не удалось сохранить')
            });
        }

        function displayContentInPopUpWin(c){
            var popupWin=window.open();
            popupWin.window.focus();
            popupWin.document.write(c);
        }
        self.printShip=function(){
            displayContentInPopUpWin(CreateContent.orderShipInfo(self.order));
        }
        self.printOrder=function(){
            displayContentInPopUpWin(CreateContent.order(self.order,false,true));
            //displayContentInPopUpWin(CreateContent.order(self.order,true));
        }
        self.printInvoice=function(){
            displayContentInPopUpWin(CreateContent.order(self.order,'invoice'));
        }
        self.updateCart = function(){
            $order.updateOrder();
            setStuffListForShip();
        }
        function setStuffListForShip(){
            self.listStuffForShip=[]
            self.order.cart.stuffs.forEach(function(s){
                var n = s.name+' '+(s.artikul||'')+' '+(s.sortName||'');
                var o = {name:n.trim(),qty:s.quantity}
                if(s.unitOfMeasure){o.unitOfMeasure=s.unitOfMeasure}
                self.listStuffForShip.push(o)
            })
            if(!self.order.shipDetail){self.order.shipDetail=[];}
            self.order.shipDetail.forEach(function(sd){
                for(var i=0;i<sd.stuffs.length;i++){
                    if(sd.stuffs[i].name){
                        var s = self.listStuffForShip.getOFA('name',sd.stuffs[i].name)
                        if(s){
                            s.qty -=sd.stuffs[i].qty
                        }
                    }
                }
            })
            self.listStuffForShip=self.listStuffForShip.filter(function(o){return o.qty})
        }


        function enableAddStussInShipDetail(name){
            var s = self.listStuffForShip.getOFA('name',name)
            return s && s.qty
        }
        function addStuffInShipDetail(shipDetail,stuff){
            // из списка в селекте
            var added=false;
            for(var i =0;i<shipDetail.stuffs.length;i++){
                if(shipDetail.stuffs[i].name && shipDetail.stuffs[i].name==stuff.name){
                    added=true;
                    shipDetail.stuffs[i].qty +=stuff.qty;
                    break;
                }
            }
            if(!added){
                var o= {name:stuff.name,qty:stuff.qty};
                if(stuff.unitOfMeasure){o.unitOfMeasure=stuff.unitOfMeasure}
                shipDetail.stuffs.push(o)
            }
            setStuffListForShip();
            updateOrderField('shipDetail');
        }
        function addStuffToShipDetail(shipDetail,i){
            // из товара  по плюсике
            var s = self.listStuffForShip.getOFA('name',shipDetail.stuffs[i].name)
            if(s && s.qty){
                shipDetail.stuffs[i].qty++
                //s.qty--
            }
            setStuffListForShip()
            updateOrderField('shipDetail');
        }
        function removeStuffFromShipDetail(shipDetail,i){
            if(shipDetail.stuffs[i].qty && shipDetail.stuffs[i].qty>1){
                shipDetail.stuffs[i].qty--
            }else {
                shipDetail.stuffs.splice(i,1);
            }
            /*var s = self.listStuffForShip.getOFA('name',shipDetail.stuffs[i].name)
            if(s){
                s.qty++
            }*/
            setStuffListForShip()
            updateOrderField('shipDetail');
        }
        function deleteShip(i){
            self.order.shipDetail.splice(i,1);
            self.setStuffListForShip();
            updateOrderField('shipDetail','paySum');
        }
        function deletePay(i){
            self.order.pay.splice(i,1);
            updateOrderField('pay','paySum');
        }
        //console.log(global.get('store').val)

        self.sendNotification=function(type,obj,addressee){

            $q.when()
                .then(function () {
                    if(type=='invoice'){
                        return $order.getCheckOutLiqpayHtml(self.order,true)
                    }
                })
                .then(function () {
                    /*console.log(self.order.checkOutLiqpayHtml)
                    throw 'test'*/
                    if(self.order.checkOutLiqpayHtmlIs){
                        var pos = self.order.checkOutLiqpayHtml.indexOf('src="//');
                        self.order.checkOutLiqpayHtml=self.order.checkOutLiqpayHtml.substr(0, pos+5) + 'https:'+ self.order.checkOutLiqpayHtml.substr(pos+5)
                        /*pos = self.order.checkOutLiqpayHtml.indexOf('</form>');
                        var str = '<p><button type="submit" class="btn bnt-project" style="width: 200px; height: 50px; background-color: #9acc72; color:#fff; text-transform: uppercase">'+((global.get('langOrder').val.pay)?global.get('langOrder').val.pay.toUpperCase():'оплатИть')+'</button><style>.btn-project:hover {background-color: #6b904c}</style></p>';
                        self.order.checkOutLiqpayHtml=self.order.checkOutLiqpayHtml.substr(0, pos) + str+ '</form>';*/
                    }
                    //console.log(self.order.checkOutLiqpayHtml)
                    //throw 'ffff'

                    if (!addressee){addressee='seller'}else{addressee=self.order.user._id||self.order.user}
                    var o={addressee:addressee,type:type,content:''};
                    o.seller=self.order.seller._id;
                    //if (user=='seller'){o.seller=self.order.seller._id}
                    // console.log(user,o)
                    //**************** формирование контента
                    var dataEmail={content:''};
                    var noteContent;
                    var notification='send'
                    if (type=='pay'){
                        updateOrderField('pay')
                        o.content=CreateContent.payInfo(self.order,obj);
                        noteContent='уведомление об оплате отправлено'
                    }else if(type=='shipDetail'){
                        updateOrderField('shipDetail')
                        o.content=CreateContent.shipInfo(self.order,obj);
                        noteContent='уведомление о доставке отправлено'
                    }else if(type=='invoice'){
                        if(self.order.user.email){
                            self.order.invoice=Date.now();
                            updateOrderField('invoice')
                            noteContent='счет отправлен на email.'
                            o.content=CreateContent.invoiceInfo(self.order);
                            //console.log(o.content)
                            dataEmail.content=CreateContent.order(self.order,'invoice')
                            dataEmail.subject=(global.get('langOrder').val.invoiceforpay)?global.get('langOrder').val.invoiceforpay.toUpperCase():'СЧЕТ НА ОПЛАТУ'+' ✔';
                            dataEmail.addSubject='sales';
                            dataEmail.email=[self.order.user.email,global.get('store').val.seller.salemail];
                        }
                    }else if(type=='accepted'){
                        self.order.date2=Date.now();
                        updateOrderField('date2')
                        if(self.order.user.email){
                            dataEmail.content=CreateContent.order(self.order,false,true)
                            //console.log(dataEmail.content,self.order.user)
                            o.content=dataEmail.content;
                            noteContent='уведомление и письмо отправлены';
                            dataEmail.subject=(global.get('langOrder').val.orderaccepted)?global.get('langOrder').val.orderaccepted.toUpperCase():'ЗАКАЗ ПРИНЯТ'+' ✔';
                            dataEmail.addSubject='sales';
                            dataEmail.email=self.order.user.email;
                        }

                        //console.log(self.order.user)
                    }else if(type=='shipOrder'){
                        //notification=null;
                        if(self.order.user.email){
                            self.order.date4=Date.now();
                            updateOrderField('shipDetail','date4');
                            dataEmail.content=CreateContent.orderShipInfo(self.order);
                            o.content=CreateContent.shipInfoNote(self.order);
                            noteContent='информация о доставке отправлена на email.'
                            dataEmail.subject=(global.get('langOrder').val.shipinfo)?global.get('langOrder').val.shipinfo.toUpperCase():'ИНФОРМАЦИЯ О ДОСТАВКЕ'+' ✔';
                            dataEmail.addSubject='sales';
                            dataEmail.email=self.order.user.email;
                        }
                    }
                    if(!self.order.user.email){return;}
                    o.order=self.order._id;
                    $q.when((dataEmail.content)?sendMail(dataEmail):'note').then(function (res) {
                        // показ уведомления
                        var defer=$q.defer();
                        //console.log(res)
                        var title;
                        //console.log(notification)
                        if (notification=='send'){
                            title='Отправлено уведомление';
                            pushNotification(o,function(err){
                                if (!err){
                                    defer.resolve(title)
                                }else{
                                    defer.reject(err)
                                }
                            });
                        }else{
                            title='Отправлено письмо';
                            defer.resolve(title)
                        }
                        return defer.promise;
                    },function(){
                        showToaster('error','Ошибка','не удалось отправить письмо')
                    }).then(function(title){
                        showToaster('note',title, noteContent);
                    },function(){
                        showToaster('error','Ошибка','не удалось отаправить уведомление')
                    })
                })





        }
        self.deleteCoupon = function(){
            reload=true;
            // убираем купон как использованный у пользователя
            if(!self.order.user.coupons){self.order.user.coupons=[]}else{
                self.order.user.coupons.splice(self.order.user.coupons.indexOf(self.order.coupon._id),1)
            }
            var o={_id:self.order.user._id,coupons:self.order.user.coupons};
            $user.save({update:'coupons'},o);
            //устанавливаем купон доступный для использования
            if(global.get('coupons').val){
                if(self.order.user.coupons.indexOf(global.get('coupons').val[0]._id)<0){
                    self.coupon=global.get('coupons').val[0]
                }else if(global.get('coupons').val[1] && self.order.user.coupons.indexOf(global.get('coupons').val[1]._id)<0){
                    self.coupon=global.get('coupons').val[1]
                }
            }

            self.order.coupon=null;
            $timeout(function(){
                o={ _id:self.order._id,seller:self.order.seller}
                o.coupon=null;
                o.paySum=self.order.paySum;
                Orders.save({update:'coupon paySum'},o);
            },100)
        }
        self.setCoupon=function(coupon){
            self.order.coupon=coupon;
            $timeout(function(){
                var o={ _id:self.order._id,seller:self.order.seller}
                o.coupon=coupon._id;
                o.paySum=self.order.paySum;
                Orders.save({update:'coupon paySum'},o);
                if(!self.order.user.coupons){self.order.user.coupons=[]}
                self.order.user.coupons.push(coupon._id)
                o={_id:self.order.user._id,coupons:self.order.user.coupons};
                $user.save({update:'coupons'},o)
            },100)
        }

        function startChat() {
            if(self.dialog._id){return}
            $dialogs.save(self.dialog,function(res){
                self.dialog._id=res.id;
            },function(err){
                console.log(err)
            })
        }


        function changeStatus(status){


            self.order.status=status.value;
            self.updateOrderField('status')

            if(self.order.statSent ||(self.order.status!=3&&self.order.status!=5)){
                return
            }
            self.order.statSent=true;
            self.updateOrderField('statSent')
            var order = self.order;
            try{
                if ((global.get('local')&& !global.get('local').val) && $window.ga){
                    //$window.ga('send', 'event','order','complete');
                    var transaction = {
                        'id': order.num,
                        'affiliation': global.get('store').val.domain||global.get('store').val.subDomain,
                        'revenue': (order.kurs*order.getCouponSum()).toFixed(2),
                        'shipping': (order.shipCost)?order.shipCost:0,
                        'currency':  order.currency
                    }
                    console.log(transaction)
                    $window.ga('ecommerce:addTransaction', transaction);
                    var item;
                    order.cart.stuffs.forEach(function(el){
                        var o = {
                            id: '',
                            name: el.name+' '+((el.artikul)?el.artikul:'')+' '+((el.sortName)?el.sortName:''),
                            price: (order.kurs*el.cena).toFixed(2),
                            quantity: el.quantity
                        }
                        $window.ga('ecommerce:addItem',o);
                    });
                    $window.ga('ecommerce:send');
                    $window.ga('ecommerce:clear');
                }
            }catch(err){
                throw err
            }
            try{
                // яндекс
                if ((global.get('local')&&!global.get('local').val)&& window.yaCounter && window.yaCounter.reachGoal){
                    var yaParams = {
                        order_id: order.num,
                        order_price: (order.kurs*order.getCouponSum()).toFixed(2),
                        currency:  order.currency,
                        exchange_rate: order.rate,
                        goods:[]
                    };
                    order.cart.stuffs.forEach(function(el){
                        yaParams.goods.push({
                            id: '',
                            name: el.name+' '+((el.artikul)?el.artikul:'')+' '+((el.sortName)?el.sortName:''),
                            price: (order.kurs*el.cena).toFixed(2),
                            quantity: el.quantity
                        });
                    });
                    window.yaCounter.reachGoal('order',yaParams);
                }
            }catch(err){
                throw err
            }
        }


    }
})()

'use strict';
angular.module('gmall.services')
.factory('$notification', function ($resource) {
    var Items= $resource('/api/collections/Notification/:id',{id:'@_id'}, {
        deleteArray: { method: 'DELETE'},
        updateNote: {method:'POST', params:{update:'note'}}
    });
    return {
        getList:getList,
        query:Items.query,
        get:Items.get,
        save:Items.save,
        delete:Items.delete,
    }
    function getList(paginate,query){
        var data ={perPage:paginate.rows ,page:paginate.page,query:query};
        return Items.query(data).$promise
            .then(getListComplete)
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                }else{
                    paginate.items=0;
                }
            }
            return response;
        }
    }
})


'use strict';
angular.module('gmall.controllers')
.controller('notificationCtrl',['$scope','$rootScope','global','$anchorScroll','Helper','$notification','$sce','exception','$location',function($scope,$rootScope,global,$anchorScroll,Helper,$notification,$sce,exception,$location){
    $anchorScroll();
    $scope.notificationCtrl=this;
    $scope.notificationCtrl.typeNote=$rootScope.$stateParams.type;
    $scope.notificationCtrl.lang= global.get('store').val.lang
    $scope.notificationCtrl.notificationsTypeLang=notificationsTypeLang;
    console.log($scope.notificationCtrl.notificationsTypeLang)
    //console.log(global.get('notifications'))
    $scope.notificationCtrl.notifications=global.get('notifications');
    $scope.notificationCtrl.type=$rootScope.$stateParams.type;
    $scope.notificationCtrl.trustHtml = function(text){
        var trustedHtml = $sce.trustAsHtml(text);
        //console.log(text)
        return trustedHtml;
    };
    $scope.notificationCtrl.allNote=function(){
        $location.search('type',null);
    }
    $scope.notificationCtrl.paginate={page:0,rows:20,items:0}
    $scope.notificationCtrl.items=[];
    //$scope.notificationCtrl.checkAll=false;
    $scope.notificationCtrl.setCheckAll=function(){
        $scope.notificationCtrl.items.forEach(function(el,i){
            $scope.notificationCtrl.items[i].check=$scope.notificationCtrl.checkAll;
        })
    }
    $scope.notificationCtrl.changeType = function(type){
        $scope.notificationCtrl.type=type;
        $scope.notificationCtrl.paginate.page=0;
        $scope.notificationCtrl.getList($scope.notificationCtrl.paginate.page,$scope.notificationCtrl.paginate.rows);
    }


    var query=null
    $scope.notificationCtrl.getList = function(){
        var pagin=$scope.notificationCtrl.paginate;
        $scope.notificationCtrl.checkAll=false;
        var user=(global.get('seller').val)?'seller':global.get('user').val._id;
        query={$and:[{type:$scope.notificationCtrl.type},{addressee:user}]}
        if(global.get('seller').val){
            query.$and.push({seller:global.get('seller').val})
        }
        $notification.query({perPage:pagin.rows , page:pagin.page,query:query},function(res){
            if (pagin.page==0 && res.length>0){
                $scope.notificationCtrl.paginate.items=res.shift().index;
            }
            $scope.notificationCtrl.items=res;
            var ids=res.filter(function(mes){
                return !mes.read;
            }).map(function(mes){return mes._id});
            //console.log(ids);
            if(ids.length){
                $notification.save({update:'read dateNote'},{_id:ids,dateNote:Date.now(),read:true},function(res){
                    //getChatUnReadMessages({dialog:self.dialog._id,count:ids.length})
                },function (err) {
                    if(err.data){err=err.data;}
                    exception.catcher('обновление статуса сообщений')(err)
                })
            }
            var notes=res.filter(function(mes){
                return !mes.read;
            }).reduce(function(o,item){
                if(!o[item.type]){o[item.type]=1}else{o[item.type]++}
                return o;
            },{})
            /*console.log(notes)
            console.log(global.get('notifications' ).val)*/
            for(var type in notes){
                if(global.get('notifications' ).val && global.get('notifications' ).val[type]){
                    global.get('notifications' ).val[type]-=notes[type];
                    $rootScope.notificationsCount-=notes[type];
                    if($rootScope.notificationsCount<0){$rootScope.notificationsCount=0;}
                    if(!global.get('notifications' ).val[type] || global.get('notifications' ).val[type]<0){
                        delete global.get('notifications' ).val[type];
                    }
                }
            }
            //console.log($scope.listCtrl.items,res);
        })
    };
    $scope.notificationCtrl.deleteItem = function(id){
        var items;
        if(id){
            items={id:id}
        }else{
            items=$scope.notificationCtrl.items.filter(function(el){return el.check} ).map(function(el){return el._id});
        }


        $notification.delete(items,function(res){
            //if (err) console.log(err);
            $scope.notificationCtrl.getList($scope.notificationCtrl.paginate.page,$scope.notificationCtrl.paginate.rows);
            //$rootScope.getNotifications();
            /*if (global.get('seller').val){
                $rootScope.getNotifications(global.get('seller' ).val);
            } else{
                $rootScope.getNotifications();
            }*/
        },function(err){
            if(err){
                exception.catcher(err)
            }
        });
    }
    $scope.notificationCtrl.deleteEnable=function(){
        if (!$scope.notificationCtrl.items.length)return false;
        return $scope.notificationCtrl.items.some(function(el){return el.check})
    }


    $scope.notificationCtrl.saveNote=function(note){
        //console.log(note)
        var field='note';
        var o={_id:note._id,note:note.note};
        if(!note.dateNote){
            note.dateNote=Date.now();
            field +=' dateNote';
            o.dateNote=note.dateNote;
        }
        $notification.save({update:field},o,function(res){
            //console.log(res)
        });
    }


    if(global.get('user').val){
        activate()
    } else{
        $rootScope.$on('logged',function(){
            activate()
        })
    }
    function activate(){
        $scope.notificationCtrl.getList($scope.notificationCtrl.paginate.page,$scope.notificationCtrl.paginate.rows);
    }








}])/*notificationCtrl*/

angular.module('gmall.directives')
.directive('goToOrder',['$compile',function($compile){
    return{
        scope:{
            order:'=goToOrder',
        },

        link:function(scope,element){
            setTimeout(function () {
               //console.log(scope.order)
                if (scope.order){
                    var a = angular.element('<a ui-sref="frame.orders.order({id:order})"></a>')
                    var wrapper = $compile(a)(scope);
                    //
                    element.wrap(a);
                }
            }, 100);

        }
    }
}])
'use strict';
angular.module('gmall.services')
.factory('$chat', function ($resource) {
    var Items= $resource('/api/collections/Chat/:id',{id:'@_id'});
    return {
        getList:getList,
        query:Items.query,
        get:Items.get,
        save:Items.save,
        delete:Items.delete,
    }
    function getList(paginate,query){
        var data ={perPage:paginate.rows ,page:paginate.page,query:query};
        return Items.query(data).$promise
            .then(getListComplete)
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                }else{
                    paginate.items=0;
                }
            }
            return response;
        }
    }
})


'use strict';
angular.module('gmall.controllers')
.controller('chatCtrl',['$scope','$rootScope','global','$anchorScroll','$chat','$sce','$order','$timeout','$location','$http','socket','$auth',function($scope,$rootScope,global,$anchorScroll,$chat,$sce,$order,$timeout,$location,$http,socket,$auth){
    $anchorScroll();


    $scope.chatCtrl=this;
    $scope.chatCtrl.messages=[];
    $scope.chatCtrl.page=0;
    $scope.chatCtrl.rows=10;
    $scope.chatCtrl.localCount=0;
    $scope.chatCtrl.totalCount=0;
    $scope.chatCtrl.firstMessage=null;
    $scope.chatCtrl.global=global;
    $scope.moment=moment;
    socket.on('newMessage',function(message){
        //console.log(message)
        if($scope.chatCtrl.order && $scope.chatCtrl.order._id != message.order){return}
        if($scope.chatCtrl.dialog && $scope.chatCtrl.dialog._id != message.dialog){return}
        if(message.recipient=='seller'){
            message.name=$scope.chatCtrl.user.name;
        } else{
            message.name=$scope.chatCtrl.seller.name;
        }
        $scope.chatCtrl.messages.push(message)
        setMessagesRead([message._id])
    })
    var delay;
    console.log($scope.chatCtrl.dialog)
    $scope.chatCtrl.sendMessage=function(){
        var form=$scope.formChat;
        //console.log($scope.formChat);
        var message=$scope.chatCtrl.message;
        if(delay){return}
        delay=true;
        $timeout(function(){delay=false},1200)
        //if(!message){return}
        if(form.$valid) {
            //$scope.chatCtrl.participant=(global.get('seller').val)?'seller':'user';
            //console.log($scope.chatCtrl.participant);
            $scope.chatCtrl.submitted = false;
            var o={
                message:message.clearTag(250),
            }
            //console.log(o)
            o.seller=$scope.chatCtrl.seller._id;
            o.user=$scope.chatCtrl.user._id;
            if(!$scope.chatCtrl.order){
                if($scope.chatCtrl.participant=='seller'){
                    o.recipient= o.user;
                    o.name=$scope.chatCtrl.seller.name;
                }else{
                    o.recipient= 'seller';
                    o.name=$scope.chatCtrl.user.name;
                }
                o.type='user';
                o.dialog=$scope.chatCtrl.dialog._id;
            } else{
                o.order=$scope.chatCtrl.order._id
                o.name='N-'+$scope.chatCtrl.order.num;
                o.recipient=($scope.chatCtrl.participant=='seller')?$scope.chatCtrl.user._id:'seller';
                o.type='order';
            }
            /*$chat.save(o,function(err,res){
                //console.log('add message')
                if(o.recipient=='seller'){
                    o.name=$scope.chatCtrl.user.name;
                } else{
                    o.name=$scope.chatCtrl.seller.name;
                }
                $scope.chatCtrl.messages.push(o)
                $scope.chatCtrl.message='';
            })*/
            //console.log(o)
            o.token=$auth.getToken();
            o.host=socketHost;
            socket.emit('newMessage',o);
            $scope.chatCtrl.messages.push(o)
            $scope.chatCtrl.message='';
        }else{
            $scope.chatCtrl.submitted = true;
        }
    }

    function setMessagesRead(ids,correct){
        $http({
            method: 'POST',
            url: '/api/chatSetReadMessages',
            data: {
                ids:ids
            }
        }).then(function() {
            //$scope.chatCtrl.participant=(global.get('seller').val)?'seller':'user';
            if(correct){
                //$rootScope.getChatNewMessages();
                if ($scope.chatCtrl.order){
                    var name='N-'+$scope.chatCtrl.order.num;
                    //console.log(name,global.get('chatMessages').val)
                    if (global.get('chatMessages') && global.get('chatMessages').val && global.get('chatMessages').val[name]){
                        global.get('chatMessages').val[name].count -=ids.length;
                        if (!global.get('chatMessages').val[name].count){
                            delete global.get('chatMessages').val[name];
                        }
                    }
                }
                if ($scope.chatCtrl.dialog){
                    var name;
                    if($scope.chatCtrl.participant=='seller'){
                        name=$scope.chatCtrl.user.name;
                    }else{
                        name=$scope.chatCtrl.seller.name;
                    }
                    //console.log(name,global.get('chatMessages').val)
                    if (global.get('dialogs') && global.get('dialogs').val && global.get('dialogs').val[name]){
                        global.get('dialogs').val[name].count -=ids.length;
                        if (!global.get('dialogs').val[name].count){
                            delete global.get('dialogs').val[name];
                        }
                    }
                }
                if ($rootScope.setChatMessagesCount){
                    $rootScope.setChatMessagesCount();
                }
            }
        }, function errorCallback(response) {
            console.log(response)
        });
    }
    $scope.chatCtrl.getMessages = function(p,r){
        //$scope.chatCtrl.seller._id;
        var query;
        if ($scope.chatCtrl.order){
            query={order:$scope.chatCtrl.order._id}
        }else{
            query={$and:[{order:{$exists: false}},{user:$scope.chatCtrl.user._id},{seller:$scope.chatCtrl.seller._id}]}
        }
        //console.log(query)
        $chat.query({perPage:r,page:p,query:query},function(res){
            if(p==0 && res && res.length){
                $scope.chatCtrl.totalCount=res.shift().index;
            }
            $scope.chatCtrl.localCount+=res.length;
            res.forEach(function(el){
                if(el.recipient=='seller'){
                    el.name=$scope.chatCtrl.user.name;
                    /*if ($scope.chatCtrl.order){
                        el.name=$scope.chatCtrl.order.user.name;
                    }else{
                        el.name=global.get('user').val.name;
                    }*/
                } else{
                    el.name=$scope.chatCtrl.seller.name;
                    /*if ($scope.chatCtrl.order){
                        el.name=$scope.chatCtrl.order.seller.name;
                    }else{
                        el.name=$scope.chatCtrl.seller.name;
                    }*/
                }
            })
            if(!$scope.chatCtrl.messages.length){
                $scope.chatCtrl.messages=res.reverse();
                /*$timeout(function(){

                   // console.log(objDivInnerChat.scrollHeight)
                    $scope.chatCtrl.objDivInnerChat.scrollTop = $scope.chatCtrl.objDivInnerChat.scrollHeight;
                },100)*/
            }else{
                res.forEach(function(el){
                    $scope.chatCtrl.messages.unshift(el);
                })
            }
            var ids=res.reduce(function(ids,c){
                if (!c.read){ids.push( c._id)}
                return ids;
            },[])
            if(ids.length){
                setMessagesRead(ids,true)
            }
        })
    }

    $scope.chatCtrl.getMoreMessage = function(){
        $scope.chatCtrl.page++;
        $scope.chatCtrl.getMessages($scope.chatCtrl.page,$scope.chatCtrl.rows)
    }
    $scope.chatCtrl.getWho=function(recipient){
        //$scope.chatCtrl.participant=(global.get('seller').val)?'seller':'user';
        var participant = $scope.chatCtrl.participant;
        if ((recipient=='seller'&& participant=='seller')||(recipient!='seller'&&participant!='seller')){return 'he'};
        if ((recipient!='seller'&& participant=='seller')||(recipient=='seller'&&participant!='seller')){return 'me'};
    }


}])/*chatCtrl*/

'use strict';
angular.module('gmall.directives').directive('chatBox',function($timeout){
    return{
        restrict:'E',
        controller:'chatCtrl',
        scope:{
            state:'@',
            order:'=',
            participant:'=',
            seller:'=',
            user:'=',
            dialog:'=',
            message:'='
        },
        templateUrl:'components/chat/chat.html',
        link:function(scope,element,attribute,ctrl){
            $timeout(function(){
                ctrl.participant=scope.participant;
                ctrl.seller=scope.seller;
                ctrl.order=scope.order;
                ctrl.user=scope.user;
                ctrl.dialog=scope.dialog;
                //ctrl.objDivInnerChat = document.getElementById("innerChat");
                ctrl.getMessages(ctrl.page,ctrl.rows)
                if(scope.message){
                    ctrl.message=scope.message;
                    $timeout(function(){
                        ctrl.sendMessage()
                    },20)

                }

            },10)
        }
    }
})
'use strict';
(function(){
    angular.module('gmall.services')
        .directive('chatDialog',itemDirective)
        .directive('scrollUp', function($timeout) {
            //http://stackoverflow.com/questions/25347852/how-to-scroll-bottom-of-div-using-angular-js
            return {
                restrict: 'A',
                scope:true,
                link: function(scope, element, attr) {
                    scope.$watchCollection(attr.scrollUp, function(newVal) {
                        //console.log(newVal)
                        $timeout(function() {
                            if(scope.$ctrl && scope.$ctrl.dontscroll){
                                scope.$ctrl.dontscroll=false;
                            }else{
                                element[0].scrollTop = element[0].scrollHeight;
                            }

                        });
                        
                    });
                }
            }
        });

    function itemDirective(){
        return {
            restrict:"E",
            scope: {
                participant:"@",
                dialog:"=",
            },
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/chat/chat-dialog.html',
        }
    };
    itemCtrl.$inject=['$scope','$chat','$state','global','$timeout','socket','exception'];
    function itemCtrl($scope,$chat,$state,global,$timeout,socket,exception){

        var self = this;
        //console.log(angular.version)


        self.mobile=global.get('mobile' ).val;
        self.$state=$state;
        self.global=global;
        self.Items=$chat;
        self.moment=moment;

        self.paginate={page:0,rows:5,items:0};
        self.text='';
        var delay;


        if(angular.version.minor<6){
            //console.log(self.dialog)
            self.query={dialog:self.dialog._id};
            if(self.dialog.order && global.get('dialogs').val){
                //console.log(global.get('dialogs').val)
                //self.dontFocus=!global.get('dialogs').val.getOFA('order',self.dialog.order);
            }

            self.guest=(self.dialog.user.split('-')[0]=='guest');
            self.message={
                dialog:self.dialog,
                recipient:(self.participant=='seller')?'user':'seller',
                sellerName:self.dialog.sellerName,
                userName:self.dialog.userName
            }
            if(self.dialog.order){
                self.message.order=self.dialog.order
                self.message.orderNum=self.dialog.orderNum;
            }
            activate();
        }else{
            self.$onInit = function() {
                self.query={dialog:self.dialog._id};
                if(self.dialog.order && global.get('dialogs').val){
                    //console.log(global.get('dialogs').val)
                    //self.dontFocus=!global.get('dialogs').val.getOFA('order',self.dialog.order);
                }

                self.guest=(self.dialog.user.split('-')[0]=='guest');
                self.message={
                    dialog:self.dialog,
                    recipient:(self.participant=='seller')?'user':'seller',
                    sellerName:self.dialog.sellerName,
                    userName:self.dialog.userName
                }
                if(self.dialog.order){
                    self.message.order=self.dialog.order
                    self.message.orderNum=self.dialog.orderNum;
                }
                activate();
            }
        }




        self.getList=getList;
        self.getWho=getWho;
        self.sendMessage =sendMessage;
        self.getMoreMessage=getMoreMessage;

        //*******************************************************


        function activate() {
            //console.log(self.dialog,self.participant);
            if(global.get('store').val.seller._id==self.dialog.seller){
                self.dialog.sellerName=global.get('store').val.seller.name||global.get('store').val.name;
            }
            if (self.participant=='seller'){
                //console.log("self.participant=='seller' - ",self.participant=='seller')
                socket.emit('getUserStatus',{user:self.dialog.user})
                socket.on('userStatus',function(data){
                    //console.log('data.status ',data)
                    //console.log('self.online ',self.online)
                    self.online=data.status;
                })
            }else {
                socket.emit('getSellerStatus',{seller:self.dialog.seller})
                socket.on('sellerStatus',function(data){
                    self.online=data.status;
                })
            }
            return getList().then(function() {
                //console.log('Activated news list View');
            });

        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    data.reverse();
                    data.forEach(function(mes){getWho(mes)})
                    var ids=data.filter(function(mes){
                        //console.log(mes)
                        return !mes.read && mes.recipient==self.participant
                    }).map(function(mes){return mes._id});
                    //console.log(ids);
                    if(ids.length){
                        $chat.save({update:'read'},{_id:ids,read:true},function(res){
                            getChatUnReadMessages({dialog:self.dialog._id,count:ids.length})
                        },function (err) {
                            if(err.data){err=err.data;}
                            exception.catcher('обновление статуса сообщений')(err)
                        })
                    }
                    if(self.items && self.items.length){
                        if(data && data.length){
                            Array.prototype.push.apply(data,self.items)
                        }
                    }
                    self.items = data;
                    //console.log(self.items)

                    return self.items;
                })
                .catch(function(err){
                    if(err){
                        if(err.data){err=err.data;}
                        exception.catcher('получение сообщений')(укк)
                    }

                })

        }
        function getWho(mes){
            if ((mes.recipient=='seller'&& self.participant=='seller')||(mes.recipient!='seller'&&self.participant!='seller')){mes.who ='he'};
            if ((mes.recipient!='seller'&& self.participant=='seller')||(mes.recipient=='seller'&&self.participant!='seller')){mes.who= 'me'};
            if(mes.recipient=='seller'){
               mes.name= self.dialog.userName;
            }else if(mes.recipient=='user'){
                mes.name= self.dialog.sellerName;
            }
            //console.log(mes)
        }
        function sendMessage(form){
            if(delay){return}
            delay=true;
            $timeout(function(){delay=false},1200)
            //console.log(form)
            if(form.$valid) {
                var o = angular.copy(self.message)
                o.message=self.text.clearTag(250);
                /*if(!$scope.chatCtrl.order){
                    if($scope.chatCtrl.participant=='seller'){
                        o.recipient= o.user;
                        o.name=$scope.chatCtrl.seller.name;
                    }else{
                        o.recipient= 'seller';
                        o.name=$scope.chatCtrl.user.name;
                    }
                    o.type='user';
                    o.dialog=$scope.chatCtrl.dialog._id;
                } else{
                    o.order=$scope.chatCtrl.order._id
                    o.name='N-'+$scope.chatCtrl.order.num;
                    o.recipient=($scope.chatCtrl.participant=='seller')?$scope.chatCtrl.user._id:'seller';
                    o.type='order';
                }*/
               // o.token=$auth.getToken();
                //o.host=socketHost;
                //console.log(o)
                socket.emit('newMessage',o);
                /*console.log(o)
                self.items.push(o)*/
                self.text='';
            }
        }
        $scope.$on('newChatMessage',function(event,message){
            //console.log(message)
            if(self.dialog._id!=message.dialog){
                return;
            }
            getWho(message)
            self.items.push(message);
            // проверка на авторство и update
            if(message.recipient==self.participant){
                //console.log(message)
                $timeout(function(){
                    getChatUnReadMessages({dialog:message.dialog,count:1})
                },300)

                $chat.save({update:'read'},{_id:message._id,read:true});
            }
            //setMessagesRead([message._id])
        })
        function getChatUnReadMessages(data){
           //console.log(data,global.get('dialogs').val)
            if(global.get('dialogs') && global.get('dialogs').val){
                for(var i=0,l=global.get('dialogs').val.length;i<l;i++){
                    if(global.get('dialogs').val[i].dialog==data.dialog){
                        global.get('dialogs').val[i].count -=data.count;
                        if(!global.get('dialogs').val[i].count || global.get('dialogs').val[i].count<0){
                            global.get('dialogs').val.splice(i,1)
                        }
                        break;
                    }
                }
            }else{
                if(!global.get('dialogs')){
                    setTimeout(function (data) {
                        getChatUnReadMessages(data)
                    },4000)
                }

            }
        }
        function getMoreMessage(){
            self.paginate.page++;
            self.dontscroll=true;
            getList()
        }
        /*$scope.$on("$destroy", function () {
            console.log('removeMe')
        })
*/

    }
})()

'use strict';
angular.module('gmall.services')
.factory('$dialogs', function ($resource) {
    return $resource('/api/collections/Dialog/:id',{id:'@_id'});
})


'use strict';
angular.module('gmall.controllers')
.controller('dialogsCtrl',['$scope','$rootScope','global','$anchorScroll','$dialogs','$timeout','$location','$q','socket','Confirm','exception',function($scope,$rootScope,global,$anchorScroll,$dialogs,$timeout,$location,$q,socket,Confirm,exception){
    //console.log('load dialogsCtrl')
    $anchorScroll();
    $scope.dialogsCtrl=this;

    $scope.dialogsCtrl.paginate={page:0,rows:20,items:0}
    var query=null;
    $scope.dialogsCtrl.items=[];
    $scope.dialogsCtrl.getGuest=getGuest;
    $scope.dialogsCtrl.startDialog=startDialog;
    function startDialog() {
        var newDialog={
            seller:global.get('store').val.seller._id,
            user:global.get('user' ).val._id,
            ellerName:global.get('store').val.seller.name,
            userName:(global.get('user' ).val.profile && global.get('user' ).val.profile.fio)?global.get('user' ).val.profile.fio:global.get('user' ).val.name,
        };
        /*console.log(mewDialog)
        return;*/
        $dialogs.save(newDialog,function(res){
            $scope.dialogsCtrl.getList(0,1)
        },function(err){
            console.log(err)
        })
    }

    $scope.dialogsCtrl.getUnReadChatMessages=function(dialog){
        if(!global.get('dialogs' ).val){return;}
        //console.log(dialog)
        for(var i=0,l=global.get('dialogs' ).val.length;i<l;i++){
            if (global.get('dialogs' ).val[i].dialog==dialog._id){
                return global.get('dialogs').val[i].count;
            }
        }
    }

    $scope.dialogsCtrl.deleteDialog=function(id,e){
        e.stopPropagation();
        Confirm("удалить???" )
            .then(function(){
                return $dialogs.delete({id:id}).$promise;
            } )
            .then(function(){
                for(var i=0,l=global.get('dialogs').val.length;i<l;i++){
                    if(id==global.get('dialogs').val[i].dialog){
                        global.get('dialogs').val.splice(i,1);
                        break;
                    }
                }
                $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows);
            })
            .catch(function(err){
                err = (err &&err.data)||err
                if(err){
                    exception.catcher('удаление диалога')(err)
                }
            })
    }
    $scope.dialogsCtrl.getList = function(page,rows){
        if(!global.get('user' ).val || !global.get('user' ).val._id)return;
        query=(global.get('seller' ).val)?{seller:global.get('seller' ).val}
            :{user:global.get('user' ).val._id}
        query={$and:[{order:{$exists:false}},query]}
        //console.log(query)
        $dialogs.query({perPage:rows , page:page,query:query},function(res){
            if (page==0 && res.length>0){
                $scope.dialogsCtrl.paginate.items=res.shift().index;
            }
            if(res.length==0){
                $scope.dialogsCtrl.paginate.items=0;
            }
            $scope.dialogsCtrl.items=res;
            $scope.dialogsCtrl.items.forEach(function(d){
                if ($scope.dialogsCtrl.participant=='seller'){
                    socket.emit('getUserStatus',{user:d.user})
                }else {
                    socket.emit('getSellerStatus',{seller:d.seller})
                }
            })
            query=null;
        },function(err){
            console.log(err)
            exception.catcher('получение диалогов')(err)
        })
    };

    if(global.get('user').val){
        activate()
    } else{
        $scope.$on('logged',function(){
            activate()
        })
    }
    function activate(){
        $scope.dialogsCtrl.participant=(global.get('seller').val)?'seller':'user';
        $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows)
        if ($scope.dialogsCtrl.participant=='seller'){
            socket.on('userStatus',function(data){
                var d;
                if(d=$scope.dialogsCtrl.items.getOFA('user',data.user)){
                    d.online=data.status;
                }
            })
        }else {
            socket.on('sellerStatus',function(data){
                $scope.dialogsCtrl.items.forEach(function(d){
                    d.online=data,status;
                })
            })
        }
    }
    function getGuest(d){
        if(d.user.split('-')[0]=='guest'){
            //console.log(d.user.split('-')[0])
            return true;
        }
    }

    socket.on('deleteDialog',function(data){
        $scope.dialogsCtrl.items.forEach(function(el){
            $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows)
        })
    })
    socket.on('newDialog',function(data){
        //console.log(data)
        $scope.dialogsCtrl.getList($scope.dialogsCtrl.paginate.page,$scope.dialogsCtrl.paginate.rows)
    })
    /*socket.on('newMessage',function(){
        //console.log('newMessage')
        $timeout(
            function() {
                $scope.dialogsCtrl.setUnReadChatMessages()
            },100
        )
    })*/
    socket.on('newMessage',function(data){
        if(!$scope.dialogsCtrl.items.some(function(d){return d._id==data.dialog})){
            $scope.dialogsCtrl.paginate.page=0;
            activate()
        }
    })

    $scope.$on("$destroy", function() {
        //console.log('destriy')
        socket.removeListener('deleteDialog');
    });

}])/*dialogCtrl*/
.controller('dialogCtrl',['$scope','$rootScope','global','$anchorScroll','$dialogs','$timeout','$location','$q','socket',function($scope,$rootScope,global,$anchorScroll,$dialogs,$timeout,$location,$q,socket){
        //console.log('load dialogsCtrl')
        $anchorScroll();
        $scope.dialogCtrl=this;

    if(global.get('user').val){
        activate()
    } else{
        $scope.$on('logged',function(){
            activate()
        })
    }
    function activate(){
        $dialogs.get({id: $rootScope.$stateParams.id}, function (res) {
            if (res) {
                $scope.dialogCtrl.participant = (global.get( 'seller' ).val) ? 'seller' : 'user';
                $scope.dialogCtrl.dialog = res;
            } else {
                console.log( 'нет такого диалога' )
            }
        }, function (err) {
        } )
    }






    }])/*dialogCtrl*/

'use strict';
angular.module('gmall.directives')

'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
        .factory('Session',['$resource', function ($resource) {
            return $resource('/api/session/');
        }])
        .factory('User', function ($resource) {
            return $resource('/api/users/:id/:email', {
                id: '@id'
            }, { //parameters default
                update: {
                    method: 'PUT',
                    params: {
                        id:'profile',
                        email:''
                    }
                },
                updateCoupon: {
                    method: 'PUT',
                    params: {
                        id:'coupon',
                        email:''
                    }
                },
                updatePswd: {
                    method: 'PUT',
                    params: {
                        // id:'profile'
                        id:'changepswd',
                        email:''
                    }
                },
                resetPswd: {
                    method: 'POST',
                    params: {
                        id:'resetpswd',
                        email:'@email'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id:'me',
                        email:''
                    }
                },
                checkEmail: {
                    method: 'GET',
                    params: {
                        id:'checkemail',
                       /* email:''*/
                    }
                },
                checkPhone: {
                    method: 'GET',
                    params: {
                        id:'checkphone',
                       /* email:''*/
                    }
                },
                useCoupon: {
                    method: 'GET',
                    params: {
                        id:'useCoupon'
                    }
                },
                cancelCoupon: {
                    method: 'GET',
                    params: {
                        id:'cancelCoupon'
                    }
                },
                repeatMailForConfirm: {
                    method: 'GET',
                    params: {
                        id:'repeatMailForConfirm'
                    }
                },

            });
        })
        .service('$user', userService)
        .service('UserEntry', userEntryService)
        .factory('Account', accountFactory)
        .factory('sendPhoneFactory', sendPhoneFactory)
        .service('SubscibtionList', subscibtionListService)

    userService.$inject=['$resource','$uibModal','$q','Session','User','global','exception','$state','$window','$rootScope','$http','$auth','Account'];
    function userService($resource,$uibModal,$q,Session,User,global,exception,$state,$window,$rootScope,$http,$auth,Account){
        var Items= $resource('/api/collections/User/:_id',{_id:'@_id'});
        //console.log(userHost)
        this.query=Items.query;
        this.get=Items.get;
        this.delete=Items.delete;
        this.save=Items.save;
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            selectItem:selectItem,
            selectOrCreat:selectOrCreat,
            login:login,
            loginOnlyPhone:loginOnlyPhone,
            logout:logout,
            saveProfile:saveProfile,
            newUser:newUser,
            newUserByPhone:newUserByPhone,
            query:Items.query,
            getInfo:getInfo,
            createUser:createUser,
            changePswd:changePswd,
            getInfoBonus:getInfoBonus,
            changeEmail:changeEmail,
            changePhone:changePhone,
            checkEmailForExist:checkEmailForExist,
            checkPhoneForExist:checkPhoneForExist,
        }

        function newUser(name,email,password){
            if(!name){
                name=email.split('@')[0]
            }
            return User.save({name: name, email: email,password: password,action:'subscribtion'} ).$promise
                .then( function(user) {
                    $rootScope.emit('CompleteRegistration')
                    //console.log(user)
                    if(global && global.get('user')){global.set('user',user);}
                    if ((global.get('local') && !global.get('local').val) && $window.ga){
                        $window.ga('send', 'event','registration','complete');}
                    if ($state.current.name!='cart' && $state.current.name!='couponDetail'){
                        var states= $state.get();
                        if(global.get('paps') && states.some(function(state){return state.name=='thanksPage'})){
                            var pap = global.get('paps').val.getOFA('action','subscribtion');
                            if (pap && pap.url){
                                $state.go('thanksPage',{url:pap.url})
                            } else {
                                //exception.showToaster('note','Подписка','вы успешно зарегистрировались');
                            }
                        }else{
                            //exception.showToaster('note','Подписка','вы успешно зарегистрировались');
                        }
                    }else {
                        //exception.showToaster('note','Подписка','вы успешно зарегистрировались');
                    }
                    return user;
                })
        }
        function newUserByPhone(name,phone) {
            var email= phone+'@gmall.io'
            var user = {email:email,name:name,profile:{phone:phone,fio:name}};
            return $auth.signup(user)
                .then(function(response) {
                    console.log(response)
                    if(response && response.data &&  response.data.token){
                        if(response.data.token=='update'){
                            throw null;
                        }else{
                            //$auth.setToken(response);
                            //return Account.getProfile()
                        }
                    } else{
                        throw response;
                    }

                })
                .then(function(response){
                    /*console.log(response)
                    if(response){
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                    }*/

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('new client')(err)
                    }
                })

        }
        function getList(paginate,query){
            //console.log(query)
            if(!paginate){paginate={}}
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
            function getListFailed(error) {
                /*console.log('XHR Failed for getList.' + error.data);
                console.log(error.data)*/
                return $q.reject(error);
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param}).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function selectItem(query){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/selectUser.html',
                    controller: function($user,$uibModalInstance,query){
                        //console.log(query)
                        var cashQuery=angular.copy(query)
                        var self=this;
                        self.items=[];
                        self.name='';
                        var paginate={page:0,rows:30,items:0}
                        self.search = function(name){
                            var q=angular.copy(query);
                            if (name.length<3){return}
                            //console.log(query)
                            if(q){
                                if (!q.$and){q={$and:[query]}}
                                q.$and.push({$or:[{name:name},{email:name}, {'profile.fio':name}]})
                            }else{
                                q={$or:[{name:name},{email:name}, {'profile.fio':name}]}
                            }
                            //console.log(query)
                            $user.getList(paginate,q).then(function(res){
                                self.items=res;
                            })
                        }
                        self.selectItem=function(item){
                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    size: 'lg',
                    resolve:{
                        query:function(){
                            return query;
                        }
                    }
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })

        }

        function selectOrCreat(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/selectOrCreate.html',
                    controller: function($user,UserEntry,global,$uibModalInstance){
                        var self=this;
                        self.items=[];
                        self.user='';
                        self.oldPhone=null;
                        self.userName='name';
                        self.userEmail='';
                        self.global=global;
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
                        var paginate={page:0,rows:30,items:0}
                        self.refreshUsers=refreshUsers;
                        self.addUser=addUser;
                        self.clearUser=clearUser;
                        function refreshUsers(str){
                            if (str.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            //self.oldPhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(str)
                        }
                        var reg = new RegExp(/^\d+$/);
                        function searchUser(str){
                            /*console.log(reg.test(str))
                            console.log(str,jQuery.isNumeric(str))*/
                            if(isNumeric(str)){
                                if(str.length>10){
                                    self.oldPhone=str.substring(0,10);
                                }else{
                                    var d = 10-str.length;
                                    for(var i=0;i<d;i++){
                                        str+='0';
                                    }
                                    self.oldPhone=str
                                }

                                self.userName=''
                            }else{
                                self.oldPhone=null;
                                self.userName=str;
                            }

                            self.users=[]
                            var users=[];
                            var q={$or:[{name:str},{email:str}, {'profile.fio':str},{'profile.phone':str}]}
                            var q1= {$or:[{'phone':str},{name:str},{email:str}]}

                            var acts=[];
                            acts.push(get$user(q))
                            acts.push(getEntryUser(q1))
                            $q.all(acts)
                                .then(function(res){
                                    if(res[0] && res[0].length){
                                        res[0].forEach(function(item){
                                            item.type='user'
                                            users.push(item)
                                        })
                                    }
                                    if(res[1] && res[1].length){
                                        res[1].forEach(function(item){
                                            item.type='userEntry'
                                            users.push(item)
                                        })
                                    }
                                    self.users=users;
                                })


                        }
                        function get$user(q){
                            return $user.getList(paginate,q)
                        }
                        function getEntryUser(q){
                            return  UserEntry.getList(paginate,q)
                        }
                        function addUser(){
                           // console.log('add user')
                            var user={name:self.userName,
                                email:self.userEmail,
                                phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10),
                                type:"userEntry"
                            }
                            return $q.when()
                                .then(function(){
                                    return UserEntry.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.addingUser=false;
                                    self.userName='';
                                    self.user=user;
                                    //console.log(user)
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })
                        }
                        function clearUser(){
                            self.user=null;
                        }
                        self.ok=function(){
                            $uibModalInstance.close(self.user);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function isNumeric(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }
                    },
                    controllerAs:'$ctrl',
                    size: 'lg',

                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })

        }
        function saveProfile(user){
            return Items.save({update:'profile'},{_id:user._id,profile:user.profile}).$promise;
        }
        function login(){
            return $q(function(resolve,reject){
                if(global.get('user') && global.get('user').val && global.get('user').val._id){
                    return resolve()
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/login-sign.html',
                    controller: loginCtrl2,
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        function loginOnlyPhone(){
            return $q(function(resolve,reject){
                if(global.get('user') && global.get('user').val && global.get('user').val._id){
                    return resolve()
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/login-sign.onlyPhone.html',
                    controller: loginOnlyPhoneCtrl,
                    controllerAs:'$ctrl',
                    windowClass:'modalProject',
                    backdropClass:'modalBackdropClass',
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        function getInfo(service){
            service=false;
            service=(service)?'Service':'Good'
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/getInfo.html',
                    controller: getInfoCtrl,
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                    resolve:{
                        service:function(){return service}
                    }
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        getInfoCtrl.$inject=['$uibModalInstance','exception','global','User','$q','$http','service',Account];
        function getInfoCtrl($uibModalInstance,exception,global,User,$q,$http,service,Account){
            var self=this;
            self.service=service;
            self.global=global;
            self.user=global.get('user' ).val;
            if(!self.user){
                self.user={email:'',profile:{}};
            }
            self.ok=closeModal;
            function  closeModal(){
                $q.when()
                    .then(function(){
                        // если не авторизированy
                        /*нужен айд пользователя*/
                        if(!self.user._id){
                            return $http.post('/auth/signupOrder',self.user)
                        }else{
                            // обновляем профайл
                            return Items.save({update:'profile'},{_id:self.user._id,profile:self.user.profile}).$promise
                        }
                    })
                    .then(function(response){
                        if(response && response.data && response.data.token){
                            $auth.setToken(response);
                            return Account.getProfile()
                        }else if(response && response.data && response.data._id) {
                            self.user._id = response.data._id;
                        }/*else{
                            $uibModalInstance.dismiss('не получилось авторизировать');
                        }*/

                    })
                    .then(function(){
                        if (global.get('user').val){
                            self.user=global.get('user').val;
                        }
                        $uibModalInstance.close(self.user);
                    })

            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }


        function getInfoBonus(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/getInfoBonus.html',
                    controller: getInfoBonusCtrl,
                    controllerAs:'$ctrl',
                    //size: 'lg',
                    windowClass:'modalProject',
                    //windowTopClass:'modalTopProject',
                    backdropClass:'modalBackdropClass',
                    //openedClass:'modalOpenedClass'
                });
                $rootScope.$emit('modalOpened')
                modalInstance.result.then(function(item){$rootScope.$emit('modalClosed');resolve(item)},function(){$rootScope.$emit('modalClosed');reject()});
            })

        }
        getInfoBonusCtrl.$inject=['$uibModalInstance','exception','global','User','$q','$http','Account','$auth'];
        function getInfoBonusCtrl($uibModalInstance,exception,global,User,$q,$http,Account,$auth){
            var self=this;
            self.global=global;
            self.user=global.get('user').val;
            self.formData=(global.get('store').val.bonusForm)?global.get('store').val.bonusForm:null;
            //console.log(self.formData)
            if(!self.user){
                self.user={email:'',profile:{},addInfo:{}};
            }
            self.ok=closeModal;
            function  closeModal(){
                $q.when()
                    .then(function(){
                        // если не авторизированy
                        /*нужен айд пользователя*/
                        if(!self.user._id){
                            return $http.post('/auth/signupOrder',self.user)
                        }else{
                            // обновляем профайл
                            return Items.save({update:'profile'},{_id:self.user._id,profile:self.user.profile}).$promise
                        }
                    })
                    .then(function(response){
                        if(response && response.data && response.data.token){
                            $auth.setToken(response);
                            return Account.getProfile()
                        }else if(response && response.data && response.data._id) {
                            self.user._id = response.data._id;
                        }

                    })
                    .then(function(){
                        if (global.get('user').val){
                            self.user=global.get('user').val;
                        }
                        $uibModalInstance.close(self.user);
                    })

            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }

        function createUser(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/createUser.html',
                    controller: function($user,$uibModalInstance,$http,$q,exception){
                        var self=this;
                        self.user={profile:{}}
                        self.ok=function(form){
                            if(form.$invalid){return}
                            self.blockButton=true;
                            $q.when()
                                .then(function () {
                                    if(self.user.profile && self.user.profile.phone){
                                        var phone=self.user.profile.phone
                                        //return $user.checkPhoneForExist(phone)
                                        return $user.getItem(phone,'profile.phone')
                                    }else {
                                        return null;
                                    }
                                })
                                .then(function(res){
                                    //console.log(res)
                                    if(res && res._id){throw 'phone exist'}
                                })
                                .then(function(){
                                    return $user.checkEmailForExist(self.user.email)
                                })
                                .then(function(res){
                                    if(res && res.exist){throw 'email exist'}
                                })
                                .then(function(){
                                    var uploadUrl='/api/createUser'
                                    return $http.post(userHost+uploadUrl,self.user);
                                })
                                .then(function(res){
                                    $uibModalInstance.close(res);
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('error')(err)
                                    }
                                    self.blockButton=false;
                                    //$uibModalInstance.dismiss(err);
                                })
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    //size: 'lg',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })
        }
        function changeEmail(userId){
            //console.log('userId',userId)
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/changeEmail.html',
                    controller: function($user,global,$uibModalInstance,$http,$q,exception){
                        var self=this;
                        self.global=global;
                        self.checkEmail=checkEmail;
                        self.email=''
                        self.ok=function(){
                            if(!self.cheched){
                                exception.catcher('change email')('email используется')
                                return;
                            }
                            self.blockButton=true;
                            $q.when()
                                .then(function(){
                                    return Items.save({update:'email'},{_id:userId,email:self.email})
                                    //return User.changeEmail({email:self.email,id:userId})
                                })
                                .then(function(res){
                                    $uibModalInstance.close(self.email);
                                })
                                .catch(function(err){
                                    self.blockButton=false;
                                })
                            return;
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function checkEmail(email,valid) {
                            if(!valid){
                                self.cheched=false;
                                return;
                            }
                            $q.when()
                                .then(function(){
                                    return $user.checkEmailForExist(email)
                                })
                                .then(function(res){
                                    if(res && !res.exist){
                                        self.cheched=true;
                                    }else{
                                        throw 'email exist'
                                    }
                                    //console.log(self.cheched)
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('change email')(err)
                                    }
                                    self.cheched=false;
                                })
                        }
                    },
                    controllerAs:'$ctrl',
                    windowClass:'modalProject',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })
        }
        function checkEmailForExist(email,_id) {
            return $q(function (rs,rj) {
                var o={email:email}
                if(_id){
                    o['_id']=_id
                }
                //console.log(o)
                User.checkEmail(o,function (res) {
                    //console.log(res)
                    rs(res)
                },function (err) {
                    //console.log(err)
                  rj(err)
                })

            })
        }
        function checkPhoneForExist(phone,_id) {
            return $q(function (rs,rj) {
                var o={email:phone}
                if(_id){
                    o['_id']=_id
                }
                User.checkPhone(o,function (res) {
                    //console.log(res)
                    rs(res)
                },function (err) {
                    //console.log(err)
                    rj(err)
                })

            })
        }
        function changePhone(userId){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/changePhone.html',
                    controller: function($user,global,$uibModalInstance,$http,$q,exception){
                        var self=this;
                        self.global=global;
                        self.checkPhone=checkPhone;
                        self.email=''
                        self.ok=function(){
                            //console.log(self.phone)
                            if(!self.phone){
                                exception.catcher('change phone')('phone???')
                                return;
                            }
                            self.blockButton=true;
                            $q.when()
                                .then(function () {
                                    return checkPhone(self.phone)
                                })
                                .then(function(){
                                    var o ={_id:userId}
                                    o['profile.phone']=self.phone;
                                    return Items.save({update:'profile.phone'},o)
                                })
                                .then(function(res){
                                    $uibModalInstance.close(self.phone);
                                })
                                .catch(function(err){
                                    exception.catcher('change phone')(err)
                                    self.blockButton=false;
                                })
                            return;
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function checkPhone(phone) {
                            return $q.when()
                                .then(function(){
                                    return $user.checkPhoneForExist(phone)
                                })
                                .then(function(res){
                                    if(!res || res.exist){
                                        throw 'phone exist'
                                    }
                                })
                        }
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })
        }
        function changePswd(_id){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/user/modal/changePswd.html',
                    controller: function($user,global,$uibModalInstance,$http,$q,_id){
                        var self=this;
                        self.global=global;
                        self.user={_id:_id,password:''}
                        self.ok=function(){
                            $q.when()
                                .then(function(){
                                    var uploadUrl='/api/changePswd'
                                    return $http.post(userHost+uploadUrl,self.user);
                                })
                                .then(function(res){
                                    $uibModalInstance.close(res);
                                })
                                .catch(function(err){
                                    $uibModalInstance.dismiss(err);
                                })
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{_id:function(){return _id}},
                    windowClass:'modalProject',
                    //size: 'lg',
                });
                modalInstance.result.then(function(item){resolve(item)},function(){reject()});
            })

        }
        function logout(callback) {
            var cb = callback || angular.noop;
            return Session.delete(function() {
                    global.set('user',null);
                    //$rootScope.$broadcast('logout', null);
                    return cb();
                },
                function(err) {
                    return cb(err);
                }).$promise;
        }

        loginCtrl2.$inject=['$scope','$uibModalInstance','exception','global','User','$state']
        function loginCtrl2($scope,$uibModalInstance,exception,global,User,$state){
            var self=this;
            self.global=global;
            //self.closeModal=closeModal;
            $scope.$on('closeWitget',function () {
                //console.log('ssss')
                $uibModalInstance.close()
            })
            /*function  closeModal(action){
                //paps action
                $uibModalInstance.close();
            }*/
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }

        loginOnlyPhoneCtrl.$inject=['$scope','$uibModalInstance','exception','global','User','$state']
        function loginOnlyPhoneCtrl($scope,$uibModalInstance,exception,global,User,$state){
            var self=this;
            self.global=global;
            $scope.$on('closeWitget',function () {
                $uibModalInstance.close()
            })
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }


        loginCtrl.$inject=['$uibModalInstance','exception','global','User','$state']
        function loginCtrl($uibModalInstance,exception,global,User,$state){
            var self=this;
            // авторизация
            //-- Variables --//
            self.login={};
            self.login.user={email : '',password:''};
            //-- Methods --//
            self.login.resetPswd = function(form) {
                if(form.$valid) {
                    self.submittedReset=true;
                    User.resetPswd({email:self.login.reseteEmail}).$promise
                    /*Auth.resetPswd({email: self.login.reseteEmail,action:'resetPassword'})*/
                        .then( function(data) {
                            exception.showToaster('note','Сброс пароля','информация отправлена на email')
                        })
                        .catch( function(err) {
                            self.errors = {};
                            //console.log(err);
                            if (err.data && err.data.error){
                                form['emailreset'].$setValidity('mongoose', false);
                                self.errors['emailreset'] = err.data.error;
                                exception.catcher('авторизация')(err.data.error);
                            } else {
                                exception.catcher('авторизация')(err.data);
                            }
                        });
                }
            } // end resetPswd

            self.login.login2 =function(form) {
                //console.log(form)
                self.submittedLogin = true;
                if(form.$valid) {
                    return Session.save({email: self.login.user.email, password: self.login.user.password} ).$promise
                        .then(function(user){
                            if(global && global.get('user')){
                                global.set('user',user);
                            }
                            //$rootScope.$broadcast('logged', user);
                            $uibModalInstance.close(user)
                        })
                        .catch( function(err) {

                            err = err.data;
                            console.log(err)
                            self.errors = {};
                            // Update validity of form fields that match the mongoose errors
                            if (err && err.errors){
                                angular.forEach(err.errors, function(error, field) {
                                    console.log(field)
                                    form[field].$setValidity('mongoose', false);
                                    self.errors[field] = error.message;
                                    exception.catcher('авторизация')(error.message)
                                });
                            } else {
                                exception.catcher('авторизация')(err)
                            }
                        });
                }
            }; // end login
            self.signup={};
            self.signup.user = {name:'',email : '',password:''};
            self.signup.signup =function(form) {
                //console.log(form);
                self.submitted = true;
                if(form.$valid) {
                    newUser(self.signup.user.name, self.signup.user.email,
                        self.signup.user.password,'subscribtion')
                        .then(function(user){
                            //console.log(user)
                            $uibModalInstance.close(user);
                            var pap;
                            if (global.get('paps' ) && global.get('paps' ).val && (pap=global.get('paps' ).val.getOFA('action','subscription'))){
                                $state.go('thanksPage',{url:pap.url})
                            }
                        })
                        .catch( function(err) {
                            err = err.data;
                            self.errors = {};
                            if (err && err.error){
                                form['email'].$setValidity('mongoose', false);
                                self.errors['email'] = err.error;
                                exception.catcher('подписка')(err.error)
                            } else {
                                exception.catcher('подписка')(err)
                            }
                        });
                }
            }; // end signup
            self.selectItem=function(item){
                $uibModalInstance.close(item);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    }
    accountFactory.$inject=['$http','$state','global'];
    function accountFactory($http,$state,global) {
        return {
            getProfile: function() {
                //console.log('ssss')
                var store=global.get('store').val._id;
                return $http.get('/api/me/'+store);
                //return $http.get(userHost+'/api/me/'+store);
            },
            getPermission: function() {
                var store=global.get('store').val._id;
                //console.log(global.get('store').val)
                return $http.get('/api/permission/'+store);
            },
            getPermissionTranslator: function() {
                var store=global.get('store').val._id;
                //console.log(global.get('store').val)
                return $http.get('/api/permissionTranslator/'+store);
            },
            getPermissionOrder: function() {
                var store=global.get('store').val._id;
                return $http.get('/api/permissionOrder/'+store);
            },
            getPermissionMaster: function(master) {
                var store=global.get('store').val._id;
                return $http.get('/api/permissionMaster/'+store+'/'+master);
            },
            getEnterButton: function(user) {
                var store=global.get('store').val._id;
                user.frame=$state.get('frame')?$state.get('frame' ).url:null;
                user.store=store;
                return $http.post('/api/getEnterButton',user);
            },
            updateProfile: function(profileData) {
                var store=global.get('store').val._id;
                profileData.store=store;
                return $http.put(userHost+'/api/me', profileData);
            },
            unsubscription: function() {
                var store=global.get('store').val._id;
                return $http.get('/api/unsubscription/'+global.get('user').val._id);
            }

        };
    }
    subscibtionListService.$inject=['$resource'];
    function subscibtionListService($resource){
        var Items= $resource('/api/collections/SubscribtionList/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                //console.log('XHR Failed for SubscibtionList.' + error);
                throw  error
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return error
            }
        }
    }
    userEntryService.$inject=['$resource','$q'];
    function userEntryService($resource,$q){
        var Items= $resource('/api/collections/UserEntry/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query
        }
        function getList(paginate,query){
            //console.log(query)
            if(!paginate){paginate={}}
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(!paginate.page){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
            function getListFailed(error) {
                return $q.reject(error);
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param}).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
    }



    sendPhoneFactory.$inject=['$http','$q','$user']
    function sendPhoneFactory($http,$q,$user) {
        return {
            sendCodeToPhone:sendCodeToPhone,
            verifyCode:verifyCode,
            checkPhone:checkPhone,
        }

        function sendCodeToPhone(phone) {
            if(!phone){return}
            var o = {phone:phone}
            return $q.when()
                .then(function () {
                    return $http.post('/api/users/sendSMS',o)
                })
        }
        function verifyCode(code,phone) {
            var o = {code:code,phone:phone}
            return $q.when()
                .then(function () {
                    return $http.post('/api/users/verifySMScode',o)
                })


        }
        function checkPhone(phone) {
            var query = {phone:phone};
            return $q.when()
                .then(function () {
                    return $user.getItem(phone,'profile.phone')
                })
                .then(function(res){
                    if(res){return res}else{return null}
                })
        }
    }

})()


'use strict';
angular.module('gmall.controllers')
.controller('usersCtrl',['$scope','$rootScope','global','$anchorScroll','$user','$chat','$sce','$timeout','$http',function($scope,$rootScope,global,$anchorScroll,$user,$chat,$sce,$timeout,$http){
    $anchorScroll();
    $scope.usersCtrl=this;
    $scope.usersCtrl.paginate={page:0,rows:20,totalItems:0}
    $scope.usersCtrl.query={}
    var query=null;
    if ($rootScope.$stateParams.user){
        $scope.usersCtrl.query={_id:$rootScope.$stateParams.user}
    }
    $scope.usersCtrl.deleteUser=function(id){
        $user.delete({id:id},function(res){
            $scope.usersCtrl.getList($scope.usersCtrl.paginate.page,$scope.usersCtrl.paginate.rows)
        })
    }
    $scope.usersCtrl.getList = function(page,rows){
        if(!global.get('user' ).val || !global.get('user' ).val._id)return;
        /*if (global.get('seller' ) && global.get('seller' ).val){
            $scope.usersCtrl.query['seller']=global.get('seller' ).val;
        }else{
            $scope.usersCtrl.query['user']=global.get('user' ).val._id;
        }
        if (page!=$scope.usersCtrl.paginate.page){
            $scope.usersCtrl.paginate.page=page;
        }*/

        $user.query({perPage:rows , page:page,query:$scope.usersCtrl.query},function(res){
            if (page==0 && res.length>0){
                $scope.usersCtrl.paginate.totalItems=res.shift().index;
            }
            if(res.length==0){
                $scope.usersCtrl.paginate.totalItems=0;
            }
            $scope.usersCtrl.users=res;
            $scope.usersCtrl.query={}
            query=null;
            //console.log($scope.ordersCtrl.orders);
        })
    };
    $scope.usersCtrl.getList($scope.usersCtrl.paginate.page,$scope.usersCtrl.paginate.rows)

}])/*userCtrl*/

'use strict';
(function(){
angular.module('gmall.directives')
.directive("userCard", function() {
    return {
        restrict: "E",
        scope:{
          deleteUserFunction:'&',
            user:'='
        },
        templateUrl: "/components/user/user.html",
        link:function(scope){
            scope.moment=moment;
            scope.deleteUser=function(id){
                scope.deleteUserFunction({id:id});
            }
        }
    }
})

.directive("userProfile",userProfile);
    function userProfile(){
        return{
            restrict:"E",
            scope:{},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/user/userProfile.html',
        }
    }
    itemCtrl.$inject=['global','$user','exception','$timeout','$scope','$q'];
    function itemCtrl(global,$user,exception,$timeout,$scope,$q){
        var self=this;
        self.Items=$user;
        self.global=global;
        self.user=global.get('user');
        self.changePswd=changePswd;
        self.changeEmail=changeEmail;

        self.saveField=saveField;
        /*self.saveProfile=saveProfile;
        function saveProfile(form){
            var o={_id:self.user.val._id};
            o.profile=self.user.val.profile
            self.Items.save({update:'profile'}, o ).$promise.then(
                function(){
                    exception.showToaster('note','обновление профиля','все OK')
                },
                function(err){
                    exception.catcher('обновление профиля',err.data)
                });

        };*/
        var listener =$scope.$watch(function(){
            return self.user.val
        },function (n,o) {
            if(n){
                listener();
                if(!n.profile){n.profile={}}
                if(!n.profile.cityId){n.profile.cityId=null;}
                if(!n.profile.phone){n.profile.phone='';}
                $scope.$watch(function () {return self.user.val.profile.cityId},function (n,o) {
                    if(n!=o){
                        saveField('cityId')
                    }

                })
                $scope.$watch(function () {return self.user.val.profile.phone},function (n,o) {
                    if(n!=o){
                        $q.when()
                            .then(function () {
                                console.log(self.user.val.profile.phone)
                                if(self.user.val.profile.phone){
                                    return $user.getItem(self.user.val.profile.phone,'profile.phone')
                                }else{
                                    return null;
                                }

                            })
                            .then(function(res){
                                console.log(res)
                                console.log(!res ||  (res && !res._id) || (res && res._id && res._id==self.user.val._id))
                                if(!res ||  (res && !res._id) || (res && res._id && res._id==self.user.val._id)){
                                    saveField('phone')
                                }else{

                                    self.phoneExist=true;
                                    $timeout(function () {
                                        self.phoneExist=false;
                                    },5000)
                                }

                            })

                    }
                })
            }
        })
        /*$scope.$watch(function () {
            if(self.user)
            return
        })*/
        function changePswd(_){
            $q.when()
                .then(function(){
                    return $user.changePswd(self.user.val._id)
                })
                .then(function () {
                    exception.showToaster('succes','статус','обновлено!')
                })
                .catch(function(err){
                    if(err){
                        err=err.data||err;
                        exception.catcher('смена пароля')(err)
                    }

                })
        }

        function saveField(field) {
           // console.log(field)
            var o ={_id:self.user.val._id}
            var fieldFoDB='profile.'+field;
            o[fieldFoDB]=self.user.val.profile[field]
            if(field=='cityId'){
                fieldFoDB+=' profile.city';
                o['profile.city']=self.user.val.profile['city']
            }
            self.Items.save({update:fieldFoDB},o,function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            })
        }
        function changeEmail(){
            //console.log('changeEmail');
            $q.when()
                .then(function () {
                    return $user.changeEmail(global.get('user').val._id)
                })
                .then(function (res) {
                    console.log(res)
                    global.get('user').val.email=res
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('change email')(err)
                    }

                })

            /*self.Items.save(self.email,function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            })*/
        }


        //сделать как в оформлении заказа сохранение по кнопке
    }

})()
'use strict';
(function(){
    'use strict';
    angular.module('gmall.services')
       
        .service('Comment', itemService)

    itemService.$inject=['$resource','$uibModal','$q','global','exception','$state'];
    function itemService($resource,$uibModal,$q,global,exception,$state){
        var Items= $resource('/api/collections/Comment/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
        }


        function getList(paginate,query){
            //console.log(query)
            if(!paginate){paginate={}}
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }
            function getListFailed(error) {
                /*console.log('XHR Failed for getList.' + error.data);
                console.log(error.data)*/
                return $q.reject(error);
            }
        }
        function getItem(id,param){
            return Items.get({_id:id,param:param}).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }

    }

})()


'use strict';
(function(){
angular.module('gmall.directives')
.directive("commentList",itemDirective);
    function itemDirective(){
        return {
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/comment/commentsList.html',
        }
    }
    itemCtrl.$inject=['$q','global','$state','Comment','exception','SubscibtionList','Confirm','$uibModal','$http','socket','$timeout']
    function itemCtrl($q,global,$state,Comment,exception,SubscibtionList,Confirm,$uibModal,$http,socket,$timeout){
        var self = this;
        self.Items=Comment;

        self.$state=$state;
        self.moment=moment;
        self.query={};
        self.paginate={page:0,rows:100,totalItems:0}
        self.store=global.get('store').val._id;
        self.getList=getList;
        self.deleteItem=deleteItem;
        self.saveField = saveField;
        //*******************************************************
        activate();

        function activate() {
            self.participant=(global.get('seller').val)?'seller':'user';
            //console.log(self.participant)
            if (self.participant=='seller'){
                socket.on('newNotification',function(data){
                    console.log('newNotification',data)
                    if(data && data.type=='comment'){
                        getList(0);
                    }
                })
            }

            return getList().then(function() {
                console.log('Activated list View');
            })
        }
        function getList(page) {
            if(page!=='undefined'){self.paginate,page=page}
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    data.forEach(function (el) {
                        if(el.stuff && el.stuff.gallery && el.stuff.gallery.sort){
                            el.stuff.gallery.sort(function (a,b) {
                                return a.index-b.index
                            })
                        }
                    })
                    self.items = data;
                    return self.items;
                });
        }

        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise.then(function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
                console.log('saved');
            },function(err){console.log(err)});
        }
        function deleteItem(item) {
            Confirm('Удалить??')
                .then(function(){
                    return Comment.delete({_id:item._id}).$promise
                })
                .then(function(){
                    getList()
                })
                .catch(function(err){
                    err=err.data||err;
                    exception.catcher('Удаление')(err)
                })
            console.log(item);return;

        }

        socket.on('newComment',function(data){
            console.log(data)
            self.paginate.page=0;
            activate();
        })
    }
})()


/*
To make recovery in case of failure easier, an ad
 be started on port '1022'. If anything goes wrong
 ssh you can still connect to the additional one.
 If you run a firewall, you may need to temporaril
 this is potentially dangerous it's not done autom
 open the port with e.g.:
 'iptables -I INPUT -p tcp --dport 1022 -j ACCEPT'
 */




'use strict';
angular.module('gmall.directives')

.directive('storeSetting', function(){
    storeCtrl.$inject=['$q','Store','global','Seller','FilterTags','exception','Config','Template','$uibModal','$http','$scope','ConfigData','$timeout','Confirm','Master','$user']
    function storeCtrl($q,Store,global,Seller,FilterTags,exception,Config,Template,$uibModal,$http,$scope,ConfigData,$timeout,Confirm,Master,$user){
        var self = this;
        self.Items=Store;
        self.item={};
        self.item.timeTable=[{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18},{start:8,end:18}]
        self.lang=global.get('store' ).val.lang
        self.cacheTime=[
            {name:'1 hour',val:3600},
            {name:'12 hours',val:43200},
            {name:'1 day',val:86400},
            {name:'7 days',val:604800},
            {name:'30 days',val:2592000},
        ]

        self.yearTable= [];
        for(var ii=0;ii<=365;ii++){
            self.yearTable.push({is:true,s:10,e:18})
        }
        self.months=['январь',"февраль",'март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
        self.selectedMonth=0;




        self.selectTag=selectTag;
        self.deleteTag=deleteTag;
        self.addRedirects=addRedirects;
        self.deleteRedirects=deleteRedirects;
        self.global=global;
        self.animationTypes=animationTypes;
        self.onSelected=onSelected;
        self.bonusFormAdditionFields=bonusFormAdditionFields;
        var filtertTags=[];
        self.checkTest=checkTest;
        self.saveField=saveField

        self.changePhoneCodes=changePhoneCodes;
        self.saveFieldTemplate=saveFieldTemplate;
        self.saveTemplate=saveTemplate;
        self.changeTemplate=changeTemplate;
        self.clearCache=clearCache;
        self.setRowsForStuffList=setRowsForStuffList;
        self.changeCurrencyOrder=changeCurrencyOrder;
        self.savePhoneForSale=savePhoneForSale;

        self.deleteOwner=deleteOwner;
        self.getOwner=getOwner;
        self.addOwner=addOwner;

        self.deleteTranslater=deleteTranslater;
        self.getTranslaters=getTranslaters;
        self.addTranslater=addTranslater;

        self.syncWithStore=syncWithStore;
        //self.clearCashe=clearCashe;

        function clearCache() {
            $q.when()
                .then(function () {
                    return $http.get("/api/resetStoreCashe/"+global.get('store').val._id)
                })
                .then(function (res) {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
                .catch(function (err) {
                    exception.catcher('cброс кеша')(err)
                })

        }
        /*function clearCache(type) {
            var url = 'api/clearCache/'+type;
            Confirm('подтвердите')
                .then(function(){
                    return $http.get(url)
                })
                .then(function () {
                    exception.showToaster('info','сброс кеша','готово')
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('сброс кеша')(err)
                    }
                })

        }*/

        function savePhoneForSale() {
            console.log(self.item.seller.phone)
            self.saveFieldSeller('phone')
        }




        self.weekDays=weekDays;
        self.sliderOptions={
            floor: 0,
            ceil: 24,
            step: 1,
            onEnd:function () {
                saveField('timeTable')
            }
        }
        self.sliderOptionsForMsster={
            floor: 0,
            ceil: 24,
            step: 1,
        }
        self.changeMaster=changeMaster;
        self.changeMonth=changeMonth;
        self.getDayOfWeek=getDayOfWeek;
        self.saveMasterSchedule=saveMasterSchedule;

        function changeMaster() {
            console.log(self.selectedMaster)
            //changeMonth(0)
            /*self.selectedMonth=0;
            self.currentMonthDays=31;
            self.monthDayDelta=getMonthDayDelta()*/
            //self.masterDays=self
        }
        function changeMonth(month){
            //console.log(month)
            self.selectedMonth= month
            self.monthDayDelta=getMonthDayDelta()
            self.currentMonthDays=getDaysInMonth()
            //console.log(self.selectedMonth,self.currentMonthDays,self.monthDayDelta)
        }
        function getMonthDayDelta(){
            //console.log('getMonthDayDelta')
            if(self.selectedMonth==1){
                return 31
            }else if(self.selectedMonth==2){
                return 31+29
            }else if(self.selectedMonth==3){
                return 31+29+31
            }else if(self.selectedMonth==4){
                return 31+29+31+30
            }else if(self.selectedMonth==5){
                return 31+29+31+30+31
            }else if(self.selectedMonth==6){
                return 31+29+31+30+31+30
            }else if(self.selectedMonth==7){
                return 31+29+31+30+31+30+31
            }else if(self.selectedMonth==8){
                return 31+29+31+30+31+30+31+31
            }else if(self.selectedMonth==9){
                return 31+29+31+30+31+30+31+31+30
            }else if(self.selectedMonth==10){
                return 31+29+31+30+31+30+31+31+30+31
            }else if(self.selectedMonth==11){
                return 31+29+31+30+31+30+31+31+30+31+30
            }else{
                return 0;
            }
        }
        var today = new Date();
        var year=today.getFullYear();
        function getDayOfWeek(day) {
            var d = new Date(year,self.selectedMonth,day);
            //console.log(d.toDateString())
            var weekday = new Array(7);
            weekday[0] =  'Воскресенье'//"Sunday";
            weekday[1] = "Понедельник";
            weekday[2] = "Вторник";
            weekday[3] = "Среда";
            weekday[4] = "Четверг";
            weekday[5] = "Пятница";
            weekday[6] = "Суббота";
            var n = weekday[d.getDay()];
            return n;
            /*weekday[0] =  "Sunday";
             weekday[1] = "Monday";
             weekday[2] = "Tuesday";
             weekday[3] = "Wednesday";
             weekday[4] = "Thursday";
             weekday[5] = "Friday";
             weekday[6] = "Saturday";
             */
        }



        function getDaysInMonth() {
            //https://habrahabr.ru/post/261773/
            function f(x, y) { return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor((1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + Math.floor(1/x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1)))/x); }
            var x=self.selectedMonth+1;
            var d = f(x, year)
            //var d= 28+(x+Math.ceil(x/8))%2+2%x+2*Math.ceil(1/x)
            //console.log(d)
            return d;
        }
        function saveMasterSchedule() {
            if(self.selectedMaster){
                var o={_id:self.selectedMaster._id,timeTable:self.selectedMaster.timeTable}
                Master.save({update:'timeTable'},o,function () {
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
            }
        }
        /****************************************************************************************************/

        self.list=[];
        for (var i = 1; i <= 3; ++i) {
            self.list.push({label: "Item A" + i});
        }
        self.formatAverage=['не округлять','до десятков копеек','до целых','до десятков целых','сотен целых']





        activate()
        $scope.$on('changeLang',function(){
            setConfigData(global.get('store' ).val.lang)
            self.lang=global.get('store' ).val.lang
            self.item.name=(self.item.nameL[self.lang])?self.item.nameL[self.lang]:''
        })

        function activate(){
            var today = new Date()
            self.selectedMonth = today.getMonth()


            $q.when()
                .then(function () {
                    return $http.get('/api/getTemplates')
                })
                .then(function (res) {
                    //console.log(res)
                    self.templates=res.data
                })
                .then(function () {
                    return Master.getList()
                })
                .then(function (items) {
                    //console.log(items)
                    items.forEach(function (item) {
                        if(!item.timeTable || !item.timeTable.length || item.timeTable.length!=366){
                            item.timeTable=angular.copy(self.yearTable)
                        }
                    })
                    self.masters=items;
                })
                .then(function(){
                    return Config.getList();
                })

                .then(function(res){
                    console.log(res)
                    self.config=res[0];
                    self.config.phoneCodes=phoneCodes;
                    //console.log(self.config.phoneCodes)
                    console.log(self.config.currency,self.config.unitOfMeasure)
                    self.config.langs=languagesOfPlatform;
                    return Store.get({_id:global.get('store' ).val._id}).$promise;
                })
                .then(function(res){

                    //console.log(res._id)
                    /*res['currencyArr']=['UAH'];
                    res.currency={'UAH':[1,'UAH','грн.']};
                    res.mainCurrency='UAH';
                    return Store.save({update:'currencyArr currency mainCurrency'},res)
                    return*/

                    if(!res.domain){res.domain=res.subDomain+'.gmall.io'}
                    if(!res.lang){res.lang='ru'}
                    if(!res.langArr){res.langArr=['ru']}
                    //console.log(res.timeTable)
                    if(!res.timeTable){res.timeTable=[{},{},{},{},{},{},{}]}
                    res.timeTable.forEach(function (item,i) {
                        //console.log(i,res.timeTable[i])
                        if(!res.timeTable[i]){
                            res.timeTable[i]={}
                        }
                        if(!res.timeTable[i].start && res.timeTable[i].start!=0){
                            res.timeTable[i].start=8
                        }
                        if(!res.timeTable[i].end && res.timeTable[i].end!=0){
                            res.timeTable[i].end=18
                        }
                    })
                    var r=res;
                    if(!r.texts){r.texts={}}
                    if(!r.texts.subscriptionName){
                        r.texts.suscriptionName={}// заголовок в модальном окне подписки)
                    }
                    if(!r.texts.subscriptionText){
                        r.texts.suscriptionText={}// текст в модальном окне подписки)
                    }
                    if(!r.texts.callName){
                        r.texts.callName={}// заголовок для модального окна заказа обратного звонка
                    }
                    if(!r.texts.callText){
                        r.texts.callText={}// текст для модального окна заказа обратного звонка
                    }
                    if(!r.texts.feedbackName){
                        r.texts.feedbackName={}// заголовок для модального окна обратной связи
                    }
                    if(!r.texts.feedbackText){
                        r.texts.feedbackText={}// текст для модального окна заказа обратной связи
                    }
                    if(!r.texts.emailName){
                        r.texts.emailName={}// обращение в письме о подписке
                    }
                    if(!r.texts.emailText){
                        r.texts.emailText={}// текст в письме о подписке
                    }
                    if(!r.texts.confirmemail){
                        r.texts.confirmemail={}// текст в письме о подписке
                    }
                    if(!r.texts.mailTextRepeat){
                        r.texts.mailTextRepeat={}// текст в письме о подписке
                    }
                    if(!r.texts.orderMailText){
                        r.texts.orderMailText={}// текст в письме о заказе
                    }

                    if(!r.texts.buttonAuth){
                        r.texts.buttonAuth={}//текст на кнопки авторизации в письме
                    }
                    if(!r.texts.auth){
                        r.texts.auth={}// текст на кнопке авторизации в письме
                    }
                    if(!r.texts.pswd){
                        r.texts.pswd={}// текст для письма с паролем
                    }
                    if(!r.texts.unsubscribeName){
                        r.texts.unsubscribeName={}// заголовок в модальном окне подписки)
                    }
                    if(!r.texts.unsubscribeText){
                        r.texts.unsubscribeText={}// текст в модальном окне подписки)
                    }
                    if(!r.texts.dateTimeText){
                        r.texts.dateTimeText={}// текст в виджете записи на время)
                    }
                    if(!r.texts.masterName){
                        r.texts.masterName={}// текст в виджете записи на время)
                    }

                    if(!r.payData){
                        r.payData={}
                    }
                    if(!r.payData.liqPay){
                        r.payData.liqPay={}
                    }
                    if(!r.payData.pv24){
                        r.payData.pv24={}
                    }

                    /*if(!r.textCondition){
                        r.textCondition={}// условия покупки при оформлении заказа)
                    }*/


                    //self.item=res;
                    for(var key in res){
                        if(key!='_id'){
                            self.item[key]=res[key]
                        }



                    }
                    var i=0;

                    if(self.item.currency){
                        for(var key in self.item.currency){
                           if(!self.item.currency[key][3]){self.item.currency[key][3]=[]}
                           if(typeof self.item.currency[key][4]=='undefined'){self.item.currency[key][4]=0}
                           if(typeof self.item.currency[key][5]=='undefined'){self.item.currency[key][5]=2}
                        }

                    }
                    //console.log(self.item.currency)
                    self.currencyList = self.item.currencyArr.map(function(c){
                        return {name:c,index:i++}
                    })
                    //console.log(self.currencyList)
                    if(!self.item.phoneCodes || !self.item.phoneCodes.length){
                        self.item.phoneCodes=[self.config.phoneCodes[0]];
                        self.item.phoneCode=self.config.phoneCodes[0];
                        self.saveField('phoneCodes phoneCode')
                    }
                    if(!self.item.redirects){
                        self.item.redirects=[];
                    }
                    //console.log(self.item.turbosms)
                    if(!self.item.turbosms){
                        self.item.turbosms={};
                    }
                    if(!self.item.alphasms){
                        self.item.alphasms={};
                    }



                    //console.log(self.item.turbosms)


                    // tatiana 5867d1b3163808c33b590c12
                    // zefiz  578f5d1598238914569a1d39
                    // smartclinic 56f42aaafc50a3171d0e90e0
                    /*var o= {
                        is:false,
                        stores:[],
                        mps:[{
                            name:'smartclinic',
                            _id: '56f42aaafc50a3171d0e90e0'
                        }]
                    };
                    if (!self.item.mp){
                        self.item.mp=o;
                        self.saveField('mp')
                    }*/
                    //console.log(self.item.mp)
                   /* var o= {
                        is:true,
                        stores:['578f5d1598238914569a1d39'],
                        mps:[]
                    };*/
                    var o= {
                        is:false,
                        stores:[],
                        mps:[{
                            name:'smartclinic',
                            _id: '56f42aaafc50a3171d0e90e0'
                        }]
                    };
                    //self.item.mp=o;
                    //self.saveField('mp')
                    /*if (!self.item.mp){
                        self.item.mp=o;
                        self.saveField('mp')
                    }*/

                    $timeout(function () {
                        self.item._id=res._id
                        //console.log($.material)
                        //$.material.init()
                    },100)
                    return  FilterTags.getFilterTags()

                })
                .then(function(res){
                    filtertTags=res;
                    //console.log(filtertTags);

                    self.item.saleTag=filtertTags.getOFA('url',self.item.saleTag);
                    self.item.newTag=filtertTags.getOFA('url',self.item.newTag);
                    //console.log(self.item.saleTag,self.item.newTag)
                })
                .then(function () {
                    return ConfigData.getList(null);
                })
                .then(function (res) {
                    console.log(res)
                    self.configDatas=res;
                    setConfigData(global.get('store' ).val.lang)

                })

                .catch(function(err){
                    exception.catcher('получение данных')(err)
                })
        }
        //console.log(global.get('store' ).val)
       /* Store.get({_id:global.get('store' ).val._id}).$promise.then(function(res){
            self.item=res
        })*/
       function setConfigData(lang) {
           self.configData=self.configDatas.reduce(function (o,item) {
               if(item.lang==lang){
                   o[item.type]=item.data;
               }
               return o;
           },{})
               //console.log(self.configData)
       }
        function saveFieldTemplate(field,value){
            //console.log(field,value);return;
            var o ={_id:global.get('store').val._id}
            o[field]=value
            console.log(o)
            Store.save({update:field},o,function(err){
                exception.showToaster('info','обновлено')
            })
        }
        function saveField(field){
            var o ={_id:global.get('store' ).val._id}
            //console.log(global.get('store' ).val)
            if(field=='currencyArr'){
                var i=0;
                self.currencyList = self.item.currencyArr.map(function(c){
                    return {name:c,index:i++}
                })
                //empty
                //console.log(self.item)
                if(!self.item[field] ||
                    !self.item[field].length){
                    self.item[field]=['UAH'];
                    self.item.currency={'UAH':[1,'UAH','грн.',[],0,2]};
                    self.item.mainCurrency='UAH';
                }else{
                    try {

                        var currencyArrOld=Object.keys(self.item.currency).filter(function(el){return el})
                        //console.log(currencyArrOld)

                    } catch (err) {

                        var currencyArrOld=[];
                        self.item.currency=[];

                    }

                    if(self.item[field].length<currencyArrOld.length){
                        //delete
                        var diff = currencyArrOld.filter(function(x) { return self.item.currencyArr.indexOf(x) < 0 });
                        // delete from currency array

                        delete self.item.currency[diff[0]];

                        for(var i= 0,l=self.item.currency.length;i<l;i++){
                            if(self.item.currency[i][Object.keys(self.item.currency[i])[0]]==diff[0]){
                                self.item.currency.splice(i,1);
                                break;
                            }
                        }
                        // check mainCurrency
                         if(diff[0]==self.item.mainCurrency){
                             self.item.mainCurrency=Object.keys(self.item.currency)[0];
                             self.item.currency[self.item.mainCurrency][0]=1;
                        }
                    }else{
                        //add

                        var diff = self.item.currencyArr.filter(function(x) { return currencyArrOld.indexOf(x) < 0 });


                        self.item.currency[diff[0]]=[1,diff[0],'',[],0,2]

                    }
                }
                //console.log(self.item.currency)
                if(!self.item.mainCurrency){self.item.mainCurrency='UAH'}
                field +=' mainCurrency currency';
                o.mainCurrency=self.item.mainCurrency;
                if(!self.item.currency){
                    self.item.currency={'UAH':[1,'UAH','грн.',[],0,2]};

                }
                o.currency=self.item.currency;
                //console.log(self.item.currency)
                o['currencyArr']=self.item.currencyArr;
            }else if(field=='mainCurrency'){
                self.item.currency[self.item.mainCurrency][0]=1;
                field +=' currency';
                o.currency=self.item.currency;
                o.mainCurrency=self.item.mainCurrency;
            }else if(field=='owner'){
                o[field]=self.item[field].map(function (item) {
                    return item._id
                });
            }else{
                var fields=field.split(' ');
                fields.forEach(function(f){
                    o[f]=self.item[f];
                })

            }

            Store.save({update:field},o,function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)


            },function(err){
                if(fields=='unitOfMeasure'){
                    console.log('in thems')
                    var oo ={_id:global.get('store').val._id,unitOfMeasureL:{}}
                    Store.save({update:'unitOfMeasureL'},oo,function(){
                        Store.get({_id:global.get('store').val._id,clone:'clone'})
                        Store.save({update:field},o,function(){
                            global.set('saving',true);
                            $timeout(function(){
                                global.set('saving',false);
                            },1500)
                        })
                    })
                }

            })
            //console.log(field,o)
        }

        self.saveFieldSeller=function(field){
            // console.log(field)
            var o ={_id:self.item.seller._id}
            if(field=='archImages'){
                self.item.seller[field]=self.item.seller[field].substring(0,300)
            }else if(field=='oayInfo'){
                self.item.seller[field]=self.item.seller[field].substring(0,3000)
            }else if(field=='saleMail'){
                self.item.seller[field]=self.item.seller[field].substring(0,100)
            }
            o[field]=self.item.seller[field]

            Seller.save({update:field},o,function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)


            })
        }



        function selectTag(field){
            $q.when()
                .then(function(){
                    return FilterTags.selectFilterTag();
                })
                .then(function(tag){
                    self.item[field]=tag;
                    var o ={_id:global.get('store' ).val._id}
                    o[field]=self.item[field].url;
                    return Store.save({update:field},o).$promise
                })
                .catch(function(err){
                    if (err!='cancel'){
                        exception.catcher('выбор группы')(err)
                    }

                })
        }
        function deleteTag(field){
            $q.when()
                .then(function(){
                    self.item[field]=null;
                    var o ={_id:global.get('store' ).val._id}
                    o[field]=self.item[field]
                    return Store.save({update:field},o).$promise
                })
                .catch(function(err){
                    if (err!='cancel'){
                        exception.catcher('сброс группы')(err)
                    }

                })
        }
        function changePhoneCodes(){
            if(!self.item.phoneCodes || !self.item.phoneCodes.length){
                self.item.phoneCodes=[self.config.phoneCodes[0]];
                self.item.phoneCode=self.config.phoneCodes[0];

            }else{
                self.saveField('phoneCodes')
            }
        }

        function onSelected(){
            setTimeout(function(){
                $(':focus').blur();
            },50)
        }

        function bonusFormAdditionFields(){
            if(!self.item.bonusForm){self.item.bonusForm={}}

            if(!self.item.bonusForm.fields){
                self.item.bonusForm.fields=[{name:'Ближайший магазин',type:'select',values:['n2 ffdf','dd 444','jjdjdjd']},
                    {name:'Пол',type:'radio',values:['men','femail']}]
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/storeSetting/modal/setFieldsForBonusForm.html',
                controller: setFieldsForBonusFormCtrl,
                controllerAs:'$ctrl',
                size: 'lg',
                resolve:{
                    fields:function(){
                        return self.item.bonusForm.fields;
                    }
                }
            });
            modalInstance.result.then(function(){
                self.item.bonusForm.fields=self.item.bonusForm.fields.filter(function (e) {
                    return e
                })
                self.saveField('bonusForm');
            },function(){});
        }
        setFieldsForBonusFormCtrl.$inject=['$uibModalInstance','exception','global','$q','fields'];
        function setFieldsForBonusFormCtrl($uibModalInstance,exception,global,$q,fields){
            var self=this;
            self.fields=fields
            //console.log(fields)
            self.addField=addField;
            self.newField={type:'text',name:'название поля',values:[]}

            function addField() {
                self.fields.push(self.newField);
                self.newField={type:'text',name:'название поля',values:[]}
            }
            self.ok=function(){
                console.log(fields)
                $uibModalInstance.close();
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

        }
        function addRedirects(){
            self.item.redirects.push({from:'',to:''})
            saveField('redirects')
        }
        function deleteRedirects(i){
            self.item.redirects.splice(i,1)
            saveField('redirects')
        }
        function saveTemplate() {
            $q.when()
                .then(function () {
                    return $http.post('/api/setTemplate',{template:self.item.template,store:self.item._id})
                })
                .then(function (res) {
                    exception.showToaster('success','статус','обновлено')
                })
                .catch(function(err){
                    exception.catcher('выгрузка шаблона')(err)
                })
        }
        function changeTemplate(file) {
            console.log(file)
            $q.when()
                .then(function () {
                    return $http.get('/views/templates/'+file)
                })
                .then(function (res) {
                    console.log(res.data)
                    //return;
                    self.item.template=res.data;
                    Store.save({update:'template'},{_id:self.item._id,template:res.data})

                    exception.showToaster('success','статус','обновлено')
                })
                .catch(function(err){
                    exception.catcher('загрузка шаблона')(err)
                })

        }



        function setRowsForStuffList(list) {
            if(!list.rows){
                list.rows=4
            }
        }
        
        function changeCurrencyOrder() {
            self.item.currencyArr=self.currencyList.map(function (c) {
                return c.name;
            })
            self.saveField('currencyArr');
        };
        function checkTest(item) {
            console.log(item)
        }


        function deleteOwner(i){
            Confirm('Убрать админа?')
                .then(function () {
                    if(i){
                        self.item.owner.splice(i,1);
                        self.saveField('owner')
                    }else {
                        exception.showToaster('error','запрет','нельзя удалить владельца')
                    }
                })

        }
        function getOwner(){

            if(self.item.owner && self.item.owner.length){
                var q= {$and:[{store:self.item._id},{_id :{$in:self.item.owner}}]}
                $q.when()
                    .then(function(){
                        return $user.getList({page:0,rows:50},q)
                    })
                    .then(function(res){
                        //console.log(res)
                        if(res && res.length){
                            self.item.owner=self.item.owner.map(function (user) {
                                for(var i=0;i<res.length;i++){
                                    if(res[i]._id==user){
                                        return res[i]
                                    }
                                }
                                return null;
                            }).filter(function (item) {
                                return item;
                            });
                        }

                        self.item.showOwner=true;
                    })
            }else{
                self.item.showOwner=true;
            }
        }
        function addOwner(){
            $user.selectItem({store:self.item._id}).then(function(user){
                if(!self.item.owner){self.item.owner=[]}
                if(self.item.owner.some(function(e){return e._id==user._id})){return}
                self.item.owner.push({_id:user._id,name:user.name,email:user.email})
                self.saveField('owner');
                if(!self.item.seller.user){
                    var o={_id:self.item.seller._id,};
                    o.user=user._id;
                    o.name=user.name;
                    Seller.save({update:'user name'},o)
                }
            })
        }

        function deleteTranslater(i){
            Confirm('Убрать переводчика?')
                .then(function () {
                    self.item.еranslaters.splice(i,1);
                    self.saveField('translaters')
                })

        }
        function getTranslaters(){

            if(self.item.translaters && self.item.translaters.length){
                var q= {$and:[{store:self.item._id},{_id :{$in:self.item.translaters}}]}
                $q.when()
                    .then(function(){
                        return $user.getList({page:0,rows:50},q)
                    })
                    .then(function(res){
                        //console.log(res)
                        if(res && res.length){
                            self.item.translaters=self.item.translaters.map(function (user) {
                                for(var i=0;i<res.length;i++){
                                    if(res[i]._id==user){
                                        return res[i]
                                    }
                                }
                                return null;
                            }).filter(function (item) {
                                return item;
                            });
                        }

                        self.item.showTranslaters=true;
                    })
            }else{
                self.item.showTranslaters=true;
            }
        }
        function addTranslater(){
            $user.selectItem({store:self.item._id}).then(function(user){
                if(!self.item.translaters){self.item.translaters=[]}
                if(self.item.translaters.some(function(e){return e._id==user._id})){return}
                self.item.translaters.push({_id:user._id,name:user.name,email:user.email})
                self.saveField('translaters');
            })
        }


        function syncWithStore() {
            //console.log(self.item)
            if(!self.currentMonthDays){return}
            /*console.log(self.selectedMonth)
            console.log(self.selectedMaster.timeTable)
            console.log(self.monthDayDelta,self.currentMonthDays)*/
            self.selectedMaster.timeTable.forEach(function (item,i) {
                if(i>=self.monthDayDelta&&i<self.monthDayDelta+self.currentMonthDays){
                    var day = i-self.monthDayDelta+1
                    var d = new Date(year,self.selectedMonth,day);
                    try{
                        var n = d.getDay();
                        if(self.item.timeTable && self.item.timeTable[n]){
                            item.s=self.item.timeTable[n].start
                            item.e=self.item.timeTable[n].end
                            item.is=self.item.timeTable[n].is
                        }
                    }catch(err){console.log(err)}

                    //console.log(getDayOfWeek(day),n)
                }
            })
        }

        self.countriesList =[

            {name: 'AllOther', code: 'ALLOTHER'},
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'AndorrA', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'S Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'RWANDA', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Viet Nam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
        ]


    }
    return {
        scope: {},
        bindToController: true,
        controller: storeCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/storeSetting.html'
    };
})

    .directive('storesList', function(){

        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: storeListCtrl,

            controllerAs: '$ctrl',
            templateUrl: 'components/storeSetting/storeList.html'
        };
        storeListCtrl.$inject=['$q','$state','Store','global','Seller','exception','Config','Template','$user','$http','Confirm','Photo','$timeout','siteName']
        function storeListCtrl($q,$state,Store,global,Seller,exception,Config,Template,$user,$http,Confirm,Photo,$timeout,siteName){
            console.log('storeListCtrl')
            console.log('stuffHost',stuffHost,'storeHost',storeHost)
            console.log(userHost)
            var self = this;
            self.Items=Store;
            self.$state=$state;
            self.query={storeType:'in-work'};
            self.paginate={page:0,rows:30,items:0}

            self.storeTypes=['work','template','in-work']

            self.getList=getList;
            self.createItem=createItem;
            self.saveField=saveField;
            self.addOwner=addOwner;
            self.deleteOwner=deleteOwner;
            self.getOwner=getOwner;

            self.deleteStore=deleteStore;
            self.cloneStore=cloneStore;
            self.readStore=readStore;
            self.readStoreUnable=readStoreUnable;
            self.changeDomain=changeDomain;
            self.changeType=changeType;
            self.searchItem=searchItem;
            self.changeSubDomain=changeSubDomain;
            self.clearDomain=clearDomain;
            activate()
            function activate(){

                $q.when()
                    .then(function(){
                        return Template.getList()
                    })
                    .then(function(res){
                        //console.log(res)
                        self.templates=res;
                    })
                    .then(function(){
                        return Config.getList();
                    })
                    .then(function(res){
                        //console.log(res)
                        self.config=res[0];
                        //console.log(self.config.currency,self.config.unitOfMeasure)
                        return Store.getList(self.paginate,self.query)

                    })
                    .then(function(data) {
                        data.forEach(function (s) {
                            s.date=moment(s.date).format('LLL')
                        })
                        self.items = data;
                        return self.items;
                    })
                    .then(function () {
                        var url =(storeHost)? 'http://'+storeHost+'/api/getSubDomains':'/api/getSubDomains'
                        return $http.get(url)
                    })
                    .then(function (res) {
                        self.subDomains=res.data;
                        console.log('self.subDomains',self.subDomains)
                    })

                    .catch(function(err){
                        console.log(err)
                        exception.catcher('получение данных')(err)
                    })
            }
            function getList(){
                return $q.when()
                    .then(function(){
                        return Store.getList(self.paginate,self.query)
                    })
                    .then(function(data) {
                        data.forEach(function (s) {
                            s.date=moment(s.date).format('LLL')
                        })
                        self.items = data;
                        return self.items;
                    })
            }
            //console.log(global.get('store' ).val)
            /* Store.get({_id:global.get('store' ).val._id}).$promise.then(function(res){
             self.item=res
             })*/
            function saveField(item,field,exist){
                if(exist){exception.catcher('выбор домена')('занят')}
                var o ={_id:item._id}/*,
                    currencyArr:['UAH'],
                    mainCurrency:'UAH',
                    currency:{UAH:[1,'UAH','грн.']}}*/
                o[field]=angular.copy(item[field]);
                if(field=='owner'){
                    o[field]=o[field].map(function(e){return e._id})
                }
                //field+=" currencyArr mainCurrency currency"
                if(field=='template'){
                    console.log('template')
                    var ooo = self.templates.getOFA('_id',item[field]);
                    /*console.log(ooo)
                    delete ooo._id;
                    delete ooo.name;*/
                    o[field]=ooo;
                }
                Store.save({update:field},o,function () {
                    global.set('saving',true);
                    console.log(global.get('saving'))
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                })
               // console.log(field,o)
            }

            self.saveFieldSeller=function(field){
                //console.log(field)
                var o ={_id:self.item.seller._id}
                o[field]=self.item.seller[field]
                Seller.save({update:field},o)
            }

            function createItem(){
                //console.log('create')
                $q.when()
                    .then(function(){
                        return siteName.choiceName()
                    })
                    .then(function(subDomain){
                        var store ={subDomain:subDomain}
                        store.name=subDomain;
                        store.storeType='in-work'
                        //console.log(store)
                        //store._id='56f42aaafc50a3171d0e90e0',
                        store.currencyArr=['UAH'];
                        store.mainCurrency='UAH';
                        store.currency={UAH:[1,'UAH','грн.']};
                       // store._id='56f42aaafc50a3171d0e90e0'
                        //console.log(store)
                        return Store.save(store).$promise
                    })
                    .then(function(){
                        return Store.getList(self.paginate,self.query)

                    })
                    .then(function(data) {
                        self.items = data;
                        return self.items;
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('создание магазина')(err)
                        }
                    })
            }
            function deleteOwner(item,i){
                //console.log(item)
                item.owner.splice(i,1);
                self.saveField(item,'owner')
            }
            function getOwner(item){
                item.showOwner=true;
                if(item.owner && item.owner.length){
                    var q= {$and:[{store:item._id},{_id :{$in:item.owner}}]}
                    $q.when()
                        .then(function(){
                            return $user.getList({page:0,rows:50},q)
                        })
                        .then(function(res){
                            //console.log(res)
                            item.owner=res;
                        })
                }
            }
            function addOwner(item){
                $user.selectItem({store:item._id}).then(function(user){
                    if(!item.owner){item.owner=[]}
                    if(item.owner.some(function(e){return e._id==user._id})){return}
                    item.owner.push({_id:user._id,name:user.name,email:user.email})
                    self.saveField(item,'owner');
                    if(!item.seller.user){
                        var o={_id:item.seller._id,};
                        o.user=user._id;
                        o.name=user.name;
                        Seller.save({update:'user name'},o)
                    }
                })
            }

            function cloneStore(item) {
                return $q.when()
                    .then(function () {
                        return Store.upload(item)
                        //return Store.pickSubDomain()
                    })
                    .then(function () {
                        exception.showToaster('success','статус','выгрузка Store завершена')
                    })
                    .then(function () {
                        var url = (stuffHost)?'http://'+stuffHost+'/api/uploadStore/'+item._id:'/api/uploadStore/'+item._id
                        return $http.get(url)
                        //return Store.pickSubDomain()
                    })
                    .then(function () {
                        exception.showToaster('success','статус','выгрузка models завершена')
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('выгрузка магазина')(err)
                        }
                    })
                    /*.then(function(data){
                        var store = angular.copy(item);
                        delete store.seller
                        delete store._id
                        delete store.owner;
                        delete store.domain
                        store.name=data.name;
                        store.subDomain=data.subDoamin;
                        for(var k in store.sn){
                            store.sn[k].link=null;
                        }
                        
                        return Store.save(store)
                    })
                    .then(function(){
                        console.log(res)
                    })*/

            }
            function readStore(item,readStore) {
                if(!readStore){return}

                Confirm('подтверждаете?')

                    .then(function () {
                        return $http.get('/api/readStoreStuff/'+item._id+'?subDomain='+readStore)
                    })

                    .then(function () {
                        exception.showToaster('success','статус','чтение models завершено')

                    })
                   /* .then(function () {
                        return $http.get('/api/readStoreUser/'+item._id+'?subDomain='+readStore)
                    })
                    .then(function () {
                        exception.showToaster('success','статус','чтение users завершено')

                    })
                    .then(function () {
                        return $http.get('/api/readStoreOrder/'+item._id+'?subDomain='+readStore)
                    })
                    .then(function () {
                        exception.showToaster('success','статус','чтение orders завершено')

                    })*/
                    .then(function () {
                        var url = (storeHost)?'http://'+storeHost+'/api/readStoreStore/'+item._id+'?subDomain='+readStore:'/api/readStoreStore/'+item._id+'?subDomain='+readStore
                        return $http.get(url)
                    })
                    .then(function () {
                        exception.showToaster('success','статус','чтение Store завершено')
                    })
                    .then(function () {
                        self.subDomain=''

                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('загрузка магазина')(err)
                        }
                    })
                /*.then(function(data){
                 var store = angular.copy(item);
                 delete store.seller
                 delete store._id
                 delete store.owner;
                 delete store.domain
                 store.name=data.name;
                 store.subDomain=data.subDoamin;
                 for(var k in store.sn){
                 store.sn[k].link=null;
                 }

                 return Store.save(store)
                 })
                 .then(function(){
                 console.log(res)
                 })*/

            }
            function deleteStore(item) {
                var folder='images/'+item.subDomain;
                Confirm("удалить?" )
                    .then(function(){
                        Confirm("удалить "+ item.subDomain+"???" )
                            .then(function(){
                                var url = 'http://'+stuffHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url =socketHost+'/api/deleteStore/'+item._id
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url = 'http://'+orderHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url='http://'+userHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var url = 'http://'+storeHost+'/api/deleteStore/'+item._id;
                                //console.log(url)
                                return $http.get(url)
                            })
                            .then(function(){
                                var folder='images/'+((item.subDomain)?item.subDomain:item._id)
                                return Photo.deleteFolder('Store',folder)
                            })

                            .then(function (res) {
                                //console.log(res)
                                exception.showToaster('info','status','good');

                            })
                            .then(function(){
                                self.paginate.items--;
                                if(self.paginate.page){self.paginate.page--}
                                return getList()

                            })
                            .catch(function(err){
                                if(err){
                                    exception.catcher('удаление магазина')(err)
                                }
                            })
                    } )




                /*var stuffHost = req.store.protocol + '://'+config.stuffHost;
                var userHost = req.store.protocol + '://'+config.userHost;
                var notificationHost = req.store.protocol + '://'+config.notificationHost;
                var socketHost = req.store.protocol + '://'+config.socketHost;
                var storeHost = req.store.protocol + '://'+config.storeHost;
                var photoHost = req.store.protocol + '://'+config.photoDownload;*/
                return;

                var folder='images/'+item.subDomain;
                Confirm("удалить???" )
                    .then(function(){
                        return Store.delete({_id:item._id} ).$promise;
                    } )
                    .then(function(){
                        activate();
                        return Photo.deleteFolder('Stat',folder)
                    })
                    .then(function () {
                        return User.delete({store:item._id} ).$promise;
                        // delete catalog chat user orders
                    })
                    .catch(function(err){
                        exception.catcher('удаление магазина')(err)
                    })
            }

            function readStoreUnable(item) {
                item.readStore=true;
                $timeout(function () {
                    item.readStore=false
                },15000)
            }
            function changeType(type) {
                self.paginate.page=0;
                if(type){
                    self.query.storeType=type
                }else{
                    delete self.query.storeType
                }
                delete self.query.$or
                getList()
            }
            function searchItem(str) {
                str=str.substring(0,15)
                console.log(str)
                self.paginate.page=0;
                delete self.query.storeType
                if(str){
                    self.query.$or=[{name:str},{subDomain:str}]
                }else{
                    delete self.query.$or
                }
                getList()
            }

            function changeSubDomain(item) {
                $q.when()
                    .then(function () {
                        return siteName.choiceName()
                    })
                    .then(function (name) {
                        item.subDomain=name.toLowerCase();
                        saveField(item,'subDomain')
                    })

            }
            function changeDomain(item) {
                $q.when()
                    .then(function () {
                        var data={
                            windowName:'Введите название домена',
                            field:'domain'
                        }
                        return siteName.choiceName(data)
                    })
                    .then(function (name) {
                        item.domain=name.toLowerCase();
                        saveField(item,'domain')
                    })

            }
            function clearDomain(item) {
                Confirm('Очистить значение поля домен?')
                    .then(function () {
                        item.domain=null;
                        saveField(item,'domain')
                    })
            }



        }
    })


.directive('currencyComponent',currencyComponent)
.directive('mainConfig',mainConfigComponent)
.directive('configData',configDataComponent);
function configDataComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: configDataComponentCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/configData.component.html'
    }
}
configDataComponentCtrl.$inject=['ConfigData','$q'];
function configDataComponentCtrl(Items,$q) {
    var self=this;
    self.selectType=selectType;
    self.languagesOfPlatform=languagesOfPlatform;
    self.propertiesOfConfigData=propertiesOfConfigData;
    self.saveField=saveField;
    var query=null;
    activate()
    function activate(){
        self.type = propertiesOfConfigData[0].key
        selectType(self.type)
    }
    function selectType(type) {
        query={type:type}
        $q.when()
            .then(function () {
                return Items.getList(null,query)
            })
            .then(function (res) {
                //console.log(res)
                if(!res.length){
                    var acts=[];
                    languagesOfPlatform.forEach(function(lang,idx){
                        var o ={type:type,lang:lang,data:[]}
                        acts.push(Items.save(o).$promise)
                    })
                    return $q.when()
                        .then(function(){
                            //console.log(acts)
                            return $q.all(acts)
                        })
                        .then(function(){
                            return Items.getList(null,query)
                        })
                }else if(res.length!=languagesOfPlatform.length){
                    var arr =languagesOfPlatform.diff(res.map(function (item){return item.lang}))
                    var acts=[];
                    arr.forEach(function(lang,idx){
                        var o ={type:type,lang:lang,data:[]}
                        acts.push(Items.save(o).$promise)
                    })
                    return $q.when()
                        .then(function(){
                            //console.log(acts)
                            return $q.all(acts)
                        })
                        .then(function(){
                            return Items.getList(null,query)
                        })
                }else{
                    return res;
                }
            })
            .then(function (res) {
                self.items=res;
                console.log(self.items)
            })
    }
    function saveField(item,field) {
        console.log(item)
        var o ={_id:item._id}
        o[field]=item[field]
        Items.save({update:field},o)

    }
}

//==================currencyComponent======================
function currencyComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: currencyComponentCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/currency.component.html'
    }
}
currencyComponentCtrl.$inject=['Store','$q','global','$http','$uibModal','exception'];
function currencyComponentCtrl(Store,$q,global,$http,$uibModal,exception){
    var self=this;
    self.save=save;
    self.recalculatePrice=recalculatePrice;
    activate();
    function activate(){
        $q.when()
            .then(function(){
                return Store.get({_id:global.get('store' ).val._id}).$promise
            })
            .then(function(res){
                for(var key in res.currency){
                    if (key==res.mainCurrency){
                        res.currency[key][0]=1;
                    }else{
                        res.currency[key][0] =Number(res.currency[key][0]);
                    }
                }
                self.item=res;
            })
    }
    function save(){
        var o ={_id:global.get('store' ).val._id}
        for(var key in self.item.currency){
            if(self.item.currency[key][2]){
                self.item.currency[key][2]=self.item.currency[key][2].substring(0,5);
            }
        }
        o.currency=self.item.currency
        Store.save({update:'currency'},o)
    }
    function recalculatePrice() {
        self.percValue=0;


        $uibModal.open({
            animation: true,
            templateUrl: 'components/storeSetting/modal/progressBar.html',
            controller: function($uibModalInstance,socket){

                $q.when()
                    .then(function () {
                        return $http({
                            method: "get",
                            url: '/api/recalculatePrice',
                        })
                    })
                    .then(function () {
                        $uibModalInstance.close();
                        exception.showToaster('info','выполнено')
                    })
                    .catch(function (err) {
                        console.log(err)
                        if(err){
                            exception.catcher('пересчет цены')(err)
                        }
                        $uibModalInstance.close();
                    })




               /* var self=this;
                self.max=100;
                socket.on('recalculatePrice',function(data){
                    self.value=data.perc;
                    console.log(self.value)
                    if(data.perc>=97){
                        $uibModalInstance.close();
                    }
                })
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };*/
            },
            controllerAs:'$ctrl',
            size:'lg',

        });
        /*return $http({
            method: "get",
            url: stuffHost+'/api/recalculatePrice',
            data:data,
        })*/

        return;



        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/user/modal/downloadUsers.html',
            controller: function($uibModalInstance){
                var self=this;
                self.dateStart=Date.now()
                self.dateEnd=Date.now()
                self.ok=function(){
                    var o ={}
                    if(self.showPhone){
                        o={dateStart:self.dateStart,dateEnd:self.dateEnd}
                    }
                    $uibModalInstance.close(o);
                }
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs:'$ctrl',
            size:'lg',

        });
        modalInstance.result.then(function (data) {
            //console.log(data)
            $q.when()
                .then(function(){
                    self.pending=true;
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'components/storeSetting/modal/progressBar.html',
                        controller: function($uibModalInstance,socket){
                            var self=this;
                            self.max=100;
                            socket.on('recalculatePrice',function(data){
                                self.value=data.perc;
                                console.log(self.value)
                                if(data.perc>=97){
                                    $uibModalInstance.close();
                                }
                            })
                            self.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        controllerAs:'$ctrl',
                        size:'lg',

                    });

                    return $http({
                        method: "POST",
                        url: userHost+'/api/download/subscribersList',
                        data:data,
                    })
                })

                .then(function (response) {
                    self.pending=false;
                })
                .catch(function(err){
                    self.pending=false;
                    if(err){
                        err=err.data||err;
                        exception.catcher('пересчет цены')(err)
                    }

                })
        }, function () {
        });
    }
}


//==================currencyComponent======================
function mainConfigComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: mainConfigComponentCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/storeSetting/mainConfig.component.html'
    }
}
mainConfigComponentCtrl.$inject=['Config','$q','global','exception','toaster'];
function mainConfigComponentCtrl(Config,$q,global,exception,toaster){
    var self=this;
    self.updateItem=updateItem;
    activate();
    function activate(){
        $q.when()
            .then(function(){
                return Config.query().$promise
            })
            .then(function(res){
                self.item=res[1]
                console.log(self.item)
                //res[2].$delete();

            })
    }
    function updateItem(){

        var item=angular.copy(self.item)
        delete item._id;
        delete item.__v
        var keys=Object.keys(item).join(' ')
        /*console.log(keys)
        return;*/
        Config.save({update:keys},self.item,function(res){
            toaster.pop('success', "сохранение", "перезаписано");
        })

    }
}

angular.module('gmall.directives')
    .directive('tagManagerForObject', function() {
    return {
        restrict: 'E',
        scope: { tags: '=',header:'@'},
        template:
        '<div class="tags">' +
        '<h3 ng-bind="header"></h3>'+
        '<p class="link-warning">удалить теги</p><p><a ng-repeat="(idx, tag) in tags" class="tag" ng-click="remove(idx)">{{getNameTag(idx)}} - {{tags[idx][getNameTag(idx)]}}</a></p>' +
        '<hr></div>' +
        '<div class="form-group"><div class="input-group"><input class="form-control" type="text" placeholder="добавить тег" ng-model="new_value.key" style="width: 45%; margin-right: 10px"> ' +
        '<input class="form-control"  type="text" placeholder="добавить значение" ng-model="new_value.value" style="width: 45%">' +
        '<span class="input-group-btn"><a class="btn btn-fab btn-fab-mini" ng-click="add()"><i class="material-icons link-success">add</i></a></div></div> '+
        '<h4 class="link-success">редактировать из списка</h4>'+
        '<div>'+
        '<a  class="tag-list" ng-repeat="(idx,tag) in tags" ng-click="edit(idx)">{{getNameTag(idx)}} - {{tags[idx][getNameTag(idx)]}}</a>'+
        '</div><hr>',
        link: function ( $scope, $element ) {
            $scope.new_value={};
            $scope.getNameTag = function(i){
                return Object.getOwnPropertyNames($scope.tags[i])[0]
            }
            // FIXME: this is lazy and error-prone
            var input = angular.element( $element.children()[1] );

            // This adds the new tag to the tags array
            $scope.add = function() {
                if (!$scope.tags || !$scope.tags.length){$scope.tags=[]};
                var o={};
                o[$scope.new_value.key]=$scope.new_value.value
                $scope.tags.push(o);
                $scope.new_value = {};
            };

            // This is the ng-click handler to remove an item
            $scope.remove = function ( idx ) {
                $scope.tags.splice( idx, 1 );
            };
            $scope.edit = function(idx) {
                $scope.new_value.key = $scope.getNameTag(idx);
                $scope.new_value.value = $scope.tags[idx][$scope.new_value.key];
                $scope.tags.splice( idx, 1 );
            };

            // Capture all keypresses
            input.bind( 'keypress', function ( event ) {
                // But we only care when Enter was pressed
                if ( event.keyCode == 13 ) {
                    // There's probably a better way to handle this...
                    $scope.$apply( $scope.add );
                }
            });
        }
    };
})

    .directive('tagManager', function() {
        return {
            restrict: 'E',
            scope: { tags: '=' ,header:'@'},
            template:
            '<div class="tags">' +
            '<h3 ng-bind="header"></h3></br>'+
            '<p class="link-warning">удалить метки</p><p><a ng-repeat="(idx, tag) in tags" class="tag" ng-click="remove(idx)">{{tag}}</a></p>' +
            '<hr></div>' +
            '<div class="form-group"><div class="input-group"><input class="form-control"  type="text" placeholder="добавить тег" ng-model="new_value"> ' +
            '<span class="input-group-btn"><a class="btn btn-fab btn-fab-mini" ng-click="add()"><i class="material-icons link-success">add</i></a></span></div></div>'+
            '<h4 class="link-success">редактировать из списка</h4>'+
            '<div>'+
            '<a class="tag-list" ng-repeat="tag in tags" ng-click="edit($index)">{{tag}}</a>'+
            '</div>' +
            '<hr>',
            link: function ( $scope, $element ) {
                // FIXME: this is lazy and error-prone
                var input = angular.element( $element.children()[1] );

                // This adds the new tag to the tags array
                $scope.add = function() {
                    if (!$scope.tags || !$scope.tags.length){$scope.tags=[]}
                    $scope.tags.push( $scope.new_value );
                    $scope.new_value = "";
                };

                // This is the ng-click handler to remove an item
                $scope.remove = function ( idx ) {
                    $scope.tags.splice( idx, 1 );
                };
                $scope.edit = function(idx) {
                    $scope.new_value = $scope.tags[idx];
                    $scope.tags.splice( idx, 1 );
                };

                // Capture all keypresses
                input.bind( 'keypress', function ( event ) {
                    // But we only care when Enter was pressed
                    if ( event.keyCode == 13 ) {
                        // There's probably a better way to handle this...
                        $scope.$apply( $scope.add );
                        //event.stopPropagation();
                        event.preventDefault()
                    }
                });
            }
        };
    })




'use strict';
angular.module('gmall.directives')
    //https://github.com/deltreey/angular-simple-focus/blob/master/simple-focus.js
.directive('focusElement',['$timeout',function($timeout){
    return{
        scope:{
            focusElement:'=',
        },
        link:function($scope, $element, $attr){
            $scope.$watch('focusElement', function(value) {
                console.log(value)
                if (value) {
                    setTimeout(function(){
                        $element[0].focus();
                        $scope.focusElemen=false;
                    },200)
                    return;
                }
            })
        }
    }
}])
    .directive('simpleFocusElement',[function(){
        return{
            restrict: 'A',
            link:function(scope,element,attrs){
                setTimeout(function() {
                    element[0].focus();
                    //console.log(element[0])
                },300);
                if(attrs.simpleFocusElement=='false'){
                    console.log('focus',element[0])
                    //element[0].focus();
                    setTimeout(function() {
                        element[0].focus();
                    },200);
                }

            }
        }
    }])
    //http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
    .directive('focusMe1', function($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function(scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function(value) {
                    console.log('value=',value);
                    if(value === true) {
                        $timeout(function() {
                            element[0].focus();
                            //https://docs.angularjs.org/error/$rootScope/inprog?p0=$apply
                        },300, false);
                    }
                });
                // to address @blesh's comment, set attribute value to 'false'
                // on blur event:
                element.bind('blur', function() {
                    console.log('blur');
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    })
.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
                if(value === true) {
                    //console.log('value=',value);
                    $timeout(function() {
                        element[0].focus();
                        scope[attrs.focusMe] = false;
                    },300,false);
                }
            });
        }
    };
});



'use strict';
angular.module('gmall.directives')
.directive('selectDropDown',['$window',function($window){
    return{
        link:function(scope,element,attrs){
            //console.log(attrs['selectDropDown'])
            var defer=50;
            if(attrs['selectDropDown']=='defer'){
                defer=200;
            }
            setTimeout(function(){
                $(element).dropdown({ "callback": function($dropdown) {
                    // $dropdown is the shiny new generated dropdown element!
                    $dropdown.fadeIn("slow");
                }})
            },defer)
        }
    }
}])



'use strict';
angular.module('gmall.directives')
.directive('paginatorMain', function (anchorSmoothScroll,$anchorScroll) {
        return {
            restrict:'E',
            scope :{
                paginate:'=',
                getlist:'&',
                scroll:"@"
            },
            link: function (scope, element, attrs, controller) {
               //console.log('likn paginator',scope.paginate);
               if(!scope.paginate || typeof scope.paginate!='object'){
                   //console.log('exit')
                   return;
               }

                var l;
                scope.paginator={};
                scope.$watch('paginate.items',function(n,o){
                    //console.log(n)
                    if (n || n===0) {
                        scope.paginate.items=Number(n)
                        l=scope.paginator.pageCount();
                        scope.arrayPage=scope.getListPage();
                    }
                })


                function getList(){
                    //console.log(scope.scroll)
                    if(scope.scroll){
                        anchorSmoothScroll.scrollTo(scope.scroll,200);
                    }
                    scope.getlist();
                }

                scope.paginator.setPage = function (page) {
                    //console.log(page)
                    page = Number(page);
                    if (!page && page!==0) return;
                    if (page > scope.paginator.pageCount() || page==scope.paginate.page) {
                        return;
                    }
                    scope.paginate.page = page;

                    if (scope.paginate.page==0){
                        //console.log('думаем');
                        scope.arrayPage=scope.getListPage(2)

                    }
                    //console.log(l)
                    if (scope.paginate.page==(l-1)){
                        //console.log('посдедняя страница');
                        scope.arrayPage=scope.getListPage(6)
                    }

                    if (scope.paginate.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.paginate.page)>2){
                        scope.arrayPage=scope.getListPage()
                    } else if(scope.paginate.page==scope.arrayPage[4] && scope.arrayPage.length==7){
                        scope.arrayPage=scope.getListPage()
                    } else if (scope.paginate.page==scope.arrayPage[2] && scope.paginate.page-scope.arrayPage[0]>=2){
                        scope.arrayPage=scope.getListPage()
                    }


                    getList()
                };
                scope.paginator.nextPage = function () {
                    if (scope.paginator.isLastPage()) {
                        return;
                    }
                    scope.paginate.page++;
                    if (scope.paginate.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.paginate.page)>2){
                        scope.arrayPage=scope.getListPage()
                    } else if(scope.paginate.page==scope.arrayPage[4] && scope.arrayPage.length==7){
                        scope.arrayPage=scope.getListPage()
                    } else if (scope.paginate.page==scope.arrayPage[2] && scope.paginate.page-scope.arrayPage[0]>=2){
                        scope.arrayPage=scope.getListPage()
                    }
                    getList()
                };
                scope.paginator.perviousPage = function () {
                    if (scope.paginator.isFirstPage()) {
                        return;
                    }
                    scope.paginate.page--;
                    if (scope.paginate.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.paginate.page)>2){
                        scope.arrayPage=scope.getListPage()
                    } else if(scope.paginate.page==scope.arrayPage[4] && scope.arrayPage.length==7){
                        scope.arrayPage=scope.getListPage()
                    } else if (scope.paginate.page==scope.arrayPage[2] && scope.paginate.page-scope.arrayPage[0]>=2){
                        scope.arrayPage=scope.getListPage()
                    }
                    getList()
                };
                scope.paginator.firstPage = function() {
                    scope.paginate.page = 0;
                    getList()
                };
                scope.paginator.lastPage = function () {
                    scope.paginate.page = scope.paginator.pageCount() - 1;
                    getList()
                };
                scope.paginator.isFirstPage = function () {
                    return scope.paginate.page == 0;

                };
                scope.paginator.isLastPage = function () {
                    return scope.paginate.page == scope.paginator.pageCount() - 1;
                };
                scope.paginator.pageCount = function () {
                    var count = Math.ceil(parseInt(scope.paginate.items, 10) / parseInt(scope.paginate.rows, 10)); if (count === 1) { scope.paginate.page = 0; }
                    return count;
                };


                scope.changeRow = function(rows){
                    scope.paginate.rows=rows;
                    while (scope.paginator.pageCount()<(scope.paginate.page-1)){
                        scope.paginate.page--;
                    }
                    getList()
                }
                scope.arrayPage=[];

                scope.getListPage = function(num){
                    //console.log(num)
                    //if (!page){page=}
                    var page=scope.paginate.page;
                    var arrayPage=[];
                    if (num===0 || num){page = num}
                    //var page=scope.paginate.page;
                    //console.log(page,l)
                    if (l<=6){
                        for(var i=0;i<l;i++){
                            arrayPage.push(i)
                        }
                    }else{
                        if (page>=3 ){
                            arrayPage.push(0)
                            arrayPage.push('...');
                            arrayPage.push(page-1)
                            arrayPage.push(page)
                            arrayPage.push(page+1)
                        } else{
                            for(var i=0;i<4;i++){
                                arrayPage.push(i)
                            }
                        }
                        if(((l-1)-page)>2){
                            arrayPage.push('...');
                        }
                        arrayPage.push(l-1)
                    }
                    //console.log(arrayPage)
                    return arrayPage;
                }
                scope.getPageStr = function(i){
                    if (Number(i) || i===0){return i+1} else {return i}
                }

            },
            templateUrl: 'components/paginator/paginator.html'
        };
    })

'use strict';
angular.module('gmall.directives')
.directive('lostFocus',['$window',function($window){
    return{
        scope:{
            lostFocus:'&',
            focusElement:'=',
        },
        link:function(scope,element){
            //console.log('lostFocus')
            setTimeout(function () {
                if(scope.focusElement){
                    element[0].focus();
                }
                element.bind('blur', function (e) {
                    setTimeout(function () {
                        //console.log('scope.lostFocus()')
                        scope.lostFocus()
                    })
                });
                element.trigger('change')
            },  500);

            /*scope.$watch('focusElement',function(n){
                if(n){
                    setTimeout(function() {
                        element[0].focus();
                        scope.focusElement=false;
                    });
                }
            })*/
        }
    }
}])

    .directive('focusMe',[function(){
        return{
            scope:{
                focusMe:'=',
            },
            link:function(scope,element){
                scope.$watch('focusMe',function(n){
                    if(n){
                        setTimeout(function() {
                            element[0].focus();
                            scope.focusMe=false;
                        });
                    }
                })
            }
        }
    }])
    .directive('isScrolledIntoView',[function(){
        return {
            scope:{
                isScrolledIntoView:'='
            },
            link:function(scope,elem){
                function isScrolledIntoViewF(elem) {
                    var docViewTop = $(window).scrollTop();
                    var docViewBottom = docViewTop + $(window).height();

                    var elemTop = $(elem).offset().top-150;
                    var elemBottom = elemTop + $(elem).height();

                    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                }
                $(window).scroll(function(){
                    scope.isScrolledIntoView=isScrolledIntoViewF(elem)
                    scope.$apply()
                })
            }

        }
    }])


'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('ngAutocompleteCity', function($parse,$timeout,global) {
            return {
                scope: {
                    user:'=',
                    change:'&'
                },

                link: function(scope, element, attrs, model,contorller) {
                    var placeChosen=false;
                    setTimeout(function(){
                        activate()
                    },500)
                    function activate(){
                        if(!scope.user){scope.user={}}
                        if(!scope.user.profile){scope.user.profile={}}
                        if(!scope.user.profile.city){scope.user.profile.city=''}
                        element[0].value=scope.user.profile.city;
                        if (scope.gPlace == undefined) {
                            //console.log(google.maps.places)
                            scope.gPlace = new google.maps.places.Autocomplete(element[0], {types: ['(cities)']});
                        }
                        google.maps.event.addListener(scope.gPlace, 'place_changed',place_changed);
                        google.maps.event.addDomListener(element[0], 'keydown', function(e) {
                            if (e.keyCode == 13) {
                                e.preventDefault();
                            }
                            //console.log(scope.user.profile.cityId)
                        });
                    }
                    scope.$watch(function(){return element.val()},function (o,n) {
                        //console.log(o,n)
                        if(n && n!=o && !placeChosen){
                            scope.user.profile.cityId=null;
                            scope.user.profile.city= element.val();
                            //scope.$apply()
                        }
                    })
                    function place_changed() {
                        placeChosen=true;
                        var place = scope.gPlace.getPlace();
                        if(place.place_id){

                            setTimeout(function(){
                                scope.user.profile.city= element.val();
                                $timeout(function () {
                                    scope.user.profile.cityId=place.place_id;
                                },200)

                                scope.$apply()
                                if(scope.change && typeof scope.change=='function'){
                                    scope.change()
                                }
                            },50)
                        }else{
                            scope.cityId=null;
                            scope.user.profile.city= element.val();
                            scope.$apply()
                        }
                        $timeout(function () {
                            placeChosen=false;
                        },1000)
                    }
                }
            };
        });
})()


'use strict';

angular.module('gmall.services')

.factory('Collection', function ($resource) {
    return $resource('/api/collections/Collection/:id', {
        id: '@id'
    }, {
        getCollectionsForBrand: {
            method: 'GET',
            isArray: true,
            params: {
                id:'',
                query:'query'
            }
        }
    });
})


'use strict';
angular.module('gmall.services')
.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID,diff) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID)+((diff)?diff:0);
        //console.log(elmYPosition(eID),stopY,diff)
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            //console.log(eID)
            var elm = document.getElementById(eID);
            //console.log(elm)
            if (!elm) return 0;
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
})



'use strict';
angular.module('gmall.services')
    .factory('CreateContent', ['global','$timeout',function(global,$timeout){
        /*console.log('photoHost',photoHost)
        if(!photoHost){
            console.log(global.get('store').val.link)
        }*/
        var photoHostForFactory;
        $timeout(function(){
            photoHostForFactory=(photoHost)?photoHost:global.get('store').val.link
        },1000)



        //**************************************************************************************
        function getHeader(user) {
            var s=
                '<table width="900px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 20px 0 0 0" border="0">'+
                '<tr width="100%" style="max-width:900px;">' +
                    // лого и название
                '<td width="50%" style=" padding:5px 20px"><a href="'+global.get('store').val.link+'">';
                    if(global.get('store').val.logo) {
                        s+='<img  style="width: 100px;" src="' + photoHostForFactory + '/' + global.get('store').val.logo + '"></br>'

                    }
                    if(global.get('store').val.name) {
                        s+='<span  style="width: 100px;" src="' + photoHostForFactory + '/' + global.get('store').val.name + '"></span>'
                    }
            s+='</a></td>';
            // телефон и емейл
            s+='<td width="50%"  style="text-align: right; padding:5px 20px">'
            if(global.get('store').val.seller.phone) {
                s+='<p><span>' +global.get('langOrder').val.phone+ '</span>'+
                    ': <a style="color:#666" href="tel:'+'+'+global.get('store').val.seller.phone+'"><span>'+'+' +global.get('store').val.seller.phone + '</span></a></p>'
            }
            if(global.get('store').val.feedbackEmail) {
                s += '<p><span>e-mail</span>'+
                    ': <a style="color:#666" href="mailto:'+global.get('store').val.feedbackEmail+'"><span>' + global.get('store').val.feedbackEmail + '</span></a></p>'
            }

            s+='</td></tr>';

            //переходы на сайт
            if(global.get('sections') && global.get('sections').val && global.get('sections').val[0]){
                s+='<table width="860px" cellpadding="0" cellspacing="0" style="max-width:900px;background-color: #000;border-collapse:collapse; border:1px solid #000;table-layout: fixed; padding: 0;margin: 0px 20px">' +
                    '<td width="50%" style="background-color: #333;text-align: center; padding: 20px;border:1px solid #fff;">' +
                    '<a style="color: #fff; text-transform: uppercase" href="'+global.get('store').val.link+'/cabinet'+'"><span>'+global.get('langOrder').val.mainCabinet+'</span></a>'+
                    '</td>';
                s+='<td width="50%" style="background-color: #333;text-align: center; padding: 20px;border:1px solid #fff;">' +
                    '<a style="color: #fff; text-transform: uppercase" href="'+global.get('store').val.link+'/'+global.get('sections').val[0].url+'/category'+'"><span>'+global.get('lang').val.catalog+'</span></a>'+
                    '</td>';
                s+='</tr></table>'

                /*'<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px; font-size: 20px;"><h3>'+user+'</h3></td></tr>'+

                 '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+name+'</h2></td></tr>';*/
                s+=    '</table>';
            }

            return s;
        }
        function getFooter(){
            var s='<style>.footer a</style><table class="footer" width="860px" cellpadding="0" cellspacing="0" style="margin: 20px;color: #000;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;" border="0">'+
                '<tr><td colspan="2" align="center" style="vertical-align: top; padding: 10px 20px;background-color:#333"><span style="font-family:Tahoma; font-size:12px; color:#e8e8e8;">';
            if(global.get('store').val.sn){
                for(var key in global.get('store').val.sn){
                    if(global.get('store').val.sn[key].is){
                        if(global.get('store').val.template.index && global.get('store').val.template.index.icons
                            &&global.get('store').val.template.index.icons[key+'white']){
                            s+='<a href="'+global.get('store').val.sn[key].link+'">'+
                                '<img style="width: 24px; height: 24px;margin: 0 10px" src="'+global.get('store').val.link+global.get('store').val.template.index.icons[key+'white'].img+'">'
                                +'</a>'
                        }

                    }
                }

            }
                    s+='</span></td></tr>'+
                        '<tr style="background-color: #fff;color: #000"><td align="left" style="vertical-align: top; padding: 10px 20px"><span style="font-size:14px; ">';
                            if(global.get('store').val.footer && global.get('store').val.footer.text){
                                s+=global.get('store').val.footer.text;
                            }

                        s+='</span></td>';
                        s+='<td align="right" style="vertical-align: top; padding: 10px 20px"><span style="font-size:14px;">';
                            if(global.get('store').val.footer && global.get('store').val.footer.text1){
                                s+=global.get('store').val.footer.text1;
                            }

                    s+='</span></td></tr></table>';
            return s
        }
        // ********************пустой контент
        function empty(){
            var s ='<h1>информация  отсутствует</h1>'
            return '<!DOCTYPE html><html><head><meta charset=utf-8/>' +
                '<style type="text/css">' +
                '@media only screen and (max-device-width:660px){.table-mobile{display:none !important;}}' +
                '</style>' +
                '</head><body onload="window.print()"><div style="max-width: 800px">' +s + '</div><body></html>';
        }
        //*************************** end empty*************************
        function getLink(t,u) {
            if(!t || !u){return null}
            var d = global.get('store').val.domain;
            console.log("global.get('store').val.domain",global.get('store').val.domain)
            switch(t){
                case 'stuffs':return d+'/group/category/'+u;
                case 'categories':return d+'/group/'+u;
                case 'brandTags':return d+'/group/category?brandTag='+u;
                case 'brands':return d+'/group/category?brand='+u;
                case 'filterTags':return d+'/group/category?queryTag='+u;
                case 'campaign':return d+'/camapign/'+u;
            }
        }
        function emailFromNews(item){
            var s=
                '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px"><a href="'+global.get('store').val.link+'"><img  style="width: 100px;" src="'+photoHostForFactory+'/'+global.get('store').val.logo+'"></a></td></tr>'+
                '<tr width="100%" style="max-width:900px;"><td style="text-align: center; padding: 5px; font-size: 20px;"><h3>usernameforreplace</h3></td></tr>'+

                '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.name+'</h2></td></tr>';
            s+=    '</table>';


            s+='<table class="table-mobile" width="100%" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0 " border="0">';
            if(item.blocks && item.blocks.length){
                item.blocks.forEach(function (block) {
                    if(block.name){
                        if(block.type=='text2'){
                            s+='<tr width="100%" style="max-width:900px;">' +
                                '<td style="padding: 5px">' +
                                '<h3 style="text-align: center; color: :#333333; font: 22px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; text-transform: uppercase">'+((block.name)?block.name:'')+'</h3>' +
                                '</td>' +
                                '<td style="padding: 5px">' +
                                '<h3 style="text-align: center; color: :#333333; font: 22px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; text-transform: uppercase">'+((block.name1)?block.name1:'')+'</h3>' +
                                '</td>' +
                                '</tr>';
                        }else{
                            s+='<tr width="100%" style="max-width:900px;"><td colspan="2" style="padding: 5px"><h3 style="text-align: center; color: :#333333; font: 22px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; text-transform: uppercase">'+block.name+'</h3></td></tr>';
                        }


                    }
                    if(block.img){
                        s+='<tr width="100%" style="max-width:900px;"><td  colspan="2" width="100%" style=" padding: 5px" >' ;
                        if(block.link){
                            s+= '<a href="'+global.get('store').val.link+block.link+'" style="cursor: pointer;">'
                        }

                        s+= '<img alt="" style="width: 100%;margin-bottom: 10px; display: block" src="'+photoHostForFactory+'/'+block.img+'">';
                        if(block.link){
                            s+= '</a>'
                        }

                        s+= '</td></tr>';

                    }
                    //console.log(block)
                    if(block.desc){
                        if(block.type=='text2'){
                            //console.log(block)
                            s+='<tr width="100%" style="max-width:900px;">' +
                                '<td style="padding: 5px">' +
                                '<span style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+((block.desc)?block.desc:'')+'</span>' +
                                '</td>' +
                                '<td style="padding: 5px">' +
                                '<span style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+((block.desc1)?block.desc1:'')+'</span>' +
                                '</td>' +
                                '</tr>';
                        }else{
                            s+='<tr width="100%" style="max-width:900px;"><td colspan="2" style="padding: 5px"><span style="text-align: justify;  color: :#333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+block.desc+'</span></td></tr>';
                        }

                    }

                    if(block.imgs && block.imgs.length){
                        for (var i=0,l=block.imgs.length;i<l;i += 2){
                            //console.log(i,!!block.imgs[i])
                            s+='<tr>';
                            var link1;
                            if(block.imgs[i].link){
                                if(block.imgs[i].link.indexOf('http')<0){
                                    link1=global.get('store').val.link+block.imgs[i].link;
                                }else{
                                    link1=block.imgs[i].link;
                                }
                            }else{
                                if(block.imgs[i].url){
                                    link1=getLink(block.type,block.imgs[i].url)
                                }

                            }
                            s+='<td style="padding: 5px; text-align: center;vertical-align: top">';
                            if(link1){
                                s+='<a href="'+link1+'">';
                            }

                            s+='<img alt="" style="width: 100%; display: block" src="'+photoHostForFactory+'/'+block.imgs[i].img+'">';
                            if(block.imgs[i].name){
                                s+='<span style="font-weight: 700; color: #666666; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+block.imgs[i].name+'</span>' ;
                            }

                            if(link1){
                                s+='</a>';
                            }
                            s+='</td>';
                            if(block.imgs[i+1])   {
                                //console.log(i+1)
                                var link2;
                                if(block.imgs[i+1].link){
                                    if(block.imgs[i].link.indexOf('http')<0){
                                        link2=global.get('store').val.link+block.imgs[i+1].link;
                                    }else{
                                        if(block.imgs[i+1].link){
                                            link2=block.imgs[i+1].link;
                                        }

                                    }
                                }else{
                                    link1=getLink(block.type,block.imgs[i+1].url)
                                }
                                s+='<td style="padding: 5px; text-align: center;vertical-align: top">';
                                if(link2){
                                    s+='<a href="'+link2+'">';
                                }

                                s+='<img alt="" style="width: 100%; display: block" src="'+photoHostForFactory+'/'+block.imgs[i+1].img+'">';
                                if(block.imgs[i+1].name){
                                    s+='<span style="font-weight: 700; color: #666666; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+block.imgs[i+1].name+'</span>' ;
                                }
                                if(link2){
                                    s+='</a>';
                                }
                                s+='</td>';
                            }else{
                                s+='<td style="padding: 5px; text-align: center;vertical-align: top"></td>'
                            }

                            s+='</tr>'
                        }
                    }
                })
            }
            s+='</table>';



            s+='<table width="900px" cellpadding="0" cellspacing="0" style="color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr><td border="0" colspan="2" style="border:none; border-top:#cccccc 5px solid;"></td></tr>'+
                /*'<tr><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td><td/><td/>'+*/
                /*'<td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td></tr>'+*/
                '<tr><td align="right" style="vertical-align: top"><span style="font-family:Tahoma; font-size:12px; color:#404040;">';
            if(global.get('store').val.sn){
                for(var key in global.get('store').val.sn){
                    if(global.get('store').val.sn[key].is){
                        s+='<a href="'+global.get('store').val.sn[key].link+'">'+
                               '<img style="width: 24px; height: 24px;margin: 15px 5px" src="'+global.get('store').val.link+'/views/template/img/icon/sn_grey/'+
                            key+'.png">'
                            +'</a>'
                    }
                }

            }
            s+='</span>' +
                '<td align="right"><span style="font-family:Tahoma; font-size:14px; color:#404040;">';
            if(global.get('store').val.footer && global.get('store').val.footer.text){
                s+=global.get('store').val.footer.text;
            }
            s+='</span></td></tr>'+
                '</table>'
            return s;
            return '<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="http://gmall.io/bower_components/bootstrap/dist/css/bootstrap.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + s + '</div>' +
                '</html>';
        }
        function emailBonus(stuffs){
            //console.log(stuffs)
            var nameEmail='бонусы'
            var item;

            var s=
                '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr width="100%" style="max-width:600px;"><td style="text-align: center; padding: 5px"><img alt="посмотреть на сайте" style="width: 100px;" src="'+photoHostForFactory+'/'+global.get('store').val.logo+'"></td></tr>'+
                '<tr width="100%"><td><h2 style="font-weight: 500; letter-spacing: 2px; text-transform: uppercase; text-align: center; color: #333333; font-family:  Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+nameEmail+'</h2></td></tr>';


            s+='</table>';
            stuffs.forEach(function(stuff){
                item=stuff;
                if(item.imgs && item.imgs.length){
                    s+='<table class="table-mobile" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;color: #333333; border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">';
                    for (var i=0,l=item.imgs.length;i<l;i++){
                        if(item.imgs[i].name){
                            s+='<tr width="100%" style="max-width:600px;">' +
                                '<td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.imgs[i].name+'</p></td>' +
                                '</tr>';
                        }


                        s+='<tr><td style="padding: 5px;">'+
                            '<img alt="бонусный купон"  style="width: 100%; display: block"   src="'+photoHostForFactory+'/'+item.imgs[i].img+'"></td>';

                        s+='</tr>'
                        if(item.imgs[i].desc){
                            s+='<tr width="100%" style="max-width:600px;"><td style=" padding: 5px"><p style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none;">'+item.imgs[i].desc+'</p></td></tr>';
                        }

                    }
                    s+='</table>';
                }
            })





            s+='<table width="600px" cellpadding="0" cellspacing="0" style="color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr><td border="0" colspan="2" style="border:none; border-top:#cccccc 5px solid;"></td></tr>'+
                '<tr><td align="left" style="vertical-align: top"><span style="font-family:Tahoma; font-size:12px; color:#404040;">';
            if(global.get('store').val.sn){
                for(var key in global.get('store').val.sn){
                    if(global.get('store').val.sn[key].is){
                        s+='<a href="'+global.get('store').val.sn[key].link+'">'+
                            '<img style="width: 24px; height: 24px;margin: 15px 5px" src="'+global.get('store').val.link+'/views/template/img/icon/sn_natur/'+
                            key+'.png">'
                            +'</a>'
                    }
                }

            }
            s+='</span>' +
                '<td align="right"><span style="font-family:Tahoma; font-size:16px; color:#404040;">';
            if(global.get('store').val.footer && global.get('store').val.footer.text){
                s+=global.get('store').val.footer.text;
            }
            s+='</span></td></tr>'+
                /*'<tr><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td><td/><td/><td width="20" height="20"><img src="1450821408255127738039" width="20" height="20" /></td></tr>'+*/
                '</table>'
            //return s;
            return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><div>' + s + '</div></html>';
        }
        //************************************************************************************
        function orderNote(order){
            //console.log(order)
            var s='';
            s +='<h3 class="order-name">'+global.get('langOrder').val.order+' № '+order.num+'</h3> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll');
            s+='<p>'+global.get('langOrder').val.sum+' '+(order.paySum).toFixed(2)+' '+order.currency+'</p>';
            return s;
        }
        function dateTimeNote(entry){
            //console.log(order)
            var s='';
            s +='<h3 class="order-name">'+global.get('langOrder').val.dateTime+'</h3> '+global.get('langOrder').val.onn+' '+entry.dateForNote;
            s+='<p>'+global.get('store').val.texts.masterName[global.get('store').val.lang]+' - '+entry.masterName+'</p>';
            s+='<p>'+entry.service.name+'</p>';
            return s;
        }
        function dateTimeCancelNote(entry){
            //console.log(order)
            var s='';
            s +='<h3 class="order-name">'+global.get('langOrder').val.dateTime+'<span style="color:red"> '+global.get('langOrder').val.removed+'</span></h3> '+global.get('langOrder').val.onn+' '+entry.dateForNote;
            s+='<p>'+global.get('store').val.texts.masterName[global.get('store').val.lang]+' - '+entry.masterName+'</p>';
            s+='<p>'+entry.service.name+'</p>';
            s+='<p>'+entry.user.name+'- '+entry.user.phone+'</p>';
            return s;
        }
        // html контент для ордера счет уведосление
        function order(order,invoice,commentPrint){
            //console.log(order)
            //console.log(global.get('groups').val)
            var lang = global.get('store').val.lang;
            var texts=global.get('store').val.texts;
            var user = (order.profile && order.profile.admin)?order.profile.admin:order.profile.fio;
            if(!user){
                user=order.user.name
            }
            var orderMailText=(texts.orderMailText && texts.orderMailText[lang])?texts.orderMailText[lang]:'';
            if(order.profile && order.profile.admin){
                orderMailText=''
            }
            var name =global.get('langOrder').val.order+' № '+order.num+'<small> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'</small>'

            var status = global.get('langOrder').val.entered.toUpperCase();
            if(order.status==2){
                status =global.get('langOrder').val.accepted.toUpperCase();
            }else if(order.status==3){status =global.get('langOrder').val.statuspaid.toUpperCase();
            }else if(order.status==4){status =global.get('langOrder').val.statussent.toUpperCase();
            }else if(order.status==5){status =global.get('langOrder').val.statusdelivered.toUpperCase();}
            user =global.get('langOrder').val.hello + ', '+user+'!';
            var s= getHeader(name)

            s+='<table width="900px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
            '<tr  width="100%"><td colspan="2" style="padding: 0 20px;"><h3 style="font-size: 24px">'+user+'</h3></td></tr>';
            if(order.status==1){
                s+='<tr  width="100%"><td colspan="2" style="padding: 0 20px"><p>'+orderMailText+'</p></td></tr>';
            }


            s+='<tr style="max-width:900px;"><td width="50%" style="max-width:900px;padding: 10px 20px;font-size: 16px;vertical-align: top">'+
                '<h4 style="font-weight: bold">'+status+'</h4>'+
                '<h4 style="font-weight: bold">'+global.get('langOrder').val.order.toUpperCase()+' № '+order.num+'</h4>'+
                '<p style="margin-bottom: 30px">'+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'</p>';
            if(commentPrint && order.comment){
                s +='<div><h4 style="font-weight: bold">'+global.get('langOrder').val.comments+'</h4><p>'+order.comment+'</p></div>';
            }
            if(invoice && order.payInfo){
                s +='<h4 style="font-weight: bold">'+global.get('langOrder').val.forpayment+'</h4>';
                s +='<p>'+order.payInfo+'</p>';
            }
            if(invoice){
                //console.log(order.checkOutLiqpayHtmlIs)
                if(order.checkOutLiqpayHtmlIs){
                    s+='<p>'+order.checkOutLiqpayHtml+'</p>'
                }
            }

            s+='</td>';
            s+= '<td style=" padding: 10px 20px; font-size: 16px;vertical-align: top;">'

            /*if(order.seller.name){
                s+='<p>'+global.get('langOrder').val.seller+'<strong>'+order.seller.name+'</strong></p>';
            }*/

            // данные покупателя
            s +='<h4 style="font-weight: bold">'+global.get('langOrder').val.customerdata+'</h4>';
            s +='<p> e-mail - '+order.user.email+'</p>';
            if(order.profile.fio){
                s +='<p> '+global.get('langOrder').val.name+'  - '+order.profile.fio+'</p>';
            }
            if(order.profile.phone){
                s +='<p> '+global.get('langOrder').val.phone+' - '+order.profile.phone+'</p>';
            }
            if(order.profile.city){
                s +='<p> '+global.get('langOrder').val.city+'  - '+order.profile.city+'</p></div>';
            }



            s+=    '</td></tr></table>';


            /*s +='<div class="container"><div class="col-lg-10 col-lg-offset-1"><div class="col-lg-6">'+
                '<h3>'+global.get('langOrder').val.order+' № '+order.num+'</h3> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'<br/>';*/

            s +='<table style="margin: 20px" width="860px" cellspacing="0" cellpadding="5" border="1px">';
            s+= '<thead><tr><th style="padding: 10px">#</th>' +
                '<th style="padding: 10px">'+global.get('langOrder').val.title+'</th>' +
                '<th class="text-center" style="padding: 10px; text-align: center">'+global.get('langOrder').val.species+'</th>' +
                '<th class="text-center" style="padding: 10px; text-align: center">'+global.get('langOrder').val.price+'</th>';
            s+='<th class="text-center" style="padding: 10px; text-align: center">'+global.get('langOrder').val.quantity+'</th>' +
                '<th class="text-center" style="padding: 10px; text-align: center">'+global.get('langOrder').val.sum+'</th></tr></thead>';

            s += '<tbody>';
            var cart = order.cart.stuffs;
            for (var j=0,lj=cart.length;j<lj;j++){
                var good =cart[j];
                s +='<tr><td style="padding: 10px">'+(j+1)+'</td><td style="padding: 10px"> '+good.name+' '+((good.artikul)?good.artikul:'')+'</td>' +
                    '<td class="text-center" style="padding: 10px; text-align: center">'+((good.sortName)?good.sortName:'')+
                    '</td><td class="text-center" style="padding: 10px; text-align: center">'+(order.kurs*good.cena).toFixed(2)+' '+order.currency+
                    '</td><td class="text-center" style="padding: 10px; text-align: center">'+good.quantity+'</td><td class="text-center">'+ ( order.kurs*good.sum).toFixed(2)+' '+order.currency+
                    '</td></tr>';
            }
            s +='</tbody>';
            s+='<tbody class="cart-item-total">';
            s +='<tr><th colspan="4" style="padding: 10px">'+global.get('langOrder').val.sum+'</th>'+
                '<th class="text-center" style="padding: 10px; text-align: center">'+order.getTotalQuantity()+'</th><th style="padding: 10px; text-align: center" class="text-center">'+(order.kurs*((order.sum0)?order.sum0:order.sum)).toFixed(2)+' '+order.currency+'</th></tr>';
            if(order.discount){
                s +='<tr><th colspan="4" style="padding: 10px">'+global.get('langOrder').val.withdiscount+'</th>';
                s +=(order.sum<order.sum0)?'<th class="text-center"  style="padding: 10px; text-align: center">'+Math.round((1-order.sum/order.sum0)*100)+'%</th>':'<th class="text-center" style="padding: 10px; text-align: center"></th>';
                s +='<th class="text-center"  style="padding: 10px; text-align: center">'+(order.kurs*order.sum).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.coupon && order.coupon._id){
                s +='<tr><th colspan="4" style="padding: 10px">'+global.get('langOrder').val.basedcoupon+'</th><th></th>'+
                    '<th class="text-center"  style="padding: 10px; text-align: center">'+(order.kurs*order.getCouponSum()).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            var totalDiscont=order.getTotalDiscount();
            /*if(totalDiscont){
                s +='<tr><th colspan="2">'+'сумма по учетной цене '+(order.priceSum).toFixed(2)+' '+order.currency +
                    '</th><th colspan="2">'+global.get('langOrder').val.totalDiscont+'</th><th></th>'+
                    '<th class="text-center">'+totalDiscont+'% '+'</th></tr>';
            }*/
            if(order.shipCost){
                s +='<tr><th colspan="4">'+global.get('langOrder').val.delivery+'</th><th></th>'+
                    '<th class="text-center" style="padding: 10px; text-align: center">'+(order.shipCost).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.totalPay){
                s +='<tr><th colspan="4">'+global.get('langOrder').val.paid+'</th><th></th>'+
                    '<th class="text-center" style="padding: 10px; text-align: center">'+(order.totalPay).toFixed(2)+' '+order.currency+'</th></tr>';
            }
            if(order.paySum!=order.getCouponSum()){
                s +='<tr><th colspan="4">'+global.get('langOrder').val.totaltopay+'</th><th></th>'+
                    '<th class="text-center" style="padding: 10px; text-align: center">'+(order.paySum).toFixed(2)+' '+order.currency+'</th></tr>';
            }


            s +='</tbody></table></div></div></div>';
            s += getFooter()
            return '<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="http://gmall.io/bower_components/bootstrap/dist/css/bootstrap.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + s + '</div>' +
                '</html>';
        }
        // *************************end order
        //**************************************************************************************
        //**************************************************************************************
        //**************************************************************************************
        // ********************информация по доставке в ордере новая
        function orderShipInfo(order){
            //console.log(order.seller)
            var shipDetail= order.shipDetail;

            var lang = global.get('store').val.lang;
            var texts=global.get('store').val.texts;

            //console.log(order.status,texts.orderMailText[lang])
            var name =global.get('langOrder').val.order+' № '+order.num+'<small> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'</small>'
            var user = global.get('user').val.profile.fio|| global.get('user').val.name;
            var status = global.get('langOrder').val.entered.toUpperCase();
            if(order.status==2){
                status =global.get('langOrder').val.accepted.toUpperCase();
            }else if(order.status==3){status =global.get('langOrder').val.statuspaid.toUpperCase();
            }else if(order.status==4){status =global.get('langOrder').val.statussent.toUpperCase();
            }else if(order.status==5){status =global.get('langOrder').val.statusdelivered.toUpperCase();}
            user =global.get('langOrder').val.hello + ', '+user+'!';
            var s= getHeader(name)

            s+='<table width="900px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr  width="100%"><td colspan="2" style="padding: 20px;"><h3 style="font-size: 24px">'+user+'</h3></td></tr></table>';

            s+='<table width="900px" cellpadding="0" cellspacing="0" style="max-width:900px;color: #333333;border-collapse:collapse; border:none;table-layout: fixed; padding: 0;margin: 0" border="0">'+
                '<tr style="max-width:900px;"><td width="50%" style="max-width:900px;padding: 10px 20px;font-size: 16px;vertical-align: top">'+
                '<h4 style="font-weight: bold">'+global.get('langOrder').val.order.toUpperCase()+' № '+order.num+'</h4>'+
                '<p>'+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'</p>'+
                '<h4 style="font-weight: bold;margin-bottom: 30px">'+status+'</h4>'+
                '<h4 style="font-weight: bold">'+global.get('langOrder').val.aboutdelivery+'' +'</h4>'+
                '</td></tr></table>';


            if(shipDetail && shipDetail.length){
                s +='<table style="margin: 20px" width="860px" cellspacing="0" cellpadding="5" border="1px">';
                s+='<thead><tr><th class="text-center"  style="padding: 10px; text-align: center">'+global.get('langOrder').val.title+'</th>' +
                    '<th class="text-center"  style="padding: 10px; text-align: center">'+global.get('langOrder').val.where+'</th>' +
                    '<th class="text-center"  style="padding: 10px; text-align: center">'+global.get('langOrder').val.waybill+'</th>' +
                    '<th class="text-center"  style="padding: 10px; text-align: center">'+global.get('langOrder').val.date+'</th>' +
                    '<th class="text-center" style="padding: 10px; text-align: center">'+global.get('langOrder').val.sum+'</th>';
                shipDetail.forEach(function(ship){
                    s+='<tr><td style="padding: 10px">';
                    ship.stuffs.forEach(function(stuff){
                        s+='<div style="width:80%;float:left">'+stuff.name+'</div><div style="float:left">'+stuff.qty+((stuff.unitOfMeasure)?(' '+stuff.unitOfMeasure):'')+'</div><div style="clear: both"></div><hr/>';
                    });
                    s+=ship.qty;
                    /*s+=''+global.get('langOrder').val.numberofunits+' <strong>'+ship.stuffs.length+'</strong>';*/
                    s+='</td><td style="padding: 10px; vertical-align: top">'+(ship.info||'')+'</td>';
                    s+='<td style="padding: 10px; vertical-align: top">'+(ship.ttn||'')+'</td>';
                    s+='<td style="padding: 10px; vertical-align: top">'+moment(ship.date).format("LLL")+'</td>';
                    s+='<td style="padding: 10px; vertical-align: top">'+(ship.sum||0).toFixed(2)+'&nbsp;'+order.currency+'</td></tr>';
                })
                s+="</table></br></br>";
            }else{
                s+='<h1>'+global.get('langOrder').val.infisnot+'</h1>'
            }
            s += getFooter()
            return '<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="http://gmall.io/bower_components/bootstrap/dist/css/bootstrap.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + s + '</div>' +
                '</html>';
        }
        //*************************** end orderSPShipInfo*************************
        // ********************информация по доставке в ордере уведомление
        function shipInfoNote(order){
            var s='';
            s +='<h3>'+global.get('langOrder').val.order+' № '+order.num+'</h3><br/> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'';
            if(order.user.profile){
                if(order.user.profile.fio){
                    s+="<p>"+order.user.profile.fio+"</p>";
                }else{
                    s+="<p>"+order.user.name+"</p>";
                }
                if(order.user.profile.phone){
                    s+="<p>"+order.user.profile.phone+"</p>";
                }
            }

            s+='<p>'+global.get('langOrder').val.totaltopay+' <strong>'+(order.paySum).toFixed(2)+' </strong>'+order.currency+'</p>';
            s+='<p>'+global.get('langOrder').val.sentshipinfo+'</p>'
            return s;
        }

        function shipInfo(order,ship){
            if (!ship.ttn || !ship.info ) return;
            var s = '<h3>'+global.get('langOrder').val.aboutdelivery+' ' +'</h3>';
            '<p>'+global.get('langOrder').val.onawarrant+' №'+order.num+' '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'</p>';
            s+='<strong>'+global.get('langOrder').val.waybill+' - '+ship.ttn||''+'</strong>'+' '+global.get('langOrder').val.from+' '+moment(ship.date ).format('LL')+'</p>';
            if (ship.info){
                s+='<p>'+ship.info.substring(0,250)+'</p>';
            }
            if (ship.sum){
                s+='<strong>'+(ship.sum).toFixed(2)+' '+order.currency+'</strong>';
            }
            if (ship.stuffs && ship.stuffs.length){
                s+='<strong>  '+ship.stuffs.length+' ед.</strong>';
            }

            return s;
        }

        //*************************** end ShipInfo***************************************
        //*******************************информация о платеже в ордере
        function payInfo(order,pay){
            if (!pay.sum ) return;
            var s = '<h3>'+global.get('langOrder').val.makepayment+' ' + '</h3>';
            s+='<p>'+global.get('langOrder').val.onawarrant+' №'+order.num+'<br> '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'</p>';
            s+='<p><strong>'+(pay.sum).toFixed(2)+' '+order.currency+'</strong></p>'+' '+moment(pay.date ).format('LL');
            if (pay.info){
                s+='<p>'+pay.info.substring(0,150)+'</p>';
            }
            return s;
        }
        //*********************************end PayInfo*************************************
        //****************************************************************************************
        //**************************************************************************************
        // ********************подтверждение ордера
        function acceptedInfo(order){
            var s = '<h3>'+global.get('langOrder').val.byorders+' №'+order.num+'</h3>';
            s+=' '+global.get('langOrder').val.from+' '+moment(order.date ).format('lll')+'.';
            if(order.user.profile){
                if(order.user.profile.fio){
                    s+="<p>"+order.user.profile.fio+"</p>";
                }else{
                    s+="<p>"+order.user.name+"</p>";
                }
                if(order.user.profile.phone){
                    s+="<p>"+order.user.profile.phone+"</p>";
                }
            }
            s+='<p><strong>'+global.get('langOrder').val.accepted+' </strong></p>';
            return s;
        }
        //*********************************end acceptedInfo*************************************
        //****************************************************************************************

        function invoiceInfo(order){
            var s='';
            s +='<h3>'+global.get('langOrder').val.order+' № '+order.num+'</h3><br/> '+global.get('langOrder').val.from+' '+moment(order.date).format('lll')+'';
            if(order.user.profile){
                if(order.user.profile.fio){
                    s+="<p>"+order.user.profile.fio+"</p>";
                }else{
                    s+="<p>"+order.user.name+"</p>";
                }
                if(order.user.profile.phone){
                    s+="<p>"+order.user.profile.phone+"</p>";
                }
            }

            s+='<p>'+global.get('langOrder').val.totaltopay+' <strong>'+(order.paySum).toFixed(2)+' </strong>'+order.currency+'</p>';
            s+='<p>'+global.get('langOrder').val.sentthepost+'</p>'
            //console.log(s)
            /*if(order.payInfo){
                s +='<p>Данные для оплаты</p>';
                s +='<p>'+order.payInfo+'</p>';
            }*/
            return s;
        }
        function call(number){
            //console.log(number)
            //number=number.substring(0,20)
            var s='';
            s+='<h3>'+number+'</h3>'
            s+='<p>'+global.get('langOrder').val.requestacallback+'</p>'
            s+='<p>'+moment().format('LLLL')+'</p>'
            return s;
        }



        return {
            empty:empty,
            order : order,
            orderNote:orderNote,
            dateTimeNote:dateTimeNote,
            shipInfo:shipInfo,
            payInfo:payInfo,
            invoiceInfo:invoiceInfo,
            acceptedInfo:acceptedInfo,
            orderShipInfo:orderShipInfo,
            call:call,
            emailFromNews:emailFromNews,
            emailBonus:emailBonus,
            shipInfoNote:shipInfoNote,
            dateTimeCancelNote:dateTimeCancelNote

        }
    }])
'use strict';

/* Directives */
// for material design
angular.module('gmall.directives')
    .directive('datePicker', ['$window', function($window) {

        return {
            scope: {
                onChange: '&',
                date: '='
            },
            link: function($scope, $element, $attrs) {
                console.log('link')
                var format  = 'YYYY-MM-DD';
                var options = {
                    format: format,
                    time: false,
                };

                if ($attrs.minDate) {
                    if ($attrs.minDate === 'today') {
                        options.minDate = $window.moment();
                    } else {
                        options.minDate = $attrs.minDate;
                    }
                }

                if ($scope.date) {
                    options.currentDate = $scope.date;
                }

                $($element).bootstrapMaterialDatePicker(options);
                $element.on('change', function(event, date) {
                    $scope.$apply(function() {
                        $scope.date = date.format(format);
                        $scope.onChange({
                            date: date
                        });
                    });
                });

                $scope.$watch('date', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $($element).bootstrapMaterialDatePicker('setDate', newValue);
                    }
                });
            }
        };

    }])

'use strict';
angular.module('gmall.directives')
.directive('editNote',[function(){
    return{
        scope:{
            obj:'=',
            lostFocus:'&',
            field:'@'
        },
        template:'<div class="form-group label-floating"><label class="control-label" for="comment">добавить заметку</label>' +
        '<textarea rows="2" ' +
        'class="form-control" ' +
        'style="width=100%" ' +
        'ng-model="obj.note"></textarea></div>',
        link:function(scope,element){
            setTimeout(function () {
                //console.log(scope.obj)
                //console.log(element.children().children('textarea')[0]);
                //element.children().children('textarea')[0].focus();
                var textarea=angular.element(element.children().children('textarea')[0])
                /*textarea.bind('blur', function (e) {
                    //console.log('lost focus',scope.field)
                    if (scope.field){
                        scope.lostFocus({field:scope.field})
                    }else{
                        scope.lostFocus({obj:scope.obj})
                    }

                });*/
            }, 100);
        }
    }
}])

'use strict';
(function(){
    
    angular.module('gmall.services')
        .service('Online', serviceFoo)
        .service('Booking', serviceBooking)
        .directive('reminderOnline',function () {
            return {
                templateUrl: 'components/ORDERS/online/reminderOnline.html',
            }
        })


    serviceBooking.$inject=['$resource','$uibModal','$q','global','$http','exception'];
    function serviceBooking($resource,$uibModal,$q,global,$http,exception){
        var Items= $resource('/api/collections/Booking/:_id',{_id:'@_id'});
        var timeRemindArr=timeRemindArrLang.map(function (el) {
            return {time:el[global.get('store').val.lang],part:el.part}
        })

        var timeDurationdArr=timeDurationArrLang.map(function (el) {
            return {time:el[global.get('store').val.lang],part:el.part}
        })
        //console.log(timeDurationdArr)

            /*[{time:'полчаса',part:2},
            {time:'час',part:4},
            {time:'два часа',part:8},
            {time:'три часа',part:12}]*/
        var startTimeParts=36;
        var endTimeParts=72;
        var timeParts=[];
        for(var i=0;i<96;i++){timeParts.push({busy:false,i:i})};
        var timeTable=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
        var timeTable15min=[
            '00:00','00:15','00:30','00:45',
            '01:00','01:15','01:30','01:45',
            '02:00','02:15','02:30','02:45',
            '03:00','03:15','03:30','03:45',
            '04:00','04:15','04:30','04:45',
            '05:00','05:15','05:30','05:45',
            '06:00','06:15','06:30','06:45',
            '07:00','07:15','07:30','07:45',
            '08:00','08:15','08:30','08:45',
            '09:00','09:15','09:30','09:45',
            '10:00','10:15','10:30','10:45',
            '11:00','11:15','11:30','11:45',
            '12:00','12:15','12:30','12:45',
            '13:00','13:15','13:30','13:45',
            '14:00','14:15','14:30','14:45',
            '15:00','15:15','15:30','15:45',
            '16:00','16:15','16:30','16:45',
            '17:00','17:15','17:30','17:45',
            '18:00','18:15','18:30','18:45',
            '19:00','19:15','19:30','19:45',
            '20:00','20:15','20:30','20:45',
            '21:00','21:15','21:30','21:45',
            '22:00','22:15','22:30','22:45',
            '23:00','23:15','23:30','23:45',
        ]
        var paginate={page:0,rows:500,totalItems:0};

        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            timeTable:timeTable,
            timeTable15min:timeTable15min,
            timeParts:timeParts,
            startTimeParts:startTimeParts,
            endTimeParts:endTimeParts,
            newBooking:newBooking,
            editBooking:editBooking,
            filterListServices:filterListServices,
            timeRemindArr:timeRemindArr,
            getDayOfYear:getDayOfYear,// порядковый номер дня в году
            getDaysOfMonth:getDaysOfMonth,// количество дней в месяце\
            sendMessage:sendMessage,// отправка данных о записи клиенту
            getDateStringFromEntry:getDateStringFromEntry,//
            getDateFromEntry:getDateFromEntry,//
            getDateFromStrDateEntry:getDateFromStrDateEntry,
            getDatesForWeek:getDatesForWeek,//
            selectService:selectService,
            getCheckOutLiqpayHtml:getCheckOutLiqpayHtml,
            getUsedTime:getUsedTime,
            getBookingWeek:getBookingWeek,
            getBookingWeekScheldule:getBookingWeekScheldule,
            getWeeksRange:getWeeksRange,
            scheduleTransfer:scheduleTransfer

        }
        function getCheckOutLiqpayHtml(entry,user) {
            //console.log(order)
            entry=angular.copy(entry);
            if(user){entry.user=user}
            return $q.when()
                .then(function () {
                    return $http.post('/api/orders/checkoutLiqpayEntry',entry)
                })
                .then(function (res) {
                    //console.log(res)
                    if(!res || !res.data.html){
                        return;
                    }
                    entry.checkOutLiqpayHtml=res.data.html
                    entry.checkOutLiqpayHtmlIs=true;
                })
                .then(function(res){
                })
                .catch(function(err){
                    exception.catcher('error')(err);
                })
        }
        function getDatesForWeek(date,num) {
            if(!num){num=7}
            var ds=[];
            var d= new Date(date)
            var dw = date.getDay()
            if(dw==0){dw=7}
            for(var i=1;i<=num;i++){
                d= new Date(date)
                d.setTime(d.getTime() + (i-dw)*86400000);
                d.setHours(0)
                var month = d.getMonth()// + 1; //months from 1-12
                var day = d.getDate();
                var year = d.getFullYear();
                var dayOfYear=getDayOfYear(month,day-1)
                if(month<10){month='0'+month}
                if(day<10){day='0'+day}
                var o={
                    date:'date'+year+month+day,
                    d:d,
                    dayOfYear:dayOfYear,
                    month:moment(d).format('MMMM')
                }
                ds.push(o)
            }
            return ds;
        }
        function getDateFromEntry(entry) {
            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            //console.log(entry.date,year,month,day,hour,minutes)
            try{
                var date = new Date(year,month,day,hour,minutes)
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }

        function getDateFromStrDateEntry(str) {
            var year =str.substring(4,8)
            var month = str.substring(8,10)
            var day = str.substring(10)
            //console.log(entry.date,year,month,day,hour,minutes)
            try{
                var date = new Date(year,month,day)
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function getDateStringFromEntry(entry,format) {
            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            //console.log(entry.date,year,month,day,hour,minutes)
            try{
                if(format){
                    var date = new Date(year,month,day)
                }else{
                    var date = new Date(year,month,day,hour,minutes)
                    date= moment(date).format('LLL')
                }
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function sendMessage(entry,user) {
            entry=JSON.parse(JSON.stringify(entry))
            if(user){entry.user=user;}
            var dataForSend={}

            var hour = Math.floor(entry.start/4)
            var minutes = (entry.start%4)*15
            var year = entry.date.substring(4,8)
            var month = entry.date.substring(8,10)
            var day = entry.date.substring(10)
            try{
                var date = new Date(year,month,day,hour,minutes)
                date= moment(date).format('lll')
                dataForSend.name=entry.user.name
                dataForSend.userId=entry.user._id
                dataForSend.phone=entry.user.phone
                dataForSend.text=global.get('langOrder').val.recordedOn+' '+entry.service.name.toUpperCase()+' '+global.get('langOrder').val.onn+' '+date;
                dataForSend.date=date;
            }catch(err){console.log(err)}
            console.log(dataForSend)
            if(dataForSend && dataForSend.date){
                $q.when()
                    .then(function () {
                        return $http.post('/api/users/sendMessageAboutDeal',dataForSend)
                    })
                    .catch(function (err) {
                        if(err){
                            exception.catcher('send message')(err)
                        }
                    })
            }

        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
            //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
            //.catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function newBooking(master,timePart,services,date,entryDate,start){

            //console.log(services)
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/newBooking.html',
                    controller: function ($uibModalInstance,global,$timeout,$user,exception,master,timePart,services,Booking,entryDate,start){
                        //console.log(services)
                        var self=this;
                        self.global=global;
                        //console.log(global.get('store').val.nameLists)
                        self.date=moment(date).format('L');
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';

                        self.hour=parseInt(timePart/4);
                        self.minutes=((timePart-self.hour*4)*15)?(timePart-self.hour*4)*15:'00';
                        self.timeRemindArr=timeRemindArr;
                        self.schedule=true;
                        self.mastersInEntry=[];
                        //console.log(timePart,self.hour,self.minutes)
                        master.services.forEach(function(s){
                            s.used=false;
                            s.duration = s.timePart*15
                            //console.log(s)
                        })
                        //console.log(master.services)
                        self.userName='';
                        self.master=master;
                        self.oldPhone='';
                        self.services=(services.length)?services:[];
                        //console.log(self.services);
                        self.entriesToMove=null;
                        self.entryToMove=null;

                        var pattern = /[^0-9]*/g;


                        if(global.get('store').val.seller && global.get('store').val.seller.minDurationForService && Number(global.get('store').val.seller.minDurationForService/15)){
                            var delta = Number(global.get('store').val.seller.minDurationForService/15);
                            if(delta==1){
                                delta=0;
                                console.log(delta)
                            }
                            self.timeDurationdArr=timeDurationdArr.filter(function (p) {
                                return !(p.part%delta)
                            })

                        }else{
                            self.timeDurationdArr=timeDurationdArr;
                        }

                        //self.selectUser=selectUser;
                        self.searchUser = searchUser;
                        self.clearUser=clearUser;
                        self.allFieldCheck=allFieldCheck;
                        self.addUser=addUser;
                        self.checkNameNewUser=checkNameNewUser;
                        self.refreshUsers=refreshUsers;
                        self.moveEtry=moveEtry;
                        self.addingNewUser=addingNewUser;

                        function addingNewUser() {
                            self.addingUser=!self.addingUser;
                            if(self.addingUser){
                                if(self.cachePhone){
                                    var newVal = self.cachePhone.replace(pattern, '')
                                    console.log(newVal)
                                    console.log(newVal.length==self.cachePhone.length)
                                    if(newVal.length==self.cachePhone.length){
                                        var tempPhone=self.cachePhone.substring(0,10);
                                        for(var i=tempPhone.length;i<10;i++){
                                            tempPhone+='0'
                                        }
                                        self.oldPhone=tempPhone;
                                    }else{
                                        self.userName=self.cachePhone;
                                    }
                                }
                            }
                        }

                        function refreshUsers(phone){
                            if (phone.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            self.cachePhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(phone)
                        }
                        function searchUser(phone){
                            var q= {$or:[{'profile.phone':phone},{name:phone},{email:phone}]}
                            $user.getList({page:0,rows:20},q).then(function(res){
                                self.users=res.map(function (user) {
                                    if(user.profile && user.profile.phone && user.profile.phone[0]=="+"){
                                        user.profile.phone=user.profile.phone.substring(1)
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length<10){
                                        while(user.profile.phone.length<10){
                                            user.profile.phone+='0'
                                        }
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length==10){
                                        user.profile.phone='38'+user.profile.phone
                                    }
                                    user.phone=(user.profile)?user.profile.phone:null;
                                    return user
                                });
                            })
                        }

                        function clearUser(){
                            self.user=null;
                        }
                        function addUser(){
                            console.log('add user')
                            var user={
                                name:self.userName,
                                email:self.userEmail,
                                profile:{
                                    phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10),
                                    fio:self.userName
                                },
                                store:global.get('store').val._id
                            }
                            return $q.when()
                                .then(function () {
                                    return $user.checkPhoneForExist(user.profile.phone)
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'phone exist in base'
                                    }
                                    if(user.email){
                                        return $user.checkEmailForExist(user.email)
                                    }else{
                                        user.email=user.profile.phone+'@gmall.io'
                                    }
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'email exist in base'
                                    }
                                })
                                .then(function(){
                                    return $user.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.addingUser=false;
                                    self.userName='';
                                    self.user=user;
                                    console.log(user)
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })
                        }
                        function allFieldCheck() {
                            var data =(!self.services.length && !self.reserved)|| (!self.user && !self.schedule && !self.reserved)
                            return data
                        }
                        function checkNameNewUser(){
                            //console.log(!self.userName || self.userName.length<3)
                            return (!self.userName || self.userName.length<3)
                        }
                        function moveEtry() {
                            //console.log(self.entryToMove);
                            // продолжителькость записи проверить qty
                            //console.log(master)
                            //console.log(start)
                            var busy=false;
                            for(var i=start;i<start+self.entryToMove.qty;i++){
                                if(master.entryTimeTable[i].busy || master.entryTimeTable[i].out){
                                    busy=true;
                                    break
                                }
                            }
                            //console.log(busy)
                            if(busy){
                                $uibModalInstance.dismiss('не достаточно времени');
                                return;
/*

                                exception.catcher('перенос записи')('не достаточно времени')
                                self.entryToMove=null;
                                return;*/
                            }
                            var o ={_id:self.entryToMove._id}
                            o.date=entryDate;
                            o.start=start;
                            o.move=false;
                            var update='start move date'
                            //console.log(o)
                            Booking.save({update:update},o,function(err){
                                global.set('saving',true);
                                $timeout(function(){
                                    global.set('saving',false);
                                },1500)
                            })
                            $uibModalInstance.close();

                        }

                        actived()
                        self.ok=function(){
                            //console.log(self.user)
                            //console.log(self.schedule)
                            var item={
                                remind:self.remind,
                                timeRemind:self.timeRemind,
                                schedule:self.schedule
                            }
                            if(self.services.length){
                                item.services=self.services
                            }else if(self.reserved){
                                item.services=[{
                                    _id:'reserved',
                                    name:'reserved',
                                    timePart:self.reserved
                                }]
                            }else{
                                return;
                            }
                            if(self.user && self.user._id){
                                item.user={
                                    _id:self.user._id,
                                        name:self.user.name,
                                        email:self.user.email
                                }
                                if(self.user.profile && self.user.profile.phone){
                                    item.user.phone=self.user.profile.phone;
                                }
                                /*console.log(item.user)
                                return;*/

                            }else if(self.schedule){
                                item.user={
                                    _id:'schedule',
                                    name:'schedule',
                                }
                            }else if(self.reserved){
                                item.user={
                                    _id:'reserved',
                                    name:'reserved',
                                }
                            }
                            if(self.mastersInEntry.length){
                                item.masters=self.mastersInEntry;
                            }




                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        function actived() {
                            var query={query:{master:master._id,move:true}}
                            Booking.query(query,function (res) {
                                //console.log(res)
                                if(res && res.length){
                                    res.shift();
                                    self.entriesToMove=res.map(function (e) {
                                        e.name=e.service.name+' '+Booking.getDateStringFromEntry(e);
                                        return e;
                                    })
                                }
                            })
                            self.masters=global.get('masters').val.filter(function (m) {
                                return m._id!=master._id
                            })

                            //console.log(self.masters)
                        }
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        master:function(){return master},
                        timePart:function(){return timePart},
                        services:function(){return services},
                        entryDate:function(){return entryDate},
                        start:function(){return start},

                    }
                });
                modalInstance.result.then(
                    function (item) {resolve(item)},
                    function (err) {reject(err)}
                );
            })

        }
        function editBooking(entry,masters){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/editBooking.html',
                    controller: function (global,$uibModalInstance,$user,Booking,$timeout,UserEntry,exception,entry,masters){
                        //console.log(masters,entry)
                        var self=this;
                        self.master=masters[entry.master];
                        self.global=global;
                        self.moment=moment;
                        self.entry=entry;
                        var currentDate=Booking.getDateStringFromEntry(entry,true)
                        self.dateEntry=moment(currentDate).format('LL')+','+moment(currentDate).format('dddd');
                        var oldEntry=angular.copy(entry)
                        self.qty=oldEntry.qty
                        self.remind=entry.remind;
                        self.timeRemind=entry.timeRemind;
                        self.hour=parseInt(entry.start/4);
                        self.minutes=(entry.start-self.hour*4)*15;
                        self.timeRemindArr=timeRemindArr;
                        var delta=0;
                        if(global.get('store').val.seller && global.get('store').val.seller.minDurationForService && Number(global.get('store').val.seller.minDurationForService/15)){
                            var delta = Number(global.get('store').val.seller.minDurationForService/15);
                            if(delta==1){
                                delta=0;
                                console.log(delta)
                            }
                            self.timeDurationdArr=timeDurationdArr.filter(function (p) {
                                return !(p.part%delta)
                            })

                        }else{
                            self.timeDurationdArr=timeDurationdArr;
                        }

                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
                        var update='';

                        self.updateUser=updateUser;
                        self.recordAgreed=recordAgreed;
                        self.saveField=saveField;
                        self.changeDuration=changeDuration;
                        self.changeStartPart=changeStartPart;
                        self.moveEntry=moveEntry;
                        self.timeParts=_setTimeParts()
                        self.changeTimeFilter=changeTimeFilter;
                        self.addNewUser=addNewUser;
                        self.refreshUsers=refreshUsers;
                        self.deleteUser=deleteUser;


                        //console.log(self.timeParts)
                        self.startPart=oldEntry.start;




                        actived()

                        function _setTimeParts(){
                            return timeTable15min.map(function (t,i) {
                                var busy = false;
                                if(self.master.entryTimeTable[i].out){
                                    busy =true;
                                }else if(self.master.entryTimeTable[i].busy && self.master.entryTimeTable[i].entry._id!=self.entry._id){
                                    busy =true;
                                }else{
                                    for(var j=i+1;j<i+self.qty;j++){
                                        if(!self.master.entryTimeTable[j] || self.master.entryTimeTable[j].out || (self.master.entryTimeTable[j].busy && self.master.entryTimeTable[j].entry._id!=self.entry._id)){
                                            busy =true;
                                        }
                                    }

                                }
                                return {part:i,time:t,busy:busy}
                            })
                        }
                        function addNewUser() {
                            console.log(self.newUser)
                            if(self.entry.users && self.entry.users.length && self.entry.users.some(function (u) {
                                   return u._id==self.newUser._id
                                })){return}
                            var o={_id:self.newUser._id,
                                phone:self.newUser.phone,
                                name:self.newUser.name,
                                email:self.newUser.email
                            }
                            self.entry.users.push(o);
                            saveField('users')
                        }
                        function deleteUser(i) {
                            self.entry.users.splice(i,1);
                            saveField('users')
                        }
                        function refreshUsers(phone){
                            if (phone.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            self.cachePhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(phone)
                        }
                        function searchUser(phone){
                            var q= {$or:[{'profile.phone':phone},{name:phone},{email:phone}]}
                            $user.getList({page:0,rows:20},q).then(function(res){
                                self.users=res.map(function (user) {
                                    if(user.profile && user.profile.phone && user.profile.phone[0]=="+"){
                                        user.profile.phone=user.profile.phone.substring(1)
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length<10){
                                        while(user.profile.phone.length<10){
                                            user.profile.phone+='0'
                                        }
                                    }
                                    if(user.profile && user.profile.phone && user.profile.phone.length==10){
                                        user.profile.phone='38'+user.profile.phone
                                    }
                                    user.phone=(user.profile)?user.profile.phone:null;
                                    return user
                                });
                            })
                        }

                        function actived(){
                            console.log(self.entry)
                            self.user=Object.assign({},entry.user);
                            if(self.user.phone){
                                self.splitPoint = self.user.phone.length-10;
                                self.phoneCode='+'+self.user.phone.substring(0,self.splitPoint)
                                self.user.phone=self.user.phone.substring(self.splitPoint)
                            }
                            self.mastersAdditional=global.get('masters').val.filter(function (m) {
                                return m._id!=self.entry.master._id
                            })

                            console.log(self.mastersAdditional)
                        }
                        function updateUser() {
                            self.editingUser=false;
                            /*var  {phone,name,email}=self.user;
                             console.log(phone,name,email)*/
                            var o={_id:entry.user._id};
                            o['profile.phone']=self.phoneCode.substring(1)+self.user.phone;
                            o['profile.fio']=self.user.name;
                            o.email=self.user.email;
                            update='profile.phone profile.fio email';

                            return $q.when()
                                .then(function () {
                                    if(o['profile.phone']){
                                        return $user.checkPhoneForExist(o['profile.phone'],entry.user._id)
                                    }else{
                                        throw 'phone is empty'
                                    }

                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'phone exist in base'
                                    }
                                    if(o.email){
                                        return $user.checkEmailForExist(o.email,entry.user._id)
                                    }else{
                                        o.email=o['profile.phone']+'@gmall.io'
                                    }
                                })
                                .then(function (res) {
                                    if(res && res.exist){
                                        throw 'email exist in base'
                                    }
                                })
                                .then(function(){
                                    return $user.save({update:update},o).$promise
                                })
                                .then(function () {
                                    entry.user=self.user;
                                    entry.user.phone=o['profile.phone'];
                                    saveField('user')
                                    /*console.log(entry.user)
                                    console.log(self.user)
                                    console.log(o)*/
                                    //actived()
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('обновление данных')(err)
                                    }
                                })
                            return;


                            if(!entry.user.phone || '+'+entry.user.phone.substring(0,self.splitPoint)!=self.phoneCode){
                                update='phone';
                            }else if(!entry.user.phone || entry.user.phone.substring(self.splitPoint)!=self.user.phone){
                                update='phone'
                            }
                            if(entry.user.name!=self.user.name){
                                update+=(update)?' name':'name';
                            }
                            if(entry.user.email!=self.user.email){
                                update+=(update)?' email':'email';
                            }
                            UserEntry.save({update:update},o,function(){
                                entry.user=o;
                                actived()
                            })
                            update='user';
                        }
                        var delay;
                        function recordAgreed(user) {
                            if(delay){return}
                            delay=true;
                            $timeout(function () {
                               delay=false
                            },2000)
                            entry.confirm=Date.now()
                            saveField('confirm')
                            Booking.sendMessage(entry,user)
                        }
                        function saveField(field) {
                            var o ={_id:entry._id}
                            o[field]=entry[field]
                            //console.log(o)
                            Booking.save({update:field},o,function(err){
                                global.set('saving',true);
                                $timeout(function(){
                                    global.set('saving',false);
                                },1500)
                            })
                        }
                        function changeDuration() {
                            //console.log(self.entry,self.master)
                            var delta = self.qty-self.entry.qty;
                            if(delta<0){
                                for(var i = self.entry.start+self.qty;i<self.entry.start+self.entry.qty;i++){
                                    self.master.entryTimeTable[i].busy=false
                                    delete self.master.entryTimeTable[i].entry
                                    delete self.master.entryTimeTable[i].noBorder
                                    console.log(i)
                                }
                                self.entry.qty=self.qty
                                oldEntry.qty=self.qty
                                saveField('qty')
                                self.timeParts=_setTimeParts()
                            }else{
                                var start = self.entry.start+self.entry.qty
                                var busy=false;
                                for(var i =start;i<start+delta;i++){
                                    if(!self.master.entryTimeTable[i] || self.master.entryTimeTable[i].busy || self.master.entryTimeTable[i].out){
                                        busy=true;
                                        break;
                                    }
                                }
                                if(!busy){
                                    console.log(start,start+delta)
                                    if(self.master.entryTimeTable[start-1]){
                                        self.master.entryTimeTable[start-1].noBorder=true;
                                    }
                                    for(var i =start;i<start+delta;i++){
                                        console.log(i)
                                        self.master.entryTimeTable[i].busy=true;
                                        self.master.entryTimeTable[i].entry=self.entry
                                        if(i<start+delta-1){
                                            self.master.entryTimeTable[i].noBorder=true;
                                        }else{
                                            self.master.entryTimeTable[i].noBorder=false;
                                        }
                                    }
                                    self.entry.qty=self.qty
                                    oldEntry.qty=self.qty
                                    saveField('qty')
                                    self.timeParts=_setTimeParts()
                                }else{
                                    //console.log(self.qty)
                                    exception.catcher('изменение продолжительности')('недостаточно свободного времени')
                                    self.qty=self.entry.qty
                                }

                            }
                        }
                        function changeStartPart() {
                            var delta=self.entry.start-self.startPart;
                            //console.log(delta)
                            var part={busy:false,i:0,master:self.master._id}
                            if(delta>0){
                                for(var i=0;i<self.entry.qty;i++){
                                    var j = self.startPart+i;
                                    //console.log(j,j+delta)

                                    self.master.entryTimeTable[j]=self.master.entryTimeTable[j+delta]
                                    self.master.entryTimeTable[j].i=j

                                }
                                for(var i=self.startPart+self.entry.qty;i<self.startPart+self.entry.qty+delta;i++){
                                    //console.log(i)
                                    if(self.master.entryTimeTable[i].busy && self.master.entryTimeTable[i].entry && self.master.entryTimeTable[i].entry._id==self.entry._id){
                                        self.master.entryTimeTable[i]=angular.copy(part)
                                        self.master.entryTimeTable[i].i=i;
                                    }

                                }
                            }else{
                                for(var i=self.entry.qty;i>0;i--){
                                    var j = self.startPart+i-1;
                                    //console.log(j,j+delta)

                                    self.master.entryTimeTable[j]=self.master.entryTimeTable[j+delta]
                                    self.master.entryTimeTable[j].i=j

                                }
                                //console.log(self.entry.start,self.entry.start-delta)
                                for(var i=self.entry.start;i<self.entry.start-delta;i++){
                                    //console.log(i)
                                    if(self.master.entryTimeTable[i].busy && self.master.entryTimeTable[i].entry && self.master.entryTimeTable[i].entry._id==self.entry._id){
                                        self.master.entryTimeTable[i]=angular.copy(part)
                                        self.master.entryTimeTable[i].i=i;
                                    }

                                }
                            }
                            self.entry.start=self.startPart;
                            self.hour=parseInt(self.entry.start/4);
                            self.minutes=(self.entry.start-self.hour*4)*15;
                            saveField('start')
                        }
                        function moveEntry() {
                            self.entry.move=!self.entry.move
                            self.saveField('move')
                            if(self.entry.move){
                                $uibModalInstance.close();
                            }
                        }
                        function changeTimeFilter(p) {
                            return !p.busy && !(p.part%delta)
                        }

                        self.ok=function(){
                            update=''
                            /*entry.remind=self.remind;
                            entry.timeRemind=self.timeRemind;

                            if(entry.remind!=oldEntry.remind){
                                if(update){update+=' '}
                                update+='remind';
                            }
                            if(entry.timeRemind!=oldEntry.timeRemind){
                                if(update){update+=' '}
                                update+='timeRemind';
                            }
                            if(entry.used!=oldEntry.used){
                                if(update){update+=' '}
                                update+='used';
                            }
                            if(entry.confirm!=oldEntry.confirm){
                                if(update){update+=' '}
                                update+='confirm';
                            }*/
                            $uibModalInstance.close({action:'save',update:update});
                        }
                        self.delete=function(){
                            $uibModalInstance.close({action:'delete'});
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        entry:function(){return entry},
                        masters:function(){return masters}

                    }
                });
                modalInstance.result.then(
                    function (action) {resolve(action)},
                    function () {reject()}
                );
            })

        }
        function filterListServicesOld(masters,items,selectedStuff) {
            var stuffs=null;
            /*console.log(selectedStuff)
            console.log(masters)*/
            // проверяем есть ли выбранный мастер
            var selectedMaster=masters.filter(function (m) {
                return m.selected;
            })
            //console.log("selectedMaster && selectedMaster.length",selectedMaster && selectedMaster.length)
            if(selectedMaster && selectedMaster.length){
                stuffs=selectedMaster[0].stuffs;
            }else{
                stuffs=masters.filter(function(m){
                    if(!selectedStuff.length){
                        m.show=true;
                        return true;
                    }
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                    return m.show;
                }).reduce(function(a,item){
                    Array.prototype.push.apply(a,item.stuffs)
                    return a
                },[])
            }


            //console.log(stuffs)
            items.forEach(function(item){
                item.stuffs.forEach(function (s) {
                    if(stuffs && selectedMaster.length){
                        if(stuffs.indexOf(s._id)>-1){s.hide=false}else{s.hide=true}
                        //console.log(stuffs.indexOf(s._id),s._id,s.name)
                    }else{
                        s.hide=false
                    }

                })
                item.hide=item.stuffs.every(function(s){return s.hide})
            })
            if(selectedStuff && selectedStuff.length){
                masters.forEach(function (m) {
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                })
            }

        }
        function filterListServices(masters,items,selectedStuff) {
            //console.log(selectedStuff)
            if(!selectedStuff){
                selectedStuff=[];
            }
            selectedStuff=selectedStuff.filter(function (s) {
                return s
            })
            var stuffs=null;
            // проверяем есть ли выбранный мастер
            var selectedMaster=masters.filter(function (m) {
                return m.selected;
            })
            //console.log("selectedMaster && selectedMaster.length",selectedMaster && selectedMaster.length)
            if(selectedMaster && selectedMaster.length){
                stuffs=selectedMaster[0].stuffs;
            }else{
                stuffs=masters.filter(function(m){
                    if(!selectedStuff.length){
                        m.show=true;
                        return true;
                    }
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                    return m.show;
                }).reduce(function(a,item){
                    Array.prototype.push.apply(a,item.stuffs)
                    return a
                },[])
            }

            if(selectedStuff && selectedStuff.length){
                masters.forEach(function (m) {
                    m.show = selectedStuff.every(function(s){
                        // все выбранные услуги оказываются мастером
                        return m.stuffs.indexOf(s._id)>-1
                    })
                })
            }
            //console.log(stuffs,selectedMaster.length)
            items.forEach(function (s) {
                if(stuffs && selectedMaster.length){
                    if(stuffs.indexOf(s._id)>-1){s.show=true}else{s.show=false}
                    //console.log(stuffs.indexOf(s._id),s._id,s.name)
                }else{
                    s.show=true
                }

            })
            //console.log(items)

        }
        function getDayOfYear(selectedMonth,day) {
            if(selectedMonth==1){
                return 31+day
            }else if(selectedMonth==2){
                return 31+29+day
            }else if(selectedMonth==3){
                return 31+29+31+day
            }else if(selectedMonth==4){
                return 31+29+31+30+day
            }else if(selectedMonth==5){
                return 31+29+31+30+31+day
            }else if(selectedMonth==6){
                return 31+29+31+30+31+30+day
            }else if(selectedMonth==7){
                return 31+29+31+30+31+30+31+day
            }else if(selectedMonth==8){
                return 31+29+31+30+31+30+31+31+day
            }else if(selectedMonth==9){
                return 31+29+31+30+31+30+31+31+30+day
            }else if(selectedMonth==10){
                return 31+29+31+30+31+30+31+31+30+31+day
            }else if(selectedMonth==11){
                return 31+29+31+30+31+30+31+31+30+31+30+day
            }else{
                return day;
            }
        }
        //https://habrahabr.ru/post/261773/
        function getDaysOfMonth(x, y) {
            return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor((1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + Math.floor(1/x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1)))/x); }
        function selectService(items) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                windowClass:'modalProject',
                templateUrl: 'components/ORDERS/online/selectServiceInSite.html',
                controller: function ($uibModalInstance, global, $timeout, items) {
                    var self=this;
                    self.global=global;
                    self.items=items;
                    //console.log(items)

                    self.ok = function (item) {
                        $uibModalInstance.close(item);
                    }

                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    }

                },
                controllerAs:'$ctrl',
                resolve:{
                    items:function () {
                        return items
                    }
                }
            })
            return modalInstance.result;
        }
        function getUsedTime(start,qty) {
            /*start=43
            qty=5*/
            var end = start+qty;
            var h = Math.floor(start/4);
            var m = (start-h*4)*15||'00';
            var h1 = Math.floor(end/4);
            var m1 = (end-h1*4)*15||'00';
            return h+'.'+m+' - '+h1+'.'+m1;
        }
        function getBookingWeek(queryWeek,selectedMaster,datesOfWeeks,ngClickOnEntry,admin) {
            //console.log(selectedMaster)
            var storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
            return getList(paginate,queryWeek)
                .then(function(data) {
                    selectedMaster['week']={}
                    datesOfWeeks.forEach(function (d,dayOfWeek) {
                        //console.log(d.dayOfYear,selectedMaster.timeTable[d.dayOfYear])
                        selectedMaster['week'][d.date]={}
                        selectedMaster['week'][d.date].entryTimeTable=angular.copy(timeParts);
                        selectedMaster['week'][d.date].entryTimeTable.forEach(function (p,i) {
                            p.date=d.date;
                            p.ngClickOnEntry=ngClickOnEntry;
                            if(storeScheduleWeek){
                                // в self.storeSchedule 0 - это воскр у нас 0 - это понедельник
                                var j = dayOfWeek+1;
                                if(dayOfWeek==6){
                                    j=0;
                                }
                                if(!storeScheduleWeek[j].is || p.i<storeScheduleWeek[j].start*4 || p.i>=storeScheduleWeek[j].end*4){
                                    p.out=true;
                                }
                            }


                            if(selectedMaster.timeTable && selectedMaster.timeTable[d.dayOfYear]){
                                if(!selectedMaster.timeTable[d.dayOfYear].is ||
                                    p.i<selectedMaster.timeTable[d.dayOfYear].s*4 ||
                                    p.i>=selectedMaster.timeTable[d.dayOfYear].e*4)
                                {
                                    p.out=true;
                                }

                            }


                        })
                    })
                    data.forEach(function(e){
                        //console.log(e)
                        var master= selectedMaster;
                        for(var i=e.start;i<e.start+e.qty;i++){
                            master.week[e.date].entryTimeTable[i].busy=true;
                            if(i==e.start){
                                master.week[e.date].entryTimeTable[i].usedTime=getUsedTime(e.start,e.qty);
                                master.week[e.date].entryTimeTable[i].userId= e.user._id;
                                master.week[e.date].entryTimeTable[i].service= e.service.name;
                                master.week[e.date].entryTimeTable[i].new=true;
                                master.week[e.date].entryTimeTable[i].qty=e.qty;
                                master.week[e.date].entryTimeTable[i].used=e.used;
                                master.week[e.date].entryTimeTable[i].confirm=e.confirm;
                                if(admin){
                                    master.week[e.date].entryTimeTable[i].user=e.user;
                                    //console.log(master.week[e.date].entryTimeTable[i].user)
                                }
                            }
                            if(i!=e.start){
                                master.week[e.date].entryTimeTable[i].noBorder=true
                            }
                            master.week[e.date].entryTimeTable[i].entry=e;
                            if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                                master.week[e.date].entryTimeTable[i].reservation=true;
                            }
                            if(i==e.start){
                                //console.log(master.week[e.date].entryTimeTable[i])
                            }
                        }
                    })
                });
        }
        function getBookingWeekScheldule(queryWeek,selectedWorkplace,datesOfWeeks,services,masters,ngClickOnEntry) {
            var storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
            return getList(paginate,queryWeek)
                .then(function(data) {
                    selectedWorkplace['week']={}
                    datesOfWeeks.forEach(function (d,dayOfWeek) {
                        selectedWorkplace['week'][d.date]={}
                        selectedWorkplace['week'][d.date].entryTimeTable=angular.copy(timeParts);
                        selectedWorkplace['week'][d.date].entryTimeTable.forEach(function (p,i) {
                            p.date=d.date;
                            p.ngClickOnEntry=ngClickOnEntry;
                            if(storeScheduleWeek){
                                // в self.storeSchedule 0 - это воскр у нас 0 - это понедельник
                                var j = dayOfWeek+1;
                                if(dayOfWeek==6){
                                    j=0;
                                }
                                if(!storeScheduleWeek[j].is || p.i<storeScheduleWeek[j].start*4 || p.i>=storeScheduleWeek[j].end*4){
                                    p.out=true;
                                }
                            }
                        })
                    })
                    data.forEach(function(e){
                        //e.ngClickOnEntry=ngClickOnEntry;
                        var serviseLink=null;
                        if(e.service && e.service._id && services){
                            var sTemp=services.getOFA('_id',e.service._id)
                            if(sTemp){
                                serviseLink=sTemp.link
                            }
                            //console.log(serviseLink)
                        }
                        var masterLink=null;
                        var masterName='';
                        if(e.master  && masters){
                            var mTemp=masters.getOFA('_id',e.master)
                            if(mTemp){
                                masterLink='/master/'+mTemp.url
                                masterName=mTemp.name;
                            }
                        }
                        var workplace= selectedWorkplace;
                        for(var i=e.start;i<e.start+e.qty;i++){
                            workplace.week[e.date].entryTimeTable[i].busy=true;
                            if(i==e.start){
                                workplace.week[e.date].entryTimeTable[i]._id=e._id;
                                workplace.week[e.date].entryTimeTable[i].usedTime=getUsedTime(e.start,e.qty);
                                workplace.week[e.date].entryTimeTable[i].userId= e.user._id;
                                workplace.week[e.date].entryTimeTable[i].service= e.service.name;
                                workplace.week[e.date].entryTimeTable[i].serviceLink= serviseLink;
                                workplace.week[e.date].entryTimeTable[i].masterLink= masterLink;
                                workplace.week[e.date].entryTimeTable[i].masterName= masterName;
                                if(e.masters && e.masters.length){
                                    workplace.week[e.date].entryTimeTable[i].masters=e.masters.map(function (m) {
                                        var mm = masters.getOFA('_id',m);
                                        return mm
                                    })
                                    //console.log(workplace.week[e.date].entryTimeTable[i].masters);

                                }

                                workplace.week[e.date].entryTimeTable[i].new=true;
                                workplace.week[e.date].entryTimeTable[i].qty=e.qty;
                                workplace.week[e.date].entryTimeTable[i].used=e.used;
                                workplace.week[e.date].entryTimeTable[i].confirm=e.confirm;
                                workplace.week[e.date].entryTimeTable[i].comment=e.comment;
                                workplace.week[e.date].entryTimeTable[i].zIndex=1;

                            }
                            if(e.service.backgroundcolor){
                                workplace.week[e.date].entryTimeTable[i].backgroundcolor=e.service.backgroundcolor;
                            }else{
                                workplace.week[e.date].entryTimeTable[i].backgroundcolor=null;
                            }

                            if(i!=e.start){
                                workplace.week[e.date].entryTimeTable[i].noBorder=true
                            }
                            workplace.week[e.date].entryTimeTable[i].entry=e;
                            if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                                workplace.week[e.date].entryTimeTable[i].reservation=true;
                            }
                            /*if(i==e.start){
                                console.log(master.week[e.date].entryTimeTable[i])
                            }*/
                        }
                    })
                });
        }
        function getWeeksRange(today) {
            var weeksRange= [{},{},{},{},{},{},{}]
            weeksRange.forEach(function (el,i) {
                if(!i){
                    var date = today;

                }else{
                    var date= new Date(today)
                    date.setTime(date.getTime() + (i*7)*86400000);
                    date.setHours(0)
                }
                var datesOfWeeks=getDatesForWeek(date);
                //console.log(datesOfWeeks)
                el.startDate=datesOfWeeks[0].d
                el.startDateString=moment(datesOfWeeks[0].d).format('DD MMM')
                el.endDate=datesOfWeeks[6].d
                el.endDateString=moment(datesOfWeeks[6].d).format('DD MMM')
                //console.log(el.startDateString,'-',el.endDateString)
            })
            return weeksRange
        }
        function scheduleTransfer(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/scheduleTransfer.html',
                    controller: function (global,$uibModalInstance,Booking,$timeout,exception){
                        var self=this;
                        self.global=global;
                        self.moment=moment;
                        self.paginate={}
                        var startdate = moment().subtract(42,"days")
                        var td = new Date(startdate)
                        //console.log(startdate,td)

                        self.weeksFrom=getWeeksRange(td)
                        self.weeksFrom.forEach(function (el) {
                            el.date=el.startDateString+'/'+el.endDateString
                        })

                        var addDate = moment().add(7,"days")
                        var addDate = moment().add(0,"days")
                        var tdAdd = new Date(addDate)

                        self.weeksTo=getWeeksRange(tdAdd)
                        self.weeksTo.forEach(function (el) {
                            el.date=el.startDateString+'/'+el.endDateString
                        })

                        //console.log(self.weeksFrom)
                        self.ok=function(){
                            if(!self.weekFrom || !self.weekTo){
                                exception.catcher('ошибка')('не выбрана неделя')
                                return
                            }
                            self.disabled=true;
                            //console.log(self.weekFrom,self.weekTo)
                            var date= new Date(self.weekFrom.startDate)
                            self.datesOfWeeks=Booking.getDatesForWeek(date);
                            //console.log(self.datesOfWeeks)
                            self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                                return item.date
                            })},'user.name':'schedule'};
                            //console.log(self.queryWeek)
                            var dataFrom,dataTo;
                            return Booking.getList(self.paginate,self.queryWeek)
                                .then(function(data) {

                                    if(data && data.length){
                                        data.shift()
                                    }
                                    //console.log(data)
                                    dataFrom=data;
                                    date= new Date(self.weekTo.startDate)
                                    self.datesOfWeeks=Booking.getDatesForWeek(date);
                                    //console.log(self.datesOfWeeks)
                                    self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                                        return item.date
                                    })},'user.name':'schedule'};
                                    return Booking.getList(self.paginate,self.queryWeek)
                                })
                                .then(function(data) {
                                    if(data && data.length){
                                        data.shift()
                                    }
                                    //console.log(data)
                                    dataTo=data;
                                    var acts=[];
                                    data.forEach(function (d) {
                                        var delEntryPromise = Booking.delete({_id:d._id});
                                        acts.push(delEntryPromise.$promise)

                                    })
                                    return $q.all(acts)

                                })

                                .then(function () {
                                    var start = moment(self.weekFrom.startDate);
                                    var end = moment(self.weekTo.startDate);
                                    var daysDelta=end.diff(start, "days")
                                    //console.log(daysDelta)

                                    /*var stD=new Date(self.weekFrom.startDate)
                                    var enD=new Date(self.weekTo.startDate)
                                    end.diff(start, "days")*/

                                    var acts=[];
                                    dataFrom.forEach(function (d) {
                                        //console.log(d)
                                        delete d._id
                                        delete d.__v
                                        var newDate = getDateFromEntry(d)
                                        newDate.setDate(newDate.getDate() + daysDelta);
                                        var month = newDate.getMonth() //+ 1; //months from 1-12
                                        var day = newDate.getDate();
                                        var year = newDate.getFullYear();
                                        if(month<10){month='0'+month}
                                        if(day<10){day='0'+day}
                                        d.date='date'+year+month+day;
                                        var newEntryPromise = Booking.save(d);
                                        acts.push(newEntryPromise.$promise)

                                    })
                                    return $q.all(acts)
                                })
                                .then(function (res) {
                                    //console.log(res)
                                    $uibModalInstance.close()
                                })
                                .catch(function (err) {
                                    $uibModalInstance.close(err)
                                    //console.log(err)
                                })


                            return

                            // установка идет он выбраной даты
                            self.week=week;
                            if(!week){
                                var date = self.date;
                            }else{

                                var date= new Date(self.date)
                                date.setTime(date.getTime() + (week*7)*86400000);
                                date.setHours(0)
                            }
                            if(!self.datesOfWeeks){
                                self.datesOfWeeks=Booking.getDatesForWeek(date);
                            }else{
                                var t = Booking.getDatesForWeek(date);
                                for(var i=0;i<t.length;i++){
                                    self.datesOfWeeks[i]=t[i]
                                }
                            }

                            try{
                                self.currentMonth=moment(date).format('MMMM')
                                //console.log(self.currentMonth)
                            }catch(err){}

                            self.currentDayOfWeek=self.td.getDay()
                            if(self.currentDayOfWeek==0){self.currentDayOfWeek=7;}
                            self.currentDayOfWeek--;
                            if(week){self.currentDayOfWeek==0;}
                            self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                                return item.date
                            })},master:self.selectedMaster._id};
                                //$uibModalInstance.close();
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };

                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(
                    function () {resolve()},
                    function () {reject()}
                );
            })

        }


    }

    serviceFoo.$inject=['$resource','$uibModal','$q','global'];
    function serviceFoo($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/Online/:_id',{_id:'@_id'});
        var timeRemindArr=[{time:'полчаса',part:2},
            {time:'час',part:4},
        {time:'два часа',part:8},
        {time:'три часа',part:12}]
        var timeDuration=[
            {time:'15 мин',part:1},
            {time:'полчаса',part:2},
            {time:'45 мин',part:3},
            {time:'час',part:4},
            {time:'1 час 30 мин',part:6},
            {time:'два часа',part:8},
            {time:'два часа 30 мин',part:10},
            {time:'три часа',part:12},
            {time:'четыре часа',part:16}
        ]
        var startTimeParts=36;
        var endTimeParts=72;
        var timeParts=[];
        for(var i=0;i<96;i++){timeParts.push({busy:false,i:i})};
        var timeTable=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
        var timeTable15min=[
            '00:00','00:15','00:30','00:45',
            '01:00','01:15','01:30','01:45',
            '02:00','02:15','02:30','02:45',
            '03:00','03:15','03:30','03:45',
            '04:00','04:15','04:30','04:45',
            '05:00','05:15','05:30','05:45',
            '06:00','06:15','06:30','06:45',
            '07:00','07:15','07:30','07:45',
            '08:00','08:15','08:30','08:45',
            '09:00','09:15','09:30','09:45',
            '10:00','10:15','10:30','10:45',
            '11:00','11:15','11:30','11:45',
            '12:00','12:15','12:30','12:45',
            '13:00','13:15','13:30','13:45',
            '14:00','14:15','14:30','14:45',
            '15:00','15:15','15:30','15:45',
            '16:00','16:15','16:30','16:45',
            '17:00','17:15','17:30','17:45',
            '18:00','18:15','18:30','18:45',
            '19:00','19:15','19:30','19:45',
            '20:00','20:15','20:30','20:45',
            '21:00','21:15','21:30','21:45',
            '22:00','22:15','22:30','22:45',
            '23:00','23:15','23:30','23:45',
        ]
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
            editEntry:editEntry,
            selectService:selectService,
            timeTable:timeTable,
            timeTable15min:timeTable15min,
            timeParts:timeParts,
            startTimeParts:startTimeParts,
            endTimeParts:endTimeParts,
            filterListServices:filterListServices
        }

        function getList(paginate,query){
           if(!paginate){
               paginate={page:0}
           }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
                //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                //.catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/CONTENT/master/createMaster.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,50))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        function selectService(master,timePart){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/selectService.html',
                    controller: function ($uibModalInstance,global,$user,UserEntry,exception,master,timePart){
                        var self=this;
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';

                        self.hour=parseInt(timePart/4);
                        self.minutes=(timePart-self.hour*4)*15;
                        self.timeRemindArr=timeRemindArr;
                        //console.log(timePart,self.hour,self.minutes)
                        master.services.forEach(function(s){
                            s.used=false
                        })
                        self.userName='';
                        self.master=master;
                        self.oldPhone='';
                        self.services=[];
                        var pattern = /[^0-9]*/g;

                        self.selectUser=selectUser;
                        self.searchUser = searchUser;
                        self.clearUser=clearUser;
                        self.allFieldCheck=allFieldCheck;
                        self.addUser=addUser;
                        self.checkNameNewUser=checkNameNewUser;
                        self.refreshUsers=refreshUsers;


                        function selectUser(user){
                            self.user=user;
                            self.users=null;
                        }
                        function refreshUsers(phone){
                            if (phone.length<3){return}
                            //var newVal = phone.replace(pattern, '').substring(0,10);
                            self.oldPhone=phone
                            //if(self.oldPhone==phone){return}else{self.oldPhone=phone}
                            searchUser(phone)
                        }
                        function searchUser(phone){
                            var q= {$or:[{'phone':phone},{name:phone},{email:phone}]}
                            UserEntry.getList({page:0,rows:20},q).then(function(res){
                                self.users=res;
                            })
                        }

                        function clearUser(){
                            self.user=null;
                        }
                        function addUser(){
                            console.log('add user')
                            var user={name:self.userName,
                                email:self.userEmail,
                                phone:self.phoneCode.substring(1)+self.oldPhone.substring(0,10)}
                            /*return $q.when()
                                .then(function(){
                                    return UserEntry.save(user).$promise
                                })
                                .then(function(res){
                                    user._id=(res._id)?res._id:res.id;
                                    self.addingUser=false;
                                    self.userName='';
                                    self.user=user;
                                    console.log(user)
                                    self.oldPhone=''
                                })
                                .catch(function(err){
                                    if(err){
                                        exception.catcher('новый клиент')(err)
                                    }
                                })*/
                        }
                        function allFieldCheck() {
                            var data =!self.services.length|| !self.user
                            return data
                        }
                        function checkNameNewUser(){
                            //console.log(!self.userName || self.userName.length<3)
                            return (!self.userName || self.userName.length<3)
                        }
                        self.ok=function(){
                            //console.log(self.remind)
                            var item={
                                services:self.services,
                                user:{
                                    _id:self.user._id,
                                    name:self.user.name,
                                    phone:self.user.phone,
                                    email:self.user.email
                                },
                                remind:self.remind,
                                timeRemind:self.timeRemind
                            }
                            //console.log(item)

                            $uibModalInstance.close(item);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        master:function(){return master},
                        timePart:function(){return timePart},
                    }
                });
                modalInstance.result.then(
                    function (item) {resolve(item)},
                    function () {reject()}
                );
            })

        }
        function editEntry(master,entry,saveFoo){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size:'lg',
                    templateUrl: 'components/ORDERS/online/editOnline.html',
                    controller: function ($uibModalInstance,$user,UserEntry,master,entry){
                        console.log(entry)
                        var self=this;
                        self.master=master;
                        self.entry=entry;
                        self.remind=entry.remind;
                        self.timeRemind=entry.timeRemind;
                        self.hour=parseInt(entry.start/4);
                        self.minutes=(entry.start-self.hour*4)*15;
                        self.timeRemindArr=timeRemindArr;
                        self.timeDuration=timeDuration;
                        console.log(self.timeDuration)
                        self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
                        self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
                        
                        self.updateUser=updateUser;
                        self.changeDuration=changeDuration;
                        
                        actived()


                        function actived(){
                            self.user=Object.assign({},entry.user);
                            self.splitPoint = self.user.phone.length-10;
                            self.phoneCode='+'+self.user.phone.substring(0,self.splitPoint)
                            self.user.phone=self.user.phone.substring(self.splitPoint)
                        }
                        function updateUser() {
                            self.editingUser=false;
                            /*var  {phone,name,email}=self.user;
                            console.log(phone,name,email)*/
                            var o={_id:entry.user._id};
                            o.phone=self.phoneCode.substring(1)+self.user.phone;
                            o.name=self.user.name;
                            o.email=self.user.email;
                            var update='';
                            if('+'+entry.user.phone.substring(0,self.splitPoint)!=self.phoneCode){
                                update='phone';
                            }else if(entry.user.phone.substring(self.splitPoint)!=self.user.phone){
                                update='phone'
                            }
                            if(entry.user.name!=self.user.name){
                                update+=(update)?' name':'name';
                            }
                            if(entry.user.email!=self.user.email){
                                update+=(update)?' email':'email';
                            }
                            //console.log(update,o)
                            UserEntry.save({update:update},o,function(){
                                entry.user=o;
                                actived()
                            })
                        }

                        function changeDuration() {
                            console.log(self.entry,master)
                        }

                        self.ok=function(){
                            entry.remind=self.remind;
                            entry.timeRemind=self.timeRemind;
                            $uibModalInstance.close('save');
                        }
                        self.delete=function(){
                            $uibModalInstance.close('delete');
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                    resolve:{
                        master:function(){return master},
                        entry:function(){return entry}
                    }
                });
                modalInstance.result.then(
                    function (action) {resolve(action)},
                    function () {reject()}
                );
            })

        }

        function saveMasterInOnlineEntry(onlineEntry,id,entries){
            var update={update:'master entries',embeddedName:'masters',embeddedPush:true};
            var o={_id:onlineEntry,master:id,entries:entries};
            return Items.save(update,o).$promise;
        }
        function saveEntriesInOnlineEntry(onlineEntry,id,entries){
            var update={update:'entries',embeddedName:'masters',embeddedVal:id};
            var o={_id:onlineEntry,entries:entries};
            return Items.save(update,o).$promise;
        }
        function filterListServices(masters,items,selectedStuff) {
            console.log(masters)
            var stuffs=null;
            stuffs=masters.filter(function(m){

                if(!selectedStuff.length){
                    m.show=true;
                    return true;
                }
                m.show = selectedStuff.every(function(s){
                    // все выбранные услуги оказываются мастером
                    return m.stuffs.indexOf(s._id)>-1
                })
                return m.show;
            }).reduce(function(a,item){
                a.extend(item.stuffs)
                return a
            },[])
            console.log(stuffs)
            items.forEach(function(item){
                item.stuffs.forEach(function (s) {
                    if(stuffs){
                        if(stuffs.indexOf(s._id)>-1){s.hide=false}else{s.hide=true}
                    }else{
                        s.hide=false
                    }

                })
                //item.hide=item.stuffs.every(function(s){return s.hide})
                console.log(item)
            })

        }
    }
})()

'use strict';
(function(){

    angular.module('gmall.services')
        .directive('onlineBooking',listDirective)
        .directive('weekSchedule',sheduleDirective)
        .directive('scheduleEntry',sheduleEntryDirective)
        .directive('ngRepeatEndWatch', function () {
            return {
                restrict: 'A',
                scope: {},
                link: function (scope, element, attrs) {
                    if (attrs.ngRepeat) {
                        if (scope.$parent.$last) {
                            if (attrs.ngRepeatEndWatch !== '') {
                                if (typeof scope.$parent.$parent[attrs.ngRepeatEndWatch] === 'function') {
                                    // Executes defined function
                                    scope.$parent.$parent[attrs.ngRepeatEndWatch]();
                                } else {
                                    // For watcher, if you prefer
                                    scope.$parent.$parent[attrs.ngRepeatEndWatch] = true;
                                }
                            } else {
                                // If no value was provided than we will provide one on you controller scope, that you can watch
                                // WARNING: Multiple instances of this directive could yeild unwanted results.
                                scope.$parent.$parent.ngRepeatEnd = true;
                            }
                        }
                    } else {
                        throw 'ngRepeatEndWatch: `ngRepeat` Directive required to use this Directive';
                    }
                }
            };
        })
        .directive('setClassWhenAtTop', function ($window,$timeout) {
            var $win = angular.element($window); // wrap window object as jQuery object
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                        offsetTop = element.offset().top-60; // get element's top relative to the document

                    scope.mastersRepeatDone=mastersRepeatDone;
                    var first,delay=1000;
                    function mastersRepeatDone() {
                        if(first){delay=500}else{first=true;}
                        $timeout(function(){
                            init()
                        },delay)

                    }

                    var scrollHandler =function (e) {
                        if ($win.scrollTop() >= offsetTop) {
                            element.addClass(topClass);
                        } else {
                            element.removeClass(topClass);
                        }
                    }

                    function init() {
                        var w=0,outerW=1;
                        try{
                            w =element.width();
                            outerW = element.parent().parent().width()
                        }catch(err){}
                        if(outerW>=w){
                            $(window).scroll(scrollHandler);
                        }else{
                            $(window).off("scroll", scrollHandler);
                        }

                    }

                }
            };
        })

    function listDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                if(global.get('mobile').val){
                    return  'components/ORDERS/online/onlineListMobile.html'
                }else{
                    return  'components/ORDERS/online/onlineList.html'
                }
            }
        }
    };
    function sheduleDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: scheduleCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                if(global.get('mobile').val){
                    return  'components/ORDERS/online/scheduleMobile.html'
                }else{
                    return  'components/ORDERS/online/schedule.html'
                }
            }
        }
    };
    function sheduleEntryDirective(global){
        return {
            scope: {},
            bindToController: true,
            controller: scheduleEntryCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(){
                if(global.get('mobile').val){
                    return  'components/ORDERS/online/scheduleEntryMobile.html'
                }else{
                    return  'components/ORDERS/online/scheduleEntry.html'
                }
            }
        }
    };
    listCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$timeout'];
    function listCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$timeout){

        var self = this;
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        self.onlineEntr={};
        self.date = new Date();
        self.td=new Date();
        var tz =  self.date.getTimezoneOffset()/60
        var month = self.date.getMonth()// + 1; //months from 1-12
        var day = self.date.getDate();
        var year = self.date.getFullYear();

        if(month<10){month='0'+month}
        if(day<10){day='0'+day}
        self.query={date:'date'+year+month+day};
        self.paginate={page:0,rows:500,totalItems:0}
        self.timeParts=Booking.timeParts;
        self.startTimeParts=Booking.startTimeParts
        self.endTimeParts=Booking.endTimeParts
        self.timeTable=Booking.timeTable;
        self.timeTable15min=Booking.timeTable15min;
        self.minDurationForService=global.get('store').val.seller.minDurationForService||15;
        var delta=0;
        //console.log(self.minDurationForService)
        switch (self.minDurationForService){
            case 30: delta=1;break;
            case 60: delta=3;break;
            case 90: delta=5;break;
            case 120:delta=7;break;
            default :delta=0;
        }
        self.timePartsForTable=[];
        var partsArray=[]
        for(var i=0;i<96;i=i+1+delta){
            self.timePartsForTable.push(Booking.timeParts[i])
            partsArray.push(i)
        }
        self.slideMasterWeekArry=[{id:0,active:false},{id:1,active:false},{id:2,active:false},{id:3,active:false},{id:4,active:false},{id:5,active:false},{id:6,active:false}]
        //console.log(global.get('langForm'))

        self.items=[];// list of stuffs
        self.selectedStuff=[];//
        self.selectedMaster;
        self.newItem={}
        var masters;

        self.datePickerOptions ={
            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD.MM.YY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true,
            autoUpdateInput: true,
            autoapply: true,
            eventHandlers: {
                'apply.daterangepicker': function(ev, picker) {
                    changeDate()
                }
            }
        }
        var dtt= new Date();
        self.datePickerOptions ={
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: dtt.setDate(dtt.getDate() + 90),
            //minDate: dtt,
            startingDay: 1
        }


        //self.getList=getList;
        self.newBooking=newBooking;
        self.changeDate=changeDate;

        self.filterServices=filterServices;
        self.selectStuff=selectStuff;
        self.selectMaster=selectMaster;
        //self.allTable=allTable;
        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;

        self.changeActiveSlide=changeActiveSlide;


        self.changeWeek=changeWeek;
        self.setWeekDates=setWeekDates;
        self.getDateObj=getDateObj;
        self.filterTimePartWeek=filterTimePartWeek;
        self.filterTimePartForMasterWeek=filterTimePartForMasterWeek;
        self.scheduleTransfer=scheduleTransfer;



        function filterServices(item) {
            return !item.hide
        }
        function selectStuff(item) {
           // console.log('selectStuff')
            //console.log(item.selectedStuff)
            if(item){
                self.selectedStuff=[item]
            }else{
                self.selectedStuff=[]
            }
            self.selectedMaster=null;
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            if($scope.mastersRepeatDone && typeof $scope.mastersRepeatDone=='function'){
                $scope.mastersRepeatDone()
            }
        }
        function selectMaster(master) {
            //console.log('selectMaster')
            //console.log(master)
            self.selectedStuff=[];
            self.selStuff=null;
            self.masters.forEach(function (m) {
                if(!master || m._id==master._id){
                    m.show=true
                }else{
                    m.show=false;
                }
            })
            if($scope.mastersRepeatDone && typeof $scope.mastersRepeatDone=='function'){
                $scope.mastersRepeatDone()
            }
            if(self.selectedMaster){
                activateMasterWeek()
            }
        }

        //*******************************************************
        activate();
        

        function activate() {

            socket.on('newRecordOnSite',function(){
                console.log('newRecordOnSite');
                $timeout(function () {
                    getBooking()
                },1000)
            })
            //console.log($rootScope.$stateParams)
            changeStartEndTimeParts()
            $q.when()
                .then(function () {
                    return getMasters()
                })
                .then(function(){
                   // console.log(self.masters)
                    if($rootScope.$stateParams && $rootScope.$stateParams.id){
                        var m = self.masters.getOFA('_id',$rootScope.$stateParams.id)
                        //console.log(m);
                        if(m){
                            self.hideMastersList= m;

                        }else{
                            self.masters=null;
                            throw "master doesn't match"
                        }


                    }
                    return getBooking()
                })
                .then(function () {
                    return getServices();
                })
                .then(function () {
                    return Booking.filterListServices(self.masters,self.items,self.selectedStuff);
                })
                .then(function () {
                    setServicesInMasters()
                })
                .then(function () {
                    if(self.hideMastersList){
                        selectMaster(self.hideMastersList)
                    }
                })
                .catch(function (err) {
                    exception.catcher('инициализация')(err)
                })

        }

        function getMasters(){
            return $q.when()
                .then(function(){
                    return Master.getList()
                })
                .then(function(data){
                    //console.log(data)
                    self.masters=data.map(function(m){
                        if(m.stuffs){
                            //m.stuffs=m.stuffs.map(function(s){return s._id})
                        }else{
                            m.stuffs=[];
                        }

                        return m
                    }).filter(function (m) {
                        //console.log(m.stuffs)
                        return m.stuffs.length
                    });
                    //console.log(self.masters)
                })
                .catch(function(err){
                    exception.catcher('получение списка мастеров')(err)
                });
        }

        function getBooking() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.mastersO={}
                    self.masters.forEach(function(m){
                        m.entryTimeTable=angular.copy(self.timeParts);
                        m.entryTimeTable.forEach(function (p) {
                            p.master=m._id;

                            if(self.dayOff){
                                p.out=true;
                            }else{
                                if(m.timeTable && m.timeTable[self.currentDayOfYear]){
                                    if(!m.timeTable[self.currentDayOfYear].is ||
                                        p.i<m.timeTable[self.currentDayOfYear].s*4 ||
                                        p.i>=m.timeTable[self.currentDayOfYear].e*4)
                                    {
                                        p.out=true;
                                    }

                                }
                            }

                            //console.log(self.dayOff,p.out)

                        })
                        if(m.timeTable && m.timeTable[self.currentDayOfYear]){
                            m.masterSchedule=angular.copy(m.timeTable[self.currentDayOfYear])
                            //console.log(self.currentDayOfYear,m.name,m.timeTable)
                            m.masterSchedule.s*=4;
                            m.masterSchedule.e*=4;
                        }else if(self.storeSchedule){
                            m.masterSchedule=self.storeSchedule;
                        }else{
                            m.masterSchedule={}
                        }
                        self.mastersO[m._id]=m
                    })
                    setBookingDataInMasters(data)
                });
        }
        function setBookingDataInMasters(booking){
            //console.log(booking)
            masters=self.masters.reduce(function (o,item) {
                o[item._id]=item;

                return o;
            },{})
            /*console.log(masters)
            console.log(booking)*/
            booking.forEach(function(e){
                var master= masters[e.master]
                for(var i=e.start;i<e.start+e.qty;i++){
                    master.entryTimeTable[i].busy=true;
                    if(i==e.start){
                        master.entryTimeTable[i].user= e.user.name;
                        master.entryTimeTable[i].phone= e.user.phone;
                        master.entryTimeTable[i].email= e.user.email||'';
                        master.entryTimeTable[i].service= e.service.name;
                        master.entryTimeTable[i].new=true;
                        master.entryTimeTable[i].qty=e.qty;
                        master.entryTimeTable[i].used=e.used;
                        master.entryTimeTable[i].confirm=e.confirm;
                        master.entryTimeTable[i].comment=e.comment;
                    }
                    if(i!=e.start){
                        master.entryTimeTable[i].noBorder=true
                    }
                    /*if(e.start+e.qty-1!=i){
                        master.entryTimeTable[i].noBorder=true
                    }*/
                    master.entryTimeTable[i].entry=e;
                    if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                        master.entryTimeTable[i].reservation=true;
                    }
                }
            })
        }
        function getServices() {
            return $q.when()
                .then(function () {
                    return Stuff.getServicesForOnlineEntry()
                })
                .then(function (res) {
                    //console.log('399',res)
                    res.forEach(function (s) {
                        s.duration=s.timePart*15
                        if(!s.currency){s.currency=global.get('store').val.mainCurrency}
                        s.currencyName=(global.get('store').val.currency && global.get('store').val.currency[s.currency] && global.get('store').val.currency[s.currency][2])?
                            global.get('store').val.currency[s.currency][2]:s.currency;

                    })
                    //console.log(self.items)
                    return self.items=res;
                })
                .catch(function(err){
                    exception.catcher('получение списка услуг')(err)
                });

        }
        function setServicesInMasters() {
            self.masters.forEach(function (m) {
                m.services=m.stuffs.map(function(s){
                    for(var i=0;i<self.items.length;i++){
                        if(self.items[i]._id==s){
                            return self.items[i]
                        }
                    }
                    return null;
                },[]).filter(function(i){return i})
                //console.log(m.services)
            })

        }





        function newBooking(master,part,week){
            if(part.out){console.log('out');return}
            var val =part.i;
            var start=val;
            var entry,entries=[];
            if(week){
                var entryTimeTable=master.week[part.date].entryTimeTable;
            }else{
                var entryTimeTable=master.entryTimeTable;
            }

            if(entryTimeTable[val].busy){
                editBooking(entryTimeTable[val].entry,val)
                return
            }
            $q.when()
                .then(function(){
                    //console.log(global.get('store').val)
                    if(week){
                        var dd = Booking.getDateFromStrDateEntry(part.date)
                        return Booking.newBooking(master,val,self.selectedStuff,dd,part.date,start)
                    }else{
                        return Booking.newBooking(master,val,self.selectedStuff,self.date,self.query.date,start)
                    }

                })
                .then(function(entryLocal){
                    if(!entryLocal)return;
                    entry=entryLocal;

                    var timePart=entry.services.reduce(function(t,item){
                        return t+item.timePart
                    },0)
                    //console.log(timePart)
                    for(var i=0+val;i<timePart+val;i++){
                        if(entryTimeTable[i].busy){
                            throw 'Не хватает времени'
                        }
                    }
                    entry.services.forEach(function(s,i){
                        var o = {
                            date:self.query.date,
                            master:master._id,
                            masterNameL:master.nameL,
                            masterName:master.name,
                            masterUrl:master.url,
                            masters:entry.masters,
                            start:val,
                            qty:s.timePart,
                            service:{_id:s._id,name:s.name},
                            stuffName:s.name,
                            stuffNameL:s.nameL,
                            stuffLink:s.link,
                            paySum:s.price||0,
                            currency:s.currency|| global.get('store').val.mainCurrency,
                            user:entry.user,
                            tz:tz
                        };
                        if(s.backgroundcolor){o.service.backgroundcolor=s.backgroundcolor}
                        if(week){
                            o.date=part.date
                        }
                        if(s.priceSale){
                            o.price=s.priceSale
                        }
                        if(i==0&& entry.remind && entry.timeRemind){
                            o.remind=entry.remind;
                            o.timeRemind=entry.timeRemind;
                        }
                        //console.log(o)
                        entries.push(o)
                        for(var i=0+val;i<s.timePart+val;i++){
                            //console.log(i)
                            entryTimeTable[i].busy=true;
                            if(i==val){
                                entryTimeTable[i].service=s.name;
                                entryTimeTable[i].user=entry.user.name;
                                entryTimeTable[i].noBorder=true
                            }
                            //console.log(i,entryTimeTable[i])

                            /*if(s.timePart+val-1!=i){
                                entryTimeTable[i].noBorder=true
                            }*/
                        }
                        val+=s.timePart;
                    })
                    var actions=[];
                    //console.log(entries)

                    /*entries.forEach(function (e) {
                        return $q.when().then(function () {
                            return Booking.save(e).$promise
                        })
                    })*/
                    entries.forEach(function (e) {
                        actions.push(getPromise(e))
                        //console.log(e)
                    })
                    return $q.all(actions);

                })
                .then(function(){
                    console.log('getBooking')
                    if(self.selectedMaster){
                        return Booking.getBookingWeek(self.queryWeek,self.selectedMaster,self.datesOfWeeks,ngClickOnEntry,true)
                    }else{
                        getBooking()
                    }

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('запись на время')(err)
                    }
                })
            function getPromise(e) {
                return Booking.save(e).$promise
            }
            return;
        }
        function editBooking(entry,val){
            //console.log(entry)
            return $q.when()
                .then(function(){
                    return Booking.editBooking(entry,masters)
                })
                .then(function(res){
                    if(res && res.action=='delete'){
                       return Booking.delete({_id:entry._id}).$promise;
                    }else if(res &&  res.action=='save' && res.update){
                        return Booking.save({update:res.update},entry).$promise;
                    }
                })
                .then(function(){
                    console.log('?????')
                    getBooking()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher(action)(err)
                    }

                })
        }
        function changeDate() {
            if(!self.date){
                self.date=new Date;
            }
            var date = new Date(self.date);
            changeStartEndTimeParts(date);
            var month = date.getMonth() //+ 1; //months from 1-12
            var day = date.getDate();
            var year = date.getFullYear();
            //console.log(d.getMonth())
            if(month<10){month='0'+month}
            if(day<10){day='0'+day}
            self.query={date:'date'+year+month+day};
            //console.log(self.query)
            getBooking()
            if(self.selectedMaster){
                self.slideMasterWeekArry[0].active=true
                changeWeek(0)
            }

        }
        function changeStartEndTimeParts(date) {
            if(!date){date=self.date}
            var dayOfWeek = date.getDay();
            var month = date.getMonth()
            var day = date.getDate();
            self.currentDayOfYear=Booking.getDayOfYear(month,day-1)
            self.storeSchedule=angular.copy(global.get('store').val.timeTable[dayOfWeek])
            self.dayOff=(self.storeSchedule && self.storeSchedule.is)?false:true;
            //console.log(self.storeSchedule)
            var start = (self.storeSchedule && self.storeSchedule.start)?self.storeSchedule.start:6
            var end = (self.storeSchedule && self.storeSchedule.end)?self.storeSchedule.end:20
            self.startTimeParts=start *4
            self.endTimeParts=end *4

            //console.log(self.startTimeParts,self.endTimeParts)

            self.startTimePartsWeek=self.startTimeParts
            self.startTimePartsWeek=self.endTimeParts

            if(global.get('store').val.timeTable){
                self.storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
                start=10;
                end=15;
                for(var dayOfWeek in global.get('store').val.timeTable){
                    if(global.get('store').val.timeTable[dayOfWeek].start<start){
                        start=global.get('store').val.timeTable[dayOfWeek].start;
                    }
                    if(global.get('store').val.timeTable[dayOfWeek].end>end){
                        end=global.get('store').val.timeTable[dayOfWeek].end;
                    }
                }
                self.startTimePartsWeek=start *4
                self.endTimePartsWeek=end *4
            }


        }


        function filterTimePart(part) {
            //console.log(self.startTimeParts, part.i,self.endTimeParts,part.i>=self.startTimeParts&&part.i<self.endTimeParts)
            return part.i>=self.startTimeParts&&part.i<self.endTimeParts
        }
        function filterTimePartForMaster(part) {
            return partsArray.indexOf(part.i)>-1 && part.i>=self.startTimeParts&&part.i<self.endTimeParts

            if(partsArray.indexOf(part.i)<0){return false}
            if(part.i>=self.startTimeParts&&part.i<self.endTimeParts&&self.storeSchedule.is){
                if(self.mastersO[part.master].masterSchedule){
                    if(part.i<self.mastersO[part.master].masterSchedule.s||part.i>=self.mastersO[part.master].masterSchedule.e || !self.mastersO[part.master].masterSchedule.is){
                        part.out=true;
                    }
                }
                //console.log(self.mastersO[part.master],part.master)
                return true;
            }else{
                part.out=true;
            }
        }


        function changeActiveSlide(index,swipe){
            self.masters[index].active=true;
            console.log(index,swipe)
            //https://stackoverflow.com/questions/30300737/angular-ui-trigger-events-on-carousel
            /*if(swipe){
                if(swipe=='left'){
                    if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                        carousel.isolateScope().next();
                    }

                    //index = (self.activeSlide<self.item.gallery.length-1)?self.activeSlide+1:0;
                }else if(swipe=='right'){
                    if(carousel && carousel.isolateScope && typeof carousel.isolateScope=='function'){
                        carousel.isolateScope().prev();
                    }

                    // index = (self.activeSlide>0)?self.activeSlide-1:self.item.gallery.length-1;
                }
            }
            if(slideDelay){return}
            slideDelay=true
            self.activeSlide=index;self.item.gallery[index].active=true;
            $timeout(function () {
                slideDelay=false
            },700)*/
        }




        function activateMasterWeek() {
            changeWeek(0)
        }
        function changeWeek(week) {
            setWeekDates(week)
            self.tempEntry=null;
            $q.when()
                .then(function () {
                    return Booking.getBookingWeek(self.queryWeek,self.selectedMaster,self.datesOfWeeks,ngClickOnEntry,true)
                })
                .then(function () {
                    self.slideMasterWeekArry[0].active=true
                    //console.log(self.selectedMaster)
                })
        }


        function setWeekDates(week) {
            // установка идет он выбраной даты
            self.week=week;
            if(!week){
                var date = self.date;
            }else{
                var date= new Date(self.date)
                date.setTime(date.getTime() + (week*7)*86400000);
                date.setHours(0)
            }
            if(!self.datesOfWeeks){
                self.datesOfWeeks=Booking.getDatesForWeek(date);
            }else{
                var t = Booking.getDatesForWeek(date);
                for(var i=0;i<t.length;i++){
                    self.datesOfWeeks[i]=t[i]
                }
            }

            try{
                self.currentMonth=moment(date).format('MMMM')
                //console.log(self.currentMonth)
            }catch(err){}

            self.currentDayOfWeek=self.td.getDay()
            if(self.currentDayOfWeek==0){self.currentDayOfWeek=7;}
            self.currentDayOfWeek--;
            if(week){self.currentDayOfWeek==0;}
            self.queryWeek={date:{$in:self.datesOfWeeks.map(function (item) {
                return item.date
            })},master:self.selectedMaster._id};
        }
        function getDateObj(dateStr) {
            if(!dateStr){return}
            var year = dateStr.substring(4,8)
            var month = dateStr.substring(8,10)
            var day = dateStr.substring(10)

            try{
                var date = new Date(year,month,day)
                var s =moment(date).format('ddd');
                return s+'/'+day;
            }catch(err){console.log(err);return 'error handle date'}
        }



        function getBookingWeek() {
            var storeScheduleWeek=angular.copy(global.get('store').val.timeTable)
            return self.Items.getList(self.paginate,self.queryWeek)
                .then(function(data) {
                    self.selectedMaster['week']={}
                    self.datesOfWeeks.forEach(function (d,dayOfWeek) {
                        self.selectedMaster['week'][d.date]={}
                        self.selectedMaster['week'][d.date].entryTimeTable=angular.copy(self.timeParts);
                        self.selectedMaster['week'][d.date].entryTimeTable.forEach(function (p,i) {
                            p.date=d.date;
                            p.ngClickOnEntry=ngClickOnEntry;
                            if(storeScheduleWeek){
                                // в self.storeSchedule 0 - это воскр у нас 0 - это понедельник
                                var j = dayOfWeek+1;
                                if(dayOfWeek==6){
                                    j=0;
                                }
                                if(!storeScheduleWeek[j].is || p.i<storeScheduleWeek[j].start*4 || p.i>=storeScheduleWeek[j].end*4){
                                    p.out=true;
                                }
                            }
                            if(self.selectedMaster.timeTable && self.selectedMaster.timeTable[d.dayOfYear]){
                                if(!self.selectedMaster.timeTable[d.dayOfYear].is ||
                                    p.i<self.selectedMaster.timeTable[d.dayOfYear].s*4 ||
                                    p.i>=self.selectedMaster.timeTable[d.dayOfYear].e*4)
                                {
                                    p.out=true;
                                }

                            }
                        })
                    })
                    data.forEach(function(e){
                        //console.log(e)
                        var master= self.selectedMaster;
                        for(var i=e.start;i<e.start+e.qty;i++){
                            master.week[e.date].entryTimeTable[i].busy=true;
                            if(i==e.start){
                                master.week[e.date].entryTimeTable[i].usedTime=Booking.getUsedTime(e.start,e.qty);
                                master.week[e.date].entryTimeTable[i].userId= e.user._id;
                                master.week[e.date].entryTimeTable[i].service= e.service.name;
                                master.week[e.date].entryTimeTable[i].new=true;
                                master.week[e.date].entryTimeTable[i].qty=e.qty;
                                master.week[e.date].entryTimeTable[i].used=e.used;
                                master.week[e.date].entryTimeTable[i].confirm=e.confirm;
                            }
                            if(i!=e.start){
                                master.week[e.date].entryTimeTable[i].noBorder=true
                            }
                            master.week[e.date].entryTimeTable[i].entry=e;
                            if(global.get('store').val.onlineReservation && (!e.status || e.status!=1)){
                                master.week[e.date].entryTimeTable[i].reservation=true;
                            }
                        }
                    })
                });
        }
        function ngClickOnEntry(date,index) {
            //console.log(date,index)
            var item=this;
            //console.log(item)
            newBooking(self.selectedMaster,item,true)
            /*if(!item.user && !item.temp){
                newBooking(date,item,index)
            }else if(item.user  && !item.temp && item.uiSref){
                $state.go('cabinet',{sec:'online'})
            }else if(item.temp){
                clearTempBooking()
            }*/
        }
        function filterTimePartWeek(part) {
            return part.i>=self.startTimePartsWeek&&part.i<self.endTimePartsWeek
        }
        function filterTimePartForMasterWeek(part) {
            //console.log(partsArray.indexOf(part.i)>-1 && part.i>=self.startTimePartsWeek&&part.i<self.endTimePartsWeek)
            /*if(partsArray.indexOf(part.i)<0){
                return;
            }*/
            return partsArray.indexOf(part.i)>-1 && part.i>=self.startTimePartsWeek&&part.i<self.endTimePartsWeek
        }
        function scheduleTransfer() {
            Booking.scheduleTransfer().then(
                function (err) {
                    if(err){
                        exception.catcher('перенос расписания')(err)
                    }else{
                        exception.showToaster('info','перенос расписания','Ok')
                    }
                    //console.log('!!!!!!!!!!!!!!')
                    getBooking()
                }
            )

        }
    }
    scheduleCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$state','Workplace','$timeout'];
    function scheduleCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$state,Workplace,$timeout){
        var self = this;

        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        self.onlineEntr={};
        self.date = new Date();
        self.td=new Date();
        // преводим на три недели назад
        self.td.setTime(self.td.getTime() - (3*7)*86400000);
        self.td.setHours(0)

        var d;
        self.datesFoeWeeks=[]
        for(var i=0;i<=7;i++){
            d= new Date(self.date)
            d.setTime(d.getTime() + (i*7)*86400000);
            d.setHours(0)
            self.datesFoeWeeks.push(d)
        }
        //console.log(self.datesFoeWeeks)
        var tz =  self.date.getTimezoneOffset()/60
        var month = self.date.getMonth()// + 1; //months from 1-12
        var day = self.date.getDate();
        var year = self.date.getFullYear();
        if(month<10){month='0'+month}
        if(day<10){day='0'+day}
        self.week=3;


        self.noWrapSlides = true;
        /*$scope.$watch(function () {
            return self.week
        },function (n,o) {
            if(n!=o){
                self.changeWeek(n)
            }
        })*/

        self.minDurationForService=global.get('store').val.seller.minDurationForService||15;
        var delta=0;
        //console.log(self.minDurationForService)
        switch (self.minDurationForService){
            case 30: delta=1;break;
            case 60: delta=3;break;
            case 90: delta=5;break;
            case 120:delta=7;break;
            default :delta=0;
        }



        self.timeParts=Booking.timeParts
        self.timePartsForTable=[];
        self.timePartsI=[];
        for(var i=0;i<96;i=i+1+delta){
            self.timePartsForTable.push(Booking.timeParts[i])
            self.timePartsI.push(i)
        }

        //console.log(self.timeParts)
        self.startTimeParts=Booking.startTimeParts
        self.endTimeParts=Booking.endTimeParts
        self.timeTable=Booking.timeTable;
        self.timeTable15min=Booking.timeTable15min;


        self.paginate={page:0,rows:100,totalItems:0}

        //console.log(global.get('langForm'))

        self.items=[];// list of stuffs
        self.selectedStuff=[];//
        self.selectedMaster;
        self.newItem={}
        var masters;


        var dtt= new Date();
        self.datePickerOptions ={
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: dtt.setDate(dtt.getDate() + 30),
            //minDate: dtt,
            startingDay: 1
        }
        self.slides=[{i:0},{i:1},{i:2},{i:3},{i:4},{i:5},{i:6},{i:7},{i:8},{i:9},{i:10},{i:11}]

        self.changeDate=changeDate;



        self.filterTimePart=filterTimePart;
        self.filterTimePartForMaster=filterTimePartForMaster;
        self.getDateObj=getDateObj;
        self.changeWeek=changeWeek;
        self.disabledTimePart=disabledTimePart;
        self.scheduleTransfer=scheduleTransfer;



        activate();

        $scope.$watch(function () {
            for (var i = 0; i < self.slides.length; i++) {
                if (self.slides[i].active) {
                    return self.slides[i];
                }
            }
        }, function (currentWeek, previousWeek) {
            if (currentWeek && previousWeek) {
                console.log('getBooking');
                changeWeek(currentWeek.i)
            }
        });



        function selectStuff(item) {
            // console.log('selectStuff')
            //console.log(item.selectedStuff)
            if(item){
                self.selectedStuff=[item]
            }else{
                self.selectedStuff=[]
            }
            self.selectedMaster=null;
            Booking.filterListServices(self.masters,self.items,self.selectedStuff);
            $scope.mastersRepeatDone()
        }

        //*******************************************************



        function activate() {
            socket.on('newRecordOnSite',function(){
                console.log('newRecordOnSite');
                $timeout(function () {
                    getBooking()
                },1000)
            })
            changeStartEndTimeParts()
            setWeekDates(0)
            self.weeksRange= Booking.getWeeksRange(self.td)
            //console.log(self.weeksRange)

            $q.when()
                .then(function () {
                    return getWorkplaces()
                })
                .then(function () {
                    return getMasters()
                })
                .then(function () {
                    return getServices();
                })
                .then(function(){
                    if(self.placeId){
                        self.selectedWorkplace=angular.copy(self.workplaces.getOFA('_id',self.placeId))
                    }
                    if(self.selectedWorkplace){
                        self.query.workplace = self.selectedWorkplace._id;
                        //console.log(self.query)
                    }else{
                        self.selectedWorkplace={}
                    }
                    self.query['user._id']='schedule'
                    return getBooking()
                })
                .then(function () {
                    //console.log('?????')
                    $timeout(function () {
                        self.slides[3].active=true
                    },1000)
                    //return changeWeek(3);
                })
                .catch(function (err) {
                    console.log(err)
                    exception.catcher('инициализация')(err)
                })
        }
        function setWeekDates(week) {
            self.week=week;
            if(!week){
                var date = self.td;

            }else{
                var date= new Date(self.td)
                date.setTime(date.getTime() + (week*7)*86400000);
                date.setHours(0)
            }

            self.datesOfWeeks=Booking.getDatesForWeek(date);
            try{
                self.currentMonth=moment(date).format('MMMM')
                //console.log(self.currentMonth)
            }catch(err){}

            self.currentDayOfWeek=self.date.getDay()
            if(self.currentDayOfWeek==0){self.currentDayOfWeek=7;}
            self.currentDayOfWeek--;
            if(week){self.currentDayOfWeek==0;}
            self.query={date:{$in:self.datesOfWeeks.map(function (item) {
                return item.date
            })},master:self.masterId};
            //console.log(self.query)

        }
        function changeWeek(week) {
            //console.log('week',week)
            setWeekDates(week)
            self.tempEntry=null;
            //console.log(self.weeksRange)
            $q.when()
                .then(function () {
                    return getBooking()
                })
        }
        function getWorkplaces(){
            return $q.when()
                .then(function(){
                    //return Master.getList()
                    return Workplace.getList(null,{})
                })
                .then(function(data){
                    self.workplaces=data
                })
                .catch(function(err){
                    exception.catcher('получение списка рабочих мест')(err)
                });
        }
        function getMasters(){
            return $q.when()
                .then(function(){
                    //return Master.getList()
                    return global.get('masters').val
                })
                .then(function(data){
                    //console.log(data)
                    self.masters=data
                })
                .catch(function(err){
                    exception.catcher('получение списка мастеров')(err)
                });
        }



        function getBooking() {
            //console.log(self.datesOfWeeks)
            Booking.getBookingWeekScheldule(self.query,self.selectedWorkplace,self.datesOfWeeks,self.items,self.masters,ngClickOnEntry)
                .then(function(data) {
                    //console.log(data)
                });
        }
        function getServices() {
            return $q.when()
                .then(function () {
                    return Stuff.getServicesForOnlineEntry()

                })
                .then(function (res) {
                    global.set('services',res)
                    return self.items=res.map(function (s) {
                        s.duration=s.timePart*15
                        if(!s.currency){s.currency=global.get('store').val.mainCurrency}
                        s.currencyName=(global.get('store').val.currency && global.get('store').val.currency[s.currency] && global.get('store').val.currency[s.currency][2])?
                            global.get('store').val.currency[s.currency][2]:s.currency;
                        return s;

                    })
                })
                /*.then(function () {
                 console.log('self.items',self.items)
                 })*/
                .catch(function(err){
                    console.log(err)
                    exception.catcher('получение списка услуг')(err)
                });

        }
        function changeDate() {
            if(!self.date){
                self.date=new Date;
            }
            var date = new Date(self.date);
            changeStartEndTimeParts(date);

            var month = date.getMonth() //+ 1; //months from 1-12
            var day = date.getDate();
            var year = date.getFullYear();

            //console.log(d.getMonth())
            if(month<10){month='0'+month}
            if(day<10){day='0'+day}
            self.query={date:'date'+year+month+day};
            //console.log(self.query)
            getBooking()
        }
        function changeStartEndTimeParts(date) {
            if(!date){date=self.date}
            var dayOfWeek = date.getDay();
            var month = date.getMonth()
            var day = date.getDate();
            self.currentDayOfYear=Booking.getDayOfYear(month,day-1)
            if(global.get('store').val.timeTable){
                self.storeSchedule=angular.copy(global.get('store').val.timeTable)
                self.dayoff=(self.storeSchedule[dayOfWeek] && self.storeSchedule[dayOfWeek].is)?false:true;
                //console.log(self.storeSchedule)
                var start = (self.storeSchedule[dayOfWeek] && self.storeSchedule[dayOfWeek].start)?self.storeSchedule[dayOfWeek].start:6
                var end = (self.storeSchedule[dayOfWeek] && self.storeSchedule[dayOfWeek].end)?self.storeSchedule[dayOfWeek].end:20
                self.startTimeParts=start *4
                self.endTimeParts=end *4
                for(dayOfWeek in global.get('store').val.timeTable){
                    if(global.get('store').val.timeTable[dayOfWeek].start<start){
                        start=global.get('store').val.timeTable[dayOfWeek].start;
                    }
                    if(global.get('store').val.timeTable[dayOfWeek].end>end){
                        end=global.get('store').val.timeTable[dayOfWeek].end;
                    }
                }
                //console.log(self.startTimeParts,self.endTimeParts)
                self.startTimeParts=start *4
                self.endTimeParts=end *4
            }
        }
        function filterTimePart(part) {
            return part.i>=self.startTimeParts&&part.i<self.endTimeParts
        }
        function filterTimePartForMaster(part) {
            if(self.timePartsI.indexOf(part.i)<0){
                return;
            }
            return part.i>=self.startTimeParts&&part.i<self.endTimeParts
        }
        function getDateObj(dateStr) {
            var year = dateStr.substring(4,8)
            var month = dateStr.substring(8,10)
            var day = dateStr.substring(10)

            try{
                var date = new Date(year,month,day)
                var s =moment(date).format('ddd');
                return s+'/'+day;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function getDateObjFromStr(dateStr) {
            var year = dateStr.substring(4,8)
            var month = dateStr.substring(8,10)
            var day = dateStr.substring(10)

            try{
                var date = new Date(year,month,day)
                return date;
            }catch(err){console.log(err);return 'error handle date'}
        }
        function disabledTimePart(part,index) {
            if(!self.week && index==self.currentDayOfWeek){
                //console.log('провека времени записи')
                var d = new Date()
                var h = d.getHours();
                var p = Math.ceil(d.getMinutes()/15)-1;
                if(part.i-h*4+p<4){
                    return true;
                }
            }
        }

        function scheduleTransfer() {
            Booking.scheduleTransfer().then(
                function (err) {
                    if(err){
                        exception.catcher('перенос расписания')(err)
                    }else{
                        exception.showToaster('info','перенос расписания','Ok')
                    }
                    //console.log('!!!!!!!!!!!!!!')
                    getBooking()
                }
            )

        }


        function ngClickOnEntry(date){
            return;
            var item=this;
            //console.log(item)
            newBooking(self.masters,item)
        }

        function newBooking(masters,part){
            if(part.out){console.log('out');return}
            var val =part.i;
            var start=val;
            var entry,entries=[];


            var entryTimeTable=master.week[part.date].entryTimeTable;

            if(entryTimeTable[val].busy){
                editBooking(entryTimeTable[val].entry,val)
                return
            }
            $q.when()
                .then(function(){
                    //console.log(global.get('store').val)
                    if(week){
                        var dd = Booking.getDateFromStrDateEntry(part.date)
                        return Booking.newBooking(master,val,self.selectedStuff,dd,part.date,start)
                    }else{
                        return Booking.newBooking(master,val,self.selectedStuff,self.date,self.query.date,start)
                    }

                })
                .then(function(entryLocal){
                    if(!entryLocal)return;
                    entry=entryLocal;
                    //console.log(entry)
                    var timePart=entry.services.reduce(function(t,item){
                        return t+item.timePart
                    },0)
                    //console.log(timePart)
                    for(var i=0+val;i<timePart+val;i++){
                        if(entryTimeTable[i].busy){
                            throw 'Не хватает времени'
                        }
                    }
                    entry.services.forEach(function(s,i){
                        var o = {
                            date:self.query.date,
                            master:master._id,
                            start:val,
                            qty:s.timePart,
                            service:{_id:s._id,name:s.name},
                            paySum:s.price||0,
                            currency:s.currency|| global.get('store').val.mainCurrency,
                            user:entry.user,
                            tz:tz
                        };
                        if(s.backgroundcolor){o.service.backgroundcolor=s.backgroundcolor}
                        if(week){
                            o.date=part.date
                        }
                        if(s.priceSale){
                            o.price=s.priceSale
                        }
                        if(i==0&& entry.remind && entry.timeRemind){
                            o.remind=entry.remind;
                            o.timeRemind=entry.timeRemind;
                        }
                        //console.log(o)
                        entries.push(o)
                        for(var i=0+val;i<s.timePart+val;i++){
                            //console.log(i)
                            entryTimeTable[i].busy=true;
                            if(i==val){
                                entryTimeTable[i].service=s.name;
                                entryTimeTable[i].user=entry.user.name;
                                entryTimeTable[i].noBorder=true
                            }
                            //console.log(i,entryTimeTable[i])

                            /*if(s.timePart+val-1!=i){
                             entryTimeTable[i].noBorder=true
                             }*/
                        }
                        val+=s.timePart;
                    })
                    var actions=[];
                    //console.log(entries)
                    entries.forEach(function (e) {
                        return $q.when().then(function () {
                            return Booking.save(e).$promise
                        })
                    })
                    return $q.all(actions);

                })
                .then(function(){
                    console.log('getBooking')
                    if(self.selectedMaster){
                        return Booking.getBookingWeek(self.queryWeek,self.selectedMaster,self.datesOfWeeks,ngClickOnEntry,true)
                    }else{
                        getBooking()
                    }

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('запись на время')(err)
                    }
                })
            return;
        }
        function editBooking(entry,val){
            //console.log(entry)
            return $q.when()
                .then(function(){
                    return Booking.editBooking(entry,masters)
                })
                .then(function(res){
                    if(res && res.action=='delete'){
                        return Booking.delete({_id:entry._id}).$promise;
                    }else if(res &&  res.action=='save' && res.update){
                        return Booking.save({update:res.update},entry).$promise;
                    }
                })
                .then(function(){
                    console.log('?????')
                    getBooking()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher(action)(err)
                    }

                })
        }

    }

    scheduleEntryCtrl.$inject=['$scope','Booking','Master','Stuff','$rootScope','global','Confirm','$q','exception','socket','$state','Workplace','$timeout'];
    function scheduleEntryCtrl($scope,Booking,Master,Stuff,$rootScope,global,Confirm,$q,exception,socket,$state,Workplace,$timeout){
        var self = this;
        self.moment=moment;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.Items=Booking;
        var entryId= $rootScope.$stateParams.id

        self.recordAgreed=recordAgreed;
        self.saveField=saveField;
        self.deleteItem=deleteItem;


        activate(entryId)


        function activate(id) {
            self.Items.getItem(id).then(function(data){
                if(data.user && data.user._id!='schedule'){
                    data.user.pay=data.pay;
                    data.user.confirm=data.confirm;
                    data.users=[data.user];
                }
                console.log(data)
                self.entry=data;
            })
                .then(function(){
                //return Master.getList()
                return global.get('masters').val
            })
                .then(function(data){
                    console.log(data);

                    self.masters=data.filter(function (m) {
                        return m._id!=self.entry.master
                    })

                    console.log(self.masters)
                })
        }
        var delay;
        function recordAgreed(user) {
            if(delay){return}
            delay=true;
            $timeout(function () {
                delay=false
            },2000)
            user.confirm=Date.now()
            saveField('users',self.entry.users)
            Booking.sendMessage(self.entry,user)
        }
        function saveField(field,data) {
            var o ={_id:self.entry._id}
            if(data){
                o[field]=data
            }else{
                o[field]=self.entry[field]
            }

            //console.log(o)
            Booking.save({update:field},o,function(err){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            })
        }
        function deleteItem(item) {
            $q.when()
                .then(function () {
                    return Booking.delete({_id:item._id}).$promise;
                })
                .then(function () {
                    $state.go("frame.schedule")
                })

        }

    }

})()

'use strict';
(function(){

    angular.module('gmall.services')
        .service('Master', serviceFoo);
    serviceFoo.$inject=['$resource','$uibModal','$q','global'];
    function serviceFoo($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/Master/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){
           if(!paginate){
               paginate={page:0}
           }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
                //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                //console.log(response)
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                //.catch(getItemFailed);
            function getItemComplete(response) {
                if(response && response.blocks && response.blocks.length){
                    response.blocks.forEach(function (b) {
                        if(b.type=='stuffs'){
                            if(b.stuffs && b.stuffs.length){
                                b.imgs=b.stuffs.map(function(s){
                                    if(s.gallery && s.gallery.length && s.gallery[0].img){
                                        s.img=s.gallery[0].img;
                                    }
                                    return s;
                                });
                            }else{b.imgs=[]}
                        }
                    })
                }
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/CONTENT/master/createMaster.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,50))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        
        /*selectServiceCtrl.$inject=['$uibModalInstance'];
        function selectServiceCtrl($uibModalInstance){
            var self=this;
            console.log(services )
            //self.services=services;
            self.ok=function(item){
                $uibModalInstance.close(item);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }*/
    }
})()

'use strict';
(function(){
    angular.module('gmall.services')
        .service('Coupon', serviceFunction);
    serviceFunction.$inject=['$resource','$uibModal','$q'];
    function serviceFunction($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Coupon/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            console.log(id)
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/PROMO/coupon/createCoupon.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,100))
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
    }
})()

'use strict';
angular.module('gmall.directives')
    .directive('callFromStore',[function(){
        return {
            scope: {
                modalClose:'&',
                stuff:'@'
            },
            restrict:"E",
            bindToController: true,
            controllerAs: '$ctrl',
            controller:"callCtrl",
            templateUrl:"components/call/call.html",
        }
    }])
    .directive('enterPhoneNumder',[function(){
        return {
            scope: {
                enterPhoneNumder:'=',
                changeFoo:'&',
            },
            restrict:"A",
            bindToController: true,
            controllerAs: '$ctrl',
            controller:enterPhoneNumderCtrl,
            templateUrl:"components/call/phoneNumber.html",
        }
    }])
enterPhoneNumderCtrl.$inject=['$scope','global']
function enterPhoneNumderCtrl($scope,global) {
    var self=this;
    self.global=global;
    self.phoneCodes=(global.get('store').val.phoneCodes)?global.get('store').val.phoneCodes:[{code:'+38',country:'Украина'}];
    self.phoneCode=(global.get('store').val.phoneCode)?global.get('store').val.phoneCode.code:'+38';
    $scope.$watch(function(){return self.enterPhoneNumder},function(enterPhoneNumder,old){
        if(enterPhoneNumder){
            var phoneCode='+'+enterPhoneNumder.substring(0,enterPhoneNumder.length-10);
            if(self.phoneCodes.getOFA('code',phoneCode)){
                self.phoneCode=phoneCode;
            }
            self.phone=enterPhoneNumder.substring(enterPhoneNumder.length-10)
        }
        /*if(enterPhoneNumder!=old){
            changePhone()
        }*/

    })



    self.changePhone=changePhone;
    self.changeCode=changeCode;

    function changePhone(){
        if(!self.phone){
            self.enterPhoneNumder=''
        }else{
            self.enterPhoneNumder=self.phoneCode.substring(1)+self.phone.substring(0,10);
        }
        //console.log(self.enterPhoneNumder,self.changeFoo)
        if(self.changeFoo && typeof self.changeFoo == 'function'){
            self.changeFoo({phone:self.enterPhoneNumder})
        }
    }
    function changeCode() {
        
    }
}



'use strict';
angular.module('gmall.directives')
    .directive('externalCatalog',externalCatalogComponent)
    .directive('externalCatalogDownload',externalCatalogDownload);
function externalCatalogComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: externalCatalogCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/externalCatalog/externalCatalog.html'
    }
}
function externalCatalogDownload(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: externalCatalogDownloadCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/externalCatalog/externalCatalogDownload.html'
    }
}
externalCatalogDownloadCtrl.$inject=['ExternalCatalog','$q','Confirm','exception','global','$timeout','$http','$resource','Sections','Brands','$uibModal'];
function externalCatalogDownloadCtrl(Items,$q,Confirm,exception,global,$timeout,$http,$resource,Sections,Brands,$uibModal){
    var self=this;
    self.downloadCatalog=downloadCatalog;
    self.setGroup=setGroup;
    self.setBrand=setBrand;
    self.viewLogFile=viewLogFile;
    self.clearField=clearField;
    self.saveField=saveField;

    self.updateList=updateExternalCatalogList;
    //console.log(updateExternalCatalogList)
    self.lang=global.get('store').val.lang
    //self.changeActive=changeActive;
    activate()
    function activate(){
        $q.when()
            .then(function(){
                return Brands.getBrands()
            })
            .then(function (brands) {
                self.brands=brands
                return Sections.getSections()
            })
            .then(function (sections) {
                self.sections=sections
            })
            .then(function () {
                /*console.log(self.brands)
                console.log(self.sections)*/
                getList()
            })

    }
    function getList() {
        var query={}
        return  $q.when()
            .then(function () {
                return Items.getList(null,query)
            })
            .then(function (res) {
                //console.log(res)
                res.forEach(function(item){
                    if(item.brand){
                        item.brand=self.brands.find(function(b){return b._id==item.brand})
                    }
                    if(item.group){
                        item.group=self.sections.find(function(s){return s._id==item.group})
                    }
                })
                self.items=res;

            })

    }
    function downloadCatalog(item) {
        //Confirm('Подтверждаете?')
        $q.when()
            .then(function () {
                var file = self.myFile;

                $uibModal.open({
                    animation: true,
                    templateUrl: 'components/externalCatalog/modal/uploadExternalCatalog.html',
                    controller: function($uibModalInstance,$q,$resource,item){
                        var self=this;
                        self.disabledUpload=true;

                        var uploadUrl = stuffHost+'/api/downLoadExternalCatalog';
                        self.ok=function(){$uibModalInstance.close()}
                        self.cancel = function () {$uibModalInstance.dismiss()}
                        self.catalogName=item.name;
                        self.confirmUpload=confirmUpload;
                        console.log(item)
                        var fdata = new FormData();
                        if(item.file){
                            fdata.append("file",item.file);
                        }
                        fdata.append("_id",item._id);
                        fdata.append("url",item.url);
                        fdata.append("link",item.link);
                        fdata.append("index",item.index);
                        if(item.group){
                            fdata.append("group",item.group._id);
                        }
                        if(item.brand){
                            fdata.append("brand",item.brand._id);
                        }
                        if(item.name){
                            fdata.append("name",item.name);
                        }
                        if(item.desc){
                            fdata.append("desc",item.desc);
                        }
                        if(item.price){
                            fdata.append("price",item.price);
                        }
                        if(item.qty){
                            fdata.append("qty",item.qty);
                        }
                        if(item.artikul){
                            fdata.append("artikul",item.artikul);
                        }
                        if(item.tags){
                            fdata.append("tags",item.tags);
                        }
                        //return;
                        $q.when()
                            .then(function(){
                                return $resource(uploadUrl, {}, {
                                    postWithFile: {
                                        method: "POST",
                                        params: fdata,
                                        transformRequest: angular.identity,
                                        headers: { 'Content-Type': undefined }
                                    }
                                }).postWithFile(fdata).$promise
                            })
                            .then(function(res){
                                console.log(res)
                                if(res.err){
                                    self.errText=JSON.stringify(res.err);
                                    //console.log(self.errText)
                                    if(self.errText=='{}'){
                                        self.errText='произошла ошибка при обработке файла'
                                    }
                                    //console.log(self.errText)
                                }else{
                                    self.disabledUpload=false;
                                    self.disableSpinner=true;
                                    self.updateStuffs=res.updateStuffs
                                    self.newStuffs=res.newStuffs
                                    self.newCategories=res.newCategories
                                    self.newBrands=res.newBrands
                                    self.newBrandTags=res.newBrandTags
                                    self.newFilters=res.newFilters
                                    self.newFilterTags=res.newFilterTags

                                }
                                /*self.countFfomFile=res.data.countFfomFile;
                                self.countInDb=res.data.countInDb;
                                self.countPermission=res.data.countPermission;
                                self.countToDb=res.data.countToDb;
                                self.disableSpinner=true;*/
                            })
                        /*socket.on('endUploadUsers',function(data){
                            getList();
                        })*/
                        function confirmUpload(){
                            fdata.append("confirm",true);
                            $resource(uploadUrl, {}, {
                                postWithFile: {
                                    method: "POST",
                                    params: fdata,
                                    transformRequest: angular.identity,
                                    headers: { 'Content-Type': undefined }
                                }
                            }).postWithFile(fdata)
                            $uibModalInstance.close()
                        }

                    },
                    controllerAs:'$ctrl',
                    size:'lg',
                    resolve:{
                        item:function(){
                            return item
                        }
                    }

                }).result
            })
            .catch(function(error){
                //error
                console.log(error)
            });
    }

    function setGroup(item) {
        $q.when()
            .then(function(){
                return Sections.select()
            })
            .then(function(group){
                item.group=group
                saveField(item,'group',group._id)
            })
    }
    function setBrand(item) {
        $q.when()
            .then(function(){
                return Brands.select()
            })
            .then(function(brand){
                item.brand=brand
                saveField(item,'brand',brand._id)
            })
    }
    function clearField(item,field){
        item[field]=null;
        saveField(item,field)
    }
    function saveField(item,field,value) {
        console.log(item)
        var o ={_id:item._id}
        if(value!='undefined'){
            o[field]=item[field]
        }else{
            o[field]=value
        }
        Items.save({update:field},o,function () {
            global.set('saving',true);
            $timeout(function(){
                global.set('saving',false);
            },1500)
            var url = stuffHost+'/api/changeTaskSchedule'
            var i =angular.copy(item)
            if(i.brand){
                i.brand=i.brand._id
            }
            if(i.group){
                i.group=i.group._id
            }
            $http.post(url,i).success(function(res){
                exception.showToaster('info','schedule','was changed')
            }).error(function (err) {
                exception.catcher('error')(err)
                console.log(err)
            })

        })
    }
    function viewLogFile() {
        $uibModal.open({
            animation: true,
            templateUrl: 'components/externalCatalog/modal/viewLog.html',
            controller: function($uibModalInstance,$q,$http,global,$sce){
                var self=this;
                self.$sce
                //self.url1 = $sce.getTrustedResourceUrl(stuffHost+"/log/"+global.get('store').val.subDomain+'_users.log');
                self.url = stuffHost+"/log/"+global.get('store').val.subDomain+'_externalCatalog.log';
                //console.log(self.url1)
                self.ok=function(){$uibModalInstance.close()}
                self.cancel = function () {$uibModalInstance.dismiss()}

                $http.get(self.url).success(function(res){
                    console.log(res.replace(/[\r\n]/g, "<br />"))
                    self.loaded;
                    self.logFile=$sce.getTrustedHtml(res.replace(/[\r\n]/g, "<br />"));
                }).error(function (err) {
                    self.loaded;
                    console.log(err)
                })
            },
            controllerAs:'$ctrl',
            size:'lg',
        })
    }
}

externalCatalogCtrl.$inject=['ExternalCatalog','$q','Confirm','exception','global','$timeout'];
function externalCatalogCtrl(Items,$q,Confirm,exception,global,$timeout) {
    var self=this;
    self.saveField=saveField;
    self.createItem=createItem;
    self.deleteItem=deleteItem;
    activate()
    function activate(){
        getList()
    }
    function getList() {
        var query={}
        return  $q.when()
            .then(function () {
                return Items.getList(null,query)
            })
            .then(function (res) {
                console.log(res)
                self.items=res;
            })
            .then(function () {
                var d = new Date()

                self.items.forEach(function(item){
                    if(!item.timezoneOffset && item.timezoneOffset!=0){
                        item.timezoneOffset= Math.ceil(d.getTimezoneOffset()/60);
                        saveField(item,'timezoneOffset')
                    }
                    //console.log(item.timezoneOffset)
                })
            })
    }
    function saveField(item,field) {
        //console.log(item)
        var o ={_id:item._id}
        o[field]=item[field]
        Items.save({update:field},o,function () {
            global.set('saving',true);
            $timeout(function(){
                global.set('saving',false);
            },1500)

        })
    }
    function createItem(){
        //console.log('create')
        $q.when()
            .then(function(){
                return Items.create()
            })
            .then(function(item){
                var d = new Date()
                item.timezoneOffset = d.getTimezoneOffset();
                return Items.save(item).$promise
            })
            .then(function(){
                return getList()

            })
            .catch(function(err){
                if(err){
                    exception.catcher('создание внешнего каталога')(err)
                }
            })
    }
    function deleteItem(item){
        Confirm("удалить?" )
            .then(function(){
                item.actived=false;
                saveField(item,'actived')
                //return Items.delete({_id:item._id} ).$promise;
            } )
            .then(function(){
                //return getList();
            })
            .catch(function(err){
                err = (err &&err.data)||err
                if(err){
                    exception.catcher('удаление внешнего каталога')(err)
                }

            })
    }

}
angular.module('gmall.services')
.service('ExternalCatalog', function($resource,$q,$uibModal){
    var Items= $resource('/api/collections/ExternalCatalog/:_id',{_id:'@_id'});
    var items;
    return {
        getList:getList,
        getItem:getItem,
        query:Items.query,
        get:Items.get,
        save:Items.save,
        delete:Items.delete,
        create:create,
        getItems:getItems
    }
    function getItems(reload){
        if(!items || reload){
            return getList();
        }else{
            return items;
        }

    }
    function getList(paginate,query){
        //console.log('get list')
        if(!paginate){
            paginate={page:0}
        }
        return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
            .then(getListComplete)
            .catch(getListFailed);
        function getListComplete(response) {
            if(paginate.page==0){
                if(response && response.length){
                    paginate.items=response.shift().index;
                }else{
                    paginate.items=0;
                }
            }
            items=response;
            //console.log(response)
            return response;
        }

        function getListFailed(error) {
            console.log('XHR Failed for getNews.' + error);
            return $q.reject(error);
        }
    }
    function getItem(id){
        return Items.get({_id:id} ).$promise
            .then(getItemComplete)
            .catch(getItemFailed);
        function getItemComplete(response) {
            return response;
        }
        function getItemFailed(error) {
            return $q.reject(error);
        }
    }
    function create(){
        return $q(function(resolve,reject){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/externalCatalog/createExternalCatalog.html',
                controllerAs:'$ctrl',
                controller: function ($uibModalInstance){
                    var self=this;
                    self.name='';
                    self.ok=function(){
                        if(!self.name){
                            exception.catcher('создание объекта')('нужено название')
                            return
                        }
                        $uibModalInstance.close({name:self.name});
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },

            });
            modalInstance.result.then(function (item) {
                if(item.name){
                    item.name=item.name.substring(0,25)
                    resolve(item)
                }else{
                    reject('empty')
                }
            }, function (err) {
                reject(err)
            });
        })
    }
    /*createExternalCatalogCtrl=['$uibModalInstance'];
     function createExternalCatalogCtrl($uibModalInstance){
     var self=this;
     self.name='';
     self.addOwner=addOwner;
     self.ok=function(){
     if(!self.name){
     exception.catcher('создание объекта')('нужено название')
     return
     }
     $uibModalInstance.close({name:self.name});
     }
     self.cancel = function () {
     $uibModalInstance.dismiss();
     };
     }*/

})




'use strict';
/*datetime*/
var minTimePart=15// минимальное  время услуги 15 минут
var timeRemindArrLang=[
    {
        'ru':'за 1 час',
        'uk':'',
        'en':'',
        'de':'',

        part:4
    },
    {
        'ru':'за 2 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:8
    },
    {
        'ru':'за 3 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:12
    },
    {
        'ru':'за 4 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:16
    },
    {
        'ru':'за 5 часов',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:20
    },
    {
        'ru':'за 6 часов',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:24
    },
    {
        'ru':'за 12 часов',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:48
    },
    {
        'ru':'за 1 день',
        'uk':'',
        'en':'',
        'de':''
        ,

        part:96
    }
]
var timeDurationArrLang=[
    {
        'ru':'15 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:1
    },
    {
        'ru':'30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:2
    },
    {
        'ru':'45 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:3
    },
    {
        'ru':'1 час',
        'uk':'',
        'en':'',
        'de':'',

        part:4
    },
    {
        'ru':'1 час 15 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:5
    },
    {
        'ru':'1 час 30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:6
    },
    {
        'ru':'1 час 45 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:7
    },
    {
        'ru':'2 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:8
    },
    {
        'ru':'2 часа 15 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:9
    },
    {
        'ru':'2 часа 30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:10
    },
    {
        'ru':'3 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:12
    },
    {
        'ru':'3 часа 30 мин',
        'uk':'',
        'en':'',
        'de':'',

        part:14
    },
    {
        'ru':'4 часа',
        'uk':'',
        'en':'',
        'de':'',

        part:16
    }
]
var weekDays=[
    {
        'ru':'Воскресенье',
        'uk':'Неділя',
        'en':'Sunday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Понедельник',
        'uk':'Понеділок',
        'en':'Monday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Вторник',
        'uk':'Вівторок',
        'en':'Tuesday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Среда',
        'uk':'Середа',
        'en':'Wednesday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Четверг',
        'uk':'Четвер',
        'en':'Thursday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Пятница',
        'uk':'П*ятниця',
        'en':'Friday',
        'de':'gdsdfsdf'
    },
    {
        'ru':'Суббота',
        'uk':'Субота',
        'en':'Saturday',
        'de':'gdsdfsdf'
    },
    ]
/**************************/
var reservedFirstParamsForAdmin=['manage','promo','seo','setting','content','translate','admin123','bookkeep']
var reservedFirstParams=['manage','promo','seo','setting','content','translate',
    'news','lookbook','stat','master','campaign','info','additional','workplace','cabinet','pricegoods','priceservices','home','search','cart','cabinet','bookkeep']
var languagesOfPlatform=['ru','uk','en','de','es'];
var propertiesOfConfigData=[{'key':'unitOfMeasure','name':'единицы измерения'}];
var phoneCodes=[{code:'+38',country:'Ukraine'},{code:'+7',country:'Russia'},
    {code:'+501',country:'Moldova'},{code:'+44',country:'United Kingdom'},
    {code:'+93',country:'Afghanistan'},{code:'+355',country:'Albania'},{code:'+213',country:'Algeria'},
    {code:'+1-684',country:'American Samoa'},{code:'+376',country:'Andorra'},{code:'+244',country:'Angola'},
    {code:'+1-264',country:'Anguilla'},{code:'+672',country:'Antarctica'},{code:'+1-268',country:'Antigua and Barbuda'},
    {code:'+54',country:'Argentina'},{code:'+374',country:'Armenia'},{code:'+297',country:'Aruba'},
    {code:'+61',country:'Australia'},{code:'+43',country:'Austria'},{code:'+994',country:'Azerbaijan'},
    {code:'+1-242',country:'Bahamas'},{code:'+973',country:'Bahrain'},{code:'+880',country:'Bangladesh'},
    {code:'+1-246',country:'Barbados'},{code:'+375',country:'Belarus'},{code:'+32',country:'Belgium'},
    {code:'+1-246',country:'Belize'},{code:'+229',country:'Benin'},{code:'+1-441',country:'Bermuda'},
    {code:'+975',country:'Bhutan'},{code:'+591',country:'Bolivia'},{code:'+246',country:'British Indian Ocean Territory'},
    {code:'+267',country:'Botswana'},{code:'+55',country:'Brazil'},{code:'+387',country:'Bosnia and Herzegovina'},
    {code:'+1-284',country:'British Virgin Islands'},{code:'+673',country:'Brunei'},{code:'+359',country:'Bulgaria'},
    {code:'+226',country:'Burkina Faso'},{code:'+257',country:'Burundi'},{code:'+855',country:'Cambodia'},
    {code:'+237',country:'Cameroon'},{code:'+1',country:'Canada'},{code:'+238',country:'Cape Verde'},
    {code:'+1-345',country:'Cayman Islands'},{code:'+236',country:'Central African Republic'},{code:'+235',country:'Chad'},
    {code:'+56',country:'Chile'},{code:'+86',country:'China'},{code:'+57',country:'Colombia'},
    {code:'+269',country:'Comoros'},{code:'+506',country:'Costa Rica'},{code:'+385',country:'Croatia'},
    {code:'+53',country:'Cuba'},{code:'+599',country:'Curacao'},{code:'+357',country:'Cyprus'},
    {code:'+420',country:'Czech Republic'},{code:'+45',country:'Denmark'},{code:'+1-767',country:'Dominica'},
    {code:'+593',country:'Ecuador'},{code:'+995',country:'Georgia'},{code:'+49',country:'Germany'},
    {code:'+30',country:'Greece'},{code:'+852',country:'Hong Kong'},{code:'+36',country:'Hungary'},
    {code:'+354',country:'Iceland'},{code:'+852',country:'Hong Kong'},{code:'+36',country:'Hungary'},
    {code:'+30',country:'Greece'},{code:'+91',country:'India'},{code:'+62',country:'Indonesia'},
    {code:'+98',country:'Iran'},{code:'+964',country:'Iraq'},{code:'+353',country:'Ireland'},
    {code:'+972',country:'Israel'},{code:'+39',country:'Italy'},{code:'+81',country:'Japan'},
    {code:'+962',country:'Jordan'},{code:'+7',country:'Kazakhstan'},{code:'+383',country:'Kosovo'},
    {code:'+965',country:'Kuwait'},{code:'+996',country:'Kyrgyzstan'},{code:'+856',country:'Laos'},
    {code:'+371',country:'Latvia'},{code:'+961',country:'Lebanon'},{code:'+218',country:'Libya'},
    {code:'+423',country:'Liechtenstein'},{code:'+370',country:'Lithuania'},{code:'+352',country:'Luxembourg'},
    {code:'+853',country:'Macau'},{code:'+389',country:'Macedonia'},{code:'+261',country:'Madagascar'},
    {code:'+60',country:'Malaysia'},{code:'+356',country:'Malta'},{code:'+222',country:'Mauritania'},
    {code:'+230',country:'Mauritius'},{code:'+52',country:'Mexico'},{code:'+373',country:'Moldova'},
    {code:'+377',country:'Monaco'},{code:'+976',country:'Mongolia'},{code:'+382',country:'Montenegro'},
    {code:'+212',country:'Morocco'},{code:'+977',country:'Nepal'},{code:'+31',country:'Netherlands'},
    {code:'+507',country:'Panama'},{code:'+595',country:'Paraguay'},{code:'+382',country:'Montenegro'},
    {code:'+377',country:'Monaco'},{code:'+51',country:'Peru'},{code:'+63',country:'Philippines'},
    {code:'+48',country:'Poland'},{code:'+351',country:'Portugal'},{code:'+974',country:'Qatar'},
    {code:'+40',country:'Romania'},{code:'+378',country:'San Marino'},{code:'+966',country:'Saudi Arabia'},
    {code:'+381',country:'Serbia'},{code:'+65',country:'Singapore'},{code:'+421',country:'Slovakia'},
    {code:'+386',country:'Slovenia'},{code:'+27',country:'South Africa'},{code:'+82',country:'South Korea'},
    {code:'+34',country:'Spain'},{code:'+94',country:'Sri Lanka'},{code:'+46',country:'Sweden'},
    {code:'+41',country:'Switzerland'},{code:'+886',country:'Taiwan'},{code:'+992',country:'Tajikistan'},
    {code:'+66',country:'Thailand'},{code:'+216',country:'Tunisia'},{code:'+90',country:'Turkey'},
    {code:'+993',country:'Turkmenistan'},{code:'+971',country:'United Arab Emirates'},{code:'+44',country:'United Kingdom'},
    {code:'+1',country:'United States'},{code:'+598',country:'Uruguay'},{code:'+998',country:'Uzbekistan'},
    {code:'+379',country:'Vatican'},{code:'+58',country:'Venezuela'},{code:'+84',country:'Vietnam'},{code:'+967',country:'Yemen'}
    ]

var modelsName={
    stat:{
        'ru':'страницы','uk':'сторінки','en':'pages','de':'pages'
    },
    stuff:{
        'ru':'товары и услуги','uk':'товари та послуги','en':'goods and services','de':'goods and services'
    },
    news:{
        'ru':'новости','uk':'новини','en':'news','de':'news'
    },
    info:{
        'ru':'информация','uk':'інформація','en':'information','de':'information'
    },
    workplace:{
        'ru':'локации','uk':'локации','en':'locations','de':'locations'
    }
}



var lengthStyleBlock=61;
var arrEmptyForProperties=[];
for(var i=0;i<lengthStyleBlock;i++){arrEmptyForProperties.push('')}

/*var listOfBlocksForMainPage={
    banner:'баннер',
    brands:'бренды',
    brandTags:'коллекции',
    call:'обратный звонок',
    campaign:'акции',
    categories:'категории',
    feedback:'feedback',
    filterTags:'группы (признаки)',
    info:'информационный раздел',
    map:'карта',
    mission:'миссия',
    news:'новости',
    slider:'слайдер',
    stuffs:'товары',
    subscription:'подписка',
    subscriptionAdd:'подписка с доп.полями',
    text:'текстовый блок',
    textAdd:'доп.текстовый блок',
    video:'видео',

}*/

var listOfBlocksForMainPage={
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    banner:'баннер',
    bannerOne:'баннер в два потока',
    mission:'миссия',
    text:'текстовый блок',
    textTwo:'текстовый блок 2 потока',
    campaign:'акции',
    filterTags:'тематические группы (признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    stuffs:'товары',
    news:'новости',
    info:'информационный раздел',
    pricegoods:'прайс товаров',
    priceservices:'прайс услуг',
    map:'карта',
    review:'отзывы гугл',
    subscription:'подписка',
    subscriptionAdd:'подписка с доп полями',
    call:'заказ звонка',
    feedback:'форма обратной связи',
    calendar:'гугл календарь',
    scheduleplace:'расписание для рабочего места',
}
var animationTypes =[
    {type:null,name:'отсутстует'},
    {type:'animated1',name:'fadeInLeftBig'},
    {type:'animated2',name:'fadeInLeft'},
    {type:'animated3',name:'fadeInLeftMiddle'},
    {type:'animated4',name:'fadeInRight'},
    {type:'animated5',name:'fadeInRightMiddle'},
    {type:'animated6',name:'fadeInRightBig'},
    {type:'animated7',name:'bounce'},
    {type:'animated8',name:'fadeInDown'},
    {type:'animated9',name:'fadeOut'},
    {type:'animated10',name:'bounceIn'},
    {type:'animated11',name:'при наведении контур1'},
    {type:'animated12',name:'при наведении контур2'},
    {type:'animated13',name:'SweepToTop'},
    {type:'animated14',name:'SweepToBottom'},
    {type:'animated15',name:'LineCenterBottom'},
    {type:'animated16',name:'scale-block'},
    {type:'animated17',name:'SweepToRight'},
    {type:'animated18',name:'SweepToLeft'},
    {type:'animated19',name:'underlineLRL'},
    {type:'animated20',name:'underline RLR'},
    {type:'animated21',name:'line-through LRL'},
    {type:'animated22',name:'underline RLR 5px'},
    {type:'animated23',name:'test'},
    {type:'animated24',name:'test'},
    {type:'animated25',name:'test'},
    {type:'animated26',name:'test'},
    {type:'animated27',name:'test'},
    {type:'animated28',name:'test'},
    {type:'animated29',name:'test'},
    {type:'animated30',name:'shake'},
    {type:'animated31',name:'fadeInUpBig'}]
var listOfListName=[
    'news',
    'master',
    'stat',
    'info',
    'campaign',
    'lookbook',
    'additional',
    'workplace'
]
var listOfStuffDetailKind=[
    'good',
    'service',
    'info',
    'media'
]
var listOfBlocksForAll={
    banner:'баннер',
    bannerOne:'баннер в два потока',
    brands:'бренды',
    brandTags:'коллекции',
    button:'кнопка',
    calendar:'гугл календарь',
    call:'заказ звонка',
    campaign:'акции',
    categories:'категории',
    date:'дата',
    feedback:'форма обратной связи',
    filterTags:'тематические группы (признаки из хар-тик)',
    info:'информационный раздел',
    map:'карта',
    name:'название',
    news:'новости',
    position:'должность',
    pricegoods:'прайс товаров',
    priceservices:'прайс услуг',
    review:'отзывы гугл',
    schedule:'расписание для специалиста',
    scheduleplace:'расписание для рабочего места',
    slider:'слайдер',
    sn:'кнопки социальных сетей',
    stuffs:'товары',
    subscription:'подписка',
    subscriptionAdd:'подписка с доп полями',
    text:'текстовый блок',
    textTwo:'текстовый блок 2 потока',
    video:'видео',
    videoLink:'внешнее видео',
    fbpage:'страница фейсбука',
    comment:'комментарии дискус',
}

var listOfBlocksForStaticPage={
    name:'название',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    videoLink:'внешнее видео',
    video:'видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    masters:'сотрудники',
    feedback:'обратная связь',
    feedback1:'обратная связь + фото',
    feedback2:'фото + обратная связь',
    stuffs:'товары',
    filterTags:'группы(признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    campaign:'акции',
    call:'заказ звонка',
    button:'кнопка',

}
var listOfBlocksForNewsDetailPage={
    name:'название',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    videoLink:'внешнее видео',
    video:'видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    stuffs:'товары',
    campaign:'акции',
    filterTags:'группы(признаки из хар-тик)',
    brandTags:'коллекции',
    brands:'бренды',
    categories:'категории',
    date:'дата',
    sn:'социальные сети'
}

var listOfBlocksForMasterPage={
    name:'имя',
    position:'должность',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    stuffs:'товары',
    schedule:'расписание',
}
var listOfBlocksForWorkplacePage={
    name:'имя',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    stuffs:'товары',
    schedule:'расписание',
}
var listOfBlocksForAddPage={
    name:'имя',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    slider:'слайдер',
    video:'видео',
    videoLink:'внешнее видео',
    video1:'видео + текстовый блок',
    video2:'текстовый блок + видео',
    map:'карта',
    map1:'карта + текстовый блок',
    map2:'текстовый блок + карта',
    news:'новости',
}


var listOfBlocksForHeader={
    logo:'логотип',
    name:'название',
    cart:'корзина',
    enter:'вход',
    info:'инфо',
    currency:'валюта',
    news:'новости',
    lookbook:'галлерея',
    search:'поиск',
    catalog:'каталог',
    new:'новинки',
    additional:'дополнительный список',
    schedule:'расписание',
    sale:'распродажа',
    campaign:'акции',
    master:'мастера',
    brands:'бренды',
    collection:'коллекции',
    phone:'телефон',
    sn:'социальные сети',
    lang:'языки',
    humburger:'humburger',
    pricegoods:'pricegoods',
    priceservices:'priceservices',
    text:'текст',
    icon:'иконка',
}
var listBlocksForFooter={
    text:'текст',
    textOne:'текст 1',
    sn:'соц.сети',
    subscription:'подписка',
    feedback:'обратная связь',
    stat:'статические страницы',
    catalog:'каталог',
    infoline:'ииформационная строка',
    copyright:'правообладание',
    news:'новости',
    campaign:'акции',
    lang:'языки'
}


var listOfBlocksForStats={
    name:'название',
    banner:'баннер',
    gallery:'галлерея',
    desc:'описание1',
    desc1:'описание2',
    desc2:'описание3',
    map:'карта',
    video:'видео',
    masters:'мастера',
}
var listOfBlocksForStuffDetail={
    name:'название',
    gallery:'галлерея',
    desc:'описание',
    comments:'комментарии',
    lastViewed:'последние просмотренные',
    sort:'разновидности',
    group:'группа товаров',
    addInfo:'доп.информация',
    addToCart:'в корзину(действие)',
    price:'цены',
    qty:'количество',
    sn:'соц.сети',
    feedback:'обратная связь',
    params:'параметры',
    tags:'характеристики',
    blocks:'медиа блоки',
    back:'кнопка назад в список',
}

var listOfBlocksForStuffDetailBlocks={
    banner:'фото + текстовый блок (один поток)',
    banner1:'фото + текстовый блок (два потока)',
    calendar:'календарь',
    date:'дата',
    feedback:'обратная связь',
    feedbackOne:'текст + обратная связь',
    feedbackTwo:'обратная связь + текст',
    imgs:'фото',
    map:'карта',
    mapOne:'карта + текстовый блок',
    mapTwo:'текстовый блок + карта',
    masters:'блок мастеров',
    name:'имя',
    position:'должность',
    slider:'слайдер',
    sn:'соцсети',
    text:'текстовый блок',
    text2:'текстовый блок в две колонки',
    video:'видео',
    videoOne:'видео + текстовый блок',
    videoTwo:'текстовый блок + видео',
    videoLink:'внешнее видео',
    file:'file'
}

var listOfBlocksForStuffList={
    list:'список',
    filters:'фильтры',
    categories:'категории',
    paginate:'пагинация',
    search:'поиск',
    call:'звонок',
    subscription:'подписка',
    desc:'описание',
    seoDesc:'seo описание',
    blocks:'медиа блоки',
}



var tableOfColorsForButton={0:'black-white',1:'pink-white',2:'turquoise-white',3:'yellow-white',4:'bordo-white',5:'braun-white',6:'powder-white',7:'pinklight-white',8:'white-black',9:'black-white'}
var tableOfButtonsFile={0:'standart',1:'border-radius',2:'no border',3:'inverse'}

var listOfIcons=['addcart','back','cart','cartin','cartplus','cancelmenu','cancel','cancelzoom','call','caret','categories','change','dialog','down','delete','downslide','gif','envelope','envelopewhite','edit','eur','fb','fbwhite','filters','header','google','googlewhite','humbmobile','chat','inst','instwhite','left','menu','messageme','messagehe','next','nextgallery','ok','okwhite','pin','pinwhite','plus','prev','prevgallery','right','rub','search','send','setting','spinner','subscription','time','tw','twwhite','uah','up','upslide','user','userhe','userme','usd','vk','vkwhite','see','enter','zoom','yt','ytwhite']

var notificationsTypeLang={
    //клиенту
    invoice:{
        'ru':'счет',
        'ua':'рахунок',
        'en':'invoice',
        'de':'',
    },
    accepted:{
        'ru':'заказ принят',
        'ua':'замовлення прийнято',
        'en':'accepted',
        'de':'',
    },
    shipOrder:{
        'ru':'данные о доставке',
        'ua':'дані про доставку',
        'en':'shipOrder',
        'de':'',
    },
    // продавцу
    order:{
        'ru':'поступил заказ',
        'ua':'поступило замовлення',
        'en':'order',
        'de':'',
    },
    pay:{
        'ru':'оплата',
        'ua':'оплата',
        'en':'pay',
        'de':'',
    },
    feedBack:{
        'ru':'обратная связь',
        'ua':'зворотній зв*язок',
        'en':'feedback',
        'de':'',
    },
    comment:{
        'ru':'комментарий',
        'ua':'коментар',
        'en':'comments',
        'de':'',
    },
    call:{
        'ru':'заказ звонка',
        'ua':'замовлення дзвінка',
        'en':'call',
        'de':'',
    },
    subscription:{
        'ru':'подписка',
        'ua':'підписка',
        'en':'subscription',
        'de':'',
    }



}

var updateExternalCatalogList= {
    everyMon10:{
        'ru':'каждый понедельник в 10.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyMon12:{
        'ru':'каждый понедельник в 12.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyFri10:{
        'ru':'каждую пятницу в 10.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyFri12:{
        'ru':'каждую пятницу в 12.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyDay10:{
        'ru':'каждый день в 10.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyDay12:{
        'ru':'каждый день в 12.00',
        'ua':'',
        'en':'',
        'de':'',
    },
    everyDay101418:{
        'ru':'каждый день в 10.00,14.00,18.00',
        'ua':'',
        'en':'',
        'de':'',
    }
}

var ratioClassStuffDetail={
    0:{left:'left-block col-lg-6 col-md-6 col-sm-12 col-xs-12',right:'right-block col-lg-6 col-md-6 col-sm-12 col-xs-12'},
    1:{left:'left-block vertical-left3 col-lg-5 col-md-5 col-sm-12 col-xs-12',right:'right-block horizontal-right2 col-lg-7 col-md-7 col-sm-12 col-xs-12'},
    2:{left:'left-block vertical-left2 col-lg-4 col-md-4 col-sm-12 col-xs-12',right:'right-block horizontal-right1 col-lg-8 col-md-8 col-sm-12 col-xs-12'},
    3:{left:'left-block horizontal-left1 col-lg-7 col-md-7 col-sm-12 col-xs-12',right:'right-block vertical-right1  col-lg-5 col-md-5 col-sm-12 col-xs-12'},
    4:{left:'left-block horizontal-left2 col-lg-8 col-md-8 col-sm-12 col-xs-12',right:'right-block vertical-right2 col-lg-4 col-md-4 col-sm-12 col-xs-12'},
    5:{left:'left-block col-lg-12 col-md-12 col-sm-12 col-xs-12',right:'right-block col-lg-12 col-md-12 col-sm-12 col-xs-12'},
}
var elementsList=['a','p','div','h1','h2','h3','h4','ol','ul','li','span','img','hr','iframe','table','tr','th','td']

var getNamePropertyCSS = function(i,item,k) {
    if(item){
        switch (i){
            case 0: return ['color',item];
            case 1: return  ['background-color',item];
            case 2: return  ['margin-top',item];
            case 3: return  ['margin-right',item];
            case 4: return  ['margin-bottom',item];
            case 5: return  ['margin-left',item];
            case 6: return  ['padding-top',item];
            case 7: return  ['padding-right',item];
            case 8: return  ['padding-bottom',item];
            case 9: return  ['padding-left',item];
            case 10: return  ['display',item];
            case 11: return  ['font-family',item];
            case 12: return  ['font-size',item];
            case 13: return  ['font-weight',item];
            case 14: return  ['letter-spacing',item];
            case 15: return  ['text-transform',item];
            case 16: return  ['width',item];
            case 17: return  ['height',item];
            case 18: return  ['float',item];
            case 19: return  ['top',item];
            case 20: return  ['left',item];
            case 21: return  ['right',item];
            case 22: return  ['bottom',item];
            case 23: return  ['text-decoration',item];
            case 24: return  ['text-align',item];
            case 25: return  ['position',item];
            case 26: return  ['border',item];
            case 27: return  ['border-left',item];
            case 28: return  ['border-right',item];
            case 29: return  ['border-top',item];
            case 30: return  ['border-bottom',item];
            case 31: return  ['border-radius',item];
            case 32: return  ['z-index',item];
            case 33: return  ['opacity',item];
            case 34: return  ['border-width',item];
            case 35: return  ['list-style',item];
            case 36: return  ['vertical-align',item];
            case 37: return  ['background-size',item];
            case 38: return  ['background-position',item];
            case 39: return  ['text-shadow',item];
            case 40: return  ['cursor',item];
            case 41: return  ['transition',item];
            case 42: return  ['box-shadow',item];
            case 43: return  ['transform',item];
            case 44: return  ['background',item];
            case 45: return  ['clear',item];
            case 46: return  ['max-width',item];
            case 47: return  ['min-width',item];
            case 48: return  ['max-height',item];
            case 49: return  ['min-height',item];
            case 50: return  ['line-height',item];
            case 51: return  ['object-fit',item];
            case 52: return  ['object-position',item];
            case 53: return  ['overflow',item];
            case 54: return  ['background-attachment',item];
            case 55: return  ['background-repeat',item];
            case 56: return  ['padding',item];
            case 57: return  ['margin',item];
            case 58: return  ['word-break',item];
            case 59: return  ['word-wrap',item];
            case 60: return  ['word-spacing',item];
        }
    }else{
        switch (i){
            case 0: return 'color';
            case 1: return  'background-color';
            case 2: return 'margin-top';
            case 3: return  'margin-right';
            case 4: return  'margin-bottom';
            case 5: return  'margin-left';
            case 6: return 'padding-top';
            case 7: return  'padding-right';
            case 8: return  'padding-bottom';
            case 9: return  'padding-left';
            case 10: return  'display';
            case 11: return  'font-family';
            case 12: return  'font-size';
            case 13: return  'font-weight';
            case 14: return  'letter-spacing';
            case 15: return  'text-transform';
            case 16: return  'width';
            case 17: return  'height';
            case 18: return  'float';
            case 19: return  'top';
            case 20: return  'left';
            case 21: return  'right';
            case 22: return  'bottom';
            case 23: return  'text-decoration';
            case 24: return  'text-align';
            case 25: return  'position';
            case 26: return  'border';
            case 27: return  'border-left';
            case 28: return  'border-right';
            case 29: return  'border-top';
            case 30: return  'border-bottom';
            case 31: return  'border-radius';
            case 32: return  'z-index';
            case 33: return  'opacity';
            case 34: return  'border-width';
            case 35: return  'list-style';
            case 36: return  'vertical-align';
            case 37: return  'background-size';
            case 38: return  'background-position';
            case 39: return  'text-shadow';
            case 40: return  'cursor';
            case 41: return  'transition';
            case 42: return  'box-shadow';
            case 43: return  'transform';
            case 44: return  'background';
            case 45: return  'clear';
            case 46: return  'max-width';
            case 47: return  'min-width';
            case 48: return  'max-height';
            case 49: return  'min-height';
            case 50: return  'line-height';
            case 51: return  'object-fit';
            case 52: return  'object-position';
            case 53: return  'overflow';
            case 54: return  'background-attachment';
            case 55: return  'background-repeat';
            case 56: return  'padding';
            case 57: return  'margin';
            case 58: return  'word-break';
            case 59: return  'word-wrap';
            case 60: return  'word-spacing';
        }
    }

}


function compileStyleForBlock(block){
    var elements=[];
    var el='';
    if(block.blockStyle){
        for(var  i=0;i<lengthStyleBlock;i++){
            var n;
            if(block.blockStyle[i]){
                n = getNamePropertyCSS(i,block.blockStyle[i]);
                if(n){
                    el+="\n"+n[0]+':'+n[1]+';';
                }
            }
        }
    }
    if(el){
        if(el){
            el ='{'+el+'}'+"\n";
        }
        elements.push(el)
    }
    if(block.elements && typeof block.elements=='object'){
        for(var key in block.elements){
            el='';
            for(var i=0;i<lengthStyleBlock;i++){
                if(key=='a' && i==1){continue}
                var  n;
                if(block.elements[key][i]){
                    n = getNamePropertyCSS(i,block.elements[key][i]);
                    if(n){
                        el+="\n"+n[0]+':'+n[1]+';';
                    }
                }
            }
            if(el){
                el =key.replace("@",".")+'{'+el+'}'+"\n";
            }
            if(key=='a' && block.elements.a[1]){
                el+='a:hover {color:'+block.elements.a[1]+'}';
            }
            if(el){
                elements.push(el)
            }
        }
    }
    return elements;
}

if(typeof window === 'undefined') {
    exports.listOfBlocksForMainPage=listOfBlocksForMainPage;
    exports.listOfBlocksForHeader=listOfBlocksForHeader;
    exports.listBlocksForFooter=listBlocksForFooter;
    exports.listOfBlocksForStats=listOfBlocksForStats;
    exports.listOfBlocksForStuffDetail=listOfBlocksForStuffDetail;
    exports.listOfBlocksForStuffList=listOfBlocksForStuffList;
    exports.lengthStyleBlock=lengthStyleBlock;
    exports.arrEmptyForProperties=arrEmptyForProperties;
    exports.listOfBlocksForNewsDetailPage=listOfBlocksForNewsDetailPage;
    exports.listOfBlocksForStaticPage=listOfBlocksForStaticPage;
    exports.modelsName=modelsName;
    exports.getNamePropertyCSS=getNamePropertyCSS;
    exports.listOfListName=listOfListName;
    exports.ratioClassStuffDetail=ratioClassStuffDetail;
    exports.elementsList=elementsList;
    exports.reservedFirstParams=reservedFirstParams;
    exports.reservedFirstParamsForAdmin=reservedFirstParamsForAdmin;
    exports.minTimePart=minTimePart;
    exports.listOfBlocksForStuffDetailBlocks=listOfBlocksForStuffDetailBlocks;
}



'use strict';
(function(){

    angular.module('gmall.services')
        .service('Workplace', serviceFoo);
    angular.module('gmall.directives')
        .directive('workplaceList',itemListDirective)
        .directive('workplaceItem',workplaceItemDirective);
    function itemListDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/workplace/workplaceList.html',
        }
    };
    function workplaceItemDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: ItemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/workplace/workplaceItem.html',
        }
    }
    itemListCtrl.$inject=['Workplace','$state','global','Confirm','$q','exception','Photo','$timeout'];
    function itemListCtrl(Items,$state,global,Confirm,$q,exception,Photo,$timeout){

        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:20,totalItems:0}
        self.newItem={name:'наименование'}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItem=searchItem;
        self.deleteItem=deleteItem;
        self.createItem=createItem;
        self.dropCallback=dropCallback;
        self.cloneItem=cloneItem;
        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                //console.log('Activated news list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItem(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }

            self.paginate.page=0;
            return getList().then(function() {
                console.log('Activated list View');
            });
        }
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            self.Items.save({update:field},o ,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            })
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={}
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.workplace.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание мастера')(err)
                    }
                })
        }
        function cloneItem(item){
            var name;
            self.Items.create()
                .then(function (res) {
                    name=res;
                    return self.Items.getItem(item._id)
                })
                .then(function(master){
                    self.newItem=angular.copy(master)
                    self.newItem.name=name;
                    self.newItem.nameL={};

                    delete self.newItem._id
                    delete self.newItem.__v
                    delete self.newItem.url;
                    console.log( self.newItem)
                    self.newItem.blocks.forEach(function (block) {
                        delete block.img;
                        delete block._id;
                        if(block.type=='stuffs'){
                            if(block.stuffs && block.stuffs.length){
                                block.stuffs=block.stuffs.map(function (s) {
                                    return s._id
                                })
                            }
                        }
                        block.imgs=[]
                    })
                    //throw 'test'
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.workplace.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание объекта')(err)
                    }
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Workplace/'+item.url
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return self.getList();
                })
                .then(function(){
                    Photo.deleteFolder('Workplace',folder)
                })
                .catch(function(err){
                    if(!err){return}
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление объекта')(err)
                    }

                })
        }
        function dropCallback(item){
            var i=0;
            //http://stackoverflow.com/questions/28983424/make-angular-foreach-wait-for-promise-after-going-to-next-object
            setTimeout(function(){
                self.items.reduce(function(p, item) {
                    return p.then(function() {
                        i++;
                        item.index=i;
                        return saveField(item,'index')
                    });
                }, $q.when(true)).then(function(){
                    console.log(self.items.map(function(el){return el.index}))
                });
            },50)
            return item;
        }
    }

    ItemCtrl.$inject=['Workplace','$stateParams','$q','$uibModal','global','exception','Stuff','Photo','$scope','$timeout','Confirm','SetCSS'];
    function ItemCtrl(Items,$stateParams,$q,$uibModal,global,exception,Stuff,Photo,$scope,$timeout,Confirm,SetCSS){
        var self = this;
        self.Items=Items;
        self.type='Workplace'
        self.item={};
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.listOfBlocksForWorkplacePage=listOfBlocksForWorkplacePage;
        self.listOfBlocks=listOfBlocksForWorkplacePage;
        console.log(self.listOfBlocksForWorkplacePage)
        console.log(self.listOfBlocks)
        self.moment=moment;
        self.saveField=saveField;

        self.setStyles=setStyles;

        self.addBlock=addBlock;
        self.refreshBlocks=refreshBlocks;
        self.deleteBlock=deleteBlock;
        self.deleteSlide=deleteSlide;
        self.editSlide=editSlide;


        // collections
        self.addItemInBlock=addItemInBlock;
        self.movedItem=movedItem;
        self.deleteItemFromBlock=deleteItemFromBlock;
        self.changeItem=changeItem;

        //********************activate***************************
        activate();
        //*******************************************************
        function activate() {
            //console.log(id)
            return getItem($stateParams.id).then(function() {})
            .catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        $scope.$on('changeLang',function(){
            activate();
        })
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    if(data && !data.blocks){
                        data.blocks=[];
                        saveField('blocks',[])
                    }
                    var bl=data.blocks.filter(function (b) {
                        return b
                    })
                    if(bl.length!=data.blocks.length){
                        saveField('blocks',bl)
                        data.blocks=bl;
                    }
                    data.blocks.forEach(function (b,i) {
                        if(b.type=='stuffs' && b.stuffs.length){
                            //b.imgs=b.stuffs
                            b.stuffs=b.stuffs.map(function (s) {
                                return (s._is || s)
                            })
                        }
                        b.i=i;
                    })
                    data.blocks.sort(function (a,b) {
                        return a.index-b.index
                    })
                    self.item=data;
                    return self.item;
                } ).catch(function(err){
                    console.log(err)
                    return $q.reject(err)
                });
        }
        function setStyles(block,idx) {
            $q.when()
                .then(function(){
                    return SetCSS.setStyles(block)
                })
                .then(function(){
                    if(block.elements){
                        saveField('blocks.'+block.i+'.elements',block.elements)
                    }
                    if(block.blockStyle){
                        saveField('blocks.'+block.i+'.blockStyle',block.blockStyle)
                    }

                })
        }
        function saveField(field,value,defer,indexImgs){
            if(field.indexOf('index')>-1){
                self.item.blocks.sort(function (a,b) {
                    return a.index-b.index
                })
                self.item.blocks.forEach(function (b,i) {
                    b.i=i;
                })
                value=self.item.blocks;
                field='blocks'
            }
            defer =(defer)?defer:100;
            setTimeout(function(){
                if(field=='date'){
                    value=new Date(self.item[field])
                }
                var o={_id:self.item._id};
                o[field]=value
                var query={update:field}
                if(field.indexOf('.imgs')>-1 && typeof indexImgs!='undefined'){
                    query.indexImgs=indexImgs;
                }
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };
        function refreshBlocks() {
            return self.Items.getItem($stateParams.id)
            //console.log(id)
                .then(function(data) {
                    /*console.log(data)
                     console.log(self.item.blocks.length)*/
                    data.blocks.forEach(function (b,i) {
                        b.i=i;
                        if(!b.desc){b.desc=''}
                        if(!b.descL){b.descL={}}
                        if(!b.desc1){b.desc1=''}
                        if(!b.desc1L){b.desc1L={}}
                        if(!b.name){b.name=''}
                        if(!b.nameL){b.nameL={}}
                        if(!b.name1){b.name1=''}
                        if(!b.name1L){b.name1L={}}
                        if(!b.videoLink){b.videoLink=''}
                    })
                    self.item.blocks=data.blocks
                    /*console.log(self.item.blocks.length)*/
                })
        }
        function addBlock(type){
            if(!type){return}
            $scope.$broadcast('addNewBlock',{type:type})
            self.newBlock=null;
            return;

            var index=1;
            self.item.blocks.forEach(function(block){
                if(block.index && block.index>=index){
                    index=block.index+1;
                }
            })
            var o={_id:self.item._id,type:type,index:index,id:Date.now()};
            var update={update:'type index id',embeddedName:'blocks',embeddedPush:true};
            if(type=='slider' || type=='stuffs'){
                o.imgs=[];
                update.update+=' imgs'
            }
            $q.when()
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    activate()
                    self.newBlock=null
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }
        function deleteBlock(block,index) {
            var o={_id:self.item._id};
            var update={update:'_id_id',embeddedName:'blocks'};
            o['id']=block.id;
            update.embeddedPull=true;

            Confirm('потверждаете?')
                .then(function () {
                    self.item.blocks.splice(index,1)
                    if(!block._id){
                        update={update:'blocks'};
                        o['blocks']=self.item['blocks']
                    } else{
                        o['_id_id']=block._id;
                        update={update:'_id_id',embeddedName:'blocks'};
                        update.embeddedPull=true;
                    }
                    //console.log(update,o)
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    var images=[]
                    if(block.img){
                        images.push(block.img);
                    }
                    if(block.video){
                        images.push(block.video);
                    }
                    if(block.videoCover){
                        images.push(block.videoCover);
                    }
                    if(block.imgs && block.imgs.length){
                        block.imgs.forEach(function(im){
                            if(im.img){
                                images.push(im.img);
                            }
                        })

                    }
                    if(images.length){
                        return Photo.deleteFiles('Stat',images)
                    }

                })
                .then(function () {
                    activate()
                })



        }

        function deleteSlide(block,index){
            Photo.deleteFiles('Workplace',[block.imgs[index].img])
                .then(function(response) {
                    block.imgs.splice(index,1)
                    self.saveField('blocks.'+block.i+'.imgs',block.imgs,null,index)
                },function(err) {console.log(err)});
        }
        function editSlide(block,index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/CONTENT/workplace/editSlide.html',
                controller: function(slide,$uibModalInstance){
                    var self=this;
                    self.item=slide;
                    self.ok=function(){
                        console.log(self.item)
                        $uibModalInstance.close(self.item);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size:'lg',
                resolve: {
                    slide: function () {
                        return block.imgs[index];
                    },
                }
            });
            modalInstance.result.then(function (slide) {
                //console.log(slide)
                self.saveField('blocks.'+block.i+'.imgs',block.imgs)
            }, function () {
            });
        }
        //console.log(global.get('store').val.template.master)
        if(!global.get('store').val.template.workplace){
            global.get('store').val.template.workplace={parts:[]}
        }
        var keyParts=global.get('store').val.template.workplace.parts.filter(function (el) {
            return el.is
        }).map(function (el) {
            return el.name
        });
        //console.log(keyParts)
        function filterBlocks(item) {
            return keyParts.indexOf(item.key)>-1
        }

        function addItemInBlock(block,$index) {
            //console.log(block)
            var model;
            switch(block.type){
                case 'stuffs':model=Stuff;break;
                case 'campaign':model=Campaign;break;
                case 'filterTags':model=FilterTags;break;
                case 'brandTags':model=BrandTags;break;
                case 'brands':model=Brans;break;
                case 'categories':model=Category;break;
            }
            $q.when()
                .then(function () {
                    return model.select()
                })
                .then(function (item) {
                    if(block.type=='stuffs'){
                        if(block.stuffs && block.stuffs.length && block.stuffs.some(function(s){ if(s && s._id){return s._id==item._id}else{return s==item._id}})){
                            throw 'такой объект уже есть'
                        }
                    }
                    if(!block[block.type]){
                        block[block.type]=[];
                    }
                    var img,link;
                    name=item.name;
                    switch(block.type){
                        case 'stuffs':
                            img=(item.gallery[0] && item.gallery[0].thumb)?item.gallery[0].thumb:null;
                            link=item.link;
                            if(item.artikul){
                                item.name+=' '+item.artikul;
                            }
                            break;
                        case 'campaign':
                            img=(item.img)?item.img:null;
                            link='campaign/'+item.url;
                            break;
                        case 'filterTags':
                            img=(item.img)?item.img:null;
                            link='/group/category?queryTag='+item.url;
                            break;
                        case 'brandTags':
                            img=(item.img)?item.img:null;
                            link='/group/category?brandTag='+item.url;
                            break;
                        case 'brands':
                            img=(item.img)?item.img:null;
                            link='/group/category?brand='+item.url;
                            break;
                        case 'categories':
                            img=(item.img)?item.img:null;
                            link='/group/'+item.url;
                            break;
                    }
                    //console.log(typeof $index=='undefined')
                    //console.log(link)
                    if(typeof $index != 'undefined'){
                        block.imgs[$index]={name:item.name,img:img,link:link,_id:item._id};
                    }else{
                        if(!block.imgs){block.imgs=[]}
                        block.imgs.push({name:item.name,img:img,link:link,_id:item._id})
                    }

                    //console.log(block)
                    saveField('blocks.'+block.i+'.imgs',block.imgs)
                    if(block.type=='stuffs'){
                        block.stuffs=block.imgs.map(function (img) {
                            return img._id
                        })
                        saveField('blocks.'+block.i+'.stuffs',block.stuffs)
                    }


                    //saveField('blocks.'+block.i,block)
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('добавление')(err)
                    }
                })
        }
        function movedItem(block,item) {
            $timeout(function(){
                saveField('blocks.'+block.i+'.imgs',block.imgs)
                if(block.type=='stuffs'){
                    block.stuffs=block.imgs.map(function (img) {
                        return img._id
                    })
                    saveField('blocks.'+block.i+'.stuffs',block.stuffs)
                }
            },100)
            return item;
        }
        function deleteItemFromBlock(block,$index) {
            block.imgs.splice($index,1);
            saveField('blocks.'+block.i+'.imgs',block.imgs);
            if(block.type=='stuffs'){
                block.stuffs=block.imgs.map(function (img) {
                    return img._id
                })
                saveField('blocks.'+block.i+'.stuffs',block.stuffs)
            }
        }
        function changeItem(block,$index) {
            addItemInBlock(block,$index)
        }

    }

    serviceFoo.$inject=['$resource','$uibModal','$q','global'];
    function serviceFoo($resource,$uibModal,$q,global){
        var Items= $resource('/api/collections/Workplace/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            query:Items.query,
            get:Items.get,
            save:Items.save,
            delete:Items.delete,
            create:create,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            var data ={perPage:paginate.rows ,page:paginate.page,query:query};
            if(global.get('crawler') && global.get('crawler').val){
                data.subDomain=global.get('store').val.subDomain;
            }
            return Items.query(data).$promise
                .then(getListComplete)
            //.catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
            //.catch(getItemFailed);
            function getItemComplete(response) {
                if(response && response.blocks && response.blocks.length){
                    response.blocks.forEach(function (b) {
                        if(b.type=='stuffs'){
                            if(b.stuffs && b.stuffs.length){
                                b.imgs=b.stuffs.map(function(s){
                                    if(s.gallery && s.gallery.length && s.gallery[0].img){
                                        s.img=s.gallery[0].img;
                                    }
                                    return s;
                                });
                            }else{b.imgs=[]}
                        }
                    })
                }
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/CONTENT/workplace/createItem.html',
                    controller: function($uibModalInstance){
                        var self=this;
                        self.name=''
                        self.ok=function(){
                            $uibModalInstance.close(self.name);
                        }
                        self.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    controllerAs:'$ctrl',
                });
                modalInstance.result.then(function (name) {
                    if(name){
                        resolve(name.substring(0,50))
                    }else{
                        reject()
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
    }
})()
