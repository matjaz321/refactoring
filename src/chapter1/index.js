'use strict';

import fs from 'fs';
import path from 'path';
import PerformanceResult from './first-example';

const invoices = fs.readFileSync(path.resolve('src/chapter1/invoices.json'));
const plays = fs.readFileSync(path.resolve('src/chapter1/plays.json'));

const performanceResult = new PerformanceResult(JSON.parse(plays), JSON.parse(invoices));
const result = performanceResult.showResult();
console.log(result);