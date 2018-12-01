// https://adventofcode.com/2018/day/1
// A: 411
// B: 56360

const readline = require('readline');
const fs = require('fs');

let teststack = [];
let stackA = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('testdata')
});

lineReader.on('line', function (line) {
    stackA += parseInt(line, 10);
    teststack.push(parseInt(line, 10));
});

lineReader.on('close', function () {
    console.log('A: ', stackA);
    console.log('B:', findFrequence(teststack));
});

function findFrequence(stack) {
    let frequenceHistory = [0];
    let currentFrequency = 0;
    for (let index = 0; index < stack.length;) {
        const element = stack[index];
        currentFrequency += element;
        if (frequenceHistory.includes(currentFrequency)) {
            return currentFrequency;
        }
        frequenceHistory.push(currentFrequency);
        if (index === (stack.length -1)) {
            index = 0;
        } else {
            index++;
        }
    }
}
