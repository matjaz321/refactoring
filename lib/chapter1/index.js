'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _firstExample = require('./first-example');

var _firstExample2 = _interopRequireDefault(_firstExample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invoices = _fs2.default.readFileSync(_path2.default.resolve('src/chapter1/invoices.json'));
var plays = _fs2.default.readFileSync(_path2.default.resolve('src/chapter1/plays.json'));

var result = (0, _firstExample2.default)(JSON.parse(invoices), JSON.parse(plays));
console.log(result);