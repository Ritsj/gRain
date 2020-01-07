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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Layout */ "./src/components/Layout.tsx");
/* harmony import */ var _components_Dev__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Dev */ "./src/components/Dev.tsx");
/* harmony import */ var _custom_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom.css */ "./src/custom.css");
/* harmony import */ var _custom_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_custom_css__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = (() => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: '/', component: _components_Dev__WEBPACK_IMPORTED_MODULE_3__["default"] }))));


/***/ }),

/***/ "./src/components/Dev.tsx":
/*!********************************!*\
  !*** ./src/components/Dev.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _containers_encounterContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/encounterContainer */ "./src/components/containers/encounterContainer.tsx");




const initialState = {
    isOpen: true,
};
class Dev extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.handleToggle = () => this.setState(toggleOpen);
    }
    render() {
        const { isOpen } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Clicker, { onClick: this.handleToggle }, "Toggle"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Collapse"], { isOpen: isOpen },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_encounterContainer__WEBPACK_IMPORTED_MODULE_3__["default"], null))));
    }
}
const toggleOpen = (prevstate) => ({ isOpen: !prevstate.isOpen });
/*const incClickCount = ( prevState: State ) => ({ clickCount: prevState.clickCount +1 });
const decClickCount = ( prevState: State ) => ({ clickCount: prevState.clickCount -1 });*/
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])()(Dev));
const Clicker = ({ onClick: handleClick, children }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { onClick: handleClick }, children));


/***/ }),

/***/ "./src/components/Layout.tsx":
/*!***********************************!*\
  !*** ./src/components/Layout.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NavMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavMenu */ "./src/components/NavMenu.tsx");



/* harmony default export */ __webpack_exports__["default"] = ((props) => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_NavMenu__WEBPACK_IMPORTED_MODULE_2__["default"], null),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], null, props.children))));


/***/ }),

/***/ "./src/components/NavMenu.css":
/*!************************************!*\
  !*** ./src/components/NavMenu.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "a.navbar-brand {\r\n    white-space: normal;\r\n    text-align: center;\r\n    word-break: break-all;\r\n}\r\n\r\nhtml { font-size: 14px; }\r\n\r\n@media (min-width: 768px) {\r\n    html { font-size: 16px; }\r\n}\r\n\r\n.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }\r\n", "",{"version":3,"sources":["NavMenu.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;IACnB,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA,OAAO,eAAe,EAAE;;AAExB;IACI,OAAO,eAAe,EAAE;AAC5B;;AAEA,cAAc,8CAA8C,EAAE","file":"NavMenu.css","sourcesContent":["a.navbar-brand {\r\n    white-space: normal;\r\n    text-align: center;\r\n    word-break: break-all;\r\n}\r\n\r\nhtml { font-size: 14px; }\r\n\r\n@media (min-width: 768px) {\r\n    html { font-size: 16px; }\r\n}\r\n\r\n.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }\r\n"]}]);


/***/ }),

/***/ "./src/components/NavMenu.tsx":
/*!************************************!*\
  !*** ./src/components/NavMenu.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _NavMenu_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NavMenu.css */ "./src/components/NavMenu.css");
/* harmony import */ var _NavMenu_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_NavMenu_css__WEBPACK_IMPORTED_MODULE_3__);




class NavMenu extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false
        };
        this.toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["Navbar"], { className: "navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3", light: true },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavbarBrand"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/" }, "gRain"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavbarToggler"], { onClick: this.toggle, className: "mr-2" }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["Collapse"], { className: "d-sm-inline-flex flex-sm-row-reverse", isOpen: this.state.isOpen, navbar: true },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "navbar-nav flex-grow" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavItem"], null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], className: "text-dark", to: "/" }, "Dev"))))))));
    }
}


/***/ }),

/***/ "./src/components/containers/encounterContainer.tsx":
/*!**********************************************************!*\
  !*** ./src/components/containers/encounterContainer.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EncounterContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _redux_actions_encounterActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../redux/actions/encounterActions */ "./src/redux/actions/encounterActions.ts");
/* harmony import */ var _presentational_encounter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presentational/encounter */ "./src/components/presentational/encounter.tsx");




