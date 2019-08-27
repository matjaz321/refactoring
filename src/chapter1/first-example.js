'use strict';

const amountFor = (performance, play) => {
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
};

export default function showResult(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statemnt for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            'currency': 'USD',
            minimumFractionDigits: 2
        }
    ).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let result = amountFor(perf, play);

        volumeCredits += Math.max(perf.audience - 30, 0);
        if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

        result += `  ${play.name}: ${format(result/100)} (${perf.audience} seats)\n`;
    
        totalAmount+= result;
    }


    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
};