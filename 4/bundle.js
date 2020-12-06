/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_trip_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/trip-info.js */ "./src/view/trip-info.js");
/* harmony import */ var _view_cost_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/cost.js */ "./src/view/cost.js");
/* harmony import */ var _view_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/menu.js */ "./src/view/menu.js");
/* harmony import */ var _view_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/filter.js */ "./src/view/filter.js");
/* harmony import */ var _view_sorter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/sorter.js */ "./src/view/sorter.js");
/* harmony import */ var _view_trip_list_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/trip-list.js */ "./src/view/trip-list.js");
/* harmony import */ var _view_trip_point_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/trip-point.js */ "./src/view/trip-point.js");
/* harmony import */ var _mocks_event_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mocks/event.js */ "./src/mocks/event.js");
/* harmony import */ var _view_edit_form_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/edit-form.js */ "./src/view/edit-form.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* import {
  getRandomInteger
} from "./util.js";*/







/* import {
  createNewPointElement
} from "./view/new-form.js";*/




const EVENT_COUNT = 5;
const render = (container, layout, place) => {
  container.insertAdjacentHTML(place, layout);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripEvents = document.querySelector(`.trip-events`);


const eventsPoints = new Array(EVENT_COUNT).fill().map(_mocks_event_js__WEBPACK_IMPORTED_MODULE_7__["generateEvent"]);
const events = eventsPoints.slice().sort((a, b) => {
  return +a.dateTime.start - b.dateTime.start;
});

const getTripCost = (array) => {
  let cost = 0;
  for (const item of array) {
    let offerPrice = 0;
    if (item.type in _mocks_event_js__WEBPACK_IMPORTED_MODULE_7__["offerOptions"]) {
      for (const offer of item.offers) {
        offerPrice = offerPrice + _mocks_event_js__WEBPACK_IMPORTED_MODULE_7__["offerOptions"][item.type][offer].price;
      }
    }
    cost = cost + item.price + offerPrice;
  }
  return cost;
};

const getTripInfo = (array) => {
  const tripDuration = `${Object(_util__WEBPACK_IMPORTED_MODULE_9__["getDateFormat"])(array[0].dateTime.start).day}&nbsp;—&nbsp;${Object(_util__WEBPACK_IMPORTED_MODULE_9__["getDateFormat"])(array[array.length - 1].dateTime.end).dayOfMonth}`;
  const tripDestination = `${array[0].destination} &mdash; ... &mdash; ${array[array.length - 1].destination}`;
  return {
    tripDuration,
    tripDestination,
  };
};

if (EVENT_COUNT) {
  render(tripEvents, Object(_view_sorter_js__WEBPACK_IMPORTED_MODULE_4__["createSorterFormElement"])(), `beforeend`);
  render(tripMain, Object(_view_trip_info_js__WEBPACK_IMPORTED_MODULE_0__["createTripInfoElement"])(getTripInfo(events)), `afterbegin`);

  const tripInfo = document.querySelector(`.trip-info`);
  render(tripInfo, Object(_view_cost_js__WEBPACK_IMPORTED_MODULE_1__["createCostInfoElement"])(getTripCost(events)), `beforeend`);
}
render(tripControlsTitle, Object(_view_menu_js__WEBPACK_IMPORTED_MODULE_2__["createMenuElement"])(), `beforebegin`);
render(tripControlsTitle, Object(_view_filter_js__WEBPACK_IMPORTED_MODULE_3__["createFilterFormElement"])(), `afterend`);

render(tripEvents, Object(_view_trip_list_js__WEBPACK_IMPORTED_MODULE_5__["createTripListElement"])(EVENT_COUNT, 200), `beforeend`);
const tripEventsList = document.querySelector(`.trip-events__list`);

/* render(tripEventsList, createNewPointElement(), `afterbegin`);*/
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsList, Object(_view_trip_point_js__WEBPACK_IMPORTED_MODULE_6__["createTripPointElement"])(events[i]), `beforeend`);
}
render(tripEventsList, Object(_view_edit_form_js__WEBPACK_IMPORTED_MODULE_8__["createEditPointElement"])(events[0]), `afterbegin`);


/***/ }),

/***/ "./src/mocks/event.js":
/*!****************************!*\
  !*** ./src/mocks/event.js ***!
  \****************************/