function EncounterContainer({ initialLevel = [], initialSelectedLevel, initialSelectedDifficulty, }) {
    /***
     * REDUX - APPLICATION STATE && ACTIONS
     */
    const encounterState = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])((state) => state.encounter);
    const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    const requestEncounterValues = _redux_actions_encounterActions__WEBPACK_IMPORTED_MODULE_2__["actionCreators"].requestEncounterValue;
    /*****
     * LOCAL STATE
     */
    const [level, setLevel] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialLevel);
    const [levelSelect, setLevelSelect] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialSelectedLevel);
    const [difficultySelect, setDifficultySelect] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialSelectedDifficulty);
    /*****
    * EVENT HANDLERS
    */
    const handleAddLevel = (e) => {
        setLevel([...level, Number(levelSelect)]);
    };
    const handleChange = (e) => {
        switch (e.target.id) {
            case 'levelSelect':
                setLevelSelect(e.target.value);
                break;
            case 'difficultySelect':
                setDifficultySelect(e.target.value);
                break;
        }
        ;
    };
    const handleDispatchRequest = (e) => {
        if (level.length > 0) {
            console.log(level.length);
            const currentLevel = level;
            const currentRequestData = {
                level: currentLevel
            };
            if (difficultySelect !== undefined) {
                const currentDifficultyTier = { name: difficultySelect };
                currentRequestData.difficulty = currentDifficultyTier;
            }
            dispatch(requestEncounterValues(currentRequestData));
        }
        else {
            console.log('Error Level is not set');
        }
    };
    /***
     * SELECTINPUT POPULATION
     */
    const levelOptions = Array.from(new Array(20), (val, index) => index + 1);
    const levelSelection = {
        name: 'level', options: levelOptions
    };
    const difficultyOptions = ['Easy', 'Medium', 'Hard', 'Deadly'];
    const difficultySelection = {
        name: 'difficulty', options: difficultyOptions
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_presentational_encounter__WEBPACK_IMPORTED_MODULE_3__["Encounter"], { levelSelection: levelSelection, difficultySelection: difficultySelection, handleAddLevel: handleAddLevel, handleChange: handleChange, handleDispatchRequest: handleDispatchRequest, encounterState: encounterState }));
}


/***/ }),

/***/ "./src/components/global/global.tsx":
/*!******************************************!*\
  !*** ./src/components/global/global.tsx ***!
  \******************************************/
/*! exports provided: ClickButton, addOptions, firstCharToUpper, InputSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClickButton", function() { return ClickButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOptions", function() { return addOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstCharToUpper", function() { return firstCharToUpper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSelect", function() { return InputSelect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);


function ClickButton({ onClick, label }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], { onClick: onClick }, label));
}
/*****
 * Input Selection
 */
const addOptions = (optionsArray) => {
    return optionsArray.map(item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: item, key: item, label: item }));
};
const firstCharToUpper = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function InputSelect({ name, options, onChange, children }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Label"], { for: name }, firstCharToUpper(name)),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["InputGroup"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "select", name: name, id: name + 'Select', onChange: onChange }, addOptions(options)),
            children)));
}


/***/ }),

/***/ "./src/components/presentational/encounter.tsx":
/*!*****************************************************!*\
  !*** ./src/components/presentational/encounter.tsx ***!
  \*****************************************************/
/*! exports provided: Encounter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Encounter", function() { return Encounter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global/global */ "./src/components/global/global.tsx");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_2__);



const Encounter = ({ levelSelection, difficultySelection, handleAddLevel, handleChange, handleDispatchRequest, encounterState }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_global_global__WEBPACK_IMPORTED_MODULE_1__["InputSelect"], { name: levelSelection.name, options: levelSelection.options, onChange: handleChange, children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_global_global__WEBPACK_IMPORTED_MODULE_1__["ClickButton"], { onClick: handleAddLevel, label: 'Add' }) }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_global_global__WEBPACK_IMPORTED_MODULE_1__["InputSelect"], { name: difficultySelection.name, options: difficultySelection.options, onChange: handleChange }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_global_global__WEBPACK_IMPORTED_MODULE_1__["ClickButton"], { onClick: handleDispatchRequest, label: 'Send Request' })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, JSON.stringify(encounterState))));
};


/***/ }),

/***/ "./src/custom.css":
/*!************************!*\
  !*** ./src/custom.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Provide sufficient contrast against white background */\r\na {\r\n  color: #0366d6;\r\n}\r\n\r\ncode {\r\n  color: #E01A76;\r\n}\r\n\r\n.btn-primary {\r\n  color: #fff;\r\n  background-color: #1b6ec2;\r\n  border-color: #1861ac;\r\n}\r\n", "",{"version":3,"sources":["custom.css"],"names":[],"mappings":"AAAA,yDAAyD;AACzD;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,yBAAyB;EACzB,qBAAqB;AACvB","file":"custom.css","sourcesContent":["/* Provide sufficient contrast against white background */\r\na {\r\n  color: #0366d6;\r\n}\r\n\r\ncode {\r\n  color: #E01A76;\r\n}\r\n\r\n.btn-primary {\r\n  color: #fff;\r\n  background-color: #1b6ec2;\r\n  border-color: #1861ac;\r\n}\r\n"]}]);


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! connected-react-router */ "connected-react-router");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! history */ "history");
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(history__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _redux_store_configureStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./redux/store/configureStore */ "./src/redux/store/configureStore.ts");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App */ "./src/App.tsx");








