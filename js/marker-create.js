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
/******/ 	return __webpack_require__(__webpack_require__.s = 139);
/******/ })
/************************************************************************/
/******/ ({

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fileEl = document.getElementById('imgFile');
var uploadImgEl = document.getElementById('uploadImg');
var markerImgEl = document.getElementById('markerImg');

fileEl.addEventListener('change', function (evt) {
    var file = evt.currentTarget.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (evt) {
            var fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            var dataURL = evt.currentTarget.result;
            uploadImgEl.src = dataURL;

            createMarkerImg(dataURL);
            createMarkerPattern(dataURL, fileName);
        };

        reader.readAsDataURL(file);
    }
});

function createMarkerImg(dataURL) {
    THREEx.ArPatternFile.buildFullMarker(dataURL, function (markerURL) {
        markerImgEl.src = markerURL;
    });
}

function createMarkerPattern(dataURL, name) {
    var fileName = name || 'marker';

    fileName += '.patt';

    THREEx.ArPatternFile.encodeImageURL(dataURL, function (pattFileString) {
        var aEl = document.createElement('A');

        aEl.href = URL.createObjectURL(new Blob([pattFileString], { type: 'text/plain' }));
        aEl.download = fileName;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjQ2YzI2ZjZlYTNmYmNhMjQ2MmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21hcmtlci1jcmVhdGUuanMiXSwibmFtZXMiOlsiZmlsZUVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVwbG9hZEltZ0VsIiwibWFya2VySW1nRWwiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJmaWxlcyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJmaWxlTmFtZSIsIm5hbWUiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImRhdGFVUkwiLCJyZXN1bHQiLCJzcmMiLCJjcmVhdGVNYXJrZXJJbWciLCJjcmVhdGVNYXJrZXJQYXR0ZXJuIiwicmVhZEFzRGF0YVVSTCIsIlRIUkVFeCIsIkFyUGF0dGVybkZpbGUiLCJidWlsZEZ1bGxNYXJrZXIiLCJtYXJrZXJVUkwiLCJlbmNvZGVJbWFnZVVSTCIsInBhdHRGaWxlU3RyaW5nIiwiYUVsIiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwidHlwZSIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQSxJQUFNQSxTQUFTQyxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQWY7QUFDQSxJQUFNQyxjQUFjRixTQUFTQyxjQUFULENBQXdCLFdBQXhCLENBQXBCO0FBQ0EsSUFBTUUsY0FBY0gsU0FBU0MsY0FBVCxDQUF3QixXQUF4QixDQUFwQjs7QUFFQUYsT0FBT0ssZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBVUMsR0FBVixFQUFlO0FBQzdDLFFBQU1DLE9BQU9ELElBQUlFLGFBQUosQ0FBa0JDLEtBQWxCLENBQXdCLENBQXhCLENBQWI7O0FBRUEsUUFBSUYsSUFBSixFQUFVO0FBQ04sWUFBTUcsU0FBUyxJQUFJQyxVQUFKLEVBQWY7O0FBRUFELGVBQU9FLE1BQVAsR0FBZ0IsVUFBVU4sR0FBVixFQUFlO0FBQzNCLGdCQUFNTyxXQUFXTixLQUFLTyxJQUFMLENBQVVDLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUJSLEtBQUtPLElBQUwsQ0FBVUUsV0FBVixDQUFzQixHQUF0QixDQUF2QixDQUFqQjtBQUNBLGdCQUFNQyxVQUFVWCxJQUFJRSxhQUFKLENBQWtCVSxNQUFsQztBQUNBZix3QkFBWWdCLEdBQVosR0FBa0JGLE9BQWxCOztBQUVBRyw0QkFBZ0JILE9BQWhCO0FBQ0FJLGdDQUFvQkosT0FBcEIsRUFBNkJKLFFBQTdCO0FBQ0gsU0FQRDs7QUFTQUgsZUFBT1ksYUFBUCxDQUFxQmYsSUFBckI7QUFDSDtBQUNKLENBakJEOztBQW1CQSxTQUFTYSxlQUFULENBQXlCSCxPQUF6QixFQUFrQztBQUM5Qk0sV0FBT0MsYUFBUCxDQUFxQkMsZUFBckIsQ0FBcUNSLE9BQXJDLEVBQThDLFVBQVVTLFNBQVYsRUFBcUI7QUFDL0R0QixvQkFBWWUsR0FBWixHQUFrQk8sU0FBbEI7QUFDSCxLQUZEO0FBR0g7O0FBRUQsU0FBU0wsbUJBQVQsQ0FBNkJKLE9BQTdCLEVBQXNDSCxJQUF0QyxFQUE0QztBQUN4QyxRQUFJRCxXQUFXQyxRQUFRLFFBQXZCOztBQUVBRCxnQkFBWSxPQUFaOztBQUVBVSxXQUFPQyxhQUFQLENBQXFCRyxjQUFyQixDQUFvQ1YsT0FBcEMsRUFBNkMsVUFBVVcsY0FBVixFQUEwQjtBQUNuRSxZQUFNQyxNQUFNNUIsU0FBUzZCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBWjs7QUFFQUQsWUFBSUUsSUFBSixHQUFXQyxJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDTixjQUFELENBQVQsRUFBMkIsRUFBQ08sTUFBTSxZQUFQLEVBQTNCLENBQXBCLENBQVg7QUFDQU4sWUFBSU8sUUFBSixHQUFldkIsUUFBZjtBQUNBWixpQkFBU29DLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlQsR0FBMUI7QUFDQUEsWUFBSVUsS0FBSjtBQUNBdEMsaUJBQVNvQyxJQUFULENBQWNHLFdBQWQsQ0FBMEJYLEdBQTFCO0FBQ0gsS0FSRDtBQVNILEMiLCJmaWxlIjoibWFya2VyLWNyZWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjQ2YzI2ZjZlYTNmYmNhMjQ2MmEiLCJjb25zdCBmaWxlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1nRmlsZScpO1xyXG5jb25zdCB1cGxvYWRJbWdFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWRJbWcnKTtcclxuY29uc3QgbWFya2VySW1nRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFya2VySW1nJyk7XHJcblxyXG5maWxlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgY29uc3QgZmlsZSA9IGV2dC5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xyXG5cclxuICAgIGlmIChmaWxlKSB7XHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlLm5hbWUuc3Vic3RyaW5nKDAsIGZpbGUubmFtZS5sYXN0SW5kZXhPZignLicpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVVSTCA9IGV2dC5jdXJyZW50VGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgdXBsb2FkSW1nRWwuc3JjID0gZGF0YVVSTDtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZU1hcmtlckltZyhkYXRhVVJMKTtcclxuICAgICAgICAgICAgY3JlYXRlTWFya2VyUGF0dGVybihkYXRhVVJMLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlTWFya2VySW1nKGRhdGFVUkwpIHtcclxuICAgIFRIUkVFeC5BclBhdHRlcm5GaWxlLmJ1aWxkRnVsbE1hcmtlcihkYXRhVVJMLCBmdW5jdGlvbiAobWFya2VyVVJMKSB7XHJcbiAgICAgICAgbWFya2VySW1nRWwuc3JjID0gbWFya2VyVVJMO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1hcmtlclBhdHRlcm4oZGF0YVVSTCwgbmFtZSkge1xyXG4gICAgbGV0IGZpbGVOYW1lID0gbmFtZSB8fCAnbWFya2VyJztcclxuXHJcbiAgICBmaWxlTmFtZSArPSAnLnBhdHQnO1xyXG5cclxuICAgIFRIUkVFeC5BclBhdHRlcm5GaWxlLmVuY29kZUltYWdlVVJMKGRhdGFVUkwsIGZ1bmN0aW9uIChwYXR0RmlsZVN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHJcbiAgICAgICAgYUVsLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtwYXR0RmlsZVN0cmluZ10sIHt0eXBlOiAndGV4dC9wbGFpbid9KSk7XHJcbiAgICAgICAgYUVsLmRvd25sb2FkID0gZmlsZU5hbWU7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhRWwpO1xyXG4gICAgICAgIGFFbC5jbGljaygpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYUVsKTtcclxuICAgIH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21hcmtlci1jcmVhdGUuanMiXSwic291cmNlUm9vdCI6IiJ9