/*! exports provided: generateEvent, offerOptions, pointDestinations, pointTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEvent", function() { return generateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offerOptions", function() { return offerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointDestinations", function() { return pointDestinations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointTypes", function() { return pointTypes; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);



const PHOTO_PATH = `http://picsum.photos/248/152?r=`;
const pointTypeEnum = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECKIN: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTARAURANT: `Restaurant`,
};
const pointTypes = [
  pointTypeEnum.TAXI,
  pointTypeEnum.BUS,
  pointTypeEnum.TRAIN,
  pointTypeEnum.SHIP,
  pointTypeEnum.TRANSPORT,
  pointTypeEnum.DRIVE,
  pointTypeEnum.FLIGHT,
  pointTypeEnum.CHECKIN,
  pointTypeEnum.SIGHTSEEING,
  pointTypeEnum.RESTARAURANT,
];
const pointDestinations = [
  `Chamonix`,
  `Geneva`,
  `Amsterdam`,
  `Nice`,
  `Monaco`,
  `Menton`,
];

const offerOptions = {
  [pointTypeEnum.FLIGHT]: {
    luggage: {
      name: `Add luggage`,
      price: 30,
    },
    comfort: {
      name: `Switch to comfort class`,
      price: 100,
    },
    meal: {
      name: `Add meal`,
      price: 15,
    },
    seats: {
      name: `Choose seats`,
      price: 5,
    },
    train: {
      name:
        `Travel by train`,
      price: 40,
    },
  },
  [pointTypeEnum.TAXI]: {
    taxi: {
      name: `Order Uber`,
      price: 20,
    },
  },
  [pointTypeEnum.SIGHTSEEING]: {
    tickets: {
      name: `Book tickets`,
      price: 40,
    },
    lunch: {
      name: `Lunch in city`,
      price: 30,
    },
    breakfast: {
      name: `Add breakfast`,
      price: 50,
    },
  },
  [pointTypeEnum.DRIVE]: {
    car: {
      name: `Rent a car`,
      price: 200,
    },
  },
};

const pointDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus.`
];

const generateDate = () => {
  const hourGap = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 48);
  const minutesGap = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 60);
  const startDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()().add(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, minutesGap), `minute`).add(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(-hourGap, 0), `hour`).valueOf();
  const endDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()().add(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, minutesGap), `minute`).add(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, hourGap), `hour`).valueOf();

  return {
    startDate,
    endDate,
  };
};

const generateOfferOptions = (type) => {
  const ret = [];
  for (let key in offerOptions[type]) {
    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)) {
      // noinspection JSUnfilteredForInLoop
      ret.push(key);
    }
  }
  return ret;
};

const generateDescription = () => {

  return pointDescription.slice(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, pointDescription.length - 1)).join(``);
};

const generatePhotos = () => {
  return Array(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 5)).fill().map(() => `${PHOTO_PATH}${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(1, 15)}`);
};

const generateEvent = () => {
  const type = pointTypes[Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, pointTypes.length - 1)];
  return {
    type,
    destination: pointDestinations [Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, pointDestinations.length - 1)],
    offers: generateOfferOptions(type),
    description: generateDescription(),
    photo: generatePhotos(),
    dateTime: {
      start: generateDate().startDate,
      end: generateDate().endDate,
    },
    price: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 200),
  };
};




/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: getRandomInteger, getDateFormat, getDatesDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateFormat", function() { return getDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDatesDuration", function() { return getDatesDuration; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDateFormat = (date) => {
  const formatDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(`DD/MM/YY HH:mm`);
  const day = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(`MMM DD`);
  const time = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(`HH:mm`);
  const dayOfMonth = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(`DD`);

  return {
    formatDate,
    day,
    time,
    dayOfMonth
  };
};

const getDatesDuration = (startDate, endDate) => {
  startDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(startDate);
  endDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(endDate);
  const durationHour = endDate.diff(startDate, `hour`);
  const durationMinutes = endDate.diff(startDate, `m`);
  const durationDay = endDate.diff(startDate, `day`);
  const addNull = (val)=> {
    let stringVal = `${val}`;
    if (val < 10) {
      stringVal = `0${val}`;
    }

    return stringVal;
  };

  let durationString = `${addNull(durationMinutes % 60)}M`;
  if (durationMinutes > 59 && durationHour < 24) {
    durationString = `${addNull(durationHour)}H ${addNull(durationMinutes % 60)}M`;
  } else if (durationHour > 24) {
    durationString = `${addNull(durationDay)}D ${addNull(durationHour % 24)}H ${addNull(durationMinutes % 60)}M`;
  }

  return durationString;
};




/***/ }),

/***/ "./src/view/cost.js":
/*!**************************!*\
  !*** ./src/view/cost.js ***!
  \**************************/
/*! exports provided: createCostInfoElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCostInfoElement", function() { return createCostInfoElement; });
const createCostInfoElement = (cost) => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>`;
};


/***/ }),

/***/ "./src/view/edit-form.js":
/*!*******************************!*\
  !*** ./src/view/edit-form.js ***!
  \*******************************/
/*! exports provided: createEditPointElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEditPointElement", function() { return createEditPointElement; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _mocks_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mocks/event.js */ "./src/mocks/event.js");



