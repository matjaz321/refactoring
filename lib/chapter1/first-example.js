'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = showResult;
var amountFor = function amountFor(performance, play) {
    var result = 0;

    switch (play.type) {
        case 'tragedy':
            result = 40000;
            if (performance.audience > 30) {
                result += 1000 * (performance.audience - 30);
            }
            break;
        case 'comedy':
            result = 30000;
            if (performance.audience > 20) {
                result += 10000 + 500 * (performance.audience - 20);
            }
            result += 300 * performance.audience;
            break;
        default:
            throw new Error('unkown type: ' + play.type);
    }

    return result;
};

function showResult(invoice, plays) {
    var totalAmount = 0;
    var volumeCredits = 0;
    var result = 'Statemnt for ' + invoice.customer + '\n';
    var format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        'currency': 'USD',
        minimumFractionDigits: 2
    }).format;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = invoice.performances[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var perf = _step.value;

            var play = plays[perf.playID];
            var _result = amountFor(perf, play);

            volumeCredits += Math.max(perf.audience - 30, 0);
            if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

            _result += '  ' + play.name + ': ' + format(_result / 100) + ' (' + perf.audience + ' seats)\n';

            totalAmount += _result;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    result += 'Amount owed is ' + format(totalAmount / 100) + '\n';
    result += 'You earned ' + volumeCredits + ' credits\n';
    return result;
};