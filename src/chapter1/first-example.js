'use strict';

class PerformanceResult {
    constructor(plays, invoice) {
        this._plays = plays;
        this._invoice = invoice;
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
        let result = 0;
        for (let perf of performances) {
            result += this._volumeCreditsFor(perf);
        }

        return result;
    }

    _totalAmount() {
        let result = 0;
        for (let perf of this._invoice.performances) {  
            result += this._amountFor(perf);
        }

        return result;

    }

    showResult() {
        let result = `Statemnt for ${this._invoice.customer}\n`;
        for (let perf of this._invoice.performances) {  
            result += `  ${this._playFor(perf).name}: ${this._usd(this._amountFor(perf))} (${perf.audience} seats)\n`;
        }
        result += `Amount owed is ${this._usd(this._totalAmount())}\n`;
        result += `You earned ${this._totalVolumeCredits(this._invoice.performances)} credits\n`;
        return result;
    }
    
}

export default PerformanceResult;