'use strict';

import fs from 'fs';
import path from 'path';
import showResult from './first-example';

const invoices = fs.readFileSync(path.resolve('src/chapter1/invoices.json'));
const plays = fs.readFileSync(path.resolve('src/chapter1/plays.json'));

const result = showResult(JSON.parse(invoices), JSON.parse(plays));
console.log(result)