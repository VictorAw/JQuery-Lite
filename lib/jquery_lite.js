/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	let callbackQueue = [];

	document.addEventListener("DOMContentLoaded", () => {
	  while (callbackQueue.length > 0) {
	    callbackQueue.shift()();
	  }
	});

	function $l(arg) {
	  if (typeof arg === "function") {
	    return registerDocReadyCB(arg);
	  }
	  else if (typeof arg === "string") {
	    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
	  }
	  else if (arg instanceof HTMLElement) {
	    return new DOMNodeCollection([arg]);
	  }
	}

	function registerDocReadyCB(arg) {
	  if (document.readyState === "complete") {
	    arg();
	  }
	  else {
	    callbackQueue.push(arg);
	  }
	}

	// function $l(arg) {
	//   if (typeof arg === "string") {
	//     return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
	//   }
	//   else if (arg instanceof HTMLElement) {
	//     return new DOMNodeCollection([arg]);
	//   }
	// }

	window.$l = $l;


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(arg) {
	    if (typeof arg === "string") {
	      this.each((i, el) => {
	        el.innerHTML = arg;
	      });
	    }
	    else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(arg) {
	    this.each((i, el) => {
	      if (arg instanceof DOMNodeCollection) {
	        arg.each((j, el2) => {
	          el.innerHTML += el2.outerHTML;
	        });
	      }
	      else if (arg instanceof HTMLElement) {
	          el.innerHTML += arg.outerHTML;
	      }
	      else if (typeof arg === "string") {
	        el.innerHTML += arg;
	      }
	    });
	  }

	  attr(name, val=null) {
	    if (val) {
	      this.each((i, el) => {
	        el.setAttribute(name, val);
	      });
	    }
	    else {
	      return this.elements[0].getAttribute(name);
	    }
	  }

	  addClass(arg) {
	    if (typeof arg === "string") {
	      this.each((index, el) => {
	        if (el.className !== "") {
	          arg = " " + arg;
	        }

	        el.className += arg;
	      });
	    }
	  }

	  removeClass(arg) {
	    if (typeof arg === "string") {
	      this.each((index, el) => {
	        if (el.className.split(" ").length !== 1) {
	          arg = " " + arg;
	        }

	        el.className = el.className.replace(arg, "");
	      });
	    }
	  }

	  each(callback) {
	    for (let i=0; i<this.elements.length; i++) {
	      callback(i, this.elements[i]);
	    }
	  }

	  children() {
	    let children = [];
	    this.each((index, el) => {
	      children = children.concat(Array.from(el.children));
	    });
	    return new DOMNodeCollection(children);
	  }

	  parent() {
	    let parents = [];
	    this.each((index, el) => {
	      if (!parents.includes(el.parentNode)) {
	        parents.push(el.parentNode);
	      }
	    });
	    return new DOMNodeCollection(parents);
	  }

	  find(selector) {
	    let selected = [];
	    this.each((index, el) => {
	      selected = selected.concat(Array.from(el.querySelectorAll(selector)));
	    });
	    return new DOMNodeCollection(selected);
	  }

	  remove() {
	    this.each((index, el) => {
	      el.parentNode.removeChild(el);
	    });
	    this.elements = [];
	  }

	  on(eventName, callback) {
	    this.each( (index, el) => {
	      el.addEventListener(eventName, callback);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);