'use strict';

class PerformanceResult {
    constructor(plays) {
        this._plays = plays;
    }

    _playFor(performance) {
        return this._plays[performance.playID];
    }

    _amountFor(performance) {
        const play = this._playFor(performance);
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
        if ('comedy' === this._playFor(performance).type) {
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

    _totalVolumeCredits(performances) {
        let volumeCredits = 0;
        for (let perf of performances) {
            volumeCredits += this._volumeCreditsFor(perf);
        }

        return volumeCredits;
    }

    showResult(invoice) {
        let totalAmount = 0;
        let result = `Statemnt for ${invoice.customer}\n`;
        for (let perf of invoice.performances) {  
            result += `  ${this._playFor(perf).name}: ${this._usd(this._amountFor(perf))} (${perf.audience} seats)\n`;
            totalAmount += this._amountFor(perf);
        }

        result += `Amount owed is ${this._usd(totalAmount)}\n`;
        result += `You earned ${this._totalVolumeCredits(invoice.performances)} credits\n`;
        return result;
    }
    
}

export default PerformanceResult;