'use strict';

class PerformanceResult {

    constructor(plays, invoice) {
        this._plays = plays;
        this._invoice = invoice;
        const self = this;
        this._performances = invoice.performances.map(performance => this._enrichPerformance(performance, self));
    }

    _enrichPerformance(performance, self) {
        const result = Object.assign({}, performance);
        result.play = self._playFor(result);
        result.amount = self._amountFor(result);
        return result;
    }

    _playFor(performance) {
        return this._plays[performance.playID];
    }

    _amountFor(performance) {
        const play = performance.play;
        let result = 0;
    
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
                throw new Error(`unkown type: ${play.type}`);
        }
    
        return result;
    }

    _volumeCreditsFor(performance) {
        let result = 0;
        result += Math.max(performance.audience - 30, 0);
        if ('comedy' === performance.play.type) {
            result += Math.floor(performance.audience / 5);
        }
        return result;
    }

    _usd(number) {
        return  new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                'currency': 'USD',
                minimumFractionDigits: 2
            }
        ).format(number/100);
    }

    _totalVolumeCredits() {
        let result = 0;
        for (let perf of this._performances) {
            result += this._volumeCreditsFor(perf);
        }

        return result;
    }

    _totalAmount() {
        let result = 0;
        for (let perf of this._performances) {  
            result += perf.amount;
        }

        return result;

    }

    _renderPlainText() {
        let result = `Statemnt for ${this._invoice.customer}\n`;
        for (let perf of this._performances) {  
            result += `  ${perf.play.name}: ${this._usd(perf.amount)} (${perf.audience} seats)\n`;
        }
        result += `Amount owed is ${this._usd(this._totalAmount())}\n`;
        result += `You earned ${this._totalVolumeCredits()} credits\n`;
        return result;
    }

    showResult() {
        return this._renderPlainText();
    }
    
}

export default PerformanceResult;