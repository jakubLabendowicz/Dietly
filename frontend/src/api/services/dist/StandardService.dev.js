"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.deleteOne = exports.patchOne = exports.getMany = exports.getOne = exports.postOne = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _RequestUtils = require("../utils/RequestUtils");

var _ResponseUtils = require("../utils/ResponseUtils");

var _ValidationUtils = require("../utils/ValidationUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postOne = function postOne(path, data, schema) {
  return regeneratorRuntime.async(function postOne$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            if ((0, _ValidationUtils.validate)(schema, data)) {
              try {
                (0, _axios["default"])({
                  method: _RequestUtils.METHOD_POST,
                  url: _RequestUtils.URL + path,
                  responseType: _RequestUtils.RESPONSE_TYPE,
                  headers: _RequestUtils.HEADERS,
                  params: {},
                  data: {
                    data: data
                  }
                }).then(function (response) {
                  (0, _ResponseUtils.processResult)(response.data.result);
                  resolve(response.data);
                })["catch"](function (error) {
                  (0, _ResponseUtils.processResult)(error.response.data.result);
                  reject(error.response.data);
                });
              } catch (error) {
                (0, _ResponseUtils.processResult)(_ResponseUtils.RESULT_SOMETHING_WRONG);
                reject(error);
              }
            }
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.postOne = postOne;

var getOne = function getOne(path, id) {
  return regeneratorRuntime.async(function getOne$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            try {
              (0, _axios["default"])({
                method: _RequestUtils.METHOD_GET,
                url: _RequestUtils.URL + path + '/' + id,
                responseType: _RequestUtils.RESPONSE_TYPE,
                headers: _RequestUtils.HEADERS,
                params: {},
                data: {}
              }).then(function (response) {
                (0, _ResponseUtils.processGetResult)(response.data.result);
                resolve(response.data);
              })["catch"](function (error) {
                (0, _ResponseUtils.processResult)(error.response.data.result);
                reject(error.response.data);
              });
            } catch (error) {
              (0, _ResponseUtils.processResult)(_ResponseUtils.RESULT_SOMETHING_WRONG);
              reject(error);
            }
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getOne = getOne;

var getMany = function getMany(path, params) {
  return regeneratorRuntime.async(function getMany$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            try {
              (0, _axios["default"])({
                method: _RequestUtils.METHOD_GET,
                url: _RequestUtils.URL + path,
                responseType: _RequestUtils.RESPONSE_TYPE,
                headers: _RequestUtils.HEADERS,
                params: params,
                data: {}
              }).then(function (response) {
                // processGetResult(response.data.result);
                resolve(response.data);
              })["catch"](function (error) {
                // processResult(error.response.data.result);
                reject(error.response.data);
              });
            } catch (error) {
              (0, _ResponseUtils.processResult)(_ResponseUtils.RESULT_SOMETHING_WRONG);
              reject(error);
            }
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getMany = getMany;

var patchOne = function patchOne(path, id, data) {
  return regeneratorRuntime.async(function patchOne$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            try {
              (0, _axios["default"])({
                method: _RequestUtils.METHOD_PATCH,
                url: _RequestUtils.URL + path + '/' + id,
                responseType: _RequestUtils.RESPONSE_TYPE,
                headers: _RequestUtils.HEADERS,
                params: {},
                data: {
                  data: data
                }
              }).then(function (response) {
                (0, _ResponseUtils.processResult)(response.data.result);
                resolve(response.data);
              })["catch"](function (error) {
                (0, _ResponseUtils.processResult)(error.response.data.result);
                reject(error.response.data);
              });
            } catch (error) {
              (0, _ResponseUtils.processResult)(_ResponseUtils.RESULT_SOMETHING_WRONG);
              reject(error);
            }
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.patchOne = patchOne;

var deleteOne = function deleteOne(path, id) {
  return regeneratorRuntime.async(function deleteOne$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            try {
              (0, _axios["default"])({
                method: _RequestUtils.METHOD_DELETE,
                url: _RequestUtils.URL + path + '/' + id,
                responseType: _RequestUtils.RESPONSE_TYPE,
                headers: _RequestUtils.HEADERS,
                params: {},
                data: {}
              }).then(function (response) {
                (0, _ResponseUtils.processResult)(response.data.result);
                resolve(response.data);
              })["catch"](function (error) {
                (0, _ResponseUtils.processResult)(error.response.data.result);
                reject(error.response.data);
              });
            } catch (error) {
              (0, _ResponseUtils.processResult)(_ResponseUtils.RESULT_SOMETHING_WRONG);
              reject(error);
            }
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.deleteOne = deleteOne;

var search = function search(path, term) {
  return regeneratorRuntime.async(function search$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise(function (resolve, reject) {
            try {
              (0, _axios["default"])({
                method: _RequestUtils.METHOD_GET,
                url: _RequestUtils.URL + path + "/search/" + term,
                responseType: _RequestUtils.RESPONSE_TYPE,
                headers: _RequestUtils.HEADERS,
                params: {},
                data: {}
              }).then(function (response) {
                (0, _ResponseUtils.processGetResult)(response.data.result);
                resolve(response.data);
              })["catch"](function (error) {
                (0, _ResponseUtils.processResult)(error.response.data.result);
                reject(error.response.data);
              });
            } catch (error) {
              (0, _ResponseUtils.processResult)(_ResponseUtils.RESULT_SOMETHING_WRONG);
              reject(error);
            }
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.search = search;