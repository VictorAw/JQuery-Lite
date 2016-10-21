const DOMNodeCollection = require("./dom_node_collection.js");

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