const createEditPointElement = (event) => {

  let offersList = ``;
  let destinationString = ``;
  let photoString = ``;

  if (event.type in _mocks_event_js__WEBPACK_IMPORTED_MODULE_1__["offerOptions"]) {
    const options = Object.entries(_mocks_event_js__WEBPACK_IMPORTED_MODULE_1__["offerOptions"][event.type]);
    for (const [key, value] of options) {
      offersList = offersList + `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${key}-1" type="checkbox" name="event-offer-${key}" ${ event.offers.includes(key) ? `checked` : ``}>
                        <label class="event__offer-label" for="event-offer-${key}-1">
                          <span class="event__offer-title">${value.name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${value.price}</span>
                        </label>
                      </div>`;
    }
    offersList = `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">${offersList}</div>
                  </section>`;

  }
  if (event.destination.length) {
    destinationString = `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${event.description}</p>
                  </section>`;
  }

  if (event.photo.length) {
    for (const photo of event.photo) {
      photoString = photoString + `<img class="event__photo" src="${photo}" alt="Event photo">`;
    }

    photoString = `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoString}
                      </div>
                    </div>`;
  }

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                          <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${event.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.start).formatDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.end).formatDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersList}
                  ${destinationString}
                  ${photoString}
                </section>
              </form>
            </li>`;
};


/***/ }),

/***/ "./src/view/filter.js":
/*!****************************!*\
  !*** ./src/view/filter.js ***!
  \****************************/
/*! exports provided: createFilterFormElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterFormElement", function() { return createFilterFormElement; });
const createFilterFormElement = () => {
  return `<form class="trip-filters" action="#" method="get">
              <div class="trip-filters__filter">
                <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                <label class="trip-filters__filter-label" for="filter-future">Future</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
                <label class="trip-filters__filter-label" for="filter-past">Past</label>
              </div>

              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};


/***/ }),

/***/ "./src/view/menu.js":
/*!**************************!*\
  !*** ./src/view/menu.js ***!
  \**************************/
/*! exports provided: createMenuElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMenuElement", function() { return createMenuElement; });
const createMenuElement = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
            </nav>`;
};


/***/ }),

/***/ "./src/view/sorter.js":
/*!****************************!*\
  !*** ./src/view/sorter.js ***!
  \****************************/
/*! exports provided: createSorterFormElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSorterFormElement", function() { return createSorterFormElement; });
const createSorterFormElement = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
};


/***/ }),

/***/ "./src/view/trip-info.js":
/*!*******************************!*\
  !*** ./src/view/trip-info.js ***!
  \*******************************/
/*! exports provided: createTripInfoElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfoElement", function() { return createTripInfoElement; });
const createTripInfoElement = (info) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${info.tripDestination}</h1>

              <p class="trip-info__dates">${info.tripDuration}</p>
            </div>
          </section>`;
};


/***/ }),

/***/ "./src/view/trip-list.js":
/*!*******************************!*\
  !*** ./src/view/trip-list.js ***!
  \*******************************/
/*! exports provided: createTripListElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripListElement", function() { return createTripListElement; });
const createTripListElement = (isEmpty, status) => {
  if (status === 200) {
    if (isEmpty > 0) {
      return `<ul class="trip-events__list"></ul>`;
    } else {
      return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
  } else {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
};


/***/ }),

/***/ "./src/view/trip-point.js":
/*!********************************!*\
  !*** ./src/view/trip-point.js ***!
  \********************************/
/*! exports provided: createTripPointElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripPointElement", function() { return createTripPointElement; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _mocks_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mocks/event.js */ "./src/mocks/event.js");



const createTripPointElement = (event) => {

  let offersList = ``;
  if (event.offers.length) {
    const options = Object.entries(_mocks_event_js__WEBPACK_IMPORTED_MODULE_1__["offerOptions"][event.type]);
    for (const [key, value] of options) {
      if (event.offers.includes(key)) {
        offersList = offersList + `<li class="event__offer">
        <span class="event__offer-title">${value.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${value.price}</span>
      </li>`;
      }
    }
    offersList = `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">${offersList}</ul>`;
  }
  return `
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.start).formatDate}">${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.start).day}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${event.type} ${event.destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.start).formatDate}">${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.start).time}</time>
        &mdash;
        <time class="event__end-time" datetime="${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.end).formatDate}">${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDateFormat"])(event.dateTime.end).time}</time>
      </p>
      <p class="event__duration">${Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getDatesDuration"])(event.dateTime.start, event.dateTime.end)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${event.price}</span>
    </p>
    ${offersList}
    <button class="event__favorite-btn ${event.isFavorite ? `event__favorite-btn--active` : ``}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`;
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map