__webpack_require__(/*! dotenv */ "dotenv").config();
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = Object(history__WEBPACK_IMPORTED_MODULE_5__["createBrowserHistory"])({ basename: baseUrl });
// Get the application-wide store instance, prepopulating with state from the server where available.
const store = Object(_redux_store_configureStore__WEBPACK_IMPORTED_MODULE_6__["default"])(history);
react_dom__WEBPACK_IMPORTED_MODULE_2__["render"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], { store: store },
    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](connected_react_router__WEBPACK_IMPORTED_MODULE_4__["ConnectedRouter"], { history: history },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_App__WEBPACK_IMPORTED_MODULE_7__["default"], null))), document.getElementById('root'));


/***/ }),

/***/ "./src/redux/actions/encounterActions.ts":
/*!***********************************************!*\
  !*** ./src/redux/actions/encounterActions.ts ***!
  \***********************************************/
/*! exports provided: actionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionCreators", function() { return actionCreators; });
/***********************************************
 * FUNCTIONS
 */
// should be written generically
const constructParam = (currentRequestData) => {
    let tempParam = '?';
    let i = 0;
    // function to concat parameters from payload
    // add level=value, if there are more values, add '&' + value
    do {
        tempParam = tempParam.concat('level=' + currentRequestData.level[i]);
        if (i < currentRequestData.level.length - 1) {
            tempParam = tempParam.concat('&');
        }
        i++;
    } while (i < currentRequestData.level.length);
    // add difficulty if present
    if (currentRequestData.difficulty !== undefined) {
        tempParam = tempParam.concat('&difficulty=' + currentRequestData.difficulty.name);
    }
    return tempParam;
};
/***********************************************
* ACTION CREATORS - Functions exposed to UI that triggers state change
*/
const actionCreators = {
    requestEncounterValue: (currentRequestData) => (dispatch, getState) => {
        // Only load data if it is not in store or loading
        const appState = getState();
        // update with .env path
        const baseUrl = 'https://localhost:5001/api/encounter';
        // call function to create parameters
        const param = constructParam(currentRequestData);
        if (appState && appState.encounter && currentRequestData !== appState.encounter.currentRequestData) {
            fetch(baseUrl + param)
                .then(response => response.json())
                .then(data => {
                dispatch({ type: 'RECEIVE_ENCOUNTERVALUE', currentRequestData: currentRequestData, values: data });
            });
            dispatch({ type: 'REQUEST_ENCOUNTERVALUE', currentRequestData: currentRequestData });
        }
    }
};


/***/ }),

/***/ "./src/redux/reducers/encounterReducers.ts":
/*!*************************************************!*\
  !*** ./src/redux/reducers/encounterReducers.ts ***!
  \*************************************************/
/*! exports provided: encounterReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encounterReducer", function() { return encounterReducer; });
/***********************************************
 * Initial State
*/
/***********************************************
* REDUCER - For given state and action, returns new state, but does not mutate old
*/
const initialState = {
    isLoading: false,
    values: undefined,
    currentRequestData: undefined,
    monsters: undefined
};
const encounterReducer = (state, incomingAction) => {
    if (state === undefined) {
        return initialState;
    }
    const action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ENCOUNTERVALUE':
            return Object.assign({}, state, { currentRequestData: action.currentRequestData, isLoading: true });
        case 'RECEIVE_ENCOUNTERVALUE':
            if (action.currentRequestData === state.currentRequestData) {
                return Object.assign({}, state, { values: action.values, isLoading: false });
            }
            break;
    }
    return state;
};


/***/ }),

/***/ "./src/redux/store/configureStore.ts":
/*!*******************************************!*\
  !*** ./src/redux/store/configureStore.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ "connected-react-router");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! . */ "./src/redux/store/index.ts");




function configureStore(history, initialState) {
    const middleware = [
        redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a,
        Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["routerMiddleware"])(history)
    ];
    const rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign({}, ___WEBPACK_IMPORTED_MODULE_3__["reducers"], { router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["connectRouter"])(history) }));
    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(rootReducer, initialState, Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...middleware), ...enhancers));
}


/***/ }),

/***/ "./src/redux/store/index.ts":
/*!**********************************!*\
  !*** ./src/redux/store/index.ts ***!
  \**********************************/
/*! exports provided: reducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony import */ var _reducers_encounterReducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducers/encounterReducers */ "./src/redux/reducers/encounterReducers.ts");

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
const reducers = {
    encounter: _reducers_encounterReducers__WEBPACK_IMPORTED_MODULE_0__["encounterReducer"]
};


/***/ }),

/***/ "bootstrap/dist/css/bootstrap.css":
/*!***************************************************!*\
  !*** external "bootstrap/dist/css/bootstrap.css" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bootstrap/dist/css/bootstrap.css");

/***/ }),

/***/ "connected-react-router":
/*!*****************************************!*\
  !*** external "connected-react-router" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connected-react-router");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "history":
/*!**************************!*\
  !*** external "history" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("history");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "reactstrap" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reactstrap");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map