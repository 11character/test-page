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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 140);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),

/***/ 10:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(17);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(22);

__webpack_require__(24);

var NemoQeScan = __webpack_require__(141);

var $w = $(window);

var quScan = new NemoQeScan({
    rootElement: $('#scanField')[0],
    width: $w.width(),
    height: $w.height()
});

function resize() {
    setTimeout(function () {
        quScan.resize($w.width(), $w.height());
    }, 100);
}

$(window).on('resize.nemolabs', function () {
    resize();
});

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsqr = __webpack_require__(142);

var Options = __webpack_require__(143);

var NemoQrScan = function () {
        function NemoQrScan(obj) {
                _classCallCheck(this, NemoQrScan);

                this.options = new Options(obj);
                this.domElement = document.createElement('DIV');
                this.videoElement = document.createElement('VIDEO');
                this.canvasElement = document.createElement('CANVAS');

                this.__hidenCanvasElement = document.createElement('CANVAS');

                this.__init();
        }

        _createClass(NemoQrScan, [{
                key: 'resize',
                value: function resize(width, height) {
                        var me = this;

                        var fieldEl = me.domElement;
                        var videoEl = me.videoElement;
                        var canvasEl = me.canvasElement;
                        var hCanvasEl = me.__hidenCanvasElement;
                        var vWidth = videoEl.videoWidth;
                        var vHeight = videoEl.videoHeight;

                        var w = width;
                        var h = height;

                        fieldEl.style.width = w + 'px';
                        fieldEl.style.height = h + 'px';

                        if (vWidth / vHeight < w / h) {
                                h = w / vWidth * vHeight;
                        } else {
                                w = h / vHeight * vWidth;
                        }

                        videoEl.style.width = w + 'px';
                        videoEl.style.height = h + 'px';
                        videoEl.style.left = (width - w) / 2 + 'px';
                        videoEl.style.top = (height - h) / 2 + 'px';

                        hCanvasEl.width = canvasEl.width = w;
                        hCanvasEl.height = canvasEl.height = h;
                        hCanvasEl.style.width = canvasEl.style.width = w + 'px';
                        hCanvasEl.style.height = canvasEl.style.height = h + 'px';
                        hCanvasEl.style.left = canvasEl.style.left = (width - w) / 2 + 'px';
                        hCanvasEl.style.top = canvasEl.style.top = (height - h) / 2 + 'px';
                }
        }, {
                key: 'clearCanvas',
                value: function clearCanvas() {
                        var me = this;

                        var canvasEl = me.canvasElement;
                        var ctx = canvasEl.getContext('2d');

                        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
                }
        }, {
                key: 'drawArea',
                value: function drawArea(code) {
                        var me = this;

                        var canvasEl = me.canvasElement;

                        if (code) {
                                console.log(code.data);

                                me.__drawLine(canvasEl, code.location.topLeftCorner, code.location.topRightCorner, "#FF00FF");
                                me.__drawLine(canvasEl, code.location.topRightCorner, code.location.bottomRightCorner, "#00FF00");
                                me.__drawLine(canvasEl, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#0000FF");
                                me.__drawLine(canvasEl, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF0000");
                        }
                }
        }, {
                key: '__drawLine',
                value: function __drawLine(canvasEl, begin, end, color) {
                        var ctx = canvasEl.getContext('2d');

                        ctx.beginPath();
                        ctx.moveTo(begin.x, begin.y);
                        ctx.lineTo(end.x, end.y);
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = color;
                        ctx.stroke();
                }
        }, {
                key: '__init',
                value: function __init() {
                        var me = this;

                        var options = me.options;
                        var fieldEl = me.domElement;
                        var videoEl = me.videoElement;
                        var canvasEl = me.canvasElement;

                        videoEl.setAttribute('autoPlay', 'autoPlay');
                        videoEl.setAttribute('playsinline', 'playsinline');
                        videoEl.style.position = 'absolute';

                        canvasEl.style.position = 'absolute';

                        fieldEl.style.overflow = 'hidden';
                        fieldEl.style.position = 'relative';

                        fieldEl.appendChild(videoEl);
                        fieldEl.appendChild(canvasEl);
                        me.options.rootElement.appendChild(fieldEl);

                        var userMedia = navigator.mediaDevices.getUserMedia({
                                audio: false,
                                video: {
                                        width: 640,
                                        height: 480,
                                        facingMode: 'environment'
                                }
                        });

                        userMedia.then(function (stream) {
                                videoEl.addEventListener('loadeddata', function () {
                                        me.resize(options.width, options.height);
                                });

                                videoEl.srcObject = stream;
                        }).catch(function (error) {
                                console.error(error.message);
                        });

                        var hCanvasEl = me.__hidenCanvasElement;
                        var hCtx = hCanvasEl.getContext('2d');

                        (function animate() {
                                hCtx.drawImage(videoEl, 0, 0, hCanvasEl.width, hCanvasEl.height);

                                var imageData = hCtx.getImageData(0, 0, hCanvasEl.width, hCanvasEl.height);
                                var code = jsqr(imageData.data, imageData.width, imageData.height);

                                me.clearCanvas();
                                me.drawArea(code);

                                requestAnimationFrame(animate);
                        })();
                }
        }]);

        return NemoQrScan;
}();

module.exports = NemoQrScan;

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsQR"] = factory();
	else
		root["jsQR"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix = /** @class */ (function () {
    function BitMatrix(data, width) {
        this.width = width;
        this.height = data.length / width;
        this.data = data;
    }
    BitMatrix.createEmpty = function (width, height) {
        return new BitMatrix(new Uint8ClampedArray(width * height), width);
    };
    BitMatrix.prototype.get = function (x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        return !!this.data[y * this.width + x];
    };
    BitMatrix.prototype.set = function (x, y, v) {
        this.data[y * this.width + x] = v ? 1 : 0;
    };
    BitMatrix.prototype.setRegion = function (left, top, width, height, v) {
        for (var y = top; y < top + height; y++) {
            for (var x = left; x < left + width; x++) {
                this.set(x, y, !!v);
            }
        }
    };
    return BitMatrix;
}());
exports.BitMatrix = BitMatrix;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGFPoly_1 = __webpack_require__(2);
function addOrSubtractGF(a, b) {
    return a ^ b; // tslint:disable-line:no-bitwise
}
exports.addOrSubtractGF = addOrSubtractGF;
var GenericGF = /** @class */ (function () {
    function GenericGF(primitive, size, genBase) {
        this.primitive = primitive;
        this.size = size;
        this.generatorBase = genBase;
        this.expTable = new Array(this.size);
        this.logTable = new Array(this.size);
        var x = 1;
        for (var i = 0; i < this.size; i++) {
            this.expTable[i] = x;
            x = x * 2;
            if (x >= this.size) {
                x = (x ^ this.primitive) & (this.size - 1); // tslint:disable-line:no-bitwise
            }
        }
        for (var i = 0; i < this.size - 1; i++) {
            this.logTable[this.expTable[i]] = i;
        }
        this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([0]));
        this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([1]));
    }
    GenericGF.prototype.multiply = function (a, b) {
        if (a === 0 || b === 0) {
            return 0;
        }
        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
    };
    GenericGF.prototype.inverse = function (a) {
        if (a === 0) {
            throw new Error("Can't invert 0");
        }
        return this.expTable[this.size - this.logTable[a] - 1];
    };
    GenericGF.prototype.buildMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid monomial degree less than 0");
        }
        if (coefficient === 0) {
            return this.zero;
        }
        var coefficients = new Uint8ClampedArray(degree + 1);
        coefficients[0] = coefficient;
        return new GenericGFPoly_1.default(this, coefficients);
    };
    GenericGF.prototype.log = function (a) {
        if (a === 0) {
            throw new Error("Can't take log(0)");
        }
        return this.logTable[a];
    };
    GenericGF.prototype.exp = function (a) {
        return this.expTable[a];
    };
    return GenericGF;
}());
exports.default = GenericGF;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGF_1 = __webpack_require__(1);
var GenericGFPoly = /** @class */ (function () {
    function GenericGFPoly(field, coefficients) {
        if (coefficients.length === 0) {
            throw new Error("No coefficients.");
        }
        this.field = field;
        var coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] === 0) {
            // Leading term must be non-zero for anything except the constant polynomial "0"
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
                firstNonZero++;
            }
            if (firstNonZero === coefficientsLength) {
                this.coefficients = field.zero.coefficients;
            }
            else {
                this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                for (var i = 0; i < this.coefficients.length; i++) {
                    this.coefficients[i] = coefficients[firstNonZero + i];
                }
            }
        }
        else {
            this.coefficients = coefficients;
        }
    }
    GenericGFPoly.prototype.degree = function () {
        return this.coefficients.length - 1;
    };
    GenericGFPoly.prototype.isZero = function () {
        return this.coefficients[0] === 0;
    };
    GenericGFPoly.prototype.getCoefficient = function (degree) {
        return this.coefficients[this.coefficients.length - 1 - degree];
    };
    GenericGFPoly.prototype.addOrSubtract = function (other) {
        if (this.isZero()) {
            return other;
        }
        if (other.isZero()) {
            return this;
        }
        var smallerCoefficients = this.coefficients;
        var largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            _a = [largerCoefficients, smallerCoefficients], smallerCoefficients = _a[0], largerCoefficients = _a[1];
        }
        var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
        for (var i = 0; i < lengthDiff; i++) {
            sumDiff[i] = largerCoefficients[i];
        }
        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        }
        return new GenericGFPoly(this.field, sumDiff);
        var _a;
    };
    GenericGFPoly.prototype.multiply = function (scalar) {
        if (scalar === 0) {
            return this.field.zero;
        }
        if (scalar === 1) {
            return this;
        }
        var size = this.coefficients.length;
        var product = new Uint8ClampedArray(size);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], scalar);
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.multiplyPoly = function (other) {
        if (this.isZero() || other.isZero()) {
            return this.field.zero;
        }
        var aCoefficients = this.coefficients;
        var aLength = aCoefficients.length;
        var bCoefficients = other.coefficients;
        var bLength = bCoefficients.length;
        var product = new Uint8ClampedArray(aLength + bLength - 1);
        for (var i = 0; i < aLength; i++) {
            var aCoeff = aCoefficients[i];
            for (var j = 0; j < bLength; j++) {
                product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
            }
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid degree less than 0");
        }
        if (coefficient === 0) {
            return this.field.zero;
        }
        var size = this.coefficients.length;
        var product = new Uint8ClampedArray(size + degree);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], coefficient);
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.evaluateAt = function (a) {
        var result = 0;
        if (a === 0) {
            // Just return the x^0 coefficient
            return this.getCoefficient(0);
        }
        var size = this.coefficients.length;
        if (a === 1) {
            // Just the sum of the coefficients
            this.coefficients.forEach(function (coefficient) {
                result = GenericGF_1.addOrSubtractGF(result, coefficient);
            });
            return result;
        }
        result = this.coefficients[0];
        for (var i = 1; i < size; i++) {
            result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
        }
        return result;
    };
    return GenericGFPoly;
}());
exports.default = GenericGFPoly;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binarizer_1 = __webpack_require__(4);
var decoder_1 = __webpack_require__(5);
var extractor_1 = __webpack_require__(11);
var locator_1 = __webpack_require__(12);
function jsQR(data, width, height) {
    var binarized = binarizer_1.binarize(data, width, height);
    var location = locator_1.locate(binarized);
    if (!location) {
        return null;
    }
    var extracted = extractor_1.extract(binarized, location);
    var decoded = decoder_1.decode(extracted.matrix);
    if (!decoded) {
        return null;
    }
    return {
        binaryData: decoded.bytes,
        data: decoded.text,
        chunks: decoded.chunks,
        location: {
            topRightCorner: extracted.mappingFunction(location.dimension, 0),
            topLeftCorner: extracted.mappingFunction(0, 0),
            bottomRightCorner: extracted.mappingFunction(location.dimension, location.dimension),
            bottomLeftCorner: extracted.mappingFunction(0, location.dimension),
            topRightFinderPattern: location.topRight,
            topLeftFinderPattern: location.topLeft,
            bottomLeftFinderPattern: location.bottomLeft,
            bottomRightAlignmentPattern: location.alignmentPattern,
        },
    };
}
jsQR.default = jsQR;
exports.default = jsQR;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(0);
var REGION_SIZE = 8;
var MIN_DYNAMIC_RANGE = 24;
function numBetween(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
// Like BitMatrix but accepts arbitry Uint8 values
var Matrix = /** @class */ (function () {
    function Matrix(width, height) {
        this.width = width;
        this.data = new Uint8ClampedArray(width * height);
    }
    Matrix.prototype.get = function (x, y) {
        return this.data[y * this.width + x];
    };
    Matrix.prototype.set = function (x, y, value) {
        this.data[y * this.width + x] = value;
    };
    return Matrix;
}());
function binarize(data, width, height) {
    if (data.length !== width * height * 4) {
        throw new Error("Malformed data passed to binarizer.");
    }
    // Convert image to greyscale
    var greyscalePixels = new Matrix(width, height);
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var r = data[((y * width + x) * 4) + 0];
            var g = data[((y * width + x) * 4) + 1];
            var b = data[((y * width + x) * 4) + 2];
            greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
        }
    }
    var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
    var verticalRegionCount = Math.ceil(height / REGION_SIZE);
    var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var sum = 0;
            var min = Infinity;
            var max = 0;
            for (var y = 0; y < REGION_SIZE; y++) {
                for (var x = 0; x < REGION_SIZE; x++) {
                    var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                    sum += pixelLumosity;
                    min = Math.min(min, pixelLumosity);
                    max = Math.max(max, pixelLumosity);
                }
            }
            var average = sum / (Math.pow(REGION_SIZE, 2));
            if (max - min <= MIN_DYNAMIC_RANGE) {
                // If variation within the block is low, assume this is a block with only light or only
                // dark pixels. In that case we do not want to use the average, as it would divide this
                // low contrast area into black and white pixels, essentially creating data out of noise.
                //
                // Default the blackpoint for these blocks to be half the min - effectively white them out
                average = min / 2;
                if (verticalRegion > 0 && hortizontalRegion > 0) {
                    // Correct the "white background" assumption for blocks that have neighbors by comparing
                    // the pixels in this block to the previously calculated black points. This is based on
                    // the fact that dark barcode symbology is always surrounded by some amount of light
                    // background for which reasonable black point estimates were made. The bp estimated at
                    // the boundaries is used for the interior.
                    // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                    var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) +
                        (2 * blackPoints.get(hortizontalRegion - 1, verticalRegion)) +
                        blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                    if (min < averageNeighborBlackPoint) {
                        average = averageNeighborBlackPoint;
                    }
                }
            }
            blackPoints.set(hortizontalRegion, verticalRegion, average);
        }
    }
    var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
            var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
            var sum = 0;
            for (var xRegion = -2; xRegion <= 2; xRegion++) {
                for (var yRegion = -2; yRegion <= 2; yRegion++) {
                    sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                }
            }
            var threshold = sum / 25;
            for (var x = 0; x < REGION_SIZE; x++) {
                for (var y = 0; y < REGION_SIZE; y++) {
                    var lum = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                    binarized.set(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y, lum <= threshold);
                }
            }
        }
    }
    return binarized;
}
exports.binarize = binarize;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(0);
var decodeData_1 = __webpack_require__(6);
var reedsolomon_1 = __webpack_require__(9);
var version_1 = __webpack_require__(10);
// tslint:disable:no-bitwise
function numBitsDiffering(x, y) {
    var z = x ^ y;
    var bitCount = 0;
    while (z) {
        bitCount++;
        z &= z - 1;
    }
    return bitCount;
}
function pushBit(bit, byte) {
    return (byte << 1) | bit;
}
// tslint:enable:no-bitwise
var FORMAT_INFO_TABLE = [
    { bits: 0x5412, formatInfo: { errorCorrectionLevel: 1, dataMask: 0 } },
    { bits: 0x5125, formatInfo: { errorCorrectionLevel: 1, dataMask: 1 } },
    { bits: 0x5E7C, formatInfo: { errorCorrectionLevel: 1, dataMask: 2 } },
    { bits: 0x5B4B, formatInfo: { errorCorrectionLevel: 1, dataMask: 3 } },
    { bits: 0x45F9, formatInfo: { errorCorrectionLevel: 1, dataMask: 4 } },
    { bits: 0x40CE, formatInfo: { errorCorrectionLevel: 1, dataMask: 5 } },
    { bits: 0x4F97, formatInfo: { errorCorrectionLevel: 1, dataMask: 6 } },
    { bits: 0x4AA0, formatInfo: { errorCorrectionLevel: 1, dataMask: 7 } },
    { bits: 0x77C4, formatInfo: { errorCorrectionLevel: 0, dataMask: 0 } },
    { bits: 0x72F3, formatInfo: { errorCorrectionLevel: 0, dataMask: 1 } },
    { bits: 0x7DAA, formatInfo: { errorCorrectionLevel: 0, dataMask: 2 } },
    { bits: 0x789D, formatInfo: { errorCorrectionLevel: 0, dataMask: 3 } },
    { bits: 0x662F, formatInfo: { errorCorrectionLevel: 0, dataMask: 4 } },
    { bits: 0x6318, formatInfo: { errorCorrectionLevel: 0, dataMask: 5 } },
    { bits: 0x6C41, formatInfo: { errorCorrectionLevel: 0, dataMask: 6 } },
    { bits: 0x6976, formatInfo: { errorCorrectionLevel: 0, dataMask: 7 } },
    { bits: 0x1689, formatInfo: { errorCorrectionLevel: 3, dataMask: 0 } },
    { bits: 0x13BE, formatInfo: { errorCorrectionLevel: 3, dataMask: 1 } },
    { bits: 0x1CE7, formatInfo: { errorCorrectionLevel: 3, dataMask: 2 } },
    { bits: 0x19D0, formatInfo: { errorCorrectionLevel: 3, dataMask: 3 } },
    { bits: 0x0762, formatInfo: { errorCorrectionLevel: 3, dataMask: 4 } },
    { bits: 0x0255, formatInfo: { errorCorrectionLevel: 3, dataMask: 5 } },
    { bits: 0x0D0C, formatInfo: { errorCorrectionLevel: 3, dataMask: 6 } },
    { bits: 0x083B, formatInfo: { errorCorrectionLevel: 3, dataMask: 7 } },
    { bits: 0x355F, formatInfo: { errorCorrectionLevel: 2, dataMask: 0 } },
    { bits: 0x3068, formatInfo: { errorCorrectionLevel: 2, dataMask: 1 } },
    { bits: 0x3F31, formatInfo: { errorCorrectionLevel: 2, dataMask: 2 } },
    { bits: 0x3A06, formatInfo: { errorCorrectionLevel: 2, dataMask: 3 } },
    { bits: 0x24B4, formatInfo: { errorCorrectionLevel: 2, dataMask: 4 } },
    { bits: 0x2183, formatInfo: { errorCorrectionLevel: 2, dataMask: 5 } },
    { bits: 0x2EDA, formatInfo: { errorCorrectionLevel: 2, dataMask: 6 } },
    { bits: 0x2BED, formatInfo: { errorCorrectionLevel: 2, dataMask: 7 } },
];
var DATA_MASKS = [
    function (p) { return ((p.y + p.x) % 2) === 0; },
    function (p) { return (p.y % 2) === 0; },
    function (p) { return p.x % 3 === 0; },
    function (p) { return (p.y + p.x) % 3 === 0; },
    function (p) { return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0; },
    function (p) { return ((p.x * p.y) % 2) + ((p.x * p.y) % 3) === 0; },
    function (p) { return ((((p.y * p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
    function (p) { return ((((p.y + p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
];
function buildFunctionPatternMask(version) {
    var dimension = 17 + 4 * version.versionNumber;
    var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
    matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
    matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
    matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
    // Alignment patterns
    for (var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++) {
        var x = _a[_i];
        for (var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++) {
            var y = _c[_b];
            if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
                matrix.setRegion(x - 2, y - 2, 5, 5, true);
            }
        }
    }
    matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
    matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
    if (version.versionNumber > 6) {
        matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
        matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
    }
    return matrix;
}
function readCodewords(matrix, version, formatInfo) {
    var dataMask = DATA_MASKS[formatInfo.dataMask];
    var dimension = matrix.height;
    var functionPatternMask = buildFunctionPatternMask(version);
    var codewords = [];
    var currentByte = 0;
    var bitsRead = 0;
    // Read columns in pairs, from right to left
    var readingUp = true;
    for (var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
        if (columnIndex === 6) {
            columnIndex--;
        }
        for (var i = 0; i < dimension; i++) {
            var y = readingUp ? dimension - 1 - i : i;
            for (var columnOffset = 0; columnOffset < 2; columnOffset++) {
                var x = columnIndex - columnOffset;
                if (!functionPatternMask.get(x, y)) {
                    bitsRead++;
                    var bit = matrix.get(x, y);
                    if (dataMask({ y: y, x: x })) {
                        bit = !bit;
                    }
                    currentByte = pushBit(bit, currentByte);
                    if (bitsRead === 8) {
                        codewords.push(currentByte);
                        bitsRead = 0;
                        currentByte = 0;
                    }
                }
            }
        }
        readingUp = !readingUp;
    }
    return codewords;
}
function readVersion(matrix) {
    var dimension = matrix.height;
    var provisionalVersion = Math.floor((dimension - 17) / 4);
    if (provisionalVersion <= 6) {
        return version_1.VERSIONS[provisionalVersion - 1];
    }
    var topRightVersionBits = 0;
    for (var y = 5; y >= 0; y--) {
        for (var x = dimension - 9; x >= dimension - 11; x--) {
            topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
        }
    }
    var bottomLeftVersionBits = 0;
    for (var x = 5; x >= 0; x--) {
        for (var y = dimension - 9; y >= dimension - 11; y--) {
            bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
        }
    }
    var bestDifference = Infinity;
    var bestVersion;
    for (var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++) {
        var version = VERSIONS_1[_i];
        if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
            return version;
        }
        var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
        if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
        }
        difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
        if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
        }
    }
    // We can tolerate up to 3 bits of error since no two version info codewords will
    // differ in less than 8 bits.
    if (bestDifference <= 3) {
        return bestVersion;
    }
}
function readFormatInformation(matrix) {
    var topLeftFormatInfoBits = 0;
    for (var x = 0; x <= 8; x++) {
        if (x !== 6) {
            topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
        }
    }
    for (var y = 7; y >= 0; y--) {
        if (y !== 6) {
            topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
        }
    }
    var dimension = matrix.height;
    var topRightBottomRightFormatInfoBits = 0;
    for (var y = dimension - 1; y >= dimension - 7; y--) {
        topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
    }
    for (var x = dimension - 8; x < dimension; x++) {
        topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
    }
    var bestDifference = Infinity;
    var bestFormatInfo = null;
    for (var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++) {
        var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
        if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
            return formatInfo;
        }
        var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
        if (difference < bestDifference) {
            bestFormatInfo = formatInfo;
            bestDifference = difference;
        }
        if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
            difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
            if (difference < bestDifference) {
                bestFormatInfo = formatInfo;
                bestDifference = difference;
            }
        }
    }
    // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
    if (bestDifference <= 3) {
        return bestFormatInfo;
    }
    return null;
}
function getDataBlocks(codewords, version, ecLevel) {
    var ecInfo = version.errorCorrectionLevels[ecLevel];
    var dataBlocks = [];
    var totalCodewords = 0;
    ecInfo.ecBlocks.forEach(function (block) {
        for (var i = 0; i < block.numBlocks; i++) {
            dataBlocks.push({ numDataCodewords: block.dataCodewordsPerBlock, codewords: [] });
            totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
        }
    });
    // In some cases the QR code will be malformed enough that we pull off more codewords than we should - truncate that case
    codewords = codewords.slice(0, totalCodewords);
    var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
    // Pull codewords to fill the blocks up to the minimum size
    for (var i = 0; i < shortBlockSize; i++) {
        for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
            var dataBlock = dataBlocks_1[_i];
            dataBlock.codewords.push(codewords.shift());
        }
    }
    // If there are any large blocks, pull codewords to fill the last element of those
    if (ecInfo.ecBlocks.length > 1) {
        var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
        var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
        for (var i = 0; i < largeBlockCount; i++) {
            dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
        }
    }
    // Add the rest of the codewords to the blocks. These are the error correction codewords.
    while (codewords.length > 0) {
        for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
            var dataBlock = dataBlocks_2[_a];
            dataBlock.codewords.push(codewords.shift());
        }
    }
    return dataBlocks;
}
function decodeMatrix(matrix) {
    var version = readVersion(matrix);
    if (!version) {
        return null;
    }
    var formatInfo = readFormatInformation(matrix);
    if (!formatInfo) {
        return null;
    }
    var codewords = readCodewords(matrix, version, formatInfo);
    var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
    // Count total number of data bytes
    var totalBytes = dataBlocks.reduce(function (a, b) { return a + b.numDataCodewords; }, 0);
    var resultBytes = new Uint8ClampedArray(totalBytes);
    var resultIndex = 0;
    for (var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++) {
        var dataBlock = dataBlocks_3[_i];
        var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
        if (!correctedBytes) {
            return null;
        }
        for (var i = 0; i < dataBlock.numDataCodewords; i++) {
            resultBytes[resultIndex++] = correctedBytes[i];
        }
    }
    try {
        return decodeData_1.decode(resultBytes, version.versionNumber);
    }
    catch (_a) {
        return null;
    }
}
function decode(matrix) {
    if (matrix == null) {
        return null;
    }
    var result = decodeMatrix(matrix);
    if (result) {
        return result;
    }
    // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
    for (var x = 0; x < matrix.width; x++) {
        for (var y = x + 1; y < matrix.height; y++) {
            if (matrix.get(x, y) !== matrix.get(y, x)) {
                matrix.set(x, y, !matrix.get(x, y));
                matrix.set(y, x, !matrix.get(y, x));
            }
        }
    }
    return decodeMatrix(matrix);
}
exports.decode = decode;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-bitwise
var BitStream_1 = __webpack_require__(7);
var shiftJISTable_1 = __webpack_require__(8);
var Mode;
(function (Mode) {
    Mode["Numeric"] = "numeric";
    Mode["Alphanumeric"] = "alphanumeric";
    Mode["Byte"] = "byte";
    Mode["Kanji"] = "kanji";
})(Mode = exports.Mode || (exports.Mode = {}));
var ModeByte;
(function (ModeByte) {
    ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
    ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
    ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
    ModeByte[ModeByte["Byte"] = 4] = "Byte";
    ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
    // StructuredAppend = 0x3,
    // ECI = 0x7,
    // FNC1FirstPosition = 0x5,
    // FNC1SecondPosition = 0x9,
})(ModeByte || (ModeByte = {}));
function decodeNumeric(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [10, 12, 14][size];
    var length = stream.readBits(characterCountSize);
    // Read digits in groups of 3
    while (length >= 3) {
        var num = stream.readBits(10);
        if (num >= 1000) {
            throw new Error("Invalid numeric value above 999");
        }
        var a = Math.floor(num / 100);
        var b = Math.floor(num / 10) % 10;
        var c = num % 10;
        bytes.push(48 + a, 48 + b, 48 + c);
        text += a.toString() + b.toString() + c.toString();
        length -= 3;
    }
    // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
    if (length === 2) {
        var num = stream.readBits(7);
        if (num >= 100) {
            throw new Error("Invalid numeric value above 99");
        }
        var a = Math.floor(num / 10);
        var b = num % 10;
        bytes.push(48 + a, 48 + b);
        text += a.toString() + b.toString();
    }
    else if (length === 1) {
        var num = stream.readBits(4);
        if (num >= 10) {
            throw new Error("Invalid numeric value above 9");
        }
        bytes.push(48 + num);
        text += num.toString();
    }
    return { bytes: bytes, text: text };
}
var AlphanumericCharacterCodes = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    " ", "$", "%", "*", "+", "-", ".", "/", ":",
];
function decodeAlphanumeric(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [9, 11, 13][size];
    var length = stream.readBits(characterCountSize);
    while (length >= 2) {
        var v = stream.readBits(11);
        var a = Math.floor(v / 45);
        var b = v % 45;
        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
        text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
        length -= 2;
    }
    if (length === 1) {
        var a = stream.readBits(6);
        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
        text += AlphanumericCharacterCodes[a];
    }
    return { bytes: bytes, text: text };
}
function decodeByte(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [8, 16, 16][size];
    var length = stream.readBits(characterCountSize);
    for (var i = 0; i < length; i++) {
        var b = stream.readBits(8);
        bytes.push(b);
    }
    try {
        text += decodeURIComponent(bytes.map(function (b) { return "%" + ("0" + b.toString(16)).substr(-2); }).join(""));
    }
    catch (_a) {
        // failed to decode
    }
    return { bytes: bytes, text: text };
}
function decodeKanji(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [8, 10, 12][size];
    var length = stream.readBits(characterCountSize);
    for (var i = 0; i < length; i++) {
        var k = stream.readBits(13);
        var c = (Math.floor(k / 0xC0) << 8) | (k % 0xC0);
        if (c < 0x1F00) {
            c += 0x8140;
        }
        else {
            c += 0xC140;
        }
        bytes.push(c >> 8, c & 0xFF);
        text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
    }
    return { bytes: bytes, text: text };
}
function decode(data, version) {
    var stream = new BitStream_1.BitStream(data);
    // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
    var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
    var result = {
        text: "",
        bytes: [],
        chunks: [],
    };
    while (stream.available() >= 4) {
        var mode = stream.readBits(4);
        if (mode === ModeByte.Terminator) {
            return result;
        }
        else if (mode === ModeByte.Numeric) {
            var numericResult = decodeNumeric(stream, size);
            result.text += numericResult.text;
            (_a = result.bytes).push.apply(_a, numericResult.bytes);
            result.chunks.push({
                type: Mode.Numeric,
                text: numericResult.text,
            });
        }
        else if (mode === ModeByte.Alphanumeric) {
            var alphanumericResult = decodeAlphanumeric(stream, size);
            result.text += alphanumericResult.text;
            (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
            result.chunks.push({
                type: Mode.Alphanumeric,
                text: alphanumericResult.text,
            });
        }
        else if (mode === ModeByte.Byte) {
            var byteResult = decodeByte(stream, size);
            result.text += byteResult.text;
            (_c = result.bytes).push.apply(_c, byteResult.bytes);
            result.chunks.push({
                type: Mode.Byte,
                bytes: byteResult.bytes,
                text: byteResult.text,
            });
        }
        else if (mode === ModeByte.Kanji) {
            var kanjiResult = decodeKanji(stream, size);
            result.text += kanjiResult.text;
            (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
            result.chunks.push({
                type: Mode.Kanji,
                bytes: kanjiResult.bytes,
                text: kanjiResult.text,
            });
        }
    }
    var _a, _b, _c, _d;
}
exports.decode = decode;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
var BitStream = /** @class */ (function () {
    function BitStream(bytes) {
        this.byteOffset = 0;
        this.bitOffset = 0;
        this.bytes = bytes;
    }
    BitStream.prototype.readBits = function (numBits) {
        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
            throw new Error("Cannot read " + numBits.toString() + " bits");
        }
        var result = 0;
        // First, read remainder from current byte
        if (this.bitOffset > 0) {
            var bitsLeft = 8 - this.bitOffset;
            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
            var bitsToNotRead = bitsLeft - toRead;
            var mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
            numBits -= toRead;
            this.bitOffset += toRead;
            if (this.bitOffset === 8) {
                this.bitOffset = 0;
                this.byteOffset++;
            }
        }
        // Next read whole bytes
        if (numBits > 0) {
            while (numBits >= 8) {
                result = (result << 8) | (this.bytes[this.byteOffset] & 0xFF);
                this.byteOffset++;
                numBits -= 8;
            }
            // Finally read a partial byte
            if (numBits > 0) {
                var bitsToNotRead = 8 - numBits;
                var mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
                result = (result << numBits) | ((this.bytes[this.byteOffset] & mask) >> bitsToNotRead);
                this.bitOffset += numBits;
            }
        }
        return result;
    };
    BitStream.prototype.available = function () {
        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
    };
    return BitStream;
}());
exports.BitStream = BitStream;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftJISTable = {
    0x20: 0x0020,
    0x21: 0x0021,
    0x22: 0x0022,
    0x23: 0x0023,
    0x24: 0x0024,
    0x25: 0x0025,
    0x26: 0x0026,
    0x27: 0x0027,
    0x28: 0x0028,
    0x29: 0x0029,
    0x2A: 0x002A,
    0x2B: 0x002B,
    0x2C: 0x002C,
    0x2D: 0x002D,
    0x2E: 0x002E,
    0x2F: 0x002F,
    0x30: 0x0030,
    0x31: 0x0031,
    0x32: 0x0032,
    0x33: 0x0033,
    0x34: 0x0034,
    0x35: 0x0035,
    0x36: 0x0036,
    0x37: 0x0037,
    0x38: 0x0038,
    0x39: 0x0039,
    0x3A: 0x003A,
    0x3B: 0x003B,
    0x3C: 0x003C,
    0x3D: 0x003D,
    0x3E: 0x003E,
    0x3F: 0x003F,
    0x40: 0x0040,
    0x41: 0x0041,
    0x42: 0x0042,
    0x43: 0x0043,
    0x44: 0x0044,
    0x45: 0x0045,
    0x46: 0x0046,
    0x47: 0x0047,
    0x48: 0x0048,
    0x49: 0x0049,
    0x4A: 0x004A,
    0x4B: 0x004B,
    0x4C: 0x004C,
    0x4D: 0x004D,
    0x4E: 0x004E,
    0x4F: 0x004F,
    0x50: 0x0050,
    0x51: 0x0051,
    0x52: 0x0052,
    0x53: 0x0053,
    0x54: 0x0054,
    0x55: 0x0055,
    0x56: 0x0056,
    0x57: 0x0057,
    0x58: 0x0058,
    0x59: 0x0059,
    0x5A: 0x005A,
    0x5B: 0x005B,
    0x5C: 0x00A5,
    0x5D: 0x005D,
    0x5E: 0x005E,
    0x5F: 0x005F,
    0x60: 0x0060,
    0x61: 0x0061,
    0x62: 0x0062,
    0x63: 0x0063,
    0x64: 0x0064,
    0x65: 0x0065,
    0x66: 0x0066,
    0x67: 0x0067,
    0x68: 0x0068,
    0x69: 0x0069,
    0x6A: 0x006A,
    0x6B: 0x006B,
    0x6C: 0x006C,
    0x6D: 0x006D,
    0x6E: 0x006E,
    0x6F: 0x006F,
    0x70: 0x0070,
    0x71: 0x0071,
    0x72: 0x0072,
    0x73: 0x0073,
    0x74: 0x0074,
    0x75: 0x0075,
    0x76: 0x0076,
    0x77: 0x0077,
    0x78: 0x0078,
    0x79: 0x0079,
    0x7A: 0x007A,
    0x7B: 0x007B,
    0x7C: 0x007C,
    0x7D: 0x007D,
    0x7E: 0x203E,
    0x8140: 0x3000,
    0x8141: 0x3001,
    0x8142: 0x3002,
    0x8143: 0xFF0C,
    0x8144: 0xFF0E,
    0x8145: 0x30FB,
    0x8146: 0xFF1A,
    0x8147: 0xFF1B,
    0x8148: 0xFF1F,
    0x8149: 0xFF01,
    0x814A: 0x309B,
    0x814B: 0x309C,
    0x814C: 0x00B4,
    0x814D: 0xFF40,
    0x814E: 0x00A8,
    0x814F: 0xFF3E,
    0x8150: 0xFFE3,
    0x8151: 0xFF3F,
    0x8152: 0x30FD,
    0x8153: 0x30FE,
    0x8154: 0x309D,
    0x8155: 0x309E,
    0x8156: 0x3003,
    0x8157: 0x4EDD,
    0x8158: 0x3005,
    0x8159: 0x3006,
    0x815A: 0x3007,
    0x815B: 0x30FC,
    0x815C: 0x2015,
    0x815D: 0x2010,
    0x815E: 0xFF0F,
    0x815F: 0x005C,
    0x8160: 0x301C,
    0x8161: 0x2016,
    0x8162: 0xFF5C,
    0x8163: 0x2026,
    0x8164: 0x2025,
    0x8165: 0x2018,
    0x8166: 0x2019,
    0x8167: 0x201C,
    0x8168: 0x201D,
    0x8169: 0xFF08,
    0x816A: 0xFF09,
    0x816B: 0x3014,
    0x816C: 0x3015,
    0x816D: 0xFF3B,
    0x816E: 0xFF3D,
    0x816F: 0xFF5B,
    0x8170: 0xFF5D,
    0x8171: 0x3008,
    0x8172: 0x3009,
    0x8173: 0x300A,
    0x8174: 0x300B,
    0x8175: 0x300C,
    0x8176: 0x300D,
    0x8177: 0x300E,
    0x8178: 0x300F,
    0x8179: 0x3010,
    0x817A: 0x3011,
    0x817B: 0xFF0B,
    0x817C: 0x2212,
    0x817D: 0x00B1,
    0x817E: 0x00D7,
    0x8180: 0x00F7,
    0x8181: 0xFF1D,
    0x8182: 0x2260,
    0x8183: 0xFF1C,
    0x8184: 0xFF1E,
    0x8185: 0x2266,
    0x8186: 0x2267,
    0x8187: 0x221E,
    0x8188: 0x2234,
    0x8189: 0x2642,
    0x818A: 0x2640,
    0x818B: 0x00B0,
    0x818C: 0x2032,
    0x818D: 0x2033,
    0x818E: 0x2103,
    0x818F: 0xFFE5,
    0x8190: 0xFF04,
    0x8191: 0x00A2,
    0x8192: 0x00A3,
    0x8193: 0xFF05,
    0x8194: 0xFF03,
    0x8195: 0xFF06,
    0x8196: 0xFF0A,
    0x8197: 0xFF20,
    0x8198: 0x00A7,
    0x8199: 0x2606,
    0x819A: 0x2605,
    0x819B: 0x25CB,
    0x819C: 0x25CF,
    0x819D: 0x25CE,
    0x819E: 0x25C7,
    0x819F: 0x25C6,
    0x81A0: 0x25A1,
    0x81A1: 0x25A0,
    0x81A2: 0x25B3,
    0x81A3: 0x25B2,
    0x81A4: 0x25BD,
    0x81A5: 0x25BC,
    0x81A6: 0x203B,
    0x81A7: 0x3012,
    0x81A8: 0x2192,
    0x81A9: 0x2190,
    0x81AA: 0x2191,
    0x81AB: 0x2193,
    0x81AC: 0x3013,
    0x81B8: 0x2208,
    0x81B9: 0x220B,
    0x81BA: 0x2286,
    0x81BB: 0x2287,
    0x81BC: 0x2282,
    0x81BD: 0x2283,
    0x81BE: 0x222A,
    0x81BF: 0x2229,
    0x81C8: 0x2227,
    0x81C9: 0x2228,
    0x81CA: 0x00AC,
    0x81CB: 0x21D2,
    0x81CC: 0x21D4,
    0x81CD: 0x2200,
    0x81CE: 0x2203,
    0x81DA: 0x2220,
    0x81DB: 0x22A5,
    0x81DC: 0x2312,
    0x81DD: 0x2202,
    0x81DE: 0x2207,
    0x81DF: 0x2261,
    0x81E0: 0x2252,
    0x81E1: 0x226A,
    0x81E2: 0x226B,
    0x81E3: 0x221A,
    0x81E4: 0x223D,
    0x81E5: 0x221D,
    0x81E6: 0x2235,
    0x81E7: 0x222B,
    0x81E8: 0x222C,
    0x81F0: 0x212B,
    0x81F1: 0x2030,
    0x81F2: 0x266F,
    0x81F3: 0x266D,
    0x81F4: 0x266A,
    0x81F5: 0x2020,
    0x81F6: 0x2021,
    0x81F7: 0x00B6,
    0x81FC: 0x25EF,
    0x824F: 0xFF10,
    0x8250: 0xFF11,
    0x8251: 0xFF12,
    0x8252: 0xFF13,
    0x8253: 0xFF14,
    0x8254: 0xFF15,
    0x8255: 0xFF16,
    0x8256: 0xFF17,
    0x8257: 0xFF18,
    0x8258: 0xFF19,
    0x8260: 0xFF21,
    0x8261: 0xFF22,
    0x8262: 0xFF23,
    0x8263: 0xFF24,
    0x8264: 0xFF25,
    0x8265: 0xFF26,
    0x8266: 0xFF27,
    0x8267: 0xFF28,
    0x8268: 0xFF29,
    0x8269: 0xFF2A,
    0x826A: 0xFF2B,
    0x826B: 0xFF2C,
    0x826C: 0xFF2D,
    0x826D: 0xFF2E,
    0x826E: 0xFF2F,
    0x826F: 0xFF30,
    0x8270: 0xFF31,
    0x8271: 0xFF32,
    0x8272: 0xFF33,
    0x8273: 0xFF34,
    0x8274: 0xFF35,
    0x8275: 0xFF36,
    0x8276: 0xFF37,
    0x8277: 0xFF38,
    0x8278: 0xFF39,
    0x8279: 0xFF3A,
    0x8281: 0xFF41,
    0x8282: 0xFF42,
    0x8283: 0xFF43,
    0x8284: 0xFF44,
    0x8285: 0xFF45,
    0x8286: 0xFF46,
    0x8287: 0xFF47,
    0x8288: 0xFF48,
    0x8289: 0xFF49,
    0x828A: 0xFF4A,
    0x828B: 0xFF4B,
    0x828C: 0xFF4C,
    0x828D: 0xFF4D,
    0x828E: 0xFF4E,
    0x828F: 0xFF4F,
    0x8290: 0xFF50,
    0x8291: 0xFF51,
    0x8292: 0xFF52,
    0x8293: 0xFF53,
    0x8294: 0xFF54,
    0x8295: 0xFF55,
    0x8296: 0xFF56,
    0x8297: 0xFF57,
    0x8298: 0xFF58,
    0x8299: 0xFF59,
    0x829A: 0xFF5A,
    0x829F: 0x3041,
    0x82A0: 0x3042,
    0x82A1: 0x3043,
    0x82A2: 0x3044,
    0x82A3: 0x3045,
    0x82A4: 0x3046,
    0x82A5: 0x3047,
    0x82A6: 0x3048,
    0x82A7: 0x3049,
    0x82A8: 0x304A,
    0x82A9: 0x304B,
    0x82AA: 0x304C,
    0x82AB: 0x304D,
    0x82AC: 0x304E,
    0x82AD: 0x304F,
    0x82AE: 0x3050,
    0x82AF: 0x3051,
    0x82B0: 0x3052,
    0x82B1: 0x3053,
    0x82B2: 0x3054,
    0x82B3: 0x3055,
    0x82B4: 0x3056,
    0x82B5: 0x3057,
    0x82B6: 0x3058,
    0x82B7: 0x3059,
    0x82B8: 0x305A,
    0x82B9: 0x305B,
    0x82BA: 0x305C,
    0x82BB: 0x305D,
    0x82BC: 0x305E,
    0x82BD: 0x305F,
    0x82BE: 0x3060,
    0x82BF: 0x3061,
    0x82C0: 0x3062,
    0x82C1: 0x3063,
    0x82C2: 0x3064,
    0x82C3: 0x3065,
    0x82C4: 0x3066,
    0x82C5: 0x3067,
    0x82C6: 0x3068,
    0x82C7: 0x3069,
    0x82C8: 0x306A,
    0x82C9: 0x306B,
    0x82CA: 0x306C,
    0x82CB: 0x306D,
    0x82CC: 0x306E,
    0x82CD: 0x306F,
    0x82CE: 0x3070,
    0x82CF: 0x3071,
    0x82D0: 0x3072,
    0x82D1: 0x3073,
    0x82D2: 0x3074,
    0x82D3: 0x3075,
    0x82D4: 0x3076,
    0x82D5: 0x3077,
    0x82D6: 0x3078,
    0x82D7: 0x3079,
    0x82D8: 0x307A,
    0x82D9: 0x307B,
    0x82DA: 0x307C,
    0x82DB: 0x307D,
    0x82DC: 0x307E,
    0x82DD: 0x307F,
    0x82DE: 0x3080,
    0x82DF: 0x3081,
    0x82E0: 0x3082,
    0x82E1: 0x3083,
    0x82E2: 0x3084,
    0x82E3: 0x3085,
    0x82E4: 0x3086,
    0x82E5: 0x3087,
    0x82E6: 0x3088,
    0x82E7: 0x3089,
    0x82E8: 0x308A,
    0x82E9: 0x308B,
    0x82EA: 0x308C,
    0x82EB: 0x308D,
    0x82EC: 0x308E,
    0x82ED: 0x308F,
    0x82EE: 0x3090,
    0x82EF: 0x3091,
    0x82F0: 0x3092,
    0x82F1: 0x3093,
    0x8340: 0x30A1,
    0x8341: 0x30A2,
    0x8342: 0x30A3,
    0x8343: 0x30A4,
    0x8344: 0x30A5,
    0x8345: 0x30A6,
    0x8346: 0x30A7,
    0x8347: 0x30A8,
    0x8348: 0x30A9,
    0x8349: 0x30AA,
    0x834A: 0x30AB,
    0x834B: 0x30AC,
    0x834C: 0x30AD,
    0x834D: 0x30AE,
    0x834E: 0x30AF,
    0x834F: 0x30B0,
    0x8350: 0x30B1,
    0x8351: 0x30B2,
    0x8352: 0x30B3,
    0x8353: 0x30B4,
    0x8354: 0x30B5,
    0x8355: 0x30B6,
    0x8356: 0x30B7,
    0x8357: 0x30B8,
    0x8358: 0x30B9,
    0x8359: 0x30BA,
    0x835A: 0x30BB,
    0x835B: 0x30BC,
    0x835C: 0x30BD,
    0x835D: 0x30BE,
    0x835E: 0x30BF,
    0x835F: 0x30C0,
    0x8360: 0x30C1,
    0x8361: 0x30C2,
    0x8362: 0x30C3,
    0x8363: 0x30C4,
    0x8364: 0x30C5,
    0x8365: 0x30C6,
    0x8366: 0x30C7,
    0x8367: 0x30C8,
    0x8368: 0x30C9,
    0x8369: 0x30CA,
    0x836A: 0x30CB,
    0x836B: 0x30CC,
    0x836C: 0x30CD,
    0x836D: 0x30CE,
    0x836E: 0x30CF,
    0x836F: 0x30D0,
    0x8370: 0x30D1,
    0x8371: 0x30D2,
    0x8372: 0x30D3,
    0x8373: 0x30D4,
    0x8374: 0x30D5,
    0x8375: 0x30D6,
    0x8376: 0x30D7,
    0x8377: 0x30D8,
    0x8378: 0x30D9,
    0x8379: 0x30DA,
    0x837A: 0x30DB,
    0x837B: 0x30DC,
    0x837C: 0x30DD,
    0x837D: 0x30DE,
    0x837E: 0x30DF,
    0x8380: 0x30E0,
    0x8381: 0x30E1,
    0x8382: 0x30E2,
    0x8383: 0x30E3,
    0x8384: 0x30E4,
    0x8385: 0x30E5,
    0x8386: 0x30E6,
    0x8387: 0x30E7,
    0x8388: 0x30E8,
    0x8389: 0x30E9,
    0x838A: 0x30EA,
    0x838B: 0x30EB,
    0x838C: 0x30EC,
    0x838D: 0x30ED,
    0x838E: 0x30EE,
    0x838F: 0x30EF,
    0x8390: 0x30F0,
    0x8391: 0x30F1,
    0x8392: 0x30F2,
    0x8393: 0x30F3,
    0x8394: 0x30F4,
    0x8395: 0x30F5,
    0x8396: 0x30F6,
    0x839F: 0x0391,
    0x83A0: 0x0392,
    0x83A1: 0x0393,
    0x83A2: 0x0394,
    0x83A3: 0x0395,
    0x83A4: 0x0396,
    0x83A5: 0x0397,
    0x83A6: 0x0398,
    0x83A7: 0x0399,
    0x83A8: 0x039A,
    0x83A9: 0x039B,
    0x83AA: 0x039C,
    0x83AB: 0x039D,
    0x83AC: 0x039E,
    0x83AD: 0x039F,
    0x83AE: 0x03A0,
    0x83AF: 0x03A1,
    0x83B0: 0x03A3,
    0x83B1: 0x03A4,
    0x83B2: 0x03A5,
    0x83B3: 0x03A6,
    0x83B4: 0x03A7,
    0x83B5: 0x03A8,
    0x83B6: 0x03A9,
    0x83BF: 0x03B1,
    0x83C0: 0x03B2,
    0x83C1: 0x03B3,
    0x83C2: 0x03B4,
    0x83C3: 0x03B5,
    0x83C4: 0x03B6,
    0x83C5: 0x03B7,
    0x83C6: 0x03B8,
    0x83C7: 0x03B9,
    0x83C8: 0x03BA,
    0x83C9: 0x03BB,
    0x83CA: 0x03BC,
    0x83CB: 0x03BD,
    0x83CC: 0x03BE,
    0x83CD: 0x03BF,
    0x83CE: 0x03C0,
    0x83CF: 0x03C1,
    0x83D0: 0x03C3,
    0x83D1: 0x03C4,
    0x83D2: 0x03C5,
    0x83D3: 0x03C6,
    0x83D4: 0x03C7,
    0x83D5: 0x03C8,
    0x83D6: 0x03C9,
    0x8440: 0x0410,
    0x8441: 0x0411,
    0x8442: 0x0412,
    0x8443: 0x0413,
    0x8444: 0x0414,
    0x8445: 0x0415,
    0x8446: 0x0401,
    0x8447: 0x0416,
    0x8448: 0x0417,
    0x8449: 0x0418,
    0x844A: 0x0419,
    0x844B: 0x041A,
    0x844C: 0x041B,
    0x844D: 0x041C,
    0x844E: 0x041D,
    0x844F: 0x041E,
    0x8450: 0x041F,
    0x8451: 0x0420,
    0x8452: 0x0421,
    0x8453: 0x0422,
    0x8454: 0x0423,
    0x8455: 0x0424,
    0x8456: 0x0425,
    0x8457: 0x0426,
    0x8458: 0x0427,
    0x8459: 0x0428,
    0x845A: 0x0429,
    0x845B: 0x042A,
    0x845C: 0x042B,
    0x845D: 0x042C,
    0x845E: 0x042D,
    0x845F: 0x042E,
    0x8460: 0x042F,
    0x8470: 0x0430,
    0x8471: 0x0431,
    0x8472: 0x0432,
    0x8473: 0x0433,
    0x8474: 0x0434,
    0x8475: 0x0435,
    0x8476: 0x0451,
    0x8477: 0x0436,
    0x8478: 0x0437,
    0x8479: 0x0438,
    0x847A: 0x0439,
    0x847B: 0x043A,
    0x847C: 0x043B,
    0x847D: 0x043C,
    0x847E: 0x043D,
    0x8480: 0x043E,
    0x8481: 0x043F,
    0x8482: 0x0440,
    0x8483: 0x0441,
    0x8484: 0x0442,
    0x8485: 0x0443,
    0x8486: 0x0444,
    0x8487: 0x0445,
    0x8488: 0x0446,
    0x8489: 0x0447,
    0x848A: 0x0448,
    0x848B: 0x0449,
    0x848C: 0x044A,
    0x848D: 0x044B,
    0x848E: 0x044C,
    0x848F: 0x044D,
    0x8490: 0x044E,
    0x8491: 0x044F,
    0x849F: 0x2500,
    0x84A0: 0x2502,
    0x84A1: 0x250C,
    0x84A2: 0x2510,
    0x84A3: 0x2518,
    0x84A4: 0x2514,
    0x84A5: 0x251C,
    0x84A6: 0x252C,
    0x84A7: 0x2524,
    0x84A8: 0x2534,
    0x84A9: 0x253C,
    0x84AA: 0x2501,
    0x84AB: 0x2503,
    0x84AC: 0x250F,
    0x84AD: 0x2513,
    0x84AE: 0x251B,
    0x84AF: 0x2517,
    0x84B0: 0x2523,
    0x84B1: 0x2533,
    0x84B2: 0x252B,
    0x84B3: 0x253B,
    0x84B4: 0x254B,
    0x84B5: 0x2520,
    0x84B6: 0x252F,
    0x84B7: 0x2528,
    0x84B8: 0x2537,
    0x84B9: 0x253F,
    0x84BA: 0x251D,
    0x84BB: 0x2530,
    0x84BC: 0x2525,
    0x84BD: 0x2538,
    0x84BE: 0x2542,
    0x889F: 0x4E9C,
    0x88A0: 0x5516,
    0x88A1: 0x5A03,
    0x88A2: 0x963F,
    0x88A3: 0x54C0,
    0x88A4: 0x611B,
    0x88A5: 0x6328,
    0x88A6: 0x59F6,
    0x88A7: 0x9022,
    0x88A8: 0x8475,
    0x88A9: 0x831C,
    0x88AA: 0x7A50,
    0x88AB: 0x60AA,
    0x88AC: 0x63E1,
    0x88AD: 0x6E25,
    0x88AE: 0x65ED,
    0x88AF: 0x8466,
    0x88B0: 0x82A6,
    0x88B1: 0x9BF5,
    0x88B2: 0x6893,
    0x88B3: 0x5727,
    0x88B4: 0x65A1,
    0x88B5: 0x6271,
    0x88B6: 0x5B9B,
    0x88B7: 0x59D0,
    0x88B8: 0x867B,
    0x88B9: 0x98F4,
    0x88BA: 0x7D62,
    0x88BB: 0x7DBE,
    0x88BC: 0x9B8E,
    0x88BD: 0x6216,
    0x88BE: 0x7C9F,
    0x88BF: 0x88B7,
    0x88C0: 0x5B89,
    0x88C1: 0x5EB5,
    0x88C2: 0x6309,
    0x88C3: 0x6697,
    0x88C4: 0x6848,
    0x88C5: 0x95C7,
    0x88C6: 0x978D,
    0x88C7: 0x674F,
    0x88C8: 0x4EE5,
    0x88C9: 0x4F0A,
    0x88CA: 0x4F4D,
    0x88CB: 0x4F9D,
    0x88CC: 0x5049,
    0x88CD: 0x56F2,
    0x88CE: 0x5937,
    0x88CF: 0x59D4,
    0x88D0: 0x5A01,
    0x88D1: 0x5C09,
    0x88D2: 0x60DF,
    0x88D3: 0x610F,
    0x88D4: 0x6170,
    0x88D5: 0x6613,
    0x88D6: 0x6905,
    0x88D7: 0x70BA,
    0x88D8: 0x754F,
    0x88D9: 0x7570,
    0x88DA: 0x79FB,
    0x88DB: 0x7DAD,
    0x88DC: 0x7DEF,
    0x88DD: 0x80C3,
    0x88DE: 0x840E,
    0x88DF: 0x8863,
    0x88E0: 0x8B02,
    0x88E1: 0x9055,
    0x88E2: 0x907A,
    0x88E3: 0x533B,
    0x88E4: 0x4E95,
    0x88E5: 0x4EA5,
    0x88E6: 0x57DF,
    0x88E7: 0x80B2,
    0x88E8: 0x90C1,
    0x88E9: 0x78EF,
    0x88EA: 0x4E00,
    0x88EB: 0x58F1,
    0x88EC: 0x6EA2,
    0x88ED: 0x9038,
    0x88EE: 0x7A32,
    0x88EF: 0x8328,
    0x88F0: 0x828B,
    0x88F1: 0x9C2F,
    0x88F2: 0x5141,
    0x88F3: 0x5370,
    0x88F4: 0x54BD,
    0x88F5: 0x54E1,
    0x88F6: 0x56E0,
    0x88F7: 0x59FB,
    0x88F8: 0x5F15,
    0x88F9: 0x98F2,
    0x88FA: 0x6DEB,
    0x88FB: 0x80E4,
    0x88FC: 0x852D,
    0x8940: 0x9662,
    0x8941: 0x9670,
    0x8942: 0x96A0,
    0x8943: 0x97FB,
    0x8944: 0x540B,
    0x8945: 0x53F3,
    0x8946: 0x5B87,
    0x8947: 0x70CF,
    0x8948: 0x7FBD,
    0x8949: 0x8FC2,
    0x894A: 0x96E8,
    0x894B: 0x536F,
    0x894C: 0x9D5C,
    0x894D: 0x7ABA,
    0x894E: 0x4E11,
    0x894F: 0x7893,
    0x8950: 0x81FC,
    0x8951: 0x6E26,
    0x8952: 0x5618,
    0x8953: 0x5504,
    0x8954: 0x6B1D,
    0x8955: 0x851A,
    0x8956: 0x9C3B,
    0x8957: 0x59E5,
    0x8958: 0x53A9,
    0x8959: 0x6D66,
    0x895A: 0x74DC,
    0x895B: 0x958F,
    0x895C: 0x5642,
    0x895D: 0x4E91,
    0x895E: 0x904B,
    0x895F: 0x96F2,
    0x8960: 0x834F,
    0x8961: 0x990C,
    0x8962: 0x53E1,
    0x8963: 0x55B6,
    0x8964: 0x5B30,
    0x8965: 0x5F71,
    0x8966: 0x6620,
    0x8967: 0x66F3,
    0x8968: 0x6804,
    0x8969: 0x6C38,
    0x896A: 0x6CF3,
    0x896B: 0x6D29,
    0x896C: 0x745B,
    0x896D: 0x76C8,
    0x896E: 0x7A4E,
    0x896F: 0x9834,
    0x8970: 0x82F1,
    0x8971: 0x885B,
    0x8972: 0x8A60,
    0x8973: 0x92ED,
    0x8974: 0x6DB2,
    0x8975: 0x75AB,
    0x8976: 0x76CA,
    0x8977: 0x99C5,
    0x8978: 0x60A6,
    0x8979: 0x8B01,
    0x897A: 0x8D8A,
    0x897B: 0x95B2,
    0x897C: 0x698E,
    0x897D: 0x53AD,
    0x897E: 0x5186,
    0x8980: 0x5712,
    0x8981: 0x5830,
    0x8982: 0x5944,
    0x8983: 0x5BB4,
    0x8984: 0x5EF6,
    0x8985: 0x6028,
    0x8986: 0x63A9,
    0x8987: 0x63F4,
    0x8988: 0x6CBF,
    0x8989: 0x6F14,
    0x898A: 0x708E,
    0x898B: 0x7114,
    0x898C: 0x7159,
    0x898D: 0x71D5,
    0x898E: 0x733F,
    0x898F: 0x7E01,
    0x8990: 0x8276,
    0x8991: 0x82D1,
    0x8992: 0x8597,
    0x8993: 0x9060,
    0x8994: 0x925B,
    0x8995: 0x9D1B,
    0x8996: 0x5869,
    0x8997: 0x65BC,
    0x8998: 0x6C5A,
    0x8999: 0x7525,
    0x899A: 0x51F9,
    0x899B: 0x592E,
    0x899C: 0x5965,
    0x899D: 0x5F80,
    0x899E: 0x5FDC,
    0x899F: 0x62BC,
    0x89A0: 0x65FA,
    0x89A1: 0x6A2A,
    0x89A2: 0x6B27,
    0x89A3: 0x6BB4,
    0x89A4: 0x738B,
    0x89A5: 0x7FC1,
    0x89A6: 0x8956,
    0x89A7: 0x9D2C,
    0x89A8: 0x9D0E,
    0x89A9: 0x9EC4,
    0x89AA: 0x5CA1,
    0x89AB: 0x6C96,
    0x89AC: 0x837B,
    0x89AD: 0x5104,
    0x89AE: 0x5C4B,
    0x89AF: 0x61B6,
    0x89B0: 0x81C6,
    0x89B1: 0x6876,
    0x89B2: 0x7261,
    0x89B3: 0x4E59,
    0x89B4: 0x4FFA,
    0x89B5: 0x5378,
    0x89B6: 0x6069,
    0x89B7: 0x6E29,
    0x89B8: 0x7A4F,
    0x89B9: 0x97F3,
    0x89BA: 0x4E0B,
    0x89BB: 0x5316,
    0x89BC: 0x4EEE,
    0x89BD: 0x4F55,
    0x89BE: 0x4F3D,
    0x89BF: 0x4FA1,
    0x89C0: 0x4F73,
    0x89C1: 0x52A0,
    0x89C2: 0x53EF,
    0x89C3: 0x5609,
    0x89C4: 0x590F,
    0x89C5: 0x5AC1,
    0x89C6: 0x5BB6,
    0x89C7: 0x5BE1,
    0x89C8: 0x79D1,
    0x89C9: 0x6687,
    0x89CA: 0x679C,
    0x89CB: 0x67B6,
    0x89CC: 0x6B4C,
    0x89CD: 0x6CB3,
    0x89CE: 0x706B,
    0x89CF: 0x73C2,
    0x89D0: 0x798D,
    0x89D1: 0x79BE,
    0x89D2: 0x7A3C,
    0x89D3: 0x7B87,
    0x89D4: 0x82B1,
    0x89D5: 0x82DB,
    0x89D6: 0x8304,
    0x89D7: 0x8377,
    0x89D8: 0x83EF,
    0x89D9: 0x83D3,
    0x89DA: 0x8766,
    0x89DB: 0x8AB2,
    0x89DC: 0x5629,
    0x89DD: 0x8CA8,
    0x89DE: 0x8FE6,
    0x89DF: 0x904E,
    0x89E0: 0x971E,
    0x89E1: 0x868A,
    0x89E2: 0x4FC4,
    0x89E3: 0x5CE8,
    0x89E4: 0x6211,
    0x89E5: 0x7259,
    0x89E6: 0x753B,
    0x89E7: 0x81E5,
    0x89E8: 0x82BD,
    0x89E9: 0x86FE,
    0x89EA: 0x8CC0,
    0x89EB: 0x96C5,
    0x89EC: 0x9913,
    0x89ED: 0x99D5,
    0x89EE: 0x4ECB,
    0x89EF: 0x4F1A,
    0x89F0: 0x89E3,
    0x89F1: 0x56DE,
    0x89F2: 0x584A,
    0x89F3: 0x58CA,
    0x89F4: 0x5EFB,
    0x89F5: 0x5FEB,
    0x89F6: 0x602A,
    0x89F7: 0x6094,
    0x89F8: 0x6062,
    0x89F9: 0x61D0,
    0x89FA: 0x6212,
    0x89FB: 0x62D0,
    0x89FC: 0x6539,
    0x8A40: 0x9B41,
    0x8A41: 0x6666,
    0x8A42: 0x68B0,
    0x8A43: 0x6D77,
    0x8A44: 0x7070,
    0x8A45: 0x754C,
    0x8A46: 0x7686,
    0x8A47: 0x7D75,
    0x8A48: 0x82A5,
    0x8A49: 0x87F9,
    0x8A4A: 0x958B,
    0x8A4B: 0x968E,
    0x8A4C: 0x8C9D,
    0x8A4D: 0x51F1,
    0x8A4E: 0x52BE,
    0x8A4F: 0x5916,
    0x8A50: 0x54B3,
    0x8A51: 0x5BB3,
    0x8A52: 0x5D16,
    0x8A53: 0x6168,
    0x8A54: 0x6982,
    0x8A55: 0x6DAF,
    0x8A56: 0x788D,
    0x8A57: 0x84CB,
    0x8A58: 0x8857,
    0x8A59: 0x8A72,
    0x8A5A: 0x93A7,
    0x8A5B: 0x9AB8,
    0x8A5C: 0x6D6C,
    0x8A5D: 0x99A8,
    0x8A5E: 0x86D9,
    0x8A5F: 0x57A3,
    0x8A60: 0x67FF,
    0x8A61: 0x86CE,
    0x8A62: 0x920E,
    0x8A63: 0x5283,
    0x8A64: 0x5687,
    0x8A65: 0x5404,
    0x8A66: 0x5ED3,
    0x8A67: 0x62E1,
    0x8A68: 0x64B9,
    0x8A69: 0x683C,
    0x8A6A: 0x6838,
    0x8A6B: 0x6BBB,
    0x8A6C: 0x7372,
    0x8A6D: 0x78BA,
    0x8A6E: 0x7A6B,
    0x8A6F: 0x899A,
    0x8A70: 0x89D2,
    0x8A71: 0x8D6B,
    0x8A72: 0x8F03,
    0x8A73: 0x90ED,
    0x8A74: 0x95A3,
    0x8A75: 0x9694,
    0x8A76: 0x9769,
    0x8A77: 0x5B66,
    0x8A78: 0x5CB3,
    0x8A79: 0x697D,
    0x8A7A: 0x984D,
    0x8A7B: 0x984E,
    0x8A7C: 0x639B,
    0x8A7D: 0x7B20,
    0x8A7E: 0x6A2B,
    0x8A80: 0x6A7F,
    0x8A81: 0x68B6,
    0x8A82: 0x9C0D,
    0x8A83: 0x6F5F,
    0x8A84: 0x5272,
    0x8A85: 0x559D,
    0x8A86: 0x6070,
    0x8A87: 0x62EC,
    0x8A88: 0x6D3B,
    0x8A89: 0x6E07,
    0x8A8A: 0x6ED1,
    0x8A8B: 0x845B,
    0x8A8C: 0x8910,
    0x8A8D: 0x8F44,
    0x8A8E: 0x4E14,
    0x8A8F: 0x9C39,
    0x8A90: 0x53F6,
    0x8A91: 0x691B,
    0x8A92: 0x6A3A,
    0x8A93: 0x9784,
    0x8A94: 0x682A,
    0x8A95: 0x515C,
    0x8A96: 0x7AC3,
    0x8A97: 0x84B2,
    0x8A98: 0x91DC,
    0x8A99: 0x938C,
    0x8A9A: 0x565B,
    0x8A9B: 0x9D28,
    0x8A9C: 0x6822,
    0x8A9D: 0x8305,
    0x8A9E: 0x8431,
    0x8A9F: 0x7CA5,
    0x8AA0: 0x5208,
    0x8AA1: 0x82C5,
    0x8AA2: 0x74E6,
    0x8AA3: 0x4E7E,
    0x8AA4: 0x4F83,
    0x8AA5: 0x51A0,
    0x8AA6: 0x5BD2,
    0x8AA7: 0x520A,
    0x8AA8: 0x52D8,
    0x8AA9: 0x52E7,
    0x8AAA: 0x5DFB,
    0x8AAB: 0x559A,
    0x8AAC: 0x582A,
    0x8AAD: 0x59E6,
    0x8AAE: 0x5B8C,
    0x8AAF: 0x5B98,
    0x8AB0: 0x5BDB,
    0x8AB1: 0x5E72,
    0x8AB2: 0x5E79,
    0x8AB3: 0x60A3,
    0x8AB4: 0x611F,
    0x8AB5: 0x6163,
    0x8AB6: 0x61BE,
    0x8AB7: 0x63DB,
    0x8AB8: 0x6562,
    0x8AB9: 0x67D1,
    0x8ABA: 0x6853,
    0x8ABB: 0x68FA,
    0x8ABC: 0x6B3E,
    0x8ABD: 0x6B53,
    0x8ABE: 0x6C57,
    0x8ABF: 0x6F22,
    0x8AC0: 0x6F97,
    0x8AC1: 0x6F45,
    0x8AC2: 0x74B0,
    0x8AC3: 0x7518,
    0x8AC4: 0x76E3,
    0x8AC5: 0x770B,
    0x8AC6: 0x7AFF,
    0x8AC7: 0x7BA1,
    0x8AC8: 0x7C21,
    0x8AC9: 0x7DE9,
    0x8ACA: 0x7F36,
    0x8ACB: 0x7FF0,
    0x8ACC: 0x809D,
    0x8ACD: 0x8266,
    0x8ACE: 0x839E,
    0x8ACF: 0x89B3,
    0x8AD0: 0x8ACC,
    0x8AD1: 0x8CAB,
    0x8AD2: 0x9084,
    0x8AD3: 0x9451,
    0x8AD4: 0x9593,
    0x8AD5: 0x9591,
    0x8AD6: 0x95A2,
    0x8AD7: 0x9665,
    0x8AD8: 0x97D3,
    0x8AD9: 0x9928,
    0x8ADA: 0x8218,
    0x8ADB: 0x4E38,
    0x8ADC: 0x542B,
    0x8ADD: 0x5CB8,
    0x8ADE: 0x5DCC,
    0x8ADF: 0x73A9,
    0x8AE0: 0x764C,
    0x8AE1: 0x773C,
    0x8AE2: 0x5CA9,
    0x8AE3: 0x7FEB,
    0x8AE4: 0x8D0B,
    0x8AE5: 0x96C1,
    0x8AE6: 0x9811,
    0x8AE7: 0x9854,
    0x8AE8: 0x9858,
    0x8AE9: 0x4F01,
    0x8AEA: 0x4F0E,
    0x8AEB: 0x5371,
    0x8AEC: 0x559C,
    0x8AED: 0x5668,
    0x8AEE: 0x57FA,
    0x8AEF: 0x5947,
    0x8AF0: 0x5B09,
    0x8AF1: 0x5BC4,
    0x8AF2: 0x5C90,
    0x8AF3: 0x5E0C,
    0x8AF4: 0x5E7E,
    0x8AF5: 0x5FCC,
    0x8AF6: 0x63EE,
    0x8AF7: 0x673A,
    0x8AF8: 0x65D7,
    0x8AF9: 0x65E2,
    0x8AFA: 0x671F,
    0x8AFB: 0x68CB,
    0x8AFC: 0x68C4,
    0x8B40: 0x6A5F,
    0x8B41: 0x5E30,
    0x8B42: 0x6BC5,
    0x8B43: 0x6C17,
    0x8B44: 0x6C7D,
    0x8B45: 0x757F,
    0x8B46: 0x7948,
    0x8B47: 0x5B63,
    0x8B48: 0x7A00,
    0x8B49: 0x7D00,
    0x8B4A: 0x5FBD,
    0x8B4B: 0x898F,
    0x8B4C: 0x8A18,
    0x8B4D: 0x8CB4,
    0x8B4E: 0x8D77,
    0x8B4F: 0x8ECC,
    0x8B50: 0x8F1D,
    0x8B51: 0x98E2,
    0x8B52: 0x9A0E,
    0x8B53: 0x9B3C,
    0x8B54: 0x4E80,
    0x8B55: 0x507D,
    0x8B56: 0x5100,
    0x8B57: 0x5993,
    0x8B58: 0x5B9C,
    0x8B59: 0x622F,
    0x8B5A: 0x6280,
    0x8B5B: 0x64EC,
    0x8B5C: 0x6B3A,
    0x8B5D: 0x72A0,
    0x8B5E: 0x7591,
    0x8B5F: 0x7947,
    0x8B60: 0x7FA9,
    0x8B61: 0x87FB,
    0x8B62: 0x8ABC,
    0x8B63: 0x8B70,
    0x8B64: 0x63AC,
    0x8B65: 0x83CA,
    0x8B66: 0x97A0,
    0x8B67: 0x5409,
    0x8B68: 0x5403,
    0x8B69: 0x55AB,
    0x8B6A: 0x6854,
    0x8B6B: 0x6A58,
    0x8B6C: 0x8A70,
    0x8B6D: 0x7827,
    0x8B6E: 0x6775,
    0x8B6F: 0x9ECD,
    0x8B70: 0x5374,
    0x8B71: 0x5BA2,
    0x8B72: 0x811A,
    0x8B73: 0x8650,
    0x8B74: 0x9006,
    0x8B75: 0x4E18,
    0x8B76: 0x4E45,
    0x8B77: 0x4EC7,
    0x8B78: 0x4F11,
    0x8B79: 0x53CA,
    0x8B7A: 0x5438,
    0x8B7B: 0x5BAE,
    0x8B7C: 0x5F13,
    0x8B7D: 0x6025,
    0x8B7E: 0x6551,
    0x8B80: 0x673D,
    0x8B81: 0x6C42,
    0x8B82: 0x6C72,
    0x8B83: 0x6CE3,
    0x8B84: 0x7078,
    0x8B85: 0x7403,
    0x8B86: 0x7A76,
    0x8B87: 0x7AAE,
    0x8B88: 0x7B08,
    0x8B89: 0x7D1A,
    0x8B8A: 0x7CFE,
    0x8B8B: 0x7D66,
    0x8B8C: 0x65E7,
    0x8B8D: 0x725B,
    0x8B8E: 0x53BB,
    0x8B8F: 0x5C45,
    0x8B90: 0x5DE8,
    0x8B91: 0x62D2,
    0x8B92: 0x62E0,
    0x8B93: 0x6319,
    0x8B94: 0x6E20,
    0x8B95: 0x865A,
    0x8B96: 0x8A31,
    0x8B97: 0x8DDD,
    0x8B98: 0x92F8,
    0x8B99: 0x6F01,
    0x8B9A: 0x79A6,
    0x8B9B: 0x9B5A,
    0x8B9C: 0x4EA8,
    0x8B9D: 0x4EAB,
    0x8B9E: 0x4EAC,
    0x8B9F: 0x4F9B,
    0x8BA0: 0x4FA0,
    0x8BA1: 0x50D1,
    0x8BA2: 0x5147,
    0x8BA3: 0x7AF6,
    0x8BA4: 0x5171,
    0x8BA5: 0x51F6,
    0x8BA6: 0x5354,
    0x8BA7: 0x5321,
    0x8BA8: 0x537F,
    0x8BA9: 0x53EB,
    0x8BAA: 0x55AC,
    0x8BAB: 0x5883,
    0x8BAC: 0x5CE1,
    0x8BAD: 0x5F37,
    0x8BAE: 0x5F4A,
    0x8BAF: 0x602F,
    0x8BB0: 0x6050,
    0x8BB1: 0x606D,
    0x8BB2: 0x631F,
    0x8BB3: 0x6559,
    0x8BB4: 0x6A4B,
    0x8BB5: 0x6CC1,
    0x8BB6: 0x72C2,
    0x8BB7: 0x72ED,
    0x8BB8: 0x77EF,
    0x8BB9: 0x80F8,
    0x8BBA: 0x8105,
    0x8BBB: 0x8208,
    0x8BBC: 0x854E,
    0x8BBD: 0x90F7,
    0x8BBE: 0x93E1,
    0x8BBF: 0x97FF,
    0x8BC0: 0x9957,
    0x8BC1: 0x9A5A,
    0x8BC2: 0x4EF0,
    0x8BC3: 0x51DD,
    0x8BC4: 0x5C2D,
    0x8BC5: 0x6681,
    0x8BC6: 0x696D,
    0x8BC7: 0x5C40,
    0x8BC8: 0x66F2,
    0x8BC9: 0x6975,
    0x8BCA: 0x7389,
    0x8BCB: 0x6850,
    0x8BCC: 0x7C81,
    0x8BCD: 0x50C5,
    0x8BCE: 0x52E4,
    0x8BCF: 0x5747,
    0x8BD0: 0x5DFE,
    0x8BD1: 0x9326,
    0x8BD2: 0x65A4,
    0x8BD3: 0x6B23,
    0x8BD4: 0x6B3D,
    0x8BD5: 0x7434,
    0x8BD6: 0x7981,
    0x8BD7: 0x79BD,
    0x8BD8: 0x7B4B,
    0x8BD9: 0x7DCA,
    0x8BDA: 0x82B9,
    0x8BDB: 0x83CC,
    0x8BDC: 0x887F,
    0x8BDD: 0x895F,
    0x8BDE: 0x8B39,
    0x8BDF: 0x8FD1,
    0x8BE0: 0x91D1,
    0x8BE1: 0x541F,
    0x8BE2: 0x9280,
    0x8BE3: 0x4E5D,
    0x8BE4: 0x5036,
    0x8BE5: 0x53E5,
    0x8BE6: 0x533A,
    0x8BE7: 0x72D7,
    0x8BE8: 0x7396,
    0x8BE9: 0x77E9,
    0x8BEA: 0x82E6,
    0x8BEB: 0x8EAF,
    0x8BEC: 0x99C6,
    0x8BED: 0x99C8,
    0x8BEE: 0x99D2,
    0x8BEF: 0x5177,
    0x8BF0: 0x611A,
    0x8BF1: 0x865E,
    0x8BF2: 0x55B0,
    0x8BF3: 0x7A7A,
    0x8BF4: 0x5076,
    0x8BF5: 0x5BD3,
    0x8BF6: 0x9047,
    0x8BF7: 0x9685,
    0x8BF8: 0x4E32,
    0x8BF9: 0x6ADB,
    0x8BFA: 0x91E7,
    0x8BFB: 0x5C51,
    0x8BFC: 0x5C48,
    0x8C40: 0x6398,
    0x8C41: 0x7A9F,
    0x8C42: 0x6C93,
    0x8C43: 0x9774,
    0x8C44: 0x8F61,
    0x8C45: 0x7AAA,
    0x8C46: 0x718A,
    0x8C47: 0x9688,
    0x8C48: 0x7C82,
    0x8C49: 0x6817,
    0x8C4A: 0x7E70,
    0x8C4B: 0x6851,
    0x8C4C: 0x936C,
    0x8C4D: 0x52F2,
    0x8C4E: 0x541B,
    0x8C4F: 0x85AB,
    0x8C50: 0x8A13,
    0x8C51: 0x7FA4,
    0x8C52: 0x8ECD,
    0x8C53: 0x90E1,
    0x8C54: 0x5366,
    0x8C55: 0x8888,
    0x8C56: 0x7941,
    0x8C57: 0x4FC2,
    0x8C58: 0x50BE,
    0x8C59: 0x5211,
    0x8C5A: 0x5144,
    0x8C5B: 0x5553,
    0x8C5C: 0x572D,
    0x8C5D: 0x73EA,
    0x8C5E: 0x578B,
    0x8C5F: 0x5951,
    0x8C60: 0x5F62,
    0x8C61: 0x5F84,
    0x8C62: 0x6075,
    0x8C63: 0x6176,
    0x8C64: 0x6167,
    0x8C65: 0x61A9,
    0x8C66: 0x63B2,
    0x8C67: 0x643A,
    0x8C68: 0x656C,
    0x8C69: 0x666F,
    0x8C6A: 0x6842,
    0x8C6B: 0x6E13,
    0x8C6C: 0x7566,
    0x8C6D: 0x7A3D,
    0x8C6E: 0x7CFB,
    0x8C6F: 0x7D4C,
    0x8C70: 0x7D99,
    0x8C71: 0x7E4B,
    0x8C72: 0x7F6B,
    0x8C73: 0x830E,
    0x8C74: 0x834A,
    0x8C75: 0x86CD,
    0x8C76: 0x8A08,
    0x8C77: 0x8A63,
    0x8C78: 0x8B66,
    0x8C79: 0x8EFD,
    0x8C7A: 0x981A,
    0x8C7B: 0x9D8F,
    0x8C7C: 0x82B8,
    0x8C7D: 0x8FCE,
    0x8C7E: 0x9BE8,
    0x8C80: 0x5287,
    0x8C81: 0x621F,
    0x8C82: 0x6483,
    0x8C83: 0x6FC0,
    0x8C84: 0x9699,
    0x8C85: 0x6841,
    0x8C86: 0x5091,
    0x8C87: 0x6B20,
    0x8C88: 0x6C7A,
    0x8C89: 0x6F54,
    0x8C8A: 0x7A74,
    0x8C8B: 0x7D50,
    0x8C8C: 0x8840,
    0x8C8D: 0x8A23,
    0x8C8E: 0x6708,
    0x8C8F: 0x4EF6,
    0x8C90: 0x5039,
    0x8C91: 0x5026,
    0x8C92: 0x5065,
    0x8C93: 0x517C,
    0x8C94: 0x5238,
    0x8C95: 0x5263,
    0x8C96: 0x55A7,
    0x8C97: 0x570F,
    0x8C98: 0x5805,
    0x8C99: 0x5ACC,
    0x8C9A: 0x5EFA,
    0x8C9B: 0x61B2,
    0x8C9C: 0x61F8,
    0x8C9D: 0x62F3,
    0x8C9E: 0x6372,
    0x8C9F: 0x691C,
    0x8CA0: 0x6A29,
    0x8CA1: 0x727D,
    0x8CA2: 0x72AC,
    0x8CA3: 0x732E,
    0x8CA4: 0x7814,
    0x8CA5: 0x786F,
    0x8CA6: 0x7D79,
    0x8CA7: 0x770C,
    0x8CA8: 0x80A9,
    0x8CA9: 0x898B,
    0x8CAA: 0x8B19,
    0x8CAB: 0x8CE2,
    0x8CAC: 0x8ED2,
    0x8CAD: 0x9063,
    0x8CAE: 0x9375,
    0x8CAF: 0x967A,
    0x8CB0: 0x9855,
    0x8CB1: 0x9A13,
    0x8CB2: 0x9E78,
    0x8CB3: 0x5143,
    0x8CB4: 0x539F,
    0x8CB5: 0x53B3,
    0x8CB6: 0x5E7B,
    0x8CB7: 0x5F26,
    0x8CB8: 0x6E1B,
    0x8CB9: 0x6E90,
    0x8CBA: 0x7384,
    0x8CBB: 0x73FE,
    0x8CBC: 0x7D43,
    0x8CBD: 0x8237,
    0x8CBE: 0x8A00,
    0x8CBF: 0x8AFA,
    0x8CC0: 0x9650,
    0x8CC1: 0x4E4E,
    0x8CC2: 0x500B,
    0x8CC3: 0x53E4,
    0x8CC4: 0x547C,
    0x8CC5: 0x56FA,
    0x8CC6: 0x59D1,
    0x8CC7: 0x5B64,
    0x8CC8: 0x5DF1,
    0x8CC9: 0x5EAB,
    0x8CCA: 0x5F27,
    0x8CCB: 0x6238,
    0x8CCC: 0x6545,
    0x8CCD: 0x67AF,
    0x8CCE: 0x6E56,
    0x8CCF: 0x72D0,
    0x8CD0: 0x7CCA,
    0x8CD1: 0x88B4,
    0x8CD2: 0x80A1,
    0x8CD3: 0x80E1,
    0x8CD4: 0x83F0,
    0x8CD5: 0x864E,
    0x8CD6: 0x8A87,
    0x8CD7: 0x8DE8,
    0x8CD8: 0x9237,
    0x8CD9: 0x96C7,
    0x8CDA: 0x9867,
    0x8CDB: 0x9F13,
    0x8CDC: 0x4E94,
    0x8CDD: 0x4E92,
    0x8CDE: 0x4F0D,
    0x8CDF: 0x5348,
    0x8CE0: 0x5449,
    0x8CE1: 0x543E,
    0x8CE2: 0x5A2F,
    0x8CE3: 0x5F8C,
    0x8CE4: 0x5FA1,
    0x8CE5: 0x609F,
    0x8CE6: 0x68A7,
    0x8CE7: 0x6A8E,
    0x8CE8: 0x745A,
    0x8CE9: 0x7881,
    0x8CEA: 0x8A9E,
    0x8CEB: 0x8AA4,
    0x8CEC: 0x8B77,
    0x8CED: 0x9190,
    0x8CEE: 0x4E5E,
    0x8CEF: 0x9BC9,
    0x8CF0: 0x4EA4,
    0x8CF1: 0x4F7C,
    0x8CF2: 0x4FAF,
    0x8CF3: 0x5019,
    0x8CF4: 0x5016,
    0x8CF5: 0x5149,
    0x8CF6: 0x516C,
    0x8CF7: 0x529F,
    0x8CF8: 0x52B9,
    0x8CF9: 0x52FE,
    0x8CFA: 0x539A,
    0x8CFB: 0x53E3,
    0x8CFC: 0x5411,
    0x8D40: 0x540E,
    0x8D41: 0x5589,
    0x8D42: 0x5751,
    0x8D43: 0x57A2,
    0x8D44: 0x597D,
    0x8D45: 0x5B54,
    0x8D46: 0x5B5D,
    0x8D47: 0x5B8F,
    0x8D48: 0x5DE5,
    0x8D49: 0x5DE7,
    0x8D4A: 0x5DF7,
    0x8D4B: 0x5E78,
    0x8D4C: 0x5E83,
    0x8D4D: 0x5E9A,
    0x8D4E: 0x5EB7,
    0x8D4F: 0x5F18,
    0x8D50: 0x6052,
    0x8D51: 0x614C,
    0x8D52: 0x6297,
    0x8D53: 0x62D8,
    0x8D54: 0x63A7,
    0x8D55: 0x653B,
    0x8D56: 0x6602,
    0x8D57: 0x6643,
    0x8D58: 0x66F4,
    0x8D59: 0x676D,
    0x8D5A: 0x6821,
    0x8D5B: 0x6897,
    0x8D5C: 0x69CB,
    0x8D5D: 0x6C5F,
    0x8D5E: 0x6D2A,
    0x8D5F: 0x6D69,
    0x8D60: 0x6E2F,
    0x8D61: 0x6E9D,
    0x8D62: 0x7532,
    0x8D63: 0x7687,
    0x8D64: 0x786C,
    0x8D65: 0x7A3F,
    0x8D66: 0x7CE0,
    0x8D67: 0x7D05,
    0x8D68: 0x7D18,
    0x8D69: 0x7D5E,
    0x8D6A: 0x7DB1,
    0x8D6B: 0x8015,
    0x8D6C: 0x8003,
    0x8D6D: 0x80AF,
    0x8D6E: 0x80B1,
    0x8D6F: 0x8154,
    0x8D70: 0x818F,
    0x8D71: 0x822A,
    0x8D72: 0x8352,
    0x8D73: 0x884C,
    0x8D74: 0x8861,
    0x8D75: 0x8B1B,
    0x8D76: 0x8CA2,
    0x8D77: 0x8CFC,
    0x8D78: 0x90CA,
    0x8D79: 0x9175,
    0x8D7A: 0x9271,
    0x8D7B: 0x783F,
    0x8D7C: 0x92FC,
    0x8D7D: 0x95A4,
    0x8D7E: 0x964D,
    0x8D80: 0x9805,
    0x8D81: 0x9999,
    0x8D82: 0x9AD8,
    0x8D83: 0x9D3B,
    0x8D84: 0x525B,
    0x8D85: 0x52AB,
    0x8D86: 0x53F7,
    0x8D87: 0x5408,
    0x8D88: 0x58D5,
    0x8D89: 0x62F7,
    0x8D8A: 0x6FE0,
    0x8D8B: 0x8C6A,
    0x8D8C: 0x8F5F,
    0x8D8D: 0x9EB9,
    0x8D8E: 0x514B,
    0x8D8F: 0x523B,
    0x8D90: 0x544A,
    0x8D91: 0x56FD,
    0x8D92: 0x7A40,
    0x8D93: 0x9177,
    0x8D94: 0x9D60,
    0x8D95: 0x9ED2,
    0x8D96: 0x7344,
    0x8D97: 0x6F09,
    0x8D98: 0x8170,
    0x8D99: 0x7511,
    0x8D9A: 0x5FFD,
    0x8D9B: 0x60DA,
    0x8D9C: 0x9AA8,
    0x8D9D: 0x72DB,
    0x8D9E: 0x8FBC,
    0x8D9F: 0x6B64,
    0x8DA0: 0x9803,
    0x8DA1: 0x4ECA,
    0x8DA2: 0x56F0,
    0x8DA3: 0x5764,
    0x8DA4: 0x58BE,
    0x8DA5: 0x5A5A,
    0x8DA6: 0x6068,
    0x8DA7: 0x61C7,
    0x8DA8: 0x660F,
    0x8DA9: 0x6606,
    0x8DAA: 0x6839,
    0x8DAB: 0x68B1,
    0x8DAC: 0x6DF7,
    0x8DAD: 0x75D5,
    0x8DAE: 0x7D3A,
    0x8DAF: 0x826E,
    0x8DB0: 0x9B42,
    0x8DB1: 0x4E9B,
    0x8DB2: 0x4F50,
    0x8DB3: 0x53C9,
    0x8DB4: 0x5506,
    0x8DB5: 0x5D6F,
    0x8DB6: 0x5DE6,
    0x8DB7: 0x5DEE,
    0x8DB8: 0x67FB,
    0x8DB9: 0x6C99,
    0x8DBA: 0x7473,
    0x8DBB: 0x7802,
    0x8DBC: 0x8A50,
    0x8DBD: 0x9396,
    0x8DBE: 0x88DF,
    0x8DBF: 0x5750,
    0x8DC0: 0x5EA7,
    0x8DC1: 0x632B,
    0x8DC2: 0x50B5,
    0x8DC3: 0x50AC,
    0x8DC4: 0x518D,
    0x8DC5: 0x6700,
    0x8DC6: 0x54C9,
    0x8DC7: 0x585E,
    0x8DC8: 0x59BB,
    0x8DC9: 0x5BB0,
    0x8DCA: 0x5F69,
    0x8DCB: 0x624D,
    0x8DCC: 0x63A1,
    0x8DCD: 0x683D,
    0x8DCE: 0x6B73,
    0x8DCF: 0x6E08,
    0x8DD0: 0x707D,
    0x8DD1: 0x91C7,
    0x8DD2: 0x7280,
    0x8DD3: 0x7815,
    0x8DD4: 0x7826,
    0x8DD5: 0x796D,
    0x8DD6: 0x658E,
    0x8DD7: 0x7D30,
    0x8DD8: 0x83DC,
    0x8DD9: 0x88C1,
    0x8DDA: 0x8F09,
    0x8DDB: 0x969B,
    0x8DDC: 0x5264,
    0x8DDD: 0x5728,
    0x8DDE: 0x6750,
    0x8DDF: 0x7F6A,
    0x8DE0: 0x8CA1,
    0x8DE1: 0x51B4,
    0x8DE2: 0x5742,
    0x8DE3: 0x962A,
    0x8DE4: 0x583A,
    0x8DE5: 0x698A,
    0x8DE6: 0x80B4,
    0x8DE7: 0x54B2,
    0x8DE8: 0x5D0E,
    0x8DE9: 0x57FC,
    0x8DEA: 0x7895,
    0x8DEB: 0x9DFA,
    0x8DEC: 0x4F5C,
    0x8DED: 0x524A,
    0x8DEE: 0x548B,
    0x8DEF: 0x643E,
    0x8DF0: 0x6628,
    0x8DF1: 0x6714,
    0x8DF2: 0x67F5,
    0x8DF3: 0x7A84,
    0x8DF4: 0x7B56,
    0x8DF5: 0x7D22,
    0x8DF6: 0x932F,
    0x8DF7: 0x685C,
    0x8DF8: 0x9BAD,
    0x8DF9: 0x7B39,
    0x8DFA: 0x5319,
    0x8DFB: 0x518A,
    0x8DFC: 0x5237,
    0x8E40: 0x5BDF,
    0x8E41: 0x62F6,
    0x8E42: 0x64AE,
    0x8E43: 0x64E6,
    0x8E44: 0x672D,
    0x8E45: 0x6BBA,
    0x8E46: 0x85A9,
    0x8E47: 0x96D1,
    0x8E48: 0x7690,
    0x8E49: 0x9BD6,
    0x8E4A: 0x634C,
    0x8E4B: 0x9306,
    0x8E4C: 0x9BAB,
    0x8E4D: 0x76BF,
    0x8E4E: 0x6652,
    0x8E4F: 0x4E09,
    0x8E50: 0x5098,
    0x8E51: 0x53C2,
    0x8E52: 0x5C71,
    0x8E53: 0x60E8,
    0x8E54: 0x6492,
    0x8E55: 0x6563,
    0x8E56: 0x685F,
    0x8E57: 0x71E6,
    0x8E58: 0x73CA,
    0x8E59: 0x7523,
    0x8E5A: 0x7B97,
    0x8E5B: 0x7E82,
    0x8E5C: 0x8695,
    0x8E5D: 0x8B83,
    0x8E5E: 0x8CDB,
    0x8E5F: 0x9178,
    0x8E60: 0x9910,
    0x8E61: 0x65AC,
    0x8E62: 0x66AB,
    0x8E63: 0x6B8B,
    0x8E64: 0x4ED5,
    0x8E65: 0x4ED4,
    0x8E66: 0x4F3A,
    0x8E67: 0x4F7F,
    0x8E68: 0x523A,
    0x8E69: 0x53F8,
    0x8E6A: 0x53F2,
    0x8E6B: 0x55E3,
    0x8E6C: 0x56DB,
    0x8E6D: 0x58EB,
    0x8E6E: 0x59CB,
    0x8E6F: 0x59C9,
    0x8E70: 0x59FF,
    0x8E71: 0x5B50,
    0x8E72: 0x5C4D,
    0x8E73: 0x5E02,
    0x8E74: 0x5E2B,
    0x8E75: 0x5FD7,
    0x8E76: 0x601D,
    0x8E77: 0x6307,
    0x8E78: 0x652F,
    0x8E79: 0x5B5C,
    0x8E7A: 0x65AF,
    0x8E7B: 0x65BD,
    0x8E7C: 0x65E8,
    0x8E7D: 0x679D,
    0x8E7E: 0x6B62,
    0x8E80: 0x6B7B,
    0x8E81: 0x6C0F,
    0x8E82: 0x7345,
    0x8E83: 0x7949,
    0x8E84: 0x79C1,
    0x8E85: 0x7CF8,
    0x8E86: 0x7D19,
    0x8E87: 0x7D2B,
    0x8E88: 0x80A2,
    0x8E89: 0x8102,
    0x8E8A: 0x81F3,
    0x8E8B: 0x8996,
    0x8E8C: 0x8A5E,
    0x8E8D: 0x8A69,
    0x8E8E: 0x8A66,
    0x8E8F: 0x8A8C,
    0x8E90: 0x8AEE,
    0x8E91: 0x8CC7,
    0x8E92: 0x8CDC,
    0x8E93: 0x96CC,
    0x8E94: 0x98FC,
    0x8E95: 0x6B6F,
    0x8E96: 0x4E8B,
    0x8E97: 0x4F3C,
    0x8E98: 0x4F8D,
    0x8E99: 0x5150,
    0x8E9A: 0x5B57,
    0x8E9B: 0x5BFA,
    0x8E9C: 0x6148,
    0x8E9D: 0x6301,
    0x8E9E: 0x6642,
    0x8E9F: 0x6B21,
    0x8EA0: 0x6ECB,
    0x8EA1: 0x6CBB,
    0x8EA2: 0x723E,
    0x8EA3: 0x74BD,
    0x8EA4: 0x75D4,
    0x8EA5: 0x78C1,
    0x8EA6: 0x793A,
    0x8EA7: 0x800C,
    0x8EA8: 0x8033,
    0x8EA9: 0x81EA,
    0x8EAA: 0x8494,
    0x8EAB: 0x8F9E,
    0x8EAC: 0x6C50,
    0x8EAD: 0x9E7F,
    0x8EAE: 0x5F0F,
    0x8EAF: 0x8B58,
    0x8EB0: 0x9D2B,
    0x8EB1: 0x7AFA,
    0x8EB2: 0x8EF8,
    0x8EB3: 0x5B8D,
    0x8EB4: 0x96EB,
    0x8EB5: 0x4E03,
    0x8EB6: 0x53F1,
    0x8EB7: 0x57F7,
    0x8EB8: 0x5931,
    0x8EB9: 0x5AC9,
    0x8EBA: 0x5BA4,
    0x8EBB: 0x6089,
    0x8EBC: 0x6E7F,
    0x8EBD: 0x6F06,
    0x8EBE: 0x75BE,
    0x8EBF: 0x8CEA,
    0x8EC0: 0x5B9F,
    0x8EC1: 0x8500,
    0x8EC2: 0x7BE0,
    0x8EC3: 0x5072,
    0x8EC4: 0x67F4,
    0x8EC5: 0x829D,
    0x8EC6: 0x5C61,
    0x8EC7: 0x854A,
    0x8EC8: 0x7E1E,
    0x8EC9: 0x820E,
    0x8ECA: 0x5199,
    0x8ECB: 0x5C04,
    0x8ECC: 0x6368,
    0x8ECD: 0x8D66,
    0x8ECE: 0x659C,
    0x8ECF: 0x716E,
    0x8ED0: 0x793E,
    0x8ED1: 0x7D17,
    0x8ED2: 0x8005,
    0x8ED3: 0x8B1D,
    0x8ED4: 0x8ECA,
    0x8ED5: 0x906E,
    0x8ED6: 0x86C7,
    0x8ED7: 0x90AA,
    0x8ED8: 0x501F,
    0x8ED9: 0x52FA,
    0x8EDA: 0x5C3A,
    0x8EDB: 0x6753,
    0x8EDC: 0x707C,
    0x8EDD: 0x7235,
    0x8EDE: 0x914C,
    0x8EDF: 0x91C8,
    0x8EE0: 0x932B,
    0x8EE1: 0x82E5,
    0x8EE2: 0x5BC2,
    0x8EE3: 0x5F31,
    0x8EE4: 0x60F9,
    0x8EE5: 0x4E3B,
    0x8EE6: 0x53D6,
    0x8EE7: 0x5B88,
    0x8EE8: 0x624B,
    0x8EE9: 0x6731,
    0x8EEA: 0x6B8A,
    0x8EEB: 0x72E9,
    0x8EEC: 0x73E0,
    0x8EED: 0x7A2E,
    0x8EEE: 0x816B,
    0x8EEF: 0x8DA3,
    0x8EF0: 0x9152,
    0x8EF1: 0x9996,
    0x8EF2: 0x5112,
    0x8EF3: 0x53D7,
    0x8EF4: 0x546A,
    0x8EF5: 0x5BFF,
    0x8EF6: 0x6388,
    0x8EF7: 0x6A39,
    0x8EF8: 0x7DAC,
    0x8EF9: 0x9700,
    0x8EFA: 0x56DA,
    0x8EFB: 0x53CE,
    0x8EFC: 0x5468,
    0x8F40: 0x5B97,
    0x8F41: 0x5C31,
    0x8F42: 0x5DDE,
    0x8F43: 0x4FEE,
    0x8F44: 0x6101,
    0x8F45: 0x62FE,
    0x8F46: 0x6D32,
    0x8F47: 0x79C0,
    0x8F48: 0x79CB,
    0x8F49: 0x7D42,
    0x8F4A: 0x7E4D,
    0x8F4B: 0x7FD2,
    0x8F4C: 0x81ED,
    0x8F4D: 0x821F,
    0x8F4E: 0x8490,
    0x8F4F: 0x8846,
    0x8F50: 0x8972,
    0x8F51: 0x8B90,
    0x8F52: 0x8E74,
    0x8F53: 0x8F2F,
    0x8F54: 0x9031,
    0x8F55: 0x914B,
    0x8F56: 0x916C,
    0x8F57: 0x96C6,
    0x8F58: 0x919C,
    0x8F59: 0x4EC0,
    0x8F5A: 0x4F4F,
    0x8F5B: 0x5145,
    0x8F5C: 0x5341,
    0x8F5D: 0x5F93,
    0x8F5E: 0x620E,
    0x8F5F: 0x67D4,
    0x8F60: 0x6C41,
    0x8F61: 0x6E0B,
    0x8F62: 0x7363,
    0x8F63: 0x7E26,
    0x8F64: 0x91CD,
    0x8F65: 0x9283,
    0x8F66: 0x53D4,
    0x8F67: 0x5919,
    0x8F68: 0x5BBF,
    0x8F69: 0x6DD1,
    0x8F6A: 0x795D,
    0x8F6B: 0x7E2E,
    0x8F6C: 0x7C9B,
    0x8F6D: 0x587E,
    0x8F6E: 0x719F,
    0x8F6F: 0x51FA,
    0x8F70: 0x8853,
    0x8F71: 0x8FF0,
    0x8F72: 0x4FCA,
    0x8F73: 0x5CFB,
    0x8F74: 0x6625,
    0x8F75: 0x77AC,
    0x8F76: 0x7AE3,
    0x8F77: 0x821C,
    0x8F78: 0x99FF,
    0x8F79: 0x51C6,
    0x8F7A: 0x5FAA,
    0x8F7B: 0x65EC,
    0x8F7C: 0x696F,
    0x8F7D: 0x6B89,
    0x8F7E: 0x6DF3,
    0x8F80: 0x6E96,
    0x8F81: 0x6F64,
    0x8F82: 0x76FE,
    0x8F83: 0x7D14,
    0x8F84: 0x5DE1,
    0x8F85: 0x9075,
    0x8F86: 0x9187,
    0x8F87: 0x9806,
    0x8F88: 0x51E6,
    0x8F89: 0x521D,
    0x8F8A: 0x6240,
    0x8F8B: 0x6691,
    0x8F8C: 0x66D9,
    0x8F8D: 0x6E1A,
    0x8F8E: 0x5EB6,
    0x8F8F: 0x7DD2,
    0x8F90: 0x7F72,
    0x8F91: 0x66F8,
    0x8F92: 0x85AF,
    0x8F93: 0x85F7,
    0x8F94: 0x8AF8,
    0x8F95: 0x52A9,
    0x8F96: 0x53D9,
    0x8F97: 0x5973,
    0x8F98: 0x5E8F,
    0x8F99: 0x5F90,
    0x8F9A: 0x6055,
    0x8F9B: 0x92E4,
    0x8F9C: 0x9664,
    0x8F9D: 0x50B7,
    0x8F9E: 0x511F,
    0x8F9F: 0x52DD,
    0x8FA0: 0x5320,
    0x8FA1: 0x5347,
    0x8FA2: 0x53EC,
    0x8FA3: 0x54E8,
    0x8FA4: 0x5546,
    0x8FA5: 0x5531,
    0x8FA6: 0x5617,
    0x8FA7: 0x5968,
    0x8FA8: 0x59BE,
    0x8FA9: 0x5A3C,
    0x8FAA: 0x5BB5,
    0x8FAB: 0x5C06,
    0x8FAC: 0x5C0F,
    0x8FAD: 0x5C11,
    0x8FAE: 0x5C1A,
    0x8FAF: 0x5E84,
    0x8FB0: 0x5E8A,
    0x8FB1: 0x5EE0,
    0x8FB2: 0x5F70,
    0x8FB3: 0x627F,
    0x8FB4: 0x6284,
    0x8FB5: 0x62DB,
    0x8FB6: 0x638C,
    0x8FB7: 0x6377,
    0x8FB8: 0x6607,
    0x8FB9: 0x660C,
    0x8FBA: 0x662D,
    0x8FBB: 0x6676,
    0x8FBC: 0x677E,
    0x8FBD: 0x68A2,
    0x8FBE: 0x6A1F,
    0x8FBF: 0x6A35,
    0x8FC0: 0x6CBC,
    0x8FC1: 0x6D88,
    0x8FC2: 0x6E09,
    0x8FC3: 0x6E58,
    0x8FC4: 0x713C,
    0x8FC5: 0x7126,
    0x8FC6: 0x7167,
    0x8FC7: 0x75C7,
    0x8FC8: 0x7701,
    0x8FC9: 0x785D,
    0x8FCA: 0x7901,
    0x8FCB: 0x7965,
    0x8FCC: 0x79F0,
    0x8FCD: 0x7AE0,
    0x8FCE: 0x7B11,
    0x8FCF: 0x7CA7,
    0x8FD0: 0x7D39,
    0x8FD1: 0x8096,
    0x8FD2: 0x83D6,
    0x8FD3: 0x848B,
    0x8FD4: 0x8549,
    0x8FD5: 0x885D,
    0x8FD6: 0x88F3,
    0x8FD7: 0x8A1F,
    0x8FD8: 0x8A3C,
    0x8FD9: 0x8A54,
    0x8FDA: 0x8A73,
    0x8FDB: 0x8C61,
    0x8FDC: 0x8CDE,
    0x8FDD: 0x91A4,
    0x8FDE: 0x9266,
    0x8FDF: 0x937E,
    0x8FE0: 0x9418,
    0x8FE1: 0x969C,
    0x8FE2: 0x9798,
    0x8FE3: 0x4E0A,
    0x8FE4: 0x4E08,
    0x8FE5: 0x4E1E,
    0x8FE6: 0x4E57,
    0x8FE7: 0x5197,
    0x8FE8: 0x5270,
    0x8FE9: 0x57CE,
    0x8FEA: 0x5834,
    0x8FEB: 0x58CC,
    0x8FEC: 0x5B22,
    0x8FED: 0x5E38,
    0x8FEE: 0x60C5,
    0x8FEF: 0x64FE,
    0x8FF0: 0x6761,
    0x8FF1: 0x6756,
    0x8FF2: 0x6D44,
    0x8FF3: 0x72B6,
    0x8FF4: 0x7573,
    0x8FF5: 0x7A63,
    0x8FF6: 0x84B8,
    0x8FF7: 0x8B72,
    0x8FF8: 0x91B8,
    0x8FF9: 0x9320,
    0x8FFA: 0x5631,
    0x8FFB: 0x57F4,
    0x8FFC: 0x98FE,
    0x9040: 0x62ED,
    0x9041: 0x690D,
    0x9042: 0x6B96,
    0x9043: 0x71ED,
    0x9044: 0x7E54,
    0x9045: 0x8077,
    0x9046: 0x8272,
    0x9047: 0x89E6,
    0x9048: 0x98DF,
    0x9049: 0x8755,
    0x904A: 0x8FB1,
    0x904B: 0x5C3B,
    0x904C: 0x4F38,
    0x904D: 0x4FE1,
    0x904E: 0x4FB5,
    0x904F: 0x5507,
    0x9050: 0x5A20,
    0x9051: 0x5BDD,
    0x9052: 0x5BE9,
    0x9053: 0x5FC3,
    0x9054: 0x614E,
    0x9055: 0x632F,
    0x9056: 0x65B0,
    0x9057: 0x664B,
    0x9058: 0x68EE,
    0x9059: 0x699B,
    0x905A: 0x6D78,
    0x905B: 0x6DF1,
    0x905C: 0x7533,
    0x905D: 0x75B9,
    0x905E: 0x771F,
    0x905F: 0x795E,
    0x9060: 0x79E6,
    0x9061: 0x7D33,
    0x9062: 0x81E3,
    0x9063: 0x82AF,
    0x9064: 0x85AA,
    0x9065: 0x89AA,
    0x9066: 0x8A3A,
    0x9067: 0x8EAB,
    0x9068: 0x8F9B,
    0x9069: 0x9032,
    0x906A: 0x91DD,
    0x906B: 0x9707,
    0x906C: 0x4EBA,
    0x906D: 0x4EC1,
    0x906E: 0x5203,
    0x906F: 0x5875,
    0x9070: 0x58EC,
    0x9071: 0x5C0B,
    0x9072: 0x751A,
    0x9073: 0x5C3D,
    0x9074: 0x814E,
    0x9075: 0x8A0A,
    0x9076: 0x8FC5,
    0x9077: 0x9663,
    0x9078: 0x976D,
    0x9079: 0x7B25,
    0x907A: 0x8ACF,
    0x907B: 0x9808,
    0x907C: 0x9162,
    0x907D: 0x56F3,
    0x907E: 0x53A8,
    0x9080: 0x9017,
    0x9081: 0x5439,
    0x9082: 0x5782,
    0x9083: 0x5E25,
    0x9084: 0x63A8,
    0x9085: 0x6C34,
    0x9086: 0x708A,
    0x9087: 0x7761,
    0x9088: 0x7C8B,
    0x9089: 0x7FE0,
    0x908A: 0x8870,
    0x908B: 0x9042,
    0x908C: 0x9154,
    0x908D: 0x9310,
    0x908E: 0x9318,
    0x908F: 0x968F,
    0x9090: 0x745E,
    0x9091: 0x9AC4,
    0x9092: 0x5D07,
    0x9093: 0x5D69,
    0x9094: 0x6570,
    0x9095: 0x67A2,
    0x9096: 0x8DA8,
    0x9097: 0x96DB,
    0x9098: 0x636E,
    0x9099: 0x6749,
    0x909A: 0x6919,
    0x909B: 0x83C5,
    0x909C: 0x9817,
    0x909D: 0x96C0,
    0x909E: 0x88FE,
    0x909F: 0x6F84,
    0x90A0: 0x647A,
    0x90A1: 0x5BF8,
    0x90A2: 0x4E16,
    0x90A3: 0x702C,
    0x90A4: 0x755D,
    0x90A5: 0x662F,
    0x90A6: 0x51C4,
    0x90A7: 0x5236,
    0x90A8: 0x52E2,
    0x90A9: 0x59D3,
    0x90AA: 0x5F81,
    0x90AB: 0x6027,
    0x90AC: 0x6210,
    0x90AD: 0x653F,
    0x90AE: 0x6574,
    0x90AF: 0x661F,
    0x90B0: 0x6674,
    0x90B1: 0x68F2,
    0x90B2: 0x6816,
    0x90B3: 0x6B63,
    0x90B4: 0x6E05,
    0x90B5: 0x7272,
    0x90B6: 0x751F,
    0x90B7: 0x76DB,
    0x90B8: 0x7CBE,
    0x90B9: 0x8056,
    0x90BA: 0x58F0,
    0x90BB: 0x88FD,
    0x90BC: 0x897F,
    0x90BD: 0x8AA0,
    0x90BE: 0x8A93,
    0x90BF: 0x8ACB,
    0x90C0: 0x901D,
    0x90C1: 0x9192,
    0x90C2: 0x9752,
    0x90C3: 0x9759,
    0x90C4: 0x6589,
    0x90C5: 0x7A0E,
    0x90C6: 0x8106,
    0x90C7: 0x96BB,
    0x90C8: 0x5E2D,
    0x90C9: 0x60DC,
    0x90CA: 0x621A,
    0x90CB: 0x65A5,
    0x90CC: 0x6614,
    0x90CD: 0x6790,
    0x90CE: 0x77F3,
    0x90CF: 0x7A4D,
    0x90D0: 0x7C4D,
    0x90D1: 0x7E3E,
    0x90D2: 0x810A,
    0x90D3: 0x8CAC,
    0x90D4: 0x8D64,
    0x90D5: 0x8DE1,
    0x90D6: 0x8E5F,
    0x90D7: 0x78A9,
    0x90D8: 0x5207,
    0x90D9: 0x62D9,
    0x90DA: 0x63A5,
    0x90DB: 0x6442,
    0x90DC: 0x6298,
    0x90DD: 0x8A2D,
    0x90DE: 0x7A83,
    0x90DF: 0x7BC0,
    0x90E0: 0x8AAC,
    0x90E1: 0x96EA,
    0x90E2: 0x7D76,
    0x90E3: 0x820C,
    0x90E4: 0x8749,
    0x90E5: 0x4ED9,
    0x90E6: 0x5148,
    0x90E7: 0x5343,
    0x90E8: 0x5360,
    0x90E9: 0x5BA3,
    0x90EA: 0x5C02,
    0x90EB: 0x5C16,
    0x90EC: 0x5DDD,
    0x90ED: 0x6226,
    0x90EE: 0x6247,
    0x90EF: 0x64B0,
    0x90F0: 0x6813,
    0x90F1: 0x6834,
    0x90F2: 0x6CC9,
    0x90F3: 0x6D45,
    0x90F4: 0x6D17,
    0x90F5: 0x67D3,
    0x90F6: 0x6F5C,
    0x90F7: 0x714E,
    0x90F8: 0x717D,
    0x90F9: 0x65CB,
    0x90FA: 0x7A7F,
    0x90FB: 0x7BAD,
    0x90FC: 0x7DDA,
    0x9140: 0x7E4A,
    0x9141: 0x7FA8,
    0x9142: 0x817A,
    0x9143: 0x821B,
    0x9144: 0x8239,
    0x9145: 0x85A6,
    0x9146: 0x8A6E,
    0x9147: 0x8CCE,
    0x9148: 0x8DF5,
    0x9149: 0x9078,
    0x914A: 0x9077,
    0x914B: 0x92AD,
    0x914C: 0x9291,
    0x914D: 0x9583,
    0x914E: 0x9BAE,
    0x914F: 0x524D,
    0x9150: 0x5584,
    0x9151: 0x6F38,
    0x9152: 0x7136,
    0x9153: 0x5168,
    0x9154: 0x7985,
    0x9155: 0x7E55,
    0x9156: 0x81B3,
    0x9157: 0x7CCE,
    0x9158: 0x564C,
    0x9159: 0x5851,
    0x915A: 0x5CA8,
    0x915B: 0x63AA,
    0x915C: 0x66FE,
    0x915D: 0x66FD,
    0x915E: 0x695A,
    0x915F: 0x72D9,
    0x9160: 0x758F,
    0x9161: 0x758E,
    0x9162: 0x790E,
    0x9163: 0x7956,
    0x9164: 0x79DF,
    0x9165: 0x7C97,
    0x9166: 0x7D20,
    0x9167: 0x7D44,
    0x9168: 0x8607,
    0x9169: 0x8A34,
    0x916A: 0x963B,
    0x916B: 0x9061,
    0x916C: 0x9F20,
    0x916D: 0x50E7,
    0x916E: 0x5275,
    0x916F: 0x53CC,
    0x9170: 0x53E2,
    0x9171: 0x5009,
    0x9172: 0x55AA,
    0x9173: 0x58EE,
    0x9174: 0x594F,
    0x9175: 0x723D,
    0x9176: 0x5B8B,
    0x9177: 0x5C64,
    0x9178: 0x531D,
    0x9179: 0x60E3,
    0x917A: 0x60F3,
    0x917B: 0x635C,
    0x917C: 0x6383,
    0x917D: 0x633F,
    0x917E: 0x63BB,
    0x9180: 0x64CD,
    0x9181: 0x65E9,
    0x9182: 0x66F9,
    0x9183: 0x5DE3,
    0x9184: 0x69CD,
    0x9185: 0x69FD,
    0x9186: 0x6F15,
    0x9187: 0x71E5,
    0x9188: 0x4E89,
    0x9189: 0x75E9,
    0x918A: 0x76F8,
    0x918B: 0x7A93,
    0x918C: 0x7CDF,
    0x918D: 0x7DCF,
    0x918E: 0x7D9C,
    0x918F: 0x8061,
    0x9190: 0x8349,
    0x9191: 0x8358,
    0x9192: 0x846C,
    0x9193: 0x84BC,
    0x9194: 0x85FB,
    0x9195: 0x88C5,
    0x9196: 0x8D70,
    0x9197: 0x9001,
    0x9198: 0x906D,
    0x9199: 0x9397,
    0x919A: 0x971C,
    0x919B: 0x9A12,
    0x919C: 0x50CF,
    0x919D: 0x5897,
    0x919E: 0x618E,
    0x919F: 0x81D3,
    0x91A0: 0x8535,
    0x91A1: 0x8D08,
    0x91A2: 0x9020,
    0x91A3: 0x4FC3,
    0x91A4: 0x5074,
    0x91A5: 0x5247,
    0x91A6: 0x5373,
    0x91A7: 0x606F,
    0x91A8: 0x6349,
    0x91A9: 0x675F,
    0x91AA: 0x6E2C,
    0x91AB: 0x8DB3,
    0x91AC: 0x901F,
    0x91AD: 0x4FD7,
    0x91AE: 0x5C5E,
    0x91AF: 0x8CCA,
    0x91B0: 0x65CF,
    0x91B1: 0x7D9A,
    0x91B2: 0x5352,
    0x91B3: 0x8896,
    0x91B4: 0x5176,
    0x91B5: 0x63C3,
    0x91B6: 0x5B58,
    0x91B7: 0x5B6B,
    0x91B8: 0x5C0A,
    0x91B9: 0x640D,
    0x91BA: 0x6751,
    0x91BB: 0x905C,
    0x91BC: 0x4ED6,
    0x91BD: 0x591A,
    0x91BE: 0x592A,
    0x91BF: 0x6C70,
    0x91C0: 0x8A51,
    0x91C1: 0x553E,
    0x91C2: 0x5815,
    0x91C3: 0x59A5,
    0x91C4: 0x60F0,
    0x91C5: 0x6253,
    0x91C6: 0x67C1,
    0x91C7: 0x8235,
    0x91C8: 0x6955,
    0x91C9: 0x9640,
    0x91CA: 0x99C4,
    0x91CB: 0x9A28,
    0x91CC: 0x4F53,
    0x91CD: 0x5806,
    0x91CE: 0x5BFE,
    0x91CF: 0x8010,
    0x91D0: 0x5CB1,
    0x91D1: 0x5E2F,
    0x91D2: 0x5F85,
    0x91D3: 0x6020,
    0x91D4: 0x614B,
    0x91D5: 0x6234,
    0x91D6: 0x66FF,
    0x91D7: 0x6CF0,
    0x91D8: 0x6EDE,
    0x91D9: 0x80CE,
    0x91DA: 0x817F,
    0x91DB: 0x82D4,
    0x91DC: 0x888B,
    0x91DD: 0x8CB8,
    0x91DE: 0x9000,
    0x91DF: 0x902E,
    0x91E0: 0x968A,
    0x91E1: 0x9EDB,
    0x91E2: 0x9BDB,
    0x91E3: 0x4EE3,
    0x91E4: 0x53F0,
    0x91E5: 0x5927,
    0x91E6: 0x7B2C,
    0x91E7: 0x918D,
    0x91E8: 0x984C,
    0x91E9: 0x9DF9,
    0x91EA: 0x6EDD,
    0x91EB: 0x7027,
    0x91EC: 0x5353,
    0x91ED: 0x5544,
    0x91EE: 0x5B85,
    0x91EF: 0x6258,
    0x91F0: 0x629E,
    0x91F1: 0x62D3,
    0x91F2: 0x6CA2,
    0x91F3: 0x6FEF,
    0x91F4: 0x7422,
    0x91F5: 0x8A17,
    0x91F6: 0x9438,
    0x91F7: 0x6FC1,
    0x91F8: 0x8AFE,
    0x91F9: 0x8338,
    0x91FA: 0x51E7,
    0x91FB: 0x86F8,
    0x91FC: 0x53EA,
    0x9240: 0x53E9,
    0x9241: 0x4F46,
    0x9242: 0x9054,
    0x9243: 0x8FB0,
    0x9244: 0x596A,
    0x9245: 0x8131,
    0x9246: 0x5DFD,
    0x9247: 0x7AEA,
    0x9248: 0x8FBF,
    0x9249: 0x68DA,
    0x924A: 0x8C37,
    0x924B: 0x72F8,
    0x924C: 0x9C48,
    0x924D: 0x6A3D,
    0x924E: 0x8AB0,
    0x924F: 0x4E39,
    0x9250: 0x5358,
    0x9251: 0x5606,
    0x9252: 0x5766,
    0x9253: 0x62C5,
    0x9254: 0x63A2,
    0x9255: 0x65E6,
    0x9256: 0x6B4E,
    0x9257: 0x6DE1,
    0x9258: 0x6E5B,
    0x9259: 0x70AD,
    0x925A: 0x77ED,
    0x925B: 0x7AEF,
    0x925C: 0x7BAA,
    0x925D: 0x7DBB,
    0x925E: 0x803D,
    0x925F: 0x80C6,
    0x9260: 0x86CB,
    0x9261: 0x8A95,
    0x9262: 0x935B,
    0x9263: 0x56E3,
    0x9264: 0x58C7,
    0x9265: 0x5F3E,
    0x9266: 0x65AD,
    0x9267: 0x6696,
    0x9268: 0x6A80,
    0x9269: 0x6BB5,
    0x926A: 0x7537,
    0x926B: 0x8AC7,
    0x926C: 0x5024,
    0x926D: 0x77E5,
    0x926E: 0x5730,
    0x926F: 0x5F1B,
    0x9270: 0x6065,
    0x9271: 0x667A,
    0x9272: 0x6C60,
    0x9273: 0x75F4,
    0x9274: 0x7A1A,
    0x9275: 0x7F6E,
    0x9276: 0x81F4,
    0x9277: 0x8718,
    0x9278: 0x9045,
    0x9279: 0x99B3,
    0x927A: 0x7BC9,
    0x927B: 0x755C,
    0x927C: 0x7AF9,
    0x927D: 0x7B51,
    0x927E: 0x84C4,
    0x9280: 0x9010,
    0x9281: 0x79E9,
    0x9282: 0x7A92,
    0x9283: 0x8336,
    0x9284: 0x5AE1,
    0x9285: 0x7740,
    0x9286: 0x4E2D,
    0x9287: 0x4EF2,
    0x9288: 0x5B99,
    0x9289: 0x5FE0,
    0x928A: 0x62BD,
    0x928B: 0x663C,
    0x928C: 0x67F1,
    0x928D: 0x6CE8,
    0x928E: 0x866B,
    0x928F: 0x8877,
    0x9290: 0x8A3B,
    0x9291: 0x914E,
    0x9292: 0x92F3,
    0x9293: 0x99D0,
    0x9294: 0x6A17,
    0x9295: 0x7026,
    0x9296: 0x732A,
    0x9297: 0x82E7,
    0x9298: 0x8457,
    0x9299: 0x8CAF,
    0x929A: 0x4E01,
    0x929B: 0x5146,
    0x929C: 0x51CB,
    0x929D: 0x558B,
    0x929E: 0x5BF5,
    0x929F: 0x5E16,
    0x92A0: 0x5E33,
    0x92A1: 0x5E81,
    0x92A2: 0x5F14,
    0x92A3: 0x5F35,
    0x92A4: 0x5F6B,
    0x92A5: 0x5FB4,
    0x92A6: 0x61F2,
    0x92A7: 0x6311,
    0x92A8: 0x66A2,
    0x92A9: 0x671D,
    0x92AA: 0x6F6E,
    0x92AB: 0x7252,
    0x92AC: 0x753A,
    0x92AD: 0x773A,
    0x92AE: 0x8074,
    0x92AF: 0x8139,
    0x92B0: 0x8178,
    0x92B1: 0x8776,
    0x92B2: 0x8ABF,
    0x92B3: 0x8ADC,
    0x92B4: 0x8D85,
    0x92B5: 0x8DF3,
    0x92B6: 0x929A,
    0x92B7: 0x9577,
    0x92B8: 0x9802,
    0x92B9: 0x9CE5,
    0x92BA: 0x52C5,
    0x92BB: 0x6357,
    0x92BC: 0x76F4,
    0x92BD: 0x6715,
    0x92BE: 0x6C88,
    0x92BF: 0x73CD,
    0x92C0: 0x8CC3,
    0x92C1: 0x93AE,
    0x92C2: 0x9673,
    0x92C3: 0x6D25,
    0x92C4: 0x589C,
    0x92C5: 0x690E,
    0x92C6: 0x69CC,
    0x92C7: 0x8FFD,
    0x92C8: 0x939A,
    0x92C9: 0x75DB,
    0x92CA: 0x901A,
    0x92CB: 0x585A,
    0x92CC: 0x6802,
    0x92CD: 0x63B4,
    0x92CE: 0x69FB,
    0x92CF: 0x4F43,
    0x92D0: 0x6F2C,
    0x92D1: 0x67D8,
    0x92D2: 0x8FBB,
    0x92D3: 0x8526,
    0x92D4: 0x7DB4,
    0x92D5: 0x9354,
    0x92D6: 0x693F,
    0x92D7: 0x6F70,
    0x92D8: 0x576A,
    0x92D9: 0x58F7,
    0x92DA: 0x5B2C,
    0x92DB: 0x7D2C,
    0x92DC: 0x722A,
    0x92DD: 0x540A,
    0x92DE: 0x91E3,
    0x92DF: 0x9DB4,
    0x92E0: 0x4EAD,
    0x92E1: 0x4F4E,
    0x92E2: 0x505C,
    0x92E3: 0x5075,
    0x92E4: 0x5243,
    0x92E5: 0x8C9E,
    0x92E6: 0x5448,
    0x92E7: 0x5824,
    0x92E8: 0x5B9A,
    0x92E9: 0x5E1D,
    0x92EA: 0x5E95,
    0x92EB: 0x5EAD,
    0x92EC: 0x5EF7,
    0x92ED: 0x5F1F,
    0x92EE: 0x608C,
    0x92EF: 0x62B5,
    0x92F0: 0x633A,
    0x92F1: 0x63D0,
    0x92F2: 0x68AF,
    0x92F3: 0x6C40,
    0x92F4: 0x7887,
    0x92F5: 0x798E,
    0x92F6: 0x7A0B,
    0x92F7: 0x7DE0,
    0x92F8: 0x8247,
    0x92F9: 0x8A02,
    0x92FA: 0x8AE6,
    0x92FB: 0x8E44,
    0x92FC: 0x9013,
    0x9340: 0x90B8,
    0x9341: 0x912D,
    0x9342: 0x91D8,
    0x9343: 0x9F0E,
    0x9344: 0x6CE5,
    0x9345: 0x6458,
    0x9346: 0x64E2,
    0x9347: 0x6575,
    0x9348: 0x6EF4,
    0x9349: 0x7684,
    0x934A: 0x7B1B,
    0x934B: 0x9069,
    0x934C: 0x93D1,
    0x934D: 0x6EBA,
    0x934E: 0x54F2,
    0x934F: 0x5FB9,
    0x9350: 0x64A4,
    0x9351: 0x8F4D,
    0x9352: 0x8FED,
    0x9353: 0x9244,
    0x9354: 0x5178,
    0x9355: 0x586B,
    0x9356: 0x5929,
    0x9357: 0x5C55,
    0x9358: 0x5E97,
    0x9359: 0x6DFB,
    0x935A: 0x7E8F,
    0x935B: 0x751C,
    0x935C: 0x8CBC,
    0x935D: 0x8EE2,
    0x935E: 0x985B,
    0x935F: 0x70B9,
    0x9360: 0x4F1D,
    0x9361: 0x6BBF,
    0x9362: 0x6FB1,
    0x9363: 0x7530,
    0x9364: 0x96FB,
    0x9365: 0x514E,
    0x9366: 0x5410,
    0x9367: 0x5835,
    0x9368: 0x5857,
    0x9369: 0x59AC,
    0x936A: 0x5C60,
    0x936B: 0x5F92,
    0x936C: 0x6597,
    0x936D: 0x675C,
    0x936E: 0x6E21,
    0x936F: 0x767B,
    0x9370: 0x83DF,
    0x9371: 0x8CED,
    0x9372: 0x9014,
    0x9373: 0x90FD,
    0x9374: 0x934D,
    0x9375: 0x7825,
    0x9376: 0x783A,
    0x9377: 0x52AA,
    0x9378: 0x5EA6,
    0x9379: 0x571F,
    0x937A: 0x5974,
    0x937B: 0x6012,
    0x937C: 0x5012,
    0x937D: 0x515A,
    0x937E: 0x51AC,
    0x9380: 0x51CD,
    0x9381: 0x5200,
    0x9382: 0x5510,
    0x9383: 0x5854,
    0x9384: 0x5858,
    0x9385: 0x5957,
    0x9386: 0x5B95,
    0x9387: 0x5CF6,
    0x9388: 0x5D8B,
    0x9389: 0x60BC,
    0x938A: 0x6295,
    0x938B: 0x642D,
    0x938C: 0x6771,
    0x938D: 0x6843,
    0x938E: 0x68BC,
    0x938F: 0x68DF,
    0x9390: 0x76D7,
    0x9391: 0x6DD8,
    0x9392: 0x6E6F,
    0x9393: 0x6D9B,
    0x9394: 0x706F,
    0x9395: 0x71C8,
    0x9396: 0x5F53,
    0x9397: 0x75D8,
    0x9398: 0x7977,
    0x9399: 0x7B49,
    0x939A: 0x7B54,
    0x939B: 0x7B52,
    0x939C: 0x7CD6,
    0x939D: 0x7D71,
    0x939E: 0x5230,
    0x939F: 0x8463,
    0x93A0: 0x8569,
    0x93A1: 0x85E4,
    0x93A2: 0x8A0E,
    0x93A3: 0x8B04,
    0x93A4: 0x8C46,
    0x93A5: 0x8E0F,
    0x93A6: 0x9003,
    0x93A7: 0x900F,
    0x93A8: 0x9419,
    0x93A9: 0x9676,
    0x93AA: 0x982D,
    0x93AB: 0x9A30,
    0x93AC: 0x95D8,
    0x93AD: 0x50CD,
    0x93AE: 0x52D5,
    0x93AF: 0x540C,
    0x93B0: 0x5802,
    0x93B1: 0x5C0E,
    0x93B2: 0x61A7,
    0x93B3: 0x649E,
    0x93B4: 0x6D1E,
    0x93B5: 0x77B3,
    0x93B6: 0x7AE5,
    0x93B7: 0x80F4,
    0x93B8: 0x8404,
    0x93B9: 0x9053,
    0x93BA: 0x9285,
    0x93BB: 0x5CE0,
    0x93BC: 0x9D07,
    0x93BD: 0x533F,
    0x93BE: 0x5F97,
    0x93BF: 0x5FB3,
    0x93C0: 0x6D9C,
    0x93C1: 0x7279,
    0x93C2: 0x7763,
    0x93C3: 0x79BF,
    0x93C4: 0x7BE4,
    0x93C5: 0x6BD2,
    0x93C6: 0x72EC,
    0x93C7: 0x8AAD,
    0x93C8: 0x6803,
    0x93C9: 0x6A61,
    0x93CA: 0x51F8,
    0x93CB: 0x7A81,
    0x93CC: 0x6934,
    0x93CD: 0x5C4A,
    0x93CE: 0x9CF6,
    0x93CF: 0x82EB,
    0x93D0: 0x5BC5,
    0x93D1: 0x9149,
    0x93D2: 0x701E,
    0x93D3: 0x5678,
    0x93D4: 0x5C6F,
    0x93D5: 0x60C7,
    0x93D6: 0x6566,
    0x93D7: 0x6C8C,
    0x93D8: 0x8C5A,
    0x93D9: 0x9041,
    0x93DA: 0x9813,
    0x93DB: 0x5451,
    0x93DC: 0x66C7,
    0x93DD: 0x920D,
    0x93DE: 0x5948,
    0x93DF: 0x90A3,
    0x93E0: 0x5185,
    0x93E1: 0x4E4D,
    0x93E2: 0x51EA,
    0x93E3: 0x8599,
    0x93E4: 0x8B0E,
    0x93E5: 0x7058,
    0x93E6: 0x637A,
    0x93E7: 0x934B,
    0x93E8: 0x6962,
    0x93E9: 0x99B4,
    0x93EA: 0x7E04,
    0x93EB: 0x7577,
    0x93EC: 0x5357,
    0x93ED: 0x6960,
    0x93EE: 0x8EDF,
    0x93EF: 0x96E3,
    0x93F0: 0x6C5D,
    0x93F1: 0x4E8C,
    0x93F2: 0x5C3C,
    0x93F3: 0x5F10,
    0x93F4: 0x8FE9,
    0x93F5: 0x5302,
    0x93F6: 0x8CD1,
    0x93F7: 0x8089,
    0x93F8: 0x8679,
    0x93F9: 0x5EFF,
    0x93FA: 0x65E5,
    0x93FB: 0x4E73,
    0x93FC: 0x5165,
    0x9440: 0x5982,
    0x9441: 0x5C3F,
    0x9442: 0x97EE,
    0x9443: 0x4EFB,
    0x9444: 0x598A,
    0x9445: 0x5FCD,
    0x9446: 0x8A8D,
    0x9447: 0x6FE1,
    0x9448: 0x79B0,
    0x9449: 0x7962,
    0x944A: 0x5BE7,
    0x944B: 0x8471,
    0x944C: 0x732B,
    0x944D: 0x71B1,
    0x944E: 0x5E74,
    0x944F: 0x5FF5,
    0x9450: 0x637B,
    0x9451: 0x649A,
    0x9452: 0x71C3,
    0x9453: 0x7C98,
    0x9454: 0x4E43,
    0x9455: 0x5EFC,
    0x9456: 0x4E4B,
    0x9457: 0x57DC,
    0x9458: 0x56A2,
    0x9459: 0x60A9,
    0x945A: 0x6FC3,
    0x945B: 0x7D0D,
    0x945C: 0x80FD,
    0x945D: 0x8133,
    0x945E: 0x81BF,
    0x945F: 0x8FB2,
    0x9460: 0x8997,
    0x9461: 0x86A4,
    0x9462: 0x5DF4,
    0x9463: 0x628A,
    0x9464: 0x64AD,
    0x9465: 0x8987,
    0x9466: 0x6777,
    0x9467: 0x6CE2,
    0x9468: 0x6D3E,
    0x9469: 0x7436,
    0x946A: 0x7834,
    0x946B: 0x5A46,
    0x946C: 0x7F75,
    0x946D: 0x82AD,
    0x946E: 0x99AC,
    0x946F: 0x4FF3,
    0x9470: 0x5EC3,
    0x9471: 0x62DD,
    0x9472: 0x6392,
    0x9473: 0x6557,
    0x9474: 0x676F,
    0x9475: 0x76C3,
    0x9476: 0x724C,
    0x9477: 0x80CC,
    0x9478: 0x80BA,
    0x9479: 0x8F29,
    0x947A: 0x914D,
    0x947B: 0x500D,
    0x947C: 0x57F9,
    0x947D: 0x5A92,
    0x947E: 0x6885,
    0x9480: 0x6973,
    0x9481: 0x7164,
    0x9482: 0x72FD,
    0x9483: 0x8CB7,
    0x9484: 0x58F2,
    0x9485: 0x8CE0,
    0x9486: 0x966A,
    0x9487: 0x9019,
    0x9488: 0x877F,
    0x9489: 0x79E4,
    0x948A: 0x77E7,
    0x948B: 0x8429,
    0x948C: 0x4F2F,
    0x948D: 0x5265,
    0x948E: 0x535A,
    0x948F: 0x62CD,
    0x9490: 0x67CF,
    0x9491: 0x6CCA,
    0x9492: 0x767D,
    0x9493: 0x7B94,
    0x9494: 0x7C95,
    0x9495: 0x8236,
    0x9496: 0x8584,
    0x9497: 0x8FEB,
    0x9498: 0x66DD,
    0x9499: 0x6F20,
    0x949A: 0x7206,
    0x949B: 0x7E1B,
    0x949C: 0x83AB,
    0x949D: 0x99C1,
    0x949E: 0x9EA6,
    0x949F: 0x51FD,
    0x94A0: 0x7BB1,
    0x94A1: 0x7872,
    0x94A2: 0x7BB8,
    0x94A3: 0x8087,
    0x94A4: 0x7B48,
    0x94A5: 0x6AE8,
    0x94A6: 0x5E61,
    0x94A7: 0x808C,
    0x94A8: 0x7551,
    0x94A9: 0x7560,
    0x94AA: 0x516B,
    0x94AB: 0x9262,
    0x94AC: 0x6E8C,
    0x94AD: 0x767A,
    0x94AE: 0x9197,
    0x94AF: 0x9AEA,
    0x94B0: 0x4F10,
    0x94B1: 0x7F70,
    0x94B2: 0x629C,
    0x94B3: 0x7B4F,
    0x94B4: 0x95A5,
    0x94B5: 0x9CE9,
    0x94B6: 0x567A,
    0x94B7: 0x5859,
    0x94B8: 0x86E4,
    0x94B9: 0x96BC,
    0x94BA: 0x4F34,
    0x94BB: 0x5224,
    0x94BC: 0x534A,
    0x94BD: 0x53CD,
    0x94BE: 0x53DB,
    0x94BF: 0x5E06,
    0x94C0: 0x642C,
    0x94C1: 0x6591,
    0x94C2: 0x677F,
    0x94C3: 0x6C3E,
    0x94C4: 0x6C4E,
    0x94C5: 0x7248,
    0x94C6: 0x72AF,
    0x94C7: 0x73ED,
    0x94C8: 0x7554,
    0x94C9: 0x7E41,
    0x94CA: 0x822C,
    0x94CB: 0x85E9,
    0x94CC: 0x8CA9,
    0x94CD: 0x7BC4,
    0x94CE: 0x91C6,
    0x94CF: 0x7169,
    0x94D0: 0x9812,
    0x94D1: 0x98EF,
    0x94D2: 0x633D,
    0x94D3: 0x6669,
    0x94D4: 0x756A,
    0x94D5: 0x76E4,
    0x94D6: 0x78D0,
    0x94D7: 0x8543,
    0x94D8: 0x86EE,
    0x94D9: 0x532A,
    0x94DA: 0x5351,
    0x94DB: 0x5426,
    0x94DC: 0x5983,
    0x94DD: 0x5E87,
    0x94DE: 0x5F7C,
    0x94DF: 0x60B2,
    0x94E0: 0x6249,
    0x94E1: 0x6279,
    0x94E2: 0x62AB,
    0x94E3: 0x6590,
    0x94E4: 0x6BD4,
    0x94E5: 0x6CCC,
    0x94E6: 0x75B2,
    0x94E7: 0x76AE,
    0x94E8: 0x7891,
    0x94E9: 0x79D8,
    0x94EA: 0x7DCB,
    0x94EB: 0x7F77,
    0x94EC: 0x80A5,
    0x94ED: 0x88AB,
    0x94EE: 0x8AB9,
    0x94EF: 0x8CBB,
    0x94F0: 0x907F,
    0x94F1: 0x975E,
    0x94F2: 0x98DB,
    0x94F3: 0x6A0B,
    0x94F4: 0x7C38,
    0x94F5: 0x5099,
    0x94F6: 0x5C3E,
    0x94F7: 0x5FAE,
    0x94F8: 0x6787,
    0x94F9: 0x6BD8,
    0x94FA: 0x7435,
    0x94FB: 0x7709,
    0x94FC: 0x7F8E,
    0x9540: 0x9F3B,
    0x9541: 0x67CA,
    0x9542: 0x7A17,
    0x9543: 0x5339,
    0x9544: 0x758B,
    0x9545: 0x9AED,
    0x9546: 0x5F66,
    0x9547: 0x819D,
    0x9548: 0x83F1,
    0x9549: 0x8098,
    0x954A: 0x5F3C,
    0x954B: 0x5FC5,
    0x954C: 0x7562,
    0x954D: 0x7B46,
    0x954E: 0x903C,
    0x954F: 0x6867,
    0x9550: 0x59EB,
    0x9551: 0x5A9B,
    0x9552: 0x7D10,
    0x9553: 0x767E,
    0x9554: 0x8B2C,
    0x9555: 0x4FF5,
    0x9556: 0x5F6A,
    0x9557: 0x6A19,
    0x9558: 0x6C37,
    0x9559: 0x6F02,
    0x955A: 0x74E2,
    0x955B: 0x7968,
    0x955C: 0x8868,
    0x955D: 0x8A55,
    0x955E: 0x8C79,
    0x955F: 0x5EDF,
    0x9560: 0x63CF,
    0x9561: 0x75C5,
    0x9562: 0x79D2,
    0x9563: 0x82D7,
    0x9564: 0x9328,
    0x9565: 0x92F2,
    0x9566: 0x849C,
    0x9567: 0x86ED,
    0x9568: 0x9C2D,
    0x9569: 0x54C1,
    0x956A: 0x5F6C,
    0x956B: 0x658C,
    0x956C: 0x6D5C,
    0x956D: 0x7015,
    0x956E: 0x8CA7,
    0x956F: 0x8CD3,
    0x9570: 0x983B,
    0x9571: 0x654F,
    0x9572: 0x74F6,
    0x9573: 0x4E0D,
    0x9574: 0x4ED8,
    0x9575: 0x57E0,
    0x9576: 0x592B,
    0x9577: 0x5A66,
    0x9578: 0x5BCC,
    0x9579: 0x51A8,
    0x957A: 0x5E03,
    0x957B: 0x5E9C,
    0x957C: 0x6016,
    0x957D: 0x6276,
    0x957E: 0x6577,
    0x9580: 0x65A7,
    0x9581: 0x666E,
    0x9582: 0x6D6E,
    0x9583: 0x7236,
    0x9584: 0x7B26,
    0x9585: 0x8150,
    0x9586: 0x819A,
    0x9587: 0x8299,
    0x9588: 0x8B5C,
    0x9589: 0x8CA0,
    0x958A: 0x8CE6,
    0x958B: 0x8D74,
    0x958C: 0x961C,
    0x958D: 0x9644,
    0x958E: 0x4FAE,
    0x958F: 0x64AB,
    0x9590: 0x6B66,
    0x9591: 0x821E,
    0x9592: 0x8461,
    0x9593: 0x856A,
    0x9594: 0x90E8,
    0x9595: 0x5C01,
    0x9596: 0x6953,
    0x9597: 0x98A8,
    0x9598: 0x847A,
    0x9599: 0x8557,
    0x959A: 0x4F0F,
    0x959B: 0x526F,
    0x959C: 0x5FA9,
    0x959D: 0x5E45,
    0x959E: 0x670D,
    0x959F: 0x798F,
    0x95A0: 0x8179,
    0x95A1: 0x8907,
    0x95A2: 0x8986,
    0x95A3: 0x6DF5,
    0x95A4: 0x5F17,
    0x95A5: 0x6255,
    0x95A6: 0x6CB8,
    0x95A7: 0x4ECF,
    0x95A8: 0x7269,
    0x95A9: 0x9B92,
    0x95AA: 0x5206,
    0x95AB: 0x543B,
    0x95AC: 0x5674,
    0x95AD: 0x58B3,
    0x95AE: 0x61A4,
    0x95AF: 0x626E,
    0x95B0: 0x711A,
    0x95B1: 0x596E,
    0x95B2: 0x7C89,
    0x95B3: 0x7CDE,
    0x95B4: 0x7D1B,
    0x95B5: 0x96F0,
    0x95B6: 0x6587,
    0x95B7: 0x805E,
    0x95B8: 0x4E19,
    0x95B9: 0x4F75,
    0x95BA: 0x5175,
    0x95BB: 0x5840,
    0x95BC: 0x5E63,
    0x95BD: 0x5E73,
    0x95BE: 0x5F0A,
    0x95BF: 0x67C4,
    0x95C0: 0x4E26,
    0x95C1: 0x853D,
    0x95C2: 0x9589,
    0x95C3: 0x965B,
    0x95C4: 0x7C73,
    0x95C5: 0x9801,
    0x95C6: 0x50FB,
    0x95C7: 0x58C1,
    0x95C8: 0x7656,
    0x95C9: 0x78A7,
    0x95CA: 0x5225,
    0x95CB: 0x77A5,
    0x95CC: 0x8511,
    0x95CD: 0x7B86,
    0x95CE: 0x504F,
    0x95CF: 0x5909,
    0x95D0: 0x7247,
    0x95D1: 0x7BC7,
    0x95D2: 0x7DE8,
    0x95D3: 0x8FBA,
    0x95D4: 0x8FD4,
    0x95D5: 0x904D,
    0x95D6: 0x4FBF,
    0x95D7: 0x52C9,
    0x95D8: 0x5A29,
    0x95D9: 0x5F01,
    0x95DA: 0x97AD,
    0x95DB: 0x4FDD,
    0x95DC: 0x8217,
    0x95DD: 0x92EA,
    0x95DE: 0x5703,
    0x95DF: 0x6355,
    0x95E0: 0x6B69,
    0x95E1: 0x752B,
    0x95E2: 0x88DC,
    0x95E3: 0x8F14,
    0x95E4: 0x7A42,
    0x95E5: 0x52DF,
    0x95E6: 0x5893,
    0x95E7: 0x6155,
    0x95E8: 0x620A,
    0x95E9: 0x66AE,
    0x95EA: 0x6BCD,
    0x95EB: 0x7C3F,
    0x95EC: 0x83E9,
    0x95ED: 0x5023,
    0x95EE: 0x4FF8,
    0x95EF: 0x5305,
    0x95F0: 0x5446,
    0x95F1: 0x5831,
    0x95F2: 0x5949,
    0x95F3: 0x5B9D,
    0x95F4: 0x5CF0,
    0x95F5: 0x5CEF,
    0x95F6: 0x5D29,
    0x95F7: 0x5E96,
    0x95F8: 0x62B1,
    0x95F9: 0x6367,
    0x95FA: 0x653E,
    0x95FB: 0x65B9,
    0x95FC: 0x670B,
    0x9640: 0x6CD5,
    0x9641: 0x6CE1,
    0x9642: 0x70F9,
    0x9643: 0x7832,
    0x9644: 0x7E2B,
    0x9645: 0x80DE,
    0x9646: 0x82B3,
    0x9647: 0x840C,
    0x9648: 0x84EC,
    0x9649: 0x8702,
    0x964A: 0x8912,
    0x964B: 0x8A2A,
    0x964C: 0x8C4A,
    0x964D: 0x90A6,
    0x964E: 0x92D2,
    0x964F: 0x98FD,
    0x9650: 0x9CF3,
    0x9651: 0x9D6C,
    0x9652: 0x4E4F,
    0x9653: 0x4EA1,
    0x9654: 0x508D,
    0x9655: 0x5256,
    0x9656: 0x574A,
    0x9657: 0x59A8,
    0x9658: 0x5E3D,
    0x9659: 0x5FD8,
    0x965A: 0x5FD9,
    0x965B: 0x623F,
    0x965C: 0x66B4,
    0x965D: 0x671B,
    0x965E: 0x67D0,
    0x965F: 0x68D2,
    0x9660: 0x5192,
    0x9661: 0x7D21,
    0x9662: 0x80AA,
    0x9663: 0x81A8,
    0x9664: 0x8B00,
    0x9665: 0x8C8C,
    0x9666: 0x8CBF,
    0x9667: 0x927E,
    0x9668: 0x9632,
    0x9669: 0x5420,
    0x966A: 0x982C,
    0x966B: 0x5317,
    0x966C: 0x50D5,
    0x966D: 0x535C,
    0x966E: 0x58A8,
    0x966F: 0x64B2,
    0x9670: 0x6734,
    0x9671: 0x7267,
    0x9672: 0x7766,
    0x9673: 0x7A46,
    0x9674: 0x91E6,
    0x9675: 0x52C3,
    0x9676: 0x6CA1,
    0x9677: 0x6B86,
    0x9678: 0x5800,
    0x9679: 0x5E4C,
    0x967A: 0x5954,
    0x967B: 0x672C,
    0x967C: 0x7FFB,
    0x967D: 0x51E1,
    0x967E: 0x76C6,
    0x9680: 0x6469,
    0x9681: 0x78E8,
    0x9682: 0x9B54,
    0x9683: 0x9EBB,
    0x9684: 0x57CB,
    0x9685: 0x59B9,
    0x9686: 0x6627,
    0x9687: 0x679A,
    0x9688: 0x6BCE,
    0x9689: 0x54E9,
    0x968A: 0x69D9,
    0x968B: 0x5E55,
    0x968C: 0x819C,
    0x968D: 0x6795,
    0x968E: 0x9BAA,
    0x968F: 0x67FE,
    0x9690: 0x9C52,
    0x9691: 0x685D,
    0x9692: 0x4EA6,
    0x9693: 0x4FE3,
    0x9694: 0x53C8,
    0x9695: 0x62B9,
    0x9696: 0x672B,
    0x9697: 0x6CAB,
    0x9698: 0x8FC4,
    0x9699: 0x4FAD,
    0x969A: 0x7E6D,
    0x969B: 0x9EBF,
    0x969C: 0x4E07,
    0x969D: 0x6162,
    0x969E: 0x6E80,
    0x969F: 0x6F2B,
    0x96A0: 0x8513,
    0x96A1: 0x5473,
    0x96A2: 0x672A,
    0x96A3: 0x9B45,
    0x96A4: 0x5DF3,
    0x96A5: 0x7B95,
    0x96A6: 0x5CAC,
    0x96A7: 0x5BC6,
    0x96A8: 0x871C,
    0x96A9: 0x6E4A,
    0x96AA: 0x84D1,
    0x96AB: 0x7A14,
    0x96AC: 0x8108,
    0x96AD: 0x5999,
    0x96AE: 0x7C8D,
    0x96AF: 0x6C11,
    0x96B0: 0x7720,
    0x96B1: 0x52D9,
    0x96B2: 0x5922,
    0x96B3: 0x7121,
    0x96B4: 0x725F,
    0x96B5: 0x77DB,
    0x96B6: 0x9727,
    0x96B7: 0x9D61,
    0x96B8: 0x690B,
    0x96B9: 0x5A7F,
    0x96BA: 0x5A18,
    0x96BB: 0x51A5,
    0x96BC: 0x540D,
    0x96BD: 0x547D,
    0x96BE: 0x660E,
    0x96BF: 0x76DF,
    0x96C0: 0x8FF7,
    0x96C1: 0x9298,
    0x96C2: 0x9CF4,
    0x96C3: 0x59EA,
    0x96C4: 0x725D,
    0x96C5: 0x6EC5,
    0x96C6: 0x514D,
    0x96C7: 0x68C9,
    0x96C8: 0x7DBF,
    0x96C9: 0x7DEC,
    0x96CA: 0x9762,
    0x96CB: 0x9EBA,
    0x96CC: 0x6478,
    0x96CD: 0x6A21,
    0x96CE: 0x8302,
    0x96CF: 0x5984,
    0x96D0: 0x5B5F,
    0x96D1: 0x6BDB,
    0x96D2: 0x731B,
    0x96D3: 0x76F2,
    0x96D4: 0x7DB2,
    0x96D5: 0x8017,
    0x96D6: 0x8499,
    0x96D7: 0x5132,
    0x96D8: 0x6728,
    0x96D9: 0x9ED9,
    0x96DA: 0x76EE,
    0x96DB: 0x6762,
    0x96DC: 0x52FF,
    0x96DD: 0x9905,
    0x96DE: 0x5C24,
    0x96DF: 0x623B,
    0x96E0: 0x7C7E,
    0x96E1: 0x8CB0,
    0x96E2: 0x554F,
    0x96E3: 0x60B6,
    0x96E4: 0x7D0B,
    0x96E5: 0x9580,
    0x96E6: 0x5301,
    0x96E7: 0x4E5F,
    0x96E8: 0x51B6,
    0x96E9: 0x591C,
    0x96EA: 0x723A,
    0x96EB: 0x8036,
    0x96EC: 0x91CE,
    0x96ED: 0x5F25,
    0x96EE: 0x77E2,
    0x96EF: 0x5384,
    0x96F0: 0x5F79,
    0x96F1: 0x7D04,
    0x96F2: 0x85AC,
    0x96F3: 0x8A33,
    0x96F4: 0x8E8D,
    0x96F5: 0x9756,
    0x96F6: 0x67F3,
    0x96F7: 0x85AE,
    0x96F8: 0x9453,
    0x96F9: 0x6109,
    0x96FA: 0x6108,
    0x96FB: 0x6CB9,
    0x96FC: 0x7652,
    0x9740: 0x8AED,
    0x9741: 0x8F38,
    0x9742: 0x552F,
    0x9743: 0x4F51,
    0x9744: 0x512A,
    0x9745: 0x52C7,
    0x9746: 0x53CB,
    0x9747: 0x5BA5,
    0x9748: 0x5E7D,
    0x9749: 0x60A0,
    0x974A: 0x6182,
    0x974B: 0x63D6,
    0x974C: 0x6709,
    0x974D: 0x67DA,
    0x974E: 0x6E67,
    0x974F: 0x6D8C,
    0x9750: 0x7336,
    0x9751: 0x7337,
    0x9752: 0x7531,
    0x9753: 0x7950,
    0x9754: 0x88D5,
    0x9755: 0x8A98,
    0x9756: 0x904A,
    0x9757: 0x9091,
    0x9758: 0x90F5,
    0x9759: 0x96C4,
    0x975A: 0x878D,
    0x975B: 0x5915,
    0x975C: 0x4E88,
    0x975D: 0x4F59,
    0x975E: 0x4E0E,
    0x975F: 0x8A89,
    0x9760: 0x8F3F,
    0x9761: 0x9810,
    0x9762: 0x50AD,
    0x9763: 0x5E7C,
    0x9764: 0x5996,
    0x9765: 0x5BB9,
    0x9766: 0x5EB8,
    0x9767: 0x63DA,
    0x9768: 0x63FA,
    0x9769: 0x64C1,
    0x976A: 0x66DC,
    0x976B: 0x694A,
    0x976C: 0x69D8,
    0x976D: 0x6D0B,
    0x976E: 0x6EB6,
    0x976F: 0x7194,
    0x9770: 0x7528,
    0x9771: 0x7AAF,
    0x9772: 0x7F8A,
    0x9773: 0x8000,
    0x9774: 0x8449,
    0x9775: 0x84C9,
    0x9776: 0x8981,
    0x9777: 0x8B21,
    0x9778: 0x8E0A,
    0x9779: 0x9065,
    0x977A: 0x967D,
    0x977B: 0x990A,
    0x977C: 0x617E,
    0x977D: 0x6291,
    0x977E: 0x6B32,
    0x9780: 0x6C83,
    0x9781: 0x6D74,
    0x9782: 0x7FCC,
    0x9783: 0x7FFC,
    0x9784: 0x6DC0,
    0x9785: 0x7F85,
    0x9786: 0x87BA,
    0x9787: 0x88F8,
    0x9788: 0x6765,
    0x9789: 0x83B1,
    0x978A: 0x983C,
    0x978B: 0x96F7,
    0x978C: 0x6D1B,
    0x978D: 0x7D61,
    0x978E: 0x843D,
    0x978F: 0x916A,
    0x9790: 0x4E71,
    0x9791: 0x5375,
    0x9792: 0x5D50,
    0x9793: 0x6B04,
    0x9794: 0x6FEB,
    0x9795: 0x85CD,
    0x9796: 0x862D,
    0x9797: 0x89A7,
    0x9798: 0x5229,
    0x9799: 0x540F,
    0x979A: 0x5C65,
    0x979B: 0x674E,
    0x979C: 0x68A8,
    0x979D: 0x7406,
    0x979E: 0x7483,
    0x979F: 0x75E2,
    0x97A0: 0x88CF,
    0x97A1: 0x88E1,
    0x97A2: 0x91CC,
    0x97A3: 0x96E2,
    0x97A4: 0x9678,
    0x97A5: 0x5F8B,
    0x97A6: 0x7387,
    0x97A7: 0x7ACB,
    0x97A8: 0x844E,
    0x97A9: 0x63A0,
    0x97AA: 0x7565,
    0x97AB: 0x5289,
    0x97AC: 0x6D41,
    0x97AD: 0x6E9C,
    0x97AE: 0x7409,
    0x97AF: 0x7559,
    0x97B0: 0x786B,
    0x97B1: 0x7C92,
    0x97B2: 0x9686,
    0x97B3: 0x7ADC,
    0x97B4: 0x9F8D,
    0x97B5: 0x4FB6,
    0x97B6: 0x616E,
    0x97B7: 0x65C5,
    0x97B8: 0x865C,
    0x97B9: 0x4E86,
    0x97BA: 0x4EAE,
    0x97BB: 0x50DA,
    0x97BC: 0x4E21,
    0x97BD: 0x51CC,
    0x97BE: 0x5BEE,
    0x97BF: 0x6599,
    0x97C0: 0x6881,
    0x97C1: 0x6DBC,
    0x97C2: 0x731F,
    0x97C3: 0x7642,
    0x97C4: 0x77AD,
    0x97C5: 0x7A1C,
    0x97C6: 0x7CE7,
    0x97C7: 0x826F,
    0x97C8: 0x8AD2,
    0x97C9: 0x907C,
    0x97CA: 0x91CF,
    0x97CB: 0x9675,
    0x97CC: 0x9818,
    0x97CD: 0x529B,
    0x97CE: 0x7DD1,
    0x97CF: 0x502B,
    0x97D0: 0x5398,
    0x97D1: 0x6797,
    0x97D2: 0x6DCB,
    0x97D3: 0x71D0,
    0x97D4: 0x7433,
    0x97D5: 0x81E8,
    0x97D6: 0x8F2A,
    0x97D7: 0x96A3,
    0x97D8: 0x9C57,
    0x97D9: 0x9E9F,
    0x97DA: 0x7460,
    0x97DB: 0x5841,
    0x97DC: 0x6D99,
    0x97DD: 0x7D2F,
    0x97DE: 0x985E,
    0x97DF: 0x4EE4,
    0x97E0: 0x4F36,
    0x97E1: 0x4F8B,
    0x97E2: 0x51B7,
    0x97E3: 0x52B1,
    0x97E4: 0x5DBA,
    0x97E5: 0x601C,
    0x97E6: 0x73B2,
    0x97E7: 0x793C,
    0x97E8: 0x82D3,
    0x97E9: 0x9234,
    0x97EA: 0x96B7,
    0x97EB: 0x96F6,
    0x97EC: 0x970A,
    0x97ED: 0x9E97,
    0x97EE: 0x9F62,
    0x97EF: 0x66A6,
    0x97F0: 0x6B74,
    0x97F1: 0x5217,
    0x97F2: 0x52A3,
    0x97F3: 0x70C8,
    0x97F4: 0x88C2,
    0x97F5: 0x5EC9,
    0x97F6: 0x604B,
    0x97F7: 0x6190,
    0x97F8: 0x6F23,
    0x97F9: 0x7149,
    0x97FA: 0x7C3E,
    0x97FB: 0x7DF4,
    0x97FC: 0x806F,
    0x9840: 0x84EE,
    0x9841: 0x9023,
    0x9842: 0x932C,
    0x9843: 0x5442,
    0x9844: 0x9B6F,
    0x9845: 0x6AD3,
    0x9846: 0x7089,
    0x9847: 0x8CC2,
    0x9848: 0x8DEF,
    0x9849: 0x9732,
    0x984A: 0x52B4,
    0x984B: 0x5A41,
    0x984C: 0x5ECA,
    0x984D: 0x5F04,
    0x984E: 0x6717,
    0x984F: 0x697C,
    0x9850: 0x6994,
    0x9851: 0x6D6A,
    0x9852: 0x6F0F,
    0x9853: 0x7262,
    0x9854: 0x72FC,
    0x9855: 0x7BED,
    0x9856: 0x8001,
    0x9857: 0x807E,
    0x9858: 0x874B,
    0x9859: 0x90CE,
    0x985A: 0x516D,
    0x985B: 0x9E93,
    0x985C: 0x7984,
    0x985D: 0x808B,
    0x985E: 0x9332,
    0x985F: 0x8AD6,
    0x9860: 0x502D,
    0x9861: 0x548C,
    0x9862: 0x8A71,
    0x9863: 0x6B6A,
    0x9864: 0x8CC4,
    0x9865: 0x8107,
    0x9866: 0x60D1,
    0x9867: 0x67A0,
    0x9868: 0x9DF2,
    0x9869: 0x4E99,
    0x986A: 0x4E98,
    0x986B: 0x9C10,
    0x986C: 0x8A6B,
    0x986D: 0x85C1,
    0x986E: 0x8568,
    0x986F: 0x6900,
    0x9870: 0x6E7E,
    0x9871: 0x7897,
    0x9872: 0x8155,
    0x989F: 0x5F0C,
    0x98A0: 0x4E10,
    0x98A1: 0x4E15,
    0x98A2: 0x4E2A,
    0x98A3: 0x4E31,
    0x98A4: 0x4E36,
    0x98A5: 0x4E3C,
    0x98A6: 0x4E3F,
    0x98A7: 0x4E42,
    0x98A8: 0x4E56,
    0x98A9: 0x4E58,
    0x98AA: 0x4E82,
    0x98AB: 0x4E85,
    0x98AC: 0x8C6B,
    0x98AD: 0x4E8A,
    0x98AE: 0x8212,
    0x98AF: 0x5F0D,
    0x98B0: 0x4E8E,
    0x98B1: 0x4E9E,
    0x98B2: 0x4E9F,
    0x98B3: 0x4EA0,
    0x98B4: 0x4EA2,
    0x98B5: 0x4EB0,
    0x98B6: 0x4EB3,
    0x98B7: 0x4EB6,
    0x98B8: 0x4ECE,
    0x98B9: 0x4ECD,
    0x98BA: 0x4EC4,
    0x98BB: 0x4EC6,
    0x98BC: 0x4EC2,
    0x98BD: 0x4ED7,
    0x98BE: 0x4EDE,
    0x98BF: 0x4EED,
    0x98C0: 0x4EDF,
    0x98C1: 0x4EF7,
    0x98C2: 0x4F09,
    0x98C3: 0x4F5A,
    0x98C4: 0x4F30,
    0x98C5: 0x4F5B,
    0x98C6: 0x4F5D,
    0x98C7: 0x4F57,
    0x98C8: 0x4F47,
    0x98C9: 0x4F76,
    0x98CA: 0x4F88,
    0x98CB: 0x4F8F,
    0x98CC: 0x4F98,
    0x98CD: 0x4F7B,
    0x98CE: 0x4F69,
    0x98CF: 0x4F70,
    0x98D0: 0x4F91,
    0x98D1: 0x4F6F,
    0x98D2: 0x4F86,
    0x98D3: 0x4F96,
    0x98D4: 0x5118,
    0x98D5: 0x4FD4,
    0x98D6: 0x4FDF,
    0x98D7: 0x4FCE,
    0x98D8: 0x4FD8,
    0x98D9: 0x4FDB,
    0x98DA: 0x4FD1,
    0x98DB: 0x4FDA,
    0x98DC: 0x4FD0,
    0x98DD: 0x4FE4,
    0x98DE: 0x4FE5,
    0x98DF: 0x501A,
    0x98E0: 0x5028,
    0x98E1: 0x5014,
    0x98E2: 0x502A,
    0x98E3: 0x5025,
    0x98E4: 0x5005,
    0x98E5: 0x4F1C,
    0x98E6: 0x4FF6,
    0x98E7: 0x5021,
    0x98E8: 0x5029,
    0x98E9: 0x502C,
    0x98EA: 0x4FFE,
    0x98EB: 0x4FEF,
    0x98EC: 0x5011,
    0x98ED: 0x5006,
    0x98EE: 0x5043,
    0x98EF: 0x5047,
    0x98F0: 0x6703,
    0x98F1: 0x5055,
    0x98F2: 0x5050,
    0x98F3: 0x5048,
    0x98F4: 0x505A,
    0x98F5: 0x5056,
    0x98F6: 0x506C,
    0x98F7: 0x5078,
    0x98F8: 0x5080,
    0x98F9: 0x509A,
    0x98FA: 0x5085,
    0x98FB: 0x50B4,
    0x98FC: 0x50B2,
    0x9940: 0x50C9,
    0x9941: 0x50CA,
    0x9942: 0x50B3,
    0x9943: 0x50C2,
    0x9944: 0x50D6,
    0x9945: 0x50DE,
    0x9946: 0x50E5,
    0x9947: 0x50ED,
    0x9948: 0x50E3,
    0x9949: 0x50EE,
    0x994A: 0x50F9,
    0x994B: 0x50F5,
    0x994C: 0x5109,
    0x994D: 0x5101,
    0x994E: 0x5102,
    0x994F: 0x5116,
    0x9950: 0x5115,
    0x9951: 0x5114,
    0x9952: 0x511A,
    0x9953: 0x5121,
    0x9954: 0x513A,
    0x9955: 0x5137,
    0x9956: 0x513C,
    0x9957: 0x513B,
    0x9958: 0x513F,
    0x9959: 0x5140,
    0x995A: 0x5152,
    0x995B: 0x514C,
    0x995C: 0x5154,
    0x995D: 0x5162,
    0x995E: 0x7AF8,
    0x995F: 0x5169,
    0x9960: 0x516A,
    0x9961: 0x516E,
    0x9962: 0x5180,
    0x9963: 0x5182,
    0x9964: 0x56D8,
    0x9965: 0x518C,
    0x9966: 0x5189,
    0x9967: 0x518F,
    0x9968: 0x5191,
    0x9969: 0x5193,
    0x996A: 0x5195,
    0x996B: 0x5196,
    0x996C: 0x51A4,
    0x996D: 0x51A6,
    0x996E: 0x51A2,
    0x996F: 0x51A9,
    0x9970: 0x51AA,
    0x9971: 0x51AB,
    0x9972: 0x51B3,
    0x9973: 0x51B1,
    0x9974: 0x51B2,
    0x9975: 0x51B0,
    0x9976: 0x51B5,
    0x9977: 0x51BD,
    0x9978: 0x51C5,
    0x9979: 0x51C9,
    0x997A: 0x51DB,
    0x997B: 0x51E0,
    0x997C: 0x8655,
    0x997D: 0x51E9,
    0x997E: 0x51ED,
    0x9980: 0x51F0,
    0x9981: 0x51F5,
    0x9982: 0x51FE,
    0x9983: 0x5204,
    0x9984: 0x520B,
    0x9985: 0x5214,
    0x9986: 0x520E,
    0x9987: 0x5227,
    0x9988: 0x522A,
    0x9989: 0x522E,
    0x998A: 0x5233,
    0x998B: 0x5239,
    0x998C: 0x524F,
    0x998D: 0x5244,
    0x998E: 0x524B,
    0x998F: 0x524C,
    0x9990: 0x525E,
    0x9991: 0x5254,
    0x9992: 0x526A,
    0x9993: 0x5274,
    0x9994: 0x5269,
    0x9995: 0x5273,
    0x9996: 0x527F,
    0x9997: 0x527D,
    0x9998: 0x528D,
    0x9999: 0x5294,
    0x999A: 0x5292,
    0x999B: 0x5271,
    0x999C: 0x5288,
    0x999D: 0x5291,
    0x999E: 0x8FA8,
    0x999F: 0x8FA7,
    0x99A0: 0x52AC,
    0x99A1: 0x52AD,
    0x99A2: 0x52BC,
    0x99A3: 0x52B5,
    0x99A4: 0x52C1,
    0x99A5: 0x52CD,
    0x99A6: 0x52D7,
    0x99A7: 0x52DE,
    0x99A8: 0x52E3,
    0x99A9: 0x52E6,
    0x99AA: 0x98ED,
    0x99AB: 0x52E0,
    0x99AC: 0x52F3,
    0x99AD: 0x52F5,
    0x99AE: 0x52F8,
    0x99AF: 0x52F9,
    0x99B0: 0x5306,
    0x99B1: 0x5308,
    0x99B2: 0x7538,
    0x99B3: 0x530D,
    0x99B4: 0x5310,
    0x99B5: 0x530F,
    0x99B6: 0x5315,
    0x99B7: 0x531A,
    0x99B8: 0x5323,
    0x99B9: 0x532F,
    0x99BA: 0x5331,
    0x99BB: 0x5333,
    0x99BC: 0x5338,
    0x99BD: 0x5340,
    0x99BE: 0x5346,
    0x99BF: 0x5345,
    0x99C0: 0x4E17,
    0x99C1: 0x5349,
    0x99C2: 0x534D,
    0x99C3: 0x51D6,
    0x99C4: 0x535E,
    0x99C5: 0x5369,
    0x99C6: 0x536E,
    0x99C7: 0x5918,
    0x99C8: 0x537B,
    0x99C9: 0x5377,
    0x99CA: 0x5382,
    0x99CB: 0x5396,
    0x99CC: 0x53A0,
    0x99CD: 0x53A6,
    0x99CE: 0x53A5,
    0x99CF: 0x53AE,
    0x99D0: 0x53B0,
    0x99D1: 0x53B6,
    0x99D2: 0x53C3,
    0x99D3: 0x7C12,
    0x99D4: 0x96D9,
    0x99D5: 0x53DF,
    0x99D6: 0x66FC,
    0x99D7: 0x71EE,
    0x99D8: 0x53EE,
    0x99D9: 0x53E8,
    0x99DA: 0x53ED,
    0x99DB: 0x53FA,
    0x99DC: 0x5401,
    0x99DD: 0x543D,
    0x99DE: 0x5440,
    0x99DF: 0x542C,
    0x99E0: 0x542D,
    0x99E1: 0x543C,
    0x99E2: 0x542E,
    0x99E3: 0x5436,
    0x99E4: 0x5429,
    0x99E5: 0x541D,
    0x99E6: 0x544E,
    0x99E7: 0x548F,
    0x99E8: 0x5475,
    0x99E9: 0x548E,
    0x99EA: 0x545F,
    0x99EB: 0x5471,
    0x99EC: 0x5477,
    0x99ED: 0x5470,
    0x99EE: 0x5492,
    0x99EF: 0x547B,
    0x99F0: 0x5480,
    0x99F1: 0x5476,
    0x99F2: 0x5484,
    0x99F3: 0x5490,
    0x99F4: 0x5486,
    0x99F5: 0x54C7,
    0x99F6: 0x54A2,
    0x99F7: 0x54B8,
    0x99F8: 0x54A5,
    0x99F9: 0x54AC,
    0x99FA: 0x54C4,
    0x99FB: 0x54C8,
    0x99FC: 0x54A8,
    0x9A40: 0x54AB,
    0x9A41: 0x54C2,
    0x9A42: 0x54A4,
    0x9A43: 0x54BE,
    0x9A44: 0x54BC,
    0x9A45: 0x54D8,
    0x9A46: 0x54E5,
    0x9A47: 0x54E6,
    0x9A48: 0x550F,
    0x9A49: 0x5514,
    0x9A4A: 0x54FD,
    0x9A4B: 0x54EE,
    0x9A4C: 0x54ED,
    0x9A4D: 0x54FA,
    0x9A4E: 0x54E2,
    0x9A4F: 0x5539,
    0x9A50: 0x5540,
    0x9A51: 0x5563,
    0x9A52: 0x554C,
    0x9A53: 0x552E,
    0x9A54: 0x555C,
    0x9A55: 0x5545,
    0x9A56: 0x5556,
    0x9A57: 0x5557,
    0x9A58: 0x5538,
    0x9A59: 0x5533,
    0x9A5A: 0x555D,
    0x9A5B: 0x5599,
    0x9A5C: 0x5580,
    0x9A5D: 0x54AF,
    0x9A5E: 0x558A,
    0x9A5F: 0x559F,
    0x9A60: 0x557B,
    0x9A61: 0x557E,
    0x9A62: 0x5598,
    0x9A63: 0x559E,
    0x9A64: 0x55AE,
    0x9A65: 0x557C,
    0x9A66: 0x5583,
    0x9A67: 0x55A9,
    0x9A68: 0x5587,
    0x9A69: 0x55A8,
    0x9A6A: 0x55DA,
    0x9A6B: 0x55C5,
    0x9A6C: 0x55DF,
    0x9A6D: 0x55C4,
    0x9A6E: 0x55DC,
    0x9A6F: 0x55E4,
    0x9A70: 0x55D4,
    0x9A71: 0x5614,
    0x9A72: 0x55F7,
    0x9A73: 0x5616,
    0x9A74: 0x55FE,
    0x9A75: 0x55FD,
    0x9A76: 0x561B,
    0x9A77: 0x55F9,
    0x9A78: 0x564E,
    0x9A79: 0x5650,
    0x9A7A: 0x71DF,
    0x9A7B: 0x5634,
    0x9A7C: 0x5636,
    0x9A7D: 0x5632,
    0x9A7E: 0x5638,
    0x9A80: 0x566B,
    0x9A81: 0x5664,
    0x9A82: 0x562F,
    0x9A83: 0x566C,
    0x9A84: 0x566A,
    0x9A85: 0x5686,
    0x9A86: 0x5680,
    0x9A87: 0x568A,
    0x9A88: 0x56A0,
    0x9A89: 0x5694,
    0x9A8A: 0x568F,
    0x9A8B: 0x56A5,
    0x9A8C: 0x56AE,
    0x9A8D: 0x56B6,
    0x9A8E: 0x56B4,
    0x9A8F: 0x56C2,
    0x9A90: 0x56BC,
    0x9A91: 0x56C1,
    0x9A92: 0x56C3,
    0x9A93: 0x56C0,
    0x9A94: 0x56C8,
    0x9A95: 0x56CE,
    0x9A96: 0x56D1,
    0x9A97: 0x56D3,
    0x9A98: 0x56D7,
    0x9A99: 0x56EE,
    0x9A9A: 0x56F9,
    0x9A9B: 0x5700,
    0x9A9C: 0x56FF,
    0x9A9D: 0x5704,
    0x9A9E: 0x5709,
    0x9A9F: 0x5708,
    0x9AA0: 0x570B,
    0x9AA1: 0x570D,
    0x9AA2: 0x5713,
    0x9AA3: 0x5718,
    0x9AA4: 0x5716,
    0x9AA5: 0x55C7,
    0x9AA6: 0x571C,
    0x9AA7: 0x5726,
    0x9AA8: 0x5737,
    0x9AA9: 0x5738,
    0x9AAA: 0x574E,
    0x9AAB: 0x573B,
    0x9AAC: 0x5740,
    0x9AAD: 0x574F,
    0x9AAE: 0x5769,
    0x9AAF: 0x57C0,
    0x9AB0: 0x5788,
    0x9AB1: 0x5761,
    0x9AB2: 0x577F,
    0x9AB3: 0x5789,
    0x9AB4: 0x5793,
    0x9AB5: 0x57A0,
    0x9AB6: 0x57B3,
    0x9AB7: 0x57A4,
    0x9AB8: 0x57AA,
    0x9AB9: 0x57B0,
    0x9ABA: 0x57C3,
    0x9ABB: 0x57C6,
    0x9ABC: 0x57D4,
    0x9ABD: 0x57D2,
    0x9ABE: 0x57D3,
    0x9ABF: 0x580A,
    0x9AC0: 0x57D6,
    0x9AC1: 0x57E3,
    0x9AC2: 0x580B,
    0x9AC3: 0x5819,
    0x9AC4: 0x581D,
    0x9AC5: 0x5872,
    0x9AC6: 0x5821,
    0x9AC7: 0x5862,
    0x9AC8: 0x584B,
    0x9AC9: 0x5870,
    0x9ACA: 0x6BC0,
    0x9ACB: 0x5852,
    0x9ACC: 0x583D,
    0x9ACD: 0x5879,
    0x9ACE: 0x5885,
    0x9ACF: 0x58B9,
    0x9AD0: 0x589F,
    0x9AD1: 0x58AB,
    0x9AD2: 0x58BA,
    0x9AD3: 0x58DE,
    0x9AD4: 0x58BB,
    0x9AD5: 0x58B8,
    0x9AD6: 0x58AE,
    0x9AD7: 0x58C5,
    0x9AD8: 0x58D3,
    0x9AD9: 0x58D1,
    0x9ADA: 0x58D7,
    0x9ADB: 0x58D9,
    0x9ADC: 0x58D8,
    0x9ADD: 0x58E5,
    0x9ADE: 0x58DC,
    0x9ADF: 0x58E4,
    0x9AE0: 0x58DF,
    0x9AE1: 0x58EF,
    0x9AE2: 0x58FA,
    0x9AE3: 0x58F9,
    0x9AE4: 0x58FB,
    0x9AE5: 0x58FC,
    0x9AE6: 0x58FD,
    0x9AE7: 0x5902,
    0x9AE8: 0x590A,
    0x9AE9: 0x5910,
    0x9AEA: 0x591B,
    0x9AEB: 0x68A6,
    0x9AEC: 0x5925,
    0x9AED: 0x592C,
    0x9AEE: 0x592D,
    0x9AEF: 0x5932,
    0x9AF0: 0x5938,
    0x9AF1: 0x593E,
    0x9AF2: 0x7AD2,
    0x9AF3: 0x5955,
    0x9AF4: 0x5950,
    0x9AF5: 0x594E,
    0x9AF6: 0x595A,
    0x9AF7: 0x5958,
    0x9AF8: 0x5962,
    0x9AF9: 0x5960,
    0x9AFA: 0x5967,
    0x9AFB: 0x596C,
    0x9AFC: 0x5969,
    0x9B40: 0x5978,
    0x9B41: 0x5981,
    0x9B42: 0x599D,
    0x9B43: 0x4F5E,
    0x9B44: 0x4FAB,
    0x9B45: 0x59A3,
    0x9B46: 0x59B2,
    0x9B47: 0x59C6,
    0x9B48: 0x59E8,
    0x9B49: 0x59DC,
    0x9B4A: 0x598D,
    0x9B4B: 0x59D9,
    0x9B4C: 0x59DA,
    0x9B4D: 0x5A25,
    0x9B4E: 0x5A1F,
    0x9B4F: 0x5A11,
    0x9B50: 0x5A1C,
    0x9B51: 0x5A09,
    0x9B52: 0x5A1A,
    0x9B53: 0x5A40,
    0x9B54: 0x5A6C,
    0x9B55: 0x5A49,
    0x9B56: 0x5A35,
    0x9B57: 0x5A36,
    0x9B58: 0x5A62,
    0x9B59: 0x5A6A,
    0x9B5A: 0x5A9A,
    0x9B5B: 0x5ABC,
    0x9B5C: 0x5ABE,
    0x9B5D: 0x5ACB,
    0x9B5E: 0x5AC2,
    0x9B5F: 0x5ABD,
    0x9B60: 0x5AE3,
    0x9B61: 0x5AD7,
    0x9B62: 0x5AE6,
    0x9B63: 0x5AE9,
    0x9B64: 0x5AD6,
    0x9B65: 0x5AFA,
    0x9B66: 0x5AFB,
    0x9B67: 0x5B0C,
    0x9B68: 0x5B0B,
    0x9B69: 0x5B16,
    0x9B6A: 0x5B32,
    0x9B6B: 0x5AD0,
    0x9B6C: 0x5B2A,
    0x9B6D: 0x5B36,
    0x9B6E: 0x5B3E,
    0x9B6F: 0x5B43,
    0x9B70: 0x5B45,
    0x9B71: 0x5B40,
    0x9B72: 0x5B51,
    0x9B73: 0x5B55,
    0x9B74: 0x5B5A,
    0x9B75: 0x5B5B,
    0x9B76: 0x5B65,
    0x9B77: 0x5B69,
    0x9B78: 0x5B70,
    0x9B79: 0x5B73,
    0x9B7A: 0x5B75,
    0x9B7B: 0x5B78,
    0x9B7C: 0x6588,
    0x9B7D: 0x5B7A,
    0x9B7E: 0x5B80,
    0x9B80: 0x5B83,
    0x9B81: 0x5BA6,
    0x9B82: 0x5BB8,
    0x9B83: 0x5BC3,
    0x9B84: 0x5BC7,
    0x9B85: 0x5BC9,
    0x9B86: 0x5BD4,
    0x9B87: 0x5BD0,
    0x9B88: 0x5BE4,
    0x9B89: 0x5BE6,
    0x9B8A: 0x5BE2,
    0x9B8B: 0x5BDE,
    0x9B8C: 0x5BE5,
    0x9B8D: 0x5BEB,
    0x9B8E: 0x5BF0,
    0x9B8F: 0x5BF6,
    0x9B90: 0x5BF3,
    0x9B91: 0x5C05,
    0x9B92: 0x5C07,
    0x9B93: 0x5C08,
    0x9B94: 0x5C0D,
    0x9B95: 0x5C13,
    0x9B96: 0x5C20,
    0x9B97: 0x5C22,
    0x9B98: 0x5C28,
    0x9B99: 0x5C38,
    0x9B9A: 0x5C39,
    0x9B9B: 0x5C41,
    0x9B9C: 0x5C46,
    0x9B9D: 0x5C4E,
    0x9B9E: 0x5C53,
    0x9B9F: 0x5C50,
    0x9BA0: 0x5C4F,
    0x9BA1: 0x5B71,
    0x9BA2: 0x5C6C,
    0x9BA3: 0x5C6E,
    0x9BA4: 0x4E62,
    0x9BA5: 0x5C76,
    0x9BA6: 0x5C79,
    0x9BA7: 0x5C8C,
    0x9BA8: 0x5C91,
    0x9BA9: 0x5C94,
    0x9BAA: 0x599B,
    0x9BAB: 0x5CAB,
    0x9BAC: 0x5CBB,
    0x9BAD: 0x5CB6,
    0x9BAE: 0x5CBC,
    0x9BAF: 0x5CB7,
    0x9BB0: 0x5CC5,
    0x9BB1: 0x5CBE,
    0x9BB2: 0x5CC7,
    0x9BB3: 0x5CD9,
    0x9BB4: 0x5CE9,
    0x9BB5: 0x5CFD,
    0x9BB6: 0x5CFA,
    0x9BB7: 0x5CED,
    0x9BB8: 0x5D8C,
    0x9BB9: 0x5CEA,
    0x9BBA: 0x5D0B,
    0x9BBB: 0x5D15,
    0x9BBC: 0x5D17,
    0x9BBD: 0x5D5C,
    0x9BBE: 0x5D1F,
    0x9BBF: 0x5D1B,
    0x9BC0: 0x5D11,
    0x9BC1: 0x5D14,
    0x9BC2: 0x5D22,
    0x9BC3: 0x5D1A,
    0x9BC4: 0x5D19,
    0x9BC5: 0x5D18,
    0x9BC6: 0x5D4C,
    0x9BC7: 0x5D52,
    0x9BC8: 0x5D4E,
    0x9BC9: 0x5D4B,
    0x9BCA: 0x5D6C,
    0x9BCB: 0x5D73,
    0x9BCC: 0x5D76,
    0x9BCD: 0x5D87,
    0x9BCE: 0x5D84,
    0x9BCF: 0x5D82,
    0x9BD0: 0x5DA2,
    0x9BD1: 0x5D9D,
    0x9BD2: 0x5DAC,
    0x9BD3: 0x5DAE,
    0x9BD4: 0x5DBD,
    0x9BD5: 0x5D90,
    0x9BD6: 0x5DB7,
    0x9BD7: 0x5DBC,
    0x9BD8: 0x5DC9,
    0x9BD9: 0x5DCD,
    0x9BDA: 0x5DD3,
    0x9BDB: 0x5DD2,
    0x9BDC: 0x5DD6,
    0x9BDD: 0x5DDB,
    0x9BDE: 0x5DEB,
    0x9BDF: 0x5DF2,
    0x9BE0: 0x5DF5,
    0x9BE1: 0x5E0B,
    0x9BE2: 0x5E1A,
    0x9BE3: 0x5E19,
    0x9BE4: 0x5E11,
    0x9BE5: 0x5E1B,
    0x9BE6: 0x5E36,
    0x9BE7: 0x5E37,
    0x9BE8: 0x5E44,
    0x9BE9: 0x5E43,
    0x9BEA: 0x5E40,
    0x9BEB: 0x5E4E,
    0x9BEC: 0x5E57,
    0x9BED: 0x5E54,
    0x9BEE: 0x5E5F,
    0x9BEF: 0x5E62,
    0x9BF0: 0x5E64,
    0x9BF1: 0x5E47,
    0x9BF2: 0x5E75,
    0x9BF3: 0x5E76,
    0x9BF4: 0x5E7A,
    0x9BF5: 0x9EBC,
    0x9BF6: 0x5E7F,
    0x9BF7: 0x5EA0,
    0x9BF8: 0x5EC1,
    0x9BF9: 0x5EC2,
    0x9BFA: 0x5EC8,
    0x9BFB: 0x5ED0,
    0x9BFC: 0x5ECF,
    0x9C40: 0x5ED6,
    0x9C41: 0x5EE3,
    0x9C42: 0x5EDD,
    0x9C43: 0x5EDA,
    0x9C44: 0x5EDB,
    0x9C45: 0x5EE2,
    0x9C46: 0x5EE1,
    0x9C47: 0x5EE8,
    0x9C48: 0x5EE9,
    0x9C49: 0x5EEC,
    0x9C4A: 0x5EF1,
    0x9C4B: 0x5EF3,
    0x9C4C: 0x5EF0,
    0x9C4D: 0x5EF4,
    0x9C4E: 0x5EF8,
    0x9C4F: 0x5EFE,
    0x9C50: 0x5F03,
    0x9C51: 0x5F09,
    0x9C52: 0x5F5D,
    0x9C53: 0x5F5C,
    0x9C54: 0x5F0B,
    0x9C55: 0x5F11,
    0x9C56: 0x5F16,
    0x9C57: 0x5F29,
    0x9C58: 0x5F2D,
    0x9C59: 0x5F38,
    0x9C5A: 0x5F41,
    0x9C5B: 0x5F48,
    0x9C5C: 0x5F4C,
    0x9C5D: 0x5F4E,
    0x9C5E: 0x5F2F,
    0x9C5F: 0x5F51,
    0x9C60: 0x5F56,
    0x9C61: 0x5F57,
    0x9C62: 0x5F59,
    0x9C63: 0x5F61,
    0x9C64: 0x5F6D,
    0x9C65: 0x5F73,
    0x9C66: 0x5F77,
    0x9C67: 0x5F83,
    0x9C68: 0x5F82,
    0x9C69: 0x5F7F,
    0x9C6A: 0x5F8A,
    0x9C6B: 0x5F88,
    0x9C6C: 0x5F91,
    0x9C6D: 0x5F87,
    0x9C6E: 0x5F9E,
    0x9C6F: 0x5F99,
    0x9C70: 0x5F98,
    0x9C71: 0x5FA0,
    0x9C72: 0x5FA8,
    0x9C73: 0x5FAD,
    0x9C74: 0x5FBC,
    0x9C75: 0x5FD6,
    0x9C76: 0x5FFB,
    0x9C77: 0x5FE4,
    0x9C78: 0x5FF8,
    0x9C79: 0x5FF1,
    0x9C7A: 0x5FDD,
    0x9C7B: 0x60B3,
    0x9C7C: 0x5FFF,
    0x9C7D: 0x6021,
    0x9C7E: 0x6060,
    0x9C80: 0x6019,
    0x9C81: 0x6010,
    0x9C82: 0x6029,
    0x9C83: 0x600E,
    0x9C84: 0x6031,
    0x9C85: 0x601B,
    0x9C86: 0x6015,
    0x9C87: 0x602B,
    0x9C88: 0x6026,
    0x9C89: 0x600F,
    0x9C8A: 0x603A,
    0x9C8B: 0x605A,
    0x9C8C: 0x6041,
    0x9C8D: 0x606A,
    0x9C8E: 0x6077,
    0x9C8F: 0x605F,
    0x9C90: 0x604A,
    0x9C91: 0x6046,
    0x9C92: 0x604D,
    0x9C93: 0x6063,
    0x9C94: 0x6043,
    0x9C95: 0x6064,
    0x9C96: 0x6042,
    0x9C97: 0x606C,
    0x9C98: 0x606B,
    0x9C99: 0x6059,
    0x9C9A: 0x6081,
    0x9C9B: 0x608D,
    0x9C9C: 0x60E7,
    0x9C9D: 0x6083,
    0x9C9E: 0x609A,
    0x9C9F: 0x6084,
    0x9CA0: 0x609B,
    0x9CA1: 0x6096,
    0x9CA2: 0x6097,
    0x9CA3: 0x6092,
    0x9CA4: 0x60A7,
    0x9CA5: 0x608B,
    0x9CA6: 0x60E1,
    0x9CA7: 0x60B8,
    0x9CA8: 0x60E0,
    0x9CA9: 0x60D3,
    0x9CAA: 0x60B4,
    0x9CAB: 0x5FF0,
    0x9CAC: 0x60BD,
    0x9CAD: 0x60C6,
    0x9CAE: 0x60B5,
    0x9CAF: 0x60D8,
    0x9CB0: 0x614D,
    0x9CB1: 0x6115,
    0x9CB2: 0x6106,
    0x9CB3: 0x60F6,
    0x9CB4: 0x60F7,
    0x9CB5: 0x6100,
    0x9CB6: 0x60F4,
    0x9CB7: 0x60FA,
    0x9CB8: 0x6103,
    0x9CB9: 0x6121,
    0x9CBA: 0x60FB,
    0x9CBB: 0x60F1,
    0x9CBC: 0x610D,
    0x9CBD: 0x610E,
    0x9CBE: 0x6147,
    0x9CBF: 0x613E,
    0x9CC0: 0x6128,
    0x9CC1: 0x6127,
    0x9CC2: 0x614A,
    0x9CC3: 0x613F,
    0x9CC4: 0x613C,
    0x9CC5: 0x612C,
    0x9CC6: 0x6134,
    0x9CC7: 0x613D,
    0x9CC8: 0x6142,
    0x9CC9: 0x6144,
    0x9CCA: 0x6173,
    0x9CCB: 0x6177,
    0x9CCC: 0x6158,
    0x9CCD: 0x6159,
    0x9CCE: 0x615A,
    0x9CCF: 0x616B,
    0x9CD0: 0x6174,
    0x9CD1: 0x616F,
    0x9CD2: 0x6165,
    0x9CD3: 0x6171,
    0x9CD4: 0x615F,
    0x9CD5: 0x615D,
    0x9CD6: 0x6153,
    0x9CD7: 0x6175,
    0x9CD8: 0x6199,
    0x9CD9: 0x6196,
    0x9CDA: 0x6187,
    0x9CDB: 0x61AC,
    0x9CDC: 0x6194,
    0x9CDD: 0x619A,
    0x9CDE: 0x618A,
    0x9CDF: 0x6191,
    0x9CE0: 0x61AB,
    0x9CE1: 0x61AE,
    0x9CE2: 0x61CC,
    0x9CE3: 0x61CA,
    0x9CE4: 0x61C9,
    0x9CE5: 0x61F7,
    0x9CE6: 0x61C8,
    0x9CE7: 0x61C3,
    0x9CE8: 0x61C6,
    0x9CE9: 0x61BA,
    0x9CEA: 0x61CB,
    0x9CEB: 0x7F79,
    0x9CEC: 0x61CD,
    0x9CED: 0x61E6,
    0x9CEE: 0x61E3,
    0x9CEF: 0x61F6,
    0x9CF0: 0x61FA,
    0x9CF1: 0x61F4,
    0x9CF2: 0x61FF,
    0x9CF3: 0x61FD,
    0x9CF4: 0x61FC,
    0x9CF5: 0x61FE,
    0x9CF6: 0x6200,
    0x9CF7: 0x6208,
    0x9CF8: 0x6209,
    0x9CF9: 0x620D,
    0x9CFA: 0x620C,
    0x9CFB: 0x6214,
    0x9CFC: 0x621B,
    0x9D40: 0x621E,
    0x9D41: 0x6221,
    0x9D42: 0x622A,
    0x9D43: 0x622E,
    0x9D44: 0x6230,
    0x9D45: 0x6232,
    0x9D46: 0x6233,
    0x9D47: 0x6241,
    0x9D48: 0x624E,
    0x9D49: 0x625E,
    0x9D4A: 0x6263,
    0x9D4B: 0x625B,
    0x9D4C: 0x6260,
    0x9D4D: 0x6268,
    0x9D4E: 0x627C,
    0x9D4F: 0x6282,
    0x9D50: 0x6289,
    0x9D51: 0x627E,
    0x9D52: 0x6292,
    0x9D53: 0x6293,
    0x9D54: 0x6296,
    0x9D55: 0x62D4,
    0x9D56: 0x6283,
    0x9D57: 0x6294,
    0x9D58: 0x62D7,
    0x9D59: 0x62D1,
    0x9D5A: 0x62BB,
    0x9D5B: 0x62CF,
    0x9D5C: 0x62FF,
    0x9D5D: 0x62C6,
    0x9D5E: 0x64D4,
    0x9D5F: 0x62C8,
    0x9D60: 0x62DC,
    0x9D61: 0x62CC,
    0x9D62: 0x62CA,
    0x9D63: 0x62C2,
    0x9D64: 0x62C7,
    0x9D65: 0x629B,
    0x9D66: 0x62C9,
    0x9D67: 0x630C,
    0x9D68: 0x62EE,
    0x9D69: 0x62F1,
    0x9D6A: 0x6327,
    0x9D6B: 0x6302,
    0x9D6C: 0x6308,
    0x9D6D: 0x62EF,
    0x9D6E: 0x62F5,
    0x9D6F: 0x6350,
    0x9D70: 0x633E,
    0x9D71: 0x634D,
    0x9D72: 0x641C,
    0x9D73: 0x634F,
    0x9D74: 0x6396,
    0x9D75: 0x638E,
    0x9D76: 0x6380,
    0x9D77: 0x63AB,
    0x9D78: 0x6376,
    0x9D79: 0x63A3,
    0x9D7A: 0x638F,
    0x9D7B: 0x6389,
    0x9D7C: 0x639F,
    0x9D7D: 0x63B5,
    0x9D7E: 0x636B,
    0x9D80: 0x6369,
    0x9D81: 0x63BE,
    0x9D82: 0x63E9,
    0x9D83: 0x63C0,
    0x9D84: 0x63C6,
    0x9D85: 0x63E3,
    0x9D86: 0x63C9,
    0x9D87: 0x63D2,
    0x9D88: 0x63F6,
    0x9D89: 0x63C4,
    0x9D8A: 0x6416,
    0x9D8B: 0x6434,
    0x9D8C: 0x6406,
    0x9D8D: 0x6413,
    0x9D8E: 0x6426,
    0x9D8F: 0x6436,
    0x9D90: 0x651D,
    0x9D91: 0x6417,
    0x9D92: 0x6428,
    0x9D93: 0x640F,
    0x9D94: 0x6467,
    0x9D95: 0x646F,
    0x9D96: 0x6476,
    0x9D97: 0x644E,
    0x9D98: 0x652A,
    0x9D99: 0x6495,
    0x9D9A: 0x6493,
    0x9D9B: 0x64A5,
    0x9D9C: 0x64A9,
    0x9D9D: 0x6488,
    0x9D9E: 0x64BC,
    0x9D9F: 0x64DA,
    0x9DA0: 0x64D2,
    0x9DA1: 0x64C5,
    0x9DA2: 0x64C7,
    0x9DA3: 0x64BB,
    0x9DA4: 0x64D8,
    0x9DA5: 0x64C2,
    0x9DA6: 0x64F1,
    0x9DA7: 0x64E7,
    0x9DA8: 0x8209,
    0x9DA9: 0x64E0,
    0x9DAA: 0x64E1,
    0x9DAB: 0x62AC,
    0x9DAC: 0x64E3,
    0x9DAD: 0x64EF,
    0x9DAE: 0x652C,
    0x9DAF: 0x64F6,
    0x9DB0: 0x64F4,
    0x9DB1: 0x64F2,
    0x9DB2: 0x64FA,
    0x9DB3: 0x6500,
    0x9DB4: 0x64FD,
    0x9DB5: 0x6518,
    0x9DB6: 0x651C,
    0x9DB7: 0x6505,
    0x9DB8: 0x6524,
    0x9DB9: 0x6523,
    0x9DBA: 0x652B,
    0x9DBB: 0x6534,
    0x9DBC: 0x6535,
    0x9DBD: 0x6537,
    0x9DBE: 0x6536,
    0x9DBF: 0x6538,
    0x9DC0: 0x754B,
    0x9DC1: 0x6548,
    0x9DC2: 0x6556,
    0x9DC3: 0x6555,
    0x9DC4: 0x654D,
    0x9DC5: 0x6558,
    0x9DC6: 0x655E,
    0x9DC7: 0x655D,
    0x9DC8: 0x6572,
    0x9DC9: 0x6578,
    0x9DCA: 0x6582,
    0x9DCB: 0x6583,
    0x9DCC: 0x8B8A,
    0x9DCD: 0x659B,
    0x9DCE: 0x659F,
    0x9DCF: 0x65AB,
    0x9DD0: 0x65B7,
    0x9DD1: 0x65C3,
    0x9DD2: 0x65C6,
    0x9DD3: 0x65C1,
    0x9DD4: 0x65C4,
    0x9DD5: 0x65CC,
    0x9DD6: 0x65D2,
    0x9DD7: 0x65DB,
    0x9DD8: 0x65D9,
    0x9DD9: 0x65E0,
    0x9DDA: 0x65E1,
    0x9DDB: 0x65F1,
    0x9DDC: 0x6772,
    0x9DDD: 0x660A,
    0x9DDE: 0x6603,
    0x9DDF: 0x65FB,
    0x9DE0: 0x6773,
    0x9DE1: 0x6635,
    0x9DE2: 0x6636,
    0x9DE3: 0x6634,
    0x9DE4: 0x661C,
    0x9DE5: 0x664F,
    0x9DE6: 0x6644,
    0x9DE7: 0x6649,
    0x9DE8: 0x6641,
    0x9DE9: 0x665E,
    0x9DEA: 0x665D,
    0x9DEB: 0x6664,
    0x9DEC: 0x6667,
    0x9DED: 0x6668,
    0x9DEE: 0x665F,
    0x9DEF: 0x6662,
    0x9DF0: 0x6670,
    0x9DF1: 0x6683,
    0x9DF2: 0x6688,
    0x9DF3: 0x668E,
    0x9DF4: 0x6689,
    0x9DF5: 0x6684,
    0x9DF6: 0x6698,
    0x9DF7: 0x669D,
    0x9DF8: 0x66C1,
    0x9DF9: 0x66B9,
    0x9DFA: 0x66C9,
    0x9DFB: 0x66BE,
    0x9DFC: 0x66BC,
    0x9E40: 0x66C4,
    0x9E41: 0x66B8,
    0x9E42: 0x66D6,
    0x9E43: 0x66DA,
    0x9E44: 0x66E0,
    0x9E45: 0x663F,
    0x9E46: 0x66E6,
    0x9E47: 0x66E9,
    0x9E48: 0x66F0,
    0x9E49: 0x66F5,
    0x9E4A: 0x66F7,
    0x9E4B: 0x670F,
    0x9E4C: 0x6716,
    0x9E4D: 0x671E,
    0x9E4E: 0x6726,
    0x9E4F: 0x6727,
    0x9E50: 0x9738,
    0x9E51: 0x672E,
    0x9E52: 0x673F,
    0x9E53: 0x6736,
    0x9E54: 0x6741,
    0x9E55: 0x6738,
    0x9E56: 0x6737,
    0x9E57: 0x6746,
    0x9E58: 0x675E,
    0x9E59: 0x6760,
    0x9E5A: 0x6759,
    0x9E5B: 0x6763,
    0x9E5C: 0x6764,
    0x9E5D: 0x6789,
    0x9E5E: 0x6770,
    0x9E5F: 0x67A9,
    0x9E60: 0x677C,
    0x9E61: 0x676A,
    0x9E62: 0x678C,
    0x9E63: 0x678B,
    0x9E64: 0x67A6,
    0x9E65: 0x67A1,
    0x9E66: 0x6785,
    0x9E67: 0x67B7,
    0x9E68: 0x67EF,
    0x9E69: 0x67B4,
    0x9E6A: 0x67EC,
    0x9E6B: 0x67B3,
    0x9E6C: 0x67E9,
    0x9E6D: 0x67B8,
    0x9E6E: 0x67E4,
    0x9E6F: 0x67DE,
    0x9E70: 0x67DD,
    0x9E71: 0x67E2,
    0x9E72: 0x67EE,
    0x9E73: 0x67B9,
    0x9E74: 0x67CE,
    0x9E75: 0x67C6,
    0x9E76: 0x67E7,
    0x9E77: 0x6A9C,
    0x9E78: 0x681E,
    0x9E79: 0x6846,
    0x9E7A: 0x6829,
    0x9E7B: 0x6840,
    0x9E7C: 0x684D,
    0x9E7D: 0x6832,
    0x9E7E: 0x684E,
    0x9E80: 0x68B3,
    0x9E81: 0x682B,
    0x9E82: 0x6859,
    0x9E83: 0x6863,
    0x9E84: 0x6877,
    0x9E85: 0x687F,
    0x9E86: 0x689F,
    0x9E87: 0x688F,
    0x9E88: 0x68AD,
    0x9E89: 0x6894,
    0x9E8A: 0x689D,
    0x9E8B: 0x689B,
    0x9E8C: 0x6883,
    0x9E8D: 0x6AAE,
    0x9E8E: 0x68B9,
    0x9E8F: 0x6874,
    0x9E90: 0x68B5,
    0x9E91: 0x68A0,
    0x9E92: 0x68BA,
    0x9E93: 0x690F,
    0x9E94: 0x688D,
    0x9E95: 0x687E,
    0x9E96: 0x6901,
    0x9E97: 0x68CA,
    0x9E98: 0x6908,
    0x9E99: 0x68D8,
    0x9E9A: 0x6922,
    0x9E9B: 0x6926,
    0x9E9C: 0x68E1,
    0x9E9D: 0x690C,
    0x9E9E: 0x68CD,
    0x9E9F: 0x68D4,
    0x9EA0: 0x68E7,
    0x9EA1: 0x68D5,
    0x9EA2: 0x6936,
    0x9EA3: 0x6912,
    0x9EA4: 0x6904,
    0x9EA5: 0x68D7,
    0x9EA6: 0x68E3,
    0x9EA7: 0x6925,
    0x9EA8: 0x68F9,
    0x9EA9: 0x68E0,
    0x9EAA: 0x68EF,
    0x9EAB: 0x6928,
    0x9EAC: 0x692A,
    0x9EAD: 0x691A,
    0x9EAE: 0x6923,
    0x9EAF: 0x6921,
    0x9EB0: 0x68C6,
    0x9EB1: 0x6979,
    0x9EB2: 0x6977,
    0x9EB3: 0x695C,
    0x9EB4: 0x6978,
    0x9EB5: 0x696B,
    0x9EB6: 0x6954,
    0x9EB7: 0x697E,
    0x9EB8: 0x696E,
    0x9EB9: 0x6939,
    0x9EBA: 0x6974,
    0x9EBB: 0x693D,
    0x9EBC: 0x6959,
    0x9EBD: 0x6930,
    0x9EBE: 0x6961,
    0x9EBF: 0x695E,
    0x9EC0: 0x695D,
    0x9EC1: 0x6981,
    0x9EC2: 0x696A,
    0x9EC3: 0x69B2,
    0x9EC4: 0x69AE,
    0x9EC5: 0x69D0,
    0x9EC6: 0x69BF,
    0x9EC7: 0x69C1,
    0x9EC8: 0x69D3,
    0x9EC9: 0x69BE,
    0x9ECA: 0x69CE,
    0x9ECB: 0x5BE8,
    0x9ECC: 0x69CA,
    0x9ECD: 0x69DD,
    0x9ECE: 0x69BB,
    0x9ECF: 0x69C3,
    0x9ED0: 0x69A7,
    0x9ED1: 0x6A2E,
    0x9ED2: 0x6991,
    0x9ED3: 0x69A0,
    0x9ED4: 0x699C,
    0x9ED5: 0x6995,
    0x9ED6: 0x69B4,
    0x9ED7: 0x69DE,
    0x9ED8: 0x69E8,
    0x9ED9: 0x6A02,
    0x9EDA: 0x6A1B,
    0x9EDB: 0x69FF,
    0x9EDC: 0x6B0A,
    0x9EDD: 0x69F9,
    0x9EDE: 0x69F2,
    0x9EDF: 0x69E7,
    0x9EE0: 0x6A05,
    0x9EE1: 0x69B1,
    0x9EE2: 0x6A1E,
    0x9EE3: 0x69ED,
    0x9EE4: 0x6A14,
    0x9EE5: 0x69EB,
    0x9EE6: 0x6A0A,
    0x9EE7: 0x6A12,
    0x9EE8: 0x6AC1,
    0x9EE9: 0x6A23,
    0x9EEA: 0x6A13,
    0x9EEB: 0x6A44,
    0x9EEC: 0x6A0C,
    0x9EED: 0x6A72,
    0x9EEE: 0x6A36,
    0x9EEF: 0x6A78,
    0x9EF0: 0x6A47,
    0x9EF1: 0x6A62,
    0x9EF2: 0x6A59,
    0x9EF3: 0x6A66,
    0x9EF4: 0x6A48,
    0x9EF5: 0x6A38,
    0x9EF6: 0x6A22,
    0x9EF7: 0x6A90,
    0x9EF8: 0x6A8D,
    0x9EF9: 0x6AA0,
    0x9EFA: 0x6A84,
    0x9EFB: 0x6AA2,
    0x9EFC: 0x6AA3,
    0x9F40: 0x6A97,
    0x9F41: 0x8617,
    0x9F42: 0x6ABB,
    0x9F43: 0x6AC3,
    0x9F44: 0x6AC2,
    0x9F45: 0x6AB8,
    0x9F46: 0x6AB3,
    0x9F47: 0x6AAC,
    0x9F48: 0x6ADE,
    0x9F49: 0x6AD1,
    0x9F4A: 0x6ADF,
    0x9F4B: 0x6AAA,
    0x9F4C: 0x6ADA,
    0x9F4D: 0x6AEA,
    0x9F4E: 0x6AFB,
    0x9F4F: 0x6B05,
    0x9F50: 0x8616,
    0x9F51: 0x6AFA,
    0x9F52: 0x6B12,
    0x9F53: 0x6B16,
    0x9F54: 0x9B31,
    0x9F55: 0x6B1F,
    0x9F56: 0x6B38,
    0x9F57: 0x6B37,
    0x9F58: 0x76DC,
    0x9F59: 0x6B39,
    0x9F5A: 0x98EE,
    0x9F5B: 0x6B47,
    0x9F5C: 0x6B43,
    0x9F5D: 0x6B49,
    0x9F5E: 0x6B50,
    0x9F5F: 0x6B59,
    0x9F60: 0x6B54,
    0x9F61: 0x6B5B,
    0x9F62: 0x6B5F,
    0x9F63: 0x6B61,
    0x9F64: 0x6B78,
    0x9F65: 0x6B79,
    0x9F66: 0x6B7F,
    0x9F67: 0x6B80,
    0x9F68: 0x6B84,
    0x9F69: 0x6B83,
    0x9F6A: 0x6B8D,
    0x9F6B: 0x6B98,
    0x9F6C: 0x6B95,
    0x9F6D: 0x6B9E,
    0x9F6E: 0x6BA4,
    0x9F6F: 0x6BAA,
    0x9F70: 0x6BAB,
    0x9F71: 0x6BAF,
    0x9F72: 0x6BB2,
    0x9F73: 0x6BB1,
    0x9F74: 0x6BB3,
    0x9F75: 0x6BB7,
    0x9F76: 0x6BBC,
    0x9F77: 0x6BC6,
    0x9F78: 0x6BCB,
    0x9F79: 0x6BD3,
    0x9F7A: 0x6BDF,
    0x9F7B: 0x6BEC,
    0x9F7C: 0x6BEB,
    0x9F7D: 0x6BF3,
    0x9F7E: 0x6BEF,
    0x9F80: 0x9EBE,
    0x9F81: 0x6C08,
    0x9F82: 0x6C13,
    0x9F83: 0x6C14,
    0x9F84: 0x6C1B,
    0x9F85: 0x6C24,
    0x9F86: 0x6C23,
    0x9F87: 0x6C5E,
    0x9F88: 0x6C55,
    0x9F89: 0x6C62,
    0x9F8A: 0x6C6A,
    0x9F8B: 0x6C82,
    0x9F8C: 0x6C8D,
    0x9F8D: 0x6C9A,
    0x9F8E: 0x6C81,
    0x9F8F: 0x6C9B,
    0x9F90: 0x6C7E,
    0x9F91: 0x6C68,
    0x9F92: 0x6C73,
    0x9F93: 0x6C92,
    0x9F94: 0x6C90,
    0x9F95: 0x6CC4,
    0x9F96: 0x6CF1,
    0x9F97: 0x6CD3,
    0x9F98: 0x6CBD,
    0x9F99: 0x6CD7,
    0x9F9A: 0x6CC5,
    0x9F9B: 0x6CDD,
    0x9F9C: 0x6CAE,
    0x9F9D: 0x6CB1,
    0x9F9E: 0x6CBE,
    0x9F9F: 0x6CBA,
    0x9FA0: 0x6CDB,
    0x9FA1: 0x6CEF,
    0x9FA2: 0x6CD9,
    0x9FA3: 0x6CEA,
    0x9FA4: 0x6D1F,
    0x9FA5: 0x884D,
    0x9FA6: 0x6D36,
    0x9FA7: 0x6D2B,
    0x9FA8: 0x6D3D,
    0x9FA9: 0x6D38,
    0x9FAA: 0x6D19,
    0x9FAB: 0x6D35,
    0x9FAC: 0x6D33,
    0x9FAD: 0x6D12,
    0x9FAE: 0x6D0C,
    0x9FAF: 0x6D63,
    0x9FB0: 0x6D93,
    0x9FB1: 0x6D64,
    0x9FB2: 0x6D5A,
    0x9FB3: 0x6D79,
    0x9FB4: 0x6D59,
    0x9FB5: 0x6D8E,
    0x9FB6: 0x6D95,
    0x9FB7: 0x6FE4,
    0x9FB8: 0x6D85,
    0x9FB9: 0x6DF9,
    0x9FBA: 0x6E15,
    0x9FBB: 0x6E0A,
    0x9FBC: 0x6DB5,
    0x9FBD: 0x6DC7,
    0x9FBE: 0x6DE6,
    0x9FBF: 0x6DB8,
    0x9FC0: 0x6DC6,
    0x9FC1: 0x6DEC,
    0x9FC2: 0x6DDE,
    0x9FC3: 0x6DCC,
    0x9FC4: 0x6DE8,
    0x9FC5: 0x6DD2,
    0x9FC6: 0x6DC5,
    0x9FC7: 0x6DFA,
    0x9FC8: 0x6DD9,
    0x9FC9: 0x6DE4,
    0x9FCA: 0x6DD5,
    0x9FCB: 0x6DEA,
    0x9FCC: 0x6DEE,
    0x9FCD: 0x6E2D,
    0x9FCE: 0x6E6E,
    0x9FCF: 0x6E2E,
    0x9FD0: 0x6E19,
    0x9FD1: 0x6E72,
    0x9FD2: 0x6E5F,
    0x9FD3: 0x6E3E,
    0x9FD4: 0x6E23,
    0x9FD5: 0x6E6B,
    0x9FD6: 0x6E2B,
    0x9FD7: 0x6E76,
    0x9FD8: 0x6E4D,
    0x9FD9: 0x6E1F,
    0x9FDA: 0x6E43,
    0x9FDB: 0x6E3A,
    0x9FDC: 0x6E4E,
    0x9FDD: 0x6E24,
    0x9FDE: 0x6EFF,
    0x9FDF: 0x6E1D,
    0x9FE0: 0x6E38,
    0x9FE1: 0x6E82,
    0x9FE2: 0x6EAA,
    0x9FE3: 0x6E98,
    0x9FE4: 0x6EC9,
    0x9FE5: 0x6EB7,
    0x9FE6: 0x6ED3,
    0x9FE7: 0x6EBD,
    0x9FE8: 0x6EAF,
    0x9FE9: 0x6EC4,
    0x9FEA: 0x6EB2,
    0x9FEB: 0x6ED4,
    0x9FEC: 0x6ED5,
    0x9FED: 0x6E8F,
    0x9FEE: 0x6EA5,
    0x9FEF: 0x6EC2,
    0x9FF0: 0x6E9F,
    0x9FF1: 0x6F41,
    0x9FF2: 0x6F11,
    0x9FF3: 0x704C,
    0x9FF4: 0x6EEC,
    0x9FF5: 0x6EF8,
    0x9FF6: 0x6EFE,
    0x9FF7: 0x6F3F,
    0x9FF8: 0x6EF2,
    0x9FF9: 0x6F31,
    0x9FFA: 0x6EEF,
    0x9FFB: 0x6F32,
    0x9FFC: 0x6ECC,
    0xA1: 0xFF61,
    0xA2: 0xFF62,
    0xA3: 0xFF63,
    0xA4: 0xFF64,
    0xA5: 0xFF65,
    0xA6: 0xFF66,
    0xA7: 0xFF67,
    0xA8: 0xFF68,
    0xA9: 0xFF69,
    0xAA: 0xFF6A,
    0xAB: 0xFF6B,
    0xAC: 0xFF6C,
    0xAD: 0xFF6D,
    0xAE: 0xFF6E,
    0xAF: 0xFF6F,
    0xB0: 0xFF70,
    0xB1: 0xFF71,
    0xB2: 0xFF72,
    0xB3: 0xFF73,
    0xB4: 0xFF74,
    0xB5: 0xFF75,
    0xB6: 0xFF76,
    0xB7: 0xFF77,
    0xB8: 0xFF78,
    0xB9: 0xFF79,
    0xBA: 0xFF7A,
    0xBB: 0xFF7B,
    0xBC: 0xFF7C,
    0xBD: 0xFF7D,
    0xBE: 0xFF7E,
    0xBF: 0xFF7F,
    0xC0: 0xFF80,
    0xC1: 0xFF81,
    0xC2: 0xFF82,
    0xC3: 0xFF83,
    0xC4: 0xFF84,
    0xC5: 0xFF85,
    0xC6: 0xFF86,
    0xC7: 0xFF87,
    0xC8: 0xFF88,
    0xC9: 0xFF89,
    0xCA: 0xFF8A,
    0xCB: 0xFF8B,
    0xCC: 0xFF8C,
    0xCD: 0xFF8D,
    0xCE: 0xFF8E,
    0xCF: 0xFF8F,
    0xD0: 0xFF90,
    0xD1: 0xFF91,
    0xD2: 0xFF92,
    0xD3: 0xFF93,
    0xD4: 0xFF94,
    0xD5: 0xFF95,
    0xD6: 0xFF96,
    0xD7: 0xFF97,
    0xD8: 0xFF98,
    0xD9: 0xFF99,
    0xDA: 0xFF9A,
    0xDB: 0xFF9B,
    0xDC: 0xFF9C,
    0xDD: 0xFF9D,
    0xDE: 0xFF9E,
    0xDF: 0xFF9F,
    0xE040: 0x6F3E,
    0xE041: 0x6F13,
    0xE042: 0x6EF7,
    0xE043: 0x6F86,
    0xE044: 0x6F7A,
    0xE045: 0x6F78,
    0xE046: 0x6F81,
    0xE047: 0x6F80,
    0xE048: 0x6F6F,
    0xE049: 0x6F5B,
    0xE04A: 0x6FF3,
    0xE04B: 0x6F6D,
    0xE04C: 0x6F82,
    0xE04D: 0x6F7C,
    0xE04E: 0x6F58,
    0xE04F: 0x6F8E,
    0xE050: 0x6F91,
    0xE051: 0x6FC2,
    0xE052: 0x6F66,
    0xE053: 0x6FB3,
    0xE054: 0x6FA3,
    0xE055: 0x6FA1,
    0xE056: 0x6FA4,
    0xE057: 0x6FB9,
    0xE058: 0x6FC6,
    0xE059: 0x6FAA,
    0xE05A: 0x6FDF,
    0xE05B: 0x6FD5,
    0xE05C: 0x6FEC,
    0xE05D: 0x6FD4,
    0xE05E: 0x6FD8,
    0xE05F: 0x6FF1,
    0xE060: 0x6FEE,
    0xE061: 0x6FDB,
    0xE062: 0x7009,
    0xE063: 0x700B,
    0xE064: 0x6FFA,
    0xE065: 0x7011,
    0xE066: 0x7001,
    0xE067: 0x700F,
    0xE068: 0x6FFE,
    0xE069: 0x701B,
    0xE06A: 0x701A,
    0xE06B: 0x6F74,
    0xE06C: 0x701D,
    0xE06D: 0x7018,
    0xE06E: 0x701F,
    0xE06F: 0x7030,
    0xE070: 0x703E,
    0xE071: 0x7032,
    0xE072: 0x7051,
    0xE073: 0x7063,
    0xE074: 0x7099,
    0xE075: 0x7092,
    0xE076: 0x70AF,
    0xE077: 0x70F1,
    0xE078: 0x70AC,
    0xE079: 0x70B8,
    0xE07A: 0x70B3,
    0xE07B: 0x70AE,
    0xE07C: 0x70DF,
    0xE07D: 0x70CB,
    0xE07E: 0x70DD,
    0xE080: 0x70D9,
    0xE081: 0x7109,
    0xE082: 0x70FD,
    0xE083: 0x711C,
    0xE084: 0x7119,
    0xE085: 0x7165,
    0xE086: 0x7155,
    0xE087: 0x7188,
    0xE088: 0x7166,
    0xE089: 0x7162,
    0xE08A: 0x714C,
    0xE08B: 0x7156,
    0xE08C: 0x716C,
    0xE08D: 0x718F,
    0xE08E: 0x71FB,
    0xE08F: 0x7184,
    0xE090: 0x7195,
    0xE091: 0x71A8,
    0xE092: 0x71AC,
    0xE093: 0x71D7,
    0xE094: 0x71B9,
    0xE095: 0x71BE,
    0xE096: 0x71D2,
    0xE097: 0x71C9,
    0xE098: 0x71D4,
    0xE099: 0x71CE,
    0xE09A: 0x71E0,
    0xE09B: 0x71EC,
    0xE09C: 0x71E7,
    0xE09D: 0x71F5,
    0xE09E: 0x71FC,
    0xE09F: 0x71F9,
    0xE0A0: 0x71FF,
    0xE0A1: 0x720D,
    0xE0A2: 0x7210,
    0xE0A3: 0x721B,
    0xE0A4: 0x7228,
    0xE0A5: 0x722D,
    0xE0A6: 0x722C,
    0xE0A7: 0x7230,
    0xE0A8: 0x7232,
    0xE0A9: 0x723B,
    0xE0AA: 0x723C,
    0xE0AB: 0x723F,
    0xE0AC: 0x7240,
    0xE0AD: 0x7246,
    0xE0AE: 0x724B,
    0xE0AF: 0x7258,
    0xE0B0: 0x7274,
    0xE0B1: 0x727E,
    0xE0B2: 0x7282,
    0xE0B3: 0x7281,
    0xE0B4: 0x7287,
    0xE0B5: 0x7292,
    0xE0B6: 0x7296,
    0xE0B7: 0x72A2,
    0xE0B8: 0x72A7,
    0xE0B9: 0x72B9,
    0xE0BA: 0x72B2,
    0xE0BB: 0x72C3,
    0xE0BC: 0x72C6,
    0xE0BD: 0x72C4,
    0xE0BE: 0x72CE,
    0xE0BF: 0x72D2,
    0xE0C0: 0x72E2,
    0xE0C1: 0x72E0,
    0xE0C2: 0x72E1,
    0xE0C3: 0x72F9,
    0xE0C4: 0x72F7,
    0xE0C5: 0x500F,
    0xE0C6: 0x7317,
    0xE0C7: 0x730A,
    0xE0C8: 0x731C,
    0xE0C9: 0x7316,
    0xE0CA: 0x731D,
    0xE0CB: 0x7334,
    0xE0CC: 0x732F,
    0xE0CD: 0x7329,
    0xE0CE: 0x7325,
    0xE0CF: 0x733E,
    0xE0D0: 0x734E,
    0xE0D1: 0x734F,
    0xE0D2: 0x9ED8,
    0xE0D3: 0x7357,
    0xE0D4: 0x736A,
    0xE0D5: 0x7368,
    0xE0D6: 0x7370,
    0xE0D7: 0x7378,
    0xE0D8: 0x7375,
    0xE0D9: 0x737B,
    0xE0DA: 0x737A,
    0xE0DB: 0x73C8,
    0xE0DC: 0x73B3,
    0xE0DD: 0x73CE,
    0xE0DE: 0x73BB,
    0xE0DF: 0x73C0,
    0xE0E0: 0x73E5,
    0xE0E1: 0x73EE,
    0xE0E2: 0x73DE,
    0xE0E3: 0x74A2,
    0xE0E4: 0x7405,
    0xE0E5: 0x746F,
    0xE0E6: 0x7425,
    0xE0E7: 0x73F8,
    0xE0E8: 0x7432,
    0xE0E9: 0x743A,
    0xE0EA: 0x7455,
    0xE0EB: 0x743F,
    0xE0EC: 0x745F,
    0xE0ED: 0x7459,
    0xE0EE: 0x7441,
    0xE0EF: 0x745C,
    0xE0F0: 0x7469,
    0xE0F1: 0x7470,
    0xE0F2: 0x7463,
    0xE0F3: 0x746A,
    0xE0F4: 0x7476,
    0xE0F5: 0x747E,
    0xE0F6: 0x748B,
    0xE0F7: 0x749E,
    0xE0F8: 0x74A7,
    0xE0F9: 0x74CA,
    0xE0FA: 0x74CF,
    0xE0FB: 0x74D4,
    0xE0FC: 0x73F1,
    0xE140: 0x74E0,
    0xE141: 0x74E3,
    0xE142: 0x74E7,
    0xE143: 0x74E9,
    0xE144: 0x74EE,
    0xE145: 0x74F2,
    0xE146: 0x74F0,
    0xE147: 0x74F1,
    0xE148: 0x74F8,
    0xE149: 0x74F7,
    0xE14A: 0x7504,
    0xE14B: 0x7503,
    0xE14C: 0x7505,
    0xE14D: 0x750C,
    0xE14E: 0x750E,
    0xE14F: 0x750D,
    0xE150: 0x7515,
    0xE151: 0x7513,
    0xE152: 0x751E,
    0xE153: 0x7526,
    0xE154: 0x752C,
    0xE155: 0x753C,
    0xE156: 0x7544,
    0xE157: 0x754D,
    0xE158: 0x754A,
    0xE159: 0x7549,
    0xE15A: 0x755B,
    0xE15B: 0x7546,
    0xE15C: 0x755A,
    0xE15D: 0x7569,
    0xE15E: 0x7564,
    0xE15F: 0x7567,
    0xE160: 0x756B,
    0xE161: 0x756D,
    0xE162: 0x7578,
    0xE163: 0x7576,
    0xE164: 0x7586,
    0xE165: 0x7587,
    0xE166: 0x7574,
    0xE167: 0x758A,
    0xE168: 0x7589,
    0xE169: 0x7582,
    0xE16A: 0x7594,
    0xE16B: 0x759A,
    0xE16C: 0x759D,
    0xE16D: 0x75A5,
    0xE16E: 0x75A3,
    0xE16F: 0x75C2,
    0xE170: 0x75B3,
    0xE171: 0x75C3,
    0xE172: 0x75B5,
    0xE173: 0x75BD,
    0xE174: 0x75B8,
    0xE175: 0x75BC,
    0xE176: 0x75B1,
    0xE177: 0x75CD,
    0xE178: 0x75CA,
    0xE179: 0x75D2,
    0xE17A: 0x75D9,
    0xE17B: 0x75E3,
    0xE17C: 0x75DE,
    0xE17D: 0x75FE,
    0xE17E: 0x75FF,
    0xE180: 0x75FC,
    0xE181: 0x7601,
    0xE182: 0x75F0,
    0xE183: 0x75FA,
    0xE184: 0x75F2,
    0xE185: 0x75F3,
    0xE186: 0x760B,
    0xE187: 0x760D,
    0xE188: 0x7609,
    0xE189: 0x761F,
    0xE18A: 0x7627,
    0xE18B: 0x7620,
    0xE18C: 0x7621,
    0xE18D: 0x7622,
    0xE18E: 0x7624,
    0xE18F: 0x7634,
    0xE190: 0x7630,
    0xE191: 0x763B,
    0xE192: 0x7647,
    0xE193: 0x7648,
    0xE194: 0x7646,
    0xE195: 0x765C,
    0xE196: 0x7658,
    0xE197: 0x7661,
    0xE198: 0x7662,
    0xE199: 0x7668,
    0xE19A: 0x7669,
    0xE19B: 0x766A,
    0xE19C: 0x7667,
    0xE19D: 0x766C,
    0xE19E: 0x7670,
    0xE19F: 0x7672,
    0xE1A0: 0x7676,
    0xE1A1: 0x7678,
    0xE1A2: 0x767C,
    0xE1A3: 0x7680,
    0xE1A4: 0x7683,
    0xE1A5: 0x7688,
    0xE1A6: 0x768B,
    0xE1A7: 0x768E,
    0xE1A8: 0x7696,
    0xE1A9: 0x7693,
    0xE1AA: 0x7699,
    0xE1AB: 0x769A,
    0xE1AC: 0x76B0,
    0xE1AD: 0x76B4,
    0xE1AE: 0x76B8,
    0xE1AF: 0x76B9,
    0xE1B0: 0x76BA,
    0xE1B1: 0x76C2,
    0xE1B2: 0x76CD,
    0xE1B3: 0x76D6,
    0xE1B4: 0x76D2,
    0xE1B5: 0x76DE,
    0xE1B6: 0x76E1,
    0xE1B7: 0x76E5,
    0xE1B8: 0x76E7,
    0xE1B9: 0x76EA,
    0xE1BA: 0x862F,
    0xE1BB: 0x76FB,
    0xE1BC: 0x7708,
    0xE1BD: 0x7707,
    0xE1BE: 0x7704,
    0xE1BF: 0x7729,
    0xE1C0: 0x7724,
    0xE1C1: 0x771E,
    0xE1C2: 0x7725,
    0xE1C3: 0x7726,
    0xE1C4: 0x771B,
    0xE1C5: 0x7737,
    0xE1C6: 0x7738,
    0xE1C7: 0x7747,
    0xE1C8: 0x775A,
    0xE1C9: 0x7768,
    0xE1CA: 0x776B,
    0xE1CB: 0x775B,
    0xE1CC: 0x7765,
    0xE1CD: 0x777F,
    0xE1CE: 0x777E,
    0xE1CF: 0x7779,
    0xE1D0: 0x778E,
    0xE1D1: 0x778B,
    0xE1D2: 0x7791,
    0xE1D3: 0x77A0,
    0xE1D4: 0x779E,
    0xE1D5: 0x77B0,
    0xE1D6: 0x77B6,
    0xE1D7: 0x77B9,
    0xE1D8: 0x77BF,
    0xE1D9: 0x77BC,
    0xE1DA: 0x77BD,
    0xE1DB: 0x77BB,
    0xE1DC: 0x77C7,
    0xE1DD: 0x77CD,
    0xE1DE: 0x77D7,
    0xE1DF: 0x77DA,
    0xE1E0: 0x77DC,
    0xE1E1: 0x77E3,
    0xE1E2: 0x77EE,
    0xE1E3: 0x77FC,
    0xE1E4: 0x780C,
    0xE1E5: 0x7812,
    0xE1E6: 0x7926,
    0xE1E7: 0x7820,
    0xE1E8: 0x792A,
    0xE1E9: 0x7845,
    0xE1EA: 0x788E,
    0xE1EB: 0x7874,
    0xE1EC: 0x7886,
    0xE1ED: 0x787C,
    0xE1EE: 0x789A,
    0xE1EF: 0x788C,
    0xE1F0: 0x78A3,
    0xE1F1: 0x78B5,
    0xE1F2: 0x78AA,
    0xE1F3: 0x78AF,
    0xE1F4: 0x78D1,
    0xE1F5: 0x78C6,
    0xE1F6: 0x78CB,
    0xE1F7: 0x78D4,
    0xE1F8: 0x78BE,
    0xE1F9: 0x78BC,
    0xE1FA: 0x78C5,
    0xE1FB: 0x78CA,
    0xE1FC: 0x78EC,
    0xE240: 0x78E7,
    0xE241: 0x78DA,
    0xE242: 0x78FD,
    0xE243: 0x78F4,
    0xE244: 0x7907,
    0xE245: 0x7912,
    0xE246: 0x7911,
    0xE247: 0x7919,
    0xE248: 0x792C,
    0xE249: 0x792B,
    0xE24A: 0x7940,
    0xE24B: 0x7960,
    0xE24C: 0x7957,
    0xE24D: 0x795F,
    0xE24E: 0x795A,
    0xE24F: 0x7955,
    0xE250: 0x7953,
    0xE251: 0x797A,
    0xE252: 0x797F,
    0xE253: 0x798A,
    0xE254: 0x799D,
    0xE255: 0x79A7,
    0xE256: 0x9F4B,
    0xE257: 0x79AA,
    0xE258: 0x79AE,
    0xE259: 0x79B3,
    0xE25A: 0x79B9,
    0xE25B: 0x79BA,
    0xE25C: 0x79C9,
    0xE25D: 0x79D5,
    0xE25E: 0x79E7,
    0xE25F: 0x79EC,
    0xE260: 0x79E1,
    0xE261: 0x79E3,
    0xE262: 0x7A08,
    0xE263: 0x7A0D,
    0xE264: 0x7A18,
    0xE265: 0x7A19,
    0xE266: 0x7A20,
    0xE267: 0x7A1F,
    0xE268: 0x7980,
    0xE269: 0x7A31,
    0xE26A: 0x7A3B,
    0xE26B: 0x7A3E,
    0xE26C: 0x7A37,
    0xE26D: 0x7A43,
    0xE26E: 0x7A57,
    0xE26F: 0x7A49,
    0xE270: 0x7A61,
    0xE271: 0x7A62,
    0xE272: 0x7A69,
    0xE273: 0x9F9D,
    0xE274: 0x7A70,
    0xE275: 0x7A79,
    0xE276: 0x7A7D,
    0xE277: 0x7A88,
    0xE278: 0x7A97,
    0xE279: 0x7A95,
    0xE27A: 0x7A98,
    0xE27B: 0x7A96,
    0xE27C: 0x7AA9,
    0xE27D: 0x7AC8,
    0xE27E: 0x7AB0,
    0xE280: 0x7AB6,
    0xE281: 0x7AC5,
    0xE282: 0x7AC4,
    0xE283: 0x7ABF,
    0xE284: 0x9083,
    0xE285: 0x7AC7,
    0xE286: 0x7ACA,
    0xE287: 0x7ACD,
    0xE288: 0x7ACF,
    0xE289: 0x7AD5,
    0xE28A: 0x7AD3,
    0xE28B: 0x7AD9,
    0xE28C: 0x7ADA,
    0xE28D: 0x7ADD,
    0xE28E: 0x7AE1,
    0xE28F: 0x7AE2,
    0xE290: 0x7AE6,
    0xE291: 0x7AED,
    0xE292: 0x7AF0,
    0xE293: 0x7B02,
    0xE294: 0x7B0F,
    0xE295: 0x7B0A,
    0xE296: 0x7B06,
    0xE297: 0x7B33,
    0xE298: 0x7B18,
    0xE299: 0x7B19,
    0xE29A: 0x7B1E,
    0xE29B: 0x7B35,
    0xE29C: 0x7B28,
    0xE29D: 0x7B36,
    0xE29E: 0x7B50,
    0xE29F: 0x7B7A,
    0xE2A0: 0x7B04,
    0xE2A1: 0x7B4D,
    0xE2A2: 0x7B0B,
    0xE2A3: 0x7B4C,
    0xE2A4: 0x7B45,
    0xE2A5: 0x7B75,
    0xE2A6: 0x7B65,
    0xE2A7: 0x7B74,
    0xE2A8: 0x7B67,
    0xE2A9: 0x7B70,
    0xE2AA: 0x7B71,
    0xE2AB: 0x7B6C,
    0xE2AC: 0x7B6E,
    0xE2AD: 0x7B9D,
    0xE2AE: 0x7B98,
    0xE2AF: 0x7B9F,
    0xE2B0: 0x7B8D,
    0xE2B1: 0x7B9C,
    0xE2B2: 0x7B9A,
    0xE2B3: 0x7B8B,
    0xE2B4: 0x7B92,
    0xE2B5: 0x7B8F,
    0xE2B6: 0x7B5D,
    0xE2B7: 0x7B99,
    0xE2B8: 0x7BCB,
    0xE2B9: 0x7BC1,
    0xE2BA: 0x7BCC,
    0xE2BB: 0x7BCF,
    0xE2BC: 0x7BB4,
    0xE2BD: 0x7BC6,
    0xE2BE: 0x7BDD,
    0xE2BF: 0x7BE9,
    0xE2C0: 0x7C11,
    0xE2C1: 0x7C14,
    0xE2C2: 0x7BE6,
    0xE2C3: 0x7BE5,
    0xE2C4: 0x7C60,
    0xE2C5: 0x7C00,
    0xE2C6: 0x7C07,
    0xE2C7: 0x7C13,
    0xE2C8: 0x7BF3,
    0xE2C9: 0x7BF7,
    0xE2CA: 0x7C17,
    0xE2CB: 0x7C0D,
    0xE2CC: 0x7BF6,
    0xE2CD: 0x7C23,
    0xE2CE: 0x7C27,
    0xE2CF: 0x7C2A,
    0xE2D0: 0x7C1F,
    0xE2D1: 0x7C37,
    0xE2D2: 0x7C2B,
    0xE2D3: 0x7C3D,
    0xE2D4: 0x7C4C,
    0xE2D5: 0x7C43,
    0xE2D6: 0x7C54,
    0xE2D7: 0x7C4F,
    0xE2D8: 0x7C40,
    0xE2D9: 0x7C50,
    0xE2DA: 0x7C58,
    0xE2DB: 0x7C5F,
    0xE2DC: 0x7C64,
    0xE2DD: 0x7C56,
    0xE2DE: 0x7C65,
    0xE2DF: 0x7C6C,
    0xE2E0: 0x7C75,
    0xE2E1: 0x7C83,
    0xE2E2: 0x7C90,
    0xE2E3: 0x7CA4,
    0xE2E4: 0x7CAD,
    0xE2E5: 0x7CA2,
    0xE2E6: 0x7CAB,
    0xE2E7: 0x7CA1,
    0xE2E8: 0x7CA8,
    0xE2E9: 0x7CB3,
    0xE2EA: 0x7CB2,
    0xE2EB: 0x7CB1,
    0xE2EC: 0x7CAE,
    0xE2ED: 0x7CB9,
    0xE2EE: 0x7CBD,
    0xE2EF: 0x7CC0,
    0xE2F0: 0x7CC5,
    0xE2F1: 0x7CC2,
    0xE2F2: 0x7CD8,
    0xE2F3: 0x7CD2,
    0xE2F4: 0x7CDC,
    0xE2F5: 0x7CE2,
    0xE2F6: 0x9B3B,
    0xE2F7: 0x7CEF,
    0xE2F8: 0x7CF2,
    0xE2F9: 0x7CF4,
    0xE2FA: 0x7CF6,
    0xE2FB: 0x7CFA,
    0xE2FC: 0x7D06,
    0xE340: 0x7D02,
    0xE341: 0x7D1C,
    0xE342: 0x7D15,
    0xE343: 0x7D0A,
    0xE344: 0x7D45,
    0xE345: 0x7D4B,
    0xE346: 0x7D2E,
    0xE347: 0x7D32,
    0xE348: 0x7D3F,
    0xE349: 0x7D35,
    0xE34A: 0x7D46,
    0xE34B: 0x7D73,
    0xE34C: 0x7D56,
    0xE34D: 0x7D4E,
    0xE34E: 0x7D72,
    0xE34F: 0x7D68,
    0xE350: 0x7D6E,
    0xE351: 0x7D4F,
    0xE352: 0x7D63,
    0xE353: 0x7D93,
    0xE354: 0x7D89,
    0xE355: 0x7D5B,
    0xE356: 0x7D8F,
    0xE357: 0x7D7D,
    0xE358: 0x7D9B,
    0xE359: 0x7DBA,
    0xE35A: 0x7DAE,
    0xE35B: 0x7DA3,
    0xE35C: 0x7DB5,
    0xE35D: 0x7DC7,
    0xE35E: 0x7DBD,
    0xE35F: 0x7DAB,
    0xE360: 0x7E3D,
    0xE361: 0x7DA2,
    0xE362: 0x7DAF,
    0xE363: 0x7DDC,
    0xE364: 0x7DB8,
    0xE365: 0x7D9F,
    0xE366: 0x7DB0,
    0xE367: 0x7DD8,
    0xE368: 0x7DDD,
    0xE369: 0x7DE4,
    0xE36A: 0x7DDE,
    0xE36B: 0x7DFB,
    0xE36C: 0x7DF2,
    0xE36D: 0x7DE1,
    0xE36E: 0x7E05,
    0xE36F: 0x7E0A,
    0xE370: 0x7E23,
    0xE371: 0x7E21,
    0xE372: 0x7E12,
    0xE373: 0x7E31,
    0xE374: 0x7E1F,
    0xE375: 0x7E09,
    0xE376: 0x7E0B,
    0xE377: 0x7E22,
    0xE378: 0x7E46,
    0xE379: 0x7E66,
    0xE37A: 0x7E3B,
    0xE37B: 0x7E35,
    0xE37C: 0x7E39,
    0xE37D: 0x7E43,
    0xE37E: 0x7E37,
    0xE380: 0x7E32,
    0xE381: 0x7E3A,
    0xE382: 0x7E67,
    0xE383: 0x7E5D,
    0xE384: 0x7E56,
    0xE385: 0x7E5E,
    0xE386: 0x7E59,
    0xE387: 0x7E5A,
    0xE388: 0x7E79,
    0xE389: 0x7E6A,
    0xE38A: 0x7E69,
    0xE38B: 0x7E7C,
    0xE38C: 0x7E7B,
    0xE38D: 0x7E83,
    0xE38E: 0x7DD5,
    0xE38F: 0x7E7D,
    0xE390: 0x8FAE,
    0xE391: 0x7E7F,
    0xE392: 0x7E88,
    0xE393: 0x7E89,
    0xE394: 0x7E8C,
    0xE395: 0x7E92,
    0xE396: 0x7E90,
    0xE397: 0x7E93,
    0xE398: 0x7E94,
    0xE399: 0x7E96,
    0xE39A: 0x7E8E,
    0xE39B: 0x7E9B,
    0xE39C: 0x7E9C,
    0xE39D: 0x7F38,
    0xE39E: 0x7F3A,
    0xE39F: 0x7F45,
    0xE3A0: 0x7F4C,
    0xE3A1: 0x7F4D,
    0xE3A2: 0x7F4E,
    0xE3A3: 0x7F50,
    0xE3A4: 0x7F51,
    0xE3A5: 0x7F55,
    0xE3A6: 0x7F54,
    0xE3A7: 0x7F58,
    0xE3A8: 0x7F5F,
    0xE3A9: 0x7F60,
    0xE3AA: 0x7F68,
    0xE3AB: 0x7F69,
    0xE3AC: 0x7F67,
    0xE3AD: 0x7F78,
    0xE3AE: 0x7F82,
    0xE3AF: 0x7F86,
    0xE3B0: 0x7F83,
    0xE3B1: 0x7F88,
    0xE3B2: 0x7F87,
    0xE3B3: 0x7F8C,
    0xE3B4: 0x7F94,
    0xE3B5: 0x7F9E,
    0xE3B6: 0x7F9D,
    0xE3B7: 0x7F9A,
    0xE3B8: 0x7FA3,
    0xE3B9: 0x7FAF,
    0xE3BA: 0x7FB2,
    0xE3BB: 0x7FB9,
    0xE3BC: 0x7FAE,
    0xE3BD: 0x7FB6,
    0xE3BE: 0x7FB8,
    0xE3BF: 0x8B71,
    0xE3C0: 0x7FC5,
    0xE3C1: 0x7FC6,
    0xE3C2: 0x7FCA,
    0xE3C3: 0x7FD5,
    0xE3C4: 0x7FD4,
    0xE3C5: 0x7FE1,
    0xE3C6: 0x7FE6,
    0xE3C7: 0x7FE9,
    0xE3C8: 0x7FF3,
    0xE3C9: 0x7FF9,
    0xE3CA: 0x98DC,
    0xE3CB: 0x8006,
    0xE3CC: 0x8004,
    0xE3CD: 0x800B,
    0xE3CE: 0x8012,
    0xE3CF: 0x8018,
    0xE3D0: 0x8019,
    0xE3D1: 0x801C,
    0xE3D2: 0x8021,
    0xE3D3: 0x8028,
    0xE3D4: 0x803F,
    0xE3D5: 0x803B,
    0xE3D6: 0x804A,
    0xE3D7: 0x8046,
    0xE3D8: 0x8052,
    0xE3D9: 0x8058,
    0xE3DA: 0x805A,
    0xE3DB: 0x805F,
    0xE3DC: 0x8062,
    0xE3DD: 0x8068,
    0xE3DE: 0x8073,
    0xE3DF: 0x8072,
    0xE3E0: 0x8070,
    0xE3E1: 0x8076,
    0xE3E2: 0x8079,
    0xE3E3: 0x807D,
    0xE3E4: 0x807F,
    0xE3E5: 0x8084,
    0xE3E6: 0x8086,
    0xE3E7: 0x8085,
    0xE3E8: 0x809B,
    0xE3E9: 0x8093,
    0xE3EA: 0x809A,
    0xE3EB: 0x80AD,
    0xE3EC: 0x5190,
    0xE3ED: 0x80AC,
    0xE3EE: 0x80DB,
    0xE3EF: 0x80E5,
    0xE3F0: 0x80D9,
    0xE3F1: 0x80DD,
    0xE3F2: 0x80C4,
    0xE3F3: 0x80DA,
    0xE3F4: 0x80D6,
    0xE3F5: 0x8109,
    0xE3F6: 0x80EF,
    0xE3F7: 0x80F1,
    0xE3F8: 0x811B,
    0xE3F9: 0x8129,
    0xE3FA: 0x8123,
    0xE3FB: 0x812F,
    0xE3FC: 0x814B,
    0xE440: 0x968B,
    0xE441: 0x8146,
    0xE442: 0x813E,
    0xE443: 0x8153,
    0xE444: 0x8151,
    0xE445: 0x80FC,
    0xE446: 0x8171,
    0xE447: 0x816E,
    0xE448: 0x8165,
    0xE449: 0x8166,
    0xE44A: 0x8174,
    0xE44B: 0x8183,
    0xE44C: 0x8188,
    0xE44D: 0x818A,
    0xE44E: 0x8180,
    0xE44F: 0x8182,
    0xE450: 0x81A0,
    0xE451: 0x8195,
    0xE452: 0x81A4,
    0xE453: 0x81A3,
    0xE454: 0x815F,
    0xE455: 0x8193,
    0xE456: 0x81A9,
    0xE457: 0x81B0,
    0xE458: 0x81B5,
    0xE459: 0x81BE,
    0xE45A: 0x81B8,
    0xE45B: 0x81BD,
    0xE45C: 0x81C0,
    0xE45D: 0x81C2,
    0xE45E: 0x81BA,
    0xE45F: 0x81C9,
    0xE460: 0x81CD,
    0xE461: 0x81D1,
    0xE462: 0x81D9,
    0xE463: 0x81D8,
    0xE464: 0x81C8,
    0xE465: 0x81DA,
    0xE466: 0x81DF,
    0xE467: 0x81E0,
    0xE468: 0x81E7,
    0xE469: 0x81FA,
    0xE46A: 0x81FB,
    0xE46B: 0x81FE,
    0xE46C: 0x8201,
    0xE46D: 0x8202,
    0xE46E: 0x8205,
    0xE46F: 0x8207,
    0xE470: 0x820A,
    0xE471: 0x820D,
    0xE472: 0x8210,
    0xE473: 0x8216,
    0xE474: 0x8229,
    0xE475: 0x822B,
    0xE476: 0x8238,
    0xE477: 0x8233,
    0xE478: 0x8240,
    0xE479: 0x8259,
    0xE47A: 0x8258,
    0xE47B: 0x825D,
    0xE47C: 0x825A,
    0xE47D: 0x825F,
    0xE47E: 0x8264,
    0xE480: 0x8262,
    0xE481: 0x8268,
    0xE482: 0x826A,
    0xE483: 0x826B,
    0xE484: 0x822E,
    0xE485: 0x8271,
    0xE486: 0x8277,
    0xE487: 0x8278,
    0xE488: 0x827E,
    0xE489: 0x828D,
    0xE48A: 0x8292,
    0xE48B: 0x82AB,
    0xE48C: 0x829F,
    0xE48D: 0x82BB,
    0xE48E: 0x82AC,
    0xE48F: 0x82E1,
    0xE490: 0x82E3,
    0xE491: 0x82DF,
    0xE492: 0x82D2,
    0xE493: 0x82F4,
    0xE494: 0x82F3,
    0xE495: 0x82FA,
    0xE496: 0x8393,
    0xE497: 0x8303,
    0xE498: 0x82FB,
    0xE499: 0x82F9,
    0xE49A: 0x82DE,
    0xE49B: 0x8306,
    0xE49C: 0x82DC,
    0xE49D: 0x8309,
    0xE49E: 0x82D9,
    0xE49F: 0x8335,
    0xE4A0: 0x8334,
    0xE4A1: 0x8316,
    0xE4A2: 0x8332,
    0xE4A3: 0x8331,
    0xE4A4: 0x8340,
    0xE4A5: 0x8339,
    0xE4A6: 0x8350,
    0xE4A7: 0x8345,
    0xE4A8: 0x832F,
    0xE4A9: 0x832B,
    0xE4AA: 0x8317,
    0xE4AB: 0x8318,
    0xE4AC: 0x8385,
    0xE4AD: 0x839A,
    0xE4AE: 0x83AA,
    0xE4AF: 0x839F,
    0xE4B0: 0x83A2,
    0xE4B1: 0x8396,
    0xE4B2: 0x8323,
    0xE4B3: 0x838E,
    0xE4B4: 0x8387,
    0xE4B5: 0x838A,
    0xE4B6: 0x837C,
    0xE4B7: 0x83B5,
    0xE4B8: 0x8373,
    0xE4B9: 0x8375,
    0xE4BA: 0x83A0,
    0xE4BB: 0x8389,
    0xE4BC: 0x83A8,
    0xE4BD: 0x83F4,
    0xE4BE: 0x8413,
    0xE4BF: 0x83EB,
    0xE4C0: 0x83CE,
    0xE4C1: 0x83FD,
    0xE4C2: 0x8403,
    0xE4C3: 0x83D8,
    0xE4C4: 0x840B,
    0xE4C5: 0x83C1,
    0xE4C6: 0x83F7,
    0xE4C7: 0x8407,
    0xE4C8: 0x83E0,
    0xE4C9: 0x83F2,
    0xE4CA: 0x840D,
    0xE4CB: 0x8422,
    0xE4CC: 0x8420,
    0xE4CD: 0x83BD,
    0xE4CE: 0x8438,
    0xE4CF: 0x8506,
    0xE4D0: 0x83FB,
    0xE4D1: 0x846D,
    0xE4D2: 0x842A,
    0xE4D3: 0x843C,
    0xE4D4: 0x855A,
    0xE4D5: 0x8484,
    0xE4D6: 0x8477,
    0xE4D7: 0x846B,
    0xE4D8: 0x84AD,
    0xE4D9: 0x846E,
    0xE4DA: 0x8482,
    0xE4DB: 0x8469,
    0xE4DC: 0x8446,
    0xE4DD: 0x842C,
    0xE4DE: 0x846F,
    0xE4DF: 0x8479,
    0xE4E0: 0x8435,
    0xE4E1: 0x84CA,
    0xE4E2: 0x8462,
    0xE4E3: 0x84B9,
    0xE4E4: 0x84BF,
    0xE4E5: 0x849F,
    0xE4E6: 0x84D9,
    0xE4E7: 0x84CD,
    0xE4E8: 0x84BB,
    0xE4E9: 0x84DA,
    0xE4EA: 0x84D0,
    0xE4EB: 0x84C1,
    0xE4EC: 0x84C6,
    0xE4ED: 0x84D6,
    0xE4EE: 0x84A1,
    0xE4EF: 0x8521,
    0xE4F0: 0x84FF,
    0xE4F1: 0x84F4,
    0xE4F2: 0x8517,
    0xE4F3: 0x8518,
    0xE4F4: 0x852C,
    0xE4F5: 0x851F,
    0xE4F6: 0x8515,
    0xE4F7: 0x8514,
    0xE4F8: 0x84FC,
    0xE4F9: 0x8540,
    0xE4FA: 0x8563,
    0xE4FB: 0x8558,
    0xE4FC: 0x8548,
    0xE540: 0x8541,
    0xE541: 0x8602,
    0xE542: 0x854B,
    0xE543: 0x8555,
    0xE544: 0x8580,
    0xE545: 0x85A4,
    0xE546: 0x8588,
    0xE547: 0x8591,
    0xE548: 0x858A,
    0xE549: 0x85A8,
    0xE54A: 0x856D,
    0xE54B: 0x8594,
    0xE54C: 0x859B,
    0xE54D: 0x85EA,
    0xE54E: 0x8587,
    0xE54F: 0x859C,
    0xE550: 0x8577,
    0xE551: 0x857E,
    0xE552: 0x8590,
    0xE553: 0x85C9,
    0xE554: 0x85BA,
    0xE555: 0x85CF,
    0xE556: 0x85B9,
    0xE557: 0x85D0,
    0xE558: 0x85D5,
    0xE559: 0x85DD,
    0xE55A: 0x85E5,
    0xE55B: 0x85DC,
    0xE55C: 0x85F9,
    0xE55D: 0x860A,
    0xE55E: 0x8613,
    0xE55F: 0x860B,
    0xE560: 0x85FE,
    0xE561: 0x85FA,
    0xE562: 0x8606,
    0xE563: 0x8622,
    0xE564: 0x861A,
    0xE565: 0x8630,
    0xE566: 0x863F,
    0xE567: 0x864D,
    0xE568: 0x4E55,
    0xE569: 0x8654,
    0xE56A: 0x865F,
    0xE56B: 0x8667,
    0xE56C: 0x8671,
    0xE56D: 0x8693,
    0xE56E: 0x86A3,
    0xE56F: 0x86A9,
    0xE570: 0x86AA,
    0xE571: 0x868B,
    0xE572: 0x868C,
    0xE573: 0x86B6,
    0xE574: 0x86AF,
    0xE575: 0x86C4,
    0xE576: 0x86C6,
    0xE577: 0x86B0,
    0xE578: 0x86C9,
    0xE579: 0x8823,
    0xE57A: 0x86AB,
    0xE57B: 0x86D4,
    0xE57C: 0x86DE,
    0xE57D: 0x86E9,
    0xE57E: 0x86EC,
    0xE580: 0x86DF,
    0xE581: 0x86DB,
    0xE582: 0x86EF,
    0xE583: 0x8712,
    0xE584: 0x8706,
    0xE585: 0x8708,
    0xE586: 0x8700,
    0xE587: 0x8703,
    0xE588: 0x86FB,
    0xE589: 0x8711,
    0xE58A: 0x8709,
    0xE58B: 0x870D,
    0xE58C: 0x86F9,
    0xE58D: 0x870A,
    0xE58E: 0x8734,
    0xE58F: 0x873F,
    0xE590: 0x8737,
    0xE591: 0x873B,
    0xE592: 0x8725,
    0xE593: 0x8729,
    0xE594: 0x871A,
    0xE595: 0x8760,
    0xE596: 0x875F,
    0xE597: 0x8778,
    0xE598: 0x874C,
    0xE599: 0x874E,
    0xE59A: 0x8774,
    0xE59B: 0x8757,
    0xE59C: 0x8768,
    0xE59D: 0x876E,
    0xE59E: 0x8759,
    0xE59F: 0x8753,
    0xE5A0: 0x8763,
    0xE5A1: 0x876A,
    0xE5A2: 0x8805,
    0xE5A3: 0x87A2,
    0xE5A4: 0x879F,
    0xE5A5: 0x8782,
    0xE5A6: 0x87AF,
    0xE5A7: 0x87CB,
    0xE5A8: 0x87BD,
    0xE5A9: 0x87C0,
    0xE5AA: 0x87D0,
    0xE5AB: 0x96D6,
    0xE5AC: 0x87AB,
    0xE5AD: 0x87C4,
    0xE5AE: 0x87B3,
    0xE5AF: 0x87C7,
    0xE5B0: 0x87C6,
    0xE5B1: 0x87BB,
    0xE5B2: 0x87EF,
    0xE5B3: 0x87F2,
    0xE5B4: 0x87E0,
    0xE5B5: 0x880F,
    0xE5B6: 0x880D,
    0xE5B7: 0x87FE,
    0xE5B8: 0x87F6,
    0xE5B9: 0x87F7,
    0xE5BA: 0x880E,
    0xE5BB: 0x87D2,
    0xE5BC: 0x8811,
    0xE5BD: 0x8816,
    0xE5BE: 0x8815,
    0xE5BF: 0x8822,
    0xE5C0: 0x8821,
    0xE5C1: 0x8831,
    0xE5C2: 0x8836,
    0xE5C3: 0x8839,
    0xE5C4: 0x8827,
    0xE5C5: 0x883B,
    0xE5C6: 0x8844,
    0xE5C7: 0x8842,
    0xE5C8: 0x8852,
    0xE5C9: 0x8859,
    0xE5CA: 0x885E,
    0xE5CB: 0x8862,
    0xE5CC: 0x886B,
    0xE5CD: 0x8881,
    0xE5CE: 0x887E,
    0xE5CF: 0x889E,
    0xE5D0: 0x8875,
    0xE5D1: 0x887D,
    0xE5D2: 0x88B5,
    0xE5D3: 0x8872,
    0xE5D4: 0x8882,
    0xE5D5: 0x8897,
    0xE5D6: 0x8892,
    0xE5D7: 0x88AE,
    0xE5D8: 0x8899,
    0xE5D9: 0x88A2,
    0xE5DA: 0x888D,
    0xE5DB: 0x88A4,
    0xE5DC: 0x88B0,
    0xE5DD: 0x88BF,
    0xE5DE: 0x88B1,
    0xE5DF: 0x88C3,
    0xE5E0: 0x88C4,
    0xE5E1: 0x88D4,
    0xE5E2: 0x88D8,
    0xE5E3: 0x88D9,
    0xE5E4: 0x88DD,
    0xE5E5: 0x88F9,
    0xE5E6: 0x8902,
    0xE5E7: 0x88FC,
    0xE5E8: 0x88F4,
    0xE5E9: 0x88E8,
    0xE5EA: 0x88F2,
    0xE5EB: 0x8904,
    0xE5EC: 0x890C,
    0xE5ED: 0x890A,
    0xE5EE: 0x8913,
    0xE5EF: 0x8943,
    0xE5F0: 0x891E,
    0xE5F1: 0x8925,
    0xE5F2: 0x892A,
    0xE5F3: 0x892B,
    0xE5F4: 0x8941,
    0xE5F5: 0x8944,
    0xE5F6: 0x893B,
    0xE5F7: 0x8936,
    0xE5F8: 0x8938,
    0xE5F9: 0x894C,
    0xE5FA: 0x891D,
    0xE5FB: 0x8960,
    0xE5FC: 0x895E,
    0xE640: 0x8966,
    0xE641: 0x8964,
    0xE642: 0x896D,
    0xE643: 0x896A,
    0xE644: 0x896F,
    0xE645: 0x8974,
    0xE646: 0x8977,
    0xE647: 0x897E,
    0xE648: 0x8983,
    0xE649: 0x8988,
    0xE64A: 0x898A,
    0xE64B: 0x8993,
    0xE64C: 0x8998,
    0xE64D: 0x89A1,
    0xE64E: 0x89A9,
    0xE64F: 0x89A6,
    0xE650: 0x89AC,
    0xE651: 0x89AF,
    0xE652: 0x89B2,
    0xE653: 0x89BA,
    0xE654: 0x89BD,
    0xE655: 0x89BF,
    0xE656: 0x89C0,
    0xE657: 0x89DA,
    0xE658: 0x89DC,
    0xE659: 0x89DD,
    0xE65A: 0x89E7,
    0xE65B: 0x89F4,
    0xE65C: 0x89F8,
    0xE65D: 0x8A03,
    0xE65E: 0x8A16,
    0xE65F: 0x8A10,
    0xE660: 0x8A0C,
    0xE661: 0x8A1B,
    0xE662: 0x8A1D,
    0xE663: 0x8A25,
    0xE664: 0x8A36,
    0xE665: 0x8A41,
    0xE666: 0x8A5B,
    0xE667: 0x8A52,
    0xE668: 0x8A46,
    0xE669: 0x8A48,
    0xE66A: 0x8A7C,
    0xE66B: 0x8A6D,
    0xE66C: 0x8A6C,
    0xE66D: 0x8A62,
    0xE66E: 0x8A85,
    0xE66F: 0x8A82,
    0xE670: 0x8A84,
    0xE671: 0x8AA8,
    0xE672: 0x8AA1,
    0xE673: 0x8A91,
    0xE674: 0x8AA5,
    0xE675: 0x8AA6,
    0xE676: 0x8A9A,
    0xE677: 0x8AA3,
    0xE678: 0x8AC4,
    0xE679: 0x8ACD,
    0xE67A: 0x8AC2,
    0xE67B: 0x8ADA,
    0xE67C: 0x8AEB,
    0xE67D: 0x8AF3,
    0xE67E: 0x8AE7,
    0xE680: 0x8AE4,
    0xE681: 0x8AF1,
    0xE682: 0x8B14,
    0xE683: 0x8AE0,
    0xE684: 0x8AE2,
    0xE685: 0x8AF7,
    0xE686: 0x8ADE,
    0xE687: 0x8ADB,
    0xE688: 0x8B0C,
    0xE689: 0x8B07,
    0xE68A: 0x8B1A,
    0xE68B: 0x8AE1,
    0xE68C: 0x8B16,
    0xE68D: 0x8B10,
    0xE68E: 0x8B17,
    0xE68F: 0x8B20,
    0xE690: 0x8B33,
    0xE691: 0x97AB,
    0xE692: 0x8B26,
    0xE693: 0x8B2B,
    0xE694: 0x8B3E,
    0xE695: 0x8B28,
    0xE696: 0x8B41,
    0xE697: 0x8B4C,
    0xE698: 0x8B4F,
    0xE699: 0x8B4E,
    0xE69A: 0x8B49,
    0xE69B: 0x8B56,
    0xE69C: 0x8B5B,
    0xE69D: 0x8B5A,
    0xE69E: 0x8B6B,
    0xE69F: 0x8B5F,
    0xE6A0: 0x8B6C,
    0xE6A1: 0x8B6F,
    0xE6A2: 0x8B74,
    0xE6A3: 0x8B7D,
    0xE6A4: 0x8B80,
    0xE6A5: 0x8B8C,
    0xE6A6: 0x8B8E,
    0xE6A7: 0x8B92,
    0xE6A8: 0x8B93,
    0xE6A9: 0x8B96,
    0xE6AA: 0x8B99,
    0xE6AB: 0x8B9A,
    0xE6AC: 0x8C3A,
    0xE6AD: 0x8C41,
    0xE6AE: 0x8C3F,
    0xE6AF: 0x8C48,
    0xE6B0: 0x8C4C,
    0xE6B1: 0x8C4E,
    0xE6B2: 0x8C50,
    0xE6B3: 0x8C55,
    0xE6B4: 0x8C62,
    0xE6B5: 0x8C6C,
    0xE6B6: 0x8C78,
    0xE6B7: 0x8C7A,
    0xE6B8: 0x8C82,
    0xE6B9: 0x8C89,
    0xE6BA: 0x8C85,
    0xE6BB: 0x8C8A,
    0xE6BC: 0x8C8D,
    0xE6BD: 0x8C8E,
    0xE6BE: 0x8C94,
    0xE6BF: 0x8C7C,
    0xE6C0: 0x8C98,
    0xE6C1: 0x621D,
    0xE6C2: 0x8CAD,
    0xE6C3: 0x8CAA,
    0xE6C4: 0x8CBD,
    0xE6C5: 0x8CB2,
    0xE6C6: 0x8CB3,
    0xE6C7: 0x8CAE,
    0xE6C8: 0x8CB6,
    0xE6C9: 0x8CC8,
    0xE6CA: 0x8CC1,
    0xE6CB: 0x8CE4,
    0xE6CC: 0x8CE3,
    0xE6CD: 0x8CDA,
    0xE6CE: 0x8CFD,
    0xE6CF: 0x8CFA,
    0xE6D0: 0x8CFB,
    0xE6D1: 0x8D04,
    0xE6D2: 0x8D05,
    0xE6D3: 0x8D0A,
    0xE6D4: 0x8D07,
    0xE6D5: 0x8D0F,
    0xE6D6: 0x8D0D,
    0xE6D7: 0x8D10,
    0xE6D8: 0x9F4E,
    0xE6D9: 0x8D13,
    0xE6DA: 0x8CCD,
    0xE6DB: 0x8D14,
    0xE6DC: 0x8D16,
    0xE6DD: 0x8D67,
    0xE6DE: 0x8D6D,
    0xE6DF: 0x8D71,
    0xE6E0: 0x8D73,
    0xE6E1: 0x8D81,
    0xE6E2: 0x8D99,
    0xE6E3: 0x8DC2,
    0xE6E4: 0x8DBE,
    0xE6E5: 0x8DBA,
    0xE6E6: 0x8DCF,
    0xE6E7: 0x8DDA,
    0xE6E8: 0x8DD6,
    0xE6E9: 0x8DCC,
    0xE6EA: 0x8DDB,
    0xE6EB: 0x8DCB,
    0xE6EC: 0x8DEA,
    0xE6ED: 0x8DEB,
    0xE6EE: 0x8DDF,
    0xE6EF: 0x8DE3,
    0xE6F0: 0x8DFC,
    0xE6F1: 0x8E08,
    0xE6F2: 0x8E09,
    0xE6F3: 0x8DFF,
    0xE6F4: 0x8E1D,
    0xE6F5: 0x8E1E,
    0xE6F6: 0x8E10,
    0xE6F7: 0x8E1F,
    0xE6F8: 0x8E42,
    0xE6F9: 0x8E35,
    0xE6FA: 0x8E30,
    0xE6FB: 0x8E34,
    0xE6FC: 0x8E4A,
    0xE740: 0x8E47,
    0xE741: 0x8E49,
    0xE742: 0x8E4C,
    0xE743: 0x8E50,
    0xE744: 0x8E48,
    0xE745: 0x8E59,
    0xE746: 0x8E64,
    0xE747: 0x8E60,
    0xE748: 0x8E2A,
    0xE749: 0x8E63,
    0xE74A: 0x8E55,
    0xE74B: 0x8E76,
    0xE74C: 0x8E72,
    0xE74D: 0x8E7C,
    0xE74E: 0x8E81,
    0xE74F: 0x8E87,
    0xE750: 0x8E85,
    0xE751: 0x8E84,
    0xE752: 0x8E8B,
    0xE753: 0x8E8A,
    0xE754: 0x8E93,
    0xE755: 0x8E91,
    0xE756: 0x8E94,
    0xE757: 0x8E99,
    0xE758: 0x8EAA,
    0xE759: 0x8EA1,
    0xE75A: 0x8EAC,
    0xE75B: 0x8EB0,
    0xE75C: 0x8EC6,
    0xE75D: 0x8EB1,
    0xE75E: 0x8EBE,
    0xE75F: 0x8EC5,
    0xE760: 0x8EC8,
    0xE761: 0x8ECB,
    0xE762: 0x8EDB,
    0xE763: 0x8EE3,
    0xE764: 0x8EFC,
    0xE765: 0x8EFB,
    0xE766: 0x8EEB,
    0xE767: 0x8EFE,
    0xE768: 0x8F0A,
    0xE769: 0x8F05,
    0xE76A: 0x8F15,
    0xE76B: 0x8F12,
    0xE76C: 0x8F19,
    0xE76D: 0x8F13,
    0xE76E: 0x8F1C,
    0xE76F: 0x8F1F,
    0xE770: 0x8F1B,
    0xE771: 0x8F0C,
    0xE772: 0x8F26,
    0xE773: 0x8F33,
    0xE774: 0x8F3B,
    0xE775: 0x8F39,
    0xE776: 0x8F45,
    0xE777: 0x8F42,
    0xE778: 0x8F3E,
    0xE779: 0x8F4C,
    0xE77A: 0x8F49,
    0xE77B: 0x8F46,
    0xE77C: 0x8F4E,
    0xE77D: 0x8F57,
    0xE77E: 0x8F5C,
    0xE780: 0x8F62,
    0xE781: 0x8F63,
    0xE782: 0x8F64,
    0xE783: 0x8F9C,
    0xE784: 0x8F9F,
    0xE785: 0x8FA3,
    0xE786: 0x8FAD,
    0xE787: 0x8FAF,
    0xE788: 0x8FB7,
    0xE789: 0x8FDA,
    0xE78A: 0x8FE5,
    0xE78B: 0x8FE2,
    0xE78C: 0x8FEA,
    0xE78D: 0x8FEF,
    0xE78E: 0x9087,
    0xE78F: 0x8FF4,
    0xE790: 0x9005,
    0xE791: 0x8FF9,
    0xE792: 0x8FFA,
    0xE793: 0x9011,
    0xE794: 0x9015,
    0xE795: 0x9021,
    0xE796: 0x900D,
    0xE797: 0x901E,
    0xE798: 0x9016,
    0xE799: 0x900B,
    0xE79A: 0x9027,
    0xE79B: 0x9036,
    0xE79C: 0x9035,
    0xE79D: 0x9039,
    0xE79E: 0x8FF8,
    0xE79F: 0x904F,
    0xE7A0: 0x9050,
    0xE7A1: 0x9051,
    0xE7A2: 0x9052,
    0xE7A3: 0x900E,
    0xE7A4: 0x9049,
    0xE7A5: 0x903E,
    0xE7A6: 0x9056,
    0xE7A7: 0x9058,
    0xE7A8: 0x905E,
    0xE7A9: 0x9068,
    0xE7AA: 0x906F,
    0xE7AB: 0x9076,
    0xE7AC: 0x96A8,
    0xE7AD: 0x9072,
    0xE7AE: 0x9082,
    0xE7AF: 0x907D,
    0xE7B0: 0x9081,
    0xE7B1: 0x9080,
    0xE7B2: 0x908A,
    0xE7B3: 0x9089,
    0xE7B4: 0x908F,
    0xE7B5: 0x90A8,
    0xE7B6: 0x90AF,
    0xE7B7: 0x90B1,
    0xE7B8: 0x90B5,
    0xE7B9: 0x90E2,
    0xE7BA: 0x90E4,
    0xE7BB: 0x6248,
    0xE7BC: 0x90DB,
    0xE7BD: 0x9102,
    0xE7BE: 0x9112,
    0xE7BF: 0x9119,
    0xE7C0: 0x9132,
    0xE7C1: 0x9130,
    0xE7C2: 0x914A,
    0xE7C3: 0x9156,
    0xE7C4: 0x9158,
    0xE7C5: 0x9163,
    0xE7C6: 0x9165,
    0xE7C7: 0x9169,
    0xE7C8: 0x9173,
    0xE7C9: 0x9172,
    0xE7CA: 0x918B,
    0xE7CB: 0x9189,
    0xE7CC: 0x9182,
    0xE7CD: 0x91A2,
    0xE7CE: 0x91AB,
    0xE7CF: 0x91AF,
    0xE7D0: 0x91AA,
    0xE7D1: 0x91B5,
    0xE7D2: 0x91B4,
    0xE7D3: 0x91BA,
    0xE7D4: 0x91C0,
    0xE7D5: 0x91C1,
    0xE7D6: 0x91C9,
    0xE7D7: 0x91CB,
    0xE7D8: 0x91D0,
    0xE7D9: 0x91D6,
    0xE7DA: 0x91DF,
    0xE7DB: 0x91E1,
    0xE7DC: 0x91DB,
    0xE7DD: 0x91FC,
    0xE7DE: 0x91F5,
    0xE7DF: 0x91F6,
    0xE7E0: 0x921E,
    0xE7E1: 0x91FF,
    0xE7E2: 0x9214,
    0xE7E3: 0x922C,
    0xE7E4: 0x9215,
    0xE7E5: 0x9211,
    0xE7E6: 0x925E,
    0xE7E7: 0x9257,
    0xE7E8: 0x9245,
    0xE7E9: 0x9249,
    0xE7EA: 0x9264,
    0xE7EB: 0x9248,
    0xE7EC: 0x9295,
    0xE7ED: 0x923F,
    0xE7EE: 0x924B,
    0xE7EF: 0x9250,
    0xE7F0: 0x929C,
    0xE7F1: 0x9296,
    0xE7F2: 0x9293,
    0xE7F3: 0x929B,
    0xE7F4: 0x925A,
    0xE7F5: 0x92CF,
    0xE7F6: 0x92B9,
    0xE7F7: 0x92B7,
    0xE7F8: 0x92E9,
    0xE7F9: 0x930F,
    0xE7FA: 0x92FA,
    0xE7FB: 0x9344,
    0xE7FC: 0x932E,
    0xE840: 0x9319,
    0xE841: 0x9322,
    0xE842: 0x931A,
    0xE843: 0x9323,
    0xE844: 0x933A,
    0xE845: 0x9335,
    0xE846: 0x933B,
    0xE847: 0x935C,
    0xE848: 0x9360,
    0xE849: 0x937C,
    0xE84A: 0x936E,
    0xE84B: 0x9356,
    0xE84C: 0x93B0,
    0xE84D: 0x93AC,
    0xE84E: 0x93AD,
    0xE84F: 0x9394,
    0xE850: 0x93B9,
    0xE851: 0x93D6,
    0xE852: 0x93D7,
    0xE853: 0x93E8,
    0xE854: 0x93E5,
    0xE855: 0x93D8,
    0xE856: 0x93C3,
    0xE857: 0x93DD,
    0xE858: 0x93D0,
    0xE859: 0x93C8,
    0xE85A: 0x93E4,
    0xE85B: 0x941A,
    0xE85C: 0x9414,
    0xE85D: 0x9413,
    0xE85E: 0x9403,
    0xE85F: 0x9407,
    0xE860: 0x9410,
    0xE861: 0x9436,
    0xE862: 0x942B,
    0xE863: 0x9435,
    0xE864: 0x9421,
    0xE865: 0x943A,
    0xE866: 0x9441,
    0xE867: 0x9452,
    0xE868: 0x9444,
    0xE869: 0x945B,
    0xE86A: 0x9460,
    0xE86B: 0x9462,
    0xE86C: 0x945E,
    0xE86D: 0x946A,
    0xE86E: 0x9229,
    0xE86F: 0x9470,
    0xE870: 0x9475,
    0xE871: 0x9477,
    0xE872: 0x947D,
    0xE873: 0x945A,
    0xE874: 0x947C,
    0xE875: 0x947E,
    0xE876: 0x9481,
    0xE877: 0x947F,
    0xE878: 0x9582,
    0xE879: 0x9587,
    0xE87A: 0x958A,
    0xE87B: 0x9594,
    0xE87C: 0x9596,
    0xE87D: 0x9598,
    0xE87E: 0x9599,
    0xE880: 0x95A0,
    0xE881: 0x95A8,
    0xE882: 0x95A7,
    0xE883: 0x95AD,
    0xE884: 0x95BC,
    0xE885: 0x95BB,
    0xE886: 0x95B9,
    0xE887: 0x95BE,
    0xE888: 0x95CA,
    0xE889: 0x6FF6,
    0xE88A: 0x95C3,
    0xE88B: 0x95CD,
    0xE88C: 0x95CC,
    0xE88D: 0x95D5,
    0xE88E: 0x95D4,
    0xE88F: 0x95D6,
    0xE890: 0x95DC,
    0xE891: 0x95E1,
    0xE892: 0x95E5,
    0xE893: 0x95E2,
    0xE894: 0x9621,
    0xE895: 0x9628,
    0xE896: 0x962E,
    0xE897: 0x962F,
    0xE898: 0x9642,
    0xE899: 0x964C,
    0xE89A: 0x964F,
    0xE89B: 0x964B,
    0xE89C: 0x9677,
    0xE89D: 0x965C,
    0xE89E: 0x965E,
    0xE89F: 0x965D,
    0xE8A0: 0x965F,
    0xE8A1: 0x9666,
    0xE8A2: 0x9672,
    0xE8A3: 0x966C,
    0xE8A4: 0x968D,
    0xE8A5: 0x9698,
    0xE8A6: 0x9695,
    0xE8A7: 0x9697,
    0xE8A8: 0x96AA,
    0xE8A9: 0x96A7,
    0xE8AA: 0x96B1,
    0xE8AB: 0x96B2,
    0xE8AC: 0x96B0,
    0xE8AD: 0x96B4,
    0xE8AE: 0x96B6,
    0xE8AF: 0x96B8,
    0xE8B0: 0x96B9,
    0xE8B1: 0x96CE,
    0xE8B2: 0x96CB,
    0xE8B3: 0x96C9,
    0xE8B4: 0x96CD,
    0xE8B5: 0x894D,
    0xE8B6: 0x96DC,
    0xE8B7: 0x970D,
    0xE8B8: 0x96D5,
    0xE8B9: 0x96F9,
    0xE8BA: 0x9704,
    0xE8BB: 0x9706,
    0xE8BC: 0x9708,
    0xE8BD: 0x9713,
    0xE8BE: 0x970E,
    0xE8BF: 0x9711,
    0xE8C0: 0x970F,
    0xE8C1: 0x9716,
    0xE8C2: 0x9719,
    0xE8C3: 0x9724,
    0xE8C4: 0x972A,
    0xE8C5: 0x9730,
    0xE8C6: 0x9739,
    0xE8C7: 0x973D,
    0xE8C8: 0x973E,
    0xE8C9: 0x9744,
    0xE8CA: 0x9746,
    0xE8CB: 0x9748,
    0xE8CC: 0x9742,
    0xE8CD: 0x9749,
    0xE8CE: 0x975C,
    0xE8CF: 0x9760,
    0xE8D0: 0x9764,
    0xE8D1: 0x9766,
    0xE8D2: 0x9768,
    0xE8D3: 0x52D2,
    0xE8D4: 0x976B,
    0xE8D5: 0x9771,
    0xE8D6: 0x9779,
    0xE8D7: 0x9785,
    0xE8D8: 0x977C,
    0xE8D9: 0x9781,
    0xE8DA: 0x977A,
    0xE8DB: 0x9786,
    0xE8DC: 0x978B,
    0xE8DD: 0x978F,
    0xE8DE: 0x9790,
    0xE8DF: 0x979C,
    0xE8E0: 0x97A8,
    0xE8E1: 0x97A6,
    0xE8E2: 0x97A3,
    0xE8E3: 0x97B3,
    0xE8E4: 0x97B4,
    0xE8E5: 0x97C3,
    0xE8E6: 0x97C6,
    0xE8E7: 0x97C8,
    0xE8E8: 0x97CB,
    0xE8E9: 0x97DC,
    0xE8EA: 0x97ED,
    0xE8EB: 0x9F4F,
    0xE8EC: 0x97F2,
    0xE8ED: 0x7ADF,
    0xE8EE: 0x97F6,
    0xE8EF: 0x97F5,
    0xE8F0: 0x980F,
    0xE8F1: 0x980C,
    0xE8F2: 0x9838,
    0xE8F3: 0x9824,
    0xE8F4: 0x9821,
    0xE8F5: 0x9837,
    0xE8F6: 0x983D,
    0xE8F7: 0x9846,
    0xE8F8: 0x984F,
    0xE8F9: 0x984B,
    0xE8FA: 0x986B,
    0xE8FB: 0x986F,
    0xE8FC: 0x9870,
    0xE940: 0x9871,
    0xE941: 0x9874,
    0xE942: 0x9873,
    0xE943: 0x98AA,
    0xE944: 0x98AF,
    0xE945: 0x98B1,
    0xE946: 0x98B6,
    0xE947: 0x98C4,
    0xE948: 0x98C3,
    0xE949: 0x98C6,
    0xE94A: 0x98E9,
    0xE94B: 0x98EB,
    0xE94C: 0x9903,
    0xE94D: 0x9909,
    0xE94E: 0x9912,
    0xE94F: 0x9914,
    0xE950: 0x9918,
    0xE951: 0x9921,
    0xE952: 0x991D,
    0xE953: 0x991E,
    0xE954: 0x9924,
    0xE955: 0x9920,
    0xE956: 0x992C,
    0xE957: 0x992E,
    0xE958: 0x993D,
    0xE959: 0x993E,
    0xE95A: 0x9942,
    0xE95B: 0x9949,
    0xE95C: 0x9945,
    0xE95D: 0x9950,
    0xE95E: 0x994B,
    0xE95F: 0x9951,
    0xE960: 0x9952,
    0xE961: 0x994C,
    0xE962: 0x9955,
    0xE963: 0x9997,
    0xE964: 0x9998,
    0xE965: 0x99A5,
    0xE966: 0x99AD,
    0xE967: 0x99AE,
    0xE968: 0x99BC,
    0xE969: 0x99DF,
    0xE96A: 0x99DB,
    0xE96B: 0x99DD,
    0xE96C: 0x99D8,
    0xE96D: 0x99D1,
    0xE96E: 0x99ED,
    0xE96F: 0x99EE,
    0xE970: 0x99F1,
    0xE971: 0x99F2,
    0xE972: 0x99FB,
    0xE973: 0x99F8,
    0xE974: 0x9A01,
    0xE975: 0x9A0F,
    0xE976: 0x9A05,
    0xE977: 0x99E2,
    0xE978: 0x9A19,
    0xE979: 0x9A2B,
    0xE97A: 0x9A37,
    0xE97B: 0x9A45,
    0xE97C: 0x9A42,
    0xE97D: 0x9A40,
    0xE97E: 0x9A43,
    0xE980: 0x9A3E,
    0xE981: 0x9A55,
    0xE982: 0x9A4D,
    0xE983: 0x9A5B,
    0xE984: 0x9A57,
    0xE985: 0x9A5F,
    0xE986: 0x9A62,
    0xE987: 0x9A65,
    0xE988: 0x9A64,
    0xE989: 0x9A69,
    0xE98A: 0x9A6B,
    0xE98B: 0x9A6A,
    0xE98C: 0x9AAD,
    0xE98D: 0x9AB0,
    0xE98E: 0x9ABC,
    0xE98F: 0x9AC0,
    0xE990: 0x9ACF,
    0xE991: 0x9AD1,
    0xE992: 0x9AD3,
    0xE993: 0x9AD4,
    0xE994: 0x9ADE,
    0xE995: 0x9ADF,
    0xE996: 0x9AE2,
    0xE997: 0x9AE3,
    0xE998: 0x9AE6,
    0xE999: 0x9AEF,
    0xE99A: 0x9AEB,
    0xE99B: 0x9AEE,
    0xE99C: 0x9AF4,
    0xE99D: 0x9AF1,
    0xE99E: 0x9AF7,
    0xE99F: 0x9AFB,
    0xE9A0: 0x9B06,
    0xE9A1: 0x9B18,
    0xE9A2: 0x9B1A,
    0xE9A3: 0x9B1F,
    0xE9A4: 0x9B22,
    0xE9A5: 0x9B23,
    0xE9A6: 0x9B25,
    0xE9A7: 0x9B27,
    0xE9A8: 0x9B28,
    0xE9A9: 0x9B29,
    0xE9AA: 0x9B2A,
    0xE9AB: 0x9B2E,
    0xE9AC: 0x9B2F,
    0xE9AD: 0x9B32,
    0xE9AE: 0x9B44,
    0xE9AF: 0x9B43,
    0xE9B0: 0x9B4F,
    0xE9B1: 0x9B4D,
    0xE9B2: 0x9B4E,
    0xE9B3: 0x9B51,
    0xE9B4: 0x9B58,
    0xE9B5: 0x9B74,
    0xE9B6: 0x9B93,
    0xE9B7: 0x9B83,
    0xE9B8: 0x9B91,
    0xE9B9: 0x9B96,
    0xE9BA: 0x9B97,
    0xE9BB: 0x9B9F,
    0xE9BC: 0x9BA0,
    0xE9BD: 0x9BA8,
    0xE9BE: 0x9BB4,
    0xE9BF: 0x9BC0,
    0xE9C0: 0x9BCA,
    0xE9C1: 0x9BB9,
    0xE9C2: 0x9BC6,
    0xE9C3: 0x9BCF,
    0xE9C4: 0x9BD1,
    0xE9C5: 0x9BD2,
    0xE9C6: 0x9BE3,
    0xE9C7: 0x9BE2,
    0xE9C8: 0x9BE4,
    0xE9C9: 0x9BD4,
    0xE9CA: 0x9BE1,
    0xE9CB: 0x9C3A,
    0xE9CC: 0x9BF2,
    0xE9CD: 0x9BF1,
    0xE9CE: 0x9BF0,
    0xE9CF: 0x9C15,
    0xE9D0: 0x9C14,
    0xE9D1: 0x9C09,
    0xE9D2: 0x9C13,
    0xE9D3: 0x9C0C,
    0xE9D4: 0x9C06,
    0xE9D5: 0x9C08,
    0xE9D6: 0x9C12,
    0xE9D7: 0x9C0A,
    0xE9D8: 0x9C04,
    0xE9D9: 0x9C2E,
    0xE9DA: 0x9C1B,
    0xE9DB: 0x9C25,
    0xE9DC: 0x9C24,
    0xE9DD: 0x9C21,
    0xE9DE: 0x9C30,
    0xE9DF: 0x9C47,
    0xE9E0: 0x9C32,
    0xE9E1: 0x9C46,
    0xE9E2: 0x9C3E,
    0xE9E3: 0x9C5A,
    0xE9E4: 0x9C60,
    0xE9E5: 0x9C67,
    0xE9E6: 0x9C76,
    0xE9E7: 0x9C78,
    0xE9E8: 0x9CE7,
    0xE9E9: 0x9CEC,
    0xE9EA: 0x9CF0,
    0xE9EB: 0x9D09,
    0xE9EC: 0x9D08,
    0xE9ED: 0x9CEB,
    0xE9EE: 0x9D03,
    0xE9EF: 0x9D06,
    0xE9F0: 0x9D2A,
    0xE9F1: 0x9D26,
    0xE9F2: 0x9DAF,
    0xE9F3: 0x9D23,
    0xE9F4: 0x9D1F,
    0xE9F5: 0x9D44,
    0xE9F6: 0x9D15,
    0xE9F7: 0x9D12,
    0xE9F8: 0x9D41,
    0xE9F9: 0x9D3F,
    0xE9FA: 0x9D3E,
    0xE9FB: 0x9D46,
    0xE9FC: 0x9D48,
    0xEA40: 0x9D5D,
    0xEA41: 0x9D5E,
    0xEA42: 0x9D64,
    0xEA43: 0x9D51,
    0xEA44: 0x9D50,
    0xEA45: 0x9D59,
    0xEA46: 0x9D72,
    0xEA47: 0x9D89,
    0xEA48: 0x9D87,
    0xEA49: 0x9DAB,
    0xEA4A: 0x9D6F,
    0xEA4B: 0x9D7A,
    0xEA4C: 0x9D9A,
    0xEA4D: 0x9DA4,
    0xEA4E: 0x9DA9,
    0xEA4F: 0x9DB2,
    0xEA50: 0x9DC4,
    0xEA51: 0x9DC1,
    0xEA52: 0x9DBB,
    0xEA53: 0x9DB8,
    0xEA54: 0x9DBA,
    0xEA55: 0x9DC6,
    0xEA56: 0x9DCF,
    0xEA57: 0x9DC2,
    0xEA58: 0x9DD9,
    0xEA59: 0x9DD3,
    0xEA5A: 0x9DF8,
    0xEA5B: 0x9DE6,
    0xEA5C: 0x9DED,
    0xEA5D: 0x9DEF,
    0xEA5E: 0x9DFD,
    0xEA5F: 0x9E1A,
    0xEA60: 0x9E1B,
    0xEA61: 0x9E1E,
    0xEA62: 0x9E75,
    0xEA63: 0x9E79,
    0xEA64: 0x9E7D,
    0xEA65: 0x9E81,
    0xEA66: 0x9E88,
    0xEA67: 0x9E8B,
    0xEA68: 0x9E8C,
    0xEA69: 0x9E92,
    0xEA6A: 0x9E95,
    0xEA6B: 0x9E91,
    0xEA6C: 0x9E9D,
    0xEA6D: 0x9EA5,
    0xEA6E: 0x9EA9,
    0xEA6F: 0x9EB8,
    0xEA70: 0x9EAA,
    0xEA71: 0x9EAD,
    0xEA72: 0x9761,
    0xEA73: 0x9ECC,
    0xEA74: 0x9ECE,
    0xEA75: 0x9ECF,
    0xEA76: 0x9ED0,
    0xEA77: 0x9ED4,
    0xEA78: 0x9EDC,
    0xEA79: 0x9EDE,
    0xEA7A: 0x9EDD,
    0xEA7B: 0x9EE0,
    0xEA7C: 0x9EE5,
    0xEA7D: 0x9EE8,
    0xEA7E: 0x9EEF,
    0xEA80: 0x9EF4,
    0xEA81: 0x9EF6,
    0xEA82: 0x9EF7,
    0xEA83: 0x9EF9,
    0xEA84: 0x9EFB,
    0xEA85: 0x9EFC,
    0xEA86: 0x9EFD,
    0xEA87: 0x9F07,
    0xEA88: 0x9F08,
    0xEA89: 0x76B7,
    0xEA8A: 0x9F15,
    0xEA8B: 0x9F21,
    0xEA8C: 0x9F2C,
    0xEA8D: 0x9F3E,
    0xEA8E: 0x9F4A,
    0xEA8F: 0x9F52,
    0xEA90: 0x9F54,
    0xEA91: 0x9F63,
    0xEA92: 0x9F5F,
    0xEA93: 0x9F60,
    0xEA94: 0x9F61,
    0xEA95: 0x9F66,
    0xEA96: 0x9F67,
    0xEA97: 0x9F6C,
    0xEA98: 0x9F6A,
    0xEA99: 0x9F77,
    0xEA9A: 0x9F72,
    0xEA9B: 0x9F76,
    0xEA9C: 0x9F95,
    0xEA9D: 0x9F9C,
    0xEA9E: 0x9FA0,
    0xEA9F: 0x582F,
    0xEAA0: 0x69C7,
    0xEAA1: 0x9059,
    0xEAA2: 0x7464,
    0xEAA3: 0x51DC,
    0xEAA4: 0x7199,
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGF_1 = __webpack_require__(1);
var GenericGFPoly_1 = __webpack_require__(2);
function runEuclideanAlgorithm(field, a, b, R) {
    // Assume a's degree is >= b's
    if (a.degree() < b.degree()) {
        _a = [b, a], a = _a[0], b = _a[1];
    }
    var rLast = a;
    var r = b;
    var tLast = field.zero;
    var t = field.one;
    // Run Euclidean algorithm until r's degree is less than R/2
    while (r.degree() >= R / 2) {
        var rLastLast = rLast;
        var tLastLast = tLast;
        rLast = r;
        tLast = t;
        // Divide rLastLast by rLast, with quotient in q and remainder in r
        if (rLast.isZero()) {
            // Euclidean algorithm already terminated?
            return null;
        }
        r = rLastLast;
        var q = field.zero;
        var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
        var dltInverse = field.inverse(denominatorLeadingTerm);
        while (r.degree() >= rLast.degree() && !r.isZero()) {
            var degreeDiff = r.degree() - rLast.degree();
            var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
            q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
            r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
        }
        t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
        if (r.degree() >= rLast.degree()) {
            return null;
        }
    }
    var sigmaTildeAtZero = t.getCoefficient(0);
    if (sigmaTildeAtZero === 0) {
        return null;
    }
    var inverse = field.inverse(sigmaTildeAtZero);
    return [t.multiply(inverse), r.multiply(inverse)];
    var _a;
}
function findErrorLocations(field, errorLocator) {
    // This is a direct application of Chien's search
    var numErrors = errorLocator.degree();
    if (numErrors === 1) {
        return [errorLocator.getCoefficient(1)];
    }
    var result = new Array(numErrors);
    var errorCount = 0;
    for (var i = 1; i < field.size && errorCount < numErrors; i++) {
        if (errorLocator.evaluateAt(i) === 0) {
            result[errorCount] = field.inverse(i);
            errorCount++;
        }
    }
    if (errorCount !== numErrors) {
        return null;
    }
    return result;
}
function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
    // This is directly applying Forney's Formula
    var s = errorLocations.length;
    var result = new Array(s);
    for (var i = 0; i < s; i++) {
        var xiInverse = field.inverse(errorLocations[i]);
        var denominator = 1;
        for (var j = 0; j < s; j++) {
            if (i !== j) {
                denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
            }
        }
        result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
        if (field.generatorBase !== 0) {
            result[i] = field.multiply(result[i], xiInverse);
        }
    }
    return result;
}
function decode(bytes, twoS) {
    var outputBytes = new Uint8ClampedArray(bytes.length);
    outputBytes.set(bytes);
    var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
    var poly = new GenericGFPoly_1.default(field, outputBytes);
    var syndromeCoefficients = new Uint8ClampedArray(twoS);
    var error = false;
    for (var s = 0; s < twoS; s++) {
        var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
        syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
        if (evaluation !== 0) {
            error = true;
        }
    }
    if (!error) {
        return outputBytes;
    }
    var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
    var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
    if (sigmaOmega === null) {
        return null;
    }
    var errorLocations = findErrorLocations(field, sigmaOmega[0]);
    if (errorLocations == null) {
        return null;
    }
    var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
    for (var i = 0; i < errorLocations.length; i++) {
        var position = outputBytes.length - 1 - field.log(errorLocations[i]);
        if (position < 0) {
            return null;
        }
        outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
    }
    return outputBytes;
}
exports.decode = decode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSIONS = [
    {
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 7,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
            {
                ecCodewordsPerBlock: 13,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 13 }],
            },
            {
                ecCodewordsPerBlock: 17,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 34 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 28 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 22 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 15,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 55 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 44 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 17 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 80 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 32 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 24 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 108 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 43 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 11 },
                    { numBlocks: 2, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 68 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 27 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 15 }],
            },
        ],
    },
    {
        infoBits: 0x07C94,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 78 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 31 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                    { numBlocks: 1, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x085BC,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 97 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 38 },
                    { numBlocks: 2, dataCodewordsPerBlock: 39 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 18 },
                    { numBlocks: 2, dataCodewordsPerBlock: 19 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 14 },
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x09A99,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 116 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0A4D3,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 68 },
                    { numBlocks: 2, dataCodewordsPerBlock: 69 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 43 },
                    { numBlocks: 1, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0BBF6,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 81 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 50 },
                    { numBlocks: 4, dataCodewordsPerBlock: 51 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                    { numBlocks: 4, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 12 },
                    { numBlocks: 8, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0C762,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 92 },
                    { numBlocks: 2, dataCodewordsPerBlock: 93 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 20 },
                    { numBlocks: 6, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0D847,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 107 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 37 },
                    { numBlocks: 1, dataCodewordsPerBlock: 38 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 20 },
                    { numBlocks: 4, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 11 },
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0E60D,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 40 },
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 16 },
                    { numBlocks: 5, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 5, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0F928,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 87 },
                    { numBlocks: 1, dataCodewordsPerBlock: 88 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                    { numBlocks: 5, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 7, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x10B78,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 98 },
                    { numBlocks: 1, dataCodewordsPerBlock: 99 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1145D,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 1, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 22 },
                    { numBlocks: 15, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 17, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x12A17,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 120 },
                    { numBlocks: 1, dataCodewordsPerBlock: 121 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 43 },
                    { numBlocks: 4, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x13532,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 113 },
                    { numBlocks: 4, dataCodewordsPerBlock: 114 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 44 },
                    { numBlocks: 11, dataCodewordsPerBlock: 45 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 21 },
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 13 },
                    { numBlocks: 16, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x149A6,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 41 },
                    { numBlocks: 13, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 5, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 15 },
                    { numBlocks: 10, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x15683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 116 },
                    { numBlocks: 4, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 42 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 16 },
                    { numBlocks: 6, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x168C9,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 111 },
                    { numBlocks: 7, dataCodewordsPerBlock: 112 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 46 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 34, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: 0x177EC,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 121 },
                    { numBlocks: 5, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                    { numBlocks: 14, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 16, dataCodewordsPerBlock: 15 },
                    { numBlocks: 14, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x18EC4,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 45 },
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 30, dataCodewordsPerBlock: 16 },
                    { numBlocks: 2, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x191E1,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 106 },
                    { numBlocks: 4, dataCodewordsPerBlock: 107 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 47 },
                    { numBlocks: 13, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1AFAB,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 114 },
                    { numBlocks: 2, dataCodewordsPerBlock: 115 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 46 },
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 28, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 33, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1B08E,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 23 },
                    { numBlocks: 26, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1CC1A,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 117 },
                    { numBlocks: 10, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 45 },
                    { numBlocks: 23, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 24 },
                    { numBlocks: 31, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 31, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1D33F,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 116 },
                    { numBlocks: 7, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 21, dataCodewordsPerBlock: 45 },
                    { numBlocks: 7, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                    { numBlocks: 37, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 26, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1ED75,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 115 },
                    { numBlocks: 10, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 47 },
                    { numBlocks: 10, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 25, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 25, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1F250,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 3, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 46 },
                    { numBlocks: 29, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 24 },
                    { numBlocks: 1, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x209D5,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 115 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 24 },
                    { numBlocks: 35, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 35, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x216F0,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 21, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 24 },
                    { numBlocks: 19, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x228BA,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 6, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 44, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 59, dataCodewordsPerBlock: 16 },
                    { numBlocks: 1, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2379F,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 121 },
                    { numBlocks: 7, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 47 },
                    { numBlocks: 26, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 39, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 41, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x24B0B,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 121 },
                    { numBlocks: 14, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 47 },
                    { numBlocks: 34, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 46, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 64, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2542E,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 46 },
                    { numBlocks: 14, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 49, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 24, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x26A64,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 122 },
                    { numBlocks: 18, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 46 },
                    { numBlocks: 32, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 48, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 15 },
                    { numBlocks: 32, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x27541,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 40, dataCodewordsPerBlock: 47 },
                    { numBlocks: 7, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 43, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 15 },
                    { numBlocks: 67, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x28C69,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 118 },
                    { numBlocks: 6, dataCodewordsPerBlock: 119 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 18, dataCodewordsPerBlock: 47 },
                    { numBlocks: 31, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 34, dataCodewordsPerBlock: 24 },
                    { numBlocks: 34, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 15 },
                    { numBlocks: 61, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
];


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(0);
function squareToQuadrilateral(p1, p2, p3, p4) {
    var dx3 = p1.x - p2.x + p3.x - p4.x;
    var dy3 = p1.y - p2.y + p3.y - p4.y;
    if (dx3 === 0 && dy3 === 0) {
        return {
            a11: p2.x - p1.x,
            a12: p2.y - p1.y,
            a13: 0,
            a21: p3.x - p2.x,
            a22: p3.y - p2.y,
            a23: 0,
            a31: p1.x,
            a32: p1.y,
            a33: 1,
        };
    }
    else {
        var dx1 = p2.x - p3.x;
        var dx2 = p4.x - p3.x;
        var dy1 = p2.y - p3.y;
        var dy2 = p4.y - p3.y;
        var denominator = dx1 * dy2 - dx2 * dy1;
        var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
        var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
        return {
            a11: p2.x - p1.x + a13 * p2.x,
            a12: p2.y - p1.y + a13 * p2.y,
            a13: a13,
            a21: p4.x - p1.x + a23 * p4.x,
            a22: p4.y - p1.y + a23 * p4.y,
            a23: a23,
            a31: p1.x,
            a32: p1.y,
            a33: 1,
        };
    }
}
function quadrilateralToSquare(p1, p2, p3, p4) {
    // Here, the adjoint serves as the inverse:
    var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
    return {
        a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
        a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
        a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
        a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
        a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
        a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
        a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
        a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
        a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21,
    };
}
function times(a, b) {
    return {
        a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
        a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
        a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
        a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
        a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
        a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
        a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
        a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
        a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33,
    };
}
function extract(image, location) {
    var qToS = quadrilateralToSquare({ x: 3.5, y: 3.5 }, { x: location.dimension - 3.5, y: 3.5 }, { x: location.dimension - 6.5, y: location.dimension - 6.5 }, { x: 3.5, y: location.dimension - 3.5 });
    var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
    var transform = times(sToQ, qToS);
    var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
    var mappingFunction = function (x, y) {
        var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
        return {
            x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
            y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator,
        };
    };
    for (var y = 0; y < location.dimension; y++) {
        for (var x = 0; x < location.dimension; x++) {
            var xValue = x + 0.5;
            var yValue = y + 0.5;
            var sourcePixel = mappingFunction(xValue, yValue);
            matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
        }
    }
    return {
        matrix: matrix,
        mappingFunction: mappingFunction,
    };
}
exports.extract = extract;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MAX_FINDERPATTERNS_TO_SEARCH = 4;
var MIN_QUAD_RATIO = 0.5;
var MAX_QUAD_RATIO = 1.5;
var distance = function (a, b) { return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)); };
function sum(values) {
    return values.reduce(function (a, b) { return a + b; });
}
// Takes three finder patterns and organizes them into topLeft, topRight, etc
function reorderFinderPatterns(pattern1, pattern2, pattern3) {
    // Find distances between pattern centers
    var oneTwoDistance = distance(pattern1, pattern2);
    var twoThreeDistance = distance(pattern2, pattern3);
    var oneThreeDistance = distance(pattern1, pattern3);
    var bottomLeft;
    var topLeft;
    var topRight;
    // Assume one closest to other two is B; A and C will just be guesses at first
    if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
        _a = [pattern2, pattern1, pattern3], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
    }
    else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
        _b = [pattern1, pattern2, pattern3], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
    }
    else {
        _c = [pattern1, pattern3, pattern2], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
    }
    // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
    // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
    // we've got it flipped around and should swap topRight and bottomLeft.
    if (((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y)) - ((topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x)) < 0) {
        _d = [topRight, bottomLeft], bottomLeft = _d[0], topRight = _d[1];
    }
    return { bottomLeft: bottomLeft, topLeft: topLeft, topRight: topRight };
    var _a, _b, _c, _d;
}
// Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
function computeDimension(topLeft, topRight, bottomLeft, matrix) {
    var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + // Divide by 7 since the ratio is 1:1:3:1:1
        sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 +
        sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 +
        sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
    var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
    var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
    var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
    switch (dimension % 4) {
        case 0:
            dimension++;
            break;
        case 2:
            dimension--;
            break;
    }
    return { dimension: dimension, moduleSize: moduleSize };
}
// Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
// Returns an array of elements, representing the pixel size of the black white run.
// Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
    var switchPoints = [{ x: Math.floor(origin.x), y: Math.floor(origin.y) }];
    var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
    var fromX;
    var fromY;
    var toX;
    var toY;
    if (steep) {
        fromX = Math.floor(origin.y);
        fromY = Math.floor(origin.x);
        toX = Math.floor(end.y);
        toY = Math.floor(end.x);
    }
    else {
        fromX = Math.floor(origin.x);
        fromY = Math.floor(origin.y);
        toX = Math.floor(end.x);
        toY = Math.floor(end.y);
    }
    var dx = Math.abs(toX - fromX);
    var dy = Math.abs(toY - fromY);
    var error = Math.floor(-dx / 2);
    var xStep = fromX < toX ? 1 : -1;
    var yStep = fromY < toY ? 1 : -1;
    var currentPixel = true;
    // Loop up until x == toX, but not beyond
    for (var x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
        // Does current pixel mean we have moved white to black or vice versa?
        // Scanning black in state 0,2 and white in state 1, so if we find the wrong
        // color, advance to next state or end if we are in state 2 already
        var realX = steep ? y : x;
        var realY = steep ? x : y;
        if (matrix.get(realX, realY) !== currentPixel) {
            currentPixel = !currentPixel;
            switchPoints.push({ x: realX, y: realY });
            if (switchPoints.length === length + 1) {
                break;
            }
        }
        error += dy;
        if (error > 0) {
            if (y === toY) {
                break;
            }
            y += yStep;
            error -= dx;
        }
    }
    var distances = [];
    for (var i = 0; i < length; i++) {
        if (switchPoints[i] && switchPoints[i + 1]) {
            distances.push(distance(switchPoints[i], switchPoints[i + 1]));
        }
        else {
            distances.push(0);
        }
    }
    return distances;
}
// Takes an origin point and an end point and counts the sizes of the black white run in the origin point
// along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
// of the black white run. Takes a length which represents the number of switches from black to white to look for.
function countBlackWhiteRun(origin, end, matrix, length) {
    var rise = end.y - origin.y;
    var run = end.x - origin.x;
    var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
    var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, { x: origin.x - run, y: origin.y - rise }, matrix, Math.ceil(length / 2));
    var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
    return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
    var _a;
}
// Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
// that is the amount the run diverges from the expected ratio
function scoreBlackWhiteRun(sequence, ratios) {
    var averageSize = sum(sequence) / sum(ratios);
    var error = 0;
    ratios.forEach(function (ratio, i) {
        error += Math.pow((sequence[i] - ratio * averageSize), 2);
    });
    return { averageSize: averageSize, error: error };
}
// Takes an X,Y point and an array of sizes and scores the point against those ratios.
// For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
// against that.
function scorePattern(point, ratios, matrix) {
    try {
        var horizontalRun = countBlackWhiteRun(point, { x: -1, y: point.y }, matrix, ratios.length);
        var verticalRun = countBlackWhiteRun(point, { x: point.x, y: -1 }, matrix, ratios.length);
        var topLeftPoint = {
            x: Math.max(0, point.x - point.y) - 1,
            y: Math.max(0, point.y - point.x) - 1,
        };
        var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
        var bottomLeftPoint = {
            x: Math.min(matrix.width, point.x + point.y) + 1,
            y: Math.min(matrix.height, point.y + point.x) + 1,
        };
        var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
        var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
        var vertError = scoreBlackWhiteRun(verticalRun, ratios);
        var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
        var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
        var ratioError = Math.sqrt(horzError.error * horzError.error +
            vertError.error * vertError.error +
            diagDownError.error * diagDownError.error +
            diagUpError.error * diagUpError.error);
        var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
        var sizeError = (Math.pow((horzError.averageSize - avgSize), 2) +
            Math.pow((vertError.averageSize - avgSize), 2) +
            Math.pow((diagDownError.averageSize - avgSize), 2) +
            Math.pow((diagUpError.averageSize - avgSize), 2)) / avgSize;
        return ratioError + sizeError;
    }
    catch (_a) {
        return Infinity;
    }
}
function locate(matrix) {
    var finderPatternQuads = [];
    var activeFinderPatternQuads = [];
    var alignmentPatternQuads = [];
    var activeAlignmentPatternQuads = [];
    var _loop_1 = function (y) {
        var length_1 = 0;
        var lastBit = false;
        var scans = [0, 0, 0, 0, 0];
        var _loop_2 = function (x) {
            var v = matrix.get(x, y);
            if (v === lastBit) {
                length_1++;
            }
            else {
                scans = [scans[1], scans[2], scans[3], scans[4], length_1];
                length_1 = 1;
                lastBit = v;
                // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                var averageFinderPatternBlocksize = sum(scans) / 7;
                var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize &&
                    Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    !v; // And make sure the current pixel is white since finder patterns are bordered in white
                // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    v; // Is the current pixel black since alignment patterns are bordered in black
                if (validFinderPattern) {
                    // Compute the start and end x values of the large center black square
                    var endX_1 = x - scans[3] - scans[4];
                    var startX_1 = endX_1 - scans[2];
                    var line = { startX: startX_1, endX: endX_1, y: y };
                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                    // that line as the starting point.
                    var matchingQuads = activeFinderPatternQuads.filter(function (q) {
                        return (startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
                            (endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
                            (startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
                    });
                    if (matchingQuads.length > 0) {
                        matchingQuads[0].bottom = line;
                    }
                    else {
                        activeFinderPatternQuads.push({ top: line, bottom: line });
                    }
                }
                if (validAlignmentPattern) {
                    // Compute the start and end x values of the center black square
                    var endX_2 = x - scans[4];
                    var startX_2 = endX_2 - scans[3];
                    var line = { startX: startX_2, y: y, endX: endX_2 };
                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                    // that line as the starting point.
                    var matchingQuads = activeAlignmentPatternQuads.filter(function (q) {
                        return (startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
                            (endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
                            (startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
                    });
                    if (matchingQuads.length > 0) {
                        matchingQuads[0].bottom = line;
                    }
                    else {
                        activeAlignmentPatternQuads.push({ top: line, bottom: line });
                    }
                }
            }
        };
        for (var x = -1; x <= matrix.width; x++) {
            _loop_2(x);
        }
        finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y !== y && q.bottom.y - q.top.y >= 2; }));
        activeFinderPatternQuads = activeFinderPatternQuads.filter(function (q) { return q.bottom.y === y; });
        alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y !== y; }));
        activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y === y; });
    };
    for (var y = 0; y <= matrix.height; y++) {
        _loop_1(y);
    }
    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y - q.top.y >= 2; }));
    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
    var finderPatternGroups = finderPatternQuads
        .filter(function (q) { return q.bottom.y - q.top.y >= 2; }) // All quads must be at least 2px tall since the center square is larger than a block
        .map(function (q) {
        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
        var y = (q.top.y + q.bottom.y + 1) / 2;
        if (!matrix.get(Math.round(x), Math.round(y))) {
            return;
        }
        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, q.bottom.y - q.top.y + 1];
        var size = sum(lengths) / lengths.length;
        var score = scorePattern({ x: Math.round(x), y: Math.round(y) }, [1, 1, 3, 1, 1], matrix);
        return { score: score, x: x, y: y, size: size };
    })
        .filter(function (q) { return !!q; }) // Filter out any rejected quads from above
        .sort(function (a, b) { return a.score - b.score; })
        .map(function (point, i, finderPatterns) {
        if (i > MAX_FINDERPATTERNS_TO_SEARCH) {
            return null;
        }
        var otherPoints = finderPatterns
            .filter(function (p, ii) { return i !== ii; })
            .map(function (p) { return ({ x: p.x, y: p.y, score: p.score + (Math.pow((p.size - point.size), 2)) / point.size, size: p.size }); })
            .sort(function (a, b) { return a.score - b.score; });
        if (otherPoints.length < 2) {
            return null;
        }
        var score = point.score + otherPoints[0].score + otherPoints[1].score;
        return { points: [point].concat(otherPoints.slice(0, 2)), score: score };
    })
        .filter(function (q) { return !!q; }) // Filter out any rejected finder patterns from above
        .sort(function (a, b) { return a.score - b.score; });
    if (finderPatternGroups.length === 0) {
        return null;
    }
    var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
    // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
    // We'll use these to help find the alignment pattern but also later when we do the extraction.
    var _b = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _b.dimension, moduleSize = _b.moduleSize;
    // Now find the alignment pattern
    var bottomRightFinderPattern = {
        x: topRight.x - topLeft.x + bottomLeft.x,
        y: topRight.y - topLeft.y + bottomLeft.y,
    };
    var modulesBetweenFinderPatterns = ((distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize);
    var correctionToTopLeft = 1 - (3 / modulesBetweenFinderPatterns);
    var expectedAlignmentPattern = {
        x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
        y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y),
    };
    var alignmentPatterns = alignmentPatternQuads
        .map(function (q) {
        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
        var y = (q.top.y + q.bottom.y + 1) / 2;
        if (!matrix.get(Math.floor(x), Math.floor(y))) {
            return;
        }
        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, (q.bottom.y - q.top.y + 1)];
        var size = sum(lengths) / lengths.length;
        var sizeScore = scorePattern({ x: Math.floor(x), y: Math.floor(y) }, [1, 1, 1], matrix);
        var score = sizeScore + distance({ x: x, y: y }, expectedAlignmentPattern);
        return { x: x, y: y, score: score };
    })
        .filter(function (v) { return !!v; })
        .sort(function (a, b) { return a.score - b.score; });
    // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
    // so we can only use our best guess.
    var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
    return {
        alignmentPattern: { x: alignmentPattern.x, y: alignmentPattern.y },
        bottomLeft: { x: bottomLeft.x, y: bottomLeft.y },
        dimension: dimension,
        topLeft: { x: topLeft.x, y: topLeft.y },
        topRight: { x: topRight.x, y: topRight.y },
    };
}
exports.locate = locate;


/***/ })
/******/ ])["default"];
});

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Options = function Options(obj) {
  _classCallCheck(this, Options);

  /**
   * @description 위치할 대상.
   */
  this.rootElement = obj.rootElement || document.body;

  /**
   * @description 넓이.
   */
  this.width = parseFloat(obj.width) || 0;

  /**
   * @description 높이.
   */
  this.height = parseFloat(obj.height) || 0;
};

module.exports = Options;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(23);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(11)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3!./normalize.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js??ref--3!./normalize.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(false);
// imports


// module
exports.push([module.i, "/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}", ""]);

// exports


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)(__webpack_require__(25))

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = "/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */\n!function(e,t){\"use strict\";\"object\"==typeof module&&\"object\"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error(\"jQuery requires a window with a document\");return t(e)}:t(e)}(\"undefined\"!=typeof window?window:this,function(e,t){\"use strict\";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return\"function\"==typeof t&&\"number\"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement(\"script\");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+\"\":\"object\"==typeof e||\"function\"==typeof e?l[c.call(e)]||\"object\":typeof e}var b=\"3.3.1\",w=function(e,t){return new w.fn.init(e,t)},T=/^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g;w.fn=w.prototype={jquery:\"3.3.1\",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for(\"boolean\"==typeof a&&(l=a,a=arguments[s]||{},s++),\"object\"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:\"jQuery\"+(\"3.3.1\"+Math.random()).replace(/\\D/g,\"\"),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||\"[object Object]\"!==c.call(e))&&(!(t=i(e))||\"function\"==typeof(n=f.call(t,\"constructor\")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?\"\":(e+\"\").replace(T,\"\")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,\"string\"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),\"function\"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each(\"Boolean Number String Function Array Date RegExp Object Error Symbol\".split(\" \"),function(e,t){l[\"[object \"+t+\"]\"]=t.toLowerCase()});function C(e){var t=!!e&&\"length\"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&(\"array\"===n||0===t||\"number\"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b=\"sizzle\"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P=\"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",M=\"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",R=\"(?:\\\\\\\\.|[\\\\w-]|[^\\0-\\\\xa0])+\",I=\"\\\\[\"+M+\"*(\"+R+\")(?:\"+M+\"*([*^$|!~]?=)\"+M+\"*(?:'((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\"+R+\"))|)\"+M+\"*\\\\]\",W=\":(\"+R+\")(?:\\\\((('((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\"+I+\")*)|.*)\\\\)|)\",$=new RegExp(M+\"+\",\"g\"),B=new RegExp(\"^\"+M+\"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\"+M+\"+$\",\"g\"),F=new RegExp(\"^\"+M+\"*,\"+M+\"*\"),_=new RegExp(\"^\"+M+\"*([>+~]|\"+M+\")\"+M+\"*\"),z=new RegExp(\"=\"+M+\"*([^\\\\]'\\\"]*?)\"+M+\"*\\\\]\",\"g\"),X=new RegExp(W),U=new RegExp(\"^\"+R+\"$\"),V={ID:new RegExp(\"^#(\"+R+\")\"),CLASS:new RegExp(\"^\\\\.(\"+R+\")\"),TAG:new RegExp(\"^(\"+R+\"|[*])\"),ATTR:new RegExp(\"^\"+I),PSEUDO:new RegExp(\"^\"+W),CHILD:new RegExp(\"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\"+M+\"*(even|odd|(([+-]|)(\\\\d*)n|)\"+M+\"*(?:([+-]|)\"+M+\"*(\\\\d+)|))\"+M+\"*\\\\)|)\",\"i\"),bool:new RegExp(\"^(?:\"+P+\")$\",\"i\"),needsContext:new RegExp(\"^\"+M+\"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\"+M+\"*((?:-\\\\d)?\\\\d*)\"+M+\"*\\\\)|)(?=[^-]|$)\",\"i\")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\\d$/i,Q=/^[^{]+\\{\\s*\\[native \\w/,J=/^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,K=/[+~]/,Z=new RegExp(\"\\\\\\\\([\\\\da-f]{1,6}\"+M+\"?|(\"+M+\")|.)\",\"ig\"),ee=function(e,t,n){var r=\"0x\"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\\0-\\x1f\\x7f]|^-?\\d)|^-$|[^\\0-\\x1f\\x7f-\\uFFFF\\w-]/g,ne=function(e,t){return t?\"\\0\"===e?\"\\ufffd\":e.slice(0,-1)+\"\\\\\"+e.charCodeAt(e.length-1).toString(16)+\" \":\"\\\\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&(\"form\"in e||\"label\"in e)},{dir:\"parentNode\",next:\"legend\"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],\"string\"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+\" \"]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if(\"object\"!==t.nodeName.toLowerCase()){(c=t.getAttribute(\"id\"))?c=c.replace(te,ne):t.setAttribute(\"id\",c=b),s=(h=a(e)).length;while(s--)h[s]=\"#\"+c+\" \"+ve(h[s]);v=h.join(\",\"),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute(\"id\")}}}return u(e.replace(B,\"$1\"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+\" \")>r.cacheLength&&delete t[e.shift()],t[n+\" \"]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement(\"fieldset\");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split(\"|\"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return\"input\"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return(\"input\"===n||\"button\"===n)&&t.type===e}}function de(e){return function(t){return\"form\"in t?t.parentNode&&!1===t.disabled?\"label\"in t?\"label\"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:\"label\"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&\"undefined\"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&\"HTML\"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener(\"unload\",re,!1):i.attachEvent&&i.attachEvent(\"onunload\",re)),n.attributes=ue(function(e){return e.className=\"i\",!e.getAttribute(\"className\")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment(\"\")),!e.getElementsByTagName(\"*\").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute(\"id\")===t}},r.find.ID=function(e,t){if(\"undefined\"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n=\"undefined\"!=typeof e.getAttributeNode&&e.getAttributeNode(\"id\");return n&&n.value===t}},r.find.ID=function(e,t){if(\"undefined\"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode(\"id\"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode(\"id\"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return\"undefined\"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if(\"*\"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if(\"undefined\"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML=\"<a id='\"+b+\"'></a><select id='\"+b+\"-\\r\\\\' msallowcapture=''><option selected=''></option></select>\",e.querySelectorAll(\"[msallowcapture^='']\").length&&y.push(\"[*^$]=\"+M+\"*(?:''|\\\"\\\")\"),e.querySelectorAll(\"[selected]\").length||y.push(\"\\\\[\"+M+\"*(?:value|\"+P+\")\"),e.querySelectorAll(\"[id~=\"+b+\"-]\").length||y.push(\"~=\"),e.querySelectorAll(\":checked\").length||y.push(\":checked\"),e.querySelectorAll(\"a#\"+b+\"+*\").length||y.push(\".#.+[+~]\")}),ue(function(e){e.innerHTML=\"<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>\";var t=d.createElement(\"input\");t.setAttribute(\"type\",\"hidden\"),e.appendChild(t).setAttribute(\"name\",\"D\"),e.querySelectorAll(\"[name=d]\").length&&y.push(\"name\"+M+\"*[*^$|!~]?=\"),2!==e.querySelectorAll(\":enabled\").length&&y.push(\":enabled\",\":disabled\"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(\":disabled\").length&&y.push(\":enabled\",\":disabled\"),e.querySelectorAll(\"*,:x\"),y.push(\",.*:\")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,\"*\"),m.call(e,\"[s!='']:x\"),v.push(\"!=\",W)}),y=y.length&&new RegExp(y.join(\"|\")),v=v.length&&new RegExp(v.join(\"|\")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,\"='$1']\"),n.matchesSelector&&g&&!S[t+\" \"]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+\"\").replace(te,ne)},oe.error=function(e){throw new Error(\"Syntax error, unrecognized expression: \"+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n=\"\",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if(\"string\"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{\">\":{dir:\"parentNode\",first:!0},\" \":{dir:\"parentNode\"},\"+\":{dir:\"previousSibling\",first:!0},\"~\":{dir:\"previousSibling\"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||\"\").replace(Z,ee),\"~=\"===e[2]&&(e[3]=\" \"+e[3]+\" \"),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),\"nth\"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*(\"even\"===e[3]||\"odd\"===e[3])),e[5]=+(e[7]+e[8]||\"odd\"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||\"\":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(\")\",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return\"*\"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+\" \"];return t||(t=new RegExp(\"(^|\"+M+\")\"+e+\"(\"+M+\"|$)\"))&&E(e,function(e){return t.test(\"string\"==typeof e.className&&e.className||\"undefined\"!=typeof e.getAttribute&&e.getAttribute(\"class\")||\"\")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?\"!=\"===t:!t||(i+=\"\",\"=\"===t?i===n:\"!=\"===t?i!==n:\"^=\"===t?n&&0===i.indexOf(n):\"*=\"===t?n&&i.indexOf(n)>-1:\"$=\"===t?n&&i.slice(-n.length)===n:\"~=\"===t?(\" \"+i.replace($,\" \")+\" \").indexOf(n)>-1:\"|=\"===t&&(i===n||i.slice(0,n.length+1)===n+\"-\"))}},CHILD:function(e,t,n,r,i){var o=\"nth\"!==e.slice(0,3),a=\"last\"!==e.slice(-4),s=\"of-type\"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?\"nextSibling\":\"previousSibling\",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g=\"only\"===e&&!h&&\"nextSibling\"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error(\"unsupported pseudo: \"+e);return i[b]?i(t):i.length>1?(n=[e,e,\"\",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,\"$1\"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||\"\")||oe.error(\"unsupported lang: \"+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute(\"xml:lang\")||t.getAttribute(\"lang\"))return(n=n.toLowerCase())===e||0===n.indexOf(e+\"-\")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return\"input\"===t&&!!e.checked||\"option\"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return\"input\"===t&&\"button\"===e.type||\"button\"===t},text:function(e){var t;return\"input\"===e.nodeName.toLowerCase()&&\"text\"===e.type&&(null==(t=e.getAttribute(\"type\"))||\"text\"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+\" \"];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B,\" \")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r=\"\";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&\"parentNode\"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||\"*\",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[\" \"],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:\" \"===e[u-2].type?\"*\":\"\"})).replace(B,\"$1\"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m=\"0\",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG(\"*\",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+\" \"];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p=\"function\"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&\"ID\"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split(\"\").sort(D).join(\"\")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement(\"fieldset\"))}),ue(function(e){return e.innerHTML=\"<a href='#'></a>\",\"#\"===e.firstChild.getAttribute(\"href\")})||le(\"type|href|height|width\",function(e,t,n){if(!n)return e.getAttribute(t,\"type\"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML=\"<input/>\",e.firstChild.setAttribute(\"value\",\"\"),\"\"===e.firstChild.getAttribute(\"value\")})||le(\"value\",function(e,t,n){if(!n&&\"input\"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute(\"disabled\")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[\":\"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\\/\\0>:\\x20\\t\\r\\n\\f]*)[\\x20\\t\\r\\n\\f]*\\/?>(?:<\\/\\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):\"string\"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=\":not(\"+e+\")\"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if(\"string\"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,\"string\"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,\"string\"==typeof e){if(!(i=\"<\"===e[0]&&\">\"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a=\"string\"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?\"string\"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,\"parentNode\")},parentsUntil:function(e,t,n){return k(e,\"parentNode\",n)},next:function(e){return P(e,\"nextSibling\")},prev:function(e){return P(e,\"previousSibling\")},nextAll:function(e){return k(e,\"nextSibling\")},prevAll:function(e){return k(e,\"previousSibling\")},nextUntil:function(e,t,n){return k(e,\"nextSibling\",n)},prevUntil:function(e,t,n){return k(e,\"previousSibling\",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,\"iframe\")?e.contentDocument:(N(e,\"template\")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return\"Until\"!==e.slice(-5)&&(r=n),r&&\"string\"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\\x20\\t\\r\\n\\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e=\"string\"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:\"\")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&\"string\"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n=\"\",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=\"\"),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[[\"notify\",\"progress\",w.Callbacks(\"memory\"),w.Callbacks(\"memory\"),2],[\"resolve\",\"done\",w.Callbacks(\"once memory\"),w.Callbacks(\"once memory\"),0,\"resolved\"],[\"reject\",\"fail\",w.Callbacks(\"once memory\"),w.Callbacks(\"once memory\"),1,\"rejected\"]],r=\"pending\",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},\"catch\":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+\"With\"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError(\"Thenable self-resolution\");l=e&&(\"object\"==typeof e||\"function\"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+\"With\"](this===o?void 0:this,arguments),this},o[t[0]+\"With\"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),\"pending\"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn(\"jQuery.Deferred exception: \"+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)[\"catch\"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener(\"DOMContentLoaded\",_),e.removeEventListener(\"load\",_),w.ready()}\"complete\"===r.readyState||\"loading\"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener(\"DOMContentLoaded\",_),e.addEventListener(\"load\",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if(\"object\"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,\"ms-\").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if(\"string\"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&\"string\"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,ee=/[A-Z]/g;function te(e){return\"true\"===e||\"false\"!==e&&(\"null\"===e?null:e===+e+\"\"?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r=\"data-\"+t.replace(ee,\"-$&\").toLowerCase(),\"string\"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,\"hasDataAttrs\"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf(\"data-\")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,\"hasDataAttrs\",!0)}return i}return\"object\"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||\"fx\")+\"queue\",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||\"fx\";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};\"inprogress\"===i&&(i=n.shift(),r--),i&&(\"fx\"===t&&n.unshift(\"inprogress\"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+\"queueHooks\";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks(\"once memory\").add(function(){J.remove(e,[t+\"queue\",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return\"string\"!=typeof e&&(t=e,e=\"fx\",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),\"fx\"===e&&\"inprogress\"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||\"fx\",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};\"string\"!=typeof e&&(t=e,e=void 0),e=e||\"fx\";while(a--)(n=J.get(o[a],e+\"queueHooks\"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/.source,ie=new RegExp(\"^(?:([+-])=|)(\"+re+\")([a-z%]*)$\",\"i\"),oe=[\"Top\",\"Right\",\"Bottom\",\"Left\"],ae=function(e,t){return\"none\"===(e=t||e).style.display||\"\"===e.style.display&&w.contains(e.ownerDocument,e)&&\"none\"===w.css(e,\"display\")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,\"\")},u=s(),l=n&&n[3]||(w.cssNumber[t]?\"\":\"px\"),c=(w.cssNumber[t]||\"px\"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,\"display\"),t.parentNode.removeChild(t),\"none\"===i&&(i=\"block\"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?(\"none\"===n&&(i[o]=J.get(r,\"display\")||null,i[o]||(r.style.display=\"\")),\"\"===r.style.display&&ae(r)&&(i[o]=ce(r))):\"none\"!==n&&(i[o]=\"none\",J.set(r,\"display\",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return\"boolean\"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]+)/i,he=/^$|^module$|\\/(?:java|ecma)script/i,ge={option:[1,\"<select multiple='multiple'>\",\"</select>\"],thead:[1,\"<table>\",\"</table>\"],col:[2,\"<table><colgroup>\",\"</colgroup></table>\"],tr:[2,\"<table><tbody>\",\"</tbody></table>\"],td:[3,\"<table><tbody><tr>\",\"</tr></tbody></table>\"],_default:[0,\"\",\"\"]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n=\"undefined\"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||\"*\"):\"undefined\"!=typeof e.querySelectorAll?e.querySelectorAll(t||\"*\"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],\"globalEval\",!t||J.get(t[n],\"globalEval\"))}var me=/<|&#?\\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if(\"object\"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement(\"div\")),s=(de.exec(o)||[\"\",\"\"])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=\"\"}else p.push(t.createTextNode(o));f.textContent=\"\",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),\"script\"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||\"\")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement(\"div\")),t=r.createElement(\"input\");t.setAttribute(\"type\",\"radio\"),t.setAttribute(\"checked\",\"checked\"),t.setAttribute(\"name\",\"t\"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML=\"<textarea>x</textarea>\",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if(\"object\"==typeof t){\"string\"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&(\"string\"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return\"undefined\"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||\"\").match(M)||[\"\"]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||\"\").split(\".\").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(\".\")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||\"\").match(M)||[\"\"]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||\"\").split(\".\").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp(\"(^|\\\\.)\"+h.join(\"\\\\.(?:.*\\\\.|)\")+\"(\\\\.|$)\"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&(\"**\"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,\"handle events\")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,\"events\")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!(\"click\"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&(\"click\"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+\" \"]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:\"focusin\"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:\"focusout\"},click:{trigger:function(){if(\"checkbox\"===this.type&&this.click&&N(this,\"input\"))return this.click(),!1},_default:function(e){return N(e.target,\"a\")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,\"char\":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:\"mouseover\",mouseleave:\"mouseout\",pointerenter:\"pointerover\",pointerleave:\"pointerout\"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+\".\"+r.namespace:r.origType,r.selector,r.handler),this;if(\"object\"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&\"function\"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]*)[^>]*)\\/>/gi,Ae=/<script|<style|<link/i,je=/checked\\s*(?:[^=]|=\\s*.checked.)/i,qe=/^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g;function Le(e,t){return N(e,\"table\")&&N(11!==t.nodeType?t:t.firstChild,\"tr\")?w(e).children(\"tbody\")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute(\"type\"))+\"/\"+e.type,e}function Oe(e){return\"true/\"===(e.type||\"\").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute(\"type\"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();\"input\"===n&&pe.test(e.type)?t.checked=e.checked:\"input\"!==n&&\"textarea\"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&\"string\"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,\"script\"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,\"script\"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||\"\")&&!J.access(l,\"globalEval\")&&w.contains(c,l)&&(l.src&&\"module\"!==(l.type||\"\").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,\"\"),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,\"script\")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,\"<$1></$2>\")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,\"script\")).length>0&&ve(a,!u&&ye(e,\"script\")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent=\"\");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if(\"string\"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||[\"\",\"\"])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:\"append\",prependTo:\"prepend\",insertBefore:\"before\",insertAfter:\"after\",replaceAll:\"replaceWith\"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp(\"^(\"+re+\")(?!px)[a-z%]+$\",\"i\"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join(\"|\"),\"i\");!function(){function t(){if(c){l.style.cssText=\"position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0\",c.style.cssText=\"position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%\",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i=\"1%\"!==t.top,u=12===n(t.marginLeft),c.style.right=\"60%\",s=36===n(t.right),o=36===n(t.width),c.style.position=\"absolute\",a=36===c.offsetWidth||\"absolute\",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement(\"div\"),c=r.createElement(\"div\");c.style&&(c.style.backgroundClip=\"content-box\",c.cloneNode(!0).style.backgroundClip=\"\",h.clearCloneStyle=\"content-box\"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(\"\"!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+\"\":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:\"absolute\",visibility:\"hidden\",display:\"block\"},Ve={letterSpacing:\"0\",fontWeight:\"400\"},Ge=[\"Webkit\",\"Moz\",\"ms\"],Ye=r.createElement(\"div\").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||\"px\"):t}function Ze(e,t,n,r,i,o){var a=\"width\"===t?1:0,s=0,u=0;if(n===(r?\"border\":\"content\"))return 0;for(;a<4;a+=2)\"margin\"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?(\"content\"===n&&(u-=w.css(e,\"padding\"+oe[a],!0,i)),\"margin\"!==n&&(u-=w.css(e,\"border\"+oe[a]+\"Width\",!0,i))):(u+=w.css(e,\"padding\"+oe[a],!0,i),\"padding\"!==n?u+=w.css(e,\"border\"+oe[a]+\"Width\",!0,i):s+=w.css(e,\"border\"+oe[a]+\"Width\",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e[\"offset\"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o=\"border-box\"===w.css(e,\"boxSizing\",!1,r),a=o;if(We.test(i)){if(!n)return i;i=\"auto\"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),(\"auto\"===i||!parseFloat(i)&&\"inline\"===w.css(e,\"display\",!1,r))&&(i=e[\"offset\"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?\"border\":\"content\"),a,r,i)+\"px\"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,\"opacity\");return\"\"===n?\"1\":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&\"get\"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];\"string\"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o=\"number\"),null!=n&&n===n&&(\"number\"===o&&(n+=i&&i[3]||(w.cssNumber[s]?\"\":\"px\")),h.clearCloneStyle||\"\"!==n||0!==t.indexOf(\"background\")||(l[t]=\"inherit\"),a&&\"set\"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&\"get\"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),\"normal\"===i&&t in Ve&&(i=Ve[t]),\"\"===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each([\"height\",\"width\"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,\"display\"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a=\"border-box\"===w.css(e,\"boxSizing\",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e[\"offset\"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,\"border\",!1,o)-.5)),s&&(i=ie.exec(n))&&\"px\"!==(i[3]||\"px\")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,\"marginLeft\"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+\"px\"}),w.each({margin:\"\",padding:\"\",border:\"Width\"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o=\"string\"==typeof n?n.split(\" \"):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},\"margin\"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?\"\":\"px\")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,\"\"))&&\"auto\"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:\"swing\"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i[\"margin\"+(n=oe[r])]=i[\"padding\"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners[\"*\"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f=\"width\"in t||\"height\"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,\"fxshow\");n.queue||(null==(a=w._queueHooks(e,\"fx\")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,\"fx\").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||\"toggle\"===i,i===(g?\"hide\":\"show\")){if(\"show\"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,\"display\")),\"none\"===(c=w.css(e,\"display\"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,\"display\"),fe([e]))),(\"inline\"===c||\"inline-block\"===c&&null!=l)&&\"none\"===w.css(e,\"float\")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l=\"none\"===c?\"\":c)),h.display=\"inline-block\")),n.overflow&&(h.overflow=\"hidden\",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?\"hidden\"in y&&(g=y.hidden):y=J.access(e,\"fxshow\",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,\"fxshow\");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&\"expand\"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{\"*\":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=[\"*\"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&\"object\"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:\"number\"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue=\"fx\"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css(\"opacity\",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,\"finish\"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return\"string\"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||\"fx\",[]),this.each(function(){var t=!0,i=null!=e&&e+\"queueHooks\",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||\"fx\"),this.each(function(){var t,n=J.get(this),r=n[e+\"queue\"],i=n[e+\"queueHooks\"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each([\"toggle\",\"show\",\"hide\"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||\"boolean\"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut(\"show\"),slideUp:ut(\"hide\"),slideToggle:ut(\"toggle\"),fadeIn:{opacity:\"show\"},fadeOut:{opacity:\"hide\"},fadeToggle:{opacity:\"toggle\"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||\"fx\",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement(\"input\"),t=r.createElement(\"select\").appendChild(r.createElement(\"option\"));e.type=\"checkbox\",h.checkOn=\"\"!==e.value,h.optSelected=t.selected,(e=r.createElement(\"input\")).value=\"t\",e.type=\"radio\",h.radioValue=\"t\"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return\"undefined\"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&\"set\"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+\"\"),n):i&&\"get\"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&\"radio\"===t&&N(e,\"input\")){var n=e.value;return e.setAttribute(\"type\",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&\"set\"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&\"get\"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,\"tabindex\");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{\"for\":\"htmlFor\",\"class\":\"className\"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each([\"tabIndex\",\"readOnly\",\"maxLength\",\"cellSpacing\",\"cellPadding\",\"rowSpan\",\"colSpan\",\"useMap\",\"frameBorder\",\"contentEditable\"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(\" \")}function mt(e){return e.getAttribute&&e.getAttribute(\"class\")||\"\"}function xt(e){return Array.isArray(e)?e:\"string\"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&\" \"+vt(i)+\" \"){a=0;while(o=t[a++])r.indexOf(\" \"+o+\" \")<0&&(r+=o+\" \");i!==(s=vt(r))&&n.setAttribute(\"class\",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr(\"class\",\"\");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&\" \"+vt(i)+\" \"){a=0;while(o=t[a++])while(r.indexOf(\" \"+o+\" \")>-1)r=r.replace(\" \"+o+\" \",\" \");i!==(s=vt(r))&&n.setAttribute(\"class\",s)}return this},toggleClass:function(e,t){var n=typeof e,r=\"string\"===n||Array.isArray(e);return\"boolean\"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&\"boolean\"!==n||((t=mt(this))&&J.set(this,\"__className__\",t),this.setAttribute&&this.setAttribute(\"class\",t||!1===e?\"\":J.get(this,\"__className__\")||\"\"))})},hasClass:function(e){var t,n,r=0;t=\" \"+e+\" \";while(n=this[r++])if(1===n.nodeType&&(\" \"+vt(mt(n))+\" \").indexOf(t)>-1)return!0;return!1}});var bt=/\\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i=\"\":\"number\"==typeof i?i+=\"\":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?\"\":e+\"\"})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&\"set\"in t&&void 0!==t.set(this,i,\"value\")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&\"get\"in t&&void 0!==(n=t.get(i,\"value\"))?n:\"string\"==typeof(n=i.value)?n.replace(bt,\"\"):null==n?\"\":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,\"value\");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a=\"select-one\"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,\"optgroup\"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each([\"radio\",\"checkbox\"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute(\"value\")?\"on\":e.value})}),h.focusin=\"onfocusin\"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,\"type\")?t.type:t,x=f.call(t,\"namespace\")?t.namespace.split(\".\"):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(\".\")>-1&&(m=(x=m.split(\".\")).shift(),x.sort()),c=m.indexOf(\":\")<0&&\"on\"+m,t=t[w.expando]?t:new w.Event(m,\"object\"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join(\".\"),t.rnamespace=t.namespace?new RegExp(\"(^|\\\\.)\"+x.join(\"\\\\.(?:.*\\\\.|)\")+\"(\\\\.|$)\"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,\"events\")||{})[t.type]&&J.get(s,\"handle\"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:\"focusin\",blur:\"focusout\"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\\?/;w.parseXML=function(t){var n;if(!t||\"string\"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,\"text/xml\")}catch(e){n=void 0}return n&&!n.getElementsByTagName(\"parsererror\").length||w.error(\"Invalid XML: \"+t),n};var St=/\\[\\]$/,Dt=/\\r?\\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+\"[\"+(\"object\"==typeof i&&null!=i?t:\"\")+\"]\",i,n,r)});else if(n||\"object\"!==x(t))r(e,t);else for(i in t)jt(e+\"[\"+i+\"]\",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+\"=\"+encodeURIComponent(null==n?\"\":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join(\"&\")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,\"elements\");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(\":disabled\")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,\"\\r\\n\")}}):{name:t.name,value:n.replace(Dt,\"\\r\\n\")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \\t]*([^\\r\\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\\/\\//,It={},Wt={},$t=\"*/\".concat(\"*\"),Bt=r.createElement(\"a\");Bt.href=Ct.href;function Ft(e){return function(t,n){\"string\"!=typeof t&&(n=t,t=\"*\");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])\"+\"===r[0]?(r=r.slice(1)||\"*\",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return\"string\"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i[\"*\"]&&a(\"*\")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while(\"*\"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader(\"Content-Type\"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+\" \"+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if(\"*\"===o)o=u;else if(\"*\"!==u&&u!==o){if(!(a=l[u+\" \"+o]||l[\"* \"+o]))for(i in l)if((s=i.split(\" \"))[1]===o&&(a=l[u+\" \"+s[0]]||l[\"* \"+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e[\"throws\"])t=a(t);else try{t=a(t)}catch(e){return{state:\"parsererror\",error:a?e:\"No conversion from \"+u+\" to \"+o}}}return{state:\"success\",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:\"GET\",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:\"application/x-www-form-urlencoded; charset=UTF-8\",accepts:{\"*\":$t,text:\"text/plain\",html:\"text/html\",xml:\"application/xml, text/xml\",json:\"application/json, text/javascript\"},contents:{xml:/\\bxml\\b/,html:/\\bhtml/,json:/\\bjson\\b/},responseFields:{xml:\"responseXML\",text:\"responseText\",json:\"responseJSON\"},converters:{\"* text\":String,\"text html\":!0,\"text json\":JSON.parse,\"text xml\":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){\"object\"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks(\"once memory\"),x=h.statusCode||{},b={},T={},C=\"canceled\",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+\"\").replace(Rt,Ct.protocol+\"//\"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||\"*\").toLowerCase().match(M)||[\"\"],null==h.crossDomain){l=r.createElement(\"a\");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+\"//\"+Bt.host!=l.protocol+\"//\"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&\"string\"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger(\"ajaxStart\"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,\"\"),h.hasContent?h.data&&h.processData&&0===(h.contentType||\"\").indexOf(\"application/x-www-form-urlencoded\")&&(h.data=h.data.replace(qt,\"+\")):(d=h.url.slice(o.length),h.data&&(h.processData||\"string\"==typeof h.data)&&(o+=(kt.test(o)?\"&\":\"?\")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,\"$1\"),d=(kt.test(o)?\"&\":\"?\")+\"_=\"+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader(\"If-Modified-Since\",w.lastModified[o]),w.etag[o]&&E.setRequestHeader(\"If-None-Match\",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader(\"Content-Type\",h.contentType),E.setRequestHeader(\"Accept\",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+(\"*\"!==h.dataTypes[0]?\", \"+$t+\"; q=0.01\":\"\"):h.accepts[\"*\"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C=\"abort\",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger(\"ajaxSend\",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort(\"timeout\")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,\"No Transport\");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||\"\",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader(\"Last-Modified\"))&&(w.lastModified[o]=T),(T=E.getResponseHeader(\"etag\"))&&(w.etag[o]=T)),204===t||\"HEAD\"===h.type?C=\"nocontent\":304===t?C=\"notmodified\":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C=\"error\",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+\"\",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?\"ajaxSuccess\":\"ajaxError\",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger(\"ajaxComplete\",[E,h]),--w.active||w.event.trigger(\"ajaxStop\")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,\"json\")},getScript:function(e,t){return w.get(e,void 0,t,\"script\")}}),w.each([\"get\",\"post\"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:\"GET\",dataType:\"script\",cache:!0,async:!1,global:!1,\"throws\":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not(\"body\").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&\"withCredentials\"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i[\"X-Requested-With\"]||(i[\"X-Requested-With\"]=\"XMLHttpRequest\");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,\"abort\"===e?s.abort():\"error\"===e?\"number\"!=typeof s.status?o(0,\"error\"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,\"text\"!==(s.responseType||\"text\")||\"string\"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n(\"error\"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n(\"abort\");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:\"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"},contents:{script:/\\b(?:java|ecma)script\\b/},converters:{\"text script\":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter(\"script\",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type=\"GET\")}),w.ajaxTransport(\"script\",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w(\"<script>\").prop({charset:e.scriptCharset,src:e.url}).on(\"load error\",n=function(e){t.remove(),n=null,e&&o(\"error\"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\\?(?=&|$)|\\?\\?/;w.ajaxSetup({jsonp:\"callback\",jsonpCallback:function(){var e=Yt.pop()||w.expando+\"_\"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter(\"json jsonp\",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?\"url\":\"string\"==typeof t.data&&0===(t.contentType||\"\").indexOf(\"application/x-www-form-urlencoded\")&&Qt.test(t.data)&&\"data\");if(s||\"jsonp\"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,\"$1\"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?\"&\":\"?\")+t.jsonp+\"=\"+i),t.converters[\"script json\"]=function(){return a||w.error(i+\" was not called\"),a[0]},t.dataTypes[0]=\"json\",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),\"script\"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument(\"\").body;return e.innerHTML=\"<form></form><form></form>\",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if(\"string\"!=typeof e)return[];\"boolean\"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument(\"\")).createElement(\"base\")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(\" \");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&\"object\"==typeof t&&(i=\"POST\"),a.length>0&&w.ajax({url:e,type:i||\"GET\",dataType:\"html\",data:t}).done(function(e){o=arguments,a.html(r?w(\"<div>\").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each([\"ajaxStart\",\"ajaxStop\",\"ajaxComplete\",\"ajaxError\",\"ajaxSuccess\",\"ajaxSend\"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,\"position\"),f=w(e),p={};\"static\"===c&&(e.style.position=\"relative\"),s=f.offset(),o=w.css(e,\"top\"),u=w.css(e,\"left\"),(l=(\"absolute\"===c||\"fixed\"===c)&&(o+u).indexOf(\"auto\")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),\"using\"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if(\"fixed\"===w.css(r,\"position\"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&\"static\"===w.css(e,\"position\"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,\"borderTopWidth\",!0),i.left+=w.css(e,\"borderLeftWidth\",!0))}return{top:t.top-i.top-w.css(r,\"marginTop\",!0),left:t.left-i.left-w.css(r,\"marginLeft\",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&\"static\"===w.css(e,\"position\"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:\"pageXOffset\",scrollTop:\"pageYOffset\"},function(e,t){var n=\"pageYOffset\"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each([\"top\",\"left\"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+\"px\":n})}),w.each({Height:\"height\",Width:\"width\"},function(e,t){w.each({padding:\"inner\"+e,content:t,\"\":\"outer\"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||\"boolean\"!=typeof i),s=n||(!0===i||!0===o?\"margin\":\"border\");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf(\"outer\")?t[\"inner\"+e]:t.document.documentElement[\"client\"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body[\"scroll\"+e],o[\"scroll\"+e],t.body[\"offset\"+e],o[\"offset\"+e],o[\"client\"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each(\"blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu\".split(\" \"),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,\"**\"):this.off(t,e||\"**\",n)}}),w.proxy=function(e,t){var n,r,i;if(\"string\"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return(\"number\"===t||\"string\"===t)&&!isNaN(e-parseFloat(e))},\"function\"==typeof define&&define.amd&&define(\"jquery\",[],function(){return w});var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});\n"

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmFhNTcwNTY2NzczNDViMWQ5Y2YiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NjcmlwdC1sb2FkZXIvYWRkU2NyaXB0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3FyLXNjYW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL25lbW8tcXItc2Nhbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNxci9kaXN0L2pzUVIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL25lbW8tcXItc2Nhbi9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9ub3JtYWxpemUuY3NzPzAyN2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovLy8uL3NyYy9saWIvanF1ZXJ5L2pxdWVyeS0zLjMuMS5taW4uanM/MmZlYyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2pxdWVyeS9qcXVlcnktMy4zLjEubWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJOZW1vUWVTY2FuIiwiJHciLCIkIiwid2luZG93IiwicXVTY2FuIiwicm9vdEVsZW1lbnQiLCJ3aWR0aCIsImhlaWdodCIsInJlc2l6ZSIsInNldFRpbWVvdXQiLCJvbiIsImpzcXIiLCJPcHRpb25zIiwiTmVtb1FyU2NhbiIsIm9iaiIsIm9wdGlvbnMiLCJkb21FbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidmlkZW9FbGVtZW50IiwiY2FudmFzRWxlbWVudCIsIl9faGlkZW5DYW52YXNFbGVtZW50IiwiX19pbml0IiwibWUiLCJmaWVsZEVsIiwidmlkZW9FbCIsImNhbnZhc0VsIiwiaENhbnZhc0VsIiwidldpZHRoIiwidmlkZW9XaWR0aCIsInZIZWlnaHQiLCJ2aWRlb0hlaWdodCIsInciLCJoIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwiY3R4IiwiZ2V0Q29udGV4dCIsImNsZWFyUmVjdCIsImNvZGUiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsIl9fZHJhd0xpbmUiLCJsb2NhdGlvbiIsInRvcExlZnRDb3JuZXIiLCJ0b3BSaWdodENvcm5lciIsImJvdHRvbVJpZ2h0Q29ybmVyIiwiYm90dG9tTGVmdENvcm5lciIsImJlZ2luIiwiZW5kIiwiY29sb3IiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJ4IiwieSIsImxpbmVUbyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwic3Ryb2tlIiwic2V0QXR0cmlidXRlIiwicG9zaXRpb24iLCJvdmVyZmxvdyIsImFwcGVuZENoaWxkIiwidXNlck1lZGlhIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwiYXVkaW8iLCJ2aWRlbyIsImZhY2luZ01vZGUiLCJ0aGVuIiwic3RyZWFtIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNyY09iamVjdCIsImNhdGNoIiwiZXJyb3IiLCJtZXNzYWdlIiwiaEN0eCIsImFuaW1hdGUiLCJkcmF3SW1hZ2UiLCJpbWFnZURhdGEiLCJnZXRJbWFnZURhdGEiLCJjbGVhckNhbnZhcyIsImRyYXdBcmVhIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW9kdWxlIiwiZXhwb3J0cyIsImJvZHkiLCJwYXJzZUZsb2F0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUMzWEEsbUJBQUFBLENBQVEsRUFBUjs7QUFFQSxtQkFBQUEsQ0FBUSxFQUFSOztBQUVBLElBQU1DLGFBQWEsbUJBQUFELENBQVEsR0FBUixD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMENBQTBDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7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YTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQ0FBMkM7QUFDdkUsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMENBQTBDO0FBQ3RFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDJDQUEyQztBQUN2RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSw0QkFBNEIsMkNBQTJDO0FBQ3ZFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDRCQUE0QiwyQ0FBMkM7QUFDdkUsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsNEJBQTRCLDJDQUEyQztBQUN2RSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0Q0FBNEM7QUFDakUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMENBQTBDO0FBQy9EO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQTBDO0FBQy9ELHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiw0Q0FBNEM7QUFDakU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsNENBQTRDO0FBQ2pFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNENBQTRDO0FBQ2pFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNENBQTRDO0FBQ3hFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDRDQUE0QztBQUNqRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNENBQTRDO0FBQ2pFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0Q0FBNEM7QUFDakUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEUscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsNENBQTRDO0FBQ2pFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBMEM7QUFDL0QscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUEwQztBQUMvRCxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNENBQTRDO0FBQ2pFLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJDQUEyQztBQUNoRSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsYUFB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MEJBQTBCLHNEQUFzRCwrUUFBK1EsMEhBQTBILGNBQWMsbUJBQW1CLGlFQUFpRSw2QkFBNkIsRUFBRSxrQkFBa0Isa0dBQWtHLGtEQUFrRCxHQUFHLGNBQWMscUJBQXFCLFlBQVksdUJBQXVCLGNBQWMsaUVBQWlFLEtBQUssc0VBQXNFLGdHQUFnRywwSEFBMEgsT0FBTywwRkFBMEYseUJBQXlCLDJCQUEyQix3QkFBd0IsNkRBQTZELGFBQWEsR0FBRyxVQUFVLHFEQUFxRCxlQUFlLDBCQUEwQixvQkFBb0IsOEJBQThCLE1BQU0sNEVBQTRFLHlEQUF5RCx3QkFBd0IsMENBQTBDLCtDQUErQyw2REFBNkQsRUFBRSxVQUFVLGtDQUFrQyxlQUFlLFFBQVEsK0NBQStDLGVBQWUsc0JBQXNCLCtGQUErRiw4QkFBOEIsTUFBTSwrUUFBK1Esa0JBQWtCLEVBQUUsOE5BQThOLHNCQUFzQiwrREFBK0QsZUFBZSxvQkFBb0IsNENBQTRDLGVBQWUscUJBQXFCLDJCQUEyQixzQkFBc0IsMEJBQTBCLDRCQUE0Qix3QkFBd0IsNEJBQTRCLHdFQUF3RSx3QkFBd0IsVUFBVSx5RkFBeUYsb0RBQW9ELGtDQUFrQyx5QkFBeUIsNEJBQTRCLHVKQUF1SixnQkFBZ0IsZ0VBQWdFLDBFQUEwRSxTQUFTLEVBQUUsdUJBQXVCLGdDQUFnQywwREFBMEQsdUJBQXVCLEVBQUUsRyIsImZpbGUiOiJxci1zY2FuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTQwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YWE1NzA1NjY3NzM0NWIxZDljZiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNyYykge1xuXHRmdW5jdGlvbiBsb2coZXJyb3IpIHtcblx0XHQodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpXG5cdFx0JiYgKGNvbnNvbGUuZXJyb3IgfHwgY29uc29sZS5sb2cpKFwiW1NjcmlwdCBMb2FkZXJdXCIsIGVycm9yKTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciBJRSA9PCA4XG5cdGZ1bmN0aW9uIGlzSUUoKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBhdHRhY2hFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJ1bmRlZmluZWRcIjtcblx0fVxuXG5cdHRyeSB7XG5cdFx0aWYgKHR5cGVvZiBleGVjU2NyaXB0ICE9PSBcInVuZGVmaW5lZFwiICYmIGlzSUUoKSkge1xuXHRcdFx0ZXhlY1NjcmlwdChzcmMpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGV2YWwgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdGV2YWwuY2FsbChudWxsLCBzcmMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsb2coXCJFdmFsRXJyb3I6IE5vIGV2YWwgZnVuY3Rpb24gYXZhaWxhYmxlXCIpO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRsb2coZXJyb3IpO1xuXHR9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zY3JpcHQtbG9hZGVyL2FkZFNjcmlwdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIDQgNSA2IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMgNCA1IDYiLCJyZXF1aXJlKCcuLi9jc3Mvbm9ybWFsaXplLmNzcycpO1xyXG5cclxucmVxdWlyZSgnc2NyaXB0LWxvYWRlciEuLi9saWIvanF1ZXJ5L2pxdWVyeS0zLjMuMS5taW4uanMnKTtcclxuXHJcbmNvbnN0IE5lbW9RZVNjYW4gPSByZXF1aXJlKCcuL25lbW8tcXItc2NhbicpO1xyXG5cclxuY29uc3QgJHcgPSAkKHdpbmRvdyk7XHJcblxyXG5jb25zdCBxdVNjYW4gPSBuZXcgTmVtb1FlU2Nhbih7XHJcbiAgICByb290RWxlbWVudDogJCgnI3NjYW5GaWVsZCcpWzBdLFxyXG4gICAgd2lkdGg6ICR3LndpZHRoKCksXHJcbiAgICBoZWlnaHQ6ICR3LmhlaWdodCgpXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gcmVzaXplKCkge1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcXVTY2FuLnJlc2l6ZSgkdy53aWR0aCgpLCAkdy5oZWlnaHQoKSk7XHJcbiAgICB9LCAxMDApO1xyXG59XHJcblxyXG4kKHdpbmRvdykub24oJ3Jlc2l6ZS5uZW1vbGFicycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJlc2l6ZSgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcXItc2Nhbi5qcyIsImNvbnN0IGpzcXIgPSByZXF1aXJlKCdqc3FyJyk7XHJcblxyXG5jb25zdCBPcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyk7XHJcblxyXG5jbGFzcyBOZW1vUXJTY2FuIHtcclxuICAgIGNvbnN0cnVjdG9yIChvYmopIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9ucyhvYmopO1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVklERU8nKTtcclxuICAgICAgICB0aGlzLmNhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdDQU5WQVMnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fX2hpZGVuQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0NBTlZBUycpO1xyXG5cclxuICAgICAgICB0aGlzLl9faW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xyXG5cclxuICAgICAgICBjb25zdCBmaWVsZEVsID0gbWUuZG9tRWxlbWVudDtcclxuICAgICAgICBjb25zdCB2aWRlb0VsID0gbWUudmlkZW9FbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhbnZhc0VsID0gbWUuY2FudmFzRWxlbWVudDtcclxuICAgICAgICBjb25zdCBoQ2FudmFzRWwgPSBtZS5fX2hpZGVuQ2FudmFzRWxlbWVudDtcclxuICAgICAgICBjb25zdCB2V2lkdGggPSB2aWRlb0VsLnZpZGVvV2lkdGg7XHJcbiAgICAgICAgY29uc3QgdkhlaWdodCA9IHZpZGVvRWwudmlkZW9IZWlnaHQ7XHJcblxyXG4gICAgICAgIGxldCB3ID0gd2lkdGg7XHJcbiAgICAgICAgbGV0IGggPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGZpZWxkRWwuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcclxuICAgICAgICBmaWVsZEVsLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xyXG5cclxuICAgICAgICBpZiAoKHZXaWR0aCAvIHZIZWlnaHQpIDwgKHcgLyBoKSkge1xyXG4gICAgICAgICAgICBoID0gKHcgLyB2V2lkdGgpICogdkhlaWdodDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdyA9IChoIC8gdkhlaWdodCkgKiB2V2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICB2aWRlb0VsLnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcbiAgICAgICAgdmlkZW9FbC5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcclxuICAgICAgICB2aWRlb0VsLnN0eWxlLmxlZnQgPSAod2lkdGggLSB3KSAvIDIgKyAncHgnO1xyXG4gICAgICAgIHZpZGVvRWwuc3R5bGUudG9wID0gKGhlaWdodCAtIGgpIC8gMiArICdweCc7XHJcblxyXG4gICAgICAgIGhDYW52YXNFbC53aWR0aCA9IGNhbnZhc0VsLndpZHRoID0gdztcclxuICAgICAgICBoQ2FudmFzRWwuaGVpZ2h0ID0gY2FudmFzRWwuaGVpZ2h0ID0gaDtcclxuICAgICAgICBoQ2FudmFzRWwuc3R5bGUud2lkdGggPSBjYW52YXNFbC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xyXG4gICAgICAgIGhDYW52YXNFbC5zdHlsZS5oZWlnaHQgPSBjYW52YXNFbC5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcclxuICAgICAgICBoQ2FudmFzRWwuc3R5bGUubGVmdCA9IGNhbnZhc0VsLnN0eWxlLmxlZnQgPSAod2lkdGggLSB3KSAvIDIgKyAncHgnO1xyXG4gICAgICAgIGhDYW52YXNFbC5zdHlsZS50b3AgPSBjYW52YXNFbC5zdHlsZS50b3AgPSAoaGVpZ2h0IC0gaCkgLyAyICsgJ3B4JztcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckNhbnZhcygpIHtcclxuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbnZhc0VsID0gbWUuY2FudmFzRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc0VsLndpZHRoLCBjYW52YXNFbC5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdBcmVhKGNvZGUpIHtcclxuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbnZhc0VsID0gbWUuY2FudmFzRWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKGNvZGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY29kZS5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgIG1lLl9fZHJhd0xpbmUoY2FudmFzRWwsIGNvZGUubG9jYXRpb24udG9wTGVmdENvcm5lciwgY29kZS5sb2NhdGlvbi50b3BSaWdodENvcm5lciwgXCIjRkYwMEZGXCIpO1xyXG4gICAgICAgICAgICBtZS5fX2RyYXdMaW5lKGNhbnZhc0VsLCBjb2RlLmxvY2F0aW9uLnRvcFJpZ2h0Q29ybmVyLCBjb2RlLmxvY2F0aW9uLmJvdHRvbVJpZ2h0Q29ybmVyLCBcIiMwMEZGMDBcIik7XHJcbiAgICAgICAgICAgIG1lLl9fZHJhd0xpbmUoY2FudmFzRWwsIGNvZGUubG9jYXRpb24uYm90dG9tUmlnaHRDb3JuZXIsIGNvZGUubG9jYXRpb24uYm90dG9tTGVmdENvcm5lciwgXCIjMDAwMEZGXCIpO1xyXG4gICAgICAgICAgICBtZS5fX2RyYXdMaW5lKGNhbnZhc0VsLCBjb2RlLmxvY2F0aW9uLmJvdHRvbUxlZnRDb3JuZXIsIGNvZGUubG9jYXRpb24udG9wTGVmdENvcm5lciwgXCIjRkYwMDAwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfX2RyYXdMaW5lKGNhbnZhc0VsLCBiZWdpbiwgZW5kLCBjb2xvcikge1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKGJlZ2luLngsIGJlZ2luLnkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oZW5kLngsIGVuZC55KTtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gNDtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX19pbml0KCkge1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG1lLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgZmllbGRFbCA9IG1lLmRvbUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgdmlkZW9FbCA9IG1lLnZpZGVvRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYW52YXNFbCA9IG1lLmNhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgICAgIHZpZGVvRWwuc2V0QXR0cmlidXRlKCdhdXRvUGxheScsICdhdXRvUGxheScpO1xyXG4gICAgICAgIHZpZGVvRWwuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICdwbGF5c2lubGluZScpO1xyXG4gICAgICAgIHZpZGVvRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICBjYW52YXNFbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIGZpZWxkRWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgICBmaWVsZEVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuXHJcbiAgICAgICAgZmllbGRFbC5hcHBlbmRDaGlsZCh2aWRlb0VsKTtcclxuICAgICAgICBmaWVsZEVsLmFwcGVuZENoaWxkKGNhbnZhc0VsKTtcclxuICAgICAgICBtZS5vcHRpb25zLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGZpZWxkRWwpO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XHJcbiAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlkZW86IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4MCxcclxuICAgICAgICAgICAgICAgIGZhY2luZ01vZGU6ICdlbnZpcm9ubWVudCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1c2VyTWVkaWEudGhlbihmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lLnJlc2l6ZShvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmlkZW9FbC5zcmNPYmplY3QgPSBzdHJlYW07XHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBoQ2FudmFzRWwgPSBtZS5fX2hpZGVuQ2FudmFzRWxlbWVudDtcclxuICAgICAgICBjb25zdCBoQ3R4ID0gaENhbnZhc0VsLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgIChmdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gICAgICAgICAgICBoQ3R4LmRyYXdJbWFnZSh2aWRlb0VsLCAwLCAwLCBoQ2FudmFzRWwud2lkdGgsIGhDYW52YXNFbC5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gaEN0eC5nZXRJbWFnZURhdGEoMCwgMCwgaENhbnZhc0VsLndpZHRoLCBoQ2FudmFzRWwuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29uc3QgY29kZSA9IGpzcXIoaW1hZ2VEYXRhLmRhdGEsIGltYWdlRGF0YS53aWR0aCwgaW1hZ2VEYXRhLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBtZS5jbGVhckNhbnZhcygpO1xyXG4gICAgICAgICAgICBtZS5kcmF3QXJlYShjb2RlKTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOZW1vUXJTY2FuO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9uZW1vLXFyLXNjYW4vaW5kZXguanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJqc1FSXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImpzUVJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpdE1hdHJpeCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaXRNYXRyaXgoZGF0YSwgd2lkdGgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEubGVuZ3RoIC8gd2lkdGg7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIEJpdE1hdHJpeC5jcmVhdGVFbXB0eSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQml0TWF0cml4KG5ldyBVaW50OENsYW1wZWRBcnJheSh3aWR0aCAqIGhlaWdodCksIHdpZHRoKTtcbiAgICB9O1xuICAgIEJpdE1hdHJpeC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAwIHx8IHggPj0gdGhpcy53aWR0aCB8fCB5IDwgMCB8fCB5ID49IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhdGhpcy5kYXRhW3kgKiB0aGlzLndpZHRoICsgeF07XG4gICAgfTtcbiAgICBCaXRNYXRyaXgucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh4LCB5LCB2KSB7XG4gICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy53aWR0aCArIHhdID0gdiA/IDEgOiAwO1xuICAgIH07XG4gICAgQml0TWF0cml4LnByb3RvdHlwZS5zZXRSZWdpb24gPSBmdW5jdGlvbiAobGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0LCB2KSB7XG4gICAgICAgIGZvciAodmFyIHkgPSB0b3A7IHkgPCB0b3AgKyBoZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IGxlZnQ7IHggPCBsZWZ0ICsgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHgsIHksICEhdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBCaXRNYXRyaXg7XG59KCkpO1xuZXhwb3J0cy5CaXRNYXRyaXggPSBCaXRNYXRyaXg7XG5cblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR2VuZXJpY0dGUG9seV8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcbmZ1bmN0aW9uIGFkZE9yU3VidHJhY3RHRihhLCBiKSB7XG4gICAgcmV0dXJuIGEgXiBiOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWJpdHdpc2Vcbn1cbmV4cG9ydHMuYWRkT3JTdWJ0cmFjdEdGID0gYWRkT3JTdWJ0cmFjdEdGO1xudmFyIEdlbmVyaWNHRiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHZW5lcmljR0YocHJpbWl0aXZlLCBzaXplLCBnZW5CYXNlKSB7XG4gICAgICAgIHRoaXMucHJpbWl0aXZlID0gcHJpbWl0aXZlO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmdlbmVyYXRvckJhc2UgPSBnZW5CYXNlO1xuICAgICAgICB0aGlzLmV4cFRhYmxlID0gbmV3IEFycmF5KHRoaXMuc2l6ZSk7XG4gICAgICAgIHRoaXMubG9nVGFibGUgPSBuZXcgQXJyYXkodGhpcy5zaXplKTtcbiAgICAgICAgdmFyIHggPSAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmV4cFRhYmxlW2ldID0geDtcbiAgICAgICAgICAgIHggPSB4ICogMjtcbiAgICAgICAgICAgIGlmICh4ID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIHggPSAoeCBeIHRoaXMucHJpbWl0aXZlKSAmICh0aGlzLnNpemUgLSAxKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1iaXR3aXNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNpemUgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubG9nVGFibGVbdGhpcy5leHBUYWJsZVtpXV0gPSBpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuemVybyA9IG5ldyBHZW5lcmljR0ZQb2x5XzEuZGVmYXVsdCh0aGlzLCBVaW50OENsYW1wZWRBcnJheS5mcm9tKFswXSkpO1xuICAgICAgICB0aGlzLm9uZSA9IG5ldyBHZW5lcmljR0ZQb2x5XzEuZGVmYXVsdCh0aGlzLCBVaW50OENsYW1wZWRBcnJheS5mcm9tKFsxXSkpO1xuICAgIH1cbiAgICBHZW5lcmljR0YucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgaWYgKGEgPT09IDAgfHwgYiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwVGFibGVbKHRoaXMubG9nVGFibGVbYV0gKyB0aGlzLmxvZ1RhYmxlW2JdKSAlICh0aGlzLnNpemUgLSAxKV07XG4gICAgfTtcbiAgICBHZW5lcmljR0YucHJvdG90eXBlLmludmVyc2UgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICBpZiAoYSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW52ZXJ0IDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwVGFibGVbdGhpcy5zaXplIC0gdGhpcy5sb2dUYWJsZVthXSAtIDFdO1xuICAgIH07XG4gICAgR2VuZXJpY0dGLnByb3RvdHlwZS5idWlsZE1vbm9taWFsID0gZnVuY3Rpb24gKGRlZ3JlZSwgY29lZmZpY2llbnQpIHtcbiAgICAgICAgaWYgKGRlZ3JlZSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbW9ub21pYWwgZGVncmVlIGxlc3MgdGhhbiAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuemVybztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29lZmZpY2llbnRzID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRlZ3JlZSArIDEpO1xuICAgICAgICBjb2VmZmljaWVudHNbMF0gPSBjb2VmZmljaWVudDtcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljR0ZQb2x5XzEuZGVmYXVsdCh0aGlzLCBjb2VmZmljaWVudHMpO1xuICAgIH07XG4gICAgR2VuZXJpY0dGLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICBpZiAoYSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgdGFrZSBsb2coMClcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9nVGFibGVbYV07XG4gICAgfTtcbiAgICBHZW5lcmljR0YucHJvdG90eXBlLmV4cCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4cFRhYmxlW2FdO1xuICAgIH07XG4gICAgcmV0dXJuIEdlbmVyaWNHRjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBHZW5lcmljR0Y7XG5cblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR2VuZXJpY0dGXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xudmFyIEdlbmVyaWNHRlBvbHkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2VuZXJpY0dGUG9seShmaWVsZCwgY29lZmZpY2llbnRzKSB7XG4gICAgICAgIGlmIChjb2VmZmljaWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb2VmZmljaWVudHMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgdmFyIGNvZWZmaWNpZW50c0xlbmd0aCA9IGNvZWZmaWNpZW50cy5sZW5ndGg7XG4gICAgICAgIGlmIChjb2VmZmljaWVudHNMZW5ndGggPiAxICYmIGNvZWZmaWNpZW50c1swXSA9PT0gMCkge1xuICAgICAgICAgICAgLy8gTGVhZGluZyB0ZXJtIG11c3QgYmUgbm9uLXplcm8gZm9yIGFueXRoaW5nIGV4Y2VwdCB0aGUgY29uc3RhbnQgcG9seW5vbWlhbCBcIjBcIlxuICAgICAgICAgICAgdmFyIGZpcnN0Tm9uWmVybyA9IDE7XG4gICAgICAgICAgICB3aGlsZSAoZmlyc3ROb25aZXJvIDwgY29lZmZpY2llbnRzTGVuZ3RoICYmIGNvZWZmaWNpZW50c1tmaXJzdE5vblplcm9dID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3ROb25aZXJvKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3ROb25aZXJvID09PSBjb2VmZmljaWVudHNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZWZmaWNpZW50cyA9IGZpZWxkLnplcm8uY29lZmZpY2llbnRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHMgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoY29lZmZpY2llbnRzTGVuZ3RoIC0gZmlyc3ROb25aZXJvKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29lZmZpY2llbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29lZmZpY2llbnRzW2ldID0gY29lZmZpY2llbnRzW2ZpcnN0Tm9uWmVybyArIGldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZpY2llbnRzID0gY29lZmZpY2llbnRzO1xuICAgICAgICB9XG4gICAgfVxuICAgIEdlbmVyaWNHRlBvbHkucHJvdG90eXBlLmRlZ3JlZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29lZmZpY2llbnRzLmxlbmd0aCAtIDE7XG4gICAgfTtcbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZWZmaWNpZW50c1swXSA9PT0gMDtcbiAgICB9O1xuICAgIEdlbmVyaWNHRlBvbHkucHJvdG90eXBlLmdldENvZWZmaWNpZW50ID0gZnVuY3Rpb24gKGRlZ3JlZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2VmZmljaWVudHNbdGhpcy5jb2VmZmljaWVudHMubGVuZ3RoIC0gMSAtIGRlZ3JlZV07XG4gICAgfTtcbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5hZGRPclN1YnRyYWN0ID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzWmVybygpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLmlzWmVybygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc21hbGxlckNvZWZmaWNpZW50cyA9IHRoaXMuY29lZmZpY2llbnRzO1xuICAgICAgICB2YXIgbGFyZ2VyQ29lZmZpY2llbnRzID0gb3RoZXIuY29lZmZpY2llbnRzO1xuICAgICAgICBpZiAoc21hbGxlckNvZWZmaWNpZW50cy5sZW5ndGggPiBsYXJnZXJDb2VmZmljaWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBfYSA9IFtsYXJnZXJDb2VmZmljaWVudHMsIHNtYWxsZXJDb2VmZmljaWVudHNdLCBzbWFsbGVyQ29lZmZpY2llbnRzID0gX2FbMF0sIGxhcmdlckNvZWZmaWNpZW50cyA9IF9hWzFdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdW1EaWZmID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGxhcmdlckNvZWZmaWNpZW50cy5sZW5ndGgpO1xuICAgICAgICB2YXIgbGVuZ3RoRGlmZiA9IGxhcmdlckNvZWZmaWNpZW50cy5sZW5ndGggLSBzbWFsbGVyQ29lZmZpY2llbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGhEaWZmOyBpKyspIHtcbiAgICAgICAgICAgIHN1bURpZmZbaV0gPSBsYXJnZXJDb2VmZmljaWVudHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IGxlbmd0aERpZmY7IGkgPCBsYXJnZXJDb2VmZmljaWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bURpZmZbaV0gPSBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0Yoc21hbGxlckNvZWZmaWNpZW50c1tpIC0gbGVuZ3RoRGlmZl0sIGxhcmdlckNvZWZmaWNpZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljR0ZQb2x5KHRoaXMuZmllbGQsIHN1bURpZmYpO1xuICAgICAgICB2YXIgX2E7XG4gICAgfTtcbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcbiAgICAgICAgaWYgKHNjYWxhciA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmllbGQuemVybztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGFyID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuY29lZmZpY2llbnRzLmxlbmd0aDtcbiAgICAgICAgdmFyIHByb2R1Y3QgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc2l6ZSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBwcm9kdWN0W2ldID0gdGhpcy5maWVsZC5tdWx0aXBseSh0aGlzLmNvZWZmaWNpZW50c1tpXSwgc2NhbGFyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNHRlBvbHkodGhpcy5maWVsZCwgcHJvZHVjdCk7XG4gICAgfTtcbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5tdWx0aXBseVBvbHkgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNaZXJvKCkgfHwgb3RoZXIuaXNaZXJvKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLnplcm87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFDb2VmZmljaWVudHMgPSB0aGlzLmNvZWZmaWNpZW50cztcbiAgICAgICAgdmFyIGFMZW5ndGggPSBhQ29lZmZpY2llbnRzLmxlbmd0aDtcbiAgICAgICAgdmFyIGJDb2VmZmljaWVudHMgPSBvdGhlci5jb2VmZmljaWVudHM7XG4gICAgICAgIHZhciBiTGVuZ3RoID0gYkNvZWZmaWNpZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciBwcm9kdWN0ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGFMZW5ndGggKyBiTGVuZ3RoIC0gMSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYUNvZWZmID0gYUNvZWZmaWNpZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYkxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdFtpICsgal0gPSBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0YocHJvZHVjdFtpICsgal0sIHRoaXMuZmllbGQubXVsdGlwbHkoYUNvZWZmLCBiQ29lZmZpY2llbnRzW2pdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljR0ZQb2x5KHRoaXMuZmllbGQsIHByb2R1Y3QpO1xuICAgIH07XG4gICAgR2VuZXJpY0dGUG9seS5wcm90b3R5cGUubXVsdGlwbHlCeU1vbm9taWFsID0gZnVuY3Rpb24gKGRlZ3JlZSwgY29lZmZpY2llbnQpIHtcbiAgICAgICAgaWYgKGRlZ3JlZSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGVncmVlIGxlc3MgdGhhbiAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmllbGQuemVybztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuY29lZmZpY2llbnRzLmxlbmd0aDtcbiAgICAgICAgdmFyIHByb2R1Y3QgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc2l6ZSArIGRlZ3JlZSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBwcm9kdWN0W2ldID0gdGhpcy5maWVsZC5tdWx0aXBseSh0aGlzLmNvZWZmaWNpZW50c1tpXSwgY29lZmZpY2llbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJpY0dGUG9seSh0aGlzLmZpZWxkLCBwcm9kdWN0KTtcbiAgICB9O1xuICAgIEdlbmVyaWNHRlBvbHkucHJvdG90eXBlLmV2YWx1YXRlQXQgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAgIC8vIEp1c3QgcmV0dXJuIHRoZSB4XjAgY29lZmZpY2llbnRcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvZWZmaWNpZW50KDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5jb2VmZmljaWVudHMubGVuZ3RoO1xuICAgICAgICBpZiAoYSA9PT0gMSkge1xuICAgICAgICAgICAgLy8gSnVzdCB0aGUgc3VtIG9mIHRoZSBjb2VmZmljaWVudHNcbiAgICAgICAgICAgIHRoaXMuY29lZmZpY2llbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvZWZmaWNpZW50KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gR2VuZXJpY0dGXzEuYWRkT3JTdWJ0cmFjdEdGKHJlc3VsdCwgY29lZmZpY2llbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuY29lZmZpY2llbnRzWzBdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ID0gR2VuZXJpY0dGXzEuYWRkT3JTdWJ0cmFjdEdGKHRoaXMuZmllbGQubXVsdGlwbHkoYSwgcmVzdWx0KSwgdGhpcy5jb2VmZmljaWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gR2VuZXJpY0dGUG9seTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBHZW5lcmljR0ZQb2x5O1xuXG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmFyaXplcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcbnZhciBkZWNvZGVyXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xudmFyIGV4dHJhY3Rvcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG52YXIgbG9jYXRvcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5mdW5jdGlvbiBqc1FSKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgYmluYXJpemVkID0gYmluYXJpemVyXzEuYmluYXJpemUoZGF0YSwgd2lkdGgsIGhlaWdodCk7XG4gICAgdmFyIGxvY2F0aW9uID0gbG9jYXRvcl8xLmxvY2F0ZShiaW5hcml6ZWQpO1xuICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBleHRyYWN0ZWQgPSBleHRyYWN0b3JfMS5leHRyYWN0KGJpbmFyaXplZCwgbG9jYXRpb24pO1xuICAgIHZhciBkZWNvZGVkID0gZGVjb2Rlcl8xLmRlY29kZShleHRyYWN0ZWQubWF0cml4KTtcbiAgICBpZiAoIWRlY29kZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGJpbmFyeURhdGE6IGRlY29kZWQuYnl0ZXMsXG4gICAgICAgIGRhdGE6IGRlY29kZWQudGV4dCxcbiAgICAgICAgY2h1bmtzOiBkZWNvZGVkLmNodW5rcyxcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIHRvcFJpZ2h0Q29ybmVyOiBleHRyYWN0ZWQubWFwcGluZ0Z1bmN0aW9uKGxvY2F0aW9uLmRpbWVuc2lvbiwgMCksXG4gICAgICAgICAgICB0b3BMZWZ0Q29ybmVyOiBleHRyYWN0ZWQubWFwcGluZ0Z1bmN0aW9uKDAsIDApLFxuICAgICAgICAgICAgYm90dG9tUmlnaHRDb3JuZXI6IGV4dHJhY3RlZC5tYXBwaW5nRnVuY3Rpb24obG9jYXRpb24uZGltZW5zaW9uLCBsb2NhdGlvbi5kaW1lbnNpb24pLFxuICAgICAgICAgICAgYm90dG9tTGVmdENvcm5lcjogZXh0cmFjdGVkLm1hcHBpbmdGdW5jdGlvbigwLCBsb2NhdGlvbi5kaW1lbnNpb24pLFxuICAgICAgICAgICAgdG9wUmlnaHRGaW5kZXJQYXR0ZXJuOiBsb2NhdGlvbi50b3BSaWdodCxcbiAgICAgICAgICAgIHRvcExlZnRGaW5kZXJQYXR0ZXJuOiBsb2NhdGlvbi50b3BMZWZ0LFxuICAgICAgICAgICAgYm90dG9tTGVmdEZpbmRlclBhdHRlcm46IGxvY2F0aW9uLmJvdHRvbUxlZnQsXG4gICAgICAgICAgICBib3R0b21SaWdodEFsaWdubWVudFBhdHRlcm46IGxvY2F0aW9uLmFsaWdubWVudFBhdHRlcm4sXG4gICAgICAgIH0sXG4gICAgfTtcbn1cbmpzUVIuZGVmYXVsdCA9IGpzUVI7XG5leHBvcnRzLmRlZmF1bHQgPSBqc1FSO1xuXG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpdE1hdHJpeF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbnZhciBSRUdJT05fU0laRSA9IDg7XG52YXIgTUlOX0RZTkFNSUNfUkFOR0UgPSAyNDtcbmZ1bmN0aW9uIG51bUJldHdlZW4odmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcbn1cbi8vIExpa2UgQml0TWF0cml4IGJ1dCBhY2NlcHRzIGFyYml0cnkgVWludDggdmFsdWVzXG52YXIgTWF0cml4ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hdHJpeCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgICB9XG4gICAgTWF0cml4LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLndpZHRoICsgeF07XG4gICAgfTtcbiAgICBNYXRyaXgucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh4LCB5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMud2lkdGggKyB4XSA9IHZhbHVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1hdHJpeDtcbn0oKSk7XG5mdW5jdGlvbiBiaW5hcml6ZShkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoICE9PSB3aWR0aCAqIGhlaWdodCAqIDQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFsZm9ybWVkIGRhdGEgcGFzc2VkIHRvIGJpbmFyaXplci5cIik7XG4gICAgfVxuICAgIC8vIENvbnZlcnQgaW1hZ2UgdG8gZ3JleXNjYWxlXG4gICAgdmFyIGdyZXlzY2FsZVBpeGVscyA9IG5ldyBNYXRyaXgod2lkdGgsIGhlaWdodCk7XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHZhciByID0gZGF0YVsoKHkgKiB3aWR0aCArIHgpICogNCkgKyAwXTtcbiAgICAgICAgICAgIHZhciBnID0gZGF0YVsoKHkgKiB3aWR0aCArIHgpICogNCkgKyAxXTtcbiAgICAgICAgICAgIHZhciBiID0gZGF0YVsoKHkgKiB3aWR0aCArIHgpICogNCkgKyAyXTtcbiAgICAgICAgICAgIGdyZXlzY2FsZVBpeGVscy5zZXQoeCwgeSwgMC4yMTI2ICogciArIDAuNzE1MiAqIGcgKyAwLjA3MjIgKiBiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgaG9yaXpvbnRhbFJlZ2lvbkNvdW50ID0gTWF0aC5jZWlsKHdpZHRoIC8gUkVHSU9OX1NJWkUpO1xuICAgIHZhciB2ZXJ0aWNhbFJlZ2lvbkNvdW50ID0gTWF0aC5jZWlsKGhlaWdodCAvIFJFR0lPTl9TSVpFKTtcbiAgICB2YXIgYmxhY2tQb2ludHMgPSBuZXcgTWF0cml4KGhvcml6b250YWxSZWdpb25Db3VudCwgdmVydGljYWxSZWdpb25Db3VudCk7XG4gICAgZm9yICh2YXIgdmVydGljYWxSZWdpb24gPSAwOyB2ZXJ0aWNhbFJlZ2lvbiA8IHZlcnRpY2FsUmVnaW9uQ291bnQ7IHZlcnRpY2FsUmVnaW9uKyspIHtcbiAgICAgICAgZm9yICh2YXIgaG9ydGl6b250YWxSZWdpb24gPSAwOyBob3J0aXpvbnRhbFJlZ2lvbiA8IGhvcml6b250YWxSZWdpb25Db3VudDsgaG9ydGl6b250YWxSZWdpb24rKykge1xuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICB2YXIgbWluID0gSW5maW5pdHk7XG4gICAgICAgICAgICB2YXIgbWF4ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgUkVHSU9OX1NJWkU7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgUkVHSU9OX1NJWkU7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGl4ZWxMdW1vc2l0eSA9IGdyZXlzY2FsZVBpeGVscy5nZXQoaG9ydGl6b250YWxSZWdpb24gKiBSRUdJT05fU0laRSArIHgsIHZlcnRpY2FsUmVnaW9uICogUkVHSU9OX1NJWkUgKyB5KTtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IHBpeGVsTHVtb3NpdHk7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IE1hdGgubWluKG1pbiwgcGl4ZWxMdW1vc2l0eSk7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KG1heCwgcGl4ZWxMdW1vc2l0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGF2ZXJhZ2UgPSBzdW0gLyAoTWF0aC5wb3coUkVHSU9OX1NJWkUsIDIpKTtcbiAgICAgICAgICAgIGlmIChtYXggLSBtaW4gPD0gTUlOX0RZTkFNSUNfUkFOR0UpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB2YXJpYXRpb24gd2l0aGluIHRoZSBibG9jayBpcyBsb3csIGFzc3VtZSB0aGlzIGlzIGEgYmxvY2sgd2l0aCBvbmx5IGxpZ2h0IG9yIG9ubHlcbiAgICAgICAgICAgICAgICAvLyBkYXJrIHBpeGVscy4gSW4gdGhhdCBjYXNlIHdlIGRvIG5vdCB3YW50IHRvIHVzZSB0aGUgYXZlcmFnZSwgYXMgaXQgd291bGQgZGl2aWRlIHRoaXNcbiAgICAgICAgICAgICAgICAvLyBsb3cgY29udHJhc3QgYXJlYSBpbnRvIGJsYWNrIGFuZCB3aGl0ZSBwaXhlbHMsIGVzc2VudGlhbGx5IGNyZWF0aW5nIGRhdGEgb3V0IG9mIG5vaXNlLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0aGUgYmxhY2twb2ludCBmb3IgdGhlc2UgYmxvY2tzIHRvIGJlIGhhbGYgdGhlIG1pbiAtIGVmZmVjdGl2ZWx5IHdoaXRlIHRoZW0gb3V0XG4gICAgICAgICAgICAgICAgYXZlcmFnZSA9IG1pbiAvIDI7XG4gICAgICAgICAgICAgICAgaWYgKHZlcnRpY2FsUmVnaW9uID4gMCAmJiBob3J0aXpvbnRhbFJlZ2lvbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29ycmVjdCB0aGUgXCJ3aGl0ZSBiYWNrZ3JvdW5kXCIgYXNzdW1wdGlvbiBmb3IgYmxvY2tzIHRoYXQgaGF2ZSBuZWlnaGJvcnMgYnkgY29tcGFyaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBwaXhlbHMgaW4gdGhpcyBibG9jayB0byB0aGUgcHJldmlvdXNseSBjYWxjdWxhdGVkIGJsYWNrIHBvaW50cy4gVGhpcyBpcyBiYXNlZCBvblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZmFjdCB0aGF0IGRhcmsgYmFyY29kZSBzeW1ib2xvZ3kgaXMgYWx3YXlzIHN1cnJvdW5kZWQgYnkgc29tZSBhbW91bnQgb2YgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgLy8gYmFja2dyb3VuZCBmb3Igd2hpY2ggcmVhc29uYWJsZSBibGFjayBwb2ludCBlc3RpbWF0ZXMgd2VyZSBtYWRlLiBUaGUgYnAgZXN0aW1hdGVkIGF0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBib3VuZGFyaWVzIGlzIHVzZWQgZm9yIHRoZSBpbnRlcmlvci5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIChtaW4gPCBicCkgaXMgYXJiaXRyYXJ5IGJ1dCB3b3JrcyBiZXR0ZXIgdGhhbiBvdGhlciBoZXVyaXN0aWNzIHRoYXQgd2VyZSB0cmllZC5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGF2ZXJhZ2VOZWlnaGJvckJsYWNrUG9pbnQgPSAoYmxhY2tQb2ludHMuZ2V0KGhvcnRpem9udGFsUmVnaW9uLCB2ZXJ0aWNhbFJlZ2lvbiAtIDEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICgyICogYmxhY2tQb2ludHMuZ2V0KGhvcnRpem9udGFsUmVnaW9uIC0gMSwgdmVydGljYWxSZWdpb24pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBibGFja1BvaW50cy5nZXQoaG9ydGl6b250YWxSZWdpb24gLSAxLCB2ZXJ0aWNhbFJlZ2lvbiAtIDEpKSAvIDQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW4gPCBhdmVyYWdlTmVpZ2hib3JCbGFja1BvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmVyYWdlID0gYXZlcmFnZU5laWdoYm9yQmxhY2tQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsYWNrUG9pbnRzLnNldChob3J0aXpvbnRhbFJlZ2lvbiwgdmVydGljYWxSZWdpb24sIGF2ZXJhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBiaW5hcml6ZWQgPSBCaXRNYXRyaXhfMS5CaXRNYXRyaXguY3JlYXRlRW1wdHkod2lkdGgsIGhlaWdodCk7XG4gICAgZm9yICh2YXIgdmVydGljYWxSZWdpb24gPSAwOyB2ZXJ0aWNhbFJlZ2lvbiA8IHZlcnRpY2FsUmVnaW9uQ291bnQ7IHZlcnRpY2FsUmVnaW9uKyspIHtcbiAgICAgICAgZm9yICh2YXIgaG9ydGl6b250YWxSZWdpb24gPSAwOyBob3J0aXpvbnRhbFJlZ2lvbiA8IGhvcml6b250YWxSZWdpb25Db3VudDsgaG9ydGl6b250YWxSZWdpb24rKykge1xuICAgICAgICAgICAgdmFyIGxlZnQgPSBudW1CZXR3ZWVuKGhvcnRpem9udGFsUmVnaW9uLCAyLCBob3Jpem9udGFsUmVnaW9uQ291bnQgLSAzKTtcbiAgICAgICAgICAgIHZhciB0b3BfMSA9IG51bUJldHdlZW4odmVydGljYWxSZWdpb24sIDIsIHZlcnRpY2FsUmVnaW9uQ291bnQgLSAzKTtcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgeFJlZ2lvbiA9IC0yOyB4UmVnaW9uIDw9IDI7IHhSZWdpb24rKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHlSZWdpb24gPSAtMjsgeVJlZ2lvbiA8PSAyOyB5UmVnaW9uKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGJsYWNrUG9pbnRzLmdldChsZWZ0ICsgeFJlZ2lvbiwgdG9wXzEgKyB5UmVnaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhyZXNob2xkID0gc3VtIC8gMjU7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IFJFR0lPTl9TSVpFOyB4KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IFJFR0lPTl9TSVpFOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGx1bSA9IGdyZXlzY2FsZVBpeGVscy5nZXQoaG9ydGl6b250YWxSZWdpb24gKiBSRUdJT05fU0laRSArIHgsIHZlcnRpY2FsUmVnaW9uICogUkVHSU9OX1NJWkUgKyB5KTtcbiAgICAgICAgICAgICAgICAgICAgYmluYXJpemVkLnNldChob3J0aXpvbnRhbFJlZ2lvbiAqIFJFR0lPTl9TSVpFICsgeCwgdmVydGljYWxSZWdpb24gKiBSRUdJT05fU0laRSArIHksIGx1bSA8PSB0aHJlc2hvbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmluYXJpemVkO1xufVxuZXhwb3J0cy5iaW5hcml6ZSA9IGJpbmFyaXplO1xuXG5cbi8qKiovIH0pLFxuLyogNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpdE1hdHJpeF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbnZhciBkZWNvZGVEYXRhXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xudmFyIHJlZWRzb2xvbW9uXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xudmFyIHZlcnNpb25fMSA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZVxuZnVuY3Rpb24gbnVtQml0c0RpZmZlcmluZyh4LCB5KSB7XG4gICAgdmFyIHogPSB4IF4geTtcbiAgICB2YXIgYml0Q291bnQgPSAwO1xuICAgIHdoaWxlICh6KSB7XG4gICAgICAgIGJpdENvdW50Kys7XG4gICAgICAgIHogJj0geiAtIDE7XG4gICAgfVxuICAgIHJldHVybiBiaXRDb3VudDtcbn1cbmZ1bmN0aW9uIHB1c2hCaXQoYml0LCBieXRlKSB7XG4gICAgcmV0dXJuIChieXRlIDw8IDEpIHwgYml0O1xufVxuLy8gdHNsaW50OmVuYWJsZTpuby1iaXR3aXNlXG52YXIgRk9STUFUX0lORk9fVEFCTEUgPSBbXG4gICAgeyBiaXRzOiAweDU0MTIsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDEsIGRhdGFNYXNrOiAwIH0gfSxcbiAgICB7IGJpdHM6IDB4NTEyNSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMSwgZGF0YU1hc2s6IDEgfSB9LFxuICAgIHsgYml0czogMHg1RTdDLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAxLCBkYXRhTWFzazogMiB9IH0sXG4gICAgeyBiaXRzOiAweDVCNEIsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDEsIGRhdGFNYXNrOiAzIH0gfSxcbiAgICB7IGJpdHM6IDB4NDVGOSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMSwgZGF0YU1hc2s6IDQgfSB9LFxuICAgIHsgYml0czogMHg0MENFLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAxLCBkYXRhTWFzazogNSB9IH0sXG4gICAgeyBiaXRzOiAweDRGOTcsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDEsIGRhdGFNYXNrOiA2IH0gfSxcbiAgICB7IGJpdHM6IDB4NEFBMCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMSwgZGF0YU1hc2s6IDcgfSB9LFxuICAgIHsgYml0czogMHg3N0M0LCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAwLCBkYXRhTWFzazogMCB9IH0sXG4gICAgeyBiaXRzOiAweDcyRjMsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDAsIGRhdGFNYXNrOiAxIH0gfSxcbiAgICB7IGJpdHM6IDB4N0RBQSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMCwgZGF0YU1hc2s6IDIgfSB9LFxuICAgIHsgYml0czogMHg3ODlELCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAwLCBkYXRhTWFzazogMyB9IH0sXG4gICAgeyBiaXRzOiAweDY2MkYsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDAsIGRhdGFNYXNrOiA0IH0gfSxcbiAgICB7IGJpdHM6IDB4NjMxOCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMCwgZGF0YU1hc2s6IDUgfSB9LFxuICAgIHsgYml0czogMHg2QzQxLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAwLCBkYXRhTWFzazogNiB9IH0sXG4gICAgeyBiaXRzOiAweDY5NzYsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDAsIGRhdGFNYXNrOiA3IH0gfSxcbiAgICB7IGJpdHM6IDB4MTY4OSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMywgZGF0YU1hc2s6IDAgfSB9LFxuICAgIHsgYml0czogMHgxM0JFLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAzLCBkYXRhTWFzazogMSB9IH0sXG4gICAgeyBiaXRzOiAweDFDRTcsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDMsIGRhdGFNYXNrOiAyIH0gfSxcbiAgICB7IGJpdHM6IDB4MTlEMCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMywgZGF0YU1hc2s6IDMgfSB9LFxuICAgIHsgYml0czogMHgwNzYyLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAzLCBkYXRhTWFzazogNCB9IH0sXG4gICAgeyBiaXRzOiAweDAyNTUsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDMsIGRhdGFNYXNrOiA1IH0gfSxcbiAgICB7IGJpdHM6IDB4MEQwQywgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMywgZGF0YU1hc2s6IDYgfSB9LFxuICAgIHsgYml0czogMHgwODNCLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAzLCBkYXRhTWFzazogNyB9IH0sXG4gICAgeyBiaXRzOiAweDM1NUYsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDIsIGRhdGFNYXNrOiAwIH0gfSxcbiAgICB7IGJpdHM6IDB4MzA2OCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMiwgZGF0YU1hc2s6IDEgfSB9LFxuICAgIHsgYml0czogMHgzRjMxLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAyLCBkYXRhTWFzazogMiB9IH0sXG4gICAgeyBiaXRzOiAweDNBMDYsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDIsIGRhdGFNYXNrOiAzIH0gfSxcbiAgICB7IGJpdHM6IDB4MjRCNCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMiwgZGF0YU1hc2s6IDQgfSB9LFxuICAgIHsgYml0czogMHgyMTgzLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAyLCBkYXRhTWFzazogNSB9IH0sXG4gICAgeyBiaXRzOiAweDJFREEsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDIsIGRhdGFNYXNrOiA2IH0gfSxcbiAgICB7IGJpdHM6IDB4MkJFRCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMiwgZGF0YU1hc2s6IDcgfSB9LFxuXTtcbnZhciBEQVRBX01BU0tTID0gW1xuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiAoKHAueSArIHAueCkgJSAyKSA9PT0gMDsgfSxcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gKHAueSAlIDIpID09PSAwOyB9LFxuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiBwLnggJSAzID09PSAwOyB9LFxuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiAocC55ICsgcC54KSAlIDMgPT09IDA7IH0sXG4gICAgZnVuY3Rpb24gKHApIHsgcmV0dXJuIChNYXRoLmZsb29yKHAueSAvIDIpICsgTWF0aC5mbG9vcihwLnggLyAzKSkgJSAyID09PSAwOyB9LFxuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiAoKHAueCAqIHAueSkgJSAyKSArICgocC54ICogcC55KSAlIDMpID09PSAwOyB9LFxuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiAoKCgocC55ICogcC54KSAlIDIpICsgKHAueSAqIHAueCkgJSAzKSAlIDIpID09PSAwOyB9LFxuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiAoKCgocC55ICsgcC54KSAlIDIpICsgKHAueSAqIHAueCkgJSAzKSAlIDIpID09PSAwOyB9LFxuXTtcbmZ1bmN0aW9uIGJ1aWxkRnVuY3Rpb25QYXR0ZXJuTWFzayh2ZXJzaW9uKSB7XG4gICAgdmFyIGRpbWVuc2lvbiA9IDE3ICsgNCAqIHZlcnNpb24udmVyc2lvbk51bWJlcjtcbiAgICB2YXIgbWF0cml4ID0gQml0TWF0cml4XzEuQml0TWF0cml4LmNyZWF0ZUVtcHR5KGRpbWVuc2lvbiwgZGltZW5zaW9uKTtcbiAgICBtYXRyaXguc2V0UmVnaW9uKDAsIDAsIDksIDksIHRydWUpOyAvLyBUb3AgbGVmdCBmaW5kZXIgcGF0dGVybiArIHNlcGFyYXRvciArIGZvcm1hdFxuICAgIG1hdHJpeC5zZXRSZWdpb24oZGltZW5zaW9uIC0gOCwgMCwgOCwgOSwgdHJ1ZSk7IC8vIFRvcCByaWdodCBmaW5kZXIgcGF0dGVybiArIHNlcGFyYXRvciArIGZvcm1hdFxuICAgIG1hdHJpeC5zZXRSZWdpb24oMCwgZGltZW5zaW9uIC0gOCwgOSwgOCwgdHJ1ZSk7IC8vIEJvdHRvbSBsZWZ0IGZpbmRlciBwYXR0ZXJuICsgc2VwYXJhdG9yICsgZm9ybWF0XG4gICAgLy8gQWxpZ25tZW50IHBhdHRlcm5zXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHZlcnNpb24uYWxpZ25tZW50UGF0dGVybkNlbnRlcnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciB4ID0gX2FbX2ldO1xuICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdmVyc2lvbi5hbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgIHZhciB5ID0gX2NbX2JdO1xuICAgICAgICAgICAgaWYgKCEoeCA9PT0gNiAmJiB5ID09PSA2IHx8IHggPT09IDYgJiYgeSA9PT0gZGltZW5zaW9uIC0gNyB8fCB4ID09PSBkaW1lbnNpb24gLSA3ICYmIHkgPT09IDYpKSB7XG4gICAgICAgICAgICAgICAgbWF0cml4LnNldFJlZ2lvbih4IC0gMiwgeSAtIDIsIDUsIDUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG1hdHJpeC5zZXRSZWdpb24oNiwgOSwgMSwgZGltZW5zaW9uIC0gMTcsIHRydWUpOyAvLyBWZXJ0aWNhbCB0aW1pbmcgcGF0dGVyblxuICAgIG1hdHJpeC5zZXRSZWdpb24oOSwgNiwgZGltZW5zaW9uIC0gMTcsIDEsIHRydWUpOyAvLyBIb3Jpem9udGFsIHRpbWluZyBwYXR0ZXJuXG4gICAgaWYgKHZlcnNpb24udmVyc2lvbk51bWJlciA+IDYpIHtcbiAgICAgICAgbWF0cml4LnNldFJlZ2lvbihkaW1lbnNpb24gLSAxMSwgMCwgMywgNiwgdHJ1ZSk7IC8vIFZlcnNpb24gaW5mbywgdG9wIHJpZ2h0XG4gICAgICAgIG1hdHJpeC5zZXRSZWdpb24oMCwgZGltZW5zaW9uIC0gMTEsIDYsIDMsIHRydWUpOyAvLyBWZXJzaW9uIGluZm8sIGJvdHRvbSBsZWZ0XG4gICAgfVxuICAgIHJldHVybiBtYXRyaXg7XG59XG5mdW5jdGlvbiByZWFkQ29kZXdvcmRzKG1hdHJpeCwgdmVyc2lvbiwgZm9ybWF0SW5mbykge1xuICAgIHZhciBkYXRhTWFzayA9IERBVEFfTUFTS1NbZm9ybWF0SW5mby5kYXRhTWFza107XG4gICAgdmFyIGRpbWVuc2lvbiA9IG1hdHJpeC5oZWlnaHQ7XG4gICAgdmFyIGZ1bmN0aW9uUGF0dGVybk1hc2sgPSBidWlsZEZ1bmN0aW9uUGF0dGVybk1hc2sodmVyc2lvbik7XG4gICAgdmFyIGNvZGV3b3JkcyA9IFtdO1xuICAgIHZhciBjdXJyZW50Qnl0ZSA9IDA7XG4gICAgdmFyIGJpdHNSZWFkID0gMDtcbiAgICAvLyBSZWFkIGNvbHVtbnMgaW4gcGFpcnMsIGZyb20gcmlnaHQgdG8gbGVmdFxuICAgIHZhciByZWFkaW5nVXAgPSB0cnVlO1xuICAgIGZvciAodmFyIGNvbHVtbkluZGV4ID0gZGltZW5zaW9uIC0gMTsgY29sdW1uSW5kZXggPiAwOyBjb2x1bW5JbmRleCAtPSAyKSB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA9PT0gNikge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgtLTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbWVuc2lvbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgeSA9IHJlYWRpbmdVcCA/IGRpbWVuc2lvbiAtIDEgLSBpIDogaTtcbiAgICAgICAgICAgIGZvciAodmFyIGNvbHVtbk9mZnNldCA9IDA7IGNvbHVtbk9mZnNldCA8IDI7IGNvbHVtbk9mZnNldCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBjb2x1bW5JbmRleCAtIGNvbHVtbk9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoIWZ1bmN0aW9uUGF0dGVybk1hc2suZ2V0KHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpdHNSZWFkKys7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiaXQgPSBtYXRyaXguZ2V0KHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YU1hc2soeyB5OiB5LCB4OiB4IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaXQgPSAhYml0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCeXRlID0gcHVzaEJpdChiaXQsIGN1cnJlbnRCeXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJpdHNSZWFkID09PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2Rld29yZHMucHVzaChjdXJyZW50Qnl0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRzUmVhZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Qnl0ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGluZ1VwID0gIXJlYWRpbmdVcDtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGV3b3Jkcztcbn1cbmZ1bmN0aW9uIHJlYWRWZXJzaW9uKG1hdHJpeCkge1xuICAgIHZhciBkaW1lbnNpb24gPSBtYXRyaXguaGVpZ2h0O1xuICAgIHZhciBwcm92aXNpb25hbFZlcnNpb24gPSBNYXRoLmZsb29yKChkaW1lbnNpb24gLSAxNykgLyA0KTtcbiAgICBpZiAocHJvdmlzaW9uYWxWZXJzaW9uIDw9IDYpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25fMS5WRVJTSU9OU1twcm92aXNpb25hbFZlcnNpb24gLSAxXTtcbiAgICB9XG4gICAgdmFyIHRvcFJpZ2h0VmVyc2lvbkJpdHMgPSAwO1xuICAgIGZvciAodmFyIHkgPSA1OyB5ID49IDA7IHktLSkge1xuICAgICAgICBmb3IgKHZhciB4ID0gZGltZW5zaW9uIC0gOTsgeCA+PSBkaW1lbnNpb24gLSAxMTsgeC0tKSB7XG4gICAgICAgICAgICB0b3BSaWdodFZlcnNpb25CaXRzID0gcHVzaEJpdChtYXRyaXguZ2V0KHgsIHkpLCB0b3BSaWdodFZlcnNpb25CaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgYm90dG9tTGVmdFZlcnNpb25CaXRzID0gMDtcbiAgICBmb3IgKHZhciB4ID0gNTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IGRpbWVuc2lvbiAtIDk7IHkgPj0gZGltZW5zaW9uIC0gMTE7IHktLSkge1xuICAgICAgICAgICAgYm90dG9tTGVmdFZlcnNpb25CaXRzID0gcHVzaEJpdChtYXRyaXguZ2V0KHgsIHkpLCBib3R0b21MZWZ0VmVyc2lvbkJpdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBiZXN0RGlmZmVyZW5jZSA9IEluZmluaXR5O1xuICAgIHZhciBiZXN0VmVyc2lvbjtcbiAgICBmb3IgKHZhciBfaSA9IDAsIFZFUlNJT05TXzEgPSB2ZXJzaW9uXzEuVkVSU0lPTlM7IF9pIDwgVkVSU0lPTlNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBWRVJTSU9OU18xW19pXTtcbiAgICAgICAgaWYgKHZlcnNpb24uaW5mb0JpdHMgPT09IHRvcFJpZ2h0VmVyc2lvbkJpdHMgfHwgdmVyc2lvbi5pbmZvQml0cyA9PT0gYm90dG9tTGVmdFZlcnNpb25CaXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IG51bUJpdHNEaWZmZXJpbmcodG9wUmlnaHRWZXJzaW9uQml0cywgdmVyc2lvbi5pbmZvQml0cyk7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlIDwgYmVzdERpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgIGJlc3RWZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICAgIGJlc3REaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgICBkaWZmZXJlbmNlID0gbnVtQml0c0RpZmZlcmluZyhib3R0b21MZWZ0VmVyc2lvbkJpdHMsIHZlcnNpb24uaW5mb0JpdHMpO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA8IGJlc3REaWZmZXJlbmNlKSB7XG4gICAgICAgICAgICBiZXN0VmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgICBiZXN0RGlmZmVyZW5jZSA9IGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgY2FuIHRvbGVyYXRlIHVwIHRvIDMgYml0cyBvZiBlcnJvciBzaW5jZSBubyB0d28gdmVyc2lvbiBpbmZvIGNvZGV3b3JkcyB3aWxsXG4gICAgLy8gZGlmZmVyIGluIGxlc3MgdGhhbiA4IGJpdHMuXG4gICAgaWYgKGJlc3REaWZmZXJlbmNlIDw9IDMpIHtcbiAgICAgICAgcmV0dXJuIGJlc3RWZXJzaW9uO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlYWRGb3JtYXRJbmZvcm1hdGlvbihtYXRyaXgpIHtcbiAgICB2YXIgdG9wTGVmdEZvcm1hdEluZm9CaXRzID0gMDtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSA4OyB4KyspIHtcbiAgICAgICAgaWYgKHggIT09IDYpIHtcbiAgICAgICAgICAgIHRvcExlZnRGb3JtYXRJbmZvQml0cyA9IHB1c2hCaXQobWF0cml4LmdldCh4LCA4KSwgdG9wTGVmdEZvcm1hdEluZm9CaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciB5ID0gNzsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgaWYgKHkgIT09IDYpIHtcbiAgICAgICAgICAgIHRvcExlZnRGb3JtYXRJbmZvQml0cyA9IHB1c2hCaXQobWF0cml4LmdldCg4LCB5KSwgdG9wTGVmdEZvcm1hdEluZm9CaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZGltZW5zaW9uID0gbWF0cml4LmhlaWdodDtcbiAgICB2YXIgdG9wUmlnaHRCb3R0b21SaWdodEZvcm1hdEluZm9CaXRzID0gMDtcbiAgICBmb3IgKHZhciB5ID0gZGltZW5zaW9uIC0gMTsgeSA+PSBkaW1lbnNpb24gLSA3OyB5LS0pIHtcbiAgICAgICAgdG9wUmlnaHRCb3R0b21SaWdodEZvcm1hdEluZm9CaXRzID0gcHVzaEJpdChtYXRyaXguZ2V0KDgsIHkpLCB0b3BSaWdodEJvdHRvbVJpZ2h0Rm9ybWF0SW5mb0JpdHMpO1xuICAgIH1cbiAgICBmb3IgKHZhciB4ID0gZGltZW5zaW9uIC0gODsgeCA8IGRpbWVuc2lvbjsgeCsrKSB7XG4gICAgICAgIHRvcFJpZ2h0Qm90dG9tUmlnaHRGb3JtYXRJbmZvQml0cyA9IHB1c2hCaXQobWF0cml4LmdldCh4LCA4KSwgdG9wUmlnaHRCb3R0b21SaWdodEZvcm1hdEluZm9CaXRzKTtcbiAgICB9XG4gICAgdmFyIGJlc3REaWZmZXJlbmNlID0gSW5maW5pdHk7XG4gICAgdmFyIGJlc3RGb3JtYXRJbmZvID0gbnVsbDtcbiAgICBmb3IgKHZhciBfaSA9IDAsIEZPUk1BVF9JTkZPX1RBQkxFXzEgPSBGT1JNQVRfSU5GT19UQUJMRTsgX2kgPCBGT1JNQVRfSU5GT19UQUJMRV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX2EgPSBGT1JNQVRfSU5GT19UQUJMRV8xW19pXSwgYml0cyA9IF9hLmJpdHMsIGZvcm1hdEluZm8gPSBfYS5mb3JtYXRJbmZvO1xuICAgICAgICBpZiAoYml0cyA9PT0gdG9wTGVmdEZvcm1hdEluZm9CaXRzIHx8IGJpdHMgPT09IHRvcFJpZ2h0Qm90dG9tUmlnaHRGb3JtYXRJbmZvQml0cykge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdEluZm87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBudW1CaXRzRGlmZmVyaW5nKHRvcExlZnRGb3JtYXRJbmZvQml0cywgYml0cyk7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlIDwgYmVzdERpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgIGJlc3RGb3JtYXRJbmZvID0gZm9ybWF0SW5mbztcbiAgICAgICAgICAgIGJlc3REaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9wTGVmdEZvcm1hdEluZm9CaXRzICE9PSB0b3BSaWdodEJvdHRvbVJpZ2h0Rm9ybWF0SW5mb0JpdHMpIHtcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBudW1CaXRzRGlmZmVyaW5nKHRvcFJpZ2h0Qm90dG9tUmlnaHRGb3JtYXRJbmZvQml0cywgYml0cyk7XG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA8IGJlc3REaWZmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdEZvcm1hdEluZm8gPSBmb3JtYXRJbmZvO1xuICAgICAgICAgICAgICAgIGJlc3REaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBIYW1taW5nIGRpc3RhbmNlIG9mIHRoZSAzMiBtYXNrZWQgY29kZXMgaXMgNywgYnkgY29uc3RydWN0aW9uLCBzbyA8PSAzIGJpdHMgZGlmZmVyaW5nIG1lYW5zIHdlIGZvdW5kIGEgbWF0Y2hcbiAgICBpZiAoYmVzdERpZmZlcmVuY2UgPD0gMykge1xuICAgICAgICByZXR1cm4gYmVzdEZvcm1hdEluZm87XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0RGF0YUJsb2Nrcyhjb2Rld29yZHMsIHZlcnNpb24sIGVjTGV2ZWwpIHtcbiAgICB2YXIgZWNJbmZvID0gdmVyc2lvbi5lcnJvckNvcnJlY3Rpb25MZXZlbHNbZWNMZXZlbF07XG4gICAgdmFyIGRhdGFCbG9ja3MgPSBbXTtcbiAgICB2YXIgdG90YWxDb2Rld29yZHMgPSAwO1xuICAgIGVjSW5mby5lY0Jsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrLm51bUJsb2NrczsgaSsrKSB7XG4gICAgICAgICAgICBkYXRhQmxvY2tzLnB1c2goeyBudW1EYXRhQ29kZXdvcmRzOiBibG9jay5kYXRhQ29kZXdvcmRzUGVyQmxvY2ssIGNvZGV3b3JkczogW10gfSk7XG4gICAgICAgICAgICB0b3RhbENvZGV3b3JkcyArPSBibG9jay5kYXRhQ29kZXdvcmRzUGVyQmxvY2sgKyBlY0luZm8uZWNDb2Rld29yZHNQZXJCbG9jaztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEluIHNvbWUgY2FzZXMgdGhlIFFSIGNvZGUgd2lsbCBiZSBtYWxmb3JtZWQgZW5vdWdoIHRoYXQgd2UgcHVsbCBvZmYgbW9yZSBjb2Rld29yZHMgdGhhbiB3ZSBzaG91bGQgLSB0cnVuY2F0ZSB0aGF0IGNhc2VcbiAgICBjb2Rld29yZHMgPSBjb2Rld29yZHMuc2xpY2UoMCwgdG90YWxDb2Rld29yZHMpO1xuICAgIHZhciBzaG9ydEJsb2NrU2l6ZSA9IGVjSW5mby5lY0Jsb2Nrc1swXS5kYXRhQ29kZXdvcmRzUGVyQmxvY2s7XG4gICAgLy8gUHVsbCBjb2Rld29yZHMgdG8gZmlsbCB0aGUgYmxvY2tzIHVwIHRvIHRoZSBtaW5pbXVtIHNpemVcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNob3J0QmxvY2tTaXplOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBkYXRhQmxvY2tzXzEgPSBkYXRhQmxvY2tzOyBfaSA8IGRhdGFCbG9ja3NfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzXzFbX2ldO1xuICAgICAgICAgICAgZGF0YUJsb2NrLmNvZGV3b3Jkcy5wdXNoKGNvZGV3b3Jkcy5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGxhcmdlIGJsb2NrcywgcHVsbCBjb2Rld29yZHMgdG8gZmlsbCB0aGUgbGFzdCBlbGVtZW50IG9mIHRob3NlXG4gICAgaWYgKGVjSW5mby5lY0Jsb2Nrcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBzbWFsbEJsb2NrQ291bnQgPSBlY0luZm8uZWNCbG9ja3NbMF0ubnVtQmxvY2tzO1xuICAgICAgICB2YXIgbGFyZ2VCbG9ja0NvdW50ID0gZWNJbmZvLmVjQmxvY2tzWzFdLm51bUJsb2NrcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXJnZUJsb2NrQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgZGF0YUJsb2Nrc1tzbWFsbEJsb2NrQ291bnQgKyBpXS5jb2Rld29yZHMucHVzaChjb2Rld29yZHMuc2hpZnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkIHRoZSByZXN0IG9mIHRoZSBjb2Rld29yZHMgdG8gdGhlIGJsb2Nrcy4gVGhlc2UgYXJlIHRoZSBlcnJvciBjb3JyZWN0aW9uIGNvZGV3b3Jkcy5cbiAgICB3aGlsZSAoY29kZXdvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBkYXRhQmxvY2tzXzIgPSBkYXRhQmxvY2tzOyBfYSA8IGRhdGFCbG9ja3NfMi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzXzJbX2FdO1xuICAgICAgICAgICAgZGF0YUJsb2NrLmNvZGV3b3Jkcy5wdXNoKGNvZGV3b3Jkcy5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YUJsb2Nrcztcbn1cbmZ1bmN0aW9uIGRlY29kZU1hdHJpeChtYXRyaXgpIHtcbiAgICB2YXIgdmVyc2lvbiA9IHJlYWRWZXJzaW9uKG1hdHJpeCk7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0SW5mbyA9IHJlYWRGb3JtYXRJbmZvcm1hdGlvbihtYXRyaXgpO1xuICAgIGlmICghZm9ybWF0SW5mbykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGNvZGV3b3JkcyA9IHJlYWRDb2Rld29yZHMobWF0cml4LCB2ZXJzaW9uLCBmb3JtYXRJbmZvKTtcbiAgICB2YXIgZGF0YUJsb2NrcyA9IGdldERhdGFCbG9ja3MoY29kZXdvcmRzLCB2ZXJzaW9uLCBmb3JtYXRJbmZvLmVycm9yQ29ycmVjdGlvbkxldmVsKTtcbiAgICAvLyBDb3VudCB0b3RhbCBudW1iZXIgb2YgZGF0YSBieXRlc1xuICAgIHZhciB0b3RhbEJ5dGVzID0gZGF0YUJsb2Nrcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiLm51bURhdGFDb2Rld29yZHM7IH0sIDApO1xuICAgIHZhciByZXN1bHRCeXRlcyA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0b3RhbEJ5dGVzKTtcbiAgICB2YXIgcmVzdWx0SW5kZXggPSAwO1xuICAgIGZvciAodmFyIF9pID0gMCwgZGF0YUJsb2Nrc18zID0gZGF0YUJsb2NrczsgX2kgPCBkYXRhQmxvY2tzXzMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzXzNbX2ldO1xuICAgICAgICB2YXIgY29ycmVjdGVkQnl0ZXMgPSByZWVkc29sb21vbl8xLmRlY29kZShkYXRhQmxvY2suY29kZXdvcmRzLCBkYXRhQmxvY2suY29kZXdvcmRzLmxlbmd0aCAtIGRhdGFCbG9jay5udW1EYXRhQ29kZXdvcmRzKTtcbiAgICAgICAgaWYgKCFjb3JyZWN0ZWRCeXRlcykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQmxvY2subnVtRGF0YUNvZGV3b3JkczsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRCeXRlc1tyZXN1bHRJbmRleCsrXSA9IGNvcnJlY3RlZEJ5dGVzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVEYXRhXzEuZGVjb2RlKHJlc3VsdEJ5dGVzLCB2ZXJzaW9uLnZlcnNpb25OdW1iZXIpO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVjb2RlKG1hdHJpeCkge1xuICAgIGlmIChtYXRyaXggPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGRlY29kZU1hdHJpeChtYXRyaXgpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gRGVjb2RpbmcgZGlkbid0IHdvcmssIHRyeSBtaXJyb3JpbmcgdGhlIFFSIGFjcm9zcyB0aGUgdG9wTGVmdCAtPiBib3R0b21SaWdodCBsaW5lLlxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgbWF0cml4LndpZHRoOyB4KyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IHggKyAxOyB5IDwgbWF0cml4LmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBpZiAobWF0cml4LmdldCh4LCB5KSAhPT0gbWF0cml4LmdldCh5LCB4KSkge1xuICAgICAgICAgICAgICAgIG1hdHJpeC5zZXQoeCwgeSwgIW1hdHJpeC5nZXQoeCwgeSkpO1xuICAgICAgICAgICAgICAgIG1hdHJpeC5zZXQoeSwgeCwgIW1hdHJpeC5nZXQoeSwgeCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWNvZGVNYXRyaXgobWF0cml4KTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuXG5cbi8qKiovIH0pLFxuLyogNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZVxudmFyIEJpdFN0cmVhbV8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcbnZhciBzaGlmdEpJU1RhYmxlXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xudmFyIE1vZGU7XG4oZnVuY3Rpb24gKE1vZGUpIHtcbiAgICBNb2RlW1wiTnVtZXJpY1wiXSA9IFwibnVtZXJpY1wiO1xuICAgIE1vZGVbXCJBbHBoYW51bWVyaWNcIl0gPSBcImFscGhhbnVtZXJpY1wiO1xuICAgIE1vZGVbXCJCeXRlXCJdID0gXCJieXRlXCI7XG4gICAgTW9kZVtcIkthbmppXCJdID0gXCJrYW5qaVwiO1xufSkoTW9kZSA9IGV4cG9ydHMuTW9kZSB8fCAoZXhwb3J0cy5Nb2RlID0ge30pKTtcbnZhciBNb2RlQnl0ZTtcbihmdW5jdGlvbiAoTW9kZUJ5dGUpIHtcbiAgICBNb2RlQnl0ZVtNb2RlQnl0ZVtcIlRlcm1pbmF0b3JcIl0gPSAwXSA9IFwiVGVybWluYXRvclwiO1xuICAgIE1vZGVCeXRlW01vZGVCeXRlW1wiTnVtZXJpY1wiXSA9IDFdID0gXCJOdW1lcmljXCI7XG4gICAgTW9kZUJ5dGVbTW9kZUJ5dGVbXCJBbHBoYW51bWVyaWNcIl0gPSAyXSA9IFwiQWxwaGFudW1lcmljXCI7XG4gICAgTW9kZUJ5dGVbTW9kZUJ5dGVbXCJCeXRlXCJdID0gNF0gPSBcIkJ5dGVcIjtcbiAgICBNb2RlQnl0ZVtNb2RlQnl0ZVtcIkthbmppXCJdID0gOF0gPSBcIkthbmppXCI7XG4gICAgLy8gU3RydWN0dXJlZEFwcGVuZCA9IDB4MyxcbiAgICAvLyBFQ0kgPSAweDcsXG4gICAgLy8gRk5DMUZpcnN0UG9zaXRpb24gPSAweDUsXG4gICAgLy8gRk5DMVNlY29uZFBvc2l0aW9uID0gMHg5LFxufSkoTW9kZUJ5dGUgfHwgKE1vZGVCeXRlID0ge30pKTtcbmZ1bmN0aW9uIGRlY29kZU51bWVyaWMoc3RyZWFtLCBzaXplKSB7XG4gICAgdmFyIGJ5dGVzID0gW107XG4gICAgdmFyIHRleHQgPSBcIlwiO1xuICAgIHZhciBjaGFyYWN0ZXJDb3VudFNpemUgPSBbMTAsIDEyLCAxNF1bc2l6ZV07XG4gICAgdmFyIGxlbmd0aCA9IHN0cmVhbS5yZWFkQml0cyhjaGFyYWN0ZXJDb3VudFNpemUpO1xuICAgIC8vIFJlYWQgZGlnaXRzIGluIGdyb3VwcyBvZiAzXG4gICAgd2hpbGUgKGxlbmd0aCA+PSAzKSB7XG4gICAgICAgIHZhciBudW0gPSBzdHJlYW0ucmVhZEJpdHMoMTApO1xuICAgICAgICBpZiAobnVtID49IDEwMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbnVtZXJpYyB2YWx1ZSBhYm92ZSA5OTlcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGEgPSBNYXRoLmZsb29yKG51bSAvIDEwMCk7XG4gICAgICAgIHZhciBiID0gTWF0aC5mbG9vcihudW0gLyAxMCkgJSAxMDtcbiAgICAgICAgdmFyIGMgPSBudW0gJSAxMDtcbiAgICAgICAgYnl0ZXMucHVzaCg0OCArIGEsIDQ4ICsgYiwgNDggKyBjKTtcbiAgICAgICAgdGV4dCArPSBhLnRvU3RyaW5nKCkgKyBiLnRvU3RyaW5nKCkgKyBjLnRvU3RyaW5nKCk7XG4gICAgICAgIGxlbmd0aCAtPSAzO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBhcmVuJ3QgYSBtdWx0aXBsZSBvZiAzLCB0aGUgcmVtYWluaW5nIGRpZ2l0cyBhcmUgc3BlY2lhbCBjYXNlZC5cbiAgICBpZiAobGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHZhciBudW0gPSBzdHJlYW0ucmVhZEJpdHMoNyk7XG4gICAgICAgIGlmIChudW0gPj0gMTAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG51bWVyaWMgdmFsdWUgYWJvdmUgOTlcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGEgPSBNYXRoLmZsb29yKG51bSAvIDEwKTtcbiAgICAgICAgdmFyIGIgPSBudW0gJSAxMDtcbiAgICAgICAgYnl0ZXMucHVzaCg0OCArIGEsIDQ4ICsgYik7XG4gICAgICAgIHRleHQgKz0gYS50b1N0cmluZygpICsgYi50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIG51bSA9IHN0cmVhbS5yZWFkQml0cyg0KTtcbiAgICAgICAgaWYgKG51bSA+PSAxMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBudW1lcmljIHZhbHVlIGFib3ZlIDlcIik7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZXMucHVzaCg0OCArIG51bSk7XG4gICAgICAgIHRleHQgKz0gbnVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB7IGJ5dGVzOiBieXRlcywgdGV4dDogdGV4dCB9O1xufVxudmFyIEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzID0gW1xuICAgIFwiMFwiLCBcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsXG4gICAgXCI5XCIsIFwiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIixcbiAgICBcIklcIiwgXCJKXCIsIFwiS1wiLCBcIkxcIiwgXCJNXCIsIFwiTlwiLCBcIk9cIiwgXCJQXCIsIFwiUVwiLFxuICAgIFwiUlwiLCBcIlNcIiwgXCJUXCIsIFwiVVwiLCBcIlZcIiwgXCJXXCIsIFwiWFwiLCBcIllcIiwgXCJaXCIsXG4gICAgXCIgXCIsIFwiJFwiLCBcIiVcIiwgXCIqXCIsIFwiK1wiLCBcIi1cIiwgXCIuXCIsIFwiL1wiLCBcIjpcIixcbl07XG5mdW5jdGlvbiBkZWNvZGVBbHBoYW51bWVyaWMoc3RyZWFtLCBzaXplKSB7XG4gICAgdmFyIGJ5dGVzID0gW107XG4gICAgdmFyIHRleHQgPSBcIlwiO1xuICAgIHZhciBjaGFyYWN0ZXJDb3VudFNpemUgPSBbOSwgMTEsIDEzXVtzaXplXTtcbiAgICB2YXIgbGVuZ3RoID0gc3RyZWFtLnJlYWRCaXRzKGNoYXJhY3RlckNvdW50U2l6ZSk7XG4gICAgd2hpbGUgKGxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHZhciB2ID0gc3RyZWFtLnJlYWRCaXRzKDExKTtcbiAgICAgICAgdmFyIGEgPSBNYXRoLmZsb29yKHYgLyA0NSk7XG4gICAgICAgIHZhciBiID0gdiAlIDQ1O1xuICAgICAgICBieXRlcy5wdXNoKEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzW2FdLmNoYXJDb2RlQXQoMCksIEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzW2JdLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICB0ZXh0ICs9IEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzW2FdICsgQWxwaGFudW1lcmljQ2hhcmFjdGVyQ29kZXNbYl07XG4gICAgICAgIGxlbmd0aCAtPSAyO1xuICAgIH1cbiAgICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHZhciBhID0gc3RyZWFtLnJlYWRCaXRzKDYpO1xuICAgICAgICBieXRlcy5wdXNoKEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzW2FdLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICB0ZXh0ICs9IEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzW2FdO1xuICAgIH1cbiAgICByZXR1cm4geyBieXRlczogYnl0ZXMsIHRleHQ6IHRleHQgfTtcbn1cbmZ1bmN0aW9uIGRlY29kZUJ5dGUoc3RyZWFtLCBzaXplKSB7XG4gICAgdmFyIGJ5dGVzID0gW107XG4gICAgdmFyIHRleHQgPSBcIlwiO1xuICAgIHZhciBjaGFyYWN0ZXJDb3VudFNpemUgPSBbOCwgMTYsIDE2XVtzaXplXTtcbiAgICB2YXIgbGVuZ3RoID0gc3RyZWFtLnJlYWRCaXRzKGNoYXJhY3RlckNvdW50U2l6ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYiA9IHN0cmVhbS5yZWFkQml0cyg4KTtcbiAgICAgICAgYnl0ZXMucHVzaChiKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdGV4dCArPSBkZWNvZGVVUklDb21wb25lbnQoYnl0ZXMubWFwKGZ1bmN0aW9uIChiKSB7IHJldHVybiBcIiVcIiArIChcIjBcIiArIGIudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpOyB9KS5qb2luKFwiXCIpKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIC8vIGZhaWxlZCB0byBkZWNvZGVcbiAgICB9XG4gICAgcmV0dXJuIHsgYnl0ZXM6IGJ5dGVzLCB0ZXh0OiB0ZXh0IH07XG59XG5mdW5jdGlvbiBkZWNvZGVLYW5qaShzdHJlYW0sIHNpemUpIHtcbiAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgdmFyIGNoYXJhY3RlckNvdW50U2l6ZSA9IFs4LCAxMCwgMTJdW3NpemVdO1xuICAgIHZhciBsZW5ndGggPSBzdHJlYW0ucmVhZEJpdHMoY2hhcmFjdGVyQ291bnRTaXplKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrID0gc3RyZWFtLnJlYWRCaXRzKDEzKTtcbiAgICAgICAgdmFyIGMgPSAoTWF0aC5mbG9vcihrIC8gMHhDMCkgPDwgOCkgfCAoayAlIDB4QzApO1xuICAgICAgICBpZiAoYyA8IDB4MUYwMCkge1xuICAgICAgICAgICAgYyArPSAweDgxNDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjICs9IDB4QzE0MDtcbiAgICAgICAgfVxuICAgICAgICBieXRlcy5wdXNoKGMgPj4gOCwgYyAmIDB4RkYpO1xuICAgICAgICB0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoc2hpZnRKSVNUYWJsZV8xLnNoaWZ0SklTVGFibGVbY10pO1xuICAgIH1cbiAgICByZXR1cm4geyBieXRlczogYnl0ZXMsIHRleHQ6IHRleHQgfTtcbn1cbmZ1bmN0aW9uIGRlY29kZShkYXRhLCB2ZXJzaW9uKSB7XG4gICAgdmFyIHN0cmVhbSA9IG5ldyBCaXRTdHJlYW1fMS5CaXRTdHJlYW0oZGF0YSk7XG4gICAgLy8gVGhlcmUgYXJlIDMgJ3NpemVzJyBiYXNlZCBvbiB0aGUgdmVyc2lvbi4gMS05IGlzIHNtYWxsICgwKSwgMTAtMjYgaXMgbWVkaXVtICgxKSBhbmQgMjctNDAgaXMgbGFyZ2UgKDIpLlxuICAgIHZhciBzaXplID0gdmVyc2lvbiA8PSA5ID8gMCA6IHZlcnNpb24gPD0gMjYgPyAxIDogMjtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICBieXRlczogW10sXG4gICAgICAgIGNodW5rczogW10sXG4gICAgfTtcbiAgICB3aGlsZSAoc3RyZWFtLmF2YWlsYWJsZSgpID49IDQpIHtcbiAgICAgICAgdmFyIG1vZGUgPSBzdHJlYW0ucmVhZEJpdHMoNCk7XG4gICAgICAgIGlmIChtb2RlID09PSBNb2RlQnl0ZS5UZXJtaW5hdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT09IE1vZGVCeXRlLk51bWVyaWMpIHtcbiAgICAgICAgICAgIHZhciBudW1lcmljUmVzdWx0ID0gZGVjb2RlTnVtZXJpYyhzdHJlYW0sIHNpemUpO1xuICAgICAgICAgICAgcmVzdWx0LnRleHQgKz0gbnVtZXJpY1Jlc3VsdC50ZXh0O1xuICAgICAgICAgICAgKF9hID0gcmVzdWx0LmJ5dGVzKS5wdXNoLmFwcGx5KF9hLCBudW1lcmljUmVzdWx0LmJ5dGVzKTtcbiAgICAgICAgICAgIHJlc3VsdC5jaHVua3MucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTW9kZS5OdW1lcmljLFxuICAgICAgICAgICAgICAgIHRleHQ6IG51bWVyaWNSZXN1bHQudGV4dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT09IE1vZGVCeXRlLkFscGhhbnVtZXJpYykge1xuICAgICAgICAgICAgdmFyIGFscGhhbnVtZXJpY1Jlc3VsdCA9IGRlY29kZUFscGhhbnVtZXJpYyhzdHJlYW0sIHNpemUpO1xuICAgICAgICAgICAgcmVzdWx0LnRleHQgKz0gYWxwaGFudW1lcmljUmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAoX2IgPSByZXN1bHQuYnl0ZXMpLnB1c2guYXBwbHkoX2IsIGFscGhhbnVtZXJpY1Jlc3VsdC5ieXRlcyk7XG4gICAgICAgICAgICByZXN1bHQuY2h1bmtzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IE1vZGUuQWxwaGFudW1lcmljLFxuICAgICAgICAgICAgICAgIHRleHQ6IGFscGhhbnVtZXJpY1Jlc3VsdC50ZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gTW9kZUJ5dGUuQnl0ZSkge1xuICAgICAgICAgICAgdmFyIGJ5dGVSZXN1bHQgPSBkZWNvZGVCeXRlKHN0cmVhbSwgc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCArPSBieXRlUmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAoX2MgPSByZXN1bHQuYnl0ZXMpLnB1c2guYXBwbHkoX2MsIGJ5dGVSZXN1bHQuYnl0ZXMpO1xuICAgICAgICAgICAgcmVzdWx0LmNodW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBNb2RlLkJ5dGUsXG4gICAgICAgICAgICAgICAgYnl0ZXM6IGJ5dGVSZXN1bHQuYnl0ZXMsXG4gICAgICAgICAgICAgICAgdGV4dDogYnl0ZVJlc3VsdC50ZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gTW9kZUJ5dGUuS2FuamkpIHtcbiAgICAgICAgICAgIHZhciBrYW5qaVJlc3VsdCA9IGRlY29kZUthbmppKHN0cmVhbSwgc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCArPSBrYW5qaVJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgKF9kID0gcmVzdWx0LmJ5dGVzKS5wdXNoLmFwcGx5KF9kLCBrYW5qaVJlc3VsdC5ieXRlcyk7XG4gICAgICAgICAgICByZXN1bHQuY2h1bmtzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IE1vZGUuS2FuamksXG4gICAgICAgICAgICAgICAgYnl0ZXM6IGthbmppUmVzdWx0LmJ5dGVzLFxuICAgICAgICAgICAgICAgIHRleHQ6IGthbmppUmVzdWx0LnRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG59XG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcblxuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWJpdHdpc2Vcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaXRTdHJlYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQml0U3RyZWFtKGJ5dGVzKSB7XG4gICAgICAgIHRoaXMuYnl0ZU9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuYml0T2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xuICAgIH1cbiAgICBCaXRTdHJlYW0ucHJvdG90eXBlLnJlYWRCaXRzID0gZnVuY3Rpb24gKG51bUJpdHMpIHtcbiAgICAgICAgaWYgKG51bUJpdHMgPCAxIHx8IG51bUJpdHMgPiAzMiB8fCBudW1CaXRzID4gdGhpcy5hdmFpbGFibGUoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHJlYWQgXCIgKyBudW1CaXRzLnRvU3RyaW5nKCkgKyBcIiBiaXRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICAvLyBGaXJzdCwgcmVhZCByZW1haW5kZXIgZnJvbSBjdXJyZW50IGJ5dGVcbiAgICAgICAgaWYgKHRoaXMuYml0T2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgdmFyIGJpdHNMZWZ0ID0gOCAtIHRoaXMuYml0T2Zmc2V0O1xuICAgICAgICAgICAgdmFyIHRvUmVhZCA9IG51bUJpdHMgPCBiaXRzTGVmdCA/IG51bUJpdHMgOiBiaXRzTGVmdDtcbiAgICAgICAgICAgIHZhciBiaXRzVG9Ob3RSZWFkID0gYml0c0xlZnQgLSB0b1JlYWQ7XG4gICAgICAgICAgICB2YXIgbWFzayA9ICgweEZGID4+ICg4IC0gdG9SZWFkKSkgPDwgYml0c1RvTm90UmVhZDtcbiAgICAgICAgICAgIHJlc3VsdCA9ICh0aGlzLmJ5dGVzW3RoaXMuYnl0ZU9mZnNldF0gJiBtYXNrKSA+PiBiaXRzVG9Ob3RSZWFkO1xuICAgICAgICAgICAgbnVtQml0cyAtPSB0b1JlYWQ7XG4gICAgICAgICAgICB0aGlzLmJpdE9mZnNldCArPSB0b1JlYWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5iaXRPZmZzZXQgPT09IDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpdE9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlT2Zmc2V0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTmV4dCByZWFkIHdob2xlIGJ5dGVzXG4gICAgICAgIGlmIChudW1CaXRzID4gMCkge1xuICAgICAgICAgICAgd2hpbGUgKG51bUJpdHMgPj0gOCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IChyZXN1bHQgPDwgOCkgfCAodGhpcy5ieXRlc1t0aGlzLmJ5dGVPZmZzZXRdICYgMHhGRik7XG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlT2Zmc2V0Kys7XG4gICAgICAgICAgICAgICAgbnVtQml0cyAtPSA4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmluYWxseSByZWFkIGEgcGFydGlhbCBieXRlXG4gICAgICAgICAgICBpZiAobnVtQml0cyA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgYml0c1RvTm90UmVhZCA9IDggLSBudW1CaXRzO1xuICAgICAgICAgICAgICAgIHZhciBtYXNrID0gKDB4RkYgPj4gYml0c1RvTm90UmVhZCkgPDwgYml0c1RvTm90UmVhZDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0IDw8IG51bUJpdHMpIHwgKCh0aGlzLmJ5dGVzW3RoaXMuYnl0ZU9mZnNldF0gJiBtYXNrKSA+PiBiaXRzVG9Ob3RSZWFkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpdE9mZnNldCArPSBudW1CaXRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBCaXRTdHJlYW0ucHJvdG90eXBlLmF2YWlsYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDggKiAodGhpcy5ieXRlcy5sZW5ndGggLSB0aGlzLmJ5dGVPZmZzZXQpIC0gdGhpcy5iaXRPZmZzZXQ7XG4gICAgfTtcbiAgICByZXR1cm4gQml0U3RyZWFtO1xufSgpKTtcbmV4cG9ydHMuQml0U3RyZWFtID0gQml0U3RyZWFtO1xuXG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaGlmdEpJU1RhYmxlID0ge1xuICAgIDB4MjA6IDB4MDAyMCxcbiAgICAweDIxOiAweDAwMjEsXG4gICAgMHgyMjogMHgwMDIyLFxuICAgIDB4MjM6IDB4MDAyMyxcbiAgICAweDI0OiAweDAwMjQsXG4gICAgMHgyNTogMHgwMDI1LFxuICAgIDB4MjY6IDB4MDAyNixcbiAgICAweDI3OiAweDAwMjcsXG4gICAgMHgyODogMHgwMDI4LFxuICAgIDB4Mjk6IDB4MDAyOSxcbiAgICAweDJBOiAweDAwMkEsXG4gICAgMHgyQjogMHgwMDJCLFxuICAgIDB4MkM6IDB4MDAyQyxcbiAgICAweDJEOiAweDAwMkQsXG4gICAgMHgyRTogMHgwMDJFLFxuICAgIDB4MkY6IDB4MDAyRixcbiAgICAweDMwOiAweDAwMzAsXG4gICAgMHgzMTogMHgwMDMxLFxuICAgIDB4MzI6IDB4MDAzMixcbiAgICAweDMzOiAweDAwMzMsXG4gICAgMHgzNDogMHgwMDM0LFxuICAgIDB4MzU6IDB4MDAzNSxcbiAgICAweDM2OiAweDAwMzYsXG4gICAgMHgzNzogMHgwMDM3LFxuICAgIDB4Mzg6IDB4MDAzOCxcbiAgICAweDM5OiAweDAwMzksXG4gICAgMHgzQTogMHgwMDNBLFxuICAgIDB4M0I6IDB4MDAzQixcbiAgICAweDNDOiAweDAwM0MsXG4gICAgMHgzRDogMHgwMDNELFxuICAgIDB4M0U6IDB4MDAzRSxcbiAgICAweDNGOiAweDAwM0YsXG4gICAgMHg0MDogMHgwMDQwLFxuICAgIDB4NDE6IDB4MDA0MSxcbiAgICAweDQyOiAweDAwNDIsXG4gICAgMHg0MzogMHgwMDQzLFxuICAgIDB4NDQ6IDB4MDA0NCxcbiAgICAweDQ1OiAweDAwNDUsXG4gICAgMHg0NjogMHgwMDQ2LFxuICAgIDB4NDc6IDB4MDA0NyxcbiAgICAweDQ4OiAweDAwNDgsXG4gICAgMHg0OTogMHgwMDQ5LFxuICAgIDB4NEE6IDB4MDA0QSxcbiAgICAweDRCOiAweDAwNEIsXG4gICAgMHg0QzogMHgwMDRDLFxuICAgIDB4NEQ6IDB4MDA0RCxcbiAgICAweDRFOiAweDAwNEUsXG4gICAgMHg0RjogMHgwMDRGLFxuICAgIDB4NTA6IDB4MDA1MCxcbiAgICAweDUxOiAweDAwNTEsXG4gICAgMHg1MjogMHgwMDUyLFxuICAgIDB4NTM6IDB4MDA1MyxcbiAgICAweDU0OiAweDAwNTQsXG4gICAgMHg1NTogMHgwMDU1LFxuICAgIDB4NTY6IDB4MDA1NixcbiAgICAweDU3OiAweDAwNTcsXG4gICAgMHg1ODogMHgwMDU4LFxuICAgIDB4NTk6IDB4MDA1OSxcbiAgICAweDVBOiAweDAwNUEsXG4gICAgMHg1QjogMHgwMDVCLFxuICAgIDB4NUM6IDB4MDBBNSxcbiAgICAweDVEOiAweDAwNUQsXG4gICAgMHg1RTogMHgwMDVFLFxuICAgIDB4NUY6IDB4MDA1RixcbiAgICAweDYwOiAweDAwNjAsXG4gICAgMHg2MTogMHgwMDYxLFxuICAgIDB4NjI6IDB4MDA2MixcbiAgICAweDYzOiAweDAwNjMsXG4gICAgMHg2NDogMHgwMDY0LFxuICAgIDB4NjU6IDB4MDA2NSxcbiAgICAweDY2OiAweDAwNjYsXG4gICAgMHg2NzogMHgwMDY3LFxuICAgIDB4Njg6IDB4MDA2OCxcbiAgICAweDY5OiAweDAwNjksXG4gICAgMHg2QTogMHgwMDZBLFxuICAgIDB4NkI6IDB4MDA2QixcbiAgICAweDZDOiAweDAwNkMsXG4gICAgMHg2RDogMHgwMDZELFxuICAgIDB4NkU6IDB4MDA2RSxcbiAgICAweDZGOiAweDAwNkYsXG4gICAgMHg3MDogMHgwMDcwLFxuICAgIDB4NzE6IDB4MDA3MSxcbiAgICAweDcyOiAweDAwNzIsXG4gICAgMHg3MzogMHgwMDczLFxuICAgIDB4NzQ6IDB4MDA3NCxcbiAgICAweDc1OiAweDAwNzUsXG4gICAgMHg3NjogMHgwMDc2LFxuICAgIDB4Nzc6IDB4MDA3NyxcbiAgICAweDc4OiAweDAwNzgsXG4gICAgMHg3OTogMHgwMDc5LFxuICAgIDB4N0E6IDB4MDA3QSxcbiAgICAweDdCOiAweDAwN0IsXG4gICAgMHg3QzogMHgwMDdDLFxuICAgIDB4N0Q6IDB4MDA3RCxcbiAgICAweDdFOiAweDIwM0UsXG4gICAgMHg4MTQwOiAweDMwMDAsXG4gICAgMHg4MTQxOiAweDMwMDEsXG4gICAgMHg4MTQyOiAweDMwMDIsXG4gICAgMHg4MTQzOiAweEZGMEMsXG4gICAgMHg4MTQ0OiAweEZGMEUsXG4gICAgMHg4MTQ1OiAweDMwRkIsXG4gICAgMHg4MTQ2OiAweEZGMUEsXG4gICAgMHg4MTQ3OiAweEZGMUIsXG4gICAgMHg4MTQ4OiAweEZGMUYsXG4gICAgMHg4MTQ5OiAweEZGMDEsXG4gICAgMHg4MTRBOiAweDMwOUIsXG4gICAgMHg4MTRCOiAweDMwOUMsXG4gICAgMHg4MTRDOiAweDAwQjQsXG4gICAgMHg4MTREOiAweEZGNDAsXG4gICAgMHg4MTRFOiAweDAwQTgsXG4gICAgMHg4MTRGOiAweEZGM0UsXG4gICAgMHg4MTUwOiAweEZGRTMsXG4gICAgMHg4MTUxOiAweEZGM0YsXG4gICAgMHg4MTUyOiAweDMwRkQsXG4gICAgMHg4MTUzOiAweDMwRkUsXG4gICAgMHg4MTU0OiAweDMwOUQsXG4gICAgMHg4MTU1OiAweDMwOUUsXG4gICAgMHg4MTU2OiAweDMwMDMsXG4gICAgMHg4MTU3OiAweDRFREQsXG4gICAgMHg4MTU4OiAweDMwMDUsXG4gICAgMHg4MTU5OiAweDMwMDYsXG4gICAgMHg4MTVBOiAweDMwMDcsXG4gICAgMHg4MTVCOiAweDMwRkMsXG4gICAgMHg4MTVDOiAweDIwMTUsXG4gICAgMHg4MTVEOiAweDIwMTAsXG4gICAgMHg4MTVFOiAweEZGMEYsXG4gICAgMHg4MTVGOiAweDAwNUMsXG4gICAgMHg4MTYwOiAweDMwMUMsXG4gICAgMHg4MTYxOiAweDIwMTYsXG4gICAgMHg4MTYyOiAweEZGNUMsXG4gICAgMHg4MTYzOiAweDIwMjYsXG4gICAgMHg4MTY0OiAweDIwMjUsXG4gICAgMHg4MTY1OiAweDIwMTgsXG4gICAgMHg4MTY2OiAweDIwMTksXG4gICAgMHg4MTY3OiAweDIwMUMsXG4gICAgMHg4MTY4OiAweDIwMUQsXG4gICAgMHg4MTY5OiAweEZGMDgsXG4gICAgMHg4MTZBOiAweEZGMDksXG4gICAgMHg4MTZCOiAweDMwMTQsXG4gICAgMHg4MTZDOiAweDMwMTUsXG4gICAgMHg4MTZEOiAweEZGM0IsXG4gICAgMHg4MTZFOiAweEZGM0QsXG4gICAgMHg4MTZGOiAweEZGNUIsXG4gICAgMHg4MTcwOiAweEZGNUQsXG4gICAgMHg4MTcxOiAweDMwMDgsXG4gICAgMHg4MTcyOiAweDMwMDksXG4gICAgMHg4MTczOiAweDMwMEEsXG4gICAgMHg4MTc0OiAweDMwMEIsXG4gICAgMHg4MTc1OiAweDMwMEMsXG4gICAgMHg4MTc2OiAweDMwMEQsXG4gICAgMHg4MTc3OiAweDMwMEUsXG4gICAgMHg4MTc4OiAweDMwMEYsXG4gICAgMHg4MTc5OiAweDMwMTAsXG4gICAgMHg4MTdBOiAweDMwMTEsXG4gICAgMHg4MTdCOiAweEZGMEIsXG4gICAgMHg4MTdDOiAweDIyMTIsXG4gICAgMHg4MTdEOiAweDAwQjEsXG4gICAgMHg4MTdFOiAweDAwRDcsXG4gICAgMHg4MTgwOiAweDAwRjcsXG4gICAgMHg4MTgxOiAweEZGMUQsXG4gICAgMHg4MTgyOiAweDIyNjAsXG4gICAgMHg4MTgzOiAweEZGMUMsXG4gICAgMHg4MTg0OiAweEZGMUUsXG4gICAgMHg4MTg1OiAweDIyNjYsXG4gICAgMHg4MTg2OiAweDIyNjcsXG4gICAgMHg4MTg3OiAweDIyMUUsXG4gICAgMHg4MTg4OiAweDIyMzQsXG4gICAgMHg4MTg5OiAweDI2NDIsXG4gICAgMHg4MThBOiAweDI2NDAsXG4gICAgMHg4MThCOiAweDAwQjAsXG4gICAgMHg4MThDOiAweDIwMzIsXG4gICAgMHg4MThEOiAweDIwMzMsXG4gICAgMHg4MThFOiAweDIxMDMsXG4gICAgMHg4MThGOiAweEZGRTUsXG4gICAgMHg4MTkwOiAweEZGMDQsXG4gICAgMHg4MTkxOiAweDAwQTIsXG4gICAgMHg4MTkyOiAweDAwQTMsXG4gICAgMHg4MTkzOiAweEZGMDUsXG4gICAgMHg4MTk0OiAweEZGMDMsXG4gICAgMHg4MTk1OiAweEZGMDYsXG4gICAgMHg4MTk2OiAweEZGMEEsXG4gICAgMHg4MTk3OiAweEZGMjAsXG4gICAgMHg4MTk4OiAweDAwQTcsXG4gICAgMHg4MTk5OiAweDI2MDYsXG4gICAgMHg4MTlBOiAweDI2MDUsXG4gICAgMHg4MTlCOiAweDI1Q0IsXG4gICAgMHg4MTlDOiAweDI1Q0YsXG4gICAgMHg4MTlEOiAweDI1Q0UsXG4gICAgMHg4MTlFOiAweDI1QzcsXG4gICAgMHg4MTlGOiAweDI1QzYsXG4gICAgMHg4MUEwOiAweDI1QTEsXG4gICAgMHg4MUExOiAweDI1QTAsXG4gICAgMHg4MUEyOiAweDI1QjMsXG4gICAgMHg4MUEzOiAweDI1QjIsXG4gICAgMHg4MUE0OiAweDI1QkQsXG4gICAgMHg4MUE1OiAweDI1QkMsXG4gICAgMHg4MUE2OiAweDIwM0IsXG4gICAgMHg4MUE3OiAweDMwMTIsXG4gICAgMHg4MUE4OiAweDIxOTIsXG4gICAgMHg4MUE5OiAweDIxOTAsXG4gICAgMHg4MUFBOiAweDIxOTEsXG4gICAgMHg4MUFCOiAweDIxOTMsXG4gICAgMHg4MUFDOiAweDMwMTMsXG4gICAgMHg4MUI4OiAweDIyMDgsXG4gICAgMHg4MUI5OiAweDIyMEIsXG4gICAgMHg4MUJBOiAweDIyODYsXG4gICAgMHg4MUJCOiAweDIyODcsXG4gICAgMHg4MUJDOiAweDIyODIsXG4gICAgMHg4MUJEOiAweDIyODMsXG4gICAgMHg4MUJFOiAweDIyMkEsXG4gICAgMHg4MUJGOiAweDIyMjksXG4gICAgMHg4MUM4OiAweDIyMjcsXG4gICAgMHg4MUM5OiAweDIyMjgsXG4gICAgMHg4MUNBOiAweDAwQUMsXG4gICAgMHg4MUNCOiAweDIxRDIsXG4gICAgMHg4MUNDOiAweDIxRDQsXG4gICAgMHg4MUNEOiAweDIyMDAsXG4gICAgMHg4MUNFOiAweDIyMDMsXG4gICAgMHg4MURBOiAweDIyMjAsXG4gICAgMHg4MURCOiAweDIyQTUsXG4gICAgMHg4MURDOiAweDIzMTIsXG4gICAgMHg4MUREOiAweDIyMDIsXG4gICAgMHg4MURFOiAweDIyMDcsXG4gICAgMHg4MURGOiAweDIyNjEsXG4gICAgMHg4MUUwOiAweDIyNTIsXG4gICAgMHg4MUUxOiAweDIyNkEsXG4gICAgMHg4MUUyOiAweDIyNkIsXG4gICAgMHg4MUUzOiAweDIyMUEsXG4gICAgMHg4MUU0OiAweDIyM0QsXG4gICAgMHg4MUU1OiAweDIyMUQsXG4gICAgMHg4MUU2OiAweDIyMzUsXG4gICAgMHg4MUU3OiAweDIyMkIsXG4gICAgMHg4MUU4OiAweDIyMkMsXG4gICAgMHg4MUYwOiAweDIxMkIsXG4gICAgMHg4MUYxOiAweDIwMzAsXG4gICAgMHg4MUYyOiAweDI2NkYsXG4gICAgMHg4MUYzOiAweDI2NkQsXG4gICAgMHg4MUY0OiAweDI2NkEsXG4gICAgMHg4MUY1OiAweDIwMjAsXG4gICAgMHg4MUY2OiAweDIwMjEsXG4gICAgMHg4MUY3OiAweDAwQjYsXG4gICAgMHg4MUZDOiAweDI1RUYsXG4gICAgMHg4MjRGOiAweEZGMTAsXG4gICAgMHg4MjUwOiAweEZGMTEsXG4gICAgMHg4MjUxOiAweEZGMTIsXG4gICAgMHg4MjUyOiAweEZGMTMsXG4gICAgMHg4MjUzOiAweEZGMTQsXG4gICAgMHg4MjU0OiAweEZGMTUsXG4gICAgMHg4MjU1OiAweEZGMTYsXG4gICAgMHg4MjU2OiAweEZGMTcsXG4gICAgMHg4MjU3OiAweEZGMTgsXG4gICAgMHg4MjU4OiAweEZGMTksXG4gICAgMHg4MjYwOiAweEZGMjEsXG4gICAgMHg4MjYxOiAweEZGMjIsXG4gICAgMHg4MjYyOiAweEZGMjMsXG4gICAgMHg4MjYzOiAweEZGMjQsXG4gICAgMHg4MjY0OiAweEZGMjUsXG4gICAgMHg4MjY1OiAweEZGMjYsXG4gICAgMHg4MjY2OiAweEZGMjcsXG4gICAgMHg4MjY3OiAweEZGMjgsXG4gICAgMHg4MjY4OiAweEZGMjksXG4gICAgMHg4MjY5OiAweEZGMkEsXG4gICAgMHg4MjZBOiAweEZGMkIsXG4gICAgMHg4MjZCOiAweEZGMkMsXG4gICAgMHg4MjZDOiAweEZGMkQsXG4gICAgMHg4MjZEOiAweEZGMkUsXG4gICAgMHg4MjZFOiAweEZGMkYsXG4gICAgMHg4MjZGOiAweEZGMzAsXG4gICAgMHg4MjcwOiAweEZGMzEsXG4gICAgMHg4MjcxOiAweEZGMzIsXG4gICAgMHg4MjcyOiAweEZGMzMsXG4gICAgMHg4MjczOiAweEZGMzQsXG4gICAgMHg4Mjc0OiAweEZGMzUsXG4gICAgMHg4Mjc1OiAweEZGMzYsXG4gICAgMHg4Mjc2OiAweEZGMzcsXG4gICAgMHg4Mjc3OiAweEZGMzgsXG4gICAgMHg4Mjc4OiAweEZGMzksXG4gICAgMHg4Mjc5OiAweEZGM0EsXG4gICAgMHg4MjgxOiAweEZGNDEsXG4gICAgMHg4MjgyOiAweEZGNDIsXG4gICAgMHg4MjgzOiAweEZGNDMsXG4gICAgMHg4Mjg0OiAweEZGNDQsXG4gICAgMHg4Mjg1OiAweEZGNDUsXG4gICAgMHg4Mjg2OiAweEZGNDYsXG4gICAgMHg4Mjg3OiAweEZGNDcsXG4gICAgMHg4Mjg4OiAweEZGNDgsXG4gICAgMHg4Mjg5OiAweEZGNDksXG4gICAgMHg4MjhBOiAweEZGNEEsXG4gICAgMHg4MjhCOiAweEZGNEIsXG4gICAgMHg4MjhDOiAweEZGNEMsXG4gICAgMHg4MjhEOiAweEZGNEQsXG4gICAgMHg4MjhFOiAweEZGNEUsXG4gICAgMHg4MjhGOiAweEZGNEYsXG4gICAgMHg4MjkwOiAweEZGNTAsXG4gICAgMHg4MjkxOiAweEZGNTEsXG4gICAgMHg4MjkyOiAweEZGNTIsXG4gICAgMHg4MjkzOiAweEZGNTMsXG4gICAgMHg4Mjk0OiAweEZGNTQsXG4gICAgMHg4Mjk1OiAweEZGNTUsXG4gICAgMHg4Mjk2OiAweEZGNTYsXG4gICAgMHg4Mjk3OiAweEZGNTcsXG4gICAgMHg4Mjk4OiAweEZGNTgsXG4gICAgMHg4Mjk5OiAweEZGNTksXG4gICAgMHg4MjlBOiAweEZGNUEsXG4gICAgMHg4MjlGOiAweDMwNDEsXG4gICAgMHg4MkEwOiAweDMwNDIsXG4gICAgMHg4MkExOiAweDMwNDMsXG4gICAgMHg4MkEyOiAweDMwNDQsXG4gICAgMHg4MkEzOiAweDMwNDUsXG4gICAgMHg4MkE0OiAweDMwNDYsXG4gICAgMHg4MkE1OiAweDMwNDcsXG4gICAgMHg4MkE2OiAweDMwNDgsXG4gICAgMHg4MkE3OiAweDMwNDksXG4gICAgMHg4MkE4OiAweDMwNEEsXG4gICAgMHg4MkE5OiAweDMwNEIsXG4gICAgMHg4MkFBOiAweDMwNEMsXG4gICAgMHg4MkFCOiAweDMwNEQsXG4gICAgMHg4MkFDOiAweDMwNEUsXG4gICAgMHg4MkFEOiAweDMwNEYsXG4gICAgMHg4MkFFOiAweDMwNTAsXG4gICAgMHg4MkFGOiAweDMwNTEsXG4gICAgMHg4MkIwOiAweDMwNTIsXG4gICAgMHg4MkIxOiAweDMwNTMsXG4gICAgMHg4MkIyOiAweDMwNTQsXG4gICAgMHg4MkIzOiAweDMwNTUsXG4gICAgMHg4MkI0OiAweDMwNTYsXG4gICAgMHg4MkI1OiAweDMwNTcsXG4gICAgMHg4MkI2OiAweDMwNTgsXG4gICAgMHg4MkI3OiAweDMwNTksXG4gICAgMHg4MkI4OiAweDMwNUEsXG4gICAgMHg4MkI5OiAweDMwNUIsXG4gICAgMHg4MkJBOiAweDMwNUMsXG4gICAgMHg4MkJCOiAweDMwNUQsXG4gICAgMHg4MkJDOiAweDMwNUUsXG4gICAgMHg4MkJEOiAweDMwNUYsXG4gICAgMHg4MkJFOiAweDMwNjAsXG4gICAgMHg4MkJGOiAweDMwNjEsXG4gICAgMHg4MkMwOiAweDMwNjIsXG4gICAgMHg4MkMxOiAweDMwNjMsXG4gICAgMHg4MkMyOiAweDMwNjQsXG4gICAgMHg4MkMzOiAweDMwNjUsXG4gICAgMHg4MkM0OiAweDMwNjYsXG4gICAgMHg4MkM1OiAweDMwNjcsXG4gICAgMHg4MkM2OiAweDMwNjgsXG4gICAgMHg4MkM3OiAweDMwNjksXG4gICAgMHg4MkM4OiAweDMwNkEsXG4gICAgMHg4MkM5OiAweDMwNkIsXG4gICAgMHg4MkNBOiAweDMwNkMsXG4gICAgMHg4MkNCOiAweDMwNkQsXG4gICAgMHg4MkNDOiAweDMwNkUsXG4gICAgMHg4MkNEOiAweDMwNkYsXG4gICAgMHg4MkNFOiAweDMwNzAsXG4gICAgMHg4MkNGOiAweDMwNzEsXG4gICAgMHg4MkQwOiAweDMwNzIsXG4gICAgMHg4MkQxOiAweDMwNzMsXG4gICAgMHg4MkQyOiAweDMwNzQsXG4gICAgMHg4MkQzOiAweDMwNzUsXG4gICAgMHg4MkQ0OiAweDMwNzYsXG4gICAgMHg4MkQ1OiAweDMwNzcsXG4gICAgMHg4MkQ2OiAweDMwNzgsXG4gICAgMHg4MkQ3OiAweDMwNzksXG4gICAgMHg4MkQ4OiAweDMwN0EsXG4gICAgMHg4MkQ5OiAweDMwN0IsXG4gICAgMHg4MkRBOiAweDMwN0MsXG4gICAgMHg4MkRCOiAweDMwN0QsXG4gICAgMHg4MkRDOiAweDMwN0UsXG4gICAgMHg4MkREOiAweDMwN0YsXG4gICAgMHg4MkRFOiAweDMwODAsXG4gICAgMHg4MkRGOiAweDMwODEsXG4gICAgMHg4MkUwOiAweDMwODIsXG4gICAgMHg4MkUxOiAweDMwODMsXG4gICAgMHg4MkUyOiAweDMwODQsXG4gICAgMHg4MkUzOiAweDMwODUsXG4gICAgMHg4MkU0OiAweDMwODYsXG4gICAgMHg4MkU1OiAweDMwODcsXG4gICAgMHg4MkU2OiAweDMwODgsXG4gICAgMHg4MkU3OiAweDMwODksXG4gICAgMHg4MkU4OiAweDMwOEEsXG4gICAgMHg4MkU5OiAweDMwOEIsXG4gICAgMHg4MkVBOiAweDMwOEMsXG4gICAgMHg4MkVCOiAweDMwOEQsXG4gICAgMHg4MkVDOiAweDMwOEUsXG4gICAgMHg4MkVEOiAweDMwOEYsXG4gICAgMHg4MkVFOiAweDMwOTAsXG4gICAgMHg4MkVGOiAweDMwOTEsXG4gICAgMHg4MkYwOiAweDMwOTIsXG4gICAgMHg4MkYxOiAweDMwOTMsXG4gICAgMHg4MzQwOiAweDMwQTEsXG4gICAgMHg4MzQxOiAweDMwQTIsXG4gICAgMHg4MzQyOiAweDMwQTMsXG4gICAgMHg4MzQzOiAweDMwQTQsXG4gICAgMHg4MzQ0OiAweDMwQTUsXG4gICAgMHg4MzQ1OiAweDMwQTYsXG4gICAgMHg4MzQ2OiAweDMwQTcsXG4gICAgMHg4MzQ3OiAweDMwQTgsXG4gICAgMHg4MzQ4OiAweDMwQTksXG4gICAgMHg4MzQ5OiAweDMwQUEsXG4gICAgMHg4MzRBOiAweDMwQUIsXG4gICAgMHg4MzRCOiAweDMwQUMsXG4gICAgMHg4MzRDOiAweDMwQUQsXG4gICAgMHg4MzREOiAweDMwQUUsXG4gICAgMHg4MzRFOiAweDMwQUYsXG4gICAgMHg4MzRGOiAweDMwQjAsXG4gICAgMHg4MzUwOiAweDMwQjEsXG4gICAgMHg4MzUxOiAweDMwQjIsXG4gICAgMHg4MzUyOiAweDMwQjMsXG4gICAgMHg4MzUzOiAweDMwQjQsXG4gICAgMHg4MzU0OiAweDMwQjUsXG4gICAgMHg4MzU1OiAweDMwQjYsXG4gICAgMHg4MzU2OiAweDMwQjcsXG4gICAgMHg4MzU3OiAweDMwQjgsXG4gICAgMHg4MzU4OiAweDMwQjksXG4gICAgMHg4MzU5OiAweDMwQkEsXG4gICAgMHg4MzVBOiAweDMwQkIsXG4gICAgMHg4MzVCOiAweDMwQkMsXG4gICAgMHg4MzVDOiAweDMwQkQsXG4gICAgMHg4MzVEOiAweDMwQkUsXG4gICAgMHg4MzVFOiAweDMwQkYsXG4gICAgMHg4MzVGOiAweDMwQzAsXG4gICAgMHg4MzYwOiAweDMwQzEsXG4gICAgMHg4MzYxOiAweDMwQzIsXG4gICAgMHg4MzYyOiAweDMwQzMsXG4gICAgMHg4MzYzOiAweDMwQzQsXG4gICAgMHg4MzY0OiAweDMwQzUsXG4gICAgMHg4MzY1OiAweDMwQzYsXG4gICAgMHg4MzY2OiAweDMwQzcsXG4gICAgMHg4MzY3OiAweDMwQzgsXG4gICAgMHg4MzY4OiAweDMwQzksXG4gICAgMHg4MzY5OiAweDMwQ0EsXG4gICAgMHg4MzZBOiAweDMwQ0IsXG4gICAgMHg4MzZCOiAweDMwQ0MsXG4gICAgMHg4MzZDOiAweDMwQ0QsXG4gICAgMHg4MzZEOiAweDMwQ0UsXG4gICAgMHg4MzZFOiAweDMwQ0YsXG4gICAgMHg4MzZGOiAweDMwRDAsXG4gICAgMHg4MzcwOiAweDMwRDEsXG4gICAgMHg4MzcxOiAweDMwRDIsXG4gICAgMHg4MzcyOiAweDMwRDMsXG4gICAgMHg4MzczOiAweDMwRDQsXG4gICAgMHg4Mzc0OiAweDMwRDUsXG4gICAgMHg4Mzc1OiAweDMwRDYsXG4gICAgMHg4Mzc2OiAweDMwRDcsXG4gICAgMHg4Mzc3OiAweDMwRDgsXG4gICAgMHg4Mzc4OiAweDMwRDksXG4gICAgMHg4Mzc5OiAweDMwREEsXG4gICAgMHg4MzdBOiAweDMwREIsXG4gICAgMHg4MzdCOiAweDMwREMsXG4gICAgMHg4MzdDOiAweDMwREQsXG4gICAgMHg4MzdEOiAweDMwREUsXG4gICAgMHg4MzdFOiAweDMwREYsXG4gICAgMHg4MzgwOiAweDMwRTAsXG4gICAgMHg4MzgxOiAweDMwRTEsXG4gICAgMHg4MzgyOiAweDMwRTIsXG4gICAgMHg4MzgzOiAweDMwRTMsXG4gICAgMHg4Mzg0OiAweDMwRTQsXG4gICAgMHg4Mzg1OiAweDMwRTUsXG4gICAgMHg4Mzg2OiAweDMwRTYsXG4gICAgMHg4Mzg3OiAweDMwRTcsXG4gICAgMHg4Mzg4OiAweDMwRTgsXG4gICAgMHg4Mzg5OiAweDMwRTksXG4gICAgMHg4MzhBOiAweDMwRUEsXG4gICAgMHg4MzhCOiAweDMwRUIsXG4gICAgMHg4MzhDOiAweDMwRUMsXG4gICAgMHg4MzhEOiAweDMwRUQsXG4gICAgMHg4MzhFOiAweDMwRUUsXG4gICAgMHg4MzhGOiAweDMwRUYsXG4gICAgMHg4MzkwOiAweDMwRjAsXG4gICAgMHg4MzkxOiAweDMwRjEsXG4gICAgMHg4MzkyOiAweDMwRjIsXG4gICAgMHg4MzkzOiAweDMwRjMsXG4gICAgMHg4Mzk0OiAweDMwRjQsXG4gICAgMHg4Mzk1OiAweDMwRjUsXG4gICAgMHg4Mzk2OiAweDMwRjYsXG4gICAgMHg4MzlGOiAweDAzOTEsXG4gICAgMHg4M0EwOiAweDAzOTIsXG4gICAgMHg4M0ExOiAweDAzOTMsXG4gICAgMHg4M0EyOiAweDAzOTQsXG4gICAgMHg4M0EzOiAweDAzOTUsXG4gICAgMHg4M0E0OiAweDAzOTYsXG4gICAgMHg4M0E1OiAweDAzOTcsXG4gICAgMHg4M0E2OiAweDAzOTgsXG4gICAgMHg4M0E3OiAweDAzOTksXG4gICAgMHg4M0E4OiAweDAzOUEsXG4gICAgMHg4M0E5OiAweDAzOUIsXG4gICAgMHg4M0FBOiAweDAzOUMsXG4gICAgMHg4M0FCOiAweDAzOUQsXG4gICAgMHg4M0FDOiAweDAzOUUsXG4gICAgMHg4M0FEOiAweDAzOUYsXG4gICAgMHg4M0FFOiAweDAzQTAsXG4gICAgMHg4M0FGOiAweDAzQTEsXG4gICAgMHg4M0IwOiAweDAzQTMsXG4gICAgMHg4M0IxOiAweDAzQTQsXG4gICAgMHg4M0IyOiAweDAzQTUsXG4gICAgMHg4M0IzOiAweDAzQTYsXG4gICAgMHg4M0I0OiAweDAzQTcsXG4gICAgMHg4M0I1OiAweDAzQTgsXG4gICAgMHg4M0I2OiAweDAzQTksXG4gICAgMHg4M0JGOiAweDAzQjEsXG4gICAgMHg4M0MwOiAweDAzQjIsXG4gICAgMHg4M0MxOiAweDAzQjMsXG4gICAgMHg4M0MyOiAweDAzQjQsXG4gICAgMHg4M0MzOiAweDAzQjUsXG4gICAgMHg4M0M0OiAweDAzQjYsXG4gICAgMHg4M0M1OiAweDAzQjcsXG4gICAgMHg4M0M2OiAweDAzQjgsXG4gICAgMHg4M0M3OiAweDAzQjksXG4gICAgMHg4M0M4OiAweDAzQkEsXG4gICAgMHg4M0M5OiAweDAzQkIsXG4gICAgMHg4M0NBOiAweDAzQkMsXG4gICAgMHg4M0NCOiAweDAzQkQsXG4gICAgMHg4M0NDOiAweDAzQkUsXG4gICAgMHg4M0NEOiAweDAzQkYsXG4gICAgMHg4M0NFOiAweDAzQzAsXG4gICAgMHg4M0NGOiAweDAzQzEsXG4gICAgMHg4M0QwOiAweDAzQzMsXG4gICAgMHg4M0QxOiAweDAzQzQsXG4gICAgMHg4M0QyOiAweDAzQzUsXG4gICAgMHg4M0QzOiAweDAzQzYsXG4gICAgMHg4M0Q0OiAweDAzQzcsXG4gICAgMHg4M0Q1OiAweDAzQzgsXG4gICAgMHg4M0Q2OiAweDAzQzksXG4gICAgMHg4NDQwOiAweDA0MTAsXG4gICAgMHg4NDQxOiAweDA0MTEsXG4gICAgMHg4NDQyOiAweDA0MTIsXG4gICAgMHg4NDQzOiAweDA0MTMsXG4gICAgMHg4NDQ0OiAweDA0MTQsXG4gICAgMHg4NDQ1OiAweDA0MTUsXG4gICAgMHg4NDQ2OiAweDA0MDEsXG4gICAgMHg4NDQ3OiAweDA0MTYsXG4gICAgMHg4NDQ4OiAweDA0MTcsXG4gICAgMHg4NDQ5OiAweDA0MTgsXG4gICAgMHg4NDRBOiAweDA0MTksXG4gICAgMHg4NDRCOiAweDA0MUEsXG4gICAgMHg4NDRDOiAweDA0MUIsXG4gICAgMHg4NDREOiAweDA0MUMsXG4gICAgMHg4NDRFOiAweDA0MUQsXG4gICAgMHg4NDRGOiAweDA0MUUsXG4gICAgMHg4NDUwOiAweDA0MUYsXG4gICAgMHg4NDUxOiAweDA0MjAsXG4gICAgMHg4NDUyOiAweDA0MjEsXG4gICAgMHg4NDUzOiAweDA0MjIsXG4gICAgMHg4NDU0OiAweDA0MjMsXG4gICAgMHg4NDU1OiAweDA0MjQsXG4gICAgMHg4NDU2OiAweDA0MjUsXG4gICAgMHg4NDU3OiAweDA0MjYsXG4gICAgMHg4NDU4OiAweDA0MjcsXG4gICAgMHg4NDU5OiAweDA0MjgsXG4gICAgMHg4NDVBOiAweDA0MjksXG4gICAgMHg4NDVCOiAweDA0MkEsXG4gICAgMHg4NDVDOiAweDA0MkIsXG4gICAgMHg4NDVEOiAweDA0MkMsXG4gICAgMHg4NDVFOiAweDA0MkQsXG4gICAgMHg4NDVGOiAweDA0MkUsXG4gICAgMHg4NDYwOiAweDA0MkYsXG4gICAgMHg4NDcwOiAweDA0MzAsXG4gICAgMHg4NDcxOiAweDA0MzEsXG4gICAgMHg4NDcyOiAweDA0MzIsXG4gICAgMHg4NDczOiAweDA0MzMsXG4gICAgMHg4NDc0OiAweDA0MzQsXG4gICAgMHg4NDc1OiAweDA0MzUsXG4gICAgMHg4NDc2OiAweDA0NTEsXG4gICAgMHg4NDc3OiAweDA0MzYsXG4gICAgMHg4NDc4OiAweDA0MzcsXG4gICAgMHg4NDc5OiAweDA0MzgsXG4gICAgMHg4NDdBOiAweDA0MzksXG4gICAgMHg4NDdCOiAweDA0M0EsXG4gICAgMHg4NDdDOiAweDA0M0IsXG4gICAgMHg4NDdEOiAweDA0M0MsXG4gICAgMHg4NDdFOiAweDA0M0QsXG4gICAgMHg4NDgwOiAweDA0M0UsXG4gICAgMHg4NDgxOiAweDA0M0YsXG4gICAgMHg4NDgyOiAweDA0NDAsXG4gICAgMHg4NDgzOiAweDA0NDEsXG4gICAgMHg4NDg0OiAweDA0NDIsXG4gICAgMHg4NDg1OiAweDA0NDMsXG4gICAgMHg4NDg2OiAweDA0NDQsXG4gICAgMHg4NDg3OiAweDA0NDUsXG4gICAgMHg4NDg4OiAweDA0NDYsXG4gICAgMHg4NDg5OiAweDA0NDcsXG4gICAgMHg4NDhBOiAweDA0NDgsXG4gICAgMHg4NDhCOiAweDA0NDksXG4gICAgMHg4NDhDOiAweDA0NEEsXG4gICAgMHg4NDhEOiAweDA0NEIsXG4gICAgMHg4NDhFOiAweDA0NEMsXG4gICAgMHg4NDhGOiAweDA0NEQsXG4gICAgMHg4NDkwOiAweDA0NEUsXG4gICAgMHg4NDkxOiAweDA0NEYsXG4gICAgMHg4NDlGOiAweDI1MDAsXG4gICAgMHg4NEEwOiAweDI1MDIsXG4gICAgMHg4NEExOiAweDI1MEMsXG4gICAgMHg4NEEyOiAweDI1MTAsXG4gICAgMHg4NEEzOiAweDI1MTgsXG4gICAgMHg4NEE0OiAweDI1MTQsXG4gICAgMHg4NEE1OiAweDI1MUMsXG4gICAgMHg4NEE2OiAweDI1MkMsXG4gICAgMHg4NEE3OiAweDI1MjQsXG4gICAgMHg4NEE4OiAweDI1MzQsXG4gICAgMHg4NEE5OiAweDI1M0MsXG4gICAgMHg4NEFBOiAweDI1MDEsXG4gICAgMHg4NEFCOiAweDI1MDMsXG4gICAgMHg4NEFDOiAweDI1MEYsXG4gICAgMHg4NEFEOiAweDI1MTMsXG4gICAgMHg4NEFFOiAweDI1MUIsXG4gICAgMHg4NEFGOiAweDI1MTcsXG4gICAgMHg4NEIwOiAweDI1MjMsXG4gICAgMHg4NEIxOiAweDI1MzMsXG4gICAgMHg4NEIyOiAweDI1MkIsXG4gICAgMHg4NEIzOiAweDI1M0IsXG4gICAgMHg4NEI0OiAweDI1NEIsXG4gICAgMHg4NEI1OiAweDI1MjAsXG4gICAgMHg4NEI2OiAweDI1MkYsXG4gICAgMHg4NEI3OiAweDI1MjgsXG4gICAgMHg4NEI4OiAweDI1MzcsXG4gICAgMHg4NEI5OiAweDI1M0YsXG4gICAgMHg4NEJBOiAweDI1MUQsXG4gICAgMHg4NEJCOiAweDI1MzAsXG4gICAgMHg4NEJDOiAweDI1MjUsXG4gICAgMHg4NEJEOiAweDI1MzgsXG4gICAgMHg4NEJFOiAweDI1NDIsXG4gICAgMHg4ODlGOiAweDRFOUMsXG4gICAgMHg4OEEwOiAweDU1MTYsXG4gICAgMHg4OEExOiAweDVBMDMsXG4gICAgMHg4OEEyOiAweDk2M0YsXG4gICAgMHg4OEEzOiAweDU0QzAsXG4gICAgMHg4OEE0OiAweDYxMUIsXG4gICAgMHg4OEE1OiAweDYzMjgsXG4gICAgMHg4OEE2OiAweDU5RjYsXG4gICAgMHg4OEE3OiAweDkwMjIsXG4gICAgMHg4OEE4OiAweDg0NzUsXG4gICAgMHg4OEE5OiAweDgzMUMsXG4gICAgMHg4OEFBOiAweDdBNTAsXG4gICAgMHg4OEFCOiAweDYwQUEsXG4gICAgMHg4OEFDOiAweDYzRTEsXG4gICAgMHg4OEFEOiAweDZFMjUsXG4gICAgMHg4OEFFOiAweDY1RUQsXG4gICAgMHg4OEFGOiAweDg0NjYsXG4gICAgMHg4OEIwOiAweDgyQTYsXG4gICAgMHg4OEIxOiAweDlCRjUsXG4gICAgMHg4OEIyOiAweDY4OTMsXG4gICAgMHg4OEIzOiAweDU3MjcsXG4gICAgMHg4OEI0OiAweDY1QTEsXG4gICAgMHg4OEI1OiAweDYyNzEsXG4gICAgMHg4OEI2OiAweDVCOUIsXG4gICAgMHg4OEI3OiAweDU5RDAsXG4gICAgMHg4OEI4OiAweDg2N0IsXG4gICAgMHg4OEI5OiAweDk4RjQsXG4gICAgMHg4OEJBOiAweDdENjIsXG4gICAgMHg4OEJCOiAweDdEQkUsXG4gICAgMHg4OEJDOiAweDlCOEUsXG4gICAgMHg4OEJEOiAweDYyMTYsXG4gICAgMHg4OEJFOiAweDdDOUYsXG4gICAgMHg4OEJGOiAweDg4QjcsXG4gICAgMHg4OEMwOiAweDVCODksXG4gICAgMHg4OEMxOiAweDVFQjUsXG4gICAgMHg4OEMyOiAweDYzMDksXG4gICAgMHg4OEMzOiAweDY2OTcsXG4gICAgMHg4OEM0OiAweDY4NDgsXG4gICAgMHg4OEM1OiAweDk1QzcsXG4gICAgMHg4OEM2OiAweDk3OEQsXG4gICAgMHg4OEM3OiAweDY3NEYsXG4gICAgMHg4OEM4OiAweDRFRTUsXG4gICAgMHg4OEM5OiAweDRGMEEsXG4gICAgMHg4OENBOiAweDRGNEQsXG4gICAgMHg4OENCOiAweDRGOUQsXG4gICAgMHg4OENDOiAweDUwNDksXG4gICAgMHg4OENEOiAweDU2RjIsXG4gICAgMHg4OENFOiAweDU5MzcsXG4gICAgMHg4OENGOiAweDU5RDQsXG4gICAgMHg4OEQwOiAweDVBMDEsXG4gICAgMHg4OEQxOiAweDVDMDksXG4gICAgMHg4OEQyOiAweDYwREYsXG4gICAgMHg4OEQzOiAweDYxMEYsXG4gICAgMHg4OEQ0OiAweDYxNzAsXG4gICAgMHg4OEQ1OiAweDY2MTMsXG4gICAgMHg4OEQ2OiAweDY5MDUsXG4gICAgMHg4OEQ3OiAweDcwQkEsXG4gICAgMHg4OEQ4OiAweDc1NEYsXG4gICAgMHg4OEQ5OiAweDc1NzAsXG4gICAgMHg4OERBOiAweDc5RkIsXG4gICAgMHg4OERCOiAweDdEQUQsXG4gICAgMHg4OERDOiAweDdERUYsXG4gICAgMHg4OEREOiAweDgwQzMsXG4gICAgMHg4OERFOiAweDg0MEUsXG4gICAgMHg4OERGOiAweDg4NjMsXG4gICAgMHg4OEUwOiAweDhCMDIsXG4gICAgMHg4OEUxOiAweDkwNTUsXG4gICAgMHg4OEUyOiAweDkwN0EsXG4gICAgMHg4OEUzOiAweDUzM0IsXG4gICAgMHg4OEU0OiAweDRFOTUsXG4gICAgMHg4OEU1OiAweDRFQTUsXG4gICAgMHg4OEU2OiAweDU3REYsXG4gICAgMHg4OEU3OiAweDgwQjIsXG4gICAgMHg4OEU4OiAweDkwQzEsXG4gICAgMHg4OEU5OiAweDc4RUYsXG4gICAgMHg4OEVBOiAweDRFMDAsXG4gICAgMHg4OEVCOiAweDU4RjEsXG4gICAgMHg4OEVDOiAweDZFQTIsXG4gICAgMHg4OEVEOiAweDkwMzgsXG4gICAgMHg4OEVFOiAweDdBMzIsXG4gICAgMHg4OEVGOiAweDgzMjgsXG4gICAgMHg4OEYwOiAweDgyOEIsXG4gICAgMHg4OEYxOiAweDlDMkYsXG4gICAgMHg4OEYyOiAweDUxNDEsXG4gICAgMHg4OEYzOiAweDUzNzAsXG4gICAgMHg4OEY0OiAweDU0QkQsXG4gICAgMHg4OEY1OiAweDU0RTEsXG4gICAgMHg4OEY2OiAweDU2RTAsXG4gICAgMHg4OEY3OiAweDU5RkIsXG4gICAgMHg4OEY4OiAweDVGMTUsXG4gICAgMHg4OEY5OiAweDk4RjIsXG4gICAgMHg4OEZBOiAweDZERUIsXG4gICAgMHg4OEZCOiAweDgwRTQsXG4gICAgMHg4OEZDOiAweDg1MkQsXG4gICAgMHg4OTQwOiAweDk2NjIsXG4gICAgMHg4OTQxOiAweDk2NzAsXG4gICAgMHg4OTQyOiAweDk2QTAsXG4gICAgMHg4OTQzOiAweDk3RkIsXG4gICAgMHg4OTQ0OiAweDU0MEIsXG4gICAgMHg4OTQ1OiAweDUzRjMsXG4gICAgMHg4OTQ2OiAweDVCODcsXG4gICAgMHg4OTQ3OiAweDcwQ0YsXG4gICAgMHg4OTQ4OiAweDdGQkQsXG4gICAgMHg4OTQ5OiAweDhGQzIsXG4gICAgMHg4OTRBOiAweDk2RTgsXG4gICAgMHg4OTRCOiAweDUzNkYsXG4gICAgMHg4OTRDOiAweDlENUMsXG4gICAgMHg4OTREOiAweDdBQkEsXG4gICAgMHg4OTRFOiAweDRFMTEsXG4gICAgMHg4OTRGOiAweDc4OTMsXG4gICAgMHg4OTUwOiAweDgxRkMsXG4gICAgMHg4OTUxOiAweDZFMjYsXG4gICAgMHg4OTUyOiAweDU2MTgsXG4gICAgMHg4OTUzOiAweDU1MDQsXG4gICAgMHg4OTU0OiAweDZCMUQsXG4gICAgMHg4OTU1OiAweDg1MUEsXG4gICAgMHg4OTU2OiAweDlDM0IsXG4gICAgMHg4OTU3OiAweDU5RTUsXG4gICAgMHg4OTU4OiAweDUzQTksXG4gICAgMHg4OTU5OiAweDZENjYsXG4gICAgMHg4OTVBOiAweDc0REMsXG4gICAgMHg4OTVCOiAweDk1OEYsXG4gICAgMHg4OTVDOiAweDU2NDIsXG4gICAgMHg4OTVEOiAweDRFOTEsXG4gICAgMHg4OTVFOiAweDkwNEIsXG4gICAgMHg4OTVGOiAweDk2RjIsXG4gICAgMHg4OTYwOiAweDgzNEYsXG4gICAgMHg4OTYxOiAweDk5MEMsXG4gICAgMHg4OTYyOiAweDUzRTEsXG4gICAgMHg4OTYzOiAweDU1QjYsXG4gICAgMHg4OTY0OiAweDVCMzAsXG4gICAgMHg4OTY1OiAweDVGNzEsXG4gICAgMHg4OTY2OiAweDY2MjAsXG4gICAgMHg4OTY3OiAweDY2RjMsXG4gICAgMHg4OTY4OiAweDY4MDQsXG4gICAgMHg4OTY5OiAweDZDMzgsXG4gICAgMHg4OTZBOiAweDZDRjMsXG4gICAgMHg4OTZCOiAweDZEMjksXG4gICAgMHg4OTZDOiAweDc0NUIsXG4gICAgMHg4OTZEOiAweDc2QzgsXG4gICAgMHg4OTZFOiAweDdBNEUsXG4gICAgMHg4OTZGOiAweDk4MzQsXG4gICAgMHg4OTcwOiAweDgyRjEsXG4gICAgMHg4OTcxOiAweDg4NUIsXG4gICAgMHg4OTcyOiAweDhBNjAsXG4gICAgMHg4OTczOiAweDkyRUQsXG4gICAgMHg4OTc0OiAweDZEQjIsXG4gICAgMHg4OTc1OiAweDc1QUIsXG4gICAgMHg4OTc2OiAweDc2Q0EsXG4gICAgMHg4OTc3OiAweDk5QzUsXG4gICAgMHg4OTc4OiAweDYwQTYsXG4gICAgMHg4OTc5OiAweDhCMDEsXG4gICAgMHg4OTdBOiAweDhEOEEsXG4gICAgMHg4OTdCOiAweDk1QjIsXG4gICAgMHg4OTdDOiAweDY5OEUsXG4gICAgMHg4OTdEOiAweDUzQUQsXG4gICAgMHg4OTdFOiAweDUxODYsXG4gICAgMHg4OTgwOiAweDU3MTIsXG4gICAgMHg4OTgxOiAweDU4MzAsXG4gICAgMHg4OTgyOiAweDU5NDQsXG4gICAgMHg4OTgzOiAweDVCQjQsXG4gICAgMHg4OTg0OiAweDVFRjYsXG4gICAgMHg4OTg1OiAweDYwMjgsXG4gICAgMHg4OTg2OiAweDYzQTksXG4gICAgMHg4OTg3OiAweDYzRjQsXG4gICAgMHg4OTg4OiAweDZDQkYsXG4gICAgMHg4OTg5OiAweDZGMTQsXG4gICAgMHg4OThBOiAweDcwOEUsXG4gICAgMHg4OThCOiAweDcxMTQsXG4gICAgMHg4OThDOiAweDcxNTksXG4gICAgMHg4OThEOiAweDcxRDUsXG4gICAgMHg4OThFOiAweDczM0YsXG4gICAgMHg4OThGOiAweDdFMDEsXG4gICAgMHg4OTkwOiAweDgyNzYsXG4gICAgMHg4OTkxOiAweDgyRDEsXG4gICAgMHg4OTkyOiAweDg1OTcsXG4gICAgMHg4OTkzOiAweDkwNjAsXG4gICAgMHg4OTk0OiAweDkyNUIsXG4gICAgMHg4OTk1OiAweDlEMUIsXG4gICAgMHg4OTk2OiAweDU4NjksXG4gICAgMHg4OTk3OiAweDY1QkMsXG4gICAgMHg4OTk4OiAweDZDNUEsXG4gICAgMHg4OTk5OiAweDc1MjUsXG4gICAgMHg4OTlBOiAweDUxRjksXG4gICAgMHg4OTlCOiAweDU5MkUsXG4gICAgMHg4OTlDOiAweDU5NjUsXG4gICAgMHg4OTlEOiAweDVGODAsXG4gICAgMHg4OTlFOiAweDVGREMsXG4gICAgMHg4OTlGOiAweDYyQkMsXG4gICAgMHg4OUEwOiAweDY1RkEsXG4gICAgMHg4OUExOiAweDZBMkEsXG4gICAgMHg4OUEyOiAweDZCMjcsXG4gICAgMHg4OUEzOiAweDZCQjQsXG4gICAgMHg4OUE0OiAweDczOEIsXG4gICAgMHg4OUE1OiAweDdGQzEsXG4gICAgMHg4OUE2OiAweDg5NTYsXG4gICAgMHg4OUE3OiAweDlEMkMsXG4gICAgMHg4OUE4OiAweDlEMEUsXG4gICAgMHg4OUE5OiAweDlFQzQsXG4gICAgMHg4OUFBOiAweDVDQTEsXG4gICAgMHg4OUFCOiAweDZDOTYsXG4gICAgMHg4OUFDOiAweDgzN0IsXG4gICAgMHg4OUFEOiAweDUxMDQsXG4gICAgMHg4OUFFOiAweDVDNEIsXG4gICAgMHg4OUFGOiAweDYxQjYsXG4gICAgMHg4OUIwOiAweDgxQzYsXG4gICAgMHg4OUIxOiAweDY4NzYsXG4gICAgMHg4OUIyOiAweDcyNjEsXG4gICAgMHg4OUIzOiAweDRFNTksXG4gICAgMHg4OUI0OiAweDRGRkEsXG4gICAgMHg4OUI1OiAweDUzNzgsXG4gICAgMHg4OUI2OiAweDYwNjksXG4gICAgMHg4OUI3OiAweDZFMjksXG4gICAgMHg4OUI4OiAweDdBNEYsXG4gICAgMHg4OUI5OiAweDk3RjMsXG4gICAgMHg4OUJBOiAweDRFMEIsXG4gICAgMHg4OUJCOiAweDUzMTYsXG4gICAgMHg4OUJDOiAweDRFRUUsXG4gICAgMHg4OUJEOiAweDRGNTUsXG4gICAgMHg4OUJFOiAweDRGM0QsXG4gICAgMHg4OUJGOiAweDRGQTEsXG4gICAgMHg4OUMwOiAweDRGNzMsXG4gICAgMHg4OUMxOiAweDUyQTAsXG4gICAgMHg4OUMyOiAweDUzRUYsXG4gICAgMHg4OUMzOiAweDU2MDksXG4gICAgMHg4OUM0OiAweDU5MEYsXG4gICAgMHg4OUM1OiAweDVBQzEsXG4gICAgMHg4OUM2OiAweDVCQjYsXG4gICAgMHg4OUM3OiAweDVCRTEsXG4gICAgMHg4OUM4OiAweDc5RDEsXG4gICAgMHg4OUM5OiAweDY2ODcsXG4gICAgMHg4OUNBOiAweDY3OUMsXG4gICAgMHg4OUNCOiAweDY3QjYsXG4gICAgMHg4OUNDOiAweDZCNEMsXG4gICAgMHg4OUNEOiAweDZDQjMsXG4gICAgMHg4OUNFOiAweDcwNkIsXG4gICAgMHg4OUNGOiAweDczQzIsXG4gICAgMHg4OUQwOiAweDc5OEQsXG4gICAgMHg4OUQxOiAweDc5QkUsXG4gICAgMHg4OUQyOiAweDdBM0MsXG4gICAgMHg4OUQzOiAweDdCODcsXG4gICAgMHg4OUQ0OiAweDgyQjEsXG4gICAgMHg4OUQ1OiAweDgyREIsXG4gICAgMHg4OUQ2OiAweDgzMDQsXG4gICAgMHg4OUQ3OiAweDgzNzcsXG4gICAgMHg4OUQ4OiAweDgzRUYsXG4gICAgMHg4OUQ5OiAweDgzRDMsXG4gICAgMHg4OURBOiAweDg3NjYsXG4gICAgMHg4OURCOiAweDhBQjIsXG4gICAgMHg4OURDOiAweDU2MjksXG4gICAgMHg4OUREOiAweDhDQTgsXG4gICAgMHg4OURFOiAweDhGRTYsXG4gICAgMHg4OURGOiAweDkwNEUsXG4gICAgMHg4OUUwOiAweDk3MUUsXG4gICAgMHg4OUUxOiAweDg2OEEsXG4gICAgMHg4OUUyOiAweDRGQzQsXG4gICAgMHg4OUUzOiAweDVDRTgsXG4gICAgMHg4OUU0OiAweDYyMTEsXG4gICAgMHg4OUU1OiAweDcyNTksXG4gICAgMHg4OUU2OiAweDc1M0IsXG4gICAgMHg4OUU3OiAweDgxRTUsXG4gICAgMHg4OUU4OiAweDgyQkQsXG4gICAgMHg4OUU5OiAweDg2RkUsXG4gICAgMHg4OUVBOiAweDhDQzAsXG4gICAgMHg4OUVCOiAweDk2QzUsXG4gICAgMHg4OUVDOiAweDk5MTMsXG4gICAgMHg4OUVEOiAweDk5RDUsXG4gICAgMHg4OUVFOiAweDRFQ0IsXG4gICAgMHg4OUVGOiAweDRGMUEsXG4gICAgMHg4OUYwOiAweDg5RTMsXG4gICAgMHg4OUYxOiAweDU2REUsXG4gICAgMHg4OUYyOiAweDU4NEEsXG4gICAgMHg4OUYzOiAweDU4Q0EsXG4gICAgMHg4OUY0OiAweDVFRkIsXG4gICAgMHg4OUY1OiAweDVGRUIsXG4gICAgMHg4OUY2OiAweDYwMkEsXG4gICAgMHg4OUY3OiAweDYwOTQsXG4gICAgMHg4OUY4OiAweDYwNjIsXG4gICAgMHg4OUY5OiAweDYxRDAsXG4gICAgMHg4OUZBOiAweDYyMTIsXG4gICAgMHg4OUZCOiAweDYyRDAsXG4gICAgMHg4OUZDOiAweDY1MzksXG4gICAgMHg4QTQwOiAweDlCNDEsXG4gICAgMHg4QTQxOiAweDY2NjYsXG4gICAgMHg4QTQyOiAweDY4QjAsXG4gICAgMHg4QTQzOiAweDZENzcsXG4gICAgMHg4QTQ0OiAweDcwNzAsXG4gICAgMHg4QTQ1OiAweDc1NEMsXG4gICAgMHg4QTQ2OiAweDc2ODYsXG4gICAgMHg4QTQ3OiAweDdENzUsXG4gICAgMHg4QTQ4OiAweDgyQTUsXG4gICAgMHg4QTQ5OiAweDg3RjksXG4gICAgMHg4QTRBOiAweDk1OEIsXG4gICAgMHg4QTRCOiAweDk2OEUsXG4gICAgMHg4QTRDOiAweDhDOUQsXG4gICAgMHg4QTREOiAweDUxRjEsXG4gICAgMHg4QTRFOiAweDUyQkUsXG4gICAgMHg4QTRGOiAweDU5MTYsXG4gICAgMHg4QTUwOiAweDU0QjMsXG4gICAgMHg4QTUxOiAweDVCQjMsXG4gICAgMHg4QTUyOiAweDVEMTYsXG4gICAgMHg4QTUzOiAweDYxNjgsXG4gICAgMHg4QTU0OiAweDY5ODIsXG4gICAgMHg4QTU1OiAweDZEQUYsXG4gICAgMHg4QTU2OiAweDc4OEQsXG4gICAgMHg4QTU3OiAweDg0Q0IsXG4gICAgMHg4QTU4OiAweDg4NTcsXG4gICAgMHg4QTU5OiAweDhBNzIsXG4gICAgMHg4QTVBOiAweDkzQTcsXG4gICAgMHg4QTVCOiAweDlBQjgsXG4gICAgMHg4QTVDOiAweDZENkMsXG4gICAgMHg4QTVEOiAweDk5QTgsXG4gICAgMHg4QTVFOiAweDg2RDksXG4gICAgMHg4QTVGOiAweDU3QTMsXG4gICAgMHg4QTYwOiAweDY3RkYsXG4gICAgMHg4QTYxOiAweDg2Q0UsXG4gICAgMHg4QTYyOiAweDkyMEUsXG4gICAgMHg4QTYzOiAweDUyODMsXG4gICAgMHg4QTY0OiAweDU2ODcsXG4gICAgMHg4QTY1OiAweDU0MDQsXG4gICAgMHg4QTY2OiAweDVFRDMsXG4gICAgMHg4QTY3OiAweDYyRTEsXG4gICAgMHg4QTY4OiAweDY0QjksXG4gICAgMHg4QTY5OiAweDY4M0MsXG4gICAgMHg4QTZBOiAweDY4MzgsXG4gICAgMHg4QTZCOiAweDZCQkIsXG4gICAgMHg4QTZDOiAweDczNzIsXG4gICAgMHg4QTZEOiAweDc4QkEsXG4gICAgMHg4QTZFOiAweDdBNkIsXG4gICAgMHg4QTZGOiAweDg5OUEsXG4gICAgMHg4QTcwOiAweDg5RDIsXG4gICAgMHg4QTcxOiAweDhENkIsXG4gICAgMHg4QTcyOiAweDhGMDMsXG4gICAgMHg4QTczOiAweDkwRUQsXG4gICAgMHg4QTc0OiAweDk1QTMsXG4gICAgMHg4QTc1OiAweDk2OTQsXG4gICAgMHg4QTc2OiAweDk3NjksXG4gICAgMHg4QTc3OiAweDVCNjYsXG4gICAgMHg4QTc4OiAweDVDQjMsXG4gICAgMHg4QTc5OiAweDY5N0QsXG4gICAgMHg4QTdBOiAweDk4NEQsXG4gICAgMHg4QTdCOiAweDk4NEUsXG4gICAgMHg4QTdDOiAweDYzOUIsXG4gICAgMHg4QTdEOiAweDdCMjAsXG4gICAgMHg4QTdFOiAweDZBMkIsXG4gICAgMHg4QTgwOiAweDZBN0YsXG4gICAgMHg4QTgxOiAweDY4QjYsXG4gICAgMHg4QTgyOiAweDlDMEQsXG4gICAgMHg4QTgzOiAweDZGNUYsXG4gICAgMHg4QTg0OiAweDUyNzIsXG4gICAgMHg4QTg1OiAweDU1OUQsXG4gICAgMHg4QTg2OiAweDYwNzAsXG4gICAgMHg4QTg3OiAweDYyRUMsXG4gICAgMHg4QTg4OiAweDZEM0IsXG4gICAgMHg4QTg5OiAweDZFMDcsXG4gICAgMHg4QThBOiAweDZFRDEsXG4gICAgMHg4QThCOiAweDg0NUIsXG4gICAgMHg4QThDOiAweDg5MTAsXG4gICAgMHg4QThEOiAweDhGNDQsXG4gICAgMHg4QThFOiAweDRFMTQsXG4gICAgMHg4QThGOiAweDlDMzksXG4gICAgMHg4QTkwOiAweDUzRjYsXG4gICAgMHg4QTkxOiAweDY5MUIsXG4gICAgMHg4QTkyOiAweDZBM0EsXG4gICAgMHg4QTkzOiAweDk3ODQsXG4gICAgMHg4QTk0OiAweDY4MkEsXG4gICAgMHg4QTk1OiAweDUxNUMsXG4gICAgMHg4QTk2OiAweDdBQzMsXG4gICAgMHg4QTk3OiAweDg0QjIsXG4gICAgMHg4QTk4OiAweDkxREMsXG4gICAgMHg4QTk5OiAweDkzOEMsXG4gICAgMHg4QTlBOiAweDU2NUIsXG4gICAgMHg4QTlCOiAweDlEMjgsXG4gICAgMHg4QTlDOiAweDY4MjIsXG4gICAgMHg4QTlEOiAweDgzMDUsXG4gICAgMHg4QTlFOiAweDg0MzEsXG4gICAgMHg4QTlGOiAweDdDQTUsXG4gICAgMHg4QUEwOiAweDUyMDgsXG4gICAgMHg4QUExOiAweDgyQzUsXG4gICAgMHg4QUEyOiAweDc0RTYsXG4gICAgMHg4QUEzOiAweDRFN0UsXG4gICAgMHg4QUE0OiAweDRGODMsXG4gICAgMHg4QUE1OiAweDUxQTAsXG4gICAgMHg4QUE2OiAweDVCRDIsXG4gICAgMHg4QUE3OiAweDUyMEEsXG4gICAgMHg4QUE4OiAweDUyRDgsXG4gICAgMHg4QUE5OiAweDUyRTcsXG4gICAgMHg4QUFBOiAweDVERkIsXG4gICAgMHg4QUFCOiAweDU1OUEsXG4gICAgMHg4QUFDOiAweDU4MkEsXG4gICAgMHg4QUFEOiAweDU5RTYsXG4gICAgMHg4QUFFOiAweDVCOEMsXG4gICAgMHg4QUFGOiAweDVCOTgsXG4gICAgMHg4QUIwOiAweDVCREIsXG4gICAgMHg4QUIxOiAweDVFNzIsXG4gICAgMHg4QUIyOiAweDVFNzksXG4gICAgMHg4QUIzOiAweDYwQTMsXG4gICAgMHg4QUI0OiAweDYxMUYsXG4gICAgMHg4QUI1OiAweDYxNjMsXG4gICAgMHg4QUI2OiAweDYxQkUsXG4gICAgMHg4QUI3OiAweDYzREIsXG4gICAgMHg4QUI4OiAweDY1NjIsXG4gICAgMHg4QUI5OiAweDY3RDEsXG4gICAgMHg4QUJBOiAweDY4NTMsXG4gICAgMHg4QUJCOiAweDY4RkEsXG4gICAgMHg4QUJDOiAweDZCM0UsXG4gICAgMHg4QUJEOiAweDZCNTMsXG4gICAgMHg4QUJFOiAweDZDNTcsXG4gICAgMHg4QUJGOiAweDZGMjIsXG4gICAgMHg4QUMwOiAweDZGOTcsXG4gICAgMHg4QUMxOiAweDZGNDUsXG4gICAgMHg4QUMyOiAweDc0QjAsXG4gICAgMHg4QUMzOiAweDc1MTgsXG4gICAgMHg4QUM0OiAweDc2RTMsXG4gICAgMHg4QUM1OiAweDc3MEIsXG4gICAgMHg4QUM2OiAweDdBRkYsXG4gICAgMHg4QUM3OiAweDdCQTEsXG4gICAgMHg4QUM4OiAweDdDMjEsXG4gICAgMHg4QUM5OiAweDdERTksXG4gICAgMHg4QUNBOiAweDdGMzYsXG4gICAgMHg4QUNCOiAweDdGRjAsXG4gICAgMHg4QUNDOiAweDgwOUQsXG4gICAgMHg4QUNEOiAweDgyNjYsXG4gICAgMHg4QUNFOiAweDgzOUUsXG4gICAgMHg4QUNGOiAweDg5QjMsXG4gICAgMHg4QUQwOiAweDhBQ0MsXG4gICAgMHg4QUQxOiAweDhDQUIsXG4gICAgMHg4QUQyOiAweDkwODQsXG4gICAgMHg4QUQzOiAweDk0NTEsXG4gICAgMHg4QUQ0OiAweDk1OTMsXG4gICAgMHg4QUQ1OiAweDk1OTEsXG4gICAgMHg4QUQ2OiAweDk1QTIsXG4gICAgMHg4QUQ3OiAweDk2NjUsXG4gICAgMHg4QUQ4OiAweDk3RDMsXG4gICAgMHg4QUQ5OiAweDk5MjgsXG4gICAgMHg4QURBOiAweDgyMTgsXG4gICAgMHg4QURCOiAweDRFMzgsXG4gICAgMHg4QURDOiAweDU0MkIsXG4gICAgMHg4QUREOiAweDVDQjgsXG4gICAgMHg4QURFOiAweDVEQ0MsXG4gICAgMHg4QURGOiAweDczQTksXG4gICAgMHg4QUUwOiAweDc2NEMsXG4gICAgMHg4QUUxOiAweDc3M0MsXG4gICAgMHg4QUUyOiAweDVDQTksXG4gICAgMHg4QUUzOiAweDdGRUIsXG4gICAgMHg4QUU0OiAweDhEMEIsXG4gICAgMHg4QUU1OiAweDk2QzEsXG4gICAgMHg4QUU2OiAweDk4MTEsXG4gICAgMHg4QUU3OiAweDk4NTQsXG4gICAgMHg4QUU4OiAweDk4NTgsXG4gICAgMHg4QUU5OiAweDRGMDEsXG4gICAgMHg4QUVBOiAweDRGMEUsXG4gICAgMHg4QUVCOiAweDUzNzEsXG4gICAgMHg4QUVDOiAweDU1OUMsXG4gICAgMHg4QUVEOiAweDU2NjgsXG4gICAgMHg4QUVFOiAweDU3RkEsXG4gICAgMHg4QUVGOiAweDU5NDcsXG4gICAgMHg4QUYwOiAweDVCMDksXG4gICAgMHg4QUYxOiAweDVCQzQsXG4gICAgMHg4QUYyOiAweDVDOTAsXG4gICAgMHg4QUYzOiAweDVFMEMsXG4gICAgMHg4QUY0OiAweDVFN0UsXG4gICAgMHg4QUY1OiAweDVGQ0MsXG4gICAgMHg4QUY2OiAweDYzRUUsXG4gICAgMHg4QUY3OiAweDY3M0EsXG4gICAgMHg4QUY4OiAweDY1RDcsXG4gICAgMHg4QUY5OiAweDY1RTIsXG4gICAgMHg4QUZBOiAweDY3MUYsXG4gICAgMHg4QUZCOiAweDY4Q0IsXG4gICAgMHg4QUZDOiAweDY4QzQsXG4gICAgMHg4QjQwOiAweDZBNUYsXG4gICAgMHg4QjQxOiAweDVFMzAsXG4gICAgMHg4QjQyOiAweDZCQzUsXG4gICAgMHg4QjQzOiAweDZDMTcsXG4gICAgMHg4QjQ0OiAweDZDN0QsXG4gICAgMHg4QjQ1OiAweDc1N0YsXG4gICAgMHg4QjQ2OiAweDc5NDgsXG4gICAgMHg4QjQ3OiAweDVCNjMsXG4gICAgMHg4QjQ4OiAweDdBMDAsXG4gICAgMHg4QjQ5OiAweDdEMDAsXG4gICAgMHg4QjRBOiAweDVGQkQsXG4gICAgMHg4QjRCOiAweDg5OEYsXG4gICAgMHg4QjRDOiAweDhBMTgsXG4gICAgMHg4QjREOiAweDhDQjQsXG4gICAgMHg4QjRFOiAweDhENzcsXG4gICAgMHg4QjRGOiAweDhFQ0MsXG4gICAgMHg4QjUwOiAweDhGMUQsXG4gICAgMHg4QjUxOiAweDk4RTIsXG4gICAgMHg4QjUyOiAweDlBMEUsXG4gICAgMHg4QjUzOiAweDlCM0MsXG4gICAgMHg4QjU0OiAweDRFODAsXG4gICAgMHg4QjU1OiAweDUwN0QsXG4gICAgMHg4QjU2OiAweDUxMDAsXG4gICAgMHg4QjU3OiAweDU5OTMsXG4gICAgMHg4QjU4OiAweDVCOUMsXG4gICAgMHg4QjU5OiAweDYyMkYsXG4gICAgMHg4QjVBOiAweDYyODAsXG4gICAgMHg4QjVCOiAweDY0RUMsXG4gICAgMHg4QjVDOiAweDZCM0EsXG4gICAgMHg4QjVEOiAweDcyQTAsXG4gICAgMHg4QjVFOiAweDc1OTEsXG4gICAgMHg4QjVGOiAweDc5NDcsXG4gICAgMHg4QjYwOiAweDdGQTksXG4gICAgMHg4QjYxOiAweDg3RkIsXG4gICAgMHg4QjYyOiAweDhBQkMsXG4gICAgMHg4QjYzOiAweDhCNzAsXG4gICAgMHg4QjY0OiAweDYzQUMsXG4gICAgMHg4QjY1OiAweDgzQ0EsXG4gICAgMHg4QjY2OiAweDk3QTAsXG4gICAgMHg4QjY3OiAweDU0MDksXG4gICAgMHg4QjY4OiAweDU0MDMsXG4gICAgMHg4QjY5OiAweDU1QUIsXG4gICAgMHg4QjZBOiAweDY4NTQsXG4gICAgMHg4QjZCOiAweDZBNTgsXG4gICAgMHg4QjZDOiAweDhBNzAsXG4gICAgMHg4QjZEOiAweDc4MjcsXG4gICAgMHg4QjZFOiAweDY3NzUsXG4gICAgMHg4QjZGOiAweDlFQ0QsXG4gICAgMHg4QjcwOiAweDUzNzQsXG4gICAgMHg4QjcxOiAweDVCQTIsXG4gICAgMHg4QjcyOiAweDgxMUEsXG4gICAgMHg4QjczOiAweDg2NTAsXG4gICAgMHg4Qjc0OiAweDkwMDYsXG4gICAgMHg4Qjc1OiAweDRFMTgsXG4gICAgMHg4Qjc2OiAweDRFNDUsXG4gICAgMHg4Qjc3OiAweDRFQzcsXG4gICAgMHg4Qjc4OiAweDRGMTEsXG4gICAgMHg4Qjc5OiAweDUzQ0EsXG4gICAgMHg4QjdBOiAweDU0MzgsXG4gICAgMHg4QjdCOiAweDVCQUUsXG4gICAgMHg4QjdDOiAweDVGMTMsXG4gICAgMHg4QjdEOiAweDYwMjUsXG4gICAgMHg4QjdFOiAweDY1NTEsXG4gICAgMHg4QjgwOiAweDY3M0QsXG4gICAgMHg4QjgxOiAweDZDNDIsXG4gICAgMHg4QjgyOiAweDZDNzIsXG4gICAgMHg4QjgzOiAweDZDRTMsXG4gICAgMHg4Qjg0OiAweDcwNzgsXG4gICAgMHg4Qjg1OiAweDc0MDMsXG4gICAgMHg4Qjg2OiAweDdBNzYsXG4gICAgMHg4Qjg3OiAweDdBQUUsXG4gICAgMHg4Qjg4OiAweDdCMDgsXG4gICAgMHg4Qjg5OiAweDdEMUEsXG4gICAgMHg4QjhBOiAweDdDRkUsXG4gICAgMHg4QjhCOiAweDdENjYsXG4gICAgMHg4QjhDOiAweDY1RTcsXG4gICAgMHg4QjhEOiAweDcyNUIsXG4gICAgMHg4QjhFOiAweDUzQkIsXG4gICAgMHg4QjhGOiAweDVDNDUsXG4gICAgMHg4QjkwOiAweDVERTgsXG4gICAgMHg4QjkxOiAweDYyRDIsXG4gICAgMHg4QjkyOiAweDYyRTAsXG4gICAgMHg4QjkzOiAweDYzMTksXG4gICAgMHg4Qjk0OiAweDZFMjAsXG4gICAgMHg4Qjk1OiAweDg2NUEsXG4gICAgMHg4Qjk2OiAweDhBMzEsXG4gICAgMHg4Qjk3OiAweDhEREQsXG4gICAgMHg4Qjk4OiAweDkyRjgsXG4gICAgMHg4Qjk5OiAweDZGMDEsXG4gICAgMHg4QjlBOiAweDc5QTYsXG4gICAgMHg4QjlCOiAweDlCNUEsXG4gICAgMHg4QjlDOiAweDRFQTgsXG4gICAgMHg4QjlEOiAweDRFQUIsXG4gICAgMHg4QjlFOiAweDRFQUMsXG4gICAgMHg4QjlGOiAweDRGOUIsXG4gICAgMHg4QkEwOiAweDRGQTAsXG4gICAgMHg4QkExOiAweDUwRDEsXG4gICAgMHg4QkEyOiAweDUxNDcsXG4gICAgMHg4QkEzOiAweDdBRjYsXG4gICAgMHg4QkE0OiAweDUxNzEsXG4gICAgMHg4QkE1OiAweDUxRjYsXG4gICAgMHg4QkE2OiAweDUzNTQsXG4gICAgMHg4QkE3OiAweDUzMjEsXG4gICAgMHg4QkE4OiAweDUzN0YsXG4gICAgMHg4QkE5OiAweDUzRUIsXG4gICAgMHg4QkFBOiAweDU1QUMsXG4gICAgMHg4QkFCOiAweDU4ODMsXG4gICAgMHg4QkFDOiAweDVDRTEsXG4gICAgMHg4QkFEOiAweDVGMzcsXG4gICAgMHg4QkFFOiAweDVGNEEsXG4gICAgMHg4QkFGOiAweDYwMkYsXG4gICAgMHg4QkIwOiAweDYwNTAsXG4gICAgMHg4QkIxOiAweDYwNkQsXG4gICAgMHg4QkIyOiAweDYzMUYsXG4gICAgMHg4QkIzOiAweDY1NTksXG4gICAgMHg4QkI0OiAweDZBNEIsXG4gICAgMHg4QkI1OiAweDZDQzEsXG4gICAgMHg4QkI2OiAweDcyQzIsXG4gICAgMHg4QkI3OiAweDcyRUQsXG4gICAgMHg4QkI4OiAweDc3RUYsXG4gICAgMHg4QkI5OiAweDgwRjgsXG4gICAgMHg4QkJBOiAweDgxMDUsXG4gICAgMHg4QkJCOiAweDgyMDgsXG4gICAgMHg4QkJDOiAweDg1NEUsXG4gICAgMHg4QkJEOiAweDkwRjcsXG4gICAgMHg4QkJFOiAweDkzRTEsXG4gICAgMHg4QkJGOiAweDk3RkYsXG4gICAgMHg4QkMwOiAweDk5NTcsXG4gICAgMHg4QkMxOiAweDlBNUEsXG4gICAgMHg4QkMyOiAweDRFRjAsXG4gICAgMHg4QkMzOiAweDUxREQsXG4gICAgMHg4QkM0OiAweDVDMkQsXG4gICAgMHg4QkM1OiAweDY2ODEsXG4gICAgMHg4QkM2OiAweDY5NkQsXG4gICAgMHg4QkM3OiAweDVDNDAsXG4gICAgMHg4QkM4OiAweDY2RjIsXG4gICAgMHg4QkM5OiAweDY5NzUsXG4gICAgMHg4QkNBOiAweDczODksXG4gICAgMHg4QkNCOiAweDY4NTAsXG4gICAgMHg4QkNDOiAweDdDODEsXG4gICAgMHg4QkNEOiAweDUwQzUsXG4gICAgMHg4QkNFOiAweDUyRTQsXG4gICAgMHg4QkNGOiAweDU3NDcsXG4gICAgMHg4QkQwOiAweDVERkUsXG4gICAgMHg4QkQxOiAweDkzMjYsXG4gICAgMHg4QkQyOiAweDY1QTQsXG4gICAgMHg4QkQzOiAweDZCMjMsXG4gICAgMHg4QkQ0OiAweDZCM0QsXG4gICAgMHg4QkQ1OiAweDc0MzQsXG4gICAgMHg4QkQ2OiAweDc5ODEsXG4gICAgMHg4QkQ3OiAweDc5QkQsXG4gICAgMHg4QkQ4OiAweDdCNEIsXG4gICAgMHg4QkQ5OiAweDdEQ0EsXG4gICAgMHg4QkRBOiAweDgyQjksXG4gICAgMHg4QkRCOiAweDgzQ0MsXG4gICAgMHg4QkRDOiAweDg4N0YsXG4gICAgMHg4QkREOiAweDg5NUYsXG4gICAgMHg4QkRFOiAweDhCMzksXG4gICAgMHg4QkRGOiAweDhGRDEsXG4gICAgMHg4QkUwOiAweDkxRDEsXG4gICAgMHg4QkUxOiAweDU0MUYsXG4gICAgMHg4QkUyOiAweDkyODAsXG4gICAgMHg4QkUzOiAweDRFNUQsXG4gICAgMHg4QkU0OiAweDUwMzYsXG4gICAgMHg4QkU1OiAweDUzRTUsXG4gICAgMHg4QkU2OiAweDUzM0EsXG4gICAgMHg4QkU3OiAweDcyRDcsXG4gICAgMHg4QkU4OiAweDczOTYsXG4gICAgMHg4QkU5OiAweDc3RTksXG4gICAgMHg4QkVBOiAweDgyRTYsXG4gICAgMHg4QkVCOiAweDhFQUYsXG4gICAgMHg4QkVDOiAweDk5QzYsXG4gICAgMHg4QkVEOiAweDk5QzgsXG4gICAgMHg4QkVFOiAweDk5RDIsXG4gICAgMHg4QkVGOiAweDUxNzcsXG4gICAgMHg4QkYwOiAweDYxMUEsXG4gICAgMHg4QkYxOiAweDg2NUUsXG4gICAgMHg4QkYyOiAweDU1QjAsXG4gICAgMHg4QkYzOiAweDdBN0EsXG4gICAgMHg4QkY0OiAweDUwNzYsXG4gICAgMHg4QkY1OiAweDVCRDMsXG4gICAgMHg4QkY2OiAweDkwNDcsXG4gICAgMHg4QkY3OiAweDk2ODUsXG4gICAgMHg4QkY4OiAweDRFMzIsXG4gICAgMHg4QkY5OiAweDZBREIsXG4gICAgMHg4QkZBOiAweDkxRTcsXG4gICAgMHg4QkZCOiAweDVDNTEsXG4gICAgMHg4QkZDOiAweDVDNDgsXG4gICAgMHg4QzQwOiAweDYzOTgsXG4gICAgMHg4QzQxOiAweDdBOUYsXG4gICAgMHg4QzQyOiAweDZDOTMsXG4gICAgMHg4QzQzOiAweDk3NzQsXG4gICAgMHg4QzQ0OiAweDhGNjEsXG4gICAgMHg4QzQ1OiAweDdBQUEsXG4gICAgMHg4QzQ2OiAweDcxOEEsXG4gICAgMHg4QzQ3OiAweDk2ODgsXG4gICAgMHg4QzQ4OiAweDdDODIsXG4gICAgMHg4QzQ5OiAweDY4MTcsXG4gICAgMHg4QzRBOiAweDdFNzAsXG4gICAgMHg4QzRCOiAweDY4NTEsXG4gICAgMHg4QzRDOiAweDkzNkMsXG4gICAgMHg4QzREOiAweDUyRjIsXG4gICAgMHg4QzRFOiAweDU0MUIsXG4gICAgMHg4QzRGOiAweDg1QUIsXG4gICAgMHg4QzUwOiAweDhBMTMsXG4gICAgMHg4QzUxOiAweDdGQTQsXG4gICAgMHg4QzUyOiAweDhFQ0QsXG4gICAgMHg4QzUzOiAweDkwRTEsXG4gICAgMHg4QzU0OiAweDUzNjYsXG4gICAgMHg4QzU1OiAweDg4ODgsXG4gICAgMHg4QzU2OiAweDc5NDEsXG4gICAgMHg4QzU3OiAweDRGQzIsXG4gICAgMHg4QzU4OiAweDUwQkUsXG4gICAgMHg4QzU5OiAweDUyMTEsXG4gICAgMHg4QzVBOiAweDUxNDQsXG4gICAgMHg4QzVCOiAweDU1NTMsXG4gICAgMHg4QzVDOiAweDU3MkQsXG4gICAgMHg4QzVEOiAweDczRUEsXG4gICAgMHg4QzVFOiAweDU3OEIsXG4gICAgMHg4QzVGOiAweDU5NTEsXG4gICAgMHg4QzYwOiAweDVGNjIsXG4gICAgMHg4QzYxOiAweDVGODQsXG4gICAgMHg4QzYyOiAweDYwNzUsXG4gICAgMHg4QzYzOiAweDYxNzYsXG4gICAgMHg4QzY0OiAweDYxNjcsXG4gICAgMHg4QzY1OiAweDYxQTksXG4gICAgMHg4QzY2OiAweDYzQjIsXG4gICAgMHg4QzY3OiAweDY0M0EsXG4gICAgMHg4QzY4OiAweDY1NkMsXG4gICAgMHg4QzY5OiAweDY2NkYsXG4gICAgMHg4QzZBOiAweDY4NDIsXG4gICAgMHg4QzZCOiAweDZFMTMsXG4gICAgMHg4QzZDOiAweDc1NjYsXG4gICAgMHg4QzZEOiAweDdBM0QsXG4gICAgMHg4QzZFOiAweDdDRkIsXG4gICAgMHg4QzZGOiAweDdENEMsXG4gICAgMHg4QzcwOiAweDdEOTksXG4gICAgMHg4QzcxOiAweDdFNEIsXG4gICAgMHg4QzcyOiAweDdGNkIsXG4gICAgMHg4QzczOiAweDgzMEUsXG4gICAgMHg4Qzc0OiAweDgzNEEsXG4gICAgMHg4Qzc1OiAweDg2Q0QsXG4gICAgMHg4Qzc2OiAweDhBMDgsXG4gICAgMHg4Qzc3OiAweDhBNjMsXG4gICAgMHg4Qzc4OiAweDhCNjYsXG4gICAgMHg4Qzc5OiAweDhFRkQsXG4gICAgMHg4QzdBOiAweDk4MUEsXG4gICAgMHg4QzdCOiAweDlEOEYsXG4gICAgMHg4QzdDOiAweDgyQjgsXG4gICAgMHg4QzdEOiAweDhGQ0UsXG4gICAgMHg4QzdFOiAweDlCRTgsXG4gICAgMHg4QzgwOiAweDUyODcsXG4gICAgMHg4QzgxOiAweDYyMUYsXG4gICAgMHg4QzgyOiAweDY0ODMsXG4gICAgMHg4QzgzOiAweDZGQzAsXG4gICAgMHg4Qzg0OiAweDk2OTksXG4gICAgMHg4Qzg1OiAweDY4NDEsXG4gICAgMHg4Qzg2OiAweDUwOTEsXG4gICAgMHg4Qzg3OiAweDZCMjAsXG4gICAgMHg4Qzg4OiAweDZDN0EsXG4gICAgMHg4Qzg5OiAweDZGNTQsXG4gICAgMHg4QzhBOiAweDdBNzQsXG4gICAgMHg4QzhCOiAweDdENTAsXG4gICAgMHg4QzhDOiAweDg4NDAsXG4gICAgMHg4QzhEOiAweDhBMjMsXG4gICAgMHg4QzhFOiAweDY3MDgsXG4gICAgMHg4QzhGOiAweDRFRjYsXG4gICAgMHg4QzkwOiAweDUwMzksXG4gICAgMHg4QzkxOiAweDUwMjYsXG4gICAgMHg4QzkyOiAweDUwNjUsXG4gICAgMHg4QzkzOiAweDUxN0MsXG4gICAgMHg4Qzk0OiAweDUyMzgsXG4gICAgMHg4Qzk1OiAweDUyNjMsXG4gICAgMHg4Qzk2OiAweDU1QTcsXG4gICAgMHg4Qzk3OiAweDU3MEYsXG4gICAgMHg4Qzk4OiAweDU4MDUsXG4gICAgMHg4Qzk5OiAweDVBQ0MsXG4gICAgMHg4QzlBOiAweDVFRkEsXG4gICAgMHg4QzlCOiAweDYxQjIsXG4gICAgMHg4QzlDOiAweDYxRjgsXG4gICAgMHg4QzlEOiAweDYyRjMsXG4gICAgMHg4QzlFOiAweDYzNzIsXG4gICAgMHg4QzlGOiAweDY5MUMsXG4gICAgMHg4Q0EwOiAweDZBMjksXG4gICAgMHg4Q0ExOiAweDcyN0QsXG4gICAgMHg4Q0EyOiAweDcyQUMsXG4gICAgMHg4Q0EzOiAweDczMkUsXG4gICAgMHg4Q0E0OiAweDc4MTQsXG4gICAgMHg4Q0E1OiAweDc4NkYsXG4gICAgMHg4Q0E2OiAweDdENzksXG4gICAgMHg4Q0E3OiAweDc3MEMsXG4gICAgMHg4Q0E4OiAweDgwQTksXG4gICAgMHg4Q0E5OiAweDg5OEIsXG4gICAgMHg4Q0FBOiAweDhCMTksXG4gICAgMHg4Q0FCOiAweDhDRTIsXG4gICAgMHg4Q0FDOiAweDhFRDIsXG4gICAgMHg4Q0FEOiAweDkwNjMsXG4gICAgMHg4Q0FFOiAweDkzNzUsXG4gICAgMHg4Q0FGOiAweDk2N0EsXG4gICAgMHg4Q0IwOiAweDk4NTUsXG4gICAgMHg4Q0IxOiAweDlBMTMsXG4gICAgMHg4Q0IyOiAweDlFNzgsXG4gICAgMHg4Q0IzOiAweDUxNDMsXG4gICAgMHg4Q0I0OiAweDUzOUYsXG4gICAgMHg4Q0I1OiAweDUzQjMsXG4gICAgMHg4Q0I2OiAweDVFN0IsXG4gICAgMHg4Q0I3OiAweDVGMjYsXG4gICAgMHg4Q0I4OiAweDZFMUIsXG4gICAgMHg4Q0I5OiAweDZFOTAsXG4gICAgMHg4Q0JBOiAweDczODQsXG4gICAgMHg4Q0JCOiAweDczRkUsXG4gICAgMHg4Q0JDOiAweDdENDMsXG4gICAgMHg4Q0JEOiAweDgyMzcsXG4gICAgMHg4Q0JFOiAweDhBMDAsXG4gICAgMHg4Q0JGOiAweDhBRkEsXG4gICAgMHg4Q0MwOiAweDk2NTAsXG4gICAgMHg4Q0MxOiAweDRFNEUsXG4gICAgMHg4Q0MyOiAweDUwMEIsXG4gICAgMHg4Q0MzOiAweDUzRTQsXG4gICAgMHg4Q0M0OiAweDU0N0MsXG4gICAgMHg4Q0M1OiAweDU2RkEsXG4gICAgMHg4Q0M2OiAweDU5RDEsXG4gICAgMHg4Q0M3OiAweDVCNjQsXG4gICAgMHg4Q0M4OiAweDVERjEsXG4gICAgMHg4Q0M5OiAweDVFQUIsXG4gICAgMHg4Q0NBOiAweDVGMjcsXG4gICAgMHg4Q0NCOiAweDYyMzgsXG4gICAgMHg4Q0NDOiAweDY1NDUsXG4gICAgMHg4Q0NEOiAweDY3QUYsXG4gICAgMHg4Q0NFOiAweDZFNTYsXG4gICAgMHg4Q0NGOiAweDcyRDAsXG4gICAgMHg4Q0QwOiAweDdDQ0EsXG4gICAgMHg4Q0QxOiAweDg4QjQsXG4gICAgMHg4Q0QyOiAweDgwQTEsXG4gICAgMHg4Q0QzOiAweDgwRTEsXG4gICAgMHg4Q0Q0OiAweDgzRjAsXG4gICAgMHg4Q0Q1OiAweDg2NEUsXG4gICAgMHg4Q0Q2OiAweDhBODcsXG4gICAgMHg4Q0Q3OiAweDhERTgsXG4gICAgMHg4Q0Q4OiAweDkyMzcsXG4gICAgMHg4Q0Q5OiAweDk2QzcsXG4gICAgMHg4Q0RBOiAweDk4NjcsXG4gICAgMHg4Q0RCOiAweDlGMTMsXG4gICAgMHg4Q0RDOiAweDRFOTQsXG4gICAgMHg4Q0REOiAweDRFOTIsXG4gICAgMHg4Q0RFOiAweDRGMEQsXG4gICAgMHg4Q0RGOiAweDUzNDgsXG4gICAgMHg4Q0UwOiAweDU0NDksXG4gICAgMHg4Q0UxOiAweDU0M0UsXG4gICAgMHg4Q0UyOiAweDVBMkYsXG4gICAgMHg4Q0UzOiAweDVGOEMsXG4gICAgMHg4Q0U0OiAweDVGQTEsXG4gICAgMHg4Q0U1OiAweDYwOUYsXG4gICAgMHg4Q0U2OiAweDY4QTcsXG4gICAgMHg4Q0U3OiAweDZBOEUsXG4gICAgMHg4Q0U4OiAweDc0NUEsXG4gICAgMHg4Q0U5OiAweDc4ODEsXG4gICAgMHg4Q0VBOiAweDhBOUUsXG4gICAgMHg4Q0VCOiAweDhBQTQsXG4gICAgMHg4Q0VDOiAweDhCNzcsXG4gICAgMHg4Q0VEOiAweDkxOTAsXG4gICAgMHg4Q0VFOiAweDRFNUUsXG4gICAgMHg4Q0VGOiAweDlCQzksXG4gICAgMHg4Q0YwOiAweDRFQTQsXG4gICAgMHg4Q0YxOiAweDRGN0MsXG4gICAgMHg4Q0YyOiAweDRGQUYsXG4gICAgMHg4Q0YzOiAweDUwMTksXG4gICAgMHg4Q0Y0OiAweDUwMTYsXG4gICAgMHg4Q0Y1OiAweDUxNDksXG4gICAgMHg4Q0Y2OiAweDUxNkMsXG4gICAgMHg4Q0Y3OiAweDUyOUYsXG4gICAgMHg4Q0Y4OiAweDUyQjksXG4gICAgMHg4Q0Y5OiAweDUyRkUsXG4gICAgMHg4Q0ZBOiAweDUzOUEsXG4gICAgMHg4Q0ZCOiAweDUzRTMsXG4gICAgMHg4Q0ZDOiAweDU0MTEsXG4gICAgMHg4RDQwOiAweDU0MEUsXG4gICAgMHg4RDQxOiAweDU1ODksXG4gICAgMHg4RDQyOiAweDU3NTEsXG4gICAgMHg4RDQzOiAweDU3QTIsXG4gICAgMHg4RDQ0OiAweDU5N0QsXG4gICAgMHg4RDQ1OiAweDVCNTQsXG4gICAgMHg4RDQ2OiAweDVCNUQsXG4gICAgMHg4RDQ3OiAweDVCOEYsXG4gICAgMHg4RDQ4OiAweDVERTUsXG4gICAgMHg4RDQ5OiAweDVERTcsXG4gICAgMHg4RDRBOiAweDVERjcsXG4gICAgMHg4RDRCOiAweDVFNzgsXG4gICAgMHg4RDRDOiAweDVFODMsXG4gICAgMHg4RDREOiAweDVFOUEsXG4gICAgMHg4RDRFOiAweDVFQjcsXG4gICAgMHg4RDRGOiAweDVGMTgsXG4gICAgMHg4RDUwOiAweDYwNTIsXG4gICAgMHg4RDUxOiAweDYxNEMsXG4gICAgMHg4RDUyOiAweDYyOTcsXG4gICAgMHg4RDUzOiAweDYyRDgsXG4gICAgMHg4RDU0OiAweDYzQTcsXG4gICAgMHg4RDU1OiAweDY1M0IsXG4gICAgMHg4RDU2OiAweDY2MDIsXG4gICAgMHg4RDU3OiAweDY2NDMsXG4gICAgMHg4RDU4OiAweDY2RjQsXG4gICAgMHg4RDU5OiAweDY3NkQsXG4gICAgMHg4RDVBOiAweDY4MjEsXG4gICAgMHg4RDVCOiAweDY4OTcsXG4gICAgMHg4RDVDOiAweDY5Q0IsXG4gICAgMHg4RDVEOiAweDZDNUYsXG4gICAgMHg4RDVFOiAweDZEMkEsXG4gICAgMHg4RDVGOiAweDZENjksXG4gICAgMHg4RDYwOiAweDZFMkYsXG4gICAgMHg4RDYxOiAweDZFOUQsXG4gICAgMHg4RDYyOiAweDc1MzIsXG4gICAgMHg4RDYzOiAweDc2ODcsXG4gICAgMHg4RDY0OiAweDc4NkMsXG4gICAgMHg4RDY1OiAweDdBM0YsXG4gICAgMHg4RDY2OiAweDdDRTAsXG4gICAgMHg4RDY3OiAweDdEMDUsXG4gICAgMHg4RDY4OiAweDdEMTgsXG4gICAgMHg4RDY5OiAweDdENUUsXG4gICAgMHg4RDZBOiAweDdEQjEsXG4gICAgMHg4RDZCOiAweDgwMTUsXG4gICAgMHg4RDZDOiAweDgwMDMsXG4gICAgMHg4RDZEOiAweDgwQUYsXG4gICAgMHg4RDZFOiAweDgwQjEsXG4gICAgMHg4RDZGOiAweDgxNTQsXG4gICAgMHg4RDcwOiAweDgxOEYsXG4gICAgMHg4RDcxOiAweDgyMkEsXG4gICAgMHg4RDcyOiAweDgzNTIsXG4gICAgMHg4RDczOiAweDg4NEMsXG4gICAgMHg4RDc0OiAweDg4NjEsXG4gICAgMHg4RDc1OiAweDhCMUIsXG4gICAgMHg4RDc2OiAweDhDQTIsXG4gICAgMHg4RDc3OiAweDhDRkMsXG4gICAgMHg4RDc4OiAweDkwQ0EsXG4gICAgMHg4RDc5OiAweDkxNzUsXG4gICAgMHg4RDdBOiAweDkyNzEsXG4gICAgMHg4RDdCOiAweDc4M0YsXG4gICAgMHg4RDdDOiAweDkyRkMsXG4gICAgMHg4RDdEOiAweDk1QTQsXG4gICAgMHg4RDdFOiAweDk2NEQsXG4gICAgMHg4RDgwOiAweDk4MDUsXG4gICAgMHg4RDgxOiAweDk5OTksXG4gICAgMHg4RDgyOiAweDlBRDgsXG4gICAgMHg4RDgzOiAweDlEM0IsXG4gICAgMHg4RDg0OiAweDUyNUIsXG4gICAgMHg4RDg1OiAweDUyQUIsXG4gICAgMHg4RDg2OiAweDUzRjcsXG4gICAgMHg4RDg3OiAweDU0MDgsXG4gICAgMHg4RDg4OiAweDU4RDUsXG4gICAgMHg4RDg5OiAweDYyRjcsXG4gICAgMHg4RDhBOiAweDZGRTAsXG4gICAgMHg4RDhCOiAweDhDNkEsXG4gICAgMHg4RDhDOiAweDhGNUYsXG4gICAgMHg4RDhEOiAweDlFQjksXG4gICAgMHg4RDhFOiAweDUxNEIsXG4gICAgMHg4RDhGOiAweDUyM0IsXG4gICAgMHg4RDkwOiAweDU0NEEsXG4gICAgMHg4RDkxOiAweDU2RkQsXG4gICAgMHg4RDkyOiAweDdBNDAsXG4gICAgMHg4RDkzOiAweDkxNzcsXG4gICAgMHg4RDk0OiAweDlENjAsXG4gICAgMHg4RDk1OiAweDlFRDIsXG4gICAgMHg4RDk2OiAweDczNDQsXG4gICAgMHg4RDk3OiAweDZGMDksXG4gICAgMHg4RDk4OiAweDgxNzAsXG4gICAgMHg4RDk5OiAweDc1MTEsXG4gICAgMHg4RDlBOiAweDVGRkQsXG4gICAgMHg4RDlCOiAweDYwREEsXG4gICAgMHg4RDlDOiAweDlBQTgsXG4gICAgMHg4RDlEOiAweDcyREIsXG4gICAgMHg4RDlFOiAweDhGQkMsXG4gICAgMHg4RDlGOiAweDZCNjQsXG4gICAgMHg4REEwOiAweDk4MDMsXG4gICAgMHg4REExOiAweDRFQ0EsXG4gICAgMHg4REEyOiAweDU2RjAsXG4gICAgMHg4REEzOiAweDU3NjQsXG4gICAgMHg4REE0OiAweDU4QkUsXG4gICAgMHg4REE1OiAweDVBNUEsXG4gICAgMHg4REE2OiAweDYwNjgsXG4gICAgMHg4REE3OiAweDYxQzcsXG4gICAgMHg4REE4OiAweDY2MEYsXG4gICAgMHg4REE5OiAweDY2MDYsXG4gICAgMHg4REFBOiAweDY4MzksXG4gICAgMHg4REFCOiAweDY4QjEsXG4gICAgMHg4REFDOiAweDZERjcsXG4gICAgMHg4REFEOiAweDc1RDUsXG4gICAgMHg4REFFOiAweDdEM0EsXG4gICAgMHg4REFGOiAweDgyNkUsXG4gICAgMHg4REIwOiAweDlCNDIsXG4gICAgMHg4REIxOiAweDRFOUIsXG4gICAgMHg4REIyOiAweDRGNTAsXG4gICAgMHg4REIzOiAweDUzQzksXG4gICAgMHg4REI0OiAweDU1MDYsXG4gICAgMHg4REI1OiAweDVENkYsXG4gICAgMHg4REI2OiAweDVERTYsXG4gICAgMHg4REI3OiAweDVERUUsXG4gICAgMHg4REI4OiAweDY3RkIsXG4gICAgMHg4REI5OiAweDZDOTksXG4gICAgMHg4REJBOiAweDc0NzMsXG4gICAgMHg4REJCOiAweDc4MDIsXG4gICAgMHg4REJDOiAweDhBNTAsXG4gICAgMHg4REJEOiAweDkzOTYsXG4gICAgMHg4REJFOiAweDg4REYsXG4gICAgMHg4REJGOiAweDU3NTAsXG4gICAgMHg4REMwOiAweDVFQTcsXG4gICAgMHg4REMxOiAweDYzMkIsXG4gICAgMHg4REMyOiAweDUwQjUsXG4gICAgMHg4REMzOiAweDUwQUMsXG4gICAgMHg4REM0OiAweDUxOEQsXG4gICAgMHg4REM1OiAweDY3MDAsXG4gICAgMHg4REM2OiAweDU0QzksXG4gICAgMHg4REM3OiAweDU4NUUsXG4gICAgMHg4REM4OiAweDU5QkIsXG4gICAgMHg4REM5OiAweDVCQjAsXG4gICAgMHg4RENBOiAweDVGNjksXG4gICAgMHg4RENCOiAweDYyNEQsXG4gICAgMHg4RENDOiAweDYzQTEsXG4gICAgMHg4RENEOiAweDY4M0QsXG4gICAgMHg4RENFOiAweDZCNzMsXG4gICAgMHg4RENGOiAweDZFMDgsXG4gICAgMHg4REQwOiAweDcwN0QsXG4gICAgMHg4REQxOiAweDkxQzcsXG4gICAgMHg4REQyOiAweDcyODAsXG4gICAgMHg4REQzOiAweDc4MTUsXG4gICAgMHg4REQ0OiAweDc4MjYsXG4gICAgMHg4REQ1OiAweDc5NkQsXG4gICAgMHg4REQ2OiAweDY1OEUsXG4gICAgMHg4REQ3OiAweDdEMzAsXG4gICAgMHg4REQ4OiAweDgzREMsXG4gICAgMHg4REQ5OiAweDg4QzEsXG4gICAgMHg4RERBOiAweDhGMDksXG4gICAgMHg4RERCOiAweDk2OUIsXG4gICAgMHg4RERDOiAweDUyNjQsXG4gICAgMHg4REREOiAweDU3MjgsXG4gICAgMHg4RERFOiAweDY3NTAsXG4gICAgMHg4RERGOiAweDdGNkEsXG4gICAgMHg4REUwOiAweDhDQTEsXG4gICAgMHg4REUxOiAweDUxQjQsXG4gICAgMHg4REUyOiAweDU3NDIsXG4gICAgMHg4REUzOiAweDk2MkEsXG4gICAgMHg4REU0OiAweDU4M0EsXG4gICAgMHg4REU1OiAweDY5OEEsXG4gICAgMHg4REU2OiAweDgwQjQsXG4gICAgMHg4REU3OiAweDU0QjIsXG4gICAgMHg4REU4OiAweDVEMEUsXG4gICAgMHg4REU5OiAweDU3RkMsXG4gICAgMHg4REVBOiAweDc4OTUsXG4gICAgMHg4REVCOiAweDlERkEsXG4gICAgMHg4REVDOiAweDRGNUMsXG4gICAgMHg4REVEOiAweDUyNEEsXG4gICAgMHg4REVFOiAweDU0OEIsXG4gICAgMHg4REVGOiAweDY0M0UsXG4gICAgMHg4REYwOiAweDY2MjgsXG4gICAgMHg4REYxOiAweDY3MTQsXG4gICAgMHg4REYyOiAweDY3RjUsXG4gICAgMHg4REYzOiAweDdBODQsXG4gICAgMHg4REY0OiAweDdCNTYsXG4gICAgMHg4REY1OiAweDdEMjIsXG4gICAgMHg4REY2OiAweDkzMkYsXG4gICAgMHg4REY3OiAweDY4NUMsXG4gICAgMHg4REY4OiAweDlCQUQsXG4gICAgMHg4REY5OiAweDdCMzksXG4gICAgMHg4REZBOiAweDUzMTksXG4gICAgMHg4REZCOiAweDUxOEEsXG4gICAgMHg4REZDOiAweDUyMzcsXG4gICAgMHg4RTQwOiAweDVCREYsXG4gICAgMHg4RTQxOiAweDYyRjYsXG4gICAgMHg4RTQyOiAweDY0QUUsXG4gICAgMHg4RTQzOiAweDY0RTYsXG4gICAgMHg4RTQ0OiAweDY3MkQsXG4gICAgMHg4RTQ1OiAweDZCQkEsXG4gICAgMHg4RTQ2OiAweDg1QTksXG4gICAgMHg4RTQ3OiAweDk2RDEsXG4gICAgMHg4RTQ4OiAweDc2OTAsXG4gICAgMHg4RTQ5OiAweDlCRDYsXG4gICAgMHg4RTRBOiAweDYzNEMsXG4gICAgMHg4RTRCOiAweDkzMDYsXG4gICAgMHg4RTRDOiAweDlCQUIsXG4gICAgMHg4RTREOiAweDc2QkYsXG4gICAgMHg4RTRFOiAweDY2NTIsXG4gICAgMHg4RTRGOiAweDRFMDksXG4gICAgMHg4RTUwOiAweDUwOTgsXG4gICAgMHg4RTUxOiAweDUzQzIsXG4gICAgMHg4RTUyOiAweDVDNzEsXG4gICAgMHg4RTUzOiAweDYwRTgsXG4gICAgMHg4RTU0OiAweDY0OTIsXG4gICAgMHg4RTU1OiAweDY1NjMsXG4gICAgMHg4RTU2OiAweDY4NUYsXG4gICAgMHg4RTU3OiAweDcxRTYsXG4gICAgMHg4RTU4OiAweDczQ0EsXG4gICAgMHg4RTU5OiAweDc1MjMsXG4gICAgMHg4RTVBOiAweDdCOTcsXG4gICAgMHg4RTVCOiAweDdFODIsXG4gICAgMHg4RTVDOiAweDg2OTUsXG4gICAgMHg4RTVEOiAweDhCODMsXG4gICAgMHg4RTVFOiAweDhDREIsXG4gICAgMHg4RTVGOiAweDkxNzgsXG4gICAgMHg4RTYwOiAweDk5MTAsXG4gICAgMHg4RTYxOiAweDY1QUMsXG4gICAgMHg4RTYyOiAweDY2QUIsXG4gICAgMHg4RTYzOiAweDZCOEIsXG4gICAgMHg4RTY0OiAweDRFRDUsXG4gICAgMHg4RTY1OiAweDRFRDQsXG4gICAgMHg4RTY2OiAweDRGM0EsXG4gICAgMHg4RTY3OiAweDRGN0YsXG4gICAgMHg4RTY4OiAweDUyM0EsXG4gICAgMHg4RTY5OiAweDUzRjgsXG4gICAgMHg4RTZBOiAweDUzRjIsXG4gICAgMHg4RTZCOiAweDU1RTMsXG4gICAgMHg4RTZDOiAweDU2REIsXG4gICAgMHg4RTZEOiAweDU4RUIsXG4gICAgMHg4RTZFOiAweDU5Q0IsXG4gICAgMHg4RTZGOiAweDU5QzksXG4gICAgMHg4RTcwOiAweDU5RkYsXG4gICAgMHg4RTcxOiAweDVCNTAsXG4gICAgMHg4RTcyOiAweDVDNEQsXG4gICAgMHg4RTczOiAweDVFMDIsXG4gICAgMHg4RTc0OiAweDVFMkIsXG4gICAgMHg4RTc1OiAweDVGRDcsXG4gICAgMHg4RTc2OiAweDYwMUQsXG4gICAgMHg4RTc3OiAweDYzMDcsXG4gICAgMHg4RTc4OiAweDY1MkYsXG4gICAgMHg4RTc5OiAweDVCNUMsXG4gICAgMHg4RTdBOiAweDY1QUYsXG4gICAgMHg4RTdCOiAweDY1QkQsXG4gICAgMHg4RTdDOiAweDY1RTgsXG4gICAgMHg4RTdEOiAweDY3OUQsXG4gICAgMHg4RTdFOiAweDZCNjIsXG4gICAgMHg4RTgwOiAweDZCN0IsXG4gICAgMHg4RTgxOiAweDZDMEYsXG4gICAgMHg4RTgyOiAweDczNDUsXG4gICAgMHg4RTgzOiAweDc5NDksXG4gICAgMHg4RTg0OiAweDc5QzEsXG4gICAgMHg4RTg1OiAweDdDRjgsXG4gICAgMHg4RTg2OiAweDdEMTksXG4gICAgMHg4RTg3OiAweDdEMkIsXG4gICAgMHg4RTg4OiAweDgwQTIsXG4gICAgMHg4RTg5OiAweDgxMDIsXG4gICAgMHg4RThBOiAweDgxRjMsXG4gICAgMHg4RThCOiAweDg5OTYsXG4gICAgMHg4RThDOiAweDhBNUUsXG4gICAgMHg4RThEOiAweDhBNjksXG4gICAgMHg4RThFOiAweDhBNjYsXG4gICAgMHg4RThGOiAweDhBOEMsXG4gICAgMHg4RTkwOiAweDhBRUUsXG4gICAgMHg4RTkxOiAweDhDQzcsXG4gICAgMHg4RTkyOiAweDhDREMsXG4gICAgMHg4RTkzOiAweDk2Q0MsXG4gICAgMHg4RTk0OiAweDk4RkMsXG4gICAgMHg4RTk1OiAweDZCNkYsXG4gICAgMHg4RTk2OiAweDRFOEIsXG4gICAgMHg4RTk3OiAweDRGM0MsXG4gICAgMHg4RTk4OiAweDRGOEQsXG4gICAgMHg4RTk5OiAweDUxNTAsXG4gICAgMHg4RTlBOiAweDVCNTcsXG4gICAgMHg4RTlCOiAweDVCRkEsXG4gICAgMHg4RTlDOiAweDYxNDgsXG4gICAgMHg4RTlEOiAweDYzMDEsXG4gICAgMHg4RTlFOiAweDY2NDIsXG4gICAgMHg4RTlGOiAweDZCMjEsXG4gICAgMHg4RUEwOiAweDZFQ0IsXG4gICAgMHg4RUExOiAweDZDQkIsXG4gICAgMHg4RUEyOiAweDcyM0UsXG4gICAgMHg4RUEzOiAweDc0QkQsXG4gICAgMHg4RUE0OiAweDc1RDQsXG4gICAgMHg4RUE1OiAweDc4QzEsXG4gICAgMHg4RUE2OiAweDc5M0EsXG4gICAgMHg4RUE3OiAweDgwMEMsXG4gICAgMHg4RUE4OiAweDgwMzMsXG4gICAgMHg4RUE5OiAweDgxRUEsXG4gICAgMHg4RUFBOiAweDg0OTQsXG4gICAgMHg4RUFCOiAweDhGOUUsXG4gICAgMHg4RUFDOiAweDZDNTAsXG4gICAgMHg4RUFEOiAweDlFN0YsXG4gICAgMHg4RUFFOiAweDVGMEYsXG4gICAgMHg4RUFGOiAweDhCNTgsXG4gICAgMHg4RUIwOiAweDlEMkIsXG4gICAgMHg4RUIxOiAweDdBRkEsXG4gICAgMHg4RUIyOiAweDhFRjgsXG4gICAgMHg4RUIzOiAweDVCOEQsXG4gICAgMHg4RUI0OiAweDk2RUIsXG4gICAgMHg4RUI1OiAweDRFMDMsXG4gICAgMHg4RUI2OiAweDUzRjEsXG4gICAgMHg4RUI3OiAweDU3RjcsXG4gICAgMHg4RUI4OiAweDU5MzEsXG4gICAgMHg4RUI5OiAweDVBQzksXG4gICAgMHg4RUJBOiAweDVCQTQsXG4gICAgMHg4RUJCOiAweDYwODksXG4gICAgMHg4RUJDOiAweDZFN0YsXG4gICAgMHg4RUJEOiAweDZGMDYsXG4gICAgMHg4RUJFOiAweDc1QkUsXG4gICAgMHg4RUJGOiAweDhDRUEsXG4gICAgMHg4RUMwOiAweDVCOUYsXG4gICAgMHg4RUMxOiAweDg1MDAsXG4gICAgMHg4RUMyOiAweDdCRTAsXG4gICAgMHg4RUMzOiAweDUwNzIsXG4gICAgMHg4RUM0OiAweDY3RjQsXG4gICAgMHg4RUM1OiAweDgyOUQsXG4gICAgMHg4RUM2OiAweDVDNjEsXG4gICAgMHg4RUM3OiAweDg1NEEsXG4gICAgMHg4RUM4OiAweDdFMUUsXG4gICAgMHg4RUM5OiAweDgyMEUsXG4gICAgMHg4RUNBOiAweDUxOTksXG4gICAgMHg4RUNCOiAweDVDMDQsXG4gICAgMHg4RUNDOiAweDYzNjgsXG4gICAgMHg4RUNEOiAweDhENjYsXG4gICAgMHg4RUNFOiAweDY1OUMsXG4gICAgMHg4RUNGOiAweDcxNkUsXG4gICAgMHg4RUQwOiAweDc5M0UsXG4gICAgMHg4RUQxOiAweDdEMTcsXG4gICAgMHg4RUQyOiAweDgwMDUsXG4gICAgMHg4RUQzOiAweDhCMUQsXG4gICAgMHg4RUQ0OiAweDhFQ0EsXG4gICAgMHg4RUQ1OiAweDkwNkUsXG4gICAgMHg4RUQ2OiAweDg2QzcsXG4gICAgMHg4RUQ3OiAweDkwQUEsXG4gICAgMHg4RUQ4OiAweDUwMUYsXG4gICAgMHg4RUQ5OiAweDUyRkEsXG4gICAgMHg4RURBOiAweDVDM0EsXG4gICAgMHg4RURCOiAweDY3NTMsXG4gICAgMHg4RURDOiAweDcwN0MsXG4gICAgMHg4RUREOiAweDcyMzUsXG4gICAgMHg4RURFOiAweDkxNEMsXG4gICAgMHg4RURGOiAweDkxQzgsXG4gICAgMHg4RUUwOiAweDkzMkIsXG4gICAgMHg4RUUxOiAweDgyRTUsXG4gICAgMHg4RUUyOiAweDVCQzIsXG4gICAgMHg4RUUzOiAweDVGMzEsXG4gICAgMHg4RUU0OiAweDYwRjksXG4gICAgMHg4RUU1OiAweDRFM0IsXG4gICAgMHg4RUU2OiAweDUzRDYsXG4gICAgMHg4RUU3OiAweDVCODgsXG4gICAgMHg4RUU4OiAweDYyNEIsXG4gICAgMHg4RUU5OiAweDY3MzEsXG4gICAgMHg4RUVBOiAweDZCOEEsXG4gICAgMHg4RUVCOiAweDcyRTksXG4gICAgMHg4RUVDOiAweDczRTAsXG4gICAgMHg4RUVEOiAweDdBMkUsXG4gICAgMHg4RUVFOiAweDgxNkIsXG4gICAgMHg4RUVGOiAweDhEQTMsXG4gICAgMHg4RUYwOiAweDkxNTIsXG4gICAgMHg4RUYxOiAweDk5OTYsXG4gICAgMHg4RUYyOiAweDUxMTIsXG4gICAgMHg4RUYzOiAweDUzRDcsXG4gICAgMHg4RUY0OiAweDU0NkEsXG4gICAgMHg4RUY1OiAweDVCRkYsXG4gICAgMHg4RUY2OiAweDYzODgsXG4gICAgMHg4RUY3OiAweDZBMzksXG4gICAgMHg4RUY4OiAweDdEQUMsXG4gICAgMHg4RUY5OiAweDk3MDAsXG4gICAgMHg4RUZBOiAweDU2REEsXG4gICAgMHg4RUZCOiAweDUzQ0UsXG4gICAgMHg4RUZDOiAweDU0NjgsXG4gICAgMHg4RjQwOiAweDVCOTcsXG4gICAgMHg4RjQxOiAweDVDMzEsXG4gICAgMHg4RjQyOiAweDVEREUsXG4gICAgMHg4RjQzOiAweDRGRUUsXG4gICAgMHg4RjQ0OiAweDYxMDEsXG4gICAgMHg4RjQ1OiAweDYyRkUsXG4gICAgMHg4RjQ2OiAweDZEMzIsXG4gICAgMHg4RjQ3OiAweDc5QzAsXG4gICAgMHg4RjQ4OiAweDc5Q0IsXG4gICAgMHg4RjQ5OiAweDdENDIsXG4gICAgMHg4RjRBOiAweDdFNEQsXG4gICAgMHg4RjRCOiAweDdGRDIsXG4gICAgMHg4RjRDOiAweDgxRUQsXG4gICAgMHg4RjREOiAweDgyMUYsXG4gICAgMHg4RjRFOiAweDg0OTAsXG4gICAgMHg4RjRGOiAweDg4NDYsXG4gICAgMHg4RjUwOiAweDg5NzIsXG4gICAgMHg4RjUxOiAweDhCOTAsXG4gICAgMHg4RjUyOiAweDhFNzQsXG4gICAgMHg4RjUzOiAweDhGMkYsXG4gICAgMHg4RjU0OiAweDkwMzEsXG4gICAgMHg4RjU1OiAweDkxNEIsXG4gICAgMHg4RjU2OiAweDkxNkMsXG4gICAgMHg4RjU3OiAweDk2QzYsXG4gICAgMHg4RjU4OiAweDkxOUMsXG4gICAgMHg4RjU5OiAweDRFQzAsXG4gICAgMHg4RjVBOiAweDRGNEYsXG4gICAgMHg4RjVCOiAweDUxNDUsXG4gICAgMHg4RjVDOiAweDUzNDEsXG4gICAgMHg4RjVEOiAweDVGOTMsXG4gICAgMHg4RjVFOiAweDYyMEUsXG4gICAgMHg4RjVGOiAweDY3RDQsXG4gICAgMHg4RjYwOiAweDZDNDEsXG4gICAgMHg4RjYxOiAweDZFMEIsXG4gICAgMHg4RjYyOiAweDczNjMsXG4gICAgMHg4RjYzOiAweDdFMjYsXG4gICAgMHg4RjY0OiAweDkxQ0QsXG4gICAgMHg4RjY1OiAweDkyODMsXG4gICAgMHg4RjY2OiAweDUzRDQsXG4gICAgMHg4RjY3OiAweDU5MTksXG4gICAgMHg4RjY4OiAweDVCQkYsXG4gICAgMHg4RjY5OiAweDZERDEsXG4gICAgMHg4RjZBOiAweDc5NUQsXG4gICAgMHg4RjZCOiAweDdFMkUsXG4gICAgMHg4RjZDOiAweDdDOUIsXG4gICAgMHg4RjZEOiAweDU4N0UsXG4gICAgMHg4RjZFOiAweDcxOUYsXG4gICAgMHg4RjZGOiAweDUxRkEsXG4gICAgMHg4RjcwOiAweDg4NTMsXG4gICAgMHg4RjcxOiAweDhGRjAsXG4gICAgMHg4RjcyOiAweDRGQ0EsXG4gICAgMHg4RjczOiAweDVDRkIsXG4gICAgMHg4Rjc0OiAweDY2MjUsXG4gICAgMHg4Rjc1OiAweDc3QUMsXG4gICAgMHg4Rjc2OiAweDdBRTMsXG4gICAgMHg4Rjc3OiAweDgyMUMsXG4gICAgMHg4Rjc4OiAweDk5RkYsXG4gICAgMHg4Rjc5OiAweDUxQzYsXG4gICAgMHg4RjdBOiAweDVGQUEsXG4gICAgMHg4RjdCOiAweDY1RUMsXG4gICAgMHg4RjdDOiAweDY5NkYsXG4gICAgMHg4RjdEOiAweDZCODksXG4gICAgMHg4RjdFOiAweDZERjMsXG4gICAgMHg4RjgwOiAweDZFOTYsXG4gICAgMHg4RjgxOiAweDZGNjQsXG4gICAgMHg4RjgyOiAweDc2RkUsXG4gICAgMHg4RjgzOiAweDdEMTQsXG4gICAgMHg4Rjg0OiAweDVERTEsXG4gICAgMHg4Rjg1OiAweDkwNzUsXG4gICAgMHg4Rjg2OiAweDkxODcsXG4gICAgMHg4Rjg3OiAweDk4MDYsXG4gICAgMHg4Rjg4OiAweDUxRTYsXG4gICAgMHg4Rjg5OiAweDUyMUQsXG4gICAgMHg4RjhBOiAweDYyNDAsXG4gICAgMHg4RjhCOiAweDY2OTEsXG4gICAgMHg4RjhDOiAweDY2RDksXG4gICAgMHg4RjhEOiAweDZFMUEsXG4gICAgMHg4RjhFOiAweDVFQjYsXG4gICAgMHg4RjhGOiAweDdERDIsXG4gICAgMHg4RjkwOiAweDdGNzIsXG4gICAgMHg4RjkxOiAweDY2RjgsXG4gICAgMHg4RjkyOiAweDg1QUYsXG4gICAgMHg4RjkzOiAweDg1RjcsXG4gICAgMHg4Rjk0OiAweDhBRjgsXG4gICAgMHg4Rjk1OiAweDUyQTksXG4gICAgMHg4Rjk2OiAweDUzRDksXG4gICAgMHg4Rjk3OiAweDU5NzMsXG4gICAgMHg4Rjk4OiAweDVFOEYsXG4gICAgMHg4Rjk5OiAweDVGOTAsXG4gICAgMHg4RjlBOiAweDYwNTUsXG4gICAgMHg4RjlCOiAweDkyRTQsXG4gICAgMHg4RjlDOiAweDk2NjQsXG4gICAgMHg4RjlEOiAweDUwQjcsXG4gICAgMHg4RjlFOiAweDUxMUYsXG4gICAgMHg4RjlGOiAweDUyREQsXG4gICAgMHg4RkEwOiAweDUzMjAsXG4gICAgMHg4RkExOiAweDUzNDcsXG4gICAgMHg4RkEyOiAweDUzRUMsXG4gICAgMHg4RkEzOiAweDU0RTgsXG4gICAgMHg4RkE0OiAweDU1NDYsXG4gICAgMHg4RkE1OiAweDU1MzEsXG4gICAgMHg4RkE2OiAweDU2MTcsXG4gICAgMHg4RkE3OiAweDU5NjgsXG4gICAgMHg4RkE4OiAweDU5QkUsXG4gICAgMHg4RkE5OiAweDVBM0MsXG4gICAgMHg4RkFBOiAweDVCQjUsXG4gICAgMHg4RkFCOiAweDVDMDYsXG4gICAgMHg4RkFDOiAweDVDMEYsXG4gICAgMHg4RkFEOiAweDVDMTEsXG4gICAgMHg4RkFFOiAweDVDMUEsXG4gICAgMHg4RkFGOiAweDVFODQsXG4gICAgMHg4RkIwOiAweDVFOEEsXG4gICAgMHg4RkIxOiAweDVFRTAsXG4gICAgMHg4RkIyOiAweDVGNzAsXG4gICAgMHg4RkIzOiAweDYyN0YsXG4gICAgMHg4RkI0OiAweDYyODQsXG4gICAgMHg4RkI1OiAweDYyREIsXG4gICAgMHg4RkI2OiAweDYzOEMsXG4gICAgMHg4RkI3OiAweDYzNzcsXG4gICAgMHg4RkI4OiAweDY2MDcsXG4gICAgMHg4RkI5OiAweDY2MEMsXG4gICAgMHg4RkJBOiAweDY2MkQsXG4gICAgMHg4RkJCOiAweDY2NzYsXG4gICAgMHg4RkJDOiAweDY3N0UsXG4gICAgMHg4RkJEOiAweDY4QTIsXG4gICAgMHg4RkJFOiAweDZBMUYsXG4gICAgMHg4RkJGOiAweDZBMzUsXG4gICAgMHg4RkMwOiAweDZDQkMsXG4gICAgMHg4RkMxOiAweDZEODgsXG4gICAgMHg4RkMyOiAweDZFMDksXG4gICAgMHg4RkMzOiAweDZFNTgsXG4gICAgMHg4RkM0OiAweDcxM0MsXG4gICAgMHg4RkM1OiAweDcxMjYsXG4gICAgMHg4RkM2OiAweDcxNjcsXG4gICAgMHg4RkM3OiAweDc1QzcsXG4gICAgMHg4RkM4OiAweDc3MDEsXG4gICAgMHg4RkM5OiAweDc4NUQsXG4gICAgMHg4RkNBOiAweDc5MDEsXG4gICAgMHg4RkNCOiAweDc5NjUsXG4gICAgMHg4RkNDOiAweDc5RjAsXG4gICAgMHg4RkNEOiAweDdBRTAsXG4gICAgMHg4RkNFOiAweDdCMTEsXG4gICAgMHg4RkNGOiAweDdDQTcsXG4gICAgMHg4RkQwOiAweDdEMzksXG4gICAgMHg4RkQxOiAweDgwOTYsXG4gICAgMHg4RkQyOiAweDgzRDYsXG4gICAgMHg4RkQzOiAweDg0OEIsXG4gICAgMHg4RkQ0OiAweDg1NDksXG4gICAgMHg4RkQ1OiAweDg4NUQsXG4gICAgMHg4RkQ2OiAweDg4RjMsXG4gICAgMHg4RkQ3OiAweDhBMUYsXG4gICAgMHg4RkQ4OiAweDhBM0MsXG4gICAgMHg4RkQ5OiAweDhBNTQsXG4gICAgMHg4RkRBOiAweDhBNzMsXG4gICAgMHg4RkRCOiAweDhDNjEsXG4gICAgMHg4RkRDOiAweDhDREUsXG4gICAgMHg4RkREOiAweDkxQTQsXG4gICAgMHg4RkRFOiAweDkyNjYsXG4gICAgMHg4RkRGOiAweDkzN0UsXG4gICAgMHg4RkUwOiAweDk0MTgsXG4gICAgMHg4RkUxOiAweDk2OUMsXG4gICAgMHg4RkUyOiAweDk3OTgsXG4gICAgMHg4RkUzOiAweDRFMEEsXG4gICAgMHg4RkU0OiAweDRFMDgsXG4gICAgMHg4RkU1OiAweDRFMUUsXG4gICAgMHg4RkU2OiAweDRFNTcsXG4gICAgMHg4RkU3OiAweDUxOTcsXG4gICAgMHg4RkU4OiAweDUyNzAsXG4gICAgMHg4RkU5OiAweDU3Q0UsXG4gICAgMHg4RkVBOiAweDU4MzQsXG4gICAgMHg4RkVCOiAweDU4Q0MsXG4gICAgMHg4RkVDOiAweDVCMjIsXG4gICAgMHg4RkVEOiAweDVFMzgsXG4gICAgMHg4RkVFOiAweDYwQzUsXG4gICAgMHg4RkVGOiAweDY0RkUsXG4gICAgMHg4RkYwOiAweDY3NjEsXG4gICAgMHg4RkYxOiAweDY3NTYsXG4gICAgMHg4RkYyOiAweDZENDQsXG4gICAgMHg4RkYzOiAweDcyQjYsXG4gICAgMHg4RkY0OiAweDc1NzMsXG4gICAgMHg4RkY1OiAweDdBNjMsXG4gICAgMHg4RkY2OiAweDg0QjgsXG4gICAgMHg4RkY3OiAweDhCNzIsXG4gICAgMHg4RkY4OiAweDkxQjgsXG4gICAgMHg4RkY5OiAweDkzMjAsXG4gICAgMHg4RkZBOiAweDU2MzEsXG4gICAgMHg4RkZCOiAweDU3RjQsXG4gICAgMHg4RkZDOiAweDk4RkUsXG4gICAgMHg5MDQwOiAweDYyRUQsXG4gICAgMHg5MDQxOiAweDY5MEQsXG4gICAgMHg5MDQyOiAweDZCOTYsXG4gICAgMHg5MDQzOiAweDcxRUQsXG4gICAgMHg5MDQ0OiAweDdFNTQsXG4gICAgMHg5MDQ1OiAweDgwNzcsXG4gICAgMHg5MDQ2OiAweDgyNzIsXG4gICAgMHg5MDQ3OiAweDg5RTYsXG4gICAgMHg5MDQ4OiAweDk4REYsXG4gICAgMHg5MDQ5OiAweDg3NTUsXG4gICAgMHg5MDRBOiAweDhGQjEsXG4gICAgMHg5MDRCOiAweDVDM0IsXG4gICAgMHg5MDRDOiAweDRGMzgsXG4gICAgMHg5MDREOiAweDRGRTEsXG4gICAgMHg5MDRFOiAweDRGQjUsXG4gICAgMHg5MDRGOiAweDU1MDcsXG4gICAgMHg5MDUwOiAweDVBMjAsXG4gICAgMHg5MDUxOiAweDVCREQsXG4gICAgMHg5MDUyOiAweDVCRTksXG4gICAgMHg5MDUzOiAweDVGQzMsXG4gICAgMHg5MDU0OiAweDYxNEUsXG4gICAgMHg5MDU1OiAweDYzMkYsXG4gICAgMHg5MDU2OiAweDY1QjAsXG4gICAgMHg5MDU3OiAweDY2NEIsXG4gICAgMHg5MDU4OiAweDY4RUUsXG4gICAgMHg5MDU5OiAweDY5OUIsXG4gICAgMHg5MDVBOiAweDZENzgsXG4gICAgMHg5MDVCOiAweDZERjEsXG4gICAgMHg5MDVDOiAweDc1MzMsXG4gICAgMHg5MDVEOiAweDc1QjksXG4gICAgMHg5MDVFOiAweDc3MUYsXG4gICAgMHg5MDVGOiAweDc5NUUsXG4gICAgMHg5MDYwOiAweDc5RTYsXG4gICAgMHg5MDYxOiAweDdEMzMsXG4gICAgMHg5MDYyOiAweDgxRTMsXG4gICAgMHg5MDYzOiAweDgyQUYsXG4gICAgMHg5MDY0OiAweDg1QUEsXG4gICAgMHg5MDY1OiAweDg5QUEsXG4gICAgMHg5MDY2OiAweDhBM0EsXG4gICAgMHg5MDY3OiAweDhFQUIsXG4gICAgMHg5MDY4OiAweDhGOUIsXG4gICAgMHg5MDY5OiAweDkwMzIsXG4gICAgMHg5MDZBOiAweDkxREQsXG4gICAgMHg5MDZCOiAweDk3MDcsXG4gICAgMHg5MDZDOiAweDRFQkEsXG4gICAgMHg5MDZEOiAweDRFQzEsXG4gICAgMHg5MDZFOiAweDUyMDMsXG4gICAgMHg5MDZGOiAweDU4NzUsXG4gICAgMHg5MDcwOiAweDU4RUMsXG4gICAgMHg5MDcxOiAweDVDMEIsXG4gICAgMHg5MDcyOiAweDc1MUEsXG4gICAgMHg5MDczOiAweDVDM0QsXG4gICAgMHg5MDc0OiAweDgxNEUsXG4gICAgMHg5MDc1OiAweDhBMEEsXG4gICAgMHg5MDc2OiAweDhGQzUsXG4gICAgMHg5MDc3OiAweDk2NjMsXG4gICAgMHg5MDc4OiAweDk3NkQsXG4gICAgMHg5MDc5OiAweDdCMjUsXG4gICAgMHg5MDdBOiAweDhBQ0YsXG4gICAgMHg5MDdCOiAweDk4MDgsXG4gICAgMHg5MDdDOiAweDkxNjIsXG4gICAgMHg5MDdEOiAweDU2RjMsXG4gICAgMHg5MDdFOiAweDUzQTgsXG4gICAgMHg5MDgwOiAweDkwMTcsXG4gICAgMHg5MDgxOiAweDU0MzksXG4gICAgMHg5MDgyOiAweDU3ODIsXG4gICAgMHg5MDgzOiAweDVFMjUsXG4gICAgMHg5MDg0OiAweDYzQTgsXG4gICAgMHg5MDg1OiAweDZDMzQsXG4gICAgMHg5MDg2OiAweDcwOEEsXG4gICAgMHg5MDg3OiAweDc3NjEsXG4gICAgMHg5MDg4OiAweDdDOEIsXG4gICAgMHg5MDg5OiAweDdGRTAsXG4gICAgMHg5MDhBOiAweDg4NzAsXG4gICAgMHg5MDhCOiAweDkwNDIsXG4gICAgMHg5MDhDOiAweDkxNTQsXG4gICAgMHg5MDhEOiAweDkzMTAsXG4gICAgMHg5MDhFOiAweDkzMTgsXG4gICAgMHg5MDhGOiAweDk2OEYsXG4gICAgMHg5MDkwOiAweDc0NUUsXG4gICAgMHg5MDkxOiAweDlBQzQsXG4gICAgMHg5MDkyOiAweDVEMDcsXG4gICAgMHg5MDkzOiAweDVENjksXG4gICAgMHg5MDk0OiAweDY1NzAsXG4gICAgMHg5MDk1OiAweDY3QTIsXG4gICAgMHg5MDk2OiAweDhEQTgsXG4gICAgMHg5MDk3OiAweDk2REIsXG4gICAgMHg5MDk4OiAweDYzNkUsXG4gICAgMHg5MDk5OiAweDY3NDksXG4gICAgMHg5MDlBOiAweDY5MTksXG4gICAgMHg5MDlCOiAweDgzQzUsXG4gICAgMHg5MDlDOiAweDk4MTcsXG4gICAgMHg5MDlEOiAweDk2QzAsXG4gICAgMHg5MDlFOiAweDg4RkUsXG4gICAgMHg5MDlGOiAweDZGODQsXG4gICAgMHg5MEEwOiAweDY0N0EsXG4gICAgMHg5MEExOiAweDVCRjgsXG4gICAgMHg5MEEyOiAweDRFMTYsXG4gICAgMHg5MEEzOiAweDcwMkMsXG4gICAgMHg5MEE0OiAweDc1NUQsXG4gICAgMHg5MEE1OiAweDY2MkYsXG4gICAgMHg5MEE2OiAweDUxQzQsXG4gICAgMHg5MEE3OiAweDUyMzYsXG4gICAgMHg5MEE4OiAweDUyRTIsXG4gICAgMHg5MEE5OiAweDU5RDMsXG4gICAgMHg5MEFBOiAweDVGODEsXG4gICAgMHg5MEFCOiAweDYwMjcsXG4gICAgMHg5MEFDOiAweDYyMTAsXG4gICAgMHg5MEFEOiAweDY1M0YsXG4gICAgMHg5MEFFOiAweDY1NzQsXG4gICAgMHg5MEFGOiAweDY2MUYsXG4gICAgMHg5MEIwOiAweDY2NzQsXG4gICAgMHg5MEIxOiAweDY4RjIsXG4gICAgMHg5MEIyOiAweDY4MTYsXG4gICAgMHg5MEIzOiAweDZCNjMsXG4gICAgMHg5MEI0OiAweDZFMDUsXG4gICAgMHg5MEI1OiAweDcyNzIsXG4gICAgMHg5MEI2OiAweDc1MUYsXG4gICAgMHg5MEI3OiAweDc2REIsXG4gICAgMHg5MEI4OiAweDdDQkUsXG4gICAgMHg5MEI5OiAweDgwNTYsXG4gICAgMHg5MEJBOiAweDU4RjAsXG4gICAgMHg5MEJCOiAweDg4RkQsXG4gICAgMHg5MEJDOiAweDg5N0YsXG4gICAgMHg5MEJEOiAweDhBQTAsXG4gICAgMHg5MEJFOiAweDhBOTMsXG4gICAgMHg5MEJGOiAweDhBQ0IsXG4gICAgMHg5MEMwOiAweDkwMUQsXG4gICAgMHg5MEMxOiAweDkxOTIsXG4gICAgMHg5MEMyOiAweDk3NTIsXG4gICAgMHg5MEMzOiAweDk3NTksXG4gICAgMHg5MEM0OiAweDY1ODksXG4gICAgMHg5MEM1OiAweDdBMEUsXG4gICAgMHg5MEM2OiAweDgxMDYsXG4gICAgMHg5MEM3OiAweDk2QkIsXG4gICAgMHg5MEM4OiAweDVFMkQsXG4gICAgMHg5MEM5OiAweDYwREMsXG4gICAgMHg5MENBOiAweDYyMUEsXG4gICAgMHg5MENCOiAweDY1QTUsXG4gICAgMHg5MENDOiAweDY2MTQsXG4gICAgMHg5MENEOiAweDY3OTAsXG4gICAgMHg5MENFOiAweDc3RjMsXG4gICAgMHg5MENGOiAweDdBNEQsXG4gICAgMHg5MEQwOiAweDdDNEQsXG4gICAgMHg5MEQxOiAweDdFM0UsXG4gICAgMHg5MEQyOiAweDgxMEEsXG4gICAgMHg5MEQzOiAweDhDQUMsXG4gICAgMHg5MEQ0OiAweDhENjQsXG4gICAgMHg5MEQ1OiAweDhERTEsXG4gICAgMHg5MEQ2OiAweDhFNUYsXG4gICAgMHg5MEQ3OiAweDc4QTksXG4gICAgMHg5MEQ4OiAweDUyMDcsXG4gICAgMHg5MEQ5OiAweDYyRDksXG4gICAgMHg5MERBOiAweDYzQTUsXG4gICAgMHg5MERCOiAweDY0NDIsXG4gICAgMHg5MERDOiAweDYyOTgsXG4gICAgMHg5MEREOiAweDhBMkQsXG4gICAgMHg5MERFOiAweDdBODMsXG4gICAgMHg5MERGOiAweDdCQzAsXG4gICAgMHg5MEUwOiAweDhBQUMsXG4gICAgMHg5MEUxOiAweDk2RUEsXG4gICAgMHg5MEUyOiAweDdENzYsXG4gICAgMHg5MEUzOiAweDgyMEMsXG4gICAgMHg5MEU0OiAweDg3NDksXG4gICAgMHg5MEU1OiAweDRFRDksXG4gICAgMHg5MEU2OiAweDUxNDgsXG4gICAgMHg5MEU3OiAweDUzNDMsXG4gICAgMHg5MEU4OiAweDUzNjAsXG4gICAgMHg5MEU5OiAweDVCQTMsXG4gICAgMHg5MEVBOiAweDVDMDIsXG4gICAgMHg5MEVCOiAweDVDMTYsXG4gICAgMHg5MEVDOiAweDVEREQsXG4gICAgMHg5MEVEOiAweDYyMjYsXG4gICAgMHg5MEVFOiAweDYyNDcsXG4gICAgMHg5MEVGOiAweDY0QjAsXG4gICAgMHg5MEYwOiAweDY4MTMsXG4gICAgMHg5MEYxOiAweDY4MzQsXG4gICAgMHg5MEYyOiAweDZDQzksXG4gICAgMHg5MEYzOiAweDZENDUsXG4gICAgMHg5MEY0OiAweDZEMTcsXG4gICAgMHg5MEY1OiAweDY3RDMsXG4gICAgMHg5MEY2OiAweDZGNUMsXG4gICAgMHg5MEY3OiAweDcxNEUsXG4gICAgMHg5MEY4OiAweDcxN0QsXG4gICAgMHg5MEY5OiAweDY1Q0IsXG4gICAgMHg5MEZBOiAweDdBN0YsXG4gICAgMHg5MEZCOiAweDdCQUQsXG4gICAgMHg5MEZDOiAweDdEREEsXG4gICAgMHg5MTQwOiAweDdFNEEsXG4gICAgMHg5MTQxOiAweDdGQTgsXG4gICAgMHg5MTQyOiAweDgxN0EsXG4gICAgMHg5MTQzOiAweDgyMUIsXG4gICAgMHg5MTQ0OiAweDgyMzksXG4gICAgMHg5MTQ1OiAweDg1QTYsXG4gICAgMHg5MTQ2OiAweDhBNkUsXG4gICAgMHg5MTQ3OiAweDhDQ0UsXG4gICAgMHg5MTQ4OiAweDhERjUsXG4gICAgMHg5MTQ5OiAweDkwNzgsXG4gICAgMHg5MTRBOiAweDkwNzcsXG4gICAgMHg5MTRCOiAweDkyQUQsXG4gICAgMHg5MTRDOiAweDkyOTEsXG4gICAgMHg5MTREOiAweDk1ODMsXG4gICAgMHg5MTRFOiAweDlCQUUsXG4gICAgMHg5MTRGOiAweDUyNEQsXG4gICAgMHg5MTUwOiAweDU1ODQsXG4gICAgMHg5MTUxOiAweDZGMzgsXG4gICAgMHg5MTUyOiAweDcxMzYsXG4gICAgMHg5MTUzOiAweDUxNjgsXG4gICAgMHg5MTU0OiAweDc5ODUsXG4gICAgMHg5MTU1OiAweDdFNTUsXG4gICAgMHg5MTU2OiAweDgxQjMsXG4gICAgMHg5MTU3OiAweDdDQ0UsXG4gICAgMHg5MTU4OiAweDU2NEMsXG4gICAgMHg5MTU5OiAweDU4NTEsXG4gICAgMHg5MTVBOiAweDVDQTgsXG4gICAgMHg5MTVCOiAweDYzQUEsXG4gICAgMHg5MTVDOiAweDY2RkUsXG4gICAgMHg5MTVEOiAweDY2RkQsXG4gICAgMHg5MTVFOiAweDY5NUEsXG4gICAgMHg5MTVGOiAweDcyRDksXG4gICAgMHg5MTYwOiAweDc1OEYsXG4gICAgMHg5MTYxOiAweDc1OEUsXG4gICAgMHg5MTYyOiAweDc5MEUsXG4gICAgMHg5MTYzOiAweDc5NTYsXG4gICAgMHg5MTY0OiAweDc5REYsXG4gICAgMHg5MTY1OiAweDdDOTcsXG4gICAgMHg5MTY2OiAweDdEMjAsXG4gICAgMHg5MTY3OiAweDdENDQsXG4gICAgMHg5MTY4OiAweDg2MDcsXG4gICAgMHg5MTY5OiAweDhBMzQsXG4gICAgMHg5MTZBOiAweDk2M0IsXG4gICAgMHg5MTZCOiAweDkwNjEsXG4gICAgMHg5MTZDOiAweDlGMjAsXG4gICAgMHg5MTZEOiAweDUwRTcsXG4gICAgMHg5MTZFOiAweDUyNzUsXG4gICAgMHg5MTZGOiAweDUzQ0MsXG4gICAgMHg5MTcwOiAweDUzRTIsXG4gICAgMHg5MTcxOiAweDUwMDksXG4gICAgMHg5MTcyOiAweDU1QUEsXG4gICAgMHg5MTczOiAweDU4RUUsXG4gICAgMHg5MTc0OiAweDU5NEYsXG4gICAgMHg5MTc1OiAweDcyM0QsXG4gICAgMHg5MTc2OiAweDVCOEIsXG4gICAgMHg5MTc3OiAweDVDNjQsXG4gICAgMHg5MTc4OiAweDUzMUQsXG4gICAgMHg5MTc5OiAweDYwRTMsXG4gICAgMHg5MTdBOiAweDYwRjMsXG4gICAgMHg5MTdCOiAweDYzNUMsXG4gICAgMHg5MTdDOiAweDYzODMsXG4gICAgMHg5MTdEOiAweDYzM0YsXG4gICAgMHg5MTdFOiAweDYzQkIsXG4gICAgMHg5MTgwOiAweDY0Q0QsXG4gICAgMHg5MTgxOiAweDY1RTksXG4gICAgMHg5MTgyOiAweDY2RjksXG4gICAgMHg5MTgzOiAweDVERTMsXG4gICAgMHg5MTg0OiAweDY5Q0QsXG4gICAgMHg5MTg1OiAweDY5RkQsXG4gICAgMHg5MTg2OiAweDZGMTUsXG4gICAgMHg5MTg3OiAweDcxRTUsXG4gICAgMHg5MTg4OiAweDRFODksXG4gICAgMHg5MTg5OiAweDc1RTksXG4gICAgMHg5MThBOiAweDc2RjgsXG4gICAgMHg5MThCOiAweDdBOTMsXG4gICAgMHg5MThDOiAweDdDREYsXG4gICAgMHg5MThEOiAweDdEQ0YsXG4gICAgMHg5MThFOiAweDdEOUMsXG4gICAgMHg5MThGOiAweDgwNjEsXG4gICAgMHg5MTkwOiAweDgzNDksXG4gICAgMHg5MTkxOiAweDgzNTgsXG4gICAgMHg5MTkyOiAweDg0NkMsXG4gICAgMHg5MTkzOiAweDg0QkMsXG4gICAgMHg5MTk0OiAweDg1RkIsXG4gICAgMHg5MTk1OiAweDg4QzUsXG4gICAgMHg5MTk2OiAweDhENzAsXG4gICAgMHg5MTk3OiAweDkwMDEsXG4gICAgMHg5MTk4OiAweDkwNkQsXG4gICAgMHg5MTk5OiAweDkzOTcsXG4gICAgMHg5MTlBOiAweDk3MUMsXG4gICAgMHg5MTlCOiAweDlBMTIsXG4gICAgMHg5MTlDOiAweDUwQ0YsXG4gICAgMHg5MTlEOiAweDU4OTcsXG4gICAgMHg5MTlFOiAweDYxOEUsXG4gICAgMHg5MTlGOiAweDgxRDMsXG4gICAgMHg5MUEwOiAweDg1MzUsXG4gICAgMHg5MUExOiAweDhEMDgsXG4gICAgMHg5MUEyOiAweDkwMjAsXG4gICAgMHg5MUEzOiAweDRGQzMsXG4gICAgMHg5MUE0OiAweDUwNzQsXG4gICAgMHg5MUE1OiAweDUyNDcsXG4gICAgMHg5MUE2OiAweDUzNzMsXG4gICAgMHg5MUE3OiAweDYwNkYsXG4gICAgMHg5MUE4OiAweDYzNDksXG4gICAgMHg5MUE5OiAweDY3NUYsXG4gICAgMHg5MUFBOiAweDZFMkMsXG4gICAgMHg5MUFCOiAweDhEQjMsXG4gICAgMHg5MUFDOiAweDkwMUYsXG4gICAgMHg5MUFEOiAweDRGRDcsXG4gICAgMHg5MUFFOiAweDVDNUUsXG4gICAgMHg5MUFGOiAweDhDQ0EsXG4gICAgMHg5MUIwOiAweDY1Q0YsXG4gICAgMHg5MUIxOiAweDdEOUEsXG4gICAgMHg5MUIyOiAweDUzNTIsXG4gICAgMHg5MUIzOiAweDg4OTYsXG4gICAgMHg5MUI0OiAweDUxNzYsXG4gICAgMHg5MUI1OiAweDYzQzMsXG4gICAgMHg5MUI2OiAweDVCNTgsXG4gICAgMHg5MUI3OiAweDVCNkIsXG4gICAgMHg5MUI4OiAweDVDMEEsXG4gICAgMHg5MUI5OiAweDY0MEQsXG4gICAgMHg5MUJBOiAweDY3NTEsXG4gICAgMHg5MUJCOiAweDkwNUMsXG4gICAgMHg5MUJDOiAweDRFRDYsXG4gICAgMHg5MUJEOiAweDU5MUEsXG4gICAgMHg5MUJFOiAweDU5MkEsXG4gICAgMHg5MUJGOiAweDZDNzAsXG4gICAgMHg5MUMwOiAweDhBNTEsXG4gICAgMHg5MUMxOiAweDU1M0UsXG4gICAgMHg5MUMyOiAweDU4MTUsXG4gICAgMHg5MUMzOiAweDU5QTUsXG4gICAgMHg5MUM0OiAweDYwRjAsXG4gICAgMHg5MUM1OiAweDYyNTMsXG4gICAgMHg5MUM2OiAweDY3QzEsXG4gICAgMHg5MUM3OiAweDgyMzUsXG4gICAgMHg5MUM4OiAweDY5NTUsXG4gICAgMHg5MUM5OiAweDk2NDAsXG4gICAgMHg5MUNBOiAweDk5QzQsXG4gICAgMHg5MUNCOiAweDlBMjgsXG4gICAgMHg5MUNDOiAweDRGNTMsXG4gICAgMHg5MUNEOiAweDU4MDYsXG4gICAgMHg5MUNFOiAweDVCRkUsXG4gICAgMHg5MUNGOiAweDgwMTAsXG4gICAgMHg5MUQwOiAweDVDQjEsXG4gICAgMHg5MUQxOiAweDVFMkYsXG4gICAgMHg5MUQyOiAweDVGODUsXG4gICAgMHg5MUQzOiAweDYwMjAsXG4gICAgMHg5MUQ0OiAweDYxNEIsXG4gICAgMHg5MUQ1OiAweDYyMzQsXG4gICAgMHg5MUQ2OiAweDY2RkYsXG4gICAgMHg5MUQ3OiAweDZDRjAsXG4gICAgMHg5MUQ4OiAweDZFREUsXG4gICAgMHg5MUQ5OiAweDgwQ0UsXG4gICAgMHg5MURBOiAweDgxN0YsXG4gICAgMHg5MURCOiAweDgyRDQsXG4gICAgMHg5MURDOiAweDg4OEIsXG4gICAgMHg5MUREOiAweDhDQjgsXG4gICAgMHg5MURFOiAweDkwMDAsXG4gICAgMHg5MURGOiAweDkwMkUsXG4gICAgMHg5MUUwOiAweDk2OEEsXG4gICAgMHg5MUUxOiAweDlFREIsXG4gICAgMHg5MUUyOiAweDlCREIsXG4gICAgMHg5MUUzOiAweDRFRTMsXG4gICAgMHg5MUU0OiAweDUzRjAsXG4gICAgMHg5MUU1OiAweDU5MjcsXG4gICAgMHg5MUU2OiAweDdCMkMsXG4gICAgMHg5MUU3OiAweDkxOEQsXG4gICAgMHg5MUU4OiAweDk4NEMsXG4gICAgMHg5MUU5OiAweDlERjksXG4gICAgMHg5MUVBOiAweDZFREQsXG4gICAgMHg5MUVCOiAweDcwMjcsXG4gICAgMHg5MUVDOiAweDUzNTMsXG4gICAgMHg5MUVEOiAweDU1NDQsXG4gICAgMHg5MUVFOiAweDVCODUsXG4gICAgMHg5MUVGOiAweDYyNTgsXG4gICAgMHg5MUYwOiAweDYyOUUsXG4gICAgMHg5MUYxOiAweDYyRDMsXG4gICAgMHg5MUYyOiAweDZDQTIsXG4gICAgMHg5MUYzOiAweDZGRUYsXG4gICAgMHg5MUY0OiAweDc0MjIsXG4gICAgMHg5MUY1OiAweDhBMTcsXG4gICAgMHg5MUY2OiAweDk0MzgsXG4gICAgMHg5MUY3OiAweDZGQzEsXG4gICAgMHg5MUY4OiAweDhBRkUsXG4gICAgMHg5MUY5OiAweDgzMzgsXG4gICAgMHg5MUZBOiAweDUxRTcsXG4gICAgMHg5MUZCOiAweDg2RjgsXG4gICAgMHg5MUZDOiAweDUzRUEsXG4gICAgMHg5MjQwOiAweDUzRTksXG4gICAgMHg5MjQxOiAweDRGNDYsXG4gICAgMHg5MjQyOiAweDkwNTQsXG4gICAgMHg5MjQzOiAweDhGQjAsXG4gICAgMHg5MjQ0OiAweDU5NkEsXG4gICAgMHg5MjQ1OiAweDgxMzEsXG4gICAgMHg5MjQ2OiAweDVERkQsXG4gICAgMHg5MjQ3OiAweDdBRUEsXG4gICAgMHg5MjQ4OiAweDhGQkYsXG4gICAgMHg5MjQ5OiAweDY4REEsXG4gICAgMHg5MjRBOiAweDhDMzcsXG4gICAgMHg5MjRCOiAweDcyRjgsXG4gICAgMHg5MjRDOiAweDlDNDgsXG4gICAgMHg5MjREOiAweDZBM0QsXG4gICAgMHg5MjRFOiAweDhBQjAsXG4gICAgMHg5MjRGOiAweDRFMzksXG4gICAgMHg5MjUwOiAweDUzNTgsXG4gICAgMHg5MjUxOiAweDU2MDYsXG4gICAgMHg5MjUyOiAweDU3NjYsXG4gICAgMHg5MjUzOiAweDYyQzUsXG4gICAgMHg5MjU0OiAweDYzQTIsXG4gICAgMHg5MjU1OiAweDY1RTYsXG4gICAgMHg5MjU2OiAweDZCNEUsXG4gICAgMHg5MjU3OiAweDZERTEsXG4gICAgMHg5MjU4OiAweDZFNUIsXG4gICAgMHg5MjU5OiAweDcwQUQsXG4gICAgMHg5MjVBOiAweDc3RUQsXG4gICAgMHg5MjVCOiAweDdBRUYsXG4gICAgMHg5MjVDOiAweDdCQUEsXG4gICAgMHg5MjVEOiAweDdEQkIsXG4gICAgMHg5MjVFOiAweDgwM0QsXG4gICAgMHg5MjVGOiAweDgwQzYsXG4gICAgMHg5MjYwOiAweDg2Q0IsXG4gICAgMHg5MjYxOiAweDhBOTUsXG4gICAgMHg5MjYyOiAweDkzNUIsXG4gICAgMHg5MjYzOiAweDU2RTMsXG4gICAgMHg5MjY0OiAweDU4QzcsXG4gICAgMHg5MjY1OiAweDVGM0UsXG4gICAgMHg5MjY2OiAweDY1QUQsXG4gICAgMHg5MjY3OiAweDY2OTYsXG4gICAgMHg5MjY4OiAweDZBODAsXG4gICAgMHg5MjY5OiAweDZCQjUsXG4gICAgMHg5MjZBOiAweDc1MzcsXG4gICAgMHg5MjZCOiAweDhBQzcsXG4gICAgMHg5MjZDOiAweDUwMjQsXG4gICAgMHg5MjZEOiAweDc3RTUsXG4gICAgMHg5MjZFOiAweDU3MzAsXG4gICAgMHg5MjZGOiAweDVGMUIsXG4gICAgMHg5MjcwOiAweDYwNjUsXG4gICAgMHg5MjcxOiAweDY2N0EsXG4gICAgMHg5MjcyOiAweDZDNjAsXG4gICAgMHg5MjczOiAweDc1RjQsXG4gICAgMHg5Mjc0OiAweDdBMUEsXG4gICAgMHg5Mjc1OiAweDdGNkUsXG4gICAgMHg5Mjc2OiAweDgxRjQsXG4gICAgMHg5Mjc3OiAweDg3MTgsXG4gICAgMHg5Mjc4OiAweDkwNDUsXG4gICAgMHg5Mjc5OiAweDk5QjMsXG4gICAgMHg5MjdBOiAweDdCQzksXG4gICAgMHg5MjdCOiAweDc1NUMsXG4gICAgMHg5MjdDOiAweDdBRjksXG4gICAgMHg5MjdEOiAweDdCNTEsXG4gICAgMHg5MjdFOiAweDg0QzQsXG4gICAgMHg5MjgwOiAweDkwMTAsXG4gICAgMHg5MjgxOiAweDc5RTksXG4gICAgMHg5MjgyOiAweDdBOTIsXG4gICAgMHg5MjgzOiAweDgzMzYsXG4gICAgMHg5Mjg0OiAweDVBRTEsXG4gICAgMHg5Mjg1OiAweDc3NDAsXG4gICAgMHg5Mjg2OiAweDRFMkQsXG4gICAgMHg5Mjg3OiAweDRFRjIsXG4gICAgMHg5Mjg4OiAweDVCOTksXG4gICAgMHg5Mjg5OiAweDVGRTAsXG4gICAgMHg5MjhBOiAweDYyQkQsXG4gICAgMHg5MjhCOiAweDY2M0MsXG4gICAgMHg5MjhDOiAweDY3RjEsXG4gICAgMHg5MjhEOiAweDZDRTgsXG4gICAgMHg5MjhFOiAweDg2NkIsXG4gICAgMHg5MjhGOiAweDg4NzcsXG4gICAgMHg5MjkwOiAweDhBM0IsXG4gICAgMHg5MjkxOiAweDkxNEUsXG4gICAgMHg5MjkyOiAweDkyRjMsXG4gICAgMHg5MjkzOiAweDk5RDAsXG4gICAgMHg5Mjk0OiAweDZBMTcsXG4gICAgMHg5Mjk1OiAweDcwMjYsXG4gICAgMHg5Mjk2OiAweDczMkEsXG4gICAgMHg5Mjk3OiAweDgyRTcsXG4gICAgMHg5Mjk4OiAweDg0NTcsXG4gICAgMHg5Mjk5OiAweDhDQUYsXG4gICAgMHg5MjlBOiAweDRFMDEsXG4gICAgMHg5MjlCOiAweDUxNDYsXG4gICAgMHg5MjlDOiAweDUxQ0IsXG4gICAgMHg5MjlEOiAweDU1OEIsXG4gICAgMHg5MjlFOiAweDVCRjUsXG4gICAgMHg5MjlGOiAweDVFMTYsXG4gICAgMHg5MkEwOiAweDVFMzMsXG4gICAgMHg5MkExOiAweDVFODEsXG4gICAgMHg5MkEyOiAweDVGMTQsXG4gICAgMHg5MkEzOiAweDVGMzUsXG4gICAgMHg5MkE0OiAweDVGNkIsXG4gICAgMHg5MkE1OiAweDVGQjQsXG4gICAgMHg5MkE2OiAweDYxRjIsXG4gICAgMHg5MkE3OiAweDYzMTEsXG4gICAgMHg5MkE4OiAweDY2QTIsXG4gICAgMHg5MkE5OiAweDY3MUQsXG4gICAgMHg5MkFBOiAweDZGNkUsXG4gICAgMHg5MkFCOiAweDcyNTIsXG4gICAgMHg5MkFDOiAweDc1M0EsXG4gICAgMHg5MkFEOiAweDc3M0EsXG4gICAgMHg5MkFFOiAweDgwNzQsXG4gICAgMHg5MkFGOiAweDgxMzksXG4gICAgMHg5MkIwOiAweDgxNzgsXG4gICAgMHg5MkIxOiAweDg3NzYsXG4gICAgMHg5MkIyOiAweDhBQkYsXG4gICAgMHg5MkIzOiAweDhBREMsXG4gICAgMHg5MkI0OiAweDhEODUsXG4gICAgMHg5MkI1OiAweDhERjMsXG4gICAgMHg5MkI2OiAweDkyOUEsXG4gICAgMHg5MkI3OiAweDk1NzcsXG4gICAgMHg5MkI4OiAweDk4MDIsXG4gICAgMHg5MkI5OiAweDlDRTUsXG4gICAgMHg5MkJBOiAweDUyQzUsXG4gICAgMHg5MkJCOiAweDYzNTcsXG4gICAgMHg5MkJDOiAweDc2RjQsXG4gICAgMHg5MkJEOiAweDY3MTUsXG4gICAgMHg5MkJFOiAweDZDODgsXG4gICAgMHg5MkJGOiAweDczQ0QsXG4gICAgMHg5MkMwOiAweDhDQzMsXG4gICAgMHg5MkMxOiAweDkzQUUsXG4gICAgMHg5MkMyOiAweDk2NzMsXG4gICAgMHg5MkMzOiAweDZEMjUsXG4gICAgMHg5MkM0OiAweDU4OUMsXG4gICAgMHg5MkM1OiAweDY5MEUsXG4gICAgMHg5MkM2OiAweDY5Q0MsXG4gICAgMHg5MkM3OiAweDhGRkQsXG4gICAgMHg5MkM4OiAweDkzOUEsXG4gICAgMHg5MkM5OiAweDc1REIsXG4gICAgMHg5MkNBOiAweDkwMUEsXG4gICAgMHg5MkNCOiAweDU4NUEsXG4gICAgMHg5MkNDOiAweDY4MDIsXG4gICAgMHg5MkNEOiAweDYzQjQsXG4gICAgMHg5MkNFOiAweDY5RkIsXG4gICAgMHg5MkNGOiAweDRGNDMsXG4gICAgMHg5MkQwOiAweDZGMkMsXG4gICAgMHg5MkQxOiAweDY3RDgsXG4gICAgMHg5MkQyOiAweDhGQkIsXG4gICAgMHg5MkQzOiAweDg1MjYsXG4gICAgMHg5MkQ0OiAweDdEQjQsXG4gICAgMHg5MkQ1OiAweDkzNTQsXG4gICAgMHg5MkQ2OiAweDY5M0YsXG4gICAgMHg5MkQ3OiAweDZGNzAsXG4gICAgMHg5MkQ4OiAweDU3NkEsXG4gICAgMHg5MkQ5OiAweDU4RjcsXG4gICAgMHg5MkRBOiAweDVCMkMsXG4gICAgMHg5MkRCOiAweDdEMkMsXG4gICAgMHg5MkRDOiAweDcyMkEsXG4gICAgMHg5MkREOiAweDU0MEEsXG4gICAgMHg5MkRFOiAweDkxRTMsXG4gICAgMHg5MkRGOiAweDlEQjQsXG4gICAgMHg5MkUwOiAweDRFQUQsXG4gICAgMHg5MkUxOiAweDRGNEUsXG4gICAgMHg5MkUyOiAweDUwNUMsXG4gICAgMHg5MkUzOiAweDUwNzUsXG4gICAgMHg5MkU0OiAweDUyNDMsXG4gICAgMHg5MkU1OiAweDhDOUUsXG4gICAgMHg5MkU2OiAweDU0NDgsXG4gICAgMHg5MkU3OiAweDU4MjQsXG4gICAgMHg5MkU4OiAweDVCOUEsXG4gICAgMHg5MkU5OiAweDVFMUQsXG4gICAgMHg5MkVBOiAweDVFOTUsXG4gICAgMHg5MkVCOiAweDVFQUQsXG4gICAgMHg5MkVDOiAweDVFRjcsXG4gICAgMHg5MkVEOiAweDVGMUYsXG4gICAgMHg5MkVFOiAweDYwOEMsXG4gICAgMHg5MkVGOiAweDYyQjUsXG4gICAgMHg5MkYwOiAweDYzM0EsXG4gICAgMHg5MkYxOiAweDYzRDAsXG4gICAgMHg5MkYyOiAweDY4QUYsXG4gICAgMHg5MkYzOiAweDZDNDAsXG4gICAgMHg5MkY0OiAweDc4ODcsXG4gICAgMHg5MkY1OiAweDc5OEUsXG4gICAgMHg5MkY2OiAweDdBMEIsXG4gICAgMHg5MkY3OiAweDdERTAsXG4gICAgMHg5MkY4OiAweDgyNDcsXG4gICAgMHg5MkY5OiAweDhBMDIsXG4gICAgMHg5MkZBOiAweDhBRTYsXG4gICAgMHg5MkZCOiAweDhFNDQsXG4gICAgMHg5MkZDOiAweDkwMTMsXG4gICAgMHg5MzQwOiAweDkwQjgsXG4gICAgMHg5MzQxOiAweDkxMkQsXG4gICAgMHg5MzQyOiAweDkxRDgsXG4gICAgMHg5MzQzOiAweDlGMEUsXG4gICAgMHg5MzQ0OiAweDZDRTUsXG4gICAgMHg5MzQ1OiAweDY0NTgsXG4gICAgMHg5MzQ2OiAweDY0RTIsXG4gICAgMHg5MzQ3OiAweDY1NzUsXG4gICAgMHg5MzQ4OiAweDZFRjQsXG4gICAgMHg5MzQ5OiAweDc2ODQsXG4gICAgMHg5MzRBOiAweDdCMUIsXG4gICAgMHg5MzRCOiAweDkwNjksXG4gICAgMHg5MzRDOiAweDkzRDEsXG4gICAgMHg5MzREOiAweDZFQkEsXG4gICAgMHg5MzRFOiAweDU0RjIsXG4gICAgMHg5MzRGOiAweDVGQjksXG4gICAgMHg5MzUwOiAweDY0QTQsXG4gICAgMHg5MzUxOiAweDhGNEQsXG4gICAgMHg5MzUyOiAweDhGRUQsXG4gICAgMHg5MzUzOiAweDkyNDQsXG4gICAgMHg5MzU0OiAweDUxNzgsXG4gICAgMHg5MzU1OiAweDU4NkIsXG4gICAgMHg5MzU2OiAweDU5MjksXG4gICAgMHg5MzU3OiAweDVDNTUsXG4gICAgMHg5MzU4OiAweDVFOTcsXG4gICAgMHg5MzU5OiAweDZERkIsXG4gICAgMHg5MzVBOiAweDdFOEYsXG4gICAgMHg5MzVCOiAweDc1MUMsXG4gICAgMHg5MzVDOiAweDhDQkMsXG4gICAgMHg5MzVEOiAweDhFRTIsXG4gICAgMHg5MzVFOiAweDk4NUIsXG4gICAgMHg5MzVGOiAweDcwQjksXG4gICAgMHg5MzYwOiAweDRGMUQsXG4gICAgMHg5MzYxOiAweDZCQkYsXG4gICAgMHg5MzYyOiAweDZGQjEsXG4gICAgMHg5MzYzOiAweDc1MzAsXG4gICAgMHg5MzY0OiAweDk2RkIsXG4gICAgMHg5MzY1OiAweDUxNEUsXG4gICAgMHg5MzY2OiAweDU0MTAsXG4gICAgMHg5MzY3OiAweDU4MzUsXG4gICAgMHg5MzY4OiAweDU4NTcsXG4gICAgMHg5MzY5OiAweDU5QUMsXG4gICAgMHg5MzZBOiAweDVDNjAsXG4gICAgMHg5MzZCOiAweDVGOTIsXG4gICAgMHg5MzZDOiAweDY1OTcsXG4gICAgMHg5MzZEOiAweDY3NUMsXG4gICAgMHg5MzZFOiAweDZFMjEsXG4gICAgMHg5MzZGOiAweDc2N0IsXG4gICAgMHg5MzcwOiAweDgzREYsXG4gICAgMHg5MzcxOiAweDhDRUQsXG4gICAgMHg5MzcyOiAweDkwMTQsXG4gICAgMHg5MzczOiAweDkwRkQsXG4gICAgMHg5Mzc0OiAweDkzNEQsXG4gICAgMHg5Mzc1OiAweDc4MjUsXG4gICAgMHg5Mzc2OiAweDc4M0EsXG4gICAgMHg5Mzc3OiAweDUyQUEsXG4gICAgMHg5Mzc4OiAweDVFQTYsXG4gICAgMHg5Mzc5OiAweDU3MUYsXG4gICAgMHg5MzdBOiAweDU5NzQsXG4gICAgMHg5MzdCOiAweDYwMTIsXG4gICAgMHg5MzdDOiAweDUwMTIsXG4gICAgMHg5MzdEOiAweDUxNUEsXG4gICAgMHg5MzdFOiAweDUxQUMsXG4gICAgMHg5MzgwOiAweDUxQ0QsXG4gICAgMHg5MzgxOiAweDUyMDAsXG4gICAgMHg5MzgyOiAweDU1MTAsXG4gICAgMHg5MzgzOiAweDU4NTQsXG4gICAgMHg5Mzg0OiAweDU4NTgsXG4gICAgMHg5Mzg1OiAweDU5NTcsXG4gICAgMHg5Mzg2OiAweDVCOTUsXG4gICAgMHg5Mzg3OiAweDVDRjYsXG4gICAgMHg5Mzg4OiAweDVEOEIsXG4gICAgMHg5Mzg5OiAweDYwQkMsXG4gICAgMHg5MzhBOiAweDYyOTUsXG4gICAgMHg5MzhCOiAweDY0MkQsXG4gICAgMHg5MzhDOiAweDY3NzEsXG4gICAgMHg5MzhEOiAweDY4NDMsXG4gICAgMHg5MzhFOiAweDY4QkMsXG4gICAgMHg5MzhGOiAweDY4REYsXG4gICAgMHg5MzkwOiAweDc2RDcsXG4gICAgMHg5MzkxOiAweDZERDgsXG4gICAgMHg5MzkyOiAweDZFNkYsXG4gICAgMHg5MzkzOiAweDZEOUIsXG4gICAgMHg5Mzk0OiAweDcwNkYsXG4gICAgMHg5Mzk1OiAweDcxQzgsXG4gICAgMHg5Mzk2OiAweDVGNTMsXG4gICAgMHg5Mzk3OiAweDc1RDgsXG4gICAgMHg5Mzk4OiAweDc5NzcsXG4gICAgMHg5Mzk5OiAweDdCNDksXG4gICAgMHg5MzlBOiAweDdCNTQsXG4gICAgMHg5MzlCOiAweDdCNTIsXG4gICAgMHg5MzlDOiAweDdDRDYsXG4gICAgMHg5MzlEOiAweDdENzEsXG4gICAgMHg5MzlFOiAweDUyMzAsXG4gICAgMHg5MzlGOiAweDg0NjMsXG4gICAgMHg5M0EwOiAweDg1NjksXG4gICAgMHg5M0ExOiAweDg1RTQsXG4gICAgMHg5M0EyOiAweDhBMEUsXG4gICAgMHg5M0EzOiAweDhCMDQsXG4gICAgMHg5M0E0OiAweDhDNDYsXG4gICAgMHg5M0E1OiAweDhFMEYsXG4gICAgMHg5M0E2OiAweDkwMDMsXG4gICAgMHg5M0E3OiAweDkwMEYsXG4gICAgMHg5M0E4OiAweDk0MTksXG4gICAgMHg5M0E5OiAweDk2NzYsXG4gICAgMHg5M0FBOiAweDk4MkQsXG4gICAgMHg5M0FCOiAweDlBMzAsXG4gICAgMHg5M0FDOiAweDk1RDgsXG4gICAgMHg5M0FEOiAweDUwQ0QsXG4gICAgMHg5M0FFOiAweDUyRDUsXG4gICAgMHg5M0FGOiAweDU0MEMsXG4gICAgMHg5M0IwOiAweDU4MDIsXG4gICAgMHg5M0IxOiAweDVDMEUsXG4gICAgMHg5M0IyOiAweDYxQTcsXG4gICAgMHg5M0IzOiAweDY0OUUsXG4gICAgMHg5M0I0OiAweDZEMUUsXG4gICAgMHg5M0I1OiAweDc3QjMsXG4gICAgMHg5M0I2OiAweDdBRTUsXG4gICAgMHg5M0I3OiAweDgwRjQsXG4gICAgMHg5M0I4OiAweDg0MDQsXG4gICAgMHg5M0I5OiAweDkwNTMsXG4gICAgMHg5M0JBOiAweDkyODUsXG4gICAgMHg5M0JCOiAweDVDRTAsXG4gICAgMHg5M0JDOiAweDlEMDcsXG4gICAgMHg5M0JEOiAweDUzM0YsXG4gICAgMHg5M0JFOiAweDVGOTcsXG4gICAgMHg5M0JGOiAweDVGQjMsXG4gICAgMHg5M0MwOiAweDZEOUMsXG4gICAgMHg5M0MxOiAweDcyNzksXG4gICAgMHg5M0MyOiAweDc3NjMsXG4gICAgMHg5M0MzOiAweDc5QkYsXG4gICAgMHg5M0M0OiAweDdCRTQsXG4gICAgMHg5M0M1OiAweDZCRDIsXG4gICAgMHg5M0M2OiAweDcyRUMsXG4gICAgMHg5M0M3OiAweDhBQUQsXG4gICAgMHg5M0M4OiAweDY4MDMsXG4gICAgMHg5M0M5OiAweDZBNjEsXG4gICAgMHg5M0NBOiAweDUxRjgsXG4gICAgMHg5M0NCOiAweDdBODEsXG4gICAgMHg5M0NDOiAweDY5MzQsXG4gICAgMHg5M0NEOiAweDVDNEEsXG4gICAgMHg5M0NFOiAweDlDRjYsXG4gICAgMHg5M0NGOiAweDgyRUIsXG4gICAgMHg5M0QwOiAweDVCQzUsXG4gICAgMHg5M0QxOiAweDkxNDksXG4gICAgMHg5M0QyOiAweDcwMUUsXG4gICAgMHg5M0QzOiAweDU2NzgsXG4gICAgMHg5M0Q0OiAweDVDNkYsXG4gICAgMHg5M0Q1OiAweDYwQzcsXG4gICAgMHg5M0Q2OiAweDY1NjYsXG4gICAgMHg5M0Q3OiAweDZDOEMsXG4gICAgMHg5M0Q4OiAweDhDNUEsXG4gICAgMHg5M0Q5OiAweDkwNDEsXG4gICAgMHg5M0RBOiAweDk4MTMsXG4gICAgMHg5M0RCOiAweDU0NTEsXG4gICAgMHg5M0RDOiAweDY2QzcsXG4gICAgMHg5M0REOiAweDkyMEQsXG4gICAgMHg5M0RFOiAweDU5NDgsXG4gICAgMHg5M0RGOiAweDkwQTMsXG4gICAgMHg5M0UwOiAweDUxODUsXG4gICAgMHg5M0UxOiAweDRFNEQsXG4gICAgMHg5M0UyOiAweDUxRUEsXG4gICAgMHg5M0UzOiAweDg1OTksXG4gICAgMHg5M0U0OiAweDhCMEUsXG4gICAgMHg5M0U1OiAweDcwNTgsXG4gICAgMHg5M0U2OiAweDYzN0EsXG4gICAgMHg5M0U3OiAweDkzNEIsXG4gICAgMHg5M0U4OiAweDY5NjIsXG4gICAgMHg5M0U5OiAweDk5QjQsXG4gICAgMHg5M0VBOiAweDdFMDQsXG4gICAgMHg5M0VCOiAweDc1NzcsXG4gICAgMHg5M0VDOiAweDUzNTcsXG4gICAgMHg5M0VEOiAweDY5NjAsXG4gICAgMHg5M0VFOiAweDhFREYsXG4gICAgMHg5M0VGOiAweDk2RTMsXG4gICAgMHg5M0YwOiAweDZDNUQsXG4gICAgMHg5M0YxOiAweDRFOEMsXG4gICAgMHg5M0YyOiAweDVDM0MsXG4gICAgMHg5M0YzOiAweDVGMTAsXG4gICAgMHg5M0Y0OiAweDhGRTksXG4gICAgMHg5M0Y1OiAweDUzMDIsXG4gICAgMHg5M0Y2OiAweDhDRDEsXG4gICAgMHg5M0Y3OiAweDgwODksXG4gICAgMHg5M0Y4OiAweDg2NzksXG4gICAgMHg5M0Y5OiAweDVFRkYsXG4gICAgMHg5M0ZBOiAweDY1RTUsXG4gICAgMHg5M0ZCOiAweDRFNzMsXG4gICAgMHg5M0ZDOiAweDUxNjUsXG4gICAgMHg5NDQwOiAweDU5ODIsXG4gICAgMHg5NDQxOiAweDVDM0YsXG4gICAgMHg5NDQyOiAweDk3RUUsXG4gICAgMHg5NDQzOiAweDRFRkIsXG4gICAgMHg5NDQ0OiAweDU5OEEsXG4gICAgMHg5NDQ1OiAweDVGQ0QsXG4gICAgMHg5NDQ2OiAweDhBOEQsXG4gICAgMHg5NDQ3OiAweDZGRTEsXG4gICAgMHg5NDQ4OiAweDc5QjAsXG4gICAgMHg5NDQ5OiAweDc5NjIsXG4gICAgMHg5NDRBOiAweDVCRTcsXG4gICAgMHg5NDRCOiAweDg0NzEsXG4gICAgMHg5NDRDOiAweDczMkIsXG4gICAgMHg5NDREOiAweDcxQjEsXG4gICAgMHg5NDRFOiAweDVFNzQsXG4gICAgMHg5NDRGOiAweDVGRjUsXG4gICAgMHg5NDUwOiAweDYzN0IsXG4gICAgMHg5NDUxOiAweDY0OUEsXG4gICAgMHg5NDUyOiAweDcxQzMsXG4gICAgMHg5NDUzOiAweDdDOTgsXG4gICAgMHg5NDU0OiAweDRFNDMsXG4gICAgMHg5NDU1OiAweDVFRkMsXG4gICAgMHg5NDU2OiAweDRFNEIsXG4gICAgMHg5NDU3OiAweDU3REMsXG4gICAgMHg5NDU4OiAweDU2QTIsXG4gICAgMHg5NDU5OiAweDYwQTksXG4gICAgMHg5NDVBOiAweDZGQzMsXG4gICAgMHg5NDVCOiAweDdEMEQsXG4gICAgMHg5NDVDOiAweDgwRkQsXG4gICAgMHg5NDVEOiAweDgxMzMsXG4gICAgMHg5NDVFOiAweDgxQkYsXG4gICAgMHg5NDVGOiAweDhGQjIsXG4gICAgMHg5NDYwOiAweDg5OTcsXG4gICAgMHg5NDYxOiAweDg2QTQsXG4gICAgMHg5NDYyOiAweDVERjQsXG4gICAgMHg5NDYzOiAweDYyOEEsXG4gICAgMHg5NDY0OiAweDY0QUQsXG4gICAgMHg5NDY1OiAweDg5ODcsXG4gICAgMHg5NDY2OiAweDY3NzcsXG4gICAgMHg5NDY3OiAweDZDRTIsXG4gICAgMHg5NDY4OiAweDZEM0UsXG4gICAgMHg5NDY5OiAweDc0MzYsXG4gICAgMHg5NDZBOiAweDc4MzQsXG4gICAgMHg5NDZCOiAweDVBNDYsXG4gICAgMHg5NDZDOiAweDdGNzUsXG4gICAgMHg5NDZEOiAweDgyQUQsXG4gICAgMHg5NDZFOiAweDk5QUMsXG4gICAgMHg5NDZGOiAweDRGRjMsXG4gICAgMHg5NDcwOiAweDVFQzMsXG4gICAgMHg5NDcxOiAweDYyREQsXG4gICAgMHg5NDcyOiAweDYzOTIsXG4gICAgMHg5NDczOiAweDY1NTcsXG4gICAgMHg5NDc0OiAweDY3NkYsXG4gICAgMHg5NDc1OiAweDc2QzMsXG4gICAgMHg5NDc2OiAweDcyNEMsXG4gICAgMHg5NDc3OiAweDgwQ0MsXG4gICAgMHg5NDc4OiAweDgwQkEsXG4gICAgMHg5NDc5OiAweDhGMjksXG4gICAgMHg5NDdBOiAweDkxNEQsXG4gICAgMHg5NDdCOiAweDUwMEQsXG4gICAgMHg5NDdDOiAweDU3RjksXG4gICAgMHg5NDdEOiAweDVBOTIsXG4gICAgMHg5NDdFOiAweDY4ODUsXG4gICAgMHg5NDgwOiAweDY5NzMsXG4gICAgMHg5NDgxOiAweDcxNjQsXG4gICAgMHg5NDgyOiAweDcyRkQsXG4gICAgMHg5NDgzOiAweDhDQjcsXG4gICAgMHg5NDg0OiAweDU4RjIsXG4gICAgMHg5NDg1OiAweDhDRTAsXG4gICAgMHg5NDg2OiAweDk2NkEsXG4gICAgMHg5NDg3OiAweDkwMTksXG4gICAgMHg5NDg4OiAweDg3N0YsXG4gICAgMHg5NDg5OiAweDc5RTQsXG4gICAgMHg5NDhBOiAweDc3RTcsXG4gICAgMHg5NDhCOiAweDg0MjksXG4gICAgMHg5NDhDOiAweDRGMkYsXG4gICAgMHg5NDhEOiAweDUyNjUsXG4gICAgMHg5NDhFOiAweDUzNUEsXG4gICAgMHg5NDhGOiAweDYyQ0QsXG4gICAgMHg5NDkwOiAweDY3Q0YsXG4gICAgMHg5NDkxOiAweDZDQ0EsXG4gICAgMHg5NDkyOiAweDc2N0QsXG4gICAgMHg5NDkzOiAweDdCOTQsXG4gICAgMHg5NDk0OiAweDdDOTUsXG4gICAgMHg5NDk1OiAweDgyMzYsXG4gICAgMHg5NDk2OiAweDg1ODQsXG4gICAgMHg5NDk3OiAweDhGRUIsXG4gICAgMHg5NDk4OiAweDY2REQsXG4gICAgMHg5NDk5OiAweDZGMjAsXG4gICAgMHg5NDlBOiAweDcyMDYsXG4gICAgMHg5NDlCOiAweDdFMUIsXG4gICAgMHg5NDlDOiAweDgzQUIsXG4gICAgMHg5NDlEOiAweDk5QzEsXG4gICAgMHg5NDlFOiAweDlFQTYsXG4gICAgMHg5NDlGOiAweDUxRkQsXG4gICAgMHg5NEEwOiAweDdCQjEsXG4gICAgMHg5NEExOiAweDc4NzIsXG4gICAgMHg5NEEyOiAweDdCQjgsXG4gICAgMHg5NEEzOiAweDgwODcsXG4gICAgMHg5NEE0OiAweDdCNDgsXG4gICAgMHg5NEE1OiAweDZBRTgsXG4gICAgMHg5NEE2OiAweDVFNjEsXG4gICAgMHg5NEE3OiAweDgwOEMsXG4gICAgMHg5NEE4OiAweDc1NTEsXG4gICAgMHg5NEE5OiAweDc1NjAsXG4gICAgMHg5NEFBOiAweDUxNkIsXG4gICAgMHg5NEFCOiAweDkyNjIsXG4gICAgMHg5NEFDOiAweDZFOEMsXG4gICAgMHg5NEFEOiAweDc2N0EsXG4gICAgMHg5NEFFOiAweDkxOTcsXG4gICAgMHg5NEFGOiAweDlBRUEsXG4gICAgMHg5NEIwOiAweDRGMTAsXG4gICAgMHg5NEIxOiAweDdGNzAsXG4gICAgMHg5NEIyOiAweDYyOUMsXG4gICAgMHg5NEIzOiAweDdCNEYsXG4gICAgMHg5NEI0OiAweDk1QTUsXG4gICAgMHg5NEI1OiAweDlDRTksXG4gICAgMHg5NEI2OiAweDU2N0EsXG4gICAgMHg5NEI3OiAweDU4NTksXG4gICAgMHg5NEI4OiAweDg2RTQsXG4gICAgMHg5NEI5OiAweDk2QkMsXG4gICAgMHg5NEJBOiAweDRGMzQsXG4gICAgMHg5NEJCOiAweDUyMjQsXG4gICAgMHg5NEJDOiAweDUzNEEsXG4gICAgMHg5NEJEOiAweDUzQ0QsXG4gICAgMHg5NEJFOiAweDUzREIsXG4gICAgMHg5NEJGOiAweDVFMDYsXG4gICAgMHg5NEMwOiAweDY0MkMsXG4gICAgMHg5NEMxOiAweDY1OTEsXG4gICAgMHg5NEMyOiAweDY3N0YsXG4gICAgMHg5NEMzOiAweDZDM0UsXG4gICAgMHg5NEM0OiAweDZDNEUsXG4gICAgMHg5NEM1OiAweDcyNDgsXG4gICAgMHg5NEM2OiAweDcyQUYsXG4gICAgMHg5NEM3OiAweDczRUQsXG4gICAgMHg5NEM4OiAweDc1NTQsXG4gICAgMHg5NEM5OiAweDdFNDEsXG4gICAgMHg5NENBOiAweDgyMkMsXG4gICAgMHg5NENCOiAweDg1RTksXG4gICAgMHg5NENDOiAweDhDQTksXG4gICAgMHg5NENEOiAweDdCQzQsXG4gICAgMHg5NENFOiAweDkxQzYsXG4gICAgMHg5NENGOiAweDcxNjksXG4gICAgMHg5NEQwOiAweDk4MTIsXG4gICAgMHg5NEQxOiAweDk4RUYsXG4gICAgMHg5NEQyOiAweDYzM0QsXG4gICAgMHg5NEQzOiAweDY2NjksXG4gICAgMHg5NEQ0OiAweDc1NkEsXG4gICAgMHg5NEQ1OiAweDc2RTQsXG4gICAgMHg5NEQ2OiAweDc4RDAsXG4gICAgMHg5NEQ3OiAweDg1NDMsXG4gICAgMHg5NEQ4OiAweDg2RUUsXG4gICAgMHg5NEQ5OiAweDUzMkEsXG4gICAgMHg5NERBOiAweDUzNTEsXG4gICAgMHg5NERCOiAweDU0MjYsXG4gICAgMHg5NERDOiAweDU5ODMsXG4gICAgMHg5NEREOiAweDVFODcsXG4gICAgMHg5NERFOiAweDVGN0MsXG4gICAgMHg5NERGOiAweDYwQjIsXG4gICAgMHg5NEUwOiAweDYyNDksXG4gICAgMHg5NEUxOiAweDYyNzksXG4gICAgMHg5NEUyOiAweDYyQUIsXG4gICAgMHg5NEUzOiAweDY1OTAsXG4gICAgMHg5NEU0OiAweDZCRDQsXG4gICAgMHg5NEU1OiAweDZDQ0MsXG4gICAgMHg5NEU2OiAweDc1QjIsXG4gICAgMHg5NEU3OiAweDc2QUUsXG4gICAgMHg5NEU4OiAweDc4OTEsXG4gICAgMHg5NEU5OiAweDc5RDgsXG4gICAgMHg5NEVBOiAweDdEQ0IsXG4gICAgMHg5NEVCOiAweDdGNzcsXG4gICAgMHg5NEVDOiAweDgwQTUsXG4gICAgMHg5NEVEOiAweDg4QUIsXG4gICAgMHg5NEVFOiAweDhBQjksXG4gICAgMHg5NEVGOiAweDhDQkIsXG4gICAgMHg5NEYwOiAweDkwN0YsXG4gICAgMHg5NEYxOiAweDk3NUUsXG4gICAgMHg5NEYyOiAweDk4REIsXG4gICAgMHg5NEYzOiAweDZBMEIsXG4gICAgMHg5NEY0OiAweDdDMzgsXG4gICAgMHg5NEY1OiAweDUwOTksXG4gICAgMHg5NEY2OiAweDVDM0UsXG4gICAgMHg5NEY3OiAweDVGQUUsXG4gICAgMHg5NEY4OiAweDY3ODcsXG4gICAgMHg5NEY5OiAweDZCRDgsXG4gICAgMHg5NEZBOiAweDc0MzUsXG4gICAgMHg5NEZCOiAweDc3MDksXG4gICAgMHg5NEZDOiAweDdGOEUsXG4gICAgMHg5NTQwOiAweDlGM0IsXG4gICAgMHg5NTQxOiAweDY3Q0EsXG4gICAgMHg5NTQyOiAweDdBMTcsXG4gICAgMHg5NTQzOiAweDUzMzksXG4gICAgMHg5NTQ0OiAweDc1OEIsXG4gICAgMHg5NTQ1OiAweDlBRUQsXG4gICAgMHg5NTQ2OiAweDVGNjYsXG4gICAgMHg5NTQ3OiAweDgxOUQsXG4gICAgMHg5NTQ4OiAweDgzRjEsXG4gICAgMHg5NTQ5OiAweDgwOTgsXG4gICAgMHg5NTRBOiAweDVGM0MsXG4gICAgMHg5NTRCOiAweDVGQzUsXG4gICAgMHg5NTRDOiAweDc1NjIsXG4gICAgMHg5NTREOiAweDdCNDYsXG4gICAgMHg5NTRFOiAweDkwM0MsXG4gICAgMHg5NTRGOiAweDY4NjcsXG4gICAgMHg5NTUwOiAweDU5RUIsXG4gICAgMHg5NTUxOiAweDVBOUIsXG4gICAgMHg5NTUyOiAweDdEMTAsXG4gICAgMHg5NTUzOiAweDc2N0UsXG4gICAgMHg5NTU0OiAweDhCMkMsXG4gICAgMHg5NTU1OiAweDRGRjUsXG4gICAgMHg5NTU2OiAweDVGNkEsXG4gICAgMHg5NTU3OiAweDZBMTksXG4gICAgMHg5NTU4OiAweDZDMzcsXG4gICAgMHg5NTU5OiAweDZGMDIsXG4gICAgMHg5NTVBOiAweDc0RTIsXG4gICAgMHg5NTVCOiAweDc5NjgsXG4gICAgMHg5NTVDOiAweDg4NjgsXG4gICAgMHg5NTVEOiAweDhBNTUsXG4gICAgMHg5NTVFOiAweDhDNzksXG4gICAgMHg5NTVGOiAweDVFREYsXG4gICAgMHg5NTYwOiAweDYzQ0YsXG4gICAgMHg5NTYxOiAweDc1QzUsXG4gICAgMHg5NTYyOiAweDc5RDIsXG4gICAgMHg5NTYzOiAweDgyRDcsXG4gICAgMHg5NTY0OiAweDkzMjgsXG4gICAgMHg5NTY1OiAweDkyRjIsXG4gICAgMHg5NTY2OiAweDg0OUMsXG4gICAgMHg5NTY3OiAweDg2RUQsXG4gICAgMHg5NTY4OiAweDlDMkQsXG4gICAgMHg5NTY5OiAweDU0QzEsXG4gICAgMHg5NTZBOiAweDVGNkMsXG4gICAgMHg5NTZCOiAweDY1OEMsXG4gICAgMHg5NTZDOiAweDZENUMsXG4gICAgMHg5NTZEOiAweDcwMTUsXG4gICAgMHg5NTZFOiAweDhDQTcsXG4gICAgMHg5NTZGOiAweDhDRDMsXG4gICAgMHg5NTcwOiAweDk4M0IsXG4gICAgMHg5NTcxOiAweDY1NEYsXG4gICAgMHg5NTcyOiAweDc0RjYsXG4gICAgMHg5NTczOiAweDRFMEQsXG4gICAgMHg5NTc0OiAweDRFRDgsXG4gICAgMHg5NTc1OiAweDU3RTAsXG4gICAgMHg5NTc2OiAweDU5MkIsXG4gICAgMHg5NTc3OiAweDVBNjYsXG4gICAgMHg5NTc4OiAweDVCQ0MsXG4gICAgMHg5NTc5OiAweDUxQTgsXG4gICAgMHg5NTdBOiAweDVFMDMsXG4gICAgMHg5NTdCOiAweDVFOUMsXG4gICAgMHg5NTdDOiAweDYwMTYsXG4gICAgMHg5NTdEOiAweDYyNzYsXG4gICAgMHg5NTdFOiAweDY1NzcsXG4gICAgMHg5NTgwOiAweDY1QTcsXG4gICAgMHg5NTgxOiAweDY2NkUsXG4gICAgMHg5NTgyOiAweDZENkUsXG4gICAgMHg5NTgzOiAweDcyMzYsXG4gICAgMHg5NTg0OiAweDdCMjYsXG4gICAgMHg5NTg1OiAweDgxNTAsXG4gICAgMHg5NTg2OiAweDgxOUEsXG4gICAgMHg5NTg3OiAweDgyOTksXG4gICAgMHg5NTg4OiAweDhCNUMsXG4gICAgMHg5NTg5OiAweDhDQTAsXG4gICAgMHg5NThBOiAweDhDRTYsXG4gICAgMHg5NThCOiAweDhENzQsXG4gICAgMHg5NThDOiAweDk2MUMsXG4gICAgMHg5NThEOiAweDk2NDQsXG4gICAgMHg5NThFOiAweDRGQUUsXG4gICAgMHg5NThGOiAweDY0QUIsXG4gICAgMHg5NTkwOiAweDZCNjYsXG4gICAgMHg5NTkxOiAweDgyMUUsXG4gICAgMHg5NTkyOiAweDg0NjEsXG4gICAgMHg5NTkzOiAweDg1NkEsXG4gICAgMHg5NTk0OiAweDkwRTgsXG4gICAgMHg5NTk1OiAweDVDMDEsXG4gICAgMHg5NTk2OiAweDY5NTMsXG4gICAgMHg5NTk3OiAweDk4QTgsXG4gICAgMHg5NTk4OiAweDg0N0EsXG4gICAgMHg5NTk5OiAweDg1NTcsXG4gICAgMHg5NTlBOiAweDRGMEYsXG4gICAgMHg5NTlCOiAweDUyNkYsXG4gICAgMHg5NTlDOiAweDVGQTksXG4gICAgMHg5NTlEOiAweDVFNDUsXG4gICAgMHg5NTlFOiAweDY3MEQsXG4gICAgMHg5NTlGOiAweDc5OEYsXG4gICAgMHg5NUEwOiAweDgxNzksXG4gICAgMHg5NUExOiAweDg5MDcsXG4gICAgMHg5NUEyOiAweDg5ODYsXG4gICAgMHg5NUEzOiAweDZERjUsXG4gICAgMHg5NUE0OiAweDVGMTcsXG4gICAgMHg5NUE1OiAweDYyNTUsXG4gICAgMHg5NUE2OiAweDZDQjgsXG4gICAgMHg5NUE3OiAweDRFQ0YsXG4gICAgMHg5NUE4OiAweDcyNjksXG4gICAgMHg5NUE5OiAweDlCOTIsXG4gICAgMHg5NUFBOiAweDUyMDYsXG4gICAgMHg5NUFCOiAweDU0M0IsXG4gICAgMHg5NUFDOiAweDU2NzQsXG4gICAgMHg5NUFEOiAweDU4QjMsXG4gICAgMHg5NUFFOiAweDYxQTQsXG4gICAgMHg5NUFGOiAweDYyNkUsXG4gICAgMHg5NUIwOiAweDcxMUEsXG4gICAgMHg5NUIxOiAweDU5NkUsXG4gICAgMHg5NUIyOiAweDdDODksXG4gICAgMHg5NUIzOiAweDdDREUsXG4gICAgMHg5NUI0OiAweDdEMUIsXG4gICAgMHg5NUI1OiAweDk2RjAsXG4gICAgMHg5NUI2OiAweDY1ODcsXG4gICAgMHg5NUI3OiAweDgwNUUsXG4gICAgMHg5NUI4OiAweDRFMTksXG4gICAgMHg5NUI5OiAweDRGNzUsXG4gICAgMHg5NUJBOiAweDUxNzUsXG4gICAgMHg5NUJCOiAweDU4NDAsXG4gICAgMHg5NUJDOiAweDVFNjMsXG4gICAgMHg5NUJEOiAweDVFNzMsXG4gICAgMHg5NUJFOiAweDVGMEEsXG4gICAgMHg5NUJGOiAweDY3QzQsXG4gICAgMHg5NUMwOiAweDRFMjYsXG4gICAgMHg5NUMxOiAweDg1M0QsXG4gICAgMHg5NUMyOiAweDk1ODksXG4gICAgMHg5NUMzOiAweDk2NUIsXG4gICAgMHg5NUM0OiAweDdDNzMsXG4gICAgMHg5NUM1OiAweDk4MDEsXG4gICAgMHg5NUM2OiAweDUwRkIsXG4gICAgMHg5NUM3OiAweDU4QzEsXG4gICAgMHg5NUM4OiAweDc2NTYsXG4gICAgMHg5NUM5OiAweDc4QTcsXG4gICAgMHg5NUNBOiAweDUyMjUsXG4gICAgMHg5NUNCOiAweDc3QTUsXG4gICAgMHg5NUNDOiAweDg1MTEsXG4gICAgMHg5NUNEOiAweDdCODYsXG4gICAgMHg5NUNFOiAweDUwNEYsXG4gICAgMHg5NUNGOiAweDU5MDksXG4gICAgMHg5NUQwOiAweDcyNDcsXG4gICAgMHg5NUQxOiAweDdCQzcsXG4gICAgMHg5NUQyOiAweDdERTgsXG4gICAgMHg5NUQzOiAweDhGQkEsXG4gICAgMHg5NUQ0OiAweDhGRDQsXG4gICAgMHg5NUQ1OiAweDkwNEQsXG4gICAgMHg5NUQ2OiAweDRGQkYsXG4gICAgMHg5NUQ3OiAweDUyQzksXG4gICAgMHg5NUQ4OiAweDVBMjksXG4gICAgMHg5NUQ5OiAweDVGMDEsXG4gICAgMHg5NURBOiAweDk3QUQsXG4gICAgMHg5NURCOiAweDRGREQsXG4gICAgMHg5NURDOiAweDgyMTcsXG4gICAgMHg5NUREOiAweDkyRUEsXG4gICAgMHg5NURFOiAweDU3MDMsXG4gICAgMHg5NURGOiAweDYzNTUsXG4gICAgMHg5NUUwOiAweDZCNjksXG4gICAgMHg5NUUxOiAweDc1MkIsXG4gICAgMHg5NUUyOiAweDg4REMsXG4gICAgMHg5NUUzOiAweDhGMTQsXG4gICAgMHg5NUU0OiAweDdBNDIsXG4gICAgMHg5NUU1OiAweDUyREYsXG4gICAgMHg5NUU2OiAweDU4OTMsXG4gICAgMHg5NUU3OiAweDYxNTUsXG4gICAgMHg5NUU4OiAweDYyMEEsXG4gICAgMHg5NUU5OiAweDY2QUUsXG4gICAgMHg5NUVBOiAweDZCQ0QsXG4gICAgMHg5NUVCOiAweDdDM0YsXG4gICAgMHg5NUVDOiAweDgzRTksXG4gICAgMHg5NUVEOiAweDUwMjMsXG4gICAgMHg5NUVFOiAweDRGRjgsXG4gICAgMHg5NUVGOiAweDUzMDUsXG4gICAgMHg5NUYwOiAweDU0NDYsXG4gICAgMHg5NUYxOiAweDU4MzEsXG4gICAgMHg5NUYyOiAweDU5NDksXG4gICAgMHg5NUYzOiAweDVCOUQsXG4gICAgMHg5NUY0OiAweDVDRjAsXG4gICAgMHg5NUY1OiAweDVDRUYsXG4gICAgMHg5NUY2OiAweDVEMjksXG4gICAgMHg5NUY3OiAweDVFOTYsXG4gICAgMHg5NUY4OiAweDYyQjEsXG4gICAgMHg5NUY5OiAweDYzNjcsXG4gICAgMHg5NUZBOiAweDY1M0UsXG4gICAgMHg5NUZCOiAweDY1QjksXG4gICAgMHg5NUZDOiAweDY3MEIsXG4gICAgMHg5NjQwOiAweDZDRDUsXG4gICAgMHg5NjQxOiAweDZDRTEsXG4gICAgMHg5NjQyOiAweDcwRjksXG4gICAgMHg5NjQzOiAweDc4MzIsXG4gICAgMHg5NjQ0OiAweDdFMkIsXG4gICAgMHg5NjQ1OiAweDgwREUsXG4gICAgMHg5NjQ2OiAweDgyQjMsXG4gICAgMHg5NjQ3OiAweDg0MEMsXG4gICAgMHg5NjQ4OiAweDg0RUMsXG4gICAgMHg5NjQ5OiAweDg3MDIsXG4gICAgMHg5NjRBOiAweDg5MTIsXG4gICAgMHg5NjRCOiAweDhBMkEsXG4gICAgMHg5NjRDOiAweDhDNEEsXG4gICAgMHg5NjREOiAweDkwQTYsXG4gICAgMHg5NjRFOiAweDkyRDIsXG4gICAgMHg5NjRGOiAweDk4RkQsXG4gICAgMHg5NjUwOiAweDlDRjMsXG4gICAgMHg5NjUxOiAweDlENkMsXG4gICAgMHg5NjUyOiAweDRFNEYsXG4gICAgMHg5NjUzOiAweDRFQTEsXG4gICAgMHg5NjU0OiAweDUwOEQsXG4gICAgMHg5NjU1OiAweDUyNTYsXG4gICAgMHg5NjU2OiAweDU3NEEsXG4gICAgMHg5NjU3OiAweDU5QTgsXG4gICAgMHg5NjU4OiAweDVFM0QsXG4gICAgMHg5NjU5OiAweDVGRDgsXG4gICAgMHg5NjVBOiAweDVGRDksXG4gICAgMHg5NjVCOiAweDYyM0YsXG4gICAgMHg5NjVDOiAweDY2QjQsXG4gICAgMHg5NjVEOiAweDY3MUIsXG4gICAgMHg5NjVFOiAweDY3RDAsXG4gICAgMHg5NjVGOiAweDY4RDIsXG4gICAgMHg5NjYwOiAweDUxOTIsXG4gICAgMHg5NjYxOiAweDdEMjEsXG4gICAgMHg5NjYyOiAweDgwQUEsXG4gICAgMHg5NjYzOiAweDgxQTgsXG4gICAgMHg5NjY0OiAweDhCMDAsXG4gICAgMHg5NjY1OiAweDhDOEMsXG4gICAgMHg5NjY2OiAweDhDQkYsXG4gICAgMHg5NjY3OiAweDkyN0UsXG4gICAgMHg5NjY4OiAweDk2MzIsXG4gICAgMHg5NjY5OiAweDU0MjAsXG4gICAgMHg5NjZBOiAweDk4MkMsXG4gICAgMHg5NjZCOiAweDUzMTcsXG4gICAgMHg5NjZDOiAweDUwRDUsXG4gICAgMHg5NjZEOiAweDUzNUMsXG4gICAgMHg5NjZFOiAweDU4QTgsXG4gICAgMHg5NjZGOiAweDY0QjIsXG4gICAgMHg5NjcwOiAweDY3MzQsXG4gICAgMHg5NjcxOiAweDcyNjcsXG4gICAgMHg5NjcyOiAweDc3NjYsXG4gICAgMHg5NjczOiAweDdBNDYsXG4gICAgMHg5Njc0OiAweDkxRTYsXG4gICAgMHg5Njc1OiAweDUyQzMsXG4gICAgMHg5Njc2OiAweDZDQTEsXG4gICAgMHg5Njc3OiAweDZCODYsXG4gICAgMHg5Njc4OiAweDU4MDAsXG4gICAgMHg5Njc5OiAweDVFNEMsXG4gICAgMHg5NjdBOiAweDU5NTQsXG4gICAgMHg5NjdCOiAweDY3MkMsXG4gICAgMHg5NjdDOiAweDdGRkIsXG4gICAgMHg5NjdEOiAweDUxRTEsXG4gICAgMHg5NjdFOiAweDc2QzYsXG4gICAgMHg5NjgwOiAweDY0NjksXG4gICAgMHg5NjgxOiAweDc4RTgsXG4gICAgMHg5NjgyOiAweDlCNTQsXG4gICAgMHg5NjgzOiAweDlFQkIsXG4gICAgMHg5Njg0OiAweDU3Q0IsXG4gICAgMHg5Njg1OiAweDU5QjksXG4gICAgMHg5Njg2OiAweDY2MjcsXG4gICAgMHg5Njg3OiAweDY3OUEsXG4gICAgMHg5Njg4OiAweDZCQ0UsXG4gICAgMHg5Njg5OiAweDU0RTksXG4gICAgMHg5NjhBOiAweDY5RDksXG4gICAgMHg5NjhCOiAweDVFNTUsXG4gICAgMHg5NjhDOiAweDgxOUMsXG4gICAgMHg5NjhEOiAweDY3OTUsXG4gICAgMHg5NjhFOiAweDlCQUEsXG4gICAgMHg5NjhGOiAweDY3RkUsXG4gICAgMHg5NjkwOiAweDlDNTIsXG4gICAgMHg5NjkxOiAweDY4NUQsXG4gICAgMHg5NjkyOiAweDRFQTYsXG4gICAgMHg5NjkzOiAweDRGRTMsXG4gICAgMHg5Njk0OiAweDUzQzgsXG4gICAgMHg5Njk1OiAweDYyQjksXG4gICAgMHg5Njk2OiAweDY3MkIsXG4gICAgMHg5Njk3OiAweDZDQUIsXG4gICAgMHg5Njk4OiAweDhGQzQsXG4gICAgMHg5Njk5OiAweDRGQUQsXG4gICAgMHg5NjlBOiAweDdFNkQsXG4gICAgMHg5NjlCOiAweDlFQkYsXG4gICAgMHg5NjlDOiAweDRFMDcsXG4gICAgMHg5NjlEOiAweDYxNjIsXG4gICAgMHg5NjlFOiAweDZFODAsXG4gICAgMHg5NjlGOiAweDZGMkIsXG4gICAgMHg5NkEwOiAweDg1MTMsXG4gICAgMHg5NkExOiAweDU0NzMsXG4gICAgMHg5NkEyOiAweDY3MkEsXG4gICAgMHg5NkEzOiAweDlCNDUsXG4gICAgMHg5NkE0OiAweDVERjMsXG4gICAgMHg5NkE1OiAweDdCOTUsXG4gICAgMHg5NkE2OiAweDVDQUMsXG4gICAgMHg5NkE3OiAweDVCQzYsXG4gICAgMHg5NkE4OiAweDg3MUMsXG4gICAgMHg5NkE5OiAweDZFNEEsXG4gICAgMHg5NkFBOiAweDg0RDEsXG4gICAgMHg5NkFCOiAweDdBMTQsXG4gICAgMHg5NkFDOiAweDgxMDgsXG4gICAgMHg5NkFEOiAweDU5OTksXG4gICAgMHg5NkFFOiAweDdDOEQsXG4gICAgMHg5NkFGOiAweDZDMTEsXG4gICAgMHg5NkIwOiAweDc3MjAsXG4gICAgMHg5NkIxOiAweDUyRDksXG4gICAgMHg5NkIyOiAweDU5MjIsXG4gICAgMHg5NkIzOiAweDcxMjEsXG4gICAgMHg5NkI0OiAweDcyNUYsXG4gICAgMHg5NkI1OiAweDc3REIsXG4gICAgMHg5NkI2OiAweDk3MjcsXG4gICAgMHg5NkI3OiAweDlENjEsXG4gICAgMHg5NkI4OiAweDY5MEIsXG4gICAgMHg5NkI5OiAweDVBN0YsXG4gICAgMHg5NkJBOiAweDVBMTgsXG4gICAgMHg5NkJCOiAweDUxQTUsXG4gICAgMHg5NkJDOiAweDU0MEQsXG4gICAgMHg5NkJEOiAweDU0N0QsXG4gICAgMHg5NkJFOiAweDY2MEUsXG4gICAgMHg5NkJGOiAweDc2REYsXG4gICAgMHg5NkMwOiAweDhGRjcsXG4gICAgMHg5NkMxOiAweDkyOTgsXG4gICAgMHg5NkMyOiAweDlDRjQsXG4gICAgMHg5NkMzOiAweDU5RUEsXG4gICAgMHg5NkM0OiAweDcyNUQsXG4gICAgMHg5NkM1OiAweDZFQzUsXG4gICAgMHg5NkM2OiAweDUxNEQsXG4gICAgMHg5NkM3OiAweDY4QzksXG4gICAgMHg5NkM4OiAweDdEQkYsXG4gICAgMHg5NkM5OiAweDdERUMsXG4gICAgMHg5NkNBOiAweDk3NjIsXG4gICAgMHg5NkNCOiAweDlFQkEsXG4gICAgMHg5NkNDOiAweDY0NzgsXG4gICAgMHg5NkNEOiAweDZBMjEsXG4gICAgMHg5NkNFOiAweDgzMDIsXG4gICAgMHg5NkNGOiAweDU5ODQsXG4gICAgMHg5NkQwOiAweDVCNUYsXG4gICAgMHg5NkQxOiAweDZCREIsXG4gICAgMHg5NkQyOiAweDczMUIsXG4gICAgMHg5NkQzOiAweDc2RjIsXG4gICAgMHg5NkQ0OiAweDdEQjIsXG4gICAgMHg5NkQ1OiAweDgwMTcsXG4gICAgMHg5NkQ2OiAweDg0OTksXG4gICAgMHg5NkQ3OiAweDUxMzIsXG4gICAgMHg5NkQ4OiAweDY3MjgsXG4gICAgMHg5NkQ5OiAweDlFRDksXG4gICAgMHg5NkRBOiAweDc2RUUsXG4gICAgMHg5NkRCOiAweDY3NjIsXG4gICAgMHg5NkRDOiAweDUyRkYsXG4gICAgMHg5NkREOiAweDk5MDUsXG4gICAgMHg5NkRFOiAweDVDMjQsXG4gICAgMHg5NkRGOiAweDYyM0IsXG4gICAgMHg5NkUwOiAweDdDN0UsXG4gICAgMHg5NkUxOiAweDhDQjAsXG4gICAgMHg5NkUyOiAweDU1NEYsXG4gICAgMHg5NkUzOiAweDYwQjYsXG4gICAgMHg5NkU0OiAweDdEMEIsXG4gICAgMHg5NkU1OiAweDk1ODAsXG4gICAgMHg5NkU2OiAweDUzMDEsXG4gICAgMHg5NkU3OiAweDRFNUYsXG4gICAgMHg5NkU4OiAweDUxQjYsXG4gICAgMHg5NkU5OiAweDU5MUMsXG4gICAgMHg5NkVBOiAweDcyM0EsXG4gICAgMHg5NkVCOiAweDgwMzYsXG4gICAgMHg5NkVDOiAweDkxQ0UsXG4gICAgMHg5NkVEOiAweDVGMjUsXG4gICAgMHg5NkVFOiAweDc3RTIsXG4gICAgMHg5NkVGOiAweDUzODQsXG4gICAgMHg5NkYwOiAweDVGNzksXG4gICAgMHg5NkYxOiAweDdEMDQsXG4gICAgMHg5NkYyOiAweDg1QUMsXG4gICAgMHg5NkYzOiAweDhBMzMsXG4gICAgMHg5NkY0OiAweDhFOEQsXG4gICAgMHg5NkY1OiAweDk3NTYsXG4gICAgMHg5NkY2OiAweDY3RjMsXG4gICAgMHg5NkY3OiAweDg1QUUsXG4gICAgMHg5NkY4OiAweDk0NTMsXG4gICAgMHg5NkY5OiAweDYxMDksXG4gICAgMHg5NkZBOiAweDYxMDgsXG4gICAgMHg5NkZCOiAweDZDQjksXG4gICAgMHg5NkZDOiAweDc2NTIsXG4gICAgMHg5NzQwOiAweDhBRUQsXG4gICAgMHg5NzQxOiAweDhGMzgsXG4gICAgMHg5NzQyOiAweDU1MkYsXG4gICAgMHg5NzQzOiAweDRGNTEsXG4gICAgMHg5NzQ0OiAweDUxMkEsXG4gICAgMHg5NzQ1OiAweDUyQzcsXG4gICAgMHg5NzQ2OiAweDUzQ0IsXG4gICAgMHg5NzQ3OiAweDVCQTUsXG4gICAgMHg5NzQ4OiAweDVFN0QsXG4gICAgMHg5NzQ5OiAweDYwQTAsXG4gICAgMHg5NzRBOiAweDYxODIsXG4gICAgMHg5NzRCOiAweDYzRDYsXG4gICAgMHg5NzRDOiAweDY3MDksXG4gICAgMHg5NzREOiAweDY3REEsXG4gICAgMHg5NzRFOiAweDZFNjcsXG4gICAgMHg5NzRGOiAweDZEOEMsXG4gICAgMHg5NzUwOiAweDczMzYsXG4gICAgMHg5NzUxOiAweDczMzcsXG4gICAgMHg5NzUyOiAweDc1MzEsXG4gICAgMHg5NzUzOiAweDc5NTAsXG4gICAgMHg5NzU0OiAweDg4RDUsXG4gICAgMHg5NzU1OiAweDhBOTgsXG4gICAgMHg5NzU2OiAweDkwNEEsXG4gICAgMHg5NzU3OiAweDkwOTEsXG4gICAgMHg5NzU4OiAweDkwRjUsXG4gICAgMHg5NzU5OiAweDk2QzQsXG4gICAgMHg5NzVBOiAweDg3OEQsXG4gICAgMHg5NzVCOiAweDU5MTUsXG4gICAgMHg5NzVDOiAweDRFODgsXG4gICAgMHg5NzVEOiAweDRGNTksXG4gICAgMHg5NzVFOiAweDRFMEUsXG4gICAgMHg5NzVGOiAweDhBODksXG4gICAgMHg5NzYwOiAweDhGM0YsXG4gICAgMHg5NzYxOiAweDk4MTAsXG4gICAgMHg5NzYyOiAweDUwQUQsXG4gICAgMHg5NzYzOiAweDVFN0MsXG4gICAgMHg5NzY0OiAweDU5OTYsXG4gICAgMHg5NzY1OiAweDVCQjksXG4gICAgMHg5NzY2OiAweDVFQjgsXG4gICAgMHg5NzY3OiAweDYzREEsXG4gICAgMHg5NzY4OiAweDYzRkEsXG4gICAgMHg5NzY5OiAweDY0QzEsXG4gICAgMHg5NzZBOiAweDY2REMsXG4gICAgMHg5NzZCOiAweDY5NEEsXG4gICAgMHg5NzZDOiAweDY5RDgsXG4gICAgMHg5NzZEOiAweDZEMEIsXG4gICAgMHg5NzZFOiAweDZFQjYsXG4gICAgMHg5NzZGOiAweDcxOTQsXG4gICAgMHg5NzcwOiAweDc1MjgsXG4gICAgMHg5NzcxOiAweDdBQUYsXG4gICAgMHg5NzcyOiAweDdGOEEsXG4gICAgMHg5NzczOiAweDgwMDAsXG4gICAgMHg5Nzc0OiAweDg0NDksXG4gICAgMHg5Nzc1OiAweDg0QzksXG4gICAgMHg5Nzc2OiAweDg5ODEsXG4gICAgMHg5Nzc3OiAweDhCMjEsXG4gICAgMHg5Nzc4OiAweDhFMEEsXG4gICAgMHg5Nzc5OiAweDkwNjUsXG4gICAgMHg5NzdBOiAweDk2N0QsXG4gICAgMHg5NzdCOiAweDk5MEEsXG4gICAgMHg5NzdDOiAweDYxN0UsXG4gICAgMHg5NzdEOiAweDYyOTEsXG4gICAgMHg5NzdFOiAweDZCMzIsXG4gICAgMHg5NzgwOiAweDZDODMsXG4gICAgMHg5NzgxOiAweDZENzQsXG4gICAgMHg5NzgyOiAweDdGQ0MsXG4gICAgMHg5NzgzOiAweDdGRkMsXG4gICAgMHg5Nzg0OiAweDZEQzAsXG4gICAgMHg5Nzg1OiAweDdGODUsXG4gICAgMHg5Nzg2OiAweDg3QkEsXG4gICAgMHg5Nzg3OiAweDg4RjgsXG4gICAgMHg5Nzg4OiAweDY3NjUsXG4gICAgMHg5Nzg5OiAweDgzQjEsXG4gICAgMHg5NzhBOiAweDk4M0MsXG4gICAgMHg5NzhCOiAweDk2RjcsXG4gICAgMHg5NzhDOiAweDZEMUIsXG4gICAgMHg5NzhEOiAweDdENjEsXG4gICAgMHg5NzhFOiAweDg0M0QsXG4gICAgMHg5NzhGOiAweDkxNkEsXG4gICAgMHg5NzkwOiAweDRFNzEsXG4gICAgMHg5NzkxOiAweDUzNzUsXG4gICAgMHg5NzkyOiAweDVENTAsXG4gICAgMHg5NzkzOiAweDZCMDQsXG4gICAgMHg5Nzk0OiAweDZGRUIsXG4gICAgMHg5Nzk1OiAweDg1Q0QsXG4gICAgMHg5Nzk2OiAweDg2MkQsXG4gICAgMHg5Nzk3OiAweDg5QTcsXG4gICAgMHg5Nzk4OiAweDUyMjksXG4gICAgMHg5Nzk5OiAweDU0MEYsXG4gICAgMHg5NzlBOiAweDVDNjUsXG4gICAgMHg5NzlCOiAweDY3NEUsXG4gICAgMHg5NzlDOiAweDY4QTgsXG4gICAgMHg5NzlEOiAweDc0MDYsXG4gICAgMHg5NzlFOiAweDc0ODMsXG4gICAgMHg5NzlGOiAweDc1RTIsXG4gICAgMHg5N0EwOiAweDg4Q0YsXG4gICAgMHg5N0ExOiAweDg4RTEsXG4gICAgMHg5N0EyOiAweDkxQ0MsXG4gICAgMHg5N0EzOiAweDk2RTIsXG4gICAgMHg5N0E0OiAweDk2NzgsXG4gICAgMHg5N0E1OiAweDVGOEIsXG4gICAgMHg5N0E2OiAweDczODcsXG4gICAgMHg5N0E3OiAweDdBQ0IsXG4gICAgMHg5N0E4OiAweDg0NEUsXG4gICAgMHg5N0E5OiAweDYzQTAsXG4gICAgMHg5N0FBOiAweDc1NjUsXG4gICAgMHg5N0FCOiAweDUyODksXG4gICAgMHg5N0FDOiAweDZENDEsXG4gICAgMHg5N0FEOiAweDZFOUMsXG4gICAgMHg5N0FFOiAweDc0MDksXG4gICAgMHg5N0FGOiAweDc1NTksXG4gICAgMHg5N0IwOiAweDc4NkIsXG4gICAgMHg5N0IxOiAweDdDOTIsXG4gICAgMHg5N0IyOiAweDk2ODYsXG4gICAgMHg5N0IzOiAweDdBREMsXG4gICAgMHg5N0I0OiAweDlGOEQsXG4gICAgMHg5N0I1OiAweDRGQjYsXG4gICAgMHg5N0I2OiAweDYxNkUsXG4gICAgMHg5N0I3OiAweDY1QzUsXG4gICAgMHg5N0I4OiAweDg2NUMsXG4gICAgMHg5N0I5OiAweDRFODYsXG4gICAgMHg5N0JBOiAweDRFQUUsXG4gICAgMHg5N0JCOiAweDUwREEsXG4gICAgMHg5N0JDOiAweDRFMjEsXG4gICAgMHg5N0JEOiAweDUxQ0MsXG4gICAgMHg5N0JFOiAweDVCRUUsXG4gICAgMHg5N0JGOiAweDY1OTksXG4gICAgMHg5N0MwOiAweDY4ODEsXG4gICAgMHg5N0MxOiAweDZEQkMsXG4gICAgMHg5N0MyOiAweDczMUYsXG4gICAgMHg5N0MzOiAweDc2NDIsXG4gICAgMHg5N0M0OiAweDc3QUQsXG4gICAgMHg5N0M1OiAweDdBMUMsXG4gICAgMHg5N0M2OiAweDdDRTcsXG4gICAgMHg5N0M3OiAweDgyNkYsXG4gICAgMHg5N0M4OiAweDhBRDIsXG4gICAgMHg5N0M5OiAweDkwN0MsXG4gICAgMHg5N0NBOiAweDkxQ0YsXG4gICAgMHg5N0NCOiAweDk2NzUsXG4gICAgMHg5N0NDOiAweDk4MTgsXG4gICAgMHg5N0NEOiAweDUyOUIsXG4gICAgMHg5N0NFOiAweDdERDEsXG4gICAgMHg5N0NGOiAweDUwMkIsXG4gICAgMHg5N0QwOiAweDUzOTgsXG4gICAgMHg5N0QxOiAweDY3OTcsXG4gICAgMHg5N0QyOiAweDZEQ0IsXG4gICAgMHg5N0QzOiAweDcxRDAsXG4gICAgMHg5N0Q0OiAweDc0MzMsXG4gICAgMHg5N0Q1OiAweDgxRTgsXG4gICAgMHg5N0Q2OiAweDhGMkEsXG4gICAgMHg5N0Q3OiAweDk2QTMsXG4gICAgMHg5N0Q4OiAweDlDNTcsXG4gICAgMHg5N0Q5OiAweDlFOUYsXG4gICAgMHg5N0RBOiAweDc0NjAsXG4gICAgMHg5N0RCOiAweDU4NDEsXG4gICAgMHg5N0RDOiAweDZEOTksXG4gICAgMHg5N0REOiAweDdEMkYsXG4gICAgMHg5N0RFOiAweDk4NUUsXG4gICAgMHg5N0RGOiAweDRFRTQsXG4gICAgMHg5N0UwOiAweDRGMzYsXG4gICAgMHg5N0UxOiAweDRGOEIsXG4gICAgMHg5N0UyOiAweDUxQjcsXG4gICAgMHg5N0UzOiAweDUyQjEsXG4gICAgMHg5N0U0OiAweDVEQkEsXG4gICAgMHg5N0U1OiAweDYwMUMsXG4gICAgMHg5N0U2OiAweDczQjIsXG4gICAgMHg5N0U3OiAweDc5M0MsXG4gICAgMHg5N0U4OiAweDgyRDMsXG4gICAgMHg5N0U5OiAweDkyMzQsXG4gICAgMHg5N0VBOiAweDk2QjcsXG4gICAgMHg5N0VCOiAweDk2RjYsXG4gICAgMHg5N0VDOiAweDk3MEEsXG4gICAgMHg5N0VEOiAweDlFOTcsXG4gICAgMHg5N0VFOiAweDlGNjIsXG4gICAgMHg5N0VGOiAweDY2QTYsXG4gICAgMHg5N0YwOiAweDZCNzQsXG4gICAgMHg5N0YxOiAweDUyMTcsXG4gICAgMHg5N0YyOiAweDUyQTMsXG4gICAgMHg5N0YzOiAweDcwQzgsXG4gICAgMHg5N0Y0OiAweDg4QzIsXG4gICAgMHg5N0Y1OiAweDVFQzksXG4gICAgMHg5N0Y2OiAweDYwNEIsXG4gICAgMHg5N0Y3OiAweDYxOTAsXG4gICAgMHg5N0Y4OiAweDZGMjMsXG4gICAgMHg5N0Y5OiAweDcxNDksXG4gICAgMHg5N0ZBOiAweDdDM0UsXG4gICAgMHg5N0ZCOiAweDdERjQsXG4gICAgMHg5N0ZDOiAweDgwNkYsXG4gICAgMHg5ODQwOiAweDg0RUUsXG4gICAgMHg5ODQxOiAweDkwMjMsXG4gICAgMHg5ODQyOiAweDkzMkMsXG4gICAgMHg5ODQzOiAweDU0NDIsXG4gICAgMHg5ODQ0OiAweDlCNkYsXG4gICAgMHg5ODQ1OiAweDZBRDMsXG4gICAgMHg5ODQ2OiAweDcwODksXG4gICAgMHg5ODQ3OiAweDhDQzIsXG4gICAgMHg5ODQ4OiAweDhERUYsXG4gICAgMHg5ODQ5OiAweDk3MzIsXG4gICAgMHg5ODRBOiAweDUyQjQsXG4gICAgMHg5ODRCOiAweDVBNDEsXG4gICAgMHg5ODRDOiAweDVFQ0EsXG4gICAgMHg5ODREOiAweDVGMDQsXG4gICAgMHg5ODRFOiAweDY3MTcsXG4gICAgMHg5ODRGOiAweDY5N0MsXG4gICAgMHg5ODUwOiAweDY5OTQsXG4gICAgMHg5ODUxOiAweDZENkEsXG4gICAgMHg5ODUyOiAweDZGMEYsXG4gICAgMHg5ODUzOiAweDcyNjIsXG4gICAgMHg5ODU0OiAweDcyRkMsXG4gICAgMHg5ODU1OiAweDdCRUQsXG4gICAgMHg5ODU2OiAweDgwMDEsXG4gICAgMHg5ODU3OiAweDgwN0UsXG4gICAgMHg5ODU4OiAweDg3NEIsXG4gICAgMHg5ODU5OiAweDkwQ0UsXG4gICAgMHg5ODVBOiAweDUxNkQsXG4gICAgMHg5ODVCOiAweDlFOTMsXG4gICAgMHg5ODVDOiAweDc5ODQsXG4gICAgMHg5ODVEOiAweDgwOEIsXG4gICAgMHg5ODVFOiAweDkzMzIsXG4gICAgMHg5ODVGOiAweDhBRDYsXG4gICAgMHg5ODYwOiAweDUwMkQsXG4gICAgMHg5ODYxOiAweDU0OEMsXG4gICAgMHg5ODYyOiAweDhBNzEsXG4gICAgMHg5ODYzOiAweDZCNkEsXG4gICAgMHg5ODY0OiAweDhDQzQsXG4gICAgMHg5ODY1OiAweDgxMDcsXG4gICAgMHg5ODY2OiAweDYwRDEsXG4gICAgMHg5ODY3OiAweDY3QTAsXG4gICAgMHg5ODY4OiAweDlERjIsXG4gICAgMHg5ODY5OiAweDRFOTksXG4gICAgMHg5ODZBOiAweDRFOTgsXG4gICAgMHg5ODZCOiAweDlDMTAsXG4gICAgMHg5ODZDOiAweDhBNkIsXG4gICAgMHg5ODZEOiAweDg1QzEsXG4gICAgMHg5ODZFOiAweDg1NjgsXG4gICAgMHg5ODZGOiAweDY5MDAsXG4gICAgMHg5ODcwOiAweDZFN0UsXG4gICAgMHg5ODcxOiAweDc4OTcsXG4gICAgMHg5ODcyOiAweDgxNTUsXG4gICAgMHg5ODlGOiAweDVGMEMsXG4gICAgMHg5OEEwOiAweDRFMTAsXG4gICAgMHg5OEExOiAweDRFMTUsXG4gICAgMHg5OEEyOiAweDRFMkEsXG4gICAgMHg5OEEzOiAweDRFMzEsXG4gICAgMHg5OEE0OiAweDRFMzYsXG4gICAgMHg5OEE1OiAweDRFM0MsXG4gICAgMHg5OEE2OiAweDRFM0YsXG4gICAgMHg5OEE3OiAweDRFNDIsXG4gICAgMHg5OEE4OiAweDRFNTYsXG4gICAgMHg5OEE5OiAweDRFNTgsXG4gICAgMHg5OEFBOiAweDRFODIsXG4gICAgMHg5OEFCOiAweDRFODUsXG4gICAgMHg5OEFDOiAweDhDNkIsXG4gICAgMHg5OEFEOiAweDRFOEEsXG4gICAgMHg5OEFFOiAweDgyMTIsXG4gICAgMHg5OEFGOiAweDVGMEQsXG4gICAgMHg5OEIwOiAweDRFOEUsXG4gICAgMHg5OEIxOiAweDRFOUUsXG4gICAgMHg5OEIyOiAweDRFOUYsXG4gICAgMHg5OEIzOiAweDRFQTAsXG4gICAgMHg5OEI0OiAweDRFQTIsXG4gICAgMHg5OEI1OiAweDRFQjAsXG4gICAgMHg5OEI2OiAweDRFQjMsXG4gICAgMHg5OEI3OiAweDRFQjYsXG4gICAgMHg5OEI4OiAweDRFQ0UsXG4gICAgMHg5OEI5OiAweDRFQ0QsXG4gICAgMHg5OEJBOiAweDRFQzQsXG4gICAgMHg5OEJCOiAweDRFQzYsXG4gICAgMHg5OEJDOiAweDRFQzIsXG4gICAgMHg5OEJEOiAweDRFRDcsXG4gICAgMHg5OEJFOiAweDRFREUsXG4gICAgMHg5OEJGOiAweDRFRUQsXG4gICAgMHg5OEMwOiAweDRFREYsXG4gICAgMHg5OEMxOiAweDRFRjcsXG4gICAgMHg5OEMyOiAweDRGMDksXG4gICAgMHg5OEMzOiAweDRGNUEsXG4gICAgMHg5OEM0OiAweDRGMzAsXG4gICAgMHg5OEM1OiAweDRGNUIsXG4gICAgMHg5OEM2OiAweDRGNUQsXG4gICAgMHg5OEM3OiAweDRGNTcsXG4gICAgMHg5OEM4OiAweDRGNDcsXG4gICAgMHg5OEM5OiAweDRGNzYsXG4gICAgMHg5OENBOiAweDRGODgsXG4gICAgMHg5OENCOiAweDRGOEYsXG4gICAgMHg5OENDOiAweDRGOTgsXG4gICAgMHg5OENEOiAweDRGN0IsXG4gICAgMHg5OENFOiAweDRGNjksXG4gICAgMHg5OENGOiAweDRGNzAsXG4gICAgMHg5OEQwOiAweDRGOTEsXG4gICAgMHg5OEQxOiAweDRGNkYsXG4gICAgMHg5OEQyOiAweDRGODYsXG4gICAgMHg5OEQzOiAweDRGOTYsXG4gICAgMHg5OEQ0OiAweDUxMTgsXG4gICAgMHg5OEQ1OiAweDRGRDQsXG4gICAgMHg5OEQ2OiAweDRGREYsXG4gICAgMHg5OEQ3OiAweDRGQ0UsXG4gICAgMHg5OEQ4OiAweDRGRDgsXG4gICAgMHg5OEQ5OiAweDRGREIsXG4gICAgMHg5OERBOiAweDRGRDEsXG4gICAgMHg5OERCOiAweDRGREEsXG4gICAgMHg5OERDOiAweDRGRDAsXG4gICAgMHg5OEREOiAweDRGRTQsXG4gICAgMHg5OERFOiAweDRGRTUsXG4gICAgMHg5OERGOiAweDUwMUEsXG4gICAgMHg5OEUwOiAweDUwMjgsXG4gICAgMHg5OEUxOiAweDUwMTQsXG4gICAgMHg5OEUyOiAweDUwMkEsXG4gICAgMHg5OEUzOiAweDUwMjUsXG4gICAgMHg5OEU0OiAweDUwMDUsXG4gICAgMHg5OEU1OiAweDRGMUMsXG4gICAgMHg5OEU2OiAweDRGRjYsXG4gICAgMHg5OEU3OiAweDUwMjEsXG4gICAgMHg5OEU4OiAweDUwMjksXG4gICAgMHg5OEU5OiAweDUwMkMsXG4gICAgMHg5OEVBOiAweDRGRkUsXG4gICAgMHg5OEVCOiAweDRGRUYsXG4gICAgMHg5OEVDOiAweDUwMTEsXG4gICAgMHg5OEVEOiAweDUwMDYsXG4gICAgMHg5OEVFOiAweDUwNDMsXG4gICAgMHg5OEVGOiAweDUwNDcsXG4gICAgMHg5OEYwOiAweDY3MDMsXG4gICAgMHg5OEYxOiAweDUwNTUsXG4gICAgMHg5OEYyOiAweDUwNTAsXG4gICAgMHg5OEYzOiAweDUwNDgsXG4gICAgMHg5OEY0OiAweDUwNUEsXG4gICAgMHg5OEY1OiAweDUwNTYsXG4gICAgMHg5OEY2OiAweDUwNkMsXG4gICAgMHg5OEY3OiAweDUwNzgsXG4gICAgMHg5OEY4OiAweDUwODAsXG4gICAgMHg5OEY5OiAweDUwOUEsXG4gICAgMHg5OEZBOiAweDUwODUsXG4gICAgMHg5OEZCOiAweDUwQjQsXG4gICAgMHg5OEZDOiAweDUwQjIsXG4gICAgMHg5OTQwOiAweDUwQzksXG4gICAgMHg5OTQxOiAweDUwQ0EsXG4gICAgMHg5OTQyOiAweDUwQjMsXG4gICAgMHg5OTQzOiAweDUwQzIsXG4gICAgMHg5OTQ0OiAweDUwRDYsXG4gICAgMHg5OTQ1OiAweDUwREUsXG4gICAgMHg5OTQ2OiAweDUwRTUsXG4gICAgMHg5OTQ3OiAweDUwRUQsXG4gICAgMHg5OTQ4OiAweDUwRTMsXG4gICAgMHg5OTQ5OiAweDUwRUUsXG4gICAgMHg5OTRBOiAweDUwRjksXG4gICAgMHg5OTRCOiAweDUwRjUsXG4gICAgMHg5OTRDOiAweDUxMDksXG4gICAgMHg5OTREOiAweDUxMDEsXG4gICAgMHg5OTRFOiAweDUxMDIsXG4gICAgMHg5OTRGOiAweDUxMTYsXG4gICAgMHg5OTUwOiAweDUxMTUsXG4gICAgMHg5OTUxOiAweDUxMTQsXG4gICAgMHg5OTUyOiAweDUxMUEsXG4gICAgMHg5OTUzOiAweDUxMjEsXG4gICAgMHg5OTU0OiAweDUxM0EsXG4gICAgMHg5OTU1OiAweDUxMzcsXG4gICAgMHg5OTU2OiAweDUxM0MsXG4gICAgMHg5OTU3OiAweDUxM0IsXG4gICAgMHg5OTU4OiAweDUxM0YsXG4gICAgMHg5OTU5OiAweDUxNDAsXG4gICAgMHg5OTVBOiAweDUxNTIsXG4gICAgMHg5OTVCOiAweDUxNEMsXG4gICAgMHg5OTVDOiAweDUxNTQsXG4gICAgMHg5OTVEOiAweDUxNjIsXG4gICAgMHg5OTVFOiAweDdBRjgsXG4gICAgMHg5OTVGOiAweDUxNjksXG4gICAgMHg5OTYwOiAweDUxNkEsXG4gICAgMHg5OTYxOiAweDUxNkUsXG4gICAgMHg5OTYyOiAweDUxODAsXG4gICAgMHg5OTYzOiAweDUxODIsXG4gICAgMHg5OTY0OiAweDU2RDgsXG4gICAgMHg5OTY1OiAweDUxOEMsXG4gICAgMHg5OTY2OiAweDUxODksXG4gICAgMHg5OTY3OiAweDUxOEYsXG4gICAgMHg5OTY4OiAweDUxOTEsXG4gICAgMHg5OTY5OiAweDUxOTMsXG4gICAgMHg5OTZBOiAweDUxOTUsXG4gICAgMHg5OTZCOiAweDUxOTYsXG4gICAgMHg5OTZDOiAweDUxQTQsXG4gICAgMHg5OTZEOiAweDUxQTYsXG4gICAgMHg5OTZFOiAweDUxQTIsXG4gICAgMHg5OTZGOiAweDUxQTksXG4gICAgMHg5OTcwOiAweDUxQUEsXG4gICAgMHg5OTcxOiAweDUxQUIsXG4gICAgMHg5OTcyOiAweDUxQjMsXG4gICAgMHg5OTczOiAweDUxQjEsXG4gICAgMHg5OTc0OiAweDUxQjIsXG4gICAgMHg5OTc1OiAweDUxQjAsXG4gICAgMHg5OTc2OiAweDUxQjUsXG4gICAgMHg5OTc3OiAweDUxQkQsXG4gICAgMHg5OTc4OiAweDUxQzUsXG4gICAgMHg5OTc5OiAweDUxQzksXG4gICAgMHg5OTdBOiAweDUxREIsXG4gICAgMHg5OTdCOiAweDUxRTAsXG4gICAgMHg5OTdDOiAweDg2NTUsXG4gICAgMHg5OTdEOiAweDUxRTksXG4gICAgMHg5OTdFOiAweDUxRUQsXG4gICAgMHg5OTgwOiAweDUxRjAsXG4gICAgMHg5OTgxOiAweDUxRjUsXG4gICAgMHg5OTgyOiAweDUxRkUsXG4gICAgMHg5OTgzOiAweDUyMDQsXG4gICAgMHg5OTg0OiAweDUyMEIsXG4gICAgMHg5OTg1OiAweDUyMTQsXG4gICAgMHg5OTg2OiAweDUyMEUsXG4gICAgMHg5OTg3OiAweDUyMjcsXG4gICAgMHg5OTg4OiAweDUyMkEsXG4gICAgMHg5OTg5OiAweDUyMkUsXG4gICAgMHg5OThBOiAweDUyMzMsXG4gICAgMHg5OThCOiAweDUyMzksXG4gICAgMHg5OThDOiAweDUyNEYsXG4gICAgMHg5OThEOiAweDUyNDQsXG4gICAgMHg5OThFOiAweDUyNEIsXG4gICAgMHg5OThGOiAweDUyNEMsXG4gICAgMHg5OTkwOiAweDUyNUUsXG4gICAgMHg5OTkxOiAweDUyNTQsXG4gICAgMHg5OTkyOiAweDUyNkEsXG4gICAgMHg5OTkzOiAweDUyNzQsXG4gICAgMHg5OTk0OiAweDUyNjksXG4gICAgMHg5OTk1OiAweDUyNzMsXG4gICAgMHg5OTk2OiAweDUyN0YsXG4gICAgMHg5OTk3OiAweDUyN0QsXG4gICAgMHg5OTk4OiAweDUyOEQsXG4gICAgMHg5OTk5OiAweDUyOTQsXG4gICAgMHg5OTlBOiAweDUyOTIsXG4gICAgMHg5OTlCOiAweDUyNzEsXG4gICAgMHg5OTlDOiAweDUyODgsXG4gICAgMHg5OTlEOiAweDUyOTEsXG4gICAgMHg5OTlFOiAweDhGQTgsXG4gICAgMHg5OTlGOiAweDhGQTcsXG4gICAgMHg5OUEwOiAweDUyQUMsXG4gICAgMHg5OUExOiAweDUyQUQsXG4gICAgMHg5OUEyOiAweDUyQkMsXG4gICAgMHg5OUEzOiAweDUyQjUsXG4gICAgMHg5OUE0OiAweDUyQzEsXG4gICAgMHg5OUE1OiAweDUyQ0QsXG4gICAgMHg5OUE2OiAweDUyRDcsXG4gICAgMHg5OUE3OiAweDUyREUsXG4gICAgMHg5OUE4OiAweDUyRTMsXG4gICAgMHg5OUE5OiAweDUyRTYsXG4gICAgMHg5OUFBOiAweDk4RUQsXG4gICAgMHg5OUFCOiAweDUyRTAsXG4gICAgMHg5OUFDOiAweDUyRjMsXG4gICAgMHg5OUFEOiAweDUyRjUsXG4gICAgMHg5OUFFOiAweDUyRjgsXG4gICAgMHg5OUFGOiAweDUyRjksXG4gICAgMHg5OUIwOiAweDUzMDYsXG4gICAgMHg5OUIxOiAweDUzMDgsXG4gICAgMHg5OUIyOiAweDc1MzgsXG4gICAgMHg5OUIzOiAweDUzMEQsXG4gICAgMHg5OUI0OiAweDUzMTAsXG4gICAgMHg5OUI1OiAweDUzMEYsXG4gICAgMHg5OUI2OiAweDUzMTUsXG4gICAgMHg5OUI3OiAweDUzMUEsXG4gICAgMHg5OUI4OiAweDUzMjMsXG4gICAgMHg5OUI5OiAweDUzMkYsXG4gICAgMHg5OUJBOiAweDUzMzEsXG4gICAgMHg5OUJCOiAweDUzMzMsXG4gICAgMHg5OUJDOiAweDUzMzgsXG4gICAgMHg5OUJEOiAweDUzNDAsXG4gICAgMHg5OUJFOiAweDUzNDYsXG4gICAgMHg5OUJGOiAweDUzNDUsXG4gICAgMHg5OUMwOiAweDRFMTcsXG4gICAgMHg5OUMxOiAweDUzNDksXG4gICAgMHg5OUMyOiAweDUzNEQsXG4gICAgMHg5OUMzOiAweDUxRDYsXG4gICAgMHg5OUM0OiAweDUzNUUsXG4gICAgMHg5OUM1OiAweDUzNjksXG4gICAgMHg5OUM2OiAweDUzNkUsXG4gICAgMHg5OUM3OiAweDU5MTgsXG4gICAgMHg5OUM4OiAweDUzN0IsXG4gICAgMHg5OUM5OiAweDUzNzcsXG4gICAgMHg5OUNBOiAweDUzODIsXG4gICAgMHg5OUNCOiAweDUzOTYsXG4gICAgMHg5OUNDOiAweDUzQTAsXG4gICAgMHg5OUNEOiAweDUzQTYsXG4gICAgMHg5OUNFOiAweDUzQTUsXG4gICAgMHg5OUNGOiAweDUzQUUsXG4gICAgMHg5OUQwOiAweDUzQjAsXG4gICAgMHg5OUQxOiAweDUzQjYsXG4gICAgMHg5OUQyOiAweDUzQzMsXG4gICAgMHg5OUQzOiAweDdDMTIsXG4gICAgMHg5OUQ0OiAweDk2RDksXG4gICAgMHg5OUQ1OiAweDUzREYsXG4gICAgMHg5OUQ2OiAweDY2RkMsXG4gICAgMHg5OUQ3OiAweDcxRUUsXG4gICAgMHg5OUQ4OiAweDUzRUUsXG4gICAgMHg5OUQ5OiAweDUzRTgsXG4gICAgMHg5OURBOiAweDUzRUQsXG4gICAgMHg5OURCOiAweDUzRkEsXG4gICAgMHg5OURDOiAweDU0MDEsXG4gICAgMHg5OUREOiAweDU0M0QsXG4gICAgMHg5OURFOiAweDU0NDAsXG4gICAgMHg5OURGOiAweDU0MkMsXG4gICAgMHg5OUUwOiAweDU0MkQsXG4gICAgMHg5OUUxOiAweDU0M0MsXG4gICAgMHg5OUUyOiAweDU0MkUsXG4gICAgMHg5OUUzOiAweDU0MzYsXG4gICAgMHg5OUU0OiAweDU0MjksXG4gICAgMHg5OUU1OiAweDU0MUQsXG4gICAgMHg5OUU2OiAweDU0NEUsXG4gICAgMHg5OUU3OiAweDU0OEYsXG4gICAgMHg5OUU4OiAweDU0NzUsXG4gICAgMHg5OUU5OiAweDU0OEUsXG4gICAgMHg5OUVBOiAweDU0NUYsXG4gICAgMHg5OUVCOiAweDU0NzEsXG4gICAgMHg5OUVDOiAweDU0NzcsXG4gICAgMHg5OUVEOiAweDU0NzAsXG4gICAgMHg5OUVFOiAweDU0OTIsXG4gICAgMHg5OUVGOiAweDU0N0IsXG4gICAgMHg5OUYwOiAweDU0ODAsXG4gICAgMHg5OUYxOiAweDU0NzYsXG4gICAgMHg5OUYyOiAweDU0ODQsXG4gICAgMHg5OUYzOiAweDU0OTAsXG4gICAgMHg5OUY0OiAweDU0ODYsXG4gICAgMHg5OUY1OiAweDU0QzcsXG4gICAgMHg5OUY2OiAweDU0QTIsXG4gICAgMHg5OUY3OiAweDU0QjgsXG4gICAgMHg5OUY4OiAweDU0QTUsXG4gICAgMHg5OUY5OiAweDU0QUMsXG4gICAgMHg5OUZBOiAweDU0QzQsXG4gICAgMHg5OUZCOiAweDU0QzgsXG4gICAgMHg5OUZDOiAweDU0QTgsXG4gICAgMHg5QTQwOiAweDU0QUIsXG4gICAgMHg5QTQxOiAweDU0QzIsXG4gICAgMHg5QTQyOiAweDU0QTQsXG4gICAgMHg5QTQzOiAweDU0QkUsXG4gICAgMHg5QTQ0OiAweDU0QkMsXG4gICAgMHg5QTQ1OiAweDU0RDgsXG4gICAgMHg5QTQ2OiAweDU0RTUsXG4gICAgMHg5QTQ3OiAweDU0RTYsXG4gICAgMHg5QTQ4OiAweDU1MEYsXG4gICAgMHg5QTQ5OiAweDU1MTQsXG4gICAgMHg5QTRBOiAweDU0RkQsXG4gICAgMHg5QTRCOiAweDU0RUUsXG4gICAgMHg5QTRDOiAweDU0RUQsXG4gICAgMHg5QTREOiAweDU0RkEsXG4gICAgMHg5QTRFOiAweDU0RTIsXG4gICAgMHg5QTRGOiAweDU1MzksXG4gICAgMHg5QTUwOiAweDU1NDAsXG4gICAgMHg5QTUxOiAweDU1NjMsXG4gICAgMHg5QTUyOiAweDU1NEMsXG4gICAgMHg5QTUzOiAweDU1MkUsXG4gICAgMHg5QTU0OiAweDU1NUMsXG4gICAgMHg5QTU1OiAweDU1NDUsXG4gICAgMHg5QTU2OiAweDU1NTYsXG4gICAgMHg5QTU3OiAweDU1NTcsXG4gICAgMHg5QTU4OiAweDU1MzgsXG4gICAgMHg5QTU5OiAweDU1MzMsXG4gICAgMHg5QTVBOiAweDU1NUQsXG4gICAgMHg5QTVCOiAweDU1OTksXG4gICAgMHg5QTVDOiAweDU1ODAsXG4gICAgMHg5QTVEOiAweDU0QUYsXG4gICAgMHg5QTVFOiAweDU1OEEsXG4gICAgMHg5QTVGOiAweDU1OUYsXG4gICAgMHg5QTYwOiAweDU1N0IsXG4gICAgMHg5QTYxOiAweDU1N0UsXG4gICAgMHg5QTYyOiAweDU1OTgsXG4gICAgMHg5QTYzOiAweDU1OUUsXG4gICAgMHg5QTY0OiAweDU1QUUsXG4gICAgMHg5QTY1OiAweDU1N0MsXG4gICAgMHg5QTY2OiAweDU1ODMsXG4gICAgMHg5QTY3OiAweDU1QTksXG4gICAgMHg5QTY4OiAweDU1ODcsXG4gICAgMHg5QTY5OiAweDU1QTgsXG4gICAgMHg5QTZBOiAweDU1REEsXG4gICAgMHg5QTZCOiAweDU1QzUsXG4gICAgMHg5QTZDOiAweDU1REYsXG4gICAgMHg5QTZEOiAweDU1QzQsXG4gICAgMHg5QTZFOiAweDU1REMsXG4gICAgMHg5QTZGOiAweDU1RTQsXG4gICAgMHg5QTcwOiAweDU1RDQsXG4gICAgMHg5QTcxOiAweDU2MTQsXG4gICAgMHg5QTcyOiAweDU1RjcsXG4gICAgMHg5QTczOiAweDU2MTYsXG4gICAgMHg5QTc0OiAweDU1RkUsXG4gICAgMHg5QTc1OiAweDU1RkQsXG4gICAgMHg5QTc2OiAweDU2MUIsXG4gICAgMHg5QTc3OiAweDU1RjksXG4gICAgMHg5QTc4OiAweDU2NEUsXG4gICAgMHg5QTc5OiAweDU2NTAsXG4gICAgMHg5QTdBOiAweDcxREYsXG4gICAgMHg5QTdCOiAweDU2MzQsXG4gICAgMHg5QTdDOiAweDU2MzYsXG4gICAgMHg5QTdEOiAweDU2MzIsXG4gICAgMHg5QTdFOiAweDU2MzgsXG4gICAgMHg5QTgwOiAweDU2NkIsXG4gICAgMHg5QTgxOiAweDU2NjQsXG4gICAgMHg5QTgyOiAweDU2MkYsXG4gICAgMHg5QTgzOiAweDU2NkMsXG4gICAgMHg5QTg0OiAweDU2NkEsXG4gICAgMHg5QTg1OiAweDU2ODYsXG4gICAgMHg5QTg2OiAweDU2ODAsXG4gICAgMHg5QTg3OiAweDU2OEEsXG4gICAgMHg5QTg4OiAweDU2QTAsXG4gICAgMHg5QTg5OiAweDU2OTQsXG4gICAgMHg5QThBOiAweDU2OEYsXG4gICAgMHg5QThCOiAweDU2QTUsXG4gICAgMHg5QThDOiAweDU2QUUsXG4gICAgMHg5QThEOiAweDU2QjYsXG4gICAgMHg5QThFOiAweDU2QjQsXG4gICAgMHg5QThGOiAweDU2QzIsXG4gICAgMHg5QTkwOiAweDU2QkMsXG4gICAgMHg5QTkxOiAweDU2QzEsXG4gICAgMHg5QTkyOiAweDU2QzMsXG4gICAgMHg5QTkzOiAweDU2QzAsXG4gICAgMHg5QTk0OiAweDU2QzgsXG4gICAgMHg5QTk1OiAweDU2Q0UsXG4gICAgMHg5QTk2OiAweDU2RDEsXG4gICAgMHg5QTk3OiAweDU2RDMsXG4gICAgMHg5QTk4OiAweDU2RDcsXG4gICAgMHg5QTk5OiAweDU2RUUsXG4gICAgMHg5QTlBOiAweDU2RjksXG4gICAgMHg5QTlCOiAweDU3MDAsXG4gICAgMHg5QTlDOiAweDU2RkYsXG4gICAgMHg5QTlEOiAweDU3MDQsXG4gICAgMHg5QTlFOiAweDU3MDksXG4gICAgMHg5QTlGOiAweDU3MDgsXG4gICAgMHg5QUEwOiAweDU3MEIsXG4gICAgMHg5QUExOiAweDU3MEQsXG4gICAgMHg5QUEyOiAweDU3MTMsXG4gICAgMHg5QUEzOiAweDU3MTgsXG4gICAgMHg5QUE0OiAweDU3MTYsXG4gICAgMHg5QUE1OiAweDU1QzcsXG4gICAgMHg5QUE2OiAweDU3MUMsXG4gICAgMHg5QUE3OiAweDU3MjYsXG4gICAgMHg5QUE4OiAweDU3MzcsXG4gICAgMHg5QUE5OiAweDU3MzgsXG4gICAgMHg5QUFBOiAweDU3NEUsXG4gICAgMHg5QUFCOiAweDU3M0IsXG4gICAgMHg5QUFDOiAweDU3NDAsXG4gICAgMHg5QUFEOiAweDU3NEYsXG4gICAgMHg5QUFFOiAweDU3NjksXG4gICAgMHg5QUFGOiAweDU3QzAsXG4gICAgMHg5QUIwOiAweDU3ODgsXG4gICAgMHg5QUIxOiAweDU3NjEsXG4gICAgMHg5QUIyOiAweDU3N0YsXG4gICAgMHg5QUIzOiAweDU3ODksXG4gICAgMHg5QUI0OiAweDU3OTMsXG4gICAgMHg5QUI1OiAweDU3QTAsXG4gICAgMHg5QUI2OiAweDU3QjMsXG4gICAgMHg5QUI3OiAweDU3QTQsXG4gICAgMHg5QUI4OiAweDU3QUEsXG4gICAgMHg5QUI5OiAweDU3QjAsXG4gICAgMHg5QUJBOiAweDU3QzMsXG4gICAgMHg5QUJCOiAweDU3QzYsXG4gICAgMHg5QUJDOiAweDU3RDQsXG4gICAgMHg5QUJEOiAweDU3RDIsXG4gICAgMHg5QUJFOiAweDU3RDMsXG4gICAgMHg5QUJGOiAweDU4MEEsXG4gICAgMHg5QUMwOiAweDU3RDYsXG4gICAgMHg5QUMxOiAweDU3RTMsXG4gICAgMHg5QUMyOiAweDU4MEIsXG4gICAgMHg5QUMzOiAweDU4MTksXG4gICAgMHg5QUM0OiAweDU4MUQsXG4gICAgMHg5QUM1OiAweDU4NzIsXG4gICAgMHg5QUM2OiAweDU4MjEsXG4gICAgMHg5QUM3OiAweDU4NjIsXG4gICAgMHg5QUM4OiAweDU4NEIsXG4gICAgMHg5QUM5OiAweDU4NzAsXG4gICAgMHg5QUNBOiAweDZCQzAsXG4gICAgMHg5QUNCOiAweDU4NTIsXG4gICAgMHg5QUNDOiAweDU4M0QsXG4gICAgMHg5QUNEOiAweDU4NzksXG4gICAgMHg5QUNFOiAweDU4ODUsXG4gICAgMHg5QUNGOiAweDU4QjksXG4gICAgMHg5QUQwOiAweDU4OUYsXG4gICAgMHg5QUQxOiAweDU4QUIsXG4gICAgMHg5QUQyOiAweDU4QkEsXG4gICAgMHg5QUQzOiAweDU4REUsXG4gICAgMHg5QUQ0OiAweDU4QkIsXG4gICAgMHg5QUQ1OiAweDU4QjgsXG4gICAgMHg5QUQ2OiAweDU4QUUsXG4gICAgMHg5QUQ3OiAweDU4QzUsXG4gICAgMHg5QUQ4OiAweDU4RDMsXG4gICAgMHg5QUQ5OiAweDU4RDEsXG4gICAgMHg5QURBOiAweDU4RDcsXG4gICAgMHg5QURCOiAweDU4RDksXG4gICAgMHg5QURDOiAweDU4RDgsXG4gICAgMHg5QUREOiAweDU4RTUsXG4gICAgMHg5QURFOiAweDU4REMsXG4gICAgMHg5QURGOiAweDU4RTQsXG4gICAgMHg5QUUwOiAweDU4REYsXG4gICAgMHg5QUUxOiAweDU4RUYsXG4gICAgMHg5QUUyOiAweDU4RkEsXG4gICAgMHg5QUUzOiAweDU4RjksXG4gICAgMHg5QUU0OiAweDU4RkIsXG4gICAgMHg5QUU1OiAweDU4RkMsXG4gICAgMHg5QUU2OiAweDU4RkQsXG4gICAgMHg5QUU3OiAweDU5MDIsXG4gICAgMHg5QUU4OiAweDU5MEEsXG4gICAgMHg5QUU5OiAweDU5MTAsXG4gICAgMHg5QUVBOiAweDU5MUIsXG4gICAgMHg5QUVCOiAweDY4QTYsXG4gICAgMHg5QUVDOiAweDU5MjUsXG4gICAgMHg5QUVEOiAweDU5MkMsXG4gICAgMHg5QUVFOiAweDU5MkQsXG4gICAgMHg5QUVGOiAweDU5MzIsXG4gICAgMHg5QUYwOiAweDU5MzgsXG4gICAgMHg5QUYxOiAweDU5M0UsXG4gICAgMHg5QUYyOiAweDdBRDIsXG4gICAgMHg5QUYzOiAweDU5NTUsXG4gICAgMHg5QUY0OiAweDU5NTAsXG4gICAgMHg5QUY1OiAweDU5NEUsXG4gICAgMHg5QUY2OiAweDU5NUEsXG4gICAgMHg5QUY3OiAweDU5NTgsXG4gICAgMHg5QUY4OiAweDU5NjIsXG4gICAgMHg5QUY5OiAweDU5NjAsXG4gICAgMHg5QUZBOiAweDU5NjcsXG4gICAgMHg5QUZCOiAweDU5NkMsXG4gICAgMHg5QUZDOiAweDU5NjksXG4gICAgMHg5QjQwOiAweDU5NzgsXG4gICAgMHg5QjQxOiAweDU5ODEsXG4gICAgMHg5QjQyOiAweDU5OUQsXG4gICAgMHg5QjQzOiAweDRGNUUsXG4gICAgMHg5QjQ0OiAweDRGQUIsXG4gICAgMHg5QjQ1OiAweDU5QTMsXG4gICAgMHg5QjQ2OiAweDU5QjIsXG4gICAgMHg5QjQ3OiAweDU5QzYsXG4gICAgMHg5QjQ4OiAweDU5RTgsXG4gICAgMHg5QjQ5OiAweDU5REMsXG4gICAgMHg5QjRBOiAweDU5OEQsXG4gICAgMHg5QjRCOiAweDU5RDksXG4gICAgMHg5QjRDOiAweDU5REEsXG4gICAgMHg5QjREOiAweDVBMjUsXG4gICAgMHg5QjRFOiAweDVBMUYsXG4gICAgMHg5QjRGOiAweDVBMTEsXG4gICAgMHg5QjUwOiAweDVBMUMsXG4gICAgMHg5QjUxOiAweDVBMDksXG4gICAgMHg5QjUyOiAweDVBMUEsXG4gICAgMHg5QjUzOiAweDVBNDAsXG4gICAgMHg5QjU0OiAweDVBNkMsXG4gICAgMHg5QjU1OiAweDVBNDksXG4gICAgMHg5QjU2OiAweDVBMzUsXG4gICAgMHg5QjU3OiAweDVBMzYsXG4gICAgMHg5QjU4OiAweDVBNjIsXG4gICAgMHg5QjU5OiAweDVBNkEsXG4gICAgMHg5QjVBOiAweDVBOUEsXG4gICAgMHg5QjVCOiAweDVBQkMsXG4gICAgMHg5QjVDOiAweDVBQkUsXG4gICAgMHg5QjVEOiAweDVBQ0IsXG4gICAgMHg5QjVFOiAweDVBQzIsXG4gICAgMHg5QjVGOiAweDVBQkQsXG4gICAgMHg5QjYwOiAweDVBRTMsXG4gICAgMHg5QjYxOiAweDVBRDcsXG4gICAgMHg5QjYyOiAweDVBRTYsXG4gICAgMHg5QjYzOiAweDVBRTksXG4gICAgMHg5QjY0OiAweDVBRDYsXG4gICAgMHg5QjY1OiAweDVBRkEsXG4gICAgMHg5QjY2OiAweDVBRkIsXG4gICAgMHg5QjY3OiAweDVCMEMsXG4gICAgMHg5QjY4OiAweDVCMEIsXG4gICAgMHg5QjY5OiAweDVCMTYsXG4gICAgMHg5QjZBOiAweDVCMzIsXG4gICAgMHg5QjZCOiAweDVBRDAsXG4gICAgMHg5QjZDOiAweDVCMkEsXG4gICAgMHg5QjZEOiAweDVCMzYsXG4gICAgMHg5QjZFOiAweDVCM0UsXG4gICAgMHg5QjZGOiAweDVCNDMsXG4gICAgMHg5QjcwOiAweDVCNDUsXG4gICAgMHg5QjcxOiAweDVCNDAsXG4gICAgMHg5QjcyOiAweDVCNTEsXG4gICAgMHg5QjczOiAweDVCNTUsXG4gICAgMHg5Qjc0OiAweDVCNUEsXG4gICAgMHg5Qjc1OiAweDVCNUIsXG4gICAgMHg5Qjc2OiAweDVCNjUsXG4gICAgMHg5Qjc3OiAweDVCNjksXG4gICAgMHg5Qjc4OiAweDVCNzAsXG4gICAgMHg5Qjc5OiAweDVCNzMsXG4gICAgMHg5QjdBOiAweDVCNzUsXG4gICAgMHg5QjdCOiAweDVCNzgsXG4gICAgMHg5QjdDOiAweDY1ODgsXG4gICAgMHg5QjdEOiAweDVCN0EsXG4gICAgMHg5QjdFOiAweDVCODAsXG4gICAgMHg5QjgwOiAweDVCODMsXG4gICAgMHg5QjgxOiAweDVCQTYsXG4gICAgMHg5QjgyOiAweDVCQjgsXG4gICAgMHg5QjgzOiAweDVCQzMsXG4gICAgMHg5Qjg0OiAweDVCQzcsXG4gICAgMHg5Qjg1OiAweDVCQzksXG4gICAgMHg5Qjg2OiAweDVCRDQsXG4gICAgMHg5Qjg3OiAweDVCRDAsXG4gICAgMHg5Qjg4OiAweDVCRTQsXG4gICAgMHg5Qjg5OiAweDVCRTYsXG4gICAgMHg5QjhBOiAweDVCRTIsXG4gICAgMHg5QjhCOiAweDVCREUsXG4gICAgMHg5QjhDOiAweDVCRTUsXG4gICAgMHg5QjhEOiAweDVCRUIsXG4gICAgMHg5QjhFOiAweDVCRjAsXG4gICAgMHg5QjhGOiAweDVCRjYsXG4gICAgMHg5QjkwOiAweDVCRjMsXG4gICAgMHg5QjkxOiAweDVDMDUsXG4gICAgMHg5QjkyOiAweDVDMDcsXG4gICAgMHg5QjkzOiAweDVDMDgsXG4gICAgMHg5Qjk0OiAweDVDMEQsXG4gICAgMHg5Qjk1OiAweDVDMTMsXG4gICAgMHg5Qjk2OiAweDVDMjAsXG4gICAgMHg5Qjk3OiAweDVDMjIsXG4gICAgMHg5Qjk4OiAweDVDMjgsXG4gICAgMHg5Qjk5OiAweDVDMzgsXG4gICAgMHg5QjlBOiAweDVDMzksXG4gICAgMHg5QjlCOiAweDVDNDEsXG4gICAgMHg5QjlDOiAweDVDNDYsXG4gICAgMHg5QjlEOiAweDVDNEUsXG4gICAgMHg5QjlFOiAweDVDNTMsXG4gICAgMHg5QjlGOiAweDVDNTAsXG4gICAgMHg5QkEwOiAweDVDNEYsXG4gICAgMHg5QkExOiAweDVCNzEsXG4gICAgMHg5QkEyOiAweDVDNkMsXG4gICAgMHg5QkEzOiAweDVDNkUsXG4gICAgMHg5QkE0OiAweDRFNjIsXG4gICAgMHg5QkE1OiAweDVDNzYsXG4gICAgMHg5QkE2OiAweDVDNzksXG4gICAgMHg5QkE3OiAweDVDOEMsXG4gICAgMHg5QkE4OiAweDVDOTEsXG4gICAgMHg5QkE5OiAweDVDOTQsXG4gICAgMHg5QkFBOiAweDU5OUIsXG4gICAgMHg5QkFCOiAweDVDQUIsXG4gICAgMHg5QkFDOiAweDVDQkIsXG4gICAgMHg5QkFEOiAweDVDQjYsXG4gICAgMHg5QkFFOiAweDVDQkMsXG4gICAgMHg5QkFGOiAweDVDQjcsXG4gICAgMHg5QkIwOiAweDVDQzUsXG4gICAgMHg5QkIxOiAweDVDQkUsXG4gICAgMHg5QkIyOiAweDVDQzcsXG4gICAgMHg5QkIzOiAweDVDRDksXG4gICAgMHg5QkI0OiAweDVDRTksXG4gICAgMHg5QkI1OiAweDVDRkQsXG4gICAgMHg5QkI2OiAweDVDRkEsXG4gICAgMHg5QkI3OiAweDVDRUQsXG4gICAgMHg5QkI4OiAweDVEOEMsXG4gICAgMHg5QkI5OiAweDVDRUEsXG4gICAgMHg5QkJBOiAweDVEMEIsXG4gICAgMHg5QkJCOiAweDVEMTUsXG4gICAgMHg5QkJDOiAweDVEMTcsXG4gICAgMHg5QkJEOiAweDVENUMsXG4gICAgMHg5QkJFOiAweDVEMUYsXG4gICAgMHg5QkJGOiAweDVEMUIsXG4gICAgMHg5QkMwOiAweDVEMTEsXG4gICAgMHg5QkMxOiAweDVEMTQsXG4gICAgMHg5QkMyOiAweDVEMjIsXG4gICAgMHg5QkMzOiAweDVEMUEsXG4gICAgMHg5QkM0OiAweDVEMTksXG4gICAgMHg5QkM1OiAweDVEMTgsXG4gICAgMHg5QkM2OiAweDVENEMsXG4gICAgMHg5QkM3OiAweDVENTIsXG4gICAgMHg5QkM4OiAweDVENEUsXG4gICAgMHg5QkM5OiAweDVENEIsXG4gICAgMHg5QkNBOiAweDVENkMsXG4gICAgMHg5QkNCOiAweDVENzMsXG4gICAgMHg5QkNDOiAweDVENzYsXG4gICAgMHg5QkNEOiAweDVEODcsXG4gICAgMHg5QkNFOiAweDVEODQsXG4gICAgMHg5QkNGOiAweDVEODIsXG4gICAgMHg5QkQwOiAweDVEQTIsXG4gICAgMHg5QkQxOiAweDVEOUQsXG4gICAgMHg5QkQyOiAweDVEQUMsXG4gICAgMHg5QkQzOiAweDVEQUUsXG4gICAgMHg5QkQ0OiAweDVEQkQsXG4gICAgMHg5QkQ1OiAweDVEOTAsXG4gICAgMHg5QkQ2OiAweDVEQjcsXG4gICAgMHg5QkQ3OiAweDVEQkMsXG4gICAgMHg5QkQ4OiAweDVEQzksXG4gICAgMHg5QkQ5OiAweDVEQ0QsXG4gICAgMHg5QkRBOiAweDVERDMsXG4gICAgMHg5QkRCOiAweDVERDIsXG4gICAgMHg5QkRDOiAweDVERDYsXG4gICAgMHg5QkREOiAweDVEREIsXG4gICAgMHg5QkRFOiAweDVERUIsXG4gICAgMHg5QkRGOiAweDVERjIsXG4gICAgMHg5QkUwOiAweDVERjUsXG4gICAgMHg5QkUxOiAweDVFMEIsXG4gICAgMHg5QkUyOiAweDVFMUEsXG4gICAgMHg5QkUzOiAweDVFMTksXG4gICAgMHg5QkU0OiAweDVFMTEsXG4gICAgMHg5QkU1OiAweDVFMUIsXG4gICAgMHg5QkU2OiAweDVFMzYsXG4gICAgMHg5QkU3OiAweDVFMzcsXG4gICAgMHg5QkU4OiAweDVFNDQsXG4gICAgMHg5QkU5OiAweDVFNDMsXG4gICAgMHg5QkVBOiAweDVFNDAsXG4gICAgMHg5QkVCOiAweDVFNEUsXG4gICAgMHg5QkVDOiAweDVFNTcsXG4gICAgMHg5QkVEOiAweDVFNTQsXG4gICAgMHg5QkVFOiAweDVFNUYsXG4gICAgMHg5QkVGOiAweDVFNjIsXG4gICAgMHg5QkYwOiAweDVFNjQsXG4gICAgMHg5QkYxOiAweDVFNDcsXG4gICAgMHg5QkYyOiAweDVFNzUsXG4gICAgMHg5QkYzOiAweDVFNzYsXG4gICAgMHg5QkY0OiAweDVFN0EsXG4gICAgMHg5QkY1OiAweDlFQkMsXG4gICAgMHg5QkY2OiAweDVFN0YsXG4gICAgMHg5QkY3OiAweDVFQTAsXG4gICAgMHg5QkY4OiAweDVFQzEsXG4gICAgMHg5QkY5OiAweDVFQzIsXG4gICAgMHg5QkZBOiAweDVFQzgsXG4gICAgMHg5QkZCOiAweDVFRDAsXG4gICAgMHg5QkZDOiAweDVFQ0YsXG4gICAgMHg5QzQwOiAweDVFRDYsXG4gICAgMHg5QzQxOiAweDVFRTMsXG4gICAgMHg5QzQyOiAweDVFREQsXG4gICAgMHg5QzQzOiAweDVFREEsXG4gICAgMHg5QzQ0OiAweDVFREIsXG4gICAgMHg5QzQ1OiAweDVFRTIsXG4gICAgMHg5QzQ2OiAweDVFRTEsXG4gICAgMHg5QzQ3OiAweDVFRTgsXG4gICAgMHg5QzQ4OiAweDVFRTksXG4gICAgMHg5QzQ5OiAweDVFRUMsXG4gICAgMHg5QzRBOiAweDVFRjEsXG4gICAgMHg5QzRCOiAweDVFRjMsXG4gICAgMHg5QzRDOiAweDVFRjAsXG4gICAgMHg5QzREOiAweDVFRjQsXG4gICAgMHg5QzRFOiAweDVFRjgsXG4gICAgMHg5QzRGOiAweDVFRkUsXG4gICAgMHg5QzUwOiAweDVGMDMsXG4gICAgMHg5QzUxOiAweDVGMDksXG4gICAgMHg5QzUyOiAweDVGNUQsXG4gICAgMHg5QzUzOiAweDVGNUMsXG4gICAgMHg5QzU0OiAweDVGMEIsXG4gICAgMHg5QzU1OiAweDVGMTEsXG4gICAgMHg5QzU2OiAweDVGMTYsXG4gICAgMHg5QzU3OiAweDVGMjksXG4gICAgMHg5QzU4OiAweDVGMkQsXG4gICAgMHg5QzU5OiAweDVGMzgsXG4gICAgMHg5QzVBOiAweDVGNDEsXG4gICAgMHg5QzVCOiAweDVGNDgsXG4gICAgMHg5QzVDOiAweDVGNEMsXG4gICAgMHg5QzVEOiAweDVGNEUsXG4gICAgMHg5QzVFOiAweDVGMkYsXG4gICAgMHg5QzVGOiAweDVGNTEsXG4gICAgMHg5QzYwOiAweDVGNTYsXG4gICAgMHg5QzYxOiAweDVGNTcsXG4gICAgMHg5QzYyOiAweDVGNTksXG4gICAgMHg5QzYzOiAweDVGNjEsXG4gICAgMHg5QzY0OiAweDVGNkQsXG4gICAgMHg5QzY1OiAweDVGNzMsXG4gICAgMHg5QzY2OiAweDVGNzcsXG4gICAgMHg5QzY3OiAweDVGODMsXG4gICAgMHg5QzY4OiAweDVGODIsXG4gICAgMHg5QzY5OiAweDVGN0YsXG4gICAgMHg5QzZBOiAweDVGOEEsXG4gICAgMHg5QzZCOiAweDVGODgsXG4gICAgMHg5QzZDOiAweDVGOTEsXG4gICAgMHg5QzZEOiAweDVGODcsXG4gICAgMHg5QzZFOiAweDVGOUUsXG4gICAgMHg5QzZGOiAweDVGOTksXG4gICAgMHg5QzcwOiAweDVGOTgsXG4gICAgMHg5QzcxOiAweDVGQTAsXG4gICAgMHg5QzcyOiAweDVGQTgsXG4gICAgMHg5QzczOiAweDVGQUQsXG4gICAgMHg5Qzc0OiAweDVGQkMsXG4gICAgMHg5Qzc1OiAweDVGRDYsXG4gICAgMHg5Qzc2OiAweDVGRkIsXG4gICAgMHg5Qzc3OiAweDVGRTQsXG4gICAgMHg5Qzc4OiAweDVGRjgsXG4gICAgMHg5Qzc5OiAweDVGRjEsXG4gICAgMHg5QzdBOiAweDVGREQsXG4gICAgMHg5QzdCOiAweDYwQjMsXG4gICAgMHg5QzdDOiAweDVGRkYsXG4gICAgMHg5QzdEOiAweDYwMjEsXG4gICAgMHg5QzdFOiAweDYwNjAsXG4gICAgMHg5QzgwOiAweDYwMTksXG4gICAgMHg5QzgxOiAweDYwMTAsXG4gICAgMHg5QzgyOiAweDYwMjksXG4gICAgMHg5QzgzOiAweDYwMEUsXG4gICAgMHg5Qzg0OiAweDYwMzEsXG4gICAgMHg5Qzg1OiAweDYwMUIsXG4gICAgMHg5Qzg2OiAweDYwMTUsXG4gICAgMHg5Qzg3OiAweDYwMkIsXG4gICAgMHg5Qzg4OiAweDYwMjYsXG4gICAgMHg5Qzg5OiAweDYwMEYsXG4gICAgMHg5QzhBOiAweDYwM0EsXG4gICAgMHg5QzhCOiAweDYwNUEsXG4gICAgMHg5QzhDOiAweDYwNDEsXG4gICAgMHg5QzhEOiAweDYwNkEsXG4gICAgMHg5QzhFOiAweDYwNzcsXG4gICAgMHg5QzhGOiAweDYwNUYsXG4gICAgMHg5QzkwOiAweDYwNEEsXG4gICAgMHg5QzkxOiAweDYwNDYsXG4gICAgMHg5QzkyOiAweDYwNEQsXG4gICAgMHg5QzkzOiAweDYwNjMsXG4gICAgMHg5Qzk0OiAweDYwNDMsXG4gICAgMHg5Qzk1OiAweDYwNjQsXG4gICAgMHg5Qzk2OiAweDYwNDIsXG4gICAgMHg5Qzk3OiAweDYwNkMsXG4gICAgMHg5Qzk4OiAweDYwNkIsXG4gICAgMHg5Qzk5OiAweDYwNTksXG4gICAgMHg5QzlBOiAweDYwODEsXG4gICAgMHg5QzlCOiAweDYwOEQsXG4gICAgMHg5QzlDOiAweDYwRTcsXG4gICAgMHg5QzlEOiAweDYwODMsXG4gICAgMHg5QzlFOiAweDYwOUEsXG4gICAgMHg5QzlGOiAweDYwODQsXG4gICAgMHg5Q0EwOiAweDYwOUIsXG4gICAgMHg5Q0ExOiAweDYwOTYsXG4gICAgMHg5Q0EyOiAweDYwOTcsXG4gICAgMHg5Q0EzOiAweDYwOTIsXG4gICAgMHg5Q0E0OiAweDYwQTcsXG4gICAgMHg5Q0E1OiAweDYwOEIsXG4gICAgMHg5Q0E2OiAweDYwRTEsXG4gICAgMHg5Q0E3OiAweDYwQjgsXG4gICAgMHg5Q0E4OiAweDYwRTAsXG4gICAgMHg5Q0E5OiAweDYwRDMsXG4gICAgMHg5Q0FBOiAweDYwQjQsXG4gICAgMHg5Q0FCOiAweDVGRjAsXG4gICAgMHg5Q0FDOiAweDYwQkQsXG4gICAgMHg5Q0FEOiAweDYwQzYsXG4gICAgMHg5Q0FFOiAweDYwQjUsXG4gICAgMHg5Q0FGOiAweDYwRDgsXG4gICAgMHg5Q0IwOiAweDYxNEQsXG4gICAgMHg5Q0IxOiAweDYxMTUsXG4gICAgMHg5Q0IyOiAweDYxMDYsXG4gICAgMHg5Q0IzOiAweDYwRjYsXG4gICAgMHg5Q0I0OiAweDYwRjcsXG4gICAgMHg5Q0I1OiAweDYxMDAsXG4gICAgMHg5Q0I2OiAweDYwRjQsXG4gICAgMHg5Q0I3OiAweDYwRkEsXG4gICAgMHg5Q0I4OiAweDYxMDMsXG4gICAgMHg5Q0I5OiAweDYxMjEsXG4gICAgMHg5Q0JBOiAweDYwRkIsXG4gICAgMHg5Q0JCOiAweDYwRjEsXG4gICAgMHg5Q0JDOiAweDYxMEQsXG4gICAgMHg5Q0JEOiAweDYxMEUsXG4gICAgMHg5Q0JFOiAweDYxNDcsXG4gICAgMHg5Q0JGOiAweDYxM0UsXG4gICAgMHg5Q0MwOiAweDYxMjgsXG4gICAgMHg5Q0MxOiAweDYxMjcsXG4gICAgMHg5Q0MyOiAweDYxNEEsXG4gICAgMHg5Q0MzOiAweDYxM0YsXG4gICAgMHg5Q0M0OiAweDYxM0MsXG4gICAgMHg5Q0M1OiAweDYxMkMsXG4gICAgMHg5Q0M2OiAweDYxMzQsXG4gICAgMHg5Q0M3OiAweDYxM0QsXG4gICAgMHg5Q0M4OiAweDYxNDIsXG4gICAgMHg5Q0M5OiAweDYxNDQsXG4gICAgMHg5Q0NBOiAweDYxNzMsXG4gICAgMHg5Q0NCOiAweDYxNzcsXG4gICAgMHg5Q0NDOiAweDYxNTgsXG4gICAgMHg5Q0NEOiAweDYxNTksXG4gICAgMHg5Q0NFOiAweDYxNUEsXG4gICAgMHg5Q0NGOiAweDYxNkIsXG4gICAgMHg5Q0QwOiAweDYxNzQsXG4gICAgMHg5Q0QxOiAweDYxNkYsXG4gICAgMHg5Q0QyOiAweDYxNjUsXG4gICAgMHg5Q0QzOiAweDYxNzEsXG4gICAgMHg5Q0Q0OiAweDYxNUYsXG4gICAgMHg5Q0Q1OiAweDYxNUQsXG4gICAgMHg5Q0Q2OiAweDYxNTMsXG4gICAgMHg5Q0Q3OiAweDYxNzUsXG4gICAgMHg5Q0Q4OiAweDYxOTksXG4gICAgMHg5Q0Q5OiAweDYxOTYsXG4gICAgMHg5Q0RBOiAweDYxODcsXG4gICAgMHg5Q0RCOiAweDYxQUMsXG4gICAgMHg5Q0RDOiAweDYxOTQsXG4gICAgMHg5Q0REOiAweDYxOUEsXG4gICAgMHg5Q0RFOiAweDYxOEEsXG4gICAgMHg5Q0RGOiAweDYxOTEsXG4gICAgMHg5Q0UwOiAweDYxQUIsXG4gICAgMHg5Q0UxOiAweDYxQUUsXG4gICAgMHg5Q0UyOiAweDYxQ0MsXG4gICAgMHg5Q0UzOiAweDYxQ0EsXG4gICAgMHg5Q0U0OiAweDYxQzksXG4gICAgMHg5Q0U1OiAweDYxRjcsXG4gICAgMHg5Q0U2OiAweDYxQzgsXG4gICAgMHg5Q0U3OiAweDYxQzMsXG4gICAgMHg5Q0U4OiAweDYxQzYsXG4gICAgMHg5Q0U5OiAweDYxQkEsXG4gICAgMHg5Q0VBOiAweDYxQ0IsXG4gICAgMHg5Q0VCOiAweDdGNzksXG4gICAgMHg5Q0VDOiAweDYxQ0QsXG4gICAgMHg5Q0VEOiAweDYxRTYsXG4gICAgMHg5Q0VFOiAweDYxRTMsXG4gICAgMHg5Q0VGOiAweDYxRjYsXG4gICAgMHg5Q0YwOiAweDYxRkEsXG4gICAgMHg5Q0YxOiAweDYxRjQsXG4gICAgMHg5Q0YyOiAweDYxRkYsXG4gICAgMHg5Q0YzOiAweDYxRkQsXG4gICAgMHg5Q0Y0OiAweDYxRkMsXG4gICAgMHg5Q0Y1OiAweDYxRkUsXG4gICAgMHg5Q0Y2OiAweDYyMDAsXG4gICAgMHg5Q0Y3OiAweDYyMDgsXG4gICAgMHg5Q0Y4OiAweDYyMDksXG4gICAgMHg5Q0Y5OiAweDYyMEQsXG4gICAgMHg5Q0ZBOiAweDYyMEMsXG4gICAgMHg5Q0ZCOiAweDYyMTQsXG4gICAgMHg5Q0ZDOiAweDYyMUIsXG4gICAgMHg5RDQwOiAweDYyMUUsXG4gICAgMHg5RDQxOiAweDYyMjEsXG4gICAgMHg5RDQyOiAweDYyMkEsXG4gICAgMHg5RDQzOiAweDYyMkUsXG4gICAgMHg5RDQ0OiAweDYyMzAsXG4gICAgMHg5RDQ1OiAweDYyMzIsXG4gICAgMHg5RDQ2OiAweDYyMzMsXG4gICAgMHg5RDQ3OiAweDYyNDEsXG4gICAgMHg5RDQ4OiAweDYyNEUsXG4gICAgMHg5RDQ5OiAweDYyNUUsXG4gICAgMHg5RDRBOiAweDYyNjMsXG4gICAgMHg5RDRCOiAweDYyNUIsXG4gICAgMHg5RDRDOiAweDYyNjAsXG4gICAgMHg5RDREOiAweDYyNjgsXG4gICAgMHg5RDRFOiAweDYyN0MsXG4gICAgMHg5RDRGOiAweDYyODIsXG4gICAgMHg5RDUwOiAweDYyODksXG4gICAgMHg5RDUxOiAweDYyN0UsXG4gICAgMHg5RDUyOiAweDYyOTIsXG4gICAgMHg5RDUzOiAweDYyOTMsXG4gICAgMHg5RDU0OiAweDYyOTYsXG4gICAgMHg5RDU1OiAweDYyRDQsXG4gICAgMHg5RDU2OiAweDYyODMsXG4gICAgMHg5RDU3OiAweDYyOTQsXG4gICAgMHg5RDU4OiAweDYyRDcsXG4gICAgMHg5RDU5OiAweDYyRDEsXG4gICAgMHg5RDVBOiAweDYyQkIsXG4gICAgMHg5RDVCOiAweDYyQ0YsXG4gICAgMHg5RDVDOiAweDYyRkYsXG4gICAgMHg5RDVEOiAweDYyQzYsXG4gICAgMHg5RDVFOiAweDY0RDQsXG4gICAgMHg5RDVGOiAweDYyQzgsXG4gICAgMHg5RDYwOiAweDYyREMsXG4gICAgMHg5RDYxOiAweDYyQ0MsXG4gICAgMHg5RDYyOiAweDYyQ0EsXG4gICAgMHg5RDYzOiAweDYyQzIsXG4gICAgMHg5RDY0OiAweDYyQzcsXG4gICAgMHg5RDY1OiAweDYyOUIsXG4gICAgMHg5RDY2OiAweDYyQzksXG4gICAgMHg5RDY3OiAweDYzMEMsXG4gICAgMHg5RDY4OiAweDYyRUUsXG4gICAgMHg5RDY5OiAweDYyRjEsXG4gICAgMHg5RDZBOiAweDYzMjcsXG4gICAgMHg5RDZCOiAweDYzMDIsXG4gICAgMHg5RDZDOiAweDYzMDgsXG4gICAgMHg5RDZEOiAweDYyRUYsXG4gICAgMHg5RDZFOiAweDYyRjUsXG4gICAgMHg5RDZGOiAweDYzNTAsXG4gICAgMHg5RDcwOiAweDYzM0UsXG4gICAgMHg5RDcxOiAweDYzNEQsXG4gICAgMHg5RDcyOiAweDY0MUMsXG4gICAgMHg5RDczOiAweDYzNEYsXG4gICAgMHg5RDc0OiAweDYzOTYsXG4gICAgMHg5RDc1OiAweDYzOEUsXG4gICAgMHg5RDc2OiAweDYzODAsXG4gICAgMHg5RDc3OiAweDYzQUIsXG4gICAgMHg5RDc4OiAweDYzNzYsXG4gICAgMHg5RDc5OiAweDYzQTMsXG4gICAgMHg5RDdBOiAweDYzOEYsXG4gICAgMHg5RDdCOiAweDYzODksXG4gICAgMHg5RDdDOiAweDYzOUYsXG4gICAgMHg5RDdEOiAweDYzQjUsXG4gICAgMHg5RDdFOiAweDYzNkIsXG4gICAgMHg5RDgwOiAweDYzNjksXG4gICAgMHg5RDgxOiAweDYzQkUsXG4gICAgMHg5RDgyOiAweDYzRTksXG4gICAgMHg5RDgzOiAweDYzQzAsXG4gICAgMHg5RDg0OiAweDYzQzYsXG4gICAgMHg5RDg1OiAweDYzRTMsXG4gICAgMHg5RDg2OiAweDYzQzksXG4gICAgMHg5RDg3OiAweDYzRDIsXG4gICAgMHg5RDg4OiAweDYzRjYsXG4gICAgMHg5RDg5OiAweDYzQzQsXG4gICAgMHg5RDhBOiAweDY0MTYsXG4gICAgMHg5RDhCOiAweDY0MzQsXG4gICAgMHg5RDhDOiAweDY0MDYsXG4gICAgMHg5RDhEOiAweDY0MTMsXG4gICAgMHg5RDhFOiAweDY0MjYsXG4gICAgMHg5RDhGOiAweDY0MzYsXG4gICAgMHg5RDkwOiAweDY1MUQsXG4gICAgMHg5RDkxOiAweDY0MTcsXG4gICAgMHg5RDkyOiAweDY0MjgsXG4gICAgMHg5RDkzOiAweDY0MEYsXG4gICAgMHg5RDk0OiAweDY0NjcsXG4gICAgMHg5RDk1OiAweDY0NkYsXG4gICAgMHg5RDk2OiAweDY0NzYsXG4gICAgMHg5RDk3OiAweDY0NEUsXG4gICAgMHg5RDk4OiAweDY1MkEsXG4gICAgMHg5RDk5OiAweDY0OTUsXG4gICAgMHg5RDlBOiAweDY0OTMsXG4gICAgMHg5RDlCOiAweDY0QTUsXG4gICAgMHg5RDlDOiAweDY0QTksXG4gICAgMHg5RDlEOiAweDY0ODgsXG4gICAgMHg5RDlFOiAweDY0QkMsXG4gICAgMHg5RDlGOiAweDY0REEsXG4gICAgMHg5REEwOiAweDY0RDIsXG4gICAgMHg5REExOiAweDY0QzUsXG4gICAgMHg5REEyOiAweDY0QzcsXG4gICAgMHg5REEzOiAweDY0QkIsXG4gICAgMHg5REE0OiAweDY0RDgsXG4gICAgMHg5REE1OiAweDY0QzIsXG4gICAgMHg5REE2OiAweDY0RjEsXG4gICAgMHg5REE3OiAweDY0RTcsXG4gICAgMHg5REE4OiAweDgyMDksXG4gICAgMHg5REE5OiAweDY0RTAsXG4gICAgMHg5REFBOiAweDY0RTEsXG4gICAgMHg5REFCOiAweDYyQUMsXG4gICAgMHg5REFDOiAweDY0RTMsXG4gICAgMHg5REFEOiAweDY0RUYsXG4gICAgMHg5REFFOiAweDY1MkMsXG4gICAgMHg5REFGOiAweDY0RjYsXG4gICAgMHg5REIwOiAweDY0RjQsXG4gICAgMHg5REIxOiAweDY0RjIsXG4gICAgMHg5REIyOiAweDY0RkEsXG4gICAgMHg5REIzOiAweDY1MDAsXG4gICAgMHg5REI0OiAweDY0RkQsXG4gICAgMHg5REI1OiAweDY1MTgsXG4gICAgMHg5REI2OiAweDY1MUMsXG4gICAgMHg5REI3OiAweDY1MDUsXG4gICAgMHg5REI4OiAweDY1MjQsXG4gICAgMHg5REI5OiAweDY1MjMsXG4gICAgMHg5REJBOiAweDY1MkIsXG4gICAgMHg5REJCOiAweDY1MzQsXG4gICAgMHg5REJDOiAweDY1MzUsXG4gICAgMHg5REJEOiAweDY1MzcsXG4gICAgMHg5REJFOiAweDY1MzYsXG4gICAgMHg5REJGOiAweDY1MzgsXG4gICAgMHg5REMwOiAweDc1NEIsXG4gICAgMHg5REMxOiAweDY1NDgsXG4gICAgMHg5REMyOiAweDY1NTYsXG4gICAgMHg5REMzOiAweDY1NTUsXG4gICAgMHg5REM0OiAweDY1NEQsXG4gICAgMHg5REM1OiAweDY1NTgsXG4gICAgMHg5REM2OiAweDY1NUUsXG4gICAgMHg5REM3OiAweDY1NUQsXG4gICAgMHg5REM4OiAweDY1NzIsXG4gICAgMHg5REM5OiAweDY1NzgsXG4gICAgMHg5RENBOiAweDY1ODIsXG4gICAgMHg5RENCOiAweDY1ODMsXG4gICAgMHg5RENDOiAweDhCOEEsXG4gICAgMHg5RENEOiAweDY1OUIsXG4gICAgMHg5RENFOiAweDY1OUYsXG4gICAgMHg5RENGOiAweDY1QUIsXG4gICAgMHg5REQwOiAweDY1QjcsXG4gICAgMHg5REQxOiAweDY1QzMsXG4gICAgMHg5REQyOiAweDY1QzYsXG4gICAgMHg5REQzOiAweDY1QzEsXG4gICAgMHg5REQ0OiAweDY1QzQsXG4gICAgMHg5REQ1OiAweDY1Q0MsXG4gICAgMHg5REQ2OiAweDY1RDIsXG4gICAgMHg5REQ3OiAweDY1REIsXG4gICAgMHg5REQ4OiAweDY1RDksXG4gICAgMHg5REQ5OiAweDY1RTAsXG4gICAgMHg5RERBOiAweDY1RTEsXG4gICAgMHg5RERCOiAweDY1RjEsXG4gICAgMHg5RERDOiAweDY3NzIsXG4gICAgMHg5REREOiAweDY2MEEsXG4gICAgMHg5RERFOiAweDY2MDMsXG4gICAgMHg5RERGOiAweDY1RkIsXG4gICAgMHg5REUwOiAweDY3NzMsXG4gICAgMHg5REUxOiAweDY2MzUsXG4gICAgMHg5REUyOiAweDY2MzYsXG4gICAgMHg5REUzOiAweDY2MzQsXG4gICAgMHg5REU0OiAweDY2MUMsXG4gICAgMHg5REU1OiAweDY2NEYsXG4gICAgMHg5REU2OiAweDY2NDQsXG4gICAgMHg5REU3OiAweDY2NDksXG4gICAgMHg5REU4OiAweDY2NDEsXG4gICAgMHg5REU5OiAweDY2NUUsXG4gICAgMHg5REVBOiAweDY2NUQsXG4gICAgMHg5REVCOiAweDY2NjQsXG4gICAgMHg5REVDOiAweDY2NjcsXG4gICAgMHg5REVEOiAweDY2NjgsXG4gICAgMHg5REVFOiAweDY2NUYsXG4gICAgMHg5REVGOiAweDY2NjIsXG4gICAgMHg5REYwOiAweDY2NzAsXG4gICAgMHg5REYxOiAweDY2ODMsXG4gICAgMHg5REYyOiAweDY2ODgsXG4gICAgMHg5REYzOiAweDY2OEUsXG4gICAgMHg5REY0OiAweDY2ODksXG4gICAgMHg5REY1OiAweDY2ODQsXG4gICAgMHg5REY2OiAweDY2OTgsXG4gICAgMHg5REY3OiAweDY2OUQsXG4gICAgMHg5REY4OiAweDY2QzEsXG4gICAgMHg5REY5OiAweDY2QjksXG4gICAgMHg5REZBOiAweDY2QzksXG4gICAgMHg5REZCOiAweDY2QkUsXG4gICAgMHg5REZDOiAweDY2QkMsXG4gICAgMHg5RTQwOiAweDY2QzQsXG4gICAgMHg5RTQxOiAweDY2QjgsXG4gICAgMHg5RTQyOiAweDY2RDYsXG4gICAgMHg5RTQzOiAweDY2REEsXG4gICAgMHg5RTQ0OiAweDY2RTAsXG4gICAgMHg5RTQ1OiAweDY2M0YsXG4gICAgMHg5RTQ2OiAweDY2RTYsXG4gICAgMHg5RTQ3OiAweDY2RTksXG4gICAgMHg5RTQ4OiAweDY2RjAsXG4gICAgMHg5RTQ5OiAweDY2RjUsXG4gICAgMHg5RTRBOiAweDY2RjcsXG4gICAgMHg5RTRCOiAweDY3MEYsXG4gICAgMHg5RTRDOiAweDY3MTYsXG4gICAgMHg5RTREOiAweDY3MUUsXG4gICAgMHg5RTRFOiAweDY3MjYsXG4gICAgMHg5RTRGOiAweDY3MjcsXG4gICAgMHg5RTUwOiAweDk3MzgsXG4gICAgMHg5RTUxOiAweDY3MkUsXG4gICAgMHg5RTUyOiAweDY3M0YsXG4gICAgMHg5RTUzOiAweDY3MzYsXG4gICAgMHg5RTU0OiAweDY3NDEsXG4gICAgMHg5RTU1OiAweDY3MzgsXG4gICAgMHg5RTU2OiAweDY3MzcsXG4gICAgMHg5RTU3OiAweDY3NDYsXG4gICAgMHg5RTU4OiAweDY3NUUsXG4gICAgMHg5RTU5OiAweDY3NjAsXG4gICAgMHg5RTVBOiAweDY3NTksXG4gICAgMHg5RTVCOiAweDY3NjMsXG4gICAgMHg5RTVDOiAweDY3NjQsXG4gICAgMHg5RTVEOiAweDY3ODksXG4gICAgMHg5RTVFOiAweDY3NzAsXG4gICAgMHg5RTVGOiAweDY3QTksXG4gICAgMHg5RTYwOiAweDY3N0MsXG4gICAgMHg5RTYxOiAweDY3NkEsXG4gICAgMHg5RTYyOiAweDY3OEMsXG4gICAgMHg5RTYzOiAweDY3OEIsXG4gICAgMHg5RTY0OiAweDY3QTYsXG4gICAgMHg5RTY1OiAweDY3QTEsXG4gICAgMHg5RTY2OiAweDY3ODUsXG4gICAgMHg5RTY3OiAweDY3QjcsXG4gICAgMHg5RTY4OiAweDY3RUYsXG4gICAgMHg5RTY5OiAweDY3QjQsXG4gICAgMHg5RTZBOiAweDY3RUMsXG4gICAgMHg5RTZCOiAweDY3QjMsXG4gICAgMHg5RTZDOiAweDY3RTksXG4gICAgMHg5RTZEOiAweDY3QjgsXG4gICAgMHg5RTZFOiAweDY3RTQsXG4gICAgMHg5RTZGOiAweDY3REUsXG4gICAgMHg5RTcwOiAweDY3REQsXG4gICAgMHg5RTcxOiAweDY3RTIsXG4gICAgMHg5RTcyOiAweDY3RUUsXG4gICAgMHg5RTczOiAweDY3QjksXG4gICAgMHg5RTc0OiAweDY3Q0UsXG4gICAgMHg5RTc1OiAweDY3QzYsXG4gICAgMHg5RTc2OiAweDY3RTcsXG4gICAgMHg5RTc3OiAweDZBOUMsXG4gICAgMHg5RTc4OiAweDY4MUUsXG4gICAgMHg5RTc5OiAweDY4NDYsXG4gICAgMHg5RTdBOiAweDY4MjksXG4gICAgMHg5RTdCOiAweDY4NDAsXG4gICAgMHg5RTdDOiAweDY4NEQsXG4gICAgMHg5RTdEOiAweDY4MzIsXG4gICAgMHg5RTdFOiAweDY4NEUsXG4gICAgMHg5RTgwOiAweDY4QjMsXG4gICAgMHg5RTgxOiAweDY4MkIsXG4gICAgMHg5RTgyOiAweDY4NTksXG4gICAgMHg5RTgzOiAweDY4NjMsXG4gICAgMHg5RTg0OiAweDY4NzcsXG4gICAgMHg5RTg1OiAweDY4N0YsXG4gICAgMHg5RTg2OiAweDY4OUYsXG4gICAgMHg5RTg3OiAweDY4OEYsXG4gICAgMHg5RTg4OiAweDY4QUQsXG4gICAgMHg5RTg5OiAweDY4OTQsXG4gICAgMHg5RThBOiAweDY4OUQsXG4gICAgMHg5RThCOiAweDY4OUIsXG4gICAgMHg5RThDOiAweDY4ODMsXG4gICAgMHg5RThEOiAweDZBQUUsXG4gICAgMHg5RThFOiAweDY4QjksXG4gICAgMHg5RThGOiAweDY4NzQsXG4gICAgMHg5RTkwOiAweDY4QjUsXG4gICAgMHg5RTkxOiAweDY4QTAsXG4gICAgMHg5RTkyOiAweDY4QkEsXG4gICAgMHg5RTkzOiAweDY5MEYsXG4gICAgMHg5RTk0OiAweDY4OEQsXG4gICAgMHg5RTk1OiAweDY4N0UsXG4gICAgMHg5RTk2OiAweDY5MDEsXG4gICAgMHg5RTk3OiAweDY4Q0EsXG4gICAgMHg5RTk4OiAweDY5MDgsXG4gICAgMHg5RTk5OiAweDY4RDgsXG4gICAgMHg5RTlBOiAweDY5MjIsXG4gICAgMHg5RTlCOiAweDY5MjYsXG4gICAgMHg5RTlDOiAweDY4RTEsXG4gICAgMHg5RTlEOiAweDY5MEMsXG4gICAgMHg5RTlFOiAweDY4Q0QsXG4gICAgMHg5RTlGOiAweDY4RDQsXG4gICAgMHg5RUEwOiAweDY4RTcsXG4gICAgMHg5RUExOiAweDY4RDUsXG4gICAgMHg5RUEyOiAweDY5MzYsXG4gICAgMHg5RUEzOiAweDY5MTIsXG4gICAgMHg5RUE0OiAweDY5MDQsXG4gICAgMHg5RUE1OiAweDY4RDcsXG4gICAgMHg5RUE2OiAweDY4RTMsXG4gICAgMHg5RUE3OiAweDY5MjUsXG4gICAgMHg5RUE4OiAweDY4RjksXG4gICAgMHg5RUE5OiAweDY4RTAsXG4gICAgMHg5RUFBOiAweDY4RUYsXG4gICAgMHg5RUFCOiAweDY5MjgsXG4gICAgMHg5RUFDOiAweDY5MkEsXG4gICAgMHg5RUFEOiAweDY5MUEsXG4gICAgMHg5RUFFOiAweDY5MjMsXG4gICAgMHg5RUFGOiAweDY5MjEsXG4gICAgMHg5RUIwOiAweDY4QzYsXG4gICAgMHg5RUIxOiAweDY5NzksXG4gICAgMHg5RUIyOiAweDY5NzcsXG4gICAgMHg5RUIzOiAweDY5NUMsXG4gICAgMHg5RUI0OiAweDY5NzgsXG4gICAgMHg5RUI1OiAweDY5NkIsXG4gICAgMHg5RUI2OiAweDY5NTQsXG4gICAgMHg5RUI3OiAweDY5N0UsXG4gICAgMHg5RUI4OiAweDY5NkUsXG4gICAgMHg5RUI5OiAweDY5MzksXG4gICAgMHg5RUJBOiAweDY5NzQsXG4gICAgMHg5RUJCOiAweDY5M0QsXG4gICAgMHg5RUJDOiAweDY5NTksXG4gICAgMHg5RUJEOiAweDY5MzAsXG4gICAgMHg5RUJFOiAweDY5NjEsXG4gICAgMHg5RUJGOiAweDY5NUUsXG4gICAgMHg5RUMwOiAweDY5NUQsXG4gICAgMHg5RUMxOiAweDY5ODEsXG4gICAgMHg5RUMyOiAweDY5NkEsXG4gICAgMHg5RUMzOiAweDY5QjIsXG4gICAgMHg5RUM0OiAweDY5QUUsXG4gICAgMHg5RUM1OiAweDY5RDAsXG4gICAgMHg5RUM2OiAweDY5QkYsXG4gICAgMHg5RUM3OiAweDY5QzEsXG4gICAgMHg5RUM4OiAweDY5RDMsXG4gICAgMHg5RUM5OiAweDY5QkUsXG4gICAgMHg5RUNBOiAweDY5Q0UsXG4gICAgMHg5RUNCOiAweDVCRTgsXG4gICAgMHg5RUNDOiAweDY5Q0EsXG4gICAgMHg5RUNEOiAweDY5REQsXG4gICAgMHg5RUNFOiAweDY5QkIsXG4gICAgMHg5RUNGOiAweDY5QzMsXG4gICAgMHg5RUQwOiAweDY5QTcsXG4gICAgMHg5RUQxOiAweDZBMkUsXG4gICAgMHg5RUQyOiAweDY5OTEsXG4gICAgMHg5RUQzOiAweDY5QTAsXG4gICAgMHg5RUQ0OiAweDY5OUMsXG4gICAgMHg5RUQ1OiAweDY5OTUsXG4gICAgMHg5RUQ2OiAweDY5QjQsXG4gICAgMHg5RUQ3OiAweDY5REUsXG4gICAgMHg5RUQ4OiAweDY5RTgsXG4gICAgMHg5RUQ5OiAweDZBMDIsXG4gICAgMHg5RURBOiAweDZBMUIsXG4gICAgMHg5RURCOiAweDY5RkYsXG4gICAgMHg5RURDOiAweDZCMEEsXG4gICAgMHg5RUREOiAweDY5RjksXG4gICAgMHg5RURFOiAweDY5RjIsXG4gICAgMHg5RURGOiAweDY5RTcsXG4gICAgMHg5RUUwOiAweDZBMDUsXG4gICAgMHg5RUUxOiAweDY5QjEsXG4gICAgMHg5RUUyOiAweDZBMUUsXG4gICAgMHg5RUUzOiAweDY5RUQsXG4gICAgMHg5RUU0OiAweDZBMTQsXG4gICAgMHg5RUU1OiAweDY5RUIsXG4gICAgMHg5RUU2OiAweDZBMEEsXG4gICAgMHg5RUU3OiAweDZBMTIsXG4gICAgMHg5RUU4OiAweDZBQzEsXG4gICAgMHg5RUU5OiAweDZBMjMsXG4gICAgMHg5RUVBOiAweDZBMTMsXG4gICAgMHg5RUVCOiAweDZBNDQsXG4gICAgMHg5RUVDOiAweDZBMEMsXG4gICAgMHg5RUVEOiAweDZBNzIsXG4gICAgMHg5RUVFOiAweDZBMzYsXG4gICAgMHg5RUVGOiAweDZBNzgsXG4gICAgMHg5RUYwOiAweDZBNDcsXG4gICAgMHg5RUYxOiAweDZBNjIsXG4gICAgMHg5RUYyOiAweDZBNTksXG4gICAgMHg5RUYzOiAweDZBNjYsXG4gICAgMHg5RUY0OiAweDZBNDgsXG4gICAgMHg5RUY1OiAweDZBMzgsXG4gICAgMHg5RUY2OiAweDZBMjIsXG4gICAgMHg5RUY3OiAweDZBOTAsXG4gICAgMHg5RUY4OiAweDZBOEQsXG4gICAgMHg5RUY5OiAweDZBQTAsXG4gICAgMHg5RUZBOiAweDZBODQsXG4gICAgMHg5RUZCOiAweDZBQTIsXG4gICAgMHg5RUZDOiAweDZBQTMsXG4gICAgMHg5RjQwOiAweDZBOTcsXG4gICAgMHg5RjQxOiAweDg2MTcsXG4gICAgMHg5RjQyOiAweDZBQkIsXG4gICAgMHg5RjQzOiAweDZBQzMsXG4gICAgMHg5RjQ0OiAweDZBQzIsXG4gICAgMHg5RjQ1OiAweDZBQjgsXG4gICAgMHg5RjQ2OiAweDZBQjMsXG4gICAgMHg5RjQ3OiAweDZBQUMsXG4gICAgMHg5RjQ4OiAweDZBREUsXG4gICAgMHg5RjQ5OiAweDZBRDEsXG4gICAgMHg5RjRBOiAweDZBREYsXG4gICAgMHg5RjRCOiAweDZBQUEsXG4gICAgMHg5RjRDOiAweDZBREEsXG4gICAgMHg5RjREOiAweDZBRUEsXG4gICAgMHg5RjRFOiAweDZBRkIsXG4gICAgMHg5RjRGOiAweDZCMDUsXG4gICAgMHg5RjUwOiAweDg2MTYsXG4gICAgMHg5RjUxOiAweDZBRkEsXG4gICAgMHg5RjUyOiAweDZCMTIsXG4gICAgMHg5RjUzOiAweDZCMTYsXG4gICAgMHg5RjU0OiAweDlCMzEsXG4gICAgMHg5RjU1OiAweDZCMUYsXG4gICAgMHg5RjU2OiAweDZCMzgsXG4gICAgMHg5RjU3OiAweDZCMzcsXG4gICAgMHg5RjU4OiAweDc2REMsXG4gICAgMHg5RjU5OiAweDZCMzksXG4gICAgMHg5RjVBOiAweDk4RUUsXG4gICAgMHg5RjVCOiAweDZCNDcsXG4gICAgMHg5RjVDOiAweDZCNDMsXG4gICAgMHg5RjVEOiAweDZCNDksXG4gICAgMHg5RjVFOiAweDZCNTAsXG4gICAgMHg5RjVGOiAweDZCNTksXG4gICAgMHg5RjYwOiAweDZCNTQsXG4gICAgMHg5RjYxOiAweDZCNUIsXG4gICAgMHg5RjYyOiAweDZCNUYsXG4gICAgMHg5RjYzOiAweDZCNjEsXG4gICAgMHg5RjY0OiAweDZCNzgsXG4gICAgMHg5RjY1OiAweDZCNzksXG4gICAgMHg5RjY2OiAweDZCN0YsXG4gICAgMHg5RjY3OiAweDZCODAsXG4gICAgMHg5RjY4OiAweDZCODQsXG4gICAgMHg5RjY5OiAweDZCODMsXG4gICAgMHg5RjZBOiAweDZCOEQsXG4gICAgMHg5RjZCOiAweDZCOTgsXG4gICAgMHg5RjZDOiAweDZCOTUsXG4gICAgMHg5RjZEOiAweDZCOUUsXG4gICAgMHg5RjZFOiAweDZCQTQsXG4gICAgMHg5RjZGOiAweDZCQUEsXG4gICAgMHg5RjcwOiAweDZCQUIsXG4gICAgMHg5RjcxOiAweDZCQUYsXG4gICAgMHg5RjcyOiAweDZCQjIsXG4gICAgMHg5RjczOiAweDZCQjEsXG4gICAgMHg5Rjc0OiAweDZCQjMsXG4gICAgMHg5Rjc1OiAweDZCQjcsXG4gICAgMHg5Rjc2OiAweDZCQkMsXG4gICAgMHg5Rjc3OiAweDZCQzYsXG4gICAgMHg5Rjc4OiAweDZCQ0IsXG4gICAgMHg5Rjc5OiAweDZCRDMsXG4gICAgMHg5RjdBOiAweDZCREYsXG4gICAgMHg5RjdCOiAweDZCRUMsXG4gICAgMHg5RjdDOiAweDZCRUIsXG4gICAgMHg5RjdEOiAweDZCRjMsXG4gICAgMHg5RjdFOiAweDZCRUYsXG4gICAgMHg5RjgwOiAweDlFQkUsXG4gICAgMHg5RjgxOiAweDZDMDgsXG4gICAgMHg5RjgyOiAweDZDMTMsXG4gICAgMHg5RjgzOiAweDZDMTQsXG4gICAgMHg5Rjg0OiAweDZDMUIsXG4gICAgMHg5Rjg1OiAweDZDMjQsXG4gICAgMHg5Rjg2OiAweDZDMjMsXG4gICAgMHg5Rjg3OiAweDZDNUUsXG4gICAgMHg5Rjg4OiAweDZDNTUsXG4gICAgMHg5Rjg5OiAweDZDNjIsXG4gICAgMHg5RjhBOiAweDZDNkEsXG4gICAgMHg5RjhCOiAweDZDODIsXG4gICAgMHg5RjhDOiAweDZDOEQsXG4gICAgMHg5RjhEOiAweDZDOUEsXG4gICAgMHg5RjhFOiAweDZDODEsXG4gICAgMHg5RjhGOiAweDZDOUIsXG4gICAgMHg5RjkwOiAweDZDN0UsXG4gICAgMHg5RjkxOiAweDZDNjgsXG4gICAgMHg5RjkyOiAweDZDNzMsXG4gICAgMHg5RjkzOiAweDZDOTIsXG4gICAgMHg5Rjk0OiAweDZDOTAsXG4gICAgMHg5Rjk1OiAweDZDQzQsXG4gICAgMHg5Rjk2OiAweDZDRjEsXG4gICAgMHg5Rjk3OiAweDZDRDMsXG4gICAgMHg5Rjk4OiAweDZDQkQsXG4gICAgMHg5Rjk5OiAweDZDRDcsXG4gICAgMHg5RjlBOiAweDZDQzUsXG4gICAgMHg5RjlCOiAweDZDREQsXG4gICAgMHg5RjlDOiAweDZDQUUsXG4gICAgMHg5RjlEOiAweDZDQjEsXG4gICAgMHg5RjlFOiAweDZDQkUsXG4gICAgMHg5RjlGOiAweDZDQkEsXG4gICAgMHg5RkEwOiAweDZDREIsXG4gICAgMHg5RkExOiAweDZDRUYsXG4gICAgMHg5RkEyOiAweDZDRDksXG4gICAgMHg5RkEzOiAweDZDRUEsXG4gICAgMHg5RkE0OiAweDZEMUYsXG4gICAgMHg5RkE1OiAweDg4NEQsXG4gICAgMHg5RkE2OiAweDZEMzYsXG4gICAgMHg5RkE3OiAweDZEMkIsXG4gICAgMHg5RkE4OiAweDZEM0QsXG4gICAgMHg5RkE5OiAweDZEMzgsXG4gICAgMHg5RkFBOiAweDZEMTksXG4gICAgMHg5RkFCOiAweDZEMzUsXG4gICAgMHg5RkFDOiAweDZEMzMsXG4gICAgMHg5RkFEOiAweDZEMTIsXG4gICAgMHg5RkFFOiAweDZEMEMsXG4gICAgMHg5RkFGOiAweDZENjMsXG4gICAgMHg5RkIwOiAweDZEOTMsXG4gICAgMHg5RkIxOiAweDZENjQsXG4gICAgMHg5RkIyOiAweDZENUEsXG4gICAgMHg5RkIzOiAweDZENzksXG4gICAgMHg5RkI0OiAweDZENTksXG4gICAgMHg5RkI1OiAweDZEOEUsXG4gICAgMHg5RkI2OiAweDZEOTUsXG4gICAgMHg5RkI3OiAweDZGRTQsXG4gICAgMHg5RkI4OiAweDZEODUsXG4gICAgMHg5RkI5OiAweDZERjksXG4gICAgMHg5RkJBOiAweDZFMTUsXG4gICAgMHg5RkJCOiAweDZFMEEsXG4gICAgMHg5RkJDOiAweDZEQjUsXG4gICAgMHg5RkJEOiAweDZEQzcsXG4gICAgMHg5RkJFOiAweDZERTYsXG4gICAgMHg5RkJGOiAweDZEQjgsXG4gICAgMHg5RkMwOiAweDZEQzYsXG4gICAgMHg5RkMxOiAweDZERUMsXG4gICAgMHg5RkMyOiAweDZEREUsXG4gICAgMHg5RkMzOiAweDZEQ0MsXG4gICAgMHg5RkM0OiAweDZERTgsXG4gICAgMHg5RkM1OiAweDZERDIsXG4gICAgMHg5RkM2OiAweDZEQzUsXG4gICAgMHg5RkM3OiAweDZERkEsXG4gICAgMHg5RkM4OiAweDZERDksXG4gICAgMHg5RkM5OiAweDZERTQsXG4gICAgMHg5RkNBOiAweDZERDUsXG4gICAgMHg5RkNCOiAweDZERUEsXG4gICAgMHg5RkNDOiAweDZERUUsXG4gICAgMHg5RkNEOiAweDZFMkQsXG4gICAgMHg5RkNFOiAweDZFNkUsXG4gICAgMHg5RkNGOiAweDZFMkUsXG4gICAgMHg5RkQwOiAweDZFMTksXG4gICAgMHg5RkQxOiAweDZFNzIsXG4gICAgMHg5RkQyOiAweDZFNUYsXG4gICAgMHg5RkQzOiAweDZFM0UsXG4gICAgMHg5RkQ0OiAweDZFMjMsXG4gICAgMHg5RkQ1OiAweDZFNkIsXG4gICAgMHg5RkQ2OiAweDZFMkIsXG4gICAgMHg5RkQ3OiAweDZFNzYsXG4gICAgMHg5RkQ4OiAweDZFNEQsXG4gICAgMHg5RkQ5OiAweDZFMUYsXG4gICAgMHg5RkRBOiAweDZFNDMsXG4gICAgMHg5RkRCOiAweDZFM0EsXG4gICAgMHg5RkRDOiAweDZFNEUsXG4gICAgMHg5RkREOiAweDZFMjQsXG4gICAgMHg5RkRFOiAweDZFRkYsXG4gICAgMHg5RkRGOiAweDZFMUQsXG4gICAgMHg5RkUwOiAweDZFMzgsXG4gICAgMHg5RkUxOiAweDZFODIsXG4gICAgMHg5RkUyOiAweDZFQUEsXG4gICAgMHg5RkUzOiAweDZFOTgsXG4gICAgMHg5RkU0OiAweDZFQzksXG4gICAgMHg5RkU1OiAweDZFQjcsXG4gICAgMHg5RkU2OiAweDZFRDMsXG4gICAgMHg5RkU3OiAweDZFQkQsXG4gICAgMHg5RkU4OiAweDZFQUYsXG4gICAgMHg5RkU5OiAweDZFQzQsXG4gICAgMHg5RkVBOiAweDZFQjIsXG4gICAgMHg5RkVCOiAweDZFRDQsXG4gICAgMHg5RkVDOiAweDZFRDUsXG4gICAgMHg5RkVEOiAweDZFOEYsXG4gICAgMHg5RkVFOiAweDZFQTUsXG4gICAgMHg5RkVGOiAweDZFQzIsXG4gICAgMHg5RkYwOiAweDZFOUYsXG4gICAgMHg5RkYxOiAweDZGNDEsXG4gICAgMHg5RkYyOiAweDZGMTEsXG4gICAgMHg5RkYzOiAweDcwNEMsXG4gICAgMHg5RkY0OiAweDZFRUMsXG4gICAgMHg5RkY1OiAweDZFRjgsXG4gICAgMHg5RkY2OiAweDZFRkUsXG4gICAgMHg5RkY3OiAweDZGM0YsXG4gICAgMHg5RkY4OiAweDZFRjIsXG4gICAgMHg5RkY5OiAweDZGMzEsXG4gICAgMHg5RkZBOiAweDZFRUYsXG4gICAgMHg5RkZCOiAweDZGMzIsXG4gICAgMHg5RkZDOiAweDZFQ0MsXG4gICAgMHhBMTogMHhGRjYxLFxuICAgIDB4QTI6IDB4RkY2MixcbiAgICAweEEzOiAweEZGNjMsXG4gICAgMHhBNDogMHhGRjY0LFxuICAgIDB4QTU6IDB4RkY2NSxcbiAgICAweEE2OiAweEZGNjYsXG4gICAgMHhBNzogMHhGRjY3LFxuICAgIDB4QTg6IDB4RkY2OCxcbiAgICAweEE5OiAweEZGNjksXG4gICAgMHhBQTogMHhGRjZBLFxuICAgIDB4QUI6IDB4RkY2QixcbiAgICAweEFDOiAweEZGNkMsXG4gICAgMHhBRDogMHhGRjZELFxuICAgIDB4QUU6IDB4RkY2RSxcbiAgICAweEFGOiAweEZGNkYsXG4gICAgMHhCMDogMHhGRjcwLFxuICAgIDB4QjE6IDB4RkY3MSxcbiAgICAweEIyOiAweEZGNzIsXG4gICAgMHhCMzogMHhGRjczLFxuICAgIDB4QjQ6IDB4RkY3NCxcbiAgICAweEI1OiAweEZGNzUsXG4gICAgMHhCNjogMHhGRjc2LFxuICAgIDB4Qjc6IDB4RkY3NyxcbiAgICAweEI4OiAweEZGNzgsXG4gICAgMHhCOTogMHhGRjc5LFxuICAgIDB4QkE6IDB4RkY3QSxcbiAgICAweEJCOiAweEZGN0IsXG4gICAgMHhCQzogMHhGRjdDLFxuICAgIDB4QkQ6IDB4RkY3RCxcbiAgICAweEJFOiAweEZGN0UsXG4gICAgMHhCRjogMHhGRjdGLFxuICAgIDB4QzA6IDB4RkY4MCxcbiAgICAweEMxOiAweEZGODEsXG4gICAgMHhDMjogMHhGRjgyLFxuICAgIDB4QzM6IDB4RkY4MyxcbiAgICAweEM0OiAweEZGODQsXG4gICAgMHhDNTogMHhGRjg1LFxuICAgIDB4QzY6IDB4RkY4NixcbiAgICAweEM3OiAweEZGODcsXG4gICAgMHhDODogMHhGRjg4LFxuICAgIDB4Qzk6IDB4RkY4OSxcbiAgICAweENBOiAweEZGOEEsXG4gICAgMHhDQjogMHhGRjhCLFxuICAgIDB4Q0M6IDB4RkY4QyxcbiAgICAweENEOiAweEZGOEQsXG4gICAgMHhDRTogMHhGRjhFLFxuICAgIDB4Q0Y6IDB4RkY4RixcbiAgICAweEQwOiAweEZGOTAsXG4gICAgMHhEMTogMHhGRjkxLFxuICAgIDB4RDI6IDB4RkY5MixcbiAgICAweEQzOiAweEZGOTMsXG4gICAgMHhENDogMHhGRjk0LFxuICAgIDB4RDU6IDB4RkY5NSxcbiAgICAweEQ2OiAweEZGOTYsXG4gICAgMHhENzogMHhGRjk3LFxuICAgIDB4RDg6IDB4RkY5OCxcbiAgICAweEQ5OiAweEZGOTksXG4gICAgMHhEQTogMHhGRjlBLFxuICAgIDB4REI6IDB4RkY5QixcbiAgICAweERDOiAweEZGOUMsXG4gICAgMHhERDogMHhGRjlELFxuICAgIDB4REU6IDB4RkY5RSxcbiAgICAweERGOiAweEZGOUYsXG4gICAgMHhFMDQwOiAweDZGM0UsXG4gICAgMHhFMDQxOiAweDZGMTMsXG4gICAgMHhFMDQyOiAweDZFRjcsXG4gICAgMHhFMDQzOiAweDZGODYsXG4gICAgMHhFMDQ0OiAweDZGN0EsXG4gICAgMHhFMDQ1OiAweDZGNzgsXG4gICAgMHhFMDQ2OiAweDZGODEsXG4gICAgMHhFMDQ3OiAweDZGODAsXG4gICAgMHhFMDQ4OiAweDZGNkYsXG4gICAgMHhFMDQ5OiAweDZGNUIsXG4gICAgMHhFMDRBOiAweDZGRjMsXG4gICAgMHhFMDRCOiAweDZGNkQsXG4gICAgMHhFMDRDOiAweDZGODIsXG4gICAgMHhFMDREOiAweDZGN0MsXG4gICAgMHhFMDRFOiAweDZGNTgsXG4gICAgMHhFMDRGOiAweDZGOEUsXG4gICAgMHhFMDUwOiAweDZGOTEsXG4gICAgMHhFMDUxOiAweDZGQzIsXG4gICAgMHhFMDUyOiAweDZGNjYsXG4gICAgMHhFMDUzOiAweDZGQjMsXG4gICAgMHhFMDU0OiAweDZGQTMsXG4gICAgMHhFMDU1OiAweDZGQTEsXG4gICAgMHhFMDU2OiAweDZGQTQsXG4gICAgMHhFMDU3OiAweDZGQjksXG4gICAgMHhFMDU4OiAweDZGQzYsXG4gICAgMHhFMDU5OiAweDZGQUEsXG4gICAgMHhFMDVBOiAweDZGREYsXG4gICAgMHhFMDVCOiAweDZGRDUsXG4gICAgMHhFMDVDOiAweDZGRUMsXG4gICAgMHhFMDVEOiAweDZGRDQsXG4gICAgMHhFMDVFOiAweDZGRDgsXG4gICAgMHhFMDVGOiAweDZGRjEsXG4gICAgMHhFMDYwOiAweDZGRUUsXG4gICAgMHhFMDYxOiAweDZGREIsXG4gICAgMHhFMDYyOiAweDcwMDksXG4gICAgMHhFMDYzOiAweDcwMEIsXG4gICAgMHhFMDY0OiAweDZGRkEsXG4gICAgMHhFMDY1OiAweDcwMTEsXG4gICAgMHhFMDY2OiAweDcwMDEsXG4gICAgMHhFMDY3OiAweDcwMEYsXG4gICAgMHhFMDY4OiAweDZGRkUsXG4gICAgMHhFMDY5OiAweDcwMUIsXG4gICAgMHhFMDZBOiAweDcwMUEsXG4gICAgMHhFMDZCOiAweDZGNzQsXG4gICAgMHhFMDZDOiAweDcwMUQsXG4gICAgMHhFMDZEOiAweDcwMTgsXG4gICAgMHhFMDZFOiAweDcwMUYsXG4gICAgMHhFMDZGOiAweDcwMzAsXG4gICAgMHhFMDcwOiAweDcwM0UsXG4gICAgMHhFMDcxOiAweDcwMzIsXG4gICAgMHhFMDcyOiAweDcwNTEsXG4gICAgMHhFMDczOiAweDcwNjMsXG4gICAgMHhFMDc0OiAweDcwOTksXG4gICAgMHhFMDc1OiAweDcwOTIsXG4gICAgMHhFMDc2OiAweDcwQUYsXG4gICAgMHhFMDc3OiAweDcwRjEsXG4gICAgMHhFMDc4OiAweDcwQUMsXG4gICAgMHhFMDc5OiAweDcwQjgsXG4gICAgMHhFMDdBOiAweDcwQjMsXG4gICAgMHhFMDdCOiAweDcwQUUsXG4gICAgMHhFMDdDOiAweDcwREYsXG4gICAgMHhFMDdEOiAweDcwQ0IsXG4gICAgMHhFMDdFOiAweDcwREQsXG4gICAgMHhFMDgwOiAweDcwRDksXG4gICAgMHhFMDgxOiAweDcxMDksXG4gICAgMHhFMDgyOiAweDcwRkQsXG4gICAgMHhFMDgzOiAweDcxMUMsXG4gICAgMHhFMDg0OiAweDcxMTksXG4gICAgMHhFMDg1OiAweDcxNjUsXG4gICAgMHhFMDg2OiAweDcxNTUsXG4gICAgMHhFMDg3OiAweDcxODgsXG4gICAgMHhFMDg4OiAweDcxNjYsXG4gICAgMHhFMDg5OiAweDcxNjIsXG4gICAgMHhFMDhBOiAweDcxNEMsXG4gICAgMHhFMDhCOiAweDcxNTYsXG4gICAgMHhFMDhDOiAweDcxNkMsXG4gICAgMHhFMDhEOiAweDcxOEYsXG4gICAgMHhFMDhFOiAweDcxRkIsXG4gICAgMHhFMDhGOiAweDcxODQsXG4gICAgMHhFMDkwOiAweDcxOTUsXG4gICAgMHhFMDkxOiAweDcxQTgsXG4gICAgMHhFMDkyOiAweDcxQUMsXG4gICAgMHhFMDkzOiAweDcxRDcsXG4gICAgMHhFMDk0OiAweDcxQjksXG4gICAgMHhFMDk1OiAweDcxQkUsXG4gICAgMHhFMDk2OiAweDcxRDIsXG4gICAgMHhFMDk3OiAweDcxQzksXG4gICAgMHhFMDk4OiAweDcxRDQsXG4gICAgMHhFMDk5OiAweDcxQ0UsXG4gICAgMHhFMDlBOiAweDcxRTAsXG4gICAgMHhFMDlCOiAweDcxRUMsXG4gICAgMHhFMDlDOiAweDcxRTcsXG4gICAgMHhFMDlEOiAweDcxRjUsXG4gICAgMHhFMDlFOiAweDcxRkMsXG4gICAgMHhFMDlGOiAweDcxRjksXG4gICAgMHhFMEEwOiAweDcxRkYsXG4gICAgMHhFMEExOiAweDcyMEQsXG4gICAgMHhFMEEyOiAweDcyMTAsXG4gICAgMHhFMEEzOiAweDcyMUIsXG4gICAgMHhFMEE0OiAweDcyMjgsXG4gICAgMHhFMEE1OiAweDcyMkQsXG4gICAgMHhFMEE2OiAweDcyMkMsXG4gICAgMHhFMEE3OiAweDcyMzAsXG4gICAgMHhFMEE4OiAweDcyMzIsXG4gICAgMHhFMEE5OiAweDcyM0IsXG4gICAgMHhFMEFBOiAweDcyM0MsXG4gICAgMHhFMEFCOiAweDcyM0YsXG4gICAgMHhFMEFDOiAweDcyNDAsXG4gICAgMHhFMEFEOiAweDcyNDYsXG4gICAgMHhFMEFFOiAweDcyNEIsXG4gICAgMHhFMEFGOiAweDcyNTgsXG4gICAgMHhFMEIwOiAweDcyNzQsXG4gICAgMHhFMEIxOiAweDcyN0UsXG4gICAgMHhFMEIyOiAweDcyODIsXG4gICAgMHhFMEIzOiAweDcyODEsXG4gICAgMHhFMEI0OiAweDcyODcsXG4gICAgMHhFMEI1OiAweDcyOTIsXG4gICAgMHhFMEI2OiAweDcyOTYsXG4gICAgMHhFMEI3OiAweDcyQTIsXG4gICAgMHhFMEI4OiAweDcyQTcsXG4gICAgMHhFMEI5OiAweDcyQjksXG4gICAgMHhFMEJBOiAweDcyQjIsXG4gICAgMHhFMEJCOiAweDcyQzMsXG4gICAgMHhFMEJDOiAweDcyQzYsXG4gICAgMHhFMEJEOiAweDcyQzQsXG4gICAgMHhFMEJFOiAweDcyQ0UsXG4gICAgMHhFMEJGOiAweDcyRDIsXG4gICAgMHhFMEMwOiAweDcyRTIsXG4gICAgMHhFMEMxOiAweDcyRTAsXG4gICAgMHhFMEMyOiAweDcyRTEsXG4gICAgMHhFMEMzOiAweDcyRjksXG4gICAgMHhFMEM0OiAweDcyRjcsXG4gICAgMHhFMEM1OiAweDUwMEYsXG4gICAgMHhFMEM2OiAweDczMTcsXG4gICAgMHhFMEM3OiAweDczMEEsXG4gICAgMHhFMEM4OiAweDczMUMsXG4gICAgMHhFMEM5OiAweDczMTYsXG4gICAgMHhFMENBOiAweDczMUQsXG4gICAgMHhFMENCOiAweDczMzQsXG4gICAgMHhFMENDOiAweDczMkYsXG4gICAgMHhFMENEOiAweDczMjksXG4gICAgMHhFMENFOiAweDczMjUsXG4gICAgMHhFMENGOiAweDczM0UsXG4gICAgMHhFMEQwOiAweDczNEUsXG4gICAgMHhFMEQxOiAweDczNEYsXG4gICAgMHhFMEQyOiAweDlFRDgsXG4gICAgMHhFMEQzOiAweDczNTcsXG4gICAgMHhFMEQ0OiAweDczNkEsXG4gICAgMHhFMEQ1OiAweDczNjgsXG4gICAgMHhFMEQ2OiAweDczNzAsXG4gICAgMHhFMEQ3OiAweDczNzgsXG4gICAgMHhFMEQ4OiAweDczNzUsXG4gICAgMHhFMEQ5OiAweDczN0IsXG4gICAgMHhFMERBOiAweDczN0EsXG4gICAgMHhFMERCOiAweDczQzgsXG4gICAgMHhFMERDOiAweDczQjMsXG4gICAgMHhFMEREOiAweDczQ0UsXG4gICAgMHhFMERFOiAweDczQkIsXG4gICAgMHhFMERGOiAweDczQzAsXG4gICAgMHhFMEUwOiAweDczRTUsXG4gICAgMHhFMEUxOiAweDczRUUsXG4gICAgMHhFMEUyOiAweDczREUsXG4gICAgMHhFMEUzOiAweDc0QTIsXG4gICAgMHhFMEU0OiAweDc0MDUsXG4gICAgMHhFMEU1OiAweDc0NkYsXG4gICAgMHhFMEU2OiAweDc0MjUsXG4gICAgMHhFMEU3OiAweDczRjgsXG4gICAgMHhFMEU4OiAweDc0MzIsXG4gICAgMHhFMEU5OiAweDc0M0EsXG4gICAgMHhFMEVBOiAweDc0NTUsXG4gICAgMHhFMEVCOiAweDc0M0YsXG4gICAgMHhFMEVDOiAweDc0NUYsXG4gICAgMHhFMEVEOiAweDc0NTksXG4gICAgMHhFMEVFOiAweDc0NDEsXG4gICAgMHhFMEVGOiAweDc0NUMsXG4gICAgMHhFMEYwOiAweDc0NjksXG4gICAgMHhFMEYxOiAweDc0NzAsXG4gICAgMHhFMEYyOiAweDc0NjMsXG4gICAgMHhFMEYzOiAweDc0NkEsXG4gICAgMHhFMEY0OiAweDc0NzYsXG4gICAgMHhFMEY1OiAweDc0N0UsXG4gICAgMHhFMEY2OiAweDc0OEIsXG4gICAgMHhFMEY3OiAweDc0OUUsXG4gICAgMHhFMEY4OiAweDc0QTcsXG4gICAgMHhFMEY5OiAweDc0Q0EsXG4gICAgMHhFMEZBOiAweDc0Q0YsXG4gICAgMHhFMEZCOiAweDc0RDQsXG4gICAgMHhFMEZDOiAweDczRjEsXG4gICAgMHhFMTQwOiAweDc0RTAsXG4gICAgMHhFMTQxOiAweDc0RTMsXG4gICAgMHhFMTQyOiAweDc0RTcsXG4gICAgMHhFMTQzOiAweDc0RTksXG4gICAgMHhFMTQ0OiAweDc0RUUsXG4gICAgMHhFMTQ1OiAweDc0RjIsXG4gICAgMHhFMTQ2OiAweDc0RjAsXG4gICAgMHhFMTQ3OiAweDc0RjEsXG4gICAgMHhFMTQ4OiAweDc0RjgsXG4gICAgMHhFMTQ5OiAweDc0RjcsXG4gICAgMHhFMTRBOiAweDc1MDQsXG4gICAgMHhFMTRCOiAweDc1MDMsXG4gICAgMHhFMTRDOiAweDc1MDUsXG4gICAgMHhFMTREOiAweDc1MEMsXG4gICAgMHhFMTRFOiAweDc1MEUsXG4gICAgMHhFMTRGOiAweDc1MEQsXG4gICAgMHhFMTUwOiAweDc1MTUsXG4gICAgMHhFMTUxOiAweDc1MTMsXG4gICAgMHhFMTUyOiAweDc1MUUsXG4gICAgMHhFMTUzOiAweDc1MjYsXG4gICAgMHhFMTU0OiAweDc1MkMsXG4gICAgMHhFMTU1OiAweDc1M0MsXG4gICAgMHhFMTU2OiAweDc1NDQsXG4gICAgMHhFMTU3OiAweDc1NEQsXG4gICAgMHhFMTU4OiAweDc1NEEsXG4gICAgMHhFMTU5OiAweDc1NDksXG4gICAgMHhFMTVBOiAweDc1NUIsXG4gICAgMHhFMTVCOiAweDc1NDYsXG4gICAgMHhFMTVDOiAweDc1NUEsXG4gICAgMHhFMTVEOiAweDc1NjksXG4gICAgMHhFMTVFOiAweDc1NjQsXG4gICAgMHhFMTVGOiAweDc1NjcsXG4gICAgMHhFMTYwOiAweDc1NkIsXG4gICAgMHhFMTYxOiAweDc1NkQsXG4gICAgMHhFMTYyOiAweDc1NzgsXG4gICAgMHhFMTYzOiAweDc1NzYsXG4gICAgMHhFMTY0OiAweDc1ODYsXG4gICAgMHhFMTY1OiAweDc1ODcsXG4gICAgMHhFMTY2OiAweDc1NzQsXG4gICAgMHhFMTY3OiAweDc1OEEsXG4gICAgMHhFMTY4OiAweDc1ODksXG4gICAgMHhFMTY5OiAweDc1ODIsXG4gICAgMHhFMTZBOiAweDc1OTQsXG4gICAgMHhFMTZCOiAweDc1OUEsXG4gICAgMHhFMTZDOiAweDc1OUQsXG4gICAgMHhFMTZEOiAweDc1QTUsXG4gICAgMHhFMTZFOiAweDc1QTMsXG4gICAgMHhFMTZGOiAweDc1QzIsXG4gICAgMHhFMTcwOiAweDc1QjMsXG4gICAgMHhFMTcxOiAweDc1QzMsXG4gICAgMHhFMTcyOiAweDc1QjUsXG4gICAgMHhFMTczOiAweDc1QkQsXG4gICAgMHhFMTc0OiAweDc1QjgsXG4gICAgMHhFMTc1OiAweDc1QkMsXG4gICAgMHhFMTc2OiAweDc1QjEsXG4gICAgMHhFMTc3OiAweDc1Q0QsXG4gICAgMHhFMTc4OiAweDc1Q0EsXG4gICAgMHhFMTc5OiAweDc1RDIsXG4gICAgMHhFMTdBOiAweDc1RDksXG4gICAgMHhFMTdCOiAweDc1RTMsXG4gICAgMHhFMTdDOiAweDc1REUsXG4gICAgMHhFMTdEOiAweDc1RkUsXG4gICAgMHhFMTdFOiAweDc1RkYsXG4gICAgMHhFMTgwOiAweDc1RkMsXG4gICAgMHhFMTgxOiAweDc2MDEsXG4gICAgMHhFMTgyOiAweDc1RjAsXG4gICAgMHhFMTgzOiAweDc1RkEsXG4gICAgMHhFMTg0OiAweDc1RjIsXG4gICAgMHhFMTg1OiAweDc1RjMsXG4gICAgMHhFMTg2OiAweDc2MEIsXG4gICAgMHhFMTg3OiAweDc2MEQsXG4gICAgMHhFMTg4OiAweDc2MDksXG4gICAgMHhFMTg5OiAweDc2MUYsXG4gICAgMHhFMThBOiAweDc2MjcsXG4gICAgMHhFMThCOiAweDc2MjAsXG4gICAgMHhFMThDOiAweDc2MjEsXG4gICAgMHhFMThEOiAweDc2MjIsXG4gICAgMHhFMThFOiAweDc2MjQsXG4gICAgMHhFMThGOiAweDc2MzQsXG4gICAgMHhFMTkwOiAweDc2MzAsXG4gICAgMHhFMTkxOiAweDc2M0IsXG4gICAgMHhFMTkyOiAweDc2NDcsXG4gICAgMHhFMTkzOiAweDc2NDgsXG4gICAgMHhFMTk0OiAweDc2NDYsXG4gICAgMHhFMTk1OiAweDc2NUMsXG4gICAgMHhFMTk2OiAweDc2NTgsXG4gICAgMHhFMTk3OiAweDc2NjEsXG4gICAgMHhFMTk4OiAweDc2NjIsXG4gICAgMHhFMTk5OiAweDc2NjgsXG4gICAgMHhFMTlBOiAweDc2NjksXG4gICAgMHhFMTlCOiAweDc2NkEsXG4gICAgMHhFMTlDOiAweDc2NjcsXG4gICAgMHhFMTlEOiAweDc2NkMsXG4gICAgMHhFMTlFOiAweDc2NzAsXG4gICAgMHhFMTlGOiAweDc2NzIsXG4gICAgMHhFMUEwOiAweDc2NzYsXG4gICAgMHhFMUExOiAweDc2NzgsXG4gICAgMHhFMUEyOiAweDc2N0MsXG4gICAgMHhFMUEzOiAweDc2ODAsXG4gICAgMHhFMUE0OiAweDc2ODMsXG4gICAgMHhFMUE1OiAweDc2ODgsXG4gICAgMHhFMUE2OiAweDc2OEIsXG4gICAgMHhFMUE3OiAweDc2OEUsXG4gICAgMHhFMUE4OiAweDc2OTYsXG4gICAgMHhFMUE5OiAweDc2OTMsXG4gICAgMHhFMUFBOiAweDc2OTksXG4gICAgMHhFMUFCOiAweDc2OUEsXG4gICAgMHhFMUFDOiAweDc2QjAsXG4gICAgMHhFMUFEOiAweDc2QjQsXG4gICAgMHhFMUFFOiAweDc2QjgsXG4gICAgMHhFMUFGOiAweDc2QjksXG4gICAgMHhFMUIwOiAweDc2QkEsXG4gICAgMHhFMUIxOiAweDc2QzIsXG4gICAgMHhFMUIyOiAweDc2Q0QsXG4gICAgMHhFMUIzOiAweDc2RDYsXG4gICAgMHhFMUI0OiAweDc2RDIsXG4gICAgMHhFMUI1OiAweDc2REUsXG4gICAgMHhFMUI2OiAweDc2RTEsXG4gICAgMHhFMUI3OiAweDc2RTUsXG4gICAgMHhFMUI4OiAweDc2RTcsXG4gICAgMHhFMUI5OiAweDc2RUEsXG4gICAgMHhFMUJBOiAweDg2MkYsXG4gICAgMHhFMUJCOiAweDc2RkIsXG4gICAgMHhFMUJDOiAweDc3MDgsXG4gICAgMHhFMUJEOiAweDc3MDcsXG4gICAgMHhFMUJFOiAweDc3MDQsXG4gICAgMHhFMUJGOiAweDc3MjksXG4gICAgMHhFMUMwOiAweDc3MjQsXG4gICAgMHhFMUMxOiAweDc3MUUsXG4gICAgMHhFMUMyOiAweDc3MjUsXG4gICAgMHhFMUMzOiAweDc3MjYsXG4gICAgMHhFMUM0OiAweDc3MUIsXG4gICAgMHhFMUM1OiAweDc3MzcsXG4gICAgMHhFMUM2OiAweDc3MzgsXG4gICAgMHhFMUM3OiAweDc3NDcsXG4gICAgMHhFMUM4OiAweDc3NUEsXG4gICAgMHhFMUM5OiAweDc3NjgsXG4gICAgMHhFMUNBOiAweDc3NkIsXG4gICAgMHhFMUNCOiAweDc3NUIsXG4gICAgMHhFMUNDOiAweDc3NjUsXG4gICAgMHhFMUNEOiAweDc3N0YsXG4gICAgMHhFMUNFOiAweDc3N0UsXG4gICAgMHhFMUNGOiAweDc3NzksXG4gICAgMHhFMUQwOiAweDc3OEUsXG4gICAgMHhFMUQxOiAweDc3OEIsXG4gICAgMHhFMUQyOiAweDc3OTEsXG4gICAgMHhFMUQzOiAweDc3QTAsXG4gICAgMHhFMUQ0OiAweDc3OUUsXG4gICAgMHhFMUQ1OiAweDc3QjAsXG4gICAgMHhFMUQ2OiAweDc3QjYsXG4gICAgMHhFMUQ3OiAweDc3QjksXG4gICAgMHhFMUQ4OiAweDc3QkYsXG4gICAgMHhFMUQ5OiAweDc3QkMsXG4gICAgMHhFMURBOiAweDc3QkQsXG4gICAgMHhFMURCOiAweDc3QkIsXG4gICAgMHhFMURDOiAweDc3QzcsXG4gICAgMHhFMUREOiAweDc3Q0QsXG4gICAgMHhFMURFOiAweDc3RDcsXG4gICAgMHhFMURGOiAweDc3REEsXG4gICAgMHhFMUUwOiAweDc3REMsXG4gICAgMHhFMUUxOiAweDc3RTMsXG4gICAgMHhFMUUyOiAweDc3RUUsXG4gICAgMHhFMUUzOiAweDc3RkMsXG4gICAgMHhFMUU0OiAweDc4MEMsXG4gICAgMHhFMUU1OiAweDc4MTIsXG4gICAgMHhFMUU2OiAweDc5MjYsXG4gICAgMHhFMUU3OiAweDc4MjAsXG4gICAgMHhFMUU4OiAweDc5MkEsXG4gICAgMHhFMUU5OiAweDc4NDUsXG4gICAgMHhFMUVBOiAweDc4OEUsXG4gICAgMHhFMUVCOiAweDc4NzQsXG4gICAgMHhFMUVDOiAweDc4ODYsXG4gICAgMHhFMUVEOiAweDc4N0MsXG4gICAgMHhFMUVFOiAweDc4OUEsXG4gICAgMHhFMUVGOiAweDc4OEMsXG4gICAgMHhFMUYwOiAweDc4QTMsXG4gICAgMHhFMUYxOiAweDc4QjUsXG4gICAgMHhFMUYyOiAweDc4QUEsXG4gICAgMHhFMUYzOiAweDc4QUYsXG4gICAgMHhFMUY0OiAweDc4RDEsXG4gICAgMHhFMUY1OiAweDc4QzYsXG4gICAgMHhFMUY2OiAweDc4Q0IsXG4gICAgMHhFMUY3OiAweDc4RDQsXG4gICAgMHhFMUY4OiAweDc4QkUsXG4gICAgMHhFMUY5OiAweDc4QkMsXG4gICAgMHhFMUZBOiAweDc4QzUsXG4gICAgMHhFMUZCOiAweDc4Q0EsXG4gICAgMHhFMUZDOiAweDc4RUMsXG4gICAgMHhFMjQwOiAweDc4RTcsXG4gICAgMHhFMjQxOiAweDc4REEsXG4gICAgMHhFMjQyOiAweDc4RkQsXG4gICAgMHhFMjQzOiAweDc4RjQsXG4gICAgMHhFMjQ0OiAweDc5MDcsXG4gICAgMHhFMjQ1OiAweDc5MTIsXG4gICAgMHhFMjQ2OiAweDc5MTEsXG4gICAgMHhFMjQ3OiAweDc5MTksXG4gICAgMHhFMjQ4OiAweDc5MkMsXG4gICAgMHhFMjQ5OiAweDc5MkIsXG4gICAgMHhFMjRBOiAweDc5NDAsXG4gICAgMHhFMjRCOiAweDc5NjAsXG4gICAgMHhFMjRDOiAweDc5NTcsXG4gICAgMHhFMjREOiAweDc5NUYsXG4gICAgMHhFMjRFOiAweDc5NUEsXG4gICAgMHhFMjRGOiAweDc5NTUsXG4gICAgMHhFMjUwOiAweDc5NTMsXG4gICAgMHhFMjUxOiAweDc5N0EsXG4gICAgMHhFMjUyOiAweDc5N0YsXG4gICAgMHhFMjUzOiAweDc5OEEsXG4gICAgMHhFMjU0OiAweDc5OUQsXG4gICAgMHhFMjU1OiAweDc5QTcsXG4gICAgMHhFMjU2OiAweDlGNEIsXG4gICAgMHhFMjU3OiAweDc5QUEsXG4gICAgMHhFMjU4OiAweDc5QUUsXG4gICAgMHhFMjU5OiAweDc5QjMsXG4gICAgMHhFMjVBOiAweDc5QjksXG4gICAgMHhFMjVCOiAweDc5QkEsXG4gICAgMHhFMjVDOiAweDc5QzksXG4gICAgMHhFMjVEOiAweDc5RDUsXG4gICAgMHhFMjVFOiAweDc5RTcsXG4gICAgMHhFMjVGOiAweDc5RUMsXG4gICAgMHhFMjYwOiAweDc5RTEsXG4gICAgMHhFMjYxOiAweDc5RTMsXG4gICAgMHhFMjYyOiAweDdBMDgsXG4gICAgMHhFMjYzOiAweDdBMEQsXG4gICAgMHhFMjY0OiAweDdBMTgsXG4gICAgMHhFMjY1OiAweDdBMTksXG4gICAgMHhFMjY2OiAweDdBMjAsXG4gICAgMHhFMjY3OiAweDdBMUYsXG4gICAgMHhFMjY4OiAweDc5ODAsXG4gICAgMHhFMjY5OiAweDdBMzEsXG4gICAgMHhFMjZBOiAweDdBM0IsXG4gICAgMHhFMjZCOiAweDdBM0UsXG4gICAgMHhFMjZDOiAweDdBMzcsXG4gICAgMHhFMjZEOiAweDdBNDMsXG4gICAgMHhFMjZFOiAweDdBNTcsXG4gICAgMHhFMjZGOiAweDdBNDksXG4gICAgMHhFMjcwOiAweDdBNjEsXG4gICAgMHhFMjcxOiAweDdBNjIsXG4gICAgMHhFMjcyOiAweDdBNjksXG4gICAgMHhFMjczOiAweDlGOUQsXG4gICAgMHhFMjc0OiAweDdBNzAsXG4gICAgMHhFMjc1OiAweDdBNzksXG4gICAgMHhFMjc2OiAweDdBN0QsXG4gICAgMHhFMjc3OiAweDdBODgsXG4gICAgMHhFMjc4OiAweDdBOTcsXG4gICAgMHhFMjc5OiAweDdBOTUsXG4gICAgMHhFMjdBOiAweDdBOTgsXG4gICAgMHhFMjdCOiAweDdBOTYsXG4gICAgMHhFMjdDOiAweDdBQTksXG4gICAgMHhFMjdEOiAweDdBQzgsXG4gICAgMHhFMjdFOiAweDdBQjAsXG4gICAgMHhFMjgwOiAweDdBQjYsXG4gICAgMHhFMjgxOiAweDdBQzUsXG4gICAgMHhFMjgyOiAweDdBQzQsXG4gICAgMHhFMjgzOiAweDdBQkYsXG4gICAgMHhFMjg0OiAweDkwODMsXG4gICAgMHhFMjg1OiAweDdBQzcsXG4gICAgMHhFMjg2OiAweDdBQ0EsXG4gICAgMHhFMjg3OiAweDdBQ0QsXG4gICAgMHhFMjg4OiAweDdBQ0YsXG4gICAgMHhFMjg5OiAweDdBRDUsXG4gICAgMHhFMjhBOiAweDdBRDMsXG4gICAgMHhFMjhCOiAweDdBRDksXG4gICAgMHhFMjhDOiAweDdBREEsXG4gICAgMHhFMjhEOiAweDdBREQsXG4gICAgMHhFMjhFOiAweDdBRTEsXG4gICAgMHhFMjhGOiAweDdBRTIsXG4gICAgMHhFMjkwOiAweDdBRTYsXG4gICAgMHhFMjkxOiAweDdBRUQsXG4gICAgMHhFMjkyOiAweDdBRjAsXG4gICAgMHhFMjkzOiAweDdCMDIsXG4gICAgMHhFMjk0OiAweDdCMEYsXG4gICAgMHhFMjk1OiAweDdCMEEsXG4gICAgMHhFMjk2OiAweDdCMDYsXG4gICAgMHhFMjk3OiAweDdCMzMsXG4gICAgMHhFMjk4OiAweDdCMTgsXG4gICAgMHhFMjk5OiAweDdCMTksXG4gICAgMHhFMjlBOiAweDdCMUUsXG4gICAgMHhFMjlCOiAweDdCMzUsXG4gICAgMHhFMjlDOiAweDdCMjgsXG4gICAgMHhFMjlEOiAweDdCMzYsXG4gICAgMHhFMjlFOiAweDdCNTAsXG4gICAgMHhFMjlGOiAweDdCN0EsXG4gICAgMHhFMkEwOiAweDdCMDQsXG4gICAgMHhFMkExOiAweDdCNEQsXG4gICAgMHhFMkEyOiAweDdCMEIsXG4gICAgMHhFMkEzOiAweDdCNEMsXG4gICAgMHhFMkE0OiAweDdCNDUsXG4gICAgMHhFMkE1OiAweDdCNzUsXG4gICAgMHhFMkE2OiAweDdCNjUsXG4gICAgMHhFMkE3OiAweDdCNzQsXG4gICAgMHhFMkE4OiAweDdCNjcsXG4gICAgMHhFMkE5OiAweDdCNzAsXG4gICAgMHhFMkFBOiAweDdCNzEsXG4gICAgMHhFMkFCOiAweDdCNkMsXG4gICAgMHhFMkFDOiAweDdCNkUsXG4gICAgMHhFMkFEOiAweDdCOUQsXG4gICAgMHhFMkFFOiAweDdCOTgsXG4gICAgMHhFMkFGOiAweDdCOUYsXG4gICAgMHhFMkIwOiAweDdCOEQsXG4gICAgMHhFMkIxOiAweDdCOUMsXG4gICAgMHhFMkIyOiAweDdCOUEsXG4gICAgMHhFMkIzOiAweDdCOEIsXG4gICAgMHhFMkI0OiAweDdCOTIsXG4gICAgMHhFMkI1OiAweDdCOEYsXG4gICAgMHhFMkI2OiAweDdCNUQsXG4gICAgMHhFMkI3OiAweDdCOTksXG4gICAgMHhFMkI4OiAweDdCQ0IsXG4gICAgMHhFMkI5OiAweDdCQzEsXG4gICAgMHhFMkJBOiAweDdCQ0MsXG4gICAgMHhFMkJCOiAweDdCQ0YsXG4gICAgMHhFMkJDOiAweDdCQjQsXG4gICAgMHhFMkJEOiAweDdCQzYsXG4gICAgMHhFMkJFOiAweDdCREQsXG4gICAgMHhFMkJGOiAweDdCRTksXG4gICAgMHhFMkMwOiAweDdDMTEsXG4gICAgMHhFMkMxOiAweDdDMTQsXG4gICAgMHhFMkMyOiAweDdCRTYsXG4gICAgMHhFMkMzOiAweDdCRTUsXG4gICAgMHhFMkM0OiAweDdDNjAsXG4gICAgMHhFMkM1OiAweDdDMDAsXG4gICAgMHhFMkM2OiAweDdDMDcsXG4gICAgMHhFMkM3OiAweDdDMTMsXG4gICAgMHhFMkM4OiAweDdCRjMsXG4gICAgMHhFMkM5OiAweDdCRjcsXG4gICAgMHhFMkNBOiAweDdDMTcsXG4gICAgMHhFMkNCOiAweDdDMEQsXG4gICAgMHhFMkNDOiAweDdCRjYsXG4gICAgMHhFMkNEOiAweDdDMjMsXG4gICAgMHhFMkNFOiAweDdDMjcsXG4gICAgMHhFMkNGOiAweDdDMkEsXG4gICAgMHhFMkQwOiAweDdDMUYsXG4gICAgMHhFMkQxOiAweDdDMzcsXG4gICAgMHhFMkQyOiAweDdDMkIsXG4gICAgMHhFMkQzOiAweDdDM0QsXG4gICAgMHhFMkQ0OiAweDdDNEMsXG4gICAgMHhFMkQ1OiAweDdDNDMsXG4gICAgMHhFMkQ2OiAweDdDNTQsXG4gICAgMHhFMkQ3OiAweDdDNEYsXG4gICAgMHhFMkQ4OiAweDdDNDAsXG4gICAgMHhFMkQ5OiAweDdDNTAsXG4gICAgMHhFMkRBOiAweDdDNTgsXG4gICAgMHhFMkRCOiAweDdDNUYsXG4gICAgMHhFMkRDOiAweDdDNjQsXG4gICAgMHhFMkREOiAweDdDNTYsXG4gICAgMHhFMkRFOiAweDdDNjUsXG4gICAgMHhFMkRGOiAweDdDNkMsXG4gICAgMHhFMkUwOiAweDdDNzUsXG4gICAgMHhFMkUxOiAweDdDODMsXG4gICAgMHhFMkUyOiAweDdDOTAsXG4gICAgMHhFMkUzOiAweDdDQTQsXG4gICAgMHhFMkU0OiAweDdDQUQsXG4gICAgMHhFMkU1OiAweDdDQTIsXG4gICAgMHhFMkU2OiAweDdDQUIsXG4gICAgMHhFMkU3OiAweDdDQTEsXG4gICAgMHhFMkU4OiAweDdDQTgsXG4gICAgMHhFMkU5OiAweDdDQjMsXG4gICAgMHhFMkVBOiAweDdDQjIsXG4gICAgMHhFMkVCOiAweDdDQjEsXG4gICAgMHhFMkVDOiAweDdDQUUsXG4gICAgMHhFMkVEOiAweDdDQjksXG4gICAgMHhFMkVFOiAweDdDQkQsXG4gICAgMHhFMkVGOiAweDdDQzAsXG4gICAgMHhFMkYwOiAweDdDQzUsXG4gICAgMHhFMkYxOiAweDdDQzIsXG4gICAgMHhFMkYyOiAweDdDRDgsXG4gICAgMHhFMkYzOiAweDdDRDIsXG4gICAgMHhFMkY0OiAweDdDREMsXG4gICAgMHhFMkY1OiAweDdDRTIsXG4gICAgMHhFMkY2OiAweDlCM0IsXG4gICAgMHhFMkY3OiAweDdDRUYsXG4gICAgMHhFMkY4OiAweDdDRjIsXG4gICAgMHhFMkY5OiAweDdDRjQsXG4gICAgMHhFMkZBOiAweDdDRjYsXG4gICAgMHhFMkZCOiAweDdDRkEsXG4gICAgMHhFMkZDOiAweDdEMDYsXG4gICAgMHhFMzQwOiAweDdEMDIsXG4gICAgMHhFMzQxOiAweDdEMUMsXG4gICAgMHhFMzQyOiAweDdEMTUsXG4gICAgMHhFMzQzOiAweDdEMEEsXG4gICAgMHhFMzQ0OiAweDdENDUsXG4gICAgMHhFMzQ1OiAweDdENEIsXG4gICAgMHhFMzQ2OiAweDdEMkUsXG4gICAgMHhFMzQ3OiAweDdEMzIsXG4gICAgMHhFMzQ4OiAweDdEM0YsXG4gICAgMHhFMzQ5OiAweDdEMzUsXG4gICAgMHhFMzRBOiAweDdENDYsXG4gICAgMHhFMzRCOiAweDdENzMsXG4gICAgMHhFMzRDOiAweDdENTYsXG4gICAgMHhFMzREOiAweDdENEUsXG4gICAgMHhFMzRFOiAweDdENzIsXG4gICAgMHhFMzRGOiAweDdENjgsXG4gICAgMHhFMzUwOiAweDdENkUsXG4gICAgMHhFMzUxOiAweDdENEYsXG4gICAgMHhFMzUyOiAweDdENjMsXG4gICAgMHhFMzUzOiAweDdEOTMsXG4gICAgMHhFMzU0OiAweDdEODksXG4gICAgMHhFMzU1OiAweDdENUIsXG4gICAgMHhFMzU2OiAweDdEOEYsXG4gICAgMHhFMzU3OiAweDdEN0QsXG4gICAgMHhFMzU4OiAweDdEOUIsXG4gICAgMHhFMzU5OiAweDdEQkEsXG4gICAgMHhFMzVBOiAweDdEQUUsXG4gICAgMHhFMzVCOiAweDdEQTMsXG4gICAgMHhFMzVDOiAweDdEQjUsXG4gICAgMHhFMzVEOiAweDdEQzcsXG4gICAgMHhFMzVFOiAweDdEQkQsXG4gICAgMHhFMzVGOiAweDdEQUIsXG4gICAgMHhFMzYwOiAweDdFM0QsXG4gICAgMHhFMzYxOiAweDdEQTIsXG4gICAgMHhFMzYyOiAweDdEQUYsXG4gICAgMHhFMzYzOiAweDdEREMsXG4gICAgMHhFMzY0OiAweDdEQjgsXG4gICAgMHhFMzY1OiAweDdEOUYsXG4gICAgMHhFMzY2OiAweDdEQjAsXG4gICAgMHhFMzY3OiAweDdERDgsXG4gICAgMHhFMzY4OiAweDdEREQsXG4gICAgMHhFMzY5OiAweDdERTQsXG4gICAgMHhFMzZBOiAweDdEREUsXG4gICAgMHhFMzZCOiAweDdERkIsXG4gICAgMHhFMzZDOiAweDdERjIsXG4gICAgMHhFMzZEOiAweDdERTEsXG4gICAgMHhFMzZFOiAweDdFMDUsXG4gICAgMHhFMzZGOiAweDdFMEEsXG4gICAgMHhFMzcwOiAweDdFMjMsXG4gICAgMHhFMzcxOiAweDdFMjEsXG4gICAgMHhFMzcyOiAweDdFMTIsXG4gICAgMHhFMzczOiAweDdFMzEsXG4gICAgMHhFMzc0OiAweDdFMUYsXG4gICAgMHhFMzc1OiAweDdFMDksXG4gICAgMHhFMzc2OiAweDdFMEIsXG4gICAgMHhFMzc3OiAweDdFMjIsXG4gICAgMHhFMzc4OiAweDdFNDYsXG4gICAgMHhFMzc5OiAweDdFNjYsXG4gICAgMHhFMzdBOiAweDdFM0IsXG4gICAgMHhFMzdCOiAweDdFMzUsXG4gICAgMHhFMzdDOiAweDdFMzksXG4gICAgMHhFMzdEOiAweDdFNDMsXG4gICAgMHhFMzdFOiAweDdFMzcsXG4gICAgMHhFMzgwOiAweDdFMzIsXG4gICAgMHhFMzgxOiAweDdFM0EsXG4gICAgMHhFMzgyOiAweDdFNjcsXG4gICAgMHhFMzgzOiAweDdFNUQsXG4gICAgMHhFMzg0OiAweDdFNTYsXG4gICAgMHhFMzg1OiAweDdFNUUsXG4gICAgMHhFMzg2OiAweDdFNTksXG4gICAgMHhFMzg3OiAweDdFNUEsXG4gICAgMHhFMzg4OiAweDdFNzksXG4gICAgMHhFMzg5OiAweDdFNkEsXG4gICAgMHhFMzhBOiAweDdFNjksXG4gICAgMHhFMzhCOiAweDdFN0MsXG4gICAgMHhFMzhDOiAweDdFN0IsXG4gICAgMHhFMzhEOiAweDdFODMsXG4gICAgMHhFMzhFOiAweDdERDUsXG4gICAgMHhFMzhGOiAweDdFN0QsXG4gICAgMHhFMzkwOiAweDhGQUUsXG4gICAgMHhFMzkxOiAweDdFN0YsXG4gICAgMHhFMzkyOiAweDdFODgsXG4gICAgMHhFMzkzOiAweDdFODksXG4gICAgMHhFMzk0OiAweDdFOEMsXG4gICAgMHhFMzk1OiAweDdFOTIsXG4gICAgMHhFMzk2OiAweDdFOTAsXG4gICAgMHhFMzk3OiAweDdFOTMsXG4gICAgMHhFMzk4OiAweDdFOTQsXG4gICAgMHhFMzk5OiAweDdFOTYsXG4gICAgMHhFMzlBOiAweDdFOEUsXG4gICAgMHhFMzlCOiAweDdFOUIsXG4gICAgMHhFMzlDOiAweDdFOUMsXG4gICAgMHhFMzlEOiAweDdGMzgsXG4gICAgMHhFMzlFOiAweDdGM0EsXG4gICAgMHhFMzlGOiAweDdGNDUsXG4gICAgMHhFM0EwOiAweDdGNEMsXG4gICAgMHhFM0ExOiAweDdGNEQsXG4gICAgMHhFM0EyOiAweDdGNEUsXG4gICAgMHhFM0EzOiAweDdGNTAsXG4gICAgMHhFM0E0OiAweDdGNTEsXG4gICAgMHhFM0E1OiAweDdGNTUsXG4gICAgMHhFM0E2OiAweDdGNTQsXG4gICAgMHhFM0E3OiAweDdGNTgsXG4gICAgMHhFM0E4OiAweDdGNUYsXG4gICAgMHhFM0E5OiAweDdGNjAsXG4gICAgMHhFM0FBOiAweDdGNjgsXG4gICAgMHhFM0FCOiAweDdGNjksXG4gICAgMHhFM0FDOiAweDdGNjcsXG4gICAgMHhFM0FEOiAweDdGNzgsXG4gICAgMHhFM0FFOiAweDdGODIsXG4gICAgMHhFM0FGOiAweDdGODYsXG4gICAgMHhFM0IwOiAweDdGODMsXG4gICAgMHhFM0IxOiAweDdGODgsXG4gICAgMHhFM0IyOiAweDdGODcsXG4gICAgMHhFM0IzOiAweDdGOEMsXG4gICAgMHhFM0I0OiAweDdGOTQsXG4gICAgMHhFM0I1OiAweDdGOUUsXG4gICAgMHhFM0I2OiAweDdGOUQsXG4gICAgMHhFM0I3OiAweDdGOUEsXG4gICAgMHhFM0I4OiAweDdGQTMsXG4gICAgMHhFM0I5OiAweDdGQUYsXG4gICAgMHhFM0JBOiAweDdGQjIsXG4gICAgMHhFM0JCOiAweDdGQjksXG4gICAgMHhFM0JDOiAweDdGQUUsXG4gICAgMHhFM0JEOiAweDdGQjYsXG4gICAgMHhFM0JFOiAweDdGQjgsXG4gICAgMHhFM0JGOiAweDhCNzEsXG4gICAgMHhFM0MwOiAweDdGQzUsXG4gICAgMHhFM0MxOiAweDdGQzYsXG4gICAgMHhFM0MyOiAweDdGQ0EsXG4gICAgMHhFM0MzOiAweDdGRDUsXG4gICAgMHhFM0M0OiAweDdGRDQsXG4gICAgMHhFM0M1OiAweDdGRTEsXG4gICAgMHhFM0M2OiAweDdGRTYsXG4gICAgMHhFM0M3OiAweDdGRTksXG4gICAgMHhFM0M4OiAweDdGRjMsXG4gICAgMHhFM0M5OiAweDdGRjksXG4gICAgMHhFM0NBOiAweDk4REMsXG4gICAgMHhFM0NCOiAweDgwMDYsXG4gICAgMHhFM0NDOiAweDgwMDQsXG4gICAgMHhFM0NEOiAweDgwMEIsXG4gICAgMHhFM0NFOiAweDgwMTIsXG4gICAgMHhFM0NGOiAweDgwMTgsXG4gICAgMHhFM0QwOiAweDgwMTksXG4gICAgMHhFM0QxOiAweDgwMUMsXG4gICAgMHhFM0QyOiAweDgwMjEsXG4gICAgMHhFM0QzOiAweDgwMjgsXG4gICAgMHhFM0Q0OiAweDgwM0YsXG4gICAgMHhFM0Q1OiAweDgwM0IsXG4gICAgMHhFM0Q2OiAweDgwNEEsXG4gICAgMHhFM0Q3OiAweDgwNDYsXG4gICAgMHhFM0Q4OiAweDgwNTIsXG4gICAgMHhFM0Q5OiAweDgwNTgsXG4gICAgMHhFM0RBOiAweDgwNUEsXG4gICAgMHhFM0RCOiAweDgwNUYsXG4gICAgMHhFM0RDOiAweDgwNjIsXG4gICAgMHhFM0REOiAweDgwNjgsXG4gICAgMHhFM0RFOiAweDgwNzMsXG4gICAgMHhFM0RGOiAweDgwNzIsXG4gICAgMHhFM0UwOiAweDgwNzAsXG4gICAgMHhFM0UxOiAweDgwNzYsXG4gICAgMHhFM0UyOiAweDgwNzksXG4gICAgMHhFM0UzOiAweDgwN0QsXG4gICAgMHhFM0U0OiAweDgwN0YsXG4gICAgMHhFM0U1OiAweDgwODQsXG4gICAgMHhFM0U2OiAweDgwODYsXG4gICAgMHhFM0U3OiAweDgwODUsXG4gICAgMHhFM0U4OiAweDgwOUIsXG4gICAgMHhFM0U5OiAweDgwOTMsXG4gICAgMHhFM0VBOiAweDgwOUEsXG4gICAgMHhFM0VCOiAweDgwQUQsXG4gICAgMHhFM0VDOiAweDUxOTAsXG4gICAgMHhFM0VEOiAweDgwQUMsXG4gICAgMHhFM0VFOiAweDgwREIsXG4gICAgMHhFM0VGOiAweDgwRTUsXG4gICAgMHhFM0YwOiAweDgwRDksXG4gICAgMHhFM0YxOiAweDgwREQsXG4gICAgMHhFM0YyOiAweDgwQzQsXG4gICAgMHhFM0YzOiAweDgwREEsXG4gICAgMHhFM0Y0OiAweDgwRDYsXG4gICAgMHhFM0Y1OiAweDgxMDksXG4gICAgMHhFM0Y2OiAweDgwRUYsXG4gICAgMHhFM0Y3OiAweDgwRjEsXG4gICAgMHhFM0Y4OiAweDgxMUIsXG4gICAgMHhFM0Y5OiAweDgxMjksXG4gICAgMHhFM0ZBOiAweDgxMjMsXG4gICAgMHhFM0ZCOiAweDgxMkYsXG4gICAgMHhFM0ZDOiAweDgxNEIsXG4gICAgMHhFNDQwOiAweDk2OEIsXG4gICAgMHhFNDQxOiAweDgxNDYsXG4gICAgMHhFNDQyOiAweDgxM0UsXG4gICAgMHhFNDQzOiAweDgxNTMsXG4gICAgMHhFNDQ0OiAweDgxNTEsXG4gICAgMHhFNDQ1OiAweDgwRkMsXG4gICAgMHhFNDQ2OiAweDgxNzEsXG4gICAgMHhFNDQ3OiAweDgxNkUsXG4gICAgMHhFNDQ4OiAweDgxNjUsXG4gICAgMHhFNDQ5OiAweDgxNjYsXG4gICAgMHhFNDRBOiAweDgxNzQsXG4gICAgMHhFNDRCOiAweDgxODMsXG4gICAgMHhFNDRDOiAweDgxODgsXG4gICAgMHhFNDREOiAweDgxOEEsXG4gICAgMHhFNDRFOiAweDgxODAsXG4gICAgMHhFNDRGOiAweDgxODIsXG4gICAgMHhFNDUwOiAweDgxQTAsXG4gICAgMHhFNDUxOiAweDgxOTUsXG4gICAgMHhFNDUyOiAweDgxQTQsXG4gICAgMHhFNDUzOiAweDgxQTMsXG4gICAgMHhFNDU0OiAweDgxNUYsXG4gICAgMHhFNDU1OiAweDgxOTMsXG4gICAgMHhFNDU2OiAweDgxQTksXG4gICAgMHhFNDU3OiAweDgxQjAsXG4gICAgMHhFNDU4OiAweDgxQjUsXG4gICAgMHhFNDU5OiAweDgxQkUsXG4gICAgMHhFNDVBOiAweDgxQjgsXG4gICAgMHhFNDVCOiAweDgxQkQsXG4gICAgMHhFNDVDOiAweDgxQzAsXG4gICAgMHhFNDVEOiAweDgxQzIsXG4gICAgMHhFNDVFOiAweDgxQkEsXG4gICAgMHhFNDVGOiAweDgxQzksXG4gICAgMHhFNDYwOiAweDgxQ0QsXG4gICAgMHhFNDYxOiAweDgxRDEsXG4gICAgMHhFNDYyOiAweDgxRDksXG4gICAgMHhFNDYzOiAweDgxRDgsXG4gICAgMHhFNDY0OiAweDgxQzgsXG4gICAgMHhFNDY1OiAweDgxREEsXG4gICAgMHhFNDY2OiAweDgxREYsXG4gICAgMHhFNDY3OiAweDgxRTAsXG4gICAgMHhFNDY4OiAweDgxRTcsXG4gICAgMHhFNDY5OiAweDgxRkEsXG4gICAgMHhFNDZBOiAweDgxRkIsXG4gICAgMHhFNDZCOiAweDgxRkUsXG4gICAgMHhFNDZDOiAweDgyMDEsXG4gICAgMHhFNDZEOiAweDgyMDIsXG4gICAgMHhFNDZFOiAweDgyMDUsXG4gICAgMHhFNDZGOiAweDgyMDcsXG4gICAgMHhFNDcwOiAweDgyMEEsXG4gICAgMHhFNDcxOiAweDgyMEQsXG4gICAgMHhFNDcyOiAweDgyMTAsXG4gICAgMHhFNDczOiAweDgyMTYsXG4gICAgMHhFNDc0OiAweDgyMjksXG4gICAgMHhFNDc1OiAweDgyMkIsXG4gICAgMHhFNDc2OiAweDgyMzgsXG4gICAgMHhFNDc3OiAweDgyMzMsXG4gICAgMHhFNDc4OiAweDgyNDAsXG4gICAgMHhFNDc5OiAweDgyNTksXG4gICAgMHhFNDdBOiAweDgyNTgsXG4gICAgMHhFNDdCOiAweDgyNUQsXG4gICAgMHhFNDdDOiAweDgyNUEsXG4gICAgMHhFNDdEOiAweDgyNUYsXG4gICAgMHhFNDdFOiAweDgyNjQsXG4gICAgMHhFNDgwOiAweDgyNjIsXG4gICAgMHhFNDgxOiAweDgyNjgsXG4gICAgMHhFNDgyOiAweDgyNkEsXG4gICAgMHhFNDgzOiAweDgyNkIsXG4gICAgMHhFNDg0OiAweDgyMkUsXG4gICAgMHhFNDg1OiAweDgyNzEsXG4gICAgMHhFNDg2OiAweDgyNzcsXG4gICAgMHhFNDg3OiAweDgyNzgsXG4gICAgMHhFNDg4OiAweDgyN0UsXG4gICAgMHhFNDg5OiAweDgyOEQsXG4gICAgMHhFNDhBOiAweDgyOTIsXG4gICAgMHhFNDhCOiAweDgyQUIsXG4gICAgMHhFNDhDOiAweDgyOUYsXG4gICAgMHhFNDhEOiAweDgyQkIsXG4gICAgMHhFNDhFOiAweDgyQUMsXG4gICAgMHhFNDhGOiAweDgyRTEsXG4gICAgMHhFNDkwOiAweDgyRTMsXG4gICAgMHhFNDkxOiAweDgyREYsXG4gICAgMHhFNDkyOiAweDgyRDIsXG4gICAgMHhFNDkzOiAweDgyRjQsXG4gICAgMHhFNDk0OiAweDgyRjMsXG4gICAgMHhFNDk1OiAweDgyRkEsXG4gICAgMHhFNDk2OiAweDgzOTMsXG4gICAgMHhFNDk3OiAweDgzMDMsXG4gICAgMHhFNDk4OiAweDgyRkIsXG4gICAgMHhFNDk5OiAweDgyRjksXG4gICAgMHhFNDlBOiAweDgyREUsXG4gICAgMHhFNDlCOiAweDgzMDYsXG4gICAgMHhFNDlDOiAweDgyREMsXG4gICAgMHhFNDlEOiAweDgzMDksXG4gICAgMHhFNDlFOiAweDgyRDksXG4gICAgMHhFNDlGOiAweDgzMzUsXG4gICAgMHhFNEEwOiAweDgzMzQsXG4gICAgMHhFNEExOiAweDgzMTYsXG4gICAgMHhFNEEyOiAweDgzMzIsXG4gICAgMHhFNEEzOiAweDgzMzEsXG4gICAgMHhFNEE0OiAweDgzNDAsXG4gICAgMHhFNEE1OiAweDgzMzksXG4gICAgMHhFNEE2OiAweDgzNTAsXG4gICAgMHhFNEE3OiAweDgzNDUsXG4gICAgMHhFNEE4OiAweDgzMkYsXG4gICAgMHhFNEE5OiAweDgzMkIsXG4gICAgMHhFNEFBOiAweDgzMTcsXG4gICAgMHhFNEFCOiAweDgzMTgsXG4gICAgMHhFNEFDOiAweDgzODUsXG4gICAgMHhFNEFEOiAweDgzOUEsXG4gICAgMHhFNEFFOiAweDgzQUEsXG4gICAgMHhFNEFGOiAweDgzOUYsXG4gICAgMHhFNEIwOiAweDgzQTIsXG4gICAgMHhFNEIxOiAweDgzOTYsXG4gICAgMHhFNEIyOiAweDgzMjMsXG4gICAgMHhFNEIzOiAweDgzOEUsXG4gICAgMHhFNEI0OiAweDgzODcsXG4gICAgMHhFNEI1OiAweDgzOEEsXG4gICAgMHhFNEI2OiAweDgzN0MsXG4gICAgMHhFNEI3OiAweDgzQjUsXG4gICAgMHhFNEI4OiAweDgzNzMsXG4gICAgMHhFNEI5OiAweDgzNzUsXG4gICAgMHhFNEJBOiAweDgzQTAsXG4gICAgMHhFNEJCOiAweDgzODksXG4gICAgMHhFNEJDOiAweDgzQTgsXG4gICAgMHhFNEJEOiAweDgzRjQsXG4gICAgMHhFNEJFOiAweDg0MTMsXG4gICAgMHhFNEJGOiAweDgzRUIsXG4gICAgMHhFNEMwOiAweDgzQ0UsXG4gICAgMHhFNEMxOiAweDgzRkQsXG4gICAgMHhFNEMyOiAweDg0MDMsXG4gICAgMHhFNEMzOiAweDgzRDgsXG4gICAgMHhFNEM0OiAweDg0MEIsXG4gICAgMHhFNEM1OiAweDgzQzEsXG4gICAgMHhFNEM2OiAweDgzRjcsXG4gICAgMHhFNEM3OiAweDg0MDcsXG4gICAgMHhFNEM4OiAweDgzRTAsXG4gICAgMHhFNEM5OiAweDgzRjIsXG4gICAgMHhFNENBOiAweDg0MEQsXG4gICAgMHhFNENCOiAweDg0MjIsXG4gICAgMHhFNENDOiAweDg0MjAsXG4gICAgMHhFNENEOiAweDgzQkQsXG4gICAgMHhFNENFOiAweDg0MzgsXG4gICAgMHhFNENGOiAweDg1MDYsXG4gICAgMHhFNEQwOiAweDgzRkIsXG4gICAgMHhFNEQxOiAweDg0NkQsXG4gICAgMHhFNEQyOiAweDg0MkEsXG4gICAgMHhFNEQzOiAweDg0M0MsXG4gICAgMHhFNEQ0OiAweDg1NUEsXG4gICAgMHhFNEQ1OiAweDg0ODQsXG4gICAgMHhFNEQ2OiAweDg0NzcsXG4gICAgMHhFNEQ3OiAweDg0NkIsXG4gICAgMHhFNEQ4OiAweDg0QUQsXG4gICAgMHhFNEQ5OiAweDg0NkUsXG4gICAgMHhFNERBOiAweDg0ODIsXG4gICAgMHhFNERCOiAweDg0NjksXG4gICAgMHhFNERDOiAweDg0NDYsXG4gICAgMHhFNEREOiAweDg0MkMsXG4gICAgMHhFNERFOiAweDg0NkYsXG4gICAgMHhFNERGOiAweDg0NzksXG4gICAgMHhFNEUwOiAweDg0MzUsXG4gICAgMHhFNEUxOiAweDg0Q0EsXG4gICAgMHhFNEUyOiAweDg0NjIsXG4gICAgMHhFNEUzOiAweDg0QjksXG4gICAgMHhFNEU0OiAweDg0QkYsXG4gICAgMHhFNEU1OiAweDg0OUYsXG4gICAgMHhFNEU2OiAweDg0RDksXG4gICAgMHhFNEU3OiAweDg0Q0QsXG4gICAgMHhFNEU4OiAweDg0QkIsXG4gICAgMHhFNEU5OiAweDg0REEsXG4gICAgMHhFNEVBOiAweDg0RDAsXG4gICAgMHhFNEVCOiAweDg0QzEsXG4gICAgMHhFNEVDOiAweDg0QzYsXG4gICAgMHhFNEVEOiAweDg0RDYsXG4gICAgMHhFNEVFOiAweDg0QTEsXG4gICAgMHhFNEVGOiAweDg1MjEsXG4gICAgMHhFNEYwOiAweDg0RkYsXG4gICAgMHhFNEYxOiAweDg0RjQsXG4gICAgMHhFNEYyOiAweDg1MTcsXG4gICAgMHhFNEYzOiAweDg1MTgsXG4gICAgMHhFNEY0OiAweDg1MkMsXG4gICAgMHhFNEY1OiAweDg1MUYsXG4gICAgMHhFNEY2OiAweDg1MTUsXG4gICAgMHhFNEY3OiAweDg1MTQsXG4gICAgMHhFNEY4OiAweDg0RkMsXG4gICAgMHhFNEY5OiAweDg1NDAsXG4gICAgMHhFNEZBOiAweDg1NjMsXG4gICAgMHhFNEZCOiAweDg1NTgsXG4gICAgMHhFNEZDOiAweDg1NDgsXG4gICAgMHhFNTQwOiAweDg1NDEsXG4gICAgMHhFNTQxOiAweDg2MDIsXG4gICAgMHhFNTQyOiAweDg1NEIsXG4gICAgMHhFNTQzOiAweDg1NTUsXG4gICAgMHhFNTQ0OiAweDg1ODAsXG4gICAgMHhFNTQ1OiAweDg1QTQsXG4gICAgMHhFNTQ2OiAweDg1ODgsXG4gICAgMHhFNTQ3OiAweDg1OTEsXG4gICAgMHhFNTQ4OiAweDg1OEEsXG4gICAgMHhFNTQ5OiAweDg1QTgsXG4gICAgMHhFNTRBOiAweDg1NkQsXG4gICAgMHhFNTRCOiAweDg1OTQsXG4gICAgMHhFNTRDOiAweDg1OUIsXG4gICAgMHhFNTREOiAweDg1RUEsXG4gICAgMHhFNTRFOiAweDg1ODcsXG4gICAgMHhFNTRGOiAweDg1OUMsXG4gICAgMHhFNTUwOiAweDg1NzcsXG4gICAgMHhFNTUxOiAweDg1N0UsXG4gICAgMHhFNTUyOiAweDg1OTAsXG4gICAgMHhFNTUzOiAweDg1QzksXG4gICAgMHhFNTU0OiAweDg1QkEsXG4gICAgMHhFNTU1OiAweDg1Q0YsXG4gICAgMHhFNTU2OiAweDg1QjksXG4gICAgMHhFNTU3OiAweDg1RDAsXG4gICAgMHhFNTU4OiAweDg1RDUsXG4gICAgMHhFNTU5OiAweDg1REQsXG4gICAgMHhFNTVBOiAweDg1RTUsXG4gICAgMHhFNTVCOiAweDg1REMsXG4gICAgMHhFNTVDOiAweDg1RjksXG4gICAgMHhFNTVEOiAweDg2MEEsXG4gICAgMHhFNTVFOiAweDg2MTMsXG4gICAgMHhFNTVGOiAweDg2MEIsXG4gICAgMHhFNTYwOiAweDg1RkUsXG4gICAgMHhFNTYxOiAweDg1RkEsXG4gICAgMHhFNTYyOiAweDg2MDYsXG4gICAgMHhFNTYzOiAweDg2MjIsXG4gICAgMHhFNTY0OiAweDg2MUEsXG4gICAgMHhFNTY1OiAweDg2MzAsXG4gICAgMHhFNTY2OiAweDg2M0YsXG4gICAgMHhFNTY3OiAweDg2NEQsXG4gICAgMHhFNTY4OiAweDRFNTUsXG4gICAgMHhFNTY5OiAweDg2NTQsXG4gICAgMHhFNTZBOiAweDg2NUYsXG4gICAgMHhFNTZCOiAweDg2NjcsXG4gICAgMHhFNTZDOiAweDg2NzEsXG4gICAgMHhFNTZEOiAweDg2OTMsXG4gICAgMHhFNTZFOiAweDg2QTMsXG4gICAgMHhFNTZGOiAweDg2QTksXG4gICAgMHhFNTcwOiAweDg2QUEsXG4gICAgMHhFNTcxOiAweDg2OEIsXG4gICAgMHhFNTcyOiAweDg2OEMsXG4gICAgMHhFNTczOiAweDg2QjYsXG4gICAgMHhFNTc0OiAweDg2QUYsXG4gICAgMHhFNTc1OiAweDg2QzQsXG4gICAgMHhFNTc2OiAweDg2QzYsXG4gICAgMHhFNTc3OiAweDg2QjAsXG4gICAgMHhFNTc4OiAweDg2QzksXG4gICAgMHhFNTc5OiAweDg4MjMsXG4gICAgMHhFNTdBOiAweDg2QUIsXG4gICAgMHhFNTdCOiAweDg2RDQsXG4gICAgMHhFNTdDOiAweDg2REUsXG4gICAgMHhFNTdEOiAweDg2RTksXG4gICAgMHhFNTdFOiAweDg2RUMsXG4gICAgMHhFNTgwOiAweDg2REYsXG4gICAgMHhFNTgxOiAweDg2REIsXG4gICAgMHhFNTgyOiAweDg2RUYsXG4gICAgMHhFNTgzOiAweDg3MTIsXG4gICAgMHhFNTg0OiAweDg3MDYsXG4gICAgMHhFNTg1OiAweDg3MDgsXG4gICAgMHhFNTg2OiAweDg3MDAsXG4gICAgMHhFNTg3OiAweDg3MDMsXG4gICAgMHhFNTg4OiAweDg2RkIsXG4gICAgMHhFNTg5OiAweDg3MTEsXG4gICAgMHhFNThBOiAweDg3MDksXG4gICAgMHhFNThCOiAweDg3MEQsXG4gICAgMHhFNThDOiAweDg2RjksXG4gICAgMHhFNThEOiAweDg3MEEsXG4gICAgMHhFNThFOiAweDg3MzQsXG4gICAgMHhFNThGOiAweDg3M0YsXG4gICAgMHhFNTkwOiAweDg3MzcsXG4gICAgMHhFNTkxOiAweDg3M0IsXG4gICAgMHhFNTkyOiAweDg3MjUsXG4gICAgMHhFNTkzOiAweDg3MjksXG4gICAgMHhFNTk0OiAweDg3MUEsXG4gICAgMHhFNTk1OiAweDg3NjAsXG4gICAgMHhFNTk2OiAweDg3NUYsXG4gICAgMHhFNTk3OiAweDg3NzgsXG4gICAgMHhFNTk4OiAweDg3NEMsXG4gICAgMHhFNTk5OiAweDg3NEUsXG4gICAgMHhFNTlBOiAweDg3NzQsXG4gICAgMHhFNTlCOiAweDg3NTcsXG4gICAgMHhFNTlDOiAweDg3NjgsXG4gICAgMHhFNTlEOiAweDg3NkUsXG4gICAgMHhFNTlFOiAweDg3NTksXG4gICAgMHhFNTlGOiAweDg3NTMsXG4gICAgMHhFNUEwOiAweDg3NjMsXG4gICAgMHhFNUExOiAweDg3NkEsXG4gICAgMHhFNUEyOiAweDg4MDUsXG4gICAgMHhFNUEzOiAweDg3QTIsXG4gICAgMHhFNUE0OiAweDg3OUYsXG4gICAgMHhFNUE1OiAweDg3ODIsXG4gICAgMHhFNUE2OiAweDg3QUYsXG4gICAgMHhFNUE3OiAweDg3Q0IsXG4gICAgMHhFNUE4OiAweDg3QkQsXG4gICAgMHhFNUE5OiAweDg3QzAsXG4gICAgMHhFNUFBOiAweDg3RDAsXG4gICAgMHhFNUFCOiAweDk2RDYsXG4gICAgMHhFNUFDOiAweDg3QUIsXG4gICAgMHhFNUFEOiAweDg3QzQsXG4gICAgMHhFNUFFOiAweDg3QjMsXG4gICAgMHhFNUFGOiAweDg3QzcsXG4gICAgMHhFNUIwOiAweDg3QzYsXG4gICAgMHhFNUIxOiAweDg3QkIsXG4gICAgMHhFNUIyOiAweDg3RUYsXG4gICAgMHhFNUIzOiAweDg3RjIsXG4gICAgMHhFNUI0OiAweDg3RTAsXG4gICAgMHhFNUI1OiAweDg4MEYsXG4gICAgMHhFNUI2OiAweDg4MEQsXG4gICAgMHhFNUI3OiAweDg3RkUsXG4gICAgMHhFNUI4OiAweDg3RjYsXG4gICAgMHhFNUI5OiAweDg3RjcsXG4gICAgMHhFNUJBOiAweDg4MEUsXG4gICAgMHhFNUJCOiAweDg3RDIsXG4gICAgMHhFNUJDOiAweDg4MTEsXG4gICAgMHhFNUJEOiAweDg4MTYsXG4gICAgMHhFNUJFOiAweDg4MTUsXG4gICAgMHhFNUJGOiAweDg4MjIsXG4gICAgMHhFNUMwOiAweDg4MjEsXG4gICAgMHhFNUMxOiAweDg4MzEsXG4gICAgMHhFNUMyOiAweDg4MzYsXG4gICAgMHhFNUMzOiAweDg4MzksXG4gICAgMHhFNUM0OiAweDg4MjcsXG4gICAgMHhFNUM1OiAweDg4M0IsXG4gICAgMHhFNUM2OiAweDg4NDQsXG4gICAgMHhFNUM3OiAweDg4NDIsXG4gICAgMHhFNUM4OiAweDg4NTIsXG4gICAgMHhFNUM5OiAweDg4NTksXG4gICAgMHhFNUNBOiAweDg4NUUsXG4gICAgMHhFNUNCOiAweDg4NjIsXG4gICAgMHhFNUNDOiAweDg4NkIsXG4gICAgMHhFNUNEOiAweDg4ODEsXG4gICAgMHhFNUNFOiAweDg4N0UsXG4gICAgMHhFNUNGOiAweDg4OUUsXG4gICAgMHhFNUQwOiAweDg4NzUsXG4gICAgMHhFNUQxOiAweDg4N0QsXG4gICAgMHhFNUQyOiAweDg4QjUsXG4gICAgMHhFNUQzOiAweDg4NzIsXG4gICAgMHhFNUQ0OiAweDg4ODIsXG4gICAgMHhFNUQ1OiAweDg4OTcsXG4gICAgMHhFNUQ2OiAweDg4OTIsXG4gICAgMHhFNUQ3OiAweDg4QUUsXG4gICAgMHhFNUQ4OiAweDg4OTksXG4gICAgMHhFNUQ5OiAweDg4QTIsXG4gICAgMHhFNURBOiAweDg4OEQsXG4gICAgMHhFNURCOiAweDg4QTQsXG4gICAgMHhFNURDOiAweDg4QjAsXG4gICAgMHhFNUREOiAweDg4QkYsXG4gICAgMHhFNURFOiAweDg4QjEsXG4gICAgMHhFNURGOiAweDg4QzMsXG4gICAgMHhFNUUwOiAweDg4QzQsXG4gICAgMHhFNUUxOiAweDg4RDQsXG4gICAgMHhFNUUyOiAweDg4RDgsXG4gICAgMHhFNUUzOiAweDg4RDksXG4gICAgMHhFNUU0OiAweDg4REQsXG4gICAgMHhFNUU1OiAweDg4RjksXG4gICAgMHhFNUU2OiAweDg5MDIsXG4gICAgMHhFNUU3OiAweDg4RkMsXG4gICAgMHhFNUU4OiAweDg4RjQsXG4gICAgMHhFNUU5OiAweDg4RTgsXG4gICAgMHhFNUVBOiAweDg4RjIsXG4gICAgMHhFNUVCOiAweDg5MDQsXG4gICAgMHhFNUVDOiAweDg5MEMsXG4gICAgMHhFNUVEOiAweDg5MEEsXG4gICAgMHhFNUVFOiAweDg5MTMsXG4gICAgMHhFNUVGOiAweDg5NDMsXG4gICAgMHhFNUYwOiAweDg5MUUsXG4gICAgMHhFNUYxOiAweDg5MjUsXG4gICAgMHhFNUYyOiAweDg5MkEsXG4gICAgMHhFNUYzOiAweDg5MkIsXG4gICAgMHhFNUY0OiAweDg5NDEsXG4gICAgMHhFNUY1OiAweDg5NDQsXG4gICAgMHhFNUY2OiAweDg5M0IsXG4gICAgMHhFNUY3OiAweDg5MzYsXG4gICAgMHhFNUY4OiAweDg5MzgsXG4gICAgMHhFNUY5OiAweDg5NEMsXG4gICAgMHhFNUZBOiAweDg5MUQsXG4gICAgMHhFNUZCOiAweDg5NjAsXG4gICAgMHhFNUZDOiAweDg5NUUsXG4gICAgMHhFNjQwOiAweDg5NjYsXG4gICAgMHhFNjQxOiAweDg5NjQsXG4gICAgMHhFNjQyOiAweDg5NkQsXG4gICAgMHhFNjQzOiAweDg5NkEsXG4gICAgMHhFNjQ0OiAweDg5NkYsXG4gICAgMHhFNjQ1OiAweDg5NzQsXG4gICAgMHhFNjQ2OiAweDg5NzcsXG4gICAgMHhFNjQ3OiAweDg5N0UsXG4gICAgMHhFNjQ4OiAweDg5ODMsXG4gICAgMHhFNjQ5OiAweDg5ODgsXG4gICAgMHhFNjRBOiAweDg5OEEsXG4gICAgMHhFNjRCOiAweDg5OTMsXG4gICAgMHhFNjRDOiAweDg5OTgsXG4gICAgMHhFNjREOiAweDg5QTEsXG4gICAgMHhFNjRFOiAweDg5QTksXG4gICAgMHhFNjRGOiAweDg5QTYsXG4gICAgMHhFNjUwOiAweDg5QUMsXG4gICAgMHhFNjUxOiAweDg5QUYsXG4gICAgMHhFNjUyOiAweDg5QjIsXG4gICAgMHhFNjUzOiAweDg5QkEsXG4gICAgMHhFNjU0OiAweDg5QkQsXG4gICAgMHhFNjU1OiAweDg5QkYsXG4gICAgMHhFNjU2OiAweDg5QzAsXG4gICAgMHhFNjU3OiAweDg5REEsXG4gICAgMHhFNjU4OiAweDg5REMsXG4gICAgMHhFNjU5OiAweDg5REQsXG4gICAgMHhFNjVBOiAweDg5RTcsXG4gICAgMHhFNjVCOiAweDg5RjQsXG4gICAgMHhFNjVDOiAweDg5RjgsXG4gICAgMHhFNjVEOiAweDhBMDMsXG4gICAgMHhFNjVFOiAweDhBMTYsXG4gICAgMHhFNjVGOiAweDhBMTAsXG4gICAgMHhFNjYwOiAweDhBMEMsXG4gICAgMHhFNjYxOiAweDhBMUIsXG4gICAgMHhFNjYyOiAweDhBMUQsXG4gICAgMHhFNjYzOiAweDhBMjUsXG4gICAgMHhFNjY0OiAweDhBMzYsXG4gICAgMHhFNjY1OiAweDhBNDEsXG4gICAgMHhFNjY2OiAweDhBNUIsXG4gICAgMHhFNjY3OiAweDhBNTIsXG4gICAgMHhFNjY4OiAweDhBNDYsXG4gICAgMHhFNjY5OiAweDhBNDgsXG4gICAgMHhFNjZBOiAweDhBN0MsXG4gICAgMHhFNjZCOiAweDhBNkQsXG4gICAgMHhFNjZDOiAweDhBNkMsXG4gICAgMHhFNjZEOiAweDhBNjIsXG4gICAgMHhFNjZFOiAweDhBODUsXG4gICAgMHhFNjZGOiAweDhBODIsXG4gICAgMHhFNjcwOiAweDhBODQsXG4gICAgMHhFNjcxOiAweDhBQTgsXG4gICAgMHhFNjcyOiAweDhBQTEsXG4gICAgMHhFNjczOiAweDhBOTEsXG4gICAgMHhFNjc0OiAweDhBQTUsXG4gICAgMHhFNjc1OiAweDhBQTYsXG4gICAgMHhFNjc2OiAweDhBOUEsXG4gICAgMHhFNjc3OiAweDhBQTMsXG4gICAgMHhFNjc4OiAweDhBQzQsXG4gICAgMHhFNjc5OiAweDhBQ0QsXG4gICAgMHhFNjdBOiAweDhBQzIsXG4gICAgMHhFNjdCOiAweDhBREEsXG4gICAgMHhFNjdDOiAweDhBRUIsXG4gICAgMHhFNjdEOiAweDhBRjMsXG4gICAgMHhFNjdFOiAweDhBRTcsXG4gICAgMHhFNjgwOiAweDhBRTQsXG4gICAgMHhFNjgxOiAweDhBRjEsXG4gICAgMHhFNjgyOiAweDhCMTQsXG4gICAgMHhFNjgzOiAweDhBRTAsXG4gICAgMHhFNjg0OiAweDhBRTIsXG4gICAgMHhFNjg1OiAweDhBRjcsXG4gICAgMHhFNjg2OiAweDhBREUsXG4gICAgMHhFNjg3OiAweDhBREIsXG4gICAgMHhFNjg4OiAweDhCMEMsXG4gICAgMHhFNjg5OiAweDhCMDcsXG4gICAgMHhFNjhBOiAweDhCMUEsXG4gICAgMHhFNjhCOiAweDhBRTEsXG4gICAgMHhFNjhDOiAweDhCMTYsXG4gICAgMHhFNjhEOiAweDhCMTAsXG4gICAgMHhFNjhFOiAweDhCMTcsXG4gICAgMHhFNjhGOiAweDhCMjAsXG4gICAgMHhFNjkwOiAweDhCMzMsXG4gICAgMHhFNjkxOiAweDk3QUIsXG4gICAgMHhFNjkyOiAweDhCMjYsXG4gICAgMHhFNjkzOiAweDhCMkIsXG4gICAgMHhFNjk0OiAweDhCM0UsXG4gICAgMHhFNjk1OiAweDhCMjgsXG4gICAgMHhFNjk2OiAweDhCNDEsXG4gICAgMHhFNjk3OiAweDhCNEMsXG4gICAgMHhFNjk4OiAweDhCNEYsXG4gICAgMHhFNjk5OiAweDhCNEUsXG4gICAgMHhFNjlBOiAweDhCNDksXG4gICAgMHhFNjlCOiAweDhCNTYsXG4gICAgMHhFNjlDOiAweDhCNUIsXG4gICAgMHhFNjlEOiAweDhCNUEsXG4gICAgMHhFNjlFOiAweDhCNkIsXG4gICAgMHhFNjlGOiAweDhCNUYsXG4gICAgMHhFNkEwOiAweDhCNkMsXG4gICAgMHhFNkExOiAweDhCNkYsXG4gICAgMHhFNkEyOiAweDhCNzQsXG4gICAgMHhFNkEzOiAweDhCN0QsXG4gICAgMHhFNkE0OiAweDhCODAsXG4gICAgMHhFNkE1OiAweDhCOEMsXG4gICAgMHhFNkE2OiAweDhCOEUsXG4gICAgMHhFNkE3OiAweDhCOTIsXG4gICAgMHhFNkE4OiAweDhCOTMsXG4gICAgMHhFNkE5OiAweDhCOTYsXG4gICAgMHhFNkFBOiAweDhCOTksXG4gICAgMHhFNkFCOiAweDhCOUEsXG4gICAgMHhFNkFDOiAweDhDM0EsXG4gICAgMHhFNkFEOiAweDhDNDEsXG4gICAgMHhFNkFFOiAweDhDM0YsXG4gICAgMHhFNkFGOiAweDhDNDgsXG4gICAgMHhFNkIwOiAweDhDNEMsXG4gICAgMHhFNkIxOiAweDhDNEUsXG4gICAgMHhFNkIyOiAweDhDNTAsXG4gICAgMHhFNkIzOiAweDhDNTUsXG4gICAgMHhFNkI0OiAweDhDNjIsXG4gICAgMHhFNkI1OiAweDhDNkMsXG4gICAgMHhFNkI2OiAweDhDNzgsXG4gICAgMHhFNkI3OiAweDhDN0EsXG4gICAgMHhFNkI4OiAweDhDODIsXG4gICAgMHhFNkI5OiAweDhDODksXG4gICAgMHhFNkJBOiAweDhDODUsXG4gICAgMHhFNkJCOiAweDhDOEEsXG4gICAgMHhFNkJDOiAweDhDOEQsXG4gICAgMHhFNkJEOiAweDhDOEUsXG4gICAgMHhFNkJFOiAweDhDOTQsXG4gICAgMHhFNkJGOiAweDhDN0MsXG4gICAgMHhFNkMwOiAweDhDOTgsXG4gICAgMHhFNkMxOiAweDYyMUQsXG4gICAgMHhFNkMyOiAweDhDQUQsXG4gICAgMHhFNkMzOiAweDhDQUEsXG4gICAgMHhFNkM0OiAweDhDQkQsXG4gICAgMHhFNkM1OiAweDhDQjIsXG4gICAgMHhFNkM2OiAweDhDQjMsXG4gICAgMHhFNkM3OiAweDhDQUUsXG4gICAgMHhFNkM4OiAweDhDQjYsXG4gICAgMHhFNkM5OiAweDhDQzgsXG4gICAgMHhFNkNBOiAweDhDQzEsXG4gICAgMHhFNkNCOiAweDhDRTQsXG4gICAgMHhFNkNDOiAweDhDRTMsXG4gICAgMHhFNkNEOiAweDhDREEsXG4gICAgMHhFNkNFOiAweDhDRkQsXG4gICAgMHhFNkNGOiAweDhDRkEsXG4gICAgMHhFNkQwOiAweDhDRkIsXG4gICAgMHhFNkQxOiAweDhEMDQsXG4gICAgMHhFNkQyOiAweDhEMDUsXG4gICAgMHhFNkQzOiAweDhEMEEsXG4gICAgMHhFNkQ0OiAweDhEMDcsXG4gICAgMHhFNkQ1OiAweDhEMEYsXG4gICAgMHhFNkQ2OiAweDhEMEQsXG4gICAgMHhFNkQ3OiAweDhEMTAsXG4gICAgMHhFNkQ4OiAweDlGNEUsXG4gICAgMHhFNkQ5OiAweDhEMTMsXG4gICAgMHhFNkRBOiAweDhDQ0QsXG4gICAgMHhFNkRCOiAweDhEMTQsXG4gICAgMHhFNkRDOiAweDhEMTYsXG4gICAgMHhFNkREOiAweDhENjcsXG4gICAgMHhFNkRFOiAweDhENkQsXG4gICAgMHhFNkRGOiAweDhENzEsXG4gICAgMHhFNkUwOiAweDhENzMsXG4gICAgMHhFNkUxOiAweDhEODEsXG4gICAgMHhFNkUyOiAweDhEOTksXG4gICAgMHhFNkUzOiAweDhEQzIsXG4gICAgMHhFNkU0OiAweDhEQkUsXG4gICAgMHhFNkU1OiAweDhEQkEsXG4gICAgMHhFNkU2OiAweDhEQ0YsXG4gICAgMHhFNkU3OiAweDhEREEsXG4gICAgMHhFNkU4OiAweDhERDYsXG4gICAgMHhFNkU5OiAweDhEQ0MsXG4gICAgMHhFNkVBOiAweDhEREIsXG4gICAgMHhFNkVCOiAweDhEQ0IsXG4gICAgMHhFNkVDOiAweDhERUEsXG4gICAgMHhFNkVEOiAweDhERUIsXG4gICAgMHhFNkVFOiAweDhEREYsXG4gICAgMHhFNkVGOiAweDhERTMsXG4gICAgMHhFNkYwOiAweDhERkMsXG4gICAgMHhFNkYxOiAweDhFMDgsXG4gICAgMHhFNkYyOiAweDhFMDksXG4gICAgMHhFNkYzOiAweDhERkYsXG4gICAgMHhFNkY0OiAweDhFMUQsXG4gICAgMHhFNkY1OiAweDhFMUUsXG4gICAgMHhFNkY2OiAweDhFMTAsXG4gICAgMHhFNkY3OiAweDhFMUYsXG4gICAgMHhFNkY4OiAweDhFNDIsXG4gICAgMHhFNkY5OiAweDhFMzUsXG4gICAgMHhFNkZBOiAweDhFMzAsXG4gICAgMHhFNkZCOiAweDhFMzQsXG4gICAgMHhFNkZDOiAweDhFNEEsXG4gICAgMHhFNzQwOiAweDhFNDcsXG4gICAgMHhFNzQxOiAweDhFNDksXG4gICAgMHhFNzQyOiAweDhFNEMsXG4gICAgMHhFNzQzOiAweDhFNTAsXG4gICAgMHhFNzQ0OiAweDhFNDgsXG4gICAgMHhFNzQ1OiAweDhFNTksXG4gICAgMHhFNzQ2OiAweDhFNjQsXG4gICAgMHhFNzQ3OiAweDhFNjAsXG4gICAgMHhFNzQ4OiAweDhFMkEsXG4gICAgMHhFNzQ5OiAweDhFNjMsXG4gICAgMHhFNzRBOiAweDhFNTUsXG4gICAgMHhFNzRCOiAweDhFNzYsXG4gICAgMHhFNzRDOiAweDhFNzIsXG4gICAgMHhFNzREOiAweDhFN0MsXG4gICAgMHhFNzRFOiAweDhFODEsXG4gICAgMHhFNzRGOiAweDhFODcsXG4gICAgMHhFNzUwOiAweDhFODUsXG4gICAgMHhFNzUxOiAweDhFODQsXG4gICAgMHhFNzUyOiAweDhFOEIsXG4gICAgMHhFNzUzOiAweDhFOEEsXG4gICAgMHhFNzU0OiAweDhFOTMsXG4gICAgMHhFNzU1OiAweDhFOTEsXG4gICAgMHhFNzU2OiAweDhFOTQsXG4gICAgMHhFNzU3OiAweDhFOTksXG4gICAgMHhFNzU4OiAweDhFQUEsXG4gICAgMHhFNzU5OiAweDhFQTEsXG4gICAgMHhFNzVBOiAweDhFQUMsXG4gICAgMHhFNzVCOiAweDhFQjAsXG4gICAgMHhFNzVDOiAweDhFQzYsXG4gICAgMHhFNzVEOiAweDhFQjEsXG4gICAgMHhFNzVFOiAweDhFQkUsXG4gICAgMHhFNzVGOiAweDhFQzUsXG4gICAgMHhFNzYwOiAweDhFQzgsXG4gICAgMHhFNzYxOiAweDhFQ0IsXG4gICAgMHhFNzYyOiAweDhFREIsXG4gICAgMHhFNzYzOiAweDhFRTMsXG4gICAgMHhFNzY0OiAweDhFRkMsXG4gICAgMHhFNzY1OiAweDhFRkIsXG4gICAgMHhFNzY2OiAweDhFRUIsXG4gICAgMHhFNzY3OiAweDhFRkUsXG4gICAgMHhFNzY4OiAweDhGMEEsXG4gICAgMHhFNzY5OiAweDhGMDUsXG4gICAgMHhFNzZBOiAweDhGMTUsXG4gICAgMHhFNzZCOiAweDhGMTIsXG4gICAgMHhFNzZDOiAweDhGMTksXG4gICAgMHhFNzZEOiAweDhGMTMsXG4gICAgMHhFNzZFOiAweDhGMUMsXG4gICAgMHhFNzZGOiAweDhGMUYsXG4gICAgMHhFNzcwOiAweDhGMUIsXG4gICAgMHhFNzcxOiAweDhGMEMsXG4gICAgMHhFNzcyOiAweDhGMjYsXG4gICAgMHhFNzczOiAweDhGMzMsXG4gICAgMHhFNzc0OiAweDhGM0IsXG4gICAgMHhFNzc1OiAweDhGMzksXG4gICAgMHhFNzc2OiAweDhGNDUsXG4gICAgMHhFNzc3OiAweDhGNDIsXG4gICAgMHhFNzc4OiAweDhGM0UsXG4gICAgMHhFNzc5OiAweDhGNEMsXG4gICAgMHhFNzdBOiAweDhGNDksXG4gICAgMHhFNzdCOiAweDhGNDYsXG4gICAgMHhFNzdDOiAweDhGNEUsXG4gICAgMHhFNzdEOiAweDhGNTcsXG4gICAgMHhFNzdFOiAweDhGNUMsXG4gICAgMHhFNzgwOiAweDhGNjIsXG4gICAgMHhFNzgxOiAweDhGNjMsXG4gICAgMHhFNzgyOiAweDhGNjQsXG4gICAgMHhFNzgzOiAweDhGOUMsXG4gICAgMHhFNzg0OiAweDhGOUYsXG4gICAgMHhFNzg1OiAweDhGQTMsXG4gICAgMHhFNzg2OiAweDhGQUQsXG4gICAgMHhFNzg3OiAweDhGQUYsXG4gICAgMHhFNzg4OiAweDhGQjcsXG4gICAgMHhFNzg5OiAweDhGREEsXG4gICAgMHhFNzhBOiAweDhGRTUsXG4gICAgMHhFNzhCOiAweDhGRTIsXG4gICAgMHhFNzhDOiAweDhGRUEsXG4gICAgMHhFNzhEOiAweDhGRUYsXG4gICAgMHhFNzhFOiAweDkwODcsXG4gICAgMHhFNzhGOiAweDhGRjQsXG4gICAgMHhFNzkwOiAweDkwMDUsXG4gICAgMHhFNzkxOiAweDhGRjksXG4gICAgMHhFNzkyOiAweDhGRkEsXG4gICAgMHhFNzkzOiAweDkwMTEsXG4gICAgMHhFNzk0OiAweDkwMTUsXG4gICAgMHhFNzk1OiAweDkwMjEsXG4gICAgMHhFNzk2OiAweDkwMEQsXG4gICAgMHhFNzk3OiAweDkwMUUsXG4gICAgMHhFNzk4OiAweDkwMTYsXG4gICAgMHhFNzk5OiAweDkwMEIsXG4gICAgMHhFNzlBOiAweDkwMjcsXG4gICAgMHhFNzlCOiAweDkwMzYsXG4gICAgMHhFNzlDOiAweDkwMzUsXG4gICAgMHhFNzlEOiAweDkwMzksXG4gICAgMHhFNzlFOiAweDhGRjgsXG4gICAgMHhFNzlGOiAweDkwNEYsXG4gICAgMHhFN0EwOiAweDkwNTAsXG4gICAgMHhFN0ExOiAweDkwNTEsXG4gICAgMHhFN0EyOiAweDkwNTIsXG4gICAgMHhFN0EzOiAweDkwMEUsXG4gICAgMHhFN0E0OiAweDkwNDksXG4gICAgMHhFN0E1OiAweDkwM0UsXG4gICAgMHhFN0E2OiAweDkwNTYsXG4gICAgMHhFN0E3OiAweDkwNTgsXG4gICAgMHhFN0E4OiAweDkwNUUsXG4gICAgMHhFN0E5OiAweDkwNjgsXG4gICAgMHhFN0FBOiAweDkwNkYsXG4gICAgMHhFN0FCOiAweDkwNzYsXG4gICAgMHhFN0FDOiAweDk2QTgsXG4gICAgMHhFN0FEOiAweDkwNzIsXG4gICAgMHhFN0FFOiAweDkwODIsXG4gICAgMHhFN0FGOiAweDkwN0QsXG4gICAgMHhFN0IwOiAweDkwODEsXG4gICAgMHhFN0IxOiAweDkwODAsXG4gICAgMHhFN0IyOiAweDkwOEEsXG4gICAgMHhFN0IzOiAweDkwODksXG4gICAgMHhFN0I0OiAweDkwOEYsXG4gICAgMHhFN0I1OiAweDkwQTgsXG4gICAgMHhFN0I2OiAweDkwQUYsXG4gICAgMHhFN0I3OiAweDkwQjEsXG4gICAgMHhFN0I4OiAweDkwQjUsXG4gICAgMHhFN0I5OiAweDkwRTIsXG4gICAgMHhFN0JBOiAweDkwRTQsXG4gICAgMHhFN0JCOiAweDYyNDgsXG4gICAgMHhFN0JDOiAweDkwREIsXG4gICAgMHhFN0JEOiAweDkxMDIsXG4gICAgMHhFN0JFOiAweDkxMTIsXG4gICAgMHhFN0JGOiAweDkxMTksXG4gICAgMHhFN0MwOiAweDkxMzIsXG4gICAgMHhFN0MxOiAweDkxMzAsXG4gICAgMHhFN0MyOiAweDkxNEEsXG4gICAgMHhFN0MzOiAweDkxNTYsXG4gICAgMHhFN0M0OiAweDkxNTgsXG4gICAgMHhFN0M1OiAweDkxNjMsXG4gICAgMHhFN0M2OiAweDkxNjUsXG4gICAgMHhFN0M3OiAweDkxNjksXG4gICAgMHhFN0M4OiAweDkxNzMsXG4gICAgMHhFN0M5OiAweDkxNzIsXG4gICAgMHhFN0NBOiAweDkxOEIsXG4gICAgMHhFN0NCOiAweDkxODksXG4gICAgMHhFN0NDOiAweDkxODIsXG4gICAgMHhFN0NEOiAweDkxQTIsXG4gICAgMHhFN0NFOiAweDkxQUIsXG4gICAgMHhFN0NGOiAweDkxQUYsXG4gICAgMHhFN0QwOiAweDkxQUEsXG4gICAgMHhFN0QxOiAweDkxQjUsXG4gICAgMHhFN0QyOiAweDkxQjQsXG4gICAgMHhFN0QzOiAweDkxQkEsXG4gICAgMHhFN0Q0OiAweDkxQzAsXG4gICAgMHhFN0Q1OiAweDkxQzEsXG4gICAgMHhFN0Q2OiAweDkxQzksXG4gICAgMHhFN0Q3OiAweDkxQ0IsXG4gICAgMHhFN0Q4OiAweDkxRDAsXG4gICAgMHhFN0Q5OiAweDkxRDYsXG4gICAgMHhFN0RBOiAweDkxREYsXG4gICAgMHhFN0RCOiAweDkxRTEsXG4gICAgMHhFN0RDOiAweDkxREIsXG4gICAgMHhFN0REOiAweDkxRkMsXG4gICAgMHhFN0RFOiAweDkxRjUsXG4gICAgMHhFN0RGOiAweDkxRjYsXG4gICAgMHhFN0UwOiAweDkyMUUsXG4gICAgMHhFN0UxOiAweDkxRkYsXG4gICAgMHhFN0UyOiAweDkyMTQsXG4gICAgMHhFN0UzOiAweDkyMkMsXG4gICAgMHhFN0U0OiAweDkyMTUsXG4gICAgMHhFN0U1OiAweDkyMTEsXG4gICAgMHhFN0U2OiAweDkyNUUsXG4gICAgMHhFN0U3OiAweDkyNTcsXG4gICAgMHhFN0U4OiAweDkyNDUsXG4gICAgMHhFN0U5OiAweDkyNDksXG4gICAgMHhFN0VBOiAweDkyNjQsXG4gICAgMHhFN0VCOiAweDkyNDgsXG4gICAgMHhFN0VDOiAweDkyOTUsXG4gICAgMHhFN0VEOiAweDkyM0YsXG4gICAgMHhFN0VFOiAweDkyNEIsXG4gICAgMHhFN0VGOiAweDkyNTAsXG4gICAgMHhFN0YwOiAweDkyOUMsXG4gICAgMHhFN0YxOiAweDkyOTYsXG4gICAgMHhFN0YyOiAweDkyOTMsXG4gICAgMHhFN0YzOiAweDkyOUIsXG4gICAgMHhFN0Y0OiAweDkyNUEsXG4gICAgMHhFN0Y1OiAweDkyQ0YsXG4gICAgMHhFN0Y2OiAweDkyQjksXG4gICAgMHhFN0Y3OiAweDkyQjcsXG4gICAgMHhFN0Y4OiAweDkyRTksXG4gICAgMHhFN0Y5OiAweDkzMEYsXG4gICAgMHhFN0ZBOiAweDkyRkEsXG4gICAgMHhFN0ZCOiAweDkzNDQsXG4gICAgMHhFN0ZDOiAweDkzMkUsXG4gICAgMHhFODQwOiAweDkzMTksXG4gICAgMHhFODQxOiAweDkzMjIsXG4gICAgMHhFODQyOiAweDkzMUEsXG4gICAgMHhFODQzOiAweDkzMjMsXG4gICAgMHhFODQ0OiAweDkzM0EsXG4gICAgMHhFODQ1OiAweDkzMzUsXG4gICAgMHhFODQ2OiAweDkzM0IsXG4gICAgMHhFODQ3OiAweDkzNUMsXG4gICAgMHhFODQ4OiAweDkzNjAsXG4gICAgMHhFODQ5OiAweDkzN0MsXG4gICAgMHhFODRBOiAweDkzNkUsXG4gICAgMHhFODRCOiAweDkzNTYsXG4gICAgMHhFODRDOiAweDkzQjAsXG4gICAgMHhFODREOiAweDkzQUMsXG4gICAgMHhFODRFOiAweDkzQUQsXG4gICAgMHhFODRGOiAweDkzOTQsXG4gICAgMHhFODUwOiAweDkzQjksXG4gICAgMHhFODUxOiAweDkzRDYsXG4gICAgMHhFODUyOiAweDkzRDcsXG4gICAgMHhFODUzOiAweDkzRTgsXG4gICAgMHhFODU0OiAweDkzRTUsXG4gICAgMHhFODU1OiAweDkzRDgsXG4gICAgMHhFODU2OiAweDkzQzMsXG4gICAgMHhFODU3OiAweDkzREQsXG4gICAgMHhFODU4OiAweDkzRDAsXG4gICAgMHhFODU5OiAweDkzQzgsXG4gICAgMHhFODVBOiAweDkzRTQsXG4gICAgMHhFODVCOiAweDk0MUEsXG4gICAgMHhFODVDOiAweDk0MTQsXG4gICAgMHhFODVEOiAweDk0MTMsXG4gICAgMHhFODVFOiAweDk0MDMsXG4gICAgMHhFODVGOiAweDk0MDcsXG4gICAgMHhFODYwOiAweDk0MTAsXG4gICAgMHhFODYxOiAweDk0MzYsXG4gICAgMHhFODYyOiAweDk0MkIsXG4gICAgMHhFODYzOiAweDk0MzUsXG4gICAgMHhFODY0OiAweDk0MjEsXG4gICAgMHhFODY1OiAweDk0M0EsXG4gICAgMHhFODY2OiAweDk0NDEsXG4gICAgMHhFODY3OiAweDk0NTIsXG4gICAgMHhFODY4OiAweDk0NDQsXG4gICAgMHhFODY5OiAweDk0NUIsXG4gICAgMHhFODZBOiAweDk0NjAsXG4gICAgMHhFODZCOiAweDk0NjIsXG4gICAgMHhFODZDOiAweDk0NUUsXG4gICAgMHhFODZEOiAweDk0NkEsXG4gICAgMHhFODZFOiAweDkyMjksXG4gICAgMHhFODZGOiAweDk0NzAsXG4gICAgMHhFODcwOiAweDk0NzUsXG4gICAgMHhFODcxOiAweDk0NzcsXG4gICAgMHhFODcyOiAweDk0N0QsXG4gICAgMHhFODczOiAweDk0NUEsXG4gICAgMHhFODc0OiAweDk0N0MsXG4gICAgMHhFODc1OiAweDk0N0UsXG4gICAgMHhFODc2OiAweDk0ODEsXG4gICAgMHhFODc3OiAweDk0N0YsXG4gICAgMHhFODc4OiAweDk1ODIsXG4gICAgMHhFODc5OiAweDk1ODcsXG4gICAgMHhFODdBOiAweDk1OEEsXG4gICAgMHhFODdCOiAweDk1OTQsXG4gICAgMHhFODdDOiAweDk1OTYsXG4gICAgMHhFODdEOiAweDk1OTgsXG4gICAgMHhFODdFOiAweDk1OTksXG4gICAgMHhFODgwOiAweDk1QTAsXG4gICAgMHhFODgxOiAweDk1QTgsXG4gICAgMHhFODgyOiAweDk1QTcsXG4gICAgMHhFODgzOiAweDk1QUQsXG4gICAgMHhFODg0OiAweDk1QkMsXG4gICAgMHhFODg1OiAweDk1QkIsXG4gICAgMHhFODg2OiAweDk1QjksXG4gICAgMHhFODg3OiAweDk1QkUsXG4gICAgMHhFODg4OiAweDk1Q0EsXG4gICAgMHhFODg5OiAweDZGRjYsXG4gICAgMHhFODhBOiAweDk1QzMsXG4gICAgMHhFODhCOiAweDk1Q0QsXG4gICAgMHhFODhDOiAweDk1Q0MsXG4gICAgMHhFODhEOiAweDk1RDUsXG4gICAgMHhFODhFOiAweDk1RDQsXG4gICAgMHhFODhGOiAweDk1RDYsXG4gICAgMHhFODkwOiAweDk1REMsXG4gICAgMHhFODkxOiAweDk1RTEsXG4gICAgMHhFODkyOiAweDk1RTUsXG4gICAgMHhFODkzOiAweDk1RTIsXG4gICAgMHhFODk0OiAweDk2MjEsXG4gICAgMHhFODk1OiAweDk2MjgsXG4gICAgMHhFODk2OiAweDk2MkUsXG4gICAgMHhFODk3OiAweDk2MkYsXG4gICAgMHhFODk4OiAweDk2NDIsXG4gICAgMHhFODk5OiAweDk2NEMsXG4gICAgMHhFODlBOiAweDk2NEYsXG4gICAgMHhFODlCOiAweDk2NEIsXG4gICAgMHhFODlDOiAweDk2NzcsXG4gICAgMHhFODlEOiAweDk2NUMsXG4gICAgMHhFODlFOiAweDk2NUUsXG4gICAgMHhFODlGOiAweDk2NUQsXG4gICAgMHhFOEEwOiAweDk2NUYsXG4gICAgMHhFOEExOiAweDk2NjYsXG4gICAgMHhFOEEyOiAweDk2NzIsXG4gICAgMHhFOEEzOiAweDk2NkMsXG4gICAgMHhFOEE0OiAweDk2OEQsXG4gICAgMHhFOEE1OiAweDk2OTgsXG4gICAgMHhFOEE2OiAweDk2OTUsXG4gICAgMHhFOEE3OiAweDk2OTcsXG4gICAgMHhFOEE4OiAweDk2QUEsXG4gICAgMHhFOEE5OiAweDk2QTcsXG4gICAgMHhFOEFBOiAweDk2QjEsXG4gICAgMHhFOEFCOiAweDk2QjIsXG4gICAgMHhFOEFDOiAweDk2QjAsXG4gICAgMHhFOEFEOiAweDk2QjQsXG4gICAgMHhFOEFFOiAweDk2QjYsXG4gICAgMHhFOEFGOiAweDk2QjgsXG4gICAgMHhFOEIwOiAweDk2QjksXG4gICAgMHhFOEIxOiAweDk2Q0UsXG4gICAgMHhFOEIyOiAweDk2Q0IsXG4gICAgMHhFOEIzOiAweDk2QzksXG4gICAgMHhFOEI0OiAweDk2Q0QsXG4gICAgMHhFOEI1OiAweDg5NEQsXG4gICAgMHhFOEI2OiAweDk2REMsXG4gICAgMHhFOEI3OiAweDk3MEQsXG4gICAgMHhFOEI4OiAweDk2RDUsXG4gICAgMHhFOEI5OiAweDk2RjksXG4gICAgMHhFOEJBOiAweDk3MDQsXG4gICAgMHhFOEJCOiAweDk3MDYsXG4gICAgMHhFOEJDOiAweDk3MDgsXG4gICAgMHhFOEJEOiAweDk3MTMsXG4gICAgMHhFOEJFOiAweDk3MEUsXG4gICAgMHhFOEJGOiAweDk3MTEsXG4gICAgMHhFOEMwOiAweDk3MEYsXG4gICAgMHhFOEMxOiAweDk3MTYsXG4gICAgMHhFOEMyOiAweDk3MTksXG4gICAgMHhFOEMzOiAweDk3MjQsXG4gICAgMHhFOEM0OiAweDk3MkEsXG4gICAgMHhFOEM1OiAweDk3MzAsXG4gICAgMHhFOEM2OiAweDk3MzksXG4gICAgMHhFOEM3OiAweDk3M0QsXG4gICAgMHhFOEM4OiAweDk3M0UsXG4gICAgMHhFOEM5OiAweDk3NDQsXG4gICAgMHhFOENBOiAweDk3NDYsXG4gICAgMHhFOENCOiAweDk3NDgsXG4gICAgMHhFOENDOiAweDk3NDIsXG4gICAgMHhFOENEOiAweDk3NDksXG4gICAgMHhFOENFOiAweDk3NUMsXG4gICAgMHhFOENGOiAweDk3NjAsXG4gICAgMHhFOEQwOiAweDk3NjQsXG4gICAgMHhFOEQxOiAweDk3NjYsXG4gICAgMHhFOEQyOiAweDk3NjgsXG4gICAgMHhFOEQzOiAweDUyRDIsXG4gICAgMHhFOEQ0OiAweDk3NkIsXG4gICAgMHhFOEQ1OiAweDk3NzEsXG4gICAgMHhFOEQ2OiAweDk3NzksXG4gICAgMHhFOEQ3OiAweDk3ODUsXG4gICAgMHhFOEQ4OiAweDk3N0MsXG4gICAgMHhFOEQ5OiAweDk3ODEsXG4gICAgMHhFOERBOiAweDk3N0EsXG4gICAgMHhFOERCOiAweDk3ODYsXG4gICAgMHhFOERDOiAweDk3OEIsXG4gICAgMHhFOEREOiAweDk3OEYsXG4gICAgMHhFOERFOiAweDk3OTAsXG4gICAgMHhFOERGOiAweDk3OUMsXG4gICAgMHhFOEUwOiAweDk3QTgsXG4gICAgMHhFOEUxOiAweDk3QTYsXG4gICAgMHhFOEUyOiAweDk3QTMsXG4gICAgMHhFOEUzOiAweDk3QjMsXG4gICAgMHhFOEU0OiAweDk3QjQsXG4gICAgMHhFOEU1OiAweDk3QzMsXG4gICAgMHhFOEU2OiAweDk3QzYsXG4gICAgMHhFOEU3OiAweDk3QzgsXG4gICAgMHhFOEU4OiAweDk3Q0IsXG4gICAgMHhFOEU5OiAweDk3REMsXG4gICAgMHhFOEVBOiAweDk3RUQsXG4gICAgMHhFOEVCOiAweDlGNEYsXG4gICAgMHhFOEVDOiAweDk3RjIsXG4gICAgMHhFOEVEOiAweDdBREYsXG4gICAgMHhFOEVFOiAweDk3RjYsXG4gICAgMHhFOEVGOiAweDk3RjUsXG4gICAgMHhFOEYwOiAweDk4MEYsXG4gICAgMHhFOEYxOiAweDk4MEMsXG4gICAgMHhFOEYyOiAweDk4MzgsXG4gICAgMHhFOEYzOiAweDk4MjQsXG4gICAgMHhFOEY0OiAweDk4MjEsXG4gICAgMHhFOEY1OiAweDk4MzcsXG4gICAgMHhFOEY2OiAweDk4M0QsXG4gICAgMHhFOEY3OiAweDk4NDYsXG4gICAgMHhFOEY4OiAweDk4NEYsXG4gICAgMHhFOEY5OiAweDk4NEIsXG4gICAgMHhFOEZBOiAweDk4NkIsXG4gICAgMHhFOEZCOiAweDk4NkYsXG4gICAgMHhFOEZDOiAweDk4NzAsXG4gICAgMHhFOTQwOiAweDk4NzEsXG4gICAgMHhFOTQxOiAweDk4NzQsXG4gICAgMHhFOTQyOiAweDk4NzMsXG4gICAgMHhFOTQzOiAweDk4QUEsXG4gICAgMHhFOTQ0OiAweDk4QUYsXG4gICAgMHhFOTQ1OiAweDk4QjEsXG4gICAgMHhFOTQ2OiAweDk4QjYsXG4gICAgMHhFOTQ3OiAweDk4QzQsXG4gICAgMHhFOTQ4OiAweDk4QzMsXG4gICAgMHhFOTQ5OiAweDk4QzYsXG4gICAgMHhFOTRBOiAweDk4RTksXG4gICAgMHhFOTRCOiAweDk4RUIsXG4gICAgMHhFOTRDOiAweDk5MDMsXG4gICAgMHhFOTREOiAweDk5MDksXG4gICAgMHhFOTRFOiAweDk5MTIsXG4gICAgMHhFOTRGOiAweDk5MTQsXG4gICAgMHhFOTUwOiAweDk5MTgsXG4gICAgMHhFOTUxOiAweDk5MjEsXG4gICAgMHhFOTUyOiAweDk5MUQsXG4gICAgMHhFOTUzOiAweDk5MUUsXG4gICAgMHhFOTU0OiAweDk5MjQsXG4gICAgMHhFOTU1OiAweDk5MjAsXG4gICAgMHhFOTU2OiAweDk5MkMsXG4gICAgMHhFOTU3OiAweDk5MkUsXG4gICAgMHhFOTU4OiAweDk5M0QsXG4gICAgMHhFOTU5OiAweDk5M0UsXG4gICAgMHhFOTVBOiAweDk5NDIsXG4gICAgMHhFOTVCOiAweDk5NDksXG4gICAgMHhFOTVDOiAweDk5NDUsXG4gICAgMHhFOTVEOiAweDk5NTAsXG4gICAgMHhFOTVFOiAweDk5NEIsXG4gICAgMHhFOTVGOiAweDk5NTEsXG4gICAgMHhFOTYwOiAweDk5NTIsXG4gICAgMHhFOTYxOiAweDk5NEMsXG4gICAgMHhFOTYyOiAweDk5NTUsXG4gICAgMHhFOTYzOiAweDk5OTcsXG4gICAgMHhFOTY0OiAweDk5OTgsXG4gICAgMHhFOTY1OiAweDk5QTUsXG4gICAgMHhFOTY2OiAweDk5QUQsXG4gICAgMHhFOTY3OiAweDk5QUUsXG4gICAgMHhFOTY4OiAweDk5QkMsXG4gICAgMHhFOTY5OiAweDk5REYsXG4gICAgMHhFOTZBOiAweDk5REIsXG4gICAgMHhFOTZCOiAweDk5REQsXG4gICAgMHhFOTZDOiAweDk5RDgsXG4gICAgMHhFOTZEOiAweDk5RDEsXG4gICAgMHhFOTZFOiAweDk5RUQsXG4gICAgMHhFOTZGOiAweDk5RUUsXG4gICAgMHhFOTcwOiAweDk5RjEsXG4gICAgMHhFOTcxOiAweDk5RjIsXG4gICAgMHhFOTcyOiAweDk5RkIsXG4gICAgMHhFOTczOiAweDk5RjgsXG4gICAgMHhFOTc0OiAweDlBMDEsXG4gICAgMHhFOTc1OiAweDlBMEYsXG4gICAgMHhFOTc2OiAweDlBMDUsXG4gICAgMHhFOTc3OiAweDk5RTIsXG4gICAgMHhFOTc4OiAweDlBMTksXG4gICAgMHhFOTc5OiAweDlBMkIsXG4gICAgMHhFOTdBOiAweDlBMzcsXG4gICAgMHhFOTdCOiAweDlBNDUsXG4gICAgMHhFOTdDOiAweDlBNDIsXG4gICAgMHhFOTdEOiAweDlBNDAsXG4gICAgMHhFOTdFOiAweDlBNDMsXG4gICAgMHhFOTgwOiAweDlBM0UsXG4gICAgMHhFOTgxOiAweDlBNTUsXG4gICAgMHhFOTgyOiAweDlBNEQsXG4gICAgMHhFOTgzOiAweDlBNUIsXG4gICAgMHhFOTg0OiAweDlBNTcsXG4gICAgMHhFOTg1OiAweDlBNUYsXG4gICAgMHhFOTg2OiAweDlBNjIsXG4gICAgMHhFOTg3OiAweDlBNjUsXG4gICAgMHhFOTg4OiAweDlBNjQsXG4gICAgMHhFOTg5OiAweDlBNjksXG4gICAgMHhFOThBOiAweDlBNkIsXG4gICAgMHhFOThCOiAweDlBNkEsXG4gICAgMHhFOThDOiAweDlBQUQsXG4gICAgMHhFOThEOiAweDlBQjAsXG4gICAgMHhFOThFOiAweDlBQkMsXG4gICAgMHhFOThGOiAweDlBQzAsXG4gICAgMHhFOTkwOiAweDlBQ0YsXG4gICAgMHhFOTkxOiAweDlBRDEsXG4gICAgMHhFOTkyOiAweDlBRDMsXG4gICAgMHhFOTkzOiAweDlBRDQsXG4gICAgMHhFOTk0OiAweDlBREUsXG4gICAgMHhFOTk1OiAweDlBREYsXG4gICAgMHhFOTk2OiAweDlBRTIsXG4gICAgMHhFOTk3OiAweDlBRTMsXG4gICAgMHhFOTk4OiAweDlBRTYsXG4gICAgMHhFOTk5OiAweDlBRUYsXG4gICAgMHhFOTlBOiAweDlBRUIsXG4gICAgMHhFOTlCOiAweDlBRUUsXG4gICAgMHhFOTlDOiAweDlBRjQsXG4gICAgMHhFOTlEOiAweDlBRjEsXG4gICAgMHhFOTlFOiAweDlBRjcsXG4gICAgMHhFOTlGOiAweDlBRkIsXG4gICAgMHhFOUEwOiAweDlCMDYsXG4gICAgMHhFOUExOiAweDlCMTgsXG4gICAgMHhFOUEyOiAweDlCMUEsXG4gICAgMHhFOUEzOiAweDlCMUYsXG4gICAgMHhFOUE0OiAweDlCMjIsXG4gICAgMHhFOUE1OiAweDlCMjMsXG4gICAgMHhFOUE2OiAweDlCMjUsXG4gICAgMHhFOUE3OiAweDlCMjcsXG4gICAgMHhFOUE4OiAweDlCMjgsXG4gICAgMHhFOUE5OiAweDlCMjksXG4gICAgMHhFOUFBOiAweDlCMkEsXG4gICAgMHhFOUFCOiAweDlCMkUsXG4gICAgMHhFOUFDOiAweDlCMkYsXG4gICAgMHhFOUFEOiAweDlCMzIsXG4gICAgMHhFOUFFOiAweDlCNDQsXG4gICAgMHhFOUFGOiAweDlCNDMsXG4gICAgMHhFOUIwOiAweDlCNEYsXG4gICAgMHhFOUIxOiAweDlCNEQsXG4gICAgMHhFOUIyOiAweDlCNEUsXG4gICAgMHhFOUIzOiAweDlCNTEsXG4gICAgMHhFOUI0OiAweDlCNTgsXG4gICAgMHhFOUI1OiAweDlCNzQsXG4gICAgMHhFOUI2OiAweDlCOTMsXG4gICAgMHhFOUI3OiAweDlCODMsXG4gICAgMHhFOUI4OiAweDlCOTEsXG4gICAgMHhFOUI5OiAweDlCOTYsXG4gICAgMHhFOUJBOiAweDlCOTcsXG4gICAgMHhFOUJCOiAweDlCOUYsXG4gICAgMHhFOUJDOiAweDlCQTAsXG4gICAgMHhFOUJEOiAweDlCQTgsXG4gICAgMHhFOUJFOiAweDlCQjQsXG4gICAgMHhFOUJGOiAweDlCQzAsXG4gICAgMHhFOUMwOiAweDlCQ0EsXG4gICAgMHhFOUMxOiAweDlCQjksXG4gICAgMHhFOUMyOiAweDlCQzYsXG4gICAgMHhFOUMzOiAweDlCQ0YsXG4gICAgMHhFOUM0OiAweDlCRDEsXG4gICAgMHhFOUM1OiAweDlCRDIsXG4gICAgMHhFOUM2OiAweDlCRTMsXG4gICAgMHhFOUM3OiAweDlCRTIsXG4gICAgMHhFOUM4OiAweDlCRTQsXG4gICAgMHhFOUM5OiAweDlCRDQsXG4gICAgMHhFOUNBOiAweDlCRTEsXG4gICAgMHhFOUNCOiAweDlDM0EsXG4gICAgMHhFOUNDOiAweDlCRjIsXG4gICAgMHhFOUNEOiAweDlCRjEsXG4gICAgMHhFOUNFOiAweDlCRjAsXG4gICAgMHhFOUNGOiAweDlDMTUsXG4gICAgMHhFOUQwOiAweDlDMTQsXG4gICAgMHhFOUQxOiAweDlDMDksXG4gICAgMHhFOUQyOiAweDlDMTMsXG4gICAgMHhFOUQzOiAweDlDMEMsXG4gICAgMHhFOUQ0OiAweDlDMDYsXG4gICAgMHhFOUQ1OiAweDlDMDgsXG4gICAgMHhFOUQ2OiAweDlDMTIsXG4gICAgMHhFOUQ3OiAweDlDMEEsXG4gICAgMHhFOUQ4OiAweDlDMDQsXG4gICAgMHhFOUQ5OiAweDlDMkUsXG4gICAgMHhFOURBOiAweDlDMUIsXG4gICAgMHhFOURCOiAweDlDMjUsXG4gICAgMHhFOURDOiAweDlDMjQsXG4gICAgMHhFOUREOiAweDlDMjEsXG4gICAgMHhFOURFOiAweDlDMzAsXG4gICAgMHhFOURGOiAweDlDNDcsXG4gICAgMHhFOUUwOiAweDlDMzIsXG4gICAgMHhFOUUxOiAweDlDNDYsXG4gICAgMHhFOUUyOiAweDlDM0UsXG4gICAgMHhFOUUzOiAweDlDNUEsXG4gICAgMHhFOUU0OiAweDlDNjAsXG4gICAgMHhFOUU1OiAweDlDNjcsXG4gICAgMHhFOUU2OiAweDlDNzYsXG4gICAgMHhFOUU3OiAweDlDNzgsXG4gICAgMHhFOUU4OiAweDlDRTcsXG4gICAgMHhFOUU5OiAweDlDRUMsXG4gICAgMHhFOUVBOiAweDlDRjAsXG4gICAgMHhFOUVCOiAweDlEMDksXG4gICAgMHhFOUVDOiAweDlEMDgsXG4gICAgMHhFOUVEOiAweDlDRUIsXG4gICAgMHhFOUVFOiAweDlEMDMsXG4gICAgMHhFOUVGOiAweDlEMDYsXG4gICAgMHhFOUYwOiAweDlEMkEsXG4gICAgMHhFOUYxOiAweDlEMjYsXG4gICAgMHhFOUYyOiAweDlEQUYsXG4gICAgMHhFOUYzOiAweDlEMjMsXG4gICAgMHhFOUY0OiAweDlEMUYsXG4gICAgMHhFOUY1OiAweDlENDQsXG4gICAgMHhFOUY2OiAweDlEMTUsXG4gICAgMHhFOUY3OiAweDlEMTIsXG4gICAgMHhFOUY4OiAweDlENDEsXG4gICAgMHhFOUY5OiAweDlEM0YsXG4gICAgMHhFOUZBOiAweDlEM0UsXG4gICAgMHhFOUZCOiAweDlENDYsXG4gICAgMHhFOUZDOiAweDlENDgsXG4gICAgMHhFQTQwOiAweDlENUQsXG4gICAgMHhFQTQxOiAweDlENUUsXG4gICAgMHhFQTQyOiAweDlENjQsXG4gICAgMHhFQTQzOiAweDlENTEsXG4gICAgMHhFQTQ0OiAweDlENTAsXG4gICAgMHhFQTQ1OiAweDlENTksXG4gICAgMHhFQTQ2OiAweDlENzIsXG4gICAgMHhFQTQ3OiAweDlEODksXG4gICAgMHhFQTQ4OiAweDlEODcsXG4gICAgMHhFQTQ5OiAweDlEQUIsXG4gICAgMHhFQTRBOiAweDlENkYsXG4gICAgMHhFQTRCOiAweDlEN0EsXG4gICAgMHhFQTRDOiAweDlEOUEsXG4gICAgMHhFQTREOiAweDlEQTQsXG4gICAgMHhFQTRFOiAweDlEQTksXG4gICAgMHhFQTRGOiAweDlEQjIsXG4gICAgMHhFQTUwOiAweDlEQzQsXG4gICAgMHhFQTUxOiAweDlEQzEsXG4gICAgMHhFQTUyOiAweDlEQkIsXG4gICAgMHhFQTUzOiAweDlEQjgsXG4gICAgMHhFQTU0OiAweDlEQkEsXG4gICAgMHhFQTU1OiAweDlEQzYsXG4gICAgMHhFQTU2OiAweDlEQ0YsXG4gICAgMHhFQTU3OiAweDlEQzIsXG4gICAgMHhFQTU4OiAweDlERDksXG4gICAgMHhFQTU5OiAweDlERDMsXG4gICAgMHhFQTVBOiAweDlERjgsXG4gICAgMHhFQTVCOiAweDlERTYsXG4gICAgMHhFQTVDOiAweDlERUQsXG4gICAgMHhFQTVEOiAweDlERUYsXG4gICAgMHhFQTVFOiAweDlERkQsXG4gICAgMHhFQTVGOiAweDlFMUEsXG4gICAgMHhFQTYwOiAweDlFMUIsXG4gICAgMHhFQTYxOiAweDlFMUUsXG4gICAgMHhFQTYyOiAweDlFNzUsXG4gICAgMHhFQTYzOiAweDlFNzksXG4gICAgMHhFQTY0OiAweDlFN0QsXG4gICAgMHhFQTY1OiAweDlFODEsXG4gICAgMHhFQTY2OiAweDlFODgsXG4gICAgMHhFQTY3OiAweDlFOEIsXG4gICAgMHhFQTY4OiAweDlFOEMsXG4gICAgMHhFQTY5OiAweDlFOTIsXG4gICAgMHhFQTZBOiAweDlFOTUsXG4gICAgMHhFQTZCOiAweDlFOTEsXG4gICAgMHhFQTZDOiAweDlFOUQsXG4gICAgMHhFQTZEOiAweDlFQTUsXG4gICAgMHhFQTZFOiAweDlFQTksXG4gICAgMHhFQTZGOiAweDlFQjgsXG4gICAgMHhFQTcwOiAweDlFQUEsXG4gICAgMHhFQTcxOiAweDlFQUQsXG4gICAgMHhFQTcyOiAweDk3NjEsXG4gICAgMHhFQTczOiAweDlFQ0MsXG4gICAgMHhFQTc0OiAweDlFQ0UsXG4gICAgMHhFQTc1OiAweDlFQ0YsXG4gICAgMHhFQTc2OiAweDlFRDAsXG4gICAgMHhFQTc3OiAweDlFRDQsXG4gICAgMHhFQTc4OiAweDlFREMsXG4gICAgMHhFQTc5OiAweDlFREUsXG4gICAgMHhFQTdBOiAweDlFREQsXG4gICAgMHhFQTdCOiAweDlFRTAsXG4gICAgMHhFQTdDOiAweDlFRTUsXG4gICAgMHhFQTdEOiAweDlFRTgsXG4gICAgMHhFQTdFOiAweDlFRUYsXG4gICAgMHhFQTgwOiAweDlFRjQsXG4gICAgMHhFQTgxOiAweDlFRjYsXG4gICAgMHhFQTgyOiAweDlFRjcsXG4gICAgMHhFQTgzOiAweDlFRjksXG4gICAgMHhFQTg0OiAweDlFRkIsXG4gICAgMHhFQTg1OiAweDlFRkMsXG4gICAgMHhFQTg2OiAweDlFRkQsXG4gICAgMHhFQTg3OiAweDlGMDcsXG4gICAgMHhFQTg4OiAweDlGMDgsXG4gICAgMHhFQTg5OiAweDc2QjcsXG4gICAgMHhFQThBOiAweDlGMTUsXG4gICAgMHhFQThCOiAweDlGMjEsXG4gICAgMHhFQThDOiAweDlGMkMsXG4gICAgMHhFQThEOiAweDlGM0UsXG4gICAgMHhFQThFOiAweDlGNEEsXG4gICAgMHhFQThGOiAweDlGNTIsXG4gICAgMHhFQTkwOiAweDlGNTQsXG4gICAgMHhFQTkxOiAweDlGNjMsXG4gICAgMHhFQTkyOiAweDlGNUYsXG4gICAgMHhFQTkzOiAweDlGNjAsXG4gICAgMHhFQTk0OiAweDlGNjEsXG4gICAgMHhFQTk1OiAweDlGNjYsXG4gICAgMHhFQTk2OiAweDlGNjcsXG4gICAgMHhFQTk3OiAweDlGNkMsXG4gICAgMHhFQTk4OiAweDlGNkEsXG4gICAgMHhFQTk5OiAweDlGNzcsXG4gICAgMHhFQTlBOiAweDlGNzIsXG4gICAgMHhFQTlCOiAweDlGNzYsXG4gICAgMHhFQTlDOiAweDlGOTUsXG4gICAgMHhFQTlEOiAweDlGOUMsXG4gICAgMHhFQTlFOiAweDlGQTAsXG4gICAgMHhFQTlGOiAweDU4MkYsXG4gICAgMHhFQUEwOiAweDY5QzcsXG4gICAgMHhFQUExOiAweDkwNTksXG4gICAgMHhFQUEyOiAweDc0NjQsXG4gICAgMHhFQUEzOiAweDUxREMsXG4gICAgMHhFQUE0OiAweDcxOTksXG59O1xuXG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdlbmVyaWNHRl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcbnZhciBHZW5lcmljR0ZQb2x5XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuZnVuY3Rpb24gcnVuRXVjbGlkZWFuQWxnb3JpdGhtKGZpZWxkLCBhLCBiLCBSKSB7XG4gICAgLy8gQXNzdW1lIGEncyBkZWdyZWUgaXMgPj0gYidzXG4gICAgaWYgKGEuZGVncmVlKCkgPCBiLmRlZ3JlZSgpKSB7XG4gICAgICAgIF9hID0gW2IsIGFdLCBhID0gX2FbMF0sIGIgPSBfYVsxXTtcbiAgICB9XG4gICAgdmFyIHJMYXN0ID0gYTtcbiAgICB2YXIgciA9IGI7XG4gICAgdmFyIHRMYXN0ID0gZmllbGQuemVybztcbiAgICB2YXIgdCA9IGZpZWxkLm9uZTtcbiAgICAvLyBSdW4gRXVjbGlkZWFuIGFsZ29yaXRobSB1bnRpbCByJ3MgZGVncmVlIGlzIGxlc3MgdGhhbiBSLzJcbiAgICB3aGlsZSAoci5kZWdyZWUoKSA+PSBSIC8gMikge1xuICAgICAgICB2YXIgckxhc3RMYXN0ID0gckxhc3Q7XG4gICAgICAgIHZhciB0TGFzdExhc3QgPSB0TGFzdDtcbiAgICAgICAgckxhc3QgPSByO1xuICAgICAgICB0TGFzdCA9IHQ7XG4gICAgICAgIC8vIERpdmlkZSByTGFzdExhc3QgYnkgckxhc3QsIHdpdGggcXVvdGllbnQgaW4gcSBhbmQgcmVtYWluZGVyIGluIHJcbiAgICAgICAgaWYgKHJMYXN0LmlzWmVybygpKSB7XG4gICAgICAgICAgICAvLyBFdWNsaWRlYW4gYWxnb3JpdGhtIGFscmVhZHkgdGVybWluYXRlZD9cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHIgPSByTGFzdExhc3Q7XG4gICAgICAgIHZhciBxID0gZmllbGQuemVybztcbiAgICAgICAgdmFyIGRlbm9taW5hdG9yTGVhZGluZ1Rlcm0gPSByTGFzdC5nZXRDb2VmZmljaWVudChyTGFzdC5kZWdyZWUoKSk7XG4gICAgICAgIHZhciBkbHRJbnZlcnNlID0gZmllbGQuaW52ZXJzZShkZW5vbWluYXRvckxlYWRpbmdUZXJtKTtcbiAgICAgICAgd2hpbGUgKHIuZGVncmVlKCkgPj0gckxhc3QuZGVncmVlKCkgJiYgIXIuaXNaZXJvKCkpIHtcbiAgICAgICAgICAgIHZhciBkZWdyZWVEaWZmID0gci5kZWdyZWUoKSAtIHJMYXN0LmRlZ3JlZSgpO1xuICAgICAgICAgICAgdmFyIHNjYWxlID0gZmllbGQubXVsdGlwbHkoci5nZXRDb2VmZmljaWVudChyLmRlZ3JlZSgpKSwgZGx0SW52ZXJzZSk7XG4gICAgICAgICAgICBxID0gcS5hZGRPclN1YnRyYWN0KGZpZWxkLmJ1aWxkTW9ub21pYWwoZGVncmVlRGlmZiwgc2NhbGUpKTtcbiAgICAgICAgICAgIHIgPSByLmFkZE9yU3VidHJhY3Qockxhc3QubXVsdGlwbHlCeU1vbm9taWFsKGRlZ3JlZURpZmYsIHNjYWxlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdCA9IHEubXVsdGlwbHlQb2x5KHRMYXN0KS5hZGRPclN1YnRyYWN0KHRMYXN0TGFzdCk7XG4gICAgICAgIGlmIChyLmRlZ3JlZSgpID49IHJMYXN0LmRlZ3JlZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgc2lnbWFUaWxkZUF0WmVybyA9IHQuZ2V0Q29lZmZpY2llbnQoMCk7XG4gICAgaWYgKHNpZ21hVGlsZGVBdFplcm8gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBpbnZlcnNlID0gZmllbGQuaW52ZXJzZShzaWdtYVRpbGRlQXRaZXJvKTtcbiAgICByZXR1cm4gW3QubXVsdGlwbHkoaW52ZXJzZSksIHIubXVsdGlwbHkoaW52ZXJzZSldO1xuICAgIHZhciBfYTtcbn1cbmZ1bmN0aW9uIGZpbmRFcnJvckxvY2F0aW9ucyhmaWVsZCwgZXJyb3JMb2NhdG9yKSB7XG4gICAgLy8gVGhpcyBpcyBhIGRpcmVjdCBhcHBsaWNhdGlvbiBvZiBDaGllbidzIHNlYXJjaFxuICAgIHZhciBudW1FcnJvcnMgPSBlcnJvckxvY2F0b3IuZGVncmVlKCk7XG4gICAgaWYgKG51bUVycm9ycyA9PT0gMSkge1xuICAgICAgICByZXR1cm4gW2Vycm9yTG9jYXRvci5nZXRDb2VmZmljaWVudCgxKV07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobnVtRXJyb3JzKTtcbiAgICB2YXIgZXJyb3JDb3VudCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBmaWVsZC5zaXplICYmIGVycm9yQ291bnQgPCBudW1FcnJvcnM7IGkrKykge1xuICAgICAgICBpZiAoZXJyb3JMb2NhdG9yLmV2YWx1YXRlQXQoaSkgPT09IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFtlcnJvckNvdW50XSA9IGZpZWxkLmludmVyc2UoaSk7XG4gICAgICAgICAgICBlcnJvckNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVycm9yQ291bnQgIT09IG51bUVycm9ycykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGZpbmRFcnJvck1hZ25pdHVkZXMoZmllbGQsIGVycm9yRXZhbHVhdG9yLCBlcnJvckxvY2F0aW9ucykge1xuICAgIC8vIFRoaXMgaXMgZGlyZWN0bHkgYXBwbHlpbmcgRm9ybmV5J3MgRm9ybXVsYVxuICAgIHZhciBzID0gZXJyb3JMb2NhdGlvbnMubGVuZ3RoO1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkocyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcbiAgICAgICAgdmFyIHhpSW52ZXJzZSA9IGZpZWxkLmludmVyc2UoZXJyb3JMb2NhdGlvbnNbaV0pO1xuICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAxO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHM7IGorKykge1xuICAgICAgICAgICAgaWYgKGkgIT09IGopIHtcbiAgICAgICAgICAgICAgICBkZW5vbWluYXRvciA9IGZpZWxkLm11bHRpcGx5KGRlbm9taW5hdG9yLCBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0YoMSwgZmllbGQubXVsdGlwbHkoZXJyb3JMb2NhdGlvbnNbal0sIHhpSW52ZXJzZSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbaV0gPSBmaWVsZC5tdWx0aXBseShlcnJvckV2YWx1YXRvci5ldmFsdWF0ZUF0KHhpSW52ZXJzZSksIGZpZWxkLmludmVyc2UoZGVub21pbmF0b3IpKTtcbiAgICAgICAgaWYgKGZpZWxkLmdlbmVyYXRvckJhc2UgIT09IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IGZpZWxkLm11bHRpcGx5KHJlc3VsdFtpXSwgeGlJbnZlcnNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZGVjb2RlKGJ5dGVzLCB0d29TKSB7XG4gICAgdmFyIG91dHB1dEJ5dGVzID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGJ5dGVzLmxlbmd0aCk7XG4gICAgb3V0cHV0Qnl0ZXMuc2V0KGJ5dGVzKTtcbiAgICB2YXIgZmllbGQgPSBuZXcgR2VuZXJpY0dGXzEuZGVmYXVsdCgweDAxMUQsIDI1NiwgMCk7IC8vIHheOCArIHheNCArIHheMyArIHheMiArIDFcbiAgICB2YXIgcG9seSA9IG5ldyBHZW5lcmljR0ZQb2x5XzEuZGVmYXVsdChmaWVsZCwgb3V0cHV0Qnl0ZXMpO1xuICAgIHZhciBzeW5kcm9tZUNvZWZmaWNpZW50cyA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0d29TKTtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBzID0gMDsgcyA8IHR3b1M7IHMrKykge1xuICAgICAgICB2YXIgZXZhbHVhdGlvbiA9IHBvbHkuZXZhbHVhdGVBdChmaWVsZC5leHAocyArIGZpZWxkLmdlbmVyYXRvckJhc2UpKTtcbiAgICAgICAgc3luZHJvbWVDb2VmZmljaWVudHNbc3luZHJvbWVDb2VmZmljaWVudHMubGVuZ3RoIC0gMSAtIHNdID0gZXZhbHVhdGlvbjtcbiAgICAgICAgaWYgKGV2YWx1YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRCeXRlcztcbiAgICB9XG4gICAgdmFyIHN5bmRyb21lID0gbmV3IEdlbmVyaWNHRlBvbHlfMS5kZWZhdWx0KGZpZWxkLCBzeW5kcm9tZUNvZWZmaWNpZW50cyk7XG4gICAgdmFyIHNpZ21hT21lZ2EgPSBydW5FdWNsaWRlYW5BbGdvcml0aG0oZmllbGQsIGZpZWxkLmJ1aWxkTW9ub21pYWwodHdvUywgMSksIHN5bmRyb21lLCB0d29TKTtcbiAgICBpZiAoc2lnbWFPbWVnYSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGVycm9yTG9jYXRpb25zID0gZmluZEVycm9yTG9jYXRpb25zKGZpZWxkLCBzaWdtYU9tZWdhWzBdKTtcbiAgICBpZiAoZXJyb3JMb2NhdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGVycm9yTWFnbml0dWRlcyA9IGZpbmRFcnJvck1hZ25pdHVkZXMoZmllbGQsIHNpZ21hT21lZ2FbMV0sIGVycm9yTG9jYXRpb25zKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yTG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG91dHB1dEJ5dGVzLmxlbmd0aCAtIDEgLSBmaWVsZC5sb2coZXJyb3JMb2NhdGlvbnNbaV0pO1xuICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRCeXRlc1twb3NpdGlvbl0gPSBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0Yob3V0cHV0Qnl0ZXNbcG9zaXRpb25dLCBlcnJvck1hZ25pdHVkZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0Qnl0ZXM7XG59XG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcblxuXG4vKioqLyB9KSxcbi8qIDEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZFUlNJT05TID0gW1xuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IG51bGwsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDEsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogNyxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxMyxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEzIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxNyxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDkgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogbnVsbCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMixcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAxOF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDEwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMzQgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjggfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogbnVsbCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMyxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyMl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE1LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNTUgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDQgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTMgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogbnVsbCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogNCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODAgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMzIgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiBudWxsLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiA1LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMDggfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDMgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjIsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTEgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IG51bGwsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDYsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzRdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDY4IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI3IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MDdDOTQsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDcsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjIsIDM4XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA3OCB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMTgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzMSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMTgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgwODVCQyxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogOCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNCwgNDJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDk3IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyMixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzOCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzOSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE4IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MDlBOTksXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDksXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjYsIDQ2XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTYgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDM2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDM3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgwQTREMyxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMTAsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjgsIDUwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMTgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNjggfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNjkgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIwIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MEJCRjYsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDExLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1NF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODEgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDUwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDUxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgwQzc2MixcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMTIsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzIsIDU4XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyMixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzNiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzNyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MEQ4NDcsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDEzLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDM0LCA2Ml0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTA3IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyMixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzNyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzOCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjIsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDBFNjBELFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAxNCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNDYsIDY2XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEzIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDBGOTI4LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAxNSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNDgsIDcwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjIsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEzIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDEwQjc4LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAxNixcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNTAsIDc0XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTggfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTkgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxOSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgxMTQ1RCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMTcsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzAsIDU0LCA3OF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEwNyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMDggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTJBMTcsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDE4LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1NiwgODJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDMgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDQgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTM1MzIsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDE5LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1OCwgODZdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTMgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE0IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIxIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTMgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE0IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDE0OUE2LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyMCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzNCwgNjIsIDkwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTA3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEwOCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQxIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTU2ODMsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDIxLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI4LCA1MCwgNzIsIDk0XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDE3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQyIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTY4QzksXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDIyLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI2LCA1MCwgNzQsIDk4XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTExIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExMiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDE3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ2IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAzNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDE3N0VDLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyMyxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTQsIDc0LCAxMDJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjEgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MThFQzQsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDI0LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI4LCA1NCwgODAsIDEwNl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMwLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDE5MUUxLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyNSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMiwgNTgsIDg0LCAxMTBdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTA3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDgsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgxQUZBQixcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMjYsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzAsIDU4LCA4NiwgMTE0XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEwLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjgsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MUIwOEUsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDI3LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDM0LCA2MiwgOTAsIDExOF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFDQzFBLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyOCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNTAsIDc0LCA5OCwgMTIyXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFEMzNGLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyOSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFFRDc1LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAzMCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNTIsIDc4LCAxMDQsIDEzMF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0OCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFGMjUwLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAzMSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyMDlENSxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzIsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTUgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDM1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyMTZGMCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzMsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0NiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyMjhCQSxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzQsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzQsIDYyLCA5MCwgMTE4LCAxNDZdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MjM3OUYsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDM1LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1NCwgNzgsIDEwMiwgMTI2LCAxNTBdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIxIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyMiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyNEIwQixcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzYsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjQsIDUwLCA3NiwgMTAyLCAxMjgsIDE1NF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyMSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDM0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQ2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2NCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyNTQyRSxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzcsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIzIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0OSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQ2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDI2QTY0LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAzOCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMiwgNTgsIDg0LCAxMTAsIDEzNiwgMTYyXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIyIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQ4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4Mjc1NDEsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDM5LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI2LCA1NCwgODIsIDExMCwgMTM4LCAxNjZdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExOCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0OCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDY3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDI4QzY5LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiA0MCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0MiwgMTcwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExOCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTkgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTgsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDM0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNjEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcblxuXG4vKioqLyB9KSxcbi8qIDExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQml0TWF0cml4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuZnVuY3Rpb24gc3F1YXJlVG9RdWFkcmlsYXRlcmFsKHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgdmFyIGR4MyA9IHAxLnggLSBwMi54ICsgcDMueCAtIHA0Lng7XG4gICAgdmFyIGR5MyA9IHAxLnkgLSBwMi55ICsgcDMueSAtIHA0Lnk7XG4gICAgaWYgKGR4MyA9PT0gMCAmJiBkeTMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGExMTogcDIueCAtIHAxLngsXG4gICAgICAgICAgICBhMTI6IHAyLnkgLSBwMS55LFxuICAgICAgICAgICAgYTEzOiAwLFxuICAgICAgICAgICAgYTIxOiBwMy54IC0gcDIueCxcbiAgICAgICAgICAgIGEyMjogcDMueSAtIHAyLnksXG4gICAgICAgICAgICBhMjM6IDAsXG4gICAgICAgICAgICBhMzE6IHAxLngsXG4gICAgICAgICAgICBhMzI6IHAxLnksXG4gICAgICAgICAgICBhMzM6IDEsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZHgxID0gcDIueCAtIHAzLng7XG4gICAgICAgIHZhciBkeDIgPSBwNC54IC0gcDMueDtcbiAgICAgICAgdmFyIGR5MSA9IHAyLnkgLSBwMy55O1xuICAgICAgICB2YXIgZHkyID0gcDQueSAtIHAzLnk7XG4gICAgICAgIHZhciBkZW5vbWluYXRvciA9IGR4MSAqIGR5MiAtIGR4MiAqIGR5MTtcbiAgICAgICAgdmFyIGExMyA9IChkeDMgKiBkeTIgLSBkeDIgKiBkeTMpIC8gZGVub21pbmF0b3I7XG4gICAgICAgIHZhciBhMjMgPSAoZHgxICogZHkzIC0gZHgzICogZHkxKSAvIGRlbm9taW5hdG9yO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYTExOiBwMi54IC0gcDEueCArIGExMyAqIHAyLngsXG4gICAgICAgICAgICBhMTI6IHAyLnkgLSBwMS55ICsgYTEzICogcDIueSxcbiAgICAgICAgICAgIGExMzogYTEzLFxuICAgICAgICAgICAgYTIxOiBwNC54IC0gcDEueCArIGEyMyAqIHA0LngsXG4gICAgICAgICAgICBhMjI6IHA0LnkgLSBwMS55ICsgYTIzICogcDQueSxcbiAgICAgICAgICAgIGEyMzogYTIzLFxuICAgICAgICAgICAgYTMxOiBwMS54LFxuICAgICAgICAgICAgYTMyOiBwMS55LFxuICAgICAgICAgICAgYTMzOiAxLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHF1YWRyaWxhdGVyYWxUb1NxdWFyZShwMSwgcDIsIHAzLCBwNCkge1xuICAgIC8vIEhlcmUsIHRoZSBhZGpvaW50IHNlcnZlcyBhcyB0aGUgaW52ZXJzZTpcbiAgICB2YXIgc1RvUSA9IHNxdWFyZVRvUXVhZHJpbGF0ZXJhbChwMSwgcDIsIHAzLCBwNCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYTExOiBzVG9RLmEyMiAqIHNUb1EuYTMzIC0gc1RvUS5hMjMgKiBzVG9RLmEzMixcbiAgICAgICAgYTEyOiBzVG9RLmExMyAqIHNUb1EuYTMyIC0gc1RvUS5hMTIgKiBzVG9RLmEzMyxcbiAgICAgICAgYTEzOiBzVG9RLmExMiAqIHNUb1EuYTIzIC0gc1RvUS5hMTMgKiBzVG9RLmEyMixcbiAgICAgICAgYTIxOiBzVG9RLmEyMyAqIHNUb1EuYTMxIC0gc1RvUS5hMjEgKiBzVG9RLmEzMyxcbiAgICAgICAgYTIyOiBzVG9RLmExMSAqIHNUb1EuYTMzIC0gc1RvUS5hMTMgKiBzVG9RLmEzMSxcbiAgICAgICAgYTIzOiBzVG9RLmExMyAqIHNUb1EuYTIxIC0gc1RvUS5hMTEgKiBzVG9RLmEyMyxcbiAgICAgICAgYTMxOiBzVG9RLmEyMSAqIHNUb1EuYTMyIC0gc1RvUS5hMjIgKiBzVG9RLmEzMSxcbiAgICAgICAgYTMyOiBzVG9RLmExMiAqIHNUb1EuYTMxIC0gc1RvUS5hMTEgKiBzVG9RLmEzMixcbiAgICAgICAgYTMzOiBzVG9RLmExMSAqIHNUb1EuYTIyIC0gc1RvUS5hMTIgKiBzVG9RLmEyMSxcbiAgICB9O1xufVxuZnVuY3Rpb24gdGltZXMoYSwgYikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGExMTogYS5hMTEgKiBiLmExMSArIGEuYTIxICogYi5hMTIgKyBhLmEzMSAqIGIuYTEzLFxuICAgICAgICBhMTI6IGEuYTEyICogYi5hMTEgKyBhLmEyMiAqIGIuYTEyICsgYS5hMzIgKiBiLmExMyxcbiAgICAgICAgYTEzOiBhLmExMyAqIGIuYTExICsgYS5hMjMgKiBiLmExMiArIGEuYTMzICogYi5hMTMsXG4gICAgICAgIGEyMTogYS5hMTEgKiBiLmEyMSArIGEuYTIxICogYi5hMjIgKyBhLmEzMSAqIGIuYTIzLFxuICAgICAgICBhMjI6IGEuYTEyICogYi5hMjEgKyBhLmEyMiAqIGIuYTIyICsgYS5hMzIgKiBiLmEyMyxcbiAgICAgICAgYTIzOiBhLmExMyAqIGIuYTIxICsgYS5hMjMgKiBiLmEyMiArIGEuYTMzICogYi5hMjMsXG4gICAgICAgIGEzMTogYS5hMTEgKiBiLmEzMSArIGEuYTIxICogYi5hMzIgKyBhLmEzMSAqIGIuYTMzLFxuICAgICAgICBhMzI6IGEuYTEyICogYi5hMzEgKyBhLmEyMiAqIGIuYTMyICsgYS5hMzIgKiBiLmEzMyxcbiAgICAgICAgYTMzOiBhLmExMyAqIGIuYTMxICsgYS5hMjMgKiBiLmEzMiArIGEuYTMzICogYi5hMzMsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGV4dHJhY3QoaW1hZ2UsIGxvY2F0aW9uKSB7XG4gICAgdmFyIHFUb1MgPSBxdWFkcmlsYXRlcmFsVG9TcXVhcmUoeyB4OiAzLjUsIHk6IDMuNSB9LCB7IHg6IGxvY2F0aW9uLmRpbWVuc2lvbiAtIDMuNSwgeTogMy41IH0sIHsgeDogbG9jYXRpb24uZGltZW5zaW9uIC0gNi41LCB5OiBsb2NhdGlvbi5kaW1lbnNpb24gLSA2LjUgfSwgeyB4OiAzLjUsIHk6IGxvY2F0aW9uLmRpbWVuc2lvbiAtIDMuNSB9KTtcbiAgICB2YXIgc1RvUSA9IHNxdWFyZVRvUXVhZHJpbGF0ZXJhbChsb2NhdGlvbi50b3BMZWZ0LCBsb2NhdGlvbi50b3BSaWdodCwgbG9jYXRpb24uYWxpZ25tZW50UGF0dGVybiwgbG9jYXRpb24uYm90dG9tTGVmdCk7XG4gICAgdmFyIHRyYW5zZm9ybSA9IHRpbWVzKHNUb1EsIHFUb1MpO1xuICAgIHZhciBtYXRyaXggPSBCaXRNYXRyaXhfMS5CaXRNYXRyaXguY3JlYXRlRW1wdHkobG9jYXRpb24uZGltZW5zaW9uLCBsb2NhdGlvbi5kaW1lbnNpb24pO1xuICAgIHZhciBtYXBwaW5nRnVuY3Rpb24gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB2YXIgZGVub21pbmF0b3IgPSB0cmFuc2Zvcm0uYTEzICogeCArIHRyYW5zZm9ybS5hMjMgKiB5ICsgdHJhbnNmb3JtLmEzMztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6ICh0cmFuc2Zvcm0uYTExICogeCArIHRyYW5zZm9ybS5hMjEgKiB5ICsgdHJhbnNmb3JtLmEzMSkgLyBkZW5vbWluYXRvcixcbiAgICAgICAgICAgIHk6ICh0cmFuc2Zvcm0uYTEyICogeCArIHRyYW5zZm9ybS5hMjIgKiB5ICsgdHJhbnNmb3JtLmEzMikgLyBkZW5vbWluYXRvcixcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgbG9jYXRpb24uZGltZW5zaW9uOyB5KyspIHtcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBsb2NhdGlvbi5kaW1lbnNpb247IHgrKykge1xuICAgICAgICAgICAgdmFyIHhWYWx1ZSA9IHggKyAwLjU7XG4gICAgICAgICAgICB2YXIgeVZhbHVlID0geSArIDAuNTtcbiAgICAgICAgICAgIHZhciBzb3VyY2VQaXhlbCA9IG1hcHBpbmdGdW5jdGlvbih4VmFsdWUsIHlWYWx1ZSk7XG4gICAgICAgICAgICBtYXRyaXguc2V0KHgsIHksIGltYWdlLmdldChNYXRoLmZsb29yKHNvdXJjZVBpeGVsLngpLCBNYXRoLmZsb29yKHNvdXJjZVBpeGVsLnkpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWF0cml4OiBtYXRyaXgsXG4gICAgICAgIG1hcHBpbmdGdW5jdGlvbjogbWFwcGluZ0Z1bmN0aW9uLFxuICAgIH07XG59XG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuXG5cbi8qKiovIH0pLFxuLyogMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNQVhfRklOREVSUEFUVEVSTlNfVE9fU0VBUkNIID0gNDtcbnZhciBNSU5fUVVBRF9SQVRJTyA9IDAuNTtcbnZhciBNQVhfUVVBRF9SQVRJTyA9IDEuNTtcbnZhciBkaXN0YW5jZSA9IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coKGIueCAtIGEueCksIDIpICsgTWF0aC5wb3coKGIueSAtIGEueSksIDIpKTsgfTtcbmZ1bmN0aW9uIHN1bSh2YWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWVzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pO1xufVxuLy8gVGFrZXMgdGhyZWUgZmluZGVyIHBhdHRlcm5zIGFuZCBvcmdhbml6ZXMgdGhlbSBpbnRvIHRvcExlZnQsIHRvcFJpZ2h0LCBldGNcbmZ1bmN0aW9uIHJlb3JkZXJGaW5kZXJQYXR0ZXJucyhwYXR0ZXJuMSwgcGF0dGVybjIsIHBhdHRlcm4zKSB7XG4gICAgLy8gRmluZCBkaXN0YW5jZXMgYmV0d2VlbiBwYXR0ZXJuIGNlbnRlcnNcbiAgICB2YXIgb25lVHdvRGlzdGFuY2UgPSBkaXN0YW5jZShwYXR0ZXJuMSwgcGF0dGVybjIpO1xuICAgIHZhciB0d29UaHJlZURpc3RhbmNlID0gZGlzdGFuY2UocGF0dGVybjIsIHBhdHRlcm4zKTtcbiAgICB2YXIgb25lVGhyZWVEaXN0YW5jZSA9IGRpc3RhbmNlKHBhdHRlcm4xLCBwYXR0ZXJuMyk7XG4gICAgdmFyIGJvdHRvbUxlZnQ7XG4gICAgdmFyIHRvcExlZnQ7XG4gICAgdmFyIHRvcFJpZ2h0O1xuICAgIC8vIEFzc3VtZSBvbmUgY2xvc2VzdCB0byBvdGhlciB0d28gaXMgQjsgQSBhbmQgQyB3aWxsIGp1c3QgYmUgZ3Vlc3NlcyBhdCBmaXJzdFxuICAgIGlmICh0d29UaHJlZURpc3RhbmNlID49IG9uZVR3b0Rpc3RhbmNlICYmIHR3b1RocmVlRGlzdGFuY2UgPj0gb25lVGhyZWVEaXN0YW5jZSkge1xuICAgICAgICBfYSA9IFtwYXR0ZXJuMiwgcGF0dGVybjEsIHBhdHRlcm4zXSwgYm90dG9tTGVmdCA9IF9hWzBdLCB0b3BMZWZ0ID0gX2FbMV0sIHRvcFJpZ2h0ID0gX2FbMl07XG4gICAgfVxuICAgIGVsc2UgaWYgKG9uZVRocmVlRGlzdGFuY2UgPj0gdHdvVGhyZWVEaXN0YW5jZSAmJiBvbmVUaHJlZURpc3RhbmNlID49IG9uZVR3b0Rpc3RhbmNlKSB7XG4gICAgICAgIF9iID0gW3BhdHRlcm4xLCBwYXR0ZXJuMiwgcGF0dGVybjNdLCBib3R0b21MZWZ0ID0gX2JbMF0sIHRvcExlZnQgPSBfYlsxXSwgdG9wUmlnaHQgPSBfYlsyXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9jID0gW3BhdHRlcm4xLCBwYXR0ZXJuMywgcGF0dGVybjJdLCBib3R0b21MZWZ0ID0gX2NbMF0sIHRvcExlZnQgPSBfY1sxXSwgdG9wUmlnaHQgPSBfY1syXTtcbiAgICB9XG4gICAgLy8gVXNlIGNyb3NzIHByb2R1Y3QgdG8gZmlndXJlIG91dCB3aGV0aGVyIGJvdHRvbUxlZnQgKEEpIGFuZCB0b3BSaWdodCAoQykgYXJlIGNvcnJlY3Qgb3IgZmxpcHBlZCBpbiByZWxhdGlvbiB0byB0b3BMZWZ0IChCKVxuICAgIC8vIFRoaXMgYXNrcyB3aGV0aGVyIEJDIHggQkEgaGFzIGEgcG9zaXRpdmUgeiBjb21wb25lbnQsIHdoaWNoIGlzIHRoZSBhcnJhbmdlbWVudCB3ZSB3YW50LiBJZiBpdCdzIG5lZ2F0aXZlLCB0aGVuXG4gICAgLy8gd2UndmUgZ290IGl0IGZsaXBwZWQgYXJvdW5kIGFuZCBzaG91bGQgc3dhcCB0b3BSaWdodCBhbmQgYm90dG9tTGVmdC5cbiAgICBpZiAoKCh0b3BSaWdodC54IC0gdG9wTGVmdC54KSAqIChib3R0b21MZWZ0LnkgLSB0b3BMZWZ0LnkpKSAtICgodG9wUmlnaHQueSAtIHRvcExlZnQueSkgKiAoYm90dG9tTGVmdC54IC0gdG9wTGVmdC54KSkgPCAwKSB7XG4gICAgICAgIF9kID0gW3RvcFJpZ2h0LCBib3R0b21MZWZ0XSwgYm90dG9tTGVmdCA9IF9kWzBdLCB0b3BSaWdodCA9IF9kWzFdO1xuICAgIH1cbiAgICByZXR1cm4geyBib3R0b21MZWZ0OiBib3R0b21MZWZ0LCB0b3BMZWZ0OiB0b3BMZWZ0LCB0b3BSaWdodDogdG9wUmlnaHQgfTtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG59XG4vLyBDb21wdXRlcyB0aGUgZGltZW5zaW9uIChudW1iZXIgb2YgbW9kdWxlcyBvbiBhIHNpZGUpIG9mIHRoZSBRUiBDb2RlIGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmluZGVyIHBhdHRlcm5zXG5mdW5jdGlvbiBjb21wdXRlRGltZW5zaW9uKHRvcExlZnQsIHRvcFJpZ2h0LCBib3R0b21MZWZ0LCBtYXRyaXgpIHtcbiAgICB2YXIgbW9kdWxlU2l6ZSA9IChzdW0oY291bnRCbGFja1doaXRlUnVuKHRvcExlZnQsIGJvdHRvbUxlZnQsIG1hdHJpeCwgNSkpIC8gNyArIC8vIERpdmlkZSBieSA3IHNpbmNlIHRoZSByYXRpbyBpcyAxOjE6MzoxOjFcbiAgICAgICAgc3VtKGNvdW50QmxhY2tXaGl0ZVJ1bih0b3BMZWZ0LCB0b3BSaWdodCwgbWF0cml4LCA1KSkgLyA3ICtcbiAgICAgICAgc3VtKGNvdW50QmxhY2tXaGl0ZVJ1bihib3R0b21MZWZ0LCB0b3BMZWZ0LCBtYXRyaXgsIDUpKSAvIDcgK1xuICAgICAgICBzdW0oY291bnRCbGFja1doaXRlUnVuKHRvcFJpZ2h0LCB0b3BMZWZ0LCBtYXRyaXgsIDUpKSAvIDcpIC8gNDtcbiAgICB2YXIgdG9wRGltZW5zaW9uID0gTWF0aC5yb3VuZChkaXN0YW5jZSh0b3BMZWZ0LCB0b3BSaWdodCkgLyBtb2R1bGVTaXplKTtcbiAgICB2YXIgc2lkZURpbWVuc2lvbiA9IE1hdGgucm91bmQoZGlzdGFuY2UodG9wTGVmdCwgYm90dG9tTGVmdCkgLyBtb2R1bGVTaXplKTtcbiAgICB2YXIgZGltZW5zaW9uID0gTWF0aC5mbG9vcigodG9wRGltZW5zaW9uICsgc2lkZURpbWVuc2lvbikgLyAyKSArIDc7XG4gICAgc3dpdGNoIChkaW1lbnNpb24gJSA0KSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGRpbWVuc2lvbisrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGRpbWVuc2lvbi0tO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB7IGRpbWVuc2lvbjogZGltZW5zaW9uLCBtb2R1bGVTaXplOiBtb2R1bGVTaXplIH07XG59XG4vLyBUYWtlcyBhbiBvcmlnaW4gcG9pbnQgYW5kIGFuIGVuZCBwb2ludCBhbmQgY291bnRzIHRoZSBzaXplcyBvZiB0aGUgYmxhY2sgd2hpdGUgcnVuIGZyb20gdGhlIG9yaWdpbiB0b3dhcmRzIHRoZSBlbmQgcG9pbnQuXG4vLyBSZXR1cm5zIGFuIGFycmF5IG9mIGVsZW1lbnRzLCByZXByZXNlbnRpbmcgdGhlIHBpeGVsIHNpemUgb2YgdGhlIGJsYWNrIHdoaXRlIHJ1bi5cbi8vIFVzZXMgYSB2YXJpYW50IG9mIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlc2VuaGFtJ3NfbGluZV9hbGdvcml0aG1cbmZ1bmN0aW9uIGNvdW50QmxhY2tXaGl0ZVJ1blRvd2FyZHNQb2ludChvcmlnaW4sIGVuZCwgbWF0cml4LCBsZW5ndGgpIHtcbiAgICB2YXIgc3dpdGNoUG9pbnRzID0gW3sgeDogTWF0aC5mbG9vcihvcmlnaW4ueCksIHk6IE1hdGguZmxvb3Iob3JpZ2luLnkpIH1dO1xuICAgIHZhciBzdGVlcCA9IE1hdGguYWJzKGVuZC55IC0gb3JpZ2luLnkpID4gTWF0aC5hYnMoZW5kLnggLSBvcmlnaW4ueCk7XG4gICAgdmFyIGZyb21YO1xuICAgIHZhciBmcm9tWTtcbiAgICB2YXIgdG9YO1xuICAgIHZhciB0b1k7XG4gICAgaWYgKHN0ZWVwKSB7XG4gICAgICAgIGZyb21YID0gTWF0aC5mbG9vcihvcmlnaW4ueSk7XG4gICAgICAgIGZyb21ZID0gTWF0aC5mbG9vcihvcmlnaW4ueCk7XG4gICAgICAgIHRvWCA9IE1hdGguZmxvb3IoZW5kLnkpO1xuICAgICAgICB0b1kgPSBNYXRoLmZsb29yKGVuZC54KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZyb21YID0gTWF0aC5mbG9vcihvcmlnaW4ueCk7XG4gICAgICAgIGZyb21ZID0gTWF0aC5mbG9vcihvcmlnaW4ueSk7XG4gICAgICAgIHRvWCA9IE1hdGguZmxvb3IoZW5kLngpO1xuICAgICAgICB0b1kgPSBNYXRoLmZsb29yKGVuZC55KTtcbiAgICB9XG4gICAgdmFyIGR4ID0gTWF0aC5hYnModG9YIC0gZnJvbVgpO1xuICAgIHZhciBkeSA9IE1hdGguYWJzKHRvWSAtIGZyb21ZKTtcbiAgICB2YXIgZXJyb3IgPSBNYXRoLmZsb29yKC1keCAvIDIpO1xuICAgIHZhciB4U3RlcCA9IGZyb21YIDwgdG9YID8gMSA6IC0xO1xuICAgIHZhciB5U3RlcCA9IGZyb21ZIDwgdG9ZID8gMSA6IC0xO1xuICAgIHZhciBjdXJyZW50UGl4ZWwgPSB0cnVlO1xuICAgIC8vIExvb3AgdXAgdW50aWwgeCA9PSB0b1gsIGJ1dCBub3QgYmV5b25kXG4gICAgZm9yICh2YXIgeCA9IGZyb21YLCB5ID0gZnJvbVk7IHggIT09IHRvWCArIHhTdGVwOyB4ICs9IHhTdGVwKSB7XG4gICAgICAgIC8vIERvZXMgY3VycmVudCBwaXhlbCBtZWFuIHdlIGhhdmUgbW92ZWQgd2hpdGUgdG8gYmxhY2sgb3IgdmljZSB2ZXJzYT9cbiAgICAgICAgLy8gU2Nhbm5pbmcgYmxhY2sgaW4gc3RhdGUgMCwyIGFuZCB3aGl0ZSBpbiBzdGF0ZSAxLCBzbyBpZiB3ZSBmaW5kIHRoZSB3cm9uZ1xuICAgICAgICAvLyBjb2xvciwgYWR2YW5jZSB0byBuZXh0IHN0YXRlIG9yIGVuZCBpZiB3ZSBhcmUgaW4gc3RhdGUgMiBhbHJlYWR5XG4gICAgICAgIHZhciByZWFsWCA9IHN0ZWVwID8geSA6IHg7XG4gICAgICAgIHZhciByZWFsWSA9IHN0ZWVwID8geCA6IHk7XG4gICAgICAgIGlmIChtYXRyaXguZ2V0KHJlYWxYLCByZWFsWSkgIT09IGN1cnJlbnRQaXhlbCkge1xuICAgICAgICAgICAgY3VycmVudFBpeGVsID0gIWN1cnJlbnRQaXhlbDtcbiAgICAgICAgICAgIHN3aXRjaFBvaW50cy5wdXNoKHsgeDogcmVhbFgsIHk6IHJlYWxZIH0pO1xuICAgICAgICAgICAgaWYgKHN3aXRjaFBvaW50cy5sZW5ndGggPT09IGxlbmd0aCArIDEpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvciArPSBkeTtcbiAgICAgICAgaWYgKGVycm9yID4gMCkge1xuICAgICAgICAgICAgaWYgKHkgPT09IHRvWSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeSArPSB5U3RlcDtcbiAgICAgICAgICAgIGVycm9yIC09IGR4O1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBkaXN0YW5jZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzd2l0Y2hQb2ludHNbaV0gJiYgc3dpdGNoUG9pbnRzW2kgKyAxXSkge1xuICAgICAgICAgICAgZGlzdGFuY2VzLnB1c2goZGlzdGFuY2Uoc3dpdGNoUG9pbnRzW2ldLCBzd2l0Y2hQb2ludHNbaSArIDFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkaXN0YW5jZXMucHVzaCgwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlzdGFuY2VzO1xufVxuLy8gVGFrZXMgYW4gb3JpZ2luIHBvaW50IGFuZCBhbiBlbmQgcG9pbnQgYW5kIGNvdW50cyB0aGUgc2l6ZXMgb2YgdGhlIGJsYWNrIHdoaXRlIHJ1biBpbiB0aGUgb3JpZ2luIHBvaW50XG4vLyBhbG9uZyB0aGUgbGluZSB0aGF0IGludGVyc2VjdHMgd2l0aCB0aGUgZW5kIHBvaW50LiBSZXR1cm5zIGFuIGFycmF5IG9mIGVsZW1lbnRzLCByZXByZXNlbnRpbmcgdGhlIHBpeGVsIHNpemVzXG4vLyBvZiB0aGUgYmxhY2sgd2hpdGUgcnVuLiBUYWtlcyBhIGxlbmd0aCB3aGljaCByZXByZXNlbnRzIHRoZSBudW1iZXIgb2Ygc3dpdGNoZXMgZnJvbSBibGFjayB0byB3aGl0ZSB0byBsb29rIGZvci5cbmZ1bmN0aW9uIGNvdW50QmxhY2tXaGl0ZVJ1bihvcmlnaW4sIGVuZCwgbWF0cml4LCBsZW5ndGgpIHtcbiAgICB2YXIgcmlzZSA9IGVuZC55IC0gb3JpZ2luLnk7XG4gICAgdmFyIHJ1biA9IGVuZC54IC0gb3JpZ2luLng7XG4gICAgdmFyIHRvd2FyZHNFbmQgPSBjb3VudEJsYWNrV2hpdGVSdW5Ub3dhcmRzUG9pbnQob3JpZ2luLCBlbmQsIG1hdHJpeCwgTWF0aC5jZWlsKGxlbmd0aCAvIDIpKTtcbiAgICB2YXIgYXdheUZyb21FbmQgPSBjb3VudEJsYWNrV2hpdGVSdW5Ub3dhcmRzUG9pbnQob3JpZ2luLCB7IHg6IG9yaWdpbi54IC0gcnVuLCB5OiBvcmlnaW4ueSAtIHJpc2UgfSwgbWF0cml4LCBNYXRoLmNlaWwobGVuZ3RoIC8gMikpO1xuICAgIHZhciBtaWRkbGVWYWx1ZSA9IHRvd2FyZHNFbmQuc2hpZnQoKSArIGF3YXlGcm9tRW5kLnNoaWZ0KCkgLSAxOyAvLyBTdWJzdHJhY3Qgb25lIHNvIHdlIGRvbid0IGRvdWJsZSBjb3VudCBhIHBpeGVsXG4gICAgcmV0dXJuIChfYSA9IGF3YXlGcm9tRW5kLmNvbmNhdChtaWRkbGVWYWx1ZSkpLmNvbmNhdC5hcHBseShfYSwgdG93YXJkc0VuZCk7XG4gICAgdmFyIF9hO1xufVxuLy8gVGFrZXMgaW4gYSBibGFjayB3aGl0ZSBydW4gYW5kIGFuIGFycmF5IG9mIGV4cGVjdGVkIHJhdGlvcy4gUmV0dXJucyB0aGUgYXZlcmFnZSBzaXplIG9mIHRoZSBydW4gYXMgd2VsbCBhcyB0aGUgXCJlcnJvclwiIC1cbi8vIHRoYXQgaXMgdGhlIGFtb3VudCB0aGUgcnVuIGRpdmVyZ2VzIGZyb20gdGhlIGV4cGVjdGVkIHJhdGlvXG5mdW5jdGlvbiBzY29yZUJsYWNrV2hpdGVSdW4oc2VxdWVuY2UsIHJhdGlvcykge1xuICAgIHZhciBhdmVyYWdlU2l6ZSA9IHN1bShzZXF1ZW5jZSkgLyBzdW0ocmF0aW9zKTtcbiAgICB2YXIgZXJyb3IgPSAwO1xuICAgIHJhdGlvcy5mb3JFYWNoKGZ1bmN0aW9uIChyYXRpbywgaSkge1xuICAgICAgICBlcnJvciArPSBNYXRoLnBvdygoc2VxdWVuY2VbaV0gLSByYXRpbyAqIGF2ZXJhZ2VTaXplKSwgMik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgYXZlcmFnZVNpemU6IGF2ZXJhZ2VTaXplLCBlcnJvcjogZXJyb3IgfTtcbn1cbi8vIFRha2VzIGFuIFgsWSBwb2ludCBhbmQgYW4gYXJyYXkgb2Ygc2l6ZXMgYW5kIHNjb3JlcyB0aGUgcG9pbnQgYWdhaW5zdCB0aG9zZSByYXRpb3MuXG4vLyBGb3IgZXhhbXBsZSBmb3IgYSBmaW5kZXIgcGF0dGVybiB0YWtlcyB0aGUgcmF0aW8gbGlzdCBvZiAxOjE6MzoxOjEgYW5kIGNoZWNrcyBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmQgZGlhZ29uYWwgcmF0aW9zXG4vLyBhZ2FpbnN0IHRoYXQuXG5mdW5jdGlvbiBzY29yZVBhdHRlcm4ocG9pbnQsIHJhdGlvcywgbWF0cml4KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGhvcml6b250YWxSdW4gPSBjb3VudEJsYWNrV2hpdGVSdW4ocG9pbnQsIHsgeDogLTEsIHk6IHBvaW50LnkgfSwgbWF0cml4LCByYXRpb3MubGVuZ3RoKTtcbiAgICAgICAgdmFyIHZlcnRpY2FsUnVuID0gY291bnRCbGFja1doaXRlUnVuKHBvaW50LCB7IHg6IHBvaW50LngsIHk6IC0xIH0sIG1hdHJpeCwgcmF0aW9zLmxlbmd0aCk7XG4gICAgICAgIHZhciB0b3BMZWZ0UG9pbnQgPSB7XG4gICAgICAgICAgICB4OiBNYXRoLm1heCgwLCBwb2ludC54IC0gcG9pbnQueSkgLSAxLFxuICAgICAgICAgICAgeTogTWF0aC5tYXgoMCwgcG9pbnQueSAtIHBvaW50LngpIC0gMSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRvcExlZnRCb3R0b21SaWdodFJ1biA9IGNvdW50QmxhY2tXaGl0ZVJ1bihwb2ludCwgdG9wTGVmdFBvaW50LCBtYXRyaXgsIHJhdGlvcy5sZW5ndGgpO1xuICAgICAgICB2YXIgYm90dG9tTGVmdFBvaW50ID0ge1xuICAgICAgICAgICAgeDogTWF0aC5taW4obWF0cml4LndpZHRoLCBwb2ludC54ICsgcG9pbnQueSkgKyAxLFxuICAgICAgICAgICAgeTogTWF0aC5taW4obWF0cml4LmhlaWdodCwgcG9pbnQueSArIHBvaW50LngpICsgMSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGJvdHRvbUxlZnRUb3BSaWdodFJ1biA9IGNvdW50QmxhY2tXaGl0ZVJ1bihwb2ludCwgYm90dG9tTGVmdFBvaW50LCBtYXRyaXgsIHJhdGlvcy5sZW5ndGgpO1xuICAgICAgICB2YXIgaG9yekVycm9yID0gc2NvcmVCbGFja1doaXRlUnVuKGhvcml6b250YWxSdW4sIHJhdGlvcyk7XG4gICAgICAgIHZhciB2ZXJ0RXJyb3IgPSBzY29yZUJsYWNrV2hpdGVSdW4odmVydGljYWxSdW4sIHJhdGlvcyk7XG4gICAgICAgIHZhciBkaWFnRG93bkVycm9yID0gc2NvcmVCbGFja1doaXRlUnVuKHRvcExlZnRCb3R0b21SaWdodFJ1biwgcmF0aW9zKTtcbiAgICAgICAgdmFyIGRpYWdVcEVycm9yID0gc2NvcmVCbGFja1doaXRlUnVuKGJvdHRvbUxlZnRUb3BSaWdodFJ1biwgcmF0aW9zKTtcbiAgICAgICAgdmFyIHJhdGlvRXJyb3IgPSBNYXRoLnNxcnQoaG9yekVycm9yLmVycm9yICogaG9yekVycm9yLmVycm9yICtcbiAgICAgICAgICAgIHZlcnRFcnJvci5lcnJvciAqIHZlcnRFcnJvci5lcnJvciArXG4gICAgICAgICAgICBkaWFnRG93bkVycm9yLmVycm9yICogZGlhZ0Rvd25FcnJvci5lcnJvciArXG4gICAgICAgICAgICBkaWFnVXBFcnJvci5lcnJvciAqIGRpYWdVcEVycm9yLmVycm9yKTtcbiAgICAgICAgdmFyIGF2Z1NpemUgPSAoaG9yekVycm9yLmF2ZXJhZ2VTaXplICsgdmVydEVycm9yLmF2ZXJhZ2VTaXplICsgZGlhZ0Rvd25FcnJvci5hdmVyYWdlU2l6ZSArIGRpYWdVcEVycm9yLmF2ZXJhZ2VTaXplKSAvIDQ7XG4gICAgICAgIHZhciBzaXplRXJyb3IgPSAoTWF0aC5wb3coKGhvcnpFcnJvci5hdmVyYWdlU2l6ZSAtIGF2Z1NpemUpLCAyKSArXG4gICAgICAgICAgICBNYXRoLnBvdygodmVydEVycm9yLmF2ZXJhZ2VTaXplIC0gYXZnU2l6ZSksIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KChkaWFnRG93bkVycm9yLmF2ZXJhZ2VTaXplIC0gYXZnU2l6ZSksIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KChkaWFnVXBFcnJvci5hdmVyYWdlU2l6ZSAtIGF2Z1NpemUpLCAyKSkgLyBhdmdTaXplO1xuICAgICAgICByZXR1cm4gcmF0aW9FcnJvciArIHNpemVFcnJvcjtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG59XG5mdW5jdGlvbiBsb2NhdGUobWF0cml4KSB7XG4gICAgdmFyIGZpbmRlclBhdHRlcm5RdWFkcyA9IFtdO1xuICAgIHZhciBhY3RpdmVGaW5kZXJQYXR0ZXJuUXVhZHMgPSBbXTtcbiAgICB2YXIgYWxpZ25tZW50UGF0dGVyblF1YWRzID0gW107XG4gICAgdmFyIGFjdGl2ZUFsaWdubWVudFBhdHRlcm5RdWFkcyA9IFtdO1xuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgdmFyIGxlbmd0aF8xID0gMDtcbiAgICAgICAgdmFyIGxhc3RCaXQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNjYW5zID0gWzAsIDAsIDAsIDAsIDBdO1xuICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICB2YXIgdiA9IG1hdHJpeC5nZXQoeCwgeSk7XG4gICAgICAgICAgICBpZiAodiA9PT0gbGFzdEJpdCkge1xuICAgICAgICAgICAgICAgIGxlbmd0aF8xKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2FucyA9IFtzY2Fuc1sxXSwgc2NhbnNbMl0sIHNjYW5zWzNdLCBzY2Fuc1s0XSwgbGVuZ3RoXzFdO1xuICAgICAgICAgICAgICAgIGxlbmd0aF8xID0gMTtcbiAgICAgICAgICAgICAgICBsYXN0Qml0ID0gdjtcbiAgICAgICAgICAgICAgICAvLyBEbyB0aGUgbGFzdCA1IGNvbG9yIGNoYW5nZXMgfiBtYXRjaCB0aGUgZXhwZWN0ZWQgcmF0aW8gZm9yIGEgZmluZGVyIHBhdHRlcm4/IDE6MTozOjE6MSBvZiBiOnc6Yjp3OmJcbiAgICAgICAgICAgICAgICB2YXIgYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUgPSBzdW0oc2NhbnMpIC8gNztcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRGaW5kZXJQYXR0ZXJuID0gTWF0aC5hYnMoc2NhbnNbMF0gLSBhdmVyYWdlRmluZGVyUGF0dGVybkJsb2Nrc2l6ZSkgPCBhdmVyYWdlRmluZGVyUGF0dGVybkJsb2Nrc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhzY2Fuc1sxXSAtIGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplKSA8IGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplICYmXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHNjYW5zWzJdIC0gMyAqIGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplKSA8IDMgKiBhdmVyYWdlRmluZGVyUGF0dGVybkJsb2Nrc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhzY2Fuc1szXSAtIGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplKSA8IGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplICYmXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHNjYW5zWzRdIC0gYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUpIDwgYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUgJiZcbiAgICAgICAgICAgICAgICAgICAgIXY7IC8vIEFuZCBtYWtlIHN1cmUgdGhlIGN1cnJlbnQgcGl4ZWwgaXMgd2hpdGUgc2luY2UgZmluZGVyIHBhdHRlcm5zIGFyZSBib3JkZXJlZCBpbiB3aGl0ZVxuICAgICAgICAgICAgICAgIC8vIERvIHRoZSBsYXN0IDMgY29sb3IgY2hhbmdlcyB+IG1hdGNoIHRoZSBleHBlY3RlZCByYXRpbyBmb3IgYW4gYWxpZ25tZW50IHBhdHRlcm4/IDE6MToxIG9mIHc6Yjp3XG4gICAgICAgICAgICAgICAgdmFyIGF2ZXJhZ2VBbGlnbm1lbnRQYXR0ZXJuQmxvY2tzaXplID0gc3VtKHNjYW5zLnNsaWNlKC0zKSkgLyAzO1xuICAgICAgICAgICAgICAgIHZhciB2YWxpZEFsaWdubWVudFBhdHRlcm4gPSBNYXRoLmFicyhzY2Fuc1syXSAtIGF2ZXJhZ2VBbGlnbm1lbnRQYXR0ZXJuQmxvY2tzaXplKSA8IGF2ZXJhZ2VBbGlnbm1lbnRQYXR0ZXJuQmxvY2tzaXplICYmXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHNjYW5zWzNdIC0gYXZlcmFnZUFsaWdubWVudFBhdHRlcm5CbG9ja3NpemUpIDwgYXZlcmFnZUFsaWdubWVudFBhdHRlcm5CbG9ja3NpemUgJiZcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoc2NhbnNbNF0gLSBhdmVyYWdlQWxpZ25tZW50UGF0dGVybkJsb2Nrc2l6ZSkgPCBhdmVyYWdlQWxpZ25tZW50UGF0dGVybkJsb2Nrc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgICB2OyAvLyBJcyB0aGUgY3VycmVudCBwaXhlbCBibGFjayBzaW5jZSBhbGlnbm1lbnQgcGF0dGVybnMgYXJlIGJvcmRlcmVkIGluIGJsYWNrXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkRmluZGVyUGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb21wdXRlIHRoZSBzdGFydCBhbmQgZW5kIHggdmFsdWVzIG9mIHRoZSBsYXJnZSBjZW50ZXIgYmxhY2sgc3F1YXJlXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmRYXzEgPSB4IC0gc2NhbnNbM10gLSBzY2Fuc1s0XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0WF8xID0gZW5kWF8xIC0gc2NhbnNbMl07XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0geyBzdGFydFg6IHN0YXJ0WF8xLCBlbmRYOiBlbmRYXzEsIHk6IHkgfTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXMgdGhlcmUgYSBxdWFkIGRpcmVjdGx5IGFib3ZlIHRoZSBjdXJyZW50IHNwb3Q/IElmIHNvLCBleHRlbmQgaXQgd2l0aCB0aGUgbmV3IGxpbmUuIE90aGVyd2lzZSwgY3JlYXRlIGEgbmV3IHF1YWQgd2l0aFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGF0IGxpbmUgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hpbmdRdWFkcyA9IGFjdGl2ZUZpbmRlclBhdHRlcm5RdWFkcy5maWx0ZXIoZnVuY3Rpb24gKHEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoc3RhcnRYXzEgPj0gcS5ib3R0b20uc3RhcnRYICYmIHN0YXJ0WF8xIDw9IHEuYm90dG9tLmVuZFgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVuZFhfMSA+PSBxLmJvdHRvbS5zdGFydFggJiYgc3RhcnRYXzEgPD0gcS5ib3R0b20uZW5kWCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRYXzEgPD0gcS5ib3R0b20uc3RhcnRYICYmIGVuZFhfMSA+PSBxLmJvdHRvbS5lbmRYICYmICgoc2NhbnNbMl0gLyAocS5ib3R0b20uZW5kWCAtIHEuYm90dG9tLnN0YXJ0WCkpIDwgTUFYX1FVQURfUkFUSU8gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNjYW5zWzJdIC8gKHEuYm90dG9tLmVuZFggLSBxLmJvdHRvbS5zdGFydFgpKSA+IE1JTl9RVUFEX1JBVElPKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdRdWFkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ1F1YWRzWzBdLmJvdHRvbSA9IGxpbmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVGaW5kZXJQYXR0ZXJuUXVhZHMucHVzaCh7IHRvcDogbGluZSwgYm90dG9tOiBsaW5lIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWxpZEFsaWdubWVudFBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcHV0ZSB0aGUgc3RhcnQgYW5kIGVuZCB4IHZhbHVlcyBvZiB0aGUgY2VudGVyIGJsYWNrIHNxdWFyZVxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kWF8yID0geCAtIHNjYW5zWzRdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRYXzIgPSBlbmRYXzIgLSBzY2Fuc1szXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSB7IHN0YXJ0WDogc3RhcnRYXzIsIHk6IHksIGVuZFg6IGVuZFhfMiB9O1xuICAgICAgICAgICAgICAgICAgICAvLyBJcyB0aGVyZSBhIHF1YWQgZGlyZWN0bHkgYWJvdmUgdGhlIGN1cnJlbnQgc3BvdD8gSWYgc28sIGV4dGVuZCBpdCB3aXRoIHRoZSBuZXcgbGluZS4gT3RoZXJ3aXNlLCBjcmVhdGUgYSBuZXcgcXVhZCB3aXRoXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgbGluZSBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGluZ1F1YWRzID0gYWN0aXZlQWxpZ25tZW50UGF0dGVyblF1YWRzLmZpbHRlcihmdW5jdGlvbiAocSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzdGFydFhfMiA+PSBxLmJvdHRvbS5zdGFydFggJiYgc3RhcnRYXzIgPD0gcS5ib3R0b20uZW5kWCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW5kWF8yID49IHEuYm90dG9tLnN0YXJ0WCAmJiBzdGFydFhfMiA8PSBxLmJvdHRvbS5lbmRYKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydFhfMiA8PSBxLmJvdHRvbS5zdGFydFggJiYgZW5kWF8yID49IHEuYm90dG9tLmVuZFggJiYgKChzY2Fuc1syXSAvIChxLmJvdHRvbS5lbmRYIC0gcS5ib3R0b20uc3RhcnRYKSkgPCBNQVhfUVVBRF9SQVRJTyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2NhbnNbMl0gLyAocS5ib3R0b20uZW5kWCAtIHEuYm90dG9tLnN0YXJ0WCkpID4gTUlOX1FVQURfUkFUSU8pKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ1F1YWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nUXVhZHNbMF0uYm90dG9tID0gbGluZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFsaWdubWVudFBhdHRlcm5RdWFkcy5wdXNoKHsgdG9wOiBsaW5lLCBib3R0b206IGxpbmUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIHggPSAtMTsgeCA8PSBtYXRyaXgud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgX2xvb3BfMih4KTtcbiAgICAgICAgfVxuICAgICAgICBmaW5kZXJQYXR0ZXJuUXVhZHMucHVzaC5hcHBseShmaW5kZXJQYXR0ZXJuUXVhZHMsIGFjdGl2ZUZpbmRlclBhdHRlcm5RdWFkcy5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuIHEuYm90dG9tLnkgIT09IHkgJiYgcS5ib3R0b20ueSAtIHEudG9wLnkgPj0gMjsgfSkpO1xuICAgICAgICBhY3RpdmVGaW5kZXJQYXR0ZXJuUXVhZHMgPSBhY3RpdmVGaW5kZXJQYXR0ZXJuUXVhZHMuZmlsdGVyKGZ1bmN0aW9uIChxKSB7IHJldHVybiBxLmJvdHRvbS55ID09PSB5OyB9KTtcbiAgICAgICAgYWxpZ25tZW50UGF0dGVyblF1YWRzLnB1c2guYXBwbHkoYWxpZ25tZW50UGF0dGVyblF1YWRzLCBhY3RpdmVBbGlnbm1lbnRQYXR0ZXJuUXVhZHMuZmlsdGVyKGZ1bmN0aW9uIChxKSB7IHJldHVybiBxLmJvdHRvbS55ICE9PSB5OyB9KSk7XG4gICAgICAgIGFjdGl2ZUFsaWdubWVudFBhdHRlcm5RdWFkcyA9IGFjdGl2ZUFsaWdubWVudFBhdHRlcm5RdWFkcy5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuIHEuYm90dG9tLnkgPT09IHk7IH0pO1xuICAgIH07XG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPD0gbWF0cml4LmhlaWdodDsgeSsrKSB7XG4gICAgICAgIF9sb29wXzEoeSk7XG4gICAgfVxuICAgIGZpbmRlclBhdHRlcm5RdWFkcy5wdXNoLmFwcGx5KGZpbmRlclBhdHRlcm5RdWFkcywgYWN0aXZlRmluZGVyUGF0dGVyblF1YWRzLmZpbHRlcihmdW5jdGlvbiAocSkgeyByZXR1cm4gcS5ib3R0b20ueSAtIHEudG9wLnkgPj0gMjsgfSkpO1xuICAgIGFsaWdubWVudFBhdHRlcm5RdWFkcy5wdXNoLmFwcGx5KGFsaWdubWVudFBhdHRlcm5RdWFkcywgYWN0aXZlQWxpZ25tZW50UGF0dGVyblF1YWRzKTtcbiAgICB2YXIgZmluZGVyUGF0dGVybkdyb3VwcyA9IGZpbmRlclBhdHRlcm5RdWFkc1xuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChxKSB7IHJldHVybiBxLmJvdHRvbS55IC0gcS50b3AueSA+PSAyOyB9KSAvLyBBbGwgcXVhZHMgbXVzdCBiZSBhdCBsZWFzdCAycHggdGFsbCBzaW5jZSB0aGUgY2VudGVyIHNxdWFyZSBpcyBsYXJnZXIgdGhhbiBhIGJsb2NrXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHEpIHtcbiAgICAgICAgdmFyIHggPSAocS50b3Auc3RhcnRYICsgcS50b3AuZW5kWCArIHEuYm90dG9tLnN0YXJ0WCArIHEuYm90dG9tLmVuZFgpIC8gNDtcbiAgICAgICAgdmFyIHkgPSAocS50b3AueSArIHEuYm90dG9tLnkgKyAxKSAvIDI7XG4gICAgICAgIGlmICghbWF0cml4LmdldChNYXRoLnJvdW5kKHgpLCBNYXRoLnJvdW5kKHkpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsZW5ndGhzID0gW3EudG9wLmVuZFggLSBxLnRvcC5zdGFydFgsIHEuYm90dG9tLmVuZFggLSBxLmJvdHRvbS5zdGFydFgsIHEuYm90dG9tLnkgLSBxLnRvcC55ICsgMV07XG4gICAgICAgIHZhciBzaXplID0gc3VtKGxlbmd0aHMpIC8gbGVuZ3Rocy5sZW5ndGg7XG4gICAgICAgIHZhciBzY29yZSA9IHNjb3JlUGF0dGVybih7IHg6IE1hdGgucm91bmQoeCksIHk6IE1hdGgucm91bmQoeSkgfSwgWzEsIDEsIDMsIDEsIDFdLCBtYXRyaXgpO1xuICAgICAgICByZXR1cm4geyBzY29yZTogc2NvcmUsIHg6IHgsIHk6IHksIHNpemU6IHNpemUgfTtcbiAgICB9KVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChxKSB7IHJldHVybiAhIXE7IH0pIC8vIEZpbHRlciBvdXQgYW55IHJlamVjdGVkIHF1YWRzIGZyb20gYWJvdmVcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuc2NvcmUgLSBiLnNjb3JlOyB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChwb2ludCwgaSwgZmluZGVyUGF0dGVybnMpIHtcbiAgICAgICAgaWYgKGkgPiBNQVhfRklOREVSUEFUVEVSTlNfVE9fU0VBUkNIKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3RoZXJQb2ludHMgPSBmaW5kZXJQYXR0ZXJuc1xuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAocCwgaWkpIHsgcmV0dXJuIGkgIT09IGlpOyB9KVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAocCkgeyByZXR1cm4gKHsgeDogcC54LCB5OiBwLnksIHNjb3JlOiBwLnNjb3JlICsgKE1hdGgucG93KChwLnNpemUgLSBwb2ludC5zaXplKSwgMikpIC8gcG9pbnQuc2l6ZSwgc2l6ZTogcC5zaXplIH0pOyB9KVxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuc2NvcmUgLSBiLnNjb3JlOyB9KTtcbiAgICAgICAgaWYgKG90aGVyUG9pbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY29yZSA9IHBvaW50LnNjb3JlICsgb3RoZXJQb2ludHNbMF0uc2NvcmUgKyBvdGhlclBvaW50c1sxXS5zY29yZTtcbiAgICAgICAgcmV0dXJuIHsgcG9pbnRzOiBbcG9pbnRdLmNvbmNhdChvdGhlclBvaW50cy5zbGljZSgwLCAyKSksIHNjb3JlOiBzY29yZSB9O1xuICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuICEhcTsgfSkgLy8gRmlsdGVyIG91dCBhbnkgcmVqZWN0ZWQgZmluZGVyIHBhdHRlcm5zIGZyb20gYWJvdmVcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuc2NvcmUgLSBiLnNjb3JlOyB9KTtcbiAgICBpZiAoZmluZGVyUGF0dGVybkdyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBfYSA9IHJlb3JkZXJGaW5kZXJQYXR0ZXJucyhmaW5kZXJQYXR0ZXJuR3JvdXBzWzBdLnBvaW50c1swXSwgZmluZGVyUGF0dGVybkdyb3Vwc1swXS5wb2ludHNbMV0sIGZpbmRlclBhdHRlcm5Hcm91cHNbMF0ucG9pbnRzWzJdKSwgdG9wUmlnaHQgPSBfYS50b3BSaWdodCwgdG9wTGVmdCA9IF9hLnRvcExlZnQsIGJvdHRvbUxlZnQgPSBfYS5ib3R0b21MZWZ0O1xuICAgIC8vIE5vdyB0aGF0IHdlJ3ZlIGZvdW5kIHRoZSB0aHJlZSBmaW5kZXIgcGF0dGVybnMgd2UgY2FuIGRldGVybWluZSB0aGUgYmxvY2tTaXplIGFuZCB0aGUgc2l6ZSBvZiB0aGUgUVIgY29kZS5cbiAgICAvLyBXZSdsbCB1c2UgdGhlc2UgdG8gaGVscCBmaW5kIHRoZSBhbGlnbm1lbnQgcGF0dGVybiBidXQgYWxzbyBsYXRlciB3aGVuIHdlIGRvIHRoZSBleHRyYWN0aW9uLlxuICAgIHZhciBfYiA9IGNvbXB1dGVEaW1lbnNpb24odG9wTGVmdCwgdG9wUmlnaHQsIGJvdHRvbUxlZnQsIG1hdHJpeCksIGRpbWVuc2lvbiA9IF9iLmRpbWVuc2lvbiwgbW9kdWxlU2l6ZSA9IF9iLm1vZHVsZVNpemU7XG4gICAgLy8gTm93IGZpbmQgdGhlIGFsaWdubWVudCBwYXR0ZXJuXG4gICAgdmFyIGJvdHRvbVJpZ2h0RmluZGVyUGF0dGVybiA9IHtcbiAgICAgICAgeDogdG9wUmlnaHQueCAtIHRvcExlZnQueCArIGJvdHRvbUxlZnQueCxcbiAgICAgICAgeTogdG9wUmlnaHQueSAtIHRvcExlZnQueSArIGJvdHRvbUxlZnQueSxcbiAgICB9O1xuICAgIHZhciBtb2R1bGVzQmV0d2VlbkZpbmRlclBhdHRlcm5zID0gKChkaXN0YW5jZSh0b3BMZWZ0LCBib3R0b21MZWZ0KSArIGRpc3RhbmNlKHRvcExlZnQsIHRvcFJpZ2h0KSkgLyAyIC8gbW9kdWxlU2l6ZSk7XG4gICAgdmFyIGNvcnJlY3Rpb25Ub1RvcExlZnQgPSAxIC0gKDMgLyBtb2R1bGVzQmV0d2VlbkZpbmRlclBhdHRlcm5zKTtcbiAgICB2YXIgZXhwZWN0ZWRBbGlnbm1lbnRQYXR0ZXJuID0ge1xuICAgICAgICB4OiB0b3BMZWZ0LnggKyBjb3JyZWN0aW9uVG9Ub3BMZWZ0ICogKGJvdHRvbVJpZ2h0RmluZGVyUGF0dGVybi54IC0gdG9wTGVmdC54KSxcbiAgICAgICAgeTogdG9wTGVmdC55ICsgY29ycmVjdGlvblRvVG9wTGVmdCAqIChib3R0b21SaWdodEZpbmRlclBhdHRlcm4ueSAtIHRvcExlZnQueSksXG4gICAgfTtcbiAgICB2YXIgYWxpZ25tZW50UGF0dGVybnMgPSBhbGlnbm1lbnRQYXR0ZXJuUXVhZHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAocSkge1xuICAgICAgICB2YXIgeCA9IChxLnRvcC5zdGFydFggKyBxLnRvcC5lbmRYICsgcS5ib3R0b20uc3RhcnRYICsgcS5ib3R0b20uZW5kWCkgLyA0O1xuICAgICAgICB2YXIgeSA9IChxLnRvcC55ICsgcS5ib3R0b20ueSArIDEpIC8gMjtcbiAgICAgICAgaWYgKCFtYXRyaXguZ2V0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aHMgPSBbcS50b3AuZW5kWCAtIHEudG9wLnN0YXJ0WCwgcS5ib3R0b20uZW5kWCAtIHEuYm90dG9tLnN0YXJ0WCwgKHEuYm90dG9tLnkgLSBxLnRvcC55ICsgMSldO1xuICAgICAgICB2YXIgc2l6ZSA9IHN1bShsZW5ndGhzKSAvIGxlbmd0aHMubGVuZ3RoO1xuICAgICAgICB2YXIgc2l6ZVNjb3JlID0gc2NvcmVQYXR0ZXJuKHsgeDogTWF0aC5mbG9vcih4KSwgeTogTWF0aC5mbG9vcih5KSB9LCBbMSwgMSwgMV0sIG1hdHJpeCk7XG4gICAgICAgIHZhciBzY29yZSA9IHNpemVTY29yZSArIGRpc3RhbmNlKHsgeDogeCwgeTogeSB9LCBleHBlY3RlZEFsaWdubWVudFBhdHRlcm4pO1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5LCBzY29yZTogc2NvcmUgfTtcbiAgICB9KVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiAhIXY7IH0pXG4gICAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLnNjb3JlIC0gYi5zY29yZTsgfSk7XG4gICAgLy8gSWYgdGhlcmUgYXJlIGxlc3MgdGhhbiAxNSBtb2R1bGVzIGJldHdlZW4gZmluZGVyIHBhdHRlcm5zIGl0J3MgYSB2ZXJzaW9uIDEgUVIgY29kZSBhbmQgYXMgc3VjaCBoYXMgbm8gYWxpZ25tZW1udCBwYXR0ZXJuXG4gICAgLy8gc28gd2UgY2FuIG9ubHkgdXNlIG91ciBiZXN0IGd1ZXNzLlxuICAgIHZhciBhbGlnbm1lbnRQYXR0ZXJuID0gbW9kdWxlc0JldHdlZW5GaW5kZXJQYXR0ZXJucyA+PSAxNSAmJiBhbGlnbm1lbnRQYXR0ZXJucy5sZW5ndGggPyBhbGlnbm1lbnRQYXR0ZXJuc1swXSA6IGV4cGVjdGVkQWxpZ25tZW50UGF0dGVybjtcbiAgICByZXR1cm4ge1xuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuOiB7IHg6IGFsaWdubWVudFBhdHRlcm4ueCwgeTogYWxpZ25tZW50UGF0dGVybi55IH0sXG4gICAgICAgIGJvdHRvbUxlZnQ6IHsgeDogYm90dG9tTGVmdC54LCB5OiBib3R0b21MZWZ0LnkgfSxcbiAgICAgICAgZGltZW5zaW9uOiBkaW1lbnNpb24sXG4gICAgICAgIHRvcExlZnQ6IHsgeDogdG9wTGVmdC54LCB5OiB0b3BMZWZ0LnkgfSxcbiAgICAgICAgdG9wUmlnaHQ6IHsgeDogdG9wUmlnaHQueCwgeTogdG9wUmlnaHQueSB9LFxuICAgIH07XG59XG5leHBvcnRzLmxvY2F0ZSA9IGxvY2F0ZTtcblxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSlbXCJkZWZhdWx0XCJdO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNxci9kaXN0L2pzUVIuanNcbi8vIG1vZHVsZSBpZCA9IDE0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCJjbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yIChvYmopIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g7JyE7LmY7ZWgIOuMgOyDgS5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gb2JqLnJvb3RFbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDrhJPsnbQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHBhcnNlRmxvYXQob2JqLndpZHRoKSB8fCAwO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g64aS7J20LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcGFyc2VGbG9hdChvYmouaGVpZ2h0KSB8fCAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbnM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL25lbW8tcXItc2Nhbi9vcHRpb25zLmpzIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIDQgNSA2IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMhLi9ub3JtYWxpemUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zIS4vbm9ybWFsaXplLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMhLi9ub3JtYWxpemUuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY3NzL25vcm1hbGl6ZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIDQgNSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL2h0bWx7bGluZS1oZWlnaHQ6MS4xNTstd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6MTAwJX1ib2R5e21hcmdpbjowfWgxe2ZvbnQtc2l6ZToyZW07bWFyZ2luOi42N2VtIDB9aHJ7Ym94LXNpemluZzpjb250ZW50LWJveDtoZWlnaHQ6MDtvdmVyZmxvdzp2aXNpYmxlfXByZXtmb250LWZhbWlseTptb25vc3BhY2UsbW9ub3NwYWNlO2ZvbnQtc2l6ZToxZW19YXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fWFiYnJbdGl0bGVde2JvcmRlci1ib3R0b206bm9uZTt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lO3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmUgZG90dGVkfWIsc3Ryb25ne2ZvbnQtd2VpZ2h0OmJvbGRlcn1jb2RlLGtiZCxzYW1we2ZvbnQtZmFtaWx5Om1vbm9zcGFjZSxtb25vc3BhY2U7Zm9udC1zaXplOjFlbX1zbWFsbHtmb250LXNpemU6ODAlfXN1YixzdXB7Zm9udC1zaXplOjc1JTtsaW5lLWhlaWdodDowO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfXN1Yntib3R0b206LS4yNWVtfXN1cHt0b3A6LS41ZW19aW1ne2JvcmRlci1zdHlsZTpub25lfWJ1dHRvbixpbnB1dCxvcHRncm91cCxzZWxlY3QsdGV4dGFyZWF7Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6MTAwJTtsaW5lLWhlaWdodDoxLjE1O21hcmdpbjowfWJ1dHRvbixpbnB1dHtvdmVyZmxvdzp2aXNpYmxlfWJ1dHRvbixzZWxlY3R7dGV4dC10cmFuc2Zvcm06bm9uZX1bdHlwZT1idXR0b25dLFt0eXBlPXJlc2V0XSxbdHlwZT1zdWJtaXRdLGJ1dHRvbnstd2Via2l0LWFwcGVhcmFuY2U6YnV0dG9ufVt0eXBlPWJ1dHRvbl06Oi1tb3otZm9jdXMtaW5uZXIsW3R5cGU9cmVzZXRdOjotbW96LWZvY3VzLWlubmVyLFt0eXBlPXN1Ym1pdF06Oi1tb3otZm9jdXMtaW5uZXIsYnV0dG9uOjotbW96LWZvY3VzLWlubmVye2JvcmRlci1zdHlsZTpub25lO3BhZGRpbmc6MH1bdHlwZT1idXR0b25dOi1tb3otZm9jdXNyaW5nLFt0eXBlPXJlc2V0XTotbW96LWZvY3VzcmluZyxbdHlwZT1zdWJtaXRdOi1tb3otZm9jdXNyaW5nLGJ1dHRvbjotbW96LWZvY3VzcmluZ3tvdXRsaW5lOjFweCBkb3R0ZWQgQnV0dG9uVGV4dH1maWVsZHNldHtwYWRkaW5nOi4zNWVtIC43NWVtIC42MjVlbX1sZWdlbmR7Ym94LXNpemluZzpib3JkZXItYm94O2NvbG9yOmluaGVyaXQ7ZGlzcGxheTp0YWJsZTttYXgtd2lkdGg6MTAwJTtwYWRkaW5nOjA7d2hpdGUtc3BhY2U6bm9ybWFsfXByb2dyZXNze3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfXRleHRhcmVhe292ZXJmbG93OmF1dG99W3R5cGU9Y2hlY2tib3hdLFt0eXBlPXJhZGlvXXtib3gtc2l6aW5nOmJvcmRlci1ib3g7cGFkZGluZzowfVt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sW3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbntoZWlnaHQ6YXV0b31bdHlwZT1zZWFyY2hdey13ZWJraXQtYXBwZWFyYW5jZTp0ZXh0ZmllbGQ7b3V0bGluZS1vZmZzZXQ6LTJweH1bdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uey13ZWJraXQtYXBwZWFyYW5jZTpub25lfTo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b257LXdlYmtpdC1hcHBlYXJhbmNlOmJ1dHRvbjtmb250OmluaGVyaXR9ZGV0YWlsc3tkaXNwbGF5OmJsb2NrfXN1bW1hcnl7ZGlzcGxheTpsaXN0LWl0ZW19W2hpZGRlbl0sdGVtcGxhdGV7ZGlzcGxheTpub25lfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMyEuL3NyYy9jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMgNCA1IiwicmVxdWlyZShcIiEhRDpcXFxccHJvamVjdFxcXFxwaHBcXFxcd3d3XFxcXHdlYi1hclxcXFxub2RlX21vZHVsZXNcXFxcc2NyaXB0LWxvYWRlclxcXFxhZGRTY3JpcHQuanNcIikocmVxdWlyZShcIiEhRDpcXFxccHJvamVjdFxcXFxwaHBcXFxcd3d3XFxcXHdlYi1hclxcXFxub2RlX21vZHVsZXNcXFxccmF3LWxvYWRlclxcXFxpbmRleC5qcyFEOlxcXFxwcm9qZWN0XFxcXHBocFxcXFx3d3dcXFxcd2ViLWFyXFxcXHNyY1xcXFxsaWJcXFxcanF1ZXJ5XFxcXGpxdWVyeS0zLjMuMS5taW4uanNcIikpXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2NyaXB0LWxvYWRlciEuL3NyYy9saWIvanF1ZXJ5L2pxdWVyeS0zLjMuMS5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0gXCIvKiEgalF1ZXJ5IHYzLjMuMSB8IChjKSBKUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBqcXVlcnkub3JnL2xpY2Vuc2UgKi9cXG4hZnVuY3Rpb24oZSx0KXtcXFwidXNlIHN0cmljdFxcXCI7XFxcIm9iamVjdFxcXCI9PXR5cGVvZiBtb2R1bGUmJlxcXCJvYmplY3RcXFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZS5kb2N1bWVudD90KGUsITApOmZ1bmN0aW9uKGUpe2lmKCFlLmRvY3VtZW50KXRocm93IG5ldyBFcnJvcihcXFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFxcXCIpO3JldHVybiB0KGUpfTp0KGUpfShcXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dGhpcyxmdW5jdGlvbihlLHQpe1xcXCJ1c2Ugc3RyaWN0XFxcIjt2YXIgbj1bXSxyPWUuZG9jdW1lbnQsaT1PYmplY3QuZ2V0UHJvdG90eXBlT2Ysbz1uLnNsaWNlLGE9bi5jb25jYXQscz1uLnB1c2gsdT1uLmluZGV4T2YsbD17fSxjPWwudG9TdHJpbmcsZj1sLmhhc093blByb3BlcnR5LHA9Zi50b1N0cmluZyxkPXAuY2FsbChPYmplY3QpLGg9e30sZz1mdW5jdGlvbiBlKHQpe3JldHVyblxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiB0JiZcXFwibnVtYmVyXFxcIiE9dHlwZW9mIHQubm9kZVR5cGV9LHk9ZnVuY3Rpb24gZSh0KXtyZXR1cm4gbnVsbCE9dCYmdD09PXQud2luZG93fSx2PXt0eXBlOiEwLHNyYzohMCxub01vZHVsZTohMH07ZnVuY3Rpb24gbShlLHQsbil7dmFyIGksbz0odD10fHxyKS5jcmVhdGVFbGVtZW50KFxcXCJzY3JpcHRcXFwiKTtpZihvLnRleHQ9ZSxuKWZvcihpIGluIHYpbltpXSYmKG9baV09bltpXSk7dC5oZWFkLmFwcGVuZENoaWxkKG8pLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobyl9ZnVuY3Rpb24geChlKXtyZXR1cm4gbnVsbD09ZT9lK1xcXCJcXFwiOlxcXCJvYmplY3RcXFwiPT10eXBlb2YgZXx8XFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIGU/bFtjLmNhbGwoZSldfHxcXFwib2JqZWN0XFxcIjp0eXBlb2YgZX12YXIgYj1cXFwiMy4zLjFcXFwiLHc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IHcuZm4uaW5pdChlLHQpfSxUPS9eW1xcXFxzXFxcXHVGRUZGXFxcXHhBMF0rfFtcXFxcc1xcXFx1RkVGRlxcXFx4QTBdKyQvZzt3LmZuPXcucHJvdG90eXBlPXtqcXVlcnk6XFxcIjMuMy4xXFxcIixjb25zdHJ1Y3Rvcjp3LGxlbmd0aDowLHRvQXJyYXk6ZnVuY3Rpb24oKXtyZXR1cm4gby5jYWxsKHRoaXMpfSxnZXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PWU/by5jYWxsKHRoaXMpOmU8MD90aGlzW2UrdGhpcy5sZW5ndGhdOnRoaXNbZV19LHB1c2hTdGFjazpmdW5jdGlvbihlKXt2YXIgdD13Lm1lcmdlKHRoaXMuY29uc3RydWN0b3IoKSxlKTtyZXR1cm4gdC5wcmV2T2JqZWN0PXRoaXMsdH0sZWFjaDpmdW5jdGlvbihlKXtyZXR1cm4gdy5lYWNoKHRoaXMsZSl9LG1hcDpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2sody5tYXAodGhpcyxmdW5jdGlvbih0LG4pe3JldHVybiBlLmNhbGwodCxuLHQpfSkpfSxzbGljZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnB1c2hTdGFjayhvLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LGZpcnN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXEoMCl9LGxhc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lcSgtMSl9LGVxOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMubGVuZ3RoLG49K2UrKGU8MD90OjApO3JldHVybiB0aGlzLnB1c2hTdGFjayhuPj0wJiZuPHQ/W3RoaXNbbl1dOltdKX0sZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucHJldk9iamVjdHx8dGhpcy5jb25zdHJ1Y3RvcigpfSxwdXNoOnMsc29ydDpuLnNvcnQsc3BsaWNlOm4uc3BsaWNlfSx3LmV4dGVuZD13LmZuLmV4dGVuZD1mdW5jdGlvbigpe3ZhciBlLHQsbixyLGksbyxhPWFyZ3VtZW50c1swXXx8e30scz0xLHU9YXJndW1lbnRzLmxlbmd0aCxsPSExO2ZvcihcXFwiYm9vbGVhblxcXCI9PXR5cGVvZiBhJiYobD1hLGE9YXJndW1lbnRzW3NdfHx7fSxzKyspLFxcXCJvYmplY3RcXFwiPT10eXBlb2YgYXx8ZyhhKXx8KGE9e30pLHM9PT11JiYoYT10aGlzLHMtLSk7czx1O3MrKylpZihudWxsIT0oZT1hcmd1bWVudHNbc10pKWZvcih0IGluIGUpbj1hW3RdLGEhPT0ocj1lW3RdKSYmKGwmJnImJih3LmlzUGxhaW5PYmplY3Qocil8fChpPUFycmF5LmlzQXJyYXkocikpKT8oaT8oaT0hMSxvPW4mJkFycmF5LmlzQXJyYXkobik/bjpbXSk6bz1uJiZ3LmlzUGxhaW5PYmplY3Qobik/bjp7fSxhW3RdPXcuZXh0ZW5kKGwsbyxyKSk6dm9pZCAwIT09ciYmKGFbdF09cikpO3JldHVybiBhfSx3LmV4dGVuZCh7ZXhwYW5kbzpcXFwialF1ZXJ5XFxcIisoXFxcIjMuMy4xXFxcIitNYXRoLnJhbmRvbSgpKS5yZXBsYWNlKC9cXFxcRC9nLFxcXCJcXFwiKSxpc1JlYWR5OiEwLGVycm9yOmZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihlKX0sbm9vcDpmdW5jdGlvbigpe30saXNQbGFpbk9iamVjdDpmdW5jdGlvbihlKXt2YXIgdCxuO3JldHVybiEoIWV8fFxcXCJbb2JqZWN0IE9iamVjdF1cXFwiIT09Yy5jYWxsKGUpKSYmKCEodD1pKGUpKXx8XFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mKG49Zi5jYWxsKHQsXFxcImNvbnN0cnVjdG9yXFxcIikmJnQuY29uc3RydWN0b3IpJiZwLmNhbGwobik9PT1kKX0saXNFbXB0eU9iamVjdDpmdW5jdGlvbihlKXt2YXIgdDtmb3IodCBpbiBlKXJldHVybiExO3JldHVybiEwfSxnbG9iYWxFdmFsOmZ1bmN0aW9uKGUpe20oZSl9LGVhY2g6ZnVuY3Rpb24oZSx0KXt2YXIgbixyPTA7aWYoQyhlKSl7Zm9yKG49ZS5sZW5ndGg7cjxuO3IrKylpZighMT09PXQuY2FsbChlW3JdLHIsZVtyXSkpYnJlYWt9ZWxzZSBmb3IociBpbiBlKWlmKCExPT09dC5jYWxsKGVbcl0scixlW3JdKSlicmVhaztyZXR1cm4gZX0sdHJpbTpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbD09ZT9cXFwiXFxcIjooZStcXFwiXFxcIikucmVwbGFjZShULFxcXCJcXFwiKX0sbWFrZUFycmF5OmZ1bmN0aW9uKGUsdCl7dmFyIG49dHx8W107cmV0dXJuIG51bGwhPWUmJihDKE9iamVjdChlKSk/dy5tZXJnZShuLFxcXCJzdHJpbmdcXFwiPT10eXBlb2YgZT9bZV06ZSk6cy5jYWxsKG4sZSkpLG59LGluQXJyYXk6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBudWxsPT10Py0xOnUuY2FsbCh0LGUsbil9LG1lcmdlOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPSt0Lmxlbmd0aCxyPTAsaT1lLmxlbmd0aDtyPG47cisrKWVbaSsrXT10W3JdO3JldHVybiBlLmxlbmd0aD1pLGV9LGdyZXA6ZnVuY3Rpb24oZSx0LG4pe2Zvcih2YXIgcixpPVtdLG89MCxhPWUubGVuZ3RoLHM9IW47bzxhO28rKykocj0hdChlW29dLG8pKSE9PXMmJmkucHVzaChlW29dKTtyZXR1cm4gaX0sbWFwOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcixpLG89MCxzPVtdO2lmKEMoZSkpZm9yKHI9ZS5sZW5ndGg7bzxyO28rKyludWxsIT0oaT10KGVbb10sbyxuKSkmJnMucHVzaChpKTtlbHNlIGZvcihvIGluIGUpbnVsbCE9KGk9dChlW29dLG8sbikpJiZzLnB1c2goaSk7cmV0dXJuIGEuYXBwbHkoW10scyl9LGd1aWQ6MSxzdXBwb3J0Omh9KSxcXFwiZnVuY3Rpb25cXFwiPT10eXBlb2YgU3ltYm9sJiYody5mbltTeW1ib2wuaXRlcmF0b3JdPW5bU3ltYm9sLml0ZXJhdG9yXSksdy5lYWNoKFxcXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFxcXCIuc3BsaXQoXFxcIiBcXFwiKSxmdW5jdGlvbihlLHQpe2xbXFxcIltvYmplY3QgXFxcIit0K1xcXCJdXFxcIl09dC50b0xvd2VyQ2FzZSgpfSk7ZnVuY3Rpb24gQyhlKXt2YXIgdD0hIWUmJlxcXCJsZW5ndGhcXFwiaW4gZSYmZS5sZW5ndGgsbj14KGUpO3JldHVybiFnKGUpJiYheShlKSYmKFxcXCJhcnJheVxcXCI9PT1ufHwwPT09dHx8XFxcIm51bWJlclxcXCI9PXR5cGVvZiB0JiZ0PjAmJnQtMSBpbiBlKX12YXIgRT1mdW5jdGlvbihlKXt2YXIgdCxuLHIsaSxvLGEscyx1LGwsYyxmLHAsZCxoLGcseSx2LG0seCxiPVxcXCJzaXp6bGVcXFwiKzEqbmV3IERhdGUsdz1lLmRvY3VtZW50LFQ9MCxDPTAsRT1hZSgpLGs9YWUoKSxTPWFlKCksRD1mdW5jdGlvbihlLHQpe3JldHVybiBlPT09dCYmKGY9ITApLDB9LE49e30uaGFzT3duUHJvcGVydHksQT1bXSxqPUEucG9wLHE9QS5wdXNoLEw9QS5wdXNoLEg9QS5zbGljZSxPPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPTAscj1lLmxlbmd0aDtuPHI7bisrKWlmKGVbbl09PT10KXJldHVybiBuO3JldHVybi0xfSxQPVxcXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFxcXCIsTT1cXFwiW1xcXFxcXFxceDIwXFxcXFxcXFx0XFxcXFxcXFxyXFxcXFxcXFxuXFxcXFxcXFxmXVxcXCIsUj1cXFwiKD86XFxcXFxcXFxcXFxcXFxcXC58W1xcXFxcXFxcdy1dfFteXFxcXDAtXFxcXFxcXFx4YTBdKStcXFwiLEk9XFxcIlxcXFxcXFxcW1xcXCIrTStcXFwiKihcXFwiK1IrXFxcIikoPzpcXFwiK00rXFxcIiooWypeJHwhfl0/PSlcXFwiK00rXFxcIiooPzonKCg/OlxcXFxcXFxcXFxcXFxcXFwufFteXFxcXFxcXFxcXFxcXFxcXCddKSopJ3xcXFxcXFxcIigoPzpcXFxcXFxcXFxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcIl0pKilcXFxcXFxcInwoXFxcIitSK1xcXCIpKXwpXFxcIitNK1xcXCIqXFxcXFxcXFxdXFxcIixXPVxcXCI6KFxcXCIrUitcXFwiKSg/OlxcXFxcXFxcKCgoJygoPzpcXFxcXFxcXFxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcXFxcXFwnXSkqKSd8XFxcXFxcXCIoKD86XFxcXFxcXFxcXFxcXFxcXC58W15cXFxcXFxcXFxcXFxcXFxcXFxcXFxcXCJdKSopXFxcXFxcXCIpfCgoPzpcXFxcXFxcXFxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcXFxcXFwoKVtcXFxcXFxcXF1dfFxcXCIrSStcXFwiKSopfC4qKVxcXFxcXFxcKXwpXFxcIiwkPW5ldyBSZWdFeHAoTStcXFwiK1xcXCIsXFxcImdcXFwiKSxCPW5ldyBSZWdFeHAoXFxcIl5cXFwiK00rXFxcIit8KCg/Ol58W15cXFxcXFxcXFxcXFxcXFxcXSkoPzpcXFxcXFxcXFxcXFxcXFxcLikqKVxcXCIrTStcXFwiKyRcXFwiLFxcXCJnXFxcIiksRj1uZXcgUmVnRXhwKFxcXCJeXFxcIitNK1xcXCIqLFxcXCIrTStcXFwiKlxcXCIpLF89bmV3IFJlZ0V4cChcXFwiXlxcXCIrTStcXFwiKihbPit+XXxcXFwiK00rXFxcIilcXFwiK00rXFxcIipcXFwiKSx6PW5ldyBSZWdFeHAoXFxcIj1cXFwiK00rXFxcIiooW15cXFxcXFxcXF0nXFxcXFxcXCJdKj8pXFxcIitNK1xcXCIqXFxcXFxcXFxdXFxcIixcXFwiZ1xcXCIpLFg9bmV3IFJlZ0V4cChXKSxVPW5ldyBSZWdFeHAoXFxcIl5cXFwiK1IrXFxcIiRcXFwiKSxWPXtJRDpuZXcgUmVnRXhwKFxcXCJeIyhcXFwiK1IrXFxcIilcXFwiKSxDTEFTUzpuZXcgUmVnRXhwKFxcXCJeXFxcXFxcXFwuKFxcXCIrUitcXFwiKVxcXCIpLFRBRzpuZXcgUmVnRXhwKFxcXCJeKFxcXCIrUitcXFwifFsqXSlcXFwiKSxBVFRSOm5ldyBSZWdFeHAoXFxcIl5cXFwiK0kpLFBTRVVETzpuZXcgUmVnRXhwKFxcXCJeXFxcIitXKSxDSElMRDpuZXcgUmVnRXhwKFxcXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcXFxcXChcXFwiK00rXFxcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXFxcXFxkKilufClcXFwiK00rXFxcIiooPzooWystXXwpXFxcIitNK1xcXCIqKFxcXFxcXFxcZCspfCkpXFxcIitNK1xcXCIqXFxcXFxcXFwpfClcXFwiLFxcXCJpXFxcIiksYm9vbDpuZXcgUmVnRXhwKFxcXCJeKD86XFxcIitQK1xcXCIpJFxcXCIsXFxcImlcXFwiKSxuZWVkc0NvbnRleHQ6bmV3IFJlZ0V4cChcXFwiXlxcXCIrTStcXFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXFxcXFwoXFxcIitNK1xcXCIqKCg/Oi1cXFxcXFxcXGQpP1xcXFxcXFxcZCopXFxcIitNK1xcXCIqXFxcXFxcXFwpfCkoPz1bXi1dfCQpXFxcIixcXFwiaVxcXCIpfSxHPS9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksWT0vXmhcXFxcZCQvaSxRPS9eW157XStcXFxce1xcXFxzKlxcXFxbbmF0aXZlIFxcXFx3LyxKPS9eKD86IyhbXFxcXHctXSspfChcXFxcdyspfFxcXFwuKFtcXFxcdy1dKykpJC8sSz0vWyt+XS8sWj1uZXcgUmVnRXhwKFxcXCJcXFxcXFxcXFxcXFxcXFxcKFtcXFxcXFxcXGRhLWZdezEsNn1cXFwiK00rXFxcIj98KFxcXCIrTStcXFwiKXwuKVxcXCIsXFxcImlnXFxcIiksZWU9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPVxcXCIweFxcXCIrdC02NTUzNjtyZXR1cm4gciE9PXJ8fG4/dDpyPDA/U3RyaW5nLmZyb21DaGFyQ29kZShyKzY1NTM2KTpTdHJpbmcuZnJvbUNoYXJDb2RlKHI+PjEwfDU1Mjk2LDEwMjMmcnw1NjMyMCl9LHRlPS8oW1xcXFwwLVxcXFx4MWZcXFxceDdmXXxeLT9cXFxcZCl8Xi0kfFteXFxcXDAtXFxcXHgxZlxcXFx4N2YtXFxcXHVGRkZGXFxcXHctXS9nLG5lPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ/XFxcIlxcXFwwXFxcIj09PWU/XFxcIlxcXFx1ZmZmZFxcXCI6ZS5zbGljZSgwLC0xKStcXFwiXFxcXFxcXFxcXFwiK2UuY2hhckNvZGVBdChlLmxlbmd0aC0xKS50b1N0cmluZygxNikrXFxcIiBcXFwiOlxcXCJcXFxcXFxcXFxcXCIrZX0scmU9ZnVuY3Rpb24oKXtwKCl9LGllPW1lKGZ1bmN0aW9uKGUpe3JldHVybiEwPT09ZS5kaXNhYmxlZCYmKFxcXCJmb3JtXFxcImluIGV8fFxcXCJsYWJlbFxcXCJpbiBlKX0se2RpcjpcXFwicGFyZW50Tm9kZVxcXCIsbmV4dDpcXFwibGVnZW5kXFxcIn0pO3RyeXtMLmFwcGx5KEE9SC5jYWxsKHcuY2hpbGROb2Rlcyksdy5jaGlsZE5vZGVzKSxBW3cuY2hpbGROb2Rlcy5sZW5ndGhdLm5vZGVUeXBlfWNhdGNoKGUpe0w9e2FwcGx5OkEubGVuZ3RoP2Z1bmN0aW9uKGUsdCl7cS5hcHBseShlLEguY2FsbCh0KSl9OmZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5sZW5ndGgscj0wO3doaWxlKGVbbisrXT10W3IrK10pO2UubGVuZ3RoPW4tMX19fWZ1bmN0aW9uIG9lKGUsdCxyLGkpe3ZhciBvLHMsbCxjLGYsaCx2LG09dCYmdC5vd25lckRvY3VtZW50LFQ9dD90Lm5vZGVUeXBlOjk7aWYocj1yfHxbXSxcXFwic3RyaW5nXFxcIiE9dHlwZW9mIGV8fCFlfHwxIT09VCYmOSE9PVQmJjExIT09VClyZXR1cm4gcjtpZighaSYmKCh0P3Qub3duZXJEb2N1bWVudHx8dDp3KSE9PWQmJnAodCksdD10fHxkLGcpKXtpZigxMSE9PVQmJihmPUouZXhlYyhlKSkpaWYobz1mWzFdKXtpZig5PT09VCl7aWYoIShsPXQuZ2V0RWxlbWVudEJ5SWQobykpKXJldHVybiByO2lmKGwuaWQ9PT1vKXJldHVybiByLnB1c2gobCkscn1lbHNlIGlmKG0mJihsPW0uZ2V0RWxlbWVudEJ5SWQobykpJiZ4KHQsbCkmJmwuaWQ9PT1vKXJldHVybiByLnB1c2gobCkscn1lbHNle2lmKGZbMl0pcmV0dXJuIEwuYXBwbHkocix0LmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpKSxyO2lmKChvPWZbM10pJiZuLmdldEVsZW1lbnRzQnlDbGFzc05hbWUmJnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSlyZXR1cm4gTC5hcHBseShyLHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShvKSkscn1pZihuLnFzYSYmIVNbZStcXFwiIFxcXCJdJiYoIXl8fCF5LnRlc3QoZSkpKXtpZigxIT09VCltPXQsdj1lO2Vsc2UgaWYoXFxcIm9iamVjdFxcXCIhPT10Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpeyhjPXQuZ2V0QXR0cmlidXRlKFxcXCJpZFxcXCIpKT9jPWMucmVwbGFjZSh0ZSxuZSk6dC5zZXRBdHRyaWJ1dGUoXFxcImlkXFxcIixjPWIpLHM9KGg9YShlKSkubGVuZ3RoO3doaWxlKHMtLSloW3NdPVxcXCIjXFxcIitjK1xcXCIgXFxcIit2ZShoW3NdKTt2PWguam9pbihcXFwiLFxcXCIpLG09Sy50ZXN0KGUpJiZnZSh0LnBhcmVudE5vZGUpfHx0fWlmKHYpdHJ5e3JldHVybiBMLmFwcGx5KHIsbS5xdWVyeVNlbGVjdG9yQWxsKHYpKSxyfWNhdGNoKGUpe31maW5hbGx5e2M9PT1iJiZ0LnJlbW92ZUF0dHJpYnV0ZShcXFwiaWRcXFwiKX19fXJldHVybiB1KGUucmVwbGFjZShCLFxcXCIkMVxcXCIpLHQscixpKX1mdW5jdGlvbiBhZSgpe3ZhciBlPVtdO2Z1bmN0aW9uIHQobixpKXtyZXR1cm4gZS5wdXNoKG4rXFxcIiBcXFwiKT5yLmNhY2hlTGVuZ3RoJiZkZWxldGUgdFtlLnNoaWZ0KCldLHRbbitcXFwiIFxcXCJdPWl9cmV0dXJuIHR9ZnVuY3Rpb24gc2UoZSl7cmV0dXJuIGVbYl09ITAsZX1mdW5jdGlvbiB1ZShlKXt2YXIgdD1kLmNyZWF0ZUVsZW1lbnQoXFxcImZpZWxkc2V0XFxcIik7dHJ5e3JldHVybiEhZSh0KX1jYXRjaChlKXtyZXR1cm4hMX1maW5hbGx5e3QucGFyZW50Tm9kZSYmdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHQpLHQ9bnVsbH19ZnVuY3Rpb24gbGUoZSx0KXt2YXIgbj1lLnNwbGl0KFxcXCJ8XFxcIiksaT1uLmxlbmd0aDt3aGlsZShpLS0pci5hdHRySGFuZGxlW25baV1dPXR9ZnVuY3Rpb24gY2UoZSx0KXt2YXIgbj10JiZlLHI9biYmMT09PWUubm9kZVR5cGUmJjE9PT10Lm5vZGVUeXBlJiZlLnNvdXJjZUluZGV4LXQuc291cmNlSW5kZXg7aWYocilyZXR1cm4gcjtpZihuKXdoaWxlKG49bi5uZXh0U2libGluZylpZihuPT09dClyZXR1cm4tMTtyZXR1cm4gZT8xOi0xfWZ1bmN0aW9uIGZlKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm5cXFwiaW5wdXRcXFwiPT09dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpJiZ0LnR5cGU9PT1lfX1mdW5jdGlvbiBwZShlKXtyZXR1cm4gZnVuY3Rpb24odCl7dmFyIG49dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVybihcXFwiaW5wdXRcXFwiPT09bnx8XFxcImJ1dHRvblxcXCI9PT1uKSYmdC50eXBlPT09ZX19ZnVuY3Rpb24gZGUoZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVyblxcXCJmb3JtXFxcImluIHQ/dC5wYXJlbnROb2RlJiYhMT09PXQuZGlzYWJsZWQ/XFxcImxhYmVsXFxcImluIHQ/XFxcImxhYmVsXFxcImluIHQucGFyZW50Tm9kZT90LnBhcmVudE5vZGUuZGlzYWJsZWQ9PT1lOnQuZGlzYWJsZWQ9PT1lOnQuaXNEaXNhYmxlZD09PWV8fHQuaXNEaXNhYmxlZCE9PSFlJiZpZSh0KT09PWU6dC5kaXNhYmxlZD09PWU6XFxcImxhYmVsXFxcImluIHQmJnQuZGlzYWJsZWQ9PT1lfX1mdW5jdGlvbiBoZShlKXtyZXR1cm4gc2UoZnVuY3Rpb24odCl7cmV0dXJuIHQ9K3Qsc2UoZnVuY3Rpb24obixyKXt2YXIgaSxvPWUoW10sbi5sZW5ndGgsdCksYT1vLmxlbmd0aDt3aGlsZShhLS0pbltpPW9bYV1dJiYobltpXT0hKHJbaV09bltpXSkpfSl9KX1mdW5jdGlvbiBnZShlKXtyZXR1cm4gZSYmXFxcInVuZGVmaW5lZFxcXCIhPXR5cGVvZiBlLmdldEVsZW1lbnRzQnlUYWdOYW1lJiZlfW49b2Uuc3VwcG9ydD17fSxvPW9lLmlzWE1MPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJihlLm93bmVyRG9jdW1lbnR8fGUpLmRvY3VtZW50RWxlbWVudDtyZXR1cm4hIXQmJlxcXCJIVE1MXFxcIiE9PXQubm9kZU5hbWV9LHA9b2Uuc2V0RG9jdW1lbnQ9ZnVuY3Rpb24oZSl7dmFyIHQsaSxhPWU/ZS5vd25lckRvY3VtZW50fHxlOnc7cmV0dXJuIGEhPT1kJiY5PT09YS5ub2RlVHlwZSYmYS5kb2N1bWVudEVsZW1lbnQ/KGQ9YSxoPWQuZG9jdW1lbnRFbGVtZW50LGc9IW8oZCksdyE9PWQmJihpPWQuZGVmYXVsdFZpZXcpJiZpLnRvcCE9PWkmJihpLmFkZEV2ZW50TGlzdGVuZXI/aS5hZGRFdmVudExpc3RlbmVyKFxcXCJ1bmxvYWRcXFwiLHJlLCExKTppLmF0dGFjaEV2ZW50JiZpLmF0dGFjaEV2ZW50KFxcXCJvbnVubG9hZFxcXCIscmUpKSxuLmF0dHJpYnV0ZXM9dWUoZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2xhc3NOYW1lPVxcXCJpXFxcIiwhZS5nZXRBdHRyaWJ1dGUoXFxcImNsYXNzTmFtZVxcXCIpfSksbi5nZXRFbGVtZW50c0J5VGFnTmFtZT11ZShmdW5jdGlvbihlKXtyZXR1cm4gZS5hcHBlbmRDaGlsZChkLmNyZWF0ZUNvbW1lbnQoXFxcIlxcXCIpKSwhZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcXFwiKlxcXCIpLmxlbmd0aH0pLG4uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZT1RLnRlc3QoZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSxuLmdldEJ5SWQ9dWUoZnVuY3Rpb24oZSl7cmV0dXJuIGguYXBwZW5kQ2hpbGQoZSkuaWQ9YiwhZC5nZXRFbGVtZW50c0J5TmFtZXx8IWQuZ2V0RWxlbWVudHNCeU5hbWUoYikubGVuZ3RofSksbi5nZXRCeUlkPyhyLmZpbHRlci5JRD1mdW5jdGlvbihlKXt2YXIgdD1lLnJlcGxhY2UoWixlZSk7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZShcXFwiaWRcXFwiKT09PXR9fSxyLmZpbmQuSUQ9ZnVuY3Rpb24oZSx0KXtpZihcXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIHQuZ2V0RWxlbWVudEJ5SWQmJmcpe3ZhciBuPXQuZ2V0RWxlbWVudEJ5SWQoZSk7cmV0dXJuIG4/W25dOltdfX0pOihyLmZpbHRlci5JRD1mdW5jdGlvbihlKXt2YXIgdD1lLnJlcGxhY2UoWixlZSk7cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciBuPVxcXCJ1bmRlZmluZWRcXFwiIT10eXBlb2YgZS5nZXRBdHRyaWJ1dGVOb2RlJiZlLmdldEF0dHJpYnV0ZU5vZGUoXFxcImlkXFxcIik7cmV0dXJuIG4mJm4udmFsdWU9PT10fX0sci5maW5kLklEPWZ1bmN0aW9uKGUsdCl7aWYoXFxcInVuZGVmaW5lZFxcXCIhPXR5cGVvZiB0LmdldEVsZW1lbnRCeUlkJiZnKXt2YXIgbixyLGksbz10LmdldEVsZW1lbnRCeUlkKGUpO2lmKG8pe2lmKChuPW8uZ2V0QXR0cmlidXRlTm9kZShcXFwiaWRcXFwiKSkmJm4udmFsdWU9PT1lKXJldHVybltvXTtpPXQuZ2V0RWxlbWVudHNCeU5hbWUoZSkscj0wO3doaWxlKG89aVtyKytdKWlmKChuPW8uZ2V0QXR0cmlidXRlTm9kZShcXFwiaWRcXFwiKSkmJm4udmFsdWU9PT1lKXJldHVybltvXX1yZXR1cm5bXX19KSxyLmZpbmQuVEFHPW4uZ2V0RWxlbWVudHNCeVRhZ05hbWU/ZnVuY3Rpb24oZSx0KXtyZXR1cm5cXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIHQuZ2V0RWxlbWVudHNCeVRhZ05hbWU/dC5nZXRFbGVtZW50c0J5VGFnTmFtZShlKTpuLnFzYT90LnF1ZXJ5U2VsZWN0b3JBbGwoZSk6dm9pZCAwfTpmdW5jdGlvbihlLHQpe3ZhciBuLHI9W10saT0wLG89dC5nZXRFbGVtZW50c0J5VGFnTmFtZShlKTtpZihcXFwiKlxcXCI9PT1lKXt3aGlsZShuPW9baSsrXSkxPT09bi5ub2RlVHlwZSYmci5wdXNoKG4pO3JldHVybiByfXJldHVybiBvfSxyLmZpbmQuQ0xBU1M9bi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lJiZmdW5jdGlvbihlLHQpe2lmKFxcXCJ1bmRlZmluZWRcXFwiIT10eXBlb2YgdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lJiZnKXJldHVybiB0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZSl9LHY9W10seT1bXSwobi5xc2E9US50ZXN0KGQucXVlcnlTZWxlY3RvckFsbCkpJiYodWUoZnVuY3Rpb24oZSl7aC5hcHBlbmRDaGlsZChlKS5pbm5lckhUTUw9XFxcIjxhIGlkPSdcXFwiK2IrXFxcIic+PC9hPjxzZWxlY3QgaWQ9J1xcXCIrYitcXFwiLVxcXFxyXFxcXFxcXFwnIG1zYWxsb3djYXB0dXJlPScnPjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XFxcIixlLnF1ZXJ5U2VsZWN0b3JBbGwoXFxcIlttc2FsbG93Y2FwdHVyZV49JyddXFxcIikubGVuZ3RoJiZ5LnB1c2goXFxcIlsqXiRdPVxcXCIrTStcXFwiKig/OicnfFxcXFxcXFwiXFxcXFxcXCIpXFxcIiksZS5xdWVyeVNlbGVjdG9yQWxsKFxcXCJbc2VsZWN0ZWRdXFxcIikubGVuZ3RofHx5LnB1c2goXFxcIlxcXFxcXFxcW1xcXCIrTStcXFwiKig/OnZhbHVlfFxcXCIrUCtcXFwiKVxcXCIpLGUucXVlcnlTZWxlY3RvckFsbChcXFwiW2lkfj1cXFwiK2IrXFxcIi1dXFxcIikubGVuZ3RofHx5LnB1c2goXFxcIn49XFxcIiksZS5xdWVyeVNlbGVjdG9yQWxsKFxcXCI6Y2hlY2tlZFxcXCIpLmxlbmd0aHx8eS5wdXNoKFxcXCI6Y2hlY2tlZFxcXCIpLGUucXVlcnlTZWxlY3RvckFsbChcXFwiYSNcXFwiK2IrXFxcIisqXFxcIikubGVuZ3RofHx5LnB1c2goXFxcIi4jLitbK35dXFxcIil9KSx1ZShmdW5jdGlvbihlKXtlLmlubmVySFRNTD1cXFwiPGEgaHJlZj0nJyBkaXNhYmxlZD0nZGlzYWJsZWQnPjwvYT48c2VsZWN0IGRpc2FibGVkPSdkaXNhYmxlZCc+PG9wdGlvbi8+PC9zZWxlY3Q+XFxcIjt2YXIgdD1kLmNyZWF0ZUVsZW1lbnQoXFxcImlucHV0XFxcIik7dC5zZXRBdHRyaWJ1dGUoXFxcInR5cGVcXFwiLFxcXCJoaWRkZW5cXFwiKSxlLmFwcGVuZENoaWxkKHQpLnNldEF0dHJpYnV0ZShcXFwibmFtZVxcXCIsXFxcIkRcXFwiKSxlLnF1ZXJ5U2VsZWN0b3JBbGwoXFxcIltuYW1lPWRdXFxcIikubGVuZ3RoJiZ5LnB1c2goXFxcIm5hbWVcXFwiK00rXFxcIipbKl4kfCF+XT89XFxcIiksMiE9PWUucXVlcnlTZWxlY3RvckFsbChcXFwiOmVuYWJsZWRcXFwiKS5sZW5ndGgmJnkucHVzaChcXFwiOmVuYWJsZWRcXFwiLFxcXCI6ZGlzYWJsZWRcXFwiKSxoLmFwcGVuZENoaWxkKGUpLmRpc2FibGVkPSEwLDIhPT1lLnF1ZXJ5U2VsZWN0b3JBbGwoXFxcIjpkaXNhYmxlZFxcXCIpLmxlbmd0aCYmeS5wdXNoKFxcXCI6ZW5hYmxlZFxcXCIsXFxcIjpkaXNhYmxlZFxcXCIpLGUucXVlcnlTZWxlY3RvckFsbChcXFwiKiw6eFxcXCIpLHkucHVzaChcXFwiLC4qOlxcXCIpfSkpLChuLm1hdGNoZXNTZWxlY3Rvcj1RLnRlc3QobT1oLm1hdGNoZXN8fGgud2Via2l0TWF0Y2hlc1NlbGVjdG9yfHxoLm1vek1hdGNoZXNTZWxlY3Rvcnx8aC5vTWF0Y2hlc1NlbGVjdG9yfHxoLm1zTWF0Y2hlc1NlbGVjdG9yKSkmJnVlKGZ1bmN0aW9uKGUpe24uZGlzY29ubmVjdGVkTWF0Y2g9bS5jYWxsKGUsXFxcIipcXFwiKSxtLmNhbGwoZSxcXFwiW3MhPScnXTp4XFxcIiksdi5wdXNoKFxcXCIhPVxcXCIsVyl9KSx5PXkubGVuZ3RoJiZuZXcgUmVnRXhwKHkuam9pbihcXFwifFxcXCIpKSx2PXYubGVuZ3RoJiZuZXcgUmVnRXhwKHYuam9pbihcXFwifFxcXCIpKSx0PVEudGVzdChoLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKSx4PXR8fFEudGVzdChoLmNvbnRhaW5zKT9mdW5jdGlvbihlLHQpe3ZhciBuPTk9PT1lLm5vZGVUeXBlP2UuZG9jdW1lbnRFbGVtZW50OmUscj10JiZ0LnBhcmVudE5vZGU7cmV0dXJuIGU9PT1yfHwhKCFyfHwxIT09ci5ub2RlVHlwZXx8IShuLmNvbnRhaW5zP24uY29udGFpbnMocik6ZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmMTYmZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihyKSkpfTpmdW5jdGlvbihlLHQpe2lmKHQpd2hpbGUodD10LnBhcmVudE5vZGUpaWYodD09PWUpcmV0dXJuITA7cmV0dXJuITF9LEQ9dD9mdW5jdGlvbihlLHQpe2lmKGU9PT10KXJldHVybiBmPSEwLDA7dmFyIHI9IWUuY29tcGFyZURvY3VtZW50UG9zaXRpb24tIXQuY29tcGFyZURvY3VtZW50UG9zaXRpb247cmV0dXJuIHJ8fCgxJihyPShlLm93bmVyRG9jdW1lbnR8fGUpPT09KHQub3duZXJEb2N1bWVudHx8dCk/ZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbih0KToxKXx8IW4uc29ydERldGFjaGVkJiZ0LmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGUpPT09cj9lPT09ZHx8ZS5vd25lckRvY3VtZW50PT09dyYmeCh3LGUpPy0xOnQ9PT1kfHx0Lm93bmVyRG9jdW1lbnQ9PT13JiZ4KHcsdCk/MTpjP08oYyxlKS1PKGMsdCk6MDo0JnI/LTE6MSl9OmZ1bmN0aW9uKGUsdCl7aWYoZT09PXQpcmV0dXJuIGY9ITAsMDt2YXIgbixyPTAsaT1lLnBhcmVudE5vZGUsbz10LnBhcmVudE5vZGUsYT1bZV0scz1bdF07aWYoIWl8fCFvKXJldHVybiBlPT09ZD8tMTp0PT09ZD8xOmk/LTE6bz8xOmM/TyhjLGUpLU8oYyx0KTowO2lmKGk9PT1vKXJldHVybiBjZShlLHQpO249ZTt3aGlsZShuPW4ucGFyZW50Tm9kZSlhLnVuc2hpZnQobik7bj10O3doaWxlKG49bi5wYXJlbnROb2RlKXMudW5zaGlmdChuKTt3aGlsZShhW3JdPT09c1tyXSlyKys7cmV0dXJuIHI/Y2UoYVtyXSxzW3JdKTphW3JdPT09dz8tMTpzW3JdPT09dz8xOjB9LGQpOmR9LG9lLm1hdGNoZXM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gb2UoZSxudWxsLG51bGwsdCl9LG9lLm1hdGNoZXNTZWxlY3Rvcj1mdW5jdGlvbihlLHQpe2lmKChlLm93bmVyRG9jdW1lbnR8fGUpIT09ZCYmcChlKSx0PXQucmVwbGFjZSh6LFxcXCI9JyQxJ11cXFwiKSxuLm1hdGNoZXNTZWxlY3RvciYmZyYmIVNbdCtcXFwiIFxcXCJdJiYoIXZ8fCF2LnRlc3QodCkpJiYoIXl8fCF5LnRlc3QodCkpKXRyeXt2YXIgcj1tLmNhbGwoZSx0KTtpZihyfHxuLmRpc2Nvbm5lY3RlZE1hdGNofHxlLmRvY3VtZW50JiYxMSE9PWUuZG9jdW1lbnQubm9kZVR5cGUpcmV0dXJuIHJ9Y2F0Y2goZSl7fXJldHVybiBvZSh0LGQsbnVsbCxbZV0pLmxlbmd0aD4wfSxvZS5jb250YWlucz1mdW5jdGlvbihlLHQpe3JldHVybihlLm93bmVyRG9jdW1lbnR8fGUpIT09ZCYmcChlKSx4KGUsdCl9LG9lLmF0dHI9ZnVuY3Rpb24oZSx0KXsoZS5vd25lckRvY3VtZW50fHxlKSE9PWQmJnAoZSk7dmFyIGk9ci5hdHRySGFuZGxlW3QudG9Mb3dlckNhc2UoKV0sbz1pJiZOLmNhbGwoci5hdHRySGFuZGxlLHQudG9Mb3dlckNhc2UoKSk/aShlLHQsIWcpOnZvaWQgMDtyZXR1cm4gdm9pZCAwIT09bz9vOm4uYXR0cmlidXRlc3x8IWc/ZS5nZXRBdHRyaWJ1dGUodCk6KG89ZS5nZXRBdHRyaWJ1dGVOb2RlKHQpKSYmby5zcGVjaWZpZWQ/by52YWx1ZTpudWxsfSxvZS5lc2NhcGU9ZnVuY3Rpb24oZSl7cmV0dXJuKGUrXFxcIlxcXCIpLnJlcGxhY2UodGUsbmUpfSxvZS5lcnJvcj1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXFxcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFxcXCIrZSl9LG9lLnVuaXF1ZVNvcnQ9ZnVuY3Rpb24oZSl7dmFyIHQscj1bXSxpPTAsbz0wO2lmKGY9IW4uZGV0ZWN0RHVwbGljYXRlcyxjPSFuLnNvcnRTdGFibGUmJmUuc2xpY2UoMCksZS5zb3J0KEQpLGYpe3doaWxlKHQ9ZVtvKytdKXQ9PT1lW29dJiYoaT1yLnB1c2gobykpO3doaWxlKGktLSllLnNwbGljZShyW2ldLDEpfXJldHVybiBjPW51bGwsZX0saT1vZS5nZXRUZXh0PWZ1bmN0aW9uKGUpe3ZhciB0LG49XFxcIlxcXCIscj0wLG89ZS5ub2RlVHlwZTtpZihvKXtpZigxPT09b3x8OT09PW98fDExPT09byl7aWYoXFxcInN0cmluZ1xcXCI9PXR5cGVvZiBlLnRleHRDb250ZW50KXJldHVybiBlLnRleHRDb250ZW50O2ZvcihlPWUuZmlyc3RDaGlsZDtlO2U9ZS5uZXh0U2libGluZyluKz1pKGUpfWVsc2UgaWYoMz09PW98fDQ9PT1vKXJldHVybiBlLm5vZGVWYWx1ZX1lbHNlIHdoaWxlKHQ9ZVtyKytdKW4rPWkodCk7cmV0dXJuIG59LChyPW9lLnNlbGVjdG9ycz17Y2FjaGVMZW5ndGg6NTAsY3JlYXRlUHNldWRvOnNlLG1hdGNoOlYsYXR0ckhhbmRsZTp7fSxmaW5kOnt9LHJlbGF0aXZlOntcXFwiPlxcXCI6e2RpcjpcXFwicGFyZW50Tm9kZVxcXCIsZmlyc3Q6ITB9LFxcXCIgXFxcIjp7ZGlyOlxcXCJwYXJlbnROb2RlXFxcIn0sXFxcIitcXFwiOntkaXI6XFxcInByZXZpb3VzU2libGluZ1xcXCIsZmlyc3Q6ITB9LFxcXCJ+XFxcIjp7ZGlyOlxcXCJwcmV2aW91c1NpYmxpbmdcXFwifX0scHJlRmlsdGVyOntBVFRSOmZ1bmN0aW9uKGUpe3JldHVybiBlWzFdPWVbMV0ucmVwbGFjZShaLGVlKSxlWzNdPShlWzNdfHxlWzRdfHxlWzVdfHxcXFwiXFxcIikucmVwbGFjZShaLGVlKSxcXFwifj1cXFwiPT09ZVsyXSYmKGVbM109XFxcIiBcXFwiK2VbM10rXFxcIiBcXFwiKSxlLnNsaWNlKDAsNCl9LENISUxEOmZ1bmN0aW9uKGUpe3JldHVybiBlWzFdPWVbMV0udG9Mb3dlckNhc2UoKSxcXFwibnRoXFxcIj09PWVbMV0uc2xpY2UoMCwzKT8oZVszXXx8b2UuZXJyb3IoZVswXSksZVs0XT0rKGVbNF0/ZVs1XSsoZVs2XXx8MSk6MiooXFxcImV2ZW5cXFwiPT09ZVszXXx8XFxcIm9kZFxcXCI9PT1lWzNdKSksZVs1XT0rKGVbN10rZVs4XXx8XFxcIm9kZFxcXCI9PT1lWzNdKSk6ZVszXSYmb2UuZXJyb3IoZVswXSksZX0sUFNFVURPOmZ1bmN0aW9uKGUpe3ZhciB0LG49IWVbNl0mJmVbMl07cmV0dXJuIFYuQ0hJTEQudGVzdChlWzBdKT9udWxsOihlWzNdP2VbMl09ZVs0XXx8ZVs1XXx8XFxcIlxcXCI6biYmWC50ZXN0KG4pJiYodD1hKG4sITApKSYmKHQ9bi5pbmRleE9mKFxcXCIpXFxcIixuLmxlbmd0aC10KS1uLmxlbmd0aCkmJihlWzBdPWVbMF0uc2xpY2UoMCx0KSxlWzJdPW4uc2xpY2UoMCx0KSksZS5zbGljZSgwLDMpKX19LGZpbHRlcjp7VEFHOmZ1bmN0aW9uKGUpe3ZhciB0PWUucmVwbGFjZShaLGVlKS50b0xvd2VyQ2FzZSgpO3JldHVyblxcXCIqXFxcIj09PWU/ZnVuY3Rpb24oKXtyZXR1cm4hMH06ZnVuY3Rpb24oZSl7cmV0dXJuIGUubm9kZU5hbWUmJmUubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXR9fSxDTEFTUzpmdW5jdGlvbihlKXt2YXIgdD1FW2UrXFxcIiBcXFwiXTtyZXR1cm4gdHx8KHQ9bmV3IFJlZ0V4cChcXFwiKF58XFxcIitNK1xcXCIpXFxcIitlK1xcXCIoXFxcIitNK1xcXCJ8JClcXFwiKSkmJkUoZSxmdW5jdGlvbihlKXtyZXR1cm4gdC50ZXN0KFxcXCJzdHJpbmdcXFwiPT10eXBlb2YgZS5jbGFzc05hbWUmJmUuY2xhc3NOYW1lfHxcXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIGUuZ2V0QXR0cmlidXRlJiZlLmdldEF0dHJpYnV0ZShcXFwiY2xhc3NcXFwiKXx8XFxcIlxcXCIpfSl9LEFUVFI6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBmdW5jdGlvbihyKXt2YXIgaT1vZS5hdHRyKHIsZSk7cmV0dXJuIG51bGw9PWk/XFxcIiE9XFxcIj09PXQ6IXR8fChpKz1cXFwiXFxcIixcXFwiPVxcXCI9PT10P2k9PT1uOlxcXCIhPVxcXCI9PT10P2khPT1uOlxcXCJePVxcXCI9PT10P24mJjA9PT1pLmluZGV4T2Yobik6XFxcIio9XFxcIj09PXQ/biYmaS5pbmRleE9mKG4pPi0xOlxcXCIkPVxcXCI9PT10P24mJmkuc2xpY2UoLW4ubGVuZ3RoKT09PW46XFxcIn49XFxcIj09PXQ/KFxcXCIgXFxcIitpLnJlcGxhY2UoJCxcXFwiIFxcXCIpK1xcXCIgXFxcIikuaW5kZXhPZihuKT4tMTpcXFwifD1cXFwiPT09dCYmKGk9PT1ufHxpLnNsaWNlKDAsbi5sZW5ndGgrMSk9PT1uK1xcXCItXFxcIikpfX0sQ0hJTEQ6ZnVuY3Rpb24oZSx0LG4scixpKXt2YXIgbz1cXFwibnRoXFxcIiE9PWUuc2xpY2UoMCwzKSxhPVxcXCJsYXN0XFxcIiE9PWUuc2xpY2UoLTQpLHM9XFxcIm9mLXR5cGVcXFwiPT09dDtyZXR1cm4gMT09PXImJjA9PT1pP2Z1bmN0aW9uKGUpe3JldHVybiEhZS5wYXJlbnROb2RlfTpmdW5jdGlvbih0LG4sdSl7dmFyIGwsYyxmLHAsZCxoLGc9byE9PWE/XFxcIm5leHRTaWJsaW5nXFxcIjpcXFwicHJldmlvdXNTaWJsaW5nXFxcIix5PXQucGFyZW50Tm9kZSx2PXMmJnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxtPSF1JiYhcyx4PSExO2lmKHkpe2lmKG8pe3doaWxlKGcpe3A9dDt3aGlsZShwPXBbZ10paWYocz9wLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT12OjE9PT1wLm5vZGVUeXBlKXJldHVybiExO2g9Zz1cXFwib25seVxcXCI9PT1lJiYhaCYmXFxcIm5leHRTaWJsaW5nXFxcIn1yZXR1cm4hMH1pZihoPVthP3kuZmlyc3RDaGlsZDp5Lmxhc3RDaGlsZF0sYSYmbSl7eD0oZD0obD0oYz0oZj0ocD15KVtiXXx8KHBbYl09e30pKVtwLnVuaXF1ZUlEXXx8KGZbcC51bmlxdWVJRF09e30pKVtlXXx8W10pWzBdPT09VCYmbFsxXSkmJmxbMl0scD1kJiZ5LmNoaWxkTm9kZXNbZF07d2hpbGUocD0rK2QmJnAmJnBbZ118fCh4PWQ9MCl8fGgucG9wKCkpaWYoMT09PXAubm9kZVR5cGUmJisreCYmcD09PXQpe2NbZV09W1QsZCx4XTticmVha319ZWxzZSBpZihtJiYoeD1kPShsPShjPShmPShwPXQpW2JdfHwocFtiXT17fSkpW3AudW5pcXVlSURdfHwoZltwLnVuaXF1ZUlEXT17fSkpW2VdfHxbXSlbMF09PT1UJiZsWzFdKSwhMT09PXgpd2hpbGUocD0rK2QmJnAmJnBbZ118fCh4PWQ9MCl8fGgucG9wKCkpaWYoKHM/cC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09djoxPT09cC5ub2RlVHlwZSkmJisreCYmKG0mJigoYz0oZj1wW2JdfHwocFtiXT17fSkpW3AudW5pcXVlSURdfHwoZltwLnVuaXF1ZUlEXT17fSkpW2VdPVtULHhdKSxwPT09dCkpYnJlYWs7cmV0dXJuKHgtPWkpPT09cnx8eCVyPT0wJiZ4L3I+PTB9fX0sUFNFVURPOmZ1bmN0aW9uKGUsdCl7dmFyIG4saT1yLnBzZXVkb3NbZV18fHIuc2V0RmlsdGVyc1tlLnRvTG93ZXJDYXNlKCldfHxvZS5lcnJvcihcXFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcXFwiK2UpO3JldHVybiBpW2JdP2kodCk6aS5sZW5ndGg+MT8obj1bZSxlLFxcXCJcXFwiLHRdLHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eShlLnRvTG93ZXJDYXNlKCkpP3NlKGZ1bmN0aW9uKGUsbil7dmFyIHIsbz1pKGUsdCksYT1vLmxlbmd0aDt3aGlsZShhLS0pZVtyPU8oZSxvW2FdKV09IShuW3JdPW9bYV0pfSk6ZnVuY3Rpb24oZSl7cmV0dXJuIGkoZSwwLG4pfSk6aX19LHBzZXVkb3M6e25vdDpzZShmdW5jdGlvbihlKXt2YXIgdD1bXSxuPVtdLHI9cyhlLnJlcGxhY2UoQixcXFwiJDFcXFwiKSk7cmV0dXJuIHJbYl0/c2UoZnVuY3Rpb24oZSx0LG4saSl7dmFyIG8sYT1yKGUsbnVsbCxpLFtdKSxzPWUubGVuZ3RoO3doaWxlKHMtLSkobz1hW3NdKSYmKGVbc109ISh0W3NdPW8pKX0pOmZ1bmN0aW9uKGUsaSxvKXtyZXR1cm4gdFswXT1lLHIodCxudWxsLG8sbiksdFswXT1udWxsLCFuLnBvcCgpfX0pLGhhczpzZShmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG9lKGUsdCkubGVuZ3RoPjB9fSksY29udGFpbnM6c2UoZnVuY3Rpb24oZSl7cmV0dXJuIGU9ZS5yZXBsYWNlKFosZWUpLGZ1bmN0aW9uKHQpe3JldHVybih0LnRleHRDb250ZW50fHx0LmlubmVyVGV4dHx8aSh0KSkuaW5kZXhPZihlKT4tMX19KSxsYW5nOnNlKGZ1bmN0aW9uKGUpe3JldHVybiBVLnRlc3QoZXx8XFxcIlxcXCIpfHxvZS5lcnJvcihcXFwidW5zdXBwb3J0ZWQgbGFuZzogXFxcIitlKSxlPWUucmVwbGFjZShaLGVlKS50b0xvd2VyQ2FzZSgpLGZ1bmN0aW9uKHQpe3ZhciBuO2Rve2lmKG49Zz90Lmxhbmc6dC5nZXRBdHRyaWJ1dGUoXFxcInhtbDpsYW5nXFxcIil8fHQuZ2V0QXR0cmlidXRlKFxcXCJsYW5nXFxcIikpcmV0dXJuKG49bi50b0xvd2VyQ2FzZSgpKT09PWV8fDA9PT1uLmluZGV4T2YoZStcXFwiLVxcXCIpfXdoaWxlKCh0PXQucGFyZW50Tm9kZSkmJjE9PT10Lm5vZGVUeXBlKTtyZXR1cm4hMX19KSx0YXJnZXQ6ZnVuY3Rpb24odCl7dmFyIG49ZS5sb2NhdGlvbiYmZS5sb2NhdGlvbi5oYXNoO3JldHVybiBuJiZuLnNsaWNlKDEpPT09dC5pZH0scm9vdDpmdW5jdGlvbihlKXtyZXR1cm4gZT09PWh9LGZvY3VzOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09ZC5hY3RpdmVFbGVtZW50JiYoIWQuaGFzRm9jdXN8fGQuaGFzRm9jdXMoKSkmJiEhKGUudHlwZXx8ZS5ocmVmfHx+ZS50YWJJbmRleCl9LGVuYWJsZWQ6ZGUoITEpLGRpc2FibGVkOmRlKCEwKSxjaGVja2VkOmZ1bmN0aW9uKGUpe3ZhciB0PWUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cXFwiaW5wdXRcXFwiPT09dCYmISFlLmNoZWNrZWR8fFxcXCJvcHRpb25cXFwiPT09dCYmISFlLnNlbGVjdGVkfSxzZWxlY3RlZDpmdW5jdGlvbihlKXtyZXR1cm4gZS5wYXJlbnROb2RlJiZlLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCwhMD09PWUuc2VsZWN0ZWR9LGVtcHR5OmZ1bmN0aW9uKGUpe2ZvcihlPWUuZmlyc3RDaGlsZDtlO2U9ZS5uZXh0U2libGluZylpZihlLm5vZGVUeXBlPDYpcmV0dXJuITE7cmV0dXJuITB9LHBhcmVudDpmdW5jdGlvbihlKXtyZXR1cm4hci5wc2V1ZG9zLmVtcHR5KGUpfSxoZWFkZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIFkudGVzdChlLm5vZGVOYW1lKX0saW5wdXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIEcudGVzdChlLm5vZGVOYW1lKX0sYnV0dG9uOmZ1bmN0aW9uKGUpe3ZhciB0PWUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cXFwiaW5wdXRcXFwiPT09dCYmXFxcImJ1dHRvblxcXCI9PT1lLnR5cGV8fFxcXCJidXR0b25cXFwiPT09dH0sdGV4dDpmdW5jdGlvbihlKXt2YXIgdDtyZXR1cm5cXFwiaW5wdXRcXFwiPT09ZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpJiZcXFwidGV4dFxcXCI9PT1lLnR5cGUmJihudWxsPT0odD1lLmdldEF0dHJpYnV0ZShcXFwidHlwZVxcXCIpKXx8XFxcInRleHRcXFwiPT09dC50b0xvd2VyQ2FzZSgpKX0sZmlyc3Q6aGUoZnVuY3Rpb24oKXtyZXR1cm5bMF19KSxsYXN0OmhlKGZ1bmN0aW9uKGUsdCl7cmV0dXJuW3QtMV19KSxlcTpoZShmdW5jdGlvbihlLHQsbil7cmV0dXJuW248MD9uK3Q6bl19KSxldmVuOmhlKGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPTA7bjx0O24rPTIpZS5wdXNoKG4pO3JldHVybiBlfSksb2RkOmhlKGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPTE7bjx0O24rPTIpZS5wdXNoKG4pO3JldHVybiBlfSksbHQ6aGUoZnVuY3Rpb24oZSx0LG4pe2Zvcih2YXIgcj1uPDA/bit0Om47LS1yPj0wOyllLnB1c2gocik7cmV0dXJuIGV9KSxndDpoZShmdW5jdGlvbihlLHQsbil7Zm9yKHZhciByPW48MD9uK3Q6bjsrK3I8dDspZS5wdXNoKHIpO3JldHVybiBlfSl9fSkucHNldWRvcy5udGg9ci5wc2V1ZG9zLmVxO2Zvcih0IGlue3JhZGlvOiEwLGNoZWNrYm94OiEwLGZpbGU6ITAscGFzc3dvcmQ6ITAsaW1hZ2U6ITB9KXIucHNldWRvc1t0XT1mZSh0KTtmb3IodCBpbntzdWJtaXQ6ITAscmVzZXQ6ITB9KXIucHNldWRvc1t0XT1wZSh0KTtmdW5jdGlvbiB5ZSgpe315ZS5wcm90b3R5cGU9ci5maWx0ZXJzPXIucHNldWRvcyxyLnNldEZpbHRlcnM9bmV3IHllLGE9b2UudG9rZW5pemU9ZnVuY3Rpb24oZSx0KXt2YXIgbixpLG8sYSxzLHUsbCxjPWtbZStcXFwiIFxcXCJdO2lmKGMpcmV0dXJuIHQ/MDpjLnNsaWNlKDApO3M9ZSx1PVtdLGw9ci5wcmVGaWx0ZXI7d2hpbGUocyl7biYmIShpPUYuZXhlYyhzKSl8fChpJiYocz1zLnNsaWNlKGlbMF0ubGVuZ3RoKXx8cyksdS5wdXNoKG89W10pKSxuPSExLChpPV8uZXhlYyhzKSkmJihuPWkuc2hpZnQoKSxvLnB1c2goe3ZhbHVlOm4sdHlwZTppWzBdLnJlcGxhY2UoQixcXFwiIFxcXCIpfSkscz1zLnNsaWNlKG4ubGVuZ3RoKSk7Zm9yKGEgaW4gci5maWx0ZXIpIShpPVZbYV0uZXhlYyhzKSl8fGxbYV0mJiEoaT1sW2FdKGkpKXx8KG49aS5zaGlmdCgpLG8ucHVzaCh7dmFsdWU6bix0eXBlOmEsbWF0Y2hlczppfSkscz1zLnNsaWNlKG4ubGVuZ3RoKSk7aWYoIW4pYnJlYWt9cmV0dXJuIHQ/cy5sZW5ndGg6cz9vZS5lcnJvcihlKTprKGUsdSkuc2xpY2UoMCl9O2Z1bmN0aW9uIHZlKGUpe2Zvcih2YXIgdD0wLG49ZS5sZW5ndGgscj1cXFwiXFxcIjt0PG47dCsrKXIrPWVbdF0udmFsdWU7cmV0dXJuIHJ9ZnVuY3Rpb24gbWUoZSx0LG4pe3ZhciByPXQuZGlyLGk9dC5uZXh0LG89aXx8cixhPW4mJlxcXCJwYXJlbnROb2RlXFxcIj09PW8scz1DKys7cmV0dXJuIHQuZmlyc3Q/ZnVuY3Rpb24odCxuLGkpe3doaWxlKHQ9dFtyXSlpZigxPT09dC5ub2RlVHlwZXx8YSlyZXR1cm4gZSh0LG4saSk7cmV0dXJuITF9OmZ1bmN0aW9uKHQsbix1KXt2YXIgbCxjLGYscD1bVCxzXTtpZih1KXt3aGlsZSh0PXRbcl0paWYoKDE9PT10Lm5vZGVUeXBlfHxhKSYmZSh0LG4sdSkpcmV0dXJuITB9ZWxzZSB3aGlsZSh0PXRbcl0paWYoMT09PXQubm9kZVR5cGV8fGEpaWYoZj10W2JdfHwodFtiXT17fSksYz1mW3QudW5pcXVlSURdfHwoZlt0LnVuaXF1ZUlEXT17fSksaSYmaT09PXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl0PXRbcl18fHQ7ZWxzZXtpZigobD1jW29dKSYmbFswXT09PVQmJmxbMV09PT1zKXJldHVybiBwWzJdPWxbMl07aWYoY1tvXT1wLHBbMl09ZSh0LG4sdSkpcmV0dXJuITB9cmV0dXJuITF9fWZ1bmN0aW9uIHhlKGUpe3JldHVybiBlLmxlbmd0aD4xP2Z1bmN0aW9uKHQsbixyKXt2YXIgaT1lLmxlbmd0aDt3aGlsZShpLS0paWYoIWVbaV0odCxuLHIpKXJldHVybiExO3JldHVybiEwfTplWzBdfWZ1bmN0aW9uIGJlKGUsdCxuKXtmb3IodmFyIHI9MCxpPXQubGVuZ3RoO3I8aTtyKyspb2UoZSx0W3JdLG4pO3JldHVybiBufWZ1bmN0aW9uIHdlKGUsdCxuLHIsaSl7Zm9yKHZhciBvLGE9W10scz0wLHU9ZS5sZW5ndGgsbD1udWxsIT10O3M8dTtzKyspKG89ZVtzXSkmJihuJiYhbihvLHIsaSl8fChhLnB1c2gobyksbCYmdC5wdXNoKHMpKSk7cmV0dXJuIGF9ZnVuY3Rpb24gVGUoZSx0LG4scixpLG8pe3JldHVybiByJiYhcltiXSYmKHI9VGUocikpLGkmJiFpW2JdJiYoaT1UZShpLG8pKSxzZShmdW5jdGlvbihvLGEscyx1KXt2YXIgbCxjLGYscD1bXSxkPVtdLGg9YS5sZW5ndGgsZz1vfHxiZSh0fHxcXFwiKlxcXCIscy5ub2RlVHlwZT9bc106cyxbXSkseT0hZXx8IW8mJnQ/Zzp3ZShnLHAsZSxzLHUpLHY9bj9pfHwobz9lOmh8fHIpP1tdOmE6eTtpZihuJiZuKHksdixzLHUpLHIpe2w9d2UodixkKSxyKGwsW10scyx1KSxjPWwubGVuZ3RoO3doaWxlKGMtLSkoZj1sW2NdKSYmKHZbZFtjXV09ISh5W2RbY11dPWYpKX1pZihvKXtpZihpfHxlKXtpZihpKXtsPVtdLGM9di5sZW5ndGg7d2hpbGUoYy0tKShmPXZbY10pJiZsLnB1c2goeVtjXT1mKTtpKG51bGwsdj1bXSxsLHUpfWM9di5sZW5ndGg7d2hpbGUoYy0tKShmPXZbY10pJiYobD1pP08obyxmKTpwW2NdKT4tMSYmKG9bbF09IShhW2xdPWYpKX19ZWxzZSB2PXdlKHY9PT1hP3Yuc3BsaWNlKGgsdi5sZW5ndGgpOnYpLGk/aShudWxsLGEsdix1KTpMLmFwcGx5KGEsdil9KX1mdW5jdGlvbiBDZShlKXtmb3IodmFyIHQsbixpLG89ZS5sZW5ndGgsYT1yLnJlbGF0aXZlW2VbMF0udHlwZV0scz1hfHxyLnJlbGF0aXZlW1xcXCIgXFxcIl0sdT1hPzE6MCxjPW1lKGZ1bmN0aW9uKGUpe3JldHVybiBlPT09dH0scywhMCksZj1tZShmdW5jdGlvbihlKXtyZXR1cm4gTyh0LGUpPi0xfSxzLCEwKSxwPVtmdW5jdGlvbihlLG4scil7dmFyIGk9IWEmJihyfHxuIT09bCl8fCgodD1uKS5ub2RlVHlwZT9jKGUsbixyKTpmKGUsbixyKSk7cmV0dXJuIHQ9bnVsbCxpfV07dTxvO3UrKylpZihuPXIucmVsYXRpdmVbZVt1XS50eXBlXSlwPVttZSh4ZShwKSxuKV07ZWxzZXtpZigobj1yLmZpbHRlcltlW3VdLnR5cGVdLmFwcGx5KG51bGwsZVt1XS5tYXRjaGVzKSlbYl0pe2ZvcihpPSsrdTtpPG87aSsrKWlmKHIucmVsYXRpdmVbZVtpXS50eXBlXSlicmVhaztyZXR1cm4gVGUodT4xJiZ4ZShwKSx1PjEmJnZlKGUuc2xpY2UoMCx1LTEpLmNvbmNhdCh7dmFsdWU6XFxcIiBcXFwiPT09ZVt1LTJdLnR5cGU/XFxcIipcXFwiOlxcXCJcXFwifSkpLnJlcGxhY2UoQixcXFwiJDFcXFwiKSxuLHU8aSYmQ2UoZS5zbGljZSh1LGkpKSxpPG8mJkNlKGU9ZS5zbGljZShpKSksaTxvJiZ2ZShlKSl9cC5wdXNoKG4pfXJldHVybiB4ZShwKX1mdW5jdGlvbiBFZShlLHQpe3ZhciBuPXQubGVuZ3RoPjAsaT1lLmxlbmd0aD4wLG89ZnVuY3Rpb24obyxhLHMsdSxjKXt2YXIgZixoLHksdj0wLG09XFxcIjBcXFwiLHg9byYmW10sYj1bXSx3PWwsQz1vfHxpJiZyLmZpbmQuVEFHKFxcXCIqXFxcIixjKSxFPVQrPW51bGw9PXc/MTpNYXRoLnJhbmRvbSgpfHwuMSxrPUMubGVuZ3RoO2ZvcihjJiYobD1hPT09ZHx8YXx8Yyk7bSE9PWsmJm51bGwhPShmPUNbbV0pO20rKyl7aWYoaSYmZil7aD0wLGF8fGYub3duZXJEb2N1bWVudD09PWR8fChwKGYpLHM9IWcpO3doaWxlKHk9ZVtoKytdKWlmKHkoZixhfHxkLHMpKXt1LnB1c2goZik7YnJlYWt9YyYmKFQ9RSl9biYmKChmPSF5JiZmKSYmdi0tLG8mJngucHVzaChmKSl9aWYodis9bSxuJiZtIT09dil7aD0wO3doaWxlKHk9dFtoKytdKXkoeCxiLGEscyk7aWYobyl7aWYodj4wKXdoaWxlKG0tLSl4W21dfHxiW21dfHwoYlttXT1qLmNhbGwodSkpO2I9d2UoYil9TC5hcHBseSh1LGIpLGMmJiFvJiZiLmxlbmd0aD4wJiZ2K3QubGVuZ3RoPjEmJm9lLnVuaXF1ZVNvcnQodSl9cmV0dXJuIGMmJihUPUUsbD13KSx4fTtyZXR1cm4gbj9zZShvKTpvfXJldHVybiBzPW9lLmNvbXBpbGU9ZnVuY3Rpb24oZSx0KXt2YXIgbixyPVtdLGk9W10sbz1TW2UrXFxcIiBcXFwiXTtpZighbyl7dHx8KHQ9YShlKSksbj10Lmxlbmd0aDt3aGlsZShuLS0pKG89Q2UodFtuXSkpW2JdP3IucHVzaChvKTppLnB1c2gobyk7KG89UyhlLEVlKGkscikpKS5zZWxlY3Rvcj1lfXJldHVybiBvfSx1PW9lLnNlbGVjdD1mdW5jdGlvbihlLHQsbixpKXt2YXIgbyx1LGwsYyxmLHA9XFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIGUmJmUsZD0haSYmYShlPXAuc2VsZWN0b3J8fGUpO2lmKG49bnx8W10sMT09PWQubGVuZ3RoKXtpZigodT1kWzBdPWRbMF0uc2xpY2UoMCkpLmxlbmd0aD4yJiZcXFwiSURcXFwiPT09KGw9dVswXSkudHlwZSYmOT09PXQubm9kZVR5cGUmJmcmJnIucmVsYXRpdmVbdVsxXS50eXBlXSl7aWYoISh0PShyLmZpbmQuSUQobC5tYXRjaGVzWzBdLnJlcGxhY2UoWixlZSksdCl8fFtdKVswXSkpcmV0dXJuIG47cCYmKHQ9dC5wYXJlbnROb2RlKSxlPWUuc2xpY2UodS5zaGlmdCgpLnZhbHVlLmxlbmd0aCl9bz1WLm5lZWRzQ29udGV4dC50ZXN0KGUpPzA6dS5sZW5ndGg7d2hpbGUoby0tKXtpZihsPXVbb10sci5yZWxhdGl2ZVtjPWwudHlwZV0pYnJlYWs7aWYoKGY9ci5maW5kW2NdKSYmKGk9ZihsLm1hdGNoZXNbMF0ucmVwbGFjZShaLGVlKSxLLnRlc3QodVswXS50eXBlKSYmZ2UodC5wYXJlbnROb2RlKXx8dCkpKXtpZih1LnNwbGljZShvLDEpLCEoZT1pLmxlbmd0aCYmdmUodSkpKXJldHVybiBMLmFwcGx5KG4saSksbjticmVha319fXJldHVybihwfHxzKGUsZCkpKGksdCwhZyxuLCF0fHxLLnRlc3QoZSkmJmdlKHQucGFyZW50Tm9kZSl8fHQpLG59LG4uc29ydFN0YWJsZT1iLnNwbGl0KFxcXCJcXFwiKS5zb3J0KEQpLmpvaW4oXFxcIlxcXCIpPT09YixuLmRldGVjdER1cGxpY2F0ZXM9ISFmLHAoKSxuLnNvcnREZXRhY2hlZD11ZShmdW5jdGlvbihlKXtyZXR1cm4gMSZlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGQuY3JlYXRlRWxlbWVudChcXFwiZmllbGRzZXRcXFwiKSl9KSx1ZShmdW5jdGlvbihlKXtyZXR1cm4gZS5pbm5lckhUTUw9XFxcIjxhIGhyZWY9JyMnPjwvYT5cXFwiLFxcXCIjXFxcIj09PWUuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXFxcImhyZWZcXFwiKX0pfHxsZShcXFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFxcXCIsZnVuY3Rpb24oZSx0LG4pe2lmKCFuKXJldHVybiBlLmdldEF0dHJpYnV0ZSh0LFxcXCJ0eXBlXFxcIj09PXQudG9Mb3dlckNhc2UoKT8xOjIpfSksbi5hdHRyaWJ1dGVzJiZ1ZShmdW5jdGlvbihlKXtyZXR1cm4gZS5pbm5lckhUTUw9XFxcIjxpbnB1dC8+XFxcIixlLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKFxcXCJ2YWx1ZVxcXCIsXFxcIlxcXCIpLFxcXCJcXFwiPT09ZS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcXFwidmFsdWVcXFwiKX0pfHxsZShcXFwidmFsdWVcXFwiLGZ1bmN0aW9uKGUsdCxuKXtpZighbiYmXFxcImlucHV0XFxcIj09PWUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4gZS5kZWZhdWx0VmFsdWV9KSx1ZShmdW5jdGlvbihlKXtyZXR1cm4gbnVsbD09ZS5nZXRBdHRyaWJ1dGUoXFxcImRpc2FibGVkXFxcIil9KXx8bGUoUCxmdW5jdGlvbihlLHQsbil7dmFyIHI7aWYoIW4pcmV0dXJuITA9PT1lW3RdP3QudG9Mb3dlckNhc2UoKToocj1lLmdldEF0dHJpYnV0ZU5vZGUodCkpJiZyLnNwZWNpZmllZD9yLnZhbHVlOm51bGx9KSxvZX0oZSk7dy5maW5kPUUsdy5leHByPUUuc2VsZWN0b3JzLHcuZXhwcltcXFwiOlxcXCJdPXcuZXhwci5wc2V1ZG9zLHcudW5pcXVlU29ydD13LnVuaXF1ZT1FLnVuaXF1ZVNvcnQsdy50ZXh0PUUuZ2V0VGV4dCx3LmlzWE1MRG9jPUUuaXNYTUwsdy5jb250YWlucz1FLmNvbnRhaW5zLHcuZXNjYXBlU2VsZWN0b3I9RS5lc2NhcGU7dmFyIGs9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPVtdLGk9dm9pZCAwIT09bjt3aGlsZSgoZT1lW3RdKSYmOSE9PWUubm9kZVR5cGUpaWYoMT09PWUubm9kZVR5cGUpe2lmKGkmJncoZSkuaXMobikpYnJlYWs7ci5wdXNoKGUpfXJldHVybiByfSxTPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPVtdO2U7ZT1lLm5leHRTaWJsaW5nKTE9PT1lLm5vZGVUeXBlJiZlIT09dCYmbi5wdXNoKGUpO3JldHVybiBufSxEPXcuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7ZnVuY3Rpb24gTihlLHQpe3JldHVybiBlLm5vZGVOYW1lJiZlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT10LnRvTG93ZXJDYXNlKCl9dmFyIEE9L148KFthLXpdW15cXFxcL1xcXFwwPjpcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdKilbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXSpcXFxcLz8+KD86PFxcXFwvXFxcXDE+fCkkL2k7ZnVuY3Rpb24gaihlLHQsbil7cmV0dXJuIGcodCk/dy5ncmVwKGUsZnVuY3Rpb24oZSxyKXtyZXR1cm4hIXQuY2FsbChlLHIsZSkhPT1ufSk6dC5ub2RlVHlwZT93LmdyZXAoZSxmdW5jdGlvbihlKXtyZXR1cm4gZT09PXQhPT1ufSk6XFxcInN0cmluZ1xcXCIhPXR5cGVvZiB0P3cuZ3JlcChlLGZ1bmN0aW9uKGUpe3JldHVybiB1LmNhbGwodCxlKT4tMSE9PW59KTp3LmZpbHRlcih0LGUsbil9dy5maWx0ZXI9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRbMF07cmV0dXJuIG4mJihlPVxcXCI6bm90KFxcXCIrZStcXFwiKVxcXCIpLDE9PT10Lmxlbmd0aCYmMT09PXIubm9kZVR5cGU/dy5maW5kLm1hdGNoZXNTZWxlY3RvcihyLGUpP1tyXTpbXTp3LmZpbmQubWF0Y2hlcyhlLHcuZ3JlcCh0LGZ1bmN0aW9uKGUpe3JldHVybiAxPT09ZS5ub2RlVHlwZX0pKX0sdy5mbi5leHRlbmQoe2ZpbmQ6ZnVuY3Rpb24oZSl7dmFyIHQsbixyPXRoaXMubGVuZ3RoLGk9dGhpcztpZihcXFwic3RyaW5nXFxcIiE9dHlwZW9mIGUpcmV0dXJuIHRoaXMucHVzaFN0YWNrKHcoZSkuZmlsdGVyKGZ1bmN0aW9uKCl7Zm9yKHQ9MDt0PHI7dCsrKWlmKHcuY29udGFpbnMoaVt0XSx0aGlzKSlyZXR1cm4hMH0pKTtmb3Iobj10aGlzLnB1c2hTdGFjayhbXSksdD0wO3Q8cjt0Kyspdy5maW5kKGUsaVt0XSxuKTtyZXR1cm4gcj4xP3cudW5pcXVlU29ydChuKTpufSxmaWx0ZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGoodGhpcyxlfHxbXSwhMSkpfSxub3Q6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGoodGhpcyxlfHxbXSwhMCkpfSxpczpmdW5jdGlvbihlKXtyZXR1cm4hIWoodGhpcyxcXFwic3RyaW5nXFxcIj09dHlwZW9mIGUmJkQudGVzdChlKT93KGUpOmV8fFtdLCExKS5sZW5ndGh9fSk7dmFyIHEsTD0vXig/OlxcXFxzKig8W1xcXFx3XFxcXFddKz4pW14+XSp8IyhbXFxcXHctXSspKSQvOyh3LmZuLmluaXQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBpLG87aWYoIWUpcmV0dXJuIHRoaXM7aWYobj1ufHxxLFxcXCJzdHJpbmdcXFwiPT10eXBlb2YgZSl7aWYoIShpPVxcXCI8XFxcIj09PWVbMF0mJlxcXCI+XFxcIj09PWVbZS5sZW5ndGgtMV0mJmUubGVuZ3RoPj0zP1tudWxsLGUsbnVsbF06TC5leGVjKGUpKXx8IWlbMV0mJnQpcmV0dXJuIXR8fHQuanF1ZXJ5Pyh0fHxuKS5maW5kKGUpOnRoaXMuY29uc3RydWN0b3IodCkuZmluZChlKTtpZihpWzFdKXtpZih0PXQgaW5zdGFuY2VvZiB3P3RbMF06dCx3Lm1lcmdlKHRoaXMsdy5wYXJzZUhUTUwoaVsxXSx0JiZ0Lm5vZGVUeXBlP3Qub3duZXJEb2N1bWVudHx8dDpyLCEwKSksQS50ZXN0KGlbMV0pJiZ3LmlzUGxhaW5PYmplY3QodCkpZm9yKGkgaW4gdClnKHRoaXNbaV0pP3RoaXNbaV0odFtpXSk6dGhpcy5hdHRyKGksdFtpXSk7cmV0dXJuIHRoaXN9cmV0dXJuKG89ci5nZXRFbGVtZW50QnlJZChpWzJdKSkmJih0aGlzWzBdPW8sdGhpcy5sZW5ndGg9MSksdGhpc31yZXR1cm4gZS5ub2RlVHlwZT8odGhpc1swXT1lLHRoaXMubGVuZ3RoPTEsdGhpcyk6ZyhlKT92b2lkIDAhPT1uLnJlYWR5P24ucmVhZHkoZSk6ZSh3KTp3Lm1ha2VBcnJheShlLHRoaXMpfSkucHJvdG90eXBlPXcuZm4scT13KHIpO3ZhciBIPS9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLE89e2NoaWxkcmVuOiEwLGNvbnRlbnRzOiEwLG5leHQ6ITAscHJldjohMH07dy5mbi5leHRlbmQoe2hhczpmdW5jdGlvbihlKXt2YXIgdD13KGUsdGhpcyksbj10Lmxlbmd0aDtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKXtmb3IodmFyIGU9MDtlPG47ZSsrKWlmKHcuY29udGFpbnModGhpcyx0W2VdKSlyZXR1cm4hMH0pfSxjbG9zZXN0OmZ1bmN0aW9uKGUsdCl7dmFyIG4scj0wLGk9dGhpcy5sZW5ndGgsbz1bXSxhPVxcXCJzdHJpbmdcXFwiIT10eXBlb2YgZSYmdyhlKTtpZighRC50ZXN0KGUpKWZvcig7cjxpO3IrKylmb3Iobj10aGlzW3JdO24mJm4hPT10O249bi5wYXJlbnROb2RlKWlmKG4ubm9kZVR5cGU8MTEmJihhP2EuaW5kZXgobik+LTE6MT09PW4ubm9kZVR5cGUmJncuZmluZC5tYXRjaGVzU2VsZWN0b3IobixlKSkpe28ucHVzaChuKTticmVha31yZXR1cm4gdGhpcy5wdXNoU3RhY2soby5sZW5ndGg+MT93LnVuaXF1ZVNvcnQobyk6byl9LGluZGV4OmZ1bmN0aW9uKGUpe3JldHVybiBlP1xcXCJzdHJpbmdcXFwiPT10eXBlb2YgZT91LmNhbGwodyhlKSx0aGlzWzBdKTp1LmNhbGwodGhpcyxlLmpxdWVyeT9lWzBdOmUpOnRoaXNbMF0mJnRoaXNbMF0ucGFyZW50Tm9kZT90aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aDotMX0sYWRkOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKHcudW5pcXVlU29ydCh3Lm1lcmdlKHRoaXMuZ2V0KCksdyhlLHQpKSkpfSxhZGRCYWNrOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmFkZChudWxsPT1lP3RoaXMucHJldk9iamVjdDp0aGlzLnByZXZPYmplY3QuZmlsdGVyKGUpKX19KTtmdW5jdGlvbiBQKGUsdCl7d2hpbGUoKGU9ZVt0XSkmJjEhPT1lLm5vZGVUeXBlKTtyZXR1cm4gZX13LmVhY2goe3BhcmVudDpmdW5jdGlvbihlKXt2YXIgdD1lLnBhcmVudE5vZGU7cmV0dXJuIHQmJjExIT09dC5ub2RlVHlwZT90Om51bGx9LHBhcmVudHM6ZnVuY3Rpb24oZSl7cmV0dXJuIGsoZSxcXFwicGFyZW50Tm9kZVxcXCIpfSxwYXJlbnRzVW50aWw6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBrKGUsXFxcInBhcmVudE5vZGVcXFwiLG4pfSxuZXh0OmZ1bmN0aW9uKGUpe3JldHVybiBQKGUsXFxcIm5leHRTaWJsaW5nXFxcIil9LHByZXY6ZnVuY3Rpb24oZSl7cmV0dXJuIFAoZSxcXFwicHJldmlvdXNTaWJsaW5nXFxcIil9LG5leHRBbGw6ZnVuY3Rpb24oZSl7cmV0dXJuIGsoZSxcXFwibmV4dFNpYmxpbmdcXFwiKX0scHJldkFsbDpmdW5jdGlvbihlKXtyZXR1cm4gayhlLFxcXCJwcmV2aW91c1NpYmxpbmdcXFwiKX0sbmV4dFVudGlsOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gayhlLFxcXCJuZXh0U2libGluZ1xcXCIsbil9LHByZXZVbnRpbDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIGsoZSxcXFwicHJldmlvdXNTaWJsaW5nXFxcIixuKX0sc2libGluZ3M6ZnVuY3Rpb24oZSl7cmV0dXJuIFMoKGUucGFyZW50Tm9kZXx8e30pLmZpcnN0Q2hpbGQsZSl9LGNoaWxkcmVuOmZ1bmN0aW9uKGUpe3JldHVybiBTKGUuZmlyc3RDaGlsZCl9LGNvbnRlbnRzOmZ1bmN0aW9uKGUpe3JldHVybiBOKGUsXFxcImlmcmFtZVxcXCIpP2UuY29udGVudERvY3VtZW50OihOKGUsXFxcInRlbXBsYXRlXFxcIikmJihlPWUuY29udGVudHx8ZSksdy5tZXJnZShbXSxlLmNoaWxkTm9kZXMpKX19LGZ1bmN0aW9uKGUsdCl7dy5mbltlXT1mdW5jdGlvbihuLHIpe3ZhciBpPXcubWFwKHRoaXMsdCxuKTtyZXR1cm5cXFwiVW50aWxcXFwiIT09ZS5zbGljZSgtNSkmJihyPW4pLHImJlxcXCJzdHJpbmdcXFwiPT10eXBlb2YgciYmKGk9dy5maWx0ZXIocixpKSksdGhpcy5sZW5ndGg+MSYmKE9bZV18fHcudW5pcXVlU29ydChpKSxILnRlc3QoZSkmJmkucmV2ZXJzZSgpKSx0aGlzLnB1c2hTdGFjayhpKX19KTt2YXIgTT0vW15cXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdKy9nO2Z1bmN0aW9uIFIoZSl7dmFyIHQ9e307cmV0dXJuIHcuZWFjaChlLm1hdGNoKE0pfHxbXSxmdW5jdGlvbihlLG4pe3Rbbl09ITB9KSx0fXcuQ2FsbGJhY2tzPWZ1bmN0aW9uKGUpe2U9XFxcInN0cmluZ1xcXCI9PXR5cGVvZiBlP1IoZSk6dy5leHRlbmQoe30sZSk7dmFyIHQsbixyLGksbz1bXSxhPVtdLHM9LTEsdT1mdW5jdGlvbigpe2ZvcihpPWl8fGUub25jZSxyPXQ9ITA7YS5sZW5ndGg7cz0tMSl7bj1hLnNoaWZ0KCk7d2hpbGUoKytzPG8ubGVuZ3RoKSExPT09b1tzXS5hcHBseShuWzBdLG5bMV0pJiZlLnN0b3BPbkZhbHNlJiYocz1vLmxlbmd0aCxuPSExKX1lLm1lbW9yeXx8KG49ITEpLHQ9ITEsaSYmKG89bj9bXTpcXFwiXFxcIil9LGw9e2FkZDpmdW5jdGlvbigpe3JldHVybiBvJiYobiYmIXQmJihzPW8ubGVuZ3RoLTEsYS5wdXNoKG4pKSxmdW5jdGlvbiB0KG4pe3cuZWFjaChuLGZ1bmN0aW9uKG4scil7ZyhyKT9lLnVuaXF1ZSYmbC5oYXMocil8fG8ucHVzaChyKTpyJiZyLmxlbmd0aCYmXFxcInN0cmluZ1xcXCIhPT14KHIpJiZ0KHIpfSl9KGFyZ3VtZW50cyksbiYmIXQmJnUoKSksdGhpc30scmVtb3ZlOmZ1bmN0aW9uKCl7cmV0dXJuIHcuZWFjaChhcmd1bWVudHMsZnVuY3Rpb24oZSx0KXt2YXIgbjt3aGlsZSgobj13LmluQXJyYXkodCxvLG4pKT4tMSlvLnNwbGljZShuLDEpLG48PXMmJnMtLX0pLHRoaXN9LGhhczpmdW5jdGlvbihlKXtyZXR1cm4gZT93LmluQXJyYXkoZSxvKT4tMTpvLmxlbmd0aD4wfSxlbXB0eTpmdW5jdGlvbigpe3JldHVybiBvJiYobz1bXSksdGhpc30sZGlzYWJsZTpmdW5jdGlvbigpe3JldHVybiBpPWE9W10sbz1uPVxcXCJcXFwiLHRoaXN9LGRpc2FibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIW99LGxvY2s6ZnVuY3Rpb24oKXtyZXR1cm4gaT1hPVtdLG58fHR8fChvPW49XFxcIlxcXCIpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiEhaX0sZmlyZVdpdGg6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gaXx8KG49W2UsKG49bnx8W10pLnNsaWNlP24uc2xpY2UoKTpuXSxhLnB1c2gobiksdHx8dSgpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGwuZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpLHRoaXN9LGZpcmVkOmZ1bmN0aW9uKCl7cmV0dXJuISFyfX07cmV0dXJuIGx9O2Z1bmN0aW9uIEkoZSl7cmV0dXJuIGV9ZnVuY3Rpb24gVyhlKXt0aHJvdyBlfWZ1bmN0aW9uICQoZSx0LG4scil7dmFyIGk7dHJ5e2UmJmcoaT1lLnByb21pc2UpP2kuY2FsbChlKS5kb25lKHQpLmZhaWwobik6ZSYmZyhpPWUudGhlbik/aS5jYWxsKGUsdCxuKTp0LmFwcGx5KHZvaWQgMCxbZV0uc2xpY2UocikpfWNhdGNoKGUpe24uYXBwbHkodm9pZCAwLFtlXSl9fXcuZXh0ZW5kKHtEZWZlcnJlZDpmdW5jdGlvbih0KXt2YXIgbj1bW1xcXCJub3RpZnlcXFwiLFxcXCJwcm9ncmVzc1xcXCIsdy5DYWxsYmFja3MoXFxcIm1lbW9yeVxcXCIpLHcuQ2FsbGJhY2tzKFxcXCJtZW1vcnlcXFwiKSwyXSxbXFxcInJlc29sdmVcXFwiLFxcXCJkb25lXFxcIix3LkNhbGxiYWNrcyhcXFwib25jZSBtZW1vcnlcXFwiKSx3LkNhbGxiYWNrcyhcXFwib25jZSBtZW1vcnlcXFwiKSwwLFxcXCJyZXNvbHZlZFxcXCJdLFtcXFwicmVqZWN0XFxcIixcXFwiZmFpbFxcXCIsdy5DYWxsYmFja3MoXFxcIm9uY2UgbWVtb3J5XFxcIiksdy5DYWxsYmFja3MoXFxcIm9uY2UgbWVtb3J5XFxcIiksMSxcXFwicmVqZWN0ZWRcXFwiXV0scj1cXFwicGVuZGluZ1xcXCIsaT17c3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm4gcn0sYWx3YXlzOmZ1bmN0aW9uKCl7cmV0dXJuIG8uZG9uZShhcmd1bWVudHMpLmZhaWwoYXJndW1lbnRzKSx0aGlzfSxcXFwiY2F0Y2hcXFwiOmZ1bmN0aW9uKGUpe3JldHVybiBpLnRoZW4obnVsbCxlKX0scGlwZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cztyZXR1cm4gdy5EZWZlcnJlZChmdW5jdGlvbih0KXt3LmVhY2gobixmdW5jdGlvbihuLHIpe3ZhciBpPWcoZVtyWzRdXSkmJmVbcls0XV07b1tyWzFdXShmdW5jdGlvbigpe3ZhciBlPWkmJmkuYXBwbHkodGhpcyxhcmd1bWVudHMpO2UmJmcoZS5wcm9taXNlKT9lLnByb21pc2UoKS5wcm9ncmVzcyh0Lm5vdGlmeSkuZG9uZSh0LnJlc29sdmUpLmZhaWwodC5yZWplY3QpOnRbclswXStcXFwiV2l0aFxcXCJdKHRoaXMsaT9bZV06YXJndW1lbnRzKX0pfSksZT1udWxsfSkucHJvbWlzZSgpfSx0aGVuOmZ1bmN0aW9uKHQscixpKXt2YXIgbz0wO2Z1bmN0aW9uIGEodCxuLHIsaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHM9dGhpcyx1PWFyZ3VtZW50cyxsPWZ1bmN0aW9uKCl7dmFyIGUsbDtpZighKHQ8bykpe2lmKChlPXIuYXBwbHkocyx1KSk9PT1uLnByb21pc2UoKSl0aHJvdyBuZXcgVHlwZUVycm9yKFxcXCJUaGVuYWJsZSBzZWxmLXJlc29sdXRpb25cXFwiKTtsPWUmJihcXFwib2JqZWN0XFxcIj09dHlwZW9mIGV8fFxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBlKSYmZS50aGVuLGcobCk/aT9sLmNhbGwoZSxhKG8sbixJLGkpLGEobyxuLFcsaSkpOihvKyssbC5jYWxsKGUsYShvLG4sSSxpKSxhKG8sbixXLGkpLGEobyxuLEksbi5ub3RpZnlXaXRoKSkpOihyIT09SSYmKHM9dm9pZCAwLHU9W2VdKSwoaXx8bi5yZXNvbHZlV2l0aCkocyx1KSl9fSxjPWk/bDpmdW5jdGlvbigpe3RyeXtsKCl9Y2F0Y2goZSl7dy5EZWZlcnJlZC5leGNlcHRpb25Ib29rJiZ3LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2soZSxjLnN0YWNrVHJhY2UpLHQrMT49byYmKHIhPT1XJiYocz12b2lkIDAsdT1bZV0pLG4ucmVqZWN0V2l0aChzLHUpKX19O3Q/YygpOih3LkRlZmVycmVkLmdldFN0YWNrSG9vayYmKGMuc3RhY2tUcmFjZT13LkRlZmVycmVkLmdldFN0YWNrSG9vaygpKSxlLnNldFRpbWVvdXQoYykpfX1yZXR1cm4gdy5EZWZlcnJlZChmdW5jdGlvbihlKXtuWzBdWzNdLmFkZChhKDAsZSxnKGkpP2k6SSxlLm5vdGlmeVdpdGgpKSxuWzFdWzNdLmFkZChhKDAsZSxnKHQpP3Q6SSkpLG5bMl1bM10uYWRkKGEoMCxlLGcocik/cjpXKSl9KS5wcm9taXNlKCl9LHByb21pc2U6ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPWU/dy5leHRlbmQoZSxpKTppfX0sbz17fTtyZXR1cm4gdy5lYWNoKG4sZnVuY3Rpb24oZSx0KXt2YXIgYT10WzJdLHM9dFs1XTtpW3RbMV1dPWEuYWRkLHMmJmEuYWRkKGZ1bmN0aW9uKCl7cj1zfSxuWzMtZV1bMl0uZGlzYWJsZSxuWzMtZV1bM10uZGlzYWJsZSxuWzBdWzJdLmxvY2ssblswXVszXS5sb2NrKSxhLmFkZCh0WzNdLmZpcmUpLG9bdFswXV09ZnVuY3Rpb24oKXtyZXR1cm4gb1t0WzBdK1xcXCJXaXRoXFxcIl0odGhpcz09PW8/dm9pZCAwOnRoaXMsYXJndW1lbnRzKSx0aGlzfSxvW3RbMF0rXFxcIldpdGhcXFwiXT1hLmZpcmVXaXRofSksaS5wcm9taXNlKG8pLHQmJnQuY2FsbChvLG8pLG99LHdoZW46ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aCxuPXQscj1BcnJheShuKSxpPW8uY2FsbChhcmd1bWVudHMpLGE9dy5EZWZlcnJlZCgpLHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JbZV09dGhpcyxpW2VdPWFyZ3VtZW50cy5sZW5ndGg+MT9vLmNhbGwoYXJndW1lbnRzKTpuLC0tdHx8YS5yZXNvbHZlV2l0aChyLGkpfX07aWYodDw9MSYmKCQoZSxhLmRvbmUocyhuKSkucmVzb2x2ZSxhLnJlamVjdCwhdCksXFxcInBlbmRpbmdcXFwiPT09YS5zdGF0ZSgpfHxnKGlbbl0mJmlbbl0udGhlbikpKXJldHVybiBhLnRoZW4oKTt3aGlsZShuLS0pJChpW25dLHMobiksYS5yZWplY3QpO3JldHVybiBhLnByb21pc2UoKX19KTt2YXIgQj0vXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLzt3LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2s9ZnVuY3Rpb24odCxuKXtlLmNvbnNvbGUmJmUuY29uc29sZS53YXJuJiZ0JiZCLnRlc3QodC5uYW1lKSYmZS5jb25zb2xlLndhcm4oXFxcImpRdWVyeS5EZWZlcnJlZCBleGNlcHRpb246IFxcXCIrdC5tZXNzYWdlLHQuc3RhY2ssbil9LHcucmVhZHlFeGNlcHRpb249ZnVuY3Rpb24odCl7ZS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhyb3cgdH0pfTt2YXIgRj13LkRlZmVycmVkKCk7dy5mbi5yZWFkeT1mdW5jdGlvbihlKXtyZXR1cm4gRi50aGVuKGUpW1xcXCJjYXRjaFxcXCJdKGZ1bmN0aW9uKGUpe3cucmVhZHlFeGNlcHRpb24oZSl9KSx0aGlzfSx3LmV4dGVuZCh7aXNSZWFkeTohMSxyZWFkeVdhaXQ6MSxyZWFkeTpmdW5jdGlvbihlKXsoITA9PT1lPy0tdy5yZWFkeVdhaXQ6dy5pc1JlYWR5KXx8KHcuaXNSZWFkeT0hMCwhMCE9PWUmJi0tdy5yZWFkeVdhaXQ+MHx8Ri5yZXNvbHZlV2l0aChyLFt3XSkpfX0pLHcucmVhZHkudGhlbj1GLnRoZW47ZnVuY3Rpb24gXygpe3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcXFwiRE9NQ29udGVudExvYWRlZFxcXCIsXyksZS5yZW1vdmVFdmVudExpc3RlbmVyKFxcXCJsb2FkXFxcIixfKSx3LnJlYWR5KCl9XFxcImNvbXBsZXRlXFxcIj09PXIucmVhZHlTdGF0ZXx8XFxcImxvYWRpbmdcXFwiIT09ci5yZWFkeVN0YXRlJiYhci5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGw/ZS5zZXRUaW1lb3V0KHcucmVhZHkpOihyLmFkZEV2ZW50TGlzdGVuZXIoXFxcIkRPTUNvbnRlbnRMb2FkZWRcXFwiLF8pLGUuYWRkRXZlbnRMaXN0ZW5lcihcXFwibG9hZFxcXCIsXykpO3ZhciB6PWZ1bmN0aW9uKGUsdCxuLHIsaSxvLGEpe3ZhciBzPTAsdT1lLmxlbmd0aCxsPW51bGw9PW47aWYoXFxcIm9iamVjdFxcXCI9PT14KG4pKXtpPSEwO2ZvcihzIGluIG4peihlLHQscyxuW3NdLCEwLG8sYSl9ZWxzZSBpZih2b2lkIDAhPT1yJiYoaT0hMCxnKHIpfHwoYT0hMCksbCYmKGE/KHQuY2FsbChlLHIpLHQ9bnVsbCk6KGw9dCx0PWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gbC5jYWxsKHcoZSksbil9KSksdCkpZm9yKDtzPHU7cysrKXQoZVtzXSxuLGE/cjpyLmNhbGwoZVtzXSxzLHQoZVtzXSxuKSkpO3JldHVybiBpP2U6bD90LmNhbGwoZSk6dT90KGVbMF0sbik6b30sWD0vXi1tcy0vLFU9Ly0oW2Etel0pL2c7ZnVuY3Rpb24gVihlLHQpe3JldHVybiB0LnRvVXBwZXJDYXNlKCl9ZnVuY3Rpb24gRyhlKXtyZXR1cm4gZS5yZXBsYWNlKFgsXFxcIm1zLVxcXCIpLnJlcGxhY2UoVSxWKX12YXIgWT1mdW5jdGlvbihlKXtyZXR1cm4gMT09PWUubm9kZVR5cGV8fDk9PT1lLm5vZGVUeXBlfHwhK2Uubm9kZVR5cGV9O2Z1bmN0aW9uIFEoKXt0aGlzLmV4cGFuZG89dy5leHBhbmRvK1EudWlkKyt9US51aWQ9MSxRLnByb3RvdHlwZT17Y2FjaGU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZVt0aGlzLmV4cGFuZG9dO3JldHVybiB0fHwodD17fSxZKGUpJiYoZS5ub2RlVHlwZT9lW3RoaXMuZXhwYW5kb109dDpPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0aGlzLmV4cGFuZG8se3ZhbHVlOnQsY29uZmlndXJhYmxlOiEwfSkpKSx0fSxzZXQ6ZnVuY3Rpb24oZSx0LG4pe3ZhciByLGk9dGhpcy5jYWNoZShlKTtpZihcXFwic3RyaW5nXFxcIj09dHlwZW9mIHQpaVtHKHQpXT1uO2Vsc2UgZm9yKHIgaW4gdClpW0cocildPXRbcl07cmV0dXJuIGl9LGdldDpmdW5jdGlvbihlLHQpe3JldHVybiB2b2lkIDA9PT10P3RoaXMuY2FjaGUoZSk6ZVt0aGlzLmV4cGFuZG9dJiZlW3RoaXMuZXhwYW5kb11bRyh0KV19LGFjY2VzczpmdW5jdGlvbihlLHQsbil7cmV0dXJuIHZvaWQgMD09PXR8fHQmJlxcXCJzdHJpbmdcXFwiPT10eXBlb2YgdCYmdm9pZCAwPT09bj90aGlzLmdldChlLHQpOih0aGlzLnNldChlLHQsbiksdm9pZCAwIT09bj9uOnQpfSxyZW1vdmU6ZnVuY3Rpb24oZSx0KXt2YXIgbixyPWVbdGhpcy5leHBhbmRvXTtpZih2b2lkIDAhPT1yKXtpZih2b2lkIDAhPT10KXtuPSh0PUFycmF5LmlzQXJyYXkodCk/dC5tYXAoRyk6KHQ9Ryh0KSlpbiByP1t0XTp0Lm1hdGNoKE0pfHxbXSkubGVuZ3RoO3doaWxlKG4tLSlkZWxldGUgclt0W25dXX0odm9pZCAwPT09dHx8dy5pc0VtcHR5T2JqZWN0KHIpKSYmKGUubm9kZVR5cGU/ZVt0aGlzLmV4cGFuZG9dPXZvaWQgMDpkZWxldGUgZVt0aGlzLmV4cGFuZG9dKX19LGhhc0RhdGE6ZnVuY3Rpb24oZSl7dmFyIHQ9ZVt0aGlzLmV4cGFuZG9dO3JldHVybiB2b2lkIDAhPT10JiYhdy5pc0VtcHR5T2JqZWN0KHQpfX07dmFyIEo9bmV3IFEsSz1uZXcgUSxaPS9eKD86XFxcXHtbXFxcXHdcXFxcV10qXFxcXH18XFxcXFtbXFxcXHdcXFxcV10qXFxcXF0pJC8sZWU9L1tBLVpdL2c7ZnVuY3Rpb24gdGUoZSl7cmV0dXJuXFxcInRydWVcXFwiPT09ZXx8XFxcImZhbHNlXFxcIiE9PWUmJihcXFwibnVsbFxcXCI9PT1lP251bGw6ZT09PStlK1xcXCJcXFwiPytlOloudGVzdChlKT9KU09OLnBhcnNlKGUpOmUpfWZ1bmN0aW9uIG5lKGUsdCxuKXt2YXIgcjtpZih2b2lkIDA9PT1uJiYxPT09ZS5ub2RlVHlwZSlpZihyPVxcXCJkYXRhLVxcXCIrdC5yZXBsYWNlKGVlLFxcXCItJCZcXFwiKS50b0xvd2VyQ2FzZSgpLFxcXCJzdHJpbmdcXFwiPT10eXBlb2Yobj1lLmdldEF0dHJpYnV0ZShyKSkpe3RyeXtuPXRlKG4pfWNhdGNoKGUpe31LLnNldChlLHQsbil9ZWxzZSBuPXZvaWQgMDtyZXR1cm4gbn13LmV4dGVuZCh7aGFzRGF0YTpmdW5jdGlvbihlKXtyZXR1cm4gSy5oYXNEYXRhKGUpfHxKLmhhc0RhdGEoZSl9LGRhdGE6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBLLmFjY2VzcyhlLHQsbil9LHJlbW92ZURhdGE6ZnVuY3Rpb24oZSx0KXtLLnJlbW92ZShlLHQpfSxfZGF0YTpmdW5jdGlvbihlLHQsbil7cmV0dXJuIEouYWNjZXNzKGUsdCxuKX0sX3JlbW92ZURhdGE6ZnVuY3Rpb24oZSx0KXtKLnJlbW92ZShlLHQpfX0pLHcuZm4uZXh0ZW5kKHtkYXRhOmZ1bmN0aW9uKGUsdCl7dmFyIG4scixpLG89dGhpc1swXSxhPW8mJm8uYXR0cmlidXRlcztpZih2b2lkIDA9PT1lKXtpZih0aGlzLmxlbmd0aCYmKGk9Sy5nZXQobyksMT09PW8ubm9kZVR5cGUmJiFKLmdldChvLFxcXCJoYXNEYXRhQXR0cnNcXFwiKSkpe249YS5sZW5ndGg7d2hpbGUobi0tKWFbbl0mJjA9PT0ocj1hW25dLm5hbWUpLmluZGV4T2YoXFxcImRhdGEtXFxcIikmJihyPUcoci5zbGljZSg1KSksbmUobyxyLGlbcl0pKTtKLnNldChvLFxcXCJoYXNEYXRhQXR0cnNcXFwiLCEwKX1yZXR1cm4gaX1yZXR1cm5cXFwib2JqZWN0XFxcIj09dHlwZW9mIGU/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7Sy5zZXQodGhpcyxlKX0pOnoodGhpcyxmdW5jdGlvbih0KXt2YXIgbjtpZihvJiZ2b2lkIDA9PT10KXtpZih2b2lkIDAhPT0obj1LLmdldChvLGUpKSlyZXR1cm4gbjtpZih2b2lkIDAhPT0obj1uZShvLGUpKSlyZXR1cm4gbn1lbHNlIHRoaXMuZWFjaChmdW5jdGlvbigpe0suc2V0KHRoaXMsZSx0KX0pfSxudWxsLHQsYXJndW1lbnRzLmxlbmd0aD4xLG51bGwsITApfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtLLnJlbW92ZSh0aGlzLGUpfSl9fSksdy5leHRlbmQoe3F1ZXVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcjtpZihlKXJldHVybiB0PSh0fHxcXFwiZnhcXFwiKStcXFwicXVldWVcXFwiLHI9Si5nZXQoZSx0KSxuJiYoIXJ8fEFycmF5LmlzQXJyYXkobik/cj1KLmFjY2VzcyhlLHQsdy5tYWtlQXJyYXkobikpOnIucHVzaChuKSkscnx8W119LGRlcXVldWU6ZnVuY3Rpb24oZSx0KXt0PXR8fFxcXCJmeFxcXCI7dmFyIG49dy5xdWV1ZShlLHQpLHI9bi5sZW5ndGgsaT1uLnNoaWZ0KCksbz13Ll9xdWV1ZUhvb2tzKGUsdCksYT1mdW5jdGlvbigpe3cuZGVxdWV1ZShlLHQpfTtcXFwiaW5wcm9ncmVzc1xcXCI9PT1pJiYoaT1uLnNoaWZ0KCksci0tKSxpJiYoXFxcImZ4XFxcIj09PXQmJm4udW5zaGlmdChcXFwiaW5wcm9ncmVzc1xcXCIpLGRlbGV0ZSBvLnN0b3AsaS5jYWxsKGUsYSxvKSksIXImJm8mJm8uZW1wdHkuZmlyZSgpfSxfcXVldWVIb29rczpmdW5jdGlvbihlLHQpe3ZhciBuPXQrXFxcInF1ZXVlSG9va3NcXFwiO3JldHVybiBKLmdldChlLG4pfHxKLmFjY2VzcyhlLG4se2VtcHR5OncuQ2FsbGJhY2tzKFxcXCJvbmNlIG1lbW9yeVxcXCIpLmFkZChmdW5jdGlvbigpe0oucmVtb3ZlKGUsW3QrXFxcInF1ZXVlXFxcIixuXSl9KX0pfX0pLHcuZm4uZXh0ZW5kKHtxdWV1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPTI7cmV0dXJuXFxcInN0cmluZ1xcXCIhPXR5cGVvZiBlJiYodD1lLGU9XFxcImZ4XFxcIixuLS0pLGFyZ3VtZW50cy5sZW5ndGg8bj93LnF1ZXVlKHRoaXNbMF0sZSk6dm9pZCAwPT09dD90aGlzOnRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuPXcucXVldWUodGhpcyxlLHQpO3cuX3F1ZXVlSG9va3ModGhpcyxlKSxcXFwiZnhcXFwiPT09ZSYmXFxcImlucHJvZ3Jlc3NcXFwiIT09blswXSYmdy5kZXF1ZXVlKHRoaXMsZSl9KX0sZGVxdWV1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dy5kZXF1ZXVlKHRoaXMsZSl9KX0sY2xlYXJRdWV1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5xdWV1ZShlfHxcXFwiZnhcXFwiLFtdKX0scHJvbWlzZTpmdW5jdGlvbihlLHQpe3ZhciBuLHI9MSxpPXcuRGVmZXJyZWQoKSxvPXRoaXMsYT10aGlzLmxlbmd0aCxzPWZ1bmN0aW9uKCl7LS1yfHxpLnJlc29sdmVXaXRoKG8sW29dKX07XFxcInN0cmluZ1xcXCIhPXR5cGVvZiBlJiYodD1lLGU9dm9pZCAwKSxlPWV8fFxcXCJmeFxcXCI7d2hpbGUoYS0tKShuPUouZ2V0KG9bYV0sZStcXFwicXVldWVIb29rc1xcXCIpKSYmbi5lbXB0eSYmKHIrKyxuLmVtcHR5LmFkZChzKSk7cmV0dXJuIHMoKSxpLnByb21pc2UodCl9fSk7dmFyIHJlPS9bKy1dPyg/OlxcXFxkKlxcXFwufClcXFxcZCsoPzpbZUVdWystXT9cXFxcZCt8KS8uc291cmNlLGllPW5ldyBSZWdFeHAoXFxcIl4oPzooWystXSk9fCkoXFxcIityZStcXFwiKShbYS16JV0qKSRcXFwiLFxcXCJpXFxcIiksb2U9W1xcXCJUb3BcXFwiLFxcXCJSaWdodFxcXCIsXFxcIkJvdHRvbVxcXCIsXFxcIkxlZnRcXFwiXSxhZT1mdW5jdGlvbihlLHQpe3JldHVyblxcXCJub25lXFxcIj09PShlPXR8fGUpLnN0eWxlLmRpc3BsYXl8fFxcXCJcXFwiPT09ZS5zdHlsZS5kaXNwbGF5JiZ3LmNvbnRhaW5zKGUub3duZXJEb2N1bWVudCxlKSYmXFxcIm5vbmVcXFwiPT09dy5jc3MoZSxcXFwiZGlzcGxheVxcXCIpfSxzZT1mdW5jdGlvbihlLHQsbixyKXt2YXIgaSxvLGE9e307Zm9yKG8gaW4gdClhW29dPWUuc3R5bGVbb10sZS5zdHlsZVtvXT10W29dO2k9bi5hcHBseShlLHJ8fFtdKTtmb3IobyBpbiB0KWUuc3R5bGVbb109YVtvXTtyZXR1cm4gaX07ZnVuY3Rpb24gdWUoZSx0LG4scil7dmFyIGksbyxhPTIwLHM9cj9mdW5jdGlvbigpe3JldHVybiByLmN1cigpfTpmdW5jdGlvbigpe3JldHVybiB3LmNzcyhlLHQsXFxcIlxcXCIpfSx1PXMoKSxsPW4mJm5bM118fCh3LmNzc051bWJlclt0XT9cXFwiXFxcIjpcXFwicHhcXFwiKSxjPSh3LmNzc051bWJlclt0XXx8XFxcInB4XFxcIiE9PWwmJit1KSYmaWUuZXhlYyh3LmNzcyhlLHQpKTtpZihjJiZjWzNdIT09bCl7dS89MixsPWx8fGNbM10sYz0rdXx8MTt3aGlsZShhLS0pdy5zdHlsZShlLHQsYytsKSwoMS1vKSooMS0obz1zKCkvdXx8LjUpKTw9MCYmKGE9MCksYy89bztjKj0yLHcuc3R5bGUoZSx0LGMrbCksbj1ufHxbXX1yZXR1cm4gbiYmKGM9K2N8fCt1fHwwLGk9blsxXT9jKyhuWzFdKzEpKm5bMl06K25bMl0sciYmKHIudW5pdD1sLHIuc3RhcnQ9YyxyLmVuZD1pKSksaX12YXIgbGU9e307ZnVuY3Rpb24gY2UoZSl7dmFyIHQsbj1lLm93bmVyRG9jdW1lbnQscj1lLm5vZGVOYW1lLGk9bGVbcl07cmV0dXJuIGl8fCh0PW4uYm9keS5hcHBlbmRDaGlsZChuLmNyZWF0ZUVsZW1lbnQocikpLGk9dy5jc3ModCxcXFwiZGlzcGxheVxcXCIpLHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KSxcXFwibm9uZVxcXCI9PT1pJiYoaT1cXFwiYmxvY2tcXFwiKSxsZVtyXT1pLGkpfWZ1bmN0aW9uIGZlKGUsdCl7Zm9yKHZhciBuLHIsaT1bXSxvPTAsYT1lLmxlbmd0aDtvPGE7bysrKShyPWVbb10pLnN0eWxlJiYobj1yLnN0eWxlLmRpc3BsYXksdD8oXFxcIm5vbmVcXFwiPT09biYmKGlbb109Si5nZXQocixcXFwiZGlzcGxheVxcXCIpfHxudWxsLGlbb118fChyLnN0eWxlLmRpc3BsYXk9XFxcIlxcXCIpKSxcXFwiXFxcIj09PXIuc3R5bGUuZGlzcGxheSYmYWUocikmJihpW29dPWNlKHIpKSk6XFxcIm5vbmVcXFwiIT09biYmKGlbb109XFxcIm5vbmVcXFwiLEouc2V0KHIsXFxcImRpc3BsYXlcXFwiLG4pKSk7Zm9yKG89MDtvPGE7bysrKW51bGwhPWlbb10mJihlW29dLnN0eWxlLmRpc3BsYXk9aVtvXSk7cmV0dXJuIGV9dy5mbi5leHRlbmQoe3Nob3c6ZnVuY3Rpb24oKXtyZXR1cm4gZmUodGhpcywhMCl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gZmUodGhpcyl9LHRvZ2dsZTpmdW5jdGlvbihlKXtyZXR1cm5cXFwiYm9vbGVhblxcXCI9PXR5cGVvZiBlP2U/dGhpcy5zaG93KCk6dGhpcy5oaWRlKCk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7YWUodGhpcyk/dyh0aGlzKS5zaG93KCk6dyh0aGlzKS5oaWRlKCl9KX19KTt2YXIgcGU9L14oPzpjaGVja2JveHxyYWRpbykkL2ksZGU9LzwoW2Etel1bXlxcXFwvXFxcXDA+XFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXSspL2ksaGU9L14kfF5tb2R1bGUkfFxcXFwvKD86amF2YXxlY21hKXNjcmlwdC9pLGdlPXtvcHRpb246WzEsXFxcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cXFwiLFxcXCI8L3NlbGVjdD5cXFwiXSx0aGVhZDpbMSxcXFwiPHRhYmxlPlxcXCIsXFxcIjwvdGFibGU+XFxcIl0sY29sOlsyLFxcXCI8dGFibGU+PGNvbGdyb3VwPlxcXCIsXFxcIjwvY29sZ3JvdXA+PC90YWJsZT5cXFwiXSx0cjpbMixcXFwiPHRhYmxlPjx0Ym9keT5cXFwiLFxcXCI8L3Rib2R5PjwvdGFibGU+XFxcIl0sdGQ6WzMsXFxcIjx0YWJsZT48dGJvZHk+PHRyPlxcXCIsXFxcIjwvdHI+PC90Ym9keT48L3RhYmxlPlxcXCJdLF9kZWZhdWx0OlswLFxcXCJcXFwiLFxcXCJcXFwiXX07Z2Uub3B0Z3JvdXA9Z2Uub3B0aW9uLGdlLnRib2R5PWdlLnRmb290PWdlLmNvbGdyb3VwPWdlLmNhcHRpb249Z2UudGhlYWQsZ2UudGg9Z2UudGQ7ZnVuY3Rpb24geWUoZSx0KXt2YXIgbjtyZXR1cm4gbj1cXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIGUuZ2V0RWxlbWVudHNCeVRhZ05hbWU/ZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0fHxcXFwiKlxcXCIpOlxcXCJ1bmRlZmluZWRcXFwiIT10eXBlb2YgZS5xdWVyeVNlbGVjdG9yQWxsP2UucXVlcnlTZWxlY3RvckFsbCh0fHxcXFwiKlxcXCIpOltdLHZvaWQgMD09PXR8fHQmJk4oZSx0KT93Lm1lcmdlKFtlXSxuKTpufWZ1bmN0aW9uIHZlKGUsdCl7Zm9yKHZhciBuPTAscj1lLmxlbmd0aDtuPHI7bisrKUouc2V0KGVbbl0sXFxcImdsb2JhbEV2YWxcXFwiLCF0fHxKLmdldCh0W25dLFxcXCJnbG9iYWxFdmFsXFxcIikpfXZhciBtZT0vPHwmIz9cXFxcdys7LztmdW5jdGlvbiB4ZShlLHQsbixyLGkpe2Zvcih2YXIgbyxhLHMsdSxsLGMsZj10LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxwPVtdLGQ9MCxoPWUubGVuZ3RoO2Q8aDtkKyspaWYoKG89ZVtkXSl8fDA9PT1vKWlmKFxcXCJvYmplY3RcXFwiPT09eChvKSl3Lm1lcmdlKHAsby5ub2RlVHlwZT9bb106byk7ZWxzZSBpZihtZS50ZXN0KG8pKXthPWF8fGYuYXBwZW5kQ2hpbGQodC5jcmVhdGVFbGVtZW50KFxcXCJkaXZcXFwiKSkscz0oZGUuZXhlYyhvKXx8W1xcXCJcXFwiLFxcXCJcXFwiXSlbMV0udG9Mb3dlckNhc2UoKSx1PWdlW3NdfHxnZS5fZGVmYXVsdCxhLmlubmVySFRNTD11WzFdK3cuaHRtbFByZWZpbHRlcihvKSt1WzJdLGM9dVswXTt3aGlsZShjLS0pYT1hLmxhc3RDaGlsZDt3Lm1lcmdlKHAsYS5jaGlsZE5vZGVzKSwoYT1mLmZpcnN0Q2hpbGQpLnRleHRDb250ZW50PVxcXCJcXFwifWVsc2UgcC5wdXNoKHQuY3JlYXRlVGV4dE5vZGUobykpO2YudGV4dENvbnRlbnQ9XFxcIlxcXCIsZD0wO3doaWxlKG89cFtkKytdKWlmKHImJncuaW5BcnJheShvLHIpPi0xKWkmJmkucHVzaChvKTtlbHNlIGlmKGw9dy5jb250YWlucyhvLm93bmVyRG9jdW1lbnQsbyksYT15ZShmLmFwcGVuZENoaWxkKG8pLFxcXCJzY3JpcHRcXFwiKSxsJiZ2ZShhKSxuKXtjPTA7d2hpbGUobz1hW2MrK10paGUudGVzdChvLnR5cGV8fFxcXCJcXFwiKSYmbi5wdXNoKG8pfXJldHVybiBmfSFmdW5jdGlvbigpe3ZhciBlPXIuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLmFwcGVuZENoaWxkKHIuY3JlYXRlRWxlbWVudChcXFwiZGl2XFxcIikpLHQ9ci5jcmVhdGVFbGVtZW50KFxcXCJpbnB1dFxcXCIpO3Quc2V0QXR0cmlidXRlKFxcXCJ0eXBlXFxcIixcXFwicmFkaW9cXFwiKSx0LnNldEF0dHJpYnV0ZShcXFwiY2hlY2tlZFxcXCIsXFxcImNoZWNrZWRcXFwiKSx0LnNldEF0dHJpYnV0ZShcXFwibmFtZVxcXCIsXFxcInRcXFwiKSxlLmFwcGVuZENoaWxkKHQpLGguY2hlY2tDbG9uZT1lLmNsb25lTm9kZSghMCkuY2xvbmVOb2RlKCEwKS5sYXN0Q2hpbGQuY2hlY2tlZCxlLmlubmVySFRNTD1cXFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlxcXCIsaC5ub0Nsb25lQ2hlY2tlZD0hIWUuY2xvbmVOb2RlKCEwKS5sYXN0Q2hpbGQuZGVmYXVsdFZhbHVlfSgpO3ZhciBiZT1yLmRvY3VtZW50RWxlbWVudCx3ZT0vXmtleS8sVGU9L14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcCl8Y2xpY2svLENlPS9eKFteLl0qKSg/OlxcXFwuKC4rKXwpLztmdW5jdGlvbiBFZSgpe3JldHVybiEwfWZ1bmN0aW9uIGtlKCl7cmV0dXJuITF9ZnVuY3Rpb24gU2UoKXt0cnl7cmV0dXJuIHIuYWN0aXZlRWxlbWVudH1jYXRjaChlKXt9fWZ1bmN0aW9uIERlKGUsdCxuLHIsaSxvKXt2YXIgYSxzO2lmKFxcXCJvYmplY3RcXFwiPT10eXBlb2YgdCl7XFxcInN0cmluZ1xcXCIhPXR5cGVvZiBuJiYocj1yfHxuLG49dm9pZCAwKTtmb3IocyBpbiB0KURlKGUscyxuLHIsdFtzXSxvKTtyZXR1cm4gZX1pZihudWxsPT1yJiZudWxsPT1pPyhpPW4scj1uPXZvaWQgMCk6bnVsbD09aSYmKFxcXCJzdHJpbmdcXFwiPT10eXBlb2Ygbj8oaT1yLHI9dm9pZCAwKTooaT1yLHI9bixuPXZvaWQgMCkpLCExPT09aSlpPWtlO2Vsc2UgaWYoIWkpcmV0dXJuIGU7cmV0dXJuIDE9PT1vJiYoYT1pLChpPWZ1bmN0aW9uKGUpe3JldHVybiB3KCkub2ZmKGUpLGEuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkuZ3VpZD1hLmd1aWR8fChhLmd1aWQ9dy5ndWlkKyspKSxlLmVhY2goZnVuY3Rpb24oKXt3LmV2ZW50LmFkZCh0aGlzLHQsaSxyLG4pfSl9dy5ldmVudD17Z2xvYmFsOnt9LGFkZDpmdW5jdGlvbihlLHQsbixyLGkpe3ZhciBvLGEscyx1LGwsYyxmLHAsZCxoLGcseT1KLmdldChlKTtpZih5KXtuLmhhbmRsZXImJihuPShvPW4pLmhhbmRsZXIsaT1vLnNlbGVjdG9yKSxpJiZ3LmZpbmQubWF0Y2hlc1NlbGVjdG9yKGJlLGkpLG4uZ3VpZHx8KG4uZ3VpZD13Lmd1aWQrKyksKHU9eS5ldmVudHMpfHwodT15LmV2ZW50cz17fSksKGE9eS5oYW5kbGUpfHwoYT15LmhhbmRsZT1mdW5jdGlvbih0KXtyZXR1cm5cXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIHcmJncuZXZlbnQudHJpZ2dlcmVkIT09dC50eXBlP3cuZXZlbnQuZGlzcGF0Y2guYXBwbHkoZSxhcmd1bWVudHMpOnZvaWQgMH0pLGw9KHQ9KHR8fFxcXCJcXFwiKS5tYXRjaChNKXx8W1xcXCJcXFwiXSkubGVuZ3RoO3doaWxlKGwtLSlkPWc9KHM9Q2UuZXhlYyh0W2xdKXx8W10pWzFdLGg9KHNbMl18fFxcXCJcXFwiKS5zcGxpdChcXFwiLlxcXCIpLnNvcnQoKSxkJiYoZj13LmV2ZW50LnNwZWNpYWxbZF18fHt9LGQ9KGk/Zi5kZWxlZ2F0ZVR5cGU6Zi5iaW5kVHlwZSl8fGQsZj13LmV2ZW50LnNwZWNpYWxbZF18fHt9LGM9dy5leHRlbmQoe3R5cGU6ZCxvcmlnVHlwZTpnLGRhdGE6cixoYW5kbGVyOm4sZ3VpZDpuLmd1aWQsc2VsZWN0b3I6aSxuZWVkc0NvbnRleHQ6aSYmdy5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KGkpLG5hbWVzcGFjZTpoLmpvaW4oXFxcIi5cXFwiKX0sbyksKHA9dVtkXSl8fCgocD11W2RdPVtdKS5kZWxlZ2F0ZUNvdW50PTAsZi5zZXR1cCYmITEhPT1mLnNldHVwLmNhbGwoZSxyLGgsYSl8fGUuYWRkRXZlbnRMaXN0ZW5lciYmZS5hZGRFdmVudExpc3RlbmVyKGQsYSkpLGYuYWRkJiYoZi5hZGQuY2FsbChlLGMpLGMuaGFuZGxlci5ndWlkfHwoYy5oYW5kbGVyLmd1aWQ9bi5ndWlkKSksaT9wLnNwbGljZShwLmRlbGVnYXRlQ291bnQrKywwLGMpOnAucHVzaChjKSx3LmV2ZW50Lmdsb2JhbFtkXT0hMCl9fSxyZW1vdmU6ZnVuY3Rpb24oZSx0LG4scixpKXt2YXIgbyxhLHMsdSxsLGMsZixwLGQsaCxnLHk9Si5oYXNEYXRhKGUpJiZKLmdldChlKTtpZih5JiYodT15LmV2ZW50cykpe2w9KHQ9KHR8fFxcXCJcXFwiKS5tYXRjaChNKXx8W1xcXCJcXFwiXSkubGVuZ3RoO3doaWxlKGwtLSlpZihzPUNlLmV4ZWModFtsXSl8fFtdLGQ9Zz1zWzFdLGg9KHNbMl18fFxcXCJcXFwiKS5zcGxpdChcXFwiLlxcXCIpLnNvcnQoKSxkKXtmPXcuZXZlbnQuc3BlY2lhbFtkXXx8e30scD11W2Q9KHI/Zi5kZWxlZ2F0ZVR5cGU6Zi5iaW5kVHlwZSl8fGRdfHxbXSxzPXNbMl0mJm5ldyBSZWdFeHAoXFxcIihefFxcXFxcXFxcLilcXFwiK2guam9pbihcXFwiXFxcXFxcXFwuKD86LipcXFxcXFxcXC58KVxcXCIpK1xcXCIoXFxcXFxcXFwufCQpXFxcIiksYT1vPXAubGVuZ3RoO3doaWxlKG8tLSljPXBbb10sIWkmJmchPT1jLm9yaWdUeXBlfHxuJiZuLmd1aWQhPT1jLmd1aWR8fHMmJiFzLnRlc3QoYy5uYW1lc3BhY2UpfHxyJiZyIT09Yy5zZWxlY3RvciYmKFxcXCIqKlxcXCIhPT1yfHwhYy5zZWxlY3Rvcil8fChwLnNwbGljZShvLDEpLGMuc2VsZWN0b3ImJnAuZGVsZWdhdGVDb3VudC0tLGYucmVtb3ZlJiZmLnJlbW92ZS5jYWxsKGUsYykpO2EmJiFwLmxlbmd0aCYmKGYudGVhcmRvd24mJiExIT09Zi50ZWFyZG93bi5jYWxsKGUsaCx5LmhhbmRsZSl8fHcucmVtb3ZlRXZlbnQoZSxkLHkuaGFuZGxlKSxkZWxldGUgdVtkXSl9ZWxzZSBmb3IoZCBpbiB1KXcuZXZlbnQucmVtb3ZlKGUsZCt0W2xdLG4sciwhMCk7dy5pc0VtcHR5T2JqZWN0KHUpJiZKLnJlbW92ZShlLFxcXCJoYW5kbGUgZXZlbnRzXFxcIil9fSxkaXNwYXRjaDpmdW5jdGlvbihlKXt2YXIgdD13LmV2ZW50LmZpeChlKSxuLHIsaSxvLGEscyx1PW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKSxsPShKLmdldCh0aGlzLFxcXCJldmVudHNcXFwiKXx8e30pW3QudHlwZV18fFtdLGM9dy5ldmVudC5zcGVjaWFsW3QudHlwZV18fHt9O2Zvcih1WzBdPXQsbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspdVtuXT1hcmd1bWVudHNbbl07aWYodC5kZWxlZ2F0ZVRhcmdldD10aGlzLCFjLnByZURpc3BhdGNofHwhMSE9PWMucHJlRGlzcGF0Y2guY2FsbCh0aGlzLHQpKXtzPXcuZXZlbnQuaGFuZGxlcnMuY2FsbCh0aGlzLHQsbCksbj0wO3doaWxlKChvPXNbbisrXSkmJiF0LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpe3QuY3VycmVudFRhcmdldD1vLmVsZW0scj0wO3doaWxlKChhPW8uaGFuZGxlcnNbcisrXSkmJiF0LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpdC5ybmFtZXNwYWNlJiYhdC5ybmFtZXNwYWNlLnRlc3QoYS5uYW1lc3BhY2UpfHwodC5oYW5kbGVPYmo9YSx0LmRhdGE9YS5kYXRhLHZvaWQgMCE9PShpPSgody5ldmVudC5zcGVjaWFsW2Eub3JpZ1R5cGVdfHx7fSkuaGFuZGxlfHxhLmhhbmRsZXIpLmFwcGx5KG8uZWxlbSx1KSkmJiExPT09KHQucmVzdWx0PWkpJiYodC5wcmV2ZW50RGVmYXVsdCgpLHQuc3RvcFByb3BhZ2F0aW9uKCkpKX1yZXR1cm4gYy5wb3N0RGlzcGF0Y2gmJmMucG9zdERpc3BhdGNoLmNhbGwodGhpcyx0KSx0LnJlc3VsdH19LGhhbmRsZXJzOmZ1bmN0aW9uKGUsdCl7dmFyIG4scixpLG8sYSxzPVtdLHU9dC5kZWxlZ2F0ZUNvdW50LGw9ZS50YXJnZXQ7aWYodSYmbC5ub2RlVHlwZSYmIShcXFwiY2xpY2tcXFwiPT09ZS50eXBlJiZlLmJ1dHRvbj49MSkpZm9yKDtsIT09dGhpcztsPWwucGFyZW50Tm9kZXx8dGhpcylpZigxPT09bC5ub2RlVHlwZSYmKFxcXCJjbGlja1xcXCIhPT1lLnR5cGV8fCEwIT09bC5kaXNhYmxlZCkpe2ZvcihvPVtdLGE9e30sbj0wO248dTtuKyspdm9pZCAwPT09YVtpPShyPXRbbl0pLnNlbGVjdG9yK1xcXCIgXFxcIl0mJihhW2ldPXIubmVlZHNDb250ZXh0P3coaSx0aGlzKS5pbmRleChsKT4tMTp3LmZpbmQoaSx0aGlzLG51bGwsW2xdKS5sZW5ndGgpLGFbaV0mJm8ucHVzaChyKTtvLmxlbmd0aCYmcy5wdXNoKHtlbGVtOmwsaGFuZGxlcnM6b30pfXJldHVybiBsPXRoaXMsdTx0Lmxlbmd0aCYmcy5wdXNoKHtlbGVtOmwsaGFuZGxlcnM6dC5zbGljZSh1KX0pLHN9LGFkZFByb3A6ZnVuY3Rpb24oZSx0KXtPYmplY3QuZGVmaW5lUHJvcGVydHkody5FdmVudC5wcm90b3R5cGUsZSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsZ2V0OmcodCk/ZnVuY3Rpb24oKXtpZih0aGlzLm9yaWdpbmFsRXZlbnQpcmV0dXJuIHQodGhpcy5vcmlnaW5hbEV2ZW50KX06ZnVuY3Rpb24oKXtpZih0aGlzLm9yaWdpbmFsRXZlbnQpcmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFtlXX0sc2V0OmZ1bmN0aW9uKHQpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLGUse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOnR9KX19KX0sZml4OmZ1bmN0aW9uKGUpe3JldHVybiBlW3cuZXhwYW5kb10/ZTpuZXcgdy5FdmVudChlKX0sc3BlY2lhbDp7bG9hZDp7bm9CdWJibGU6ITB9LGZvY3VzOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7aWYodGhpcyE9PVNlKCkmJnRoaXMuZm9jdXMpcmV0dXJuIHRoaXMuZm9jdXMoKSwhMX0sZGVsZWdhdGVUeXBlOlxcXCJmb2N1c2luXFxcIn0sYmx1cjp7dHJpZ2dlcjpmdW5jdGlvbigpe2lmKHRoaXM9PT1TZSgpJiZ0aGlzLmJsdXIpcmV0dXJuIHRoaXMuYmx1cigpLCExfSxkZWxlZ2F0ZVR5cGU6XFxcImZvY3Vzb3V0XFxcIn0sY2xpY2s6e3RyaWdnZXI6ZnVuY3Rpb24oKXtpZihcXFwiY2hlY2tib3hcXFwiPT09dGhpcy50eXBlJiZ0aGlzLmNsaWNrJiZOKHRoaXMsXFxcImlucHV0XFxcIikpcmV0dXJuIHRoaXMuY2xpY2soKSwhMX0sX2RlZmF1bHQ6ZnVuY3Rpb24oZSl7cmV0dXJuIE4oZS50YXJnZXQsXFxcImFcXFwiKX19LGJlZm9yZXVubG9hZDp7cG9zdERpc3BhdGNoOmZ1bmN0aW9uKGUpe3ZvaWQgMCE9PWUucmVzdWx0JiZlLm9yaWdpbmFsRXZlbnQmJihlLm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWU9ZS5yZXN1bHQpfX19fSx3LnJlbW92ZUV2ZW50PWZ1bmN0aW9uKGUsdCxuKXtlLnJlbW92ZUV2ZW50TGlzdGVuZXImJmUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LG4pfSx3LkV2ZW50PWZ1bmN0aW9uKGUsdCl7aWYoISh0aGlzIGluc3RhbmNlb2Ygdy5FdmVudCkpcmV0dXJuIG5ldyB3LkV2ZW50KGUsdCk7ZSYmZS50eXBlPyh0aGlzLm9yaWdpbmFsRXZlbnQ9ZSx0aGlzLnR5cGU9ZS50eXBlLHRoaXMuaXNEZWZhdWx0UHJldmVudGVkPWUuZGVmYXVsdFByZXZlbnRlZHx8dm9pZCAwPT09ZS5kZWZhdWx0UHJldmVudGVkJiYhMT09PWUucmV0dXJuVmFsdWU/RWU6a2UsdGhpcy50YXJnZXQ9ZS50YXJnZXQmJjM9PT1lLnRhcmdldC5ub2RlVHlwZT9lLnRhcmdldC5wYXJlbnROb2RlOmUudGFyZ2V0LHRoaXMuY3VycmVudFRhcmdldD1lLmN1cnJlbnRUYXJnZXQsdGhpcy5yZWxhdGVkVGFyZ2V0PWUucmVsYXRlZFRhcmdldCk6dGhpcy50eXBlPWUsdCYmdy5leHRlbmQodGhpcyx0KSx0aGlzLnRpbWVTdGFtcD1lJiZlLnRpbWVTdGFtcHx8RGF0ZS5ub3coKSx0aGlzW3cuZXhwYW5kb109ITB9LHcuRXZlbnQucHJvdG90eXBlPXtjb25zdHJ1Y3Rvcjp3LkV2ZW50LGlzRGVmYXVsdFByZXZlbnRlZDprZSxpc1Byb3BhZ2F0aW9uU3RvcHBlZDprZSxpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDprZSxpc1NpbXVsYXRlZDohMSxwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe3ZhciBlPXRoaXMub3JpZ2luYWxFdmVudDt0aGlzLmlzRGVmYXVsdFByZXZlbnRlZD1FZSxlJiYhdGhpcy5pc1NpbXVsYXRlZCYmZS5wcmV2ZW50RGVmYXVsdCgpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgZT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZD1FZSxlJiYhdGhpcy5pc1NpbXVsYXRlZCYmZS5zdG9wUHJvcGFnYXRpb24oKX0sc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5vcmlnaW5hbEV2ZW50O3RoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ9RWUsZSYmIXRoaXMuaXNTaW11bGF0ZWQmJmUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksdGhpcy5zdG9wUHJvcGFnYXRpb24oKX19LHcuZWFjaCh7YWx0S2V5OiEwLGJ1YmJsZXM6ITAsY2FuY2VsYWJsZTohMCxjaGFuZ2VkVG91Y2hlczohMCxjdHJsS2V5OiEwLGRldGFpbDohMCxldmVudFBoYXNlOiEwLG1ldGFLZXk6ITAscGFnZVg6ITAscGFnZVk6ITAsc2hpZnRLZXk6ITAsdmlldzohMCxcXFwiY2hhclxcXCI6ITAsY2hhckNvZGU6ITAsa2V5OiEwLGtleUNvZGU6ITAsYnV0dG9uOiEwLGJ1dHRvbnM6ITAsY2xpZW50WDohMCxjbGllbnRZOiEwLG9mZnNldFg6ITAsb2Zmc2V0WTohMCxwb2ludGVySWQ6ITAscG9pbnRlclR5cGU6ITAsc2NyZWVuWDohMCxzY3JlZW5ZOiEwLHRhcmdldFRvdWNoZXM6ITAsdG9FbGVtZW50OiEwLHRvdWNoZXM6ITAsd2hpY2g6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5idXR0b247cmV0dXJuIG51bGw9PWUud2hpY2gmJndlLnRlc3QoZS50eXBlKT9udWxsIT1lLmNoYXJDb2RlP2UuY2hhckNvZGU6ZS5rZXlDb2RlOiFlLndoaWNoJiZ2b2lkIDAhPT10JiZUZS50ZXN0KGUudHlwZSk/MSZ0PzE6MiZ0PzM6NCZ0PzI6MDplLndoaWNofX0sdy5ldmVudC5hZGRQcm9wKSx3LmVhY2goe21vdXNlZW50ZXI6XFxcIm1vdXNlb3ZlclxcXCIsbW91c2VsZWF2ZTpcXFwibW91c2VvdXRcXFwiLHBvaW50ZXJlbnRlcjpcXFwicG9pbnRlcm92ZXJcXFwiLHBvaW50ZXJsZWF2ZTpcXFwicG9pbnRlcm91dFxcXCJ9LGZ1bmN0aW9uKGUsdCl7dy5ldmVudC5zcGVjaWFsW2VdPXtkZWxlZ2F0ZVR5cGU6dCxiaW5kVHlwZTp0LGhhbmRsZTpmdW5jdGlvbihlKXt2YXIgbixyPXRoaXMsaT1lLnJlbGF0ZWRUYXJnZXQsbz1lLmhhbmRsZU9iajtyZXR1cm4gaSYmKGk9PT1yfHx3LmNvbnRhaW5zKHIsaSkpfHwoZS50eXBlPW8ub3JpZ1R5cGUsbj1vLmhhbmRsZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpLGUudHlwZT10KSxufX19KSx3LmZuLmV4dGVuZCh7b246ZnVuY3Rpb24oZSx0LG4scil7cmV0dXJuIERlKHRoaXMsZSx0LG4scil9LG9uZTpmdW5jdGlvbihlLHQsbixyKXtyZXR1cm4gRGUodGhpcyxlLHQsbixyLDEpfSxvZmY6ZnVuY3Rpb24oZSx0LG4pe3ZhciByLGk7aWYoZSYmZS5wcmV2ZW50RGVmYXVsdCYmZS5oYW5kbGVPYmopcmV0dXJuIHI9ZS5oYW5kbGVPYmosdyhlLmRlbGVnYXRlVGFyZ2V0KS5vZmYoci5uYW1lc3BhY2U/ci5vcmlnVHlwZStcXFwiLlxcXCIrci5uYW1lc3BhY2U6ci5vcmlnVHlwZSxyLnNlbGVjdG9yLHIuaGFuZGxlciksdGhpcztpZihcXFwib2JqZWN0XFxcIj09dHlwZW9mIGUpe2ZvcihpIGluIGUpdGhpcy5vZmYoaSx0LGVbaV0pO3JldHVybiB0aGlzfXJldHVybiExIT09dCYmXFxcImZ1bmN0aW9uXFxcIiE9dHlwZW9mIHR8fChuPXQsdD12b2lkIDApLCExPT09biYmKG49a2UpLHRoaXMuZWFjaChmdW5jdGlvbigpe3cuZXZlbnQucmVtb3ZlKHRoaXMsZSxuLHQpfSl9fSk7dmFyIE5lPS88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFthLXpdW15cXFxcL1xcXFwwPlxcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl0qKVtePl0qKVxcXFwvPi9naSxBZT0vPHNjcmlwdHw8c3R5bGV8PGxpbmsvaSxqZT0vY2hlY2tlZFxcXFxzKig/OltePV18PVxcXFxzKi5jaGVja2VkLikvaSxxZT0vXlxcXFxzKjwhKD86XFxcXFtDREFUQVxcXFxbfC0tKXwoPzpcXFxcXVxcXFxdfC0tKT5cXFxccyokL2c7ZnVuY3Rpb24gTGUoZSx0KXtyZXR1cm4gTihlLFxcXCJ0YWJsZVxcXCIpJiZOKDExIT09dC5ub2RlVHlwZT90OnQuZmlyc3RDaGlsZCxcXFwidHJcXFwiKT93KGUpLmNoaWxkcmVuKFxcXCJ0Ym9keVxcXCIpWzBdfHxlOmV9ZnVuY3Rpb24gSGUoZSl7cmV0dXJuIGUudHlwZT0obnVsbCE9PWUuZ2V0QXR0cmlidXRlKFxcXCJ0eXBlXFxcIikpK1xcXCIvXFxcIitlLnR5cGUsZX1mdW5jdGlvbiBPZShlKXtyZXR1cm5cXFwidHJ1ZS9cXFwiPT09KGUudHlwZXx8XFxcIlxcXCIpLnNsaWNlKDAsNSk/ZS50eXBlPWUudHlwZS5zbGljZSg1KTplLnJlbW92ZUF0dHJpYnV0ZShcXFwidHlwZVxcXCIpLGV9ZnVuY3Rpb24gUGUoZSx0KXt2YXIgbixyLGksbyxhLHMsdSxsO2lmKDE9PT10Lm5vZGVUeXBlKXtpZihKLmhhc0RhdGEoZSkmJihvPUouYWNjZXNzKGUpLGE9Si5zZXQodCxvKSxsPW8uZXZlbnRzKSl7ZGVsZXRlIGEuaGFuZGxlLGEuZXZlbnRzPXt9O2ZvcihpIGluIGwpZm9yKG49MCxyPWxbaV0ubGVuZ3RoO248cjtuKyspdy5ldmVudC5hZGQodCxpLGxbaV1bbl0pfUsuaGFzRGF0YShlKSYmKHM9Sy5hY2Nlc3MoZSksdT13LmV4dGVuZCh7fSxzKSxLLnNldCh0LHUpKX19ZnVuY3Rpb24gTWUoZSx0KXt2YXIgbj10Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XFxcImlucHV0XFxcIj09PW4mJnBlLnRlc3QoZS50eXBlKT90LmNoZWNrZWQ9ZS5jaGVja2VkOlxcXCJpbnB1dFxcXCIhPT1uJiZcXFwidGV4dGFyZWFcXFwiIT09bnx8KHQuZGVmYXVsdFZhbHVlPWUuZGVmYXVsdFZhbHVlKX1mdW5jdGlvbiBSZShlLHQsbixyKXt0PWEuYXBwbHkoW10sdCk7dmFyIGksbyxzLHUsbCxjLGY9MCxwPWUubGVuZ3RoLGQ9cC0xLHk9dFswXSx2PWcoeSk7aWYodnx8cD4xJiZcXFwic3RyaW5nXFxcIj09dHlwZW9mIHkmJiFoLmNoZWNrQ2xvbmUmJmplLnRlc3QoeSkpcmV0dXJuIGUuZWFjaChmdW5jdGlvbihpKXt2YXIgbz1lLmVxKGkpO3YmJih0WzBdPXkuY2FsbCh0aGlzLGksby5odG1sKCkpKSxSZShvLHQsbixyKX0pO2lmKHAmJihpPXhlKHQsZVswXS5vd25lckRvY3VtZW50LCExLGUsciksbz1pLmZpcnN0Q2hpbGQsMT09PWkuY2hpbGROb2Rlcy5sZW5ndGgmJihpPW8pLG98fHIpKXtmb3IodT0ocz13Lm1hcCh5ZShpLFxcXCJzY3JpcHRcXFwiKSxIZSkpLmxlbmd0aDtmPHA7ZisrKWw9aSxmIT09ZCYmKGw9dy5jbG9uZShsLCEwLCEwKSx1JiZ3Lm1lcmdlKHMseWUobCxcXFwic2NyaXB0XFxcIikpKSxuLmNhbGwoZVtmXSxsLGYpO2lmKHUpZm9yKGM9c1tzLmxlbmd0aC0xXS5vd25lckRvY3VtZW50LHcubWFwKHMsT2UpLGY9MDtmPHU7ZisrKWw9c1tmXSxoZS50ZXN0KGwudHlwZXx8XFxcIlxcXCIpJiYhSi5hY2Nlc3MobCxcXFwiZ2xvYmFsRXZhbFxcXCIpJiZ3LmNvbnRhaW5zKGMsbCkmJihsLnNyYyYmXFxcIm1vZHVsZVxcXCIhPT0obC50eXBlfHxcXFwiXFxcIikudG9Mb3dlckNhc2UoKT93Ll9ldmFsVXJsJiZ3Ll9ldmFsVXJsKGwuc3JjKTptKGwudGV4dENvbnRlbnQucmVwbGFjZShxZSxcXFwiXFxcIiksYyxsKSl9cmV0dXJuIGV9ZnVuY3Rpb24gSWUoZSx0LG4pe2Zvcih2YXIgcixpPXQ/dy5maWx0ZXIodCxlKTplLG89MDtudWxsIT0ocj1pW29dKTtvKyspbnx8MSE9PXIubm9kZVR5cGV8fHcuY2xlYW5EYXRhKHllKHIpKSxyLnBhcmVudE5vZGUmJihuJiZ3LmNvbnRhaW5zKHIub3duZXJEb2N1bWVudCxyKSYmdmUoeWUocixcXFwic2NyaXB0XFxcIikpLHIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyKSk7cmV0dXJuIGV9dy5leHRlbmQoe2h0bWxQcmVmaWx0ZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVwbGFjZShOZSxcXFwiPCQxPjwvJDI+XFxcIil9LGNsb25lOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcixpLG8sYSxzPWUuY2xvbmVOb2RlKCEwKSx1PXcuY29udGFpbnMoZS5vd25lckRvY3VtZW50LGUpO2lmKCEoaC5ub0Nsb25lQ2hlY2tlZHx8MSE9PWUubm9kZVR5cGUmJjExIT09ZS5ub2RlVHlwZXx8dy5pc1hNTERvYyhlKSkpZm9yKGE9eWUocykscj0wLGk9KG89eWUoZSkpLmxlbmd0aDtyPGk7cisrKU1lKG9bcl0sYVtyXSk7aWYodClpZihuKWZvcihvPW98fHllKGUpLGE9YXx8eWUocykscj0wLGk9by5sZW5ndGg7cjxpO3IrKylQZShvW3JdLGFbcl0pO2Vsc2UgUGUoZSxzKTtyZXR1cm4oYT15ZShzLFxcXCJzY3JpcHRcXFwiKSkubGVuZ3RoPjAmJnZlKGEsIXUmJnllKGUsXFxcInNjcmlwdFxcXCIpKSxzfSxjbGVhbkRhdGE6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LG4scixpPXcuZXZlbnQuc3BlY2lhbCxvPTA7dm9pZCAwIT09KG49ZVtvXSk7bysrKWlmKFkobikpe2lmKHQ9bltKLmV4cGFuZG9dKXtpZih0LmV2ZW50cylmb3IociBpbiB0LmV2ZW50cylpW3JdP3cuZXZlbnQucmVtb3ZlKG4scik6dy5yZW1vdmVFdmVudChuLHIsdC5oYW5kbGUpO25bSi5leHBhbmRvXT12b2lkIDB9bltLLmV4cGFuZG9dJiYobltLLmV4cGFuZG9dPXZvaWQgMCl9fX0pLHcuZm4uZXh0ZW5kKHtkZXRhY2g6ZnVuY3Rpb24oZSl7cmV0dXJuIEllKHRoaXMsZSwhMCl9LHJlbW92ZTpmdW5jdGlvbihlKXtyZXR1cm4gSWUodGhpcyxlKX0sdGV4dDpmdW5jdGlvbihlKXtyZXR1cm4geih0aGlzLGZ1bmN0aW9uKGUpe3JldHVybiB2b2lkIDA9PT1lP3cudGV4dCh0aGlzKTp0aGlzLmVtcHR5KCkuZWFjaChmdW5jdGlvbigpezEhPT10aGlzLm5vZGVUeXBlJiYxMSE9PXRoaXMubm9kZVR5cGUmJjkhPT10aGlzLm5vZGVUeXBlfHwodGhpcy50ZXh0Q29udGVudD1lKX0pfSxudWxsLGUsYXJndW1lbnRzLmxlbmd0aCl9LGFwcGVuZDpmdW5jdGlvbigpe3JldHVybiBSZSh0aGlzLGFyZ3VtZW50cyxmdW5jdGlvbihlKXsxIT09dGhpcy5ub2RlVHlwZSYmMTEhPT10aGlzLm5vZGVUeXBlJiY5IT09dGhpcy5ub2RlVHlwZXx8TGUodGhpcyxlKS5hcHBlbmRDaGlsZChlKX0pfSxwcmVwZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIFJlKHRoaXMsYXJndW1lbnRzLGZ1bmN0aW9uKGUpe2lmKDE9PT10aGlzLm5vZGVUeXBlfHwxMT09PXRoaXMubm9kZVR5cGV8fDk9PT10aGlzLm5vZGVUeXBlKXt2YXIgdD1MZSh0aGlzLGUpO3QuaW5zZXJ0QmVmb3JlKGUsdC5maXJzdENoaWxkKX19KX0sYmVmb3JlOmZ1bmN0aW9uKCl7cmV0dXJuIFJlKHRoaXMsYXJndW1lbnRzLGZ1bmN0aW9uKGUpe3RoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHRoaXMpfSl9LGFmdGVyOmZ1bmN0aW9uKCl7cmV0dXJuIFJlKHRoaXMsYXJndW1lbnRzLGZ1bmN0aW9uKGUpe3RoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHRoaXMubmV4dFNpYmxpbmcpfSl9LGVtcHR5OmZ1bmN0aW9uKCl7Zm9yKHZhciBlLHQ9MDtudWxsIT0oZT10aGlzW3RdKTt0KyspMT09PWUubm9kZVR5cGUmJih3LmNsZWFuRGF0YSh5ZShlLCExKSksZS50ZXh0Q29udGVudD1cXFwiXFxcIik7cmV0dXJuIHRoaXN9LGNsb25lOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU9bnVsbCE9ZSYmZSx0PW51bGw9PXQ/ZTp0LHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHcuY2xvbmUodGhpcyxlLHQpfSl9LGh0bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHoodGhpcyxmdW5jdGlvbihlKXt2YXIgdD10aGlzWzBdfHx7fSxuPTAscj10aGlzLmxlbmd0aDtpZih2b2lkIDA9PT1lJiYxPT09dC5ub2RlVHlwZSlyZXR1cm4gdC5pbm5lckhUTUw7aWYoXFxcInN0cmluZ1xcXCI9PXR5cGVvZiBlJiYhQWUudGVzdChlKSYmIWdlWyhkZS5leGVjKGUpfHxbXFxcIlxcXCIsXFxcIlxcXCJdKVsxXS50b0xvd2VyQ2FzZSgpXSl7ZT13Lmh0bWxQcmVmaWx0ZXIoZSk7dHJ5e2Zvcig7bjxyO24rKykxPT09KHQ9dGhpc1tuXXx8e30pLm5vZGVUeXBlJiYody5jbGVhbkRhdGEoeWUodCwhMSkpLHQuaW5uZXJIVE1MPWUpO3Q9MH1jYXRjaChlKXt9fXQmJnRoaXMuZW1wdHkoKS5hcHBlbmQoZSl9LG51bGwsZSxhcmd1bWVudHMubGVuZ3RoKX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24oKXt2YXIgZT1bXTtyZXR1cm4gUmUodGhpcyxhcmd1bWVudHMsZnVuY3Rpb24odCl7dmFyIG49dGhpcy5wYXJlbnROb2RlO3cuaW5BcnJheSh0aGlzLGUpPDAmJih3LmNsZWFuRGF0YSh5ZSh0aGlzKSksbiYmbi5yZXBsYWNlQ2hpbGQodCx0aGlzKSl9LGUpfX0pLHcuZWFjaCh7YXBwZW5kVG86XFxcImFwcGVuZFxcXCIscHJlcGVuZFRvOlxcXCJwcmVwZW5kXFxcIixpbnNlcnRCZWZvcmU6XFxcImJlZm9yZVxcXCIsaW5zZXJ0QWZ0ZXI6XFxcImFmdGVyXFxcIixyZXBsYWNlQWxsOlxcXCJyZXBsYWNlV2l0aFxcXCJ9LGZ1bmN0aW9uKGUsdCl7dy5mbltlXT1mdW5jdGlvbihlKXtmb3IodmFyIG4scj1bXSxpPXcoZSksbz1pLmxlbmd0aC0xLGE9MDthPD1vO2ErKyluPWE9PT1vP3RoaXM6dGhpcy5jbG9uZSghMCksdyhpW2FdKVt0XShuKSxzLmFwcGx5KHIsbi5nZXQoKSk7cmV0dXJuIHRoaXMucHVzaFN0YWNrKHIpfX0pO3ZhciBXZT1uZXcgUmVnRXhwKFxcXCJeKFxcXCIrcmUrXFxcIikoPyFweClbYS16JV0rJFxcXCIsXFxcImlcXFwiKSwkZT1mdW5jdGlvbih0KXt2YXIgbj10Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7cmV0dXJuIG4mJm4ub3BlbmVyfHwobj1lKSxuLmdldENvbXB1dGVkU3R5bGUodCl9LEJlPW5ldyBSZWdFeHAob2Uuam9pbihcXFwifFxcXCIpLFxcXCJpXFxcIik7IWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2lmKGMpe2wuc3R5bGUuY3NzVGV4dD1cXFwicG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTExMTFweDt3aWR0aDo2MHB4O21hcmdpbi10b3A6MXB4O3BhZGRpbmc6MDtib3JkZXI6MFxcXCIsYy5zdHlsZS5jc3NUZXh0PVxcXCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveDtvdmVyZmxvdzpzY3JvbGw7bWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDt3aWR0aDo2MCU7dG9wOjElXFxcIixiZS5hcHBlbmRDaGlsZChsKS5hcHBlbmRDaGlsZChjKTt2YXIgdD1lLmdldENvbXB1dGVkU3R5bGUoYyk7aT1cXFwiMSVcXFwiIT09dC50b3AsdT0xMj09PW4odC5tYXJnaW5MZWZ0KSxjLnN0eWxlLnJpZ2h0PVxcXCI2MCVcXFwiLHM9MzY9PT1uKHQucmlnaHQpLG89MzY9PT1uKHQud2lkdGgpLGMuc3R5bGUucG9zaXRpb249XFxcImFic29sdXRlXFxcIixhPTM2PT09Yy5vZmZzZXRXaWR0aHx8XFxcImFic29sdXRlXFxcIixiZS5yZW1vdmVDaGlsZChsKSxjPW51bGx9fWZ1bmN0aW9uIG4oZSl7cmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdChlKSl9dmFyIGksbyxhLHMsdSxsPXIuY3JlYXRlRWxlbWVudChcXFwiZGl2XFxcIiksYz1yLmNyZWF0ZUVsZW1lbnQoXFxcImRpdlxcXCIpO2Muc3R5bGUmJihjLnN0eWxlLmJhY2tncm91bmRDbGlwPVxcXCJjb250ZW50LWJveFxcXCIsYy5jbG9uZU5vZGUoITApLnN0eWxlLmJhY2tncm91bmRDbGlwPVxcXCJcXFwiLGguY2xlYXJDbG9uZVN0eWxlPVxcXCJjb250ZW50LWJveFxcXCI9PT1jLnN0eWxlLmJhY2tncm91bmRDbGlwLHcuZXh0ZW5kKGgse2JveFNpemluZ1JlbGlhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIHQoKSxvfSxwaXhlbEJveFN0eWxlczpmdW5jdGlvbigpe3JldHVybiB0KCksc30scGl4ZWxQb3NpdGlvbjpmdW5jdGlvbigpe3JldHVybiB0KCksaX0scmVsaWFibGVNYXJnaW5MZWZ0OmZ1bmN0aW9uKCl7cmV0dXJuIHQoKSx1fSxzY3JvbGxib3hTaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHQoKSxhfX0pKX0oKTtmdW5jdGlvbiBGZShlLHQsbil7dmFyIHIsaSxvLGEscz1lLnN0eWxlO3JldHVybihuPW58fCRlKGUpKSYmKFxcXCJcXFwiIT09KGE9bi5nZXRQcm9wZXJ0eVZhbHVlKHQpfHxuW3RdKXx8dy5jb250YWlucyhlLm93bmVyRG9jdW1lbnQsZSl8fChhPXcuc3R5bGUoZSx0KSksIWgucGl4ZWxCb3hTdHlsZXMoKSYmV2UudGVzdChhKSYmQmUudGVzdCh0KSYmKHI9cy53aWR0aCxpPXMubWluV2lkdGgsbz1zLm1heFdpZHRoLHMubWluV2lkdGg9cy5tYXhXaWR0aD1zLndpZHRoPWEsYT1uLndpZHRoLHMud2lkdGg9cixzLm1pbldpZHRoPWkscy5tYXhXaWR0aD1vKSksdm9pZCAwIT09YT9hK1xcXCJcXFwiOmF9ZnVuY3Rpb24gX2UoZSx0KXtyZXR1cm57Z2V0OmZ1bmN0aW9uKCl7aWYoIWUoKSlyZXR1cm4odGhpcy5nZXQ9dCkuYXBwbHkodGhpcyxhcmd1bWVudHMpO2RlbGV0ZSB0aGlzLmdldH19fXZhciB6ZT0vXihub25lfHRhYmxlKD8hLWNbZWFdKS4rKS8sWGU9L14tLS8sVWU9e3Bvc2l0aW9uOlxcXCJhYnNvbHV0ZVxcXCIsdmlzaWJpbGl0eTpcXFwiaGlkZGVuXFxcIixkaXNwbGF5OlxcXCJibG9ja1xcXCJ9LFZlPXtsZXR0ZXJTcGFjaW5nOlxcXCIwXFxcIixmb250V2VpZ2h0OlxcXCI0MDBcXFwifSxHZT1bXFxcIldlYmtpdFxcXCIsXFxcIk1velxcXCIsXFxcIm1zXFxcIl0sWWU9ci5jcmVhdGVFbGVtZW50KFxcXCJkaXZcXFwiKS5zdHlsZTtmdW5jdGlvbiBRZShlKXtpZihlIGluIFllKXJldHVybiBlO3ZhciB0PWVbMF0udG9VcHBlckNhc2UoKStlLnNsaWNlKDEpLG49R2UubGVuZ3RoO3doaWxlKG4tLSlpZigoZT1HZVtuXSt0KWluIFllKXJldHVybiBlfWZ1bmN0aW9uIEplKGUpe3ZhciB0PXcuY3NzUHJvcHNbZV07cmV0dXJuIHR8fCh0PXcuY3NzUHJvcHNbZV09UWUoZSl8fGUpLHR9ZnVuY3Rpb24gS2UoZSx0LG4pe3ZhciByPWllLmV4ZWModCk7cmV0dXJuIHI/TWF0aC5tYXgoMCxyWzJdLShufHwwKSkrKHJbM118fFxcXCJweFxcXCIpOnR9ZnVuY3Rpb24gWmUoZSx0LG4scixpLG8pe3ZhciBhPVxcXCJ3aWR0aFxcXCI9PT10PzE6MCxzPTAsdT0wO2lmKG49PT0ocj9cXFwiYm9yZGVyXFxcIjpcXFwiY29udGVudFxcXCIpKXJldHVybiAwO2Zvcig7YTw0O2ErPTIpXFxcIm1hcmdpblxcXCI9PT1uJiYodSs9dy5jc3MoZSxuK29lW2FdLCEwLGkpKSxyPyhcXFwiY29udGVudFxcXCI9PT1uJiYodS09dy5jc3MoZSxcXFwicGFkZGluZ1xcXCIrb2VbYV0sITAsaSkpLFxcXCJtYXJnaW5cXFwiIT09biYmKHUtPXcuY3NzKGUsXFxcImJvcmRlclxcXCIrb2VbYV0rXFxcIldpZHRoXFxcIiwhMCxpKSkpOih1Kz13LmNzcyhlLFxcXCJwYWRkaW5nXFxcIitvZVthXSwhMCxpKSxcXFwicGFkZGluZ1xcXCIhPT1uP3UrPXcuY3NzKGUsXFxcImJvcmRlclxcXCIrb2VbYV0rXFxcIldpZHRoXFxcIiwhMCxpKTpzKz13LmNzcyhlLFxcXCJib3JkZXJcXFwiK29lW2FdK1xcXCJXaWR0aFxcXCIsITAsaSkpO3JldHVybiFyJiZvPj0wJiYodSs9TWF0aC5tYXgoMCxNYXRoLmNlaWwoZVtcXFwib2Zmc2V0XFxcIit0WzBdLnRvVXBwZXJDYXNlKCkrdC5zbGljZSgxKV0tby11LXMtLjUpKSksdX1mdW5jdGlvbiBldChlLHQsbil7dmFyIHI9JGUoZSksaT1GZShlLHQsciksbz1cXFwiYm9yZGVyLWJveFxcXCI9PT13LmNzcyhlLFxcXCJib3hTaXppbmdcXFwiLCExLHIpLGE9bztpZihXZS50ZXN0KGkpKXtpZighbilyZXR1cm4gaTtpPVxcXCJhdXRvXFxcIn1yZXR1cm4gYT1hJiYoaC5ib3hTaXppbmdSZWxpYWJsZSgpfHxpPT09ZS5zdHlsZVt0XSksKFxcXCJhdXRvXFxcIj09PWl8fCFwYXJzZUZsb2F0KGkpJiZcXFwiaW5saW5lXFxcIj09PXcuY3NzKGUsXFxcImRpc3BsYXlcXFwiLCExLHIpKSYmKGk9ZVtcXFwib2Zmc2V0XFxcIit0WzBdLnRvVXBwZXJDYXNlKCkrdC5zbGljZSgxKV0sYT0hMCksKGk9cGFyc2VGbG9hdChpKXx8MCkrWmUoZSx0LG58fChvP1xcXCJib3JkZXJcXFwiOlxcXCJjb250ZW50XFxcIiksYSxyLGkpK1xcXCJweFxcXCJ9dy5leHRlbmQoe2Nzc0hvb2tzOntvcGFjaXR5OntnZXQ6ZnVuY3Rpb24oZSx0KXtpZih0KXt2YXIgbj1GZShlLFxcXCJvcGFjaXR5XFxcIik7cmV0dXJuXFxcIlxcXCI9PT1uP1xcXCIxXFxcIjpufX19fSxjc3NOdW1iZXI6e2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiEwLGNvbHVtbkNvdW50OiEwLGZpbGxPcGFjaXR5OiEwLGZsZXhHcm93OiEwLGZsZXhTaHJpbms6ITAsZm9udFdlaWdodDohMCxsaW5lSGVpZ2h0OiEwLG9wYWNpdHk6ITAsb3JkZXI6ITAsb3JwaGFuczohMCx3aWRvd3M6ITAsekluZGV4OiEwLHpvb206ITB9LGNzc1Byb3BzOnt9LHN0eWxlOmZ1bmN0aW9uKGUsdCxuLHIpe2lmKGUmJjMhPT1lLm5vZGVUeXBlJiY4IT09ZS5ub2RlVHlwZSYmZS5zdHlsZSl7dmFyIGksbyxhLHM9Ryh0KSx1PVhlLnRlc3QodCksbD1lLnN0eWxlO2lmKHV8fCh0PUplKHMpKSxhPXcuY3NzSG9va3NbdF18fHcuY3NzSG9va3Nbc10sdm9pZCAwPT09bilyZXR1cm4gYSYmXFxcImdldFxcXCJpbiBhJiZ2b2lkIDAhPT0oaT1hLmdldChlLCExLHIpKT9pOmxbdF07XFxcInN0cmluZ1xcXCI9PShvPXR5cGVvZiBuKSYmKGk9aWUuZXhlYyhuKSkmJmlbMV0mJihuPXVlKGUsdCxpKSxvPVxcXCJudW1iZXJcXFwiKSxudWxsIT1uJiZuPT09biYmKFxcXCJudW1iZXJcXFwiPT09byYmKG4rPWkmJmlbM118fCh3LmNzc051bWJlcltzXT9cXFwiXFxcIjpcXFwicHhcXFwiKSksaC5jbGVhckNsb25lU3R5bGV8fFxcXCJcXFwiIT09bnx8MCE9PXQuaW5kZXhPZihcXFwiYmFja2dyb3VuZFxcXCIpfHwobFt0XT1cXFwiaW5oZXJpdFxcXCIpLGEmJlxcXCJzZXRcXFwiaW4gYSYmdm9pZCAwPT09KG49YS5zZXQoZSxuLHIpKXx8KHU/bC5zZXRQcm9wZXJ0eSh0LG4pOmxbdF09bikpfX0sY3NzOmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpLG8sYSxzPUcodCk7cmV0dXJuIFhlLnRlc3QodCl8fCh0PUplKHMpKSwoYT13LmNzc0hvb2tzW3RdfHx3LmNzc0hvb2tzW3NdKSYmXFxcImdldFxcXCJpbiBhJiYoaT1hLmdldChlLCEwLG4pKSx2b2lkIDA9PT1pJiYoaT1GZShlLHQscikpLFxcXCJub3JtYWxcXFwiPT09aSYmdCBpbiBWZSYmKGk9VmVbdF0pLFxcXCJcXFwiPT09bnx8bj8obz1wYXJzZUZsb2F0KGkpLCEwPT09bnx8aXNGaW5pdGUobyk/b3x8MDppKTppfX0pLHcuZWFjaChbXFxcImhlaWdodFxcXCIsXFxcIndpZHRoXFxcIl0sZnVuY3Rpb24oZSx0KXt3LmNzc0hvb2tzW3RdPXtnZXQ6ZnVuY3Rpb24oZSxuLHIpe2lmKG4pcmV0dXJuIXplLnRlc3Qody5jc3MoZSxcXFwiZGlzcGxheVxcXCIpKXx8ZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCYmZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aD9ldChlLHQscik6c2UoZSxVZSxmdW5jdGlvbigpe3JldHVybiBldChlLHQscil9KX0sc2V0OmZ1bmN0aW9uKGUsbixyKXt2YXIgaSxvPSRlKGUpLGE9XFxcImJvcmRlci1ib3hcXFwiPT09dy5jc3MoZSxcXFwiYm94U2l6aW5nXFxcIiwhMSxvKSxzPXImJlplKGUsdCxyLGEsbyk7cmV0dXJuIGEmJmguc2Nyb2xsYm94U2l6ZSgpPT09by5wb3NpdGlvbiYmKHMtPU1hdGguY2VpbChlW1xcXCJvZmZzZXRcXFwiK3RbMF0udG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpXS1wYXJzZUZsb2F0KG9bdF0pLVplKGUsdCxcXFwiYm9yZGVyXFxcIiwhMSxvKS0uNSkpLHMmJihpPWllLmV4ZWMobikpJiZcXFwicHhcXFwiIT09KGlbM118fFxcXCJweFxcXCIpJiYoZS5zdHlsZVt0XT1uLG49dy5jc3MoZSx0KSksS2UoZSxuLHMpfX19KSx3LmNzc0hvb2tzLm1hcmdpbkxlZnQ9X2UoaC5yZWxpYWJsZU1hcmdpbkxlZnQsZnVuY3Rpb24oZSx0KXtpZih0KXJldHVybihwYXJzZUZsb2F0KEZlKGUsXFxcIm1hcmdpbkxlZnRcXFwiKSl8fGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdC1zZShlLHttYXJnaW5MZWZ0OjB9LGZ1bmN0aW9uKCl7cmV0dXJuIGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdH0pKStcXFwicHhcXFwifSksdy5lYWNoKHttYXJnaW46XFxcIlxcXCIscGFkZGluZzpcXFwiXFxcIixib3JkZXI6XFxcIldpZHRoXFxcIn0sZnVuY3Rpb24oZSx0KXt3LmNzc0hvb2tzW2UrdF09e2V4cGFuZDpmdW5jdGlvbihuKXtmb3IodmFyIHI9MCxpPXt9LG89XFxcInN0cmluZ1xcXCI9PXR5cGVvZiBuP24uc3BsaXQoXFxcIiBcXFwiKTpbbl07cjw0O3IrKylpW2Urb2Vbcl0rdF09b1tyXXx8b1tyLTJdfHxvWzBdO3JldHVybiBpfX0sXFxcIm1hcmdpblxcXCIhPT1lJiYody5jc3NIb29rc1tlK3RdLnNldD1LZSl9KSx3LmZuLmV4dGVuZCh7Y3NzOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHoodGhpcyxmdW5jdGlvbihlLHQsbil7dmFyIHIsaSxvPXt9LGE9MDtpZihBcnJheS5pc0FycmF5KHQpKXtmb3Iocj0kZShlKSxpPXQubGVuZ3RoO2E8aTthKyspb1t0W2FdXT13LmNzcyhlLHRbYV0sITEscik7cmV0dXJuIG99cmV0dXJuIHZvaWQgMCE9PW4/dy5zdHlsZShlLHQsbik6dy5jc3MoZSx0KX0sZSx0LGFyZ3VtZW50cy5sZW5ndGg+MSl9fSk7ZnVuY3Rpb24gdHQoZSx0LG4scixpKXtyZXR1cm4gbmV3IHR0LnByb3RvdHlwZS5pbml0KGUsdCxuLHIsaSl9dy5Ud2Vlbj10dCx0dC5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOnR0LGluaXQ6ZnVuY3Rpb24oZSx0LG4scixpLG8pe3RoaXMuZWxlbT1lLHRoaXMucHJvcD1uLHRoaXMuZWFzaW5nPWl8fHcuZWFzaW5nLl9kZWZhdWx0LHRoaXMub3B0aW9ucz10LHRoaXMuc3RhcnQ9dGhpcy5ub3c9dGhpcy5jdXIoKSx0aGlzLmVuZD1yLHRoaXMudW5pdD1vfHwody5jc3NOdW1iZXJbbl0/XFxcIlxcXCI6XFxcInB4XFxcIil9LGN1cjpmdW5jdGlvbigpe3ZhciBlPXR0LnByb3BIb29rc1t0aGlzLnByb3BdO3JldHVybiBlJiZlLmdldD9lLmdldCh0aGlzKTp0dC5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KHRoaXMpfSxydW46ZnVuY3Rpb24oZSl7dmFyIHQsbj10dC5wcm9wSG9va3NbdGhpcy5wcm9wXTtyZXR1cm4gdGhpcy5vcHRpb25zLmR1cmF0aW9uP3RoaXMucG9zPXQ9dy5lYXNpbmdbdGhpcy5lYXNpbmddKGUsdGhpcy5vcHRpb25zLmR1cmF0aW9uKmUsMCwxLHRoaXMub3B0aW9ucy5kdXJhdGlvbik6dGhpcy5wb3M9dD1lLHRoaXMubm93PSh0aGlzLmVuZC10aGlzLnN0YXJ0KSp0K3RoaXMuc3RhcnQsdGhpcy5vcHRpb25zLnN0ZXAmJnRoaXMub3B0aW9ucy5zdGVwLmNhbGwodGhpcy5lbGVtLHRoaXMubm93LHRoaXMpLG4mJm4uc2V0P24uc2V0KHRoaXMpOnR0LnByb3BIb29rcy5fZGVmYXVsdC5zZXQodGhpcyksdGhpc319LHR0LnByb3RvdHlwZS5pbml0LnByb3RvdHlwZT10dC5wcm90b3R5cGUsdHQucHJvcEhvb2tzPXtfZGVmYXVsdDp7Z2V0OmZ1bmN0aW9uKGUpe3ZhciB0O3JldHVybiAxIT09ZS5lbGVtLm5vZGVUeXBlfHxudWxsIT1lLmVsZW1bZS5wcm9wXSYmbnVsbD09ZS5lbGVtLnN0eWxlW2UucHJvcF0/ZS5lbGVtW2UucHJvcF06KHQ9dy5jc3MoZS5lbGVtLGUucHJvcCxcXFwiXFxcIikpJiZcXFwiYXV0b1xcXCIhPT10P3Q6MH0sc2V0OmZ1bmN0aW9uKGUpe3cuZnguc3RlcFtlLnByb3BdP3cuZnguc3RlcFtlLnByb3BdKGUpOjEhPT1lLmVsZW0ubm9kZVR5cGV8fG51bGw9PWUuZWxlbS5zdHlsZVt3LmNzc1Byb3BzW2UucHJvcF1dJiYhdy5jc3NIb29rc1tlLnByb3BdP2UuZWxlbVtlLnByb3BdPWUubm93Oncuc3R5bGUoZS5lbGVtLGUucHJvcCxlLm5vdytlLnVuaXQpfX19LHR0LnByb3BIb29rcy5zY3JvbGxUb3A9dHQucHJvcEhvb2tzLnNjcm9sbExlZnQ9e3NldDpmdW5jdGlvbihlKXtlLmVsZW0ubm9kZVR5cGUmJmUuZWxlbS5wYXJlbnROb2RlJiYoZS5lbGVtW2UucHJvcF09ZS5ub3cpfX0sdy5lYXNpbmc9e2xpbmVhcjpmdW5jdGlvbihlKXtyZXR1cm4gZX0sc3dpbmc6ZnVuY3Rpb24oZSl7cmV0dXJuLjUtTWF0aC5jb3MoZSpNYXRoLlBJKS8yfSxfZGVmYXVsdDpcXFwic3dpbmdcXFwifSx3LmZ4PXR0LnByb3RvdHlwZS5pbml0LHcuZnguc3RlcD17fTt2YXIgbnQscnQsaXQ9L14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLG90PS9xdWV1ZUhvb2tzJC87ZnVuY3Rpb24gYXQoKXtydCYmKCExPT09ci5oaWRkZW4mJmUucmVxdWVzdEFuaW1hdGlvbkZyYW1lP2UucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGF0KTplLnNldFRpbWVvdXQoYXQsdy5meC5pbnRlcnZhbCksdy5meC50aWNrKCkpfWZ1bmN0aW9uIHN0KCl7cmV0dXJuIGUuc2V0VGltZW91dChmdW5jdGlvbigpe250PXZvaWQgMH0pLG50PURhdGUubm93KCl9ZnVuY3Rpb24gdXQoZSx0KXt2YXIgbixyPTAsaT17aGVpZ2h0OmV9O2Zvcih0PXQ/MTowO3I8NDtyKz0yLXQpaVtcXFwibWFyZ2luXFxcIisobj1vZVtyXSldPWlbXFxcInBhZGRpbmdcXFwiK25dPWU7cmV0dXJuIHQmJihpLm9wYWNpdHk9aS53aWR0aD1lKSxpfWZ1bmN0aW9uIGx0KGUsdCxuKXtmb3IodmFyIHIsaT0ocHQudHdlZW5lcnNbdF18fFtdKS5jb25jYXQocHQudHdlZW5lcnNbXFxcIipcXFwiXSksbz0wLGE9aS5sZW5ndGg7bzxhO28rKylpZihyPWlbb10uY2FsbChuLHQsZSkpcmV0dXJuIHJ9ZnVuY3Rpb24gY3QoZSx0LG4pe3ZhciByLGksbyxhLHMsdSxsLGMsZj1cXFwid2lkdGhcXFwiaW4gdHx8XFxcImhlaWdodFxcXCJpbiB0LHA9dGhpcyxkPXt9LGg9ZS5zdHlsZSxnPWUubm9kZVR5cGUmJmFlKGUpLHk9Si5nZXQoZSxcXFwiZnhzaG93XFxcIik7bi5xdWV1ZXx8KG51bGw9PShhPXcuX3F1ZXVlSG9va3MoZSxcXFwiZnhcXFwiKSkudW5xdWV1ZWQmJihhLnVucXVldWVkPTAscz1hLmVtcHR5LmZpcmUsYS5lbXB0eS5maXJlPWZ1bmN0aW9uKCl7YS51bnF1ZXVlZHx8cygpfSksYS51bnF1ZXVlZCsrLHAuYWx3YXlzKGZ1bmN0aW9uKCl7cC5hbHdheXMoZnVuY3Rpb24oKXthLnVucXVldWVkLS0sdy5xdWV1ZShlLFxcXCJmeFxcXCIpLmxlbmd0aHx8YS5lbXB0eS5maXJlKCl9KX0pKTtmb3IociBpbiB0KWlmKGk9dFtyXSxpdC50ZXN0KGkpKXtpZihkZWxldGUgdFtyXSxvPW98fFxcXCJ0b2dnbGVcXFwiPT09aSxpPT09KGc/XFxcImhpZGVcXFwiOlxcXCJzaG93XFxcIikpe2lmKFxcXCJzaG93XFxcIiE9PWl8fCF5fHx2b2lkIDA9PT15W3JdKWNvbnRpbnVlO2c9ITB9ZFtyXT15JiZ5W3JdfHx3LnN0eWxlKGUscil9aWYoKHU9IXcuaXNFbXB0eU9iamVjdCh0KSl8fCF3LmlzRW1wdHlPYmplY3QoZCkpe2YmJjE9PT1lLm5vZGVUeXBlJiYobi5vdmVyZmxvdz1baC5vdmVyZmxvdyxoLm92ZXJmbG93WCxoLm92ZXJmbG93WV0sbnVsbD09KGw9eSYmeS5kaXNwbGF5KSYmKGw9Si5nZXQoZSxcXFwiZGlzcGxheVxcXCIpKSxcXFwibm9uZVxcXCI9PT0oYz13LmNzcyhlLFxcXCJkaXNwbGF5XFxcIikpJiYobD9jPWw6KGZlKFtlXSwhMCksbD1lLnN0eWxlLmRpc3BsYXl8fGwsYz13LmNzcyhlLFxcXCJkaXNwbGF5XFxcIiksZmUoW2VdKSkpLChcXFwiaW5saW5lXFxcIj09PWN8fFxcXCJpbmxpbmUtYmxvY2tcXFwiPT09YyYmbnVsbCE9bCkmJlxcXCJub25lXFxcIj09PXcuY3NzKGUsXFxcImZsb2F0XFxcIikmJih1fHwocC5kb25lKGZ1bmN0aW9uKCl7aC5kaXNwbGF5PWx9KSxudWxsPT1sJiYoYz1oLmRpc3BsYXksbD1cXFwibm9uZVxcXCI9PT1jP1xcXCJcXFwiOmMpKSxoLmRpc3BsYXk9XFxcImlubGluZS1ibG9ja1xcXCIpKSxuLm92ZXJmbG93JiYoaC5vdmVyZmxvdz1cXFwiaGlkZGVuXFxcIixwLmFsd2F5cyhmdW5jdGlvbigpe2gub3ZlcmZsb3c9bi5vdmVyZmxvd1swXSxoLm92ZXJmbG93WD1uLm92ZXJmbG93WzFdLGgub3ZlcmZsb3dZPW4ub3ZlcmZsb3dbMl19KSksdT0hMTtmb3IociBpbiBkKXV8fCh5P1xcXCJoaWRkZW5cXFwiaW4geSYmKGc9eS5oaWRkZW4pOnk9Si5hY2Nlc3MoZSxcXFwiZnhzaG93XFxcIix7ZGlzcGxheTpsfSksbyYmKHkuaGlkZGVuPSFnKSxnJiZmZShbZV0sITApLHAuZG9uZShmdW5jdGlvbigpe2d8fGZlKFtlXSksSi5yZW1vdmUoZSxcXFwiZnhzaG93XFxcIik7Zm9yKHIgaW4gZCl3LnN0eWxlKGUscixkW3JdKX0pKSx1PWx0KGc/eVtyXTowLHIscCksciBpbiB5fHwoeVtyXT11LnN0YXJ0LGcmJih1LmVuZD11LnN0YXJ0LHUuc3RhcnQ9MCkpfX1mdW5jdGlvbiBmdChlLHQpe3ZhciBuLHIsaSxvLGE7Zm9yKG4gaW4gZSlpZihyPUcobiksaT10W3JdLG89ZVtuXSxBcnJheS5pc0FycmF5KG8pJiYoaT1vWzFdLG89ZVtuXT1vWzBdKSxuIT09ciYmKGVbcl09byxkZWxldGUgZVtuXSksKGE9dy5jc3NIb29rc1tyXSkmJlxcXCJleHBhbmRcXFwiaW4gYSl7bz1hLmV4cGFuZChvKSxkZWxldGUgZVtyXTtmb3IobiBpbiBvKW4gaW4gZXx8KGVbbl09b1tuXSx0W25dPWkpfWVsc2UgdFtyXT1pfWZ1bmN0aW9uIHB0KGUsdCxuKXt2YXIgcixpLG89MCxhPXB0LnByZWZpbHRlcnMubGVuZ3RoLHM9dy5EZWZlcnJlZCgpLmFsd2F5cyhmdW5jdGlvbigpe2RlbGV0ZSB1LmVsZW19KSx1PWZ1bmN0aW9uKCl7aWYoaSlyZXR1cm4hMTtmb3IodmFyIHQ9bnR8fHN0KCksbj1NYXRoLm1heCgwLGwuc3RhcnRUaW1lK2wuZHVyYXRpb24tdCkscj0xLShuL2wuZHVyYXRpb258fDApLG89MCxhPWwudHdlZW5zLmxlbmd0aDtvPGE7bysrKWwudHdlZW5zW29dLnJ1bihyKTtyZXR1cm4gcy5ub3RpZnlXaXRoKGUsW2wscixuXSkscjwxJiZhP246KGF8fHMubm90aWZ5V2l0aChlLFtsLDEsMF0pLHMucmVzb2x2ZVdpdGgoZSxbbF0pLCExKX0sbD1zLnByb21pc2Uoe2VsZW06ZSxwcm9wczp3LmV4dGVuZCh7fSx0KSxvcHRzOncuZXh0ZW5kKCEwLHtzcGVjaWFsRWFzaW5nOnt9LGVhc2luZzp3LmVhc2luZy5fZGVmYXVsdH0sbiksb3JpZ2luYWxQcm9wZXJ0aWVzOnQsb3JpZ2luYWxPcHRpb25zOm4sc3RhcnRUaW1lOm50fHxzdCgpLGR1cmF0aW9uOm4uZHVyYXRpb24sdHdlZW5zOltdLGNyZWF0ZVR3ZWVuOmZ1bmN0aW9uKHQsbil7dmFyIHI9dy5Ud2VlbihlLGwub3B0cyx0LG4sbC5vcHRzLnNwZWNpYWxFYXNpbmdbdF18fGwub3B0cy5lYXNpbmcpO3JldHVybiBsLnR3ZWVucy5wdXNoKHIpLHJ9LHN0b3A6ZnVuY3Rpb24odCl7dmFyIG49MCxyPXQ/bC50d2VlbnMubGVuZ3RoOjA7aWYoaSlyZXR1cm4gdGhpcztmb3IoaT0hMDtuPHI7bisrKWwudHdlZW5zW25dLnJ1bigxKTtyZXR1cm4gdD8ocy5ub3RpZnlXaXRoKGUsW2wsMSwwXSkscy5yZXNvbHZlV2l0aChlLFtsLHRdKSk6cy5yZWplY3RXaXRoKGUsW2wsdF0pLHRoaXN9fSksYz1sLnByb3BzO2ZvcihmdChjLGwub3B0cy5zcGVjaWFsRWFzaW5nKTtvPGE7bysrKWlmKHI9cHQucHJlZmlsdGVyc1tvXS5jYWxsKGwsZSxjLGwub3B0cykpcmV0dXJuIGcoci5zdG9wKSYmKHcuX3F1ZXVlSG9va3MobC5lbGVtLGwub3B0cy5xdWV1ZSkuc3RvcD1yLnN0b3AuYmluZChyKSkscjtyZXR1cm4gdy5tYXAoYyxsdCxsKSxnKGwub3B0cy5zdGFydCkmJmwub3B0cy5zdGFydC5jYWxsKGUsbCksbC5wcm9ncmVzcyhsLm9wdHMucHJvZ3Jlc3MpLmRvbmUobC5vcHRzLmRvbmUsbC5vcHRzLmNvbXBsZXRlKS5mYWlsKGwub3B0cy5mYWlsKS5hbHdheXMobC5vcHRzLmFsd2F5cyksdy5meC50aW1lcih3LmV4dGVuZCh1LHtlbGVtOmUsYW5pbTpsLHF1ZXVlOmwub3B0cy5xdWV1ZX0pKSxsfXcuQW5pbWF0aW9uPXcuZXh0ZW5kKHB0LHt0d2VlbmVyczp7XFxcIipcXFwiOltmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuY3JlYXRlVHdlZW4oZSx0KTtyZXR1cm4gdWUobi5lbGVtLGUsaWUuZXhlYyh0KSxuKSxufV19LHR3ZWVuZXI6ZnVuY3Rpb24oZSx0KXtnKGUpPyh0PWUsZT1bXFxcIipcXFwiXSk6ZT1lLm1hdGNoKE0pO2Zvcih2YXIgbixyPTAsaT1lLmxlbmd0aDtyPGk7cisrKW49ZVtyXSxwdC50d2VlbmVyc1tuXT1wdC50d2VlbmVyc1tuXXx8W10scHQudHdlZW5lcnNbbl0udW5zaGlmdCh0KX0scHJlZmlsdGVyczpbY3RdLHByZWZpbHRlcjpmdW5jdGlvbihlLHQpe3Q/cHQucHJlZmlsdGVycy51bnNoaWZ0KGUpOnB0LnByZWZpbHRlcnMucHVzaChlKX19KSx3LnNwZWVkPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1lJiZcXFwib2JqZWN0XFxcIj09dHlwZW9mIGU/dy5leHRlbmQoe30sZSk6e2NvbXBsZXRlOm58fCFuJiZ0fHxnKGUpJiZlLGR1cmF0aW9uOmUsZWFzaW5nOm4mJnR8fHQmJiFnKHQpJiZ0fTtyZXR1cm4gdy5meC5vZmY/ci5kdXJhdGlvbj0wOlxcXCJudW1iZXJcXFwiIT10eXBlb2Ygci5kdXJhdGlvbiYmKHIuZHVyYXRpb24gaW4gdy5meC5zcGVlZHM/ci5kdXJhdGlvbj13LmZ4LnNwZWVkc1tyLmR1cmF0aW9uXTpyLmR1cmF0aW9uPXcuZnguc3BlZWRzLl9kZWZhdWx0KSxudWxsIT1yLnF1ZXVlJiYhMCE9PXIucXVldWV8fChyLnF1ZXVlPVxcXCJmeFxcXCIpLHIub2xkPXIuY29tcGxldGUsci5jb21wbGV0ZT1mdW5jdGlvbigpe2coci5vbGQpJiZyLm9sZC5jYWxsKHRoaXMpLHIucXVldWUmJncuZGVxdWV1ZSh0aGlzLHIucXVldWUpfSxyfSx3LmZuLmV4dGVuZCh7ZmFkZVRvOmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiB0aGlzLmZpbHRlcihhZSkuY3NzKFxcXCJvcGFjaXR5XFxcIiwwKS5zaG93KCkuZW5kKCkuYW5pbWF0ZSh7b3BhY2l0eTp0fSxlLG4scil9LGFuaW1hdGU6ZnVuY3Rpb24oZSx0LG4scil7dmFyIGk9dy5pc0VtcHR5T2JqZWN0KGUpLG89dy5zcGVlZCh0LG4sciksYT1mdW5jdGlvbigpe3ZhciB0PXB0KHRoaXMsdy5leHRlbmQoe30sZSksbyk7KGl8fEouZ2V0KHRoaXMsXFxcImZpbmlzaFxcXCIpKSYmdC5zdG9wKCEwKX07cmV0dXJuIGEuZmluaXNoPWEsaXx8ITE9PT1vLnF1ZXVlP3RoaXMuZWFjaChhKTp0aGlzLnF1ZXVlKG8ucXVldWUsYSl9LHN0b3A6ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWZ1bmN0aW9uKGUpe3ZhciB0PWUuc3RvcDtkZWxldGUgZS5zdG9wLHQobil9O3JldHVyblxcXCJzdHJpbmdcXFwiIT10eXBlb2YgZSYmKG49dCx0PWUsZT12b2lkIDApLHQmJiExIT09ZSYmdGhpcy5xdWV1ZShlfHxcXFwiZnhcXFwiLFtdKSx0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD0hMCxpPW51bGwhPWUmJmUrXFxcInF1ZXVlSG9va3NcXFwiLG89dy50aW1lcnMsYT1KLmdldCh0aGlzKTtpZihpKWFbaV0mJmFbaV0uc3RvcCYmcihhW2ldKTtlbHNlIGZvcihpIGluIGEpYVtpXSYmYVtpXS5zdG9wJiZvdC50ZXN0KGkpJiZyKGFbaV0pO2ZvcihpPW8ubGVuZ3RoO2ktLTspb1tpXS5lbGVtIT09dGhpc3x8bnVsbCE9ZSYmb1tpXS5xdWV1ZSE9PWV8fChvW2ldLmFuaW0uc3RvcChuKSx0PSExLG8uc3BsaWNlKGksMSkpOyF0JiZufHx3LmRlcXVldWUodGhpcyxlKX0pfSxmaW5pc2g6ZnVuY3Rpb24oZSl7cmV0dXJuITEhPT1lJiYoZT1lfHxcXFwiZnhcXFwiKSx0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdCxuPUouZ2V0KHRoaXMpLHI9bltlK1xcXCJxdWV1ZVxcXCJdLGk9bltlK1xcXCJxdWV1ZUhvb2tzXFxcIl0sbz13LnRpbWVycyxhPXI/ci5sZW5ndGg6MDtmb3Iobi5maW5pc2g9ITAsdy5xdWV1ZSh0aGlzLGUsW10pLGkmJmkuc3RvcCYmaS5zdG9wLmNhbGwodGhpcywhMCksdD1vLmxlbmd0aDt0LS07KW9bdF0uZWxlbT09PXRoaXMmJm9bdF0ucXVldWU9PT1lJiYob1t0XS5hbmltLnN0b3AoITApLG8uc3BsaWNlKHQsMSkpO2Zvcih0PTA7dDxhO3QrKylyW3RdJiZyW3RdLmZpbmlzaCYmclt0XS5maW5pc2guY2FsbCh0aGlzKTtkZWxldGUgbi5maW5pc2h9KX19KSx3LmVhY2goW1xcXCJ0b2dnbGVcXFwiLFxcXCJzaG93XFxcIixcXFwiaGlkZVxcXCJdLGZ1bmN0aW9uKGUsdCl7dmFyIG49dy5mblt0XTt3LmZuW3RdPWZ1bmN0aW9uKGUscixpKXtyZXR1cm4gbnVsbD09ZXx8XFxcImJvb2xlYW5cXFwiPT10eXBlb2YgZT9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp0aGlzLmFuaW1hdGUodXQodCwhMCksZSxyLGkpfX0pLHcuZWFjaCh7c2xpZGVEb3duOnV0KFxcXCJzaG93XFxcIiksc2xpZGVVcDp1dChcXFwiaGlkZVxcXCIpLHNsaWRlVG9nZ2xlOnV0KFxcXCJ0b2dnbGVcXFwiKSxmYWRlSW46e29wYWNpdHk6XFxcInNob3dcXFwifSxmYWRlT3V0OntvcGFjaXR5OlxcXCJoaWRlXFxcIn0sZmFkZVRvZ2dsZTp7b3BhY2l0eTpcXFwidG9nZ2xlXFxcIn19LGZ1bmN0aW9uKGUsdCl7dy5mbltlXT1mdW5jdGlvbihlLG4scil7cmV0dXJuIHRoaXMuYW5pbWF0ZSh0LGUsbixyKX19KSx3LnRpbWVycz1bXSx3LmZ4LnRpY2s9ZnVuY3Rpb24oKXt2YXIgZSx0PTAsbj13LnRpbWVycztmb3IobnQ9RGF0ZS5ub3coKTt0PG4ubGVuZ3RoO3QrKykoZT1uW3RdKSgpfHxuW3RdIT09ZXx8bi5zcGxpY2UodC0tLDEpO24ubGVuZ3RofHx3LmZ4LnN0b3AoKSxudD12b2lkIDB9LHcuZngudGltZXI9ZnVuY3Rpb24oZSl7dy50aW1lcnMucHVzaChlKSx3LmZ4LnN0YXJ0KCl9LHcuZnguaW50ZXJ2YWw9MTMsdy5meC5zdGFydD1mdW5jdGlvbigpe3J0fHwocnQ9ITAsYXQoKSl9LHcuZnguc3RvcD1mdW5jdGlvbigpe3J0PW51bGx9LHcuZnguc3BlZWRzPXtzbG93OjYwMCxmYXN0OjIwMCxfZGVmYXVsdDo0MDB9LHcuZm4uZGVsYXk9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdD13LmZ4P3cuZnguc3BlZWRzW3RdfHx0OnQsbj1ufHxcXFwiZnhcXFwiLHRoaXMucXVldWUobixmdW5jdGlvbihuLHIpe3ZhciBpPWUuc2V0VGltZW91dChuLHQpO3Iuc3RvcD1mdW5jdGlvbigpe2UuY2xlYXJUaW1lb3V0KGkpfX0pfSxmdW5jdGlvbigpe3ZhciBlPXIuY3JlYXRlRWxlbWVudChcXFwiaW5wdXRcXFwiKSx0PXIuY3JlYXRlRWxlbWVudChcXFwic2VsZWN0XFxcIikuYXBwZW5kQ2hpbGQoci5jcmVhdGVFbGVtZW50KFxcXCJvcHRpb25cXFwiKSk7ZS50eXBlPVxcXCJjaGVja2JveFxcXCIsaC5jaGVja09uPVxcXCJcXFwiIT09ZS52YWx1ZSxoLm9wdFNlbGVjdGVkPXQuc2VsZWN0ZWQsKGU9ci5jcmVhdGVFbGVtZW50KFxcXCJpbnB1dFxcXCIpKS52YWx1ZT1cXFwidFxcXCIsZS50eXBlPVxcXCJyYWRpb1xcXCIsaC5yYWRpb1ZhbHVlPVxcXCJ0XFxcIj09PWUudmFsdWV9KCk7dmFyIGR0LGh0PXcuZXhwci5hdHRySGFuZGxlO3cuZm4uZXh0ZW5kKHthdHRyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHoodGhpcyx3LmF0dHIsZSx0LGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZUF0dHI6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3cucmVtb3ZlQXR0cih0aGlzLGUpfSl9fSksdy5leHRlbmQoe2F0dHI6ZnVuY3Rpb24oZSx0LG4pe3ZhciByLGksbz1lLm5vZGVUeXBlO2lmKDMhPT1vJiY4IT09byYmMiE9PW8pcmV0dXJuXFxcInVuZGVmaW5lZFxcXCI9PXR5cGVvZiBlLmdldEF0dHJpYnV0ZT93LnByb3AoZSx0LG4pOigxPT09byYmdy5pc1hNTERvYyhlKXx8KGk9dy5hdHRySG9va3NbdC50b0xvd2VyQ2FzZSgpXXx8KHcuZXhwci5tYXRjaC5ib29sLnRlc3QodCk/ZHQ6dm9pZCAwKSksdm9pZCAwIT09bj9udWxsPT09bj92b2lkIHcucmVtb3ZlQXR0cihlLHQpOmkmJlxcXCJzZXRcXFwiaW4gaSYmdm9pZCAwIT09KHI9aS5zZXQoZSxuLHQpKT9yOihlLnNldEF0dHJpYnV0ZSh0LG4rXFxcIlxcXCIpLG4pOmkmJlxcXCJnZXRcXFwiaW4gaSYmbnVsbCE9PShyPWkuZ2V0KGUsdCkpP3I6bnVsbD09KHI9dy5maW5kLmF0dHIoZSx0KSk/dm9pZCAwOnIpfSxhdHRySG9va3M6e3R5cGU6e3NldDpmdW5jdGlvbihlLHQpe2lmKCFoLnJhZGlvVmFsdWUmJlxcXCJyYWRpb1xcXCI9PT10JiZOKGUsXFxcImlucHV0XFxcIikpe3ZhciBuPWUudmFsdWU7cmV0dXJuIGUuc2V0QXR0cmlidXRlKFxcXCJ0eXBlXFxcIix0KSxuJiYoZS52YWx1ZT1uKSx0fX19fSxyZW1vdmVBdHRyOmZ1bmN0aW9uKGUsdCl7dmFyIG4scj0wLGk9dCYmdC5tYXRjaChNKTtpZihpJiYxPT09ZS5ub2RlVHlwZSl3aGlsZShuPWlbcisrXSllLnJlbW92ZUF0dHJpYnV0ZShuKX19KSxkdD17c2V0OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4hMT09PXQ/dy5yZW1vdmVBdHRyKGUsbik6ZS5zZXRBdHRyaWJ1dGUobixuKSxufX0sdy5lYWNoKHcuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCgvXFxcXHcrL2cpLGZ1bmN0aW9uKGUsdCl7dmFyIG49aHRbdF18fHcuZmluZC5hdHRyO2h0W3RdPWZ1bmN0aW9uKGUsdCxyKXt2YXIgaSxvLGE9dC50b0xvd2VyQ2FzZSgpO3JldHVybiByfHwobz1odFthXSxodFthXT1pLGk9bnVsbCE9bihlLHQscik/YTpudWxsLGh0W2FdPW8pLGl9fSk7dmFyIGd0PS9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2kseXQ9L14oPzphfGFyZWEpJC9pO3cuZm4uZXh0ZW5kKHtwcm9wOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHoodGhpcyx3LnByb3AsZSx0LGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZVByb3A6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2RlbGV0ZSB0aGlzW3cucHJvcEZpeFtlXXx8ZV19KX19KSx3LmV4dGVuZCh7cHJvcDpmdW5jdGlvbihlLHQsbil7dmFyIHIsaSxvPWUubm9kZVR5cGU7aWYoMyE9PW8mJjghPT1vJiYyIT09bylyZXR1cm4gMT09PW8mJncuaXNYTUxEb2MoZSl8fCh0PXcucHJvcEZpeFt0XXx8dCxpPXcucHJvcEhvb2tzW3RdKSx2b2lkIDAhPT1uP2kmJlxcXCJzZXRcXFwiaW4gaSYmdm9pZCAwIT09KHI9aS5zZXQoZSxuLHQpKT9yOmVbdF09bjppJiZcXFwiZ2V0XFxcImluIGkmJm51bGwhPT0ocj1pLmdldChlLHQpKT9yOmVbdF19LHByb3BIb29rczp7dGFiSW5kZXg6e2dldDpmdW5jdGlvbihlKXt2YXIgdD13LmZpbmQuYXR0cihlLFxcXCJ0YWJpbmRleFxcXCIpO3JldHVybiB0P3BhcnNlSW50KHQsMTApOmd0LnRlc3QoZS5ub2RlTmFtZSl8fHl0LnRlc3QoZS5ub2RlTmFtZSkmJmUuaHJlZj8wOi0xfX19LHByb3BGaXg6e1xcXCJmb3JcXFwiOlxcXCJodG1sRm9yXFxcIixcXFwiY2xhc3NcXFwiOlxcXCJjbGFzc05hbWVcXFwifX0pLGgub3B0U2VsZWN0ZWR8fCh3LnByb3BIb29rcy5zZWxlY3RlZD17Z2V0OmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyZW50Tm9kZTtyZXR1cm4gdCYmdC5wYXJlbnROb2RlJiZ0LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCxudWxsfSxzZXQ6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5wYXJlbnROb2RlO3QmJih0LnNlbGVjdGVkSW5kZXgsdC5wYXJlbnROb2RlJiZ0LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCl9fSksdy5lYWNoKFtcXFwidGFiSW5kZXhcXFwiLFxcXCJyZWFkT25seVxcXCIsXFxcIm1heExlbmd0aFxcXCIsXFxcImNlbGxTcGFjaW5nXFxcIixcXFwiY2VsbFBhZGRpbmdcXFwiLFxcXCJyb3dTcGFuXFxcIixcXFwiY29sU3BhblxcXCIsXFxcInVzZU1hcFxcXCIsXFxcImZyYW1lQm9yZGVyXFxcIixcXFwiY29udGVudEVkaXRhYmxlXFxcIl0sZnVuY3Rpb24oKXt3LnByb3BGaXhbdGhpcy50b0xvd2VyQ2FzZSgpXT10aGlzfSk7ZnVuY3Rpb24gdnQoZSl7cmV0dXJuKGUubWF0Y2goTSl8fFtdKS5qb2luKFxcXCIgXFxcIil9ZnVuY3Rpb24gbXQoZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlJiZlLmdldEF0dHJpYnV0ZShcXFwiY2xhc3NcXFwiKXx8XFxcIlxcXCJ9ZnVuY3Rpb24geHQoZSl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZSk/ZTpcXFwic3RyaW5nXFxcIj09dHlwZW9mIGU/ZS5tYXRjaChNKXx8W106W119dy5mbi5leHRlbmQoe2FkZENsYXNzOmZ1bmN0aW9uKGUpe3ZhciB0LG4scixpLG8sYSxzLHU9MDtpZihnKGUpKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24odCl7dyh0aGlzKS5hZGRDbGFzcyhlLmNhbGwodGhpcyx0LG10KHRoaXMpKSl9KTtpZigodD14dChlKSkubGVuZ3RoKXdoaWxlKG49dGhpc1t1KytdKWlmKGk9bXQobikscj0xPT09bi5ub2RlVHlwZSYmXFxcIiBcXFwiK3Z0KGkpK1xcXCIgXFxcIil7YT0wO3doaWxlKG89dFthKytdKXIuaW5kZXhPZihcXFwiIFxcXCIrbytcXFwiIFxcXCIpPDAmJihyKz1vK1xcXCIgXFxcIik7aSE9PShzPXZ0KHIpKSYmbi5zZXRBdHRyaWJ1dGUoXFxcImNsYXNzXFxcIixzKX1yZXR1cm4gdGhpc30scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oZSl7dmFyIHQsbixyLGksbyxhLHMsdT0wO2lmKGcoZSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbih0KXt3KHRoaXMpLnJlbW92ZUNsYXNzKGUuY2FsbCh0aGlzLHQsbXQodGhpcykpKX0pO2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLmF0dHIoXFxcImNsYXNzXFxcIixcXFwiXFxcIik7aWYoKHQ9eHQoZSkpLmxlbmd0aCl3aGlsZShuPXRoaXNbdSsrXSlpZihpPW10KG4pLHI9MT09PW4ubm9kZVR5cGUmJlxcXCIgXFxcIit2dChpKStcXFwiIFxcXCIpe2E9MDt3aGlsZShvPXRbYSsrXSl3aGlsZShyLmluZGV4T2YoXFxcIiBcXFwiK28rXFxcIiBcXFwiKT4tMSlyPXIucmVwbGFjZShcXFwiIFxcXCIrbytcXFwiIFxcXCIsXFxcIiBcXFwiKTtpIT09KHM9dnQocikpJiZuLnNldEF0dHJpYnV0ZShcXFwiY2xhc3NcXFwiLHMpfXJldHVybiB0aGlzfSx0b2dnbGVDbGFzczpmdW5jdGlvbihlLHQpe3ZhciBuPXR5cGVvZiBlLHI9XFxcInN0cmluZ1xcXCI9PT1ufHxBcnJheS5pc0FycmF5KGUpO3JldHVyblxcXCJib29sZWFuXFxcIj09dHlwZW9mIHQmJnI/dD90aGlzLmFkZENsYXNzKGUpOnRoaXMucmVtb3ZlQ2xhc3MoZSk6ZyhlKT90aGlzLmVhY2goZnVuY3Rpb24obil7dyh0aGlzKS50b2dnbGVDbGFzcyhlLmNhbGwodGhpcyxuLG10KHRoaXMpLHQpLHQpfSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQsaSxvLGE7aWYocil7aT0wLG89dyh0aGlzKSxhPXh0KGUpO3doaWxlKHQ9YVtpKytdKW8uaGFzQ2xhc3ModCk/by5yZW1vdmVDbGFzcyh0KTpvLmFkZENsYXNzKHQpfWVsc2Ugdm9pZCAwIT09ZSYmXFxcImJvb2xlYW5cXFwiIT09bnx8KCh0PW10KHRoaXMpKSYmSi5zZXQodGhpcyxcXFwiX19jbGFzc05hbWVfX1xcXCIsdCksdGhpcy5zZXRBdHRyaWJ1dGUmJnRoaXMuc2V0QXR0cmlidXRlKFxcXCJjbGFzc1xcXCIsdHx8ITE9PT1lP1xcXCJcXFwiOkouZ2V0KHRoaXMsXFxcIl9fY2xhc3NOYW1lX19cXFwiKXx8XFxcIlxcXCIpKX0pfSxoYXNDbGFzczpmdW5jdGlvbihlKXt2YXIgdCxuLHI9MDt0PVxcXCIgXFxcIitlK1xcXCIgXFxcIjt3aGlsZShuPXRoaXNbcisrXSlpZigxPT09bi5ub2RlVHlwZSYmKFxcXCIgXFxcIit2dChtdChuKSkrXFxcIiBcXFwiKS5pbmRleE9mKHQpPi0xKXJldHVybiEwO3JldHVybiExfX0pO3ZhciBidD0vXFxcXHIvZzt3LmZuLmV4dGVuZCh7dmFsOmZ1bmN0aW9uKGUpe3ZhciB0LG4scixpPXRoaXNbMF07e2lmKGFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHI9ZyhlKSx0aGlzLmVhY2goZnVuY3Rpb24obil7dmFyIGk7MT09PXRoaXMubm9kZVR5cGUmJihudWxsPT0oaT1yP2UuY2FsbCh0aGlzLG4sdyh0aGlzKS52YWwoKSk6ZSk/aT1cXFwiXFxcIjpcXFwibnVtYmVyXFxcIj09dHlwZW9mIGk/aSs9XFxcIlxcXCI6QXJyYXkuaXNBcnJheShpKSYmKGk9dy5tYXAoaSxmdW5jdGlvbihlKXtyZXR1cm4gbnVsbD09ZT9cXFwiXFxcIjplK1xcXCJcXFwifSkpLCh0PXcudmFsSG9va3NbdGhpcy50eXBlXXx8dy52YWxIb29rc1t0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldKSYmXFxcInNldFxcXCJpbiB0JiZ2b2lkIDAhPT10LnNldCh0aGlzLGksXFxcInZhbHVlXFxcIil8fCh0aGlzLnZhbHVlPWkpKX0pO2lmKGkpcmV0dXJuKHQ9dy52YWxIb29rc1tpLnR5cGVdfHx3LnZhbEhvb2tzW2kubm9kZU5hbWUudG9Mb3dlckNhc2UoKV0pJiZcXFwiZ2V0XFxcImluIHQmJnZvaWQgMCE9PShuPXQuZ2V0KGksXFxcInZhbHVlXFxcIikpP246XFxcInN0cmluZ1xcXCI9PXR5cGVvZihuPWkudmFsdWUpP24ucmVwbGFjZShidCxcXFwiXFxcIik6bnVsbD09bj9cXFwiXFxcIjpufX19KSx3LmV4dGVuZCh7dmFsSG9va3M6e29wdGlvbjp7Z2V0OmZ1bmN0aW9uKGUpe3ZhciB0PXcuZmluZC5hdHRyKGUsXFxcInZhbHVlXFxcIik7cmV0dXJuIG51bGwhPXQ/dDp2dCh3LnRleHQoZSkpfX0sc2VsZWN0OntnZXQ6ZnVuY3Rpb24oZSl7dmFyIHQsbixyLGk9ZS5vcHRpb25zLG89ZS5zZWxlY3RlZEluZGV4LGE9XFxcInNlbGVjdC1vbmVcXFwiPT09ZS50eXBlLHM9YT9udWxsOltdLHU9YT9vKzE6aS5sZW5ndGg7Zm9yKHI9bzwwP3U6YT9vOjA7cjx1O3IrKylpZigoKG49aVtyXSkuc2VsZWN0ZWR8fHI9PT1vKSYmIW4uZGlzYWJsZWQmJighbi5wYXJlbnROb2RlLmRpc2FibGVkfHwhTihuLnBhcmVudE5vZGUsXFxcIm9wdGdyb3VwXFxcIikpKXtpZih0PXcobikudmFsKCksYSlyZXR1cm4gdDtzLnB1c2godCl9cmV0dXJuIHN9LHNldDpmdW5jdGlvbihlLHQpe3ZhciBuLHIsaT1lLm9wdGlvbnMsbz13Lm1ha2VBcnJheSh0KSxhPWkubGVuZ3RoO3doaWxlKGEtLSkoKHI9aVthXSkuc2VsZWN0ZWQ9dy5pbkFycmF5KHcudmFsSG9va3Mub3B0aW9uLmdldChyKSxvKT4tMSkmJihuPSEwKTtyZXR1cm4gbnx8KGUuc2VsZWN0ZWRJbmRleD0tMSksb319fX0pLHcuZWFjaChbXFxcInJhZGlvXFxcIixcXFwiY2hlY2tib3hcXFwiXSxmdW5jdGlvbigpe3cudmFsSG9va3NbdGhpc109e3NldDpmdW5jdGlvbihlLHQpe2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIGUuY2hlY2tlZD13LmluQXJyYXkodyhlKS52YWwoKSx0KT4tMX19LGguY2hlY2tPbnx8KHcudmFsSG9va3NbdGhpc10uZ2V0PWZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT09ZS5nZXRBdHRyaWJ1dGUoXFxcInZhbHVlXFxcIik/XFxcIm9uXFxcIjplLnZhbHVlfSl9KSxoLmZvY3VzaW49XFxcIm9uZm9jdXNpblxcXCJpbiBlO3ZhciB3dD0vXig/OmZvY3VzaW5mb2N1c3xmb2N1c291dGJsdXIpJC8sVHQ9ZnVuY3Rpb24oZSl7ZS5zdG9wUHJvcGFnYXRpb24oKX07dy5leHRlbmQody5ldmVudCx7dHJpZ2dlcjpmdW5jdGlvbih0LG4saSxvKXt2YXIgYSxzLHUsbCxjLHAsZCxoLHY9W2l8fHJdLG09Zi5jYWxsKHQsXFxcInR5cGVcXFwiKT90LnR5cGU6dCx4PWYuY2FsbCh0LFxcXCJuYW1lc3BhY2VcXFwiKT90Lm5hbWVzcGFjZS5zcGxpdChcXFwiLlxcXCIpOltdO2lmKHM9aD11PWk9aXx8ciwzIT09aS5ub2RlVHlwZSYmOCE9PWkubm9kZVR5cGUmJiF3dC50ZXN0KG0rdy5ldmVudC50cmlnZ2VyZWQpJiYobS5pbmRleE9mKFxcXCIuXFxcIik+LTEmJihtPSh4PW0uc3BsaXQoXFxcIi5cXFwiKSkuc2hpZnQoKSx4LnNvcnQoKSksYz1tLmluZGV4T2YoXFxcIjpcXFwiKTwwJiZcXFwib25cXFwiK20sdD10W3cuZXhwYW5kb10/dDpuZXcgdy5FdmVudChtLFxcXCJvYmplY3RcXFwiPT10eXBlb2YgdCYmdCksdC5pc1RyaWdnZXI9bz8yOjMsdC5uYW1lc3BhY2U9eC5qb2luKFxcXCIuXFxcIiksdC5ybmFtZXNwYWNlPXQubmFtZXNwYWNlP25ldyBSZWdFeHAoXFxcIihefFxcXFxcXFxcLilcXFwiK3guam9pbihcXFwiXFxcXFxcXFwuKD86LipcXFxcXFxcXC58KVxcXCIpK1xcXCIoXFxcXFxcXFwufCQpXFxcIik6bnVsbCx0LnJlc3VsdD12b2lkIDAsdC50YXJnZXR8fCh0LnRhcmdldD1pKSxuPW51bGw9PW4/W3RdOncubWFrZUFycmF5KG4sW3RdKSxkPXcuZXZlbnQuc3BlY2lhbFttXXx8e30sb3x8IWQudHJpZ2dlcnx8ITEhPT1kLnRyaWdnZXIuYXBwbHkoaSxuKSkpe2lmKCFvJiYhZC5ub0J1YmJsZSYmIXkoaSkpe2ZvcihsPWQuZGVsZWdhdGVUeXBlfHxtLHd0LnRlc3QobCttKXx8KHM9cy5wYXJlbnROb2RlKTtzO3M9cy5wYXJlbnROb2RlKXYucHVzaChzKSx1PXM7dT09PShpLm93bmVyRG9jdW1lbnR8fHIpJiZ2LnB1c2godS5kZWZhdWx0Vmlld3x8dS5wYXJlbnRXaW5kb3d8fGUpfWE9MDt3aGlsZSgocz12W2ErK10pJiYhdC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKWg9cyx0LnR5cGU9YT4xP2w6ZC5iaW5kVHlwZXx8bSwocD0oSi5nZXQocyxcXFwiZXZlbnRzXFxcIil8fHt9KVt0LnR5cGVdJiZKLmdldChzLFxcXCJoYW5kbGVcXFwiKSkmJnAuYXBwbHkocyxuKSwocD1jJiZzW2NdKSYmcC5hcHBseSYmWShzKSYmKHQucmVzdWx0PXAuYXBwbHkocyxuKSwhMT09PXQucmVzdWx0JiZ0LnByZXZlbnREZWZhdWx0KCkpO3JldHVybiB0LnR5cGU9bSxvfHx0LmlzRGVmYXVsdFByZXZlbnRlZCgpfHxkLl9kZWZhdWx0JiYhMSE9PWQuX2RlZmF1bHQuYXBwbHkodi5wb3AoKSxuKXx8IVkoaSl8fGMmJmcoaVttXSkmJiF5KGkpJiYoKHU9aVtjXSkmJihpW2NdPW51bGwpLHcuZXZlbnQudHJpZ2dlcmVkPW0sdC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpJiZoLmFkZEV2ZW50TGlzdGVuZXIobSxUdCksaVttXSgpLHQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSYmaC5yZW1vdmVFdmVudExpc3RlbmVyKG0sVHQpLHcuZXZlbnQudHJpZ2dlcmVkPXZvaWQgMCx1JiYoaVtjXT11KSksdC5yZXN1bHR9fSxzaW11bGF0ZTpmdW5jdGlvbihlLHQsbil7dmFyIHI9dy5leHRlbmQobmV3IHcuRXZlbnQsbix7dHlwZTplLGlzU2ltdWxhdGVkOiEwfSk7dy5ldmVudC50cmlnZ2VyKHIsbnVsbCx0KX19KSx3LmZuLmV4dGVuZCh7dHJpZ2dlcjpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt3LmV2ZW50LnRyaWdnZXIoZSx0LHRoaXMpfSl9LHRyaWdnZXJIYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpc1swXTtpZihuKXJldHVybiB3LmV2ZW50LnRyaWdnZXIoZSx0LG4sITApfX0pLGguZm9jdXNpbnx8dy5lYWNoKHtmb2N1czpcXFwiZm9jdXNpblxcXCIsYmx1cjpcXFwiZm9jdXNvdXRcXFwifSxmdW5jdGlvbihlLHQpe3ZhciBuPWZ1bmN0aW9uKGUpe3cuZXZlbnQuc2ltdWxhdGUodCxlLnRhcmdldCx3LmV2ZW50LmZpeChlKSl9O3cuZXZlbnQuc3BlY2lhbFt0XT17c2V0dXA6ZnVuY3Rpb24oKXt2YXIgcj10aGlzLm93bmVyRG9jdW1lbnR8fHRoaXMsaT1KLmFjY2VzcyhyLHQpO2l8fHIuYWRkRXZlbnRMaXN0ZW5lcihlLG4sITApLEouYWNjZXNzKHIsdCwoaXx8MCkrMSl9LHRlYXJkb3duOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcy5vd25lckRvY3VtZW50fHx0aGlzLGk9Si5hY2Nlc3Mocix0KS0xO2k/Si5hY2Nlc3Mocix0LGkpOihyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxuLCEwKSxKLnJlbW92ZShyLHQpKX19fSk7dmFyIEN0PWUubG9jYXRpb24sRXQ9RGF0ZS5ub3coKSxrdD0vXFxcXD8vO3cucGFyc2VYTUw9ZnVuY3Rpb24odCl7dmFyIG47aWYoIXR8fFxcXCJzdHJpbmdcXFwiIT10eXBlb2YgdClyZXR1cm4gbnVsbDt0cnl7bj0obmV3IGUuRE9NUGFyc2VyKS5wYXJzZUZyb21TdHJpbmcodCxcXFwidGV4dC94bWxcXFwiKX1jYXRjaChlKXtuPXZvaWQgMH1yZXR1cm4gbiYmIW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXFxcInBhcnNlcmVycm9yXFxcIikubGVuZ3RofHx3LmVycm9yKFxcXCJJbnZhbGlkIFhNTDogXFxcIit0KSxufTt2YXIgU3Q9L1xcXFxbXFxcXF0kLyxEdD0vXFxcXHI/XFxcXG4vZyxOdD0vXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksQXQ9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO2Z1bmN0aW9uIGp0KGUsdCxuLHIpe3ZhciBpO2lmKEFycmF5LmlzQXJyYXkodCkpdy5lYWNoKHQsZnVuY3Rpb24odCxpKXtufHxTdC50ZXN0KGUpP3IoZSxpKTpqdChlK1xcXCJbXFxcIisoXFxcIm9iamVjdFxcXCI9PXR5cGVvZiBpJiZudWxsIT1pP3Q6XFxcIlxcXCIpK1xcXCJdXFxcIixpLG4scil9KTtlbHNlIGlmKG58fFxcXCJvYmplY3RcXFwiIT09eCh0KSlyKGUsdCk7ZWxzZSBmb3IoaSBpbiB0KWp0KGUrXFxcIltcXFwiK2krXFxcIl1cXFwiLHRbaV0sbixyKX13LnBhcmFtPWZ1bmN0aW9uKGUsdCl7dmFyIG4scj1bXSxpPWZ1bmN0aW9uKGUsdCl7dmFyIG49Zyh0KT90KCk6dDtyW3IubGVuZ3RoXT1lbmNvZGVVUklDb21wb25lbnQoZSkrXFxcIj1cXFwiK2VuY29kZVVSSUNvbXBvbmVudChudWxsPT1uP1xcXCJcXFwiOm4pfTtpZihBcnJheS5pc0FycmF5KGUpfHxlLmpxdWVyeSYmIXcuaXNQbGFpbk9iamVjdChlKSl3LmVhY2goZSxmdW5jdGlvbigpe2kodGhpcy5uYW1lLHRoaXMudmFsdWUpfSk7ZWxzZSBmb3IobiBpbiBlKWp0KG4sZVtuXSx0LGkpO3JldHVybiByLmpvaW4oXFxcIiZcXFwiKX0sdy5mbi5leHRlbmQoe3NlcmlhbGl6ZTpmdW5jdGlvbigpe3JldHVybiB3LnBhcmFtKHRoaXMuc2VyaWFsaXplQXJyYXkoKSl9LHNlcmlhbGl6ZUFycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGU9dy5wcm9wKHRoaXMsXFxcImVsZW1lbnRzXFxcIik7cmV0dXJuIGU/dy5tYWtlQXJyYXkoZSk6dGhpc30pLmZpbHRlcihmdW5jdGlvbigpe3ZhciBlPXRoaXMudHlwZTtyZXR1cm4gdGhpcy5uYW1lJiYhdyh0aGlzKS5pcyhcXFwiOmRpc2FibGVkXFxcIikmJkF0LnRlc3QodGhpcy5ub2RlTmFtZSkmJiFOdC50ZXN0KGUpJiYodGhpcy5jaGVja2VkfHwhcGUudGVzdChlKSl9KS5tYXAoZnVuY3Rpb24oZSx0KXt2YXIgbj13KHRoaXMpLnZhbCgpO3JldHVybiBudWxsPT1uP251bGw6QXJyYXkuaXNBcnJheShuKT93Lm1hcChuLGZ1bmN0aW9uKGUpe3JldHVybntuYW1lOnQubmFtZSx2YWx1ZTplLnJlcGxhY2UoRHQsXFxcIlxcXFxyXFxcXG5cXFwiKX19KTp7bmFtZTp0Lm5hbWUsdmFsdWU6bi5yZXBsYWNlKER0LFxcXCJcXFxcclxcXFxuXFxcIil9fSkuZ2V0KCl9fSk7dmFyIHF0PS8lMjAvZyxMdD0vIy4qJC8sSHQ9LyhbPyZdKV89W14mXSovLE90PS9eKC4qPyk6WyBcXFxcdF0qKFteXFxcXHJcXFxcbl0qKSQvZ20sUHQ9L14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sTXQ9L14oPzpHRVR8SEVBRCkkLyxSdD0vXlxcXFwvXFxcXC8vLEl0PXt9LFd0PXt9LCR0PVxcXCIqL1xcXCIuY29uY2F0KFxcXCIqXFxcIiksQnQ9ci5jcmVhdGVFbGVtZW50KFxcXCJhXFxcIik7QnQuaHJlZj1DdC5ocmVmO2Z1bmN0aW9uIEZ0KGUpe3JldHVybiBmdW5jdGlvbih0LG4pe1xcXCJzdHJpbmdcXFwiIT10eXBlb2YgdCYmKG49dCx0PVxcXCIqXFxcIik7dmFyIHIsaT0wLG89dC50b0xvd2VyQ2FzZSgpLm1hdGNoKE0pfHxbXTtpZihnKG4pKXdoaWxlKHI9b1tpKytdKVxcXCIrXFxcIj09PXJbMF0/KHI9ci5zbGljZSgxKXx8XFxcIipcXFwiLChlW3JdPWVbcl18fFtdKS51bnNoaWZ0KG4pKTooZVtyXT1lW3JdfHxbXSkucHVzaChuKX19ZnVuY3Rpb24gX3QoZSx0LG4scil7dmFyIGk9e30sbz1lPT09V3Q7ZnVuY3Rpb24gYShzKXt2YXIgdTtyZXR1cm4gaVtzXT0hMCx3LmVhY2goZVtzXXx8W10sZnVuY3Rpb24oZSxzKXt2YXIgbD1zKHQsbixyKTtyZXR1cm5cXFwic3RyaW5nXFxcIiE9dHlwZW9mIGx8fG98fGlbbF0/bz8hKHU9bCk6dm9pZCAwOih0LmRhdGFUeXBlcy51bnNoaWZ0KGwpLGEobCksITEpfSksdX1yZXR1cm4gYSh0LmRhdGFUeXBlc1swXSl8fCFpW1xcXCIqXFxcIl0mJmEoXFxcIipcXFwiKX1mdW5jdGlvbiB6dChlLHQpe3ZhciBuLHIsaT13LmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9uc3x8e307Zm9yKG4gaW4gdCl2b2lkIDAhPT10W25dJiYoKGlbbl0/ZTpyfHwocj17fSkpW25dPXRbbl0pO3JldHVybiByJiZ3LmV4dGVuZCghMCxlLHIpLGV9ZnVuY3Rpb24gWHQoZSx0LG4pe3ZhciByLGksbyxhLHM9ZS5jb250ZW50cyx1PWUuZGF0YVR5cGVzO3doaWxlKFxcXCIqXFxcIj09PXVbMF0pdS5zaGlmdCgpLHZvaWQgMD09PXImJihyPWUubWltZVR5cGV8fHQuZ2V0UmVzcG9uc2VIZWFkZXIoXFxcIkNvbnRlbnQtVHlwZVxcXCIpKTtpZihyKWZvcihpIGluIHMpaWYoc1tpXSYmc1tpXS50ZXN0KHIpKXt1LnVuc2hpZnQoaSk7YnJlYWt9aWYodVswXWluIG4pbz11WzBdO2Vsc2V7Zm9yKGkgaW4gbil7aWYoIXVbMF18fGUuY29udmVydGVyc1tpK1xcXCIgXFxcIit1WzBdXSl7bz1pO2JyZWFrfWF8fChhPWkpfW89b3x8YX1pZihvKXJldHVybiBvIT09dVswXSYmdS51bnNoaWZ0KG8pLG5bb119ZnVuY3Rpb24gVXQoZSx0LG4scil7dmFyIGksbyxhLHMsdSxsPXt9LGM9ZS5kYXRhVHlwZXMuc2xpY2UoKTtpZihjWzFdKWZvcihhIGluIGUuY29udmVydGVycylsW2EudG9Mb3dlckNhc2UoKV09ZS5jb252ZXJ0ZXJzW2FdO289Yy5zaGlmdCgpO3doaWxlKG8paWYoZS5yZXNwb25zZUZpZWxkc1tvXSYmKG5bZS5yZXNwb25zZUZpZWxkc1tvXV09dCksIXUmJnImJmUuZGF0YUZpbHRlciYmKHQ9ZS5kYXRhRmlsdGVyKHQsZS5kYXRhVHlwZSkpLHU9byxvPWMuc2hpZnQoKSlpZihcXFwiKlxcXCI9PT1vKW89dTtlbHNlIGlmKFxcXCIqXFxcIiE9PXUmJnUhPT1vKXtpZighKGE9bFt1K1xcXCIgXFxcIitvXXx8bFtcXFwiKiBcXFwiK29dKSlmb3IoaSBpbiBsKWlmKChzPWkuc3BsaXQoXFxcIiBcXFwiKSlbMV09PT1vJiYoYT1sW3UrXFxcIiBcXFwiK3NbMF1dfHxsW1xcXCIqIFxcXCIrc1swXV0pKXshMD09PWE/YT1sW2ldOiEwIT09bFtpXSYmKG89c1swXSxjLnVuc2hpZnQoc1sxXSkpO2JyZWFrfWlmKCEwIT09YSlpZihhJiZlW1xcXCJ0aHJvd3NcXFwiXSl0PWEodCk7ZWxzZSB0cnl7dD1hKHQpfWNhdGNoKGUpe3JldHVybntzdGF0ZTpcXFwicGFyc2VyZXJyb3JcXFwiLGVycm9yOmE/ZTpcXFwiTm8gY29udmVyc2lvbiBmcm9tIFxcXCIrdStcXFwiIHRvIFxcXCIrb319fXJldHVybntzdGF0ZTpcXFwic3VjY2Vzc1xcXCIsZGF0YTp0fX13LmV4dGVuZCh7YWN0aXZlOjAsbGFzdE1vZGlmaWVkOnt9LGV0YWc6e30sYWpheFNldHRpbmdzOnt1cmw6Q3QuaHJlZix0eXBlOlxcXCJHRVRcXFwiLGlzTG9jYWw6UHQudGVzdChDdC5wcm90b2NvbCksZ2xvYmFsOiEwLHByb2Nlc3NEYXRhOiEwLGFzeW5jOiEwLGNvbnRlbnRUeXBlOlxcXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcXFwiLGFjY2VwdHM6e1xcXCIqXFxcIjokdCx0ZXh0OlxcXCJ0ZXh0L3BsYWluXFxcIixodG1sOlxcXCJ0ZXh0L2h0bWxcXFwiLHhtbDpcXFwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFxcXCIsanNvbjpcXFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XFxcIn0sY29udGVudHM6e3htbDovXFxcXGJ4bWxcXFxcYi8saHRtbDovXFxcXGJodG1sLyxqc29uOi9cXFxcYmpzb25cXFxcYi99LHJlc3BvbnNlRmllbGRzOnt4bWw6XFxcInJlc3BvbnNlWE1MXFxcIix0ZXh0OlxcXCJyZXNwb25zZVRleHRcXFwiLGpzb246XFxcInJlc3BvbnNlSlNPTlxcXCJ9LGNvbnZlcnRlcnM6e1xcXCIqIHRleHRcXFwiOlN0cmluZyxcXFwidGV4dCBodG1sXFxcIjohMCxcXFwidGV4dCBqc29uXFxcIjpKU09OLnBhcnNlLFxcXCJ0ZXh0IHhtbFxcXCI6dy5wYXJzZVhNTH0sZmxhdE9wdGlvbnM6e3VybDohMCxjb250ZXh0OiEwfX0sYWpheFNldHVwOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ/enQoenQoZSx3LmFqYXhTZXR0aW5ncyksdCk6enQody5hamF4U2V0dGluZ3MsZSl9LGFqYXhQcmVmaWx0ZXI6RnQoSXQpLGFqYXhUcmFuc3BvcnQ6RnQoV3QpLGFqYXg6ZnVuY3Rpb24odCxuKXtcXFwib2JqZWN0XFxcIj09dHlwZW9mIHQmJihuPXQsdD12b2lkIDApLG49bnx8e307dmFyIGksbyxhLHMsdSxsLGMsZixwLGQsaD13LmFqYXhTZXR1cCh7fSxuKSxnPWguY29udGV4dHx8aCx5PWguY29udGV4dCYmKGcubm9kZVR5cGV8fGcuanF1ZXJ5KT93KGcpOncuZXZlbnQsdj13LkRlZmVycmVkKCksbT13LkNhbGxiYWNrcyhcXFwib25jZSBtZW1vcnlcXFwiKSx4PWguc3RhdHVzQ29kZXx8e30sYj17fSxUPXt9LEM9XFxcImNhbmNlbGVkXFxcIixFPXtyZWFkeVN0YXRlOjAsZ2V0UmVzcG9uc2VIZWFkZXI6ZnVuY3Rpb24oZSl7dmFyIHQ7aWYoYyl7aWYoIXMpe3M9e307d2hpbGUodD1PdC5leGVjKGEpKXNbdFsxXS50b0xvd2VyQ2FzZSgpXT10WzJdfXQ9c1tlLnRvTG93ZXJDYXNlKCldfXJldHVybiBudWxsPT10P251bGw6dH0sZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOmZ1bmN0aW9uKCl7cmV0dXJuIGM/YTpudWxsfSxzZXRSZXF1ZXN0SGVhZGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIG51bGw9PWMmJihlPVRbZS50b0xvd2VyQ2FzZSgpXT1UW2UudG9Mb3dlckNhc2UoKV18fGUsYltlXT10KSx0aGlzfSxvdmVycmlkZU1pbWVUeXBlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT1jJiYoaC5taW1lVHlwZT1lKSx0aGlzfSxzdGF0dXNDb2RlOmZ1bmN0aW9uKGUpe3ZhciB0O2lmKGUpaWYoYylFLmFsd2F5cyhlW0Uuc3RhdHVzXSk7ZWxzZSBmb3IodCBpbiBlKXhbdF09W3hbdF0sZVt0XV07cmV0dXJuIHRoaXN9LGFib3J0OmZ1bmN0aW9uKGUpe3ZhciB0PWV8fEM7cmV0dXJuIGkmJmkuYWJvcnQodCksaygwLHQpLHRoaXN9fTtpZih2LnByb21pc2UoRSksaC51cmw9KCh0fHxoLnVybHx8Q3QuaHJlZikrXFxcIlxcXCIpLnJlcGxhY2UoUnQsQ3QucHJvdG9jb2wrXFxcIi8vXFxcIiksaC50eXBlPW4ubWV0aG9kfHxuLnR5cGV8fGgubWV0aG9kfHxoLnR5cGUsaC5kYXRhVHlwZXM9KGguZGF0YVR5cGV8fFxcXCIqXFxcIikudG9Mb3dlckNhc2UoKS5tYXRjaChNKXx8W1xcXCJcXFwiXSxudWxsPT1oLmNyb3NzRG9tYWluKXtsPXIuY3JlYXRlRWxlbWVudChcXFwiYVxcXCIpO3RyeXtsLmhyZWY9aC51cmwsbC5ocmVmPWwuaHJlZixoLmNyb3NzRG9tYWluPUJ0LnByb3RvY29sK1xcXCIvL1xcXCIrQnQuaG9zdCE9bC5wcm90b2NvbCtcXFwiLy9cXFwiK2wuaG9zdH1jYXRjaChlKXtoLmNyb3NzRG9tYWluPSEwfX1pZihoLmRhdGEmJmgucHJvY2Vzc0RhdGEmJlxcXCJzdHJpbmdcXFwiIT10eXBlb2YgaC5kYXRhJiYoaC5kYXRhPXcucGFyYW0oaC5kYXRhLGgudHJhZGl0aW9uYWwpKSxfdChJdCxoLG4sRSksYylyZXR1cm4gRTsoZj13LmV2ZW50JiZoLmdsb2JhbCkmJjA9PXcuYWN0aXZlKysmJncuZXZlbnQudHJpZ2dlcihcXFwiYWpheFN0YXJ0XFxcIiksaC50eXBlPWgudHlwZS50b1VwcGVyQ2FzZSgpLGguaGFzQ29udGVudD0hTXQudGVzdChoLnR5cGUpLG89aC51cmwucmVwbGFjZShMdCxcXFwiXFxcIiksaC5oYXNDb250ZW50P2guZGF0YSYmaC5wcm9jZXNzRGF0YSYmMD09PShoLmNvbnRlbnRUeXBlfHxcXFwiXFxcIikuaW5kZXhPZihcXFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXFxcIikmJihoLmRhdGE9aC5kYXRhLnJlcGxhY2UocXQsXFxcIitcXFwiKSk6KGQ9aC51cmwuc2xpY2Uoby5sZW5ndGgpLGguZGF0YSYmKGgucHJvY2Vzc0RhdGF8fFxcXCJzdHJpbmdcXFwiPT10eXBlb2YgaC5kYXRhKSYmKG8rPShrdC50ZXN0KG8pP1xcXCImXFxcIjpcXFwiP1xcXCIpK2guZGF0YSxkZWxldGUgaC5kYXRhKSwhMT09PWguY2FjaGUmJihvPW8ucmVwbGFjZShIdCxcXFwiJDFcXFwiKSxkPShrdC50ZXN0KG8pP1xcXCImXFxcIjpcXFwiP1xcXCIpK1xcXCJfPVxcXCIrRXQrKytkKSxoLnVybD1vK2QpLGguaWZNb2RpZmllZCYmKHcubGFzdE1vZGlmaWVkW29dJiZFLnNldFJlcXVlc3RIZWFkZXIoXFxcIklmLU1vZGlmaWVkLVNpbmNlXFxcIix3Lmxhc3RNb2RpZmllZFtvXSksdy5ldGFnW29dJiZFLnNldFJlcXVlc3RIZWFkZXIoXFxcIklmLU5vbmUtTWF0Y2hcXFwiLHcuZXRhZ1tvXSkpLChoLmRhdGEmJmguaGFzQ29udGVudCYmITEhPT1oLmNvbnRlbnRUeXBlfHxuLmNvbnRlbnRUeXBlKSYmRS5zZXRSZXF1ZXN0SGVhZGVyKFxcXCJDb250ZW50LVR5cGVcXFwiLGguY29udGVudFR5cGUpLEUuc2V0UmVxdWVzdEhlYWRlcihcXFwiQWNjZXB0XFxcIixoLmRhdGFUeXBlc1swXSYmaC5hY2NlcHRzW2guZGF0YVR5cGVzWzBdXT9oLmFjY2VwdHNbaC5kYXRhVHlwZXNbMF1dKyhcXFwiKlxcXCIhPT1oLmRhdGFUeXBlc1swXT9cXFwiLCBcXFwiKyR0K1xcXCI7IHE9MC4wMVxcXCI6XFxcIlxcXCIpOmguYWNjZXB0c1tcXFwiKlxcXCJdKTtmb3IocCBpbiBoLmhlYWRlcnMpRS5zZXRSZXF1ZXN0SGVhZGVyKHAsaC5oZWFkZXJzW3BdKTtpZihoLmJlZm9yZVNlbmQmJighMT09PWguYmVmb3JlU2VuZC5jYWxsKGcsRSxoKXx8YykpcmV0dXJuIEUuYWJvcnQoKTtpZihDPVxcXCJhYm9ydFxcXCIsbS5hZGQoaC5jb21wbGV0ZSksRS5kb25lKGguc3VjY2VzcyksRS5mYWlsKGguZXJyb3IpLGk9X3QoV3QsaCxuLEUpKXtpZihFLnJlYWR5U3RhdGU9MSxmJiZ5LnRyaWdnZXIoXFxcImFqYXhTZW5kXFxcIixbRSxoXSksYylyZXR1cm4gRTtoLmFzeW5jJiZoLnRpbWVvdXQ+MCYmKHU9ZS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7RS5hYm9ydChcXFwidGltZW91dFxcXCIpfSxoLnRpbWVvdXQpKTt0cnl7Yz0hMSxpLnNlbmQoYixrKX1jYXRjaChlKXtpZihjKXRocm93IGU7aygtMSxlKX19ZWxzZSBrKC0xLFxcXCJObyBUcmFuc3BvcnRcXFwiKTtmdW5jdGlvbiBrKHQsbixyLHMpe3ZhciBsLHAsZCxiLFQsQz1uO2N8fChjPSEwLHUmJmUuY2xlYXJUaW1lb3V0KHUpLGk9dm9pZCAwLGE9c3x8XFxcIlxcXCIsRS5yZWFkeVN0YXRlPXQ+MD80OjAsbD10Pj0yMDAmJnQ8MzAwfHwzMDQ9PT10LHImJihiPVh0KGgsRSxyKSksYj1VdChoLGIsRSxsKSxsPyhoLmlmTW9kaWZpZWQmJigoVD1FLmdldFJlc3BvbnNlSGVhZGVyKFxcXCJMYXN0LU1vZGlmaWVkXFxcIikpJiYody5sYXN0TW9kaWZpZWRbb109VCksKFQ9RS5nZXRSZXNwb25zZUhlYWRlcihcXFwiZXRhZ1xcXCIpKSYmKHcuZXRhZ1tvXT1UKSksMjA0PT09dHx8XFxcIkhFQURcXFwiPT09aC50eXBlP0M9XFxcIm5vY29udGVudFxcXCI6MzA0PT09dD9DPVxcXCJub3Rtb2RpZmllZFxcXCI6KEM9Yi5zdGF0ZSxwPWIuZGF0YSxsPSEoZD1iLmVycm9yKSkpOihkPUMsIXQmJkN8fChDPVxcXCJlcnJvclxcXCIsdDwwJiYodD0wKSkpLEUuc3RhdHVzPXQsRS5zdGF0dXNUZXh0PShufHxDKStcXFwiXFxcIixsP3YucmVzb2x2ZVdpdGgoZyxbcCxDLEVdKTp2LnJlamVjdFdpdGgoZyxbRSxDLGRdKSxFLnN0YXR1c0NvZGUoeCkseD12b2lkIDAsZiYmeS50cmlnZ2VyKGw/XFxcImFqYXhTdWNjZXNzXFxcIjpcXFwiYWpheEVycm9yXFxcIixbRSxoLGw/cDpkXSksbS5maXJlV2l0aChnLFtFLENdKSxmJiYoeS50cmlnZ2VyKFxcXCJhamF4Q29tcGxldGVcXFwiLFtFLGhdKSwtLXcuYWN0aXZlfHx3LmV2ZW50LnRyaWdnZXIoXFxcImFqYXhTdG9wXFxcIikpKX1yZXR1cm4gRX0sZ2V0SlNPTjpmdW5jdGlvbihlLHQsbil7cmV0dXJuIHcuZ2V0KGUsdCxuLFxcXCJqc29uXFxcIil9LGdldFNjcmlwdDpmdW5jdGlvbihlLHQpe3JldHVybiB3LmdldChlLHZvaWQgMCx0LFxcXCJzY3JpcHRcXFwiKX19KSx3LmVhY2goW1xcXCJnZXRcXFwiLFxcXCJwb3N0XFxcIl0sZnVuY3Rpb24oZSx0KXt3W3RdPWZ1bmN0aW9uKGUsbixyLGkpe3JldHVybiBnKG4pJiYoaT1pfHxyLHI9bixuPXZvaWQgMCksdy5hamF4KHcuZXh0ZW5kKHt1cmw6ZSx0eXBlOnQsZGF0YVR5cGU6aSxkYXRhOm4sc3VjY2VzczpyfSx3LmlzUGxhaW5PYmplY3QoZSkmJmUpKX19KSx3Ll9ldmFsVXJsPWZ1bmN0aW9uKGUpe3JldHVybiB3LmFqYXgoe3VybDplLHR5cGU6XFxcIkdFVFxcXCIsZGF0YVR5cGU6XFxcInNjcmlwdFxcXCIsY2FjaGU6ITAsYXN5bmM6ITEsZ2xvYmFsOiExLFxcXCJ0aHJvd3NcXFwiOiEwfSl9LHcuZm4uZXh0ZW5kKHt3cmFwQWxsOmZ1bmN0aW9uKGUpe3ZhciB0O3JldHVybiB0aGlzWzBdJiYoZyhlKSYmKGU9ZS5jYWxsKHRoaXNbMF0pKSx0PXcoZSx0aGlzWzBdLm93bmVyRG9jdW1lbnQpLmVxKDApLmNsb25lKCEwKSx0aGlzWzBdLnBhcmVudE5vZGUmJnQuaW5zZXJ0QmVmb3JlKHRoaXNbMF0pLHQubWFwKGZ1bmN0aW9uKCl7dmFyIGU9dGhpczt3aGlsZShlLmZpcnN0RWxlbWVudENoaWxkKWU9ZS5maXJzdEVsZW1lbnRDaGlsZDtyZXR1cm4gZX0pLmFwcGVuZCh0aGlzKSksdGhpc30sd3JhcElubmVyOmZ1bmN0aW9uKGUpe3JldHVybiBnKGUpP3RoaXMuZWFjaChmdW5jdGlvbih0KXt3KHRoaXMpLndyYXBJbm5lcihlLmNhbGwodGhpcyx0KSl9KTp0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD13KHRoaXMpLG49dC5jb250ZW50cygpO24ubGVuZ3RoP24ud3JhcEFsbChlKTp0LmFwcGVuZChlKX0pfSx3cmFwOmZ1bmN0aW9uKGUpe3ZhciB0PWcoZSk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihuKXt3KHRoaXMpLndyYXBBbGwodD9lLmNhbGwodGhpcyxuKTplKX0pfSx1bndyYXA6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucGFyZW50KGUpLm5vdChcXFwiYm9keVxcXCIpLmVhY2goZnVuY3Rpb24oKXt3KHRoaXMpLnJlcGxhY2VXaXRoKHRoaXMuY2hpbGROb2Rlcyl9KSx0aGlzfX0pLHcuZXhwci5wc2V1ZG9zLmhpZGRlbj1mdW5jdGlvbihlKXtyZXR1cm4hdy5leHByLnBzZXVkb3MudmlzaWJsZShlKX0sdy5leHByLnBzZXVkb3MudmlzaWJsZT1mdW5jdGlvbihlKXtyZXR1cm4hIShlLm9mZnNldFdpZHRofHxlLm9mZnNldEhlaWdodHx8ZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCl9LHcuYWpheFNldHRpbmdzLnhocj1mdW5jdGlvbigpe3RyeXtyZXR1cm4gbmV3IGUuWE1MSHR0cFJlcXVlc3R9Y2F0Y2goZSl7fX07dmFyIFZ0PXswOjIwMCwxMjIzOjIwNH0sR3Q9dy5hamF4U2V0dGluZ3MueGhyKCk7aC5jb3JzPSEhR3QmJlxcXCJ3aXRoQ3JlZGVudGlhbHNcXFwiaW4gR3QsaC5hamF4PUd0PSEhR3Qsdy5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKHQpe3ZhciBuLHI7aWYoaC5jb3JzfHxHdCYmIXQuY3Jvc3NEb21haW4pcmV0dXJue3NlbmQ6ZnVuY3Rpb24oaSxvKXt2YXIgYSxzPXQueGhyKCk7aWYocy5vcGVuKHQudHlwZSx0LnVybCx0LmFzeW5jLHQudXNlcm5hbWUsdC5wYXNzd29yZCksdC54aHJGaWVsZHMpZm9yKGEgaW4gdC54aHJGaWVsZHMpc1thXT10LnhockZpZWxkc1thXTt0Lm1pbWVUeXBlJiZzLm92ZXJyaWRlTWltZVR5cGUmJnMub3ZlcnJpZGVNaW1lVHlwZSh0Lm1pbWVUeXBlKSx0LmNyb3NzRG9tYWlufHxpW1xcXCJYLVJlcXVlc3RlZC1XaXRoXFxcIl18fChpW1xcXCJYLVJlcXVlc3RlZC1XaXRoXFxcIl09XFxcIlhNTEh0dHBSZXF1ZXN0XFxcIik7Zm9yKGEgaW4gaSlzLnNldFJlcXVlc3RIZWFkZXIoYSxpW2FdKTtuPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbigpe24mJihuPXI9cy5vbmxvYWQ9cy5vbmVycm9yPXMub25hYm9ydD1zLm9udGltZW91dD1zLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLFxcXCJhYm9ydFxcXCI9PT1lP3MuYWJvcnQoKTpcXFwiZXJyb3JcXFwiPT09ZT9cXFwibnVtYmVyXFxcIiE9dHlwZW9mIHMuc3RhdHVzP28oMCxcXFwiZXJyb3JcXFwiKTpvKHMuc3RhdHVzLHMuc3RhdHVzVGV4dCk6byhWdFtzLnN0YXR1c118fHMuc3RhdHVzLHMuc3RhdHVzVGV4dCxcXFwidGV4dFxcXCIhPT0ocy5yZXNwb25zZVR5cGV8fFxcXCJ0ZXh0XFxcIil8fFxcXCJzdHJpbmdcXFwiIT10eXBlb2Ygcy5yZXNwb25zZVRleHQ/e2JpbmFyeTpzLnJlc3BvbnNlfTp7dGV4dDpzLnJlc3BvbnNlVGV4dH0scy5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkpfX0scy5vbmxvYWQ9bigpLHI9cy5vbmVycm9yPXMub250aW1lb3V0PW4oXFxcImVycm9yXFxcIiksdm9pZCAwIT09cy5vbmFib3J0P3Mub25hYm9ydD1yOnMub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7ND09PXMucmVhZHlTdGF0ZSYmZS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7biYmcigpfSl9LG49bihcXFwiYWJvcnRcXFwiKTt0cnl7cy5zZW5kKHQuaGFzQ29udGVudCYmdC5kYXRhfHxudWxsKX1jYXRjaChlKXtpZihuKXRocm93IGV9fSxhYm9ydDpmdW5jdGlvbigpe24mJm4oKX19fSksdy5hamF4UHJlZmlsdGVyKGZ1bmN0aW9uKGUpe2UuY3Jvc3NEb21haW4mJihlLmNvbnRlbnRzLnNjcmlwdD0hMSl9KSx3LmFqYXhTZXR1cCh7YWNjZXB0czp7c2NyaXB0OlxcXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFxcXCJ9LGNvbnRlbnRzOntzY3JpcHQ6L1xcXFxiKD86amF2YXxlY21hKXNjcmlwdFxcXFxiL30sY29udmVydGVyczp7XFxcInRleHQgc2NyaXB0XFxcIjpmdW5jdGlvbihlKXtyZXR1cm4gdy5nbG9iYWxFdmFsKGUpLGV9fX0pLHcuYWpheFByZWZpbHRlcihcXFwic2NyaXB0XFxcIixmdW5jdGlvbihlKXt2b2lkIDA9PT1lLmNhY2hlJiYoZS5jYWNoZT0hMSksZS5jcm9zc0RvbWFpbiYmKGUudHlwZT1cXFwiR0VUXFxcIil9KSx3LmFqYXhUcmFuc3BvcnQoXFxcInNjcmlwdFxcXCIsZnVuY3Rpb24oZSl7aWYoZS5jcm9zc0RvbWFpbil7dmFyIHQsbjtyZXR1cm57c2VuZDpmdW5jdGlvbihpLG8pe3Q9dyhcXFwiPHNjcmlwdD5cXFwiKS5wcm9wKHtjaGFyc2V0OmUuc2NyaXB0Q2hhcnNldCxzcmM6ZS51cmx9KS5vbihcXFwibG9hZCBlcnJvclxcXCIsbj1mdW5jdGlvbihlKXt0LnJlbW92ZSgpLG49bnVsbCxlJiZvKFxcXCJlcnJvclxcXCI9PT1lLnR5cGU/NDA0OjIwMCxlLnR5cGUpfSksci5oZWFkLmFwcGVuZENoaWxkKHRbMF0pfSxhYm9ydDpmdW5jdGlvbigpe24mJm4oKX19fX0pO3ZhciBZdD1bXSxRdD0vKD0pXFxcXD8oPz0mfCQpfFxcXFw/XFxcXD8vO3cuYWpheFNldHVwKHtqc29ucDpcXFwiY2FsbGJhY2tcXFwiLGpzb25wQ2FsbGJhY2s6ZnVuY3Rpb24oKXt2YXIgZT1ZdC5wb3AoKXx8dy5leHBhbmRvK1xcXCJfXFxcIitFdCsrO3JldHVybiB0aGlzW2VdPSEwLGV9fSksdy5hamF4UHJlZmlsdGVyKFxcXCJqc29uIGpzb25wXFxcIixmdW5jdGlvbih0LG4scil7dmFyIGksbyxhLHM9ITEhPT10Lmpzb25wJiYoUXQudGVzdCh0LnVybCk/XFxcInVybFxcXCI6XFxcInN0cmluZ1xcXCI9PXR5cGVvZiB0LmRhdGEmJjA9PT0odC5jb250ZW50VHlwZXx8XFxcIlxcXCIpLmluZGV4T2YoXFxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxcXCIpJiZRdC50ZXN0KHQuZGF0YSkmJlxcXCJkYXRhXFxcIik7aWYoc3x8XFxcImpzb25wXFxcIj09PXQuZGF0YVR5cGVzWzBdKXJldHVybiBpPXQuanNvbnBDYWxsYmFjaz1nKHQuanNvbnBDYWxsYmFjayk/dC5qc29ucENhbGxiYWNrKCk6dC5qc29ucENhbGxiYWNrLHM/dFtzXT10W3NdLnJlcGxhY2UoUXQsXFxcIiQxXFxcIitpKTohMSE9PXQuanNvbnAmJih0LnVybCs9KGt0LnRlc3QodC51cmwpP1xcXCImXFxcIjpcXFwiP1xcXCIpK3QuanNvbnArXFxcIj1cXFwiK2kpLHQuY29udmVydGVyc1tcXFwic2NyaXB0IGpzb25cXFwiXT1mdW5jdGlvbigpe3JldHVybiBhfHx3LmVycm9yKGkrXFxcIiB3YXMgbm90IGNhbGxlZFxcXCIpLGFbMF19LHQuZGF0YVR5cGVzWzBdPVxcXCJqc29uXFxcIixvPWVbaV0sZVtpXT1mdW5jdGlvbigpe2E9YXJndW1lbnRzfSxyLmFsd2F5cyhmdW5jdGlvbigpe3ZvaWQgMD09PW8/dyhlKS5yZW1vdmVQcm9wKGkpOmVbaV09byx0W2ldJiYodC5qc29ucENhbGxiYWNrPW4uanNvbnBDYWxsYmFjayxZdC5wdXNoKGkpKSxhJiZnKG8pJiZvKGFbMF0pLGE9bz12b2lkIDB9KSxcXFwic2NyaXB0XFxcIn0pLGguY3JlYXRlSFRNTERvY3VtZW50PWZ1bmN0aW9uKCl7dmFyIGU9ci5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXFxcIlxcXCIpLmJvZHk7cmV0dXJuIGUuaW5uZXJIVE1MPVxcXCI8Zm9ybT48L2Zvcm0+PGZvcm0+PC9mb3JtPlxcXCIsMj09PWUuY2hpbGROb2Rlcy5sZW5ndGh9KCksdy5wYXJzZUhUTUw9ZnVuY3Rpb24oZSx0LG4pe2lmKFxcXCJzdHJpbmdcXFwiIT10eXBlb2YgZSlyZXR1cm5bXTtcXFwiYm9vbGVhblxcXCI9PXR5cGVvZiB0JiYobj10LHQ9ITEpO3ZhciBpLG8sYTtyZXR1cm4gdHx8KGguY3JlYXRlSFRNTERvY3VtZW50PygoaT0odD1yLmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcXFwiXFxcIikpLmNyZWF0ZUVsZW1lbnQoXFxcImJhc2VcXFwiKSkuaHJlZj1yLmxvY2F0aW9uLmhyZWYsdC5oZWFkLmFwcGVuZENoaWxkKGkpKTp0PXIpLG89QS5leGVjKGUpLGE9IW4mJltdLG8/W3QuY3JlYXRlRWxlbWVudChvWzFdKV06KG89eGUoW2VdLHQsYSksYSYmYS5sZW5ndGgmJncoYSkucmVtb3ZlKCksdy5tZXJnZShbXSxvLmNoaWxkTm9kZXMpKX0sdy5mbi5sb2FkPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcixpLG8sYT10aGlzLHM9ZS5pbmRleE9mKFxcXCIgXFxcIik7cmV0dXJuIHM+LTEmJihyPXZ0KGUuc2xpY2UocykpLGU9ZS5zbGljZSgwLHMpKSxnKHQpPyhuPXQsdD12b2lkIDApOnQmJlxcXCJvYmplY3RcXFwiPT10eXBlb2YgdCYmKGk9XFxcIlBPU1RcXFwiKSxhLmxlbmd0aD4wJiZ3LmFqYXgoe3VybDplLHR5cGU6aXx8XFxcIkdFVFxcXCIsZGF0YVR5cGU6XFxcImh0bWxcXFwiLGRhdGE6dH0pLmRvbmUoZnVuY3Rpb24oZSl7bz1hcmd1bWVudHMsYS5odG1sKHI/dyhcXFwiPGRpdj5cXFwiKS5hcHBlbmQody5wYXJzZUhUTUwoZSkpLmZpbmQocik6ZSl9KS5hbHdheXMobiYmZnVuY3Rpb24oZSx0KXthLmVhY2goZnVuY3Rpb24oKXtuLmFwcGx5KHRoaXMsb3x8W2UucmVzcG9uc2VUZXh0LHQsZV0pfSl9KSx0aGlzfSx3LmVhY2goW1xcXCJhamF4U3RhcnRcXFwiLFxcXCJhamF4U3RvcFxcXCIsXFxcImFqYXhDb21wbGV0ZVxcXCIsXFxcImFqYXhFcnJvclxcXCIsXFxcImFqYXhTdWNjZXNzXFxcIixcXFwiYWpheFNlbmRcXFwiXSxmdW5jdGlvbihlLHQpe3cuZm5bdF09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMub24odCxlKX19KSx3LmV4cHIucHNldWRvcy5hbmltYXRlZD1mdW5jdGlvbihlKXtyZXR1cm4gdy5ncmVwKHcudGltZXJzLGZ1bmN0aW9uKHQpe3JldHVybiBlPT09dC5lbGVtfSkubGVuZ3RofSx3Lm9mZnNldD17c2V0T2Zmc2V0OmZ1bmN0aW9uKGUsdCxuKXt2YXIgcixpLG8sYSxzLHUsbCxjPXcuY3NzKGUsXFxcInBvc2l0aW9uXFxcIiksZj13KGUpLHA9e307XFxcInN0YXRpY1xcXCI9PT1jJiYoZS5zdHlsZS5wb3NpdGlvbj1cXFwicmVsYXRpdmVcXFwiKSxzPWYub2Zmc2V0KCksbz13LmNzcyhlLFxcXCJ0b3BcXFwiKSx1PXcuY3NzKGUsXFxcImxlZnRcXFwiKSwobD0oXFxcImFic29sdXRlXFxcIj09PWN8fFxcXCJmaXhlZFxcXCI9PT1jKSYmKG8rdSkuaW5kZXhPZihcXFwiYXV0b1xcXCIpPi0xKT8oYT0ocj1mLnBvc2l0aW9uKCkpLnRvcCxpPXIubGVmdCk6KGE9cGFyc2VGbG9hdChvKXx8MCxpPXBhcnNlRmxvYXQodSl8fDApLGcodCkmJih0PXQuY2FsbChlLG4sdy5leHRlbmQoe30scykpKSxudWxsIT10LnRvcCYmKHAudG9wPXQudG9wLXMudG9wK2EpLG51bGwhPXQubGVmdCYmKHAubGVmdD10LmxlZnQtcy5sZWZ0K2kpLFxcXCJ1c2luZ1xcXCJpbiB0P3QudXNpbmcuY2FsbChlLHApOmYuY3NzKHApfX0sdy5mbi5leHRlbmQoe29mZnNldDpmdW5jdGlvbihlKXtpZihhcmd1bWVudHMubGVuZ3RoKXJldHVybiB2b2lkIDA9PT1lP3RoaXM6dGhpcy5lYWNoKGZ1bmN0aW9uKHQpe3cub2Zmc2V0LnNldE9mZnNldCh0aGlzLGUsdCl9KTt2YXIgdCxuLHI9dGhpc1swXTtpZihyKXJldHVybiByLmdldENsaWVudFJlY3RzKCkubGVuZ3RoPyh0PXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj1yLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcse3RvcDp0LnRvcCtuLnBhZ2VZT2Zmc2V0LGxlZnQ6dC5sZWZ0K24ucGFnZVhPZmZzZXR9KTp7dG9wOjAsbGVmdDowfX0scG9zaXRpb246ZnVuY3Rpb24oKXtpZih0aGlzWzBdKXt2YXIgZSx0LG4scj10aGlzWzBdLGk9e3RvcDowLGxlZnQ6MH07aWYoXFxcImZpeGVkXFxcIj09PXcuY3NzKHIsXFxcInBvc2l0aW9uXFxcIikpdD1yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2Vsc2V7dD10aGlzLm9mZnNldCgpLG49ci5vd25lckRvY3VtZW50LGU9ci5vZmZzZXRQYXJlbnR8fG4uZG9jdW1lbnRFbGVtZW50O3doaWxlKGUmJihlPT09bi5ib2R5fHxlPT09bi5kb2N1bWVudEVsZW1lbnQpJiZcXFwic3RhdGljXFxcIj09PXcuY3NzKGUsXFxcInBvc2l0aW9uXFxcIikpZT1lLnBhcmVudE5vZGU7ZSYmZSE9PXImJjE9PT1lLm5vZGVUeXBlJiYoKGk9dyhlKS5vZmZzZXQoKSkudG9wKz13LmNzcyhlLFxcXCJib3JkZXJUb3BXaWR0aFxcXCIsITApLGkubGVmdCs9dy5jc3MoZSxcXFwiYm9yZGVyTGVmdFdpZHRoXFxcIiwhMCkpfXJldHVybnt0b3A6dC50b3AtaS50b3Atdy5jc3MocixcXFwibWFyZ2luVG9wXFxcIiwhMCksbGVmdDp0LmxlZnQtaS5sZWZ0LXcuY3NzKHIsXFxcIm1hcmdpbkxlZnRcXFwiLCEwKX19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXt2YXIgZT10aGlzLm9mZnNldFBhcmVudDt3aGlsZShlJiZcXFwic3RhdGljXFxcIj09PXcuY3NzKGUsXFxcInBvc2l0aW9uXFxcIikpZT1lLm9mZnNldFBhcmVudDtyZXR1cm4gZXx8YmV9KX19KSx3LmVhY2goe3Njcm9sbExlZnQ6XFxcInBhZ2VYT2Zmc2V0XFxcIixzY3JvbGxUb3A6XFxcInBhZ2VZT2Zmc2V0XFxcIn0sZnVuY3Rpb24oZSx0KXt2YXIgbj1cXFwicGFnZVlPZmZzZXRcXFwiPT09dDt3LmZuW2VdPWZ1bmN0aW9uKHIpe3JldHVybiB6KHRoaXMsZnVuY3Rpb24oZSxyLGkpe3ZhciBvO2lmKHkoZSk/bz1lOjk9PT1lLm5vZGVUeXBlJiYobz1lLmRlZmF1bHRWaWV3KSx2b2lkIDA9PT1pKXJldHVybiBvP29bdF06ZVtyXTtvP28uc2Nyb2xsVG8obj9vLnBhZ2VYT2Zmc2V0Omksbj9pOm8ucGFnZVlPZmZzZXQpOmVbcl09aX0sZSxyLGFyZ3VtZW50cy5sZW5ndGgpfX0pLHcuZWFjaChbXFxcInRvcFxcXCIsXFxcImxlZnRcXFwiXSxmdW5jdGlvbihlLHQpe3cuY3NzSG9va3NbdF09X2UoaC5waXhlbFBvc2l0aW9uLGZ1bmN0aW9uKGUsbil7aWYobilyZXR1cm4gbj1GZShlLHQpLFdlLnRlc3Qobik/dyhlKS5wb3NpdGlvbigpW3RdK1xcXCJweFxcXCI6bn0pfSksdy5lYWNoKHtIZWlnaHQ6XFxcImhlaWdodFxcXCIsV2lkdGg6XFxcIndpZHRoXFxcIn0sZnVuY3Rpb24oZSx0KXt3LmVhY2goe3BhZGRpbmc6XFxcImlubmVyXFxcIitlLGNvbnRlbnQ6dCxcXFwiXFxcIjpcXFwib3V0ZXJcXFwiK2V9LGZ1bmN0aW9uKG4scil7dy5mbltyXT1mdW5jdGlvbihpLG8pe3ZhciBhPWFyZ3VtZW50cy5sZW5ndGgmJihufHxcXFwiYm9vbGVhblxcXCIhPXR5cGVvZiBpKSxzPW58fCghMD09PWl8fCEwPT09bz9cXFwibWFyZ2luXFxcIjpcXFwiYm9yZGVyXFxcIik7cmV0dXJuIHoodGhpcyxmdW5jdGlvbih0LG4saSl7dmFyIG87cmV0dXJuIHkodCk/MD09PXIuaW5kZXhPZihcXFwib3V0ZXJcXFwiKT90W1xcXCJpbm5lclxcXCIrZV06dC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXFxcImNsaWVudFxcXCIrZV06OT09PXQubm9kZVR5cGU/KG89dC5kb2N1bWVudEVsZW1lbnQsTWF0aC5tYXgodC5ib2R5W1xcXCJzY3JvbGxcXFwiK2VdLG9bXFxcInNjcm9sbFxcXCIrZV0sdC5ib2R5W1xcXCJvZmZzZXRcXFwiK2VdLG9bXFxcIm9mZnNldFxcXCIrZV0sb1tcXFwiY2xpZW50XFxcIitlXSkpOnZvaWQgMD09PWk/dy5jc3ModCxuLHMpOncuc3R5bGUodCxuLGkscyl9LHQsYT9pOnZvaWQgMCxhKX19KX0pLHcuZWFjaChcXFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IHJlc2l6ZSBzY3JvbGwgY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBjb250ZXh0bWVudVxcXCIuc3BsaXQoXFxcIiBcXFwiKSxmdW5jdGlvbihlLHQpe3cuZm5bdF09ZnVuY3Rpb24oZSxuKXtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4wP3RoaXMub24odCxudWxsLGUsbik6dGhpcy50cmlnZ2VyKHQpfX0pLHcuZm4uZXh0ZW5kKHtob3ZlcjpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLm1vdXNlZW50ZXIoZSkubW91c2VsZWF2ZSh0fHxlKX19KSx3LmZuLmV4dGVuZCh7YmluZDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIHRoaXMub24oZSxudWxsLHQsbil9LHVuYmluZDpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLm9mZihlLG51bGwsdCl9LGRlbGVnYXRlOmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiB0aGlzLm9uKHQsZSxuLHIpfSx1bmRlbGVnYXRlOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gMT09PWFyZ3VtZW50cy5sZW5ndGg/dGhpcy5vZmYoZSxcXFwiKipcXFwiKTp0aGlzLm9mZih0LGV8fFxcXCIqKlxcXCIsbil9fSksdy5wcm94eT1mdW5jdGlvbihlLHQpe3ZhciBuLHIsaTtpZihcXFwic3RyaW5nXFxcIj09dHlwZW9mIHQmJihuPWVbdF0sdD1lLGU9biksZyhlKSlyZXR1cm4gcj1vLmNhbGwoYXJndW1lbnRzLDIpLGk9ZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0fHx0aGlzLHIuY29uY2F0KG8uY2FsbChhcmd1bWVudHMpKSl9LGkuZ3VpZD1lLmd1aWQ9ZS5ndWlkfHx3Lmd1aWQrKyxpfSx3LmhvbGRSZWFkeT1mdW5jdGlvbihlKXtlP3cucmVhZHlXYWl0Kys6dy5yZWFkeSghMCl9LHcuaXNBcnJheT1BcnJheS5pc0FycmF5LHcucGFyc2VKU09OPUpTT04ucGFyc2Usdy5ub2RlTmFtZT1OLHcuaXNGdW5jdGlvbj1nLHcuaXNXaW5kb3c9eSx3LmNhbWVsQ2FzZT1HLHcudHlwZT14LHcubm93PURhdGUubm93LHcuaXNOdW1lcmljPWZ1bmN0aW9uKGUpe3ZhciB0PXcudHlwZShlKTtyZXR1cm4oXFxcIm51bWJlclxcXCI9PT10fHxcXFwic3RyaW5nXFxcIj09PXQpJiYhaXNOYU4oZS1wYXJzZUZsb2F0KGUpKX0sXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFxcXCJqcXVlcnlcXFwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIHd9KTt2YXIgSnQ9ZS5qUXVlcnksS3Q9ZS4kO3JldHVybiB3Lm5vQ29uZmxpY3Q9ZnVuY3Rpb24odCl7cmV0dXJuIGUuJD09PXcmJihlLiQ9S3QpLHQmJmUualF1ZXJ5PT09dyYmKGUualF1ZXJ5PUp0KSx3fSx0fHwoZS5qUXVlcnk9ZS4kPXcpLHd9KTtcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Jhdy1sb2FkZXIhLi9zcmMvbGliL2pxdWVyeS9qcXVlcnktMy4zLjEubWluLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMyA0IDUiXSwic291cmNlUm9vdCI6IiJ9