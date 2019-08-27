'use strict';

const amountFor = (performance, play) => {
    let thisAmount = 0;

    switch (play.type) {
        case 'tragedy':
            thisAmount = 40000;
            if (performance.audience > 30) {
                thisAmount += 1000 * (performance.audience - 30);
            }
        break;
        case 'comedy':
            thisAmount = 30000;
            if (performance.audience > 20) {
                thisAmount += 10000 + 500 * (performance.audience - 20);
            }
            thisAmount += 300 * performance.audience;
        break;
        default:
            throw new Error(`unkown type: ${play.type}`);
    }

    return thisAmount;
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
        let thisAmount = amountFor(perf, play);

        volumeCredits += Math.max(perf.audience - 30, 0);
        if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

        result += `  ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    
        totalAmount+= thisAmount;
    }


    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
};